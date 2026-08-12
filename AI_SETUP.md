# AI Love & Birthday Messages — Groq + Cloudflare

The site now supports genuinely fresh AI-generated Bangla messages while keeping your Groq key private.

## What it does

- First click on the wish capsule / hidden heart / time capsule / cat: shows a newly generated AI message.
- Second click: hides it.
- Third click: requests a new, different message.
- The wish capsule changes itself every 14 seconds after it is opened.
- Sparse floating birthday/love wishes are generated every 18 seconds.

## Secure architecture

`Website → Cloudflare Worker → Groq API`

The API key must live only in Cloudflare as `GROQ_API_KEY`. Do not paste it into `config.js`, GitHub, or chat.

## Quick setup

Follow the detailed instructions in [`worker/README.md`](worker/README.md). Once deployed, paste the Worker URL into `config.js`:

```js
AI_ENDPOINT: "https://your-worker.your-subdomain.workers.dev"
```

The website has a tiny offline fallback only so it does not break before the secure AI Worker is connected. With `AI_ENDPOINT` configured, new messages come from Groq.
