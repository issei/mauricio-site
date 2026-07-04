---
id: P03
titulo: Grafo de Dependências (Fase 3)
versao: 1.0.0
status: aprovado
dominio: project
depende-de: [P02]
consumido-por: [todos-os-agentes, release-manager]
---

# P03 — Grafo de Dependências

## Camadas (ordem de implementação — de baixo para cima)
```
Camada 0 (sem dependências):      CMP-15 EventBus · CMP-16 SessionState · CMP-18 A11y
Camada 1 (infra de jogo):         CMP-17 Input · CMP-01 SceneCore · CMP-13 AudioEngine
Camada 2 (fonte de verdade):      CMP-08 StoryEngine
Camada 3 (render/estado):         CMP-03 Grid · CMP-04 Particles · CMP-05 PostFX ·
                                  CMP-06 Rails · CMP-02 Avatar
Camada 4 (interação):             CMP-07 Monolith · CMP-10 CLI · CMP-09 Telemetry ·
                                  CMP-11 ProdLog · CMP-12 Companion
Camada 5 (set-piece):             CMP-14 ValeSequence
```
Regra: nenhum componente pode depender de camada superior à sua.

## Matriz produz/consome (eventos — nomes canônicos em CTR-02)
| Evento | Publica | Assina |
|---|---|---|
| `phase:changed` | CMP-08 | 02, 03, 04, 05, 06, 09, 11, 12, 13, 14 |
| `player:moved` | CMP-01 | 03, 07, 09(LoC), 11 |
| `monolith:reveal-start` | CMP-07 | 01(pausa), 05(flash), 13(SFX), 11 |
| `memory:unlocked` | CMP-07 | 08, 16, 11 |
| `metric:paged` | CMP-09 | 11 |
| `scar:opened` / `scar:gilded` | CMP-14 | 03, 16, 11 |
| `avatar:version-changed` | CMP-02 | 10(changelog), 11, 12(órbita v5) |
| `cli:command` | CMP-10 | 08(cd), 09(top), 12(ask), 18(config) |
| `vale:act1/act2/act3` | CMP-14 | 03, 04, 05, 12(silêncio), 13(cues) |
| `cue:trigger` | CMP-14, 08 | 13 |
| `a11y:changed` | CMP-18 | 05, 04, 14 |

## Dependências de dados (não-evento)
- CMP-08 → `STORY_DATA` (CTR-01) — leitura exclusiva; ninguém mais lê o array cru.
- CMP-02 → `AVATAR_VERSIONS` (CTR-06). CMP-09 → `TELEMETRY_RULES` (CTR-04).
- CMP-12 e CMP-03/04 → `ARC_THEME` (CTR-03) via `currentPhase.arc`.
- CMP-13 → `AUDIO_CUES` (CTR-07).

## Dependências inválidas (proibições explícitas)
- CMP-12 (Companion) NÃO lê telemetria diretamente — recebe valores citáveis via payload de `metric:paged` (coerência auditável sem acoplamento).
- CMP-03/04/05 NÃO assinam `cli:command` — efeitos visuais só reagem a eventos de estado.
- CMP-14 NÃO manipula malha do avatar — publica `vale:act2` e CMP-02 executa a queda de cabelo.
- Nenhum componente importa outro componente diretamente, exceto: Camada 3+ pode importar CMP-01 (cena) para adicionar objetos.

## Caminho crítico do MVP
CMP-15 → CMP-01+17 → CMP-08 → CMP-03 → CMP-07 → CMP-09 → CMP-13.
(Sem CLI, Companion, Rails e Vale ainda há produto demonstrável — ver BKL-01.)
