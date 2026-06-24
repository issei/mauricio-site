/**
 * terminal-evolutivo.js — orquestrador do scrollytelling v3 "Semântica Humana"
 * Spec: docs/specs/pages/terminal-evolutivo/01_SDD_v3_semantica_humana.md
 * ---------------------------------------------------------------------------
 * SEM WebGL/Three.js. O ambiente é CSS+SVG (#ambient). Este módulo só governa
 * o FOREGROUND e degrada com graça (sem JS, a página fica íntegra):
 *   1. Tema por era  — ScrollTrigger onEnter/onEnterBack (sem flicker)
 *   2. Reveal        — IntersectionObserver nas .passage
 *   3. Silêncio 2004 — body.is-mourning dessatura o #ambient (sem trava de scroll)
 *   4. Blueprint     — o SVG do Marco "se desenha" ao entrar na viewport
 *   5. Hero          — o subtítulo emerge de um leve desfoque ("sintonizando")
 *   6. Vídeo facade  — iframe só ao clicar (perf + privacidade)
 * Respeita prefers-reduced-motion em tudo que anima.
 */
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const body = document.body;
const eras = [...document.querySelectorAll('.era[data-theme]')];
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const THEMES = ['theme-terminal', 'theme-wire', 'theme-net', 'theme-cloud', 'theme-ai'];

// cor do <meta theme-color> por fase (barra do navegador móvel acompanha o tema)
const THEME_COLORS = {
  terminal: '#070803', wire: '#03100b', net: '#070f1d', cloud: '#0e141d', ai: '#080a10',
};
function setThemeColor(theme) {
  let meta = document.querySelector('meta[name="theme-color"]');
  if (!meta) { meta = document.createElement('meta'); meta.name = 'theme-color'; document.head.appendChild(meta); }
  meta.setAttribute('content', THEME_COLORS[theme] || '#080a10');
}
setThemeColor('terminal'); // estado inicial (hero)

// ---- Reveal das passagens (enhancement) ------------------------------------
// Só "arma" o esconde-para-revelar quando há IntersectionObserver e sem
// reduce-motion — caso contrário o conteúdo permanece visível por padrão (CSS).
const passages = document.querySelectorAll('.passage');
if (!reduce && 'IntersectionObserver' in window && passages.length) {
  document.documentElement.classList.add('reveal-ready');
  const revealIO = new IntersectionObserver((entries, obs) => {
    for (const e of entries) {
      if (e.isIntersecting) { e.target.classList.add('is-visible'); obs.unobserve(e.target); }
    }
  }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });
  passages.forEach((el) => revealIO.observe(el));
}

// ---- Hero: "sintonizando o sinal" (subtítulo emerge do desfoque) -----------
const tune = document.querySelector('.hero__tune');
if (tune && document.documentElement.classList.contains('reveal-ready')) {
  requestAnimationFrame(() => requestAnimationFrame(() => tune.classList.add('is-tuned')));
}

// ---- Timeline lateral ------------------------------------------------------
function syncTimeline(section) {
  document.querySelectorAll('.timeline [data-jump]').forEach((a) => {
    const on = a.dataset.jump === section.dataset.era;
    a.classList.toggle('is-active', on);
    a.setAttribute('aria-current', on ? 'true' : 'false');
  });
}

// ---- Tema do foreground por fase (sempre; com ou sem movimento) ------------
function setTheme(section) {
  body.classList.remove(...THEMES);
  body.classList.add('theme-' + section.dataset.theme);
  setThemeColor(section.dataset.theme);
  if (section.dataset.era) syncTimeline(section);
}

eras.forEach((section) =>
  ScrollTrigger.create({
    trigger: section,
    start: 'top center',
    end: 'bottom center',
    onEnter: () => setTheme(section),
    onEnterBack: () => setTheme(section),
  })
);

// ---- Silêncio de Abril/2004: dessatura o ambiente enquanto a seção domina ---
// Sem trava de scroll (a11y): o peso vem do vazio de 100svh. A classe entra/sai
// pela posição; sob reduce-motion o CSS faz a troca instantânea.
const silence = document.querySelector('.silence');
if (silence) {
  ScrollTrigger.create({
    trigger: silence,
    start: 'top 55%',
    end: 'bottom 45%',
    onToggle: (self) => body.classList.toggle('is-mourning', self.isActive),
  });
}

// ---- Marco: o blueprint "se desenha" ao entrar na viewport (uma vez) -------
const marco = document.querySelector('.marco');
if (marco) {
  ScrollTrigger.create({
    trigger: marco,
    start: 'top 70%',
    once: true,
    onEnter: () => marco.classList.add('is-drawn'),
  });
}

// ---- Vídeo facade (clique-para-carregar; nocookie) -------------------------
document.querySelectorAll('.video[data-video]').forEach((box) => {
  const btn = box.querySelector('button');
  if (!btn) return;
  btn.addEventListener('click', () => {
    const id = box.dataset.video;
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`;
    iframe.title = 'Vídeo da jornada de Maurício Issei';
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
    iframe.allowFullscreen = true;
    iframe.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;border:0;';
    box.replaceChildren(iframe);
  });
});
