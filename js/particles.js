// Animated Particles Background (Stars & Colorful Bubbles)
(function() {
  const canvas = document.createElement('canvas');
  canvas.id = 'particles-bg';
  canvas.style.position = 'fixed';
  canvas.style.top = 0;
  canvas.style.left = 0;
  canvas.style.width = '100vw';
  canvas.style.height = '100vh';
  canvas.style.pointerEvents = 'none';
  // Set z-index very high so particles appear above all content
  canvas.style.zIndex = '9999';
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  let width = window.innerWidth;
  let height = window.innerHeight;

  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
  }
  window.addEventListener('resize', resize);
  resize();

  // Particle settings
  const STAR_COLORS = [
    '255,255,255',   // white
    '140,197,252',   // blue
    '255,184,227',   // pink
    '255,235,59',    // yellow
    '108,71,255',    // purple
    '0,255,255',     // aqua
    '255,120,0'      // orange
  ];
  const BUBBLE_COLORS = [
    'rgba(140,197,252,0.55)', // blue
    'rgba(255,184,227,0.55)', // pink
    'rgba(108,71,255,0.55)',  // purple
    'rgba(255,255,255,0.45)', // white
    'rgba(255,235,59,0.45)',  // yellow
    'rgba(76,175,80,0.45)'    // green
  ];
  const STAR_COUNT = Math.floor(width / 28);
  const BUBBLE_COUNT = 7;
  const particles = [];

  // Star particles
  for (let i = 0; i < STAR_COUNT; i++) {
    particles.push({
      type: 'star',
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 0.9 + 0.5,
      speed: Math.random() * 0.4 + 0.1,
      color: STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)],
      sparkleOffset: Math.random() * 1000 // for unique twinkle
    });
  }
  // Bubble particles
  for (let i = 0; i < BUBBLE_COUNT; i++) {
    particles.push({
      type: 'bubble',
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 1.2 + 0.8,
      color: BUBBLE_COLORS[Math.floor(Math.random() * BUBBLE_COLORS.length)],
      speed: Math.random() * 0.7 + 0.25
    });
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    for (let p of particles) {
      if (p.type === 'star') {
        // Sparkle animation: gently pulse opacity
        const sparkle = 0.7 + 0.3 * Math.sin(Date.now() / 650 + p.sparkleOffset);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, 2 * Math.PI);
        ctx.fillStyle = `rgba(${p.color},${sparkle})`;
        ctx.shadowColor = `rgba(${p.color},1)`;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
        p.y += p.speed;
        if (p.y > height) {
          p.y = -p.r;
          p.x = Math.random() * width;
        }
      } else if (p.type === 'bubble') {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, 2 * Math.PI);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = 0.7;
        ctx.fill();
        ctx.globalAlpha = 1.0;
        p.y += p.speed;
        if (p.y - p.r > height) {
          p.y = -p.r * 2;
          p.x = Math.random() * width;
          p.r = Math.random() * 7 + 7;
          p.color = BUBBLE_COLORS[Math.floor(Math.random() * BUBBLE_COLORS.length)];
        }
      }
    }
    requestAnimationFrame(animate);
  }
  animate();
})();
