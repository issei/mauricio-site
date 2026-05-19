/**
 * ÉPICO 05 — Anatomia do Devin + Contexto Persistente
 * Seções 11-12
 *
 * Motion state: "technical" — menor blur, grids rígidos, motion funcional
 *
 * Timelines:
 *  - anatomiaDevinTimeline: revela header + 5 funções sequencialmente (ScrollTrigger)
 *  - contextoPersistenteTimeline: revela header + narrativa + 3 estratégias + diagrama
 */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ─── Utilidade: respeita prefers-reduced-motion ──────────────────────────────
function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// ─── Anatomia do Devin (Seção 11) ────────────────────────────────────────────
function buildAnatomiaDevinTimeline() {
  const section = document.getElementById('anatomia-devin');
  if (!section) return null;

  const chapeu   = section.querySelector('.ep05-anatomia__chapeu');
  const title    = section.querySelector('.ep05-anatomia__title');
  const subtitle = section.querySelector('.ep05-anatomia__subtitle');
  const items    = section.querySelectorAll('.js-anatomy-item');

  const reduced = prefersReducedMotion();

  // Estado inicial
  const headerEls = [chapeu, title, subtitle].filter(Boolean);
  gsap.set(headerEls, { opacity: 0, y: reduced ? 0 : 20 });
  gsap.set(items, { opacity: 0, y: reduced ? 0 : 40 });

  if (!reduced) {
    // Motion state "technical": blur mínimo apenas no chapéu (≤ 8px)
    if (chapeu) gsap.set(chapeu, { filter: 'blur(8px)' });
  }

  const tl = gsap.timeline({
    paused: true,
    defaults: { ease: 'power2.out' },
  });

  if (reduced) {
    tl.to([...headerEls, ...items], { opacity: 1, duration: 0.3 });
  } else {
    // Chapéu com blur fade (estado technical: blur controlado)
    if (chapeu) {
      tl.to(chapeu, {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 0.4,
      });
    }

    if (title) {
      tl.to(title, {
        opacity: 1,
        y: 0,
        duration: 0.6,
      }, chapeu ? '-=0.2' : 0);
    }

    if (subtitle) {
      tl.to(subtitle, {
        opacity: 1,
        y: 0,
        duration: 0.4,
      }, '-=0.3');
    }

    // 5 funções sequenciais — stagger 0.15s (structural motion)
    if (items.length > 0) {
      tl.to(items, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.15,
      }, '-=0.1');
    }
  }

  return tl;
}

// ─── Contexto Persistente (Seção 12) ─────────────────────────────────────────
function buildContextoPersistenteTimeline() {
  const section = document.getElementById('contexto-persistente');
  if (!section) return null;

  const label      = section.querySelector('.ep05-contexto__label');
  const title      = section.querySelector('.ep05-contexto__title');
  const narrativa  = section.querySelectorAll('.ep05-contexto__narrativa p');
  const estrategs  = section.querySelectorAll('.ep05-estrategia');
  const diagrama   = section.querySelector('.ep05-diagrama');

  const reduced = prefersReducedMotion();

  const headerEls = [label, title].filter(Boolean);
  gsap.set(headerEls, { opacity: 0, y: reduced ? 0 : 20 });
  gsap.set(narrativa, { opacity: 0, y: reduced ? 0 : 15 });
  gsap.set(estrategs, { opacity: 0, y: reduced ? 0 : 50 });
  if (diagrama) gsap.set(diagrama, { opacity: 0, y: reduced ? 0 : 20 });

  const tl = gsap.timeline({
    paused: true,
    defaults: { ease: 'power2.out' },
  });

  if (reduced) {
    const allEls = [...headerEls, ...narrativa, ...estrategs, diagrama].filter(Boolean);
    tl.to(allEls, { opacity: 1, duration: 0.3 });
  } else {
    // Rótulo
    if (label) {
      tl.to(label, { opacity: 1, y: 0, duration: 0.3 });
    }

    // Título
    if (title) {
      tl.to(title, { opacity: 1, y: 0, duration: 0.6 }, '-=0.1');
    }

    // Parágrafos da narrativa — stagger micro (0.08s — textual reveal)
    if (narrativa.length > 0) {
      tl.to(narrativa, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.08,
      }, '-=0.2');
    }

    // 3 estratégias — stagger 0.18s (cards)
    if (estrategs.length > 0) {
      tl.to(estrategs, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.18,
      }, '-=0.1');
    }

    // Diagrama
    if (diagrama) {
      tl.to(diagrama, { opacity: 1, y: 0, duration: 0.5 }, '-=0.2');
    }
  }

  return tl;
}

// ─── Wiring: ScrollTriggers ───────────────────────────────────────────────────
function wireScrollTriggers(anatomia, contexto) {
  const anatomiaSection = document.getElementById('anatomia-devin');
  const contextoSection = document.getElementById('contexto-persistente');

  if (anatomiaSection && anatomia) {
    ScrollTrigger.create({
      trigger: anatomiaSection,
      start: 'top 60%',
      once: true,
      onEnter: () => anatomia.play(),
    });
  }

  if (contextoSection && contexto) {
    ScrollTrigger.create({
      trigger: contextoSection,
      start: 'top 60%',
      once: true,
      onEnter: () => contexto.play(),
    });
  }
}

// ─── ReAct Loop SVG — draw dos arcos via strokeDashoffset ───────────────────
function buildReactLoopDrawTimeline() {
  const svg = document.querySelector('.ep05-react-loop__svg');
  if (!svg) return;

  const reduced = prefersReducedMotion();
  const paths = [...svg.querySelectorAll('path')].filter(p => p.hasAttribute('stroke'));

  paths.forEach(p => {
    try {
      const len = p.getTotalLength();
      gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
    } catch (_) {}
  });

  ScrollTrigger.create({
    trigger: svg.closest('.ep05-react-loop'),
    start: 'top 70%',
    once: true,
    onEnter() {
      if (reduced) {
        gsap.set(paths, { strokeDashoffset: 0 });
        return;
      }
      gsap.to(paths, {
        strokeDashoffset: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: 'power2.inOut',
      });
    },
  });
}

// ─── Export principal ─────────────────────────────────────────────────────────
export function initEpico05() {
  const anatomia = buildAnatomiaDevinTimeline();
  const contexto = buildContextoPersistenteTimeline();
  wireScrollTriggers(anatomia, contexto);
  buildReactLoopDrawTimeline();
}
