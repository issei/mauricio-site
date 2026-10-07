# SDD — `aprendizagem-autorregulada.html` + `aprendizagem-autorregulada-artigo.html`

**O Ciclo da Aprendizagem Autorregulada: do resumo à nova pergunta**

| Campo | Valor |
|---|---|
| Slugs | `aprendizagem-autorregulada` (landing) · `aprendizagem-autorregulada-artigo` (artigo completo) |
| Arquivos | `src/aprendizagem-autorregulada.html`, `src/aprendizagem-autorregulada-artigo.html`, CSS compartilhado `src/aprendizagem-autorregulada.css` (namespace `aa-`) |
| Ficha de estudo | `public/downloads/ficha-de-estudo-aprendizagem-autorregulada.md` (download) + seção `#ficha` no artigo |
| URLs | `https://mauricio.issei.com.br/aprendizagem-autorregulada` · `…/aprendizagem-autorregulada-artigo` |
| Gêmeos Markdown | `public/<slug>.md` gerados por `build-aeo.mjs --md` (`mdFromMain`) |
| Gêmeos `/en/` | gerados por `npm run i18n:sync` (Argos, local) — **não** rodam no ambiente em nuvem |
| Tier AEO | **A** (`TechArticle`) nas duas |
| Fonte do conteúdo | `fonte_revisao_cientifica.md` (nesta pasta) — revisão científica fornecida por Issei em 2026-10-07 |
| Copy da landing | mensagem de Issei de 2026-10-07 (estrutura em 6 seções), com as calibrações do §3 |
| Página irmã | `curiosidade-e-investigacao` (ensaio) — link cruzado nas duas direções |

---

## 1. Objetivo

Landing page que traduz a revisão científica em clareza e aplicação prática **sem vender o
método como validado**: o visitante entende o ciclo, vê a força da evidência de cada elo, leva
o protocolo de 45–60 min e segue para o artigo completo ou baixa a ficha.

Público: estudantes, pesquisadores e profissionais que estudam por conta própria.

## 2. Arquitetura de informação

### 2.1 Landing (`aprendizagem-autorregulada`)

| # | Seção | Conteúdo | Componente |
|---|---|---|---|
| 1 | Hero | pré-título, H1, subtítulo, CTA primário → artigo, CTA secundário → download da ficha | `<header>` + 2 links |
| 2 | Problema | "Por que a maioria das rotinas de estudo falha?" — 3 cartões (ilusão de profundidade, julgamentos subjetivos, curiosidade sem recuperação) | grid de cards |
| 3 | Solução | "A arquitetura da aprendizagem baseada em evidências" — 5 passos com ícones SVG | `<ol>` semântica, visual em trilha |
| 4 | Autoridade | "O que os dados realmente dizem?" — 4 achados com força da evidência + o limite declarado (ciclo inteiro não testado) | cards com selo de força |
| 5 | Prática | Protocolo de 45–60 min em 4 blocos de tempo | `<ol>` com marcadores de tempo |
| 6 | CTA final | convite + botão para artigo e ficha | bloco de conversão |
| — | Em síntese + FAQ | bloco gerado por `build-aeo.mjs` (marcador `AEO-BODY`) | gerado |

### 2.2 Artigo (`aprendizagem-autorregulada-artigo`)

Reproduz a revisão integral, na ordem da fonte: A) Resposta curta · B) Conceitos ·
C) Modelo integrado · D) Matriz de evidências (tabela) · E) Comprovado / provável / especulativo
(+ auditoria "explicar reconsolida a memória") · F) Artigo completo · G) Método prático ·
H) Ficha de estudo (`id="ficha"`) · I) Autoexperimento · J) Referências comentadas (103,
cada uma com `id="ref-N"`; as citações `[n]` do texto viram links para elas).

Índice navegável no topo (`<nav aria-label>` com `<details>` no mobile). Tabela da matriz em
contêiner com rolagem horizontal própria (`tabindex="0"`, rótulo), sem rolar a página.

### 2.3 Ficha de estudo

Arquivo Markdown copiável (seção H da fonte), servido como download
(`<a download>`). Markdown porque abre em qualquer editor e cola em Notion/Obsidian; PDF
ficaria para depois se Issei pedir.

## 3. Calibração da copy (honestidade científica)

A copy proposta foi mantida, exceto onde contradiz a fonte:

| Copy original | Problema | Texto publicado |
|---|---|---|
| "existe um ciclo iterativo de investigação e aprendizagem **comprovado**" | A fonte diz que o ciclo inteiro **não** tem teste causal direto (Matriz D, última linha: "Insuficiente") | "existe um ciclo iterativo **montado com elos que têm evidência própria**" |
| "O artigo propõe um **método validado**" | Fonte, §F Protocolo: "proposta operacional inferida, não uma intervenção validada como conjunto" | "O artigo propõe um **protocolo prático, derivado da evidência**" |
| "Aprender investigando de forma orientada **supera amplamente** a descoberta livre" | Fonte classifica como "moderada a forte" (d≈0,50–0,71) | "supera a descoberta livre e não assistida (d≈0,50–0,71)" |
| "Evidência para Orientação" | sem nível | "Evidência moderada a forte para orientação" |

Acréscimo: um aviso curto na seção 4 — "O que ainda não foi testado: o ciclo completo como
pacote" — porque é a principal ressalva da fonte e Issei pediu para manter o rigor.

**Afirmações proibidas nas páginas:** "método infalível", "comprovado" aplicado ao ciclo
inteiro, "validado" aplicado ao protocolo ou à ficha, "aprenda X vezes mais rápido",
"explicar reconsolida a memória" como fato.

## 4. Design

- Dark Tech (fundo `#0d1117`, superfícies `#161b22`/`#1c2230`, texto `#c9d1d9`, link `#58a6ff`).
  A sugestão "azul-marinho, branco, laranja" vira: base escura do site + **âmbar** (`--aa-amber`)
  só nos botões de ação e marcadores de tempo, com contraste ≥ 4,5:1 no texto do botão. Sem
  fundo claro (guardrail do `AGENTS.md`; não abre exceção de paleta).
- Inter em tudo. Ícones SVG inline (`aria-hidden`), sem dependência externa.
- Hover com elevação e brilho sutil; `prefers-reduced-motion` desliga transições.
- Emojis da copy ficam `aria-hidden="true"` (o texto do botão carrega o sentido).

## 5. Acessibilidade (A11Y.md, WCAG 2.2 AA)

- Skip link, `<main id="conteudo">`, um único `<h1>` por página, hierarquia h2→h3.
- Listas do ciclo e do protocolo são `<ol>` reais; o visual circular é decoração.
- Tabelas com `<caption>`, `<th scope>`; contêiner rolável focável e rotulado.
- Alvos ≥ 44 px; foco visível; nenhum conteúdo só por cor (o selo de força tem texto).

## 6. SEO / AEO

Entradas em `scripts/seo/pages.mjs` (title, description 50–160, keywords, tldr, faq, terms,
og), `build-aeo.mjs` injeta head/JSON-LD e gera os `.md`; `gen-og.mjs` gera os OG PNG.
Card no `catalogo.html` (categoria do ensaio de curiosidade) e linha em `public/catalogo.md` /
`public/llms.txt`.

## 7. Testes

`tests/aprendizagem-autorregulada.spec.js`:
- landing: 200, h1 único, 6 seções, 5 passos, 4 blocos de tempo, CTA → artigo, link de download
  da ficha responde 200; axe sem serious/critical; mobile 375 px sem scroll horizontal.
- artigo: 200, h1 único, seções A–J, 103 referências com `id`, toda citação `#ref-N` resolve;
  axe; mobile sem scroll horizontal.
- `tests/aprendizagem-autorregulada.copy.test.mjs` (node:test): nenhuma afirmação proibida do §3.

## 8. Fora de escopo / pendências

- Gêmeo `/en/`: rodar `npm run i18n:sync` localmente (o ambiente em nuvem bloqueia o host do modelo Argos).
- Registro em `specs/ecosystem.nav.yaml`: exige aprovação humana explícita.
- Versão PDF da ficha.
