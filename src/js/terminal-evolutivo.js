/**
 * terminal-evolutivo.js — orquestrador do scrollytelling (SDD §3.2)
 * ---------------------------------------------------------------------------
 * - Tema do FOREGROUND: trocado por ScrollTrigger.onEnter/onEnterBack (sem
 *   flicker em scrolls curtos). Funciona SEMPRE, mesmo sem WebGL.
 * - BACKGROUND WebGL (opcional): morphing contínuo + voo de câmera, "scrubado"
 *   pelo scroll, com RENDER SOB DEMANDA (sem ticker contínuo: idle = 0 frames).
 * - Fallback: se WebGL falhar, body.no-webgl e a página segue íntegra.
 * - Respeita prefers-reduced-motion e trata perda de contexto WebGL (iOS).
 */
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { createScene } from './te-scene.js';

gsap.registerPlugin(ScrollTrigger);

const body = document.body;
const canvas = document.getElementById('bg-webgl');
const eras = [...document.querySelectorAll('.era[data-scene]')];
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const THEMES = ['theme-terminal', 'theme-wire', 'theme-net', 'theme-cloud', 'theme-ai'];
const SCENES = ['crt', 'wire', 'nodes', 'blocks', 'neural'];

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

// Revela as passagens ao entrar na viewport (enhancement). Só "arma" o
// esconde-para-revelar quando há IntersectionObserver e sem reduce-motion —
// caso contrário o conteúdo permanece visível por padrão (CSS).
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

function syncTimeline(section) {
  document.querySelectorAll('.timeline [data-jump]').forEach((a) => {
    const on = a.dataset.jump === section.dataset.era;
    a.classList.toggle('is-active', on);
    a.setAttribute('aria-current', on ? 'true' : 'false');
  });
}

// ---- WebGL (best-effort) ---------------------------------------------------
let S = null;
const lowMem = !!navigator.deviceMemory && navigator.deviceMemory <= 2;
const tier = lowMem ? 'low' : 'high'; // te-scene também rebaixa em mobile
try {
  if (canvas) S = createScene(canvas, { tier });
} catch (e) {
  S = null;
}
if (!S) body.classList.add('no-webgl');

// render sob demanda (single-flight rAF)
let rafId = null;
function requestRender() {
  if (!S || rafId != null) return;
  rafId = requestAnimationFrame(tick);
}
function tick() {
  rafId = null;
  S.render();
  if (!reduce && S.isAnimating()) requestRender();
}

// ---- FOREGROUND: troca de tema por fase (sempre, com ou sem WebGL) ---------
function setTheme(section) {
  body.classList.remove(...THEMES);
  body.classList.add('theme-' + section.dataset.theme);
  setThemeColor(section.dataset.theme);
  syncTimeline(section);
  if (S && reduce) {
    const idx = Math.max(0, SCENES.indexOf(section.dataset.scene));
    S.setProgress(idx / (SCENES.length - 1));
    requestRender();
  }
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

// ---- BACKGROUND: morph contínuo + câmera (scrub) só com WebGL e movimento ---
if (S) {
  S.setProgress(0);
  requestRender();

  if (!reduce) {
    gsap.timeline({
      scrollTrigger: {
        trigger: '#story',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
        onUpdate: (self) => { S.setProgress(self.progress); requestRender(); },
      },
    })
      .to(S.camera.position, { z: 6, y: -1.6, ease: 'none' })
      .to(S.camera.rotation, { x: 0.16, ease: 'none' }, 0);
  }

  // resize adaptativo (debounced)
  let rt;
  window.addEventListener('resize', () => {
    clearTimeout(rt);
    rt = setTimeout(() => { S.resize(); requestRender(); }, 150);
  });

  // perda/recuperação de contexto WebGL (Safari/iOS — SDD §7.5)
  canvas.addEventListener('webglcontextlost', (e) => { e.preventDefault(); body.classList.add('no-webgl'); });
  canvas.addEventListener('webglcontextrestored', () => {
    body.classList.remove('no-webgl');
    S.rebuild();
    requestRender();
  });

  window.addEventListener('pagehide', () => {
    if (rafId) cancelAnimationFrame(rafId);
    S.dispose();
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
