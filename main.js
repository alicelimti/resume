// ── Hero: 요소별 순차 페이드인 ──────────────────────────
const heroEls = [
  document.querySelector('.hero-photo'),
  document.querySelector('.name'),
  document.querySelector('.tagline'),
  document.querySelector('.contacts'),
];

heroEls.forEach((el, i) => {
  if (!el) return;
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = `opacity 0.6s ease, transform 0.6s ease`;
  setTimeout(() => {
    el.style.opacity = '1';
    el.style.transform = 'translateY(0)';
  }, 200 + i * 180);
});

// ── Hero: 타이핑 효과 (tagline) ─────────────────────────
const tagline = document.querySelector('.tagline');
if (tagline) {
  const text = tagline.textContent.trim();
  tagline.textContent = '';

  let index = 0;
  const type = () => {
    if (index < text.length) {
      tagline.textContent += text[index++];
      setTimeout(type, 60);
    }
  };
  // 페이드인 딜레이 이후 타이핑 시작
  setTimeout(type, 200 + 1 * 180 + 300);
}

// ── Hero: 프로필 사진 마우스 호버 틸트 ──────────────────
const photoEl = document.querySelector('.hero-photo img');
if (photoEl) {
  const wrapper = photoEl.parentElement;
  wrapper.addEventListener('mousemove', (e) => {
    const rect = wrapper.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20;
    photoEl.style.transform = `rotate3d(${-y}, ${x}, 0, 12deg) scale(1.05)`;
    photoEl.style.transition = 'transform 0.1s ease';
  });
  wrapper.addEventListener('mouseleave', () => {
    photoEl.style.transform = 'rotate3d(0,0,0,0deg) scale(1)';
    photoEl.style.transition = 'transform 0.4s ease';
  });
}

// ── Hero: 배경 파티클 ────────────────────────────────────
const hero = document.querySelector('.hero');
if (hero) {
  const canvas = document.createElement('canvas');
  Object.assign(canvas.style, {
    position: 'absolute', top: '0', left: '0',
    width: '100%', height: '100%',
    pointerEvents: 'none', opacity: '0.35',
  });
  hero.style.position = 'relative';
  hero.style.overflow = 'hidden';
  hero.prepend(canvas);

  const ctx = canvas.getContext('2d');
  const resize = () => { canvas.width = hero.offsetWidth; canvas.height = hero.offsetHeight; };
  resize();
  window.addEventListener('resize', resize);

  const dots = Array.from({ length: 38 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 2.5 + 1,
    dx: (Math.random() - 0.5) * 0.4,
    dy: (Math.random() - 0.5) * 0.4,
  }));

  const tick = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    dots.forEach((d) => {
      d.x += d.dx; d.y += d.dy;
      if (d.x < 0 || d.x > canvas.width) d.dx *= -1;
      if (d.y < 0 || d.y > canvas.height) d.dy *= -1;
      ctx.beginPath();
      ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255,255,255,0.8)';
      ctx.fill();
    });
    // 가까운 점끼리 선 연결
    for (let i = 0; i < dots.length; i++) {
      for (let j = i + 1; j < dots.length; j++) {
        const dist = Math.hypot(dots[i].x - dots[j].x, dots[i].y - dots[j].y);
        if (dist < 90) {
          ctx.beginPath();
          ctx.moveTo(dots[i].x, dots[i].y);
          ctx.lineTo(dots[j].x, dots[j].y);
          ctx.strokeStyle = `rgba(255,255,255,${0.3 * (1 - dist / 90)})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(tick);
  };
  tick();
}

// ── 스크롤 섹션 페이드인 ────────────────────────────────
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  },
  { threshold: 0.1 }
);

document.querySelectorAll('.section').forEach((section) => {
  section.style.opacity = '0';
  section.style.transform = 'translateY(20px)';
  section.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(section);
});
