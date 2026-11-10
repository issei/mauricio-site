---
id: SDD-F1-F1b
titulo: SDD das fases F1 (YAML 2.0.0 e catálogo gerado) e F1b (cabeçalho comum)
data: 2026-11-10
leitor: Issei (aprova o Anexo A e os padrões DS-1 a DS-3); agente que vai implementar a F1 e a F1b
padrao_de_redacao: PT-BR controlado (perfil técnico)
status: especificação — aguarda a confirmação do Anexo A; padrões DS-1 a DS-3 adotados até o autor dizer o contrário
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
- **RF-F1-04.** Uma seção nova, `trajetoria`, lista as narrativas pessoais: `life`, `life3d`,
  `terminal-evolutivo` e `lifeos`. Esses nós não pertencem a nenhum pilar.
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

- **RF-F1-06.** Entram como nós: `capacidade-antes-do-acesso`, `curiosidade-e-investigacao`,
  `aprendizagem-autorregulada`, `aprendizagem-autorregulada-artigo` (com `catalogo: false` e
  `par: aprendizagem-autorregulada`), `operacao-capital-cognitivo`, `digital-workplace-agentico` e
  `lifeos`.
- **RF-F1-07.** Mudam de pilar: `socialselling` (p5 → p3) e `boutique-empresarial-showcase`
  (p5 → p2). `index` e `videos` saem dos pilares e vão para `entradas`.
- **RF-F1-08.** Os crosslinks existentes ficam iguais.

### 3.2 Invariantes do YAML 2.0.0

Substituem os do cabeçalho do arquivo. O teste novo (§5) aplica todos.

| Id | Regra |
| :-- | :-- |
| INV-1 | todo slug de `pillars[].nodes` existe em `nodes` |
| INV-2 | `pillars` tem 4 itens, na ordem 1 a 4 |
| INV-3 | todo `file` corresponde a um arquivo real (`src/` ou, para `lifeos`, `public/`) |
| INV-4 | `crosslinks[].from` e `.to` são slugs válidos |
| INV-5 | URLs derivadas usam `meta.canonical_base`, exceto os `href` absolutos já previstos (`/videos.html`) |
| INV-6 | todo nó tem `kind` em `KINDS`, `natureza` na lista e `temas` válidos e na quantidade de RF-F1-05 |
| INV-7 | toda URL PT-BR do sitemap que é página autoral é um nó, uma entrada ou uma página legal |
| INV-8 | `src/catalogo.html` entre os marcadores é igual à saída do gerador |

### 3.3 Formatos

- **RF-F1-09.** `KINDS` ganha dois valores, que o catálogo já usa e que não cabem em nenhum
  existente: `Curso` (`sustentacao`, `salesforce-agentic-dev`) e `Áudio comentado`
  (`da-execucao-a-orquestracao`).
- **RF-F1-10.** Os demais rótulos do catálogo passam ao valor de `KINDS` indicado no Anexo A
  ("Case" → "Case técnico", "Estudo" → "Estudo técnico", "Visão geral" → "Apresentação",
  "Narrativa" → "Narrativa pessoal"). "Jornada" (`engenharia-confianca`) não tem equivalente
  claro: o Anexo A propõe "Material interativo" e pede confirmação.
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
  `descricao`, os temas como links para `/temas/<tema>` e o selo de crosslink que já existe.
  O cartão não ganha ícone nem card novo: segue o markup atual.
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
| `public/catalogo.md` | gêmeo `.md` regenerado (`check-md-twins.mjs`) |

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
  `/curriculo`, as 4 narrativas e `/videos`. Somadas, são as 33 páginas autorais.
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
Em **negrito**, as linhas em que a proposta tem dúvida e pede confirmação.

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
| **`engenharia-confianca`** | p2 | **Material interativo** (hoje "Jornada") | Estudo | engenharia-agentica |
| `engenharia-agentes-ia` | p2 | Material interativo | Estudo | engenharia-agentica |
| `develop-engineering` | p2 | Artigo | Estudo | engenharia-agentica, especificacao-e-desenvolvimento |
| `operacao-capital-cognitivo` | p2 | Simulador | Experimento | dados-e-decisao, gestao-e-estrategia |
| `agent-ready` | p2 | Tutorial | Experiência | engenharia-agentica, especificacao-e-desenvolvimento |
| `case-agents` | p2 | Case técnico | Experiência | engenharia-agentica |
| `knowledge-os-presentation` | p2 | Apresentação | Proposta | engenharia-agentica, gestao-e-estrategia |
| `digital-workplace-agentico` | p2 | Estudo técnico | Estudo | engenharia-agentica, gestao-e-estrategia |
| `acessibilidade` | p2 | Case técnico | Experiência | acessibilidade-e-design |
| `especificacao-conversacional` | p2 | Ensaio | Proposta | especificacao-e-desenvolvimento, engenharia-agentica |
| **`boutique-empresarial-showcase`** | p2 | **Documentação de projeto** (hoje "Case") | Experiência | especificacao-e-desenvolvimento, engenharia-agentica |
| `devops-salesforce` | p3 | Guia prático | Referência | salesforce-e-vendas, engenharia-agentica |
| `proposta-engenharia-reversa` | p3 | Proposta técnica | Proposta | salesforce-e-vendas, engenharia-agentica |
| `salesforce-agentic-quickstart` | p3 | Tutorial | Referência | salesforce-e-vendas, ferramentas-de-ia |
| **`salesforce-agentic-dev`** | p3 | **Curso** (hoje "Guia prático") | Referência | salesforce-e-vendas, especificacao-e-desenvolvimento |
| **`socialselling`** | p3 | Documentação de projeto | **Experiência** (o projeto foi para produção?) | salesforce-e-vendas, engenharia-agentica |
| `sustentacao` | p4 | Curso | Referência | cloud-e-confiabilidade |
| `service-operations-2-0` | p4 | Apresentação | Proposta | cloud-e-confiabilidade, gestao-e-estrategia |
| `proposta-observabilidade-mobile` | p4 | Proposta técnica | Proposta | cloud-e-confiabilidade |
| `life` | trajetória | Narrativa pessoal | Experimento | tecnologia-e-cultura |
| `life3d` | trajetória | Narrativa pessoal | Experimento | — |
| `terminal-evolutivo` | trajetória | Narrativa pessoal | Experimento | — |
| **`lifeos`** | trajetória | Narrativa pessoal | Experimento | — (página em `public/`, fora do build do Vite) |

Contagem por natureza: Estudo 13 · Experiência 5 · Proposta 5 · Referência 5 · Experimento 5 (33 páginas).
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
| G-D Sem navegação ou especiais | `know`, `sustentacao`, `proposta-engenharia-reversa`, `operacao-capital-cognitivo`, `boutique-empresarial-showcase`, `apresentacao` (paleta própria, ADR-ap-001), `life`, `life3d`, `terminal-evolutivo` (experiências imersivas), `lifeos` (em `public/`, fora do build do Vite) (10) | nada, ou navegação própria do experimento |

Também: `<eco-nav>` (botão flutuante) em 24 arquivos; `cookie-consent.js` em 39 páginas (não é
lugar para o cabeçalho: o cabeçalho não pode depender de JavaScript).

Fora do escopo: páginas não listadas (`proposta`, `entrevista-acessibilidade-streaming`) e
utilitárias (`admin`, `diagnostic` etc.). Elas não recebem o cabeçalho.

## F1b.3 Decisões de desenho (padrões adotados)

| Id | Questão | Padrão adotado | Por quê |
| :-- | :-- | :-- | :-- |
| DS-1 | O cabeçalho fica fixo no topo ao rolar? | **Não.** É estático: aparece no topo e sai com a rolagem. | 23 páginas (G-B, G-C) já têm barra fixa ou trilha `sticky`. Dois elementos fixos empilhados tiram altura útil, sobretudo no celular, e criam sobreposição (WCAG 2.4.11, foco não encoberto). |
| DS-2 | O que acontece com o `<eco-nav>`? | **Sai** no último lote, quando todas as páginas tiverem o cabeçalho. O mapa dos pilares já está no catálogo. | Evita dois menus globais. |
| DS-3 | No celular, menu hambúrguer? | **Não.** Duas linhas: nome do autor em cima, as 4 entradas embaixo. | Quatro links curtos cabem em 320 px; hambúrguer exigiria JavaScript e um padrão interativo novo (A11Y-DECISIONS.md). |

O autor pode trocar qualquer padrão antes do lote em que ele vale.

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
- **RF-F1b-04.** Funciona sem JavaScript. O HTML é inserido no build pelo gerador (§F1b.4.3), não no
  navegador.
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

### F1b.4.3 Implementação

- **RF-F1b-11.** Novo `scripts/gen-cabecalho.mjs`, no padrão de `gen-editorial.mjs`: insere o
  cabeçalho entre `<!-- SITE-HEADER:START -->` e `<!-- SITE-HEADER:END -->`, e o `<link>` do CSS
  entre `<!-- SITE-HEADER-CSS:START -->` e `<!-- SITE-HEADER-CSS:END -->` no `<head>`. Idempotente,
  com `--check` no `npm run gate`. Marcadores nunca são consumidos.
- **RF-F1b-12.** `scripts/gen-videos.mjs` e `scripts/gen-portfolio.mjs` emitem os mesmos marcadores
  nos HTML que geram, para o cabeçalho das fichas, dos temas, da home e do currículo sair do mesmo
  gerador.
- **RF-F1b-13.** Estilo em `public/site-header.css`, namespace `.sh-*`, só com os tokens Dark Tech.
  Na página `apresentacao`, o cabeçalho usa os mesmos tokens neutros; nenhum token `ap-` é usado
  fora dos arquivos da exceção.
- **RF-F1b-14.** `/en/`: o gêmeo é gerado pelo Argos a partir do português. O teste confere que os
  rótulos em inglês são exatamente "Home · Career · Work · Videos" [confirmar: rótulos]. Se o Argos
  traduzir de outro jeito, a correção vai para a fonte (ex.: marcar os rótulos conforme
  `knowledge/i18n-terminologia-argos.md`), nunca para `src/en/**`.

## F1b.5 Lotes

Um PR por lote. Cada lote fecha com `i18n:sync` local e sweep de acessibilidade.

| Lote | Páginas | O que fazer além de inserir o cabeçalho | Risco |
| :-- | :-- | :-- | :-- |
| L1 | G-A (entradas e legais, incluindo as geradas) | trocar os cabeçalhos próprios; ajustar `gen-videos` e `gen-portfolio` (RF-F1b-12) | médio: home e currículo também mudam na F2/F3; fazer L1 depois da F2 evita retrabalho no currículo |
| L2 | G-B (14 com trilha própria) | conferir que a trilha fixa ou `sticky` não encobre o foco (DS-1) | médio |
| L3 | G-C (9 com barra de site própria) | retirar a barra própria; o que for navegação interna da página vira trilha (RF-F1b-08) | alto: muda o layout do topo |
| L4 | G-D (10 especiais) | `apresentacao` (tokens neutros), experiências imersivas (`life3d`, `terminal-evolutivo`: cabeçalho acima da área do experimento, sem sobrepor), `lifeos` em `public/` | alto |
| L5 | todas | retirar o `<eco-nav>` (DS-2): script, componente, `eco-nav.data.js`, `inject-eco-nav.mjs` e testes | baixo |

## F1b.6 Testes

- `tests/site-header.spec.js` (novo), em todas as páginas do escopo, PT e EN: exatamente um
  `banner`; quatro links na ordem de RF-F1b-01; `aria-current` correto (RF-F1b-03); funciona com
  JavaScript desligado; sem rolagem horizontal a 320 px; link de pular conteúdo antes do cabeçalho.
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

`A11Y-DECISIONS.md` (padrão do cabeçalho comum e DS-1/DS-3), `ECOSYSTEM.md` (seção `entradas`),
`docs/specs/STYLE_GUIDE.md` (componente `.sh-*`).
