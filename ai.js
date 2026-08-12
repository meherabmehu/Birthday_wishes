/*
  Secure AI interaction layer. The Groq key stays only in the Cloudflare Worker.
  Before deployment, set SITE_CONFIG.AI_ENDPOINT in config.js.
*/
const aiFallback = {
  wish: ['আজকের প্রতিটি ফুল তোমাকে মনে করিয়ে দিক—তুমি ভীষণ ভালোবাসার যোগ্য, আমার Cute Billi। 🤍', 'তোমার হাসি যেন আজকের আকাশের মতোই উজ্জ্বল থাকে। শুভ জন্মদিন, Nisa। ✦'],
  heart: ['আমার সবচেয়ে শান্তির জায়গা—তুমি।', 'তোমার জন্য আমার দোয়া কখনও ছোট হবে না।'],
  capsule: ['ভবিষ্যতের Nisa, যদি কখনও মন খারাপ হয়, জেনো—Meherab সবসময় তোমার হাসির জন্য দোয়া করে।', 'যে দিনই আসুক, তুমি আমার কাছে ভীষণ special ছিলে, আছো, থাকবে।'],
  cat: ['বিড়ালটা বলছে: Cute Billi-কে Meherab খুব খুব ভালোবাসে। 😽', 'বিড়ালের secret: Nisa হাসলে Meherab-এর পৃথিবী সুন্দর লাগে।'],
  floating: ['তুমি আমার favourite kind of peace. ♡', 'শুভ জন্মদিন, আমার future wife। InshaAllah. ✦']
};
const aiMemory = new Map();
let fallbackAt = 0;

async function getAiMessage(type) {
  const endpoint = SITE_CONFIG.AI_ENDPOINT?.trim();
  if (endpoint) {
    try {
      const response = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ type, previous: aiMemory.get(type) || '' }) });
      if (!response.ok) throw new Error('AI request failed');
      const data = await response.json();
      if (data.message) { aiMemory.set(type, data.message); return data.message; }
    } catch (error) { console.warn('AI temporarily unavailable; using local fallback.', error); }
  }
  const options = aiFallback[type] || aiFallback.wish;
  fallbackAt = (fallbackAt + 1) % options.length;
  return options[fallbackAt];
}

async function toggleAiMessage(trigger, target, type, setMessage) {
  if (!target.hidden) { target.hidden = true; return; }
  trigger.classList.add('is-thinking');
  setMessage('A little thought is blooming… ✦'); target.hidden = false;
  const message = await getAiMessage(type);
  setMessage(`“${message}”`); trigger.classList.remove('is-thinking');
}

const wishCapsule = $('#wish-capsule'); const wishCard = $('#wish-card');
wishCapsule.addEventListener('click', () => toggleAiMessage(wishCapsule, wishCard, 'wish', (message) => { $('#wish-text').textContent = message; }));
let autoWishStarted = false;
function autoWish() {
  if (wishCard.hidden) return;
  getAiMessage('wish').then((message) => { $('#wish-text').textContent = `“${message}”`; });
}
// After the first deliberate click, the wish changes softly every 14 seconds.
wishCapsule.addEventListener('click', () => { if (!autoWishStarted) { autoWishStarted = true; setInterval(autoWish, 14000); } });

const heart = $('#secret-heart'); const heartMessage = $('#secret-message');
heart.addEventListener('click', () => toggleAiMessage(heart, heartMessage, 'heart', (message) => { heartMessage.textContent = message; }));

const timeCapsule = $('#open-capsule'); const capsuleLetter = $('#capsule-letter');
timeCapsule.addEventListener('click', () => toggleAiMessage(timeCapsule, capsuleLetter, 'capsule', (message) => { capsuleLetter.innerHTML = `<span class="eyebrow">FROM MEHERAB, ALWAYS</span><p>${message}</p><strong>Forever cheering for you, my Nisa. 🤍</strong>`; }));

const catSecret = $('#cat-secret'); let catMessage;
catSecret.addEventListener('click', async () => {
  if (catMessage && !catMessage.hidden) { catMessage.hidden = true; return; }
  if (!catMessage) { catMessage = document.createElement('p'); catMessage.className = 'floating-note'; catMessage.style.left = '12vw'; catMessage.style.top = '68vh'; document.body.appendChild(catMessage); }
  catMessage.hidden = false; catMessage.textContent = 'The cat is thinking… ✦';
  catMessage.textContent = await getAiMessage('cat');
});

// Sparse AI floating wishes—kept slow to protect free-tier rate limits.
async function aiFloat() {
  const note = document.createElement('p'); note.className = 'floating-note';
  note.style.left = `${6 + Math.random() * 55}vw`; note.style.top = `${34 + Math.random() * 52}vh`;
  note.textContent = await getAiMessage('floating'); document.body.appendChild(note);
  setTimeout(() => note.remove(), 10500);
}
setTimeout(aiFloat, 7000); setInterval(aiFloat, 18000);
