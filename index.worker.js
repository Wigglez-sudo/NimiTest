// NVIDIA AI Desktop Cloudflare Worker Proxy
// Routes supported:
//   GET  /v1/models
//   POST /v1/chat/completions
//   POST /v1/web-search
//
// Search providers:
//   Brave Search API (recommended): pass X-Search-Api-Key from the app or set BRAVE_SEARCH_API_KEY as a Worker secret.
//   Tavily: pass X-Search-Api-Key from the app or set TAVILY_API_KEY as a Worker secret.
//
// NVIDIA auth accepts either Authorization: Bearer nvapi-xxxx or X-Nvidia-Api-Key: nvapi-xxxx.

const NVIDIA_BASE = "https://integrate.api.nvidia.com";

function corsHeaders(origin = "*") {
  return {
    "Access-Control-Allow-Origin": origin || "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Nvidia-Api-Key, x-nvidia-api-key, X-Search-Provider, X-Search-Api-Key, x-search-provider, x-search-api-key, Accept",
    "Access-Control-Max-Age": "86400",
    "Vary": "Origin",
  };
}

function jsonResponse(data, status = 200, origin = "*") {
  return new Response(JSON.stringify(data, null, 2), {
    status,
    headers: {
      ...corsHeaders(origin),
      "Content-Type": "application/json; charset=utf-8",
    },
  });
}

function getBearerAuth(request, env) {
  const authorization = request.headers.get("Authorization");
  if (authorization && authorization.startsWith("Bearer ")) return authorization;

  const keyHeader = request.headers.get("X-Nvidia-Api-Key") || request.headers.get("x-nvidia-api-key");
  if (keyHeader) return `Bearer ${keyHeader.trim()}`;

  if (env && env.NVIDIA_API_KEY) return `Bearer ${String(env.NVIDIA_API_KEY).trim()}`;
  return null;
}

function cleanResult(item) {
  return {
    title: item.title || item.name || item.heading || "Untitled",
    url: item.url || item.link || item.href || "",
    snippet: item.description || item.snippet || item.content || item.body || "",
    source: item.profile?.name || item.source || item.displayed_url || "",
  };
}

async function braveSearch(query, count, safe, apiKey) {
  if (!apiKey) throw new Error("Missing Brave Search API key.");
  const url = new URL("https://api.search.brave.com/res/v1/web/search");
  url.searchParams.set("q", query);
  url.searchParams.set("count", String(Math.max(1, Math.min(10, count || 6))));
  url.searchParams.set("safe", safe || "moderate");
  url.searchParams.set("text_decorations", "false");
  url.searchParams.set("extra_snippets", "true");

  const res = await fetch(url.toString(), {
    headers: {
      "Accept": "application/json",
      "X-Subscription-Token": apiKey,
    },
  });
  if (!res.ok) throw new Error(`Brave Search HTTP ${res.status}: ${await res.text()}`);
  const data = await res.json();
  const web = data.web?.results || [];
  const news = data.news?.results || [];
  return [...web, ...news].map(cleanResult).filter(r => r.url);
}

async function tavilySearch(query, count, apiKey) {
  if (!apiKey) throw new Error("Missing Tavily API key.");
  const res = await fetch("https://api.tavily.com/search", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      query,
      max_results: Math.max(1, Math.min(10, count || 6)),
      search_depth: "basic",
      include_answer: false,
      include_raw_content: false,
    }),
  });
  if (!res.ok) throw new Error(`Tavily HTTP ${res.status}: ${await res.text()}`);
  const data = await res.json();
  return (data.results || []).map(cleanResult).filter(r => r.url);
}

async function handleWebSearch(request, env, origin) {
  if (request.method !== "POST") return jsonResponse({ ok: false, error: "Use POST for /v1/web-search" }, 405, origin);
  let body = {};
  try { body = await request.json(); } catch (_) {}
  const query = String(body.query || "").trim();
  if (!query) return jsonResponse({ ok: false, error: "Missing search query." }, 400, origin);

  const provider = String(body.provider || request.headers.get("X-Search-Provider") || "brave").toLowerCase();
  const count = Number(body.count || 6);
  const safe = body.safe || "moderate";
  const headerKey = request.headers.get("X-Search-Api-Key") || request.headers.get("x-search-api-key") || "";

  try {
    let results = [];
    if (provider === "tavily") {
      results = await tavilySearch(query, count, headerKey || env.TAVILY_API_KEY);
    } else {
      results = await braveSearch(query, count, safe, headerKey || env.BRAVE_SEARCH_API_KEY);
    }
    return jsonResponse({ ok: true, provider: provider === "tavily" ? "tavily" : "brave", query, results: results.slice(0, Math.max(1, Math.min(10, count || 6))) }, 200, origin);
  } catch (err) {
    return jsonResponse({ ok: false, error: "Web search failed", message: err && err.message ? err.message : String(err) }, 502, origin);
  }
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin") || "*";
    const url = new URL(request.url);

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders(origin) });
    }

    if (url.pathname === "/" || url.pathname === "") {
      return jsonResponse({
        ok: true,
        name: "NVIDIA AI Desktop proxy",
        routes: ["/v1/models", "/v1/chat/completions", "/v1/web-search"],
        search: "Brave Search API recommended; Tavily also supported.",
      }, 200, origin);
    }

    if (url.pathname === "/v1/web-search") return handleWebSearch(request, env, origin);

    const allowedPaths = ["/v1/models", "/v1/chat/completions"];
    if (!allowedPaths.includes(url.pathname)) {
      return jsonResponse({ ok: false, error: "Route not allowed", path: url.pathname, allowed: [...allowedPaths, "/v1/web-search"] }, 404, origin);
    }

    const auth = getBearerAuth(request, env);
    if (!auth) {
      return jsonResponse({ ok: false, error: "Missing API key. Send Authorization: Bearer nvapi-xxxx or X-Nvidia-Api-Key: nvapi-xxxx." }, 401, origin);
    }

    const targetUrl = NVIDIA_BASE + url.pathname + url.search;
    const headers = new Headers();
    headers.set("Authorization", auth);
    headers.set("Accept", request.headers.get("Accept") || "application/json");
    if (request.method !== "GET" && request.method !== "HEAD") {
      headers.set("Content-Type", request.headers.get("Content-Type") || "application/json");
    }

    try {
      const upstream = await fetch(targetUrl, {
        method: request.method,
        headers,
        body: request.method === "GET" || request.method === "HEAD" ? undefined : request.body,
      });

      const responseHeaders = new Headers(upstream.headers);
      for (const [key, value] of Object.entries(corsHeaders(origin))) responseHeaders.set(key, value);
      responseHeaders.delete("content-encoding");
      responseHeaders.delete("content-security-policy");

      return new Response(upstream.body, { status: upstream.status, statusText: upstream.statusText, headers: responseHeaders });
    } catch (err) {
      return jsonResponse({ ok: false, error: "Proxy fetch failed", message: err && err.message ? err.message : String(err) }, 502, origin);
    }
  },
};
