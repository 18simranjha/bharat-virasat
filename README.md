# BharatVirasat Premium

A premium Indian heritage explorer for UNESCO sites, ASI monuments, cultural stories, audio guides, state circuits, and travel planning.

## Project Versions

Keep the original CODE:BLACK project unchanged. Add this project in a separate folder in the same repository:

```text
repository/
├── index.html                  # Original project
├── existing-old-project-files/
└── premium/
    ├── index.html
    ├── styles-premium.css
    ├── data.js
    ├── app-premium.js
    ├── gemini-bot.js
    ├── state-guides.js
    └── images/
```

The URLs can then be:

```text
https://your-site.netlify.app/
https://your-site.netlify.app/premium/
```

## Local Development

Python is enough. Node.js is not required.

From the repository root:

```powershell
python server.py
```

Open:

```text
http://127.0.0.1:8000/index%20p%3Bremium.html/index%20premium.html
```

For a cleaner deployment URL, rename the current premium folder and HTML file:

```text
index p;remium.html/      -> premium/
index premium.html       -> index.html
```

Then open:

```text
http://127.0.0.1:8000/premium/
```

## Gemini API Security

Never place the Gemini API key in HTML or browser JavaScript. Never commit `.env` to GitHub.

Create `.env` locally or in your backend hosting dashboard:

```env
GEMINI_API_KEY=your_replacement_key
GEMINI_MODEL=gemini-2.5-flash
PORT=8000
ALLOWED_ORIGIN=http://127.0.0.1:8000
```

The old local key was removed because it had been exposed. Revoke it in Google AI Studio and create a replacement key.

The `.gitignore` file protects `.env` from being committed.

## Public Deployment

Deploy the frontend and backend separately:

1. Deploy the premium frontend and `images/` folder to Netlify, GitHub Pages, or the existing CODE:BLACK Netlify project.
2. Deploy `server.py` to a Python-capable service such as Render or Railway.
3. Add `GEMINI_API_KEY`, `GEMINI_MODEL`, `PORT`, and `ALLOWED_ORIGIN` as backend environment variables.
4. Set `ALLOWED_ORIGIN` to the exact frontend URL, for example:

```text
https://your-site.netlify.app
```

5. Before loading `gemini-bot.js`, configure the backend URL in the premium HTML:

```html
<script>
  window.BHARAT_API_BASE = "https://your-backend-service.example";
</script>
<script src="gemini-bot.js"></script>
```

Do not use `*` for `ALLOWED_ORIGIN`.

## Features

- Heritage cards with images, galleries, tickets, UNESCO and ASI sources
- 43 unique heritage records
- Search, category filters, region filters, and time filters
- State and union-territory heritage selector
- Maharashtra, Rajasthan, and Karnataka route guides
- Nearby attractions, travel times, map links, and sample tours
- Browser audio narration with multiple voice styles
- Optional side-view gallery images
- Google Translate language selector
- Interactive heritage knowledge test
- Gemini chat through a protected backend

## Image Naming

Each site's main image is stored in `images/` and connected in `data.js`.

To add a second view, use `-side` before the extension:

```text
images/taj mahal.jpg
images/taj mahal-side.jpg
```

The gallery automatically displays the side image if it exists. If it does not exist, the optional slot is hidden.

## Verification

Check Python syntax:

```powershell
python -m py_compile server.py
```

Check the site through the Python server rather than opening the HTML directly. The Gemini chat endpoint only works while `server.py` is running.

## Sources

- [UNESCO World Heritage Centre](https://whc.unesco.org/en/statesparties/in)
- [Archaeological Survey of India](https://asi.nic.in/)
- [Google Gemini API](https://ai.google.dev/)
- [Original CODE:BLACK project](https://code-blac.netlify.app/)
