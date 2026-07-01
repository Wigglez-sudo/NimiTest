# NVIDIA AI Desktop - Real Plugins + Web Search

This build restores the Plugins tab and makes the useful toggles actually change app behaviour.

## What is new

- **Web Search plugin** now works through your Cloudflare Worker.
- **Brave Search API** is the recommended provider.
- **Tavily** is also supported if you prefer an LLM/RAG-focused search API.
- **File Reader** toggle controls whether uploaded text/code files are read into prompts.
- **Download Buttons** toggle controls generated file/code download buttons.
- **Thinking Display** toggle controls Thinking/search progress UI.
- **Long Context** toggle sends more chat history to the model.
- **Code Interpreter** is shown but disabled because GitHub Pages cannot safely run Python/browser sandbox execution by itself.

## Upload app to GitHub Pages

Replace these files in your GitHub repo root:

```text
index.html
styles.css
app.js
manifest.webmanifest
sw.js
icon.svg
README.md
cloudflare-worker.js
nvidia-ai-desktop-standalone.html
```

Commit and wait for GitHub Pages to redeploy. Then open your site with a cache buster, for example:

```text
https://YOURNAME.github.io/nvidia-ai-desktop/?v=plugins1
```

If the old UI still appears, unregister the old service worker in DevTools > Application > Service Workers, then clear site data.

## Update Cloudflare Worker

Replace your Worker source file:

```text
C:\Users\lukew\OneDrive\Desktop\Nvidaapp\nvidia-ai-proxy\nvidia-ai-proxy\src\index.js
```

with the included:

```text
cloudflare-worker.js
```

or the identical helper file:

```text
index.worker.js
```

Then deploy:

```powershell
cd C:\Users\lukew\OneDrive\Desktop\Nvidaapp\nvidia-ai-proxy\nvidia-ai-proxy
npx wrangler deploy
```

Open your Worker URL. It should list:

```text
/v1/models
/v1/chat/completions
/v1/web-search
```

## Web Search setup

In the app:

1. Open **Settings**.
2. Add your NVIDIA API key.
3. Add your Worker URL.
4. Save settings.
5. Open **Plugins**.
6. Turn **Web Search** on.
7. Choose **Brave Search API - recommended**.
8. Paste your Brave Search API key.
9. Click **Test Web Search**.

You can also choose Tavily if you have a Tavily key.

## Safer search key option

Instead of storing your Brave key in the browser, you can add it as a Cloudflare Worker secret:

```powershell
npx wrangler secret put BRAVE_SEARCH_API_KEY
```

Then in Plugins choose:

```text
Use Worker secret BRAVE_SEARCH_API_KEY
```

The app will not need the Brave key in the browser.


## File upload behaviour

Uploaded text/code files now appear as attachment cards instead of dumping the whole file into the chat input. When File Reader is enabled, the file content is sent privately with the prompt to the model. The visible chat only shows the file name, type and size.


## Patch notes - Agent Swarm and Help fixed

- Agent Swarm and Help sidebar items now have explicit global handlers and fallback click listeners.
- The side panel is created/repaired automatically if a cached/old DOM fails to include it.
- Agent Swarm clearly explains that the selected agent adds a system prompt to every new message.
- Help / What modes do opens the help panel reliably.

After uploading, open your site with `?v=agentfix1` and hard refresh.


## Patch notes: chat controls + file upload privacy

This build fixes:
- Delete single chats from the chat history with the × button.
- Delete all chats from the bottom-left status panel.
- Bottom-left status card now opens the Account/App Status panel and matches the NVIDIA green theme.
- Uploaded files are shown as attachment cards only; old pasted `[Attached: ...]` blocks are hidden from chat display/editing.
- Edit user messages and Regenerate assistant responses are exposed globally and should work reliably after cache clearing.

After uploading, open the site with `?v=controlsfix1` and hard refresh.


## Free Endpoint badges

The model picker now has a **Free Endpoint** tab and shows a **🟢 Free Endpoint** badge where NVIDIA's live `/v1/models` metadata exposes or strongly indicates a free endpoint. If NVIDIA does not expose that metadata for a model, the app will not fake the badge.

After uploading this build, click **Refresh Models** once so cached model metadata is re-normalized with the new badge rules.


## Thinking / streaming display fix
This build keeps the assistant bubble visible while waiting for NVIDIA, shows a clear status such as Thinking, Receiving response, or Streaming response, and can recover when a model/proxy returns one full JSON response instead of true SSE chunks.

Upload these files to GitHub Pages and open the site with `?v=thinkingfix1` to avoid cached service-worker files.


## Reasoning / Thinking traces

This build can display public model reasoning when the API returns it, including `reasoning_content`, `reasoning`, `thinking`, `thought`, or visible `<think>...</think>` style blocks. It cannot force hidden chain-of-thought from models/providers that do not expose it. For those models, the app shows progress text and the final response only.
