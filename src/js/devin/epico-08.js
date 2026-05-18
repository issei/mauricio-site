/**
 * ÉPICO 08 — Reflexão Vibe Coding
 * Seções 19-21
 *
 * Timelines:
 *  - reflexaoPausaTimeline: perguntas contemplativas revelam uma a uma, muito devagar
 *  - identityShiftTimeline: mudança de identidade — de executor para orquestrador
 *  - bridgeTimeline: ponte para Ato III
 *
 * Motion state: contemplative
 * Duração maior, mais espaço, motion reduzido, tipografia dominante
 */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// ─── Pausa Reflexiva: perguntas contemplativas ────────────────────────────────
function buildReflexaoPausaTimeline() {
  const section = document.getElementById('reflexao');
  if (!section) return null;

  const items = section.querySelectorAll('.js-reflexao-text, .ep08-reflexao-pergunta, .ep08-reflexao-item');
  if (!items.length) return null;

  const reduced = prefersReducedMotion();

  // Estado contemplativo: elementos começam com opacidade baixa mas visíveis
  gsap.set(items, { opacity: 0, y: reduced ? 0 : 15 });

  return ScrollTrigger.create({
    trigger: section,
    start: 'top 65%',
    onEnter() {
      gsap.to(items, {
        opacity: 1,
        y: 0,
        // State contemplative: duração maior que o normal (1.4s vs 0.9s)
        duration: reduced ? 0.4 : 1.4,
        // Stagger maior — deixa cada elemento "respirar"
        stagger: reduced ? 0 : 0.35,
        ease: 'power2.out',
      });
    },
    once: true,
  });
}

// ─── Mudança de Identidade: executor → orquestrador ──────────────────────────
function buildIdentityShiftTimeline() {
  const section = document.getElementById('identidade') || document.querySelector('[data-section="identidade"]');
  if (!section) return null;

  const before  = section.querySelector('.ep08-identity-before');
  const arrow   = section.querySelector('.ep08-identity-arrow');
  const after   = section.querySelector('.ep08-identity-after');
  const caption = section.querySelector('.ep08-identity-caption');

  const reduced = prefersReducedMotion();

  if (before)  gsap.set(before,  { opacity: 0, x: reduced ? 0 : -24 });
  if (arrow)   gsap.set(arrow,   { opacity: 0, scale: reduced ? 1 : 0.8 });
  if (after)   gsap.set(after,   { opacity: 0, x: reduced ? 0 : 24 });
  if (caption) gsap.set(caption, { opacity: 0, y: reduced ? 0 : 10 });

  if (!before && !after) return null;

  return ScrollTrigger.create({
    trigger: section,
    start: 'top 65%',
    onEnter() {
      const tl = gsap.timeline({ ease: 'power2.out' });

      if (before)  tl.to(before,  { opacity: 1, x: 0, duration: reduced ? 0.3 : 1.0 });
      if (arrow)   tl.to(arrow,   { opacity: 1, scale: 1, duration: reduced ? 0.3 : 0.7 }, '-=0.5');
      if (after)   tl.to(after,   { opacity: 1, x: 0, duration: reduced ? 0.3 : 1.0 }, '-=0.6');
      if (caption) tl.to(caption, { opacity: 1, y: 0, duration: reduced ? 0.3 : 0.8 }, '-=0.4');
    },
    once: true,
  });
}

// ─── Bridge para Ato III ──────────────────────────────────────────────────────
function buildBridgeTimeline() {
  const bridge = document.querySelector('[data-section="bridge"], .ep08-bridge, #bridge-ato3');
  if (!bridge) return null;

  const texts = bridge.querySelectorAll('h2, h3, p, blockquote');
  if (!texts.length) return null;

  const reduced = prefersReducedMotion();
  // Estado silent: começam invisíveis
  gsap.set(texts, { opacity: 0 });

  return ScrollTrigger.create({
    trigger: bridge,
    start: 'top 70%',
    onEnter() {
      gsap.to(texts, {
        opacity: 1,
        // Fade puro — sem transform (state contemplative respeita tipografia)
        duration: reduced ? 0.3 : 1.6,
        stagger: reduced ? 0 : 0.25,
        ease: 'power2.out',
      });
    },
    once: true,
  });
}

// ─── Export público ───────────────────────────────────────────────────────────
export function initEpico08() {
  buildReflexaoPausaTimeline();
  buildIdentityShiftTimeline();
  buildBridgeTimeline();
}
