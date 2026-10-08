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

/** Formatos aceitos. Uma taxonomia pequena é preferível a uma sofisticada. */
export const KINDS = [
  'Artigo', 'Ensaio', 'Ensaio com autodiagnóstico', 'Estudo técnico', 'Case técnico',
  'Guia prático', 'Tutorial', 'Documentação de projeto', 'Revisão científica',
  'Apresentação', 'Proposta técnica', 'Simulador', 'Narrativa pessoal', 'Referência',
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
};
