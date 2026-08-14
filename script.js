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

function unlockSurprise() {
  if (passcode.value.trim().toLowerCase() === SITE_CONFIG.SECRET_CODE.trim().toLowerCase()) {
    lockScreen.classList.add('leaving');
    setTimeout(() => { lockScreen.hidden = true; experience.hidden = false; window.scrollTo(0, 0); }, 700);
  } else {
    codeMessage.textContent = 'Hmm… this little world opens only for Nisa. Try again, Cute Billi 😽';
    passcode.classList.remove('shake'); void passcode.offsetWidth; passcode.classList.add('shake');
  }
}
unlock.addEventListener('click', unlockSurprise);
passcode.addEventListener('keydown', (event) => { if (event.key === 'Enter') unlockSurprise(); });

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
changeAtmosphere();
if (photos.length) setInterval(changeAtmosphere, 7000);

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
setTimeout(sendCatRunning, 2800);
setInterval(sendCatRunning, 15000);

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
setInterval(releaseSpark, 2600);

// Little love notes and birthday wishes float through the page at gentle intervals.
const floatingNotes = [
  'Cute Billi, you are my favorite feeling. ♡',
  'Happy Birthday to my future wife, InshaAllah. ✦',
  'You make my ordinary days feel beautiful.',
  'May every dream in your heart find its way to you.',
  'You are loved—today, tomorrow, always.',
  'Nisa, you deserve a lifetime full of soft happiness.',
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
setTimeout(floatLoveNote, 1800);
setInterval(floatLoveNote, 6100);

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
updateCountdown(); setInterval(updateCountdown, 30000);

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

// Background music is opt-in: the visitor controls it and browsers never autoplay it unexpectedly.
const music = $('#background-music');
const musicToggle = $('#music-toggle');
const musicLabel = $('#music-label');
music.src = SITE_CONFIG.MUSIC_FILE;
musicToggle.addEventListener('click', async () => {
  if (music.paused) {
    try { await music.play(); musicLabel.textContent = 'Pause our song'; musicToggle.setAttribute('aria-label', 'Pause background music'); }
    catch { musicLabel.textContent = 'Add our-song.mp3 first'; }
  } else { music.pause(); musicLabel.textContent = 'Play our song'; musicToggle.setAttribute('aria-label', 'Play background music'); }
});

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
