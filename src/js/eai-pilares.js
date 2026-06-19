/*
 * Cinco Pilares — bootstrap de DOM (segue o padrão de eai-sim.js).
 * Lógica pura em eai-pilares-model.js. Aqui: o stepper de maturidade (Pilar 4)
 * e o Calibrador de Autonomia (Pilar 1, painel dentro de #simulador).
 * Sem localStorage, sem framework — só DOM + os helpers puros.
 */
import {
  classifyAutonomy,
  MODE_LEAK_TEXT,
  maturityStage,
} from './eai-pilares-model.js';

/* ---- Stepper de maturidade (Pilar 4) ---- */
function initMaturity() {
  const root = document.querySelector('[data-eai-maturity]');
  if (!root) return;
  const tabs = Array.from(root.querySelectorAll('[data-maturity-stage]'));
  const panel = root.querySelector('[data-maturity-panel]');
  if (!tabs.length || !panel) return;

  const render = (id) => {
    const stage = maturityStage(id);
    if (!stage) return;
    tabs.forEach((t) =>
      t.setAttribute('aria-selected', t.getAttribute('data-maturity-stage') === String(id) ? 'true' : 'false')
    );
    panel.innerHTML =
      `<p class="eai-mat__panel-name">Estágio ${stage.id} · ${stage.name}` +
      `<span class="eai-mat__panel-tag">${stage.tagline}</span></p>` +
      `<dl class="eai-mat__panel-dl">` +
      `<div><dt>O que já existe</dt><dd>${stage.has}</dd></div>` +
      `<div><dt>O que falta</dt><dd>${stage.missing}</dd></div>` +
      `<div class="eai-mat__panel-next"><dt>Próximo passo</dt><dd>${stage.next}</dd></div>` +
      `</dl>`;
  };

  tabs.forEach((t) => {
    t.addEventListener('click', () => render(t.getAttribute('data-maturity-stage')));
  });
  render(tabs[0].getAttribute('data-maturity-stage'));
}

/* ---- Calibrador de Autonomia (Pilar 1) ---- */
function initCalibrador() {
  const root = document.querySelector('[data-eai-calibrador]');
  if (!root) return;
  const costIn = root.querySelector('[data-cal="cost"]');
  const revIn = root.querySelector('[data-cal="reversibility"]');
  const depIn = root.querySelector('[data-cal="depended"]');
  const result = root.querySelector('[data-cal-result]');
  const leak = root.querySelector('[data-cal-leak]');
  const costOut = root.querySelector('[data-cal-out="cost"]');
  const revOut = root.querySelector('[data-cal-out="reversibility"]');
  if (!costIn || !revIn || !result) return;

  const update = () => {
    const out = classifyAutonomy({
      cost: Number(costIn.value),
      reversibility: Number(revIn.value),
      dependedInProd: !!depIn?.checked,
    });
    if (costOut) costOut.textContent = costIn.value;
    if (revOut) revOut.textContent = revIn.value;

    root.setAttribute('data-quadrant', out.quadrant);
    result.innerHTML =
      `<p class="eai-cal__verdict-label">${out.label}</p>` +
      `<p class="eai-cal__verdict-ceremony">${out.ceremony}</p>` +
      `<p class="eai-cal__verdict-rec">${out.recommendation}</p>`;

    if (leak) {
      leak.hidden = !out.modeLeak;
      leak.textContent = out.modeLeak ? `⚠ ${MODE_LEAK_TEXT}` : '';
    }
  };

  root.addEventListener('input', update);
  root.addEventListener('change', update);
  update();
}

function boot() {
  initMaturity();
  initCalibrador();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}
