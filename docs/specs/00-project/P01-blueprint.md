---
id: P01
titulo: Project Blueprint (Fase 1)
versao: 1.0.0
status: aprovado
dominio: project
depende-de: [P00]
consumido-por: [todos-os-agentes]
---

# P01 — Project Blueprint

## Visão geral
Single-page application 3D (`lifeos.html`) sem build step. Um loop de renderização (Three.js) + um transporte de áudio (Tone.js) + um barramento de eventos em memória coordenam todos os subsistemas. A fonte única de verdade é o **StoryEngine**: a fase narrativa ativa determina cor, música, avatar, métricas e falas — nenhum subsistema decide sozinho.

## Arquitetura macro
```
                    ┌────────────────────────────────────┐
                    │            EventBus (CMP-15)       │
                    └───▲──────▲──────▲──────▲──────▲────┘
   input ──▶ InputSystem│      │      │      │      │
                        │      │      │      │      │
              StoryEngine(CMP-08)     │      │      │
               fase ativa │           │      │      │
        ┌────────┬────────┼────────┬──┴───┬──┴───┬──┴────┐
        ▼        ▼        ▼        ▼      ▼      ▼       ▼
   SceneCore  Avatar   Monolith  Audio  Telemetry Companion CLI
   (CMP-01)  (CMP-02)  (CMP-07) (CMP-13) (CMP-09) (CMP-12) (CMP-10)
        │        │        │
   GridShader Particles PostFX  ── camada de render (só leem estado)
   (CMP-03)  (CMP-04)  (CMP-05)
```
Regra: subsistemas comunicam-se APENAS por eventos (CTR-02) ou lendo o estado da fase (CTR-01). Proibido acoplamento direto entre pares.

## Bounded contexts
| Contexto | Responsabilidade | Componentes |
|---|---|---|
| **Narrativa** | fases, marcos, operações Git, textos | CMP-08, dados NAR-* |
| **Mundo 3D** | cena, corredor, shaders, partículas, trilhos | CMP-01, 03, 04, 05, 06 |
| **Corpo** | avatar, versões, mutações | CMP-02 |
| **Revelação** | monolitos, decode, hold | CMP-07 |
| **Observabilidade** | métricas, estados de atenção, log de produção | CMP-09, CMP-11 |
| **Voz** | companion (comportamento + falas) | CMP-12 |
| **Terminal** | CLI, comandos, composer mobile | CMP-10 |
| **Som** | cadeias por arco, cues, SFX | CMP-13 |
| **Sessão** | estado persistente, config, acessibilidade | CMP-16, CMP-18 |
| **Set-pieces** | orquestração da fase 2017 | CMP-14 |

## Fluxo principal (happy path)
1. Boot → splash → gesto do usuário libera áudio → fase 1 (1982).
2. Jogador caminha (InputSystem → SceneCore); grid pulsa; log de produção emite.
3. Proximidade de Monolito → evento `monolith:reveal` → sequência glitch → modal decode → memória desbloqueada em SessionState.
4. Fim do quadrante → StoryEngine avança fase → evento `phase:changed` → todos os subsistemas sincronizam (cor, música, avatar, métricas).
5. Fase 11 delega ao ValeSequence (CMP-14), que suspende o fluxo padrão.
6. Fase 12 → tela final aberta (`system.status`).

## Subdomínios de dados
- `STORY_DATA` (CTR-01): 12 marcos, arcos, textos, imagens.
- `ARC_THEME` (CTR-03): 4 arcos → cor/música/pool de falas.
- `AVATAR_VERSIONS` (CTR-06): 5 versões → mutações e changelog.
- `TELEMETRY_RULES` (CTR-04): valores por fase + limiares PAGED.
- `AUDIO_CUES` (CTR-07): cadeias e cue sheet do Vale.

## Decisões arquiteturais (ADRs)
- ADR-001: sem build step, CDN + import maps.
- ADR-002: cicatrizes douradas persistem via SessionState (deformação nunca reverte).
- ADR-003: EventBus pub/sub síncrono em memória (sem framework).
