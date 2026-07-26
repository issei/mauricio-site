/*
 * Digital Twin Engine — Operação Capital Cognitivo (spec doc 03).
 * LÓGICA PURA, sem DOM. Determinístico: nenhuma aleatoriedade interna
 * (a aleatoriedade vem do RandomEventEngine, doc 06).
 *
 * Fonte da verdade das equações: docs/specs/pages/operacao-capital-cognitivo/03_digital_twin_engine.md
 *
 * NOTA de calibração: os coeficientes são PARÂMETROS PEDAGÓGICOS calibrados para
 * a jornada, não medições absolutas (ver nota de governança no README da spec).
 */

// ---- Constantes de modelo (doc 03 §3) ----
export const CONST = {
  T_REVISAO: 0.5,        // horas de revisão por falha
  R_HORA_BASE: 120,      // R$/hora humana
  C_EMBED_BASE: 300,     // R$ por nível de RAG (geração de embedding — barata)
  OBSERVABILITY: 800,    // R$ base de observabilidade/infra
  ROUTELLM_FIXED: 2000,  // R$ custo fixo de operar o roteador
  CACHE_DISCOUNT: 0.75,  // desconto médio (50%–90%) sobre tokens em cache
  DEFAULT_CACHE_HIT: 0.40,
  SLM_SAVING: 0.55,      // SLM ~55% mais barato que o LLM principal
  ROT_THRESHOLD: 50_000, // tokens: início do Context Rot
  // Calibração de caixa (não consta na spec original — preenchimento de engenharia):
  VALUE_PER_TASK: 14,    // R$ de receita por tarefa útil aprovada
  MONTHS_PER_QUARTER: 3,
};

export const INITIAL_STATE = {
  currentPhase: 'Q0_INTRO',
  currentQuarter: 0,
  finances: {
    cashBalance: 850_000,
    monthlyBudget: 100_000,
    apiCost: 3_000,
    infrastructureCost: 0,
    humanReworkCost: 37_000,
    resentContextCost: 0,
    operatingMargin: 0.18,
  },
  operations: {
    monthlyRequests: 10_000,
    firstPassAccuracy: 0.42,
    slaCompliance: 0.71,
    customerChurn: 0.08,
    verificationLoad: 68,
  },
  technical: {
    technicalDebt: 35,
    hallucinationRate: 0.12,
    useRouteLLM: false,
    slmRatio: 0.0,
    ragDepth: 1,
    ragReranking: 'off',
    testTimeComputeLevel: 1,
    semanticCaching: false,
    avgContextTokens: 8_000,
    multiAgent: false,
    agentIsolation: true,
  },
  social: {
    devTeamMoral: 50,
    boardConfidence: 60,
    stakeholderTrust: { helena: 55, aris: 70, sarah: 45, marcus: 40, clara: 60 },
  },
  metrics: { globalUI: 0, cognitiveCapitalIndex: 0 },
  selectedModel: {
    baseAccuracy: 0.42,
    claimedAccuracy: 0.85,
    pricePerToken: 0.001,
    latenciaPrimeiraCompilacao: 22,
  },
};

const clamp = (min, max, v) => Math.max(min, Math.min(max, v));
const deepClone = (o) => JSON.parse(JSON.stringify(o));

// ---- 3.3d rerankBonus por estratégia ----
function rerankBonus(strategy) {
  return { off: 0, conditional: 0.03, universal: 0.05 }[strategy] ?? 0;
}
function rerankCost(strategy, M) {
  if (strategy === 'conditional') return M * 0.05 * 0.02;
  if (strategy === 'universal') return M * 0.35 * 0.02;
  return 0;
}

// ---- 3.4b Context Rot ----
export function contextRotPenalty(avgContextTokens) {
  if (avgContextTokens <= CONST.ROT_THRESHOLD) return 0;
  return Math.min(0.15, ((avgContextTokens - CONST.ROT_THRESHOLD) / CONST.ROT_THRESHOLD) * 0.10);
}

// ---- 3.2 First-Pass Accuracy efetiva ----
export function effectiveRm(t, selectedModel, workloadComplexity = 2) {
  const overthinking = (t.testTimeComputeLevel > 3 && workloadComplexity < 2) ? 0.08 : 0.0;
  const rot = contextRotPenalty(t.avgContextTokens);
  return clamp(0.05, 0.99,
    selectedModel.baseAccuracy
    + t.ragDepth * 0.04
    + rerankBonus(t.ragReranking)
    + t.testTimeComputeLevel * 0.05
    - overthinking
    - rot
  );
}

// ---- 3.8 Índice de Carga de Verificação (V_core) ----
export function computeVcore(rmEfetiva, M, selectedModel) {
  const s1 = 1 - rmEfetiva;
  const s2 = clamp(0, 1, ((M * (1 - rmEfetiva) * CONST.T_REVISAO) / M));
  const s3 = clamp(0, 1, (selectedModel.latenciaPrimeiraCompilacao ?? 0) / 30);
  const s4 = clamp(0, 1, 0 /* hallucination set below */);
  const overconfidenceGap = Math.max(0, (selectedModel.claimedAccuracy ?? rmEfetiva) - rmEfetiva);
  const s5 = clamp(0, 1, overconfidenceGap / 0.30);
  // s4 é derivado da hallucinationRate; passamos separadamente em recompute.
  return { s1, s2, s3, s4, s5 };
}

export function vcoreFrom(rmEfetiva, M, selectedModel, hallucinationRate) {
  const { s1, s2, s3, s5 } = computeVcore(rmEfetiva, M, selectedModel);
  const s4 = clamp(0, 1, hallucinationRate / 0.20);
  return Math.round(100 * clamp(0, 1,
    0.30 * s1 + 0.25 * s2 + 0.20 * s4 + 0.15 * s5 + 0.10 * s3
  ));
}

// ---- 3.8 fator de fadiga (não-linear) ----
export function fatorFadiga(vcore) {
  return 1 + Math.pow(vcore / 100, 2) * 0.8;
}

// Custo humano isolado (usado por testes de não-linearidade).
export function humanReworkCost(M, rmEfetiva, vcore, rHora = CONST.R_HORA_BASE) {
  return M * (1 - rmEfetiva) * CONST.T_REVISAO * rHora * fatorFadiga(vcore);
}

export class DigitalTwinEngine {
  constructor(initialState = INITIAL_STATE) {
    this.state = deepClone(initialState);
    this.history = [];
    this.workloadComplexity = 2;
    this._modelChangedThisQuarter = false;
    this._timeLagQueue = [];
  }

  getState() { return deepClone(this.state); }
  getHistory() { return deepClone(this.history); }
  setWorkloadComplexity(n) { this.workloadComplexity = n; }
  reset() { this.state = deepClone(INITIAL_STATE); this.history = []; this._timeLagQueue = []; }

  recordModelChoice(model) {
    if (model === 'lite') {
      this.state.selectedModel = { baseAccuracy: 0.42, claimedAccuracy: 0.85, pricePerToken: 0.001, latenciaPrimeiraCompilacao: 22 };
    } else if (model === 'pro') {
      this.state.selectedModel = { baseAccuracy: 0.91, claimedAccuracy: 0.93, pricePerToken: 0.020, latenciaPrimeiraCompilacao: 6 };
    }
    this._modelChangedThisQuarter = true;
    this.recompute();
  }

  /** Aplica decisões de infra ao estado técnico. */
  applyDecisions(decisions = {}) {
    const t = this.state.technical;
    const keys = ['useRouteLLM', 'slmRatio', 'ragDepth', 'ragReranking', 'testTimeComputeLevel',
      'semanticCaching', 'avgContextTokens', 'multiAgent', 'agentIsolation'];
    for (const k of keys) if (k in decisions) t[k] = decisions[k];
    if (decisions.selectedModel) { this.state.selectedModel = { ...this.state.selectedModel, ...decisions.selectedModel }; this._modelChangedThisQuarter = true; }
  }

  /** Recalcula todas as métricas derivadas a partir do estado atual. */
  recompute() {
    const s = this.state;
    const t = s.technical;
    const M = s.operations.monthlyRequests;
    const rm = effectiveRm(t, s.selectedModel, this.workloadComplexity);
    s.operations.firstPassAccuracy = rm;

    // 3.7 churn e SLA
    s.operations.customerChurn = Math.max(0, (1 - rm) * 0.3 - t.ragDepth * 0.02);
    s.operations.slaCompliance = clamp(0, 1, rm * (1 - s.operations.customerChurn * 0.5));

    // Hallucination cai com RAG profundo.
    t.hallucinationRate = clamp(0, 1, (1 - rm) * 0.4 - t.ragDepth * 0.03);

    // 3.8 V_core
    const vcore = vcoreFrom(rm, M, s.selectedModel, t.hallucinationRate);
    s.operations.verificationLoad = vcore;

    // 3.3 → 3.3b → 3.3c custo de API
    const cApiBruto = s.selectedModel.pricePerToken * M * (t.avgContextTokens / 1000);
    let cApi = t.useRouteLLM ? cApiBruto * (1 - t.slmRatio * CONST.SLM_SAVING) : cApiBruto;
    if (t.semanticCaching) {
      const hit = Math.min(0.7, CONST.DEFAULT_CACHE_HIT);
      cApi = cApi * (1 - hit * CONST.CACHE_DISCOUNT);
    }
    let resent = 0;
    if (t.multiAgent) {
      const cascadeFactor = t.agentIsolation ? 0.15 : Math.min(0.62, 0.20 + (1 - rm) * 0.9);
      resent = cApi * cascadeFactor;
    }
    s.finances.resentContextCost = resent;
    s.finances.apiCost = cApi + resent;

    // 3.3d custo real de RAG
    const cEmbed = t.ragDepth * CONST.C_EMBED_BASE;
    const indexMaintenance = cEmbed * 0.5;
    const reindex = this._modelChangedThisQuarter ? cEmbed * 4 : 0;
    const cRag = cEmbed + indexMaintenance + reindex + rerankCost(t.ragReranking, M);
    s.finances.infrastructureCost = cRag + CONST.OBSERVABILITY + (t.useRouteLLM ? CONST.ROUTELLM_FIXED : 0);

    // 3.1/3.8 custo humano não-linear
    s.finances.humanReworkCost = humanReworkCost(M, rm, vcore, this._rHora ?? CONST.R_HORA_BASE);

    // TCO e UI/$
    const tco = s.finances.apiCost + s.finances.infrastructureCost + s.finances.humanReworkCost;
    s.metrics.globalUI = tco > 0 ? (M * rm) / tco : 0;

    // 3.6 K_cog
    s.metrics.cognitiveCapitalIndex = clamp(0, 100,
      rm * 40 + s.operations.slaCompliance * 30 + (1 - t.technicalDebt / 100) * 20 + (s.social.devTeamMoral / 100) * 10
    );

    // Margem operacional aproximada (receita vs TCO).
    const receita = M * rm * CONST.VALUE_PER_TASK;
    s.finances.operatingMargin = receita > 0 ? clamp(-1, 1, (receita - tco) / receita) : -1;

    return { tco, rm, vcore };
  }

  /** Avança um trimestre: aplica decisões, evento opcional, time lags e caixa. */
  stepQuarter(decisions = {}, randomEvent = null) {
    this.applyDecisions(decisions);
    this.state.currentQuarter = Math.min(4, (this.state.currentQuarter || 0) + 1);
    const q = `Q${this.state.currentQuarter}`;
    this.state.currentPhase = q;

    // Processa time lags agendados para este trimestre.
    this._processTimeLags(q);

    const { tco } = this.recompute();

    // Evento aleatório (mutação direta no estado).
    if (randomEvent && typeof randomEvent.apply === 'function') {
      const patch = randomEvent.apply(this.state, randomEvent.mitigated);
      this._merge(patch);
    }

    // 3.5 moral (com V_core)
    const horasExtras = Math.max(0, (this.state.operations.monthlyRequests * (1 - this.state.operations.firstPassAccuracy) * CONST.T_REVISAO) - 80);
    let moral = this.state.social.devTeamMoral
      - 0.15 * this.state.technical.technicalDebt
      - 0.20 * (horasExtras / 100)
      - 0.25 * Math.max(0, this.state.operations.verificationLoad - 50);
    this.state.social.devTeamMoral = clamp(0, 100, moral);

    // Caixa do trimestre.
    const receita = this.state.operations.monthlyRequests * this.state.operations.firstPassAccuracy * CONST.VALUE_PER_TASK;
    const fluxoMensal = receita - tco;
    this.state.finances.cashBalance += fluxoMensal * CONST.MONTHS_PER_QUARTER;

    // Débito técnico evolui.
    if (this.state.operations.firstPassAccuracy < 0.7) this.state.technical.technicalDebt = clamp(0, 100, this.state.technical.technicalDebt + 5);
    else this.state.technical.technicalDebt = clamp(0, 100, this.state.technical.technicalDebt - 3);

    // Agenda time lags conforme gatilhos ao final do trimestre.
    this._scheduleTimeLags(q);
    this._modelChangedThisQuarter = false;

    this.recompute();
    this.history.push(this.getState());
    return this.getState();
  }

  _scheduleTimeLags(q) {
    const s = this.state;
    if (q === 'Q1' && s.technical.technicalDebt > 40) this._timeLagQueue.push({ effect: 'Q3', apply: () => { s.operations.customerChurn = Math.min(1, s.operations.customerChurn + 0.15); } });
    if (q === 'Q2' && s.social.devTeamMoral < 30) this._timeLagQueue.push({ effect: 'Q3', apply: () => { this._rHora = CONST.R_HORA_BASE * 2; } });
    if (q === 'Q2' && s.technical.multiAgent && !s.technical.agentIsolation) this._timeLagQueue.push({ effect: 'Q3', apply: () => { s.finances.cashBalance -= s.finances.apiCost; } });
    if (q === 'Q2' && s.operations.verificationLoad > 75) this._timeLagQueue.push({ effect: 'Q3', apply: () => { s.social.devTeamMoral = clamp(0, 100, s.social.devTeamMoral - 8); } });
  }

  _processTimeLags(q) {
    const due = this._timeLagQueue.filter(l => l.effect === q);
    for (const l of due) l.apply();
    this._timeLagQueue = this._timeLagQueue.filter(l => l.effect !== q);
  }

  applyBoardAnswer(stakeholderId, isCorrect) {
    const trust = this.state.social.stakeholderTrust;
    if (stakeholderId in trust) trust[stakeholderId] = clamp(0, 100, trust[stakeholderId] + (isCorrect ? 15 : -20));
  }

  checkEndConditions(boardConfidence = null) {
    const s = this.state;
    if (s.finances.cashBalance <= 0) return 'FAILURE_CASH';
    if (s.social.devTeamMoral <= 0) return 'FAILURE_MORALE';
    if (boardConfidence != null && boardConfidence < 40) return 'FAILURE_TRUST';
    if (boardConfidence != null && boardConfidence >= 70 && s.finances.cashBalance > 0 && s.operations.slaCompliance >= 0.90) return 'VICTORY';
    return null;
  }

  _merge(patch) {
    if (!patch) return;
    for (const [k, v] of Object.entries(patch)) {
      if (v && typeof v === 'object' && !Array.isArray(v)) this.state[k] = { ...this.state[k], ...v };
      else this.state[k] = v;
    }
  }

  // Debug helper (10 §1.6): custo humano puro para um V_core dado.
  _humanReworkCostWith({ verificationLoad }) {
    return humanReworkCost(this.state.operations.monthlyRequests, this.state.operations.firstPassAccuracy, verificationLoad);
  }
}
