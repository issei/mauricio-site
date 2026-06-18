/*
 * Modelo do Simulador de arquitetura (T3) — LÓGICA PURA, sem DOM.
 * Fonte única da verdade: a mesma estrutura `SIM_MODEL` alimenta o cálculo
 * (`score`) e o painel de explicação (XAI) — o site passa a seguir o próprio P10.
 * Espelhado em tests/fixtures/sim-model.json para teste e documentação.
 *
 * inputs: { autonomy: 0..1, schemas, cache, ledger, human, bdd, evals, observability: bool }
 * saída : { custo, confianca, velocidade, risco, auditabilidade, previsibilidade } (inteiros)
 */

export const SIM_MODEL = {
  // Pontos de partida de cada métrica (estado "tudo desligado, autonomia 0").
  baselines: {
    custo: 30,
    risco: 40,
    velocidade: 50,
    confianca: 20,
    auditabilidade: 10,
    previsibilidade: 30,
  },
  // Pisos do sistema: não existem em produção valores abaixo destes.
  floors: { custo: 30, risco: 40 },
  // Razões dos pisos (exibidas na primeira interação do painel).
  floorReasons: {
    custo: 'Custo base de qualquer sistema: infraestrutura, latência de rede e overhead operacional. Zero nunca é possível em produção.',
    risco: 'Risco base: todo sistema tem falha de rede, erro de runtime e comportamento inesperado. Zero risco não existe.',
  },
  // Efeito da autonomia, expresso por 100% (a vai de 0 a 1).
  // "Cada 10% adicional: +5 custo, +8 risco, +3 velocidade, −4 confiança" → ×10 para 100%.
  autonomy: {
    perFull: { custo: 50, risco: 80, velocidade: 30, confianca: -40, previsibilidade: -32 },
    razao: 'Mais autonomia = mais chamadas de modelo não supervisionadas = mais custo e mais superfície para erros se propagarem; e menos previsibilidade.',
  },
  // Guardrails: chave == atributo data-sim no HTML. effects soma direto na métrica.
  guardrails: {
    schemas: {
      label: 'Contratos / Schemas',
      effects: { custo: -5, risco: -15, confianca: 20, previsibilidade: 14 },
      razao: 'Contratos rígidos barram saídas inválidas antes de propagarem. Reduz retrabalho (custo) e elimina uma classe inteira de erros (risco).',
    },
    cache: {
      label: 'Cache / Corpus',
      effects: { custo: -20, velocidade: 15 },
      razao: 'Nunca pague duas vezes pelo mesmo processamento. Cache semântico é a maior alavanca de redução de custo.',
    },
    ledger: {
      label: 'Ledger (FinOps)',
      effects: { custo: -10, risco: -5, previsibilidade: 16 },
      razao: 'Teto de gasto como estado de domínio. Elimina a fatura-surpresa e força o sistema a parar num ponto seguro.',
    },
    human: {
      label: 'Revisão humana',
      effects: { confianca: 15, risco: -10, velocidade: -10 },
      razao: 'Supervisão humana aumenta confiança mas reduz throughput. Trade-off explícito.',
    },
    bdd: {
      label: 'BDD',
      effects: { confianca: 10, auditabilidade: 20, risco: -10, previsibilidade: 18 },
      razao: 'Cenários de teste fixos tornam o comportamento verificável e auditável. A defesa número 1 contra alucinações.',
    },
    evals: {
      label: 'Evals',
      effects: { auditabilidade: 15, confianca: 5 },
      razao: 'Evals semânticos detectam drift e alucinações bem formatadas que os contratos não veem.',
    },
    observability: {
      label: 'Observabilidade',
      effects: { auditabilidade: 20, previsibilidade: 10 },
      razao: 'Sem observabilidade, o sistema é uma caixa-preta. Com ela, cada decisão é rastreável.',
    },
  },
  // O que cada métrica significa (tooltip ⓘ).
  metricInfo: {
    custo: 'Custo: gasto relativo por execução — chamadas de modelo, infraestrutura e retrabalho.',
    confianca: 'Confiança: o quanto se pode confiar que a saída está correta e dentro do contrato.',
    velocidade: 'Velocidade: throughput do pipeline — quão rápido cada item é processado de ponta a ponta.',
    risco: 'Risco: probabilidade de o sistema produzir uma saída inválida ou propagar um erro silencioso.',
    auditabilidade: 'Auditabilidade: o quanto cada decisão é rastreável e explicável depois do fato.',
    previsibilidade: 'Previsibilidade: o quanto a mesma entrada produz a mesma saída — determinismo observável.',
  },
};

const METRICS = ['custo', 'confianca', 'velocidade', 'risco', 'auditabilidade', 'previsibilidade'];

function clampMetric(metric, value) {
  const floor = SIM_MODEL.floors[metric] ?? 0;
  return Math.max(floor, Math.min(100, Math.round(value)));
}

/** Função pura: mesma combinação de controles → sempre os mesmos seis indicadores. */
export function score(inputs) {
  const a = Math.max(0, Math.min(1, Number(inputs.autonomy) || 0));
  const m = { ...SIM_MODEL.baselines };

  // Autonomia
  for (const [metric, per] of Object.entries(SIM_MODEL.autonomy.perFull)) {
    m[metric] += a * per;
  }
  // Guardrails ativos
  for (const [key, g] of Object.entries(SIM_MODEL.guardrails)) {
    if (!inputs[key]) continue;
    for (const [metric, delta] of Object.entries(g.effects)) {
      m[metric] += delta;
    }
  }

  const out = {};
  for (const metric of METRICS) out[metric] = clampMetric(metric, m[metric]);
  return out;
}

/**
 * Explicação de uma mudança de controle (XAI). Retorna { title, impacts[], razao }.
 * Para um guardrail: descreve o impacto de ligá-lo/desligá-lo.
 */
export function explainGuardrail(key, isOn) {
  const g = SIM_MODEL.guardrails[key];
  if (!g) return null;
  const sign = isOn ? 1 : -1;
  const impacts = Object.entries(g.effects).map(([metric, delta]) => ({
    metric,
    delta: delta * sign,
  }));
  return {
    title: `Você ${isOn ? 'ativou' : 'desativou'} ${g.label}.`,
    impacts,
    razao: g.razao,
  };
}

/** Formata um delta como "custo −20" / "velocidade +15". */
export function formatImpact({ metric, delta }) {
  const sign = delta > 0 ? '+' : '−';
  return `${metric} ${sign}${Math.abs(delta)}`;
}
