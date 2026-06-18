/*
 * Dados e feedback do Quiz (T2) — LÓGICA PURA, sem DOM.
 * Cada questão é um mini-cenário situacional; cada opção tem feedback que ENSINA.
 * Espelhado em tests/fixtures/quiz-questions.json. Fonte da verdade: este módulo.
 */

export const QUIZ = [
  {
    id: 'q1',
    principle: 'P1 · P2 — O LLM é um componente, não o piloto',
    chapter: '#cap-2',
    principleAnchor: '#principio-1',
    correct: 'b',
    feedback: {
      correct: 'Exato — P1 e P2. O LLM é um componente dentro de etapas fixas, nunca o orquestrador. A ordem das etapas é código, não decisão do modelo. Isso garante reprodutibilidade e torna cada etapa testável isoladamente.',
      wrong_a: 'Com o agente controlando o fluxo, qualquer variação no modelo gera uma sequência diferente de etapas — o sistema se torna irreprodutível e impossível de testar. O fluxo de controle deve ser determinístico.',
      wrong_c: 'Um LLM orquestrando outros modelos multiplica a superfície de erro: a alucinação de um vira entrada do outro e se "confirma". O fluxo de controle deve ser código determinístico, não um modelo.',
    },
  },
  {
    id: 'q2',
    principle: 'P7 — Abrace o Mundo Aberto',
    chapter: '#cap-6',
    principleAnchor: '#principio-7',
    correct: 'b',
    feedback: {
      correct: 'Isso é P7 — Open-World. Ausência de evidência é incerteza explícita, nunca negação. Em saúde (e em qualquer domínio crítico), um sistema que inventa dados onde não há evidência é mais perigoso do que um que diz "não sei".',
      wrong_a: "Tratar ausência como 'sem risco' é o erro do Mundo Fechado: o sistema assumiu uma conclusão onde não há evidência. Em domínios críticos como saúde, este erro pode ter consequências graves.",
      wrong_c: 'Gerar um valor médio sem evidência é alucinação estruturada: o dado parece real mas foi fabricado. O correto é tornar a ausência visível — não escondê-la com um número inventado.',
    },
  },
  {
    id: 'q3',
    principle: 'P10 — Explique, não exponha o número',
    chapter: '#cap-9',
    principleAnchor: '#principio-10',
    correct: 'b',
    feedback: {
      correct: 'P10 — XAI. O número 0.847 não ajuda o revisor a decidir. A explicação em linguagem natural — com os drivers positivos, as lacunas e a proveniência — é o que constrói confiança e permite revisão informada.',
      wrong_a: 'O número sozinho não informa nada acionável. O revisor ainda precisa decidir o que fazer — e agora sem entender o porquê. Isso é o que P10 chama de "expor o número" em vez de "explicar".',
    },
  },
  {
    id: 'q4',
    principle: 'P8 · P9 — Ledgers e governança fail-closed',
    chapter: '#cap-7',
    principleAnchor: '#principio-8',
    correct: 'c',
    feedback: {
      correct: 'P8 + P9 — FinOps e fail-closed. O ledger sabe exatamente onde parou. Retomar do ponto correto é o que diferencia um sistema que falha graciosamente de um que entra em loop gerando fatura inesperada. "Falhar e parar" é uma feature, não uma limitação.',
      wrong_a: 'Continuar além do teto é exatamente o comportamento que o ledger previne. Um agente sem limite de custo é um risco financeiro — a fatura pode crescer indefinidamente em caso de loop.',
      wrong_b: 'Parar sem salvar estado significa perder todo o progresso — e reprocessar do início amanhã paga duas vezes pelo mesmo trabalho. O ledger existe justamente para garantir que o ponto de parada seja recuperável.',
    },
  },
];

const LETTERS = ['a', 'b', 'c', 'd'];

/** Letra (a/b/c) a partir do índice da opção. */
export function letterOf(index) {
  return LETTERS[index];
}

/**
 * Feedback para a questão `id` e a opção escolhida (índice 0-based).
 * Retorna { correct: bool, text, principle, chapter, principleAnchor }.
 */
export function feedbackFor(id, optionIndex) {
  const q = QUIZ.find((x) => x.id === id);
  if (!q) return null;
  const letter = letterOf(optionIndex);
  const correct = letter === q.correct;
  const text = correct ? q.feedback.correct : (q.feedback[`wrong_${letter}`] || 'Reveja o princípio correspondente.');
  return { correct, text, principle: q.principle, chapter: q.chapter, principleAnchor: q.principleAnchor };
}

/** Mensagem do score final, diferente por faixa (0, 1-2, 3, 4 de 4). */
export function scoreMessage(score, total = QUIZ.length) {
  if (score >= total) return 'Excelente — os quatro princípios ficaram claros. Você sabe enquadrar IA como engenharia, não como mágica.';
  if (score === 3) return 'Quase lá: três de quatro. Reveja o capítulo do que escapou — o detalhe que falta é o que separa protótipo de produção.';
  if (score >= 1) return 'Bom começo. Volte aos capítulos correspondentes às questões erradas — cada feedback aponta o princípio exato.';
  return 'Sem acertos ainda. Não tem problema: leia o feedback de cada opção, ele explica o raciocínio correto. A trilha guiada cobre tudo isso.';
}
