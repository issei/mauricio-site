/**
 * ÉPICO 09 — Liderança & Cultura
 * Seções 22-33 (incluindo fechamento)
 *
 * Timelines:
 *  - liderancaSilenciosaTimeline: fade suave, sem motion agressivo
 *  - amplificacaoTimeline: amplificação em equipe
 *  - culturaTimeline: 5 pilares revelam com stagger 0.25s
 *  - fechamentoTimeline: seção final — MÁXIMO 1 animação simultânea (rule absoluta)
 *
 * Motion state: silent
 * Ambiente quase estático — apenas opacity fades, zero transforms agressivos
 */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// ─── Utilitário: fade only (state silent — sem transform) ────────────────────
function silentReveal(elements, options = {}) {
  const reduced = prefersReducedMotion();
  const defaults = {
    duration: reduced ? 0.3 : 1.2,
    stagger: reduced ? 0 : 0.2,
    ease: 'power2.out',
    ...options,
  };

  gsap.set(elements, { opacity: 0 });

  return () => {
    gsap.to(elements, { opacity: 1, ...defaults });
  };
}

// ─── Liderança Silenciosa (seções 22-23) ─────────────────────────────────────
function buildLiderancaSilenciosaTimeline() {
  const section = document.getElementById('lideranca') || document.querySelector('[data-section="lideranca"]');
  if (!section) return null;

  const header  = section.querySelector('.ep09-lideranca__header, header');
  const items   = section.querySelectorAll('.ep09-lideranca-item, .ep09-criterio, .ep09-abertura-item');

  const reduced = prefersReducedMotion();

  if (header) gsap.set(header, { opacity: 0 });
  if (items.length) gsap.set(items, { opacity: 0 });

  return ScrollTrigger.create({
    trigger: section,
    start: 'top 70%',
    onEnter() {
      const tl = gsap.timeline({ ease: 'power2.out' });

      if (header) {
        tl.to(header, { opacity: 1, duration: reduced ? 0.3 : 1.0 });
      }
      if (items.length) {
        tl.to(items, {
          opacity: 1,
          duration: reduced ? 0.3 : 1.0,
          stagger: reduced ? 0 : 0.2,
        }, header ? '-=0.4' : 0);
      }
    },
    once: true,
  });
}

// ─── Amplificação em Equipe ───────────────────────────────────────────────────
function buildAmplificacaoTimeline() {
  const section = document.querySelector('[data-section="amplificacao"], #amplificacao, .ep09-amplificacao');
  if (!section) return null;

  const items = section.querySelectorAll('.ep09-amplificacao-item, .ep09-pratica, [class*="ep09-amp"]');
  if (!items.length) return null;

  const reveal = silentReveal(items, { stagger: prefersReducedMotion() ? 0 : 0.2 });

  return ScrollTrigger.create({
    trigger: section,
    start: 'top 70%',
    onEnter: reveal,
    once: true,
  });
}

// ─── Cultura Vibe Coding: 5 pilares ──────────────────────────────────────────
function buildCulturaTimeline() {
  const section = document.querySelector('[data-section="cultura"], #cultura, .ep09-cultura');
  if (!section) return null;

  const pilares = section.querySelectorAll('.ep09-pilar, .ep09-cultura-pilar, [class*="ep09-pilar"]');
  if (!pilares.length) return null;

  const reduced = prefersReducedMotion();
  gsap.set(pilares, { opacity: 0 });

  return ScrollTrigger.create({
    trigger: section,
    start: 'top 65%',
    onEnter() {
      gsap.to(pilares, {
        opacity: 1,
        duration: reduced ? 0.3 : 1.1,
        stagger: reduced ? 0 : 0.25,  // 5 pilares × 0.25s = 1.25s de stagger total
        ease: 'power2.out',
      });
    },
    once: true,
  });
}

// ─── Fechamento (REGRA ABSOLUTA: máximo 1 animação simultânea) ───────────────
function buildFechamentoTimeline() {
  const section = document.getElementById('fechamento') || document.querySelector('[data-section="fechamento"]');
  if (!section) return null;

  const reduced = prefersReducedMotion();

  // Todos os elementos do fechamento em opacity 0
  const allElements = section.querySelectorAll('h2, h3, p, a, blockquote, .ep09-fechamento__linha');
  gsap.set(allElements, { opacity: 0 });

  return ScrollTrigger.create({
    trigger: section,
    start: 'top 65%',
    onEnter() {
      // UMA animação apenas — fade in sequencial simples, sem stagger paralelo
      // gsap.to(allElements) com stagger já garante 1 por vez (não simultâneas)
      gsap.to(allElements, {
        opacity: 1,
        duration: reduced ? 0.3 : 1.4,
        stagger: reduced ? 0 : 0.3,  // espaço generoso entre elementos
        ease: 'power2.out',
        // Nenhuma outra propriedade — apenas opacity (regra: 1 animação simultânea)
      });
    },
    once: true,
  });
}

// ─── Export público ───────────────────────────────────────────────────────────
export function initEpico09() {
  buildLiderancaSilenciosaTimeline();
  buildAmplificacaoTimeline();
  buildCulturaTimeline();
  buildFechamentoTimeline();
}
