# Verificação independente de acessibilidade — mauricio-site (Fase 7)

Verificador: agente de auditoria, contexto novo, sem acesso ao histórico do autor (nível **fresh-context**, conforme A11Y.md §2 "Independent Verification").
Data: 2026-10-04. Alvo: WCAG 2.2 AA, perfil Standard. Commit base: `1960d55` (árvore limpa fora de `.repowise/`).

> Este relatório NÃO afirma conformidade. Ele lista o que foi reproduzido, o que foi refutado e o que não foi medido.
> A validação humana (leitor de tela, voz, Safari/VoiceOver, legendas, qualidade de alt) continua obrigatória.

## 1. Método, comandos e versões

| Item | Valor |
| --- | --- |
| Node / Python | Node 24.21.0; Python 3.12.0 (`.venv-i18n`) |
| Playwright | 1.58.2 (Chromium 145.0.7632.6, Firefox do mesmo pacote; WebKit não usado) |
| axe-core | 4.11.4 via `@axe-core/playwright` 4.11.3, tags `wcag2a, wcag2aa, wcag21a, wcag21aa, wcag22aa` |
| Build | `npx vite build --outDir <scratchpad>\dist --emptyOutDir` -> `built in 14.52s`, exit 0 |
| Servidor | `vite preview --port 4399 --strictPort --outDir <scratchpad>\dist` (encerrado ao final) |
| Escopo | 75 páginas: 42 PT (`src/*.html`) + 33 EN (`src/en/*.html`) — o enunciado dizia 32 EN; a contagem real do glob é 33 |
| Bloqueado | apenas `googletagmanager`, `google-analytics`, `clarity.ms`, `doubleclick`. CDNs e YouTube carregaram de verdade |

Desvio declarado: usei `vite build` direto, e não `npm run build`, porque o `prebuild` roda `sync-i18n --soft`, que pode regravar `src/en/**` (você proibiu editar o repositório). O resultado de build é o mesmo; só o hook de i18n não rodou. Conferi `git status` ao final: nenhuma alteração fora de `.repowise/` (que já estava modificado antes de eu começar).

Sondas próprias (todas em `...\scratchpad\fase7\`): `lib.mjs`, `axe.mjs`, `structure.mjs`, `tab3.mjs` (e `tab4/5`), `reflow-motion.mjs`, `raf.mjs`, `pixmotion*.mjs`, `targets.mjs`, `tablists.mjs`, `dialogs.mjs`, `cookie.mjs`, `alt.mjs`, `axe-mobile.mjs`, `en-leak.mjs`, `focus-all*.mjs`, `inview*.mjs`. Resultados brutos em `*.json` na mesma pasta.

Convenção de teclado: "parada de Tab" = `page.keyboard.press('Tab')`, espera a rolagem estabilizar (>= 550 ms + polling), mede `document.activeElement`. Indicador de foco = (a) estilo computado e (b) diferença de pixels do recorte do elemento focado x desfocado (limiar de 24 em soma RGB). Elemento "encoberto" = `elementFromPoint` em 5 pontos do retângulo devolve algo que não é o próprio elemento, nem ancestral nem descendente.

Armadilha de medição que descartei: nas primeiras execuções aparecia "fora da viewport" e "ciclo de foco" em várias páginas. Eram artefatos de rolagem suave (o Tab ainda estava rolando quando medi). Com espera maior e checagem por identidade de nó (WeakMap), desapareceram. Os achados abaixo só incluem o que persistiu em reexecução com espera longa.

## 2. Resultado por item

| # | Item | Veredito | Números |
| --- | --- | --- | --- |
| 1 | axe, 75 páginas, 1280x800 | **PARCIAL** | 54/75 páginas sem violação. 66 nós no total: 58 são do DOM interno do player do YouTube (18 páginas, regras `aria-allowed-attr`, `aria-prohibited-attr`, `button-name`), 6 em páginas de EXCEPTIONS (diagnostic 2 `label`, test-github 2 `label`, exemplopdi 2 `color-contrast`), **2 do site** (`frame-title` em proposta-observabilidade-mobile PT+EN). Passada `reducedMotion: reduce`: idêntica (66 nós, nenhuma diferença). Extra a 375x812: ver Achados 3, 8, 9. `incomplete` do axe: 2447 nós de `color-contrast` (não decidíveis) e 1 `video-caption` (vsl, EXC) |
| 2 | Estrutura, 75 páginas | **PARCIAL** | h1 = 1 em todas as não-EXC; `<main>` = 1 em todas exceto 6 EXC (admin, admin-editor, diagnostic, mapmind, test-github, vsl); `lang` = `pt-BR` nas raízes e `en` nos espelhos, sem divergência; `<title>` presente; únicos exceto as 2 páginas admin (EXC). Primeiro Tab = "Pular para o conteúdo" em todas as não-EXC (Chromium e Firefox). O skip **funciona** (próximo Tab cai dentro/depois de `<main>`) em todas **exceto engenharia-agentes-ia PT e EN** (Achado 2). Nenhuma página bloqueia zoom |
| 3 | Teclado, 8 páginas | **FAIL** | Sem armadilha de foco: todas as 8 saem da página pelo Tab. Paradas (Chromium): index 131, catalogo 40, eai 123, devin 31(+iframe), artifice 41(+iframe), operacao 6, curriculo 71, life3d 3. Falhas: Achados 1, 5, 6, 12. Tablists: 14/14 aceitam setas/Home/End, 1 só `tabindex=0` (Achado 11 é cosmético). Diálogos: curriculo, operacao (glossário) e `<dialog>` de cookies abrem por teclado, Esc fecha, foco volta ao gatilho; life3d `#intro` não gerencia foco (Achado 12) |
| 4 | Reflow 320x256 + zoom | **PASS** (fora de EXC) | 73/75 sem rolagem horizontal do documento. Rolam: `exemplopdi` (461 px) e `test-github` (353 px), ambas listadas em EXCEPTIONS. Zoom: 0/75 com `user-scalable=no` ou `maximum-scale` |
| 5 | Movimento sob `reduce` | **PARCIAL** | Animações CSS/WAAPI infinitas: **0 em 75** páginas sob `reduce` (118 em 32 páginas sem a preferência). Mas há laço `requestAnimationFrame` visível sob `reduce`: Achado 7. Nas páginas sem preferência, as 118 animações infinitas não foram classificadas uma a uma (essencial/decorativa, existe pausa?) |
| 6 | Alvos 24x24 | **PARCIAL** | Nas 8 páginas, 1280 e 375 px: 7 alvos reprovam sem espaçamento compensatório, todos `a.eai-chap__link` (Achado 10). O resto é: ou inline em texto, ou tem espaçamento suficiente pelo critério de círculo de 24 px |
| 7 | Contraste | **PASS** (pares medidos) | Tabela abaixo. Não cobre gradientes, imagens, nem os 2447 nós "incomplete" do axe |
| 8 | `verify-a11y.py` | **FAIL** | 24 erros, 32 avisos (`--src src`). Classificação abaixo |
| 9 | `alt` de imagens | **PASS** (presença) / NÃO VERIFICADO (qualidade) | 30 `<img>` nas 75 páginas (DOM pós-JS): 0 sem `alt`, 0 com nome de arquivo, 0 com `aria-hidden` + alt. 4 com `alt=""` (poster do player em botão com `aria-label`, decorativo plausível). Outros achados de nome: Achados 3 e 8 |
| 10 | Não verificado | ver seção 5 | |

### Item 7 — contraste recomputado

`contrast-check.py` (padrão Standard: texto 4.5, UI 3.0) e conferido por fórmula própria (WCAG 2.x, luminância relativa) com os mesmos valores.

| Primeiro plano | Fundo | Razão | Texto 4.5 | UI 3.0 |
| --- | --- | --- | --- | --- |
| `#c9d1d9` (corrido) | `#0d1117` | 12.26:1 | PASS | PASS |
| `#99a1af` (muted) | `#0d1117` | 7.27:1 | PASS | PASS |
| `#94a3b8` (muted) | `#0d1117` | 7.38:1 | PASS | PASS |
| `#58a6ff` (link/accent/anel de foco) | `#0d1117` | 7.49:1 | PASS | PASS |
| `#c9d1d9` | `#161b22` (card) | 11.21:1 | PASS | PASS |
| `#99a1af` | `#161b22` | 6.65:1 | PASS | PASS |
| `#94a3b8` | `#161b22` | 6.75:1 | PASS | PASS |
| `#58a6ff` | `#161b22` | 6.85:1 | PASS | PASS |
| `#6a7282` (referência; usado em exemplopdi) | `#0d1117` | 3.91:1 | **FAIL** | PASS |

### Item 8 — `verify-a11y.py` (`python tools\a11y\verify-a11y.py . --src src`)

Resultado: **FAIL, 24 erros, 32 avisos**. Rodando na raiz (`.`) dá 30 erros e 40 avisos, porque varre `playwright-report/` (gerado); tomo `--src src` como a medição válida.

| Qtde | Regra / arquivo | Classe | Nota |
| --- | --- | --- | --- |
| 1 | `artifacts`: `REPORT.md` não existe | **(c) falta de artefato** | Só há `docs/a11y/templates/REPORT.md`. `EXCEPTIONS.md` e `A11Y-DECISIONS.md` existem. A11Y.md §2 "Release Evidence" e §7 exigem o relatório |
| 1 | `clickable-div` `src/admin-editor.html:50` | (b) violação real | Já em EXC-003 |
| 2 | `placeholder-label` `src/diagnostic.html:101`, `src/test-github.html:62` | (b) violação real | Já em EXC-001/002; o axe confirma (`label`, 2 nós cada) |
| 2 | `half-climbed-aria` `src/js/eai-pilares.js:21`, `src/js/devin/components.js:41` | **(a) falso positivo** | `enhanceTablist()` de `a11y-tabs.js` completa o padrão. Reproduzi por teclado nas 14 tablists (setas, Home, End, `tabindex` roving, Tab sai) |
| 16 | `aria-soup` `role="list"` em `src/engenharia-agentes-ia.html` (8) e `src/en/...` (8) | **(a) falso positivo deliberado** | Medi `list-style-type: none` em 7 das 8 listas (idiom Safari/VoiceOver). Uma das `ol` está vazia no momento da medição |
| 2 | `aria-soup` `role="navigation"` em `<nav>`: `src/life.html:894`, `src/en/life.html:899` | (b) violação real, trivial | EXC-007; remover o role redundante |

Avisos relevantes: 4 `orphaned-aria` em operacao-capital-cognitivo (`help-title`, `glossary-title` PT e EN): **(a) falso positivo**, os ids são criados por JS; medi `aria-labelledby` resolvido com o diálogo aberto. 1 `media-autoplay` em `vsl.html:36` (EXC-005, real). 2 `half-climbed-aria role="tree"` em engenharia-agentes-ia (não investigado). 25 `outline-none`: ver item 3, varredura de 3284 elementos focáveis sem indicador ausente confirmado.

## 3. ACHADOS (ordenados por gravidade)

Severidade segue A11Y.md §1. "Reproduzir" assume o `vite preview` em `localhost:4399`, contexto novo (sem `localStorage`), viewport 1280x800, Chromium, salvo indicação.

**1. Banner de cookies fixo encobre o foco do teclado — SC 2.4.11 (AA) — ALTA**
- Em `index.html`, 29 de 131 paradas de Tab ficam inteiramente atrás de `.cc-banner` (fixo, 119 px, y=680..799). Em `curriculo.html`, 21 de 71. Firefox: 30 e 21. Com consentimento gravado no `localStorage`: **0** em ambas, e nas 8 páginas. Ou seja, afeta todo visitante novo que use teclado.
- Os botões do banner são os **últimos** da ordem de foco: 130 Tab para chegar a "Aceitar todos" em `index`. O CSS tem `body{padding-bottom:119px}` (reserva só no fim da página), mas não há `scroll-padding-bottom`, então elementos que já estão na janela não rolam e ficam sob o banner.
- Após Enter em "Recusar todos", o foco vai para `BODY` (perdido).
- Reproduzir: `node scratchpad\fase7\tab3.mjs chromium` e `tab5.mjs` (com consentimento); script `cookie.mjs`. Seletor: `elementFromPoint(centro do foco).closest('.cc-banner')`.

**2. "Pular para o conteúdo" e todas as âncoras internas não funcionam por teclado em engenharia-agentes-ia (PT e EN) — SC 2.4.1 (A), 2.4.3 — ALTA**
- `src/js/eai.js:87-98` intercepta cliques em `a[href^="#"]` com `preventDefault()` + `lenis.scrollTo()`. O hash não muda, o foco permanece no link, e o próximo Tab vai para o `eai-nav__brand`, fora de `<main>`. 42 âncoras na página sofrem do mesmo problema. Sob `prefers-reduced-motion: reduce` o código não instala o handler e o skip funciona (reproduzi).
- Reproduzir: carregar `/engenharia-agentes-ia.html`, `Tab`, `Enter`, `Tab` -> `A.eai-nav__brand`; `location.hash === ''`. Script `eaiskip.mjs`.

**3. Botões de menu (hambúrguer) sem nome acessível em larguras estreitas — SC 4.1.2, 1.1.1 — ALTA**
- `salesforce-agentic-dev`, `salesforce-agentic-quickstart` (`<button @click="open = !open" class="lg:hidden ...">`) e `proposta-observabilidade-mobile` (`#mobile-menu-btn`), PT e EN (6 páginas). `ariaSnapshot` a 375 px: `button: - img` (sem nome). Sem `aria-label`, sem `aria-expanded`/`aria-controls`.
- O axe a 1280 não vê (elemento oculto por `lg:hidden`/`md:hidden`); a 375 ele só sinalizou `button-name` fora do YouTube em `salesforce-agentic-quickstart`, mas o snapshot de acessibilidade confirma as três. Reproduzir: `mobile-checks.mjs`.

**4. Idioma das partes: texto em português dentro de páginas `lang="en"` — SC 3.1.2 (AA) — ALTA**
- `<eco-nav>` (shadow DOM; "Abrir o mapa do ecossistema do site", "Fechar o mapa do ecossistema", "Ver catálogo completo") aparece em português em 22 espelhos EN, sem `lang`. O banner/diálogo de cookies (`cookie-consent.js` não tem i18n) aparece em português em `en/index`, `en/curriculo`, `en/cookies`, `en/privacidade`, `en/termos`, sem `lang`. Leitor de tela lê com o motor inglês.
- Reproduzir: `en-leak.mjs` -> `en-pt-leak.json`; ou abrir `/en/index.html` com `localStorage` limpo.

**5. devin.html (e EN): link de e-mail do encerramento recebe foco com `opacity: 0` — SC 2.4.7 (AA); A11Y.md §6 "Conteúdo Refém do JavaScript" — MÉDIA-ALTA**
- `a.ep09-encerramento__cta` ("mauricio@issei.com.br") computa `opacity: 0` mesmo 2,5 s após o foco; a captura mostra a seção "Mauricio Yokoyama Issei / Tech Lead" sem o link. `:focus-visible` verdadeiro, outline 2 px definido, mas nada aparece. Evidência: `fase7\dev28full.png`, `dev28b.mjs`.

**6. operacao-capital-cognitivo (e EN): painel de evidências fechado continua focável, fora da tela — SC 2.4.7, 2.4.3 — MÉDIA**
- `aside#evidence-panel` (`translate-x-full`, sem `inert`, `aria-hidden` ou `visibility:hidden`) mantém `#evidence-panel-close` na ordem de Tab; o foco cai em x=1538 (viewport 1280) e nunca entra na janela. Reproduzir: `inview2.mjs`, `opevid.mjs`. As outras 5 paradas da página estão corretas.

**7. proposta-engenharia-reversa (e EN): animação de canvas ignora `prefers-reduced-motion` e não tem pausa — SC 2.2.2 (A), regra da casa de 2.3.3 — MÉDIA**
- `#hero-canvas` com laço `requestAnimationFrame` (`src/proposta-engenharia-reversa.html:1763`); a folha `#a11y-motion` da própria página só cobre CSS. Sob `reduce`: 43-47 rAF/s e ~1.5 mil pixels mudando entre quadros (bbox 1,60 -> 1278,598). Sem controle de pausa. `life.html` (canvas de jogo) também segue animando sob `reduce` (~1.4 mil px); é jogo interativo, menor peso. `devin` tem laço rAF (64/s) mas **0 pixels** mudam. Reproduzir: `raf.mjs`, `pixmotion.mjs`, `pixmotion2.mjs`.

**8. proposta-observabilidade-mobile (e EN): `<iframe>` do YouTube sem `title` — SC 4.1.2 / 2.4.1 — MÉDIA**
- axe `frame-title` (serious) a 1280 e 375. `<iframe src="https://www.youtube.com/embed/0xLFIeZovXs" ...>` sem `title`. Reproduzir: `alt.mjs` (`iframesNoTitle`), axe.

**9. A 375 px, 25 páginas têm regiões roláveis (tabelas, blocos de código) sinalizadas pelo axe — SC 2.1.1 — BAIXA-MÉDIA**
- Regra `scrollable-region-focusable` em 25 páginas a 375 px (a 1280 não aparece), p.ex. `agent-ready`, `case-agents`, `cookies`, `privacidade`, `engenharia-confianca`, `salesforce-agentic-quickstart`. Em Chromium 145 o Tab alcança o contêiner mesmo assim (testei `agent-ready`: 18 Tab até `.ar-tablewrap`), então o impacto real depende do navegador (Safari não testado). Reflow a 320 px é um cenário de zoom de 400%, usado com teclado.

**10. `a.eai-chap__link` abaixo de 24 px sem espaçamento — SC 2.5.8 — BAIXA**
- `engenharia-agentes-ia`: 94x19, 129x19, 97x19, 98x19, 97x19 (1280 px: 5 casos) e 2 casos a 375 px. O círculo de 24 px intersecta o `<summary>` vizinho. Reproduzir: `targets.mjs` (critério de círculo é aproximação minha, não o texto normativo palavra por palavra).

**11. engenharia-confianca (PT e EN): tablist de maturidade sem aba `aria-selected="true"` ao carregar — APG — BAIXA**
- 0 de 5 abas selecionadas no início; teclado e `tabindex` roving funcionam.

**12. life3d `#intro` (`role=dialog aria-modal=true`) não gerencia o foco — A11Y.md §6 "Focus Traps Vazados", SC 2.4.3 — BAIXA**
- No carregamento `document.activeElement` é `BODY`; fundo não fica `inert`; o Tab alcança o skip link, o botão "Iniciar Jornada" e `eco-nav`. O botão tem indicador de foco por troca de fundo (10 mil pixels de diferença).

**13. Marcação do player do YouTube dentro de `<iframe>` gera 58 nós de violação axe em 18 páginas — Informativo**
- É DOM de terceiro (`ytmVideoInfoVideoTitle`, `#movie_player`, `ytmVideoInfoChannelAvatar`). Não é código do site, mas aparece em qualquer scanner. O facade `eai-video` (poster + botão) evita isso.

**14. Processo: `REPORT.md` ausente — A11Y.md §2/§7 — ALTA (processo)**
- O gate estático falha por isso. Também: o texto de EXCEPTIONS.md ("Atualização Fase 5") diz que `admin`, `admin-editor` (6 animações cada) e `exemplopdi` (1) ignoram `reduce`; medi 0 animações CSS infinitas sob `reduce` nessas três (texto defasado ou corrigido). As demais exceções confirmadas como ainda presentes: exemplopdi `color-contrast` (2 nós) e reflow, test-github reflow e `label`, diagnostic `label`. Datas de expiração (2027-04-03) estão no futuro.

## 4. O que NÃO foi refutado (para o autor saber onde procurei e não achei)

- Indicador de foco: varredura de 3284 elementos focáveis em 75 páginas (limite 160/página, estilo computado e diferença de pixels onde necessário) + varredura completa por Tab nas 8 páginas: nenhum elemento sem indicador confirmado fora dos Achados 1, 5, 6. 137 suspeitos iniciais eram artefatos de rolagem e sumiram na reverificação.
- Foco entra na viewport: reverificado por Tab com espera longa em 12 páginas; nada fica fora da janela exceto Achado 6.
- Diálogos: foco entra, Esc fecha, foco volta ao gatilho em curriculo e operacao e no `<dialog>` de cookies. Em curriculo, a partir do título o primeiro Tab sai do diálogo para a UI do navegador antes de chegar ao botão Fechar (alcançável por Shift+Tab); é aceitável pelo APG, só registro.
- Tablists: 14 tablists (PT+EN) com setas, Home/End, `aria-controls` válido, 1 só `tabindex="0"`, Tab sai.
- Reflow e zoom: ver item 4. Contraste dos pares principais: ver item 7.

## 5. NÃO VERIFICADO

| O quê | Por quê | Quem faz |
| --- | --- | --- |
| Leitor de tela (NVDA/JAWS/VoiceOver/TalkBack): nomes, ordem de leitura, anúncios, `aria-live`, eco-nav em shadow DOM | Sem leitor de tela no ambiente; árvore de acessibilidade só lida por `ariaSnapshot` | Pessoa com leitor de tela |
| Controle por voz (SC 2.5.3 "Label in Name") | Sem Voice Control/Voice Access; não comparei nome acessível x rótulo visível em todos os controles (o axe tem essa regra desligada) | Pessoa com controle por voz |
| Safari/WebKit real (inclui foco por Tab em links, scroll focável, skip link) | WebKit não executado; Safari é o caso de `role="list"` e de contêiner rolável | Pessoa com Safari/iOS |
| Firefox: varredura de teclado só por estilo computado (sem pixels) | O método de pixel com `blur()` embaralha a ordem de Tab no Firefox; em `artifice` o Tab sai ao passar pelo iframe do YouTube (provável artefato do modo headless) | Pessoa com Firefox desktop |
| Qualidade e adequação de `alt` / classificação de imagem decorativa | Só medi presença e padrões suspeitos; julgar o conteúdo é decisão humana (A11Y.md §2 Image Evidence) | Autor/editor |
| Legendas, transcrição, audiodescrição de vídeos (YouTube, NotebookLM, `vsl.mp4`) | Não assisti aos vídeos; não existe `<track>` nas páginas medidas | Pessoa que assista e revise |
| Contraste de texto sobre gradiente/imagem/canvas; 2447 nós `color-contrast` "incomplete" do axe | O axe não decide; só medi pares sólidos declarados | Revisão manual/colorímetro |
| SC 1.4.12 (espaçamento de texto), 1.4.4 (200% de texto), 1.4.13 (conteúdo em hover/foco), 2.5.7 (arrastar), 3.3.x em formulários (EXC), 1.3.4/1.3.5, 3.2.6 | Não escrevi sondas para esses critérios | Revisão manual |
| 118 animações infinitas sem `reduce` em 32 páginas: são essenciais/decorativas? há pausa? (SC 2.2.2) | Medi a contagem, não classifiquei cada uma | Revisão manual |
| Rolagem suave (Lenis), parallax e efeitos GSAP sob `reduce` | `getAnimations()` e rAF não enxergam tudo; só pixel-diff em 6 páginas | Revisão manual |
| Largura entre 320 e 1280 px e orientação paisagem; reflow com texto a 200% | Medi só 320x256 e 375x812 | Revisão manual |
| Alvos 2.5.8 nas 67 páginas fora do conjunto de 8 | Escopo pedido era 8 páginas | Autor |
| Páginas EXC: não aprofundei além dos números de EXCEPTIONS.md | Fora de escopo declarado pelo dono | Dono do risco |
| Comportamento em produção (CloudFront, headers, cache) | Medi o build local em `vite preview` | Autor |

Nada acima foi marcado como verificado sem evidência reprodutível.
