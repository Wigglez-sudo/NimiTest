/* ================================================================
   NViMi AI v5.0.0 — Complete Rebuild
   Premium NVIDIA model chat experience
   ================================================================ */

const APP_VERSION = '5.0.0';
const BUILD_ID = '2026-07-v5-rebuild';
const NVIDIA_DIRECT_BASE = 'https://integrate.api.nvidia.com/v1';
const DEFAULT_PROXY_URL = 'https://nvidia-ai-proxy.lukewai.workers.dev';
const DEFAULT_USER_NAME = 'User';

const STREAM_FIRST_TOKEN_TIMEOUT_MS = 120000;
const NON_STREAM_RETRY_TIMEOUT_MS = 180000;

// ── Storage Keys ───────────────────────────────────────────────
const STORAGE = {
  settings: 'nvidia_ai_v5_settings',
  backup: 'nvidia_ai_v5_backup',
  splash: 'nvidia_ai_v5_onboarded',
  models: 'nvidia_ai_v5_models',
  favs: 'nvidia_ai_v5_favs',
  chats: 'nvidia_ai_v5_chats',
  currentChat: 'nvidia_ai_v5_current',
};

// ── SVG Icons ──────────────────────────────────────────────────
const SEND_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22,2 15,22 11,13 2,9"/></svg>';
const STOP_ICON = '<svg viewBox="0 0 24 24" fill="currentColor"><rect x="7" y="7" width="10" height="10" rx="2"/></svg>';

const ICONS = {
  chat: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>',
  code: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>',
  read: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>',
  text: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>',
  idea: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 1 1 7.072 0l-.548.547A3.374 3.374 0 0 0 14 18.469V19a2 2 0 1 1-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>',
  data: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>',
  web: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>',
  img: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>',
  mic: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>',
  set: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.67 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.67 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.67a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>',
  search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>',
  pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l-5.5 9h11z"/><circle cx="17.5" cy="17.5" r="3.5"/><path d="M3 21.5l5-5"/></svg>',
  trash: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>',
  edit: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>',
  copy: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>',
  refresh: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1 2.12-9.36L23 10"/></svg>',
  download: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>',
  zip: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><polyline points="13 2 13 9 20 9"/><line x1="12" y1="18" x2="12" y2="12"/><line x1="9" y1="15" x2="15" y2="15"/></svg>',
  check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>',
  star: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
  preview: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>',
  open: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>',
  close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',
  plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>',
  activity: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>',
  warning: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
  model: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/></svg>',
  user: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
};

// ── Modes & Agents ─────────────────────────────────────────────
const MODES = [
  { key:'chat', icon:'chat', label:'Chat', short:'General chat', prompt:'You are a helpful AI assistant. Be clear, practical and honest. When code or files are useful, use fenced code blocks with a filename line such as filename: app.js.' },
  { key:'coding', icon:'code', label:'Coding', short:'Code and files', prompt:'You are an expert software engineer. Prioritise working code, exact commands, and debugging. When generating files, use fenced code blocks with filename: path/to/file.ext as the first line.' },
  { key:'research', icon:'read', label:'Research', short:'Deep analysis', prompt:'You are a careful research assistant. Give structured, evidence-aware analysis. Separate facts from assumptions.' },
  { key:'writing', icon:'text', label:'Writing', short:'Docs and emails', prompt:'You are a writing assistant. Improve clarity, tone, grammar and structure.' },
  { key:'creative', icon:'idea', label:'Creative', short:'Ideas and stories', prompt:'You are a creative assistant. Be imaginative, vivid and useful.' },
  { key:'data', icon:'data', label:'Data', short:'CSV, SQL, analysis', prompt:'You are a data analyst. Prefer clear tables, CSV/JSON when requested, and reproducible steps.' },
  { key:'web', icon:'web', label:'Web', short:'HTML, CSS, JS', prompt:'You are a web developer. Produce clean, responsive HTML/CSS/JS with accessible UI patterns.' },
  { key:'images', icon:'img', label:'Images', short:'Vision and prompts', prompt:'You help with image generation prompts and vision workflows.' },
  { key:'voice', icon:'mic', label:'Voice', short:'Dictation-friendly', prompt:'You are a voice-friendly assistant. Keep responses conversational and easy to read aloud.' },
  { key:'custom', icon:'set', label:'Custom', short:'Your own prompt', prompt:'' }
];

const AGENTS = [
  { key:'general', name:'General', role:'Balanced helper', prompt:'' },
  { key:'engineer', name:'Senior Engineer', role:'Code reviewer', prompt:'Act as a senior engineer. Check edge cases and give practical implementation details.' },
  { key:'researcher', name:'Researcher', role:'Careful analyst', prompt:'Act as a cautious researcher. Avoid overclaiming and state uncertainty.' },
  { key:'data', name:'Data Analyst', role:'Tables and analysis', prompt:'Act as a data analyst. Prefer structured outputs, tables, and repeatable analysis.' },
  { key:'creative', name:'Creative', role:'Ideas and writing', prompt:'Act as a creative director. Offer bold options and polished wording.' },
  { key:'teacher', name:'Teacher', role:'Step by step', prompt:'Act as a patient teacher. Explain in plain English and build up step by step.' },
  { key:'security', name:'Security', role:'Safety review', prompt:'Act as a security reviewer. Highlight secrets, unsafe defaults, and injection risks.' }
];

const DEFAULT_PLUGINS = {
  webSearch:false, webSearchProvider:'brave', webSearchApiKey:'', webSearchResults:6,
  webSearchMode:'auto', webSearchSafe:'moderate', fileReader:true, downloadButtons:true,
  preferFileOutputs:true, artifactPreview:true, thinkingDisplay:true, longContext:false,
  codeInterpreter:false
};

const VERIFIED_FREE_SLUGS = new Set([
  "minimax-m3","diffusiongemma-26b-a4b-it","nemotron-3-ultra-550b-a55b","nemotron-3.5-content-safety",
  "cosmos3-nano","cosmos3-nano-reasoner","step-3.7-flash","kimi-k2.6","mistral-medium-3.5-128b",
  "nemotron-3-nano-omni-30b-a3b-reasoning","deepseek-v4-flash","deepseek-v4-pro","glm-5.1",
  "nemotron-3-content-safety","synthetic-video-detector","active-speaker-detection",
  "ising-calibration-1-35b-a3b","minimax-m2.7","gemma-3-31b-it","nemotron-voicechat",
  "qwen3.5-122b-a10b","cosmos-transfer-2.5b","step-3.5-flash","nemotron-3-nano-30b-a3b",
  "mistral-small-4-1-9b-2509","nemotron-3-super-128b-a12b","qwen3.5-397b-a17b",
  "nemotron-content-safety-reasoning-9b","nvidia-nemotron-translate-instruct-v1",
  "riva-translate-instruct-v1","mistral-large-3.675b-instruct-2512","gliner-v1",
  "mistral-14b-instruct-2512","streamer","nemotron-nano-12b-v2",
  "llama-3.1-nemotron-safety-guard-8b-v3","qwen3-next-80b-a3b-thinking",
  "lightcone-preview-instruct","mistral-nemotron-nano-9b-v2","gpt-oss-20b","gpt-oss-120b",
  "llama-3.1-nemotron-super-49b-v1.5","sarvam-m","llama-guard-4-12b",
  "gemma-3n-e4b-it","gemma-3n-e2b-it","cosmos-transfer1-7b","background-noise-removal",
  "mistral-nemotron","llama-3.1-nemotron-nano-vl-8b-v1","magpie-tts-zero-shot",
  "llama-4-maverick-17b-128e-instruct","llama-3.3-nemotron-super-49b-v1",
  "llama-3.1-nemotron-nano-8b-v1","nv-embedcode-7b-v1","phi-4-mini-instruct",
  "phi-4-multimodal-instruct","whisper-large-v3","gemma-7b","llama-3.2-70b-instruct",
  "studio-voice","llama-3.2-3b-instruct","llama-3.2-11b-vision-instruct",
  "llama-3.2-90b-vision-instruct","llama-3.2-1b-instruct",
  "dracarys-llama-3.1-70b-instruct","nemotron-mini-4b-instruct","gemma-2-9b-it",
  "llama-3.1-70b-instruct","llama-3.1-8b-instruct","nv-embed-v1","bloom",
  "paligemma","rerank-qa-mistral-4b","seamlessm4t","mistral-7b-instruct-v0.1"
]);

// ── State ──────────────────────────────────────────────────────
const state = {
  settings: {
    apiKey:'', proxyUrl:DEFAULT_PROXY_URL, userName:DEFAULT_USER_NAME,
    temperature:0.7, maxTokens:32768, stream:true,
    showThinking:true, streamDiagnostics:false, forceReasoning:true, theme:'dark',
    customPrompt:'', plugins:{...DEFAULT_PLUGINS},
    currentMode:'chat', currentAgent:'general', currentModelId:'', recentModelIds:[]
  },
  liveModels:[], favourites:new Set(), currentChat:null, chats:[],
  modelFilter:'all', isBusy:false, activeAbortController:null,
  activeAssistantId:null, stopRequested:false, editingMessageId:null,
  voiceRecognition:null, pendingAttachments:[], openThinking:new Set(),
  chatSearch:'', draftSaveTimer:null, scrollLocked:true,
};

// ── Utilities ──────────────────────────────────────────────────
function uid(p='id'){return `${p}_${Date.now()}_${Math.random().toString(36).slice(2,7)}`;}
function nowTime(){return new Date().toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'});}
function esc(t){return String(t??'').replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));}
function stripSlash(u){return String(u||'').trim().replace(/\/+$/,'');}
function shortText(v,m=800){const t=String(v??'');return t.length>m?t.slice(0,m)+`... (+${t.length-m})`:t;}
function isMobile(){return window.matchMedia('(max-width:768px)').matches;}
function contentStr(v){if(v==null)return'';if(typeof v==='string')return v;if(typeof v==='object')return v.text||v.content||v.value||'';return String(v);}
function toInt(v){const n=Number(v);return Number.isFinite(n)&&n>0?Math.floor(n):0;}
function loadJson(k,f){try{const v=JSON.parse(localStorage.getItem(k)||'null');return v??f;}catch{return f;}}
function saveJson(k,v){try{localStorage.setItem(k,JSON.stringify(v));return true;}catch{return false;}}
function fmtBytes(b){const n=Number(b||0);if(!n)return'0 B';const u=['B','KB','MB'];let v=n,i=0;while(v>=1024&&i<u.length-1){v/=1024;i++;}return`${v.toFixed(v>=10||i===0?0:1)} ${u[i]}`;}

// ── Persistence ────────────────────────────────────────────────
function persistSettings(){saveJson(STORAGE.settings,state.settings);}
function persistFavs(){saveJson(STORAGE.favs,[...state.favourites]);}
function persistModels(){saveJson(STORAGE.models,{models:state.liveModels.map(m=>m.raw||m),updatedAt:Date.now()});}
function persistChats(){
  const clean=state.chats.map(c=>({...c,messages:c.messages.map(m=>({...m,attachments:Array.isArray(m.attachments)?m.attachments.map(a=>{if(a?.kind!=='image')return a;const{dataUrl,...r}=a;return{...r,imageDataPersisted:false};}):m.attachments}))}));
  saveJson(STORAGE.chats,clean);
  if(state.currentChat)localStorage.setItem(STORAGE.currentChat,state.currentChat.id);
}

function loadState(){
  const saved=loadJson(STORAGE.settings,{});
  state.settings={...state.settings,...saved};
  state.settings.plugins={...DEFAULT_PLUGINS,...(state.settings.plugins||{})};
  state.settings.recentModelIds=Array.isArray(state.settings.recentModelIds)?state.settings.recentModelIds.slice(0,5):[];
  if(!state.settings.proxyUrl)state.settings.proxyUrl=DEFAULT_PROXY_URL;
  if(!state.settings.userName)state.settings.userName=DEFAULT_USER_NAME;

  const cache=loadJson(STORAGE.models,{models:[],updatedAt:0});
  state.liveModels=Array.isArray(cache.models)?cache.models.map(normalizeModel).filter(Boolean):[];
  state.favourites=new Set(loadJson(STORAGE.favs,[]));

  state.chats=loadJson(STORAGE.chats,[]);
  normalizeChats();

  const currentId=localStorage.getItem(STORAGE.currentChat);
  state.currentChat=state.chats.find(c=>c.id===currentId)||state.chats[0]||createChat(false);
  applyTheme();
}

function normalizeChats(){
  const seen=new Set();
  state.chats=(Array.isArray(state.chats)?state.chats:[]).filter(c=>{
    if(!c||!c.id||seen.has(c.id))return false;
    seen.add(c.id);
    if(!Array.isArray(c.messages))c.messages=[];
    if(!c.title)c.title='New Chat';
    if(typeof c.draft!=='string')c.draft='';
    return true;
  });
}

// ── Model Helpers ──────────────────────────────────────────────
function formatModelName(id){
  const tail=String(id||'').split('/').pop()||'Unknown';
  return tail.replace(/[-_]+/g,' ').replace(/\b\w/g,l=>l.toUpperCase())
    .replace(/\bAi\b/g,'AI').replace(/\bGpt\b/g,'GPT').trim();
}
function normSlug(v){return String(v||'').toLowerCase().split('/').pop().replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'');}
function isVerifiedFree(id,raw={}){
  const vals=[id,raw.id,raw.modelId,raw.model,raw.slug,raw.catalogSlug,raw.name,raw.title].filter(Boolean);
  for(const v of vals){if(VERIFIED_FREE_SLUGS.has(normSlug(v)))return true;}
  return false;
}

function inferCaps(id,raw={}){
  const text=`${id} ${raw.id||''} ${raw.name||''} ${raw.description||''} ${raw.owned_by||''} ${raw.type||''}`.toLowerCase();
  const caps=new Set(['chat','live']);
  if(/deepseek|\br1\b|qwq|reason|thinking|nemotron/.test(text))caps.add('reasoning');
  if(/coder|coding|code|codestral|devstral|program/.test(text))caps.add('coding');
  if(/vision|visual|vl\b|multimodal|maverick|pixtral/.test(text))caps.add('vision');
  if(/image|stable-diffusion|flux|sdxl/.test(text))caps.add('image');
  if(/speech|audio|voice|whisper|tts|asr/.test(text))caps.add('speech');
  if(/128k|200k|256k|1m|million|long/.test(text))caps.add('long');
  if(/nano|mini|small|fast|flash|7b|8b|9b|12b/.test(text))caps.add('fast');
  if(isVerifiedFree(id,raw)){caps.add('free_endpoint');caps.add('free');}
  if(/paid|credit|partner|premium|pay/.test(text))caps.add('paid');
  return[...caps];
}

function normalizeModel(raw){
  if(!raw)return null;
  const obj=typeof raw==='object'?raw:{id:raw};
  const id=obj.id||obj.name||obj.model||obj.modelId||obj.slug;
  if(!id)return null;
  const caps=inferCaps(id,obj);
  const source=obj.source||(obj.catalogOnly?'catalog':'api');
  if(source==='catalog'&&!caps.includes('catalog'))caps.push('catalog');
  if((source==='api'||source==='api+catalog')&&!caps.includes('api'))caps.push('api');
  return{
    id,name:obj.display_name||obj.displayName||obj.title||obj.name||formatModelName(id),
    desc:obj.description||obj.desc||obj.owned_by||(source==='catalog'?'Catalog model':'Live model'),
    capabilities:[...new Set(caps)],source,
    catalogOnly:!!obj.catalogOnly||source==='catalog',
    raw:obj
  };
}

function getCurrentModel(){return state.liveModels.find(m=>m.id===state.settings.currentModelId)||state.liveModels[0]||null;}
function modelSupportsReasoning(m){if(!m)return false;const t=`${m.id||''} ${m.name||''}`.toLowerCase();return(m.capabilities||[]).includes('reasoning')||/reason|thinking|deepseek|qwen|qwq|glm|nemotron|kimi|gemma-3|gpt-oss/.test(t);}

function modelTokenLimit(m){
  if(!m)return 32768;
  const raw=m.raw||{};
  const cands=[raw.max_output_tokens,raw.maxOutputTokens,raw.max_completion_tokens,raw.maxCompletionTokens,raw.output_token_limit,raw.outputTokenLimit,raw.max_tokens,raw.maxTokens,raw.token_limit,raw.tokenLimit,raw.context_length,raw.contextLength,raw.max_context_length,raw.maxContextLength].map(toInt).filter(Boolean);
  if(!cands.length)return 32768;
  const outLike=cands.filter(v=>v<=131072);
  return Math.max(512,Math.min(...(outLike.length?outLike:cands)));
}

function tokenPresets(limit){
  const cap=Math.max(512,Math.min(131072,toInt(limit)||32768));
  const p=[512,1024,2048,4096,8192,16384,32768,65536,131072];if(!p.includes(cap))p.push(cap);
  return[...new Set(p)].sort((a,b)=>a-b);
}

function renderTokenOpts(limit){
  const cur=Math.max(32768,toInt(state.settings.maxTokens)||0);
  return tokenPresets(limit).map(v=>`<option value="${v}" ${v===cur?'selected':''}>${v.toLocaleString()}</option>`).join('');
}

function syncMaxTokens(){
  const m=getCurrentModel();const limit=modelTokenLimit(m);
  if(toInt(state.settings.maxTokens)>limit){state.settings.maxTokens=limit;persistSettings();}
  return limit;
}

function refreshTokenSelect(){
  const sel=document.getElementById('maxTokensSelect');if(!sel)return;
  const m=getCurrentModel();const limit=modelTokenLimit(m);
  sel.innerHTML=renderTokenOpts(limit);
  const cur=Math.max(32768,toInt(state.settings.maxTokens)||0);
  sel.value=String(Math.min(cur,limit));
}

function reasoningExtras(m){
  if(!state.settings.forceReasoning||!state.settings.showThinking||!modelSupportsReasoning(m))return{};
  const id=`${m.id||''} ${m.name||''}`.toLowerCase();
  const kwargs={enable_thinking:true};
  if(/glm/.test(id))kwargs.clear_thinking=false;
  if(/deepseek/.test(id)||/kimi/.test(id))kwargs.thinking=true;
  const extras={include_reasoning:true,chat_template_kwargs:kwargs};
  if(/nemotron-3|nemotron/.test(id))extras.thinking_token_budget=Math.min(4096,Math.max(512,Math.floor(Number(state.settings.maxTokens||4096)/2)));
  return extras;
}

function modelProfile(m){
  const id=`${m?.id||''} ${m?.name||''}`.toLowerCase();
  return{preferNonStream:/deepseek[-_\s/]*v4[-_\s/]*pro/.test(id),stripReasoningOnFallback:/deepseek/.test(id)};
}

function stripReasoning(p){const{include_reasoning,chat_template_kwargs,thinking_token_budget,...r}=p||{};return r;}

function badgeLabel(c){const map={chat:'Chat',reasoning:'Reasoning',coding:'Coding',vision:'Vision',image:'Image',speech:'Speech',long:'Long Ctx',fast:'Fast',free_endpoint:'Free',free:'Free',paid:'Paid',api:'API',catalog:'Catalog',live:'Live'};return map[c]||c;}
function capHtml(m){
  const order=['free_endpoint','api','reasoning','coding','vision','image','speech','long','fast','catalog'];
  const caps=order.filter(c=>m.capabilities?.includes(c));
  return`<div class="capability-bar">${caps.map(c=>`<span class="capability-tag ${c}">${esc(badgeLabel(c))}</span>`).join('')}</div>`;
}

function buildApiUrl(path){
  const clean=path.startsWith('/v1/')?path:`/v1${path.startsWith('/')?path:`/${path}`}`;
  const proxy=stripSlash(state.settings.proxyUrl);
  return proxy?`${proxy}${clean}`:`${NVIDIA_DIRECT_BASE}${clean.replace(/^\/v1/,'')}`;
}
function apiHeaders(stream=false){
  const h={'Content-Type':'application/json',Accept:stream?'text/event-stream':'application/json',Authorization:`Bearer ${state.settings.apiKey||''}`};
  if(stripSlash(state.settings.proxyUrl))h['X-Nvidia-Api-Key']=state.settings.apiKey||'';
  return h;
}
async function fetchTimeout(url,opts={},t=120000){
  const ctrl=new AbortController();
  const ext=opts.signal;
  const onAbort=()=>ctrl.abort(ext?.reason||'Aborted');
  if(ext?.aborted)onAbort();else ext?.addEventListener?.('abort',onAbort,{once:true});
  const timer=setTimeout(()=>ctrl.abort('Timeout'),t);
  try{return await fetch(url,{...opts,signal:ctrl.signal});}
  finally{clearTimeout(timer);ext?.removeEventListener?.('abort',onAbort);}
}

// ── Chat Functions ─────────────────────────────────────────────
function createChat(persist=true){
  const chat={id:uid('chat'),title:'New Chat',createdAt:Date.now(),messages:[],draft:''};
  state.chats.unshift(chat);
  if(persist)persistChats();
  return chat;
}
function newChat(){
  captureDraft();
  state.currentChat=createChat();
  state.editingMessageId=null;
  state.chatSearch='';
  renderAll();
  restoreDraft();
  focusInput();
}
function selectChat(id){
  const c=state.chats.find(x=>x.id===id);if(!c)return;
  captureDraft();
  state.currentChat=c;state.editingMessageId=null;state.chatSearch='';
  persistChats();renderAll();restoreDraft();
}
function pinChat(id){
  const c=state.chats.find(x=>x.id===id);if(!c)return;
  c.pinned=!c.pinned;persistChats();renderChatHistory();
  showToast(c.pinned?'Pinned':'Unpinned');
}
function renameChat(id){
  const c=state.chats.find(x=>x.id===id);if(!c)return;
  const n=prompt('Rename chat',c.title||'New Chat');if(n===null)return;
  c.title=n.trim().slice(0,80)||'New Chat';persistChats();renderChatHistory();updateTopBar();
}
function deleteChat(id,e){
  e?.preventDefault?.();e?.stopPropagation?.();
  const c=state.chats.find(x=>x.id===id);if(!c)return;
  if(!confirm(`Delete "${c.title||'New Chat'}"?`))return;
  state.chats=state.chats.filter(x=>x.id!==id);
  if(!state.chats.length)state.currentChat=createChat(false);
  else if(state.currentChat?.id===id)state.currentChat=state.chats[0];
  state.editingMessageId=null;persistChats();renderAll();showToast('Deleted');
}
function clearAllChats(){
  if(!confirm('Delete all chats? This cannot be undone.'))return;
  state.chats=[];state.currentChat=createChat(false);state.editingMessageId=null;
  persistChats();renderAll();showToast('All chats deleted');
}
function getMsg(id){return state.currentChat?.messages.find(m=>m.id===id);}
function msgIdx(id){return state.currentChat?.messages.findIndex(m=>m.id===id)??-1;}

// ── Stream Debug ───────────────────────────────────────────────
function ensureDebug(msg,payload=null){
  if(!msg)return null;
  if(!msg.debug)msg.debug={startedAt:Date.now(),request:payload?{model:payload.model,stream:payload.stream,max_tokens:payload.max_tokens}:null,http:{},counters:{chunks:0,sseEvents:0,jsonEvents:0,contentDeltas:0,reasoningDeltas:0,emptyDeltas:0},events:[],rawSamples:[]};
  return msg.debug;
}
function recordEvent(msg,label,details=''){
  const d=ensureDebug(msg);if(!d)return;
  const elapsed=((Date.now()-d.startedAt)/1000).toFixed(1)+'s';
  d.events.push({t:elapsed,label,details:shortText(details,500)});
  if(d.events.length>30)d.events.shift();
}
function recordRaw(msg,sample){
  const d=ensureDebug(msg);if(!d)return;
  const t=shortText(sample,300);if(t.trim()&&d.rawSamples.length<3)d.rawSamples.push(t);
}

function debugSummaryHtml(msg){
  if(!msg?.debug)return'';
  const d=msg.debug,c=d.counters||{};
  const rows=[['Time',((Date.now()-(d.startedAt||Date.now()))/1000).toFixed(1)+'s'],['HTTP',d.http?.status?`${d.http.status}`:'-'],['Content',`${c.contentDeltas||0} chunks`],['Reasoning',`${c.reasoningDeltas||0} chunks`]];
  if(msg.finishReason)rows.push(['Finish',String(msg.finishReason)]);
  return`<div class="activity-grid">${rows.map(([k,v])=>`<div class="activity-grid-item"><span>${esc(k)}</span><strong>${esc(v)}</strong></div>`).join('')}</div>`;
}

function visibleThinking(msg){
  let t=String(msg?.thinking||'');
  if(msg?.content){
    t=t.replace(/Reasoning params were rejected[\s\S]*?(?=\n(?:We have|The user|I |Let's|$)|$)/i,'')
      .replace(/The selected model did not start streaming within \d+ seconds[^\n]*\n?/i,'');
  }
  return t.trim();
}

function thinkingHtml(msg){
  if(!msg||msg.role==='user')return'';
  const thinking=visibleThinking(msg);
  const hasThinking=state.settings.showThinking&&!!thinking;
  const hasContent=state.settings.showThinking&&!!msg.content;
  const hasDebug=!!msg.debug;
  if(!hasThinking&&!hasContent&&!hasDebug)return'';

  const summary=msg.debug?`${((Date.now()-(msg.debug.startedAt||Date.now()))/1000).toFixed(1)}s`:(msg.loading?'thinking':'done');
  let body='';
  if(hasContent)body+=`<div class="thinking-section-label">Content preview</div><div class="thinking-text">${esc(shortText(msg.content,2000))}</div>`;
  if(hasThinking)body+=`<div class="thinking-section-label">Reasoning</div><div class="thinking-text">${esc(thinking)}</div>`;
  if(msg.finishReason==='length')body+=`<div class="finish-warning">Output limit reached. Increase max tokens or ask for a shorter answer.</div>`;
  if(hasDebug)body+=`<div class="thinking-section-label">Stream</div>${debugSummaryHtml(msg)}`;

  const id=msg.id||'';
  const openAttr=id&&state.openThinking?.has(id)?' open':'';
  return`<details class="thinking-panel" data-thinking-id="${esc(id)}"${openAttr}><summary class="thinking-summary"><span class="thinking-icon">AI</span><span class="thinking-title">Activity</span><span class="thinking-status">${esc(summary)}</span></summary><div class="thinking-body">${body}</div></details>`;
}

function appendReasoning(msg,text){
  const v=contentStr(text);if(!v)return false;
  msg.thinking=(msg.thinking||'')+v;return true;
}

function appendContent(msg,text){
  let chunk=contentStr(text);if(!chunk)return false;
  let changed=false;
  while(chunk){
    if(msg._reasoningTag){
      const closeRe=new RegExp(`</${msg._reasoningTag}>`,'i');
      const close=chunk.search(closeRe);
      if(close===-1){msg.thinking=(msg.thinking||'')+chunk;changed=true;return changed;}
      msg.thinking=(msg.thinking||'')+chunk.slice(0,close);
      const cm=chunk.slice(close).match(closeRe);
      chunk=chunk.slice(close+(cm?cm[0].length:0));
      msg._reasoningTag='';changed=true;continue;
    }
    const om=chunk.match(/<(think|thinking|reasoning)>/i);
    if(!om){msg.content=(msg.content||'')+chunk;changed=true;return changed;}
    const before=chunk.slice(0,om.index);
    if(before){msg.content=(msg.content||'')+before;changed=true;}
    msg._reasoningTag=om[1].toLowerCase();
    chunk=chunk.slice(om.index+om[0].length);
  }
  return changed;
}

function applyFinish(msg,reason){
  if(!msg||!reason)return;
  msg.finishReason=String(reason);
  if(msg.finishReason==='length')msg.status='Hit output limit';
}

// ── Markdown Renderer ──────────────────────────────────────────
function renderMarkdown(text,opts={}){
  let src=String(text||'');
  const blocks=[];
  src=src.replace(/```([^\n`]*)\n([\s\S]*?)(?:```|$)/g,(full,lang,code,offset)=>{
    const before=src.slice(Math.max(0,offset-200),offset);
    const meta=extractCodeMeta(lang,code,before);
    if(opts.hideGeneratedFiles&&meta.explicit)return'';
    blocks.push({id:uid('code'),lang:meta.lang,code:meta.code,filename:meta.filename||inferFilename(meta.lang),explicit:meta.explicit});
    return`@@CODE_${blocks.length-1}@@`;
  });
  if(opts.hideGeneratedFiles)src=src.replace(/^\s*(?:filename|file|path)\s*[:=]\s*`?[^`\n]+`?\s*$/gmi,'');

  const fmt=(v)=>String(v||'').replace(/\*\*(.*?)\*\*/g,'<strong>$1</strong>').replace(/(^|[^*])\*(?!\s)(.*?)\*(?!\*)/g,'$1<em>$2</em>').replace(/`([^`]+)`/g,'<code>$1</code>').replace(/\[([^\]]+)\]\(([^)]+)\)/g,'<a href="$2" target="_blank" rel="noreferrer">$1</a>');

  const isTable=(lines)=>lines.length>=2&&/^\s*\|?.+\|.+\|?\s*$/.test(lines[0])&&/^\s*\|?(?:\s*:?-{3,}:?\s*\|)+\s*:?-{3,}:?\s*\|?\s*$/.test(lines[1]);
  const renderTable=(lines)=>{
    const cells=(l)=>l.replace(/^\s*\|/,'').replace(/\|\s*$/,'').split('|').map(c=>fmt(c.trim()));
    const h=cells(lines[0]),rows=lines.slice(2).filter(Boolean).map(r=>cells(r));
    return`<table><thead><tr>${h.map(c=>`<th>${c}</th>`).join('')}</tr></thead><tbody>${rows.map(r=>`<tr>${r.map(c=>`<td>${c}</td>`).join('')}</tr>`).join('')}</tbody></table>`;
  };

  let html=esc(src).split(/\n{2,}/).map(block=>{
    const lines=block.trim().split('\n').map(l=>l.trimEnd());
    if(!lines[0])return'';
    if(isTable(lines))return renderTable(lines);
    if(/^###\s+/.test(lines[0]))return`<h3>${fmt(lines[0].replace(/^###\s+/,''))}</h3>`;
    if(/^##\s+/.test(lines[0]))return`<h2>${fmt(lines[0].replace(/^##\s+/,''))}</h2>`;
    if(/^#\s+/.test(lines[0]))return`<h1>${fmt(lines[0].replace(/^#\s+/,''))}</h1>`;
    const bul=lines.every(l=>/^[-*+]\s+/.test(l));
    const ord=lines.every(l=>/^\d+\.\s+/.test(l));
    if(bul||ord){
      const tag=ord?'ol':'ul';
      return`<${tag}>${lines.map(l=>fmt(l.replace(/^(?:[-*+]\s+|\d+\.\s+)/,'').trim())).map(i=>`<li>${i}</li>`).join('')}</${tag}>`;
    }
    return`<p>${lines.map(l=>fmt(l)).join('<br>')}</p>`;
  }).join('');
  html=html.replace(/@@CODE_(\d+)@@/g,(_,n)=>codeHtml(blocks[Number(n)]));
  return html;
}

function normLang(l){return String(l||'text').trim().toLowerCase().replace(/[^a-z0-9+#.-]/g,'')||'text';}
function langFromFilename(f){
  const e=String(f||'').split('.').pop().toLowerCase();
  return({js:'javascript',jsx:'javascript',ts:'typescript',tsx:'typescript',py:'python',html:'html',htm:'html',css:'css',scss:'css',json:'json',md:'markdown',sh:'bash',ps1:'powershell',sql:'sql',csv:'csv',yml:'yaml',yaml:'yaml',xml:'xml',dockerfile:'dockerfile'})[e]||'text';
}
function inferFilename(lang,idx=1){
  const ext=({javascript:'js',js:'js',typescript:'ts',ts:'ts',python:'py',html:'html',css:'css',json:'json',markdown:'md',md:'md',bash:'sh',shell:'sh',powershell:'ps1',sql:'sql',csv:'csv',text:'txt',yaml:'yml',dockerfile:'Dockerfile'})[String(lang||'').toLowerCase()]||'txt';
  const s=idx>1?`-${idx}`:'';
  return ext==='Dockerfile'?`Dockerfile${s}`:`response${s}.${ext}`;
}
function extractCodeMeta(lang,code,before=''){
  let l=(lang||'').trim()||'text',c=String(code||'').replace(/\n$/,''),f='',e=false;
  const lf=l.match(/(?:filename|file|path)\s*[:=]\s*([\w.\-@/\\() ]+)/i)||l.match(/([\w.\-@/\\()]+\.[a-z0-9]{1,8})/i);
  if(lf){f=cleanFn(lf[1]);l=l.replace(lf[0],'').trim()||langFromFilename(f)||'text';e=true;}
  const lines=c.split(/\r?\n/),fl=lines[0]||'';
  const fln=fl.match(/^\s*(?:(?:\/\/|#|--)\s*)?(?:filename|file|path)\s*[:=]\s*(.+?)\s*(?:\*\/|-->)?\s*$/i);
  if(!f&&fln){f=cleanFn(fln[1]);c=lines.slice(1).join('\n');e=true;}
  if(f&&(!l||l==='text'))l=langFromFilename(f)||l||'text';
  return{lang:normLang(l),filename:f,code:c,explicit:e};
}
function cleanFn(v){let n=String(v||'').trim().replace(/^[-*\s]+/,'').replace(/^['"`]+|['"`]+$/g,'').replace(/[<>:"|?*]/g,'-').replace(/\\/g,'/');n=n.split('/').map(x=>x.trim()).filter(Boolean).join('/');return(!n||n.length>160)?'':n;}
function looksLikeFn(v){const n=cleanFn(v);return!!n&&(/^[\w .@()\-\/]+\.[a-z0-9]{1,8}$/i.test(n)||/(^|\/)Dockerfile$/i.test(n));}
function hashStr(t){let h=0;for(let i=0;i<t.length;i++)h=((h<<5)-h+t.charCodeAt(i))|0;return String(h>>>0);}

// ── Generated Files ────────────────────────────────────────────
const GEN_PAYLOADS=new Map();
function storeGen(data){
  const id=`p_${hashStr(JSON.stringify(data)).slice(0,10)}_${GEN_PAYLOADS.size+1}`;
  GEN_PAYLOADS.set(id,data);
  if(GEN_PAYLOADS.size>500){const first=GEN_PAYLOADS.keys().next().value;if(first)GEN_PAYLOADS.delete(first);}
  return id;
}
function readGen(el){
  const id=el?.dataset?.payloadId;
  if(id&&GEN_PAYLOADS.has(id))return GEN_PAYLOADS.get(id);
  const enc=el?.dataset?.payload;
  return enc?JSON.parse(decodeURIComponent(atob(enc))):null;
}

function parseGenFiles(text,opts={}){
  const src=String(text||'');
  const files=[],seen=new Set(),used=new Map();
  const re=/```([^\n`]*)\n([\s\S]*?)(?:```|$)/g;
  let m;
  while((m=re.exec(src))){
    const before=src.slice(Math.max(0,m.index-200),m.index);
    const meta=extractCodeMeta(m[1],m[2],before);
    let code=meta.code;if(!code.trim())continue;
    const fn=meta.filename||(opts.includeInferred?inferFilename(meta.lang,files.length+1):'');
    if(!fn)continue;
    const key=`${fn.toLowerCase()}::${hashStr(code)}`;
    if(seen.has(key))continue;seen.add(key);
    files.push({filename:uniqFn(fn,used),lang:meta.lang,code,explicit:meta.explicit});
  }
  return files;
}

function genFilesState(text='',msg=null){
  const src=String(text||'');
  const bc=(src.match(/```/g)||[]).length/2;
  const tooLarge=src.length>50000||bc>10;
  return{canParse:!!src&&!msg?.loading&&state.settings.plugins.downloadButtons&&!tooLarge,isLarge:tooLarge,count:bc};
}

function genFilesHtml(text){
  const s=genFilesState(text);
  if(!s.canParse){return s.isLarge?`<div class="generated-files-panel"><div><strong>Large output</strong><span style="color:var(--text-tertiary);font-size:11px;margin-left:8px">File extraction deferred.</span></div></div>`:'';}
  const files=parseGenFiles(text,{includeInferred:false});
  if(!files.length)return'';
  const all=files.map(f=>({filename:f.filename,code:f.code,lang:f.lang}));
  const allId=storeGen(all);
  const canPreview=state.settings.plugins.artifactPreview&&canPreview(all);
  const sub=`${files.length} file${files.length===1?'':'s'}`;

  const cards=files.map(f=>{
    const sid=storeGen({filename:f.filename,code:f.code,lang:f.lang});
    const k=fileKind(f);
    return`<div class="generated-file-card"><div class="generated-file-icon">${esc(k.slice(0,4).toUpperCase())}</div><div class="generated-file-info"><div class="generated-file-name">${esc(f.filename)}</div><div class="generated-file-meta"><span class="capability-tag">${esc(k)}</span> ${esc(f.lang)} - ${fmtBytes(new Blob([f.code]).size)}</div></div><div class="generated-file-actions"><button class="file-btn" data-action="copy-code" data-payload-id="${sid}">Copy</button><button class="file-btn primary" data-action="download-code" data-payload-id="${sid}">Download</button></div></div>`;
  }).join('');

  const previewBtn=canPreview?`<button class="file-btn" data-action="preview-artifacts" data-payload-id="${allId}">Preview</button>`:'';
  const multi=files.length>1
    ?`${previewBtn}<button class="file-btn" data-action="copy-all-files" data-payload-id="${allId}">Copy all</button><button class="file-btn primary" data-action="download-zip" data-payload-id="${allId}">ZIP</button>`
    :`${previewBtn}<button class="file-btn primary" data-action="download-all-files" data-payload-id="${allId}">Download</button>`;

  return`<div class="generated-files-panel"><div class="generated-files-header"><div><strong style="color:var(--nvidia)">Generated Files</strong><span style="color:var(--text-tertiary);font-size:11px;margin-left:8px">${sub}</span></div><div style="display:flex;gap:6px;flex-wrap:wrap">${multi}</div></div>${cards}</div>`;
}

function fileKind(f={}){
  const n=String(f.filename||'').toLowerCase();
  const l=String(f.lang||'').toLowerCase();
  if(/\.(html?|css|jsx?|tsx?)$/.test(n)||['html','css','javascript','typescript'].includes(l))return'Web';
  if(/\.(md|markdown|txt|doc)$/.test(n)||['markdown','text'].includes(l))return'Doc';
  if(/\.(json|csv|tsv|ya?ml|toml|xml)$/.test(n)||['json','csv','yaml','xml'].includes(l))return'Data';
  if(/\.(py|ps1|sh|bat|cmd|sql|go|rs|java|cs|php|rb)$/.test(n))return'Code';
  return'File';
}
function canPreview(f=[]){return Array.isArray(f)&&f.some(x=>/\.html?$/i.test(x.filename||'')||/html/i.test(x.lang||''));}
function uniqFn(filename,used){
  let c=cleanFn(filename)||'response.txt';
  const lower=c.toLowerCase();
  const count=(used.get(lower)||0)+1;
  used.set(lower,count);
  if(count===1)return c;
  const s=c.lastIndexOf('/');
  const dir=s>=0?c.slice(0,s+1):'';
  const base=s>=0?c.slice(s+1):c;
  const d=base.lastIndexOf('.');
  return d>0?`${dir}${base.slice(0,d)}-${count}${base.slice(d)}`:`${dir}${base}-${count}`;
}
function codeHtml(block){
  if(!block)return'';
  const sid=storeGen({code:block.code,filename:block.filename,lang:block.lang});
  const actions=`<div class="code-actions"><button class="code-action-btn" data-action="copy-code" data-payload-id="${sid}">Copy</button>${state.settings.plugins.downloadButtons?`<button class="code-action-btn" data-action="download-code" data-payload-id="${sid}">Download</button>`:''}</div>`;
  const header=`<div class="code-block-header"><div><span class="code-lang">${esc(block.lang)}</span><span class="code-filename">${esc(block.filename)}</span></div>${actions}</div>`;
  if(block.explicit)return`<details class="code-block-wrapper"><summary>${header}<span style="padding:0 12px 8px;display:block;color:var(--text-tertiary);font-size:11px">Click to expand</span></summary><pre><code>${esc(block.code)}</code></pre></details>`;
  return`<div class="code-block-wrapper">${header}<pre><code>${esc(block.code)}</code></pre></div>`;
}

// ── ZIP ────────────────────────────────────────────────────────
const CRC32_TABLE=(()=>{const t=new Uint32Array(256);for(let n=0;n<256;n++){let c=n;for(let k=0;k<8;k++)c=(c&1)?(0xEDB88320^(c>>>1)):(c>>>1);t[n]=c>>>0;}return t;})();
function crc32(b){let c=0xFFFFFFFF;for(let i=0;i<b.length;i++)c=(c>>>8)^CRC32_TABLE[(c^b[i])&0xFF];return(c^0xFFFFFFFF)>>>0;}
function buildZip(entries){
  const enc=new TextEncoder(),chunks=[],central=[];
  let off=0;
  const u16=v=>new Uint8Array([v&0xFF,(v>>>8)&0xFF]);
  const u32=v=>new Uint8Array([v&0xFF,(v>>>8)&0xFF,(v>>>16)&0xFF,(v>>>24)&0xFF]);
  const push=(a)=>{chunks.push(a);off+=a.length;};
  const used=new Set();
  for(const e of entries){
    let n=String(e.name||'file.txt').replace(/^\/+/,'');
    while(used.has(n))n=n.replace(/(\.[^.]*$|$)/,'_$&');
    used.add(n);
    const nb=enc.encode(n),data=enc.encode(e.content);
    const c=crc32(data),lho=off;
    push(concat([u32(0x04034b50),u16(20),u16(0),u16(0),u16(0),u16(0),u32(c),u32(data.length),u32(data.length),u16(nb.length),u16(0),nb]));
    push(data);
    central.push(concat([u32(0x02014b50),u16(20),u16(20),u16(0),u16(0),u16(0),u16(0),u32(c),u32(data.length),u32(data.length),u16(nb.length),u16(0),u16(0),u16(0),u16(0),u32(0),u32(lho),nb]));
  }
  const cs=off;let csz=0;
  for(const c of central){chunks.push(c);csz+=c.length;off+=c.length;}
  chunks.push(concat([u32(0x06054b50),u16(0),u16(0),u16(central.length),u16(central.length),u32(csz),u32(cs),u16(0)]));
  return new Blob(chunks,{type:'application/zip'});
}
function concat(parts){let len=0;for(const p of parts)len+=p.length;const out=new Uint8Array(len);let pos=0;for(const p of parts){out.set(p,pos);pos+=p.length;}return out;}

// ── File Handling ──────────────────────────────────────────────
const MAX_TEXT=2*1024*1024;
const MAX_IMG=6*1024*1024;
const MAX_ATTACH=10;

function isTextFile(f){const n=String(f?.name||'').toLowerCase(),t=String(f?.type||'').toLowerCase();return t.startsWith('text/')||['application/manifest+json','application/json','text/plain','application/octet-stream'].includes(t)||/\.(txt|md|markdown|json|csv|tsv|py|js|jsx|ts|tsx|html|css|scss|xml|yaml|yml|toml|ini|cfg|conf|log|ps1|bat|cmd|sh|sql|java|c|cpp|h|hpp|cs|go|rs|php|rb|swift|kt|dockerfile|env|webmanifest|manifest)$/i.test(n);}
function isImageFile(f){const n=String(f?.name||'').toLowerCase(),t=String(f?.type||'').toLowerCase();return['image/png','image/jpeg','image/webp','image/gif','image/jpg','image/heic','image/heif'].includes(t)||/\.(png|jpe?g|webp|gif|heic|heif)$/i.test(n);}
function isZipFile(f){const n=String(f?.name||'').toLowerCase(),t=String(f?.type||'').toLowerCase();return['application/zip','application/x-zip-compressed','application/x-zip'].includes(t)||/\.zip$/i.test(n);}
function isManifestLike(f){const n=String(f?.name||'').toLowerCase(),t=String(f?.type||'').toLowerCase();return t==='application/manifest+json'||/(?:^|[\/._-])manifest(?:[\/._-]|$)/i.test(n)||/\.webmanifest$/i.test(n);}
function attLang(n){const e=(String(n||'').split('.').pop()||'txt').toLowerCase();const map={js:'javascript',jsx:'javascript',mjs:'javascript',ts:'typescript',tsx:'typescript',py:'python',md:'markdown',html:'html',css:'css',scss:'scss',json:'json',csv:'csv',txt:'text',ps1:'powershell',bat:'batch',sh:'bash',sql:'sql',yml:'yaml',yaml:'yaml',toml:'toml',xml:'xml',java:'java',c:'c',cpp:'cpp',h:'c',cs:'csharp',go:'go',rs:'rust',php:'php',rb:'ruby',swift:'swift',kt:'kotlin',env:'env'};return map[e]||e||'text';}
function readText(f){return new Promise((resolve,reject)=>{const r=new FileReader();r.onload=()=>resolve(String(r.result||''));r.onerror=()=>reject(r.error);r.readAsText(f);});}
function readDataUrl(f){return new Promise((resolve,reject)=>{const r=new FileReader();r.onload=()=>resolve(String(r.result||''));r.onerror=()=>reject(r.error);r.readAsDataURL(f);});}

async function addAttachments(fileList){
  const files=Array.from(fileList||[]).filter(Boolean);
  if(!files.length)return;
  let added=0;
  const skipped=[];
  for(const file of files){
    const name=file.name||'file';
    if(state.pendingAttachments.length>=MAX_ATTACH){skipped.push(`${name} (max ${MAX_ATTACH})`);continue;}
    if(isImageFile(file)){
      if(file.size>MAX_IMG){skipped.push(`${name} (image > 6MB)`);continue;}
      try{const du=await readDataUrl(file);state.pendingAttachments.push({id:uid('att'),kind:'image',name,size:file.size,type:file.type||'image/*',dataUrl:du});added++;}catch{skipped.push(`${name} (read failed)`);}
      continue;
    }
    if(isZipFile(file)){
      if(file.size>50*1024*1024){skipped.push(`${name} (ZIP > 50MB)`);continue;}
      state.pendingAttachments.push({id:uid('att'),kind:'archive',name,size:file.size,type:file.type||'application/zip',content:''});added++;continue;
    }
    if(isManifestLike(file)){
      try{const text=await readText(file);state.pendingAttachments.push({id:uid('att'),kind:'text',name,size:file.size,type:file.type||'application/manifest+json',language:'json',content:text});added++;}catch{skipped.push(`${name} (read failed)`);}
      continue;
    }
    if(!isTextFile(file)){skipped.push(`${name} (unsupported)`);continue;}
    if(!state.settings.plugins.fileReader){skipped.push(`${name} (file reader off)`);continue;}
    if(file.size>MAX_TEXT){skipped.push(`${name} (> 2MB)`);continue;}
    try{const text=await readText(file);state.pendingAttachments.push({id:uid('att'),name,size:file.size,type:file.type||'text/plain',language:attLang(name),content:text});added++;}catch{skipped.push(`${name} (read failed)`);}
  }
  renderAttachments();updateSendBtn();
  if(added)showToast(`Attached ${added} file${added===1?'':'s'}`);
  if(skipped.length)showToast(`Skipped ${skipped.length}: ${skipped.slice(0,2).join(', ')}${skipped.length>2?'...':''}`,'warning');
}

function renderAttachments(){
  const el=document.getElementById('pendingAttachments');
  if(!el)return;
  if(!state.pendingAttachments.length){el.innerHTML='';el.style.display='none';return;}
  el.style.display='flex';
  el.innerHTML=state.pendingAttachments.map(a=>`
    <div class="attachment-chip" title="${esc(a.name)}">
      <span class="attachment-icon-badge">${a.kind==='image'?'IMG':a.kind==='archive'?'ZIP':'TXT'}</span>
      <div class="attachment-info">
        <div class="attachment-name">${esc(a.name)}</div>
        <div class="attachment-meta">${a.kind==='image'?'image':a.kind==='archive'?'zip':a.language||'text'} - ${fmtBytes(a.size)}</div>
      </div>
      <button class="attachment-remove" data-action="remove-attachment" data-att-id="${esc(a.id)}" title="Remove">&times;</button>
    </div>
  `).join('')+`
    <button class="attachment-chip attachment-chip-add" data-action="attach" title="Add more">
      <span class="attachment-icon-badge">+</span>
      <div class="attachment-info"><div class="attachment-name">Add more</div></div>
    </button>
  `;
}

function removeAttachment(id){state.pendingAttachments=state.pendingAttachments.filter(a=>a.id!==id);renderAttachments();updateSendBtn();}
function clearAttachments(){state.pendingAttachments=[];renderAttachments();updateSendBtn();}

function attachmentPrompt(atts){
  if(!atts?.length||!state.settings.plugins.fileReader)return'';
  return atts.map(a=>{
    if(a.kind==='image'){
      if(!a.dataUrl)return`\n\n[Image: ${a.name}\nType: ${a.type||'image'}\nSize: ${fmtBytes(a.size)}]\nImage data not available.`;
      return`\n\n[Image: ${a.name}\nType: ${a.type||'image'}\nSize: ${fmtBytes(a.size)}]\nThe image is included as a vision input.`;
    }
    if(a.kind==='archive')return`\n\n[Archive: ${a.name}\nType: ${a.type||'zip'}\nSize: ${fmtBytes(a.size)}]\nZIP archive. Contents not expanded.`;
    const c=String(a.content||'').slice(0,200000);
    const t=String(a.content||'').length>c.length?'\n\n[Truncated.]':'';
    return`\n\n[File: ${a.name}\nType: ${a.type||'text'}\nSize: ${fmtBytes(a.size)}]\n\n\`\`\`${a.language||'text'}\n${c}${t}\n\`\`\``;
  }).join('');
}

function msgContent(base,atts){
  const t=String(base||'')+attachmentPrompt(atts);
  const imgs=atts?.filter(a=>a?.kind==='image'&&a.dataUrl)||[];
  if(!imgs.length)return t;
  return[{type:'text',text:t||'Please review the attached image.'},...imgs.map(a=>({type:'image_url',image_url:{url:a.dataUrl}}))];
}

function attSummaryHtml(atts){
  if(!atts?.length)return'';
  return`<div class="message-attachments">${atts.map(a=>`<div class="message-attachment-card"><span style="font-weight:700;color:var(--nvidia);font-size:11px">${a.kind==='image'?'IMG':'FILE'}</span><div><strong>${esc(a.name)}</strong><br><small>${esc(a.kind==='image'?'image':a.language||'text')} - ${fmtBytes(a.size)}</small></div></div>`).join('')}</div>`;
}


// ── Render Functions ───────────────────────────────────────────
function welcomeHtml(){
  return`<div class="welcome-screen">
    <div class="welcome-logo">NV</div>
    <div class="welcome-title">NViMi AI</div>
    <div class="welcome-subtitle">A premium NVIDIA model chat experience. Connect your API key, choose a model, and start creating.</div>
    <div class="welcome-actions">
      <div class="welcome-card" data-action="open-settings">
        <div class="welcome-card-icon">${ICONS.set}</div>
        <div class="welcome-card-title">1. Connect</div>
        <div class="welcome-card-desc">Add your NVIDIA API key in Settings.</div>
      </div>
      <div class="welcome-card" data-action="refresh-models">
        <div class="welcome-card-icon">${ICONS.refresh}</div>
        <div class="welcome-card-title">2. Load Models</div>
        <div class="welcome-card-desc">Refresh to load live NVIDIA models.</div>
      </div>
      <div class="welcome-card" data-action="help">
        <div class="welcome-card-icon">${ICONS.chat}</div>
        <div class="welcome-card-title">3. Get Started</div>
        <div class="welcome-card-desc">Learn modes, plugins, and shortcuts.</div>
      </div>
    </div>
  </div>`;
}

function typingHtml(label='Thinking'){
  return`<span style="display:inline-flex;align-items:center;gap:8px;color:var(--text-tertiary);font-size:13px">${esc(state.settings.showThinking?label:'Generating')} <span class="typing-indicator"><span></span><span></span><span></span></span></span>`;
}

function msgHtml(m){
  const isUser=m.role==='user';
  const avatar=isUser?(state.settings.userName||'U').slice(0,1).toUpperCase():'NV';
  const author=isUser?(state.settings.userName||'You'):'NViMi';
  const visible=isUser?stripAttBlocks(m.content||''):(m.content||'');
  const content=m.loading&&!visible?typingHtml(m.status||'Thinking'):renderMarkdown(visible,{hideGeneratedFiles:!isUser});
  const genFiles=(!isUser&&visible&&state.settings.plugins.downloadButtons&&genFilesState(visible,m).canParse)?genFilesHtml(visible):'';
  const search=!isUser?searchCardHtml(m):'';
  const atts=isUser?attSummaryHtml(m.attachments||[]):'';
  const thinking=!isUser?thinkingHtml(m):'';
  return`<div class="message" id="msg_${esc(m.id)}">
    <div class="message-avatar ${isUser?'user':'assistant'}">${esc(avatar)}</div>
    <div class="message-body">
      <div class="message-header">
        <span class="message-author">${esc(author)}</span>
        <span class="message-time">${esc(m.time||'')}</span>
        ${m.model?`<span class="message-model-tag">${esc(m.model)}</span>`:''}
      </div>
      <div class="message-content" id="body_${esc(m.id)}">${thinking}${search}${genFiles}${content}${atts}</div>
      ${msgActionsHtml(m)}
    </div>
  </div>`;
}

function msgActionsHtml(m){
  if(m.loading)return'';
  const id=esc(m.id);
  if(m.role==='user'){
    return`<div class="message-actions"><button class="msg-action-btn" data-action="edit-message" data-id="${id}">${ICONS.edit} Edit</button><button class="msg-action-btn" data-action="copy-message" data-id="${id}">${ICONS.copy} Copy</button></div>`;
  }
  return`<div class="message-actions"><button class="msg-action-btn" data-action="regenerate" data-id="${id}">${ICONS.refresh} Retry</button><button class="msg-action-btn" data-action="copy-message" data-id="${id}">${ICONS.copy} Copy</button><button class="msg-action-btn" data-action="download-message" data-id="${id}">${ICONS.download} Save</button></div>`;
}

function searchCardHtml(msg){
  const s=msg?.webSearch;if(!s)return'';
  const results=Array.isArray(s.results)?s.results:[];
  const rows=results.slice(0,6).map(r=>`<li>${r.url?`<a href="${esc(r.url)}" target="_blank" rel="noopener">${esc(r.title||r.url)}</a>`:esc(r.title||'')}</li>`).join('');
  const sources=rows?`<details class="web-search-sources"><summary>Sources</summary><ol>${rows}</ol></details>`:'';
  const status=s.error?`Failed: ${s.error}`:`${results.length} result${results.length===1?'':'s'}`;
  return`<div class="web-search-card"><div class="web-search-kicker">Web Search</div><div class="web-search-title">${esc(s.query||'Search')}</div><div class="web-search-meta">${esc(s.provider||'search')} - ${esc(status)}</div>${sources}</div>`;
}

function stripAttBlocks(t){return String(t||'').replace(/\n?\s*\[(?:Attached|Att)(?: file)?:[\s\S]*$/i,'').trim();}

function renderMessages(){
  const c=document.getElementById('chatMessages');
  if(!c||!state.currentChat)return;
  if(!state.currentChat.messages.length){c.innerHTML=welcomeHtml();updateTopBar();return;}
  c.innerHTML=state.currentChat.messages.map(m=>msgHtml(m)).join('');
  if(state.scrollLocked)scrollToBottom(false);
  updateTopBar();
}

function updateMsgDom(msg){
  if(!msg?.id||!state.currentChat)return;
  const existing=document.getElementById(`msg_${msg.id}`);
  if(!existing){renderMessages();return;}
  const wrap=document.createElement('div');
  wrap.innerHTML=msgHtml(msg).trim();
  const neu=wrap.firstElementChild;
  if(!neu){renderMessages();return;}
  existing.replaceWith(neu);
  if(state.currentChat.messages[state.currentChat.messages.length-1]?.id===msg.id&&state.scrollLocked)scrollToBottom(false);
}

function updateTopBar(){
  const t=document.getElementById('chatTitle');
  const m=document.getElementById('modeIndicator');
  if(t)t.textContent=state.currentChat?.title||'New Chat';
  if(m)m.textContent=(MODES.find(x=>x.key===state.settings.currentMode)||MODES[0]).label;
}

function scrollToBottom(smooth=true){
  const c=document.getElementById('chatContainer');
  if(c)requestAnimationFrame(()=>{c.scrollTo({top:c.scrollHeight,behavior:smooth?'smooth':'auto'});});
}

function onChatScroll(){
  const c=document.getElementById('chatContainer');
  if(!c)return;
  const nearBottom=c.scrollHeight-c.scrollTop-c.clientHeight<100;
  state.scrollLocked=nearBottom;
}

function renderModeNav(){
  const el=document.getElementById('modeNav');if(!el)return;
  el.innerHTML=MODES.map(m=>`
    <div class="nav-item ${state.settings.currentMode===m.key?'active':''}" data-action="set-mode" data-mode="${m.key}" title="${esc(m.short)}">
      <span style="width:24px;min-width:24px;height:20px;border-radius:5px;display:inline-flex;align-items:center;justify-content:center;background:rgba(118,185,0,0.12);border:1px solid rgba(118,185,0,0.25);color:var(--nvidia);font-size:8px;font-weight:800">${esc(m.label.slice(0,3).toUpperCase())}</span>
      <div style="min-width:0"><div style="font-size:12px;font-weight:600">${esc(m.label)}</div><div style="font-size:10px;color:var(--text-tertiary);white-space:normal;line-height:1.2">${esc(m.short)}</div></div>
    </div>
  `).join('');
}

function renderChatHistory(){
  const el=document.getElementById('chatHistory');if(!el)return;
  const q=(state.chatSearch||'').toLowerCase().trim();
  let chats=state.chats.slice();
  if(q)chats=chats.filter(c=>(c.title||'New Chat').toLowerCase().includes(q));
  chats.sort((a,b)=>Number(!!b.pinned)-Number(!!a.pinned));
  if(!chats.length){el.innerHTML=q?`<div style="padding:10px 12px;font-size:12px;color:var(--text-tertiary)">No matches</div>`:'';}
  else el.innerHTML=chats.slice(0,150).map(c=>{
    const id=esc(c.id),active=state.currentChat?.id===c.id?'active':'',pinned=c.pinned?'pinned':'';
    return`<div class="chat-history-item ${active} ${pinned}" data-action="select-chat" data-chat-id="${id}">${ICONS.chat}<span class="chat-history-title">${esc(c.title||'New Chat')}</span><span class="chat-history-actions"><button class="chat-action-btn" data-action="pin-chat" data-chat-id="${id}" title="${c.pinned?'Unpin':'Pin'}">${ICONS.pin}</button><button class="chat-action-btn" data-action="rename-chat" data-chat-id="${id}" title="Rename">${ICONS.edit}</button><button class="chat-action-btn danger" data-action="delete-chat" data-chat-id="${id}" title="Delete">${ICONS.trash}</button></span></div>`;
  }).join('');
  const chb=document.getElementById('clearHistoryBtn');
  if(chb)chb.style.display=state.chats.length>0?'flex':'none';
}

// ── Model Browser ──────────────────────────────────────────────
function openModelBrowser(){renderModelBrowser();openModal('modelBrowserModal');}
function closeModelBrowser(){closeModal('modelBrowserModal');}

function getFilteredModels(){
  const search=(document.getElementById('modelBrowserSearch')?.value||'').toLowerCase().trim();
  let models=state.liveModels.slice();
  if(state.modelFilter==='favorites')models=models.filter(m=>state.favourites.has(m.id));
  else if(state.modelFilter!=='all')models=models.filter(m=>m.capabilities?.includes(state.modelFilter));
  if(search)models=models.filter(m=>`${m.name} ${m.id} ${m.desc} ${(m.capabilities||[]).join(' ')}`.toLowerCase().includes(search));
  const recent=new Map((state.settings.recentModelIds||[]).map((id,idx)=>[id,idx]));
  return models.sort((a,b)=>
    Number(state.favourites.has(b.id))-Number(state.favourites.has(a.id))||
    (recent.has(a.id)?recent.get(a.id):99)-(recent.has(b.id)?recent.get(b.id):99)||
    Number(b.capabilities?.includes('free_endpoint'))-Number(a.capabilities?.includes('free_endpoint'))||
    `${a.name||a.id}`.localeCompare(`${b.name||b.id}`)
  );
}

function renderModelBrowser(){
  const list=document.getElementById('modelBrowserList');
  const meta=document.getElementById('modelBrowserMeta');
  if(!list)return;
  const models=getFilteredModels();
  if(!state.liveModels.length){
    list.innerHTML=`<div class="empty-state"><div class="empty-state-icon">${ICONS.model}</div><div class="empty-state-title">No models loaded</div><div class="empty-state-desc">Add your API key and click refresh.</div></div>`;
    if(meta)meta.textContent='';return;
  }
  if(!models.length){
    list.innerHTML=`<div class="empty-state"><div class="empty-state-icon">${ICONS.search}</div><div class="empty-state-title">No matches</div><div class="empty-state-desc">Try a different filter.</div></div>`;
    if(meta)meta.textContent=`${state.liveModels.length} total - ${state.favourites.size} favorites`;return;
  }

  const recent=new Set(state.settings.recentModelIds||[]);
  const current=getCurrentModel();

  const renderCards=items=>items.map(m=>{
    const status=m.catalogOnly?'Catalog':m.capabilities?.includes('free_endpoint')?'Free':m.capabilities?.includes('api')?'API':'Live';
    const sClass=m.catalogOnly?'catalog':m.capabilities?.includes('free_endpoint')?'free':'api';
    const marker=state.favourites.has(m.id)?'Favorite':recent.has(m.id)?'Recent':'';
    const notes=[];
    if(m.capabilities?.includes('reasoning'))notes.push('Reasoning');
    if(m.capabilities?.includes('coding'))notes.push('Coding');
    if(m.capabilities?.includes('vision'))notes.push('Vision');
    if(m.capabilities?.includes('fast'))notes.push('Fast');
    return`<div class="model-item ${current?.id===m.id?'selected':''}" data-action="select-model" data-model-id="${esc(m.id)}">
      <button class="model-fav-btn ${state.favourites.has(m.id)?'active':''}" data-action="toggle-fav" data-model-id="${esc(m.id)}" title="Favorite">${state.favourites.has(m.id)?'\u2605':'\u2606'}</button>
      <div class="model-item-info">
        <div class="model-item-title-row"><div class="model-item-name">${esc(m.name)}</div><span class="model-status-pill ${sClass}">${esc(status)}</span></div>
        <div class="model-item-id">${esc(m.id)}</div>
        ${marker?`<div style="font-size:10px;color:var(--text-tertiary)">${esc(marker)}</div>`:''}
        ${notes.length?`<div class="model-item-note">${esc(notes.slice(0,2).join(' \u00B7 '))}</div>`:''}
        ${capHtml(m)}
      </div>
    </div>`;
  }).join('');

  if(state.modelFilter==='all'&&!(document.getElementById('modelBrowserSearch')?.value||'').trim()){
    const favModels=models.filter(m=>state.favourites.has(m.id));
    const recentModels=models.filter(m=>recent.has(m.id)&&!state.favourites.has(m.id));
    const otherModels=models.filter(m=>!state.favourites.has(m.id)&&!recent.has(m.id));
    const sections=[];
    if(favModels.length)sections.push(`<div class="model-section-label"><strong>Favorites</strong><span>${favModels.length}</span></div>${renderCards(favModels)}`);
    if(recentModels.length)sections.push(`<div class="model-section-label"><strong>Recents</strong><span>${recentModels.length}</span></div>${renderCards(recentModels)}`);
    sections.push(`<div class="model-section-label"><strong>All Models</strong><span>${otherModels.length}</span></div>${renderCards(otherModels)}`);
    list.innerHTML=sections.join('');
  }else{
    list.innerHTML=renderCards(models);
  }
  if(meta)meta.textContent=`${models.length} shown - ${state.liveModels.length} total - ${state.favourites.size} favorites`;
}

function setModelFilter(filter,el){
  state.modelFilter=filter;
  document.querySelectorAll('[data-action="model-filter"]').forEach(b=>b.classList.toggle('active',el?b===el:b.dataset.filter===filter));
  renderModelBrowser();
}

function selectModel(id){
  const m=state.liveModels.find(x=>x.id===id);
  if(m?.catalogOnly)showToast('Catalog-only: chat may fail','warning');
  state.settings.currentModelId=id;
  state.settings.recentModelIds=[id,...state.settings.recentModelIds.filter(x=>x!==id)].slice(0,5);
  syncMaxTokens();persistSettings();
  updateModelLabel();renderModelBrowser();updateStatus();updateSendBtn();
  closeModelBrowser();
}

function toggleFav(id,e){e?.stopPropagation();if(state.favourites.has(id))state.favourites.delete(id);else state.favourites.add(id);persistFavs();renderModelBrowser();}

function updateModelLabel(){
  const m=getCurrentModel();
  const label=document.getElementById('selectedModelName');
  if(label)label.textContent=m?m.name:'Select model';
}

function recommendModel(type){
  if(!state.liveModels.length){showToast('Load models first','warning');return;}
  const profiles={
    coding:{pos:['coding','code','qwen','coder','deepseek','nemotron'],neg:['embedding','rerank','image','speech']},
    reasoning:{pos:['reasoning','reason','deepseek','nemotron','qwen','glm'],neg:['embedding','rerank','image','speech']},
    free:{pos:['free_endpoint','free','api'],neg:['catalog_only','embedding','rerank']},
    fast:{pos:['fast','small','mini','8b','7b','free_endpoint','api'],neg:['70b','405b','large','embedding','rerank']}
  };
  const p=profiles[type]||profiles.coding;
  const cands=state.liveModels.filter(m=>!m.catalogOnly).map(m=>{
    const hay=`${m.id} ${m.name} ${m.desc} ${(m.capabilities||[]).join(' ')}`.toLowerCase();
    let s=0;
    for(const t of p.pos)if(hay.includes(t))s+=t.length>5?4:2;
    for(const t of p.neg)if(hay.includes(t))s-=8;
    if(m.capabilities?.includes('api'))s+=3;
    if(m.capabilities?.includes('free_endpoint'))s+=4;
    if(state.favourites.has(m.id))s+=2;
    return{model:m,score:s};
  }).sort((a,b)=>b.score-a.score||`${a.model.name||''}`.localeCompare(`${b.model.name||''}`));
  const picked=cands[0]?.model;
  if(!picked){showToast('No matching model found','warning');return;}
  selectModel(picked.id);showToast(`Selected ${picked.name}`);
}

// ── Send / Streaming ───────────────────────────────────────────
function updateSendBtn(){
  const input=document.getElementById('inputBox');
  const btn=document.getElementById('sendBtn');
  if(!btn||!input)return;
  if(state.isBusy){
    btn.disabled=false;btn.dataset.action='stop';btn.classList.add('stop');
    btn.setAttribute('aria-label','Stop');btn.innerHTML=STOP_ICON;return;
  }
  const hasText=!!input.value.trim();
  const hasFiles=state.pendingAttachments.length>0;
  btn.dataset.action='send';btn.classList.remove('stop');
  btn.setAttribute('aria-label','Send');btn.innerHTML=SEND_ICON;
  btn.disabled=(!hasText&&!hasFiles)||!state.settings.apiKey||!getCurrentModel();
}

function handleKeydown(e){if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();sendMsg();}}
function autoResize(el){if(!el)return;const max=isMobile()?160:180;el.style.height='auto';const h=Math.min(el.scrollHeight,max);el.style.height=h+'px';el.style.overflowY=el.scrollHeight>max?'auto':'hidden';}

function stopResponse(){
  if(!state.isBusy&&!state.activeAbortController)return;
  state.stopRequested=true;
  try{state.activeAbortController?.abort('Stopped');}catch{}
  const msg=state.activeAssistantId?getMsg(state.activeAssistantId):null;
  if(msg){msg.loading=false;msg.status='Stopped';if(!msg.content&&!msg.thinking)msg.content='Stopped.';recordEvent(msg,'Stopped');updateMsgDom(msg);}
  state.isBusy=false;state.activeAbortController=null;state.activeAssistantId=null;
  persistChats();renderMessages();updateSendBtn();showToast('Stopped');
}

function makeUserMsg(text){
  return{id:uid('msg'),role:'user',content:text,time:nowTime(),attachments:[...state.pendingAttachments.map(a=>({...a}))]};
}
function makeAssistantMsg(model){
  return{id:uid('msg'),role:'assistant',content:'',thinking:'',model:model?.name||'NViMi',time:nowTime(),loading:true,status:'Waiting...',webSearch:null,finishReason:null};
}
function makeSystemMsg(){
  const mode=MODES.find(m=>m.key===state.settings.currentMode)||MODES[0];
  const agent=AGENTS.find(a=>a.key===state.settings.currentAgent)||AGENTS[0];
  const parts=[mode.prompt||''];
  if(agent?.prompt)parts.push(agent.prompt);
  if(state.settings.plugins.webSearch&&state.settings.plugins.webSearchMode==='always')parts.push('Use web search when helpful.');
  if(state.settings.plugins.webSearch&&state.settings.plugins.webSearchMode==='auto')parts.push('Use web search only when explicitly asked.');
  if(!state.settings.plugins.fileReader)parts.push('Do not use file reader tools. Only use text and images directly.');
  if(state.settings.customPrompt&&state.settings.currentMode==='custom')parts.push(state.settings.customPrompt);
  const full=parts.filter(Boolean).join('\n\n').trim();
  return full?{role:'system',content:full}:null;
}

async function sendMsg(userText){
  const input=document.getElementById('inputBox');
  const text=typeof userText==='string'?userText.trim():input?.value?.trim()||'';
  if(!text&&!state.pendingAttachments.length)return;
  if(state.isBusy)return;
  if(!state.settings.apiKey){showToast('Enter your API key in Settings','error');openModal('settingsModal');return;}
  if(!getCurrentModel()){showToast('Select a model first','error');openModelBrowser();return;}

  let chat=state.currentChat;if(!chat)chat=createChat();

  if(state.editingMessageId){
    const idx=msgIdx(state.editingMessageId);
    if(idx>=0){
      chat.messages=chat.messages.slice(0,idx+1);
      const msg=chat.messages[idx];
      msg.content=text;msg.attachments=[...state.pendingAttachments.map(a=>({...a}))];
      msg.edited=true;msg.editedAt=Date.now();msg.time=nowTime();
      if(state.settings.showThinking)msg.thinking='';
    }
    state.editingMessageId=null;
    document.getElementById('editingBanner').style.display='none';
  }else{
    chat.messages.push(makeUserMsg(text));
  }

  clearAttachments();
  input.value='';input.style.height='auto';input.style.overflowY='hidden';
  const model=getCurrentModel();
  const assistant=makeAssistantMsg(model);
  chat.messages.push(assistant);
  state.activeAssistantId=assistant.id;
  state.isBusy=true;state.stopRequested=false;state.scrollLocked=true;
  persistChats();renderMessages();updateSendBtn();scrollToBottom(false);

  try{await callStreaming(assistant,model,chat.messages);}
  catch(err){if(!state.stopRequested){assistant.loading=false;assistant.status='Error';recordEvent(assistant,'Error',String(err?.message||err));assistant.content=`Error: ${String(err?.message||err)}`;updateMsgDom(assistant);showToast(String(err?.message||err),'error');persistChats();}}
  finally{state.isBusy=false;state.activeAbortController=null;state.activeAssistantId=null;persistChats();renderMessages();updateSendBtn();}
}

async function callStreaming(assistant,model,allMsgs){
  const url=buildApiUrl('/chat/completions');
  const ctrl=new AbortController();
  state.activeAbortController=ctrl;
  const stream=state.settings.stream;
  const profile=modelProfile(model);
  const extras=reasoningExtras(model);

  const latest=allMsgs.slice(-20).map(m=>({role:m.role,content:msgContent(m.content,m.attachments)}));
  const sys=makeSystemMsg();
  const messages=sys?[sys,...latest]:latest;
  const payload={model:model.id,messages,temperature:Number(state.settings.temperature)||0.7,max_tokens:Math.min(modelTokenLimit(model),Math.max(32768,toInt(state.settings.maxTokens)||0)),stream,...extras};
  if(stream&&profile.preferNonStream)delete payload.stream;

  ensureDebug(assistant,payload);
  recordEvent(assistant,'Sending',`stream=${!!payload.stream}`);

  try{
    const resp=await fetchTimeout(url,{method:'POST',headers:apiHeaders(!!payload.stream),body:JSON.stringify(payload)},payload.stream?STREAM_FIRST_TOKEN_TIMEOUT_MS:NON_STREAM_RETRY_TIMEOUT_MS);
    const debug=ensureDebug(assistant,payload);
    if(debug){debug.http={status:resp.status};recordEvent(assistant,'HTTP',`${resp.status}`);}

    if(!resp.ok){
      const text=await resp.text().catch(()=>'');
      recordEvent(assistant,'HTTP error',`${resp.status} ${text.slice(0,200)}`);
      if(resp.status===422&&payload.stream&&profile.preferNonStream){
        recordEvent(assistant,'Retry','Non-stream fallback');
        const alt={...payload,stream:false};delete alt.stream;
        const altResp=await fetchTimeout(url,{method:'POST',headers:apiHeaders(false),body:JSON.stringify(alt)},NON_STREAM_RETRY_TIMEOUT_MS);
        if(!altResp.ok){const at=await altResp.text().catch(()=>'');throw new Error(`Fallback failed: ${altResp.status} - ${at.slice(0,200)}`);}
        await handleResponse(altResp,assistant,false,model);
        return;
      }
      throw new Error(`HTTP ${resp.status}: ${text.slice(0,300)}`);
    }
    await handleResponse(resp,assistant,!!payload.stream,model);
  }catch(err){
    if(err?.name==='AbortError'||state.stopRequested)throw err;
    if(Object.keys(extras||{}).length>0&&profile.stripReasoningOnFallback){
      recordEvent(assistant,'Retry','Without reasoning');
      const clean=stripReasoning(payload);
      const fb=await fetchTimeout(url,{method:'POST',headers:apiHeaders(!!clean.stream),body:JSON.stringify(clean)},clean.stream?STREAM_FIRST_TOKEN_TIMEOUT_MS:NON_STREAM_RETRY_TIMEOUT_MS);
      if(!fb.ok){const ft=await fb.text().catch(()=>'');throw new Error(`Retry failed: ${fb.status} - ${ft.slice(0,200)}`);}
      await handleResponse(fb,assistant,!!clean.stream,model);
      return;
    }
    throw err;
  }
}

async function handleResponse(resp,assistant,streaming,model){
  if(!resp.body){
    const text=await resp.text().catch(()=>'');
    assistant.content=String(assistant.content||'')+text;
    assistant.loading=false;assistant.status='Done';updateMsgDom(assistant);return;
  }
  const reader=resp.body.getReader();
  const decoder=new TextDecoder();
  let buffer='';
  assistant.status='Reading...';
  recordEvent(assistant,'Reading',`streaming=${streaming}`);

  if(!streaming){
    const chunks=[];
    while(true){
      if(state.stopRequested)break;
      const{done,value}=await reader.read();
      if(done)break;
      chunks.push(decoder.decode(value,{stream:false}));
    }
    const full=chunks.join('');
    recordRaw(assistant,full);
    await parseOneShot(full,assistant,model);
    return;
  }

  while(true){
    if(state.stopRequested)break;
    const{done,value}=await reader.read();
    if(done)break;
    buffer+=decoder.decode(value,{stream:true});
    const lines=buffer.split('\n');
    buffer=lines.pop()||'';
    for(const line of lines){
      const t=line.trim();if(!t)continue;
      if(t.startsWith('event:'))continue;
      const dm=t.match(/^data:\s*(.*)/);
      if(!dm){recordRaw(assistant,t);continue;}
      const data=dm[1].trim();
      if(data==='[DONE]'){assistant.loading=false;assistant.status='Done';updateMsgDom(assistant);return;}
      recordRaw(assistant,data);
      const parsed=parseStream(data,assistant);
      if(parsed?.finishReason)applyFinish(assistant,parsed.finishReason);
    }
  }
  assistant.loading=false;assistant.status='Done';
  updateMsgDom(assistant);
}

async function parseOneShot(full,assistant,model){
  if(!full.trim()){assistant.loading=false;assistant.status='Empty';updateMsgDom(assistant);return;}
  try{
    const json=JSON.parse(full);
    const choice=json.choices?.[0];
    if(!choice)throw new Error('No choices');
    const msg=choice.message;
    if(msg?.content)assistant.content=String(assistant.content||'')+contentStr(msg.content);
    if(msg?.reasoning_content)appendReasoning(assistant,msg.reasoning_content);
    if(choice.finish_reason)applyFinish(assistant,choice.finish_reason);
    assistant.loading=false;assistant.status='Done';updateMsgDom(assistant);
  }catch{
    const cbm=full.match(/```(?:json)?\s*\n?([\s\S]*?)\n?```/);
    if(cbm){await parseOneShot(cbm[1],assistant,model);return;}
    assistant.content=String(assistant.content||'')+full;
    assistant.loading=false;assistant.status='Done';updateMsgDom(assistant);
  }
}

function parseStream(data,assistant){
  const debug=ensureDebug(assistant);
  if(debug)debug.counters.sseEvents++;
  try{
    const json=JSON.parse(data);
    if(debug)debug.counters.jsonEvents++;
    const choice=json.choices?.[0];if(!choice)return null;
    const delta=choice.delta;if(!delta)return null;
    let changed=false;
    if(delta.content){const v=appendContent(assistant,delta.content);changed=changed||v;if(v&&debug)debug.counters.contentDeltas++;}
    if(delta.reasoning_content){const v=appendReasoning(assistant,delta.reasoning_content);changed=changed||v;if(v&&debug)debug.counters.reasoningDeltas++;}
    if(changed)updateMsgDom(assistant);
    return{finishReason:choice.finish_reason||json.finish_reason};
  }catch{recordEvent(assistant,'Parse error',shortText(data,200));return null;}
}

// ── Actions ────────────────────────────────────────────────────
function copyToClipboard(text){
  navigator.clipboard.writeText(text).then(()=>showToast('Copied')).catch(()=>{
    const el=document.createElement('textarea');el.value=text;document.body.appendChild(el);el.select();document.execCommand('copy');document.body.removeChild(el);showToast('Copied');
  });
}
function copyMsg(id){const m=getMsg(id);if(!m?.content){showToast('Nothing to copy','warning');return;}copyToClipboard(m.content);}
function copyFromPayload(data){if(!data)return;if(Array.isArray(data)){const parts=data.map(f=>`// ${f.filename}\n${f.code}`).join('\n\n');copyToClipboard(parts);}else if(data.code)copyToClipboard(data.code);}
function downloadMsg(id){
  const m=getMsg(id);if(!m)return;
  const clean=stripAttBlocks(m.content||'');
  const blob=new Blob([clean],{type:'text/markdown'});
  const a=document.createElement('a');
  a.href=URL.createObjectURL(blob);
  a.download=`${(state.currentChat?.title||'chat').replace(/[^a-z0-9]/gi,'_')}_${m.role}_${m.time?.replace(/[:\s]/g,'_')||'msg'}.md`;
  a.click();URL.revokeObjectURL(a.href);showToast('Downloaded');
}
function downloadFromPayload(data){
  if(!data)return;
  if(Array.isArray(data)){if(data.length===1){dlSingle(data[0].filename,data[0].code);return;}const entries=data.map(f=>({name:f.filename,content:f.code}));dlZip(entries,'generated_files.zip');}
  else if(data.code&&data.filename)dlSingle(data.filename,data.code);
}
function dlSingle(filename,content){
  const blob=new Blob([content],{type:'text/plain'});
  const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=filename;a.click();URL.revokeObjectURL(a.href);showToast(`Downloaded ${filename}`);
}
function dlZip(entries,fn='files.zip'){
  const zip=buildZip(entries);const a=document.createElement('a');a.href=URL.createObjectURL(zip);a.download=fn;a.click();URL.revokeObjectURL(a.href);showToast(`Downloaded ${fn}`);
}
function previewArtifacts(data){
  if(!data?.length){showToast('Nothing to preview','warning');return;}
  const html=buildPreviewHtml(data);
  if(!html){showToast('No HTML to preview','warning');return;}
  const blob=new Blob([html],{type:'text/html'});
  const url=URL.createObjectURL(blob);
  window.open(url,'_blank');
  setTimeout(()=>URL.revokeObjectURL(url),30000);
}
function buildPreviewHtml(files){
  const byName=new Map(files.map(f=>[String(f.filename||'').toLowerCase().split('/').pop(),f]));
  const htmlFile=files.find(f=>/^index\.html?$/i.test(String(f.filename||'').split('/').pop()))||files.find(f=>/\.html?$/i.test(f.filename||'')||/html/i.test(f.lang||''));
  if(!htmlFile)return'';
  let html=String(htmlFile.code||'');
  const cssFiles=files.filter(f=>/\.css$/i.test(f.filename||'')&&!html.includes(String(f.filename||'').split('/').pop()));
  const jsFiles=files.filter(f=>/\.(m?js|jsx)$/i.test(f.filename||'')&&!html.includes(String(f.filename||'').split('/').pop()));
  const injCss=cssFiles.map(f=>`<style data-f="${esc(f.filename)}">\n${f.code}\n</style>`).join('\n');
  const injJs=jsFiles.map(f=>`<script data-f="${esc(f.filename)}">\n${String(f.code||'').replace(/<\/script/gi,'<\\/script')}\n<\/script>`).join('\n');
  html=html.replace(/<link\b[^>]+href=["']([^"']+)["'][^>]*>/gi,(tag,href)=>{const f=byName.get(String(href||'').split('/').pop().toLowerCase());return f&&/\.css$/i.test(f.filename||'')?`<style data-f="${esc(f.filename)}">\n${f.code}\n</style>`:tag;});
  html=html.replace(/<script\b[^>]+src=["']([^"']+)["'][^>]*><\/script>/gi,(tag,src)=>{const f=byName.get(String(src||'').split('/').pop().toLowerCase());return f&&/\.(m?js|jsx)$/i.test(f.filename||'')?`<script data-f="${esc(f.filename)}">\n${String(f.code||'').replace(/<\/script/gi,'<\\/script')}\n<\/script>`:tag;});
  if(injCss)html=/<\/head>/i.test(html)?html.replace(/<\/head>/i,`${injCss}\n</head>`):`${injCss}\n${html}`;
  if(injJs)html=/<\/body>/i.test(html)?html.replace(/<\/body>/i,`${injJs}\n</body>`):`${html}\n${injJs}`;
  return html;
}

function editMsg(id){
  const m=getMsg(id);if(!m)return;
  state.editingMessageId=id;
  const input=document.getElementById('inputBox');
  if(input){input.value=stripAttBlocks(m.content||'');input.focus();autoResize(input);}
  document.getElementById('editingBanner').style.display='flex';
  showToast('Editing message');
}
function cancelEdit(){
  state.editingMessageId=null;
  document.getElementById('editingBanner').style.display='none';
  const input=document.getElementById('inputBox');
  if(input){input.value='';input.style.height='auto';}
}

async function regenerateMsg(id){
  const m=getMsg(id);if(!m)return;
  const idx=msgIdx(id);if(idx<0)return;
  if(state.isBusy){showToast('Wait for current response','warning');return;}
  if(!confirm('Regenerate this response?'))return;
  const model=getCurrentModel();
  const assistant=makeAssistantMsg(model);
  state.currentChat.messages=state.currentChat.messages.slice(0,idx);
  state.currentChat.messages.push(assistant);
  state.activeAssistantId=assistant.id;
  state.isBusy=true;state.stopRequested=false;state.scrollLocked=true;
  persistChats();renderMessages();updateSendBtn();scrollToBottom(false);
  try{await callStreaming(assistant,model,state.currentChat.messages);}
  catch(err){if(!state.stopRequested){assistant.loading=false;assistant.status='Error';assistant.content=`Error: ${String(err?.message||err)}`;updateMsgDom(assistant);showToast(String(err?.message||err),'error');persistChats();}}
  finally{state.isBusy=false;state.activeAbortController=null;state.activeAssistantId=null;persistChats();renderMessages();updateSendBtn();}
}

// ── Web Search ─────────────────────────────────────────────────
async function webSearch(query){
  const p=state.settings.plugins;
  if(!p.webSearch)return{error:'Disabled',results:[]};
  if(!p.webSearchApiKey?.trim())return{error:'No API key',results:[]};
  try{
    const url=`https://api.search.brave.com/res/v1/web/search?q=${encodeURIComponent(query)}&count=${Math.min(Math.max(p.webSearchResults||6,1),10)}&safesearch=${p.webSearchSafe||'moderate'}&text_decorations=0`;
    const resp=await fetch(url,{headers:{'Accept':'application/json','X-Subscription-Token':p.webSearchApiKey.trim()}});
    if(!resp.ok){const t=await resp.text().catch(()=>'');throw new Error(`${resp.status}: ${t.slice(0,200)}`);}
    const data=await resp.json();
    return{query,provider:'brave',results:(data.web?.results||[]).map(r=>({title:r.title||'No title',url:r.url||'',description:r.description||''}))};
  }catch(err){return{query,provider:'brave',error:String(err?.message||err),results:[]};}
}
function shouldAutoSearch(input){const p=state.settings.plugins;if(!p.webSearch)return false;return p.webSearchMode==='always'||((p.webSearchMode||'auto')==='auto'&&/(?:search|look up|find|latest|current|news|weather|price|stock|recent)/i.test(input));}

// ── Voice ──────────────────────────────────────────────────────
async function setupVoice(){
  try{const SR=window.SpeechRecognition||window.webkitSpeechRecognition;if(!SR)return null;const r=new SR();r.continuous=false;r.interimResults=true;r.lang='en-US';return r;}catch{return null;}
}
function startVoice(){
  const btn=document.getElementById('voiceBtn');
  if(state.voiceRecognition){try{state.voiceRecognition.stop();}catch{}state.voiceRecognition=null;btn?.classList.remove('recording');return;}
  setupVoice().then(r=>{
    if(!r){showToast('Voice not available','warning');return;}
    state.voiceRecognition=r;btn?.classList.add('recording');
    let final='';
    r.onresult=(e)=>{
      let interim='';
      for(let i=e.resultIndex;i<e.results.length;i++){if(e.results[i].isFinal)final+=e.results[i][0].transcript;else interim+=e.results[i][0].transcript;}
      const input=document.getElementById('inputBox');
      if(input){input.value=final+interim;autoResize(input);updateSendBtn();}
    };
    r.onerror=(e)=>{showToast(`Voice: ${e.error}`,'warning');btn?.classList.remove('recording');state.voiceRecognition=null;};
    r.onend=()=>{btn?.classList.remove('recording');state.voiceRecognition=null;};
    r.start();
  });
}

// ── Status ─────────────────────────────────────────────────────
function updateStatus(){
  const model=getCurrentModel();
  const av=document.getElementById('statusAvatar');
  const nm=document.getElementById('statusName');
  const st=document.getElementById('statusText');
  if(!av||!nm||!st)return;
  av.textContent=(state.settings.userName||'U').slice(0,1).toUpperCase();
  nm.textContent=state.settings.userName||'User';
  if(!state.settings.apiKey){st.textContent='No API key';return;}
  if(!model){st.textContent='No model';return;}
  st.textContent=model.name;
}

// ── Theme ──────────────────────────────────────────────────────
function applyTheme(){
  const theme=state.settings.theme||'dark';
  document.body.setAttribute('data-theme',theme);
  const props=theme==='dark'?{
    '--bg-base':'#0a0a0b','--bg-elevated':'#111113','--bg-surface':'#18181b','--bg-surface-hover':'#1e1e22','--bg-surface-active':'#252529',
    '--text-primary':'#f0f0f0','--text-secondary':'#a1a1aa','--text-tertiary':'#71717a','--text-disabled':'#52525b',
    '--border-subtle':'rgba(255,255,255,0.06)','--border-default':'rgba(255,255,255,0.1)','--border-strong':'rgba(255,255,255,0.14)'
  }:{
    '--bg-base':'#ffffff','--bg-elevated':'#f8f9fa','--bg-surface':'#f1f3f5','--bg-surface-hover':'#e9ecef','--bg-surface-active':'#dee2e6',
    '--text-primary':'#1a1a2e','--text-secondary':'#495057','--text-tertiary':'#868e96','--text-disabled':'#adb5bd',
    '--border-subtle':'rgba(0,0,0,0.06)','--border-default':'rgba(0,0,0,0.1)','--border-strong':'rgba(0,0,0,0.14)'
  };
  for(const[k,v]of Object.entries(props))document.documentElement.style.setProperty(k,v);
}

// ── Modal / Panel ──────────────────────────────────────────────
function openModal(id){document.getElementById(id)?.classList.add('open');}
function closeModal(id){document.getElementById(id)?.classList.remove('open');}
function openPanel(title,html){
  const panel=document.getElementById('sidePanel');
  const overlay=document.getElementById('panelOverlay');
  if(!panel||!overlay)return;
  document.getElementById('panelTitle').textContent=title;
  document.getElementById('panelBody').innerHTML=html;
  overlay.classList.add('open');panel.classList.add('open');
}
function closePanel(){document.getElementById('panelOverlay')?.classList.remove('open');document.getElementById('sidePanel')?.classList.remove('open');}

// ── Toast ──────────────────────────────────────────────────────
function showToast(message,type='success'){
  const c=document.getElementById('toastContainer');if(!c)return;
  const toast=document.createElement('div');
  toast.className=`toast ${type}`;
  const icon=type==='error'?'!':type==='warning'?'?':ICONS.check;
  toast.innerHTML=`<span class="toast-icon">${icon}</span><span class="toast-text">${esc(message)}</span>`;
  c.appendChild(toast);
  setTimeout(()=>{toast.style.opacity='0';toast.style.transform='translateX(100%)';setTimeout(()=>toast.remove(),300);},3500);
}

// ── Render All ─────────────────────────────────────────────────
function renderAll(){
  renderModeNav();
  renderChatHistory();
  renderMessages();
  renderAttachments();
  updateModelLabel();
  updateTopBar();
  updateStatus();
  updateSendBtn();
}

// ── Drafts ─────────────────────────────────────────────────────
function captureDraft(){
  const input=document.getElementById('inputBox');
  if(input&&state.currentChat){state.currentChat.draft=input.value||'';}
  clearTimeout(state.draftSaveTimer);
  state.draftSaveTimer=setTimeout(persistChats,500);
}
function restoreDraft(){
  const input=document.getElementById('inputBox');
  if(input&&state.currentChat){input.value=state.currentChat.draft||'';autoResize(input);}
}

// ── Settings ───────────────────────────────────────────────────
function renderSettingsBody(){
  const body=document.getElementById('settingsBody');if(!body)return;
  body.innerHTML=`<div class="settings-body">
    <div>
      <div class="settings-section-title">Connection</div>
      <div class="setting-row"><label class="setting-label">NVIDIA API Key</label><div class="setting-desc">Your nvapi- key. Stored only in this browser.</div><input type="password" class="setting-input" id="apiKeyInput" value="${esc(state.settings.apiKey||'')}" placeholder="nvapi-xxxxxxxx" autocomplete="off" autocapitalize="none" spellcheck="false"></div>
      <div class="setting-row"><label class="setting-label">Cloudflare Worker URL</label><div class="setting-desc">Proxy for NVIDIA API. Leave blank for direct.</div><input type="url" class="setting-input" id="proxyUrlInput" value="${esc(state.settings.proxyUrl||DEFAULT_PROXY_URL)}" placeholder="https://..." autocomplete="off" autocapitalize="none" spellcheck="false"></div>
      <div class="setting-row"><label class="setting-label">Your Name</label><input type="text" class="setting-input" id="userNameInput" value="${esc(state.settings.userName||'User')}" placeholder="User"></div>
      <div class="btn-row"><button class="btn btn-secondary" data-action="test-connection">Test</button><button class="btn btn-secondary" data-action="refresh-models">Refresh Models</button><button class="btn btn-secondary" data-action="clear-key">Clear Key</button></div>
      <div id="connectionStatus" class="connection-status" style="display:none;margin-top:8px"></div>
    </div>
    <div>
      <div class="settings-section-title">Model &amp; Response</div>
      <div class="setting-row"><label class="setting-label">Temperature</label><div class="setting-desc">Lower = focused. Higher = creative.</div><div class="slider-row"><input type="range" class="setting-slider" id="tempSlider" min="0" max="2" step="0.1" value="${state.settings.temperature||0.7}"><span class="slider-value" id="tempValue">${state.settings.temperature||0.7}</span></div></div>
      <div class="setting-row"><label class="setting-label">Max Tokens</label><div class="setting-desc">Max output length. Model auto-limits when known.</div><select class="setting-select" id="maxTokensSelect">${renderTokenOpts(modelTokenLimit(getCurrentModel()))}</select></div>
      <div class="setting-row"><label class="setting-label">Stream Responses</label><select class="setting-select" id="streamSelect"><option value="yes" ${state.settings.stream?'selected':''}>Yes - live stream</option><option value="no" ${!state.settings.stream?'selected':''}>No - wait for full</option></select></div>
    </div>
    <div>
      <div class="settings-section-title">Activity &amp; Reasoning</div>
      <div class="setting-row"><label class="setting-label">Show Activity Panel</label><select class="setting-select" id="thinkingSelect"><option value="yes" ${state.settings.showThinking?'selected':''}>Yes</option><option value="no" ${!state.settings.showThinking?'selected':''}>No</option></select></div>
      <div class="setting-row"><label class="setting-label">Request Reasoning</label><div class="setting-desc">Ask models to expose reasoning. Retries without if rejected.</div><select class="setting-select" id="forceReasoningSelect"><option value="yes" ${state.settings.forceReasoning?'selected':''}>Yes</option><option value="no" ${!state.settings.forceReasoning?'selected':''}>No</option></select></div>
      <div class="setting-row"><label class="setting-label">Debug Events</label><div class="setting-desc">Raw stream events inside Activity Panel.</div><select class="setting-select" id="diagnosticsSelect"><option value="yes" ${state.settings.streamDiagnostics?'selected':''}>Show</option><option value="no" ${!state.settings.streamDiagnostics?'selected':''}>Hide</option></select></div>
    </div>
    <div>
      <div class="settings-section-title">App</div>
      <div class="setting-row"><label class="setting-label">Theme</label><select class="setting-select" id="themeSelect"><option value="dark" ${(state.settings.theme||'dark')==='dark'?'selected':''}>Dark</option><option value="light" ${state.settings.theme==='light'?'selected':''}>Light</option></select></div>
      <div class="setting-row"><label class="setting-label">Custom Prompt</label><div class="setting-desc">Used when mode is set to Custom.</div><textarea class="setting-input" id="customPromptInput" rows="3" placeholder="Your system prompt...">${esc(state.settings.customPrompt||'')}</textarea></div>
      <div class="btn-row"><button class="btn btn-secondary" data-action="export-settings">Export</button><button class="btn btn-secondary" data-action="import-settings">Import</button></div>
      <div class="setting-row" style="margin-top:12px"><button class="btn btn-danger" data-action="clear-cache">Clear All Data &amp; Reload</button></div>
    </div>
  </div>`;

  // Attach live listeners
  const tempSlider=document.getElementById('tempSlider');
  const tempValue=document.getElementById('tempValue');
  if(tempSlider&&tempValue){
    tempSlider.addEventListener('input',()=>{tempValue.textContent=tempSlider.value;});
  }
}

function saveSettings(){
  const apiKey=document.getElementById('apiKeyInput')?.value?.trim()??state.settings.apiKey;
  const proxyUrl=document.getElementById('proxyUrlInput')?.value?.trim()??state.settings.proxyUrl;
  const userName=document.getElementById('userNameInput')?.value?.trim()??state.settings.userName;
  const temp=parseFloat(document.getElementById('tempSlider')?.value)||0.7;
  const maxTokens=parseInt(document.getElementById('maxTokensSelect')?.value)||32768;
  const stream=(document.getElementById('streamSelect')?.value||'yes')==='yes';
  const showThinking=(document.getElementById('thinkingSelect')?.value||'yes')==='yes';
  const forceReasoning=(document.getElementById('forceReasoningSelect')?.value||'yes')==='yes';
  const streamDiagnostics=(document.getElementById('diagnosticsSelect')?.value||'no')==='yes';
  const theme=document.getElementById('themeSelect')?.value||'dark';
  const customPrompt=document.getElementById('customPromptInput')?.value?.trim()??state.settings.customPrompt;

  state.settings={...state.settings,apiKey,proxyUrl:stripSlash(proxyUrl)||DEFAULT_PROXY_URL,userName:userName||DEFAULT_USER_NAME,temperature:temp,maxTokens,stream,showThinking,forceReasoning,streamDiagnostics,theme,customPrompt};
  persistSettings();applyTheme();updateStatus();updateSendBtn();
  closeModal('settingsModal');showToast('Settings saved');
}

function openSettingsModal(){renderSettingsBody();openModal('settingsModal');}

// ── Panels ─────────────────────────────────────────────────────
function openPluginsPanel(){
  const p=state.settings.plugins;
  const content=`<div class="panel-section-title">Plugins</div>
    <div class="plugin-item ${p.webSearch?'':'disabled'}"><div class="plugin-icon">${ICONS.search}</div><div class="plugin-info"><div class="plugin-name">Web Search</div><div class="plugin-desc">Search the web for live info.</div></div><button class="toggle-switch ${p.webSearch?'on':''}" data-action="toggle-web-search"></button></div>
    <div class="plugin-item ${p.fileReader?'':'disabled'}"><div class="plugin-icon">${ICONS.text}</div><div class="plugin-info"><div class="plugin-name">File Reader</div><div class="plugin-desc">Read text files in messages.</div></div><button class="toggle-switch ${p.fileReader?'on':''}" data-action="toggle-file-reader"></button></div>
    <div class="plugin-item ${p.downloadButtons?'':'disabled'}"><div class="plugin-icon">${ICONS.download}</div><div class="plugin-info"><div class="plugin-name">Download Buttons</div><div class="plugin-desc">Copy/download on code blocks.</div></div><button class="toggle-switch ${p.downloadButtons?'on':''}" data-action="toggle-download-buttons"></button></div>
    <div class="plugin-item ${p.artifactPreview?'':'disabled'}"><div class="plugin-icon">${ICONS.preview}</div><div class="plugin-info"><div class="plugin-name">Artifact Preview</div><div class="plugin-desc">Preview HTML files in new tab.</div></div><button class="toggle-switch ${p.artifactPreview?'on':''}" data-action="toggle-artifact-preview"></button></div>
    <div class="plugin-item ${p.thinkingDisplay?'':'disabled'}"><div class="plugin-icon">${ICONS.activity}</div><div class="plugin-info"><div class="plugin-name">Activity Panel</div><div class="plugin-desc">Show reasoning and activity.</div></div><button class="toggle-switch ${p.thinkingDisplay?'on':''}" data-action="toggle-thinking-display"></button></div>
    <div class="panel-section-title">Plugin Settings</div>
    <div class="setting-row"><label class="setting-label">Search API Key</label><input type="password" class="setting-input" id="pluginSearchKey" value="${esc(p.webSearchApiKey||'')}" placeholder="Brave Search API key..."></div>
    <div class="setting-row"><label class="setting-label">Search Results</label><input type="number" class="setting-input" id="pluginSearchCount" value="${p.webSearchResults||6}" min="1" max="10"></div>
    <div class="setting-row"><label class="setting-label">Search Mode</label><select class="setting-select" id="pluginSearchMode"><option value="auto" ${p.webSearchMode==='auto'?'selected':''}>Auto</option><option value="always" ${p.webSearchMode==='always'?'selected':''}>Always</option><option value="manual" ${p.webSearchMode==='manual'?'selected':''}>Manual</option></select></div>`;
  openPanel('Plugins',content);
}

function openAgentsPanel(){
  const content=`<div class="panel-section-title">Agents</div><p style="font-size:12px;color:var(--text-secondary);margin-bottom:16px">Choose an agent to specialise AI behaviour.</p>
    ${AGENTS.map(a=>`<div class="agent-card ${state.settings.currentAgent===a.key?'selected':''}" data-action="select-agent" data-agent="${a.key}"><div class="agent-header"><div class="agent-avatar">${esc(a.name.slice(0,2).toUpperCase())}</div><div><div class="agent-name">${esc(a.name)}</div><div class="agent-role">${esc(a.role)}</div></div></div><div class="agent-desc">${a.prompt||'No special instructions.'}</div></div>`).join('')}`;
  openPanel('Agents',content);
}

function openHelpPanel(){
  const content=`<div class="guide-card"><h3>NViMi AI Guide</h3><p>A premium chat interface for NVIDIA AI models. Connect your API key, load models, and start chatting.</p></div>
    <div class="guide-row"><h4>Keyboard Shortcuts</h4><p><kbd>Ctrl</kbd>+<kbd>K</kbd> New chat &middot; <kbd>Ctrl</kbd>+<kbd>S</kbd> Settings &middot; <kbd>Ctrl</kbd>+<kbd>B</kbd> Sidebar &middot; <kbd>/</kbd> Focus &middot; <kbd>Esc</kbd> Stop/Close &middot; <kbd>Shift</kbd>+<kbd>Enter</kbd> Newline</p></div>
    <div class="guide-row"><h4>Modes</h4><p>Switch between Chat, Coding, Research, Writing, Creative, Data, Web, Images, Voice, and Custom modes. Each changes the system prompt.</p></div>
    <div class="guide-row"><h4>File Uploads</h4><p>Click the paperclip or drag files. Supports images (up to 6MB), text files (up to 2MB), ZIP archives, and web manifests.</p></div>
    <div class="guide-row"><h4>Model Browser</h4><p>Click the model indicator in the composer footer. Use filters, search, and star models as favorites.</p></div>
    <div class="guide-row"><h4>Generated Files</h4><p>When the model produces code with filename headers, a file panel appears with copy, download, and ZIP options.</p></div>`;
  openPanel('Guide',content);
}

function openStatusPanel(){
  const model=getCurrentModel();
  const content=`<div class="status-card"><h3>Connection</h3><p><strong>Proxy:</strong> ${esc(state.settings.proxyUrl||'Direct')}</p><p><strong>API Key:</strong> ${state.settings.apiKey?'Set':'Not set'}</p><p><strong>Models:</strong> ${state.liveModels.length} loaded</p><p><strong>Current:</strong> ${model?esc(model.name):'None'}</p></div>
    <div class="status-card"><h3>App</h3><p><strong>Version:</strong> ${APP_VERSION}</p><p><strong>Build:</strong> ${BUILD_ID}</p><p><strong>Chats:</strong> ${state.chats.length}</p><p><strong>Favorites:</strong> ${state.favourites.size}</p></div>
    <div class="status-card"><h3>Settings</h3><p><strong>Stream:</strong> ${state.settings.stream?'Yes':'No'}</p><p><strong>Thinking:</strong> ${state.settings.showThinking?'Yes':'No'}</p><p><strong>Theme:</strong> ${state.settings.theme}</p></div>`;
  openPanel('Status',content);
}

// ── Share ──────────────────────────────────────────────────────
function shareChat(){
  const chat=state.currentChat;if(!chat?.messages.length){showToast('Nothing to share','warning');return;}
  const text=chat.messages.map(m=>`${m.role==='user'?(state.settings.userName||'You'):'NViMi'}: ${stripAttBlocks(m.content||'')}`).join('\n\n');
  navigator.clipboard.writeText(text).then(()=>showToast('Copied to clipboard')).catch(()=>showToast('Failed to copy','error'));
}

// ── Connection ─────────────────────────────────────────────────
async function testConnection(){
  const st=document.getElementById('connectionStatus');
  if(st){st.style.display='block';st.textContent='Testing...';st.className='connection-status';}
  try{
    const models=await fetchModels();
    state.liveModels=models.map(normalizeModel).filter(Boolean);
    persistModels();
    if(st){st.textContent=`Connected! ${state.liveModels.length} models.`;st.className='connection-status success';}
    updateModelLabel();updateStatus();updateSendBtn();
  }catch(err){if(st){st.textContent=`Failed: ${String(err?.message||err)}`;st.className='connection-status error';}showToast(`Connection failed: ${String(err?.message||err)}`,'error');}
}

async function refreshModels(){
  showToast('Loading models...');
  try{
    const models=await fetchModels();
    state.liveModels=models.map(normalizeModel).filter(Boolean);
    persistModels();updateModelLabel();updateStatus();updateSendBtn();
    showToast(`${state.liveModels.length} models loaded`);
  }catch(err){showToast(`Failed: ${String(err?.message||err)}`,'error');}
}

async function fetchModels(){
  const proxy=stripSlash(state.settings.proxyUrl);
  const directUrl=`${NVIDIA_DIRECT_BASE}/models`;
  const proxyUrl=proxy?`${proxy}/v1/models`:null;
  const dp=fetch(directUrl,{method:'GET',headers:{Authorization:`Bearer ${state.settings.apiKey||''}`}}).then(async r=>{if(!r.ok)throw new Error(`Direct ${r.status}`);return(await r.json()).data||[];});
  const pp=proxyUrl?fetch(proxyUrl,{method:'GET',headers:{Authorization:`Bearer ${state.settings.apiKey||''}`,'X-Nvidia-Api-Key':state.settings.apiKey||''}}).then(async r=>{if(!r.ok)throw new Error(`Proxy ${r.status}`);return(await r.json()).data||[]}):Promise.resolve([]);
  let dr=[],pr=[],de=null,pe=null;
  try{dr=await dp;}catch(e){de=e;}try{pr=await pp;}catch(e){pe=e;}
  if(!dr.length&&!pr.length){if(de&&pe)throw new Error(`Direct: ${de.message}, Proxy: ${pe.message}`);if(de)throw de;if(pe)throw pe;throw new Error('No models returned');}
  const seen=new Set();const merged=[];
  for(const m of[...dr,...pr]){const id=m.id||m.name||m.model||m.modelId;if(!id||seen.has(id))continue;seen.add(id);const fromProxy=pr.includes(m);m.source=fromProxy?(dr.some(d=>d.id===id)?'api+catalog':'api'):'catalog';merged.push(m);}
  return merged;
}

function clearKey(){if(!confirm('Clear API key?'))return;state.settings.apiKey='';persistSettings();const el=document.getElementById('apiKeyInput');if(el)el.value='';showToast('Key cleared');}

// ── Import / Export ────────────────────────────────────────────
function exportSettings(){
  const data={settings:state.settings,models:state.liveModels.map(m=>m.raw),favourites:[...state.favourites]};
  const blob=new Blob([JSON.stringify(data,null,2)],{type:'application/json'});
  const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=`nvimi-v5-${new Date().toISOString().slice(0,10)}.json`;a.click();URL.revokeObjectURL(a.href);showToast('Exported');
}
function importSettings(){
  const input=document.createElement('input');input.type='file';input.accept='.json,application/json';
  input.onchange=async()=>{
    const f=input.files?.[0];if(!f)return;
    try{const t=await readText(f);const d=JSON.parse(t);
      if(d.settings){state.settings={...state.settings,...d.settings};state.settings.plugins={...DEFAULT_PLUGINS,...d.settings.plugins||{}};}
      if(Array.isArray(d.favourites))state.favourites=new Set(d.favourites);
      persistSettings();persistFavs();applyTheme();renderAll();showToast('Imported');
    }catch(err){showToast(`Import failed: ${String(err?.message||err)}`,'error');}
  };input.click();
}

// ── Cache ──────────────────────────────────────────────────────
function clearCacheAndReload(){
  if(!confirm('Clear ALL app data and reload? This resets everything.'))return;
  try{localStorage.clear();showToast('Cleared. Reloading...');setTimeout(()=>location.reload(),500);}
  catch(err){showToast(`Failed: ${String(err?.message||err)}`,'error');}
}

// ── Onboarding ─────────────────────────────────────────────────
function handleOnboard(saveAndLoad=false){
  const apiKey=document.getElementById('onboardApiKey')?.value?.trim();
  const proxyUrl=document.getElementById('onboardProxyUrl')?.value?.trim();
  const name=document.getElementById('onboardName')?.value?.trim();
  if(apiKey)state.settings.apiKey=apiKey;
  if(proxyUrl)state.settings.proxyUrl=stripSlash(proxyUrl)||DEFAULT_PROXY_URL;
  if(name)state.settings.userName=name;
  persistSettings();
  localStorage.setItem(STORAGE.splash,'true');
  document.getElementById('onboardingOverlay')?.classList.remove('open');
  updateStatus();
  if(saveAndLoad&&state.settings.apiKey)refreshModels();
}
function maybeShowOnboard(){if(!state.settings.apiKey&&!localStorage.getItem(STORAGE.splash))document.getElementById('onboardingOverlay')?.classList.add('open');}

// ── Event Handlers ─────────────────────────────────────────────
function setupEvents(){
  document.addEventListener('click',(e)=>{
    const el=e.target.closest('[data-action]');if(!el)return;
    const action=el.dataset.action;
    switch(action){
      case 'send':sendMsg();break;
      case 'stop':stopResponse();break;
      case 'attach':document.getElementById('fileInput')?.click();break;
      case 'voice':startVoice();break;
      case 'new-chat':newChat();break;
      case 'select-chat':selectChat(el.dataset.chatId);break;
      case 'pin-chat':pinChat(el.dataset.chatId);break;
      case 'rename-chat':renameChat(el.dataset.chatId);break;
      case 'delete-chat':deleteChat(el.dataset.chatId,e);break;
      case 'chat-search':state.chatSearch=el.value;renderChatHistory();break;
      case 'clear-all-chats':clearAllChats();break;
      case 'set-mode':state.settings.currentMode=el.dataset.mode;persistSettings();renderModeNav();updateTopBar();showToast(`Mode: ${(MODES.find(m=>m.key===el.dataset.mode)||{}).label||el.dataset.mode}`);break;
      case 'open-settings':openSettingsModal();break;
      case 'close-settings':closeModal('settingsModal');break;
      case 'save-settings':saveSettings();break;
      case 'open-model-browser':openModelBrowser();break;
      case 'close-model-browser':closeModelBrowser();break;
      case 'model-filter':setModelFilter(el.dataset.filter,el);break;
      case 'model-browser-search':renderModelBrowser();break;
      case 'select-model':selectModel(el.dataset.modelId);break;
      case 'toggle-fav':toggleFav(el.dataset.modelId,e);break;
      case 'refresh-models':refreshModels();break;
      case 'test-connection':testConnection();break;
      case 'clear-key':clearKey();break;
      case 'temp-slider':state.settings.temperature=el.value;document.getElementById('tempValue').textContent=el.value;break;
      case 'export-settings':exportSettings();break;
      case 'import-settings':importSettings();break;
      case 'clear-cache':clearCacheAndReload();break;
      case 'copy-message':copyMsg(el.dataset.id);break;
      case 'copy-code':copyFromPayload(readGen(el));break;
      case 'download-code':downloadFromPayload(readGen(el));break;
      case 'download-message':downloadMsg(el.dataset.id);break;
      case 'download-zip':downloadFromPayload(readGen(el));break;
      case 'copy-all-files':copyFromPayload(readGen(el));break;
      case 'download-all-files':downloadFromPayload(readGen(el));break;
      case 'preview-artifacts':previewArtifacts(readGen(el));break;
      case 'regenerate':regenerateMsg(el.dataset.id);break;
      case 'edit-message':editMsg(el.dataset.id);break;
      case 'cancel-edit':cancelEdit();break;
      case 'share':shareChat();break;
      case 'plugins':openPluginsPanel();break;
      case 'agents':openAgentsPanel();break;
      case 'help':openHelpPanel();break;
      case 'status':openStatusPanel();break;
      case 'close-panel':closePanel();break;
      case 'select-agent':state.settings.currentAgent=el.dataset.agent;persistSettings();showToast(`Agent: ${(AGENTS.find(a=>a.key===el.dataset.agent)||{}).name||el.dataset.agent}`);closePanel();break;
      case 'remove-attachment':removeAttachment(el.dataset.attId);break;
      case 'onboard-save':handleOnboard(true);break;
      case 'onboard-skip':handleOnboard(false);break;
      case 'toggle-sidebar':{
        document.getElementById('sidebar')?.classList.toggle('collapsed');
        document.body.classList.toggle('sidebar-open');
        break;
      }
      case 'close-sidebar':{
        document.getElementById('sidebar')?.classList.add('collapsed');
        document.body.classList.remove('sidebar-open');
        break;
      }
      case 'toggle-web-search':state.settings.plugins.webSearch=!state.settings.plugins.webSearch;persistSettings();openPluginsPanel();break;
      case 'toggle-file-reader':state.settings.plugins.fileReader=!state.settings.plugins.fileReader;persistSettings();openPluginsPanel();break;
      case 'toggle-download-buttons':state.settings.plugins.downloadButtons=!state.settings.plugins.downloadButtons;persistSettings();openPluginsPanel();break;
      case 'toggle-artifact-preview':state.settings.plugins.artifactPreview=!state.settings.plugins.artifactPreview;persistSettings();openPluginsPanel();break;
      case 'toggle-thinking-display':state.settings.plugins.thinkingDisplay=!state.settings.plugins.thinkingDisplay;state.settings.showThinking=state.settings.plugins.thinkingDisplay;persistSettings();openPluginsPanel();break;
    }
  });

  document.addEventListener('keydown',(e)=>{
    if(e.key==='Escape'){
      if(document.getElementById('settingsModal')?.classList.contains('open')){closeModal('settingsModal');return;}
      if(document.getElementById('modelBrowserModal')?.classList.contains('open')){closeModelBrowser();return;}
      if(document.getElementById('sidePanel')?.classList.contains('open')){closePanel();return;}
      if(state.isBusy){stopResponse();return;}
    }
    if((e.ctrlKey||e.metaKey)&&e.key==='k'){e.preventDefault();newChat();}
    if((e.ctrlKey||e.metaKey)&&e.key==='s'){e.preventDefault();openSettingsModal();}
    if((e.ctrlKey||e.metaKey)&&e.key==='b'){e.preventDefault();document.getElementById('sidebar')?.classList.toggle('collapsed');document.body.classList.toggle('sidebar-open');}
    if(e.key==='/'&&!e.ctrlKey&&!e.metaKey&&!e.altKey&&!e.shiftKey){const input=document.getElementById('inputBox');if(input&&document.activeElement!==input){e.preventDefault();input.focus();}}
  });

  const inputBox=document.getElementById('inputBox');
  if(inputBox){
    inputBox.addEventListener('keydown',handleKeydown);
    inputBox.addEventListener('input',()=>{autoResize(inputBox);updateSendBtn();});
    inputBox.addEventListener('blur',captureDraft);
  }

  const fileInput=document.getElementById('fileInput');
  if(fileInput){fileInput.addEventListener('change',()=>{if(fileInput.files?.length){addAttachments(fileInput.files);fileInput.value='';}});}

  const composerBox=document.getElementById('composerBox');
  if(composerBox){
    composerBox.addEventListener('dragover',(e)=>{e.preventDefault();e.stopPropagation();composerBox.classList.add('drag-over');});
    composerBox.addEventListener('dragleave',(e)=>{e.preventDefault();e.stopPropagation();composerBox.classList.remove('drag-over');});
    composerBox.addEventListener('drop',(e)=>{e.preventDefault();e.stopPropagation();composerBox.classList.remove('drag-over');addAttachments(e.dataTransfer?.files);});
  }

  document.addEventListener('dragover',(e)=>{if(e.dataTransfer?.types?.includes('Files')){e.preventDefault();document.body.classList.add('dragging-files');}});
  document.addEventListener('dragleave',()=>{document.body.classList.remove('dragging-files');});
  document.addEventListener('drop',()=>{document.body.classList.remove('dragging-files');});

  const chatContainer=document.getElementById('chatContainer');
  if(chatContainer)chatContainer.addEventListener('scroll',onChatScroll,{passive:true});

  // Model browser search
  const modelBrowserSearch=document.getElementById('modelBrowserSearch');
  if(modelBrowserSearch){
    modelBrowserSearch.addEventListener('input',()=>renderModelBrowser());
  }

  // Visual Viewport for iOS keyboard
  if(window.visualViewport){
    window.visualViewport.addEventListener('resize',()=>{
      const vv=window.visualViewport;
      document.documentElement.style.setProperty('--vv-height',`${vv.height}px`);
      document.documentElement.style.setProperty('--vv-offset',`${vv.offsetTop}px`);
      // Keep composer visible when keyboard opens
      const composer=document.getElementById('composer');
      if(composer&&document.activeElement===inputBox){
        requestAnimationFrame(()=>{
          composer.scrollIntoView({behavior:'smooth',block:'end'});
          if(state.scrollLocked)scrollToBottom(false);
        });
      }
    });
  }
}

function focusInput(){
  const input=document.getElementById('inputBox');
  if(input)setTimeout(()=>input.focus(),100);
}

// ── Initialization ─────────────────────────────────────────────
function init(){
  loadState();
  setupEvents();
  renderAll();
  maybeShowOnboard();
  document.getElementById('appVersionLabel').textContent=`v${APP_VERSION}`;
  console.log(`NViMi AI v${APP_VERSION} initialized`);
  // Register service worker
  if('serviceWorker'in navigator){
    navigator.serviceWorker.register('./sw.js?v=5').catch(()=>{});
  }
}

// Wait for fonts then init
document.fonts.ready.then(()=>{
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);
  else init();
});
