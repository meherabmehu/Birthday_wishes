/* A canvas celebration gives the opening scene a rich flower shower without slowing the page. */
let celebrationFrame = null;
let celebrationResize = null;
function startCelebrationCanvas() {
  stopCelebrationCanvas();
  const canvas = document.getElementById('celebration-canvas');
  const ctx = canvas.getContext('2d');
  const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
  let width, height, petals = [], previous = 0;
  const palette = ['#ffb5ca', '#ff7eaa', '#ffe0a3', '#fff1c7', '#d971a0', '#ffc1d5'];
  function resize() {
    width = window.innerWidth; height = window.innerHeight;
    canvas.width = width * dpr; canvas.height = height * dpr;
    canvas.style.width = `${width}px`; canvas.style.height = `${height}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const total = width < 600 ? 125 : 210;
    petals = Array.from({ length: total }, (_, i) => makePetal(i < total * .78));
  }
  function makePetal(scatter) {
    const roll = Math.random();
    return { x: Math.random() * width, y: scatter ? Math.random() * height : -30 - Math.random() * height, size: 7 + Math.random() * 15, speed: .8 + Math.random() * 2.65, drift: (Math.random() - .5) * .85, phase: Math.random() * Math.PI * 2, rotation: Math.random() * 6.28, spin: (Math.random() - .5) * .075, kind: roll < .22 ? 'heart' : roll < .38 ? 'flower' : roll < .46 ? 'star' : 'petal', color: palette[Math.floor(Math.random() * palette.length)] };
  }
  function heart(x, y, size, color) {
    ctx.fillStyle = color; ctx.beginPath(); ctx.moveTo(x, y + size * .28);
    ctx.bezierCurveTo(x - size, y - size * .42, x - size * .8, y - size, x, y - size * .26);
    ctx.bezierCurveTo(x + size * .8, y - size, x + size, y - size * .42, x, y + size * .28); ctx.fill();
  }
  function flower(size, color) {
    ctx.fillStyle = color;
    for (let i = 0; i < 5; i++) { ctx.save(); ctx.rotate(i * Math.PI * .4); ctx.beginPath(); ctx.ellipse(0, -size * .48, size * .36, size * .58, 0, 0, Math.PI * 2); ctx.fill(); ctx.restore(); }
    ctx.fillStyle = '#ffe29b'; ctx.beginPath(); ctx.arc(0, 0, size * .25, 0, Math.PI * 2); ctx.fill();
  }
  function draw(p) {
    ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rotation); ctx.globalAlpha = .9;
    if (p.kind === 'heart') heart(0, 0, p.size, p.color);
    else if (p.kind === 'flower') flower(p.size, p.color);
    else if (p.kind === 'star') { ctx.fillStyle = p.color; ctx.font = `${p.size * 1.8}px serif`; ctx.fillText('✦', -p.size * .55, p.size * .55); }
    else { ctx.fillStyle = p.color; ctx.beginPath(); ctx.ellipse(0, 0, p.size * .55, p.size, .48, 0, Math.PI * 2); ctx.fill(); }
    ctx.restore();
  }
  function render(time) {
    celebrationFrame = requestAnimationFrame(render);
    if (time - previous < 33) return; previous = time;
    ctx.clearRect(0, 0, width, height);
    petals.forEach((p) => { p.y += p.speed; p.x += Math.sin(time / 800 + p.phase) * .8 + p.drift; p.rotation += p.spin; if (p.y > height + 35 || p.x < -35 || p.x > width + 35) Object.assign(p, makePetal(false)); draw(p); });
  }
  celebrationResize = resize; window.addEventListener('resize', resize); resize(); celebrationFrame = requestAnimationFrame(render);
}
function stopCelebrationCanvas() {
  if (celebrationFrame) cancelAnimationFrame(celebrationFrame); celebrationFrame = null;
  if (celebrationResize) window.removeEventListener('resize', celebrationResize); celebrationResize = null;
  const canvas = document.getElementById('celebration-canvas'); if (canvas) { const ctx = canvas.getContext('2d'); ctx.clearRect(0, 0, canvas.width, canvas.height); }
}
