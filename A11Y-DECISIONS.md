# Registro de Decisões A11Y (Memória de Padrões)

Só o que **não** se deriva de `docs/a11y/A11Y.md` nem do código. Uma linha por padrão. Leia antes de criar componente interativo.
Decisões em análise (ainda não aprovadas) ficam em `docs/specs/a11y-first/A11Y-DECISIONS.md`.

## Decisões

- **Texto de apoio (muted) sobre fundo escuro** → `#99a1af` (Tailwind `gray-400`), nunca `gray-500/600` nem `slate-500` como cor de texto — 5,85–7,74:1 medido sobre os 8 fundos do site; `gray-500` dá 3,15–4,16:1. *(2026-10-03, aprovado pelo autor)*
- **Páginas de matiz slate** → `text-slate-400` no lugar de `gray-400`; **`devin`** (paleta própria) → muted `#94A3B8`, rótulo laranja sobre painel `#1f3356` `#FF7A2E` (4,85:1; `--color-human` dá 4,20:1), roxo em texto `#A78BFA`. A hierarquia dim/mid/low do `devin.css` foi achatada em `#94A3B8` — os três níveis valiam 1,3–3,5:1. *(2026-10-03, Fase 2)*
- **Texto azul** → `#58a6ff`; `#007bff` só como fundo, borda ou ícone — 6,03:1 vs 3,82:1 sobre `#21262d`. *(2026-10-03, já era regra do STYLE_GUIDE)*
- **Link em corpo de texto** → sublinhado persistente quando a cor do link não contrasta ≥ 3:1 com o texto ao redor; clarear o texto de apoio (Fase 2) fez `sustentacao` cruzar esse limite. *(2026-10-03)*
- **Preferências de cookies / diálogos modais** → `<dialog>` + `showModal()`, foco inicial no título (`tabindex=-1`), foco volta ao gatilho e, se ele sumiu, ao botão fixo; fechar por Esc, Cancelar ou clique no fundo. *(2026-10-03, Fase 3, D-08)*
- **Escolha com botão Salvar** → checkbox nativo (pode ter aparência de chave), não `role=switch`; item obrigatório fica focável com `aria-disabled` e a descrição associada. *(2026-10-03)*
- **Botões de ação principal** → ≥ 44 px de altura; Aceitar e Recusar com mesmo tamanho e tipografia, borda do Recusar ≥ 3:1. *(2026-10-03, D-09)*
- **Elemento fixo no canto** → quem cobre outro publica uma variável CSS e o outro se desloca (`--cc-banner-h` ↔ `<eco-nav>`); nada de z-index maior. *(2026-10-03)*
- **Skip link** → `<a class="a11y-skip" href="#conteudo">Pular para o conteúdo</a>` como 1º filho do `<body>` + `<style id="a11y-skip">` inline no `<head>` (aparece só no foco, `transition:none`); alvo `<main id="conteudo">`. Inline por página: as páginas misturam 5 mecanismos de CSS. *(2026-10-03, Fase 4)*
- **Botão de mídia play/pause** → nome fixo + `aria-pressed`; ícone `aria-hidden`; foco com `focus-visible:outline`, nunca `focus:outline-none` sozinho (D-04: corrigido no lugar, 1 uso). *(2026-10-03)*
- **Foco na carga** → nenhuma página move o foco sozinha ao carregar (`life.html` deixou de focar o canvas): tira o skip link da ordem de Tab. *(2026-10-03)*
- **Grid responsivo** → `minmax(min(100%, Npx), 1fr)`, nunca `minmax(Npx, 1fr)` puro (mínimo maior que a tela estoura a 320 px); item de grid/flex que contém `<pre>`, tabela ou texto sem espaço leva `min-width:0`. *(2026-10-03, Fase 5)*
- **Bloco que rola** → `src/js/a11y-scroll-regions.js` dá `tabindex=0` + `role=region` + `aria-label` só quando o conteúdo de fato rola; tabela larga vai dentro de `overflow-x-auto`. *(2026-10-03)*
- **Movimento reduzido** → bloco `@media (prefers-reduced-motion: reduce)` com `animation-duration:.01ms; iteration-count:1; transition-duration:.01ms` em toda página que anima (snippet inline `<style id=a11y-motion>`). *(2026-10-03)*
- **Modal sem `<dialog>`** (currículo) → botão de fechar nativo, resto da página `inert` enquanto aberto, foco devolvido ao gatilho. *(2026-10-03)*
- **Foco** → toda página recebe `:where(a[href],button,summary,input,select,textarea,[tabindex]):focus-visible{outline:2px solid #58a6ff;outline-offset:2px}` do plugin Vite `a11y-focus-base` (especificidade zero: o estilo da página manda); `summary` usa `outline-offset:-4px` (contêiner `overflow:hidden` recorta o anel). Nunca confiar no anel padrão do navegador em fundo escuro. *(2026-10-03, Fase 6)*
- **Tabs** → `enhanceTablist()` de `src/js/a11y-tabs.js`: tabindex móvel, ←/→ (↑/↓ se vertical), Home/End, ativação automática, `aria-controls` + `role=tabpanel` + `aria-labelledby`. Quem seleciona é a página (`aria-selected`). *(2026-10-03)*
- **Opções de pergunta (quiz)** → `role=group` nomeado pelo enunciado; a escolhida leva `aria-pressed`; explicação em `aria-live=polite`. **Resultado que muda sob controle** (calibrador) → `role=status`. *(2026-10-03)*
- **Elemento fixo que cobre o foco** (`<eco-nav>`) → sai da frente (`data-away`) quando o foco de outro elemento cai embaixo dele e volta ao receber foco. *(2026-10-03)*
- **Tradutor** → segmento cuja tradução volta vazia mantém o texto de origem (um botão em PT é melhor que um botão sem nome). *(2026-10-03)*
- **Perfil de conformidade** → WCAG 2.2 AA, Compliance Profile **Standard**; as exceções localizadas de 7:1 (`apresentacao`, ADR-ap-001) permanecem. *(2026-10-03)*
- **Integração do protocolo** → cópia versionada em `docs/a11y/` com SHA fixado e carga preguiçosa; sem `@import` no `AGENTS.md` (41 KB entraria em toda sessão). *(2026-10-03)*
- **Páginas utilitárias** → só `boutique-empresarial-showcase` é corrigida; as demais seguem em `EXCEPTIONS.md` com a catraca impedindo piora. *(2026-10-03)*

## `role="list"` em `<ul>/<ol>` com `list-style:none` (decidido na Fase 7)
- **Decisão:** manter. Safari/VoiceOver deixa de anunciar "lista, N itens" quando `list-style:none`; o `role="list"` explícito restaura. É o único uso de `role` redundante aceito; `role="main"`/`"navigation"` em landmark nativo continuam proibidos.
- **Onde:** `engenharia-agentes-ia` (8 listas). **Consequência:** `verify-a11y.py` reporta `aria-soup` (16 ocorrências com o espelho EN): falso positivo conhecido, declarado no `REPORT.md`.
- **Evidência:** auditor independente mediu `list-style-type: none` (Fase 7). Comportamento em VoiceOver real: **não verificado**.

## Banner de cookies e foco (Fase 7)
- A faixa fixa reserva altura no fim da página (`padding-bottom`) **e** `scroll-padding-bottom` (senão o Tab em elemento já visível o deixa sob a faixa). Ao fechar a faixa pelo teclado o foco vai ao botão de preferências.
- Texto do consentimento só em português (F-18): em páginas `lang="en"` os elementos levam `lang="pt-BR"` (SC 3.1.2) até a tradução jurídica existir. O mesmo vale para `<eco-nav>`.

## Auditoria v2 (2026-10-05, `docs/specs/a11y-first/auditoria-v2.md`)
- **Cabeçalho fixo e foco** → `:where(html){scroll-padding-top:6rem}` injetado pelo plugin `a11y-focus-base` em toda página (28 têm cabeçalho fixo, 61–81 px). Especificidade zero: página com valor próprio manda. É a contraparte do `scroll-padding-bottom` do banner; só cobre quem volta com Shift+Tab, por isso o teste é de trás para frente.
- **Animação de entrada (revelar no scroll)** → a regra que zera a opacidade só vale sob `.js` (`.js .reveal{opacity:0}`); a classe `js` entra por script inline antes do primeiro paint (plugin `a11y-focus-base`). Sem JS, o estado padrão é o legível (`A11Y.md` §6). Padrão que o `curriculo` já usava. A catraca cobra com `nojs:hidden`.
- **Tooltip dentro de botão** (`artifice`) → o `role=tooltip` leva `aria-hidden="true"` (fica fora do nome do botão; o `aria-describedby` continua lendo, pois referência direta inclui conteúdo oculto); Esc marca `data-dismissed`, que o CSS respeita até o ponteiro ou o foco saírem; o tooltip oculto usa `display:none` (`visibility:hidden` ainda alargava a área rolável).
- **Widget de arrastar** (OCC) → mantém o `draggable` e ganha o caminho "selecionar e acionar o destino" com `role=button`, `tabindex=0`, Enter/Espaço e `aria-pressed`. Fica `div` porque o Firefox não arrasta `<button draggable>`. Nunca `role="application"` sem tratar teclas.
- **Espelho EN** → não pode ter mais elementos de texto vazios que a fonte PT (`tests/i18n-mirror-empty.test.mjs`). Ao corrigir o tradutor, regenere com `--files` só os espelhos que o teste acusar; `--all` gera ruído (medido: 650 linhas em 41 arquivos, com pioras).
- **Catraca** → regras *best-practice* do axe entram como `bp:<regra>`; página que diverge do baseline é medida de novo, sozinha, antes de falhar. `nojs:hidden` em `life3d` (PT+EN) é **falso positivo conhecido**: os overlays de jogo ocultos (`#modal`, `#ending`, `#proximity-hint`) não são conteúdo.
