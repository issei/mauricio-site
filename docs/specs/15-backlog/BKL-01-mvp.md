---
id: BKL-01
titulo: Backlog — MVP (Wave 1–4 do caminho crítico)
versao: 1.0.0
status: aprovado
dominio: backlog
depende-de: [P03, P04]
consumido-por: [orquestrador]
---

# BKL-01 — Backlog MVP

MVP (definição): corredor jogável com as 12 fases, Monolitos com decode
(incluindo hold), telemetria e áudio por arco. SEM: Companion, CLI completo,
Rails, Vale orquestrado (entram no Alpha — BKL-02, a gerar).
Formato de tarefa: TPL-task. Estimativas: P ≤1 sessão de agente, M ≤3.

### BKL-mvp-01 — Implementar EventBus
- **Agente:** A1 · **Dieta:** [CTR-02, ADR-003, TPL-spec] · **Dep.:** —
- **Artefato:** `src/lifeos/core/bus.js`
- **Aceite:** [ ] publish/subscribe/defer conforme CTR-02 §API · [ ] handler
  com exceção não interrompe demais · [ ] payloads congelados · **Est.:** P

### BKL-mvp-02 — Implementar SessionState
- **Agente:** A1 · **Dieta:** [CTR-08, TPL-spec] · **Dep.:** mvp-01
- **Artefato:** `src/lifeos/core/session.js`
- **Aceite:** [ ] schema CTR-08 completo · [ ] fallback memória · [ ] debounce
  500ms · [ ] migração/corrupção conforme §Regras 5–6 · **Est.:** P

### BKL-mvp-03 — Implementar AccessibilityManager
- **Agente:** A1 · **Dieta:** [ACC-01, CTR-02, CTR-08] · **Dep.:** mvp-01, 02
- **Artefato:** `src/lifeos/core/a11y.js`
- **Aceite:** [ ] flags + media query + `config set` · [ ] `a11y:changed`
  publicado · [ ] persistência · **Est.:** P

### BKL-mvp-04 — Portar SceneCore + Input do life3d_v2
- **Agente:** A2 · **Dieta:** [RND-01, CTR-02, PRF-01] · **Dep.:** mvp-01
- **Artefato:** `src/lifeos/scene/core.js`
- **Aceite:** [ ] critérios RND-01 (4 itens) · [ ] eventos player:* com
  throttle · **Est.:** M

### BKL-mvp-05 — Implementar AudioEngine (cadeias + SFX)
- **Agente:** A7 · **Dieta:** [AUD-01, CTR-07, CTR-02] · **Dep.:** mvp-01
- **Artefato:** `src/lifeos/audio/engine.js`
- **Aceite:** [ ] critérios AUD-01 (4 itens) · **Est.:** M

### BKL-mvp-06 — Implementar StoryEngine + dados STORY_DATA
- **Agente:** A4 · **Dieta:** [CTR-01, NAR-01, NAR-02, CTR-02] · **Dep.:** mvp-01, 02
- **Artefato:** `src/lifeos/story/engine.js` + `src/lifeos/story/data.js`
- **Aceite:** [ ] 12 marcos validando contra CTR-01 (T1.1) · [ ] `phase:changed`
  walk/cd · [ ] textos literais de NAR-01/02 · **Est.:** M

### BKL-mvp-07 — Implementar GridShader com cicatrizes
- **Agente:** A3 · **Dieta:** [RND-02, CTR-03, CTR-08, PRF-01] · **Dep.:** mvp-04
- **Artefato:** `src/lifeos/scene/grid.js`
- **Aceite:** [ ] critérios RND-02 (4 itens) · **Est.:** M

### BKL-mvp-08 — Implementar ParticleField (4 modos)
- **Agente:** A3 · **Dieta:** [RND-03, CTR-03, PRF-01] · **Dep.:** mvp-04
- **Artefato:** `src/lifeos/scene/particles.js`
- **Aceite:** [ ] critérios RND-03 (4 itens) · **Est.:** M

### BKL-mvp-09 — Implementar PostFX + safe-mode
- **Agente:** A3 · **Dieta:** [RND-04, ACC-01, PRF-01] · **Dep.:** mvp-04, 03
- **Artefato:** `src/lifeos/scene/postfx.js`
- **Aceite:** [ ] critérios RND-04 (4 itens) · **Est.:** M

### BKL-mvp-10 — Implementar Avatar v1–v5 (sem queda de cabelo em cena)
- **Agente:** A6 · **Dieta:** [CTR-06, AVT-01, AVT-02, CTR-02] · **Dep.:** mvp-04, 06
- **Artefato:** `src/lifeos/avatar/avatar.js`
- **Aceite:** [ ] critérios AVT-01 (4) · [ ] AVT-02 exceto RG-09/10 (Vale) ·
  **Est.:** M

### BKL-mvp-11 — Implementar MonolithSystem (reveal + hold)
- **Agente:** A5 · **Dieta:** [GMP-01, GMP-02, CTR-01, CTR-07] · **Dep.:** mvp-04, 05, 06
- **Artefato:** `src/lifeos/gameplay/monolith.js`
- **Aceite:** [ ] critérios GMP-01 (4) e GMP-02 (4) · **Est.:** M

### BKL-mvp-12 — Implementar Dashboard (UI-01) + estados (UI-02)
- **Agente:** A8 · **Dieta:** [UI-01, UI-02, CTR-04, CTR-02] · **Dep.:** mvp-01, 06
- **Artefato:** `src/lifeos/ui/dashboard.js`
- **Aceite:** [ ] critérios UI-01 (4) e UI-02 (4) · **Est.:** M

### BKL-mvp-13 — Suíte T1–T3 + T5.2 (anti-freeze)
- **Agente:** A11 · **Dieta:** [TST-01 + specs dos alvos] · **Dep.:** mvp-06, 11
- **Artefato:** `tests/`
- **Aceite:** [ ] T1, T2, T3 verdes · [ ] T5.2 instrumentado · **Est.:** M

## Sequência
mvp-01 → (02,03,04,05 paralelo) → 06 → (07,08,09,10 paralelo) → (11,12 paralelo) → 13.
