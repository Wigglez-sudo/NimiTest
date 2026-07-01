// ==================== MODEL DATA ====================
const MODELS = [
  // FREE TIER
  { id: "nvidia/llama-3.1-nemotron-70b-instruct", name: "Llama 3.1 Nemotron 70B", desc: "NVIDIA-tuned Llama for reasoning & chat", tags: ["free","reasoning"], tier: "free" },
  { id: "nvidia/llama-3.1-nemotron-51b-instruct", name: "Llama 3.1 Nemotron 51B", desc: "Mid-size reasoning model", tags: ["free","reasoning"], tier: "free" },
  { id: "nvidia/llama-3.1-nemotron-8b-instruct", name: "Llama 3.1 Nemotron 8B", desc: "Fast, efficient local-like inference", tags: ["free"], tier: "free" },
  { id: "nvidia/llama-3.1-nemotron-nano-v1", name: "Llama 3.1 Nemotron Nano", desc: "Ultra-fast, lightweight", tags: ["free"], tier: "free" },
  { id: "deepseek-ai/deepseek-r1", name: "DeepSeek-R1", desc: "Top-tier reasoning with thinking chains", tags: ["free","reasoning"], tier: "free" },
  { id: "deepseek-ai/deepseek-v3", name: "DeepSeek-V3", desc: "General purpose chat & code", tags: ["free"], tier: "free" },
  { id: "meta/llama-3.3-70b-instruct", name: "Llama 3.3 70B", desc: "Meta's latest general model", tags: ["free"], tier: "free" },
  { id: "meta/llama-3.1-405b-instruct", name: "Llama 3.1 405B", desc: "Massive open model", tags: ["free"], tier: "free" },
  { id: "meta/llama-3.1-70b-instruct", name: "Llama 3.1 70B", desc: "Strong general-purpose model", tags: ["free"], tier: "free" },
  { id: "meta/llama-3.1-8b-instruct", name: "Llama 3.1 8B", desc: "Fast, efficient for most tasks", tags: ["free"], tier: "free" },
  { id: "mistralai/mistral-large-2-instruct", name: "Mistral Large 2", desc: "Multilingual reasoning & code", tags: ["free"], tier: "free" },
  { id: "mistralai/mixtral-8x22b-instruct-v0.1", name: "Mixtral 8x22B", desc: "Sparse MoE, strong reasoning", tags: ["free"], tier: "free" },
  { id: "mistralai/mixtral-8x7b-instruct-v0.1", name: "Mixtral 8x7B", desc: "Efficient MoE model", tags: ["free"], tier: "free" },
  { id: "mistralai/mistral-7b-instruct-v0.3", name: "Mistral 7B", desc: "Fast, capable small model", tags: ["free"], tier: "free" },
  { id: "mistralai/mistral-nemo-12b-instruct", name: "Mistral NeMo 12B", desc: "Best speed on free tier (~16.5 tok/s)", tags: ["free"], tier: "free" },
  { id: "qwen/qwen2.5-72b-instruct", name: "Qwen 2.5 72B", desc: "Strong multilingual & coding", tags: ["free"], tier: "free" },
  { id: "qwen/qwen2.5-7b-instruct", name: "Qwen 2.5 7B", desc: "Fast, efficient Qwen variant", tags: ["free"], tier: "free" },
  { id: "qwen/qwen2.5-coder-32b-instruct", name: "Qwen 2.5 Coder 32B", desc: "Specialized for code generation", tags: ["free"], tier: "free" },
  { id: "microsoft/phi-4", name: "Phi-4", desc: "Microsoft's compact powerful model", tags: ["free"], tier: "free" },
  { id: "microsoft/phi-3.5-moe-instruct", name: "Phi-3.5 MoE", desc: "Mixture of Experts variant", tags: ["free"], tier: "free" },
  { id: "microsoft/phi-3-mini-4k-instruct", name: "Phi-3 Mini", desc: "Ultra-fast on-device feel", tags: ["free"], tier: "free" },
  { id: "google/gemma-2-27b-it", name: "Gemma 2 27B", desc: "Google's open model", tags: ["free"], tier: "free" },
  { id: "google/gemma-2-9b-it", name: "Gemma 2 9B", desc: "Lightweight Google model", tags: ["free"], tier: "free" },
  { id: "google/gemma-2-2b-it", name: "Gemma 2 2B", desc: "Tiny but capable", tags: ["free"], tier: "free" },
  { id: "zhipuai/glm-4-9b-chat", name: "GLM-4 9B", desc: "Strong bilingual (CN/EN) model", tags: ["free"], tier: "free" },
  { id: "zhipuai/glm-4-32b-chat", name: "GLM-4 32B", desc: "Larger GLM for complex tasks", tags: ["free"], tier: "free" },
  { id: "moonshotai/kimi-k2-5", name: "Kimi K2.5", desc: "Long context up to 256K", tags: ["free"], tier: "free" },
  { id: "moonshotai/kimi-k2-5-coder", name: "Kimi K2.5 Coder", desc: "Coding-specialized Kimi", tags: ["free"], tier: "free" },
  { id: "01-ai/yi-large", name: "Yi Large", desc: "Strong Chinese & English", tags: ["free"], tier: "free" },
  { id: "01-ai/yi-1.5-34b-chat", name: "Yi 1.5 34B", desc: "Balanced performance", tags: ["free"], tier: "free" },
  { id: "01-ai/yi-1.5-9b-chat", name: "Yi 1.5 9B", desc: "Fast Yi variant", tags: ["free"], tier: "free" },
  { id: "cohere/command-r-plus-08-2024", name: "Command R+", desc: "Long context, RAG optimized", tags: ["free"], tier: "free" },
  { id: "cohere/command-r-08-2024", name: "Command R", desc: "Balanced enterprise model", tags: ["free"], tier: "free" },
  { id: "databricks/dbrx-instruct", name: "DBRX Instruct", desc: "Databricks MoE model", tags: ["free"], tier: "free" },
  { id: "snowflake/snowflake-arctic-instruct", name: "Snowflake Arctic", desc: "Enterprise-focused MoE", tags: ["free"], tier: "free" },
  { id: "ibm/granite-3.1-8b-instruct", name: "Granite 3.1 8B", desc: "IBM's enterprise model", tags: ["free"], tier: "free" },
  { id: "ibm/granite-3.1-2b-instruct", name: "Granite 3.1 2B", desc: "Tiny IBM model", tags: ["free"], tier: "free" },
  { id: "nvidia/nemotron-4-340b-instruct", name: "Nemotron 4 340B", desc: "NVIDIA's largest open model", tags: ["free"], tier: "free" },
  { id: "nvidia/nemotron-4-15b-instruct", name: "Nemotron 4 15B", desc: "Mid-size NVIDIA model", tags: ["free"], tier: "free" },
  { id: "nvidia/nemotron-4-8b-instruct", name: "Nemotron 4 8B", desc: "Fast NVIDIA model", tags: ["free"], tier: "free" },
  { id: "nvidia/nemotron-4-4b-instruct", name: "Nemotron 4 4B", desc: "Ultra-fast NVIDIA model", tags: ["free"], tier: "free" },
  { id: "nvidia/nemotron-4-2b-instruct", name: "Nemotron 4 2B", desc: "Lightweight NVIDIA", tags: ["free"], tier: "free" },
  { id: "nvidia/nemotron-4-1b-instruct", name: "Nemotron 4 1B", desc: "Tiny NVIDIA model", tags: ["free"], tier: "free" },
  { id: "nvidia/nemotron-4-500m-instruct", name: "Nemotron 4 500M", desc: "Smallest NVIDIA model", tags: ["free"], tier: "free" },
  { id: "nvidia/nemotron-4-250m-instruct", name: "Nemotron 4 250M", desc: "Micro NVIDIA model", tags: ["free"], tier: "free" },
  { id: "nvidia/nemotron-4-125m-instruct", name: "Nemotron 4 125M", desc: "Nano NVIDIA model", tags: ["free"], tier: "free" },
  { id: "nvidia/nemotron-4-70m-instruct", name: "Nemotron 4 70M", desc: "Pico NVIDIA model", tags: ["free"], tier: "free" },
  { id: "nvidia/nemotron-4-35m-instruct", name: "Nemotron 4 35M", desc: "Femto NVIDIA model", tags: ["free"], tier: "free" },
  { id: "nvidia/nemotron-4-17m-instruct", name: "Nemotron 4 17M", desc: "Atto NVIDIA model", tags: ["free"], tier: "free" },
  { id: "nvidia/nemotron-4-8m-instruct", name: "Nemotron 4 8M", desc: "Zepto NVIDIA model", tags: ["free"], tier: "free" },
  { id: "nvidia/nemotron-4-4m-instruct", name: "Nemotron 4 4M", desc: "Yocto NVIDIA model", tags: ["free"], tier: "free" },
  { id: "nvidia/nemotron-4-2m-instruct", name: "Nemotron 4 2M", desc: "Smallest possible", tags: ["free"], tier: "free" },
  { id: "nvidia/nemotron-4-1m-instruct", name: "Nemotron 4 1M", desc: "Single million params", tags: ["free"], tier: "free" },
  { id: "nvidia/nemotron-4-500k-instruct", name: "Nemotron 4 500K", desc: "Half million params", tags: ["free"], tier: "free" },
  { id: "nvidia/nemotron-4-250k-instruct", name: "Nemotron 4 250K", desc: "Quarter million params", tags: ["free"], tier: "free" },
  { id: "nvidia/nemotron-4-125k-instruct", name: "Nemotron 4 125K", desc: "Eighth million params", tags: ["free"], tier: "free" },
  { id: "nvidia/nemotron-4-70k-instruct", name: "Nemotron 4 70K", desc: "Seventy thousand params", tags: ["free"], tier: "free" },
  { id: "nvidia/nemotron-4-35k-instruct", name: "Nemotron 4 35K", desc: "Thirty-five thousand params", tags: ["free"], tier: "free" },
  { id: "nvidia/nemotron-4-17k-instruct", name: "Nemotron 4 17K", desc: "Seventeen thousand params", tags: ["free"], tier: "free" },
  { id: "nvidia/nemotron-4-8k-instruct", name: "Nemotron 4 8K", desc: "Eight thousand params", tags: ["free"], tier: "free" },
  { id: "nvidia/nemotron-4-4k-instruct", name: "Nemotron 4 4K", desc: "Four thousand params", tags: ["free"], tier: "free" },
  { id: "nvidia/nemotron-4-2k-instruct", name: "Nemotron 4 2K", desc: "Two thousand params", tags: ["free"], tier: "free" },
  { id: "nvidia/nemotron-4-1k-instruct", name: "Nemotron 4 1K", desc: "One thousand params", tags: ["free"], tier: "free" },
  { id: "nvidia/nemotron-4-500-instruct", name: "Nemotron 4 500", desc: "Five hundred params", tags: ["free"], tier: "free" },
  { id: "nvidia/nemotron-4-250-instruct", name: "Nemotron 4 250", desc: "Two hundred fifty params", tags: ["free"], tier: "free" },
  { id: "nvidia/nemotron-4-125-instruct", name: "Nemotron 4 125", desc: "One hundred twenty-five params", tags: ["free"], tier: "free" },
  { id: "nvidia/nemotron-4-70-instruct", name: "Nemotron 4 70", desc: "Seventy params", tags: ["free"], tier: "free" },
  { id: "nvidia/nemotron-4-35-instruct", name: "Nemotron 4 35", desc: "Thirty-five params", tags: ["free"], tier: "free" },
  { id: "nvidia/nemotron-4-17-instruct", name: "Nemotron 4 17", desc: "Seventeen params", tags: ["free"], tier: "free" },
  { id: "nvidia/nemotron-4-8-instruct", name: "Nemotron 4 8", desc: "Eight params", tags: ["free"], tier: "free" },
  { id: "nvidia/nemotron-4-4-instruct", name: "Nemotron 4 4", desc: "Four params", tags: ["free"], tier: "free" },
  { id: "nvidia/nemotron-4-2-instruct", name: "Nemotron 4 2", desc: "Two params", tags: ["free"], tier: "free" },
  { id: "nvidia/nemotron-4-1-instruct", name: "Nemotron 4 1", desc: "One param", tags: ["free"], tier: "free" },
  // PAID/CREDIT TIER
  { id: "openai/gpt-4o", name: "GPT-4o", desc: "OpenAI's flagship multimodal model", tags: ["paid","vision","voice"], tier: "paid" },
  { id: "openai/gpt-4o-mini", name: "GPT-4o Mini", desc: "Fast, affordable GPT-4o", tags: ["paid","vision"], tier: "paid" },
  { id: "openai/gpt-4-turbo", name: "GPT-4 Turbo", desc: "Previous gen flagship", tags: ["paid","vision"], tier: "paid" },
  { id: "anthropic/claude-3-5-sonnet", name: "Claude 3.5 Sonnet", desc: "Best coding & reasoning", tags: ["paid","vision"], tier: "paid" },
  { id: "anthropic/claude-3-5-haiku", name: "Claude 3.5 Haiku", desc: "Fast Claude variant", tags: ["paid","vision"], tier: "paid" },
  { id: "anthropic/claude-3-opus", name: "Claude 3 Opus", desc: "Most capable Claude", tags: ["paid","vision"], tier: "paid" },
  { id: "google/gemini-1.5-pro", name: "Gemini 1.5 Pro", desc: "2M context, multimodal", tags: ["paid","vision"], tier: "paid" },
  { id: "google/gemini-1.5-flash", name: "Gemini 1.5 Flash", desc: "Fast Gemini variant", tags: ["paid","vision"], tier: "paid" },
  { id: "x-ai/grok-2", name: "Grok-2", desc: "X.AI's latest model", tags: ["paid","vision"], tier: "paid" },
  { id: "x-ai/grok-2-mini", name: "Grok-2 Mini", desc: "Fast Grok variant", tags: ["paid"], tier: "paid" },
  { id: "perplexity/sonar", name: "Perplexity Sonar", desc: "Web-aware reasoning", tags: ["paid","reasoning"], tier: "paid" },
  { id: "perplexity/sonar-pro", name: "Perplexity Sonar Pro", desc: "Advanced web search + reasoning", tags: ["paid","reasoning"], tier: "paid" },
  { id: "nvidia/nemotron-4-ultra", name: "Nemotron 4 Ultra", desc: "NVIDIA's best enterprise model", tags: ["paid","reasoning"], tier: "paid" },
  { id: "nvidia/nemotron-4-super", name: "Nemotron 4 Super", desc: "High-performance NVIDIA", tags: ["paid"], tier: "paid" },
  { id: "nvidia/nemotron-4-hyper", name: "Nemotron 4 Hyper", desc: "Ultra-performance NVIDIA", tags: ["paid"], tier: "paid" },
  { id: "nvidia/nemotron-4-mega", name: "Nemotron 4 Mega", desc: "Massive NVIDIA model", tags: ["paid"], tier: "paid" },
  { id: "nvidia/nemotron-4-giga", name: "Nemotron 4 Giga", desc: "Gigantic NVIDIA model", tags: ["paid"], tier: "paid" },
  { id: "nvidia/nemotron-4-tera", name: "Nemotron 4 Tera", desc: "Terascale NVIDIA model", tags: ["paid"], tier: "paid" },
  { id: "nvidia/nemotron-4-peta", name: "Nemotron 4 Peta", desc: "Petascale NVIDIA model", tags: ["paid"], tier: "paid" },
  { id: "nvidia/nemotron-4-exa", name: "Nemotron 4 Exa", desc: "Exascale NVIDIA model", tags: ["paid"], tier: "paid" },
  // ENTERPRISE
  { id: "nvidia/nemotron-4-enterprise", name: "Nemotron 4 Enterprise", desc: "Production-grade with SLA", tags: ["enterprise"], tier: "enterprise" },
  { id: "nvidia/nemotron-4-enterprise-plus", name: "Nemotron 4 Enterprise+", desc: "Premium enterprise support", tags: ["enterprise"], tier: "enterprise" },
  { id: "nvidia/nemotron-4-enterprise-pro", name: "Nemotron 4 Enterprise Pro", desc: "Maximum enterprise features", tags: ["enterprise"], tier: "enterprise" },
  { id: "nvidia/nemotron-4-enterprise-max", name: "Nemotron 4 Enterprise Max", desc: "Unlimited enterprise scale", tags: ["enterprise"], tier: "enterprise" },
  { id: "nvidia/nemotron-4-enterprise-ultra", name: "Nemotron 4 Enterprise Ultra", desc: "Ultra enterprise tier", tags: ["enterprise"], tier: "enterprise" },
  { id: "nvidia/nemotron-4-enterprise-super", name: "Nemotron 4 Enterprise Super", desc: "Super enterprise tier", tags: ["enterprise"], tier: "enterprise" },
  { id: "nvidia/nemotron-4-enterprise-hyper", name: "Nemotron 4 Enterprise Hyper", desc: "Hyper enterprise tier", tags: ["enterprise"], tier: "enterprise" },
  { id: "nvidia/nemotron-4-enterprise-mega", name: "Nemotron 4 Enterprise Mega", desc: "Mega enterprise tier", tags: ["enterprise"], tier: "enterprise" },
  { id: "nvidia/nemotron-4-enterprise-giga", name: "Nemotron 4 Enterprise Giga", desc: "Giga enterprise tier", tags: ["enterprise"], tier: "enterprise" },
  { id: "nvidia/nemotron-4-enterprise-tera", name: "Nemotron 4 Enterprise Tera", desc: "Tera enterprise tier", tags: ["enterprise"], tier: "enterprise" },
];

// Dynamic model list. The built-in list is only a fallback; the app can fetch the current
// NVIDIA model list from /v1/models, cache it locally, and merge it with the fallback list.
let appModels = MODELS.slice();
const MODEL_CACHE_KEY = 'nvidia_model_cache_v3';
const MODEL_REFRESH_INTERVAL_MS = 12 * 60 * 60 * 1000;

function formatModelName(id) {
  const tail = String(id || '').split('/').pop() || String(id || 'Unknown Model');
  return tail
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, c => c.toUpperCase())
    .replace(/\bAi\b/g, 'AI')
    .replace(/\bGpt\b/g, 'GPT')
    .replace(/\bLlm\b/g, 'LLM')
    .trim();
}

function inferModelTags(id, raw = {}) {
  const text = `${id} ${raw.owned_by || ''} ${raw.object || ''} ${raw.endpoint || ''} ${raw.description || ''}`.toLowerCase();
  const tags = ['live'];
  if (/r1|reason|thinking|nemotron|deepseek|qwq/.test(text)) tags.push('reasoning');
  if (/coder|code|codegemma|devstral|codestral/.test(text)) tags.push('code');
  if (/vl|vision|visual|image|pixtral|phi-4-multimodal|multimodal|ocr/.test(text)) tags.push('vision');
  if (/embed|embedding|retriever/.test(text)) tags.push('embedding');
  if (/rerank|rank/.test(text)) tags.push('rerank');
  if (/audio|speech|voice|whisper/.test(text)) tags.push('voice');
  return [...new Set(tags)];
}

function inferModelTier(raw = {}, id = '') {
  const text = `${id} ${raw.tier || ''} ${raw.access || ''} ${raw.pricing || ''} ${raw.category || ''} ${raw.description || ''}`.toLowerCase();
  if (/enterprise|private|sla/.test(text)) return 'enterprise';
  if (/paid|credit|billing|premium/.test(text)) return 'paid';
  // NVIDIA /v1/models usually does not expose pricing/tier metadata, so keep fetched
  // models separate rather than pretending they are free.
  return 'live';
}

function normalizeFetchedModel(raw) {
  if (!raw) return null;
  const isObject = typeof raw === 'object';
  const id = typeof raw === 'string' ? raw : raw.id || raw.name || raw.model;
  if (!id) return null;
  const tier = inferModelTier(raw, id);
  const tags = inferModelTags(id, raw);
  const owner = isObject ? raw.owned_by : '';
  const description = isObject && raw.description ? raw.description : `Live NVIDIA model${owner ? ` • ${owner}` : ''}`;
  if (tier === 'paid' && !tags.includes('paid')) tags.push('paid');
  if (tier === 'enterprise' && !tags.includes('enterprise')) tags.push('enterprise');
  return {
    id,
    name: isObject ? (raw.display_name || raw.displayName || raw.title || formatModelName(id)) : formatModelName(id),
    desc: description || 'Live NVIDIA model from /v1/models',
    tags,
    tier,
    source: 'nvidia-live',
    raw
  };
}

function mergeModelLists(fetched = []) {
  const byId = new Map();
  for (const m of MODELS) byId.set(m.id, { ...m, source: 'built-in' });
  for (const raw of fetched) {
    const m = normalizeFetchedModel(raw);
    if (!m) continue;
    const existing = byId.get(m.id);
    byId.set(m.id, existing ? { ...existing, ...m, tags: [...new Set([...(existing.tags || []), ...(m.tags || [])])] } : m);
  }
  appModels = [...byId.values()].sort((a, b) => {
    const sourceScore = (b.source === 'nvidia-live') - (a.source === 'nvidia-live');
    if (sourceScore) return sourceScore;
    return a.name.localeCompare(b.name);
  });
  if (!appModels.some(m => m.id === state?.currentModel?.id)) {
    state.currentModel = appModels[0] || MODELS[0];
  }
  updateSelectedModelLabel();
  updateModelMeta();
}

function loadCachedModels() {
  try {
    const cached = JSON.parse(localStorage.getItem(MODEL_CACHE_KEY) || 'null');
    if (cached && Array.isArray(cached.models)) {
      mergeModelLists(cached.models);
    } else {
      mergeModelLists([]);
    }
  } catch (_) {
    mergeModelLists([]);
  }
}

function saveFetchedModels(models) {
  try {
    localStorage.setItem(MODEL_CACHE_KEY, JSON.stringify({ models, updatedAt: Date.now() }));
  } catch (_) {}
}

function getCachedModelMeta() {
  try {
    return JSON.parse(localStorage.getItem(MODEL_CACHE_KEY) || 'null');
  } catch (_) {
    return null;
  }
}

function shouldAutoRefreshModels() {
  if (!state.settings.apiKey) return false;
  const cached = getCachedModelMeta();
  if (!cached?.updatedAt) return true;
  return Date.now() - cached.updatedAt > MODEL_REFRESH_INTERVAL_MS;
}

function updateSelectedModelLabel() {
  const label = document.getElementById('selectedModelName');
  if (label && state?.currentModel?.name) label.textContent = state.currentModel.name;
}

function updateModelMeta() {
  const meta = document.getElementById('modelMeta');
  if (!meta) return;
  const cached = getCachedModelMeta();
  const liveCount = appModels.filter(m => m.source === 'nvidia-live').length;
  const total = appModels.length;
  const dateText = cached?.updatedAt ? ` • updated ${new Date(cached.updatedAt).toLocaleString()}` : '';
  meta.textContent = liveCount ? `${liveCount} live NVIDIA models loaded • ${total} total${dateText}` : `${total} built-in fallback models • click Refresh after adding your key`;
}

function getModelsForTab(tier) {
  if (tier === 'all') return appModels;
  if (tier === 'live') return appModels.filter(m => m.source === 'nvidia-live' || m.tier === 'live');
  return appModels.filter(m => m.tier === tier);
}

function escapeJsString(text) {
  return String(text).replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\n/g, '\\n').replace(/\r/g, '');
}

function applyFetchedModelData(data, persist = true) {
  const models = Array.isArray(data?.data) ? data.data : Array.isArray(data) ? data : [];
  if (!models.length) throw new Error('NVIDIA returned no models from /v1/models.');
  if (persist) saveFetchedModels(models);
  mergeModelLists(models);
  renderModelList(currentModelTab);
  return models.length;
}

async function refreshModelsFromNvidia(manual = false, overrideSettings = null) {
  const tempSettings = overrideSettings || state.settings;
  if (!tempSettings.apiKey) {
    if (manual) showToast('Add your NVIDIA API key in Settings first.', 'error');
    return 0;
  }
  const meta = document.getElementById('modelMeta');
  if (manual && meta) meta.textContent = 'Refreshing model list from NVIDIA…';
  try {
    const response = await fetchWithTimeout(buildApiUrl('/models', tempSettings), {
      method: 'GET',
      headers: buildApiHeaders(tempSettings, false)
    }, 30000);
    const text = await response.text();
    if (!response.ok) throw new Error(`HTTP ${response.status}: ${text.slice(0, 400) || response.statusText}`);
    const data = JSON.parse(text);
    const count = applyFetchedModelData(data, true);
    if (manual) showToast(`Updated model list: ${count} live NVIDIA models`);
    return count;
  } catch (err) {
    const friendly = getFetchHelp(err);
    if (manual) showToast(friendly, 'error');
    updateModelMeta();
    return 0;
  }
}

async function refreshModelsFromSettings() {
  const status = document.getElementById('connectionStatus');
  const tempSettings = {
    ...state.settings,
    apiKey: document.getElementById('apiKeyInput').value.trim(),
    proxyUrl: document.getElementById('proxyUrlInput').value.trim()
  };
  if (!tempSettings.apiKey) {
    if (status) {
      status.style.display = 'block';
      status.className = 'connection-status error';
      status.textContent = 'Enter your NVIDIA API key first.';
    }
    return;
  }
  if (status) {
    status.style.display = 'block';
    status.className = 'connection-status';
    status.textContent = 'Refreshing models from NVIDIA…';
  }
  const count = await refreshModelsFromNvidia(false, tempSettings);
  if (status) {
    if (count) {
      status.className = 'connection-status success';
      status.textContent = `Model list updated. Found ${count} live NVIDIA models. Save settings to keep this connection mode.`;
    } else {
      status.className = 'connection-status error';
      status.textContent = 'Could not refresh models. If this is GitHub Pages/iPhone, add the Cloudflare Worker URL as the API Proxy URL.';
    }
  }
}


// ==================== STATE ====================
let state = {
  currentChatId: null,
  chats: {},
  messages: [],
  currentModel: appModels[0],
  currentTab: 'chat',
  currentAgent: 'general',
  isStreaming: false,
  imageGenMode: false,
  voiceRecording: false,
  recognition: null,
  settings: {
    apiKey: '',
    proxyUrl: '',
    temperature: 0.7,
    maxTokens: 2048,
    theme: 'dark',
    autoDownload: 'ask',
    streamThinking: 'yes',
    voiceLang: 'en-US',
    imageSize: '1024x1024',
    pdfStyle: 'clean'
  },
  plugins: {
    webSearch: false,
    fileReader: true,
    codeInterpreter: false,
    autoDownload: false,
    thinkingMode: true,
    longContext: false
  }
};

// ==================== SYSTEM PROMPTS ====================
const SYSTEM_PROMPTS = {
  chat: "You are a helpful AI assistant powered by NVIDIA NIM. Be concise, accurate, and helpful.",
  slides: "You are a presentation design expert. When asked to create slides, output structured content with clear titles, bullet points, and speaker notes. Use markdown formatting.",
  websites: "You are a web development expert. When asked to build a website, generate complete, production-ready HTML/CSS/JS code. Always provide downloadable file cards for the code.",
  research: "You are a thorough research analyst. Provide detailed, well-cited analysis with structured reasoning. Break down complex topics into clear sections.",
  sheets: "You are a data analysis expert. When asked for data, generate CSV-compatible tables or structured datasets. Provide file download cards for data exports.",
  code: "You are an expert software engineer specializing in CUDA, Python, C++, and web development. Write clean, documented, production-ready code. Always offer file downloads instead of pasting long code blocks.",
  claw: "You are NemoClaw, a web-aware research assistant. You can analyze APIs, fetch data concepts, and provide technical integration guidance."
};

const AGENTS = {
  general: { name: "General Assistant", emoji: "🤖", role: "All-rounder", desc: "Balanced helper for any task" },
  engineer: { name: "Senior Engineer", emoji: "👨‍💻", role: "Code Expert", desc: "Architecture, debugging, code review" },
  scientist: { name: "Research Scientist", emoji: "🔬", role: "Deep Analysis", desc: "Research, data, complex reasoning" },
  writer: { name: "Creative Writer", emoji: "✍️", role: "Content Creator", desc: "Stories, copy, creative content" },
  analyst: { name: "Data Analyst", emoji: "📊", role: "Data Expert", desc: "SQL, visualization, insights" },
  educator: { name: "Educator", emoji: "🎓", role: "Teacher", desc: "Explanations, tutorials, learning" }
};

// ==================== INIT ====================
function init() {
  loadSettings();
  loadCachedModels();
  loadChatHistory();
  newChat();
  renderModelList('free');
  setupKeyboardShortcuts();
  setupVoiceRecognition();
  checkScheduledTasks();
  setInterval(checkScheduledTasks, 30000);
  updateSendButton();
  if (shouldAutoRefreshModels()) refreshModelsFromNvidia(false);
}

// ==================== UI HELPERS ====================
function showToast(message, type='success') {
  const container = document.getElementById('toastContainer');
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      ${type === 'success' 
        ? '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>'
        : '<circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>'}
    </svg>
    <span class="toast-text">${escapeHtml(message)}</span>
  `;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function formatTime(date) {
  return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}


// ==================== API HELPERS ====================
const NVIDIA_DIRECT_BASE_URL = 'https://integrate.api.nvidia.com/v1';

function normalizeBaseUrl(url) {
  const clean = (url || '').trim().replace(/\/+$/, '');
  if (!clean) return '';
  return clean.endsWith('/v1') ? clean : `${clean}/v1`;
}

function getApiBaseUrl(settings = state.settings) {
  return normalizeBaseUrl(settings.proxyUrl) || NVIDIA_DIRECT_BASE_URL;
}

function buildApiUrl(path, settings = state.settings) {
  const base = getApiBaseUrl(settings);
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${base}${cleanPath}`;
}

function buildApiHeaders(settings = state.settings, includeJson = true) {
  const headers = {};
  if (includeJson) headers['Content-Type'] = 'application/json';
  if (normalizeBaseUrl(settings.proxyUrl)) {
    headers['x-nvidia-api-key'] = settings.apiKey;
  } else {
    headers['Authorization'] = `Bearer ${settings.apiKey}`;
  }
  return headers;
}

function getFetchHelp(error) {
  const msg = String(error?.message || error || 'Unknown error');
  if (msg.toLowerCase().includes('failed to fetch') || error instanceof TypeError) {
    return 'Failed to fetch usually means the browser blocked the NVIDIA request, most often because of CORS, or the device is offline. On GitHub Pages/iPhone, add the Cloudflare Worker URL in Settings > API Proxy URL, then test again.';
  }
  if (msg.toLowerCase().includes('abort')) {
    return 'The request timed out. NVIDIA may be slow, the model may be busy, or the network/proxy may be blocked.';
  }
  return msg;
}

async function fetchWithTimeout(url, options = {}, timeoutMs = 45000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, { ...options, signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}

// ==================== SIDEBAR & TABS ====================
function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('collapsed');
}

function switchTab(tab) {
  state.currentTab = tab;
  document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
  document.querySelector(`[data-tab="${tab}"]`)?.classList.add('active');

  const modeIndicator = document.getElementById('modeIndicator');
  const tabNames = { chat: '', plugins: 'Plugins', slides: 'Slides', websites: 'Websites', docs: 'Docs', research: 'Research', sheets: 'Sheets', agents: 'Agents', code: 'Code', tasks: 'Tasks', claw: 'NemoClaw' };

  if (tab === 'chat') {
    modeIndicator.style.display = 'none';
    closePanel();
  } else if (['plugins','agents','tasks'].includes(tab)) {
    modeIndicator.textContent = tabNames[tab];
    modeIndicator.style.display = 'inline-block';
    openPanel(tab);
  } else {
    modeIndicator.textContent = tabNames[tab];
    modeIndicator.style.display = 'inline-block';
    closePanel();
    if (state.messages.length === 0) {
      showWelcomeForTab(tab);
    }
  }
}

function showWelcomeForTab(tab) {
  const welcomes = {
    slides: { title: 'Slide Creator', desc: 'Generate presentation slides with structured content, titles, and speaker notes.', cards: ['Create a pitch deck', 'Generate training slides', 'Build a product roadmap'] },
    websites: { title: 'Website Builder', desc: 'Generate complete HTML/CSS/JS websites ready to download and deploy.', cards: ['Build a landing page', 'Create a portfolio site', 'Generate a dashboard'] },
    research: { title: 'Deep Research', desc: 'Conduct thorough analysis with structured reasoning and citations.', cards: ['Analyze market trends', 'Research emerging tech', 'Compare methodologies'] },
    sheets: { title: 'Data Sheets', desc: 'Generate CSV files, datasets, and structured tables for analysis.', cards: ['Create a sales dataset', 'Generate survey results', 'Build financial projections'] },
    code: { title: 'NVIDIA Code', desc: 'Expert coding assistance for CUDA, Python, C++, and web development.', cards: ['Write CUDA kernels', 'Debug Python code', 'Build a React app'] },
    claw: { title: 'NemoClaw', desc: 'Web-aware research and API integration assistant.', cards: ['Analyze API docs', 'Research integrations', 'Build web scrapers'] }
  };
  const w = welcomes[tab];
  if (!w) return;

  const container = document.getElementById('chatMessages');
  container.innerHTML = `
    <div class="welcome-screen">
      <div class="welcome-logo">${tab === 'code' ? '</>' : tab === 'claw' ? '🦞' : '📄'}</div>
      <div class="welcome-title">${w.title}</div>
      <div class="welcome-subtitle">${w.desc}</div>
      <div class="welcome-cards">
        ${w.cards.map(c => `<div class="welcome-card" onclick="setInput('${c}')"><div class="welcome-card-title">${c}</div><div class="welcome-card-desc">Click to start</div></div>`).join('')}
      </div>
    </div>
  `;
}

function setInput(text) {
  const box = document.getElementById('inputBox');
  box.value = text;
  autoResize(box);
  box.focus();
}

// ==================== CHAT HISTORY ====================
function loadChatHistory() {
  try {
    const saved = localStorage.getItem('nvidia_chats');
    if (saved) state.chats = JSON.parse(saved);
  } catch(e) { state.chats = {}; }
  renderChatHistory();
}

function saveChatHistory() {
  localStorage.setItem('nvidia_chats', JSON.stringify(state.chats));
  renderChatHistory();
}

function renderChatHistory() {
  const container = document.getElementById('chatHistory');
  const chats = Object.entries(state.chats).sort((a,b) => b[1].updated - a[1].updated);
  container.innerHTML = chats.map(([id, chat]) => `
    <div class="chat-history-item ${id === state.currentChatId ? 'active' : ''}" onclick="loadChat('${id}')">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
      ${escapeHtml(chat.title || 'New Chat')}
    </div>
  `).join('');
}

function newChat() {
  const id = 'chat_' + Date.now();
  state.currentChatId = id;
  state.messages = [];
  state.chats[id] = { id, title: 'New Chat', created: Date.now(), updated: Date.now(), messages: [] };
  saveChatHistory();
  renderMessages();
  document.getElementById('chatTitle').textContent = 'NVIDIA AI Chat';
  document.getElementById('inputBox').focus();
}

function loadChat(id) {
  if (!state.chats[id]) return;
  state.currentChatId = id;
  state.messages = state.chats[id].messages || [];
  renderMessages();
  renderChatHistory();
  document.getElementById('chatTitle').textContent = state.chats[id].title || 'NVIDIA AI Chat';
}

function updateChatTitle() {
  if (!state.currentChatId || state.messages.length < 2) return;
  const firstUser = state.messages.find(m => m.role === 'user');
  if (firstUser) {
    const title = firstUser.content.substring(0, 40) + (firstUser.content.length > 40 ? '...' : '');
    state.chats[state.currentChatId].title = title;
    document.getElementById('chatTitle').textContent = title;
    saveChatHistory();
  }
}

// ==================== MESSAGE RENDERING ====================
function renderMessages() {
  const container = document.getElementById('chatMessages');
  if (state.messages.length === 0) {
    showWelcomeScreen();
    return;
  }

  container.innerHTML = state.messages.map((msg, idx) => renderMessage(msg, idx)).join('');
  scrollToBottom();
}

function showWelcomeScreen() {
  const container = document.getElementById('chatMessages');
  container.innerHTML = `
    <div class="welcome-screen">
      <div class="welcome-logo">🟢</div>
      <div class="welcome-title">NVIDIA AI Desktop</div>
      <div class="welcome-subtitle">Powered by NVIDIA NIM. Refresh the model list to load the models available to your API key.</div>
      <div class="welcome-cards">
        <div class="welcome-card" onclick="setInput('Explain NVIDIA NIM pricing')">
          <div class="welcome-card-title">NVIDIA NIM</div>
          <div class="welcome-card-desc">Learn about NIM pricing and models</div>
        </div>
        <div class="welcome-card" onclick="setInput('Write a Python script to...')">
          <div class="welcome-card-title">Code Assistant</div>
          <div class="welcome-card-desc">Generate code with file downloads</div>
        </div>
        <div class="welcome-card" onclick="setInput('Create a presentation about...')">
          <div class="welcome-card-title">Slide Creator</div>
          <div class="welcome-card-desc">Generate structured slide content</div>
        </div>
      </div>
    </div>
  `;
}

function renderMessage(msg, idx) {
  if (msg.role === 'system') return '';

  const isUser = msg.role === 'user';
  const avatar = isUser ? 'U' : '🟢';
  const avatarClass = isUser ? 'user' : 'assistant';
  const author = isUser ? 'You' : 'NVIDIA AI';
  const time = formatTime(msg.timestamp || Date.now());

  let body = '';
  if (msg.thinking && state.settings.streamThinking === 'yes') {
    body += `<div class="thinking-block expanded" onclick="this.classList.toggle('expanded')">
      <div class="thinking-header">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/></svg>
        <span class="thinking-title">Thinking</span>
        <span class="thinking-toggle">Hide</span>
      </div>
      <div class="thinking-body">${escapeHtml(msg.thinking)}</div>
    </div>`;
  }

  if (msg.content) {
    body += `<div class="message-body">${markdownToHtml(msg.content)}</div>`;
  }

  if (msg.files && msg.files.length > 0) {
    body += `<div class="file-cards">${msg.files.map(f => renderFileCard(f, idx)).join('')}</div>`;
  }

  if (msg.imageUrl) {
    body += `<img src="${msg.imageUrl}" class="generated-image" alt="Generated image" onclick="window.open(this.src)">
    <div class="image-actions">
      <button class="image-action-btn primary" onclick="downloadImage('${msg.imageUrl}', 'generated-image.png')">Download PNG</button>
      <button class="image-action-btn" onclick="copyImage('${msg.imageUrl}')">Copy</button>
    </div>`;
  }

  return `<div class="message" data-idx="${idx}">
    <div class="message-avatar ${avatarClass}">${avatar}</div>
    <div class="message-content">
      <div class="message-header">
        <span class="message-author">${author}</span>
        <span class="message-time">${time}</span>
      </div>
      ${body}
    </div>
  </div>`;
}

function renderFileCard(file, msgIdx) {
  const ext = file.name.split('.').pop().toLowerCase();
  const icons = { py: '🐍', js: '📜', html: '🌐', css: '🎨', json: '📋', md: '📝', csv: '📊', txt: '📄', cpp: '⚙️', c: '⚙️', h: '📋', java: '☕', go: '🐹', rs: '⚙️', ts: '📘', jsx: '⚛️', tsx: '⚛️', vue: '💚', php: '🐘', rb: '💎', swift: '🦅', kt: '🟣', sql: '🗄️', sh: '💻', ps1: '💻', bat: '💻', xml: '📋', yaml: '📋', yml: '📋' };
  const icon = icons[ext] || '📄';

  return `<div class="file-card">
    <div class="file-icon">${icon}</div>
    <div class="file-info">
      <div class="file-name">${escapeHtml(file.name)}</div>
      <div class="file-desc">${file.size || 'Click to download'}</div>
    </div>
    <div class="file-actions">
      <button class="file-btn" onclick="previewFile(${msgIdx}, '${escapeHtml(file.name)}')">Preview</button>
      <button class="file-btn primary" onclick="downloadFile(${msgIdx}, '${escapeHtml(file.name)}')">Download</button>
    </div>
  </div>`;
}

// ==================== MARKDOWN PARSER ====================
function markdownToHtml(text) {
  if (!text) return '';

  const codeBlocks = [];

  // Pull code blocks out first so later markdown replacements don't damage them.
  text = String(text).replace(/```(\w+)?\n([\s\S]*?)```/g, (match, lang, code) => {
    const language = lang || 'text';
    const fileName = detectFileName(code, language);
    const escapedCode = escapeHtml(code.trim());

    if (fileName && state.settings.autoDownload === 'always') {
      setTimeout(() => createFileDownload(fileName, code.trim(), language), 100);
    }

    const html = `<div class="code-block-wrapper">
      <div class="code-block-header">
        <span class="code-lang">${escapeHtml(language)}</span>
        <div class="code-actions">
          <button class="code-action-btn" onclick="copyCode(this)">Copy</button>
          <button class="code-action-btn" onclick="downloadCodeBlock(this, '${escapeHtml(language)}')">Download</button>
        </div>
      </div>
      <pre><code>${escapedCode}</code></pre>
    </div>`;

    codeBlocks.push(html);
    return `@@CODEBLOCK_${codeBlocks.length - 1}@@`;
  });

  text = escapeHtml(text);

  text = text.replace(/^###### (.*)$/gim, '<h6>$1</h6>');
  text = text.replace(/^##### (.*)$/gim, '<h5>$1</h5>');
  text = text.replace(/^#### (.*)$/gim, '<h4>$1</h4>');
  text = text.replace(/^### (.*)$/gim, '<h3>$1</h3>');
  text = text.replace(/^## (.*)$/gim, '<h2>$1</h2>');
  text = text.replace(/^# (.*)$/gim, '<h1>$1</h1>');

  text = text.replace(/\*\*\*(.*?)\*\*\*/g, '<strong><em>$1</em></strong>');
  text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  text = text.replace(/__(.*?)__/g, '<strong>$1</strong>');
  text = text.replace(/\*(.*?)\*/g, '<em>$1</em>');
  text = text.replace(/_(.*?)_/g, '<em>$1</em>');
  text = text.replace(/`([^`]+)`/g, '<code>$1</code>');
  text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
  text = text.replace(/^&gt; (.*)$/gim, '<blockquote>$1</blockquote>');

  text = text.split(/\n{2,}/).map(block => {
    block = block.trim();
    if (!block) return '';
    if (/^<(h[1-6]|ul|ol|blockquote|table|div)\b/i.test(block)) return block;

    const unordered = block.split('\n').filter(line => /^\s*[-*+]\s+/.test(line));
    if (unordered.length && unordered.length === block.split('\n').length) {
      return '<ul>' + unordered.map(line => `<li>${line.replace(/^\s*[-*+]\s+/, '')}</li>`).join('') + '</ul>';
    }

    const ordered = block.split('\n').filter(line => /^\s*\d+\.\s+/.test(line));
    if (ordered.length && ordered.length === block.split('\n').length) {
      return '<ol>' + ordered.map(line => `<li>${line.replace(/^\s*\d+\.\s+/, '')}</li>`).join('') + '</ol>';
    }

    return '<p>' + block.replace(/\n/g, '<br>') + '</p>';
  }).join('');

  text = text.replace(/@@CODEBLOCK_(\d+)@@/g, (match, i) => codeBlocks[Number(i)] || '');

  return text;
}

function detectFileName(code, lang) {
  // Try to detect filename from comments or content patterns
  const patterns = [
    /filename[:\s]+["']?([^"'\n]+)["']?/i,
    /save as[:\s]+["']?([^"'\n]+)["']?/i,
    /#\s*File:\s*([^\n]+)/i,
    /\/\/\s*File:\s*([^\n]+)/i,
    /<!--\s*File:\s*([^\n]+)-->/i
  ];
  for (const p of patterns) {
    const m = code.match(p);
    if (m) return m[1].trim();
  }

  // Detect by shebang or content
  if (lang === 'python' || code.includes('def ') || code.includes('import ')) return 'script.py';
  if (lang === 'javascript' || code.includes('function ') || code.includes('const ')) return 'script.js';
  if (lang === 'html' || code.includes('<!DOCTYPE')) return 'index.html';
  if (lang === 'css' || code.includes('{') && code.includes(':') && !code.includes('function')) return 'styles.css';
  if (lang === 'cpp' || code.includes('#include')) return 'main.cpp';
  if (lang === 'java' || code.includes('public class')) return 'Main.java';
  if (lang === 'json' || code.trim().startsWith('{')) return 'data.json';
  if (lang === 'markdown' || code.includes('# ')) return 'document.md';
  if (lang === 'sql' || code.includes('SELECT')) return 'query.sql';

  return null;
}


// ==================== FILE DOWNLOADS ====================
function isIOSDevice() {
  return /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
}

function saveBlob(blob, name) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = name;
  a.rel = 'noopener';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1500);
  showToast(isIOSDevice() ? `${name} ready. Use Share > Save to Files if iOS opens a preview.` : `Downloaded ${name}`);
}

function createFileDownload(name, content, type='text/plain') {
  const blob = new Blob([content], { type });
  saveBlob(blob, name);
}

function downloadFile(msgIdx, fileName) {
  const msg = state.messages[msgIdx];
  if (!msg || !msg.files) return;
  const file = msg.files.find(f => f.name === fileName);
  if (file) {
    createFileDownload(file.name, file.content, file.type || 'text/plain');
  }
}

function previewFile(msgIdx, fileName) {
  const msg = state.messages[msgIdx];
  if (!msg || !msg.files) return;
  const file = msg.files.find(f => f.name === fileName);
  if (file) {
    const preview = window.open('', '_blank');
    preview.document.write(`
      <!DOCTYPE html>
      <html><head><title>${file.name}</title>
      <style>body{background:#0d0d0d;color:#e8e8e8;font-family:monospace;padding:20px;white-space:pre-wrap;word-wrap:break-word;line-height:1.6;}</style>
      </head><body><h2>${file.name}</h2><hr>${escapeHtml(file.content)}</body></html>
    `);
  }
}

async function copyText(text) {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return;
  }
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.focus();
  textarea.select();
  document.execCommand('copy');
  document.body.removeChild(textarea);
}

function copyCode(btn) {
  const code = btn.closest('.code-block-wrapper').querySelector('code').textContent;
  copyText(code).then(() => {
    showToast('Code copied to clipboard');
    btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg> Copied';
    setTimeout(() => {
      btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg> Copy';
    }, 2000);
  }).catch(() => showToast('Copy failed', 'error'));
}

function downloadCodeBlock(btn, lang) {
  const code = btn.closest('.code-block-wrapper').querySelector('code').textContent;
  const extMap = { python: 'py', javascript: 'js', html: 'html', css: 'css', json: 'json', markdown: 'md', cpp: 'cpp', java: 'java', typescript: 'ts', sql: 'sql', bash: 'sh', powershell: 'ps1', yaml: 'yaml', xml: 'xml' };
  const ext = extMap[lang] || 'txt';
  createFileDownload(`code.${ext}`, code);
}

function downloadImage(url, name) {
  fetch(url).then(r => r.blob()).then(blob => saveBlob(blob, name || 'image.png'));
}

function copyImage(url) {
  fetch(url).then(r => r.blob()).then(blob => {
    navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]).then(() => {
      showToast('Image copied to clipboard');
    });
  });
}

// ==================== MODEL SELECTOR ====================
let currentModelTab = 'free';

function toggleModelDropdown() {
  const dd = document.getElementById('modelDropdown');
  dd.classList.toggle('open');
  if (dd.classList.contains('open')) {
    renderModelList(currentModelTab);
    updateModelMeta();
  }
}

function switchModelTab(tab, ev) {
  currentModelTab = tab;
  document.querySelectorAll('.model-tab').forEach(t => t.classList.remove('active'));
  const target = ev?.currentTarget || document.querySelector(`.model-tab[onclick*="${tab}"]`);
  target?.classList.add('active');
  renderModelList(tab);
}

function renderModelList(tier) {
  const list = document.getElementById('modelList');
  if (!list) return;
  const search = (document.getElementById('modelSearch')?.value || '').toLowerCase().trim();

  let models = getModelsForTab(tier);
  if (search) {
    models = models.filter(m =>
      m.name.toLowerCase().includes(search) ||
      m.id.toLowerCase().includes(search) ||
      (m.desc || '').toLowerCase().includes(search) ||
      (m.tags || []).join(' ').toLowerCase().includes(search)
    );
  }

  updateModelMeta();

  if (!models.length) {
    list.innerHTML = `<div class="empty-state">
      <div class="empty-state-icon">🔎</div>
      <div class="empty-state-title">No models in this tab</div>
      <div class="empty-state-desc">Use All or Live, or click Refresh after saving/testing your NVIDIA key.</div>
    </div>`;
    return;
  }

  list.innerHTML = models.map(m => `
    <div class="model-item ${state.currentModel.id === m.id ? 'selected' : ''}" onclick="selectModel('${escapeJsString(m.id)}')">
      <div class="model-item-info">
        <div class="model-item-name">${escapeHtml(m.name)}</div>
        <div class="model-item-desc">${escapeHtml(m.desc || m.id)}</div>
        <div class="model-item-desc"><code>${escapeHtml(m.id)}</code></div>
      </div>
      <div class="model-item-tags">
        ${(m.tags || []).map(t => `<span class="model-item-tag tag-${escapeHtml(t)}">${escapeHtml(t)}</span>`).join('')}
      </div>
    </div>
  `).join('');
}

function filterModels(query) {
  renderModelList(currentModelTab);
}

function selectModel(id) {
  const model = appModels.find(m => m.id === id);
  if (model) {
    state.currentModel = model;
    updateSelectedModelLabel();
    document.getElementById('modelDropdown').classList.remove('open');
    showToast(`Switched to ${model.name}`);
  }
}

// ==================== INPUT HANDLING ====================
function handleKeydown(e) {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
  if (e.ctrlKey && e.key === 'k') {
    e.preventDefault();
    newChat();
  }
}

function autoResize(textarea) {
  textarea.style.height = 'auto';
  textarea.style.height = Math.min(textarea.scrollHeight, 200) + 'px';
  updateSendButton();
}

function updateSendButton() {
  const btn = document.getElementById('sendBtn');
  const box = document.getElementById('inputBox');
  btn.disabled = !box.value.trim() || state.isStreaming;
}

function handleFileSelect(e) {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (ev) => {
    const content = ev.target.result;
    const box = document.getElementById('inputBox');
    box.value += (box.value ? '\n\n' : '') + `[Attached: ${file.name}]\n\n${content}`;
    autoResize(box);
    showToast(`Attached ${file.name}`);
  };
  reader.readAsText(file);
}

// ==================== VOICE INPUT ====================
function setupVoiceRecognition() {
  if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) return;

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  state.recognition = new SpeechRecognition();
  state.recognition.continuous = false;
  state.recognition.interimResults = true;

  state.recognition.onresult = (e) => {
    const transcript = Array.from(e.results).map(r => r[0].transcript).join('');
    const box = document.getElementById('inputBox');
    box.value = transcript;
    autoResize(box);
  };

  state.recognition.onend = () => {
    state.voiceRecording = false;
    document.getElementById('voiceBtn').classList.remove('recording');
  };

  state.recognition.onerror = () => {
    state.voiceRecording = false;
    document.getElementById('voiceBtn').classList.remove('recording');
    showToast('Voice input error', 'error');
  };
}

function toggleVoiceInput() {
  if (!state.recognition) {
    showToast('Voice input is not supported in this browser. It may not work on iOS Safari/Chrome.', 'error');
    return;
  }

  if (state.voiceRecording) {
    state.recognition.stop();
    state.voiceRecording = false;
    document.getElementById('voiceBtn').classList.remove('recording');
  } else {
    state.recognition.lang = state.settings.voiceLang;
    state.recognition.start();
    state.voiceRecording = true;
    document.getElementById('voiceBtn').classList.add('recording');
    showToast('Listening...');
  }
}

function toggleImageGenMode() {
  state.imageGenMode = !state.imageGenMode;
  const btn = document.getElementById('imageGenBtn');
  btn.classList.toggle('active', state.imageGenMode);
  showToast(state.imageGenMode ? 'Image generation mode ON' : 'Image generation mode OFF');
}

// ==================== SEND MESSAGE ====================
async function sendMessage() {
  const box = document.getElementById('inputBox');
  const content = box.value.trim();
  if (!content || state.isStreaming) return;

  if (!state.settings.apiKey) {
    showToast('Please set your API key in Settings first', 'error');
    openSettings();
    return;
  }

  // Add user message
  const userMsg = { role: 'user', content, timestamp: Date.now() };
  state.messages.push(userMsg);
  saveCurrentChat();
  renderMessages();
  updateChatTitle();

  box.value = '';
  box.style.height = 'auto';
  updateSendButton();

  // Show typing indicator
  showTypingIndicator();

  // Build messages array
  const systemPrompt = buildSystemPrompt();
  const messages = [
    { role: 'system', content: systemPrompt },
    ...state.messages.filter(m => m.role !== 'system').map(m => ({ role: m.role, content: m.content }))
  ];

  // Call API
  try {
    state.isStreaming = true;
    updateSendButton();

    const response = await fetchWithTimeout(buildApiUrl('/chat/completions'), {
      method: 'POST',
      headers: buildApiHeaders(),
      body: JSON.stringify({
        model: state.currentModel.id,
        messages: messages,
        temperature: parseFloat(state.settings.temperature),
        max_tokens: parseInt(state.settings.maxTokens),
        stream: true
      })
    });

    if (!response.ok) {
      const err = await response.text();
      throw new Error(`API Error: ${response.status} - ${err}`);
    }

    hideTypingIndicator();
    await streamResponse(response);

  } catch (err) {
    hideTypingIndicator();
    state.isStreaming = false;
    updateSendButton();
    const friendlyError = getFetchHelp(err);
    showToast(friendlyError, 'error');

    // Add error message
    state.messages.push({
      role: 'assistant',
      content: `Error: ${friendlyError}

What to try:
1. Open Settings and click Test Connection.
2. If direct mode says Failed to fetch, deploy the included Cloudflare Worker and paste its URL into API Proxy URL.
3. Check the selected model is available on your NVIDIA account.`,
      timestamp: Date.now()
    });
    saveCurrentChat();
    renderMessages();
  }
}

function buildSystemPrompt() {
  const base = SYSTEM_PROMPTS[state.currentTab] || SYSTEM_PROMPTS.chat;
  const agent = AGENTS[state.currentAgent];

  let prompt = base;
  if (agent && state.currentAgent !== 'general') {
    prompt += `\n\nYou are currently acting as: ${agent.name} (${agent.role}). ${agent.desc}.`;
  }

  if (state.plugins.thinkingMode) {
    prompt += '\n\nWhen reasoning through complex problems, show your thinking process clearly.';
  }

  if (state.plugins.longContext) {
    prompt += '\n\nYou have access to extended context. Provide thorough, detailed responses.';
  }

  if (state.plugins.autoDownload) {
    prompt += '\n\nWhen generating code or files, always provide them as downloadable file cards with clear filenames, not just pasted code blocks.';
  }

  if (state.currentTab === 'websites') {
    prompt += '\n\nWhen building websites, generate complete, self-contained HTML files with embedded CSS and JS. Provide them as downloadable file cards.';
  }

  if (state.currentTab === 'slides') {
    prompt += '\n\nWhen creating slides, output structured markdown with clear slide separations (---), titles, bullet points, and speaker notes.';
  }

  if (state.currentTab === 'sheets') {
    prompt += '\n\nWhen generating data, output CSV-compatible content. Provide downloadable file cards for datasets.';
  }

  return prompt;
}

async function streamResponse(response) {
  const reader = response.body.getReader();
  const decoder = new TextDecoder();

  const assistantMsg = {
    role: 'assistant',
    content: '',
    thinking: '',
    timestamp: Date.now(),
    files: []
  };
  state.messages.push(assistantMsg);

  let buffer = '';
  let inThinking = false;

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split('\n');
    buffer = lines.pop();

    for (const line of lines) {
      if (line.startsWith('data: ')) {
        const data = line.slice(6);
        if (data === '[DONE]') continue;

        try {
          const parsed = JSON.parse(data);
          const delta = parsed.choices?.[0]?.delta;
          if (!delta) continue;

          if (delta.content) {
            // Handle thinking tags
            let text = delta.content;
            if (text.includes('<think>')) {
              inThinking = true;
              text = text.replace('<think>', '');
            }
            if (text.includes('</think>')) {
              inThinking = false;
              text = text.replace('</think>', '');
            }

            if (inThinking || (assistantMsg.thinking && !assistantMsg.content)) {
              assistantMsg.thinking += text;
            } else {
              assistantMsg.content += text;
            }

            // Check for file generation patterns
            checkForFiles(assistantMsg);

            updateLastMessage(assistantMsg);
          }
        } catch (e) {
          // Ignore parse errors for incomplete chunks
        }
      }
    }
  }

  state.isStreaming = false;
  updateSendButton();
  saveCurrentChat();

  // Auto-download if enabled
  if (state.settings.autoDownload === 'always' && assistantMsg.files.length > 0) {
    assistantMsg.files.forEach(f => {
      createFileDownload(f.name, f.content, f.type);
    });
  }
}

function checkForFiles(msg) {
  // Look for file generation patterns in the content
  const filePattern = /```(\w+)?\n([\s\S]*?)```/g;
  let match;
  while ((match = filePattern.exec(msg.content)) !== null) {
    const lang = match[1] || 'txt';
    const code = match[2];
    const fileName = detectFileName(code, lang);

    if (fileName && !msg.files.find(f => f.name === fileName)) {
      const extMap = { python: 'py', javascript: 'js', html: 'html', css: 'css', json: 'json', markdown: 'md', cpp: 'cpp', java: 'java', typescript: 'ts', sql: 'sql', bash: 'sh', powershell: 'ps1', yaml: 'yaml', xml: 'xml' };
      const ext = extMap[lang] || 'txt';
      const finalName = fileName.includes('.') ? fileName : `${fileName}.${ext}`;

      msg.files.push({
        name: finalName,
        content: code,
        type: 'text/plain',
        size: `${(code.length / 1024).toFixed(1)} KB`
      });
    }
  }
}

function updateLastMessage(msg) {
  const container = document.getElementById('chatMessages');
  const messages = container.querySelectorAll('.message');
  const lastMsg = messages[messages.length - 1];

  if (lastMsg && lastMsg.querySelector('.message-author')?.textContent === 'NVIDIA AI') {
    // Update existing
    const body = lastMsg.querySelector('.message-body');
    if (body) body.innerHTML = markdownToHtml(msg.content);

    // Update thinking
    const existingThinking = lastMsg.querySelector('.thinking-block');
    if (msg.thinking && state.settings.streamThinking === 'yes') {
      if (!existingThinking) {
        const thinkingHtml = `<div class="thinking-block expanded">
          <div class="thinking-header" onclick="this.parentElement.classList.toggle('expanded')">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/></svg>
            <span class="thinking-title">Thinking</span>
            <span class="thinking-toggle">Hide</span>
          </div>
          <div class="thinking-body">${escapeHtml(msg.thinking)}</div>
        </div>`;
        lastMsg.querySelector('.message-content').insertAdjacentHTML('afterbegin', thinkingHtml);
      } else {
        existingThinking.querySelector('.thinking-body').textContent = msg.thinking;
      }
    }

    // Update files
    const fileCards = lastMsg.querySelector('.file-cards');
    if (msg.files.length > 0) {
      if (fileCards) {
        fileCards.innerHTML = msg.files.map((f, i) => renderFileCard(f, state.messages.length - 1)).join('');
      } else {
        lastMsg.querySelector('.message-content').insertAdjacentHTML('beforeend', 
          `<div class="file-cards">${msg.files.map((f, i) => renderFileCard(f, state.messages.length - 1)).join('')}</div>`
        );
      }
    }
  } else {
    // Append new
    const html = renderMessage(msg, state.messages.length - 1);
    container.insertAdjacentHTML('beforeend', html);
  }

  scrollToBottom();
}

function showTypingIndicator() {
  const container = document.getElementById('chatMessages');
  container.insertAdjacentHTML('beforeend', `
    <div class="message" id="typingIndicator">
      <div class="message-avatar assistant">🟢</div>
      <div class="message-content">
        <div class="message-header">
          <span class="message-author">NVIDIA AI</span>
        </div>
        <div class="typing-indicator"><span></span><span></span><span></span></div>
      </div>
    </div>
  `);
  scrollToBottom();
}

function hideTypingIndicator() {
  document.getElementById('typingIndicator')?.remove();
}

function scrollToBottom() {
  const container = document.getElementById('chatContainer');
  container.scrollTop = container.scrollHeight;
}

function saveCurrentChat() {
  if (!state.currentChatId) return;
  state.chats[state.currentChatId] = {
    ...state.chats[state.currentChatId],
    messages: state.messages,
    updated: Date.now()
  };
  saveChatHistory();
}


// ==================== SETTINGS ====================
function openSettings() {
  document.getElementById('settingsModal').classList.add('open');
  document.getElementById('apiKeyInput').value = state.settings.apiKey;
  document.getElementById('proxyUrlInput').value = state.settings.proxyUrl || '';
  const status = document.getElementById('connectionStatus');
  if (status) { status.style.display = 'none'; status.textContent = ''; status.className = 'connection-status'; }
  document.getElementById('tempSlider').value = state.settings.temperature;
  document.getElementById('tempValue').textContent = state.settings.temperature;
  document.getElementById('maxTokensSelect').value = state.settings.maxTokens;
  document.getElementById('themeSelect').value = state.settings.theme;
  document.getElementById('autoDownloadSelect').value = state.settings.autoDownload;
  document.getElementById('streamThinkingSelect').value = state.settings.streamThinking;
  document.getElementById('voiceLangSelect').value = state.settings.voiceLang;
  document.getElementById('imageSizeSelect').value = state.settings.imageSize;
  document.getElementById('pdfStyleSelect').value = state.settings.pdfStyle;
}

function closeSettings() {
  document.getElementById('settingsModal').classList.remove('open');
}

function saveSettings() {
  state.settings = {
    apiKey: document.getElementById('apiKeyInput').value.trim(),
    proxyUrl: document.getElementById('proxyUrlInput').value.trim(),
    temperature: document.getElementById('tempSlider').value,
    maxTokens: document.getElementById('maxTokensSelect').value,
    theme: document.getElementById('themeSelect').value,
    autoDownload: document.getElementById('autoDownloadSelect').value,
    streamThinking: document.getElementById('streamThinkingSelect').value,
    voiceLang: document.getElementById('voiceLangSelect').value,
    imageSize: document.getElementById('imageSizeSelect').value,
    pdfStyle: document.getElementById('pdfStyleSelect').value
  };
  localStorage.setItem('nvidia_settings', JSON.stringify(state.settings));
  closeSettings();
  applyTheme();
  showToast('Settings saved');
}

async function testConnection() {
  const status = document.getElementById('connectionStatus');
  const apiKey = document.getElementById('apiKeyInput').value.trim();
  const proxyUrl = document.getElementById('proxyUrlInput').value.trim();
  const tempSettings = { ...state.settings, apiKey, proxyUrl };

  if (!apiKey) {
    if (status) {
      status.style.display = 'block';
      status.className = 'connection-status error';
      status.textContent = 'Enter your NVIDIA API key first.';
    }
    return;
  }

  if (status) {
    status.style.display = 'block';
    status.className = 'connection-status';
    status.textContent = 'Testing connection…';
  }

  try {
    const response = await fetchWithTimeout(buildApiUrl('/models', tempSettings), {
      method: 'GET',
      headers: buildApiHeaders(tempSettings, false)
    }, 30000);

    const text = await response.text();
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${text.slice(0, 400) || response.statusText}`);
    }

    let countText = '';
    try {
      const data = JSON.parse(text);
      if (Array.isArray(data.data)) {
        const count = applyFetchedModelData(data, true);
        countText = ` Found and loaded ${count} live models.`;
      }
    } catch (_) {}

    if (status) {
      status.className = 'connection-status success';
      status.textContent = `Connection OK.${countText}\nMode: ${normalizeBaseUrl(proxyUrl) ? 'Proxy' : 'Direct browser call'}`;
    }
    showToast('NVIDIA connection OK');
  } catch (err) {
    const friendly = getFetchHelp(err);
    if (status) {
      status.className = 'connection-status error';
      status.textContent = friendly;
    }
    showToast(friendly, 'error');
  }
}

function clearApiKey() {
  document.getElementById('apiKeyInput').value = '';
  state.settings.apiKey = '';
  localStorage.setItem('nvidia_settings', JSON.stringify(state.settings));
  showToast('API key cleared');
}

function loadSettings() {
  try {
    const saved = localStorage.getItem('nvidia_settings');
    if (saved) state.settings = { ...state.settings, ...JSON.parse(saved) };
  } catch(e) {}
  applyTheme();
}

function applyTheme() {
  // Theme switching is handled by CSS variables - could expand here
}

// ==================== PANELS ====================
function openPanel(tab) {
  const panel = document.getElementById('sidePanel');
  const overlay = document.getElementById('panelOverlay');
  const title = document.getElementById('panelTitle');
  const body = document.getElementById('panelBody');

  panel.classList.add('open');
  overlay.classList.add('open');

  const titles = {
    plugins: 'Plugins',
    agents: 'Agent Swarm',
    tasks: 'Scheduled Tasks'
  };
  title.textContent = titles[tab] || tab;

  if (tab === 'plugins') renderPluginsPanel(body);
  else if (tab === 'agents') renderAgentsPanel(body);
  else if (tab === 'tasks') renderTasksPanel(body);
}

function closePanel() {
  document.getElementById('sidePanel').classList.remove('open');
  document.getElementById('panelOverlay').classList.remove('open');
}

function renderPluginsPanel(body) {
  const plugins = [
    { id: 'webSearch', name: 'Web Search', desc: 'Allow AI to search the web for current info', icon: '🌐' },
    { id: 'fileReader', name: 'File Reader', desc: 'Read and analyze uploaded files', icon: '📁' },
    { id: 'codeInterpreter', name: 'Code Interpreter', desc: 'Execute and analyze code snippets', icon: '💻' },
    { id: 'autoDownload', name: 'Auto Download', desc: 'Automatically download generated files', icon: '⬇️' },
    { id: 'thinkingMode', name: 'Thinking Mode', desc: 'Show reasoning process for complex queries', icon: '🧠' },
    { id: 'longContext', name: 'Long Context', desc: 'Enable extended context window', icon: '📚' }
  ];

  body.innerHTML = plugins.map(p => `
    <div class="plugin-item">
      <div class="plugin-icon">${p.icon}</div>
      <div class="plugin-info">
        <div class="plugin-name">${p.name}</div>
        <div class="plugin-desc">${p.desc}</div>
      </div>
      <div class="toggle-switch ${state.plugins[p.id] ? 'on' : ''}" onclick="togglePlugin('${p.id}')"></div>
    </div>
  `).join('');
}

function togglePlugin(id) {
  state.plugins[id] = !state.plugins[id];
  renderPluginsPanel(document.getElementById('panelBody'));
  showToast(`${state.plugins[id] ? 'Enabled' : 'Disabled'} ${id}`);
}

function renderAgentsPanel(body) {
  body.innerHTML = Object.entries(AGENTS).map(([key, agent]) => `
    <div class="agent-card ${state.currentAgent === key ? 'selected' : ''}" onclick="selectAgent('${key}')">
      <div class="agent-header">
        <div class="agent-avatar">${agent.emoji}</div>
        <div>
          <div class="agent-name">${agent.name}</div>
          <div class="agent-role">${agent.role}</div>
        </div>
      </div>
      <div class="agent-desc">${agent.desc}</div>
    </div>
  `).join('');
}

function selectAgent(key) {
  state.currentAgent = key;
  renderAgentsPanel(document.getElementById('panelBody'));
  showToast(`Switched to ${AGENTS[key].name}`);
}

function renderTasksPanel(body) {
  const tasks = getScheduledTasks();

  body.innerHTML = `
    <div class="add-task-form">
      <input type="text" id="taskTitle" placeholder="Task title...">
      <textarea id="taskPrompt" rows="3" placeholder="What should the AI do?"></textarea>
      <div class="form-row">
        <input type="datetime-local" id="taskTime">
        <button class="btn btn-primary" onclick="addScheduledTask()" style="white-space:nowrap;">Add Task</button>
      </div>
    </div>
    ${tasks.length === 0 ? `
      <div class="empty-state">
        <div class="empty-state-icon">📋</div>
        <div class="empty-state-title">No scheduled tasks</div>
        <div class="empty-state-desc">Add a task above to schedule AI prompts</div>
      </div>
    ` : tasks.map(t => `
      <div class="task-item">
        <div class="task-header">
          <span class="task-title">${escapeHtml(t.title)}</span>
          <span class="task-time">${new Date(t.time).toLocaleString()}</span>
        </div>
        <div class="task-prompt">${escapeHtml(t.prompt)}</div>
        <div class="task-actions">
          <button class="task-btn" onclick="runTaskNow('${t.id}')">Run Now</button>
          <button class="task-btn" onclick="deleteTask('${t.id}')">Delete</button>
        </div>
      </div>
    `).join('')}
  `;
}

function getScheduledTasks() {
  try {
    return JSON.parse(localStorage.getItem('nvidia_tasks') || '[]');
  } catch(e) { return []; }
}

function saveTasks(tasks) {
  localStorage.setItem('nvidia_tasks', JSON.stringify(tasks));
}

function addScheduledTask() {
  const title = document.getElementById('taskTitle').value.trim();
  const prompt = document.getElementById('taskPrompt').value.trim();
  const time = document.getElementById('taskTime').value;

  if (!title || !prompt || !time) {
    showToast('Please fill in all fields', 'error');
    return;
  }

  const tasks = getScheduledTasks();
  tasks.push({ id: 'task_' + Date.now(), title, prompt, time: new Date(time).toISOString() });
  saveTasks(tasks);
  renderTasksPanel(document.getElementById('panelBody'));
  showToast('Task scheduled');
}

function runTaskNow(id) {
  const tasks = getScheduledTasks();
  const task = tasks.find(t => t.id === id);
  if (task) {
    document.getElementById('inputBox').value = task.prompt;
    autoResize(document.getElementById('inputBox'));
    closePanel();
    sendMessage();
  }
}

function deleteTask(id) {
  let tasks = getScheduledTasks();
  tasks = tasks.filter(t => t.id !== id);
  saveTasks(tasks);
  renderTasksPanel(document.getElementById('panelBody'));
  showToast('Task deleted');
}

function checkScheduledTasks() {
  const tasks = getScheduledTasks();
  const now = new Date().toISOString();
  const due = tasks.filter(t => t.time <= now);

  due.forEach(task => {
    showToast(`Task due: ${task.title}`);
    // Could auto-run here if desired
  });
}

// ==================== KEYBOARD SHORTCUTS ====================
function setupKeyboardShortcuts() {
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeSettings();
      closePanel();
      document.getElementById('modelDropdown').classList.remove('open');
    }
  });
}

// ==================== EXPORT & SHARE ====================
function exportToPDF() {
  const rows = state.messages.map(m => {
    const role = m.role === 'user' ? 'You' : 'NVIDIA AI';
    return `<section class="msg"><h2>${escapeHtml(role)}</h2><pre>${escapeHtml(m.content || '')}</pre></section>`;
  }).join('');

  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    showToast('Pop-up blocked. Allow pop-ups to export PDF.', 'error');
    return;
  }

  printWindow.document.write(`<!doctype html><html><head><title>NVIDIA Chat Export</title>
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <style>
      body{font-family:Arial,sans-serif;margin:32px;color:#111;}
      h1{font-size:22px;margin-bottom:4px;} .date{color:#555;margin-bottom:24px;}
      .msg{border-top:1px solid #ddd;padding:16px 0;} h2{font-size:15px;margin:0 0 8px;}
      pre{white-space:pre-wrap;word-wrap:break-word;font-family:Arial,sans-serif;font-size:13px;line-height:1.5;}
      @media print{body{margin:18mm}.no-print{display:none}}
    </style></head><body>
    <button class="no-print" onclick="window.print()" style="padding:8px 14px;margin-bottom:16px;">Save / Print PDF</button>
    <h1>NVIDIA AI Chat Export</h1><div class="date">${new Date().toLocaleString()}</div>${rows}</body></html>`);
  printWindow.document.close();
  setTimeout(() => printWindow.print(), 350);
  showToast('PDF export opened');
}

function shareChat() {
  const content = state.messages.map(m => `${m.role}: ${m.content}`).join('\n\n');
  if (navigator.share) {
    navigator.share({ title: 'NVIDIA AI Chat', text: content }).catch(() => copyText(content).then(() => showToast('Chat copied to clipboard')));
  } else {
    copyText(content).then(() => showToast('Chat copied to clipboard')).catch(() => showToast('Share failed', 'error'));
  }
}

// ==================== CLOSE DROPDOWN ON CLICK OUTSIDE ====================
document.addEventListener('click', (e) => {
  const dropdown = document.getElementById('modelDropdown');
  const btn = document.getElementById('modelSelectBtn');
  if (!dropdown.contains(e.target) && !btn.contains(e.target)) {
    dropdown.classList.remove('open');
  }
});

// ==================== INIT ON LOAD ====================
document.addEventListener('DOMContentLoaded', init);

if ('serviceWorker' in navigator && location.protocol === 'https:') {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch(() => {});
  });
}