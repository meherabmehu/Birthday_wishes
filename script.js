const $ = (selector) => document.querySelector(selector);

const lockScreen = $('#lock-screen');
const experience = $('#experience');
const passcode = $('#passcode');
const codeMessage = $('#code-message');
const unlock = $('#unlock');

function createPetals(amount = 30) {
  const holder = $('#petals');
  for (let i = 0; i < amount; i++) {
    const petal = document.createElement('i');
    petal.style.setProperty('--x', `${Math.random() * 100}vw`);
    petal.style.setProperty('--size', `${8 + Math.random() * 12}px`);
    petal.style.setProperty('--delay', `${-Math.random() * 12}s`);
    petal.style.setProperty('--time', `${8 + Math.random() * 8}s`);
    holder.appendChild(petal);
  }
}
createPetals();

function startBirthdayCelebration() {
  document.body.classList.add('celebration-lock');
  startCelebrationCanvas();
  const shower = $('#celebration-shower');
  const pieces = ['🌸', '🌹', '💖', '💕', '💗', '✨', '🎀', '🌺', '🎉', '🎊', '🩷'];
  shower.innerHTML = '';
  // Enough joy to feel festive, but deliberately limited so phones stay smooth.
  // A light foreground layer complements the floral scene without hiding the message.
  for (let i = 0; i < 18; i++) {
    const piece = document.createElement('span');
    piece.className = 'celebration-piece';
    piece.textContent = pieces[Math.floor(Math.random() * pieces.length)];
    piece.style.setProperty('--left', `${Math.random() * 100}vw`);
    piece.style.setProperty('--size', `${16 + Math.random() * 20}px`);
    // Negative delays mean the celebration is already alive the instant the card appears.
    piece.style.setProperty('--delay', `${-Math.random() * 7}s`);
    piece.style.setProperty('--duration', `${4.8 + Math.random() * 3.8}s`);
    piece.style.setProperty('--drift', `${-90 + Math.random() * 180}px`);
    piece.style.setProperty('--turn', `${-260 + Math.random() * 520}deg`);
    shower.appendChild(piece);
  }
}

function unlockSurprise() {
  if (passcode.value.trim().toLowerCase() === SITE_CONFIG.SECRET_CODE.trim().toLowerCase()) {
    lockScreen.classList.add('leaving');
    setTimeout(() => { lockScreen.hidden = true; experience.hidden = false; experience.classList.add('waiting-to-open'); window.scrollTo(0, 0); startBirthdayCelebration(); }, 700);
  } else {
    codeMessage.textContent = 'Hmm… this little world opens only for Nisa. Try again, Cute Billi 😽';
    passcode.classList.remove('shake'); void passcode.offsetWidth; passcode.classList.add('shake');
  }
}
unlock.addEventListener('click', unlockSurprise);
passcode.addEventListener('keydown', (event) => { if (event.key === 'Enter') unlockSurprise(); });

$('#enter-surprise').addEventListener('click', () => {
  const celebration = $('#birthday-celebration');
  celebration.classList.add('leaving');
  document.body.classList.remove('celebration-lock');
  experience.classList.remove('waiting-to-open');
  startMainExperience();
  setTimeout(() => { celebration.hidden = true; $('#celebration-shower').innerHTML = ''; stopCelebrationCanvas(); }, 800);
});

// The letter stays private until she intentionally opens it.
$('#open-letter').addEventListener('click', (event) => {
  event.preventDefault();
  const letter = $('#letter');
  letter.hidden = false;
  letter.classList.add('reveal-ready');
  requestAnimationFrame(() => letter.classList.add('revealed'));
  setTimeout(() => letter.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80);
});

const photos = SITE_CONFIG.PHOTOS || [];

// Photos are intentionally used only as a soft, cross-fading atmosphere—not as a separate gallery.

const atmosphereLayers = [...document.querySelectorAll('.photo-layer')];
let atmospherePhoto = 0;
let activeAtmosphereLayer = 0;
function changeAtmosphere() {
  if (!photos.length) return;
  // Two layers overlap: the next photo fades in above the previous one, so no flash/flicker occurs.
  const nextLayer = atmosphereLayers[activeAtmosphereLayer];
  const previousLayer = atmosphereLayers[(activeAtmosphereLayer + 1) % atmosphereLayers.length];
  nextLayer.style.backgroundImage = `url("${photos[atmospherePhoto % photos.length]}")`;
  nextLayer.style.zIndex = '2'; previousLayer.style.zIndex = '1';
  requestAnimationFrame(() => nextLayer.classList.add('visible'));
  setTimeout(() => previousLayer.classList.remove('visible'), 1800);
  atmospherePhoto++;
  activeAtmosphereLayer = (activeAtmosphereLayer + 1) % atmosphereLayers.length;
}
// Started only after the birthday congratulations card is opened.

// Cute Billi's tiny animated companions: a cat dashes across at unexpected moments.
function sendCatRunning() {
  const cat = document.createElement('span');
  cat.className = 'cat-runner';
  cat.textContent = Math.random() > .5 ? '🐈' : '🐱';
  cat.style.top = `${12 + Math.random() * 72}vh`;
  cat.style.setProperty('--run-time', `${8 + Math.random() * 5}s`);
  document.body.appendChild(cat);
  setTimeout(() => cat.remove(), 14000);
}
// Cat activity begins only inside the opened birthday world.

// Gentle floating romance details, kept sparse so the page stays elegant.
function releaseSpark() {
  const spark = document.createElement('span');
  spark.className = 'romance-spark';
  spark.textContent = ['♡', '✦', '✧'][Math.floor(Math.random() * 3)];
  spark.style.left = `${8 + Math.random() * 84}vw`;
  spark.style.top = `${62 + Math.random() * 28}vh`;
  spark.style.fontSize = `${14 + Math.random() * 16}px`;
  spark.style.setProperty('--spark-x', `${-35 + Math.random() * 70}px`);
  spark.style.setProperty('--spark-time', `${5 + Math.random() * 4}s`);
  document.body.appendChild(spark);
  setTimeout(() => spark.remove(), 9500);
}
// Sparkles are started by startMainExperience().

// Little love notes and birthday wishes float through the page at gentle intervals.
const floatingNotes = [
  'Nisa, you are my favorite feeling. ♡',
  'Happy Birthday to my future wife, InshaAllah. ✦',
  'Zannatul, you make my ordinary days feel beautiful.',
  'May every dream in your heart find its way to you.',
  'You are loved today, tomorrow, always.',
  'Cute Billi, you deserve a lifetime of soft happiness.',
  'Three years, countless feelings, one favorite person.',
  'May Allah keep your smile bright and your heart peaceful.'
];
function floatLoveNote() {
  const note = document.createElement('p');
  note.className = 'floating-note';
  note.textContent = floatingNotes[Math.floor(Math.random() * floatingNotes.length)];
  note.style.left = `${4 + Math.random() * 60}vw`;
  note.style.top = `${30 + Math.random() * 55}vh`;
  note.style.setProperty('--note-time', `${7 + Math.random() * 3}s`);
  document.body.appendChild(note);
  setTimeout(() => note.remove(), 11000);
}
// Floating notes are started by startMainExperience().

// A live countdown makes the page feel special before the birthday and changes to a celebration on 20 August.
function updateCountdown() {
  const now = new Date();
  let birthday = new Date(now.getFullYear(), 7, 20, 0, 0, 0); // August is month 7 in JavaScript
  if (now > new Date(now.getFullYear(), 7, 20, 23, 59, 59)) birthday = new Date(now.getFullYear() + 1, 7, 20, 0, 0, 0);
  const remaining = Math.max(0, birthday - now);
  const days = Math.floor(remaining / 86400000);
  const hours = Math.floor((remaining / 3600000) % 24);
  const minutes = Math.floor((remaining / 60000) % 60);
  $('#count-days').textContent = String(days).padStart(2, '0');
  $('#count-hours').textContent = String(hours).padStart(2, '0');
  $('#count-minutes').textContent = String(minutes).padStart(2, '0');
  if (now.getMonth() === 7 && now.getDate() === 20) $('#countdown-label').textContent = 'Today is your beautiful day ✦';
}
let mainExperienceStarted = false;
function startMainExperience() {
  if (mainExperienceStarted) return;
  mainExperienceStarted = true;
  changeAtmosphere();
  if (photos.length) setInterval(changeAtmosphere, 7000);
  setInterval(releaseSpark, 3000);
  setTimeout(floatLoveNote, 1400);
  setInterval(floatLoveNote, 7000);
  updateCountdown();
  setInterval(updateCountdown, 30000);
  // Preload the official player after the surprise opens, so the music button responds quickly.
  createYouTubePlayer();
  document.dispatchEvent(new Event('main-experience-started'));
}

// AI-powered wish, heart, capsule, and cat interactions are initialized in ai.js.

function launchFireworks() {
  const colors = ['#ffe09a', '#ff9cc4', '#fff0d0', '#dba2ff'];
  for (let i = 0; i < 44; i++) {
    const dot = document.createElement('i'); dot.className = 'firework';
    dot.style.left = `${35 + Math.random() * 30}vw`; dot.style.top = `${35 + Math.random() * 28}vh`;
    dot.style.setProperty('--fx', `${-210 + Math.random() * 420}px`); dot.style.setProperty('--fy', `${-190 + Math.random() * 260}px`);
    dot.style.setProperty('--fire', colors[i % colors.length]); document.body.appendChild(dot); setTimeout(() => dot.remove(), 1100);
  }
}
document.querySelectorAll('.yes').forEach((button) => button.addEventListener('click', () => { $('#yes-message').hidden = false; document.body.classList.add('celebrate'); launchFireworks(); }));

// Background music comes from the official YouTube upload. It only starts after a deliberate tap.
const musicToggle = $('#music-toggle');
const musicRestart = $('#music-restart');
const musicLabel = $('#music-label');
let youtubePlayer;
let youtubeLoading = false;
let youtubeReady = false;
let musicPlayRequested = false;
let songHasStarted = false;
function setMusicButton(playing) {
  if (playing) songHasStarted = true;
  musicRestart.hidden = !songHasStarted;
  musicLabel.textContent = playing ? 'Pause the Surprise' : (SITE_CONFIG.MUSIC_TITLE || 'Play a Little Surprise ♫');
  musicToggle.setAttribute('aria-label', playing ? 'Pause background music' : 'Play background music');
}
function createYouTubePlayer() {
  if (youtubeLoading) return;
  youtubeLoading = true;
  const api = document.createElement('script');
  api.src = 'https://www.youtube.com/iframe_api';
  document.head.appendChild(api);
  window.onYouTubeIframeAPIReady = () => {
    youtubePlayer = new YT.Player('youtube-music-player', {
      height: '1', width: '1', videoId: SITE_CONFIG.YOUTUBE_VIDEO_ID,
      playerVars: { autoplay: 0, controls: 0, disablekb: 1, playsinline: 1, loop: 1, playlist: SITE_CONFIG.YOUTUBE_VIDEO_ID },
      events: {
        onReady: () => { youtubeReady = true; if (musicPlayRequested) { youtubePlayer.playVideo(); setMusicButton(true); } },
        onStateChange: (event) => { if (event.data === YT.PlayerState.ENDED) youtubePlayer.playVideo(); }
      }
    });
  };
}
musicLabel.textContent = SITE_CONFIG.MUSIC_TITLE || 'Play a Little Surprise ♫';
musicToggle.addEventListener('click', () => {
  if (!youtubeReady) { musicPlayRequested = true; musicLabel.textContent = 'Starting your surprise…'; createYouTubePlayer(); return; }
  const state = youtubePlayer.getPlayerState();
  if (state === YT.PlayerState.PLAYING) { youtubePlayer.pauseVideo(); setMusicButton(false); }
  else { youtubePlayer.playVideo(); setMusicButton(true); }
});
musicRestart.addEventListener('click', () => {
  musicPlayRequested = true;
  if (!youtubeReady) { musicLabel.textContent = 'Starting your surprise…'; createYouTubePlayer(); return; }
  youtubePlayer.seekTo(0, true); youtubePlayer.playVideo(); setMusicButton(true);
});
// Load the official player immediately but keep it silent; the first tap can play with minimal delay.
createYouTubePlayer();

// Smooth section entrances keep the journey premium rather than a static long page.
const revealSections = document.querySelectorAll('.section');
revealSections.forEach((section) => section.classList.add('reveal-ready'));
const revealObserver = new IntersectionObserver((entries) => entries.forEach((entry) => {
  if (entry.isIntersecting) { entry.target.classList.add('revealed'); revealObserver.unobserve(entry.target); }
}), { threshold: .13 });
revealSections.forEach((section) => revealObserver.observe(section));

$('#gift-box').addEventListener('click', () => {
  const box = $('#gift-box');
  if (box.classList.contains('opened')) return;
  box.classList.add('opened');
  setTimeout(() => { $('#gift-reveal').hidden = false; }, 680);
});
