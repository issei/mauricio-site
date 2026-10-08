// Fonte única da CAMADA EDITORIAL — ver docs/specs/editorial/EDITORIAL-LAYER.md.
//
// Uma entrada por página que se beneficia de orientação. Página ausente daqui
// não recebe nada: a camada não é uniformização (EDITORIAL-LAYER §2).
//
// O texto aqui NÃO é novo conteúdo. `oneLiner`, `thesis` e `audience` são
// frases extraídas ou condensadas do que a própria página já diz (hero, "Em
// síntese", seções); `source` registra de onde veio cada uma, para que a revisão
// confira a procedência em vez de confiar. Uma tese que a página não sustenta
// não entra — fica registrada como lacuna em EDITORIAL-AUDIT.md.
//
// Tempos de leitura NUNCA são digitados: scripts/gen-editorial.mjs os calcula
// do texto visível de src/<slug>.html (mesma régua de 200 ppm do Hub).
//
// Campos:
//   placement  'inline'  → o bloco entra dentro de um contêiner que já tem
//                          margem lateral (hero, <main> com padding);
//              'section' → o bloco é irmão das <section> e traz a própria.
//   kind       formato do conteúdo (EDITORIAL-LAYER §4.1 — taxonomia fechada).
//   depth      profundidade (EDITORIAL-LAYER §4.2 — taxonomia fechada).
//   oneLiner   "Em uma frase" — 1–2 frases. Omitir quando o hero já diz isso.
//   thesis     "A tese" — 1–3 frases. Omitir quando o h1/hero já é a tese.
//   audience   "Para quem é" — só quando a página tem leitores distintos.
//   core       ids das seções que formam a ideia central (base do tempo curto).
//   routes     ≤ 5 rotas { mode, links: [[href, rótulo]], note }.
//   summary    true → atalho para o "Em síntese" (#em-sintese) da página.
//   next       ≤ 3 continuações { href, title, why } — só com relação real.
//
// Entrada sem `kind` é só continuação: a página já orienta bem na entrada e
// só falta a saída (EDITORIAL-AUDIT §8, ex.: know). Não leva EDITORIAL:START.

/** Formatos aceitos. Uma taxonomia pequena é preferível a uma sofisticada. */
export const KINDS = [
  'Artigo', 'Ensaio', 'Ensaio com autodiagnóstico', 'Estudo técnico', 'Case técnico',
  'Guia prático', 'Tutorial', 'Documentação de projeto', 'Revisão científica',
  'Apresentação', 'Proposta técnica', 'Simulador', 'Material interativo', 'Narrativa pessoal',
  'Referência',
];

/** Profundidades aceitas. */
export const DEPTHS = ['Leitura rápida', 'Leitura aprofundada', 'Guia prático', 'Referência técnica'];

/** Modos de rota — o modelo ENTENDER → APLICAR → APROFUNDAR → VERIFICAR → CONSULTAR. */
export const MODES = ['Entender', 'Aplicar', 'Aprofundar', 'Verificar', 'Consultar'];

export const EDITORIAL = {
  // ── Piloto 1 · conceitual ────────────────────────────────────────────────
  artifice: {
    placement: 'inline',
    kind: 'Ensaio com autodiagnóstico',
    depth: 'Leitura aprofundada',
    oneLiner:
      'O trabalho que evita a crise não gera evidência; o que apaga o incêndio, sim. Quanto mais profunda a maestria técnica, menos visível ela fica para o sistema de avaliação, e isso é um descompasso estrutural, não uma falha pessoal.',
    source: { oneLiner: 'scripts/seo/pages.mjs › artifice.tldr.lede + parágrafo final do hero' },
    core: ['hero', 'paradoxos'],
    routes: [
      { mode: 'Entender', links: [['#video', 'A tese em vídeo'], ['#paradoxos', 'Os cinco padrões estruturais']],
        note: 'do taylorismo digital à ironia da automação por IA.' },
      { mode: 'Aplicar', links: [['#antidoto', 'Casos e métricas de impacto'], ['#diagnostico', 'Autodiagnóstico']],
        note: 'como 37signals e GitLab reorganizaram a governança, e quatro perguntas para medir a sua situação.' },
      { mode: 'Consultar', links: [['#acervo', 'Literatura de referência']],
        note: 'o lastro bibliográfico de cada conceito citado.' },
    ],
    summary: true,
    next: [
      { href: './know.html', title: 'Navegando na Complexidade',
        why: 'A mesma armadilha vista pela organização: copiar a forma de quem tem sucesso sem replicar a função.' },
      { href: './case-agents.html', title: 'Case Agents',
        why: 'Um exemplo do trabalho de engenharia que fica por trás de um 100%, tornado visível com testes e limitações declaradas.' },
    ],
  },

  // ── Piloto 2 · técnico ───────────────────────────────────────────────────
  'case-agents': {
    placement: 'section',
    kind: 'Case técnico',
    depth: 'Leitura aprofundada',
    oneLiner:
      'Um roteador para agente bancário que escolhe 2 ferramentas entre 285 e bloqueia a execução quando a decisão não é confiável o bastante. A capacidade é escolher a ferramenta certa; a confiança é saber quando não executar nenhuma.',
    source: { oneLiner: 'scripts/seo/pages.mjs › case-agents.tldr.lede + rodapé do placar do hero' },
    core: ['problema', 'crash-silencioso', 'barreira'],
    routes: [
      { mode: 'Entender', links: [['#problema', 'O problema'], ['#crash-silencioso', 'O Crash Silencioso'], ['#barreira', 'A barreira de quatro camadas']],
        note: 'o que foi pedido, a falha que 54 testes não pegaram e a solução que zerou as execuções incorretas.' },
      { mode: 'Verificar', links: [['#evidencia', 'A suíte de 72 testes'], ['#limitacoes', 'Limitações reais']],
        note: 'o que os números provam e o que o benchmark não cobre.' },
      { mode: 'Aplicar', links: [['#governanca-catalogo', 'Governança do catálogo'], ['#metodo', 'O método agêntico']],
        note: 'por que o problema era o catálogo, não a vetorização, e como o projeto foi desenvolvido.' },
      { mode: 'Aprofundar', links: [['#tecnicas-estatisticas', 'As técnicas estatísticas em Python'], ['#arquitetura-produtiva', 'A arquitetura produtiva']],
        note: 'o código de cada guarda e a evolução da prova de conceito para Rust e Go.' },
    ],
    summary: true,
  },

  // ── Piloto 3 · longo / documental ────────────────────────────────────────
  socialselling: {
    placement: 'inline',
    kind: 'Documentação de projeto',
    depth: 'Referência técnica',
    audience:
      'Quem quer entender o produto e quem quer reproduzir o método de desenvolvimento.',
    source: { audience: 'hero de src/socialselling.html ("overview do projeto e, ao mesmo tempo, um modelo das boas práticas")' },
    core: ['visao', 'arquitetura', 'camadas'],
    routes: [
      { mode: 'Entender', links: [['#visao', '1 · Visão e escopo'], ['#arquitetura', '2 · Arquitetura do PoC'], ['#camadas', '3 · Regras invioláveis']],
        note: 'o que o sistema faz, como roda num único processo local e as quatro invariantes de que a correção depende.' },
      { mode: 'Aplicar', links: [['#decisoes', '4 · ADRs'], ['#specs', '5 · SDDs'], ['#praticas', '6 · Boas práticas'], ['#aprendizagem', '8 · Auto-aprendizagem']],
        note: 'decisões versionadas, especificação antes do código e lições que retroalimentam o projeto.' },
      { mode: 'Aprofundar', links: [['#volume', '7 · Estratégia de volume'], ['#operacao', '10 · Planejamento e operação']],
        note: 'a Teoria das Restrições aplicada ao funil e a separação entre autoria de spec e execução autônoma.' },
      { mode: 'Consultar', links: [['#versoes', '9 · Versões'], ['#contratos', '11 · Contratos'], ['#codigo', '12 · Código'], ['#testes', '13 · Testes'], ['#configuracao', '14 · Configuração']],
        note: 'a referência técnica: modelos de dados, estrutura, suíte e runtime.toml.' },
    ],
    summary: true,
    next: [
      { href: './engenharia-agentes-ia.html', title: 'Engenharia de Agentes de IA',
        why: 'O princípio que o SocialSelling aplica: pipeline determinístico, com pouca IA no caminho crítico.' },
      { href: './boutique-empresarial-showcase.html', title: 'Boutique Empresarial',
        why: 'Outro projeto real documentado do mesmo jeito: arquitetura, SDD e pipeline agêntico.' },
    ],
  },

  // ── Fase 5 · prioridade alta ─────────────────────────────────────────────
  'knowledge-os-presentation': {
    placement: 'section',
    kind: 'Apresentação',
    depth: 'Leitura aprofundada',
    oneLiner:
      'O Knowledge OS trata o conhecimento corporativo como infraestrutura cognitiva governada, não como repositório passivo de documentos: uma plataforma que o transforma em ativo executável, com limites, rastreabilidade e custos sob controle.',
    source: { oneLiner: 'scripts/seo/pages.mjs › knowledge-os-presentation.tldr.lede + parágrafo do hero' },
    core: ['problema', 'executivo', 'comparativo'],
    routes: [
      { mode: 'Entender', links: [['#problema', 'O problema'], ['#executivo', 'Por que importa para o board'], ['#comparativo', 'Documentação tradicional × Knowledge OS']],
        note: 'os três problemas que corroem o valor do conhecimento, os outcomes mensuráveis e a comparação em nove dimensões.' },
      { mode: 'Aplicar', links: [['#operacional', 'Quatro jornadas de uso'], ['#adocao', 'Incentivo para documentar'], ['#governanca', 'Governança federada'], ['#roadmap', 'Adoção em 4 fases']],
        note: 'fluxos com handoffs humano ↔ agente e fases com critério objetivo de saída.' },
      { mode: 'Aprofundar', links: [['#arquitetura', 'Sete camadas'], ['#tipologia', 'Conhecimento tipado'], ['#cognitiva', 'Quatro memórias']],
        note: 'a plataforma por dentro: camadas com contrato próprio, seis tipos canônicos e memória separada por função.' },
      { mode: 'Verificar', links: [['#diagnostico', '10 dimensões da revisão crítica'], ['#seguranca', 'Limites da IA'], ['#observabilidade', '22 KPIs cognitivos']],
        note: 'cada gap da proposta original com sua contramedida, os Circuit Breakers e como medir.' },
    ],
    summary: true,
  },

  devin: {
    // Classe B do audit: as rotas reconstroem o arco do argumento sem
    // reescrever os títulos retóricos das seções, que são do autor.
    placement: 'section',
    kind: 'Apresentação',
    depth: 'Leitura aprofundada',
    oneLiner:
      'O Vibe Coding maduro não é caos de prompts: é intenção estruturada e persistente. O desenvolvedor deixa de ser executor de código e passa a orquestrador cognitivo, que dirige o agente com uma especificação versionada.',
    source: { oneLiner: 'scripts/seo/pages.mjs › devin.tldr.lede + seção #identidade' },
    core: ['fundamentos', 'calculadora', 'cozinheiro', 'identidade'],
    routes: [
      { mode: 'Entender', links: [['#calculadora', 'A calculadora como primeira IA'], ['#cozinheiro', 'O cozinheiro e o pedido abstrato'], ['#identidade', 'De executor a orquestrador']],
        note: 'por que a ferramenta libera em vez de substituir, e qual papel muda.' },
      { mode: 'Aplicar', links: [['#comunicacao-ia', 'Quatro pilares para falar com agentes'], ['#contexto-persistente', 'Contexto persistente'], ['#skills-playbooks', 'Skills, Playbooks e Knowledge']],
        note: 'como conversar com qualquer agente e transformar conhecimento individual em arsenal versionado.' },
      { mode: 'Aprofundar', links: [['#hands-on', 'Devin CLI + Salesforce + SDD'], ['#mentoria', 'Spec-Driven Development'], ['#fluxo', 'Da spec ao Apex Test']],
        note: 'três exercícios incrementais e os quatro passos até o teste passar.' },
      { mode: 'Aplicar', links: [['#amplificacao', 'O time em sincronia'], ['#cultura', 'Vibe Coding como mentalidade'], ['#gestao', 'O refinamento como super-prompt'], ['#fechamento', 'Próximos passos']],
        note: 'para quem lidera o time.' },
    ],
    summary: true,
  },

  // ── Fase 5 · prioridade média ────────────────────────────────────────────
  'develop-engineering': {
    // h1 e primeira frase do hero já são a tese: sem "Em uma frase".
    placement: 'section',
    kind: 'Artigo',
    depth: 'Leitura aprofundada',
    core: ['cena-00', 'cena-01', 'cena-03', 'cena-06'],
    routes: [
      { mode: 'Entender', links: [['#cena-01', 'Cinco fontes de verdade'], ['#cena-03', 'Prompt não é contrato'], ['#cena-06', 'Passar no teste não é estar certo']],
        note: 'por que uma mudança correta isolada pode estar errada para o projeto de hoje.' },
      { mode: 'Aplicar', links: [['#cena-02', 'Snapshot Capsule'], ['#cena-05', 'Action Gateway'], ['#cena-07', 'Evidence Record'], ['#cena-08', 'Da evidência à decisão']],
        note: 'ancorar, limitar e validar, e por onde começar.' },
      { mode: 'Verificar', links: [['#cena-09', 'O que este artigo ainda não prova']],
        note: 'os mecanismos são propostas, ainda sem medição de eficácia.' },
      { mode: 'Consultar', links: [['#cena-10', 'Os termos, em linguagem comum']],
        note: 'o glossário do artigo.' },
    ],
    summary: true,
  },

  'engenharia-agentes-ia': {
    // h1 já é a tese; o hero já tem duas portas. Faltava o mapa do resto.
    placement: 'section',
    kind: 'Material interativo',
    depth: 'Leitura aprofundada',
    core: ['hero', 'fluxo', 'principios'],
    routes: [
      { mode: 'Entender', links: [['#fluxo', 'O caminho de uma resposta confiável'], ['#principios', 'Os dez princípios']],
        note: 'a tese em dez regras: o LLM entra só onde é insubstituível.' },
      { mode: 'Aplicar', links: [['#jornada', 'Aprenda por descoberta'], ['#simulador', 'Simulador de arquitetura'], ['#playground', 'Playground']],
        note: 'dez capítulos e duas ferramentas que avaliam decisões por um modelo determinístico, sem IA.' },
      { mode: 'Aprofundar', links: [['#pilares', 'Cinco pilares'], ['#codigo', 'Os princípios em código'], ['#governanca', 'Governança Agent-Driven']],
        note: 'quanto rigor aplicar e quando, e o que muda quando a IA desenvolve sozinha.' },
      { mode: 'Consultar', links: [['#referencia', 'Referência e caso real']],
        note: 'os princípios em uma frase, o glossário e o caso que originou o conteúdo.' },
    ],
    summary: true,
  },

  'formulacao-de-problemas': {
    // O hero já tem "Por onde você entra?". O que faltava era o veredito do
    // próprio autor, que só aparecia no 2º bloco e no fim (audit §2).
    placement: 'section',
    kind: 'Artigo',
    depth: 'Leitura aprofundada',
    thesis:
      'Formular é engenharia da redução de incerteza orientada à decisão, e precisa de regra de parada. O próprio artigo conclui que a hipótese tem sustentação parcial: a redução de incerteza não é monotônica, não é universal e não basta sozinha.',
    source: { thesis: 'hero de src/formulacao-de-problemas.html + scripts/seo/pages.mjs › formulacao-de-problemas.tldr.lede' },
    core: ['hero', 'tese', 'parada'],
    routes: [
      { mode: 'Verificar', links: [['#veredito', 'Veredito: sustentação parcial'], ['#limites', 'Onde isto não se aplica']],
        note: 'a avaliação do autor e as fronteiras da hipótese.' },
      { mode: 'Consultar', links: [['#glossario', 'Glossário']],
        note: 'os termos do artigo.' },
    ],
    summary: true,
  },

  'salesforce-agentic-dev': {
    // O hero já diz o que é e tem duas portas; faltava separar o essencial da consulta.
    placement: 'section',
    kind: 'Guia prático',
    depth: 'Guia prático',
    core: ['problema-solucao', 'agentic', 'sdd'],
    routes: [
      { mode: 'Entender', links: [['#problema-solucao', 'Por que quebra em escala'], ['#agentic', 'O que é Agentic Development'], ['#sdd', 'Spec-Driven Development']],
        note: 'o problema, a mudança de paradigma e a spec como contrato entre time, agente e negócio.' },
      { mode: 'Aplicar', links: [['#framework', 'O framework em 6 etapas'], ['#exemplo', 'Exemplo Apex + LWC'], ['#fluxo', 'O fluxo de trabalho']],
        note: 'um ciclo aplicável em qualquer feature, a mesma feature feita de dois jeitos e a sequência da spec ao deploy.' },
      { mode: 'Aprofundar', links: [['#arquitetura', 'Quatro pilares'], ['#devin', 'Orquestrando o Devin'], ['#acu', 'Custos (ACUs)']],
        note: 'o papel de cada peça, Web e CLI, e como specs melhores economizam ACUs.' },
      { mode: 'Consultar', links: [['#repo', 'Estrutura do repositório'], ['#governanca', 'Ownership e checklist']],
        note: 'o template de referência e as fronteiras de metadata por time.' },
    ],
    summary: true,
  },

  // ── Fase 5 · prioridade baixa ────────────────────────────────────────────
  acessibilidade: {
    // O hero já tem tese, portas ("Ver o fluxo real"…) e limites declarados.
    // Faltava só a profundidade e o atalho para a síntese, que fica no fim.
    placement: 'section',
    kind: 'Case técnico',
    depth: 'Leitura aprofundada',
    core: ['problema', 'decisao', 'ideia'],
    summary: true,
  },

  'devops-salesforce': {
    // Já tem sumário e a introdução enuncia as quatro camadas. Faltava a profundidade.
    placement: 'section',
    kind: 'Guia prático',
    depth: 'Guia prático',
    summary: true,
  },

  know: {
    // Só continuação: a página orienta bem na entrada, mas termina sem saída.
    next: [
      { href: './artifice.html', title: 'O Artífice Invisível',
        why: 'O mesmo descompasso visto pelo indivíduo: o trabalho que evita a crise não gera evidência para o sistema de avaliação.' },
    ],
  },
};
