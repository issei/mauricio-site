// Textos e dados da home "O pensamento em prática" (SDD-nova-home §13, revisão 7; §14).
// O gerador (scripts/home/gen-home.mjs) junta isto com o cv.json, o ecosystem.nav.yaml e as imagens.
// Fatos verificados por tests/home.fatos.test.mjs: marcos (cv.json), princípios (/engenharia-agentes-ia),
// etapas do gate (scripts/quality-gate.mjs) e teses (página de cada projeto).

export const ABERTURA = {
  mensagem: ['Da incerteza à especificação.', 'Da especificação à produção.'],
  sub: 'Engenharia de software, arquitetura em produção e agentes de IA.',
  contexto: 'Há mais de vinte anos levo o que foi desenhado até a produção e cuido para que continue rodando.',
};

/** Cena 02: a pergunta, as partes e a síntese. */
export const PERGUNTA = {
  texto: 'Como tirar do time o trabalho manual?',
  partes: [['Quem vai operar?', 'Runbook · Plantão'], ['O que pode falhar?', 'Incidentes · Logs'], ['Como saber se funciona?', 'Aceite · Métricas']],
  sintese: 'Só automatizo o que alguém consegue operar, ver falhar e medir.',
};

/** Cena 03: etapas do `npm run gate` que passaram numa execução neste repositório (nomes de scripts/quality-gate.mjs). */
export const ETAPAS_DO_GATE = ['build', 'espelhos /en/ em dia', 'artefatos gerados em dia', 'coerência global do site', 'orçamento de performance'];

/** Cena 04: estados de um incidente, sem horário nem número. */
export const INCIDENTE = ['Incidente aberto', 'Serviço estabilizado', 'Causa raiz encontrada'];

/** Cena 05: títulos exatos dos dez princípios de src/engenharia-agentes-ia.html. */
export const ESTUDO = {
  titulo: 'Engenharia de Agentes de IA',
  href: '/engenharia-agentes-ia.html',
  principios: ['O LLM é um componente, não o piloto', 'Determinismo é invariante testável', 'Separe o Cérebro da Vitrine', 'Determinístico-primeiro', 'Contratos rígidos em toda fronteira', 'Isole as camadas epistêmicas', 'Abrace o Mundo Aberto', 'Governe o orçamento com ledgers', 'Governança fail-closed', 'Explique, não exponha o número'],
};

/** Narração de cada cena: [dimensões, frase, segunda frase opcional]. */
export const NARRACAO = {
  '02a': ['Escutar · Investigar · Estudar', 'Quase tudo começa com uma pergunta. Antes de responder, desmonto a pergunta e estudo cada parte.'],
  '02b': ['Sintetizar · Aprender', 'Depois fecho as fontes e explico do zero. É aí que separo o que entendi do que só li.'],
  '03': ['Projetar · Construir · Validar', 'Desenho para que outra pessoa consiga operar. Construo em passos pequenos, e o teste diz se está certo.'],
  '04': ['Sustentar · Orquestrar · Evoluir', 'Na crise, o tempo conta. Com o time, primeiro estabilizo; depois investigo a causa raiz.', 'A causa vira a próxima pergunta.'],
  '05': ['Integrar · Ensinar · Compartilhar', 'O que consigo explicar, publico. Ensinar consolida o que aprendi.'],
};

/**
 * Sessão 02: marcos. `fonte` diz de onde vem o fato no cv.json (o teste confere ano e empresa);
 * `texto` é a redação aprovada pelo Issei na revisão 5 (durações arredondadas).
 */
export const HISTORIA = {
  frase: 'Comecei escrevendo código. Com o tempo, passei a responder também por times, contratos e sistemas em produção.',
  marcos: [
    { anos: '1997', texto: 'Curso técnico em processamento de dados', fonte: { formacao: 'Colégio Guarani' } },
    { anos: '2003–2012', texto: '9 anos como Analista de Desenvolvimento na Sysgen', fonte: { empresa: 'Sysgen' } },
    { anos: '2012–2017', texto: '6 anos em Sustentação e Inovação na Indra', fonte: { empresa: 'Indra' } },
    { anos: '2018–hoje', texto: '8 anos em Sustentação e como Tech Lead na Rede', fonte: { empresa: 'Rede' } },
    { anos: '2024–hoje', texto: 'Arquitetura, IA aplicada, engenharia de agentes e ensino', atual: true },
  ],
};

/** Sessão 03. Os recentes também são destinos da família de transição `destinos` (RF-VT-38). */
export const IDEIAS = {
  frase: 'As ferramentas mudaram; as perguntas, não.',
  texto: 'Hoje estudo agentes de IA perguntando o mesmo de sempre: quem vai operar, o que pode falhar, como saber se funciona. Escrevo e gravo o que ainda estou tentando entender.',
  mesa: [
    { img: 'estados', alt: 'Figura 3 de Formulação de problemas: os estados do conhecimento', contem: true },
    { img: 'estudo', alt: 'Título do ensaio: Quando a curiosidade deixa de ser conteúdo e vira investigação' },
    { img: 'videos', alt: 'Título da página de vídeos: Assista, leia e confira as fontes' },
  ],
};

/** Sessão 04: tese de cada projeto (§13.5) e a frase da página de onde ela sai (teste). A ordem segue o YAML. */
export const PROJETOS = {
  texto: 'Da concepção à operação. Projetos que saíram do papel e que alguém usa. Em cada um, conto o problema e as decisões que tomei.',
  cartoes: {
    acessibilidade: { titulo: 'Acessibilidade', tese: 'Uma catraca no gate impede que a dívida de acessibilidade detectável volte a subir.', dims: 'validar · sustentar', origem: 'Catraca no gate', alt: 'Placar da página Acessibilidade: 207 ocorrências na primeira medição e 0 no gate automatizado' },
    'case-agents': { titulo: 'Case Agents', tese: 'Uma barreira de quatro camadas antes da execução, porque a tool errada não é uma aproximação aceitável.', dims: 'investigar · projetar', origem: 'A tool errada não é uma aproximação aceitável', alt: 'Métricas do benchmark do Case Agents: 0 execuções incorretas em 20 queries' },
    'agent-ready': { titulo: 'Agent Ready', tese: 'Descoberta, formatos e contratos publicados para que agentes consigam usar este domínio.', dims: 'construir · ensinar', origem: 'Agent Readiness', alt: 'Placar do IsItAgentReady: 16 checks aprovados e 0 reprovados' },
    'boutique-empresarial-showcase': { titulo: 'Boutique Empresarial', img: 'boutique', tese: 'Site estático, especificação antes do código e um pipeline agêntico com gate determinístico.', dims: 'projetar · orquestrar', origem: 'Quality Gate Determinístico', alt: 'Os 4 pilares da engenharia do projeto Boutique Empresarial' },
  },
  cta: { texto: 'Conheça meus projetos →', href: '/catalogo.html#projetos' },
};

export const CONTATO = { convite: 'Se você tem um problema parecido com algum destes, me escreva.' };

/** Retrato: a foto real (assets-fonte/retrato.jpg, job `retrato` do gen-imagens). */
export const RETRATO = {
  alt01: 'Retrato de Maurício Yokoyama Issei, de óculos e blazer azul, sorrindo',
  alt02: 'Maurício Yokoyama Issei sorrindo, em retrato',
};

/** Diagrama da cena 03. */
export const DIAGRAMA = { img: 'diagrama', alt: 'Diagrama da arquitetura de descoberta em cinco camadas, da página Agent Ready' };
