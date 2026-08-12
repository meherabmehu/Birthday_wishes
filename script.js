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

$('#secret-heart').addEventListener('click', () => { $('#secret-message').hidden = false; $('#secret-heart').classList.add('opened'); });
document.querySelectorAll('.yes').forEach((button) => button.addEventListener('click', () => { $('#yes-message').hidden = false; document.body.classList.add('celebrate'); }));
