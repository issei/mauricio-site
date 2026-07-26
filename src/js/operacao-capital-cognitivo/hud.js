/*
 * HUD persistente — Operação Capital Cognitivo (spec docs 01/08).
 * Consome getState() do Digital Twin. Sem estado próprio.
 */

export const fmtBRL = (v) => 'R$ ' + Math.round(v).toLocaleString('pt-BR');

const CHAPTERS = [
  { n: 1, label: 'Cap1' }, { n: 2, label: 'Cap2' }, { n: 3, label: 'Cap3' },
  { n: 4, label: 'Cap4' }, { n: 5, label: 'Cap5' }, { n: 6, label: 'Cap6' },
];

export function renderBreadcrumb(currentChapter, doneSet) {
  const nav = document.getElementById('chapter-breadcrumb');
  if (!nav) return;
  nav.innerHTML = CHAPTERS.map((c) => {
    const state = doneSet.has(c.n) ? '✓' : c.n === currentChapter ? '●' : '○';
    const cls = doneSet.has(c.n) ? 'text-green-400' : c.n === currentChapter ? 'text-blue-400' : 'text-gray-600';
    return `<span class="${cls}" title="Capítulo ${c.n}">${state}</span>`;
  }).join('');
}

function vcoreColor(v) {
  if (v < 40) return 'var(--color-sim-vcore-ok)';
  if (v < 75) return 'var(--color-sim-amber)';
  return 'var(--color-sim-vcore)';
}

/** Revela campos do HUD conforme o capítulo. */
export function revealHudFields(chapter) {
  const show = (sel) => document.querySelectorAll(sel).forEach((el) => (el.hidden = false));
  if (chapter >= 2) show('[data-hud="vcore"]');
  if (chapter >= 3) show('[data-hud="ui"]');
  if (chapter >= 5) { show('[data-hud="capital"]'); show('[data-hud="sla"]'); }
}

export function updateHUD(state) {
  const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
  set('hud-quarter', state.currentQuarter > 0 ? `Q${state.currentQuarter}` : 'Q0');
  set('hud-cash', fmtBRL(state.finances.cashBalance));
  set('hud-ui-dollar', state.metrics.globalUI ? state.metrics.globalUI.toFixed(2) : '—');
  set('hud-capital', `${Math.round(state.metrics.cognitiveCapitalIndex)}/100`);

  const v = Math.round(state.operations.verificationLoad);
  const vEl = document.getElementById('hud-vcore');
  if (vEl) { vEl.textContent = String(v); vEl.style.color = vcoreColor(v); }

  const moral = Math.round(state.social.devTeamMoral);
  set('hud-morale-pct', `${moral}%`);
  const mBar = document.getElementById('hud-morale'); if (mBar) mBar.value = moral;

  const sla = Math.round(state.operations.slaCompliance * 100);
  set('hud-sla', `${sla}%`);
  const sBar = document.getElementById('hud-sla-bar'); if (sBar) sBar.value = sla;
}
