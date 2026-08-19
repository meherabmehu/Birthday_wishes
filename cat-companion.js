/* Slow, occasional behaviors for the two permanent cat companions. */
const walkerCat = document.querySelector('#cat-secret');
const sleepyCat = document.querySelector('#sleepy-cat');
const walkerBubble = walkerCat.querySelector('.cat-bubble');
const sleepyBubble = sleepyCat.querySelector('.cat-bubble');
function resetWalker() {
  walkerCat.className = 'cat-companion cat-walker activity-walk is-active';
  walkerBubble.textContent = 'Taking little steps! 🐾';
  walkerBubble.classList.add('show');
}
function walkerYawn() {
  walkerCat.classList.add('is-yawning');
  walkerBubble.textContent = 'Yaaawn… what a lovely day.';
  setTimeout(resetWalker, 5000);
  // Sometimes it pauses and yawns; it is intentionally not every lap.
  setTimeout(scheduleWalkerYawn, 23000 + Math.random() * 26000);
}
function scheduleWalkerYawn() { setTimeout(walkerYawn, 11000 + Math.random() * 18000); }
const sleepyActivities = [
  { cls: 'activity-stretch', text: 'A slow little stretch…', duration: 7000 },
  { cls: 'activity-play', text: 'A tiny play break! ♡', duration: 8500 },
  { cls: 'activity-groom', text: 'Let me clean my paws.', duration: 8000 }
];
function sleepyWakeUp() {
  const activity = sleepyActivities[Math.floor(Math.random() * sleepyActivities.length)];
  sleepyCat.className = `cat-companion cat-home is-active ${activity.cls}`;
  sleepyBubble.textContent = activity.text; sleepyBubble.classList.add('show');
  setTimeout(() => {
    sleepyCat.className = 'cat-companion cat-home activity-sleep is-active';
    sleepyBubble.textContent = 'Dreaming of Nisa…';
    setTimeout(sleepyWakeUp, 22000 + Math.random() * 26000);
  }, activity.duration);
}
document.addEventListener('main-experience-started', () => {
  resetWalker();
  setTimeout(scheduleWalkerYawn, 17000);
  setTimeout(sleepyWakeUp, 20000 + Math.random() * 18000);
});
