---
id: SDD-pf-animacoes-entrada
titulo: Animações de entrada na página principal (efeitos do Animate.css)
data: 2026-11-21
leitor: quem mantém a home (src/index.html, src/index.css)
padrao_de_redacao: ptbr-controlado
---

# Animações de entrada na página principal

## 1. Pedido

O Issei pediu uma melhora visual na página principal com o
[Animate.css](https://animate.style/) (2026-11-21).

## 2. Decisão

Usar **só os efeitos necessários**, copiados do Animate.css 4.1.1 (licença MIT)
para `src/index.css`. Não instalar a biblioteca inteira (cerca de 70 KB) e não
pôr classes `animate__*` no HTML.

Motivos:

- O HTML da home é gerado (`scripts/gen-portfolio.mjs`, `gen-editorial`). Classes
  novas mudariam o gerador e exigiriam nova rodada do Argos no `/en/`.
- `src/en/index.html` usa o mesmo `../index.css`. Mudança só no CSS vale para as
  duas línguas sem tocar no espelho.
- O efeito usa `animation-timeline: view()`, o mesmo padrão do placar
  (`.pf-flap`). Não há JavaScript, logo nenhum conteúdo depende de script
  (A11Y.md §6, "Conteúdo refém do JavaScript").

## 3. Efeitos

| Efeito do Animate.css | Nome local | Onde | Adaptação |
| :-- | :-- | :-- | :-- |
| `fadeInUp` | `pf-fade-in-up` | títulos `h2` de Temas, Provas e Destaques, cartões de Destaques, itens de Temas | Deslocamento de 1.5rem em vez de 100% |
| `fadeInLeft` | `pf-fade-in-left` | itens do placar de Provas | Deslocamento de 2rem em vez de 100% |

Regras:

1. As keyframes usam as propriedades `translate` e `opacity`, não `transform`.
   Assim o efeito de hover dos cartões (`transform: translateY(-2px)`) continua.
2. O efeito acompanha a rolagem: `animation-range: entry 0% cover 30%`. Um
   elemento que já está bem dentro da tela ao abrir a página fica no estado final.
3. Só vale dentro de `@supports (animation-timeline: view())` e de
   `@media (prefers-reduced-motion: no-preference)`. Sem suporte (Firefox hoje)
   ou com movimento reduzido, a página fica estática e completa.
4. Seletores com prefixo de seção (`#temas`, `#provas`, `#destaques`).
   O `index.css` também serve ao `/curriculo` e ao `/acessibilidade`, e lá nada
   muda.

## 4. Fora do escopo

- O hero (nome, cargo, botões). A transição entre páginas da família `site`
  (`src/transicoes/`, SDD-transicoes-site) liga o nome e o cargo da home aos da
  Carreira. Uma animação de entrada ali brigaria com essa transição.
- A página `/videos` e as demais páginas.

## 5. Critérios de aceite

- CA-1: com `prefers-reduced-motion: no-preference` e suporte a
  `animation-timeline`, os cartões de Destaques têm `animation-name`
  `pf-fade-in-up`, e os itens de Provas têm `pf-fade-in-left`.
- CA-2: com `prefers-reduced-motion: reduce`, nenhum desses elementos anima.
- CA-3: no fim da rolagem, todos os elementos têm `opacity` 1.
- CA-4: a suíte de acessibilidade (axe, foco visível, sem JS) continua verde.

Teste: `tests/index.animacoes.spec.js`.
