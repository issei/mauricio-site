# 03 — Design system `.dw-`

Base normativa: `docs/specs/STYLE_GUIDE.md` e `AGENTS.md` ("Dark Tech"). Esta página **não** é
exceção de paleta: usa o fundo `#0d1117`, Inter e o gradiente `#007bff → #8a2be2`, e acrescenta
apenas cores semânticas da escala GitHub Dark já usadas por outras páginas (mesmo padrão de `.fp-`).
Não é necessária ADR. Se o implementador precisar de cor fora desta lista, **para e abre ADR** antes.

## 1. Tokens

```css
:root {
  /* Superfícies */
  --dw-bg: #0d1117;
  --dw-surface: #161b22;
  --dw-surface-2: #1c2230;
  --dw-border: #30363d;

  /* Texto */
  --dw-text: #c9d1d9;
  --dw-heading: #ffffff;
  --dw-muted: #8b949e;
  --dw-link: #58a6ff;

  /* Assinatura (nunca em texto pequeno) */
  --dw-accent: #007bff;
  --dw-accent-2: #8a2be2;
  --dw-gradient: linear-gradient(90deg, var(--dw-accent), var(--dw-accent-2));

  /* Selos epistêmicos (também usados como texto: ≥ 4.5:1 sobre bg e surface) */
  --dw-fato: #58a6ff;
  --dw-inferencia: #a371f7;
  --dw-hipotese: #d29922;
  --dw-recomendacao: #3fb950;

  /* Semânticos dos diagramas */
  --dw-humano: #a371f7;   /* confirmação, HITL, decisão humana */
  --dw-risco: #f85149;    /* caminho crítico, pular estágio, anti-pattern */
  --dw-efeito: #d29922;   /* ação com efeito colateral */

  --dw-radius: 14px;
  --dw-shadow: 0 0 0 1px rgba(0,123,255,.15), 0 12px 32px rgba(0,0,0,.45);
}
```

**Teste de tokens** (`tests/digital-workplace.tokens.test.mjs`, padrão de `portfolio.tokens.test.mjs`):
- `--dw-text`, `--dw-muted`, `--dw-link` e os quatro selos ≥ 4.5:1 sobre `--dw-bg` e `--dw-surface`;
- `--dw-risco`, `--dw-efeito`, `--dw-humano` ≥ 3:1 sobre `--dw-surface` (traço de gráfico, WCAG 1.4.11);
- `--dw-bg` é `#0d1117`;
- nenhum hexadecimal em `src/digital-workplace-agentico.html` nem em `src/js/digital-workplace/**`
  (cores só via tokens).

## 2. Tipografia

Inter (400/500/600/700/800), carregamento assíncrono como nas demais páginas.

| Papel | Estilo |
| :-- | :-- |
| `h1` | `clamp(2.2rem, 6vw, 4rem)`, 800, `line-height:1.05`, palavra-chave em `.dw-grad` |
| `h2` | `clamp(1.6rem, 3.4vw, 2.4rem)`, 700, sublinhado em gradiente (`::after`, 3px × 64px) |
| `h3` | `1.25rem`, 600 |
| corpo | `1.05rem`, `line-height:1.75`, medida máxima 68ch |
| código / eventos | `ui-monospace, SFMono-Regular, Menlo, monospace`, `0.9em` (nomes de eventos AG-UI, campos) |
| selo | `0.72rem`, 600, `letter-spacing:.08em`, caixa alta |

## 3. Componentes (aparência)

- **Cartão** (`.dw-card`): `--dw-surface`, borda `1px --dw-border`, raio `--dw-radius`, borda superior
  3px em `--dw-gradient`; hover: `translateY(-2px)` + `--dw-shadow` (desligado sob reduced-motion).
- **Selo** (`.dw-selo`): fundo `--dw-surface-2`, borda 1px na cor do selo, texto na cor do selo.
- **Tabela** (`.dw-tabela`): cabeçalho `--dw-surface-2`, linhas zebradas sutis, `overflow-x:auto`
  no contêiner; primeira coluna fixa (`position:sticky`) acima de 768 px.
- **`<details>`** (`.dw-mais`): `summary` com seta rotacionada por CSS; foco visível.
- **Botões de visualização**: estado por `aria-pressed`, nunca só por cor (ícone/texto muda).

## 4. Foco e movimento

- `:focus-visible { outline: 2px solid var(--dw-link); outline-offset: 2px; }` em tudo que é interativo.
- `@media (prefers-reduced-motion: reduce)`: sem transições/animações; estado final imediato.
- Sem `position:fixed` além da navegação superior; sem parallax.

## 5. Responsividade

Breakpoints do site (Tailwind v4): mobile-first; V1, V3 e V7 mudam de horizontal para vertical
abaixo de 768 px. Nenhum scroll horizontal da página em 375 px (tabelas rolam no próprio contêiner).
