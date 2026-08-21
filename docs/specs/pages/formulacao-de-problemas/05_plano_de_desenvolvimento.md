# 05 — Plano de desenvolvimento

Plano agêntico de execução da página. Materializa os docs 00–04 em tarefas atômicas, com ordem,
critérios de entrada (DoR) e de saída (DoD), gates e plano de reversão. Base de governança:
`docs/governance/dor-dod-eai.md` e `AGENTS.md` §"Spec-Driven Development".

## 1. Premissas

1. A especificação (docs 00–04) está aprovada e é a fonte da verdade. Mudança de requisito →
   atualiza-se o doc **antes** do código.
2. Nada de dependência nova: `package.json` não muda.
3. O grafo do ecossistema (`specs/ecosystem.nav.yaml`) foi alterado em 2026-08-21 (aprovação
   humana, D-1 resolvida): a página entrou em P1 — Fundação, com bump `meta.version` 1.3.0 →
   1.4.0. Continua acessível também por `catalogo.html`, pelo Hub e por crosslinks no corpo.
4. O gate é fail-closed: `npm run gate` verde é condição de "pronto", não formalidade.

## 2. Definição de Pronto para começar (DoR) — vale para toda tarefa

- [ ] A tarefa aponta a seção da spec que a origina.
- [ ] Os arquivos que ela toca estão listados (nada fora dessa lista).
- [ ] O critério de verificação é executável (comando ou asserção), não subjetivo.

## 3. Definição de Concluído (DoD) — vale para toda tarefa

- [ ] `node scripts/audit-site.mjs --strict` sem novos erros.
- [ ] `npx playwright test --project=chromium --grep formulacao` verde (a partir da fase 4).
- [ ] Sem `console.error`/`warning` novo no carregamento da página.
- [ ] Nenhum hexadecimal fora dos tokens do doc 03.
- [ ] Diff revisado contra a spec: o que foi implementado é o que está escrito.

## 4. Fases e tarefas

### Fase 0 — Procedência (bloqueia todas as demais)

| ID | Tarefa | Arquivos | Verificação |
| :-- | :-- | :-- | :-- |
| T0.1 | Arquivar o artigo original como fonte rastreável | `docs/references/formulacao-de-problemas.md` | arquivo existe e é idêntico ao recebido |
| T0.2 | Publicar a especificação (docs 00–05) | `docs/specs/pages/formulacao-de-problemas/*` | 7 arquivos; README lista todos |

### Fase 1 — Esqueleto e design system

| ID | Tarefa | Arquivos | Verificação |
| :-- | :-- | :-- | :-- |
| T1.1 | Folha `.fp-` com tokens, tipografia, grid e `prefers-reduced-motion` | `src/formulacao-de-problemas.css` | tokens do doc 03 presentes; nenhum fundo claro |
| T1.2 | HTML base: `<head>` mínimo, skip link, nav de 5 marcos, `<main>`, `<h1>` único, rodapé com referências e retorno ao catálogo | `src/formulacao-de-problemas.html` | `audit-site.mjs` não acusa órfã/SEO |
| T1.3 | Marcador `<!-- AEO-BODY -->` antes do `<footer>` | idem | marcador presente uma vez |

**Gate da fase:** `npx vite build` verde e página abre em `npm run dev` sem erro de console.

### Fase 2 — Conteúdo editorial

| ID | Tarefa | Origem | Verificação |
| :-- | :-- | :-- | :-- |
| T2.1 | Hero + tese + as cinco negações (`.fp-negacao`) | §1.4 do artigo | 5 itens; nenhum verbo de promessa |
| T2.2 | Pergunta de pesquisa + 4 subperguntas | §1.2 | 4 itens |
| T2.3 | Seções `#incertezas`, `#estados`, `#parada`, `#hiper-resolucao`, `#metricas`, `#tradicoes` (prosa de apoio) | §2.4, §5, §6, §7.1, §3–4 | cada seção ≤ 68ch de medida |
| T2.4 | `#limites` (wicked, 5 contraindicações, 4 críticas filosóficas) | §7.2–7.4 | 5 cartões + 4 críticas |
| T2.5 | `#falseabilidade` (8 critérios `.fp-kill`) + benchmark recolhido | §8.2, §8.4 | 8 cartões numerados |
| T2.6 | `#etica` e `#veredito` (selo de sustentação parcial) | §9, §10 | veredito textual idêntico em força ao do artigo |
| T2.7 | Glossário no fim + `.fp-termo` inline | §2, §5 | todo `.fp-termo` tem destino existente (`audit-site.mjs` cobra âncora) |

**Gate da fase:** revisão de tom (`tone-reviewer`) sem jargão de marketing; nenhuma afirmação mais
forte que a do artigo.

### Fase 3 — Visualizações

| ID | Tarefa | Arquivos | Verificação |
| :-- | :-- | :-- | :-- |
| T3.1 | **V1** arco do hero (SVG estático + animação de traço) | HTML + CSS | visível sem JS; estático sob reduced-motion |
| T3.2 | **V2** rosácea das seis incertezas + painel | HTML + `src/js/formulacao/incertezas.js` | 6 `<details>` sem JS; roving tabindex com JS |
| T3.3 | **V3** máquina de estados S₀–S₅ com portão e setas de regressão | HTML + `src/js/formulacao/estados.js` | `<ol>` legível sem JS; `tablist` com JS |
| T3.4 | **V4a** modelo puro da regra de parada | `src/js/formulacao/parada-model.js` | 5 invariantes do doc 02 §V4 em `node --test` |
| T3.5 | **V4b** render + dois sliders + leituras ao vivo | `src/js/formulacao/parada-view.js` | `t*` recalcula; `aria-live` atualiza; tabela de fallback presente |
| T3.6 | **V5** confiança × acurácia | HTML + CSS | área de hiper-resolução rotulada em texto |
| T3.7 | **V6** painel de 10 dimensões (tabela real) + PFQI riscado | HTML + CSS | `<table>` com `<caption>` e `<th scope>` |
| T3.8 | **V7** mapa das sete tradições | HTML + CSS (+ foco JS opcional) | `<dl>` completo sob o gráfico |
| T3.9 | Entrada JS única + revelação com `IntersectionObserver` | `src/js/formulacao-de-problemas.js` | falha de um módulo não derruba os outros |

**Gate da fase:** axe sem `serious`/`critical`; sem scroll horizontal em 375 px; JS total ≤ 14 KB.

### Fase 4 — Integração SEO/AEO e rede

| ID | Tarefa | Arquivos | Verificação |
| :-- | :-- | :-- | :-- |
| T4.1 | Entrada em `pages.mjs` (tier S, tldr, 6 FAQ, 8 termos, mdSections, og) | `scripts/seo/pages.mjs` | `node scripts/seo/build-aeo.mjs formulacao-de-problemas` roda limpo |
| T4.2 | Injeção AEO + companion Markdown | `src/…html`, `public/formulacao-de-problemas.md` | `hasMd` satisfeito (`audit-site.mjs`) |
| T4.3 | OG 1200×630 | `public/og-formulacao-de-problemas.png` | `gen-og.mjs`; teste AEO checa 200 |
| T4.4 | Card no catálogo (pilar **P1 · Fundação** — o artigo é mentalidade, não método de execução) + crosslinks no corpo | `src/catalogo.html` | página deixa de ser órfã |
| T4.5 | Hub de conexão: INTENT `especificar` | `scripts/gen-hub-data.mjs` → gerados | `node scripts/gen-hub-data.mjs` e commit dos gerados |
| T4.6 | Ressincronizar contador de specs | `src/apresentacao.html` | `node scripts/gen-hero-counter.mjs --check` verde |

**Gate da fase:** `node scripts/audit-site.mjs --strict` verde e suíte `aeo.spec.js` verde para o
novo slug.

### Fase 5 — Testes e entrega

| ID | Tarefa | Arquivos | Verificação |
| :-- | :-- | :-- | :-- |
| T5.1 | Suíte E2E da página (SEO/h1, a11y axe, mobile, teclado, sliders) | `tests/formulacao-de-problemas.spec.js` | verde em chromium/firefox/webkit |
| T5.1b | Suíte de degradação sem JavaScript, ligada ao projeto `no-js` | `tests/formulacao.nojs.spec.js`, `playwright.config.js` | verde no projeto `no-js` |
| T5.2 | Invariantes do modelo | `tests/formulacao.model.test.mjs` | `node --test tests/*.test.mjs` |
| T5.3 | Gate completo | — | `npm run gate` verde |
| T5.4 | Commit `feat:` + push na branch + PR draft | — | PR aberto com resumo e checklist |

## 5. Ordem de execução e paralelismo

```
T0.1 ─┬─ T1.1 ─ T1.2 ─ T1.3 ─┬─ T2.* ─┬─ T3.1…T3.9 ─┬─ T4.1 ─ T4.2 ─ T4.3 ─ T4.4 ─ T4.5 ─ T4.6 ─┬─ T5.1 ─ T5.3 ─ T5.4
T0.2 ─┘                       └─ T3.4 ─┘ (modelo puro pode andar em paralelo)  └─ T5.2 ────────────┘
```

Regra: **T4.1 só depois de T2/T3**, porque `gen-hub-data.mjs` deriva o tempo de leitura do texto
visível final — rodá-lo antes registra um número que a próxima edição invalida.

## 6. Riscos e mitigação

| Risco | Probabilidade | Impacto | Mitigação |
| :-- | :-- | :-- | :-- |
| Página "acadêmica demais" e ilegível no celular | Média | Alto | Três velocidades de leitura (doc 01 §3); figuras com `overflow-x:auto`; teste de 375 px no gate |
| Gráfico interativo reprovado no axe | Média | Alto | Padrões conhecidos (roving tabindex, `aria-live` polite, rótulo textual por série); axe roda por fase, não só no fim |
| Números de V4 lidos como resultado científico | **Alta** | **Alto** | Selo `NÃO VALIDADO` + legenda fixa de curvas ilustrativas + texto do veredito parcial |
| Regeneração do AEO apagar edição manual no `<head>` | Média | Médio | Nada escrito à mão dentro dos marcadores `AEO:START/END`; `build-aeo.mjs` é idempotente |
| Contador do Hero dessincronizar por causa das novas specs | Alta | Baixo | T4.6 explícita no plano |
| Estouro do orçamento de performance | Baixa | Médio | Sem terceiros; SVG à mão; `perf-budget.mjs` no gate |
| Deriva de vocabulário (marketing) | Baixa | Médio | `audit-site.mjs` + agente `tone-reviewer` |

## 7. Reversão

A entrega é aditiva: uma página nova, uma folha, um diretório de JS, uma suíte, uma entrada em
`pages.mjs`, um card no catálogo e três arquivos gerados. Reverter é `git revert` do commit —
nenhuma outra página depende deste código, e o único acoplamento com o resto do site
(`hub-data.js`, contador do Hero, `catalogo.html`) é regerado pelos próprios scripts.

## 8. Decisões pendentes de humano (HITL)

| # | Decisão | Por que não foi tomada pelo agente |
| :-- | :-- | :-- |
| D-1 | ~~Entrada de `formulacao-de-problemas` no grafo `ecosystem.nav.yaml` (candidato: pilar P1 — Fundação)~~ — **resolvida em 2026-08-21**: aprovada, entrou em P1, `meta.version` 1.4.0 | ECOSYSTEM.md exige bump de `meta.version` e aprovação humana para alterar o grafo |
| D-2 | Autoria do artigo: publicado como texto próprio (o original traz `[Nome do autor]`) | Atribuição é decisão editorial do dono do site |
| D-3 | Vídeo de apoio (`VideoObject`) para o hero | Depende de gravação inexistente |
