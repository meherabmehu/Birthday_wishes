# For My Cute Billi 😽

A private, romantic birthday website for **Zannatul Ferdoush Nisa**, made by **Md. Meherab Hossain Talukder**.

## Customize before sharing

### 1. Change the secret code
Open `config.js` and replace:

```js
SECRET_CODE: "cute-billi"
```

with a private code only Nisa will know. This is a sweet entry gate, not strong security: because this is a static website, someone who has access to the source files can read it.

### 2. Add your photos
1. Put images in the `images/` folder. Example: `images/photo-1.jpg`
2. In `config.js`, add their names:

```js
PHOTOS: [
  "images/photo-1.jpg",
  "images/photo-2.jpg",
  "images/photo-3.jpg",
],
```

Your photos automatically cross-fade in the full-page background every few seconds. They are kept subtle and blurred so the love-letter text stays easy to read.

## Preview locally
Open `index.html` in any browser. For best results, deploy using GitHub Pages or Netlify.

## Deploy with GitHub Pages
On GitHub: **Repository Settings → Pages → Build and deployment → Deploy from a branch → main / root → Save**.

After GitHub publishes it, you can make a QR code from the public website URL.

> Never put a GitHub Personal Access Token in this repository or share it in chat. If a token was shared, revoke it immediately and generate a replacement only when you truly need it.

## Included photo placeholders

The `images/` folder includes 15 elegant JPEG placeholders named `photo-01.jpg` through `photo-15.jpg`. Replace each file with your own photo while keeping exactly the same filename—no code changes needed.

## Music control

The website includes a visitor-controlled music button connected to the official YouTube upload of **Aj Jonmodin Tomar**. It only begins after the visitor taps the button; no MP3 file is needed.
