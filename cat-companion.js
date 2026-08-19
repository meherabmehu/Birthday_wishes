/* Coordinated, slow pet behaviors: only one cat has a special moment at a time. */
const walkerCat = document.querySelector('#cat-secret');
const sleepyCat = document.querySelector('#sleepy-cat');
const walkerBubble = walkerCat.querySelector('.cat-bubble');
const sleepyBubble = sleepyCat.querySelector('.cat-bubble');
let specialBusy = false;
function setBubble(el, text) { el.textContent = text; el.classList.add('show'); }
function endWalkerSpecial() { walkerCat.classList.remove('is-special', 'is-yawning', 'is-playing', 'is-wishing'); walkerBubble.textContent = 'Taking little steps! 🐾'; }
function runWalkerSpecial() {
  if (specialBusy) return setTimeout(runWalkerSpecial, 4500);
  specialBusy = true;
  const events = [
    { cls: 'is-yawning', text: 'Yaaawn… such a beautiful day.', duration: 3900 },
    { cls: 'is-playing', text: 'A little play break! ♡', duration: 4800 },
    { cls: 'is-wishing', text: 'Happy Birthday, Nisa! 🐾', duration: 5200 }
  ];
  const event = events[Math.floor(Math.random() * events.length)];
  walkerCat.classList.add('is-special', event.cls); setBubble(walkerBubble, event.text);
  setTimeout(() => { endWalkerSpecial(); specialBusy = false; setTimeout(runWalkerSpecial, 13500 + Math.random() * 11000); }, event.duration);
}
const sleepyActivities = [
  { cls: 'activity-stretch', text: 'Good morning, Nisa! ♡', duration: 5700 },
  { cls: 'activity-play', text: 'Happy Birthday, Nisa!', duration: 6200 },
  { cls: 'activity-groom', text: 'Wishing you a purr-fect day!', duration: 5800 }
];
function sleepyWakeUp() {
  if (specialBusy) return setTimeout(sleepyWakeUp, 5000);
  specialBusy = true;
  const activity = sleepyActivities[Math.floor(Math.random() * sleepyActivities.length)];
  sleepyCat.className = `cat-companion cat-home is-active ${activity.cls}`;
  setBubble(sleepyBubble, activity.text);
  setTimeout(() => {
    sleepyCat.className = 'cat-companion cat-home activity-sleep is-active';
    sleepyBubble.textContent = 'Dreaming of Nisa…';
    specialBusy = false;
    setTimeout(sleepyWakeUp, 14500 + Math.random() * 12500);
  }, activity.duration);
}
document.addEventListener('main-experience-started', () => {
  setTimeout(runWalkerSpecial, 12000 + Math.random() * 5000);
  setTimeout(sleepyWakeUp, 16500 + Math.random() * 10000);
});
