/* ============================================================
   REPOSITORIO DE MATEMÁTICAS — main.js
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ─── Staggered card entrance ─────────────────────────── */
  const cards = document.querySelectorAll('.group-card');
  if (cards.length) {
    cards.forEach((card, i) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(18px)';
      card.style.transition = `opacity 0.5s ease ${0.9 + i * 0.07}s,
                               transform 0.5s ease ${0.9 + i * 0.07}s,
                               background 0.3s, border-color 0.3s, box-shadow 0.3s`;
      setTimeout(() => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, (900 + i * 70));
    });
  }

  /* ─── Click ripple on cards ───────────────────────────── */
  document.querySelectorAll('.group-card').forEach(card => {
    card.addEventListener('click', function (e) {
      const ripple = document.createElement('span');
      ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        width: 80px; height: 80px;
        background: rgba(16,185,129,0.35);
        left: ${e.offsetX - 40}px;
        top: ${e.offsetY - 40}px;
        transform: scale(0);
        animation: rippleAnim 0.55s ease-out forwards;
        pointer-events: none;
      `;
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  });

  /* inject ripple keyframes once */
  if (!document.getElementById('ripple-style')) {
    const s = document.createElement('style');
    s.id = 'ripple-style';
    s.textContent = `@keyframes rippleAnim {
      to { transform: scale(3); opacity: 0; }
    }`;
    document.head.appendChild(s);
  }

  /* ─── Parallax subtle on mouse move (desktop only) ───── */
  const bgWrapper = document.querySelector('.bg-wrapper');
  if (bgWrapper && window.innerWidth > 768) {
    document.addEventListener('mousemove', (e) => {
      const x = (e.clientX / window.innerWidth  - 0.5) * 8;
      const y = (e.clientY / window.innerHeight - 0.5) * 8;
      bgWrapper.style.transform = `scale(1.06) translate(${x}px, ${y}px)`;
    });
  }

  /* ─── Reduced motion override ─────────────────────────── */
  const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (mq.matches) {
    document.querySelectorAll('.group-card').forEach(c => {
      c.style.opacity = '1';
      c.style.transform = 'none';
      c.style.transition = 'background 0.2s, border-color 0.2s';
    });
  }
});


