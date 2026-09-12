/*
 * Curiosidade e Investigação — comportamento da página (Vanilla JS, ES6 modules).
 * Spec: docs/specs/pages/curiosidade-e-investigacao/.
 *
 * Progressive enhancement: o artigo, o ciclo (lista) e os accordions (<details>
 * nativo) funcionam sem JS. Aqui ligamos: barra de progresso, índice com
 * scroll-spy, reveal dos callouts, modo de leitura simples, toggle de
 * animação, a interação Bancada vs. Oráculo (fluxo linear) e a pausa de
 * recuperação ativa — sempre respeitando prefers-reduced-motion.
 */

const prefersReducedMotion =
  window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ============================ Barra de progresso de leitura ============================ */
function initReadbar() {
  const bar = document.querySelector('[data-ci-progress]');
  if (!bar) return;
  let ticking = false;
  const update = () => {
    const doc = document.documentElement;
    const max = doc.scrollHeight - doc.clientHeight;
    const pct = max > 0 ? (doc.scrollTop / max) * 100 : 0;
    bar.style.width = `${Math.min(100, Math.max(0, pct))}%`;
    ticking = false;
  };
  window.addEventListener(
    'scroll',
    () => {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    },
    { passive: true }
  );
  update();
}

/* ============================ Índice: scroll-spy (desktop + mobile) ============================ */
function initToc() {
  const sections = Array.from(document.querySelectorAll('main [data-ci-section]'));
  if (!sections.length) return;

  const links = Array.from(document.querySelectorAll('[data-ci-tocLink]'));
  const stepLabel = document.querySelector('[data-ci-step]');
  const mobileToc = document.querySelector('[data-ci-toc-mobile]');

  let currentId = null;
  const setActive = (id, label) => {
    if (id === currentId) return;
    currentId = id;
    links.forEach((a) => {
      const on = a.getAttribute('href') === `#${id}`;
      if (on) a.setAttribute('aria-current', 'true');
      else a.removeAttribute('aria-current');
    });
    if (stepLabel && label) stepLabel.textContent = label;
  };

  const observer = new IntersectionObserver(
    (entries) => {
      let best = null;
      entries.forEach((e) => {
        if (e.isIntersecting && (!best || e.intersectionRatio > best.intersectionRatio)) best = e;
      });
      if (best) setActive(best.target.id, best.target.dataset.ciLabel);
    },
    { rootMargin: '-30% 0px -55% 0px', threshold: [0, 0.1, 0.25, 0.5] }
  );
  sections.forEach((s) => observer.observe(s));

  // Fecha o índice mobile (details) ao escolher um item e devolve o foco.
  if (mobileToc) {
    links.forEach((a) => {
      if (!mobileToc.contains(a)) return;
      a.addEventListener('click', () => {
        window.setTimeout(() => { mobileToc.open = false; }, 50);
      });
    });
  }
}

/* ============================ Reveal dos callouts ============================ */
function initReveal() {
  const items = Array.from(document.querySelectorAll('.ci-callout'));
  if (!items.length) return;
  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    items.forEach((el) => el.classList.add('is-in'));
    return;
  }
  const obs = new IntersectionObserver(
    (entries, o) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('is-in');
          o.unobserve(e.target);
        }
      });
    },
    { rootMargin: '0px 0px -10% 0px', threshold: 0.08 }
  );
  items.forEach((el) => obs.observe(el));
}

/* ============================ Modo de leitura simples ============================ */
function initSimpleMode() {
  const btn = document.querySelector('[data-ci-simple-toggle]');
  if (!btn) return;
  const KEY = 'ci-simple-mode';
  const apply = (on) => {
    document.body.classList.toggle('ci-simple', on);
    btn.setAttribute('aria-pressed', String(on));
    btn.textContent = on ? 'Modo de leitura simples: ligado' : 'Ativar modo de leitura simples';
  };
  let on = false;
  try { on = localStorage.getItem(KEY) === '1'; } catch { /* privado/bloqueado: segue com padrão */ }
  apply(on);
  btn.addEventListener('click', () => {
    on = !on;
    apply(on);
    try { localStorage.setItem(KEY, on ? '1' : '0'); } catch { /* ignora */ }
  });
}

/* ============================ Toggle de animação ============================ */
function initAnimToggle() {
  const btn = document.querySelector('[data-ci-anim-toggle]');
  if (!btn) return;
  const KEY = 'ci-anim-off';
  const apply = (off) => {
    document.body.classList.toggle('ci-noanim', off);
    btn.setAttribute('aria-pressed', String(off));
    btn.textContent = off ? 'Animações: desligadas' : 'Desligar animações';
  };
  let off = false;
  try { off = localStorage.getItem(KEY) === '1'; } catch { /* ignora */ }
  apply(off);
  btn.addEventListener('click', () => {
    off = !off;
    apply(off);
    try { localStorage.setItem(KEY, off ? '1' : '0'); } catch { /* ignora */ }
  });
}

/* ============================ Bancada vs. Oráculo (fluxo linear) ============================ */
// Enriquecimento por arrastar não é implementado (o fluxo por clique/teclado é
// obrigatório e já cobre 100% dos critérios de aceite; arrastar era listado
// como opcional na própria spec — 16.3 "o arrastar é opcional").
function initBancada() {
  const root = document.querySelector('[data-ci-bancada]');
  if (!root) return;

  const sources = Array.from(root.querySelectorAll('[data-ci-source]'));
  const actionBtns = Array.from(root.querySelectorAll('[data-ci-action]'));
  const result = root.querySelector('[data-ci-result]');
  const excerpt = root.querySelector('[data-ci-excerpt]');
  const status = root.querySelector('[data-ci-status]');
  const selected = new Set();

  const announce = (msg) => { if (status) status.textContent = msg; };

  const refreshActions = () => {
    actionBtns.forEach((b) => { b.disabled = selected.size === 0; });
  };

  sources.forEach((card) => {
    card.addEventListener('click', () => {
      const on = card.getAttribute('aria-pressed') !== 'true';
      card.setAttribute('aria-pressed', String(on));
      if (on) { selected.add(card.dataset.ciSource); announce(`${card.dataset.ciSourceName} adicionada à bancada.`); }
      else { selected.delete(card.dataset.ciSource); announce(`${card.dataset.ciSourceName} removida da bancada.`); }
      refreshActions();
    });
  });

  actionBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      if (!selected.size || !result) return;
      const names = sources
        .filter((c) => selected.has(c.dataset.ciSource))
        .map((c) => c.dataset.ciSourceName)
        .join(', ');
      if (excerpt) {
        excerpt.textContent = `Trecho ilustrativo: comparando ${names}, a bancada localizaria passagens equivalentes e apontaria onde elas concordam ou divergem — sem gerar uma conclusão pronta.`;
      }
      result.hidden = false;
      result.scrollIntoView({ block: 'nearest', behavior: prefersReducedMotion ? 'auto' : 'smooth' });
      announce('Síntese disponível para julgamento.');
    });
  });

  refreshActions();
}

/* ============================ Pausa de recuperação ativa ============================ */
function initRecovery() {
  const btn = document.querySelector('[data-ci-recovery-start]');
  const panel = document.querySelector('[data-ci-recovery-panel]');
  if (!btn || !panel) return;
  btn.addEventListener('click', () => {
    panel.hidden = false;
    btn.hidden = true;
    const ta = panel.querySelector('textarea');
    if (ta) ta.focus();
  });
  // Nunca persistimos o texto: nenhum listener de input grava em storage/rede.
}

/* ============================ Ciclo: destaque da etapa visível ============================ */
function initCycle() {
  const list = document.querySelector('[data-ci-cycle-list]');
  if (!list || prefersReducedMotion || !('IntersectionObserver' in window)) return;
  const items = Array.from(list.querySelectorAll('li'));
  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => e.target.classList.toggle('is-active', e.intersectionRatio > 0.6));
    },
    { root: list, threshold: [0, 0.6, 1] }
  );
  items.forEach((li) => obs.observe(li));
}

/* ============================ Boot ============================ */
function boot() {
  initReadbar();
  initToc();
  initReveal();
  initSimpleMode();
  initAnimToggle();
  initBancada();
  initRecovery();
  initCycle();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}
