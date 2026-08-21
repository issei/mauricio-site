# 03 — Design system `.fp-`

Base normativa: `docs/specs/STYLE_GUIDE.md` e `AGENTS.md` ("Dark Tech & Developer Centric").
Esta página **não** é exceção de paleta (a única registrada é `.ap-*`, ADR-ap-001).

## 1. Tokens

```css
:root {
  /* Superfícies (GitHub Dark Dimmed) */
  --fp-bg: #0d1117;
  --fp-surface: #161b22;
  --fp-surface-2: #1c2230;
  --fp-border: #30363d;

  /* Texto */
  --fp-text: #c9d1d9;
  --fp-heading: #ffffff;
  --fp-muted: #8b949e;

  /* Acentos decorativos (nunca em texto pequeno) */
  --fp-accent: #007bff;
  --fp-accent-2: #8a2be2;
  --fp-gradient: linear-gradient(90deg, var(--fp-accent), var(--fp-accent-2));

  /* Semânticos — o vocabulário das visualizações */
  --fp-link: #58a6ff;      /* azul de texto AA + série "benefício/investigação" */
  --fp-custo: #d29922;     /* custo, atraso, urgência */
  --fp-degrada: #f85149;   /* degradação, viés, hiper-resolução */
  --fp-ok: #2ea043;        /* suficiência atingida, ponto de parada */
  --fp-humano: #a371f7;    /* legitimidade, valores, juízo humano */

  --fp-radius: 14px;
  --fp-shadow: 0 0 0 1px rgba(0,123,255,.15), 0 12px 32px rgba(0,0,0,.45);
}
```

**Regra de contraste:** `--fp-accent` (#007bff) é proibido em texto ≤ 18px — usa-se `--fp-link`
(#58a6ff, ≥ 4.5:1 sobre #0d1117 e #161b22). Traços de gráfico exigem ≥ 3:1 (WCAG 1.4.11).

## 2. Tipografia

Fonte única **Inter** (300/400/500/600/700/800), carregada de forma assíncrona.

| Papel | Estilo |
| :-- | :-- |
| `h1` | `clamp(2.2rem, 6vw, 4rem)`, 800, `line-height:1.05`, palavra-chave em `.fp-grad` |
| `h2` | `clamp(1.6rem, 3.4vw, 2.4rem)`, 700, sublinhado em gradiente (`::after`, 3px, 64px) |
| `h3` | `1.25rem`, 600 |
| corpo | `1.05rem`, 400, `line-height:1.75`, medida máxima **68ch** |
| miúdo/legenda | `0.85rem`, `--fp-muted` |
| numérico/eixos | `ui-monospace, SFMono-Regular, Menlo, monospace`, `font-variant-numeric: tabular-nums` |

Números em gráficos e leituras ao vivo **sempre** em tabular-nums: o valor não pode dançar
enquanto o leitor arrasta o slider.

## 3. Componentes

| Classe | Anatomia |
| :-- | :-- |
| `.fp-nav` | Barra fixa, `backdrop-filter: blur(8px)`, fundo `rgba(13,17,23,.82)`, borda inferior `--fp-border`. Cinco marcos + marca. |
| `.fp-readbar` | 3px no topo, preenchimento em `--fp-gradient`, `aria-hidden`. |
| `.fp-card` | `--fp-surface`, borda `--fp-border`, raio `--fp-radius`, borda superior 3px na cor semântica da seção. Hover: `translateY(-3px)` + `--fp-shadow`. |
| `.fp-figure` | Envelope de visualização: fundo `--fp-surface`, padding 1.25rem, legenda superior (`.fp-eyebrow`) e `figcaption` inferior. Overflow horizontal interno com `overflow-x:auto` — **a página nunca rola horizontalmente**. |
| `.fp-selo` | Pílula 0.72rem, `letter-spacing:.12em`, maiúsculas, borda 1px na cor semântica. |
| `.fp-formula` | `--fp-surface-2`, borda esquerda 3px `--fp-link`, `padding:1rem 1.2rem`, itálico só nas variáveis (`<var>`). |
| `.fp-btn--primary` | Gradiente, texto branco, raio 8px, hover eleva. |
| `.fp-btn--ghost` | Transparente, borda `--fp-link`, texto `--fp-link`. |
| `.fp-range` | Slider com trilho `--fp-border` e polegar `--fp-link` de 22px (alvo de toque ≥ 24px com padding). |

## 4. Grid e respiro

- Contêiner: `min(1120px, 100% - 2.5rem)`; coluna de leitura `min(68ch, 100%)`.
- Ritmo vertical entre seções: `clamp(3.5rem, 8vw, 6rem)`.
- Breakpoints: 480 (compacto), 720 (trilhos horizontais viram verticais), 1024 (figuras em largura total).

## 5. Movimento

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation: none !important; transition: none !important; }
  .fp-reveal { opacity: 1; transform: none; }
  [data-draw] { stroke-dashoffset: 0 !important; }
}
```

Sem exceção: todo elemento com estado inicial "invisível" precisa de regra que o traga ao estado
final quando o movimento está desligado. O JS também consulta a media query antes de animar.

## 6. Proibições

1. Nenhum fundo claro (verificado por INV-S9 em `scripts/audit-site.mjs`).
2. Nenhuma folha de estilo ou script de terceiro (`perf-budget.mjs`).
3. Nenhum `<h1>` além do único do hero.
4. Nenhuma informação transmitida apenas por cor.
5. Nenhum `title=` como substituto de rótulo acessível.
