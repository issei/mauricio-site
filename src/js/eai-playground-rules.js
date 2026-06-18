/*
 * Regras do Playground (T5) — LÓGICA PURA, sem DOM.
 * Mesma arquitetura → mesmo veredito (determinístico). Importável em Node.
 *
 * Decisão (PROGRESS.md D4): NÃO há pontuação numérica. Um número agregado criaria
 * ilusão de precisão e contradiz P10/P7. O retorno é qualitativo + consequências.
 */

/** O que muda ao adicionar/remover cada componente (feedback "última ação"). */
export const COMPONENT_INSIGHTS = {
  LLM: {
    add: 'LLM adicionado. É o único componente não-determinístico. Sem Schema ao lado dele, a saída é input não confiável.',
    remove: 'Sem LLM, o sistema é puramente determinístico — previsível e barato, mas limitado ao que dados estruturados cobrem.',
  },
  Schema: {
    add: 'Contrato ativado. Toda saída do LLM agora passa por validação estrutural. Erros de tipo e campos extras são barrados antes de propagar.',
    remove: 'Sem Schema, a saída do LLM é consumida diretamente — um campo com valor 1.7 onde esperava-se 0-1 não será detectado.',
  },
  API: {
    add: 'API adicionada: uma fonte determinística de evidência. Quanto mais a tarefa se resolve aqui, menos resíduo sobra para o LLM.',
    remove: 'Sem API, o sistema perde uma fonte estruturada — mais trabalho recai sobre a etapa de IA, com mais custo e risco.',
  },
  RAG: {
    add: 'RAG adicionado: o modelo agora consulta uma base de documentos antes de responder. Reduz alucinações factuais — mas sem Schema, ainda pode retornar dados do corpus em formato inválido.',
    remove: 'Sem RAG, o modelo responde com conhecimento paramétrico apenas — mais sujeito a alucinação em domínios específicos.',
  },
  BDD: {
    add: "Cenários BDD ativados. Agora há um critério objetivo de 'pronto'. O agente tem um alvo executável — e falha de forma detectável, não silenciosa.",
    remove: "Sem BDD, 'funcionou' é uma percepção, não uma verificação. Alucinações elegantes passam despercebidas.",
  },
  Ledger: {
    add: 'Ledger ativado. O orçamento de tokens é estado de domínio: o sistema sabe quanto gastou, para quando atinge o teto e retoma na próxima onda.',
    remove: 'Sem Ledger, o sistema pode entrar em loop e gerar fatura inesperada. Um agente sem teto de custo é um risco financeiro, não uma funcionalidade.',
  },
  Cache: {
    add: 'Cache semântico ativo. Entidades já processadas não são reprocessadas. O custo marginal por item cai com o tempo — a economia de escala da engenharia agêntica.',
    remove: 'Sem cache, cada execução começa do zero. Em volume, isso significa pagar múltiplas vezes pelo mesmo processamento.',
  },
  'Human Review': {
    add: 'Revisão humana no loop. Casos de baixa confiança são escalados — reduz risco de decisões automáticas erradas em casos-limite.',
    remove: 'Sem revisão humana, o sistema aprova ou rejeita tudo automaticamente. Para domínios críticos, isso é risco operacional.',
  },
  Observabilidade: {
    add: 'Observabilidade ativa. Cada decisão agora tem rastro — você pode auditar por que o sistema escolheu X, não apenas que ele escolheu.',
    remove: 'Sem observabilidade, o sistema é uma caixa-preta em produção. Quando algo errar, você não saberá onde.',
  },
  Guardrails: {
    add: 'Guardrails ativos. Regras de negócio explícitas barram saídas antes de chegarem ao usuário — camada de defesa complementar ao Schema.',
    remove: 'Sem guardrails, regras de negócio ficam implícitas no prompt — frágeis e invisíveis para testes.',
  },
};

/**
 * Regras de avaliação da arquitetura. Cada regra: { sev, test(has), message }.
 * sev: 'bad' (risco crítico) | 'warn' (lacuna) | 'good' (boa prática confirmada).
 * Superset: regras da spec T5 + regra P8 "LLM sem Ledger" (continuidade com o doc 06).
 */
export const ARCH_RULES = [
  { sev: 'warn', test: (h) => !h('LLM'), message: 'Sem LLM: é um pipeline clássico — confiável, mas sem o resíduo interpretativo.' },
  { sev: 'bad', test: (h) => h('LLM') && !h('Schema'), message: '⚠ LLM sem Schema: a configuração mais comum em protótipos que quebram em produção. A saída do modelo é input não confiável até ser validada.' },
  { sev: 'good', test: (h) => h('Schema'), message: 'Contratos validam as fronteiras: a saída do LLM passa por schema estrito (P5).' },
  { sev: 'warn', test: (h) => h('LLM') && !h('BDD'), message: "⚠ LLM sem BDD: sem critério objetivo de 'pronto', alucinações elegantes passam despercebidas." },
  { sev: 'good', test: (h) => h('BDD'), message: 'BDD dá um alvo executável e governança fail-closed (P9).' },
  { sev: 'bad', test: (h) => h('LLM') && !h('Ledger'), message: 'LLM sem Ledger: sem teto de custo — risco de fatura inesperada e loops não governados (P8).' },
  { sev: 'good', test: (h) => h('Ledger'), message: 'Ledger governa o orçamento de tokens e força parada em ponto seguro (P8).' },
  { sev: 'warn', test: (h) => h('RAG') && !h('Schema'), message: '⚠ RAG sem Schema: o corpus traz dado de mundo aberto. Sanitize e valide antes do Cérebro, ou a alucinação só muda de fonte.' },
  { sev: 'warn', test: (h) => !h('Observabilidade') && h('LLM'), message: 'Sem Observabilidade: difícil auditar e detectar drift quando algo errar.' },
  { sev: 'good', test: (h) => h('Observabilidade'), message: 'Observabilidade aumenta a auditabilidade: cada decisão deixa rastro (P10).' },
  { sev: 'info', test: (h, n) => n >= 5 && !h('Observabilidade'), message: 'ℹ Arquitetura complexa (5+ componentes) sem Observabilidade: quando algo errar em produção, será difícil rastrear onde.' },
  { sev: 'good', test: (h) => h('Cache'), message: 'Cache/Corpus evita pagar duas vezes pelo mesmo trabalho.' },
  { sev: 'good', test: (h) => h('Human Review'), message: 'Revisão humana cobre os casos de baixa confiança.' },
  { sev: 'good', test: (h) => h('LLM') && h('Schema') && h('BDD') && h('Ledger'), message: '✓ Boa base arquitetural: LLM contido, contrato validando saída, testes definindo "pronto" e orçamento governado.' },
];

/**
 * Avalia o conjunto de componentes. Retorna { verdicts: [{sev,message}], label, sev }.
 * Função pura — determinística.
 */
export function evaluate(set) {
  const components = set instanceof Set ? set : new Set(set);
  const has = (c) => components.has(c);
  const n = components.size;

  if (n === 0) {
    return { verdicts: [], label: 'Adicione componentes para avaliar.', sev: 'warn' };
  }

  const verdicts = ARCH_RULES.filter((r) => r.test(has, n)).map((r) => ({ sev: r.sev, message: r.message }));

  const bad = verdicts.filter((v) => v.sev === 'bad').length;
  const warn = verdicts.filter((v) => v.sev === 'warn').length;

  let label, sev;
  if (bad > 0) { label = 'Arquitetura com riscos críticos.'; sev = 'bad'; }
  else if (warn > 1) { label = 'Arquitetura aceitável, com lacunas.'; sev = 'warn'; }
  else { label = 'Excelente governança.'; sev = 'good'; }

  return { verdicts, label, sev };
}

/** Mensagem da última ação (adicionar/remover um componente). */
export function insightFor(component, isAdd) {
  const info = COMPONENT_INSIGHTS[component];
  if (!info) return '';
  return isAdd ? info.add : info.remove;
}
