---
id: A11Y-AUDIT-001
titulo: Auditoria de acessibilidade — estado atual (baseline)
versao: 0.1.0
status: rascunho — aguarda aprovação humana
data: 2026-10-03
padrao-alvo: WCAG 2.2 AA · A11Y.md v2.2.0 · Compliance Profile Standard
relacionado: [product-spec.md, ux-spec.md, architecture.md, implementation-plan.md, testing-strategy.md, A11Y-DECISIONS.md]
---

# Auditoria de acessibilidade — baseline

Esta auditoria **não altera código**. Ela mede o estado atual e ranqueia por impacto na
**conclusão de tarefa** (ver [product-spec.md](product-spec.md) §3), não por contagem de violações.

## 1. Método e nível de evidência

Cada achado carrega um nível. Ferramenta automatizada detecta só uma fração das barreiras reais.

| Nível | Significa | Como foi obtido |
| :-- | :-- | :-- |
| **M** | Medido em runtime | axe-core 4.11 (`wcag2a/2aa/21a/21aa/22aa`) no **build de produção** (`vite build` + `vite preview`), Chromium 1280×800, 2026-10-03; sondas próprias de Tab, 320px, `reducedMotion` |
| **C** | Lido no código | leitura direta do arquivo citado |
| **H** | Heurística estática | grep/regex sobre `src/*.html`; sujeita a falso positivo |
| **?** | Não verificado | exige pessoa, leitor de tela real ou ferramenta não executada |

Escopo: as **41 páginas PT-BR** de `src/*.html`. As 32 páginas de `src/en/` são **geradas** (`sync-i18n`);
corrigir a fonte PT-BR corrige o espelho — não são auditadas em separado.
Dados brutos: sondas em scratchpad da sessão (não versionadas).

Ressalva metodológica: o contraste foi **reconferido** com animações finalizadas e `reducedMotion`
(resultado estável, abaixo), para descartar falso positivo de transição.

## 2. Resultado em uma tela

| Sev. | Qtde | Achados |
| :-- | :-: | :-- |
| 🔴 CRITICAL | 3 | F-01 modal de cookies sem gestão de foco (site inteiro) · F-02 botão sem nome (`proposta`) · F-03 campos sem rótulo (`diagnostic`, `test-github`) |
| 🟠 HIGH | 8 | F-04 contraste sistêmico · F-05 zoom bloqueado (`life`, `life3d`) · F-06 reflow 320px · F-07 ARIA proibido (`life3d`) · F-08 movimento reduzido · F-09 bypass blocks/landmarks · F-10 alvo do botão de consentimento · F-11 link só por cor |
| 🟡 MEDIUM | 4 | F-12 região rolável sem foco · F-13 h1 duplicado/iframe como 1º foco · F-14 `span role=button` · F-15 alvos <24px (heurística) |
| ⚙️ Processo | 1 | G-01 o gate cobre axe de página inteira em 14 de 41 páginas e não conhece WCAG 2.2 |
| ❔ Não auditado | 4 | mídia (legendas/transcrição), qualidade de `alt`, leitor de tela real, idioma de trechos |

**O que já está bom (evidência M/C):** `lang` em 41/41 páginas · um único `<h1>` em 40/41 · todo `<img>`
tem atributo `alt` (qualidade **?**) · 16 páginas têm skip link real · `prefers-reduced-motion` tratado em
25 arquivos (HTML/CSS/JS) e `ACC-01` define safe-mode para fotossensibilidade · só 1 `outline:none` em CSS de página (`life3d.html:259`) — **mas** o verificador estático do A11Y.md achou 27 supressões de outline (incluindo a classe Tailwind `outline-none` e CSS dentro de JS) em 13 arquivos, nível warn: conferir se há indicador de foco substituto · axe `serious/critical` já roda no CI (`.github/workflows/test.yml`) ·
`tests/_helpers/axe-aaa.js` e `contrast.mjs` já existem · `<eco-nav>` documenta ARIA de disclosure.
Isto **não** é conformidade — é ponto de partida real e reutilizável.

## 3. Achados

Formato: **Local** · **Evidência** · **Quem/qual tarefa** · **WCAG** · **Causa raiz** · **Correção** · **Trade-off** · **Decisão humana?**

### 🔴 F-01 — Modal de preferências de cookies declara `aria-modal` e não gerencia foco
- **Local:** `src/js/cookie-consent.js:187–250` (`buildModal`). Carregado em todas as páginas → **41 PT + 32 EN**.
- **Evidência (C):** `role="dialog" aria-modal="true"` existem; **não há** `.focus()` ao abrir, nem contenção de Tab, nem retorno ao gatilho ao fechar. O listener de `Escape` (l. 247) é registrado em `document` a cada construção e só se remove no próprio Esc — fechar por clique ou botão o **vaza**. `guide-consent-banners.md` (A11Y.md) exige, para modal: mover foco para dentro, contê-lo, fechar com Esc e devolver o foco.
- **Quem/tarefa:** usuário de teclado e de leitor de tela em T7 (decidir sobre cookies). `aria-modal="true"` esconde o resto da página para o leitor de tela enquanto o foco real pode ficar **atrás** do diálogo.
- **WCAG:** 2.4.3 Ordem do foco (A), 2.1.2 (A, risco), 4.1.2 (A).
- **Causa raiz:** componente nasceu como "overlay visual"; semântica de diálogo foi adicionada sem o comportamento.
- **Correção:** (a) trocar o `<div role=dialog>` por `<dialog>` + `showModal()` — o navegador entrega foco, inert do fundo e Esc; (b) devolver foco ao botão "Personalizar"/FAB; (c) um único listener, removido em `close`. Toggles: um só mecanismo de estado — `aria-pressed` **ou** texto "Ativo/Inativo", não os dois; `aria-disabled` no bloqueado mantém foco (ok), mas o nome "Ativar Estritamente necessários" é enganoso → "Estritamente necessários (sempre ativo)".
- **Alternativa:** manter `div` e implementar trap à mão (mais código, mais risco). **Trade-off de `<dialog>`:** suporte é amplo (2022+); precisa do polyfill de estilo do `::backdrop`.
- **Decisão humana?** Não para o mecanismo; **sim** para o texto dos toggles (copy jurídico/LGPD).
- **Severidade:** CRITICAL pela definição do próprio A11Y.md ("modal sem gerenciamento de foco"). **Não verificado com leitor de tela real** — a medição de runtime fica na Fase 3 (`tests/a11y/consent.spec.js`).

### 🔴 F-02 — Botão de reprodução sem nome acessível
- **Local:** `src/proposta.html` `#playBtn` (l. ~273). **M** (axe `button-name`, critical, 1 nó).
- **Quem/tarefa:** usuário de leitor de tela em T4 (assistir ao vídeo/áudio da proposta) — ouve "botão" e não sabe o que faz. **WCAG** 4.1.2 (A).
- **Correção:** `aria-label` ou texto visível ("Reproduzir áudio da proposta"); refletir estado (pausar). **Decisão humana?** Não.

### 🔴 F-03 — Campos sem rótulo em páginas utilitárias públicas
- **Local:** `src/diagnostic.html`, `src/test-github.html` (`#owner`). **M** (axe `label`, critical, 2 nós cada).
- **Contexto:** ambas estão **fora do sitemap** (`vite.config.js`), mas **sem `noindex`** e publicadas. Não são tarefa de visitante (T1–T7); `admin*.html` idem.
- **WCAG:** 1.3.1, 3.3.2, 4.1.2 (A).
- **Decisão humana? SIM (bloqueadora, ver `A11Y-DECISIONS.md` D-06):** (1) corrigir os rótulos, (2) remover da produção, ou (3) `noindex` + registrar em `EXCEPTIONS.md` com dono e prazo. Recomendo (2) para `test-github`/`diagnostic` (nome indica uso interno).

### 🟠 F-04 — Contraste de texto: token utilitário abaixo de 4,5:1 (sistêmico)
- **Evidência (M, estável):** 11 páginas, ~128 nós. Pares medidos:

| Par (fg on bg) | Razão | Onde |
| :-- | :-: | :-- |
| `#6a7282` (gray-500) on `#0d1117` | **3,91** | `exemplopdi`, `knowledge-os-presentation`, `proposta-engenharia-reversa` |
| `#6a7282` on `#030712` | 4,16 | `catalogo`, `curriculo` (rodapé) |
| `#64748b` on `#0b1f33` | 3,50 | `devin` (38 nós: `.ep01-apresentacao__posicao`, `.ep02-diagrama__caption`) |
| `#62748e` on `#0b1020` | 3,97 | `socialselling` (43 nós) |
| `#4a5565` (gray-600) on `#0a0f1e` | **2,52** | `sustentacao` |
| `#007bff` on `#21262d` | 3,82 | `curriculo` `.btn-secondary` |
| `#e2e8f0` on `#2563eb` | 4,19 | `proposta-observabilidade-mobile` CTA |

- **Causa raiz (C/H):** `text-gray-500/600` e `text-slate-500` como cor de **texto** — 127 ocorrências em `src/*.html`, 15 arquivos. Não é erro de página; é **falta de piso de contraste no token**. `STYLE_GUIDE` já prescreve `#58a6ff` para texto azul e `#c9d1d9` para corpo, mas não cobre o "texto de apoio".
- **Correção (preserva a identidade):** `gray-500 → gray-400 (#99a1af)` = 5,85–7,74:1 sobre **todos** os fundos medidos (calculado). `#007bff` em texto → `#58a6ff` (6,03:1 sobre `#21262d`). CTA branco sobre `#2563eb` = 5,17:1.
- **Decisão humana?** Não, mas **revisão visual**: o muted fica mais claro; a hierarquia cinza-forte/cinza-fraco precisa continuar legível.

### 🟠 F-05 — Zoom desabilitado
- **Local:** `src/life.html:6`, `src/life3d.html:6` — `maximum-scale=1.0, user-scalable=no`. **M** (axe `meta-viewport`) + **C**.
- **Quem:** baixa visão em T5 (percorrer a jornada). **WCAG** 1.4.4 (AA), 1.4.10.
- **Correção:** remover `maximum-scale`/`user-scalable`. **Trade-off:** o jogo usa gestos de toque; zoom nativo pode competir com eles — tratar com `touch-action` nos controles, não proibindo zoom da página. **Decisão humana?** Não.

### 🟠 F-06 — Reflow a 320 px: rolagem horizontal da página inteira
- **Evidência (M):** `scrollWidth > clientWidth` em 14 páginas: `knowledge-os-presentation` (645), `salesforce-agentic-quickstart` (658), `salesforce-agentic-dev` (635), `exemplopdi` (461), `artifice` (393), `socialselling` (380), `develop-engineering` (369), `cookies` (367), `engenharia-agentes-ia` (354), `test-github` (353), `engenharia-confianca` (342), `case-agents` (340), `index` (339), `apresentacao` (338).
- **WCAG** 1.4.10 (AA). Exceção legítima: conteúdo bidimensional (tabela larga, bloco de código) **dentro do seu próprio container** — a medição é no documento, então cada caso precisa de triagem (**?**).
- **Causa raiz provável (?):** elementos de largura fixa/`min-width`, `<pre>` sem `overflow-x:auto` no container, grids sem `minmax(0,1fr)`. `index` (home, T1) é prioridade — 19 px de excesso.
- **Decisão humana?** Não; triagem por página na Fase 5.

### 🟠 F-07 — ARIA proibido em 11 elementos
- **Local:** `src/life3d.html`, pontos de `#progress-dots` (`.active`). **M** (axe `aria-prohibited-attr`, serious). **WCAG** 4.1.2. Atributo de nome em elemento sem papel que o suporte. **Correção:** dar papel adequado (lista de `<button>`/`aria-current="step"`) ou remover o atributo.

### 🟠 F-08 — Movimento reduzido incompleto
- **Evidência (M):** com `reducedMotion: reduce`, ainda correm animações CSS/WAAPI em 10 páginas; `devin.html` **sobe de 7 para 21** (o ramo "reduzido" cria animação). **H:** 24 de 41 arquivos (HTML+CSS próprio) não citam `prefers-reduced-motion`.
- **Limite da sonda:** `document.getAnimations()` não enxerga GSAP/rAF; não mede paralaxe nem vídeo/autoplay. Número = **piso**, não total.
- **WCAG** 2.3.3 (AAA — **House Rule** do A11Y.md no Standard), 2.2.2 (A) para qualquer movimento >5 s sem pausa. **Decisão humana?** Não; **sim** para "o que é conteúdo e o que é enfeite" nas páginas de storytelling (`devin`, `terminal-evolutivo`, `life*`).

### 🟠 F-09 — Contornar blocos e landmarks
- **Evidência (M):** só **16/41** páginas têm skip link real como 1º foco. **14** não têm `<main>` no DOM em runtime: `404`, `admin`, `admin-editor` (tem `<main>` no HTML-fonte e não no DOM medido — ?), `devops-salesforce`, `diagnostic`, `know`, `life3d`, `mapmind`, `proposta-observabilidade-mobile`, `proposta`, `service-operations-2-0`, `sustentacao`, `test-github`, `vsl`.
- Inclui páginas **indexadas e de proposta comercial** (T3): `devops-salesforce`, `proposta`, `service-operations-2-0`, `sustentacao`. **WCAG** 2.4.1 (A), 1.3.1.
- Primeiro foco incomum: `life.html` → `DIV`; `know.html` → `IFRAME`; `mapmind.html` → `OBJECT`. **Correção:** `<main id="conteudo">` + skip link (padrão já existe em `index.html`); não criar variante nova.

### 🟠 F-10 — Botão "Aceitar todos" menor que 24 px
- **Local:** `.cc-btn-accept` em `index` e `curriculo`. **M** (axe `target-size`, serious — **WCAG 2.2 SC 2.5.8**, invisível ao gate atual por G-01). Ação de consentimento na **home**. **Correção:** `min-height:44px` (House Rule do Standard: 44 px recomendado); mesma regra para os 3 botões do banner (paridade, `guide-consent-banners.md`).

### 🟠 F-11 — Link no texto distinguível só por cor
- **Local:** `capacidade-antes-do-acesso`, `formulacao-de-problemas` (`a[href$="engenharia-agentes-ia"]`), `socialselling` (2). **M** (`link-in-text-block`, serious). **WCAG** 1.4.1 (A). **Correção:** sublinhado persistente nos links em corpo de texto (hover não basta).

### 🟡 F-12 — `<pre>` rolável sem foco por teclado
- `salesforce-agentic-dev.html` (`pre` em card). **M** (`scrollable-region-focusable`). **WCAG** 2.1.1 (A). Conjunto: `tabindex="0"` + nome (`role=region aria-label`). Mesma página: `<dl>` com filhos inválidos (`definition-list`, 1.3.1).

### 🟡 F-13 — Estrutura de cabeçalho/incorporações
`mapmind.html` tem 2 `<h1>` (utilitária, fora do sitemap — decisão D-06). `know.html` incorpora `iframe` como 1º foco: nome do frame **?**.

### 🟡 F-14 — `span role="button"` com `onclick`
- `src/curriculo.html:1967` (`.close-button`, `tabindex=0`). Tem papel e `tabindex`; **? teclado:** confirmar Enter **e** Espaço. Preferir `<button>`. `admin-editor.html:50` tem `div onclick` — overlay de dismiss (mouse), com alternativa ? (utilitária).

### 🟡 F-15 — Alvos < 24 px (heurística)
- **H/M:** 24 páginas têm links de navegação/rodapé com 16–22 px de altura. axe só marcou 2 porque SC 2.5.8 admite exceção por **espaçamento** e por link **em linha** — a sonda os trata como candidatos. **Não declarar falha** sem checar o espaçamento; medir na Fase 5. Nomes que valem triagem: `engenharia-confianca` (55), `salesforce-agentic-quickstart` (48), `curriculo` (34).

### ⚙️ G-01 — O gate verde não significa "sem violação"
- **Evidência (C+M):** `grep expectNoSeriousA11yViolations(page)` → axe de **página inteira** em 14 páginas; `aeo.spec` e `eco-nav.spec` auditam só `.aeo`/`eco-nav`. Resultado: as **11 páginas com contraste reprovado (F-04) não estão entre as 14** — o CI nunca as audita por inteiro, então "gate verde" coexiste com ~128 nós de contraste serious. E `index` (auditada) passa o gate e falha 2.5.8 (F-10) porque o gate não conhece WCAG 2.2.
- Lacunas: (1) tags param em `wcag21aa` — **2.5.8 e demais critérios 2.2 não existem para o gate**; (2) filtra só `serious|critical`; (3) roda no dev server (FOUC já documentado em `axe.js`); (4) 5 specs com `keyboard.press`; (5) sem teste de ordem de foco, trap/restauração, 320 px ou `forced-colors` genérico.
- **Correção:** ver `testing-strategy.md` — varredura única de todas as páginas, com `baseline.json` que **só pode diminuir** (ratchet), contra o build.

### ❔ Não auditado — exige pessoa
| Item | Por quê |
| :-- | :-- |
| Mídia | `<video>/<audio>/<iframe>` em 20 páginas (**H**) e arquivos `.m4a` em `public/` (podcasts); legendas/transcrição/Libras (`guide-media.md`, `guide-sign-language-br.md`) não verificadas |
| Qualidade do `alt` | 100 % dos `<img>` têm `alt`; se descrevem a intenção só humano julga. **Não inventar.** |
| Leitor de tela real | NVDA+Firefox/Chrome, VoiceOver+Safari: ordem de leitura, anúncios (`aria-live`), simuladores e quizzes |
| Idioma de trechos | 3.1.2 — termos em inglês dentro de texto PT |
| Cognição | linguagem, carga de memória nos fluxos interativos (`guide-cognitive.md`) |
| `forced-colors` / alto contraste do SO | nenhum CSS cita `forced-colors`/`prefers-contrast` (**H**); o tema é só-escuro por decisão de marca (D-03) |

### Static gate do A11Y.md
`tools/a11y/verify-a11y.py` @ `069e213` — **FAIL (26 erros, 36 avisos)** em 2026-10-03 (`--warn-only`, escopo `src`, que inclui `src/en` gerado). `--self-test`: PASS. Código lido antes de executar (stdlib; único subprocesso = `git log` leitura; sem rede).

| Check | Qtde | Leitura |
| :-- | :-: | :-- |
| `artifacts` | 1 | `REPORT.md` ausente — esperado até a Fase 8 |
| `aria-soup` | 22 (11 PT + 11 EN) | `role=list` em `ul/ol` (8×2, `engenharia-agentes-ia`), `role=main`/`navigation` (`life`, `proposta-engenharia-reversa`). **Novo achado F-16 (Low):** os `role=list` provavelmente são o conserto Safari/VoiceOver — **não confirmado**; registrado em `EXCEPTIONS.md` EXC-007 |
| `placeholder-label` | 2 | `diagnostic`, `test-github` — confirma F-03 por outro método |
| `clickable-div` | 1 erro + 2 avisos | `admin-editor.html:50` (erro); `curriculo.html:1967` (F-14) |
| `outline-none` | 27 avisos | ver acima |
| `orphaned-aria` | 4 avisos | `operacao-capital-cognitivo` `help-title`/`glossary-title` sem id no arquivo — **talvez** gerados por JS; **?** |
| `half-climbed-aria` | 2 avisos | `role=tree` sem `treeitem` no arquivo (`engenharia-agentes-ia`) — **?** filhos vêm de `eai-*.js` |
| `media-autoplay` | 1 aviso | `vsl.html:36` — novo risco 2.2.2/1.4.2 (EXC-005) |

## 4. Matriz de severidade × tarefa

| Tarefa | Bloqueios | Atritos |
| :-- | :-- | :-- |
| T1 Entender quem é / achar prova | — | F-04 (rodapé), F-06 `index`, F-10 |
| T2 Ver o currículo e baixar | F-01 | F-04, F-10, F-14, F-15 |
| T3 Ler uma proposta | F-02 (`proposta`) | F-04 (6 págs.), F-09 (4 págs. sem `main`) |
| T4 Usar página interativa (quiz/simulador) | F-01 | F-06, F-08, F-12 |
| T5 Percorrer a jornada (`life*`, `terminal-evolutivo`) | F-01 | F-05, F-07, F-08 |
| T6 Navegar o ecossistema | F-01 | F-09, F-15 |
| T7 Decidir sobre cookies | **F-01** | F-10 |
| T8 Mantenedor edita o CV (`admin*`) | F-03 | F-14 |
