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
- **Perfil de conformidade** → WCAG 2.2 AA, Compliance Profile **Standard**; as exceções localizadas de 7:1 (`apresentacao`, ADR-ap-001) permanecem. *(2026-10-03)*
- **Integração do protocolo** → cópia versionada em `docs/a11y/` com SHA fixado e carga preguiçosa; sem `@import` no `AGENTS.md` (41 KB entraria em toda sessão). *(2026-10-03)*
- **Páginas utilitárias** → só `boutique-empresarial-showcase` é corrigida; as demais seguem em `EXCEPTIONS.md` com a catraca impedindo piora. *(2026-10-03)*
