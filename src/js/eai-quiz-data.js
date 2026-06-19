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
  {
    id: 'q5',
    principle: 'Pilar 3 — MCP como fronteira de menor privilégio',
    chapter: '#pilar-3',
    principleAnchor: '#pilar-3',
    correct: 'b',
    feedback: {
      correct: 'Exato — Pilar 3. Com o MCP, o conjunto de ações do agente é exatamente o que o servidor expõe: acesso enumerado, não ambiente. A fronteira é o ponto natural de autorização, escopo de permissão e auditoria — por isso o MCP é uma fronteira de segurança.',
      wrong_a: 'Credenciais amplas no banco de produção dão ao agente acesso ambiente — qualquer alucinação vira ação irreversível. O menor privilégio exige expor só o necessário atrás de uma fronteira contratual.',
      wrong_c: 'Validar SQL livre depois da execução é tarde demais: o efeito colateral já aconteceu. A fronteira (MCP) precisa enumerar as ações permitidas antes, não auditar estragos depois.',
    },
  },
  {
    id: 'q6',
    principle: 'Pilar 4 — Maturidade: Sistemas Intencionais',
    chapter: '#maturidade',
    principleAnchor: '#maturidade',
    correct: 'b',
    feedback: {
      correct: 'Isso é o Estágio 1 — Restringido. Há validação de saída e contratos de schema (saídas inválidas são rejeitadas), mas o modelo ainda decide o fluxo. Só vira Orquestrado (Estágio 2) quando a topologia é um DAG fixo e auditável.',
      wrong_a: 'No Estágio 0 não há nenhuma validação de saída — a garantia mora só no prompt. Aqui já existe schema estrito barrando saídas inválidas, então o sistema avançou.',
      wrong_c: 'Governado (Estágio 3) exige DAG fixo, ledgers, autorização nas fronteiras e reversão fim a fim. Como o LLM ainda decide a ordem das etapas, o fluxo nem é determinístico ainda.',
    },
  },
  {
    id: 'q7',
    principle: 'Pilar 5 — Quando NÃO usar engenharia pesada',
    chapter: '#pilar-5',
    principleAnchor: '#pilar-5',
    correct: 'b',
    feedback: {
      correct: 'Pilar 5 — trade-offs. Num protótipo descartável não há longevidade, escala ou criticidade para amortizar o custo do rigor. Cada hora em contratos é subtraída da única métrica que importa: descobrir rápido se a ideia tem valor. A leveza aqui é uma escolha intencional.',
      wrong_a: 'Montar DAG, contratos e ADRs num protótipo de fim de semana é sobre-engenharia: o custo de setup nunca se amortiza num artefato que será descartado. O rigor aqui não reduz risco — só atrasa o aprendizado.',
      wrong_c: 'Escrever toda a especificação antes também é cerimônia pesada demais para uma hipótese que pode ser descartada na segunda-feira. O objetivo é velocidade de descoberta, não completude.',
    },
  },
  {
    id: 'q8',
    principle: 'Pilar 5 — Regra de transição',
    chapter: '#pilar-5',
    principleAnchor: '#pilar-5',
    correct: 'b',
    feedback: {
      correct: 'Exato — a regra de transição. O artefato atravessou a fronteira: alguém já depende dele como produção. A promoção obriga o upgrade de garantias — consultas versionadas, contrato de schema e teste de regressão. A leveza só era legítima enquanto o artefato permanecia no polo de exploração.',
      wrong_a: '"Funcionou na exploração" é exatamente o vazamento de modo: o artefato virou dependência de produção sem nunca atravessar a fronteira de rigor. A pergunta certa não é "é exploração ou produção?", mas "alguém já depende disto como produção?".',
      wrong_c: 'Dar mais autonomia ao agente aumenta o risco justo quando o relatório virou crítico. A promoção pede mais garantias determinísticas (contratos, testes), não mais liberdade do modelo.',
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

/** Mensagem do score final, em quatro faixas relativas ao total (gabarito, quase, parcial, zero). */
export function scoreMessage(score, total = QUIZ.length) {
  if (score >= total) return 'Excelente — princípios e pilares ficaram claros. Você sabe enquadrar IA como engenharia, não como mágica.';
  if (score >= total - 1) return `Quase lá: ${score} de ${total}. Reveja o que escapou — o detalhe que falta é o que separa protótipo de produção.`;
  if (score >= 1) return 'Bom começo. Volte às seções correspondentes às questões erradas — cada feedback aponta o princípio ou pilar exato.';
  return 'Sem acertos ainda. Não tem problema: leia o feedback de cada opção, ele explica o raciocínio correto. A trilha guiada e os pilares cobrem tudo isso.';
}
