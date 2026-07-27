/*
 * Camada de orientação amigável — Operação Capital Cognitivo.
 * Objetivo, passo a passo, "por que importa", glossário em linguagem simples e
 * referências com links reais. Torna o simulador acessível a quem não domina o tema.
 */

export const CHAPTER_GUIDE = {
  1: {
    title: 'Capítulo 1 — O Mistério dos R$ 37 mil',
    objective: 'Descobrir para onde foi o dinheiro: a fatura da IA esconde custos muito além da API.',
    steps: [
      'Clique em cada linha da fatura para abrir os detalhes.',
      'Abra a linha "Revisão e Refatoração Humana" (marcada com ?) e investigue.',
      'Quando todas as linhas estiverem abertas, um gráfico revela a composição real do custo.',
      'Clique em "Continuar" para avançar.',
    ],
    why: 'O preço que a IA cobra por uso (a API) costuma ser só ~7% do custo total. O grosso é gente corrigindo o que a IA errou.',
    terms: ['tco', 'api'],
  },
  2: {
    title: 'Capítulo 2 — A Armadilha da IA "Barata"',
    objective: 'Entender por que uma IA barata por uso pode sair caríssima no fim das contas.',
    steps: [
      'Clique em "Executar simulação".',
      'Compare o Model-Lite e o Model-Pro na tabela — repare na coluna V_core.',
      'Escolha o modelo que você recomendaria para a empresa.',
    ],
    why: 'Um modelo que acerta pouco na 1ª tentativa gera retrabalho humano que multiplica o custo — e cansa a equipe.',
    terms: ['rm', 'vcore'],
  },
  3: {
    title: 'Capítulo 3 — Você inventa a métrica',
    objective: 'Montar, com suas próprias mãos, a fórmula que mede a eficiência de uma IA.',
    steps: [
      'Coloque "Trabalho Correto Aprovado" no numerador (arraste, ou clique no bloco e depois na área).',
      'Coloque os três custos (API + Humano + Infra) no denominador.',
      'Dê um nome ao seu indicador e confirme para ver a revelação.',
    ],
    why: 'Você vai deduzir sozinho a métrica UI/$ antes de ver o nome oficial — assim ela faz sentido de verdade.',
    terms: ['uidollar', 'tco'],
  },
  4: {
    title: 'Capítulo 4 — As fórmulas oficiais',
    objective: 'Conhecer as fórmulas acadêmicas por trás da sua intuição.',
    steps: [
      'Leia os três modelos (passe o mouse nos termos para dicas).',
      'Responda o quiz: qual modelo custa menos por tarefa realmente concluída?',
    ],
    why: 'Um modelo mais caro por token pode ser mais barato por tarefa útil — a matemática prova isso.',
    terms: ['uidollar', 'governedui', 'premiorisco'],
  },
  5: {
    title: 'Capítulo 5 — O Laboratório "E Se?"',
    objective: 'Operar a empresa por 4 trimestres mantendo o caixa positivo e a qualidade alta.',
    steps: [
      'Ajuste os controles de arquitetura à esquerda (roteamento, RAG, cache, contexto, multiagente).',
      'Observe o efeito no diagrama de custos ao lado antes de decidir.',
      'Clique em "Avançar trimestre". Um evento de mercado pode surgir — leia e clique em "Entendido".',
      'Acompanhe UI/$ e Caixa no topo. Repita até o Q4 e siga para o Conselho.',
    ],
    why: 'Cada decisão afeta o futuro (efeito retardado). Cache e roteamento cortam custo; contexto grande demais piora a qualidade (Context Rot); vários agentes sem isolamento multiplicam o gasto.',
    terms: ['routellm', 'rag', 'cache', 'contextrot', 'cascata', 'ttc'],
  },
  6: {
    title: 'Capítulo 6 — O Conselho',
    objective: 'Convencer o Conselho defendendo cada decisão com um argumento e uma evidência.',
    steps: [
      'Leia a pergunta do conselheiro.',
      'Escolha o melhor argumento entre as opções.',
      'Clique em "Anexar evidência" e escolha um card do Mural (os válidos ficam destacados).',
      'Clique em "Confirmar". Repita até o fim — a Confiança precisa chegar a 70%.',
    ],
    why: 'Resposta sem evidência não convence ninguém. É aqui que tudo o que você coletou vira argumento.',
    terms: ['uidollar', 'governedui'],
  },
};

export const GLOSSARY = [
  { id: 'uidollar', term: 'UI/$ (Useful Intelligence per Dollar)', def: 'Quanto trabalho útil e aprovado a IA entrega por real gasto. Quanto maior, melhor.' },
  { id: 'tco', term: 'TCO (Custo Total)', def: 'Tudo que a IA custa de verdade: API + infraestrutura + horas humanas de revisão.' },
  { id: 'api', term: 'Custo de API', def: 'O que o provedor cobra por usar o modelo. Costuma ser a menor parte do custo total.' },
  { id: 'rm', term: 'Acurácia de 1ª tentativa (Rm)', def: 'A chance de a IA acertar de primeira, sem precisar refazer o trabalho.' },
  { id: 'vcore', term: 'Carga de Verificação (V_core)', def: 'O quanto sua equipe se cansa verificando e corrigindo a IA. Alto = risco de burnout e custo maior.' },
  { id: 'rag', term: 'RAG', def: 'Dar à IA acesso aos documentos da empresa para ela responder com base neles, não "de cabeça".' },
  { id: 'routellm', term: 'RouteLLM / SLM x LLM', def: 'Modelo pequeno (SLM, barato) vs. grande (LLM, caro). O RouteLLM manda as perguntas fáceis para o modelo pequeno e economiza.' },
  { id: 'cache', term: 'Cache Semântico', def: 'Guardar respostas de perguntas repetidas para não pagar de novo. Corta custo, mas não melhora a qualidade.' },
  { id: 'contextrot', term: 'Context Rot', def: 'Quando o texto enviado à IA fica grande demais (acima de ~50 mil tokens), ela começa a errar mais. A "janela infinita" é um mito.' },
  { id: 'cascata', term: 'Cascata Agêntica', def: 'Vários agentes de IA em sequência: um erro no começo se espalha e multiplica o custo (o "contexto reenviado").' },
  { id: 'ttc', term: 'Test-Time Compute', def: 'Deixar a IA "pensar mais" antes de responder. Ajuda em tarefas difíceis, mas atrapalha nas fáceis (overthinking).' },
  { id: 'governedui', term: 'Governed UI/$', def: 'O UI/$ ajustado ao risco — essencial em setores regulados como jurídico e saúde.' },
  { id: 'premiorisco', term: 'Prêmio de Risco (R)', def: 'Um peso extra no custo quando um erro da IA é perigoso (um contrato errado, um diagnóstico errado).' },
];

export const REFERENCES = [
  { label: 'RouteLLM — roteamento entre modelos (LMSYS)', url: 'https://lmsys.org/blog/2024-07-01-routellm/' },
  { label: 'Prompt / Semantic Caching (Anthropic)', url: 'https://www.anthropic.com/news/prompt-caching' },
  { label: 'Context Rot — degradação em contextos longos (Chroma Research)', url: 'https://research.trychroma.com/context-rot' },
  { label: 'Scaling LLM Test-Time Compute (arXiv:2408.03314)', url: 'https://arxiv.org/abs/2408.03314' },
  { label: 'Economia da inferência de IA (Epoch AI)', url: 'https://epoch.ai/' },
];

const glossaryMap = Object.fromEntries(GLOSSARY.map((g) => [g.id, g]));

export function renderObjectiveBar(chapter) {
  const bar = document.getElementById('objective-bar');
  const g = CHAPTER_GUIDE[chapter];
  if (!bar || !g) return;
  bar.hidden = false;
  bar.innerHTML = `
    <div class="flex items-start gap-3">
      <span class="text-lg shrink-0" aria-hidden="true">🎯</span>
      <div class="flex-1 min-w-0">
        <p class="text-sm text-white"><strong>Seu objetivo:</strong> ${g.objective}</p>
        <button id="objective-how" class="text-xs text-blue-400 underline mt-1">Como fazer? ▾</button>
      </div>
      <button id="objective-help" class="text-xs border border-gray-600 rounded-lg px-3 py-1 shrink-0 hover:text-white">❓ Ajuda</button>
    </div>`;
  document.getElementById('objective-how')?.addEventListener('click', () => openHelp(chapter));
  document.getElementById('objective-help')?.addEventListener('click', () => openHelp(chapter));
}

export function openHelp(chapter) {
  const dlg = document.getElementById('help-dialog');
  const g = CHAPTER_GUIDE[chapter];
  if (!dlg || !g) return;
  const terms = (g.terms || []).map((t) => glossaryMap[t]).filter(Boolean);
  document.getElementById('help-body').innerHTML = `
    <h2 class="text-xl font-bold text-white mb-1">${g.title}</h2>
    <p class="text-sm text-gray-300 mb-4">${g.objective}</p>
    <p class="text-xs uppercase tracking-wider text-blue-400 mb-2">Passo a passo</p>
    <ol class="list-decimal list-inside text-sm text-gray-300 space-y-1 mb-4">${g.steps.map((s) => `<li>${s}</li>`).join('')}</ol>
    <div class="rounded-lg bg-blue-500/5 border border-blue-500/20 p-3 text-sm text-gray-300 mb-4"><strong>Por que isso importa:</strong> ${g.why}</div>
    ${terms.length ? `<p class="text-xs uppercase tracking-wider text-blue-400 mb-2">Termos deste capítulo</p>
      <dl class="text-sm space-y-2 mb-2">${terms.map((t) => `<div><dt class="text-white font-medium">${t.term}</dt><dd class="text-gray-400">${t.def}</dd></div>`).join('')}</dl>` : ''}
    <button id="help-open-glossary" class="text-xs text-blue-400 underline">Ver glossário completo →</button>`;
  if (typeof dlg.showModal === 'function') dlg.showModal();
  document.getElementById('help-open-glossary')?.addEventListener('click', () => { dlg.close(); openGlossary(); });
}

export function openGlossary() {
  const dlg = document.getElementById('glossary-dialog');
  if (!dlg) return;
  document.getElementById('glossary-body').innerHTML = `
    <h2 class="text-xl font-bold text-white mb-3">📖 Glossário — em linguagem simples</h2>
    <dl class="text-sm space-y-3 mb-6">${GLOSSARY.map((g) => `<div><dt class="text-white font-medium">${g.term}</dt><dd class="text-gray-400">${g.def}</dd></div>`).join('')}</dl>
    <h3 class="text-sm uppercase tracking-wider text-blue-400 mb-2">Referências (fontes reais)</h3>
    <ul class="text-sm space-y-1 mb-3">${REFERENCES.map((r) => `<li><a href="${r.url}" target="_blank" rel="noopener noreferrer" class="text-blue-400 underline">${r.label} ↗</a></li>`).join('')}</ul>
    <p class="text-xs text-gray-500">Nota: alguns nomes de conferências e artigos citados no simulador são ilustrativos/pedagógicos. Os coeficientes numéricos são parâmetros de ensino, não medições absolutas.</p>`;
  if (typeof dlg.showModal === 'function') dlg.showModal();
}
