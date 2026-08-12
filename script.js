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

const photos = SITE_CONFIG.PHOTOS || [];
const image = $('#slide-image');
const empty = $('#empty-gallery');
const overlay = document.querySelector('.slide-overlay');
const count = $('#slide-count');
let active = 0, timer;
function showSlide(index) {
  active = (index + photos.length) % photos.length;
  image.classList.add('fade-out');
  setTimeout(() => {
    image.src = photos[active];
    image.onload = () => image.classList.remove('fade-out');
    count.textContent = `${String(active + 1).padStart(2, '0')} / ${String(photos.length).padStart(2, '0')}`;
  }, 230);
}
function runGallery() {
  if (!photos.length) return;
  empty.hidden = true; image.hidden = false; overlay.hidden = false;
  showSlide(0);
  timer = setInterval(() => showSlide(active + 1), SITE_CONFIG.SLIDE_DURATION || 4000);
}
$('#next').addEventListener('click', () => { clearInterval(timer); showSlide(active + 1); });
$('#previous').addEventListener('click', () => { clearInterval(timer); showSlide(active - 1); });
runGallery();

// Soft, cross-fading photo atmosphere: it uses the same photo files as the slideshow.
const atmosphereLayers = [...document.querySelectorAll('.photo-layer')];
let atmospherePhoto = 0;
function changeAtmosphere() {
  if (!photos.length) return;
  const layer = atmosphereLayers[atmospherePhoto % atmosphereLayers.length];
  atmosphereLayers.forEach((item) => item.classList.remove('visible'));
  layer.style.backgroundImage = `url("${photos[atmospherePhoto % photos.length]}")`;
  requestAnimationFrame(() => layer.classList.add('visible'));
  atmospherePhoto++;
}
changeAtmosphere();
if (photos.length) setInterval(changeAtmosphere, 6500);

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

const birthdayWishes = [
  'May your smile stay as bright as the love you bring into my life. Happy Birthday, my Cute Billi.',
  'My prayer for you: a peaceful heart, a beautiful life, and dreams that come true one by one.',
  'You are one of Allah’s most precious gifts in my life. I hope today reminds you how loved you are.',
  'I hope every flower you see today reminds you that you deserve a world full of beautiful things.',
  'To my favorite person: may this year bring you closer to every little happiness your heart is waiting for.'
];
let wishIndex = -1;
function showWish() {
  const next = Math.floor(Math.random() * birthdayWishes.length);
  wishIndex = birthdayWishes.length > 1 && next === wishIndex ? (next + 1) % birthdayWishes.length : next;
  $('#wish-text').textContent = `“${birthdayWishes[wishIndex]}”`;
  $('#wish-card').hidden = false;
  $('#wish-capsule').hidden = true;
}
$('#wish-capsule').addEventListener('click', showWish);
$('#another-wish').addEventListener('click', showWish);

$('#secret-heart').addEventListener('click', () => { $('#secret-message').hidden = false; $('#secret-heart').classList.add('opened'); });
document.querySelectorAll('.yes').forEach((button) => button.addEventListener('click', () => { $('#yes-message').hidden = false; document.body.classList.add('celebrate'); }));

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
