/*
 * Simulador de arquitetura (WU-8 + T3 + v2) — bootstrap de DOM.
 * Lógica pura e modelo em eai-sim-model.js. Aqui: ler controles, pintar barras,
 * tooltips por métrica (definição + escala) e o LOG CUMULATIVO de decisões.
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

// ---- Tooltips por métrica: definição + escala (B1) ----
// Fecha todos os tooltips abertos (usado ao abrir outro ou ao clicar fora).
function closeAllTips(root) {
  root.querySelectorAll('.eai-meter__tip').forEach((t) => { t.hidden = true; });
  root.querySelectorAll('.eai-meter__info').forEach((b) => b.setAttribute('aria-expanded', 'false'));
}

function initTooltips(root) {
  root.querySelectorAll('.eai-meter').forEach((m) => {
    const key = m.getAttribute('data-metric');
    const info = SIM_MODEL.metricInfo[key];
    const label = m.querySelector('.eai-meter__label');
    if (!info || !label || label.querySelector('.eai-meter__info')) return;
    const name = (SIM_MODEL.metricLabels[key] || label.textContent.trim());

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'eai-meter__info';
    btn.setAttribute('data-metric-info', key);
    btn.setAttribute('aria-expanded', 'false');
    btn.setAttribute('aria-label', `O que é ${name}?`);
    btn.innerHTML = '<span aria-hidden="true">ⓘ</span>';

    const tip = document.createElement('div');
    tip.className = 'eai-meter__tip';
    tip.setAttribute('data-metric-tooltip', key);
    tip.setAttribute('role', 'note');
    tip.hidden = true;
    tip.innerHTML = `<strong>${name} — escala 0 a 100 pts</strong><p>${info}</p>`;

    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation(); // não dispara o "fechar ao clicar fora"
      const open = btn.getAttribute('aria-expanded') === 'true';
      closeAllTips(root); // só um tooltip aberto por vez
      if (!open) {
        btn.setAttribute('aria-expanded', 'true');
        tip.hidden = false;
      }
    });
    label.appendChild(btn);
    m.appendChild(tip); // fora do label: não polui o nome acessível do progressbar
  });

  // Fechar ao clicar fora (mas não ao clicar no próprio tooltip).
  document.addEventListener('click', (e) => {
    if (e.target.closest('.eai-meter__tip') || e.target.closest('.eai-meter__info')) return;
    closeAllTips(root);
  });
}

// ---- Log cumulativo de decisões (B2) ----
// Texto de cada guardrail derivado do modelo (fonte única): rótulo + razão + impactos.
function guardrailLogText(key) {
  const g = SIM_MODEL.guardrails[key];
  const e = explainGuardrail(key, true);
  const impacts = e.impacts.map(formatImpact).join(', ');
  return `✓ ${g.label} ativo: ${g.razao} (${impacts}).`;
}

function autonomyLogText(pct) {
  if (pct === 0) return '→ Autonomia 0%: agente totalmente supervisionado. Nenhuma decisão sem validação humana.';
  if (pct <= 30) return `→ Autonomia ${pct}%: baixa — agente executa tarefas estruturadas, humano valida exceções.`;
  if (pct <= 60) return `→ Autonomia ${pct}%: média — agente toma decisões rotineiras; casos-limite escalam. Risco cresce.`;
  if (pct <= 80) return `→ Autonomia ${pct}%: alta — agente aprova a maioria dos casos sozinho. Custo e risco sobem significativamente.`;
  return `→ Autonomia ${pct}%: máxima — sem supervisão. Eficiente, mas qualquer erro se propaga sem freio.`;
}

function renderLog(root, inputs) {
  const list = root.querySelector('[data-sim-log-list]');
  const empty = root.querySelector('[data-sim-log-empty]');
  if (!list) return;
  list.innerHTML = '';

  // linha de autonomia sempre no topo
  const autoLi = document.createElement('li');
  autoLi.id = 'log-autonomia';
  autoLi.setAttribute('data-log', 'autonomia');
  autoLi.textContent = autonomyLogText(Math.round(inputs.autonomy * 100));
  list.appendChild(autoLi);

  // uma linha por guardrail ativo (concatenadas, na ordem do modelo)
  for (const key of GUARDRAIL_KEYS) {
    if (!inputs[key]) continue;
    const li = document.createElement('li');
    li.id = `log-${key}`;
    li.setAttribute('data-log', key);
    li.textContent = guardrailLogText(key);
    list.appendChild(li);
  }

  if (empty) empty.hidden = list.children.length > 0;
}

function initSim() {
  const root = document.querySelector('[data-eai-sim]');
  if (!root) return;

  const update = () => {
    const inputs = readInputs(root);
    renderMeters(root, score(inputs));
    renderLog(root, inputs);
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
