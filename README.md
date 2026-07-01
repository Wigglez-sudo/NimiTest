# NVIDIA AI Desktop — GitHub Pages Version

This is the cleaned GitHub Pages version of the NVIDIA/Kimi-style desktop chat app.

## What is included

- `index.html` — main page for GitHub Pages
- `styles.css` — UI styling
- `app.js` — app logic, chat, settings, model picker, downloads, PDF export, voice input
- `manifest.webmanifest`, `sw.js`, `icon.svg` — installable web app support for iPhone/iPad/desktop browsers
- `cloudflare-worker.js` — optional CORS proxy for GitHub Pages/iOS

## Deploy to GitHub Pages

1. Create a GitHub repository.
2. Upload all files in this folder to the repo root.
3. Go to **Settings > Pages**.
4. Set **Source** to **Deploy from a branch**.
5. Choose `main` and `/root`.
6. Open the Pages URL GitHub gives you.

## First run

1. Open the app.
2. Click the settings cog.
3. Paste your NVIDIA `nvapi-...` key.
4. Click **Test Connection**.
5. Click **Refresh Models** or use the model dropdown **Refresh** button.
6. Save settings.

## If you see “Failed to fetch”

That usually means direct browser requests to NVIDIA are blocked by CORS. Use the included Cloudflare Worker:

1. Go to Cloudflare Workers.
2. Create a Worker.
3. Paste the contents of `cloudflare-worker.js`.
4. Deploy it.
5. Copy the Worker URL, for example `https://your-worker.yourname.workers.dev`.
6. In the app, open **Settings** and paste it into **API Proxy URL**.
7. Click **Test Connection** again.

The Worker does not need your API key hard-coded. The app sends your local key to your Worker, and the Worker forwards it to NVIDIA.

## iPhone/iPad use

Open the GitHub Pages URL in Safari, then use **Share > Add to Home Screen**. The app will open like a normal iOS app. Voice input depends on browser support and may not work on every iOS browser.

## Security notes

- Do not put your NVIDIA key inside `index.html`, `app.js`, GitHub Actions, or commits.
- The key is stored in your browser localStorage only.
- If you shared a temporary/test key while building, revoke/delete it after testing.


## Refresh model list

The app now calls `/v1/models` and stores the returned model list in localStorage. The hard-coded list is only a fallback. Use **Settings > Refresh Models** or the **Refresh** button inside the model picker. Fetched models appear under the **Live** tab and also under **All**.

NVIDIA does not always expose free/paid/enterprise tier metadata from `/v1/models`, so newly fetched models are marked **live** unless the response includes useful tier information. This avoids incorrectly labelling paid models as free.
