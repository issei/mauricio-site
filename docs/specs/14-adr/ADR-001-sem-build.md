---
id: ADR-001
titulo: Sem build step — ES Modules + import maps + CDN
data: 2026-07-04
status: aceito
---

# ADR-001 — Sem build step

## Contexto
O projeto vive num site pessoal estático (mauricio.issei.com.br) mantido por
uma pessoa. O life3d_v2 original já roda sem build (Three.js/Tone.js via
jsDelivr + import maps) e essa portabilidade é valor central: auditável,
copiável, sem toolchain.

## Decisão
Manter zero build: HTML + ES Modules nativos + import maps; dependências
exclusivamente via CDN (Three.js r167, Tone.js 14.8). Código organizado em
módulos ES servidos como arquivos estáticos.

## Alternativas consideradas
| Alternativa | Por que rejeitada |
|---|---|
| Vite/bundler | Toolchain e lockfiles p/ manter; quebra o ethos "view-source" |
| CDN sem import maps (globals) | Perde modularidade; polui escopo global |
| Self-host das libs | Custo de atualização manual; CDN tem cache global |

## Consequências
- Positivas: deploy = copiar arquivos; qualquer agente/humano audita no navegador.
- Negativas assumidas: sem tree-shaking (payload maior — mitigado por PRF-01);
  sem TypeScript (contratos vivem em docs, não em tipos — CTR-* compensam);
  requer navegadores com import maps (corta legados — aceito em P00).
- Componentes afetados: todos; especialmente TST-01 (suíte vive fora do produto).
