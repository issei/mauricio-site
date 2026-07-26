/*
 * Stateful Board Engine — Operação Capital Cognitivo (spec doc 05).
 * Conselheiros, banco de perguntas adaptativo e avaliação de respostas. LÓGICA PURA.
 * Todo objeto de pergunta carrega `stakeholderId` (contrato de dados, doc 05).
 */

export const STAKEHOLDERS = {
  helena: { id: 'helena', name: 'Helena Vance', role: 'CFO', color: '#f59e0b', avatarBorder: '#f59e0b' },
  aris:   { id: 'aris',   name: 'Dr. Aris Thorne', role: 'CTO', color: '#3b82f6', avatarBorder: '#3b82f6' },
  sarah:  { id: 'sarah',  name: 'Sarah Chen', role: 'VP de Operações', color: '#a78bfa', avatarBorder: '#a78bfa' },
  marcus: { id: 'marcus', name: 'Marcus Brody', role: 'CRO', color: '#ef4444', avatarBorder: '#ef4444' },
  clara:  { id: 'clara',  name: 'Clara Mendez', role: 'Head de CX', color: '#34d399', avatarBorder: '#34d399' },
};

export const QUESTION_BANK = [
  // ---- Helena (CFO) — TCO ----
  { id: 'H_TCO_01', stakeholderId: 'helena', tone: 'hostile', requiredCategory: 'TCO',
    condition: (s) => s.finances.operatingMargin < 0.15,
    speechText: 'Nossa margem operacional desabou. Por que devo continuar investindo em modelos de alto custo nominal se os resultados financeiros não justificam?',
    validEvidenceIds: ['EVID_01', 'EVID_04', 'EVID_07'],
    options: [
      { id: 'H_TCO_01_A', text: 'O modelo mais caro tem maior First-Pass Accuracy, eliminando o custo de refatoração humana — a maior fatia do TCO.', isCorrectReasoning: true },
      { id: 'H_TCO_01_B', text: 'Podemos cortar para o modelo mais barato e absorver o retrabalho adicional.', isCorrectReasoning: false },
      { id: 'H_TCO_01_C', text: 'O problema é o volume de chamadas — precisamos limitar a demanda.', isCorrectReasoning: false },
    ] },
  { id: 'H_TCO_02', stakeholderId: 'helena', tone: 'supportive', requiredCategory: 'TCO',
    condition: (s) => s.finances.operatingMargin >= 0.20,
    speechText: 'Os custos estão controlados e a margem está saudável. Qual é o plano para expandir o UI/$ no próximo ano sem comprometer a estabilidade financeira?',
    validEvidenceIds: ['EVID_03', 'EVID_05', 'EVID_10'],
    options: [
      { id: 'H_TCO_02_A', text: 'Aumentar o slmRatio do RouteLLM à medida que modelos menores amadurecem, mantendo o UI/$ acima do patamar atual.', isCorrectReasoning: true },
      { id: 'H_TCO_02_B', text: 'Dobrar o orçamento de API para processar mais volume.', isCorrectReasoning: false },
    ] },
  // ---- Aris (CTO) — Accuracy/Infrastructure ----
  { id: 'A_INF_01', stakeholderId: 'aris', tone: 'skeptical', requiredCategory: 'Infrastructure',
    condition: (s) => !s.technical.useRouteLLM && s.technical.ragDepth < 3,
    speechText: 'Você não usou roteamento nem RAG profundo. Como justifica a arquitetura escolhida diante dos benchmarks?',
    validEvidenceIds: ['EVID_05', 'EVID_06', 'EVID_09', 'EVID_11'],
    options: [
      { id: 'A_INF_01_A', text: 'A stack atual é um ponto de partida; a evolução prioriza RouteLLM e RAG com reranking condicional para elevar Rm sem inflar latência.', isCorrectReasoning: true },
      { id: 'A_INF_01_B', text: 'Benchmarks não importam; o que vale é o preço de tabela do token.', isCorrectReasoning: false },
    ] },
  { id: 'A_INF_02', stakeholderId: 'aris', tone: 'supportive', requiredCategory: 'Infrastructure',
    condition: (s) => s.technical.useRouteLLM || s.technical.ragDepth >= 3,
    speechText: 'O RouteLLM foi uma escolha inteligente. Qual a estratégia de evolução da arquitetura?',
    validEvidenceIds: ['EVID_05', 'EVID_11'],
    options: [
      { id: 'A_INF_02_A', text: 'Escalar o slmRatio e adicionar cache semântico, monitorando Context Rot para manter a acurácia em prompts longos.', isCorrectReasoning: true },
      { id: 'A_INF_02_B', text: 'Ligar Test-Time Compute no máximo em todas as tarefas.', isCorrectReasoning: false },
    ] },
  // ---- Sarah (VP Ops) — Accuracy/HumanFactors ----
  { id: 'S_ACC_01', stakeholderId: 'sarah', tone: 'frustrated', requiredCategory: 'Accuracy',
    condition: (s) => s.social.devTeamMoral < 40,
    speechText: 'Minha equipe está à beira do burnout corrigindo respostas incorretas da IA. O que você implementará para acabar com esse retrabalho?',
    validEvidenceIds: ['EVID_02', 'EVID_05'],
    options: [
      { id: 'S_ACC_01_A', text: 'RouteLLM com validação RAG de profundidade 4, garantindo First-Pass Accuracy acima de 92% antes de qualquer entrega ao time.', isCorrectReasoning: true },
      { id: 'S_ACC_01_B', text: 'Contratar mais revisores humanos para absorver o volume.', isCorrectReasoning: false },
    ] },
  { id: 'S_HF_01', stakeholderId: 'sarah', tone: 'frustrated', requiredCategory: 'HumanFactors',
    condition: (s) => s.operations.verificationLoad > 70,
    speechText: 'A Carga de Verificação da equipe está no vermelho. O modelo escolhido é overconfident — parece certo e falha em silêncio. Como você reduz o V_core, não só o custo de token?',
    validEvidenceIds: ['EVID_08', 'EVID_02'],
    options: [
      { id: 'S_HF_01_A', text: 'Trocar por um modelo calibrado e adicionar validação por schema/testes antes da revisão humana, atacando os 5 sinais do V_core na fonte.', isCorrectReasoning: true },
      { id: 'S_HF_01_B', text: 'Manter o modelo barato e pagar hora extra para a equipe aguentar o ritmo.', isCorrectReasoning: false },
      { id: 'S_HF_01_C', text: 'Reduzir a exigência de revisão humana e confiar mais nos outputs.', isCorrectReasoning: false },
    ] },
  // ---- Marcus (CRO) — Governance ----
  { id: 'M_GOV_01', stakeholderId: 'marcus', tone: 'alarmed', requiredCategory: 'Governance',
    condition: (s) => s.technical.hallucinationRate >= 0.10,
    speechText: 'Tivemos outputs incorretos em contratos jurídicos. Qual a sua estratégia de governança para garantir que isso não se repita?',
    validEvidenceIds: ['EVID_03', 'EVID_04'],
    options: [
      { id: 'M_GOV_01_A', text: 'RAG com profundidade 4+ sobre a base jurídica interna, combinado com validação por schema rígido antes de qualquer output chegar ao cliente.', isCorrectReasoning: true },
      { id: 'M_GOV_01_B', text: 'Adicionar um disclaimer nos contratos gerados por IA.', isCorrectReasoning: false },
    ] },
  { id: 'M_GOV_02', stakeholderId: 'marcus', tone: 'skeptical', requiredCategory: 'Governance',
    condition: (s) => s.finances.operatingMargin >= 0.15 && s.technical.hallucinationRate < 0.10,
    speechText: 'Um modelo open-source até 87% mais barato é tentador, mas somos regulados por LGPD/GDPR. Qual o Prêmio de Risco e como o Governed UI/$ justifica — ou desaconselha — usá-lo em contratos?',
    validEvidenceIds: ['EVID_10', 'EVID_03'],
    options: [
      { id: 'M_GOV_02_A', text: 'O desconto só se realiza após incorporar o Prêmio de Risco: mantemos o modelo governado para outputs jurídicos e reservamos o open-source para tarefas internas de baixo risco.', isCorrectReasoning: true },
      { id: 'M_GOV_02_B', text: 'Migrar tudo para o open-source imediatamente — 87% de economia é irrecusável.', isCorrectReasoning: false },
      { id: 'M_GOV_02_C', text: 'Ignorar o open-source; risco regulatório significa nunca considerar alternativas.', isCorrectReasoning: false },
    ] },
  // ---- Clara (CX) — Accuracy/Routing ----
  { id: 'C_ACC_01', stakeholderId: 'clara', tone: 'unsatisfied', requiredCategory: 'Accuracy',
    condition: (s) => s.operations.slaCompliance < 0.85,
    speechText: 'Nosso NPS caiu por respostas incorretas da IA. Como você recupera o SLA de qualidade?',
    validEvidenceIds: ['EVID_02', 'EVID_05'],
    options: [
      { id: 'C_ACC_01_A', text: 'Elevar a First-Pass Accuracy com RAG e reranking, o que reduz churn e recompõe o SLA acima de 95%.', isCorrectReasoning: true },
      { id: 'C_ACC_01_B', text: 'Baixar a meta de SLA para o patamar atual.', isCorrectReasoning: false },
    ] },
  { id: 'C_ACC_02', stakeholderId: 'clara', tone: 'supportive', requiredCategory: 'Routing',
    condition: (s) => s.operations.slaCompliance >= 0.95,
    speechText: 'O SLA está sólido. Como escalamos para novos mercados sem perder qualidade?',
    validEvidenceIds: ['EVID_05', 'EVID_07'],
    options: [
      { id: 'C_ACC_02_A', text: 'RouteLLM absorve o pico de volume com SLMs, preservando a acurácia nas rotas críticas.', isCorrectReasoning: true },
      { id: 'C_ACC_02_B', text: 'Aumentar o volume sem mudar a arquitetura.', isCorrectReasoning: false },
    ] },
];

const TONE_PRIORITY = { hostile: 0, alarmed: 1, skeptical: 2, frustrated: 3, unsatisfied: 4, supportive: 5 };

export class StatefulBoardEngine {
  constructor(state, evidenceBoard) {
    this.state = state;
    this.board = evidenceBoard;
  }
  setState(state) { this.state = state; }

  generateQuestions() {
    const applicable = QUESTION_BANK
      .filter((q) => q.condition(this.state))
      .sort((a, b) => (TONE_PRIORITY[a.tone] ?? 99) - (TONE_PRIORITY[b.tone] ?? 99));

    const selected = [];
    const used = new Set();
    for (const q of applicable) {
      if (selected.length >= 5) break;
      if (!used.has(q.stakeholderId) || selected.length < 3) { selected.push(q); used.add(q.stakeholderId); }
    }
    return selected.length >= 3 ? selected : applicable.slice(0, 3);
  }

  findQuestion(id) { return QUESTION_BANK.find((q) => q.id === id); }

  evaluateAnswer(questionId, selectedOptionId, attachedEvidenceIds = []) {
    const question = this.findQuestion(questionId);
    if (!question) return { correct: false, evidenceValid: false, confidenceChange: -20 };
    const option = question.options.find((o) => o.id === selectedOptionId);
    const evidenceValid = attachedEvidenceIds.some((id) =>
      question.validEvidenceIds.includes(id) && this.board.isValidForQuestion(id, question.requiredCategory));
    const correct = !!(option?.isCorrectReasoning && evidenceValid);
    return { correct, evidenceValid, confidenceChange: correct ? 15 : -20, stakeholderId: question.stakeholderId };
  }

  aggregateConfidence(trust) {
    return Math.round(trust.helena * 0.30 + trust.aris * 0.20 + trust.sarah * 0.20 + trust.marcus * 0.20 + trust.clara * 0.10);
  }
}
