/**
 * ÉPICO 06 — Skills / Playbooks / Knowledge
 * Seções 13-15 (interface de tabs + animações)
 *
 * Responsabilidades:
 *  1. Tabs acessíveis (ARIA, keyboard navigation com Arrow keys)
 *  2. Fade de conteúdo ao trocar de tab
 *  3. ScrollTrigger reveal da seção ao entrar na viewport
 *  4. skillsTimeline / playbooksTimeline / knowledgeTimeline
 */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ─── Utilidade: respeita prefers-reduced-motion ──────────────────────────────
function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// ─── TABS ACESSÍVEIS ──────────────────────────────────────────────────────────

/**
 * Ativa um tab e mostra o painel correspondente.
 * Garante ARIA correto e executa fade de conteúdo.
 */
function activateTab(tabs, panels, targetTab, animate = true) {
  const reduced = prefersReducedMotion();
  const targetPanel = document.getElementById(targetTab.getAttribute('aria-controls'));

  // Desativa todos os tabs e esconde todos os painéis
  tabs.forEach((tab) => {
    tab.setAttribute('aria-selected', 'false');
    tab.setAttribute('tabindex', '-1');
  });

  panels.forEach((panel) => {
    panel.removeAttribute('data-active');
    panel.style.display = 'none';
  });

  // Ativa o tab selecionado
  targetTab.setAttribute('aria-selected', 'true');
  targetTab.setAttribute('tabindex', '0');

  // Mostra e anima o painel alvo
  if (targetPanel) {
    targetPanel.style.display = 'block';
    targetPanel.setAttribute('data-active', 'true');

    if (animate && !reduced) {
      // Fade in do painel
      gsap.fromTo(
        targetPanel,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' }
      );

      // Revela os cards dentro do painel com stagger
      const cards = targetPanel.querySelectorAll(
        '.ep06-skill-card, .ep06-playbook-card, .ep06-knowledge-card'
      );
      if (cards.length > 0) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.12,
            ease: 'power2.out',
            delay: 0.1,
          }
        );
      }
    } else {
      // Sem motion: aparece diretamente
      gsap.set(targetPanel, { opacity: 1, y: 0 });
    }
  }
}

/**
 * Inicializa lógica de tabs com suporte a teclado (WCAG 2.1).
 */
function initTabs() {
  const tablist = document.querySelector('.ep06-tabs[role="tablist"]');
  if (!tablist) return;

  const tabs   = Array.from(tablist.querySelectorAll('[role="tab"]'));
  const panels = tabs
    .map((t) => document.getElementById(t.getAttribute('aria-controls')))
    .filter(Boolean);

  if (tabs.length === 0) return;

  // Estado inicial: garante que apenas o primeiro está ativo visualmente
  panels.forEach((panel, i) => {
    panel.style.display = i === 0 ? 'block' : 'none';
    if (i === 0) panel.setAttribute('data-active', 'true');
  });

  // Click handler
  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      if (tab.getAttribute('aria-selected') === 'true') return; // já ativo
      activateTab(tabs, panels, tab, true);
    });
  });

  // Keyboard navigation — Arrow keys (roving tabindex)
  tablist.addEventListener('keydown', (e) => {
    const currentIndex = tabs.indexOf(document.activeElement);
    if (currentIndex === -1) return;

    let nextIndex = currentIndex;

    if (e.key === 'ArrowRight') {
      e.preventDefault();
      nextIndex = (currentIndex + 1) % tabs.length;
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
    } else if (e.key === 'Home') {
      e.preventDefault();
      nextIndex = 0;
    } else if (e.key === 'End') {
      e.preventDefault();
      nextIndex = tabs.length - 1;
    } else {
      return;
    }

    const nextTab = tabs[nextIndex];
    nextTab.focus();
    activateTab(tabs, panels, nextTab, true);
  });
}

// ─── TIMELINE: Reveal da seção arsenais ──────────────────────────────────────
function buildArsenaisRevealTimeline() {
  const section = document.getElementById('skills-playbooks');
  if (!section) return null;

  const eyebrow  = section.querySelector('.ep06-arsenais__eyebrow');
  const title    = section.querySelector('.ep06-arsenais__title');
  const subtitle = section.querySelector('.ep06-arsenais__subtitle');
  const tablist  = section.querySelector('.ep06-tabs');

  const reduced = prefersReducedMotion();

  const els = [eyebrow, title, subtitle, tablist].filter(Boolean);
  gsap.set(els, { opacity: 0, y: reduced ? 0 : 20 });

  const tl = gsap.timeline({
    paused: true,
    defaults: { ease: 'power2.out' },
  });

  if (reduced) {
    tl.to(els, { opacity: 1, duration: 0.3 });
  } else {
    tl
      .to(eyebrow || title, { opacity: 1, y: 0, duration: 0.3 })
      .to(title, { opacity: 1, y: 0, duration: 0.6 }, eyebrow ? '-=0.1' : 0)
      .to(subtitle, { opacity: 1, y: 0, duration: 0.4 }, '-=0.3')
      .to(tablist, { opacity: 1, y: 0, duration: 0.4 }, '-=0.2');
  }

  return tl;
}

// ─── TIMELINE: Skills (Seção 13) ─────────────────────────────────────────────
function buildSkillsTimeline() {
  const panel = document.getElementById('panel-skills');
  if (!panel) return null;

  const chapeu   = panel.querySelector('.ep06-panel__chapeu');
  const title    = panel.querySelector('.ep06-panel__title');
  const subtitle = panel.querySelector('.ep06-panel__subtitle');
  const cards    = panel.querySelectorAll('.ep06-skill-card');

  const reduced = prefersReducedMotion();

  const headerEls = [chapeu, title, subtitle].filter(Boolean);
  gsap.set(headerEls, { opacity: 0, y: reduced ? 0 : 20 });
  gsap.set(cards, { opacity: 0, y: reduced ? 0 : 40 });

  if (!reduced && chapeu) gsap.set(chapeu, { filter: 'blur(8px)' });

  const tl = gsap.timeline({
    paused: true,
    defaults: { ease: 'power2.out' },
  });

  if (reduced) {
    tl.to([...headerEls, ...cards], { opacity: 1, duration: 0.3 });
  } else {
    if (chapeu) {
      tl.to(chapeu, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.4 });
    }
    if (title) {
      tl.to(title, { opacity: 1, y: 0, duration: 0.6 }, '-=0.2');
    }
    if (subtitle) {
      tl.to(subtitle, { opacity: 1, y: 0, duration: 0.4 }, '-=0.3');
    }
    if (cards.length > 0) {
      tl.to(cards, { opacity: 1, y: 0, duration: 0.6, stagger: 0.15 }, '-=0.1');
    }
  }

  return tl;
}

// ─── TIMELINE: Playbooks (Seção 14) ──────────────────────────────────────────
function buildPlaybooksTimeline() {
  const panel = document.getElementById('panel-playbooks');
  if (!panel) return null;

  const eyebrow  = panel.querySelector('.ep06-panel__eyebrow');
  const title    = panel.querySelector('.ep06-panel__title');
  const subtitle = panel.querySelector('.ep06-panel__subtitle');
  const cards    = panel.querySelectorAll('.ep06-playbook-card');

  const reduced = prefersReducedMotion();

  const headerEls = [eyebrow, title, subtitle].filter(Boolean);
  gsap.set(headerEls, { opacity: 0, y: reduced ? 0 : 20 });
  gsap.set(cards, { opacity: 0, y: reduced ? 0 : 50 });

  const tl = gsap.timeline({
    paused: true,
    defaults: { ease: 'power2.out' },
  });

  if (reduced) {
    tl.to([...headerEls, ...cards], { opacity: 1, duration: 0.3 });
  } else {
    if (eyebrow) tl.to(eyebrow, { opacity: 1, y: 0, duration: 0.3 });
    if (title)   tl.to(title,   { opacity: 1, y: 0, duration: 0.6 }, '-=0.1');
    if (subtitle) tl.to(subtitle, { opacity: 1, y: 0, duration: 0.4 }, '-=0.3');
    if (cards.length > 0) {
      tl.to(cards, { opacity: 1, y: 0, duration: 0.6, stagger: 0.18 }, '-=0.1');
    }
  }

  return tl;
}

// ─── TIMELINE: Knowledge (Seção 15) ──────────────────────────────────────────
function buildKnowledgeTimeline() {
  const panel = document.getElementById('panel-knowledge');
  if (!panel) return null;

  const eyebrow  = panel.querySelector('.ep06-panel__eyebrow');
  const title    = panel.querySelector('.ep06-panel__title');
  const subtitle = panel.querySelector('.ep06-panel__subtitle');
  const cards    = panel.querySelectorAll('.ep06-knowledge-card');
  const diagrama = panel.querySelector('.ep06-knowledge-diagrama');

  const reduced = prefersReducedMotion();

  const headerEls = [eyebrow, title, subtitle].filter(Boolean);
  gsap.set(headerEls, { opacity: 0, y: reduced ? 0 : 20 });
  gsap.set(cards, { opacity: 0, y: reduced ? 0 : 40 });
  if (diagrama) gsap.set(diagrama, { opacity: 0, y: reduced ? 0 : 20 });

  const tl = gsap.timeline({
    paused: true,
    defaults: { ease: 'power2.out' },
  });

  if (reduced) {
    const allEls = [...headerEls, ...cards, diagrama].filter(Boolean);
    tl.to(allEls, { opacity: 1, duration: 0.3 });
  } else {
    if (eyebrow)  tl.to(eyebrow,  { opacity: 1, y: 0, duration: 0.3 });
    if (title)    tl.to(title,    { opacity: 1, y: 0, duration: 0.6 }, '-=0.1');
    if (subtitle) tl.to(subtitle, { opacity: 1, y: 0, duration: 0.4 }, '-=0.3');
    if (cards.length > 0) {
      tl.to(cards, { opacity: 1, y: 0, duration: 0.6, stagger: 0.15 }, '-=0.1');
    }
    if (diagrama) {
      // Diagrama: etapas do ciclo entram em stagger 0.2s (cinematic blocks)
      const etapas = diagrama.querySelectorAll('.ep06-diagrama-ciclo__etapa');
      if (etapas.length > 0) {
        gsap.set(etapas, { opacity: 0, y: reduced ? 0 : 15 });
        tl.to(etapas, { opacity: 1, y: 0, duration: 0.4, stagger: 0.2 }, '-=0.2');
      }
      tl.to(diagrama, { opacity: 1, y: 0, duration: 0.5 }, '<');
    }
  }

  return tl;
}

// ─── Wiring: ScrollTrigger para revelar a seção arsenais + painel ativo ───────
function wireScrollTriggers(arsenaisTl, skillsTl) {
  const section = document.getElementById('skills-playbooks');
  if (!section) return;

  ScrollTrigger.create({
    trigger: section,
    start: 'top 65%',
    once: true,
    onEnter: () => {
      if (arsenaisTl) arsenaisTl.play();
      // Dispara também a timeline do painel inicialmente ativo (Skills)
      if (skillsTl) {
        // Pequeno delay para após o reveal do header
        gsap.delayedCall(0.4, () => skillsTl.play());
      }
    },
  });
}

// ─── Export principal ─────────────────────────────────────────────────────────
export function initEpico06() {
  // 1. Lógica de tabs acessível
  initTabs();

  // 2. Build timelines
  const arsenaisTl  = buildArsenaisRevealTimeline();
  const skillsTl    = buildSkillsTimeline();
  const playbooksTl = buildPlaybooksTimeline();
  const knowledgeTl = buildKnowledgeTimeline();

  // 3. ScrollTrigger — dispara reveal ao entrar na viewport
  wireScrollTriggers(arsenaisTl, skillsTl);

  // 4. Integra timelines nas tabs: ao trocar de tab, dispara a timeline
  //    do painel recém-ativado (se ainda não foi executada)
  const tablist = document.querySelector('.ep06-tabs[role="tablist"]');
  if (tablist) {
    const playedPanels = new Set(['panel-skills']); // skills dispara via scroll

    tablist.addEventListener('click', (e) => {
      const tab = e.target.closest('[role="tab"]');
      if (!tab) return;

      const panelId = tab.getAttribute('aria-controls');
      if (playedPanels.has(panelId)) return; // já foi animado, não repete

      playedPanels.add(panelId);

      if (panelId === 'panel-playbooks' && playbooksTl) {
        gsap.delayedCall(0.1, () => playbooksTl.play());
      } else if (panelId === 'panel-knowledge' && knowledgeTl) {
        gsap.delayedCall(0.1, () => knowledgeTl.play());
      }
    });
  }
}
