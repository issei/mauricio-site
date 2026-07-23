/**
 * Camada de view da página v3.0 — liga os modelos puros ao DOM.
 * ---------------------------------------------------------------------------
 * Toda a lógica testável vive em *-model.js. Aqui só há ligação com o DOM,
 * deliberadamente fina: se este arquivo começar a acumular regras, elas estão
 * no lugar errado.
 *
 * Degradação (spec §4.2): a página já vem completa e legível no HTML, com a
 * Visão Executiva visível e a de Engenharia marcada com `hidden`. Este módulo
 * ALTERNA visibilidade — nunca injeta conteúdo. Sem JavaScript, a proposta de
 * valor executiva sobrevive inteira.
 */
import { createPerspectiveMachine, otherPersona } from './perspective-model.js';
import { computeProgress } from './progress-model.js';
import { TABS, DEFAULT_TAB, countByTab, tabLabel, normalizeTab } from './hub-model.js';
import { HUB_ITEMS } from './hub-data.js';

const doc = document;
const reducedMotion = () =>
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;

/* ═══ Seletor de Perspectiva (spec §2.B) ═══════════════════════════════════ */

function initPerspective() {
  const dock = doc.querySelector('[data-ap-selector]');
  if (!dock) return;

  const options = /** @type {HTMLElement[]} */ ([...dock.querySelectorAll('[role="radio"]')]);
  const pairs = [...doc.querySelectorAll('.ap-pair')];
  const dimensions = [...doc.querySelectorAll('.ap-dimension')];
  if (!options.length) return;

  // O CSS é a fonte da duração: um segundo número no JS poderia divergir do
  // que a interface realmente faz.
  const declared = parseInt(
    getComputedStyle(doc.documentElement).getPropertyValue('--ap-transmute'),
    10
  );
  const duration = Number.isFinite(declared) ? declared : 160;

  const machine = createPerspectiveMachine({ durationMs: duration });
  let timer = null;

  function paint(persona) {
    for (const pair of pairs) {
      for (const side of pair.querySelectorAll('[data-persona]')) {
        side.hidden = side.dataset.persona !== persona;
      }
    }
    for (const opt of options) {
      const active = opt.dataset.persona === persona;
      opt.setAttribute('aria-checked', String(active));
      opt.tabIndex = active ? 0 : -1; // roving tabindex
    }
    for (const dim of dimensions) {
      dim.dataset.active = String(dim.dataset.persona === persona);
    }
    doc.documentElement.dataset.apPersona = persona;
  }

  function run(next) {
    const result = machine.request(next);
    if (result !== 'applied') return;

    // performance.mark permite ao gate medir a transmutação sem sleep.
    performance.mark?.('ap-transmute-start');
    for (const pair of pairs) pair.classList.add('is-transmuting');

    clearTimeout(timer);
    const settle = () => {
      paint(machine.state);
      for (const pair of pairs) pair.classList.remove('is-transmuting');
      performance.mark?.('ap-transmute-end');
      try {
        performance.measure?.('ap-transmute', 'ap-transmute-start', 'ap-transmute-end');
      } catch { /* marca ausente após reset — irrelevante */ }
      doc.dispatchEvent(new CustomEvent('ap:persona', { detail: machine.state }));
      if (machine.settle() === 'applied') run(machine.state);
    };

    // Duração 0 (reduced-motion) resolve no mesmo quadro, sem timer.
    if (duration <= 0) settle();
    else timer = setTimeout(settle, duration);
  }

  for (const opt of options) {
    opt.addEventListener('click', () => run(opt.dataset.persona));
  }

  // Teclado: setas movem dentro do radiogroup (padrão APG para radio).
  dock.addEventListener('keydown', (e) => {
    if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(e.key)) return;
    e.preventDefault();
    const next = otherPersona(machine.state);
    run(next);
    options.find((o) => o.dataset.persona === next)?.focus();
  });

  paint(machine.state); // garante coerência com o HTML base
}

/* ═══ Hub de Conexão (spec §2.E) ═══════════════════════════════════════════ */

function initHub() {
  const hub = doc.querySelector('[data-ap-hub]');
  if (!hub) return;

  const tabs = /** @type {HTMLElement[]} */ ([...hub.querySelectorAll('[role="tab"]')]);
  const items = [...hub.querySelectorAll('[data-hub-item]')];
  if (!tabs.length) return;

  const counts = countByTab(HUB_ITEMS);
  for (const tab of tabs) {
    const def = TABS.find((t) => t.id === tab.dataset.tab);
    if (!def) continue;
    const slot = tab.querySelector('.ap-tab-count');
    // O contador vem do modelo, não do HTML: se um item entrar ou sair do
    // gerador, o rótulo acompanha sem edição manual.
    if (slot) slot.textContent = `(${counts[def.id] ?? 0})`;
    else tab.textContent = tabLabel(def, counts);
  }

  function select(tabId) {
    const id = normalizeTab(tabId);
    for (const tab of tabs) {
      const active = tab.dataset.tab === id;
      tab.setAttribute('aria-selected', String(active));
      tab.tabIndex = active ? 0 : -1;
    }
    // Filtro in-place: mesma mecânica de transmutação do Seletor, para que os
    // dois mecanismos da página se comportem igual (spec §2.E).
    for (const item of items) item.hidden = item.dataset.tab !== id;
  }

  for (const tab of tabs) {
    tab.addEventListener('click', () => select(tab.dataset.tab));
  }

  hub.querySelector('[role="tablist"]')?.addEventListener('keydown', (e) => {
    const i = tabs.findIndex((t) => t.getAttribute('aria-selected') === 'true');
    let next = null;
    if (e.key === 'ArrowRight') next = (i + 1) % tabs.length;
    else if (e.key === 'ArrowLeft') next = (i - 1 + tabs.length) % tabs.length;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = tabs.length - 1;
    if (next === null) return;
    e.preventDefault();
    select(tabs[next].dataset.tab);
    tabs[next].focus();
  });

  select(DEFAULT_TAB);
}

/* ═══ Indicador de progresso adaptativo (spec §2.G) ════════════════════════ */

function initProgress() {
  const bar = doc.querySelector('[data-ap-progress]');
  if (!bar) return;

  const layers = [...doc.querySelectorAll('[data-layer]')];
  if (!layers.length) return;

  let boxes = [];
  const measure = () => {
    boxes = layers.map((el) => {
      const r = el.getBoundingClientRect();
      return {
        layer: Number(el.dataset.layer),
        top: r.top + window.scrollY,
        height: r.height,
      };
    });
  };

  let ticking = false;
  const update = () => {
    ticking = false;
    const p = computeProgress(window.scrollY, window.innerHeight, boxes);
    bar.style.width = `${(p * 100).toFixed(2)}%`;
    bar.parentElement?.setAttribute('aria-valuenow', String(Math.round(p * 100)));
  };

  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(update);
  };

  measure();
  update();
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', () => { measure(); update(); }, { passive: true });
}

/* ═══ Revelação e carregamento por camada (spec §4.3) ══════════════════════ */

function initReveal() {
  const targets = [...doc.querySelectorAll('.ap-reveal')];
  if (!targets.length) return;

  if (!('IntersectionObserver' in window) || reducedMotion()) {
    for (const el of targets) el.classList.add('is-visible');
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.05 }
  );
  for (const el of targets) io.observe(el);
}

/**
 * Conteúdo pesado da Camada 3 entra sob demanda: ao aproximar-se da seção OU ao
 * alternar para a Visão de Engenharia, o que vier primeiro (spec §4.3).
 * O `<template>` já está no HTML — não há fetch, portanto não há estado de erro
 * de rede a inventar; o skeleton cobre apenas a janela de clonagem.
 */
function initLazyCores() {
  const slots = [...doc.querySelectorAll('[data-ap-lazy]')];
  if (!slots.length) return;

  const hydrate = (slot) => {
    if (slot.dataset.hydrated === 'true') return;
    const tpl = slot.querySelector('template');
    if (!tpl) return;
    slot.dataset.hydrated = 'true';
    const frag = tpl.content.cloneNode(true);
    const skeleton = slot.querySelector('.ap-skeleton');
    slot.insertBefore(frag, tpl);
    skeleton?.remove();
  };

  if (!('IntersectionObserver' in window)) {
    slots.forEach(hydrate);
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        hydrate(entry.target);
        io.unobserve(entry.target);
      }
    },
    { rootMargin: '200px' }
  );
  for (const slot of slots) io.observe(slot);

  // Alternar para Engenharia é escolha ativa por densidade: hidrata tudo.
  doc.addEventListener('ap:persona', (e) => {
    if (e.detail === 'eng') slots.forEach(hydrate);
  });
}

/* ═══ Hero: caos → retícula (spec §2.A) ════════════════════════════════════ */

function initHeroFigure() {
  const figure = doc.querySelector('[data-ap-figure]');
  if (!figure) return;

  // Sem JS o CSS já entrega a retícula ordenada; aqui o ganho é ver a
  // convergência acontecer. Com reduced-motion, entrega direto o resultado.
  if (reducedMotion() || !('IntersectionObserver' in window)) {
    figure.dataset.ordered = 'true';
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        // Um quadro de atraso para que o estado "caos" chegue a ser pintado —
        // sem isso o navegador coalesce e a transição não aparece.
        requestAnimationFrame(() => { figure.dataset.ordered = 'true'; });
        io.disconnect();
      }
    },
    { threshold: 0.35 }
  );
  io.observe(figure);
}

/* ═══ Bootstrap ════════════════════════════════════════════════════════════ */

function boot() {
  doc.documentElement.classList.remove('ap-nojs');
  initPerspective();
  initHub();
  initProgress();
  initReveal();
  initHeroFigure();
  initLazyCores();
}

if (doc.readyState === 'loading') doc.addEventListener('DOMContentLoaded', boot);
else boot();
