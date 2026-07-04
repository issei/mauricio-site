---
id: P04
titulo: Plano Agêntico (Fase 4)
versao: 1.0.0
status: aprovado
dominio: project
depende-de: [P02, P03]
consumido-por: [orquestrador]
---

# P04 — Plano Agêntico

## Princípios
1. Cada agente recebe APENAS os documentos listados na sua dieta — nunca o GDD inteiro.
2. Dieta máxima por tarefa: ~5 documentos (~7,5k tokens), compatível com contexto de 8k.
3. Agentes não conversam entre si: comunicam-se por contratos (CTR-*) e artefatos entregues.
4. Todo artefato passa por Reviewer antes de integrar.

## Agentes de implementação
| Agente | Escopo | Dieta base (sempre) | Dieta específica |
|---|---|---|---|
| **A1 Core Engineer** | CMP-15, 16, 17, 18 | P02, P03 | CTR-02, CTR-08, ACC-01 |
| **A2 Scene Engineer** | CMP-01 | P03, CTR-02 | RND-01, PRF-01 |
| **A3 Shader Engineer** | CMP-03, 04, 05 | CTR-02, CTR-03 | RND-02/03/04, PRF-01, ACC-01 |
| **A4 Story Engineer** | CMP-08, 06 | CTR-01, CTR-02 | NAR-01/02/03, GMP-05 |
| **A5 Gameplay Engineer** | CMP-07, 14 | CTR-02, CTR-07 | GMP-01/02/03/04 |
| **A6 Avatar Engineer** | CMP-02 | CTR-02, CTR-06 | AVT-01/02 |
| **A7 Audio Engineer** | CMP-13 | CTR-02, CTR-07 | AUD-01/02 |
| **A8 UI Engineer** | CMP-09, 11 | CTR-02, CTR-04 | UI-01/02/03 |
| **A9 CLI Engineer** | CMP-10 | CTR-02, CTR-05 | CLI-01/02 |
| **A10 Companion Engineer** | CMP-12 | CTR-02, CTR-03 | CAI-01/02 |
| **A11 QA Engineer** | suíte de testes | P02, P03 | TST-01 + spec do alvo |

## Agentes de revisão (consomem artefato + spec correspondente)
| Agente | Verifica |
|---|---|
| **R1 Semantic Reviewer** | vocabulário (zero termos de fantasia), nomenclatura CTR-02, tom das falas (CAI-02 §Bíblia) |
| **R2 Architecture Reviewer** | camadas P03, proibições explícitas, acoplamento |
| **R3 Consistency Reviewer** | sincronia fase↔cor↔música↔avatar↔métricas (critério de aceite global) |
| **R4 Performance Reviewer** | budgets PRF-01, alocação em loop de frame |
| **R5 A11y Reviewer** | ACC-01: safe-mode com paridade de conteúdo, WCAG 2.3.1 |

## Ordem de execução (waves — paralelismo seguro)
```
Wave 1: A1 (Camada 0)                          → review R2
Wave 2: A2, A7 (Camada 1)  [paralelo]          → review R2, R4
Wave 3: A4 (Camada 2)                          → review R1, R3
Wave 4: A3, A6 (Camada 3)  [paralelo]          → review R4, R5
Wave 5: A5, A8, A9, A10 (Camada 4) [paralelo]  → review R1, R2, R3
Wave 6: A5 (CMP-14, Camada 5)                  → review TODOS
Wave 7: A11 (regressão completa)               → gate de release
```

## Formato de tarefa (contrato com o orquestrador)
Toda tarefa entregue a um agente contém: `id` (BKL-xx-yy), `objetivo` (1 frase),
`dieta` (lista de docs), `artefato-esperado` (arquivo/função), `criterios-de-aceite`
(copiados da spec, nunca referenciados), `dependencias` (tarefas anteriores).
Ver template TPL-task e backlog BKL-01.

## Escalação
Se um agente precisar de informação fora da dieta → a tarefa FALHOU por lacuna de
documentação. O orquestrador registra a lacuna, o Documentation Engineer corrige a
spec, e a tarefa é reemitida. Proibido "resolver com bom senso" fora do documento.
