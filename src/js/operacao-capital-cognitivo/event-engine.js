/*
 * Random Event Engine — Operação Capital Cognitivo (spec doc 06).
 * Tabela de eventos, sorteio e handlers com mitigação. LÓGICA PURA.
 * Aleatoriedade injetável via setRollMock para testes.
 */

export const EVENT_TABLE = {
  Q2: [
    { id: 'EVT_01', probability: 0.35 },
    { id: 'EVT_06', probability: 0.20 },
  ],
  Q3: [
    { id: 'EVT_02', probability: 0.25 },
    { id: 'EVT_04', probability: 0.15 },
    { id: 'EVT_07', probability: 0.25, requires: (s) => s.technical.multiAgent },
  ],
  Q4: [
    { id: 'EVT_03', probability: 0.30 },
    { id: 'EVT_05', probability: 0.20 },
  ],
};

export const EVENT_HANDLERS = {
  EVT_01: {
    title: 'Guerra de Preços de LLM 📉', severity: 'info',
    description: 'Preço por token das principais APIs caiu 40%. Seu custo de API reduziu automaticamente.',
    descriptionMitigated: null,
    checkMitigation: () => false,
    impact: 'apiCost × 0.60',
    apply: (s) => ({ finances: { ...s.finances, apiCost: s.finances.apiCost * 0.60 } }),
  },
  EVT_02: {
    title: 'Inflação de Salários Dev 📈', severity: 'warning',
    description: 'Escassez de engenheiros elevou o custo do tempo humano em +35%.',
    descriptionMitigated: 'Inflação de salários, mas sua alta acurácia limitou o impacto a +17%.',
    checkMitigation: (s) => s.operations.firstPassAccuracy >= 0.88,
    impact: 'humanReworkCost × 1.35',
    apply: (s, m) => ({ finances: { ...s.finances, humanReworkCost: s.finances.humanReworkCost * (m ? 1.17 : 1.35) } }),
  },
  EVT_03: {
    title: 'Pico Imprevisto de Demanda 🚀', severity: 'critical',
    description: 'Volume de chamadas triplicou. Sem roteamento dinâmico, o custo de API explodiu.',
    descriptionMitigated: 'Pico absorvido pelo RouteLLM — SLMs escalaram automaticamente.',
    checkMitigation: (s) => s.technical.useRouteLLM,
    impact: 'monthlyRequests × 2.5, apiCost × 3.0',
    apply: (s, m) => ({
      operations: { ...s.operations, monthlyRequests: Math.round(s.operations.monthlyRequests * (m ? 1.8 : 2.5)) },
      finances: { ...s.finances, apiCost: s.finances.apiCost * (m ? 1.4 : 3.0) },
    }),
  },
  EVT_04: {
    title: 'Crise de Alucinação 🔴', severity: 'critical',
    description: 'Output incorreto em contratos jurídicos. Moral do time desabou. CRO em alerta máximo.',
    descriptionMitigated: 'RAG profundo bloqueou a alucinação antes do cliente receber. Crise contida.',
    checkMitigation: (s) => s.technical.ragDepth >= 3,
    impact: 'devTeamMoral −20, marcus.trust −30',
    apply: (s, m) => m
      ? { social: { ...s.social, devTeamMoral: Math.max(0, s.social.devTeamMoral - 5) } }
      : { social: { ...s.social, devTeamMoral: Math.max(0, s.social.devTeamMoral - 20), stakeholderTrust: { ...s.social.stakeholderTrust, marcus: Math.max(0, s.social.stakeholderTrust.marcus - 30) } },
          technical: { ...s.technical, hallucinationRate: s.technical.hallucinationRate + 0.08 } },
  },
  EVT_05: {
    title: 'Regulação de IA — Auditoria Obrigatória ⚖️', severity: 'warning',
    description: 'Nova regulação exige auditoria de sistemas de IA. Custo de infraestrutura +R$ 15.000.',
    descriptionMitigated: 'Auditoria passou sem problemas — sua documentação de governança (UI/$) foi aceita.',
    checkMitigation: (s) => s._evid03Unlocked === true,
    impact: 'infrastructureCost +R$ 15.000',
    apply: (s, m) => ({ finances: { ...s.finances, infrastructureCost: s.finances.infrastructureCost + (m ? 5_000 : 15_000) } }),
  },
  EVT_06: {
    title: 'Concorrente com SLM Próprio 🏃', severity: 'warning',
    description: 'Concorrente lançou serviço mais ágil. Clientes com SLA abaixo de 92% estão migrando.',
    descriptionMitigated: 'Seu SLA alto manteve a base de clientes fiel ao serviço.',
    checkMitigation: (s) => s.operations.slaCompliance >= 0.92,
    impact: 'customerChurn +8%',
    apply: (s, m) => m ? {} : { operations: { ...s.operations, customerChurn: Math.min(1, s.operations.customerChurn + 0.08) } },
  },
  EVT_07: {
    title: 'Cascata de Erros Agêntica 🔥', severity: 'critical',
    description: 'Uma alucinação do agente inicial ricocheteou pelo pipeline. O contexto reenviado inflou a fatura de API — até 62% do gasto foi retrabalho de contexto contaminado.',
    descriptionMitigated: 'O isolamento de contexto entre agentes conteve a propagação no primeiro checkpoint de validação.',
    checkMitigation: (s) => s.technical.agentIsolation === true,
    impact: 'apiCost × (1 + até 0.62), cashBalance despenca',
    apply: (s, m) => {
      const factor = m ? 0.15 : Math.min(0.62, 0.20 + (1 - s.operations.firstPassAccuracy) * 0.9);
      const resent = s.finances.apiCost * factor;
      return { finances: { ...s.finances, resentContextCost: s.finances.resentContextCost + resent, apiCost: s.finances.apiCost + resent, cashBalance: s.finances.cashBalance - resent } };
    },
  },
};

export class RandomEventEngine {
  #rollFn = Math.random;
  #mocks = {};
  setRollMock(quarter, ids) { this.#mocks[quarter] = ids; }
  setRollFn(fn) { this.#rollFn = fn; }

  rollQuarterEvents(quarter, state) {
    if (this.#mocks[quarter]) return [...this.#mocks[quarter]];
    const candidates = EVENT_TABLE[quarter] ?? [];
    return candidates
      .filter((ev) => !ev.requires || ev.requires(state))
      .filter((ev) => this.#rollFn() < ev.probability)
      .map((ev) => ev.id);
  }

  /** Resolve um evento: retorna objeto pronto para DigitalTwinEngine.stepQuarter. */
  resolve(eventId, state) {
    const handler = EVENT_HANDLERS[eventId];
    if (!handler) return null;
    const mitigated = handler.checkMitigation(state);
    return {
      id: eventId,
      title: handler.title,
      description: mitigated && handler.descriptionMitigated ? handler.descriptionMitigated : handler.description,
      impact: handler.impact,
      severity: mitigated ? 'warning' : handler.severity,
      mitigated,
      apply: (st) => handler.apply(st, mitigated),
    };
  }
}
