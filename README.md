# NVIDIA AI Desktop

GitHub Pages frontend + Cloudflare Worker proxy for NVIDIA Build/NIM models.

## This build fixes generated file downloads

When a model replies with complete files, the app now detects fenced code blocks that include a filename and creates **Generated files** cards with Copy/Download buttons. It also collapses full file code by default so the chat is not filled with thousands of visible lines.

The app recognises file blocks like:

```js
filename: app.js
console.log('hello');
```

It also recognises filename lines written as comments, for example:

```js
// filename: app.js
console.log('hello');
```

## Upload to GitHub Pages

Replace the files in the root of your GitHub repo with:

- `index.html`
- `styles.css`
- `app.js`
- `manifest.webmanifest`
- `sw.js`
- `icon.svg`
- `README.md`
- `cloudflare-worker.js`
- `index.worker.js`
- `nvidia-ai-desktop-standalone.html`

Commit and wait for Pages to deploy.

Open with a cache buster after upload:

```text
https://wigglez-sudo.github.io/nvidia-ai-desktop/?v=filecards1
```

Then press `Ctrl + F5`.

## Cloudflare Worker

No Worker update is required for the generated-file-card fix. The included Worker files are kept in the package for convenience.

Your API Proxy URL remains:

```text
https://nvidia-ai-proxy.lukewai.workers.dev
```

## Asking models to generate downloadable files

Use wording like:

```text
Give me the full updated files. Put each file in its own fenced code block and put filename: path/file.ext as the first line inside each block.
```

The app also adds this instruction automatically when Download Buttons are enabled.


## Streaming / Thinking Diagnostics Fix

This build adds a visible Stream / reasoning diagnostics block under assistant replies. It records response headers, elapsed time, chunk counts, SSE payload samples, JSON events, content deltas, and reasoning deltas. It also attempts to enable NVIDIA public reasoning for reasoning-capable models by sending `chat_template_kwargs.enable_thinking` and `include_reasoning` when Thinking Display is enabled. If a model rejects those extra fields, the app retries once without them.

If the diagnostics show chunks arriving but zero content/reasoning deltas, NVIDIA is returning a shape the parser does not recognise. If it shows zero chunks and stays waiting, the request has not received stream data yet or the model/provider is stalled. If reasoning deltas stay zero while content deltas arrive, the model/provider did not expose public reasoning for that request.
