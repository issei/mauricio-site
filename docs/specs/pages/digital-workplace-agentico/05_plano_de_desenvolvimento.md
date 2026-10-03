# 05 — Plano de desenvolvimento

Plano de execução para o agente implementador (Claude Code). Materializa os docs 00–04 e 06 em
tarefas atômicas, com ordem, verificação executável, gates e reversão. Base: `AGENTS.md`
§"Spec-Driven Development" e `.claude/skills/mauricio-site-patterns/SKILL.md`.

## 1. Premissas

1. A spec (docs 00–06) é a fonte da verdade. Mudou requisito → atualiza o doc **antes** do código.
2. **O doc 06 prevalece.** Nenhuma tarefa está concluída se a guarda legal falhar.
3. Nenhuma dependência nova: `package.json` não muda.
4. Benchmarks estruturais: `src/formulacao-de-problemas.html` (artigo longo com visualizações,
   AEO, no-js) e `src/engenharia-confianca.html` (entradas por dor).
5. O gate é fail-closed: `npm run gate` verde é a condição de "pronto".
6. Registrar o andamento em `PROGRESS.md` a cada tarefa (ID, estado, commit, observação).

## 2. DoR (vale para toda tarefa)

- [ ] A tarefa aponta a seção da spec que a origina.
- [ ] Os arquivos que ela toca estão listados.
- [ ] A verificação é um comando ou asserção.

## 3. DoD (vale para toda tarefa)

- [ ] `node --test tests/digital-workplace.legal.test.mjs` verde.
- [ ] `node scripts/audit-site.mjs --strict` sem novos erros.
- [ ] `npx playwright test --project=chromium --grep "Digital Workplace"` verde (a partir da fase 5).
- [ ] Nenhum hexadecimal fora dos tokens do doc 03.
- [ ] Diff conferido contra a spec.

## 4. Fases e tarefas

### Fase 0 — Procedência e guarda (feita junto com esta spec)

| ID | Tarefa | Arquivos | Verificação |
| :-- | :-- | :-- | :-- |
| T0.1 | Cópia neutra da fonte | `docs/references/digital-workplace-agentico/**` | guarda legal verde |
| T0.2 | Spec 00–06 + PROGRESS | `docs/specs/pages/digital-workplace-agentico/*` | README lista todos |
| T0.3 | Guarda legal automática | `tests/digital-workplace.legal.test.mjs` | `node --test` verde; teste negativo (termo injetado) falha |

### Fase 1 — Esqueleto e design system

| ID | Tarefa | Arquivos | Verificação |
| :-- | :-- | :-- | :-- |
| T1.1 | Teste de tokens **antes** da folha (TDD) | `tests/digital-workplace.tokens.test.mjs` | falha sem a folha |
| T1.2 | Folha `.dw-` com tokens, tipografia, grid, foco, reduced-motion | `src/digital-workplace-agentico.css` | T1.1 verde; nenhum fundo claro |
| T1.3 | HTML base: `<head>` mínimo, skip link, `.dw-nav` (6 marcos), `<main id="conteudo">`, `<h1>` único, índice recolhível, rodapé com fontes e retorno ao catálogo, `<!-- AEO-BODY -->` antes do `<footer>` | `src/digital-workplace-agentico.html` | `npx vite build` verde |

**Gate:** build verde; página abre em `npm run dev` sem erro de console; guarda legal verde.

### Fase 2 — Conteúdo editorial (doc 01 §2, ordem das seções)

| ID | Tarefa | Fonte | Verificação |
| :-- | :-- | :-- | :-- |
| T2.1 | `#hero` + tese + quatro entradas por dor | README da spec, doc 01 §3.1 e §5 | 4 `.dw-dor` com destinos existentes |
| T2.2 | `#problema` (três forças) | doc 01 §3.1 | 3 cartões; nada de nome de organização |
| T2.3 | `#maturidade` (texto) | `modelo_de_maturidade_cinco_estagios.md` | 5 estágios com fórmula e critérios recolhíveis |
| T2.4 | `#arquitetura`, `#fluxo` (texto) | `arquitetura_de_referencia_integrada.md`, `fluxo_…`, `ag_ui_…` | 6 camadas + transversal; oito famílias AG-UI em tabela |
| T2.5 | `#pilares` (8 cartões) | `03_pilares/*` | 8 `.dw-pilar`, cada um com selo e `<details>` |
| T2.6 | `#conhecimento`, `#confianca`, `#processos` | `04_transversais/*` | checklist de prontidão RAG; níveis 0–4; exceções humanas |
| T2.7 | `#papeis` (12 lentes) | doc 01 §3.2 | tabela com 12 linhas |
| T2.8 | `#decisoes`: 12 trade-offs + 3 paradoxos, 17 anti-patterns + checklist, matriz tecnológica recolhível | `05_decisao/*` | contagens conferidas por teste |
| T2.9 | `#operacao`, `#roadmap` (texto), `#estudar` | `operacao_…`, `roadmap_…`, `roteiro_…` | 6 fases, 7 trilhas, 7 perfis |
| T2.10 | `#perguntas`: 30 `<details>` em 5 grupos | `perguntas_criticas_*` | 30 `.dw-pergunta` |
| T2.11 | Rodapé de fontes (só fontes primárias genéricas) | seções "Fontes" | revisão contra doc 06 §2 P3 |

**Gate:** agente `tone-reviewer` sem jargão de marketing; nenhuma afirmação mais forte que a
fonte; todo bloco com `.dw-selo`; checklist do doc 06 §5 (itens manuais) conferido.

### Fase 3 — Visualizações (doc 02)

| ID | Tarefa | Arquivos | Verificação |
| :-- | :-- | :-- | :-- |
| T3.1 | **V1** cadeia do hero | HTML + CSS | `<ol>` com 6 itens; visível sem JS |
| T3.2 | **V2** escada + matriz; destaque de coluna | HTML + `src/js/digital-workplace/maturidade.js` | tabela 8×5; `aria-pressed` |
| T3.3 | **V3** camadas com `<details>` | HTML + CSS | 6 camadas + transversal |
| T3.4 | **V4** sequência AG-UI com passo a passo | HTML + `src/js/digital-workplace/sequencia.js` | `<ol>` completo sem JS; `aria-live` com JS |
| T3.5 | **V5** cadeia do conhecimento com portões | HTML + CSS | 6 estações, portões com `<details>` |
| T3.6 | **V6** escada de autonomia | HTML + CSS | tabela 5 níveis com coluna de teto |
| T3.7 | **V7** grade fases × trilhas + filtro | HTML + `src/js/digital-workplace/roadmap.js` | tabela 7×6; T2/T3 marcadas como caminho crítico |
| T3.8a | **V8** modelo puro + testes primeiro | `src/js/digital-workplace/prontidao-model.js`, `tests/digital-workplace.model.test.mjs` | invariantes do doc 02 §V8 em `node --test` |
| T3.8b | **V8** formulário e resultado | HTML + `src/js/digital-workplace/prontidao-view.js` | recalcula; `aria-live`; nada persistido |
| T3.9 | Entrada JS única com import dinâmico por visualização | `src/js/digital-workplace-agentico.js` | falha de um módulo não derruba os outros |

**Gate:** axe sem `serious`/`critical`; sem scroll horizontal em 375 px; CSS + JS ≤ 48 KB.

### Fase 4 — SEO/AEO, rede e i18n

| ID | Tarefa | Arquivos | Verificação |
| :-- | :-- | :-- | :-- |
| T4.1 | Entrada em `pages.mjs` (doc 04 §3) | `scripts/seo/pages.mjs` | `node scripts/seo/build-aeo.mjs digital-workplace-agentico` limpo; guarda legal verde |
| T4.2 | Injeção AEO + Markdown companheiro | `src/…html`, `public/digital-workplace-agentico.md` | `hasMd` satisfeito; `node scripts/check-md-twins.mjs` |
| T4.3 | OG 1200×630 sem logotipo | `public/og-digital-workplace-agentico.png` | `gen-og.mjs`; teste AEO checa 200 |
| T4.4 | Linha em `llms.txt` / `llms-full.txt` | `public/llms*.txt` | guarda legal (linha do slug) verde |
| T4.5 | Cartão no catálogo + crosslinks do doc 01 §7 | `src/catalogo.html`, `src/digital-workplace-agentico.html` | página deixa de ser órfã (`audit-site.mjs`) |
| T4.6 | Ecossistema: nó no pilar aprovado em D-1 + bump de `meta.version` | `specs/ecosystem.nav.yaml` (+ `inject-eco-nav.mjs`) | **só após aprovação humana D-1** |
| T4.7 | Hub de conexão e contador de specs | `node scripts/gen-hub-data.mjs`, `node scripts/gen-hero-counter.mjs --check` | gerados commitados |
| T4.8 | Gêmeo em inglês | `npm run i18n:sync && npm run i18n:check` | `src/en/…` e `public/en/…` gerados; guarda legal verde no gêmeo |

**Gate:** `node scripts/audit-site.mjs --strict` verde e `aeo.spec.js` verde para o slug.

### Fase 5 — Testes E2E e entrega

| ID | Tarefa | Arquivos | Verificação |
| :-- | :-- | :-- | :-- |
| T5.1 | Suíte E2E: título/SEO/h1, canonical/og, seções e contagens, selos, axe, teclado (V2/V4/V7), V8 calcula as faixas, 375 px, reduced-motion | `tests/digital-workplace-agentico.spec.js` | chromium/firefox/webkit |
| T5.2 | Suíte sem JS no projeto `no-js` (ignorada nos demais projetos) | `tests/digital-workplace.nojs.spec.js`, `playwright.config.js` | verde no `no-js` |
| T5.3 | Gate completo | — | `npm run gate` verde |
| T5.4 | Commit `feat:` + push na branch de trabalho + PR com checklist do doc 06 §5 | — | PR aberto; revisão do dono (D-2) |

## 5. Ordem e paralelismo

```
T0.* ─ T1.1 ─ T1.2 ─ T1.3 ─┬─ T2.1…T2.11 ─┬─ T3.1…T3.7, T3.8b, T3.9 ─┬─ T4.1 ─ T4.2 ─ T4.3 ─ T4.4 ─ T4.5 ─ (D-1) T4.6 ─ T4.7 ─ T4.8 ─┬─ T5.1 ─ T5.3 ─ T5.4
                           └─ T3.8a (modelo puro, em paralelo) ─────┘                                                              └─ T5.2 ─┘
```

Regras: T4.7 só depois do texto final (o hub deriva o tempo de leitura do texto visível); T4.8
sempre depois da última edição de `src/…html` ou `public/…md` (espelho velho é proibido).

## 6. Riscos e mitigação

| Risco | Prob. | Impacto | Mitigação |
| :-- | :-- | :-- | :-- |
| **Associação indireta ao caso de referência** (setor + porte, autobiografia, números) | Média | **Crítico** | doc 06 §2 P4–P7; checklist manual §5; revisão do dono (D-2) |
| Termo proibido em texto gerado (AEO, `/en/`, `llms.txt`) | Baixa | Crítico | guarda legal varre gerados e blocos compartilhados |
| Página longa demais e ilegível no celular | Alta | Alto | três camadas de profundidade (doc 01 §1); `<details>`; teste em 375 px |
| Tabelas largas quebrando o layout | Alta | Médio | contêiner rolável com `tabindex`; primeira coluna fixa |
| Leitor tomar V4 como execução real de AG-UI | Média | Médio | selo `RECOMENDAÇÃO` + legenda "sequência ilustrativa" |
| Especificações de protocolo mudarem (AG-UI, MCP) | Média | Médio | datar a revisão da fonte na página ("conteúdo revisado em 2026-10"); fatos linkados à spec versionada |
| Argos traduzir siglas (AG-UI, MCP, EXP) | Média | Baixo | `<code>`/lista de preservação do tradutor |
| Orçamento de performance | Baixa | Médio | sem bibliotecas; import dinâmico por visualização; `perf-budget.mjs` |

## 7. Reversão

Entrega aditiva: uma página, uma folha, um diretório de JS, suítes, uma entrada em `pages.mjs`,
um cartão no catálogo, linhas em `llms*.txt` e gerados (`/en/`, hub, contador). Reverter é
`git revert`; os gerados se refazem pelos próprios scripts.

## 8. Decisões pendentes de humano (HITL)

| # | Decisão | Por que não foi tomada pelo agente |
| :-- | :-- | :-- |
| D-1 | Entrada no grafo `ecosystem.nav.yaml` (proposta: P2 — Engenharia de Confiança) | alterar o grafo exige bump de `meta.version` e aprovação humana |
| D-2 | Revisão final do dono do site quanto à restrição legal (doc 06 §5) | pistas indiretas não são verificáveis por máquina |
| D-3 | Publicar os 23 arquivos da fonte como biblioteca Markdown navegável (além da página) | aumenta superfície de revisão legal e de i18n |
| D-4 | Incluir cópia neutra de sumário, questões abertas e análises por papel na fonte | a cópia dessas pastas não foi feita nesta entrega; hoje o conteúdo vem da síntese do doc 01 §3 |
