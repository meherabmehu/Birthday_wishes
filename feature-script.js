// Cake: first tap lights the candle, second tap sends the birthday wish.
const cake = $('#birthday-cake');
const cakeMessage = $('#cake-message');
cake.addEventListener('click', () => {
  if (!cake.classList.contains('lit')) {
    cake.classList.add('lit'); cakeMessage.hidden = false;
    cakeMessage.textContent = 'Close your eyes, Cute Billi. Make one beautiful wish. ✦';
  } else { cake.classList.remove('lit'); cakeMessage.textContent = 'May Allah accept every good prayer hidden in your heart. Happy Birthday, Nisa. 🤍'; launchFireworks(); }
});

// AI-powered time capsule is initialized in ai.js.

// Tiny quiz with a playful ending.
const quizItems = [
  { q: 'Who loves Cute Billi the most?', a: ['Meherab, always 😽', 'Everyone else'], correct: 0 },
  { q: 'Who wants to celebrate every birthday with Nisa?', a: ['Meherab, InshaAllah', 'Nobody'], correct: 0 },
  { q: 'Who is waiting to call Nisa his forever?', a: ['Her Meherab 🤍', 'A random person'], correct: 0 }
];
let quizAt = 0;
function renderQuiz() {
  const item = quizItems[quizAt]; $('#quiz-question').textContent = item.q; $('#quiz-result').textContent = '';
  const holder = $('#quiz-options'); holder.innerHTML = '';
  item.a.forEach((answer, index) => { const button = document.createElement('button'); button.textContent = answer; button.addEventListener('click', () => {
    if (index === item.correct) { $('#quiz-result').textContent = quizAt === quizItems.length - 1 ? 'Correct answer: Meherab, always. 😽' : 'Correct! You know your Meherab very well. ✦'; quizAt++; setTimeout(() => { if (quizAt < quizItems.length) renderQuiz(); }, 1100); }
    else $('#quiz-result').textContent = 'Hmm… try again, Cute Billi. ♡';
  }); holder.appendChild(button); });
}
renderQuiz();

// AI-powered cat easter egg is initialized in ai.js.
