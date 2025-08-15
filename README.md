# Workstream Tracker — Clean Vercel Setup

This repo uses **default Node runtime** (no custom runtime mapping).
If you previously saw "Function Runtimes must have a valid version", this removes that config.

## Files
- `index.html` — app
- `api/boards/[id].js` — Node serverless function (Web Handler)
- `vercel.json` — { "version": 2 } only
- `package.json` — ESM + `@vercel/blob`

## Deploy
1. Push to GitHub, import to Vercel (Framework: Other; no build).
2. Add env var `BLOB_READ_WRITE_TOKEN` if needed.
3. Visit `/?board=team-alpha` and use Load/Save.
