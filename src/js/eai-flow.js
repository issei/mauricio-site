/*
 * Pipeline & resiliência (WU-10 + T4) — troca de cenário num diagrama SVG próprio.
 * Determinístico e acessível: o parágrafo aria-live é o equivalente textual.
 * T4: descrições por cenário + realce visual da etapa que falha em cada caso.
 */
const SCENARIOS = {
  feliz: {
    fail: null,
    desc: 'Caminho ideal (fluxo determinístico M1→M5): dados chegam completos, cada módulo executa sem erro e a saída passa na validação. Mesma entrada, mesma saída — este é o baseline reproduzível e auditável que o design deve garantir.',
  },
  saga: {
    fail: 'm4',
    desc: 'M4 (Ranking) falhou após um efeito colateral. O sistema aciona a compensação (Saga): desfaz em ordem reversa o que M3 calculou, registra o motivo e retorna ao estado anterior de forma limpa. Nenhum dado corrompido, sem rollback global — cada nó é idempotente.',
  },
  dlq: {
    fail: 'm3',
    desc: 'M3 (Score) violou o contrato repetidas vezes. Em vez de bloquear o pipeline ou silenciar o erro, a mensagem vai para a DLQ (Dead-Letter Queue) — registrada, nunca descartada em silêncio, onde pode ser inspecionada, corrigida e reprocessada na próxima onda.',
  },
  confianca: {
    fail: 'm5',
    desc: 'M5 (XAI) calculou confiança de 94% — abaixo do threshold de 98%. Em vez de aprovar automaticamente, aciona revisão humana. O sistema sabe quando não sabe: em 98% ou mais executa autônomo e gera registro de auditoria; abaixo, escala para um humano.',
  },
};

function initFlow() {
  const root = document.querySelector('[data-eai-flow]');
  if (!root) return;
  const tabs = Array.from(root.querySelectorAll('[role="tab"]'));
  const desc = root.querySelector('[data-flow-desc]');

  const setScenario = (name) => {
    const sc = SCENARIOS[name];
    if (!sc) return;
    root.setAttribute('data-scenario', name);
    root.setAttribute('data-fail', sc.fail || '');
    tabs.forEach((t) =>
      t.setAttribute('aria-selected', t.getAttribute('data-scenario') === name ? 'true' : 'false')
    );
    if (desc) desc.textContent = sc.desc;
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
