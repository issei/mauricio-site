# ADR-ap-001 — Namespace `.ap-*` e exceção ao design system "Dark Tech"

**Status:** aceito
**Data:** 2026-07-23
**Contexto:** implementação da página v3.0 (`src/apresentacao.html`)
**Decisor:** Architect-Agent, sob D-01/D-02/D-03 do plano agêntico

---

## Contexto

O repositório trava a paleta "Dark Tech" como norma em quatro artefatos que agentes leem como lei:

| Arquivo | Efeito |
|---|---|
| `AGENTS.md` § Design System Guardrails | *"DO NOT DEVIATE"* |
| `docs/specs/STYLE_GUIDE.md` | Paleta canônica `#0d1117` / `#161b22` / `#007bff` → `#8a2be2` |
| `.claude/agents/a11y-design-reviewer.md` § 2 | **Reprova** cor fora da paleta |
| `.claude/skills/new-page/SKILL.md` § 2 | Injeta a paleta antiga em toda página nova |

A Tabela 1.4 da especificação UX v3.0 define outro sistema: `#0A0A0C` / `#101014` / `#17171C` / `#F2F2F0` / `#FAFAFA`, com acentos Cobalto, Verde e Âmbar. Não é um ajuste de tom — é substituição de base, texto, espaçamento e semântica de acento.

Sem decisão explícita, o pipeline agêntico não converge: o agente de tokens implementa a v3.0, o revisor reprova por desvio, e nenhuma regra arbitra.

## Decisão

**1. Namespace isolado `.ap-*`.** Todo seletor, custom property e classe da página v3.0 usa o prefixo `ap-`. Precedente já estabelecido no repositório: `engenharia-confianca.css` usa `.ec-`.

**2. Exceção nomeada e limitada.** A paleta Dark Tech continua obrigatória em todo o site. `src/apresentacao.html` + `src/apresentacao.css` são a **única** exceção, registrada em `AGENTS.md` e no prompt do `a11y-design-reviewer`. Fora desses dois arquivos, a exceção não vale.

**3. CSS puro, sem Tailwind, nesta página.** As demais páginas grandes já seguem esse caminho (`devin.css`, `engenharia-confianca.css`). Três razões:
- Tailwind traria utilitários com cores próprias, que violariam a regra de "zero hexadecimal fora do CSS de tokens";
- a página tem orçamento crítico de 60 KB gzip (§4.3 da spec) e não pode pagar por um framework de utilidades que usa marginalmente;
- não carregar `input.css` elimina a dependência de build de CSS para a rota mais sensível do site.

**4. Tokens são calculados, nunca transcritos de nome de cor.**

## Contrastes verificados (WCAG 2.1, luminância relativa)

Medidos por `tests/_helpers/contrast.mjs`, não estimados:

| Par | Razão | Mínimo | Situação |
|---|---:|---:|---|
| `#F2F2F0` sobre `#0A0A0C` (texto L1) | **17.65:1** | 7 | ok |
| `#F2F2F0` sobre `#101014` (texto L2) | **16.94:1** | 7 | ok |
| `#FAFAFA` sobre `#17171C` (texto L3 em card) | **17.11:1** | 7 | ok — evolução 11 |
| `#B4B4B0` sobre `#0A0A0C` (texto secundário) | **9.51:1** | 4.5 | ok |
| `#4C8DFF` sobre `#0A0A0C` (cobalto, texto) | **6.18:1** | 4.5 | ok |
| `#4C8DFF` sobre `#17171C` (cobalto em card) | **5.58:1** | 4.5 | ok |
| `#3FD07A` sobre `#0A0A0C` (verde, não-textual) | 9.90:1 | 3 | ok |
| `#E0A33E` sobre `#17171C` (âmbar) | 8.06:1 | 4.5 | ok |

### Por que o cobalto não é `#0057FF` nem `#007bff`

- **`#0057FF`** (leitura literal de "Azul Cobalto"): **3.59:1** sobre `#0A0A0C` — reprova AA para texto.
- **`#007bff`** (legado do repositório): 4.97:1 sobre `#0A0A0C`, mas **4.49:1 sobre o card `#17171C`** — reprova AA por 0.01. É exatamente por isso que o repositório já usa `#58a6ff` para texto em vez de `#007bff` (ver `a11y-design-reviewer.md` §1).
- **`#4C8DFF`** passa nos dois fundos com folga e mantém a leitura de "azul de precisão".

A nota da §1.4 da spec declara os hexadecimais "referência de partida, a paleta final deve ser validada", o que autoriza o ajuste. Nome de cor em prosa não é fonte de valor hexadecimal.

## Consequências

**Positivas**
- O pipeline agêntico converge: existe regra para arbitrar.
- O isolamento por namespace impede vazamento da paleta v3.0 para as outras 17 páginas.
- Zero Tailwind na rota crítica ajuda o orçamento de performance.

**Negativas / dívida assumida**
- O site passa a ter **dois** sistemas visuais. Aceitável enquanto a v3.0 for uma página; se ela for promovida a `index.html` (decisão D-01, fora do escopo deste ADR), o `STYLE_GUIDE.md` precisa ser reescrito e a exceção vira a norma.
- `apresentacao.css` não compartilha utilitários com o resto do site: mudanças de tipografia global não se propagam. Mitigado por o CSS ser pequeno e ter fonte única de tokens.

## Aplicação mecânica

A regra não depende de disciplina do agente. `scripts/guard-ap-tokens.mjs` (hook `PostToolUse`) bloqueia a escrita de qualquer hexadecimal em `src/apresentacao.html` e `src/js/apresentacao/**`, e `tests/apresentacao.tokens.test.mjs` reprova o build se um par de contraste regredir.

## Referências

- `docs/specs/pages/apresentação/especificacao-ux-mauricio-issei.md` §1.2, §1.4
- `docs/specs/pages/apresentação/ESPECIFICACAO-AGENTICA-IMPLEMENTACAO.md` §0.2, D-T01
- Precedente de namespace: `src/engenharia-confianca.css` (`.ec-`)
- Precedente de CSS-first sem lib: `docs/decisions/ADR-te-001`, `ADR-eai-002`
