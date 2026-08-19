# Deploy the Birthday Website on Vercel

This is a static website. Vercel needs no build command and no environment variables for the website itself.

## Recommended: deploy from GitHub

1. Go to [Vercel](https://vercel.com/) and sign in with your GitHub account.
2. Click **Add New → Project**.
3. Import the repository: `meherabmehu/Birthday_wishes`.
4. On the configuration screen, keep these settings:
   - **Framework Preset:** Other
   - **Build Command:** leave empty
   - **Output Directory:** leave empty
5. Click **Deploy**.

Vercel will publish a URL like:

```text
https://birthday-wishes-xxxx.vercel.app
```

Every future `git push origin main` automatically creates a new deployment.

## Keep the AI system working

The website calls the existing Cloudflare Worker stored in `config.js`:

```js
AI_ENDPOINT: "https://cute-billi-ai-wishes.meherab-cute-billi.workers.dev"
```

After Vercel gives you the final URL, make sure the Worker allows it.

### If `ALLOWED_ORIGIN` was never configured
Nothing is required. The Worker currently accepts any origin.

### If you previously set `ALLOWED_ORIGIN`
In your own terminal:

```powershell
cd C:\Users\USER\Birthday_wishes\worker
npx wrangler secret put ALLOWED_ORIGIN
```

Paste your exact Vercel origin, for example:

```text
https://birthday-wishes-xxxx.vercel.app
```

Then run:

```powershell
npx wrangler deploy
```

Do not change `GROQ_API_KEY`, `GROQ_MODEL`, or `AI_ENDPOINT`.

## Verify after deployment

1. Open the Vercel URL on a phone.
2. Enter the secret code.
3. Tap **Open My Birthday Surprise**.
4. Test an AI wish card. It should return a fresh message.
5. Test the music control. It needs internet access because it uses the official YouTube player.
6. Test cat activities, photos, gift box, and proposal.

## CLI alternative

If you have Vercel CLI installed and are logged in:

```powershell
cd C:\Users\USER\Birthday_wishes
npx vercel --prod
```

Do not paste a Vercel token in chat. Browser login is enough.
