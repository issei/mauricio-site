/*
 * Simulador de arquitetura (WU-8) — doc 06 §1.
 * Modelo de pontuação DETERMINÍSTICO (sem IA): a mesma combinação de controles
 * produz sempre os mesmos seis indicadores. Função pura `score(inputs)`.
 *
 * inputs: { autonomy: 0..1, schemas, cache, ledger, human, bdd, evals, observability: bool }
 * saída : { custo, confianca, velocidade, risco, auditabilidade, previsibilidade } (0..100 inteiros)
 */
const clamp = (n) => Math.max(0, Math.min(100, Math.round(n)));
const b = (v) => (v ? 1 : 0);

export function score(i) {
  const a = i.autonomy; // 0..1
  const schemas = b(i.schemas), cache = b(i.cache), ledger = b(i.ledger);
  const human = b(i.human), bdd = b(i.bdd), evals = b(i.evals), obs = b(i.observability);

  return {
    // custo: autonomia (retries) sobe; cache/ledger derrubam; revisão/evals pesam um pouco
    custo: clamp(30 + a * 42 - cache * 18 - ledger * 16 + human * 9 + evals * 5 + schemas * 3),
    // confiança: contratos, BDD, evals e revisão sobem; autonomia crua derruba
    confianca: clamp(34 + schemas * 18 + bdd * 16 + evals * 14 + human * 12 - a * 16),
    // velocidade: autonomia e cache aceleram; revisão humana e BDD freiam
    velocidade: clamp(48 + a * 26 + cache * 18 - human * 24 - bdd * 6),
    // risco: autonomia sobe; schemas/BDD/evals/revisão derrubam
    risco: clamp(40 + a * 38 - schemas * 20 - bdd * 16 - evals * 12 - human * 8),
    // auditabilidade: observabilidade, evals, revisão, schemas e ledger somam
    auditabilidade: clamp(18 + obs * 24 + evals * 16 + human * 16 + schemas * 10 + ledger * 8),
    // previsibilidade: BDD, ledger, schemas e observabilidade sobem; autonomia derruba
    previsibilidade: clamp(30 + bdd * 18 + ledger * 16 + schemas * 14 + obs * 10 - a * 32),
  };
}

function readInputs(root) {
  const get = (name) => root.querySelector(`[data-sim="${name}"]`);
  return {
    autonomy: Number(get('autonomy').value) / 100,
    schemas: get('schemas').checked,
    cache: get('cache').checked,
    ledger: get('ledger').checked,
    human: get('human').checked,
    bdd: get('bdd').checked,
    evals: get('evals').checked,
    observability: get('observability').checked,
  };
}

function render(root, out) {
  const aOut = root.querySelector('[data-sim-out="autonomy"]');
  if (aOut) aOut.textContent = root.querySelector('[data-sim="autonomy"]').value;

  root.querySelectorAll('.eai-meter').forEach((m) => {
    const key = m.getAttribute('data-metric');
    const map = {
      custo: 'custo', confianca: 'confianca', velocidade: 'velocidade',
      risco: 'risco', auditabilidade: 'auditabilidade', previsibilidade: 'previsibilidade',
    };
    const val = out[map[key]];
    const fill = m.querySelector('[data-sim-fill]');
    const valEl = m.querySelector('[data-sim-val]');
    const bar = m.querySelector('[role="progressbar"]');
    if (fill) fill.style.width = `${val}%`;
    if (valEl) valEl.textContent = String(val);
    if (bar) bar.setAttribute('aria-valuenow', String(val));
  });
}

function initSim() {
  const root = document.querySelector('[data-eai-sim]');
  if (!root) return;
  const update = () => render(root, score(readInputs(root)));
  root.addEventListener('input', update);
  root.addEventListener('change', update);
  update(); // estado inicial
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initSim);
} else {
  initSim();
}
