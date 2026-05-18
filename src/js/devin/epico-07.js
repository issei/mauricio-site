/**
 * ÉPICO 07 — Hands-On & Mentoria
 * Seções 16-18
 *
 * Timelines:
 *  - handsOnIntroTimeline: entrada da seção intro do hands-on
 *  - exerciseCardsTimeline: cards de exercício revelam com stagger cinematográfico (0.25s)
 *  - mentoriaTimeline: sequência erro → diagnóstico → correção
 *
 * Motion state: narrative + technical
 * Stagger cinematográfico: 0.25s (cinematic blocks)
 */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// ─── Intro do Hands-On ───────────────────────────────────────────────────────
function buildHandsOnIntroTimeline() {
  const section = document.getElementById('hands-on');
  if (!section) return null;

  const eyebrow = section.querySelector('.devin-eyebrow');
  const title   = section.querySelector('.ep07-intro__title');
  const chapeu  = section.querySelector('.ep07-intro__chapeu');
  const desc    = section.querySelector('.ep07-intro__desc');

  const targets = [eyebrow, title, chapeu, desc].filter(Boolean);
  if (!targets.length) return null;

  const reduced = prefersReducedMotion();
  gsap.set(targets, { opacity: 0, y: reduced ? 0 : 30 });

  return ScrollTrigger.create({
    trigger: section,
    start: 'top 75%',
    onEnter() {
      gsap.to(targets, {
        opacity: 1,
        y: 0,
        duration: reduced ? 0.3 : 0.9,
        stagger: reduced ? 0 : 0.12,
        ease: 'power2.out',
      });
    },
    once: true,
  });
}

// ─── Exercise Cards (stagger 0.25s — cinematic blocks) ───────────────────────
function buildExerciseCardsTimeline() {
  const cards = document.querySelectorAll('.js-exercise-card');
  if (!cards.length) return null;

  const reduced = prefersReducedMotion();
  gsap.set(cards, { opacity: 0, y: reduced ? 0 : 50 });

  return ScrollTrigger.create({
    trigger: cards[0].closest('section') || cards[0],
    start: 'top 70%',
    onEnter() {
      gsap.to(cards, {
        opacity: 1,
        y: 0,
        duration: reduced ? 0.3 : 1.0,
        stagger: reduced ? 0 : 0.25,   // cinematic blocks — 0.25s entre cards
        ease: 'power2.out',
      });
    },
    once: true,
  });
}

// ─── Mentoria: erro → diagnóstico → correção ─────────────────────────────────
function buildMentoriaTimeline() {
  const mentoriaSection = document.getElementById('mentoria');
  if (!mentoriaSection) return null;

  const steps = mentoriaSection.querySelectorAll('.ep07-mentoria-step');
  if (!steps.length) return null;

  const reduced = prefersReducedMotion();
  gsap.set(steps, { opacity: 0, x: reduced ? 0 : -20 });

  return ScrollTrigger.create({
    trigger: mentoriaSection,
    start: 'top 70%',
    onEnter() {
      gsap.to(steps, {
        opacity: 1,
        x: 0,
        duration: reduced ? 0.3 : 0.8,
        stagger: reduced ? 0 : 0.18,
        ease: 'power2.out',
      });
    },
    once: true,
  });
}

// ─── Export público ───────────────────────────────────────────────────────────
export function initEpico07() {
  buildHandsOnIntroTimeline();
  buildExerciseCardsTimeline();
  buildMentoriaTimeline();
}
