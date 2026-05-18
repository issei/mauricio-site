/**
 * ÉPICO 04 — Transição ATO II + Comunicação com IA
 * Seções 9-10
 *
 * Timelines:
 *  - atoDoisTransicaoTimeline: entrada narrativa da seção 9 (load-based)
 *  - comunicacaoIaTimeline: cards dos 4 pilares via ScrollTrigger
 */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ─── Utilidade: respeita prefers-reduced-motion ──────────────────────────────
function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// ─── Transição ATO II (Seção 9) ───────────────────────────────────────────────
function buildAtoDoisTransicaoTimeline() {
  const section = document.getElementById('ato-2');
  if (!section) return null;

  const label     = section.querySelector('.ep04-transicao__label');
  const title     = section.querySelector('.ep04-transicao__title');
  const line1     = section.querySelector('.ep04-transicao__question-line--1');
  const line2     = section.querySelector('.ep04-transicao__question-line--2');

  if (!label || !title || !line1 || !line2) return null;

  const reduced = prefersReducedMotion();

  // Estado inicial — elementos invisíveis antes da timeline
  gsap.set([label, title, line1, line2], { opacity: 0, y: reduced ? 0 : 20 });

  const tl = gsap.timeline({ paused: true });

  if (reduced) {
    // Sem motion: tudo entra de uma vez, sem delay
    tl.to([label, title, line1, line2], { opacity: 1, duration: 0.3 });
  } else {
    tl
      // Rótulo "ATO II"
      .to(label, {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: 'power2.out',
        delay: 0.2,
      })
      // Título "A ferramenta na prática"
      .to(title, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out',
      }, '-=0.1')
      // "Mas afinal —"
      .to(line1, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: 'power2.out',
      }, '+=0.1')
      // "quem é o Devin?" com leve scale para ênfase final
      .to(line2, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        ease: 'power2.out',
      }, '-=0.05');

    // Pré-estado de scale para line2
    gsap.set(line2, { scale: 0.95 });
  }

  return tl;
}

// ─── Comunicação com IA — 4 Pilares (Seção 10) ────────────────────────────────
function buildComunicacaoIaTimeline() {
  const section = document.getElementById('comunicacao-ia');
  if (!section) return null;

  const title    = section.querySelector('.ep04-comunicacao__title');
  const subtitle = section.querySelector('.ep04-comunicacao__subtitle');
  const cards    = section.querySelectorAll('.js-pillar-card');

  if (!title || cards.length === 0) return null;

  const reduced = prefersReducedMotion();

  // Estado inicial
  gsap.set([title, subtitle].filter(Boolean), { opacity: 0, y: reduced ? 0 : 20 });
  gsap.set(cards, { opacity: 0, y: reduced ? 0 : 40 });

  const tl = gsap.timeline({
    paused: true,
    defaults: { ease: 'power2.out' },
  });

  if (reduced) {
    tl.to([title, subtitle, ...cards].filter(Boolean), {
      opacity: 1,
      duration: 0.3,
    });
  } else {
    // Título com blur → 0
    tl.to(title, {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 0.6,
    });

    if (subtitle) {
      gsap.set(subtitle, { filter: 'blur(8px)' });
      tl.to(subtitle, {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 0.5,
      }, '-=0.3');
    }

    // Cards em stagger
    tl.to(cards, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.18,
      ease: 'power2.out',
    }, '-=0.2');
  }

  return tl;
}

// ─── Wiring: ScrollTrigger para Seção 10 ─────────────────────────────────────
function wireComunicacaoScrollTrigger(tl) {
  const section = document.getElementById('comunicacao-ia');
  if (!section || !tl) return;

  ScrollTrigger.create({
    trigger: section,
    start: 'top 60%',
    once: true,
    onEnter: () => tl.play(),
  });
}

// ─── Export principal ─────────────────────────────────────────────────────────
export function initEpico04() {
  // Seção 9: inicia ao carregar (após pequeno delay para DOMContentLoaded estabilizar)
  const transicaoTl = buildAtoDoisTransicaoTimeline();
  if (transicaoTl) {
    // Dispara após a página estar visível
    requestAnimationFrame(() => {
      requestAnimationFrame(() => transicaoTl.play());
    });
  }

  // Seção 10: dispara quando entra na viewport
  const comunicacaoTl = buildComunicacaoIaTimeline();
  wireComunicacaoScrollTrigger(comunicacaoTl);
}
