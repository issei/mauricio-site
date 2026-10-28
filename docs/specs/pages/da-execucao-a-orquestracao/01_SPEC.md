# SPEC — Página do áudio "Da execução à orquestração do trabalho"

| Campo | Valor |
| :-- | :-- |
| Arquivo | `src/da-execucao-a-orquestracao.html` (+ `src/da-execucao-a-orquestracao.css` se precisar) |
| URL | `https://mauricio.issei.com.br/da-execucao-a-orquestracao` |
| Áudio | `https://mauricio.issei.com.br/static/audio/Da_execu%C3%A7%C3%A3o_%C3%A0_orquestra%C3%A7%C3%A3o_do_trabalho.m4a` (já publicado; fora do git, como os outros de `static/audio/`) |
| Fonte do conteúdo | [`00_pesquisa-critica.md`](00_pesquisa-critica.md) v1 (auditoria de 56 afirmações da transcrição) |
| Pedido | Issei, 27/10/2026: "usando a skill de linguagem controlada, e as últimas definições das revisões anteriores, elabore uma nova página para publicar o áudio" |
| Página de referência | `src/capacidade-antes-do-acesso.html` (artigo com revisão crítica, `ScholarlyArticle`, AEO em `pages.mjs`, gêmeo `.md`) |
| Status | Spec pronta; implementação no Claude Code local; não publicada até o merge |

## 1. Problema e decisão central

O áudio é uma conversa de cerca de 20 minutos entre duas vozes, no formato "Mergulho Profundo" [confirmar: gerado por IA? a partir de quais materiais?]. A pesquisa crítica mostrou que o áudio tem uma boa ideia central e muitos números errados ou sem fonte. Parte dos números vem das próprias páginas do site, trocados de contexto.

**Decisão (D-1):** a página **não** é a transcrição do áudio. A auditoria editorial (`AUDITORIA-COMUNICACAO.md`, §8.2, página `devin`: nota 40) registrou que "transcrição de palestra publicada como página" é o formato com pior nota. A página publica o áudio **e** o texto revisado ao lado, com um quadro que diz ao ouvinte o que corrigir enquanto ouve.

## 2. Regras aplicadas (das revisões anteriores)

| Regra | Origem | Como aparece na página |
| :-- | :-- | :-- |
| Tese no topo | AUDITORIA §8.2 (`devin`, BL-07) | Hero com a tese revisada em duas frases |
| Número ilustrativo nunca com cara de resultado | AUDITORIA §9.1, item 2 | Todo número tem fonte, população e recorte na mesma frase ou na tabela |
| Selos FATO / INFERÊNCIA / HIPÓTESE | AUDITORIA §8.2 (`digital-workplace-agentico`, "padrão a copiar") | Selo em cada bloco da seção "O que a evidência mostra" |
| Uma metáfora por conceito | AUDITORIA §9.1, item 5 | Só a "fila que muda de lugar"; o áudio usa mais de dez |
| "Não é X — é Y" no máximo uma vez por seção | BL-20 | Conferir no gate de revisão (§8) |
| Tempo de leitura medido, não estimado | BL-15 | Calcular palavras / 200 depois de pronta |
| Fonte com data de consulta | BL-19 | Lista de fontes com "consultado em 28/10/2026" |
| PT-BR controlado, perfil Híbrido | `PTBR-CONTROLADO-PAGINAS.md` | Texto já revisado nesta spec |
| Síntese e FAQ gerados | `scripts/seo/pages.mjs` + `build-aeo.mjs` | Entrada proposta na §6; não escrever AEO à mão |
| Gêmeo `/en/` | `AGENTS.md` (i18n) | `npm run i18n:sync && npm run i18n:check` na máquina local |
| Acessibilidade | `docs/a11y/A11Y.md`, perfil Standard | Transcrição revisada como alternativa ao áudio (SC 1.2.1); player nativo com rótulo |

## 3. Estrutura

Um `<h1>`; seções em `<h2>`. Ordem do DOM = ordem visual.

1. `#inicio` — hero: título, tese, player, avisos (§4.1)
2. `#como-ouvir` — "O que corrigir enquanto ouve": tabela de 12 linhas (§4.2)
3. `#evidencia` — "O que a evidência mostra", 5 blocos com selo (§4.3)
4. `#cenarios` — três cenários e como distingui-los (§4.4)
5. `#limites` — o que a página não afirma (§4.5)
6. `#fontes` — fontes com data de consulta (§4.6)
7. `#pesquisa` — link para o registro completo (`00_pesquisa-critica.md` no GitHub) (§4.7)
8. Bloco AEO gerado (Em síntese + FAQ)

## 4. Conteúdo (texto final, PT-BR controlado)

### 4.1 Hero

- **Sobretítulo:** Áudio comentado · Trabalho e IA
- **H1:** Da execução à orquestração do trabalho
- **Tese (lede):** A IA aumenta a capacidade de produzir mais depressa do que aumenta a capacidade de verificar e integrar o que foi produzido. Onde isso acontece, o trabalho humano passa a depender mais de especificar, verificar, integrar e responder pelo resultado, e o ganho líquido depende de como a organização reforma a revisão, as métricas e a governança.
- **Player:** `<audio controls preload="metadata">` com `<source type="audio/mp4">`, rótulo "Áudio: Da execução à orquestração do trabalho, cerca de 20 minutos" [confirmar a duração], link "Baixar o áudio (.m4a)".
- **Aviso 1 (caixa destacada):** O áudio é uma conversa entre duas vozes [confirmar: gerada por IA]. Ele tem uma boa ideia central e vários números errados ou sem fonte. Esta página corrige o que o áudio afirma além da evidência. Se você tiver pouco tempo, leia a tabela "O que corrigir enquanto ouve".
- **Aviso 2 (texto de apoio):** Texto revisado de 56 afirmações do áudio. Leitura de cerca de N minutos [calcular].

### 4.2 O que corrigir enquanto ouve

Introdução: "A tabela segue a ordem do áudio. A coluna da direita é a versão que a evidência sustenta."

| No áudio | O que a evidência sustenta |
| :-- | :-- |
| "AI brain fry" causou "um salto de 33% na fadiga de decisão até o fim do dia". | Numa pesquisa do BCG com 1 488 trabalhadores dos EUA, quem relatou *brain fry* (cerca de 14% dos que usam IA) relatou 33% mais fadiga de decisão do que quem não relatou. É uma diferença entre grupos, num único momento. Não mede aumento ao longo do dia nem prova causa. |
| A dopamina tem pico "quando a pessoa se esforça muito em algo incerto", e a IA "zera a equação biológica". | A dopamina sinaliza a diferença entre a recompensa recebida e a esperada. Nenhum estudo mediu dopamina durante o uso de IA. A ligação com o esforço e com a IA é especulação. |
| "As pesquisas chamam isso de ilusão do pensamento", ao falar de projetar humanidade num chat. | São duas coisas diferentes. Atribuir compreensão a um programa é o efeito ELIZA (Weizenbaum, 1966). "The Illusion of Thinking" (Apple, 2025) trata de limites de modelos de raciocínio em quebra-cabeças, e foi contestado. |
| Desenvolvedores "digitam código 55% mais rápido". | Num experimento, quem usou o GitHub Copilot terminou **uma tarefa** (um servidor HTTP) 55,8% mais rápido. Não mede digitação nem trabalho real. Em outro experimento, com 16 desenvolvedores experientes em projetos que conheciam, as tarefas com IA levaram 19% mais tempo. |
| "A velocidade líquida de entrega cai para 0,85 vezes o original." | Nenhuma fonte com esse número foi encontrada. |
| A "manobra reversa de Conway" é "a solução que o MIT aborda". | A manobra inversa de Conway vem da prática de consultoria (ThoughtWorks) e do livro *Team Topologies*. Não foi encontrada proposta do MIT. |
| Cargas "intrínseca, germânica e extrínseca". | Os termos da teoria da carga cognitiva são intrínseca, pertinente (*germane*) e estranha (*extraneous*). A teoria vem do ensino; aplicá-la a equipes é uma adaptação. |
| A ciência "destrói o mito" do brainstorming sem julgamento, e avaliar durante a geração é superior. | O brainstorming **em grupo** rende menos ideias do que as mesmas pessoas sozinhas. Mas nenhum estudo mostra que avaliar durante a geração é sempre melhor. A ordem entre gerar e avaliar depende da tarefa. |
| O "estudo de caso bancário": agente de aprovação de crédito, limiar de 98%, margem de 0,25, zero alucinações, latência −92% e custo de nuvem −78%. | É o benchmark **offline** do autor deste site ([Case Agents](/case-agents)): 30 consultas de atendimento, ferramentas simuladas, sem crédito e sem produção. O limiar do roteador é 0,75, não 98%. A margem relativa mínima é 0,25. Houve 0 execuções incorretas em 20 consultas; alucinação não foi medida. O 77,8% é a redução do custo de chamadas ao modelo, não do custo de nuvem. Não há medida de latência de 92%. |
| "Avaliaram 150 execuções multiagentes com Kappa de Cohen de 0,88, confirmando padrões de falha." | No estudo MAST (UC Berkeley, 2025), 150 rastros serviram para criar a taxonomia, e o 0,88 mede a concordância entre os anotadores humanos. O estudo encontrou 14 modos de falha e taxas de falha de 41% a 86,7% em sete sistemas. |
| DeerFlow 2.0 "aluga computadores reais para a IA usar o mouse"; a Sompo tem "10 mil agentes operando diariamente". | O DeerFlow 2.0 (ByteDance, fevereiro de 2026) executa agentes em contêineres com navegador e terminal; nenhuma fonte fala em alugar computadores. A Sompo anunciou agentes de IA para cerca de 30 mil funcionários, com piloto a partir de janeiro de 2026; nenhuma fonte fala em 10 mil agentes. |
| O "framework EPOC do MIT" junta estoicismo, taoísmo, confucionismo e bushidō, e cobra "empatia, presença, opinião autêntica e esperança construtiva". | O nome é EPOCH (MIT Sloan, 2025). Tem cinco grupos: empatia, presença, opinião e julgamento, **criatividade**, e esperança e liderança. Nenhuma fonte liga o EPOCH às tradições filosóficas citadas. A ligação é uma analogia do autor. |

Nota sob a tabela: "Também corrigidos no texto: 'MOSCO' é MoSCoW; 'Matriz-Ghout' é a matriz GUT; 'CRIBE' é CRIB; 'HAG' é RAG; 'Cloud Mythos' é o Claude Mythos Preview, da Anthropic. A lista completa está no registro da pesquisa (§4.7)."

### 4.3 O que a evidência mostra

Cada bloco: `<h3>`, selo, parágrafo, fontes curtas.

**1. A IA acelera tarefas delimitadas, e o ganho varia.** Selo: FATO.
Em experimentos controlados, a IA reduziu o tempo e melhorou a qualidade em tarefas de escrita, atendimento e consultoria. Num call center com 5 179 atendentes, os casos resolvidos por hora subiram 14% na média e 34% entre os novatos, com efeito mínimo entre os mais experientes. Com 758 consultores, o ganho apareceu dentro do que o modelo faz bem; fora disso, as respostas corretas caíram 19 pontos percentuais.
*Fontes: Brynjolfsson, Li e Raymond (2025); Noy e Zhang (2023); Dell'Acqua et al. (2025).*

**2. Produzir mais não garante entregar mais.** Selo: INFERÊNCIA.
Dados de mais de 10 000 desenvolvedores mostram mais pull requests com IA, revisão 91% mais longa e nenhuma correlação com a entrega no nível da organização. A pesquisa DORA de 2024 associou mais adoção de IA a pequena queda na vazão e na estabilidade das entregas. Os dois resultados são correlacionais: não provam que a IA causou a mudança. Uma explicação alternativa é que mudanças maiores, e não a IA em si, deixam a revisão mais lenta.
*Fontes: Faros AI (2025); DORA (2024).*
Metáfora-guia (única da página): "A fila muda de lugar. Quando escrever fica mais rápido e revisar não fica, o trabalho acumula na revisão."

**3. Supervisionar a IA tem custo.** Selo: FATO, com ressalva.
A literatura de fatores humanos descreve, desde 1983, que automatizar a parte fácil deixa à pessoa a parte difícil, com menos prática, e que quem supervisiona automação tende a confiar demais nela. Em 2026, pesquisadores do BCG deram o nome de *AI brain fry* à fadiga mental de quem usa ou supervisiona IA além da própria capacidade.
*Fontes: Bainbridge (1983); Parasuraman e Manzey (2010); Bedard et al. (2026).*

**4. Delegar pode reduzir a aprendizagem.** Selo: FATO, com amostras pequenas.
Num experimento com 52 programadores, quem usou IA para aprender uma biblioteca nova teve nota 17 pontos menor num teste de compreensão, sem ganho significativo de tempo. Quem usou a IA para perguntar e entender manteve a nota. Em quatro centros de colonoscopia, a taxa de detecção sem IA caiu de 28,4% para 22,4% depois de meses de uso da IA. Os dois estudos são pequenos, e o segundo é observacional.
*Fontes: Shen e Tamkin (2026); Budzyń et al. (2025).*

**5. Agentes avançam, mas os testes mostram limites.** Selo: FATO.
O tamanho das tarefas que agentes completam com 50% de sucesso dobrou a cada cerca de sete meses entre 2019 e 2025, mas o desempenho cai em tarefas pouco estruturadas. Num escritório simulado, o melhor agente concluiu 30% das tarefas sozinho. Sistemas com vários agentes falharam em 41% a 86,7% das execuções analisadas.
*Fontes: Kwa et al. (2025); Xu et al. (2025); Cemri et al. (2025).*

Fechamento da seção (texto, selo HIPÓTESE): "Juntas, essas evidências apoiam uma parte da tese do áudio: o gargalo muda de lugar, e com ele o papel humano. Não sustentam a outra parte: que a mudança já é geral, que reduz o esforço humano ou que libera a mente para crescer. Os dados de mercado de trabalho mostram, até agora, efeitos pequenos na média (Dinamarca, 25 000 trabalhadores) e efeitos concentrados em jovens de ocupações expostas (EUA)."

### 4.4 Três cenários

Introdução: "O resultado depende das condições. Os indicadores da terceira coluna ajudam a saber em qual cenário uma equipe está."

| Cenário | Quando é plausível | Como reconhecer |
| :-- | :-- | :-- |
| **Favorável:** a IA aumenta a produtividade efetiva e libera tempo | Tarefas que o modelo faz bem; testes automáticos; mudanças pequenas; pessoas que usam a IA para entender, não só para delegar | Vazão e estabilidade sobem juntas; o tempo de revisão não cresce; o desempenho sem IA se mantém |
| **Intermediário:** a execução acelera e a revisão absorve parte do ganho | Revisão manual; mudanças grandes; metas de atividade (linhas, tickets, pontos) | Mais pull requests e a mesma entrega; revisão mais longa |
| **Adverso:** erros, dependência e supervisão anulam o ganho | Tarefas fora do que o modelo faz bem; confiança excessiva; pouca prática sem IA | A estabilidade cai; erros graves aumentam; o desempenho sem IA cai |

Texto (selo INFERÊNCIA): "Os dados de software de 2024 e 2025 se parecem mais com o cenário intermediário. Isso pode mudar com ferramentas novas."

### 4.5 O que esta página não afirma

- Não afirma que a orquestração vai substituir a execução em todas as profissões. Quase todos os estudos são de software, escrita e atendimento.
- Não afirma que "orquestrador" é uma profissão nova. É uma combinação de competências conhecidas: especificar, revisar, coordenar e responder pela decisão.
- Não usa as tradições filosóficas do áudio como evidência. Elas são analogias do autor.
- Não trata anúncios de empresas como prova de resultado em produção.
- Os modelos mudam mais rápido que a pesquisa. Os estudos citados usaram ferramentas de 2023 a 2025.

### 4.6 Fontes

Lista com autor, ano, título, veículo e link, mais "consultado em 28/10/2026". Usar as entradas [1]–[9], [15]–[17], [20], [21], [32]–[34], [43], [44], [46] da bibliografia de `00_pesquisa-critica.md`. Marcar com "(fonte secundária)" as que foram lidas em reportagem: [9], [15], [17].

### 4.7 Registro da pesquisa

Texto: "A auditoria completa das 56 afirmações, com a matriz de evidências, a bibliografia comentada e as lacunas, está no repositório do site." Link para `docs/specs/pages/da-execucao-a-orquestracao/00_pesquisa-critica.md` no GitHub.

## 5. Metadados

- `<title>`: "Da execução à orquestração do trabalho — áudio comentado" (57 caracteres)
- `description` (≤ 155): "Áudio sobre IA e trabalho, com revisão de 56 afirmações: o que a evidência sustenta, o que corrigir e três cenários para o futuro do trabalho." [contar ao implementar]
- JSON-LD: `ScholarlyArticle` (via `pages.mjs`) + `AudioObject` com `contentUrl`, `encodingFormat: audio/mp4`, `inLanguage: pt-BR`, `duration` [confirmar].
- `og:image`: `og-da-execucao-a-orquestracao.png`, gerada por `scripts/gen-og.mjs` a partir do campo `og`.

## 6. Entrada proposta em `scripts/seo/pages.mjs`

```js
{
  slug: 'da-execucao-a-orquestracao', type: 'ScholarlyArticle', tier: 'A', hasMd: true,
  title: 'Da execução à orquestração do trabalho — áudio comentado',
  headline: 'Da execução à orquestração do trabalho: o que a evidência sustenta sobre IA, produtividade e supervisão',
  description: 'Áudio sobre IA e trabalho, com revisão de 56 afirmações: o que a evidência sustenta, o que corrigir e três cenários para o futuro do trabalho.',
  datePublished: '2026-10-28', dateModified: '2026-10-28',
  section: 'Trabalho e IA',
  tags: ['Futuro do Trabalho', 'Produtividade', 'Supervisão de IA', 'Agentes de IA', 'Revisão Crítica'],
  keywords: ['orquestração do trabalho', 'produtividade com IA', 'AI brain fry', 'viés de automação', 'perda de habilidade', 'DORA', 'SPACE', 'sistemas multiagentes', 'MAST', 'EPOCH MIT Sloan'],
  audience: 'Líderes de engenharia, gestores, pesquisadores do trabalho',
  tldr: {
    heading: 'O que o áudio acerta e o que precisa de correção',
    lede: 'A IA aumenta a capacidade de produzir mais depressa do que a capacidade de verificar. Onde isso acontece, o trabalho humano passa a depender mais de especificar, verificar e responder pelo resultado. O ganho líquido não é garantido.',
    points: [
      '**Ganho com limites** — experimentos mostram ganhos em tarefas delimitadas, maiores para novatos; fora do que o modelo faz bem, o desempenho cai.',
      '**A fila muda de lugar** — dados observacionais mostram mais código e revisão mais longa, sem ganho visível na entrega da organização.',
      '**Supervisionar custa** — complacência com a automação, fadiga relatada e perda de prática têm evidência, com amostras pequenas.',
      '**Números corrigidos** — o "caso bancário" do áudio é um benchmark offline do autor; o 0,85× não tem fonte; o 33% é diferença entre grupos.',
    ],
    foot: 'Registro completo: 56 afirmações auditadas, com fontes e lacunas.',
  },
  faq: [
    { q: 'A IA já desloca o trabalho da execução para a orquestração?', a: 'Em parte, e só em alguns contextos. Experimentos mostram ganhos em tarefas delimitadas, e dados de engenharia de software sugerem que o gargalo passa para a revisão. Os dados de mercado de trabalho mostram, até agora, efeitos pequenos na média e efeitos concentrados em jovens de ocupações expostas. Não há estudo que meça diretamente o trabalho de orquestração.' },
    { q: 'O que é AI brain fry?', a: 'É o nome que pesquisadores do BCG deram, em 2026, à fadiga mental de quem usa ou supervisiona ferramentas de IA além da própria capacidade. Numa pesquisa com 1 488 trabalhadores dos EUA, quem relatou o problema relatou 33% mais fadiga de decisão do que quem não relatou. A pesquisa mostra associação, não causa.' },
    { q: 'A IA deixa os desenvolvedores mais rápidos?', a: 'Depende da tarefa e da pessoa. Num experimento com uma tarefa curta, o grupo com Copilot terminou 55,8% mais rápido. Num experimento com 16 desenvolvedores experientes em projetos que eles conheciam, as tarefas com IA levaram 19% mais tempo.' },
    { q: 'Usar IA prejudica a aprendizagem?', a: 'Pode prejudicar quando a pessoa só delega. Num experimento com 52 programadores, quem usou IA para aprender uma biblioteca nova teve nota menor num teste de compreensão. Quem usou a IA para perguntar e entender manteve a nota. A amostra é pequena.' },
    { q: 'O que diz o estudo sobre falhas de sistemas multiagentes?', a: 'O estudo MAST, da UC Berkeley, classificou falhas em 14 modos e 3 categorias e encontrou taxas de falha de 41% a 86,7% em sete sistemas de código aberto. O valor de Kappa de 0,88 mede a concordância entre os anotadores humanos.' },
  ],
  og: {
    eyebrow: 'Áudio comentado · Trabalho e IA',
    title: 'Da execução à {orquestração}',
    titleSize: 76,
    subtitle: 'O que a evidência sustenta sobre IA e trabalho',
    thesis: 'A fila muda de lugar: produzir ficou mais rápido que verificar.',
    chips: [{ k: '56', label: 'Afirmações auditadas' }, { k: '3', label: 'Cenários' }, { k: '20 min', label: 'Áudio' }],
  },
},
```

Nota para quem implementa: conferir no código os campos que `pages.mjs` exige (por exemplo `about`, `terms`, `mdSections`) e preencher a partir das §4.3 e §4.5. Não inventar conteúdo fora desta spec.

## 7. Arquivos a tocar

- `src/da-execucao-a-orquestracao.html` (novo)
- `src/da-execucao-a-orquestracao.css` (novo, só se necessário; nenhum hexadecimal fora de CSS)
- `scripts/seo/pages.mjs` (entrada da §6) → `node scripts/seo/build-aeo.mjs da-execucao-a-orquestracao --md` gera o AEO e `public/da-execucao-a-orquestracao.md`
- `src/catalogo.html` e `mdSections` do catálogo em `pages.mjs` (cartão no pilar Fundação) [confirmar o pilar com o autor]
- `scripts/i18n/*` via `npm run i18n:sync` (gêmeo `/en/`, local)
- `tests/da-execucao-a-orquestracao.spec.js` (novo)
- `vite.config.js` só se o padrão de descoberta exigir

## 8. Critérios de aceite (verificáveis)

1. A página carrega com um `<h1>` e as seções `#inicio`, `#como-ouvir`, `#evidencia`, `#cenarios`, `#limites`, `#fontes`.
2. O `<audio>` tem `controls`, `preload="metadata"`, `<source type="audio/mp4">` com a URL da tabela e um link de download visível.
3. A tabela `#como-ouvir` tem 12 linhas de dados.
4. O texto visível **não** contém: "0,85", "92%", "aprovação de crédito", "10 mil agentes", "zero alucinações", "aluga computadores" fora da coluna "No áudio" (teste: as strings só aparecem dentro de `#como-ouvir td:first-child`).
5. Todo número da seção `#evidencia` tem fonte no mesmo bloco.
6. Cada bloco de `#evidencia` tem um selo (FATO, INFERÊNCIA ou HIPÓTESE).
7. "Não é X — é Y" aparece no máximo uma vez por seção.
8. axe sem violações serious/critical; sem rolagem horizontal a 320 px.
9. `npm run gate` verde, incluindo gêmeo `.md`, AEO atualizado e espelho `/en/`.

## 9. Pendências do autor

- [confirmar] O áudio foi gerado por IA? A partir de quais materiais? (muda o aviso 1)
- [confirmar] Duração exata do áudio.
- [confirmar] Pilar do catálogo (proposta: Fundação, ao lado de `devin` e `artifice`).
- [decidir] A página deve corrigir, também, os números de `/devin` e `/engenharia-confianca` que o áudio repetiu? Hoje são itens BL-02 e BL-06 da auditoria, fora do escopo desta página.

## 10. Verificação PT-BR Controlado

Perfil **Híbrido** (texto argumentativo com dados e tabelas para público misto). `verificar.py --perfil hibrido` sobre a §4: 15 sinalizações, todas descartadas pela leitura. 10 de "frase longa" são células de tabela lidas como uma frase só. 4 de "sigla sem definição" (EPOC, MOSCO, CRIBE, HAG) são as grafias erradas do áudio, citadas de propósito (B0.03). 1 ("FATO") é rótulo de selo. O script não detecta todas as ambiguidades; a aprovação por um modelo de linguagem não prova ausência delas.

## 11. Registro da implementação (28/10/2026)

O que foi implementado diverge desta spec nos pontos abaixo. Cada ponto tem o motivo.

| Ponto | Spec | Implementado | Motivo |
| :-- | :-- | :-- | :-- |
| Aviso 1 | "conversa entre duas vozes [confirmar: gerada por IA]" | "conversa entre duas vozes", sem afirmar IA | Pendência P4 aberta; a página não afirma o que não foi confirmado. |
| Duração | `duration` no JSON-LD | Omitida; rótulo diz "cerca de 20 minutos" | Duração não confirmada (P3). O arquivo não é acessível a partir da nuvem. |
| Transcrição | Texto revisado como alternativa (SC 1.2.1) | Texto revisado **e** transcrição automática num `<details>` rotulado como rascunho | `A11Y.md` (Media Evidence): transcrição automática é rascunho. Registrado em `EXCEPTIONS.md` (EXC-009). |
| Posição do AEO | Item 8, no fim | Antes do rodapé, fora do `<main>` | O `.md` usa `mdFromMain` (página convertida); o AEO fora do `<main>` evita duplicar a síntese. |
| Tempo de leitura | Calcular | 13 minutos (2 570 palavras do `<main>` e do AEO, sem a transcrição, / 200) | BL-15. |
| Fontes | [1]–[9], [15]–[17], [20], [21], [32]–[34], [43], [44], [46] | As mesmas, mais [35], [36] e [41] | A tabela cita Weizenbaum, "The Illusion of Thinking" e *Team Topologies* pelo nome. [6] ganhou a URL do BFI (o registro não tinha URL). |
| Gerador | — | `build-aeo.mjs` deixa de apagar o consent-default inline | Armadilha registrada na auditoria editorial (PR #128): cada regeneração removia o script. |
| Pilar | Fundação [confirmar] | Fundação | Padrão até a resposta do autor. |
| Critério 4 | Strings só na coluna "No áudio" | A coluna da direita deixou de repetir "92%" e "10 mil agentes" ("A latência não foi medida"; "nenhuma fonte confirma o número de agentes citado no áudio"); o ponto do Em síntese diz "a queda de entrega citada não tem fonte" em vez de "0,85×" | O texto da §4.2 e da §6 contradizia o próprio critério 4. O teste cobre o `<main>` e o bloco AEO. |
