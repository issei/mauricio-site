/*
 * engenharia-agentes-ia — comportamento do shell (WU-1)
 * Reusa libs já instaladas: lenis (scroll suave) + gsap (não obrigatório aqui).
 * Tudo guardado: respeita prefers-reduced-motion e nunca lança erro na carga.
 */
const prefersReduced =
  window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---- Barra de progresso de leitura ---- */
function initProgress() {
  const bar = document.querySelector('[data-eai-progress]');
  if (!bar) return;
  const update = () => {
    const h = document.documentElement;
    const max = h.scrollHeight - h.clientHeight;
    const pct = max > 0 ? (h.scrollTop / max) * 100 : 0;
    bar.style.width = `${Math.min(100, Math.max(0, pct))}%`;
  };
  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update, { passive: true });
  update();
}

/* ---- Link de navegação ativo via IntersectionObserver ---- */
function initActiveNav() {
  const links = Array.from(document.querySelectorAll('[data-eai-navlink]'));
  if (!links.length || !('IntersectionObserver' in window)) return;
  const byId = new Map(
    links.map((a) => [a.getAttribute('href').slice(1), a])
  );
  const sections = Array.from(byId.keys())
    .map((id) => document.getElementById(id))
    .filter(Boolean);

  const setCurrent = (id) => {
    links.forEach((a) =>
      a.setAttribute('aria-current', a.getAttribute('href') === `#${id}` ? 'true' : 'false')
    );
  };

  const obs = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setCurrent(visible.target.id);
    },
    { rootMargin: '-45% 0px -50% 0px', threshold: [0, 0.25, 0.5] }
  );
  sections.forEach((s) => obs.observe(s));
}

/* ---- Reveal de seções ---- */
function initReveal() {
  const items = Array.from(document.querySelectorAll('[data-eai-reveal]'));
  if (!items.length) return;
  if (prefersReduced || !('IntersectionObserver' in window)) {
    items.forEach((el) => el.classList.add('is-visible'));
    return;
  }
  const obs = new IntersectionObserver(
    (entries, o) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
          o.unobserve(e.target);
        }
      });
    },
    { rootMargin: '0px 0px -10% 0px', threshold: 0.12 }
  );
  items.forEach((el) => obs.observe(el));
}

/* ---- Scroll suave (lenis), só se houver movimento permitido ---- */
async function initSmoothScroll() {
  if (prefersReduced) return;
  try {
    const { default: Lenis } = await import('lenis');
    const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
    // Âncoras internas usam o lenis para rolar suave
    document.querySelectorAll('a[href^="#"]').forEach((a) => {
      a.addEventListener('click', (ev) => {
        const id = a.getAttribute('href');
        if (id.length > 1) {
          const target = document.querySelector(id);
          if (target) {
            ev.preventDefault();
            lenis.scrollTo(target, { offset: -70 });
          }
        }
      });
    });
  } catch {
    /* lenis indisponível → mantém scroll nativo, sem erro */
  }
}

function boot() {
  initProgress();
  initActiveNav();
  initReveal();
  initSmoothScroll();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}
