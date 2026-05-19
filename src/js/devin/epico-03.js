/**
 * Épico 03 — Vibe Coding & Analogia do Cozinheiro
 * Seções 7-8: Pausa (Vibe Coding), Cozinheiro (narrativa + role-cards)
 *
 * Governance (rules.md):
 * - easing primário: "power2.out"
 * - easing suporte: "power3.out"
 * - stagger: 0.08s micro | 0.12s texto | 0.18s cards
 * - blur máx: 8px (apenas contexto introdutório Seção 8)
 * - scale: 0.95→1.0 na Linha 2 da pausa (enfatiza afirmação)
 * - NUNCA bounce/elastic/rotação/motion lateral
 * - SEMPRE opacity + transform
 * - SEMPRE verificar prefers-reduced-motion
 */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ─── Utilitário ──────────────────────────────────────────────────────────────
function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// ─── 1. pausaVibeCodingTimeline ──────────────────────────────────────────────
// Seção 7 — duas linhas minimalistas
// Inicia quando Seção 7 atinge 50% viewport
function pausaVibeCodingTimeline() {
  const reduced = prefersReducedMotion();

  const linha1 = document.querySelector('#vibe-coding-def .js-ep03-pausa-linha1');
  const linha2 = document.querySelector('#vibe-coding-def .js-ep03-pausa-linha2');

  if (!linha1 && !linha2) return;

  // Estado inicial
  if (linha1) gsap.set(linha1, { opacity: 0, y: reduced ? 0 : 10 });
  if (linha2) gsap.set(linha2, { opacity: 0, y: reduced ? 0 : 16, scale: reduced ? 1 : 0.95 });

  ScrollTrigger.create({
    trigger: '#vibe-coding-def',
    start: 'top 50%',
    once: true,
    onEnter: () => {
      const tl = gsap.timeline();

      // Linha 1 — opacity fade + y suave, 0.5s, power3.out
      if (linha1) {
        tl.to(linha1, {
          opacity: 1,
          y: 0,
          duration: reduced ? 0.3 : 0.5,
          ease: 'power3.out',
          onComplete: () => { linha1.style.willChange = 'auto'; },
        });
      }

      // Linha 2 — delay 0.4s, opacity + scale(0.95→1.0) + y, 0.6s, power2.out
      if (linha2) {
        tl.to(
          linha2,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: reduced ? 0.3 : 0.6,
            ease: 'power2.out',
            onComplete: () => {
              linha2.style.willChange = 'auto';
              // Remove transform scale do DOM após animação para não bloquear repaint
              linha2.style.scale = '';
            },
          },
          reduced ? 0 : '+=0.4'
        );
      }
    },
  });
}

// ─── 2. cozinheiroTimeline ───────────────────────────────────────────────────
// Seção 8 — contexto → narrativa → climax → role-cards
// Inicia quando Seção 8 entra na viewport
function cozinheiroTimeline() {
  const reduced = prefersReducedMotion();

  const introEl   = document.querySelector('#cozinheiro .js-ep03-intro');
  const paras     = document.querySelectorAll('#cozinheiro .js-ep03-narrative p');
  const climaxEl  = document.querySelector('#cozinheiro .js-ep03-climax');
  const roleCards = document.querySelectorAll('#cozinheiro .js-ep03-role-card');

  // Estado inicial
  if (introEl) {
    gsap.set(introEl, {
      opacity: 0,
      y: reduced ? 0 : 12,
      filter: reduced ? 'none' : 'blur(8px)',
    });
  }
  if (paras.length)    gsap.set(paras, { opacity: 0, y: reduced ? 0 : 18 });
  if (climaxEl)        gsap.set(climaxEl, { opacity: 0, y: reduced ? 0 : 18 });
  if (roleCards.length) gsap.set(roleCards, { opacity: 0, y: reduced ? 0 : 50 });

  ScrollTrigger.create({
    trigger: '#cozinheiro',
    start: 'top 75%',
    once: true,
    onEnter: () => {
      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

      // Contexto introdutório — blur(8px→0) + opacity, 0.4s
      if (introEl) {
        tl.to(introEl, {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: reduced ? 0.3 : 0.4,
          ease: 'power3.out',
          onComplete: () => {
            introEl.style.filter = '';
            introEl.style.willChange = 'auto';
          },
        });
      }

      // Parágrafos narrativos — stagger 0.08s, duração 1.2s total
      if (paras.length) {
        tl.to(
          paras,
          {
            opacity: 1,
            y: 0,
            duration: reduced ? 0.3 : 0.55,
            ease: 'power2.out',
            stagger: reduced ? 0 : 0.08,
            onComplete: () => {
              paras.forEach((p) => (p.style.willChange = 'auto'));
            },
          },
          reduced ? 0 : '+=0.1'
        );
      }

      // Climax ("Isso é com você.") — delay 0.6s após narrativa
      // Emphasis: laranja + scale 1.02
      if (climaxEl) {
        tl.to(
          climaxEl,
          {
            opacity: 1,
            y: 0,
            color: '#FF6200',
            scale: reduced ? 1 : 1.02,
            duration: reduced ? 0.3 : 0.5,
            ease: 'power2.out',
            onComplete: () => {
              climaxEl.style.willChange = 'auto';
              // Normaliza scale após animação
              if (!reduced) climaxEl.style.transform = '';
            },
          },
          reduced ? 0 : '+=0.6'
        );
      }

      // Role-cards — stagger 0.18s, y(50px→0) + opacity, expo.out
      if (roleCards.length) {
        tl.to(
          roleCards,
          {
            opacity: 1,
            y: 0,
            duration: reduced ? 0.3 : 0.6,
            ease: 'power2.out',
            stagger: reduced ? 0 : 0.18,
            onComplete: () => {
              roleCards.forEach((c) => (c.style.willChange = 'auto'));
            },
          },
          reduced ? 0 : '+=0.25'
        );
      }
    },
  });
}

// ─── Chef Diagram — entrada sequencial dos 3 nós ────────────────────────────
function buildChefDiagramTimeline() {
  const diagram = document.querySelector('.ep03-chef-diagram');
  if (!diagram) return;

  const reduced = prefersReducedMotion();
  const nodes = diagram.querySelectorAll('.ep03-chef-node');

  gsap.set(nodes, { opacity: 0, y: reduced ? 0 : 15 });

  ScrollTrigger.create({
    trigger: diagram,
    start: 'top 75%',
    once: true,
    onEnter() {
      gsap.to(nodes, {
        opacity: 1,
        y: 0,
        duration: reduced ? 0.3 : 0.7,
        stagger: reduced ? 0 : 0.18,
        ease: 'power2.out',
      });
    },
  });
}

// ─── Exportação principal ────────────────────────────────────────────────────
export function initEpico03() {
  if (typeof window === 'undefined') return;

  pausaVibeCodingTimeline();
  cozinheiroTimeline();
  buildChefDiagramTimeline();
}
