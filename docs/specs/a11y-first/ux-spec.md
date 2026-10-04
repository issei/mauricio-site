---
id: A11Y-UX-001
titulo: Especificação de UX e design system acessível
versao: 0.1.0
status: rascunho — aguarda aprovação humana
data: 2026-10-03
relacionado: [product-spec.md, accessibility-audit.md, architecture.md, A11Y-DECISIONS.md]
---

# Especificação de UX

Princípio: **marca + experiência + acessibilidade**. Nada abaixo muda a paleta Dark Tech nem a tipografia Inter;
tudo muda *dentro* delas. Referências A11Y.md carregadas só onde o componente existe (lazy):
`guide-consent-banners`, `guide-modals`, `guide-navigation`, `guide-visual-perception`, `guide-responsive-mobile`,
`guide-forms`, `guide-form-controls`, `guide-tabs-accordion`, `guide-media`, `guide-loading-skeleton`, `guide-cognitive`.

## 1. Arquitetura da informação (existente — preservada)

| Camada | Estado atual | Mudança proposta |
| :-- | :-- | :-- |
| Rotas | 41 páginas, `src/*.html`, descoberta automática do Vite | **nenhuma** |
| Navegação global | `<eco-nav>` (Shadow DOM, 5 pilares, 25 nós) + `catalogo.html` + nav inline por página | padronizar landmark e skip link; **não** criar novo componente |
| Hierarquia | 1 `<h1>`/página (40/41) | manter; ratchet bloqueia regressão |
| Landmarks | `<main>` em 28/41 | `<header>`, `<nav aria-label>`, `<main id="conteudo">`, `<footer>` em **toda** página pública |
| Gêmeo EN | gerado | herda; `lang` já correto |

Padrão de página (benchmark já no repo: `index.html`, `apresentacao.html`):
`skip link` → `<header>` + `<nav aria-label="Principal">` → `<main id="conteudo" tabindex="-1">` → `<footer>` → banner de cookies
(`region`, não-modal).

## 2. Jornadas

Formato: Objetivo · Pré-condição · Passos · Estados · Feedback · Erros · Recuperação · Resultado.

### J1 — Visitante de primeira visita (T1, T7)
- **Pré:** abre `/` sem consentimento gravado. **Passos:** (1) banner entra no DOM como `region` e **não rouba foco**; (2) Tab → skip link → nav → conteúdo; (3) o banner permanece alcançável ao fim da ordem de tabulação, **sem cobrir** o foco (`padding-bottom` reservado); (4) "Personalizar" abre `<dialog>` modal.
- **Estados:** sem decisão · aceito · recusado · personalizado. **Feedback:** após decidir, `role=status` "Preferências salvas"; foco volta ao ponto de onde saiu.
- **Erros:** `localStorage` indisponível → decisão vale na sessão, texto informa. **Resultado:** decidiu com 1 clique para aceitar **e** 1 para recusar (paridade).

### J2 — Leitor de tela lendo uma proposta (T3)
- **Passos:** landmark → heading list (H2 por seção) → mídia com nome/estado → CTA de contato. **Estados:** mídia tocando/pausada anunciada. **Erros:** sem JS, conteúdo textual íntegro (já testado em 3 páginas). **Resultado:** acha a oferta e o contato sem ver a tela.

### J3 — Teclado puro num quiz/simulador (T4)
- **Passos:** foco entra no widget; setas/Tab conforme padrão APG do tipo (tabs, radio group, disclosure); resposta → resultado **anunciado** (`aria-live=polite`), erro **associado** ao campo (`aria-describedby`) e foco levado ao primeiro erro; "Reiniciar" visível.
- **Erros:** resposta vazia → mensagem com texto (não só cor). **Recuperação:** reenvio sem perder o que foi digitado; colar permitido. **Resultado:** completa e entende a nota.

### J4 — Jornada imersiva com safe-mode (T5)
- **Passos:** `terminal-evolutivo` entra com `prefers-reduced-motion`/safe-mode **lidos**; `life`/`life3d` oferecem **versão linear em texto** de todos os beats (RG-10 de `ACC-01`). Zoom liberado (F-05); controles táteis ≥ 44 px.
- **Resultado:** conteúdo narrativo completo sem depender de movimento, WebGL ou gesto.

### J5 — Navegação pelo ecossistema (T6)
- `<eco-nav>`: gatilho `aria-expanded`; painel por pilar; Esc fecha e **devolve foco ao gatilho**; pílula do pilar atual com `aria-current`. Verificar com `guide-navigation.md`; comportamento já declarado em D-07 do componente — **testar, não presumir**.

## 3. Catálogo de componentes (reuso antes de criar)

Regra: antes de qualquer componente novo, verificar a coluna "Existe".

| Componente | Existe? | Onde | Ação |
| :-- | :-- | :-- | :-- |
| Skip link | sim (16 págs.) | `index`, `apresentacao`, `engenharia-*`… | extrair o markup canônico para um snippet documentado; **aplicar** nas 25 restantes |
| `<main id="conteudo">` | sim (28 págs.) | idem | aplicar nas 13 |
| Banner + modal de cookies | sim | `src/js/cookie-consent.js` | **corrigir** (F-01, F-10) — não substituir por CMP |
| `<eco-nav>` | sim | `src/js/eco-nav.js` | testar teclado/foco; sem reescrita |
| Quiz / simulador / playground / árvore (EAI) | sim | `src/js/eai-*.js` | auditar por tarefa T4 (Fase 5) |
| Botão de mídia (play/pause) | **cada página faz o seu** | `proposta`, `agent-ready`… | **decisão D-04**: extrair 1 `<button>` com nome+estado, ou corrigir no lugar |
| Toggle (cookies, tema?) | sim | `cc-toggle` | trocar para `<input type=checkbox role=switch>` **ou** `aria-pressed` com rótulo estável (um mecanismo) |

Cada componente — novo ou corrigido — nasce com: **semântica + teclado + foco + nome acessível + estado + feedback +
comportamento responsivo + tratamento de erro** (meta-prompt §13). É a Definition of Done do `implementation-plan.md`.

## 4. Design system — tokens de acessibilidade

Não é um sistema novo: são **pisos** sobre o `STYLE_GUIDE.md`.

| Token / regra | Valor | Origem | Observação |
| :-- | :-- | :-- | :-- |
| Texto corrido | `#c9d1d9` | STYLE_GUIDE | sem mudança |
| **Texto de apoio (muted)** | `#99a1af` (gray-400) | **novo piso** | 5,85–7,74:1 sobre `#030712 #0d1117 #0a0f1e #161b22 #13181f #0b1f33 #161e31 #21262d` (calculado). **Proíbe** `gray-500/600`, `slate-500` como cor de texto |
| Texto azul | `#58a6ff` | STYLE_GUIDE | `#007bff` só em fundo/borda/ícone (4,76:1 sobre `#0d1117`, 3,82 sobre `#21262d`) |
| CTA preenchido | texto `#ffffff` sobre `#2563eb` | **novo** | 5,17:1; `#e2e8f0` sobre `#2563eb` = 4,19 ✗ |
| Foco | anel 2 px, contraste ≥ 3:1 com o fundo, offset 2 px | House Rule | nunca `outline:none` sem substituto; `:focus-visible` |
| Alvo | ≥ 24×24 (WCAG 2.5.8) · **44×44 recomendado** | AA + House Rule | links em linha isentos; navegação e botões **não** |
| Fonte mínima | 12 px (Standard) | A11Y.md | corpo permanece 16–18 px |
| Medida de linha | ≤ 80 ch em texto longo | House Rule | opcional; não bloquear |
| Link em texto | sublinhado persistente | WCAG 1.4.1 | hover não substitui |
| Movimento | `prefers-reduced-motion` desliga **todo** não-essencial; >5 s tem pausa | 2.2.2 + House Rule | alternativa funcional para cada animação |
| Breakpoints | os do Tailwind v4 (já em uso) | existente | testar 320, 375, 768, 1280 |

**Exceção de identidade já registrada:** `apresentacao` (`.ap-*`, piso 7:1) e home `pf-` (7 cores categóricas ≥ 4,5:1)
**não são reprovadas** por estarem fora do Dark Tech — o oposto: são os melhores exemplos de piso testado.

## 5. Responsivo e mobile

Não é "desktop menor". Por contexto:

| Contexto | Regra |
| :-- | :-- |
| 320 px / 400 % zoom | **sem** rolagem horizontal da página; conteúdo 2D (tabela, `<pre>`) rola **dentro** do container, que é focável (`tabindex=0` + nome) |
| 200 % de texto | nada some, nada se sobrepõe; sem altura fixa em caixa de texto |
| Toque | alvos ≥ 44 px; controles de jogo (`life3d`) com `touch-action` explícito, **sem** bloquear zoom |
| Teclado em tela pequena | skip link visível ao focar; nav colapsada alcançável |
| Orientação | não travar (SC 1.3.4) |
| Leitor de tela mobile | ordem DOM = ordem visual; nada de `order` que contradiga |

## 6. Movimento e microinterações

Stack: GSAP, Lenis, Split-Type, CSS, WebGL residual em `life3d`. Para cada uso:
(1) lê `prefers-reduced-motion` **e** `ACC-01` safe-mode; (2) existe alternativa funcional (texto/estático);
(3) Lenis (rolagem suave) **desligado** com movimento reduzido — já há ramo em `src/js/devin/scroll.js:10`, **mas** a
medição mostrou 7→21 animações em `devin` (F-08): investigar antes de afirmar; (4) nada que pisque > 3/s (RG-04);
(5) autoplay com áudio proibido; mídia só inicia por ação.

## 7. Questões de UX que exigem humano

1. Texto dos toggles de cookies (jurídico/LGPD) — F-01.
2. Versão linear de `life`/`life3d`: reaproveitar `terminal-evolutivo` (já tem leitura CSS-first) ou texto novo?
3. Quanto "muted" é aceitável: o novo piso clareia o cinza de apoio — revisão visual do autor.
