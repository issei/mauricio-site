---
id: SDD-F1-F1b
titulo: SDD das fases F1 (YAML 2.0.0 e catálogo gerado) e F1b (cabeçalho comum)
data: 2026-11-10
leitor: Issei (aprova o Anexo A e os padrões DS-1 a DS-3); agente que vai implementar a F1 e a F1b
padrao_de_redacao: PT-BR controlado (perfil técnico)
status: especificação — questões Q1 a Q9 respondidas pelo autor em 10/11/2026 (Anexo B); o resto do Anexo A aguarda confirmação geral
---

# SDD das fases F1 e F1b

O documento tem duas partes: **Parte 1, F1** (YAML 2.0.0 como fonte única e catálogo gerado) e
**Parte 2, F1b** (cabeçalho comum). Ficam juntas porque a F1b depende da seção `entradas` que a F1
cria.

# Parte 1 — F1: YAML 2.0.0 como fonte única e catálogo gerado

> Origem: [`PROPOSTA-REESTRUTURACAO.md`](PROPOSTA-REESTRUTURACAO.md), decisões D3, D4, D5 e D7
> (tomadas pelo autor em 10/11/2026). A F1b (cabeçalho comum) está na Parte 2 deste documento.
> Requisitos: **RF-F1-xx**. Critérios de aceite: **CA-F1-xx**.

## 1. Objetivo

Fazer do `specs/ecosystem.nav.yaml` a única lista dos conteúdos do site. Dela saem o catálogo
(`/catalogo`) e os dados do menu `<eco-nav>` (enquanto ele existir; ver Parte 2, DS-2). A F1 não muda
a home, o currículo nem o texto das páginas.

## 2. Situação de partida (fatos, commit `791f623`)

| Item | Estado |
| :-- | :-- |
| YAML | v1.13.0; 5 pilares; 28 nós; 8 crosslinks; invariantes INV-1 a INV-5 |
| `src/js/eco-nav.js` | cópia manual do YAML; `tests/apresentacao.ecossistema.test.mjs` confere os slugs das duas cópias |
| `src/catalogo.html` | escrito à mão; 33 cartões; 5 páginas que não estão no YAML (DV-1); sem link para `/videos`, `/temas` ou `/curriculo` (DV-2) |
| Outros leitores do YAML | `scripts/audit-site.mjs`, `tests/digital-workplace.legal.test.mjs` |
| Formatos | `KINDS` em `scripts/editorial/editorial.data.mjs` (15 valores); o catálogo usa rótulos fora da lista (DV-5) |

## 3. Requisitos

### 3.1 Esquema do YAML 2.0.0

- **RF-F1-01.** `meta.version` passa a `2.0.0`, com nota de versão que cita D4 e D5 e a data.
- **RF-F1-02.** `pillars` tem exatamente quatro itens, na ordem `p1`, `p2`, `p3` e `p4`. O `p5` sai.
- **RF-F1-03.** Uma seção nova, `entradas`, lista as páginas de entrada, que não são conteúdo:
  `index` (Início), `curriculo` (Trajetória), `catalogo` (Produção) e `videos` (Vídeos). Cada uma
  tem `file`, `label` e `href`. Esta seção alimenta o cabeçalho comum (SDD-F1b).
- **RF-F1-04.** Uma seção nova, `trajetoria`, lista as narrativas pessoais: `life`, `life3d` e
  `terminal-evolutivo`. Esses nós não pertencem a nenhum pilar. O `lifeos` fica fora do YAML por
  ora (Q5): continua publicado, sem link, e volta à pauta numa fase futura.
- **RF-F1-05.** Cada nó de conteúdo tem os campos abaixo. Os nós atuais mantêm `file`, `title`,
  `label` e `blurb` como estão.

  | Campo | Obrigatório | Regra |
  | :-- | :-- | :-- |
  | `pillar` | sim, exceto em `trajetoria` | `p1` a `p4` |
  | `kind` | sim | um valor de `KINDS` (§3.3) |
  | `natureza` | sim | `experiencia`, `estudo`, `proposta`, `experimento` ou `referencia` |
  | `temas` | sim nos pilares (1 a 3); opcional na trajetória (0 a 3) | chaves de `content/temas.yml` |
  | `descricao` | sim | texto do cartão do catálogo, copiado sem mudança do HTML atual |
  | `catalogo` | não (padrão `true`) | `false` esconde o nó do catálogo, sem tirá-lo do grafo |
  | `par` | não | slug de outro nó; usado por `aprendizagem-autorregulada-artigo` |
  | `cartao_titulo` | não | título do cartão, quando difere de `label` e `title` |
  | `assunto` | não | texto depois do formato na etiqueta do cartão ("Ensaio · Gestão do conhecimento") |
  | `chamada` | não (padrão "Acessar conteúdo →") | texto do link do cartão |
  | `selo` | não | `{ texto, direcao: sobe \| desce }`: selo de crosslink do cartão |

  Os pilares ganham `resumo` (texto do catálogo) e `conector` (frase entre um pilar e o
  anterior). As entradas `curriculo` e `videos` ganham `titulo`, `descricao` e `chamada`, para o
  cartão da seção "Trajetória e vídeos". (Campos acrescentados na implementação, 10/11/2026, para o
  catálogo gerado ficar igual ao escrito à mão.)

- **RF-F1-06.** Entram como nós: `capacidade-antes-do-acesso`, `curiosidade-e-investigacao`,
  `aprendizagem-autorregulada`, `aprendizagem-autorregulada-artigo` (com `catalogo: false` e
  `par: aprendizagem-autorregulada`), `operacao-capital-cognitivo` e `digital-workplace-agentico`.
- **RF-F1-07.** Mudam de pilar: `socialselling` (p5 → p3) e `boutique-empresarial-showcase`
  (p5 → p2). `index` e `videos` saem dos pilares e vão para `entradas`.
- **RF-F1-08.** Os crosslinks existentes ficam iguais.

### 3.2 Invariantes do YAML 2.0.0

Substituem os do cabeçalho do arquivo. O teste novo (§5) aplica todos.

| Id | Regra |
| :-- | :-- |
| INV-1 | todo slug de `pillars[].nodes` existe em `nodes` |
| INV-2 | `pillars` tem 4 itens, na ordem 1 a 4 |
| INV-3 | todo `file` corresponde a um arquivo real em `src/` |
| INV-4 | `crosslinks[].from` e `.to` são slugs válidos |
| INV-5 | URLs derivadas usam `meta.canonical_base`, exceto os `href` absolutos já previstos (`/videos.html`) |
| INV-6 | todo nó tem `kind` em `KINDS`, `natureza` na lista e `temas` válidos e na quantidade de RF-F1-05 |
| INV-7 | toda URL PT-BR do sitemap que é página autoral é um nó, uma entrada ou uma página legal; a única exceção listada é `lifeos` (Q5) |
| INV-8 | `src/catalogo.html` entre os marcadores é igual à saída do gerador |

### 3.3 Formatos

- **RF-F1-09.** `KINDS` ganha três valores, que o catálogo já usa e que não cabem em nenhum
  existente: `Curso` (`sustentacao`), `Áudio comentado` (`da-execucao-a-orquestracao`) e
  `Jornada` (`engenharia-confianca`, decisão Q2; o cartão mantém "Jornada · 4 módulos").
- **RF-F1-10.** Os demais rótulos do catálogo passam ao valor de `KINDS` indicado no Anexo A
  ("Case" → "Case técnico", "Estudo" → "Estudo técnico", "Visão geral" → "Apresentação",
  "Narrativa" → "Narrativa pessoal"). `boutique-empresarial-showcase` fica "Case técnico" (Q3) e
  `salesforce-agentic-dev` fica "Guia prático" (Q4).
- **RF-F1-11.** `editorial.data.mjs` passa a importar `KINDS` do mesmo lugar que o gerador do
  catálogo, para não haver duas listas. (A camada editorial continua com o seu próprio `kind` por
  página; o teste da §5 confere que ele é igual ao do YAML.)

### 3.4 Gerador do catálogo

- **RF-F1-12.** Novo `scripts/gen-catalogo.mjs`, no padrão de `gen-editorial.mjs`: lê o YAML,
  escreve entre `<!-- CATALOGO:START -->` e `<!-- CATALOGO:END -->` em `src/catalogo.html`, é
  idempotente e tem `--check`.
- **RF-F1-13.** O que fica fora dos marcadores continua escrito à mão: `<head>`, hero e o bloco
  "Comece por aqui".
- **RF-F1-14.** Cada cartão mostra: formato (`kind`), natureza (rótulo por extenso), título, a
  `descricao`, os temas e o selo de crosslink que já existe. O cartão não ganha ícone nem card
  novo: segue o markup atual. Os temas aparecem como texto, não como links: o cartão inteiro já é
  um `<a>`, e link dentro de link é HTML inválido. Os links para `/temas/<tema>` ficam para a F5,
  junto com a lista de artigos nas páginas de tema.
- **RF-F1-15.** O catálogo ganha, depois dos quatro pilares, uma seção curta "Trajetória e
  vídeos" com links para `/curriculo`, as narrativas e `/videos` (corrige DV-2).
- **RF-F1-16.** A trilha dos pilares (`nav` "Jornada do ecossistema") passa a ter 4 itens.
- **RF-F1-17.** "Comece por aqui" passa a ter uma porta por público (recrutador → `/curriculo`;
  liderança técnica → `case-agents`; leitor → `artifice`). [confirmar: destinos]

### 3.5 Dados do `<eco-nav>`

- **RF-F1-18.** `gen-catalogo.mjs` também escreve `src/js/eco-nav.data.js` (pilares e nós) a partir
  do YAML. `eco-nav.js` passa a importar esse arquivo e deixa de ter cópia própria.
  `tests/apresentacao.ecossistema.test.mjs` passa a conferir o arquivo gerado.

### 3.6 Fora do escopo da F1

Cabeçalho comum (F1b); natureza no topo das páginas (F4); artigos nas páginas de tema (F5); home e
currículo (F2, F3); qualquer texto de página.

## 4. Impacto em outros ativos

| Ativo | O que muda |
| :-- | :-- |
| `ECOSYSTEM.md` | regra "editar YAML e JS juntos" sai; entra "editar só o YAML e rodar o gerador" |
| `scripts/inject-eco-nav.mjs` | lista de páginas passa a vir do YAML (DV-3), até a F1b retirar o componente |
| `scripts/quality-gate.mjs` | acrescenta `gen-catalogo.mjs --check` |
| `scripts/audit-site.mjs` | lê `pillars` sem supor 5 |
| `/en/` | `catalogo` e `eco-nav.data.js` mudam: `npm run i18n:sync && npm run i18n:check` na máquina do autor antes do merge |
| `public/catalogo.md` | gerado pelo `gen-catalogo.mjs` (seções vindas do YAML via `scripts/seo/pages.mjs`), com `--check` |

## 5. Testes

- `tests/ecosystem.schema.test.mjs` (novo): INV-1 a INV-7.
- `tests/catalogo.gen.test.mjs` (novo): INV-8; todo nó com `catalogo` diferente de `false` aparece
  uma vez; todo cartão tem formato, natureza e ao menos um tema; links de tema existem em
  `src/temas/`.
- `tests/apresentacao.ecossistema.test.mjs`: ajustado a RF-F1-18.
- `tests/eco-nav.spec.js`: 4 pilares.
- Sweep de acessibilidade em `catalogo` (PT e EN): a dívida não sobe.

## 6. Critérios de aceite

- **CA-F1-01.** `npm run gate` verde, com `gen-catalogo.mjs --check`.
- **CA-F1-02.** O catálogo publicado tem 28 cartões nos 4 pilares (as 29 páginas dos pilares menos
  o par `aprendizagem-autorregulada-artigo`) e a seção "Trajetória e vídeos" com links para
  `/curriculo`, as 3 narrativas e `/videos`. Somadas, são 32 das 33 páginas autorais; o `lifeos`
  fica fora (Q5).
- **CA-F1-03.** Nenhuma URL muda; o `sitemap.xml` tem as mesmas URLs.
- **CA-F1-04.** Todo cartão mostra formato, natureza e temas confirmados pelo autor no Anexo A.
- **CA-F1-05.** O `/en/` está em dia (`i18n:check`).

## 7. Ordem de implementação

1. Teste do esquema (falha), depois o YAML 2.0.0 com a classificação aprovada.
2. Teste do gerador (falha), depois `gen-catalogo.mjs` e os marcadores no catálogo.
3. `eco-nav.data.js` e ajuste dos testes do componente.
4. Gate, sweep de acessibilidade, `i18n:sync` local, PR.

## Anexo A — Classificação proposta (para o autor confirmar)

Natureza segundo os critérios da proposta (§10.2). Temas com as chaves de `content/temas.yml`.
Em **negrito**, as linhas que o autor decidiu em 10/11/2026 (Anexo B, Q1 a Q5). As demais aguardam
a confirmação geral.

| Página | Pilar | Formato (`kind`) | Natureza | Temas |
| :-- | :-- | :-- | :-- | :-- |
| `know` | p1 | Ensaio | Estudo | gestao-e-estrategia |
| `devin` | p1 | Apresentação | Estudo | engenharia-agentica, ferramentas-de-ia |
| `artifice` | p1 | Ensaio com autodiagnóstico | Estudo | tecnologia-e-cultura, gestao-e-estrategia |
| `formulacao-de-problemas` | p1 | Artigo | Estudo | gestao-e-estrategia, dados-e-decisao |
| `capacidade-antes-do-acesso` | p1 | Artigo | Estudo | aprendizagem-e-mente, tecnologia-e-cultura |
| `curiosidade-e-investigacao` | p1 | Ensaio | Estudo | aprendizagem-e-mente |
| `aprendizagem-autorregulada` | p1 | Revisão científica | Estudo | aprendizagem-e-mente |
| `aprendizagem-autorregulada-artigo` | p1 (par, sem cartão) | Artigo | Estudo | aprendizagem-e-mente |
| `da-execucao-a-orquestracao` | p1 | Áudio comentado | Estudo | gestao-e-estrategia, engenharia-agentica |
| `apresentacao` | p2 | Apresentação | Referência | engenharia-agentica, especificacao-e-desenvolvimento |
| **`engenharia-confianca`** | p2 | **Jornada** (formato novo, Q2) | Estudo | engenharia-agentica |
| `engenharia-agentes-ia` | p2 | Material interativo | Estudo | engenharia-agentica |
| `develop-engineering` | p2 | Artigo | Estudo | engenharia-agentica, especificacao-e-desenvolvimento |
| `operacao-capital-cognitivo` | p2 | Simulador | Experimento | dados-e-decisao, gestao-e-estrategia |
| `agent-ready` | p2 | Tutorial | Experiência | engenharia-agentica, especificacao-e-desenvolvimento |
| `case-agents` | p2 | Case técnico | Experiência | engenharia-agentica |
| `knowledge-os-presentation` | p2 | Apresentação | Proposta | engenharia-agentica, gestao-e-estrategia |
| `digital-workplace-agentico` | p2 | Estudo técnico | Estudo | engenharia-agentica, gestao-e-estrategia |
| `acessibilidade` | p2 | Case técnico | Experiência | acessibilidade-e-design |
| `especificacao-conversacional` | p2 | Ensaio | Proposta | especificacao-e-desenvolvimento, engenharia-agentica |
| **`boutique-empresarial-showcase`** | p2 | **Case técnico** (Q3) | Experiência | especificacao-e-desenvolvimento, engenharia-agentica |
| `devops-salesforce` | p3 | Guia prático | Referência | salesforce-e-vendas, engenharia-agentica |
| `proposta-engenharia-reversa` | p3 | Proposta técnica | Proposta | salesforce-e-vendas, engenharia-agentica |
| `salesforce-agentic-quickstart` | p3 | Tutorial | Referência | salesforce-e-vendas, ferramentas-de-ia |
| **`salesforce-agentic-dev`** | p3 | **Guia prático** (Q4) | Referência | salesforce-e-vendas, especificacao-e-desenvolvimento |
| **`socialselling`** | p3 | Documentação de projeto | **Experimento** (Q1) | salesforce-e-vendas, engenharia-agentica |
| `sustentacao` | p4 | Curso | Referência | cloud-e-confiabilidade |
| `service-operations-2-0` | p4 | Apresentação | Proposta | cloud-e-confiabilidade, gestao-e-estrategia |
| `proposta-observabilidade-mobile` | p4 | Proposta técnica | Proposta | cloud-e-confiabilidade |
| `life` | trajetória | Narrativa pessoal | Experimento | tecnologia-e-cultura |
| `life3d` | trajetória | Narrativa pessoal | Experimento | — |
| `terminal-evolutivo` | trajetória | Narrativa pessoal | Experimento | — |
| **`lifeos`** | **fora da F1 (Q5)** | — | — | — (continua publicado em `public/`, sem link) |

Contagem por natureza: Estudo 13 · Experiência 4 · Proposta 5 · Referência 5 · Experimento 5 (32 páginas; sem o `lifeos`).
Contagem por tema (nas 29 páginas dos pilares): engenharia-agentica 15 · gestao-e-estrategia 8 ·
especificacao-e-desenvolvimento 6 · salesforce-e-vendas 5 · aprendizagem-e-mente 4 ·
cloud-e-confiabilidade 3 · dados-e-decisao 2 · ferramentas-de-ia 2 · tecnologia-e-cultura 2 ·
acessibilidade-e-design 1.

Observação: "engenharia-agentica" em 15 das 29 páginas mostra que o tema é largo demais para
servir de filtro sozinho. Não muda a F1, mas vale olhar quando o catálogo ganhar filtro por tema.

---

# Parte 2 — F1b: cabeçalho comum em todas as páginas públicas

> Origem: [`PROPOSTA-REESTRUTURACAO.md`](PROPOSTA-REESTRUTURACAO.md), decisão D6 (b), tomada pelo
> autor em 10/11/2026. Depende da F1 (Parte 1), que cria a seção `entradas` do YAML. Requisitos: **RF-F1b-xx**. Critérios de aceite: **CA-F1b-xx**.

## F1b.1 Objetivo

Toda página pública passa a ter o mesmo cabeçalho, com quatro entradas: **Início · Trajetória ·
Produção · Vídeos**. O visitante que chega por busca a qualquer artigo tem sempre o mesmo caminho
para o autor e para o resto da produção (problema P3 da proposta).

## F1b.2 Situação de partida (fatos, commit `791f623`)

Levantamento do primeiro `<nav>` e dos `<header>` de cada página pública:

| Grupo | Páginas | O que existe hoje |
| :-- | :-- | :-- |
| G-A Entradas e legais | `index`, `curriculo`, `catalogo`, `videos`, `temas/*`, `privacidade`, `termos`, `cookies`, `404` | cabeçalho próprio, com rótulos diferentes (ex.: home "Sobre · Experiência · Formação…", catálogo "Início · Sobre Mim · Experiência · Catálogo"); legais sem navegação |
| G-B Trilha própria | `acessibilidade`, `agent-ready`, `aprendizagem-autorregulada`, `aprendizagem-autorregulada-artigo`, `capacidade-antes-do-acesso`, `case-agents`, `curiosidade-e-investigacao`, `da-execucao-a-orquestracao`, `develop-engineering`, `digital-workplace-agentico`, `engenharia-agentes-ia`, `engenharia-confianca`, `especificacao-conversacional`, `formulacao-de-problemas` (14) | `<nav>` de trilha da página ("Seções do case", "Marcos do artigo"), em geral `position: fixed` ou `sticky` |
| G-C Barra de site própria | `artifice`, `devin`, `devops-salesforce`, `knowledge-os-presentation`, `proposta-observabilidade-mobile`, `salesforce-agentic-dev`, `salesforce-agentic-quickstart`, `socialselling`, `service-operations-2-0` (9) | barra superior fixa com links da página ou do site, escrita com Tailwind |
| G-D Sem navegação ou especiais | `know`, `sustentacao`, `proposta-engenharia-reversa`, `operacao-capital-cognitivo`, `boutique-empresarial-showcase`, `apresentacao` (paleta própria, ADR-ap-001), `life`, `life3d`, `terminal-evolutivo` (experiências imersivas) (9) | nada, ou navegação própria do experimento |

Também: `<eco-nav>` (botão flutuante) em 24 arquivos; `cookie-consent.js` em 39 páginas (não é
lugar para o cabeçalho: o cabeçalho não pode depender de JavaScript).

Fora do escopo: páginas não listadas (`proposta`, `entrevista-acessibilidade-streaming`),
utilitárias (`admin`, `diagnostic` etc.) e o `lifeos` (Q5). Elas não recebem o cabeçalho.

## F1b.3 Decisões de desenho (decididas pelo autor em 10/11/2026)

| Id | Questão | Padrão adotado | Por quê |
| :-- | :-- | :-- | :-- |
| DS-1 | O cabeçalho fica fixo no topo ao rolar? | **Sim** (Q6, contra a recomendação inicial). Fica sempre visível no topo. | O autor quer o caminho sempre à vista. Custo: as 23 páginas com barra fixa ou trilha `sticky` (G-B, G-C) precisam descer abaixo do cabeçalho, e o foco não pode ficar encoberto (WCAG 2.4.11). Ver RF-F1b-15 e RF-F1b-16. |
| DS-2 | O que acontece com o `<eco-nav>`? | **Sai** no último lote, quando todas as páginas tiverem o cabeçalho (Q7). O mapa dos pilares já está no catálogo. | Evita dois menus globais. |
| DS-3 | No celular, menu hambúrguer? | **Sim** (Q8, contra a recomendação inicial). Abaixo de 640 px, um botão abre e fecha a lista das 4 entradas. | Com o cabeçalho fixo, uma linha só ocupa menos tela. Custo: JavaScript pequeno e um padrão interativo novo, registrado em `A11Y-DECISIONS.md`. Ver RF-F1b-17. |
| DS-4 | Rótulos em inglês | **Home · Career · Work · Videos** (Q9), fixos no gerador. | Evita traduções literais do Argos ("Trajectory", "Production"). Ver RF-F1b-14. |

## F1b.4 Requisitos

### F1b.4.1 Conteúdo e comportamento

- **RF-F1b-01.** O cabeçalho tem o nome "Maurício Yokoyama Issei" (link para `/`) e uma lista com
  as quatro entradas, nesta ordem: Início (`/`), Trajetória (`/curriculo`), Produção
  (`/catalogo`), Vídeos (`/videos.html`, absoluto: sem gêmeo `/en/` na fase 1 dos vídeos).
- **RF-F1b-02.** Rótulos e URLs vêm da seção `entradas` do YAML (Parte 1, RF-F1-03). Nenhum rótulo é
  escrito no HTML à mão.
- **RF-F1b-03.** A entrada da área atual tem `aria-current="page"` na própria página de entrada e
  `aria-current="true"` nas páginas da área: páginas dos pilares → Produção; narrativas da
  trajetória → Trajetória; fichas de vídeo e temas → Vídeos.
- **RF-F1b-04.** Os links funcionam sem JavaScript. O HTML é inserido no build pelo gerador
  (§F1b.4.3), não no navegador. O JavaScript só controla o botão do celular (RF-F1b-17); sem ele,
  a lista fica aberta.
- **RF-F1b-05.** Fica depois do link "Pular para o conteúdo". Toda página do escopo tem esse link;
  a que não tem ganha um.

### F1b.4.2 Semântica e acessibilidade

- **RF-F1b-06.** Marcação: `<header class="sh">` como filho direto de `<body>`, contendo
  `<nav aria-label="Navegação do site">` com uma `<ul>`. É o único landmark `banner` da página.
- **RF-F1b-07.** Cabeçalhos de hero que hoje são `<header>` filhos diretos de `<body>` viram
  `<div>` ou passam para dentro do `<main>`, para não haver dois `banner`. A mudança é feita na
  fonte de cada página (ou no gerador, quando a página é gerada).
- **RF-F1b-08.** Navegações próprias da página (trilhas, marcadores, sumários) continuam, com
  `aria-label` distinto de "Navegação do site".
- **RF-F1b-09.** Contraste mínimo de 4,5:1 nos links e 3:1 no indicador de foco, sobre `#0d1117`.
  Foco visível em todos os links: o cabeçalho entra em `tests/a11y/focus-visible.spec.js` e
  `tests/a11y/reflow-zoom.spec.js`.
- **RF-F1b-10.** Sem rolagem horizontal a 320 px; área de toque de pelo menos 24 × 24 px (WCAG
  2.5.8).
- **RF-F1b-15.** Cabeçalho fixo (DS-1): `position: sticky; top: 0` no `<header class="sh">`, com a
  altura em `--sh-altura` (3,5 rem). O `html` recebe `scroll-padding-top: calc(var(--sh-altura) +
  1rem)`, para âncoras e foco não ficarem embaixo do cabeçalho (WCAG 2.4.11). Página que tem uma
  segunda barra fixa ou `sticky` soma a altura dela no próprio CSS, com `html:root` (no L1: home e
  currículo). A 400 % de zoom (reflow a 320 px) o
  cabeçalho tem uma linha só, com o botão do celular.
- **RF-F1b-16.** Trilhas e barras fixas ou `sticky` das páginas (G-B, G-C) usam
  `top: var(--sh-altura)` em vez de `top: 0`, para ficarem abaixo do cabeçalho e não por cima dele.
  A trilha que era `<header>` vira `<section aria-label="Navegação da página">`. Abaixo de 640 px
  a trilha fica `position: static` e só o cabeçalho do site continua fixo (decidido na
  implementação do L2: as trilhas quebravam em várias linhas e ocupavam até um terço da tela).
- **RF-F1b-17.** Botão do celular (DS-3): abaixo de 640 px, um `<button>` com texto visível "Menu",
  `aria-expanded` e `aria-controls` apontando para a `<ul>`. Padrão *disclosure* (não `menu` ARIA).
  Enter e Espaço abrem e fecham; Esc fecha e devolve o foco ao botão; a lista fecha quando o foco
  sai dela. O script é um `<script>` clássico em linha, dentro do bloco gerado, sem dependência:
  roda assim que o cabeçalho é lido e põe a classe `sh-js`. Sem essa classe, o botão fica oculto e
  a lista fica aberta. O padrão está em `A11Y-DECISIONS.md`.

### F1b.4.3 Implementação

- **RF-F1b-11.** Novo `scripts/gen-cabecalho.mjs`, no padrão de `gen-editorial.mjs`: insere o
  cabeçalho entre `<!-- SITE-HEADER:START -->` e `<!-- SITE-HEADER:END -->`, e o CSS em linha
  (`<style id="sh-css">`) entre `<!-- SITE-HEADER-CSS:START -->` e `<!-- SITE-HEADER-CSS:END -->`
  no `<head>`. CSS e script em linha evitam um pedido a mais e o salto de layout antes de o CSS
  chegar. Os `href` são absolutos (`/`, `/curriculo.html`…), para servirem em qualquer pasta
  (`temas/`, `videos/`, `en/`). Página sem marcadores é ignorada; página com `SITE-HEADER` e sem
  `SITE-HEADER-CSS` faz o gerador falhar. Idempotente,
  com `--check` no `npm run gate`. Marcadores nunca são consumidos.
- **RF-F1b-12.** `scripts/gen-videos.mjs` e `scripts/gen-portfolio.mjs` emitem os mesmos marcadores
  nos HTML que geram, para o cabeçalho das fichas, dos temas, da home e do currículo sair do mesmo
  gerador.
- **RF-F1b-13.** Estilo no bloco `SITE-HEADER-CSS` (RF-F1b-11), namespace `.sh-*`, só com os tokens Dark Tech.
  Na página `apresentacao`, o cabeçalho usa os mesmos tokens neutros; nenhum token `ap-` é usado
  fora dos arquivos da exceção.
- **RF-F1b-14.** `/en/`: os rótulos são "Home · Career · Work · Videos" (DS-4) e o botão diz "Menu".
  Eles ficam na seção `entradas` do YAML (`label_en`) e não passam pelo Argos. O bloco
  `SITE-HEADER` do gêmeo é escrito pelo `gen-cabecalho.mjs` depois do `i18n:sync`, como os outros
  blocos gerados; ninguém edita `src/en/**` à mão. O `scripts/sync-i18n.mjs` roda o
  `gen-cabecalho.mjs` no fim de cada tradução. O bloco leva `translate="no"`. O teste confere os
  rótulos exatos.

## F1b.5 Lotes

Um PR por lote. Cada lote fecha com `i18n:sync` local e sweep de acessibilidade.

| Lote | Páginas | O que fazer além de inserir o cabeçalho | Risco |
| :-- | :-- | :-- | :-- |
| L1 | G-A (entradas e legais, incluindo as geradas: `videos.html`, 10 temas e 177 fichas de vídeo) | trocar os cabeçalhos próprios; ajustar `gen-videos` e `gen-portfolio` (RF-F1b-12) | médio: home e currículo também mudam na F2/F3. **Feito** em 10/11/2026; o gêmeo `/en/` ganha o cabeçalho no próximo `i18n:sync` local |
| L2 | G-B (14 com trilha própria) | descer a trilha fixa ou `sticky` para baixo do cabeçalho (RF-F1b-16) e conferir que nada encobre o foco | alto: o cabeçalho fixo muda o topo de todas as trilhas. **Feito** em 10/11/2026 |
| L3 | G-C (9 com barra de site própria) | retirar a barra própria; o que for navegação interna da página vira trilha (RF-F1b-08) | alto: muda o layout do topo. **Feito** em 10/11/2026: a barra fica como trilha abaixo do cabeçalho; sai a de `devin` (só tinha "Portfólio") e o link "Catálogo" de `knowledge-os-presentation` |
| L4 | G-D (9 especiais) | `apresentacao` (tokens neutros), experiências imersivas (`life3d`, `terminal-evolutivo`: cabeçalho acima da área do experimento, sem sobrepor) | alto. **Feito** em 10/11/2026: barras próprias e HUDs descem para `top: var(--sh-altura)` (estáticos abaixo de 640 px); o `role="banner"` dos HUDs de `life` e `life3d` sai; `life` e `life3d` descontam a altura do cabeçalho no tamanho do jogo; o hook do ADR-ap-001 ignora o bloco gerado |
| L5 | todas | retirar o `<eco-nav>` (DS-2): script, componente, `eco-nav.data.js`, `inject-eco-nav.mjs` e testes | baixo. **Feito** em 11/11/2026: saem o componente das 24 páginas, os dois scripts, o gerador dos dados e os testes do componente; a variável `--cc-banner-h` do banner de cookies, que só o `<eco-nav>` lia, também sai |

## F1b.6 Testes

- `tests/site-header.spec.js` (novo), em todas as páginas do escopo, PT e EN: exatamente um
  `banner`; quatro links na ordem de RF-F1b-01; `aria-current` correto (RF-F1b-03); links
  funcionam com JavaScript desligado; sem rolagem horizontal a 320 px; link de pular conteúdo antes
  do cabeçalho; cabeçalho fixo não encobre o foco nem o alvo de âncora (RF-F1b-15, RF-F1b-16);
  botão do celular a 375 px: `aria-expanded`, Enter, Espaço, Esc e retorno do foco (RF-F1b-17).
- `tests/site-header.gen.test.mjs` (novo): `gen-cabecalho.mjs --check`; toda página pública do
  sitemap tem os marcadores; rótulos iguais aos do YAML.
- Sweep de acessibilidade (`npm run a11y:sweep`) por lote: a dívida de `tests/a11y/baseline.json`
  não sobe.
- Testes existentes que mudam: `index.spec.js`, `curriculo.spec.js`, `eco-nav.spec.js` (sai no L5),
  testes de página que conferem a barra superior própria (G-C).

## F1b.7 Critérios de aceite

- **CA-F1b-01.** Depois do L4, todas as páginas públicas do sitemap (PT e EN) têm o cabeçalho, e
  nenhuma tem dois `banner`.
- **CA-F1b-02.** Nenhuma barra de site própria sobra (G-C), e as trilhas de página (G-B) continuam
  funcionando.
- **CA-F1b-03.** `npm run gate` verde em cada lote; baseline de acessibilidade igual ou menor.
- **CA-F1b-04.** Depois do L5, nenhuma página carrega `eco-nav.js`.
- **CA-F1b-05.** Nenhuma URL muda.

## F1b.8 Documentos a atualizar no mesmo PR do L1

`A11Y-DECISIONS.md` (padrão do cabeçalho comum, cabeçalho fixo e botão *disclosure* do celular), `ECOSYSTEM.md` (seção `entradas`),
`docs/specs/STYLE_GUIDE.md` (componente `.sh-*`).

## Anexo B — Respostas do autor às questões de confirmação (10/11/2026)

| # | Questão | Resposta | Onde muda |
| :-- | :-- | :-- | :-- |
| Q1 | Natureza do `socialselling` | Experimento | Anexo A |
| Q2 | Formato da `engenharia-confianca` | Jornada (formato novo; mantém "Jornada · 4 módulos") | RF-F1-09, Anexo A |
| Q3 | Formato da `boutique-empresarial-showcase` | Case técnico | RF-F1-10, Anexo A |
| Q4 | Formato do `salesforce-agentic-dev` | Guia prático | RF-F1-09, RF-F1-10, Anexo A |
| Q5 | O que fazer com o `lifeos` | Fica fora do catálogo, do YAML e do cabeçalho por ora | RF-F1-04, RF-F1-06, INV-3, INV-7, CA-F1-02, F1b.2 |
| Q6 | Cabeçalho fixo? (DS-1) | Sim, fixo no topo | DS-1, RF-F1b-15, RF-F1b-16, L2 |
| Q7 | O `<eco-nav>` sai? (DS-2) | Sim, no lote L5 | DS-2 |
| Q8 | Celular (DS-3) | Botão hambúrguer | DS-3, RF-F1b-04, RF-F1b-17 |
| Q9 | Rótulos em inglês | Home · Career · Work · Videos | DS-4, RF-F1b-14 |

# Parte 3 — F2: trajetória completa em `/curriculo`

> Origem: [`PROPOSTA-REESTRUTURACAO.md`](PROPOSTA-REESTRUTURACAO.md), §6.2, §7 (linha `/curriculo`),
> §8.4 e §12 (F2); decisão D2 do autor (10/11/2026). Requisitos: **RF-F2-xx**. Critérios de aceite:
> **CA-F2-xx**.

## F2.1 Objetivo

Dar à Trajetória (`/curriculo`) tudo o que prova a experiência: Sobre, Mapa de Linhas,
competências por linha, resultados quantificados, experiência com os projetos STAR, formação,
certificações, recomendações e contato. Depois da F2, nada do conteúdo atual da home fica sem
lugar no currículo, e a F3 pode reescrever a home.

## F2.2 Situação de partida (fatos, commit `20bb6ef`)

| Item | Estado |
| :-- | :-- |
| Home (`src/index.html`) | Bloco `PF:START/END` gerado por `gen-portfolio.mjs`: hero, Sobre, Mapa de Linhas, competências por linha, resultados, experiência com 19 projetos STAR inline, formação, certificações, trilhas Alura, recomendações e rodapé. Estilo em `src/index.css` (ADR-pf-001). |
| Currículo (`src/curriculo.html`) | Versão clássica, com os blocos `CV:*` do mesmo gerador, Tailwind (`input.css`), Font Awesome e um modal para o STAR (`src/js/curriculo.js`). Não tem Mapa de Linhas nem resultados. |
| Gêmeo `public/curriculo.md` | Gerado do `cv.json`; já tem o conteúdo completo. |

## F2.3 Decisão de desenho (recomendada; o autor confirma no cartão de decisão da thread)

**DF2-1.** O `/curriculo` passa a usar o mesmo bloco gerado da home atual (padrão `pf-`), e a
versão clássica sai. Motivo: o bloco `PF` já cobre tudo o que a versão clássica mostra, com o STAR
inline (sem modal) e sem Tailwind nem Font Awesome. Um só gerador e uma só aparência alimentam a
Trajetória.

## F2.4 Requisitos

- **RF-F2-01.** `src/curriculo.html` contém um bloco `<!-- PF:START … PF:END -->` gerado por
  `gen-portfolio.mjs`, com o mesmo conteúdo do bloco da home. Os blocos `CV:*` saem.
- **RF-F2-02.** O `<head>` do currículo mantém título, descrição, `canonical`, OG, JSON-LD e o bloco
  AEO. Troca `input.css` e Font Awesome por `index.css`.
- **RF-F2-03.** O escopo da exceção de paleta do ADR-pf-001 passa a incluir `src/curriculo.html`,
  que carrega `src/index.css`. Nenhuma cor nova; os hexadecimais continuam só em `src/index.css`.
- **RF-F2-04.** A barra de seções do currículo é a mesma da home (`.pf-nav`, "Seções da página"),
  abaixo do cabeçalho comum.
- **RF-F2-05.** Saem `src/js/curriculo.js` e o modal. O rodapé gerado deixa de ter o link
  "Currículo em formato clássico" e passa a ter "Trajetória completa" (`/curriculo.html`) só na home.
- **RF-F2-06.** A home não muda de conteúdo na F2. O conteúdo fica duplicado entre `/` e
  `/curriculo` até a F3, com `canonical` próprio em cada página.
- **RF-F2-07.** `public/curriculo.md` continua gerado e igual.

## F2.5 Testes

- `tests/curriculo.spec.js` passa a conferir o bloco `pf-`: um `h1`; 19 cartões STAR; o Mapa de
  Linhas com 7 linhas; o quadro de resultados; as certificações; as recomendações; nenhum
  `fetch` em runtime; axe sem violações sérias, agora **sem** exceção de contraste.
- `index.spec.js` e `index.nojs.spec.js` continuam como estão (a home não muda).
- `site-header.spec.js`: o caso "a barra de seções do currículo fica abaixo do cabeçalho" passa
  a usar `.pf-nav`.
- `portfolio.tokens.test.mjs` continua (hexadecimais só em `index.css`).

## F2.6 Critérios de aceite

- **CA-F2-01.** Todo item de conteúdo da home atual existe em `/curriculo`.
- **CA-F2-02.** `/curriculo` não carrega `input.css`, Font Awesome nem `curriculo.js`.
- **CA-F2-03.** A catraca de acessibilidade não sobe em `curriculo.html` nem em `en/curriculo.html`.
- **CA-F2-04.** `gen-portfolio.mjs --check` passa no gate.

---

# Parte 4 — F4: natureza visível no topo das páginas

## F4.1 Objetivo

Decisão D5(a): o visitante vê a natureza de cada conteúdo (Experiência, Estudo, Proposta,
Experimento ou Referência) no cartão do catálogo e no topo da página. O cartão já mostra a
natureza desde a F1 (`gen-catalogo.mjs`). A F4 leva o rótulo ao topo das 32 páginas do YAML.

## F4.2 Lotes

| Lote | Páginas | Onde fica o rótulo |
| :-- | :-- | :-- |
| F4a | as 12 com quadro editorial (`editorial.data.mjs` com `kind`) | um item "Natureza" no quadro `ed-facts`, antes de "Formato" |
| F4b | as outras 20 (inclui `know`, que só tem a continuação) | rótulo gerado entre marcadores `NATUREZA:*`, perto do `h1` |

## F4.3 Requisitos do lote F4a

- **RF-F4-01.** `gen-editorial.mjs` lê a natureza do nó no YAML (`specs/ecosystem.nav.yaml`) pela
  chave do slug. O rótulo por extenso vem de `NATUREZAS` (`scripts/catalogo/dados.mjs`). A
  natureza não é digitada em `editorial.data.mjs`.
- **RF-F4-02.** O quadro `ed-facts` ganha `<div class="ed-fact"><dt>Natureza</dt><dd>…</dd></div>`
  antes de "Formato". Sem heading novo e sem CSS novo.
- **RF-F4-03.** Página com camada editorial e sem nó no YAML, ou com natureza fora da lista, faz o
  gerador falhar.
- **RF-F4-04.** `public/catalogo.md` e `public/llms.txt` ainda não listam a natureza de cada
  item. Eles entram no lote F4b.

## F4.4 Testes e aceite

- `tests/editorial-layer.test.mjs`: toda página com camada editorial mostra "Natureza" com o
  rótulo do YAML.
- **CA-F4-01.** `gen-editorial.mjs --check` passa no gate.
- **CA-F4-02.** A catraca de acessibilidade não sobe nas 12 páginas nem nos espelhos `/en/`.

## F4.5 Requisitos do lote F4b

- **RF-F4-05.** Os lotes cobrem os 32 nós do YAML sem sobreposição: página com quadro editorial
  fica no F4a; as demais 20 ficam no F4b.
- **RF-F4-06.** `scripts/gen-natureza.mjs` preenche, entre `<!-- NATUREZA:START -->` e
  `<!-- NATUREZA:END -->`, um parágrafo `<p class="nat-rotulo">Natureza: …</p>` com o valor do YAML.
  Os marcadores ficam logo antes do `<h1>`. Sem heading novo.
- **RF-F4-07.** O estilo é inline e não tem hexadecimal: o rótulo herda a cor do texto da página
  (vale também em `apresentacao.html`). Página do F4b sem marcadores faz o gerador falhar.
- **RF-F4-08.** Em `public/catalogo.md`, cada item de nó começa com a natureza em itálico. O
  `public/llms.txt` aponta para o `catalogo.md` como fonte da natureza; não repete a lista.
- **RF-F4-09.** `gen-natureza.mjs --check` roda no gate. O espelho `/en/` recebe o rótulo
  traduzido pelo Argos, como o resto da página.

## F4.6 Testes e aceite do F4b

- `tests/natureza.gen.test.mjs`: os dois lotes cobrem todos os nós; cada página do F4b tem um
  bloco só, com o rótulo do YAML, sem heading e sem hexadecimal, logo antes do `<h1>`.
- **CA-F4-03.** `gen-natureza.mjs --check` passa no gate.
- **CA-F4-04.** A catraca de acessibilidade não sobe nas 20 páginas nem nos espelhos `/en/`.

---

# Parte 5 — F5: relações entre temas, artigos e trajetória

## F5.1 Objetivo e lotes

Decisão D7(b): cada página autoral tem de 1 a 3 temas no YAML. A F5 usa esses temas e a natureza
para ligar o conteúdo (PROPOSTA §9.5).

| Lote | O que liga |
| :-- | :-- |
| F5a | a página de cada tema (`/temas/<tema>`) lista os artigos do site com aquele tema, antes dos vídeos |
| F5b | página de natureza "Experiência" liga ao projeto STAR em `/curriculo`, quando houver um |
| F5c | continuação "Se este tema interessa" nas páginas autorais que ainda não têm |

F5b e F5c precisam de escolha do autor (qual projeto STAR, quais continuações). Ficam para depois
do F5a.

## F5.2 Requisitos do lote F5a

- **RF-F5-01.** `gen-videos.mjs` lê os nós do YAML que têm `temas` (`artigosDoYaml()`) e passa a
  lista ao `build()`. Os testes com fixture não leem o YAML.
- **RF-F5-02.** A página do tema ganha a seção "Artigos e páginas" (`<h2>`), antes de uma nova seção
  "Vídeos" (`<h2>`). Cada item tem o título com link, natureza e formato, e o texto do cartão.
- **RF-F5-03.** O JSON-LD `CollectionPage` inclui os artigos como `WebPage` em `hasPart`. O `.md` do
  tema ganha a mesma seção.
- **RF-F5-04.** Tema do YAML que não existe em `content/temas.yml` faz o gerador falhar.
- **RF-F5-05.** Sem CSS novo: os itens usam as classes que o gerador já tem (`.lista`, `.box`,
  `.aviso`). As páginas de tema não têm gêmeo `/en/` (fase 1 dos vídeos).

## F5.3 Testes e aceite do F5a

- `tests/videos.gen.test.mjs`: a seção aparece antes dos vídeos, com natureza e formato, no HTML,
  no JSON-LD e no `.md`; tema inexistente falha; todo tema tem ao menos um artigo, e todo artigo
  aponta para uma página que existe.
- **CA-F5-01.** Todo tema com pelo menos 1 artigo (aceite da F5 na PROPOSTA §12).
- **CA-F5-02.** axe (WCAG 2.2 AA) sem violação séria ou crítica nas 10 páginas de tema. A
  catraca (`a11y-sweep`) não cobre `/temas/`.

## F5.4 Lote F5b: nada a ligar hoje

As 4 páginas de natureza "Experiência" (`agent-ready`, `case-agents`, `acessibilidade`,
`boutique-empresarial-showcase`) são projetos do autor fora do emprego. Nenhuma corresponde a um
projeto STAR de `cv.json`. A regra da PROPOSTA §9.5 vale "quando houver um": hoje não há. Página
nova de Experiência com projeto STAR ganha o link no PR que a cria.

## F5.5 Requisitos do lote F5c

- **RF-F5-06.** `scripts/gen-continuacao.mjs` preenche, entre `<!-- CONTINUACAO:START -->` e
  `<!-- CONTINUACAO:END -->`, um `<nav>` "Se este tema interessa a você" com 2 páginas. Os
  marcadores ficam logo antes do último `</main>`. Vale para os nós do YAML que não têm a
  continuação escrita pelo autor (`next` em `editorial.data.mjs`).
- **RF-F5-07.** A escolha é mecânica: páginas com tema em comum, por (1) mais temas em comum,
  (2) mesmo pilar, (3) ordem do YAML. Se faltar, completa com páginas do mesmo pilar. O motivo é só
  o fato: "Também em <tema>." ou "Também no pilar <pilar>.". O gerador não escreve texto na voz
  do autor.
- **RF-F5-08.** Ficam de fora: `life` e `life3d` (imersivas: o `<main>` é a cena) e páginas sem
  tema (`terminal-evolutivo`).
- **RF-F5-09.** Estilo inline, sem hexadecimal. O link herda a cor do texto e fica sublinhado,
  para não cair no azul padrão do navegador em página sem estilo de link (contraste).
- **RF-F5-10.** Para trocar a continuação gerada por texto próprio, o autor escreve `next` em
  `editorial.data.mjs` e tira o marcador `CONTINUACAO` da página. `gen-continuacao.mjs --check`
  roda no gate.

## F5.6 Testes e aceite do F5c

- `tests/continuacao.gen.test.mjs`: cobertura (quem tem e quem não tem), 2 sugestões válidas por
  página, motivo coerente com tema ou pilar, sem heading, sem hexadecimal, dentro do `<main>`, em
  dia com o gerador.
- **CA-F5-03.** A catraca de acessibilidade não sobe nas 26 páginas nem nos espelhos `/en/`.

---

# Parte 6 — F3: home editorial

> Origem: [`PROPOSTA-REESTRUTURACAO.md`](PROPOSTA-REESTRUTURACAO.md), §8 e §12 (F3); decisões D1 (a) e
> D2 (a) do autor (10/11/2026). Em 11/11/2026 o autor escolheu, no cartão de decisão da thread, que
> o agente escreve o rascunho só com fatos de `cv.json` e do YAML e faz o merge com CI verde; o autor
> ajusta o texto depois. Requisitos: **RF-F3-xx**. Critérios de aceite: **CA-F3-xx**.

## F3.1 Objetivo

A home deixa de repetir o currículo. Em até ~3 min de leitura, ela diz quem é o autor, mostra os
4 pilares da produção, algumas provas e destaques, e leva às três portas: Trajetória, Produção e
Vídeos. Todo o conteúdo que sai da home já está em `/curriculo` desde a F2.

## F3.2 Situação de partida (fatos, commit `3d0a37e`)

| Item | Estado |
| :-- | :-- |
| Home (`src/index.html`) | Bloco `PF:START/END` igual ao de `/curriculo`: ~25 min de leitura, 19 projetos STAR, formação, certificações e recomendações. Sem link para artigo. |
| `/curriculo` | Mesmo bloco `PF` (F2). Âncoras `#mapa`, `#results`, `#experience` e `p-<ano>-<projeto>`. |
| `<head>` da home | Título, descrição, OG, JSON-LD `Person`/`ProfilePage`/`ItemList` (bloco `AEO`, gerado por `build-aeo.mjs`). |

## F3.3 Decisões de desenho (do agente, sob a escolha do autor)

- **DF3-1.** O bloco continua `PF:START/END` e continua gerado por `gen-portfolio.mjs`, mas a home
  recebe outro conteúdo (`homeBlock`); `/curriculo` fica como está. Um gerador só, sem marcador novo.
- **DF3-2.** As escolhas do autor (§8.2 da proposta: provas, páginas de entrada por pilar e destaques)
  ficam em três listas no topo de `gen-portfolio.mjs`, como a lista `FEATURED` das certificações.
  O texto vem literal de `cv.json` (nome, título, resumo, resultados, linhas) e do YAML (pilares,
  títulos, formato, natureza, descrição). A única frase nova é o subtítulo do que o site publica.
- **DF3-3.** Escolhas iniciais, todas trocáveis pelo autor:
  - Provas (4): os resultados com número dos projetos "Pipe Automática Comercial" (15%),
    "Evolução do Credenciamento no Plano Padrão" (D0), "Revisão orçamentária de fornecedores" (500k)
    e "Revisão orçamentária e CINVEST do novo contrato Salesforce" (3MM).
  - Entradas por pilar: p1 `formulacao-de-problemas` e `da-execucao-a-orquestracao`; p2
    `apresentacao` e `engenharia-confianca`; p3 `salesforce-agentic-quickstart` e
    `devops-salesforce`; p4 `sustentacao` e `service-operations-2-0`.
  - Destaques (4): `agent-ready` (Experiência), `engenharia-agentes-ia`, `knowledge-os-presentation`
    e `acessibilidade` (Experiência). Nenhum repete uma entrada de pilar.

## F3.4 Requisitos

- **RF-F3-01.** Sequência do `<main>` (§8.2): Sobre; Pilares; Provas com o Mapa de Linhas resumido;
  Destaques. O hero fica antes do `<main>` e o contato no rodapé, como hoje.
- **RF-F3-02.** Hero: `h1` com `cv.Nome`; `cv.Titulo`; `cv.ResumoHero`; a frase "Aqui publico
  estudos, propostas e experimentos sobre engenharia de software e IA em produção."; três botões:
  "Ver carreira" (`/curriculo.html`), "Explorar os projetos" (`/catalogo.html`) e "Vídeos"
  (`/videos.html`); as redes sociais. Rótulos trocados pelo autor em 11/11/2026, porque o
  tradutor local gerava "View path" e "Exploring production" no espelho `/en/`.
- **RF-F3-03.** Sobre: os dois primeiros parágrafos de `cv.Resumo`, literais, e o link "Ver a
  trajetória completa".
- **RF-F3-04.** Pilares: os 4 pilares do YAML na ordem, cada um com rótulo, subtítulo, `summary` e
  as páginas de entrada (título do cartão e natureza). Link "Ver todo o catálogo".
- **RF-F3-05.** Provas: cada item é um resultado de `cv.json` transcrito sem edição, com o projeto e
  o ano, e link para o cartão STAR em `/curriculo.html#p-…`. O gerador quebra se a frase escolhida
  não existir mais no `cv.json`. Abaixo, o Mapa de Linhas resumido: as 7 linhas com sigla, grupo e
  ano de início, sem projetos, e o link "Ver o mapa completo" (`/curriculo.html#mapa`).
- **RF-F3-06.** Destaques: 3 a 4 cartões com título, formato e natureza visíveis e a descrição do
  YAML; pelo menos um de natureza Experiência. O gerador quebra se um slug escolhido não existir.
- **RF-F3-07.** A barra `.pf-nav` da home aponta para as seções novas (Sobre, Pilares, Provas,
  Destaques, Contato). O rodapé mantém contato, redes, "Trajetória completa", catálogo, a nota de
  dados para máquina e os links legais.
- **RF-F3-08.** O `<head>` não muda: mesmo título, descrição, `canonical`, OG e JSON-LD (invariante 3
  da §11.2). A nota do rodapé diz que o JSON-LD reflete o currículo completo de `/curriculo`.
- **RF-F3-09.** Leitura de no máximo 3 min (600 palavras a 200 ppm) no `<main>`.
- **RF-F3-10.** Sem cor nova: classes `pf-` em `src/index.css`, com os tokens que já existem.
- **RF-F3-11.** O "Comece por aqui" do catálogo ("avaliar o profissional") passa a apontar para
  `/curriculo.html`.

## F3.5 Testes

- `tests/index.spec.js` passa a cobrir a home nova: um `h1`; as três portas; 4 pilares com entradas
  que existem; provas iguais a frases do `cv.json` e com alvo em `/curriculo`; 7 linhas no mapa
  resumido; destaques com natureza e pelo menos uma Experiência; JSON-LD igual ao de antes;
  leitura de no máximo 3 min; sem rolagem horizontal a 375 px; axe sem violações sérias.
- Os casos do currículo completo (STAR, certificações, recomendações, mapa) passam para
  `/curriculo.html`, no mesmo arquivo.
- `tests/index.nojs.spec.js`: o teste "todo texto do cv.json no DOM" fica só para `/curriculo`; a
  home sem JS mostra hero, pilares e provas.

## F3.6 Critérios de aceite

- **CA-F3-01.** A home responde, sem rolar além das seções, às 5 perguntas da §8: quem é, o que faz,
  o que publica, por onde começar e como falar com ele.
- **CA-F3-02.** Toda frase de resultado da home existe literal no `cv.json`.
- **CA-F3-03.** A catraca de acessibilidade não sobe em `index.html` nem em `en/index.html`.
- **CA-F3-04.** `gen-portfolio.mjs --check` passa no gate.

## F3.7 Ajuste depois do merge (11/11/2026)

- **RF-F3-12.** O tradutor local não envia o nome do autor ao modelo: `NOMES_PROTEGIDOS` em
  `scripts/i18n/engine.py` usa o mesmo marcador das siglas compostas. Antes, "Maurício" saía
  "Mauritius" nos espelhos `/en/`. Teste: `tests/i18n.test.mjs`. Os espelhos afetados são
  traduzidos de novo no mesmo PR.

## F3.8 Gêmeo Markdown da home (11/11/2026)

> Origem: conferência de uma auditoria externa (11/11/2026). A função do CloudFront entrega
> `public/index.md` a quem pede Markdown. O arquivo era escrito à mão e estava velho: sem Temas nem
> Destaques e com outro cargo. Escolha do autor: gerar o arquivo das mesmas fontes da home.

- **RF-F3-13.** `gen-portfolio.mjs` grava `public/index.md` inteiro, como já faz com
  `public/curriculo.md`. Conteúdo, na ordem da home: nome, `cv.Titulo`, `cv.ResumoHero` e a frase do
  que o site publica; Sobre (os dois primeiros parágrafos de `cv.Resumo`); os 10 temas com link para
  `/temas/<id>` e o total; Provas (as mesmas da home, com link para `/curriculo#p-…`); Destaques (a
  mesma lista `DESTAQUES`, com formato, natureza e descrição do YAML); os arquivos para agentes de IA;
  o contato. Nenhuma frase nova além dos rótulos das seções.
- **RF-F3-14.** O `--check` do gerador, que já roda no gate, cobra que `public/index.md` esteja em dia.
  Teste: `tests/portfolio.indexmd.test.mjs`.

---

# Parte 7 — Saída do Mapa de Linhas

> Origem: pedido do autor em 11/11/2026. Ele mostrou o mapa a algumas pessoas: a metáfora (linhas de
> metrô, estações, empregadores que cruzam linhas) confundiu e não ajudou a entender a trajetória.
> Requisitos: **RF-F7M-xx**.

## F7M.1 Requisitos

- **RF-F7M-01.** Sai o Mapa de Linhas de `/curriculo` (grade, legenda, nota de leitura) e o resumo
  da home. Saem também as metáforas visuais de linha: as faixas do hero, o feixe lateral, os
  "trilhos" do fundo, as siglas de linha nos empregadores e a cor por linha nos cartões STAR.
- **RF-F7M-02.** "Competências por linha" vira "Competências": um cartão por grupo de
  `cv.Habilidades`, na ordem do `cv.json`, sem sigla nem ano de início.
- **RF-F7M-03.** Nenhum conteúdo do `cv.json` some de `/curriculo` (o teste sem JS confere).
- **RF-F7M-04.** A paleta `pf-` fica (ADR-pf-001). Nenhuma cor nova.
- **RF-F7M-05.** Uma nova forma de mostrar a trajetória é decisão do autor, depois desta remoção.

## F7M.2 Testes

- `tests/index.spec.js`: `/curriculo` sem `#mapa`, `.pf-metro`, `.pf-grid` nem `[data-l]`; os
  cartões de competências seguem os grupos do `cv.json`.
- `tests/curriculo.spec.js` e `tests/index.nojs.spec.js`: os cartões de competências substituem a
  legenda e a grade.

---

# Parte 8 — Temas no lugar dos pilares, nomes únicos e saída do painel

> Origem: decisões do autor em 11/11/2026, depois da reflexão sobre a arquitetura de informação.
> A. os 10 temas de `content/temas.yml` substituem os 4 pilares para o visitante;
> B. as áreas se chamam **Carreira** e **Conteúdos** em todo lugar;
> C. o painel administrativo sai; as outras páginas utilitárias ficam como estão por ora.
> Requisitos: **RF-F8-xx**.

## F8.1 Requisitos — nomes das áreas (B)

- **RF-F8-01.** Cabeçalho comum: Início · Carreira · Conteúdos · Vídeos. Em inglês: Home · Career ·
  Content · Videos (fonte: `entradas` do YAML).
- **RF-F8-02.** O mesmo nome aparece no botão da home ("Ver carreira", "Explorar os conteúdos"),
  no `<title>`, no Open Graph e no JSON-LD de `/curriculo` ("Carreira") e de `/catalogo`
  ("Conteúdos"), e nos textos gerados que citam a área. As URLs não mudam.

## F8.2 Requisitos — temas no lugar dos pilares (A)

- **RF-F8-03.** O catálogo agrupa os conteúdos pelos 10 temas. Ordem: total de conteúdos do tema
  (decrescente) e, no empate, a ordem de `content/temas.yml`.
- **RF-F8-04.** Cada conteúdo tem **um** cartão, no seu primeiro tema (o tema principal, primeiro da
  lista `temas` do nó). Os conteúdos em que o tema é secundário aparecem numa linha "Também tratam
  deste tema", com link, sem cartão repetido. Cada seção liga à página `/temas/<tema>` (artigos e
  vídeos do tema). A etiqueta do cartão mostra só o formato: o campo `assunto` do YAML, um terceiro
  vocabulário de assunto, deixa de aparecer. A linha de meta diz a natureza e os outros temas
  ("Também em: …").
- **RF-F8-05.** O índice do topo do catálogo lista os 10 temas (âncora `#tema-<id>`) no lugar da
  trilha dos pilares. A seção "Carreira e vídeos" continua no fim.
- **RF-F8-06.** A home troca "Pilares da produção" por "Temas": os 10 temas com o número de
  conteúdos, cada um com link para a seção do tema no catálogo. Saem as páginas de entrada por
  pilar. O limite de 600 palavras no `<main>` continua.
- **RF-F8-07.** A continuação "Se este tema interessa a você" não cita pilar. Quando faltar página
  com tema em comum, ela completa com páginas da mesma natureza ("Também de natureza <natureza>.").
- **RF-F8-08.** Nenhuma página mostra pilar ao visitante: sai o rótulo "P2 · Engenharia de
  Confiança" de `case-agents` e a linha "Mentalidade → Método → Aplicação → Valor" do rodapé do
  catálogo. O gêmeo `public/catalogo.md` segue a mesma ordem por tema.
- **RF-F8-09.** O campo `pillar` e o bloco `pillars` ficam no YAML como dado interno (validação do
  grafo e marcação de "Conteúdos" no cabeçalho). Nenhum gerador publica o nome de um pilar.

## F8.3 Requisitos — painel administrativo (C)

- **RF-F8-10.** Saem `src/admin.html`, `src/admin-editor.html` e `src/js/admin-ui.js`, e as
  referências a eles no build, na auditoria, na catraca e nos testes. `diagnostic`, `test-github`,
  `vsl`, `mapmind` e `exemplopdi` não mudam (decisão C). `src/js/github-service.js` fica: o
  `test-github` usa.
- **RF-F8-11.** (decisão do autor, 11/11/2026) Sai dos Termos de uso a seção "Cadastro e conta",
  que descrevia o painel. As seções seguintes são renumeradas e o histórico ganha a v2.1.

## F8.4 Testes

- `tests/ecosystem.schema.test.mjs` e `tests/site-header.gen.test.mjs`: rótulos novos em PT e EN.
- `tests/site-header.spec.js`: cabeçalho com Carreira e Conteúdos.
- `tests/catalogo.gen.test.mjs` (ou o teste do catálogo existente): 10 seções de tema na ordem do
  RF-F8-03; cada nó do catálogo tem exatamente um cartão; nenhum nome de pilar no bloco gerado.
- `tests/index.spec.js`: seção "Temas" com 10 links para `catalogo.html#tema-<id>`; botões novos.
- `tests/continuacao.gen.test.mjs`: nenhum motivo cita pilar.
- `tests/hreflang.spec.js`: a página sem espelho do teste deixa de ser `admin.html`.

---

# Parte 9 — Linha do tempo da carreira

> Origem: decisão do autor em 11/11/2026 ("Linha do tempo por empresa"), no lugar do Mapa de
> Linhas (Parte 7). Pedido dele: impacto visual forte, talvez com animação, e o conteúdo em texto
> objetivo sobre a carreira, não sobre a imagem. Requisitos: **RF-F9-xx**.

## F9.1 Requisitos

- **RF-F9-01.** `/curriculo` ganha a seção "Linha do tempo" (`#linha-do-tempo`), a primeira do
  `<main>`, antes de "Sobre". Gerada por `gen-portfolio.mjs` a partir de `cv.Experiencia`.
- **RF-F9-02.** O conteúdo é texto: uma frase-resumo só com fatos do `cv.json` (ano de início,
  número de empresas, cargo e empresa atuais) e uma lista ordenada (`<ol>`), do emprego mais
  antigo ao atual. Cada item diz período, cargo, empresa e duração (a duração escrita no
  `cv.json`; o emprego atual diz "até hoje") e liga ao artigo da empresa em `#experience`.
- **RF-F9-03.** O visual é decorativo (`aria-hidden="true"`): uma faixa com um bloco por empresa,
  largura proporcional ao período, em faixas paralelas quando dois períodos se sobrepõem; marcas de
  ano a cada 5 anos. O leitor de tela lê só o texto. O visual não carrega informação que o texto
  não tenha.
- **RF-F9-04.** Animação em CSS, disparada por um script inline mínimo (só troca classes, não
  insere texto): os blocos crescem da esquerda para a direita quando a seção entra na tela, uma
  vez, em até 1 s no total. Sem JavaScript, ou com `prefers-reduced-motion: reduce`, a faixa
  aparece pronta. Nenhuma animação em laço.
- **RF-F9-05.** Passar o mouse ou o foco num item da lista destaca o bloco correspondente (`:has`),
  sem mudar o layout.
- **RF-F9-06.** No celular (< 640 px), a faixa fica sobre a lista, sem rolagem horizontal a 320 px.
  Cores só de `src/index.css` (exceção `pf-`, ADR-pf-001); contraste do texto ≥ 4.5:1.
- **RF-F9-07.** O fim da escala é `FIM_DA_ESCALA` no gerador (início de 2027), para a saída não
  depender da data do build. O bloco do emprego atual vai até o fim da escala e se apaga na ponta
  direita, sinal de que continua; o texto diz "até hoje".

## F9.2 Testes

- `tests/curriculo.spec.js`: a seção é a primeira do `<main>`; a lista tem um item por emprego, na
  ordem cronológica, com cargo, empresa e link para `#<id>` que existe; o visual tem
  `aria-hidden`; sem rolagem horizontal a 320 px; axe sem violações sérias.
- `tests/index.nojs.spec.js`: sem JavaScript, a lista e a faixa aparecem.
- Movimento reduzido: com `reducedMotion: 'reduce'`, nenhum bloco tem animação ativa.
