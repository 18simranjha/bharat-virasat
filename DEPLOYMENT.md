# Bharat Virasat deployment

## Keep the Gemini key private

The public frontend must never contain `GEMINI_API_KEY`. The key belongs only in the backend host environment variables.

The previous local `.env` was removed because it contained a live key. Revoke that key in Google AI Studio and create a replacement.

## Local use

Create `.env` in the workspace root:

```env
GEMINI_API_KEY=your_replacement_key
GEMINI_MODEL=gemini-2.5-flash
PORT=8000
ALLOWED_ORIGIN=http://127.0.0.1:8000
```

Run:

```powershell
python server.py
```

## Public deployment

1. Deploy the static frontend folder and `images/` to Netlify, GitHub Pages, or the old CODE:BLACK frontend project.
2. Deploy the repository to a Python host such as Render or Railway.
3. Configure the backend service start command as `python server.py`.
4. Add these backend environment variables in the host dashboard, never in GitHub:

```text
GEMINI_API_KEY=your_replacement_key
GEMINI_MODEL=gemini-2.5-flash
PORT=8000
ALLOWED_ORIGIN=https://your-frontend-domain.example
```

5. Before `gemini-bot.js` loads in the frontend HTML, add:

```html
<script>
  window.BHARAT_API_BASE = 'https://your-backend-domain.example';
</script>
<script src="gemini-bot.js"></script>
```

The backend now allows only that exact frontend origin. Do not use `*` for `ALLOWED_ORIGIN`.

## Deploy to Vercel

Vercel can host this frontend and the lightweight Gemini functions in `api/`. The API key must be added in Vercel, not committed to GitHub.

1. Push the repository to GitHub, including `vercel.json` and the `api/` folder.
2. Go to [Vercel](https://vercel.com), sign in with GitHub, choose **Add New Project**, and import `bharat-virasat`.
3. Keep **Framework Preset** as `Other`, leave the build command empty, and keep the root directory as `./`.
4. Open **Settings > Environment Variables** and add `GEMINI_API_KEY` for Production, Preview, and Development. Add `GEMINI_MODEL` with `gemini-2.5-flash`.
5. Deploy. The root URL is rewritten to the premium page by `vercel.json`.
6. Check `https://your-domain.vercel.app/api/health`. It should return `"ok": true` and `"geminiConfigured": true`.

The current review storage uses a local JSON file and is not persistent on Vercel serverless deployments. Keep browser-local reviews for the demo or connect a hosted database before relying on shared public reviews.

## Second gallery image

For a second angle, place a side-view image beside the main image using `-side` before the extension:

```text
images/taj mahal.jpg
images/taj mahal-side.jpg
```

The gallery automatically displays the side image when it exists. If it does not exist, the missing slot is hidden.
