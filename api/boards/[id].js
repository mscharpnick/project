// /api/boards/[id].js
// Node.js Serverless Function (Node 20.x) using Web Handler signature.
// Stores JSON per board in Vercel Blob. Requires env var BLOB_READ_WRITE_TOKEN or same project as Blob store.
import { put, get } from '@vercel/blob';

export default async function handler(request) {
  try {
    const url = new URL(request.url);
    const parts = url.pathname.split('/'); // ["", "api", "boards", "<id>"]
    const id = decodeURIComponent(parts[parts.length - 1] || '');
    if (!id) return new Response('Missing id', { status: 400 });

    const key = `boards/${id}.json`;

    if (request.method === 'GET') {
      try {
        const file = await get(key);
        if (!file) return new Response('{}', { status: 404, headers: {'content-type':'application/json'} });
        const data = await fetch(file.url).then(r => r.text());
        return new Response(data, { status: 200, headers: {'content-type':'application/json'} });
      } catch (e) {
        return new Response('Error fetching', { status: 500 });
      }
    }

    if (request.method === 'PUT') {
      try {
        const body = await request.text();
        JSON.parse(body); // sanity check
        await put(key, body, { access: 'public', contentType: 'application/json' });
        return new Response(JSON.stringify({ ok: true }), { status: 200, headers: {'content-type':'application/json'} });
      } catch (e) {
        return new Response('Error saving', { status: 500 });
      }
    }

    return new Response('Method not allowed', { status: 405 });
  } catch (e) {
    return new Response('Server error', { status: 500 });
  }
}
