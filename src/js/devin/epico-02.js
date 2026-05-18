/**
 * Épico 02 — Os Três Fundamentos & Lição da Calculadora
 * Seções 5-6: Fundamentos, Calculadora + Diagrama
 *
 * Governance (rules.md):
 * - easing primário: "power2.out"
 * - easing suporte: "power3.out"
 * - stagger: 0.08s micro | 0.12s texto | 0.18s cards
 * - blur máx: 0px neste épico (clareza visual prioritária)
 * - NUNCA bounce/elastic/rotação/scale agressivo
 * - SEMPRE opacity + transform
 * - SEMPRE verificar prefers-reduced-motion
 */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

gsap.registerPlugin(ScrollTrigger);

// ─── Utilitário ──────────────────────────────────────────────────────────────
function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// ─── 1. fundamentosIntroTimeline ────────────────────────────────────────────
// Seção 5 — chapéu + 3 cards em stagger
// Inicia quando Seção 5 atinge 40% da viewport
function fundamentosIntroTimeline() {
  const reduced = prefersReducedMotion();

  const chapeu = document.querySelector('#fundamentos .js-ep02-chapeu');
  const cards = document.querySelectorAll('#fundamentos .js-ep02-card');

  if (!chapeu && !cards.length) return;

  // Estado inicial
  if (chapeu) gsap.set(chapeu, { opacity: 0, y: reduced ? 0 : 20 });
  if (cards.length) gsap.set(cards, { opacity: 0, y: reduced ? 0 : 40 });

  ScrollTrigger.create({
    trigger: '#fundamentos',
    start: 'top 60%', // 40% visível
    once: true,
    onEnter: () => {
      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

      // Chapéu introdutório — fade + y suave, duration 0.6s
      if (chapeu) {
        tl.to(chapeu, {
          opacity: 1,
          y: 0,
          duration: reduced ? 0.3 : 0.6,
          ease: 'power3.out',
          onComplete: () => { chapeu.style.willChange = 'auto'; },
        });
      }

      // Cards — stagger 0.18s, duration 0.5s cada
      if (cards.length) {
        tl.to(
          cards,
          {
            opacity: 1,
            y: 0,
            duration: reduced ? 0.3 : 0.5,
            ease: 'power2.out',
            stagger: reduced ? 0 : 0.18,
            onComplete: () => {
              cards.forEach((c) => (c.style.willChange = 'auto'));
            },
          },
          reduced ? 0 : '+=0.1'
        );
      }
    },
  });
}

// ─── 2. calculadoraTimeline ──────────────────────────────────────────────────
// Seção 6 — título → subtítulo → corpo → diagrama sequencial
// Inicia quando Seção 6 entra na viewport
function calculadoraTimeline() {
  const reduced = prefersReducedMotion();

  const titleEl   = document.querySelector('#calculadora .js-ep02-calc-title');
  const subtitleEl = document.querySelector('#calculadora .js-ep02-calc-subtitle');
  const bodyEl    = document.querySelector('#calculadora .js-ep02-calc-body');
  const diagBoxes = document.querySelectorAll('#calculadora .js-ep02-diag-box');
  const diagArrows = document.querySelectorAll('#calculadora .js-ep02-diag-arrow');

  // Estado inicial
  const allEls = [titleEl, subtitleEl, bodyEl, ...diagBoxes, ...diagArrows].filter(Boolean);
  gsap.set(allEls, { opacity: 0, y: reduced ? 0 : 20 });

  ScrollTrigger.create({
    trigger: '#calculadora',
    start: 'top 75%',
    once: true,
    onEnter: () => {
      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

      // Título — opacity fade, 0.6s
      if (titleEl) {
        tl.to(titleEl, {
          opacity: 1,
          y: 0,
          duration: reduced ? 0.3 : 0.6,
          ease: 'power3.out',
          onComplete: () => { titleEl.style.willChange = 'auto'; },
        });
      }

      // Subtítulo — delay 0.2s, 0.5s
      if (subtitleEl) {
        tl.to(
          subtitleEl,
          {
            opacity: 1,
            y: 0,
            duration: reduced ? 0.3 : 0.5,
            ease: 'power2.out',
            onComplete: () => { subtitleEl.style.willChange = 'auto'; },
          },
          reduced ? 0 : '+=0.2'
        );
      }

      // Corpo — stagger por parágrafos com SplitType (linhas)
      if (bodyEl) {
        const paras = bodyEl.querySelectorAll('p');
        gsap.set(paras, { opacity: 0, y: reduced ? 0 : 16 });

        tl.to(
          paras,
          {
            opacity: 1,
            y: 0,
            duration: reduced ? 0.3 : 0.55,
            ease: 'power2.out',
            stagger: reduced ? 0 : 0.12,
            onComplete: () => {
              paras.forEach((p) => (p.style.willChange = 'auto'));
            },
          },
          reduced ? 0 : '+=0.15'
        );
      }

      // Diagrama — entrada sequencial: box → arrow → box → arrow → box
      // Stagger 0.2s, opacity fade + y suave
      if (diagBoxes.length || diagArrows.length) {
        // Intercala boxes e arrows na ordem visual
        const diagramEls = [];
        const maxLen = Math.max(diagBoxes.length, diagArrows.length);
        for (let i = 0; i < diagBoxes.length; i++) {
          if (diagBoxes[i]) diagramEls.push(diagBoxes[i]);
          if (diagArrows[i]) diagramEls.push(diagArrows[i]);
        }

        tl.to(
          diagramEls,
          {
            opacity: 1,
            y: 0,
            duration: reduced ? 0.3 : 0.45,
            ease: 'power2.out',
            stagger: reduced ? 0 : 0.2,
            onComplete: () => {
              diagramEls.forEach((el) => (el.style.willChange = 'auto'));
            },
          },
          reduced ? 0 : '+=0.2'
        );
      }
    },
  });
}

// ─── Exportação principal ────────────────────────────────────────────────────
export function initEpico02() {
  if (typeof window === 'undefined') return;

  fundamentosIntroTimeline();
  calculadoraTimeline();
}
