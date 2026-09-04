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

## Second gallery image

For a second angle, place a side-view image beside the main image using `-side` before the extension:

```text
images/taj mahal.jpg
images/taj mahal-side.jpg
```

The gallery automatically displays the side image when it exists. If it does not exist, the missing slot is hidden.
