/*
 * Evidence Board System — Operação Capital Cognitivo (spec doc 04).
 * Catálogo de 11 Evidence Cards + mecânica de desbloqueio/validação. LÓGICA PURA.
 */

export const EVIDENCE_CARDS = [
  { id: 'EVID_01', title: 'TCO Dominado por Revisão Humana', icon: '💸', category: 'TCO', evidenceLevel: 'Level_B', epistemologicalStatus: 'Evidência Parcial',
    claim: 'O custo da API é a ponta do iceberg. O tempo de refatoração e validação humana domina o TCO em operações corporativas de IA.',
    source: 'Peng et al. / Pegatron Case Study — Agentic TCO in Enterprise Software Engineering',
    validityContext: 'Operações corporativas com automação de workflows de software (10.000+ chamadas/mês)',
    limitations: 'Relação varia com nível de automação e maturidade do time; pode não se aplicar a uso exploratório.' },
  { id: 'EVID_02', title: 'Cascata de Custo por Baixa Acurácia', icon: '📉', category: 'Accuracy', evidenceLevel: 'Level_A', epistemologicalStatus: 'Fato Comprovado',
    claim: 'Modelos com baixa First-Pass Accuracy geram cascatas de iterações que multiplicam o TCO exponencialmente.',
    source: 'Erol et al., ICLR 2026 — Cost-of-Pass',
    validityContext: 'Tarefas iterativas de geração de código e automação jurídica em cenários corporativos',
    limitations: 'Pressupõe tentativas independentes; pode subestimar o custo em pipelines com cache semântico.' },
  { id: 'EVID_03', title: 'Useful Intelligence per Dollar (UI/$)', icon: '🧭', category: 'Governance', evidenceLevel: 'Level_C', epistemologicalStatus: 'Convenção Operacional',
    claim: 'UI/$ reflete a transformação real de capital financeiro em trabalho útil aprovado sem refatoração, capturando o que métricas de token não capturam.',
    source: 'Convenção operacional emergente — comunidade FinOps de IA',
    validityContext: 'Framework pragmático para tomada de decisão executiva sobre arquitetura de IA',
    limitations: 'Sem norma ISO/IEEE. Métricas exatas variam por contexto. Usar como bússola direcional.' },
  { id: 'EVID_04', title: 'v(m,p) = C_m(p) / R_m(p) — Prova Matemática', icon: '📐', category: 'TCO', evidenceLevel: 'Level_A', epistemologicalStatus: 'Fato Comprovado',
    claim: 'Quando Rm → 0, o custo efetivo por tarefa concluída tende ao infinito — modelos baratos com baixa acurácia são mais caros por unidade de trabalho útil.',
    source: 'Erol et al., ICLR 2026 / arXiv:2408.03314',
    validityContext: 'Qualquer sistema iterativo onde falhas exigem re-execução',
    limitations: 'Não considera custo de latência nem impactos de UX em sistemas de resposta imediata.' },
  { id: 'EVID_05', title: 'RouteLLM: 35%–85% de Redução no TCO', icon: '🔀', category: 'Routing', evidenceLevel: 'Level_B', epistemologicalStatus: 'Evidência Parcial',
    claim: 'Roteamento semântico com SLMs reduz o TCO entre 35% e 85% redirecionando prompts simples para modelos menores sem perda de qualidade mensurável em prompts simples.',
    source: 'RouteLLM / LiteLLM Research',
    validityContext: 'Sistemas com distribuição mista de complexidade de prompts (60-80% simples)',
    limitations: 'A economia depende criticamente da distribuição real da carga de trabalho.' },
  { id: 'EVID_06', title: '"Overthinking" em Test-Time Compute', icon: '⚠️', category: 'Infrastructure', evidenceLevel: 'Level_A', epistemologicalStatus: 'Dados Conflitantes', isContradictory: true,
    claim: 'Test-Time Compute Scaling melhora a acurácia em tarefas complexas, mas pode reduzir a acurácia em prompts simples por excesso de raciocínio.',
    source: 'arXiv:2604.10739 (2026)',
    validityContext: 'Tarefas de raciocínio; efeito negativo em tarefas triviais de classificação',
    limitations: 'Efeito varia entre arquiteturas de modelo. Não generaliza.' },
  { id: 'EVID_07', title: 'A Virada da Inferência — OpEx Domina o CapEx', icon: '📊', category: 'TCO', evidenceLevel: 'Level_B', epistemologicalStatus: 'Evidência Parcial',
    claim: 'Entre 65% e 90% do TCO corporativo de IA agora ocorre na fase de inferência/execução, não no pré-treinamento.',
    source: 'Erdil / Epoch AI (2025)',
    validityContext: 'Empresas em produção com volume de inferência > 100k chamadas/mês',
    limitations: 'Varia com o nível de automação; P&D ainda concentra custos no fine-tuning.' },
  { id: 'EVID_08', title: 'Carga de Verificação (V_core)', icon: '🧠', category: 'HumanFactors', evidenceLevel: 'Level_A', epistemologicalStatus: 'Fato Comprovado',
    claim: 'A verificação de código gerado por IA produz fadiga cognitiva não-linear: falhas de teste, latência até a 1ª compilação, churn de código, pausas longas e trocas de contexto se agregam num índice que encarece cada hora de revisão.',
    source: 'CHI 2026 Conference — Measuring Verification Load in AI-Assisted Software Engineering',
    validityContext: 'Workflows de engenharia com aceitação humana obrigatória de outputs de IA',
    limitations: 'Os 5 sinais dependem de telemetria de IDE; a agregação em índice é convenção operacional, não norma ISO/IEEE.' },
  { id: 'EVID_09', title: 'Cascata de Erros Agêntica', icon: '🔥', category: 'Infrastructure', evidenceLevel: 'Level_A', epistemologicalStatus: 'Fato Comprovado',
    claim: 'Em pipelines multiagentes, uma alucinação inicial propaga-se topologicamente: o contexto reenviado pode representar até 62% da fatura agêntica.',
    source: 'Jamshidi et al. (arXiv:2606.07937) — From Spark to Fire',
    validityContext: 'Orquestrações com ≥ 2 agentes que compartilham contexto sem isolamento',
    limitations: 'A fração de 62% é o pior caso; isolamento de contexto e checkpoints reduzem a propagação.' },
  { id: 'EVID_10', title: 'Desconto Open-Source vs. Prêmio de Governança', icon: '🔓', category: 'TCO', evidenceLevel: 'Level_A', epistemologicalStatus: 'Fato Comprovado',
    claim: 'Modelos open-source podem ser até 87% mais baratos por unidade de trabalho, mas transferem para a empresa o custo de governança, hospedagem e conformidade.',
    source: 'NBER Working Paper 34608 (2025)',
    validityContext: 'Decisão de sourcing de modelo em empresas com volume de inferência em produção',
    limitations: 'O desconto líquido depende do Prêmio de Risco (R): setores regulados podem anular a economia.' },
  { id: 'EVID_11', title: 'Context Rot & Semantic Caching', icon: '🪟', category: 'Infrastructure', evidenceLevel: 'Level_B', epistemologicalStatus: 'Evidência Parcial',
    claim: 'A acurácia degrada continuamente à medida que o contexto ultrapassa ~50k tokens ("Context Rot"). O cache semântico é alavanca primária de FinOps (50%–90% em tokens repetidos), mas não corrige o rot.',
    source: 'Chroma Research (2025) — Context Rot; docs de prompt caching',
    validityContext: 'Aplicações com prompts longos (>50k tokens) e/ou chamadas repetitivas cacheáveis',
    limitations: 'O ponto de inflexão do rot varia por modelo e tarefa. Cache ataca custo, não acurácia.' },
];

export const LEVEL_COLOR = { Level_A: '#22c55e', Level_B: '#3b82f6', Level_C: '#eab308', Level_D: '#f97316' };
export const CATEGORY_ABBR = { TCO: 'TCO', Accuracy: 'ACC', Infrastructure: 'INF', Routing: 'ROU', Governance: 'GOV', HumanFactors: 'HUM' };

export class EvidenceBoardManager {
  constructor() {
    this.cards = EVIDENCE_CARDS.map((c) => ({ ...c, unlocked: false }));
    this._listeners = [];
  }
  onUnlock(fn) { this._listeners.push(fn); }
  unlock(cardId) {
    const card = this.cards.find((c) => c.id === cardId);
    if (!card || card.unlocked) return false;
    card.unlocked = true;
    this._listeners.forEach((fn) => fn(card));
    return true;
  }
  isUnlocked(cardId) { return !!this.cards.find((c) => c.id === cardId)?.unlocked; }
  getUnlocked() { return this.cards.filter((c) => c.unlocked); }
  getCard(cardId) { return this.cards.find((c) => c.id === cardId); }
  count() { return { unlocked: this.getUnlocked().length, total: this.cards.length }; }
  isValidForQuestion(cardId, requiredCategory) {
    const card = this.getCard(cardId);
    return !!(card && card.unlocked && card.category === requiredCategory);
  }
}
