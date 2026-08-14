/*
  PERSONAL SETTINGS
  1) Change SECRET_CODE to your own private word.
  2) Your 14 photos are named 1.jpg through 14.jpg inside the images folder.
     They automatically cross-fade as the whole website's cinematic background.
  3) To enable the music button, put your own MP3 in music/ and name it: our-song.mp3
  4) For Meherab's personal voice-note card, add a recording as: music/voice-note.mp3
*/
const SITE_CONFIG = {
  SECRET_CODE: "cute-billi",
  PHOTOS: [
    "images/1.jpg", "images/2.jpg", "images/3.jpg", "images/4.jpg",
    "images/5.jpg", "images/6.jpg", "images/7.jpg", "images/8.jpg",
    "images/9.jpg", "images/10.jpg", "images/11.jpg", "images/12.jpg",
    "images/13.jpg", "images/14.jpg"
  ],
  SLIDE_DURATION: 4000,
  MUSIC_FILE: "music/our-song.mp3",
  // Paste your deployed Cloudflare Worker URL here after setup, e.g. https://nisa-wishes.your-name.workers.dev
  AI_ENDPOINT: "https://cute-billi-ai-wishes.meherab-cute-billi.workers.dev"
};
