// Cloudflare Worker proxy for NVIDIA API Catalog / NIM.
// Deploy this, then paste the Worker URL into the app's Settings > API Proxy URL.
// The app sends your key as x-nvidia-api-key. The Worker forwards it as Authorization: Bearer <key>.

const NVIDIA_BASE = 'https://integrate.api.nvidia.com';

function corsHeaders(origin) {
  return {
    'Access-Control-Allow-Origin': origin || '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, x-nvidia-api-key',
    'Access-Control-Max-Age': '86400',
    'Vary': 'Origin'
  };
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin') || '*';
    const cors = corsHeaders(origin);

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: cors });
    }

    const incoming = new URL(request.url);
    if (incoming.pathname === '/' || incoming.pathname === '') {
      return new Response('NVIDIA AI Desktop proxy is running. Use /v1/models or /v1/chat/completions.', { headers: cors });
    }

    if (!incoming.pathname.startsWith('/v1/')) {
      return new Response('Not found. Expected /v1/...', { status: 404, headers: cors });
    }

    const apiKey = request.headers.get('x-nvidia-api-key') || request.headers.get('authorization')?.replace(/^Bearer\s+/i, '') || env.NVIDIA_API_KEY;
    if (!apiKey) {
      return new Response('Missing API key. Send x-nvidia-api-key from the app or set NVIDIA_API_KEY as a Worker secret.', { status: 401, headers: cors });
    }

    const target = new URL(incoming.pathname + incoming.search, NVIDIA_BASE);
    const headers = new Headers(request.headers);
    headers.delete('host');
    headers.delete('origin');
    headers.delete('referer');
    headers.delete('x-nvidia-api-key');
    headers.set('Authorization', `Bearer ${apiKey}`);

    const init = {
      method: request.method,
      headers,
      body: request.method === 'GET' || request.method === 'HEAD' ? undefined : await request.arrayBuffer(),
      redirect: 'follow'
    };

    const upstream = await fetch(target, init);
    const responseHeaders = new Headers(upstream.headers);
    for (const [key, value] of Object.entries(cors)) responseHeaders.set(key, value);
    return new Response(upstream.body, { status: upstream.status, statusText: upstream.statusText, headers: responseHeaders });
  }
};
