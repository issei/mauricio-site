---
name: build-eai-section
description: Procedimento padrão para implementar UMA seção/Work-Unit da página engenharia-agentes-ia a partir do seu SDD, com teste antes do código.
allowed-tools: [read, edit, write, bash]
triggers: ['construir seção eai', 'WU-', 'implementar engenharia-agentes-ia']
---

# Build de uma seção (Work Unit) — engenharia-agentes-ia

Siga **nesta ordem** (BUILD_PLAN §6, loop autônomo). Uma WU por iteração.

1. **Estado.** Leia `.ai/state/PROGRESS.md` → pegue a próxima WU e o ledger de tokens.
2. **DoR.** Revalide o DoR (`docs/governance/dor-dod-eai.md`). Faltou algo essencial?
   Escreva `BLOCKED: <motivo>` no PROGRESS e **pare** — não adivinhe.
3. **Contexto mínimo.** Leia **apenas** o(s) SDD(s) da WU (não a pasta inteira). Use subagente
   Explore/Plan para manter o contexto enxuto.
4. **Teste primeiro.** Em `tests/engenharia-agentes-ia.spec.js`, adicione os 3 eixos da WU
   (feliz / degradado / open-world+a11y) antes do markup. É o alvo executável.
5. **Código mínimo.** Implemente em `src/engenharia-agentes-ia.html` + `.css` (e JS modular se preciso,
   reusando `gsap`/`lenis`/`split-type` — sem libs novas sem ADR). Use os tokens `--eai-*`.
   Sem cores hardcoded. Respeite `prefers-reduced-motion`.
6. **Gate.** `node scripts/quality-gate.mjs`. Vermelho → corrija (máx. 3 tentativas; estourou →
   BLOCKED e pare).
7. **Commit + push.** `feat(eai): WU-x <resumo>` → push na `main` (gate verde obrigatório).
8. **Estado.** Atualize PROGRESS (done, próxima ação, tokens, lição em `.ai/learnings.md`).

## Contrato visual (DoD de UI)
- Tokens do doc 07 (`--eai-*`); contraste AA no tema escuro; tipografia Inter.
- Microinteração pedagógica (toda animação ensina algo); estados hover/foco; CLS≈0.
- Equivalente textual para visualização complexa (doc 08).

## Flag de publicação
Enquanto a página não "abre as cortinas": manter `<meta name="robots" content="noindex,nofollow">` e
seções incompletas atrás de `hidden`/fora do menu.
