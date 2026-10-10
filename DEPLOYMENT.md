# Bharat Virasat deployment

## Keep the Gemini key private

The public frontend must never contain `GEMINI_API_KEY`. The key belongs only in the backend host environment variables.

If an earlier Gemini key was exposed or committed, revoke it in Google AI Studio and create a replacement. Never copy local `.env` files into a deployment.

## Free-tier setup: Firebase Hosting + Render + Gemini

Firebase Hosting serves the static site. The AI API runs as a separate Render web service described by `render.yaml`. Render's free services can sleep after inactivity, have usage limits, and are not intended for production uptime. Google AI Studio's free Gemini tier also has changing model and rate limits, and may use submitted content to improve Google's products under its current terms. This setup costs nothing on the selected free tiers but has no uptime or earnings guarantee.

1. Create a Gemini API key at [Google AI Studio](https://aistudio.google.com/app/apikey). This backend accepts Gemini keys only; an OpenAI key will not work.
2. Push this repository to GitHub. In [Render](https://dashboard.render.com/), choose **New > Blueprint**, connect `18simranjha/bharat-virasat`, and select `render.yaml`.
3. When prompted for Blueprint environment values, enter:

   - `GEMINI_API_KEY`: paste the new key directly into Render's protected environment-variable field. Do not send it in chat or put it in GitHub, JavaScript, HTML, or Firebase Hosting.
   - `ALLOWED_ORIGINS`: `https://bharat-roots-app.web.app,https://bharat-roots-app.firebaseapp.com`

4. Keep the Render **Free** plan and deploy. The blueprint uses `gemini-2.5-flash`; if Google AI Studio does not offer that model to your key, set `GEMINI_MODEL` in Render to an available Gemini model.
5. Confirm `https://bharat-virasat-api.onrender.com/api/health` returns `{"ok":true,"geminiConfigured":true}`. If Render gives your service a different URL, update `backend-config.js` with that URL, push the change, then redeploy Firebase.
6. Deploy the static site from the repository root:

```powershell
firebase deploy --only hosting --project bharat-roots-app
```

7. Test chat and photo scanning at `https://bharat-roots-app.web.app`. On a sleeping free Render service, the first API request can take about a minute. Check the health URL and Render deployment logs if APIs continue to fail.

The 80-Day planner uses bundled itinerary data and public map tiles. It does not require a Google Maps API key. No Gemini key belongs in Firebase Hosting settings or frontend files.

## Local use

Copy `.env.example` to `.env`, add a Gemini key for local testing, and run:

```powershell
pip install -r requirements.txt
python server.py
```

Never commit `.env`.

## Monetization readiness

The project contains an AdSense client ID, but approval and revenue are controlled by Google and are not guaranteed. There is no subscription checkout or premium entitlement system yet. Before selling subscriptions, add and test a payment provider, secure server-side entitlement checks, pricing and refund policies, tax handling, and production-grade uptime/abuse controls.

The review API's local JSON file is not persistent on Render's ephemeral filesystem or Vercel serverless instances. Do not rely on server-side shared reviews until a persistent database is configured.

## Second gallery image

For a second angle, place a side-view image beside the main image using `-side` before the extension:

```text
images/taj mahal.jpg
images/taj mahal-side.jpg
```

The gallery automatically displays the side image when it exists. If it does not exist, the missing slot is hidden.
