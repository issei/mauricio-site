# Registro de Decisões A11Y (Memória de Padrões)

Só o que **não** se deriva de `docs/a11y/A11Y.md` nem do código. Uma linha por padrão. Leia antes de criar componente interativo.
Decisões em análise (ainda não aprovadas) ficam em `docs/specs/a11y-first/A11Y-DECISIONS.md`.

## Decisões

- **Texto de apoio (muted) sobre fundo escuro** → `#99a1af` (Tailwind `gray-400`), nunca `gray-500/600` nem `slate-500` como cor de texto — 5,85–7,74:1 medido sobre os 8 fundos do site; `gray-500` dá 3,15–4,16:1. *(2026-10-03, aprovado pelo autor)*
- **Texto azul** → `#58a6ff`; `#007bff` só como fundo, borda ou ícone — 6,03:1 vs 3,82:1 sobre `#21262d`. *(2026-10-03, já era regra do STYLE_GUIDE)*
- **Perfil de conformidade** → WCAG 2.2 AA, Compliance Profile **Standard**; as exceções localizadas de 7:1 (`apresentacao`, ADR-ap-001) permanecem. *(2026-10-03)*
- **Integração do protocolo** → cópia versionada em `docs/a11y/` com SHA fixado e carga preguiçosa; sem `@import` no `AGENTS.md` (41 KB entraria em toda sessão). *(2026-10-03)*
- **Páginas utilitárias** → só `boutique-empresarial-showcase` é corrigida; as demais seguem em `EXCEPTIONS.md` com a catraca impedindo piora. *(2026-10-03)*
