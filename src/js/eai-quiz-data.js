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
      correct: 'Exato. Isso é o princípio do LLM como componente (P1/P2): o fluxo é um pipeline determinístico e o modelo entra só na etapa de classificação. Cada etapa que sai do LLM é uma fonte de alucinação a menos.',
      wrong_a: 'Deixar o agente decidir sozinho a ordem das ferramentas é dar a ele o controle de fluxo — a receita de loops, custo imprevisível e irreprodutibilidade. O LLM responde dentro de etapas; ele não escolhe a próxima.',
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
      correct: 'Exato. Isso é o princípio Open-World (P7): ausência de evidência é incerteza explícita, nunca negação automática. Um sistema honesto sabe dizer "não sei" — e isso é mais valioso do que uma resposta inventada.',
      wrong_a: "Tratar ausência de dado como 'falso' é o erro clássico do Mundo Fechado. O sistema inventou uma conclusão onde não há evidência — exatamente o que a engenharia agêntica previne.",
      wrong_c: 'Gerar um valor médio sem evidência é uma forma de alucinação estruturada: o dado parece real mas foi fabricado. O correto é tornar a ausência visível, não escondê-la.',
    },
  },
  {
    id: 'q3',
    principle: 'P10 — Explique, não exponha o número',
    chapter: '#cap-9',
    principleAnchor: '#principio-10',
    correct: 'b',
    feedback: {
      correct: 'Exato. Isso é XAI (P10): drivers em linguagem natural + a lacuna honesta ("não foi possível confirmar o orçamento") constroem a confiança que gera adoção. O número opaco não convence ninguém a agir.',
      wrong_a: 'Repetir o score e o threshold não explica nada ao gestor — é a "caixa-preta" que trava a adoção. A confiança vem da clareza da justificativa, não da precisão do número.',
    },
  },
  {
    id: 'q4',
    principle: 'P8 · P9 — Ledgers e governança fail-closed',
    chapter: '#cap-7',
    principleAnchor: '#principio-8',
    correct: 'c',
    feedback: {
      correct: 'Exato. Isso une FinOps (P8) e fail-closed (P9): atingiu o teto do ledger → para num ponto seguro, salva o progresso e retoma na próxima onda. O volume vira função do tempo, sem fatura-surpresa e sem trabalho perdido.',
      wrong_a: 'Continuar além do teto é ignorar o ledger — exatamente a fatura-surpresa que o FinOps de IA existe para evitar. O orçamento é estado de domínio, não uma sugestão.',
      wrong_b: 'Parar sem salvar o estado desperdiça todo o progresso e força recomeçar do zero. Fail-closed não é "abortar e perder" — é parar num ponto seguro e retomável.',
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
