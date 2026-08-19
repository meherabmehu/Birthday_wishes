/* Rotate the 3D cat through different cute activities instead of repeating one pose. */
const companion = document.querySelector('#cat-secret');
const companionBubble = companion.querySelector('.cat-bubble');
const catActivities = [
  { name: 'walk', duration: 13000, bubble: 'Off on a tiny adventure! 🐾' },
  { name: 'groom', duration: 8000, bubble: 'Paw cleaning time.' },
  { name: 'sleep', duration: 9000, bubble: 'Just a little nap…' },
  { name: 'stretch', duration: 7500, bubble: 'Big stretch, happy heart.' },
  { name: 'play', duration: 8000, bubble: 'A heart to play with! ♡' }
];
let previousActivity = -1;
function runCatActivity() {
  let next = Math.floor(Math.random() * catActivities.length);
  if (next === previousActivity) next = (next + 1 + Math.floor(Math.random() * (catActivities.length - 1))) % catActivities.length;
  previousActivity = next;
  const activity = catActivities[next];
  companion.className = 'cat-companion cat-dynamic';
  void companion.offsetWidth; // restart the activity cleanly
  companion.classList.add(`activity-${activity.name}`, 'is-active');
  companionBubble.textContent = activity.bubble;
  companionBubble.classList.add('show');
  setTimeout(() => companionBubble.classList.remove('show'), 3300);
  setTimeout(() => {
    companion.classList.remove('is-active');
    setTimeout(runCatActivity, 1800 + Math.random() * 2600);
  }, activity.duration);
}
document.addEventListener('main-experience-started', () => setTimeout(runCatActivity, 2300));
