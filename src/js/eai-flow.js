/*
 * Pipeline & resiliência (WU-10) — doc 05 (Saga/DLQ/roteamento por confiança).
 * Troca de cenário num diagrama SVG próprio (sem bpmn-js — ADR-eai-002).
 * Determinístico e acessível: o parágrafo aria-live é o equivalente textual.
 */
const DESCRIPTIONS = {
  feliz:
    'Fluxo determinístico M1→M5: busca, extração, score, ranking e explicação. Mesma entrada, mesma saída — reproduzível e auditável.',
  saga:
    'Falha parcial após um efeito colateral dispara a compensação (Saga): a ação é desfeita em ordem reversa, sem rollback global. Cada nó é idempotente.',
  dlq:
    'Item que viola o contrato N vezes ou estoura o orçamento é desviado para a Dead-Letter Queue — registrado, nunca descartado em silêncio; reprocessável na próxima onda.',
  confianca:
    'A revisão humana só é acionada se a confiança da XAI for menor que 98%. Em 98% ou mais, o sistema executa de forma autônoma e gera apenas um registro de auditoria.',
};

function initFlow() {
  const root = document.querySelector('[data-eai-flow]');
  if (!root) return;
  const tabs = Array.from(root.querySelectorAll('[role="tab"]'));
  const desc = root.querySelector('[data-flow-desc]');

  const setScenario = (name) => {
    if (!DESCRIPTIONS[name]) return;
    root.setAttribute('data-scenario', name);
    tabs.forEach((t) =>
      t.setAttribute('aria-selected', t.getAttribute('data-scenario') === name ? 'true' : 'false')
    );
    if (desc) desc.textContent = DESCRIPTIONS[name];
  };

  tabs.forEach((t) => {
    t.addEventListener('click', () => setScenario(t.getAttribute('data-scenario')));
  });

  setScenario(root.getAttribute('data-scenario') || 'feliz');
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initFlow);
} else {
  initFlow();
}
