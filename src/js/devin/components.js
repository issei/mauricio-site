import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ── ToC scrollspy via IntersectionObserver ──────────────────────────────────
export function initToC() {
  const toc = document.querySelector('.devin-toc');
  if (!toc) return;

  const items = toc.querySelectorAll('.devin-toc__item');
  const sectionIds = [...items]
    .map(i => i.getAttribute('href')?.slice(1))
    .filter(Boolean);
  const sections = sectionIds
    .map(id => document.getElementById(id))
    .filter(Boolean);

  if (!sections.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        items.forEach(item =>
          item.classList.toggle('is-active', item.getAttribute('href') === `#${id}`)
        );
      }
    });
  }, { rootMargin: '-20% 0px -60% 0px', threshold: 0 });

  sections.forEach(s => observer.observe(s));
}

// ── File Explorer tabs ──────────────────────────────────────────────────────
export function initFileExplorer() {
  const explorer = document.getElementById('file-explorer');
  if (!explorer) return;

  const tabs   = explorer.querySelectorAll('.ep07-ide__tab');
  const panels = explorer.querySelectorAll('.ep07-ide__panel');

  tabs.forEach(tab => tab.addEventListener('click', () => {
    const panelId = `ide-panel-${tab.dataset.panel}`;
    tabs.forEach(t => t.setAttribute('aria-selected', 'false'));
    tab.setAttribute('aria-selected', 'true');
    panels.forEach(panel => {
      const active = panel.id === panelId;
      panel.dataset.active = String(active);
      if (active) {
        gsap.fromTo(panel, { opacity: 0 }, { opacity: 1, duration: 0.25, ease: 'power2.out' });
      }
    });
  }));
}

// ── ReAct cycle — clearInterval ao sair da viewport ────────────────────────
export function initReactCycle() {
  const diagram = document.getElementById('react-loop-diagram');
  if (!diagram) return;

  const nodes = [...diagram.querySelectorAll('.ep05-react-node')];
  if (!nodes.length) return;

  let current = 0;
  let intervalId = null;

  const activate = i => {
    nodes.forEach((n, j) => {
      n.classList.toggle('ep05-react-node--active', j === i);
      n.classList.toggle('ep05-react-node--inactive', j !== i);
    });
  };

  const start = () => {
    if (intervalId !== null) return;
    activate(current);
    intervalId = setInterval(() => {
      current = (current + 1) % nodes.length;
      activate(current);
    }, 1500);
  };

  const stop = () => {
    clearInterval(intervalId);
    intervalId = null;
    nodes.forEach(n => {
      n.classList.remove('ep05-react-node--active', 'ep05-react-node--inactive');
    });
  };

  new IntersectionObserver(
    entries => entries.forEach(e => e.isIntersecting ? start() : stop()),
    { threshold: 0.3 }
  ).observe(diagram);
}

// ── Respiros editoriais — fade-in da frase Playfair ─────────────────────────
export function initRespiros() {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.querySelectorAll('.devin-respiro .devin-respiro__frase').forEach(frase => {
    gsap.set(frase, { opacity: 0, y: reduced ? 0 : 20 });
    ScrollTrigger.create({
      trigger: frase.closest('.devin-respiro'),
      start: 'top 60%',
      once: true,
      onEnter() {
        gsap.to(frase, {
          opacity: 1,
          y: 0,
          duration: reduced ? 0.3 : 1.4,
          ease: 'power2.out',
        });
      },
    });
  });
}

export function initComponents() {
  initToC();
  initFileExplorer();
  initReactCycle();
  initRespiros();
}
