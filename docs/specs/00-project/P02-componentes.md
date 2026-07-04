---
id: P02
titulo: Registro de Componentes (Fase 2)
versao: 1.0.0
status: aprovado
dominio: project
depende-de: [P01]
consumido-por: [todos-os-agentes]
---

# P02 — Registro de Componentes

Formato: **ID · Nome — Responsabilidade única | Entradas → Saídas | Depende de | Spec**.
Contratos e eventos detalhados em CTR-02. Critérios de aceite nas specs individuais.

| ID | Nome | Responsabilidade única | Entradas → Saídas | Depende de | Spec |
|---|---|---|---|---|---|
| CMP-01 | SceneCore | Cena, câmera isométrica, corredor, loop de render | input de movimento → posição do avatar, frame | CMP-15, CMP-17 | RND-01 |
| CMP-02 | AvatarSystem | Corpo do protagonista e mutações por versão | `phase:changed` → malha/acessórios/escala atuais | CTR-06, CMP-15 | AVT-01/02 |
| CMP-03 | GridShader | Chão wireframe + fissuras douradas persistentes | posição jogador, `scar:opened/gilded` → grid renderizado | CMP-01, CTR-03, CMP-16 | RND-02 |
| CMP-04 | ParticleField | Glifos hex flutuantes; modos gravidade normal/queda/cabelo | `phase:changed`, `vale:*` → partículas | CMP-01, CTR-03 | RND-03 |
| CMP-05 | PostFX | Pipeline CRT (bloom, curvatura, aberração, scanlines) + safe-mode | frame, config acessibilidade → frame final | CMP-01, CMP-18 | RND-04 |
| CMP-06 | BranchRails | Dois trilhos neon (pessoal/profissional): estados normal/conflito/merge/trançado | `phase:changed`, ops Git → geometria dos trilhos | CMP-01, CTR-01 | GMP-05 |
| CMP-07 | MonolithSystem | Revelação de memória: shockwave, decode progressivo, hold sustentado | proximidade → `memory:unlocked`, modal | CMP-15, CTR-01, CMP-13 | GMP-01/02 |
| CMP-08 | StoryEngine | Fonte de verdade da fase ativa; transições; operações Git | `memory:unlocked`, `cd` → `phase:changed` | CTR-01, CMP-15 | NAR-01/02/03 |
| CMP-09 | TelemetryDashboard | 4 métricas + sparklines + estados AMBIENT/PAGED/FOCUS | `phase:changed`, eventos → HUD | CTR-04, CMP-15 | UI-01/02 |
| CMP-10 | CLIEngine | Terminal Quake: parser, comandos, histórico, autocomplete, composer touch | texto/toques → comandos executados, `cli:*` | CTR-05, CMP-15 | CLI-01/02 |
| CMP-11 | ProductionLog | Canal de log sempre visível ([INFO]/[WARN]/[AGENT]) | eventos do bus → linhas com throttle | CMP-15 | UI-03 |
| CMP-12 | CompanionAI | Entidade orbital: movimento, cor, seleção e exibição de falas | `phase:changed`, timers, `ask` → balão + `[AGENT]` | CTR-03, CMP-15 | CAI-01/02 |
| CMP-13 | AudioEngine | 4 cadeias procedurais + cue sheet + via SFX de baixa latência | `phase:changed`, `cue:*` → som | CTR-07, gesto usuário | AUD-01/02 |
| CMP-14 | ValeSequence | Orquestração exclusiva da fase 2017 (3 atos) | `phase:changed`(11) → sequência de cues/eventos | quase todos | GMP-03/04 |
| CMP-15 | EventBus | Pub/sub síncrono em memória; catálogo tipado | publish(evento) → notify(assinantes) | — | CTR-02 |
| CMP-16 | SessionState | Estado persistente: memórias, cicatrizes, config, versão avatar | mutações → snapshot serializável | CTR-08 | CTR-08 |
| CMP-17 | InputSystem | WASD/setas/touch/hold; supressão quando CLI em foco | hardware → intents normalizados | CMP-15 | RND-01 §Input |
| CMP-18 | AccessibilityManager | prefers-reduced-motion, safe-mode, traduções de efeito | media queries, `config set` → flags globais | CMP-16 | ACC-01 |

## Estados globais compartilhados (leitura permitida a todos)
- `currentPhase` (CMP-08) — índice + objeto do marco ativo (CTR-01).
- `avatarVersion` (CMP-02) — derivado de `currentPhase`, nunca setado externamente.
- `a11yFlags` (CMP-18) — `{reducedMotion, safeMode}`.
- `scars` (CMP-16) — lista de fissuras abertas/douradas.

## Limites e riscos por componente (resumo)
- CMP-03/04/05: proibido alocar buffers no loop de frame (RNF-03); risco principal de performance mobile.
- CMP-07: risco de leitura de freeze — obrigatório feedback ≤1,5s (GMP-02).
- CMP-10: parser deve falhar controladamente com qualquer input (TST-01).
- CMP-13: nunca iniciar AudioContext sem gesto (RNF-04).
- CMP-14: único componente autorizado a suspender o fluxo padrão do StoryEngine.
