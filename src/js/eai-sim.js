/*
 * Simulador de arquitetura (WU-8 + T3) — bootstrap de DOM.
 * Lógica pura e modelo em eai-sim-model.js. Aqui: ler controles, pintar barras,
 * e o PAINEL DE EXPLICAÇÃO (XAI) — o simulador passa a seguir o próprio P10.
 */
import { score, SIM_MODEL, explainGuardrail, formatImpact } from './eai-sim-model.js';

const GUARDRAIL_KEYS = Object.keys(SIM_MODEL.guardrails);

function readInputs(root) {
  const get = (name) => root.querySelector(`[data-sim="${name}"]`);
  const inputs = { autonomy: Number(get('autonomy').value) / 100 };
  for (const k of GUARDRAIL_KEYS) inputs[k] = !!get(k)?.checked;
  return inputs;
}

function renderMeters(root, out) {
  const aOut = root.querySelector('[data-sim-out="autonomy"]');
  if (aOut) aOut.textContent = root.querySelector('[data-sim="autonomy"]').value;

  root.querySelectorAll('.eai-meter').forEach((m) => {
    const key = m.getAttribute('data-metric');
    const val = out[key];
    const fill = m.querySelector('[data-sim-fill]');
    const valEl = m.querySelector('[data-sim-val]');
    const bar = m.querySelector('[role="progressbar"]');
    if (fill) fill.style.width = `${val}%`;
    if (valEl) valEl.textContent = String(val);
    if (bar) bar.setAttribute('aria-valuenow', String(val));
  });
}

function renderExplain(body, { inputs, out, change }) {
  if (!body) return;
  const parts = [];

  if (change && change.type === 'guardrail') {
    const e = explainGuardrail(change.key, change.on);
    const impacts = e.impacts.map(formatImpact).join(' · ');
    parts.push(`<p class="eai-sim__explain-change"><strong>${e.title}</strong> Impacto: ${impacts || 'sem efeito direto'}.</p>`);
    parts.push(`<p class="eai-sim__explain-why">${e.razao}</p>`);
  } else if (change && change.type === 'autonomy') {
    const a = SIM_MODEL.autonomy.perFull;
    const dir = change.up ? 'aumentou' : 'reduziu';
    parts.push(`<p class="eai-sim__explain-change"><strong>Você ${dir} a autonomia para ${Math.round(inputs.autonomy * 100)}%.</strong> A cada 10%: ${formatImpact({ metric: 'custo', delta: a.custo / 10 })}, ${formatImpact({ metric: 'risco', delta: a.risco / 10 })}, ${formatImpact({ metric: 'confianca', delta: a.confianca / 10 })}.</p>`);
    parts.push(`<p class="eai-sim__explain-why">${SIM_MODEL.autonomy.razao}</p>`);
  } else {
    parts.push('<p class="eai-sim__explain-change">Ajuste a autonomia ou marque um guardrail — cada mudança é explicada aqui antes de você ler as barras.</p>');
  }

  // Pisos: explica os mínimos quando uma métrica os atinge.
  const floored = [];
  if (out.custo === SIM_MODEL.floors.custo) floored.push(`<li><strong>Custo ≥ 30:</strong> ${SIM_MODEL.floorReasons.custo}</li>`);
  if (out.risco === SIM_MODEL.floors.risco) floored.push(`<li><strong>Risco ≥ 40:</strong> ${SIM_MODEL.floorReasons.risco}</li>`);
  if (floored.length) {
    parts.push(`<ul class="eai-sim__explain-floors">${floored.join('')}</ul>`);
  }

  body.innerHTML = parts.join('');
}

function diffInputs(prev, next) {
  if (!prev) return null;
  for (const k of GUARDRAIL_KEYS) {
    if (prev[k] !== next[k]) return { type: 'guardrail', key: k, on: next[k] };
  }
  if (prev.autonomy !== next.autonomy) return { type: 'autonomy', up: next.autonomy > prev.autonomy };
  return null;
}

function initTooltips(root) {
  // ⓘ clicável em cada label de métrica → alterna a explicação do que a métrica é.
  root.querySelectorAll('.eai-meter').forEach((m) => {
    const key = m.getAttribute('data-metric');
    const info = SIM_MODEL.metricInfo[key];
    const label = m.querySelector('.eai-meter__label');
    if (!info || !label || label.querySelector('.eai-meter__info')) return;
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'eai-meter__info';
    btn.setAttribute('aria-expanded', 'false');
    btn.setAttribute('aria-label', `O que é ${label.textContent.trim()}?`);
    // símbolo aria-hidden: não polui o nome acessível do progressbar (aria-labelledby do label)
    btn.innerHTML = '<span aria-hidden="true">ⓘ</span>';
    const tip = document.createElement('span');
    tip.className = 'eai-meter__tip';
    tip.setAttribute('role', 'note');
    tip.hidden = true;
    tip.textContent = info;
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const open = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', open ? 'false' : 'true');
      tip.hidden = open;
    });
    label.appendChild(btn);
    m.appendChild(tip); // tip fora do label (não entra no nome acessível do progressbar)
  });
}

function initSim() {
  const root = document.querySelector('[data-eai-sim]');
  if (!root) return;
  const explainBody = root.querySelector('[data-sim-explain-body]');
  let prev = null;

  const update = () => {
    const inputs = readInputs(root);
    const out = score(inputs);
    renderMeters(root, out);
    // checkbox dispara 'input' E 'change' (par): só re-explica numa mudança real,
    // senão o 2º evento (diff nulo) sobrescreveria a explicação com a mensagem inicial.
    const change = diffInputs(prev, inputs);
    if (prev === null || change) renderExplain(explainBody, { inputs, out, change });
    prev = inputs;
  };

  initTooltips(root);
  root.addEventListener('input', update);
  root.addEventListener('change', update);
  update(); // estado inicial
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initSim);
} else {
  initSim();
}
