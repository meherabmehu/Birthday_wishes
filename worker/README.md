# Secure Groq AI Worker setup (Cloudflare free tier)

This Worker keeps the Groq key out of the birthday website source code.

## 1. Create a Groq key
Create a Groq account and API key in the Groq Console. Keep the key private; do not commit it or send it in chat.

## 2. Create / sign in to Cloudflare
Create a free Cloudflare account, then install Node.js (LTS) and run these commands from the project root:

```bash
cd worker
npx wrangler login
npx wrangler secret put GROQ_API_KEY
```

When asked, paste the Groq key locally in your own terminal.

## 3. Restrict website access (recommended)
After GitHub Pages is active, add its exact origin. Example:

```bash
npx wrangler secret put ALLOWED_ORIGIN
# enter: https://meherabmehu.github.io
```

If you use another domain, enter that domain instead.

## 4. Deploy

```bash
npx wrangler deploy
```

Cloudflare prints a URL like:

```text
https://cute-billi-ai-wishes.YOUR-SUBDOMAIN.workers.dev
```

## 5. Connect the birthday website
Open `config.js` and paste that complete Worker URL here:

```js
AI_ENDPOINT: "https://cute-billi-ai-wishes.YOUR-SUBDOMAIN.workers.dev"
```

Then commit and push:

```bash
git add config.js
git commit -m "Connect secure Groq AI wishes"
git push origin main
```

Until this endpoint is set, the website uses a small offline fallback so its interactive parts still work locally.
