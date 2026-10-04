# PROGRESS — Digital Workplace Agêntico

Atualizado pelo agente implementador a cada tarefa do doc 05. Estados: `todo` · `doing` · `done` · `blocked`.
A coluna "Commit" aponta para o commit de entrega da página (branch `feat/digital-workplace-agentico`).

| ID | Estado | Commit | Observação |
| :-- | :-- | :-- | :-- |
| T0.1 | done | — | Cópia neutra com 23 arquivos (`03_pilares`, `04_transversais`, `05_decisao`, `06_evolucao`). `01_contexto` e `02_analise_multidisciplinar` pendentes (D-4). |
| T0.2 | done | — | Docs 00–06 + este arquivo. |
| T0.3 | done | — | `tests/digital-workplace.legal.test.mjs`; teste negativo conferido (termo injetado → falha). |
| T1.1 | done | entrega | `tests/digital-workplace.tokens.test.mjs` (contraste dos tokens, fundo Dark Tech, nenhum hex fora do CSS). Escrito antes da folha. |
| T1.2 | done | entrega | `src/digital-workplace-agentico.css` — tokens do doc 03, selos, tabelas, foco, reduced-motion. O preflight do Tailwind zera marcadores de lista; a folha os devolve onde a lista é prosa. |
| T1.3 | done | entrega | `src/digital-workplace-agentico.html`: skip link, `.dw-nav` com seis marcos, `<main id="conteudo">`, `<h1>` único, índice recolhível, rodapé com fontes. |
| T2.1–T2.11 | done | entrega | 16 seções (`hero` … `estudar`) + bloco AEO. Contagens conferidas por `tests/digital-workplace-agentico.spec.js`. |
| T3.1–T3.7 | done | entrega | V1 cadeia, V2 escada + matriz (`maturidade.js`), V3 camadas, V4 sequência (`sequencia.js`), V5 cadeia do conhecimento, V6 autonomia, V7 roadmap (`roadmap.js`). V4 ganhou SVG estático além do `<ol>`. |
| T3.8a | done | entrega | `prontidao-model.js` + `tests/digital-workplace.model.test.mjs` (invariantes do doc 02 §V8; teste de deriva rádios × modelo). |
| T3.8b | done | entrega | `prontidao-view.js`; nada persistido (conferido em E2E). |
| T3.9 | done | entrega | `src/js/digital-workplace-agentico.js`: import dinâmico literal por visualização, falha isolada. |
| T4.1 | done | entrega | Entrada em `scripts/seo/pages.mjs` (TechArticle, FAQ de 6, 8 termos, 3 `mdSections`, OG). Guarda legal verde sobre o bloco. |
| T4.2 | done | entrega | `public/digital-workplace-agentico.md` gerado. **Desvio:** o `.md` não é digitado; `mdFromMain: true` anexa o `<main>` convertido por `scripts/seo/html-to-md.mjs`, para o Markdown não divergir do HTML (a conversão é regra do injetor, não da página). |
| T4.3 | done | entrega | `public/og-digital-workplace-agentico.png` por `gen-og.mjs`; sem logotipo. |
| T4.4 | done | entrega | Linha em `public/llms.txt`. `llms-full.txt` é o currículo, sem lista de páginas: nada a acrescentar. |
| T4.5 | done | entrega | Cartão no pilar P2 do `catalogo.html` + linha em `catalogo.md` (via `pages.mjs`); a página deixa de ser órfã no `audit-site`. |
| T4.6 | blocked | — | **Aguarda D-1.** Nenhuma alteração em `specs/ecosystem.nav.yaml` nem em `src/js/eco-nav.js`; a página não carrega `<eco-nav>` enquanto não for nó do grafo. |
| T4.7 | done | entrega | `gen-hub-data.mjs` (entrada `INTENT`, aba "Para especificar") e `gen-hero-counter.mjs` rodados. |
| T4.8 | done | entrega | `npm run i18n:sync` — `src/en/` e `public/en/` gerados e conferidos pela guarda legal. O Argos estragava `AG-UI` (→ `AG-IU`) e `Agêntico` (→ `Genetic`): `scripts/i18n/engine.py` passou a proteger siglas compostas e o texto PT foi ajustado onde o modelo falhava (doc 04 §5). |
| T5.1 | done | entrega | `tests/digital-workplace-agentico.spec.js` (axe, teclado V2/V4/V7, V8, 375 px, reduced-motion, crosslinks). |
| T5.2 | done | entrega | `tests/digital-workplace.nojs.spec.js` + projeto `no-js` do `playwright.config.js`. |
| T5.3 | done | entrega | `npm run gate` verde (build, gêmeos `.md`, artefatos gerados, `/en/` em dia, auditoria, `node:test`, Playwright em 3 navegadores + `mobile` + `no-js`, orçamento). Resultado e flakies pré-existentes no PR. |
| T5.4 | done | entrega | PR aberto da branch `feat/digital-workplace-agentico` com o checklist do doc 06 §5. |

## Decisões HITL

| # | Estado |
| :-- | :-- |
| D-1 | aberta — proposta: pilar P2. Não alterei o grafo (`ecosystem.nav.yaml` + `eco-nav.js` + `meta.version`). |
| D-2 | aberta (no PR da página) — revisão do dono quanto às pistas indiretas (P4, P5, P7). |
| D-3 | aberta — a fonte não foi publicada como biblioteca; só a página. |
| D-4 | aberta — a síntese de `#problema` e `#papeis` vem do doc 01 §3. |

## Observações da implementação

- **Procedência (doc 06 §6):** nenhum trecho da fonte apontava para organização real. Duas frases genéricas da fonte
  ("assistente existente", "portal específico") foram reescritas na página para "eventuais assistentes já em uso" e
  "um portal corporativo", sem alterar a fonte.
- **Fornecedores:** a página não nomeia fornecedores de plataforma; o comitê do A2A aparece como "grandes fornecedores
  de nuvem, ERP e atendimento". Projetos abertos (Temporal, OPA, Cedar, Debezium) são citados só como tecnologia.
- **Fontes da rodapé:** só especificações, RFCs, leis, documentação oficial e artigos técnicos. Ficaram de fora as
  fontes da cópia neutra que são material de fornecedor ou de imprensa (associação de fornecedores, documentação de
  privacidade de produto, matéria sobre DEX).
- **Tabelas largas:** todas em `.dw-tabela-wrap` rolável (`tabindex="0"`, `role="region"`, `aria-label`).
