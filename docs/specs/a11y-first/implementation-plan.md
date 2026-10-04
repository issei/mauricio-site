---
id: A11Y-PLAN-001
titulo: Plano de implementação por fases
versao: 0.1.0
status: rascunho — NADA aqui foi executado; aguarda aprovação das perguntas bloqueadoras
data: 2026-10-03
relacionado: [accessibility-audit.md, architecture.md, testing-strategy.md, A11Y-DECISIONS.md]
---

# Plano de implementação

Ordem = **impacto na tarefa**, não contagem de violações. Cada fase é um PR independente, com `npm run gate` verde e
`sync-i18n` rodado quando tocar ativo PT-BR. Spec antes do código: se uma fase mudar de rumo, atualiza-se este
arquivo **antes**.

## Definition of Done (vale para toda fase)

Funcional ✔ tarefa completa · Semântico ✔ HTML nativo antes de ARIA · Teclado ✔ tarefa só por teclado ·
Leitor de tela ✔ nome/estado/erro anunciados (**humano** confirma) · Visual ✔ contraste e foco medidos ·
Responsivo ✔ 320 px e 200 % de texto · Erro ✔ usuário corrige e continua · **Evidência** ✔ teste + linha no `REPORT.md`.

## Fases

### Fase 0 — Aprovação (nenhum código)
- **Objetivo:** responder Q1–Q6 (abaixo) e promover D-01…D-11 de *proposto* a *aprovado*.
- **Saída:** `A11Y-DECISIONS.md` na raiz (cópia do rascunho com Estado e aprovador).
- **Critério:** D-01, D-02, D-06 decididas (as outras têm default seguro).

### Fase 1 — Fundação: protocolo + medição
- **Objetivo:** o protocolo passa a ser contexto persistente; a medição passa a existir no CI.
- **Arquivos (entregues):** `docs/a11y/**` (cópia com SHA `069e213`, `UPSTREAM.md`) · `tools/a11y/*.py` · `AGENTS.md` (+1 seção) · `scripts/a11y-sweep.mjs` + `scripts/a11y-ratchet.mjs` · `tests/a11y-ratchet.test.mjs` · `tests/a11y/baseline.json` · `scripts/quality-gate.mjs` (+1 etapa) · `package.json` (+2 scripts) · `A11Y-DECISIONS.md`, `EXCEPTIONS.md` (raiz).
- **Desvio do plano original:** a varredura virou **script Node** (`scripts/a11y-sweep.mjs`, como `perf-budget.mjs`), não `*.spec.js` — o Playwright do repo sobe o dev server, e a varredura exige o **build** servido por `vite preview`. A lógica de comparação é pura e tem teste `node:test`.
- **Dependências:** D-01; para `tools/`, Q3.
- **Mudanças:** (1) a varredura desta auditoria vira teste contra o **build** (`vite preview`), tags `wcag2a/aa/21a/21aa/22aa`, **todas** as rotas do sitemap; (2) `baseline.json` registra as violações de hoje por página/regra; (3) o teste **falha se qualquer contagem subir** e **exige reduzir o baseline** ao corrigir (ratchet); (4) skip link/`<main>`/h1 como sonda estática.
- **Riscos:** build mais lento no CI (+~1 min) → rodar só `chromium` na varredura; falso positivo de FOUC → ela já espera estabilizar (método desta auditoria).
- **Testes:** o próprio sweep; `node --test` do ratchet (baseline maior que a medição ⇒ falha).
- **Aceite:** gate verde **com** o baseline atual; adicionar uma violação artificial derruba o gate; nenhuma página tem tratamento especial.

### Fase 2 — Contraste por token (F-04) 🟠
> **Entregue 2026-10-03** — `color-contrast` 128 → 2 no baseline (as 2 restantes são `exemplopdi`, EXC-006, que o autor decidiu não mexer). 126 nós em 10 páginas; baseline 207 → 81. Desvios do plano: `devin` tinha paleta própria (9 cinzas `#334155`, 23 `#64748B`, laranja/roxo em painéis) e exigiu edição no `devin.css`, não só troca de utilitário; o texto do diploma em `curriculo` vem de `scripts/gen-portfolio.mjs` (corrigido na fonte); clarear o texto de apoio fez um link de `sustentacao` perder distinção por cor (→ sublinhado; é a mesma família de F-11, Fase 4).
- **Arquivos:** os 15 `src/*.html` com `text-gray-500/600`, `text-slate-500`; `src/curriculo.html` e `src/index.html` **via** `cv.json`/`scripts/gen-portfolio.mjs` quando o trecho é gerado; `STYLE_GUIDE.md` (+ regra do piso).
- **Mudanças:** `gray-500/600 → gray-400 (#99a1af)`; `#007bff` em texto → `#58a6ff`; CTA `#2563eb` com texto `#fff`; documentar o piso. Sem tocar `apresentacao.css`.
- **Riscos:** muted mais claro altera a hierarquia → **revisão visual do autor** antes do merge. `guard-ap-tokens` não é afetado.
- **Testes:** sweep (color-contrast = 0 nas 11 páginas); `tests/portfolio.tokens.test.mjs` continua verde.
- **Aceite:** baseline de `color-contrast` cai a 0 e é regravado.

### Fase 3 — Consentimento (F-01, F-10, F-17) 🔴 → T7 nas 5 páginas que carregam o componente
> **Entregue 2026-10-03** (branch `feat/a11y-first-fase3`). `<dialog>` + `showModal()`; categorias viram checkbox nativo (a escolha tem "Salvar" → não é switch, `guide-form-controls`); região viva única; banner reserva a própria altura (2.4.11); botões 44 px com paridade; `<eco-nav>` sobe acima do banner (F-17, **achado novo**); botão fixo some enquanto há banner. 11 testes × 3 navegadores; contra o código antigo, 10 de 11 falham. Baseline 81 → 79 (`target-size` em `index`/`curriculo`). Aberto: F-18 (texto em PT nos espelhos EN) e validação com leitor de tela real (humano).
- **Arquivos:** `src/js/cookie-consent.js` (+ strings EN se existirem); novo `tests/a11y/consent.spec.js`.
- **Mudanças:** `<dialog>` + `showModal()`; foco entra, Esc fecha, foco **retorna** ao gatilho; um só listener; toggles com um mecanismo de estado e nome claro; botões ≥ 44 px com paridade aceitar/recusar; `role=status` ao salvar.
- **Dependências:** D-08, D-09; **decisão humana** sobre o texto dos toggles.
- **Riscos:** regressão do Consent Mode v2 (GA4) → manter `gtag('consent', …)` intocado, só mover a UI; **testar** que `default denied` continua antes de qualquer tag.
- **Testes:** abrir→foco dentro→Tab não escapa→Esc→foco volta; leitor de tela **(humano)**; `no-js`.
- **Aceite:** T7 completo por teclado; axe `target-size` = 0 na home/currículo.

### Fase 4 — Estrutura e bloqueios de tarefa (F-02, F-03, F-09, F-11) 🔴/🟠
> **Entregue 2026-10-03** (branch `feat/a11y-first-fase4`). Skip link + `<main>` em 18 páginas (inclui `boutique-empresarial-showcase`, `life`, `life3d`, `404`); `proposta` com botão de áudio nomeado, `aria-pressed` e foco visível; links em texto da `socialselling` sublinhados; hover do botão secundário do currículo com 5,22:1. Baseline 77 → 48. **Fora por decisão do autor** (EXC-001…007): `admin`, `admin-editor`, `diagnostic`, `test-github`, `mapmind`, `vsl`, `exemplopdi` — são os 7 `no-skip-link`, 6 `no-main` e 4 `label` que restam. Desvios: o skip link é um snippet **inline por página** (`<style id=a11y-skip>`), não um CSS compartilhado — as páginas usam 5 mecanismos de CSS diferentes e um arquivo novo seria mais uma requisição; `life.html` deixou de chamar `canvas.focus()` na carga (as teclas já eram ouvidas em `window`, e o foco roubado empurrava o skip link para fora da ordem de Tab). WebKit: Tab não alcança links por padrão no Safari — o teste de skip link roda só em chromium/firefox; no Safari é checkpoint humano.
- **Arquivos:** 13 páginas sem `<main>` (lista no audit); 25 sem skip link; `proposta.html` (`#playBtn`); 3 páginas com link só por cor; `diagnostic`/`test-github` conforme **D-06**.
- **Mudanças:** snippet canônico (já existe em `index.html`) — **copiar, não inventar**; `aria-label`+estado no botão; sublinhado persistente em links de corpo.
- **Riscos:** páginas legadas com `<body>` único e CSS que depende da estrutura → conferir visual por página.
- **Testes:** sonda estática + sweep; teclado: Tab#1 = skip link, Enter leva ao `<main>`.
- **Aceite:** 41/41 com skip link e `<main>`; `button-name`, `label` = 0.

### Fase 5 — Responsivo, zoom e movimento (F-05, F-06, F-07, F-08, F-12, F-14, F-15) 🟠/🟡
> **Entregue 2026-10-03** (branch `feat/a11y-first-fase5`). Reflow a 320 px zerado em 12 páginas (restam só `exemplopdi` e `test-github`, EXC); zoom liberado em `life`/`life3d`; `life3d` com lista de fases + `aria-current` (11 nós de ARIA proibido → 0); `<dl>` válido; regiões roláveis (`<pre>`/tabelas) focáveis **só quando rolam** (`src/js/a11y-scroll-regions.js`); modal do currículo com botão real, fundo inerte e foco devolvido (F-14, que era um `span role=button` sem Enter/Espaço); movimento reduzido em 9 páginas. A catraca ganhou a métrica `motion:reduce`. **Baseline 48 → 34, e as 34 são todas de páginas em EXCEPTIONS** — toda página fora delas está limpa nas métricas da catraca. Causa raiz do reflow: `grid-template-columns: repeat(auto-fit, minmax(320px, 1fr))` (mínimo maior que a tela) → `minmax(min(100%, 320px), 1fr)`, padrão que o `index.css` já usava; o resto foi `min-width:auto` de itens de grid/flex e `<pre>` sem rolagem. **F-15 (alvos < 24 px):** não há falha — o axe `target-size` (SC 2.5.8, já na catraca) não acusa nenhuma; a contagem heurística da 1ª auditoria ignorava as exceções de espaçamento e de link em linha. Fica registrado como **sem achado**, não como correção.
- **Arquivos:** as 14 páginas de reflow; `life.html`, `life3d.html`; `salesforce-agentic-dev.html`; `curriculo.html:1967`; CSS por página.
- **Mudanças:** triagem página a página do que estoura 320 px (contêiner rolável focável para 2D); remover `user-scalable=no`; papéis corretos nos pontos de `life3d`; `reduced-motion` nas páginas que animam (**investigar o 7→21 de `devin` antes de mudar**); `<pre>` com `tabindex=0`; trocar `span role=button` por `<button>`; medir espaçamento antes de declarar 2.5.8.
- **Riscos:** `life/life3d` são jogos — zoom vs gesto; **versão linear do conteúdo** é decisão de UX (`ux-spec.md` §7).
- **Testes:** `tests/a11y/reflow.spec.js` (320 px), `reduced-motion.spec.js`, sweep.
- **Aceite:** 0 páginas com rolagem horizontal da página inteira; zoom funcional; movimento reduzido sem animação não essencial.

### Fase 6 — Tarefas interativas e jornada (T4, T5, T6) 🔴 se algo bloquear
> **Entregue 2026-10-03** (branch `feat/a11y-first-fase6`). Começou por sondas de teclado (Tab em 15 páginas, tablists, grupos, sliders, diálogos) e só corrigiu o que falhou: **(1) foco invisível** — o anel padrão do Chrome sai quase preto (`rgb(16,16,16)`) em página escura e `<summary>` em contêiner `overflow:hidden` tinha o anel recortado → plugin Vite `a11y-focus-base` (anel `:where()` de especificidade zero em toda página) + `summary` com anel por dentro; **(2) `<eco-nav>` cobria o foco** no fim da página (2.4.11) → sai da frente quando o foco cai embaixo dele; **(3) Tabs sem teclado** em 4 widgets (EAI ×2, devin IDE, confiança) → `src/js/a11y-tabs.js` (tabindex móvel, setas, Home/End, `aria-controls`/`tabpanel`); **(4) diálogos do OCC sem nome** (`aria-labelledby` apontava para ids que nunca existiram); **(5) quiz** sem nome de grupo nem estado da opção escolhida, **calibrador** sem anúncio do veredito; **(6) skip link da `artifice` nunca aparecia no foco** (utilitário Tailwind não gerado). Testes: `focus-visible.spec.js` (15 páginas, compara pixel focado × desfocado), `widgets.spec.js` (9 casos × 3 navegadores). **A catraca agora mede o gêmeo EN** (75 páginas): o espelho tinha 1 botão e 1 link **sem texto** (o tradutor devolvia vazio para segmento que abre com símbolo — `engine.py` agora mantém o PT) e 4 achados de reflow/contraste que o PT não mostrava. Não verificado: leitor de tela real; fluxos de `terminal-evolutivo`/`life*` por teclado além do foco.
- **Arquivos:** `src/js/eai-*.js`, `operacao-capital-cognitivo`, `formulacao-de-problemas`, `terminal-evolutivo`, `eco-nav.js`.
- **Mudanças:** **só o que a verificação provar quebrado** — esta fase começa por testes de tarefa (teclado, foco, anúncio, erro) e termina corrigindo o que falhar. Não presumir.
- **Testes:** um spec de tarefa por T4/T5/T6 (`testing-strategy.md` §3).
- **Aceite:** T4–T6 completáveis só por teclado; resultado/erro anunciados.

### Fase 7 — Verificação independente
- **Objetivo:** separar autor de auditor (A11Y.md §2.11).
- **Como:** novo agente em **contexto novo** (não vê este plano), recebe só `docs/a11y/A11Y.md`, o build e a lista de checkpoints; reproduz os não-humanos. Divergência = achado.
- **Saída:** nível declarado: `cross-agent` / `fresh-context` / `self-reported ⚠️`. Roda `verify-a11y.py` se Q3 aprovada.

### Fase 8 — Release
- **Saída:** `REPORT.md` na raiz (template do A11Y.md): versão do site + do padrão, perfil, `Static gate` PASS/FAIL/NOT RUN, independência, tabela de contraste recomputada, **lista de checkpoints humanos pendentes**; `EXCEPTIONS.md` só se houver violação aceita (dono, aprovador, issue, validade).
- **Aceite:** o `REPORT.md` não afirma mais do que a evidência sustenta.

## Arquivos que serão criados / alterados (resumo)

| Ação | Arquivos |
| :-- | :-- |
| **Criar** | `docs/a11y/**` (cópia versionada) · `tests/a11y/{sweep,consent,reflow,reduced-motion,tasks}.spec.js` · `tests/a11y/baseline.json` · `A11Y-DECISIONS.md`, `REPORT.md` (raiz) · `EXCEPTIONS.md` **só se necessário** |
| **Alterar** | `AGENTS.md` (+1 linha) · `scripts/quality-gate.mjs` (+1 etapa) · `src/js/cookie-consent.js` · `docs/specs/STYLE_GUIDE.md` (piso de contraste) · ≤ 41 `src/*.html` (contraste, `<main>`, skip link, reflow) · `src/life*.html` · `cv.json`/`gen-portfolio.mjs` se o trecho for gerado |
| **Não tocar** | `src/en/**`, `public/en/**` (gerados) · `apresentacao.css` (exceção `ap-`) · `infra/**` · `.github/workflows/deploy.yml` |

## Perguntas bloqueadoras

| # | Pergunta | Por que bloqueia |
| :-- | :-- | :-- |
| **Q1** | Confirma o **retrofit** do site existente (e não um site novo)? | muda o escopo inteiro |
| **Q2** | O que fazer com `admin`, `admin-editor`, `diagnostic`, `test-github`, `mapmind`, `vsl`, `exemplopdi`, `boutique-empresarial-showcase`: corrigir, remover do build público ou `noindex`+exceção? (**D-06**) | 3 achados 🔴/🟠 dependem disso |
| **Q3** | Autoriza baixar e **executar** `tools/verify-a11y.py` (Python stdlib, 48 KB, upstream `fecarrico/A11Y.md`) após eu ler o código? | sem isso o `Static gate` fica **NOT RUN** |
| **Q4** | Aprova **opção B** de integração (cópia versionada + carga preguiçosa, **sem** `@import` no AGENTS.md)? (**D-01**) | define a Fase 1 |
| **Q5** | Quem faz a validação humana (NVDA/VoiceOver, mídia, `alt`)? Há como contratar/convidar uma pessoa que use leitor de tela no dia a dia? | sem humano o teto é `self-reported ⚠️` |
| **Q6** | Aceita clarear o texto de apoio para `#99a1af` (D-10)? | afeta a aparência de 15 páginas |
