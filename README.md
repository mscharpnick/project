# Workstream Tracker (Share-ready)

A zero-build static app with an Edge Function for shared boards on **Vercel**.

- Root **index.html** = the entire app (no bundler).
- **/api/boards/[id].js** = Edge Function persisting JSON to Vercel Blob.
- Share via `?board=<your-id>` (e.g., `?board=team-alpha`). Anyone with the link can load/save.

## Quick start (GitHub → Vercel)

1. **Create a new GitHub repo** and add these files/folders:
   ```
   index.html
   api/boards/[id].js
   README.md
   ```

2. **Import to Vercel** (New Project → Import from GitHub).
   - Framework preset: **Other** (no build step).
   - Output directory: **/** (root).

3. **Add env var** in Vercel Project Settings → Environment Variables:
   - `BLOB_READ_WRITE_TOKEN` (create via Vercel Blob; copy the Read/Write token).

4. **Deploy**.

5. Open your app:
   - `https://<your-app>.vercel.app/?board=team-alpha`
   - Use **Load** to fetch; **Save** to persist; **Copy Link** to share.

> No authentication is included. Treat board IDs as shared secrets.
> Conflict policy: last write wins.

## LocalStorage
Edits also auto-save to `localStorage` per browser/profile for convenience. Export/Import JSON supported.

## Switch storage backends
The client only uses GET/PUT JSON. You can swap the Edge Function to use Vercel KV or Supabase with minimal changes.

## License
MIT


## Notes
- `vercel.json` declares the Edge runtime for the API route.
- `package.json` sets ESM and includes `@vercel/blob`.
