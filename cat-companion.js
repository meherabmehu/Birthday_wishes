/* Coordinated, slow pet behaviors: the sleeper wakes once, enjoys activities, then chooses to nap. */
const walkerCat = document.querySelector('#cat-secret');
const sleepyCat = document.querySelector('#sleepy-cat');
const walkerBubble = walkerCat.querySelector('.cat-bubble');
const sleepyBubble = sleepyCat.querySelector('.cat-bubble');
let specialBusy = false;
function setBubble(el, text) { el.textContent = text; el.classList.add('show'); }
function endWalkerSpecial() { walkerCat.classList.remove('is-special', 'is-yawning', 'is-playing', 'is-wishing'); walkerBubble.textContent = 'Taking little steps! 🐾'; }
function runWalkerSpecial() {
  if (specialBusy) return setTimeout(runWalkerSpecial, 2800);
  specialBusy = true;
  const events = [
    { cls: 'is-yawning', text: 'Yaaawn… such a beautiful day.', duration: 3800 },
    { cls: 'is-playing', text: 'A little play break! ♡', duration: 4300 },
    { cls: 'is-wishing', text: 'Happy Birthday, Nisa! 🐾', duration: 4600 }
  ];
  const event = events[Math.floor(Math.random() * events.length)];
  walkerCat.classList.add('is-special', event.cls); setBubble(walkerBubble, event.text);
  setTimeout(() => { endWalkerSpecial(); specialBusy = false; setTimeout(runWalkerSpecial, 7200 + Math.random() * 7000); }, event.duration);
}
const sleepyActivities = [
  { cls: 'activity-play', text: 'Happy Birthday, Nisa! Let’s play! ♡', duration: 5600 },
  { cls: 'activity-groom', text: 'A purr-fect birthday wish for you, Nisa!', duration: 5400 },
  { cls: 'activity-play', text: 'May your day be full of love, Nisa!', duration: 5700 }
];
function setSleepyActivity(cls, text) {
  sleepyCat.className = `cat-companion cat-home is-active ${cls}`;
  setBubble(sleepyBubble, text);
}
function sleepyTired() {
  setSleepyActivity('activity-sleep', 'I’m tired now… time for a little nap. 💤');
  setTimeout(() => {
    sleepyBubble.textContent = 'Dreaming of Nisa…';
    specialBusy = false;
    setTimeout(sleepyWakeUp, 17000 + Math.random() * 15000);
  }, 4500);
}
function runSleepyActivity(turn) {
  const activity = sleepyActivities[Math.floor(Math.random() * sleepyActivities.length)];
  setSleepyActivity(activity.cls, activity.text);
  setTimeout(() => {
    // After waking, the cat enjoys two activities before deciding to sleep again.
    if (turn < 1) runSleepyActivity(turn + 1);
    else sleepyTired();
  }, activity.duration);
}
function sleepyWakeUp() {
  if (specialBusy) return setTimeout(sleepyWakeUp, 3500);
  specialBusy = true;
  // This wake-up reaction happens only once in every sleep-to-awake cycle.
  setSleepyActivity('activity-stretch', 'Good morning, Nisa! Big stretch…');
  setTimeout(() => runSleepyActivity(0), 5700);
}
document.addEventListener('main-experience-started', () => {
  setTimeout(runWalkerSpecial, 9000 + Math.random() * 5000);
  setTimeout(sleepyWakeUp, 15000 + Math.random() * 9000);
});
