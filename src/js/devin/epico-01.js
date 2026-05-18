/**
 * Épico 01 — Hero & Contexto Inicial
 * Seções 1-4: Hero, Pergunta-Gatilho, Apresentação, Propósito
 *
 * Governance (rules.md):
 * - easing primário: "power2.out" (equivale a expo.out no GSAP)
 * - easing suporte: "power3.out"
 * - stagger: 0.08s micro | 0.12s texto | 0.18s cards
 * - scale máx: 1.03
 * - blur máx: 16px (apenas em transições)
 * - NUNCA bounce/elastic/rotação/motion lateral excessivo
 * - SEMPRE opacity + transform (evita repaint)
 * - SEMPRE verificar prefers-reduced-motion
 */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

gsap.registerPlugin(ScrollTrigger);

// ─── Utilitário: verifica preferência de movimento reduzido ──────────────────
function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// ─── 1. heroIntroTimeline ────────────────────────────────────────────────────
// 4.2s total, sequencial — roda ao carregar a página
function heroIntroTimeline() {
  const reduced = prefersReducedMotion();

  const tl = gsap.timeline({
    defaults: {
      ease: 'power2.out',
      duration: reduced ? 0.4 : 0.8,
    },
  });

  // Garante estado inicial invisível (evita flash)
  gsap.set([
    '.js-hero-supertitle',
    '.js-hero-title',
    '.js-hero-subtitle',
    '.js-hero-credit',
    '.js-hero-scroll-cta',
  ], { opacity: 0 });

  // 0.0s — background fade (camada de fundo)
  tl.fromTo(
    '.ep01-hero__bg',
    { opacity: 0 },
    { opacity: 1, duration: reduced ? 0.4 : 1.0, ease: 'power2.out' },
    0
  );

  if (reduced) {
    // Modo reduzido: tudo entra simultâneo, sem stagger, sem blur
    tl.to(
      ['.js-hero-supertitle', '.js-hero-title', '.js-hero-subtitle', '.js-hero-credit', '.js-hero-scroll-cta'],
      { opacity: 1, duration: 0.4 },
      0
    );
    return tl;
  }

  // 0.8s — supertitle entra com y(-40px→0) + opacity
  tl.fromTo(
    '.js-hero-supertitle',
    { y: -40, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' },
    0.8
  );

  // 1.2s — título principal revela com SplitType chars, stagger 0.03s
  const titleEl = document.querySelector('.js-hero-title');
  if (titleEl) {
    try {
      const splitTitle = new SplitType(titleEl, { types: 'chars,words' });
      gsap.set(splitTitle.chars, { opacity: 0, y: 20 });
      tl.to(
        splitTitle.chars,
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
          stagger: 0.03,
          onComplete: () => {
            // Remove will-change após animação
            splitTitle.chars.forEach((c) => (c.style.willChange = 'auto'));
          },
        },
        1.2
      );
    } catch {
      // Fallback sem SplitType
      tl.to('.js-hero-title', { opacity: 1, y: 0, duration: 0.6 }, 1.2);
    }
  }

  // 2.0s — subtítulo com blur(16px→0) + opacity
  tl.fromTo(
    '.js-hero-subtitle',
    { opacity: 0, filter: 'blur(16px)', y: 10 },
    {
      opacity: 1,
      filter: 'blur(0px)',
      y: 0,
      duration: 0.8,
      ease: 'power2.out',
      onComplete() {
        this.targets()[0].style.filter = '';
        this.targets()[0].style.willChange = 'auto';
      },
    },
    2.0
  );

  // 2.8s — crédito + scroll CTA
  tl.to(
    ['.js-hero-credit', '.js-hero-scroll-cta'],
    { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', stagger: 0.12 },
    2.8
  );

  // 3.2s — scroll icon pulsa (ambient motion, repeat)
  tl.fromTo(
    '.js-hero-scroll-icon',
    { y: 0 },
    {
      y: 6,
      duration: 1.0,
      ease: 'power2.inOut',
      repeat: -1,
      yoyo: true,
    },
    3.2
  );

  return tl;
}

// ─── 2. perguntaGatilhoTimeline ──────────────────────────────────────────────
// scroll-linked — revela quando 30% visível
function perguntaGatilhoTimeline() {
  const reduced = prefersReducedMotion();

  // SplitType nos elementos .js-split-text
  const splitEls = document.querySelectorAll('#abertura .js-split-text');
  let splitInstances = [];

  splitEls.forEach((el) => {
    try {
      const split = new SplitType(el, { types: 'lines' });
      splitInstances.push(split);
      gsap.set(split.lines, { opacity: 0, y: reduced ? 0 : 20 });
    } catch {
      gsap.set(el, { opacity: 0 });
    }
  });

  ScrollTrigger.create({
    trigger: '#abertura',
    start: 'top 70%', // 30% visível
    once: true,
    onEnter: () => {
      splitInstances.forEach((split, i) => {
        gsap.to(split.lines, {
          opacity: 1,
          y: 0,
          duration: reduced ? 0.4 : 0.7,
          ease: 'power2.out',
          stagger: reduced ? 0 : 0.12,
          delay: i * (reduced ? 0 : 0.2),
          onComplete: () => {
            split.lines.forEach((l) => (l.style.willChange = 'auto'));
          },
        });
      });

      // Fallback para elementos sem SplitType
      if (splitInstances.length === 0) {
        gsap.to('#abertura .js-split-text', {
          opacity: 1,
          duration: reduced ? 0.4 : 0.7,
          stagger: reduced ? 0 : 0.12,
          ease: 'power2.out',
        });
      }
    },
  });
}

// ─── 3. apresentacaoTimeline ─────────────────────────────────────────────────
// stagger cards — y(60px→0) + opacity, stagger 0.18s, power2.out
function apresentacaoTimeline() {
  const reduced = prefersReducedMotion();

  const cards = document.querySelectorAll('#sobre .js-card');
  if (!cards.length) return;

  gsap.set(cards, { opacity: 0, y: reduced ? 0 : 60 });

  ScrollTrigger.create({
    trigger: '#sobre',
    start: 'top 75%',
    once: true,
    onEnter: () => {
      gsap.to(cards, {
        opacity: 1,
        y: 0,
        duration: reduced ? 0.4 : 0.7,
        ease: 'power2.out',
        stagger: reduced ? 0 : 0.18,
        onComplete: () => {
          cards.forEach((c) => (c.style.willChange = 'auto'));
        },
      });
    },
  });
}

// ─── 4. propositoTimeline ────────────────────────────────────────────────────
// line-by-line reveal
// Linha 3 (.js-proposito-destaque) → cor #FF6200 + fontWeight 700
function propositoTimeline() {
  const reduced = prefersReducedMotion();

  const linhas = document.querySelectorAll('#proposito .js-proposito-linha');
  if (!linhas.length) return;

  gsap.set(linhas, { opacity: 0, y: reduced ? 0 : 30 });

  ScrollTrigger.create({
    trigger: '#proposito',
    start: 'top 70%',
    once: true,
    onEnter: () => {
      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

      // Linha 1
      tl.to(linhas[0], {
        opacity: 1,
        y: 0,
        duration: reduced ? 0.3 : 0.6,
      });

      // Linha 2 — 0.4s depois
      tl.to(
        linhas[1],
        { opacity: 1, y: 0, duration: reduced ? 0.3 : 0.6 },
        reduced ? '+=0' : '+=0.4'
      );

      // Linha 3 — 0.8s depois, cor #FF6200 + fontWeight 700
      if (linhas[2]) {
        tl.to(
          linhas[2],
          {
            opacity: 1,
            y: 0,
            color: '#FF6200',
            fontWeight: 700,
            duration: reduced ? 0.3 : 0.7,
            ease: 'power2.out',
            onComplete: () => {
              linhas[2].style.willChange = 'auto';
            },
          },
          reduced ? '+=0' : '+=0.8'
        );
      }
    },
  });
}

// ─── Exportação principal ────────────────────────────────────────────────────
export function initEpico01() {
  // Aguarda DOM pronto
  if (typeof window === 'undefined') return;

  // Inicializa estado invisível para os elementos que aparecem na hero
  gsap.set(['.js-hero-credit', '.js-hero-scroll-cta'], { opacity: 0, y: 10 });
  gsap.set('.ep01-hero__bg', { opacity: 0 });

  // 1. Hero (page load — não usa ScrollTrigger)
  heroIntroTimeline();

  // 2. Pergunta-gatilho (scroll-linked)
  perguntaGatilhoTimeline();

  // 3. Apresentação (scroll-linked, stagger cards)
  apresentacaoTimeline();

  // 4. Propósito (scroll-linked, line-by-line)
  propositoTimeline();
}
