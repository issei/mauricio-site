---
id: ADR-003
titulo: EventBus pub/sub síncrono em memória, sem framework
data: 2026-07-04
status: aceito
---

# ADR-003 — EventBus próprio

## Contexto
18 componentes precisam sincronizar-se ao marco narrativo sem acoplamento
direto. Sem build step (ADR-001), qualquer solução deve caber em um módulo ES
pequeno e auditável.

## Decisão
EventBus próprio (~40 linhas): mapa nome→Set de handlers, `publish` síncrono
em ordem de assinatura, `defer` para fila de próximo frame (evita cascatas
síncronas — CTR-02 RG-02), try/catch por handler (falha isolada não derruba os
demais). Catálogo de eventos fechado (CTR-02).

## Alternativas consideradas
| Alternativa | Por que rejeitada |
|---|---|
| EventTarget/CustomEvent nativo | Payloads via `detail` sem congelamento; sem defer; API mais verbosa |
| RxJS ou similar via CDN | 30kB+ para 5% do uso; curva p/ agentes; anti-ADR-001 |
| Estado global observado (proxy) | Acoplamento implícito — exatamente o que P03 proíbe |

## Consequências
- Positivas: zero dependência; testável em unidade (T3); matriz produz/assina
  auditável (P03) — reviewers conseguem verificar violações por grep.
- Negativas assumidas: sem tipos em runtime — a conformidade de payload é
  garantida por disciplina + testes T1/T2, não pelo compilador; eventos
  síncronos exigem a regra do `defer` para evitar reentrância.
- Componentes afetados: todos (é a espinha); especialmente CMP-14 (orquestra
  por eventos) e a suíte T3.
