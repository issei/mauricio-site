---
id: BKL-02
titulo: Backlog — Alpha (Waves 5–6: interação e set-piece)
versao: 1.0.0
status: aprovado
dominio: backlog
depende-de: [P03, P04, BKL-01]
consumido-por: [orquestrador]
---

# BKL-02 — Backlog Alpha

Alpha (definição): MVP + CLI completo, Companion, BranchRails, Vale orquestrado,
boot/final, modal definitivo. Pré-requisito: BKL-01 inteiro DONE.

### BKL-alpha-01 — Implementar CLIEngine (terminal completo)
- **Agente:** A9 · **Dieta:** [CLI-01, CTR-05, CTR-02] · **Dep.:** —
- **Artefato:** `src/lifeos/cli/engine.js`
- **Aceite:** [ ] critérios CLI-01 (4) · [ ] todos os comandos CTR-05 exceto
  os 2 do merge (fase 11) · **Est.:** M

### BKL-alpha-02 — Implementar composer por tokens (mobile)
- **Agente:** A9 · **Dieta:** [CLI-02, CTR-05, GMP-04] · **Dep.:** alpha-01
- **Artefato:** `src/lifeos/cli/composer.js`
- **Aceite:** [ ] critérios CLI-02 (4) · **Est.:** M

### BKL-alpha-03 — Implementar ProductionLog
- **Agente:** A8 · **Dieta:** [UI-03, CTR-02, CTR-04] · **Dep.:** —
- **Artefato:** `src/lifeos/ui/prodlog.js`
- **Aceite:** [ ] critérios UI-03 (4) · **Est.:** P

### BKL-alpha-04 — Implementar CompanionAI (comportamento)
- **Agente:** A10 · **Dieta:** [CAI-01, CTR-02, CTR-03] · **Dep.:** —
- **Artefato:** `src/lifeos/companion/companion.js`
- **Aceite:** [ ] critérios CAI-01 (4) · **Est.:** M

### BKL-alpha-05 — Carregar pools de diálogo + `ask`
- **Agente:** A10 · **Dieta:** [CAI-02, CAI-01, CTR-01] · **Dep.:** alpha-04
- **Artefato:** `src/lifeos/companion/dialogues.js`
- **Aceite:** [ ] critérios CAI-02 (3) · [ ] pools completos (6/arco) ·
  [ ] fala de revisita do ADR-002 incluída no pool maturidade · **Est.:** P

### BKL-alpha-06 — Implementar BranchRails
- **Agente:** A4 · **Dieta:** [GMP-05, CTR-01, CTR-03] · **Dep.:** —
- **Artefato:** `src/lifeos/scene/rails.js`
- **Aceite:** [ ] critérios GMP-05 (4) · **Est.:** M

### BKL-alpha-07 — Implementar ValeSequence Ato I
- **Agente:** A5 · **Dieta:** [GMP-03, CTR-02, CTR-07] · **Dep.:** alpha-06
- **Artefato:** `src/lifeos/gameplay/vale.js`
- **Aceite:** [ ] critérios GMP-03 (4) · **Est.:** M

### BKL-alpha-08 — Implementar ValeSequence Atos II–III
- **Agente:** A5 · **Dieta:** [GMP-04, CTR-05, CTR-07, AVT-02] · **Dep.:** alpha-07, 01, 02
- **Artefato:** `src/lifeos/gameplay/vale.js` (extensão)
- **Aceite:** [ ] critérios GMP-04 (4) · [ ] queda de cabelo AVT-02 RG-09/10 ·
  **Est.:** G→quebrar: 08a (Ato II) e 08b (Ato III) na emissão

### BKL-alpha-09 — Implementar cues do Vale no AudioEngine
- **Agente:** A7 · **Dieta:** [AUD-02, CTR-07, CTR-02] · **Dep.:** —
- **Artefato:** `src/lifeos/audio/vale-cues.js`
- **Aceite:** [ ] critérios AUD-02 (4) · **Est.:** M

### BKL-alpha-10 — Implementar boot, splash e tela final
- **Agente:** A2 · **Dieta:** [GMP-06, AUD-01, CTR-08] · **Dep.:** —
- **Artefato:** `src/lifeos/boot.js`
- **Aceite:** [ ] critérios GMP-06 (4) · **Est.:** P

### BKL-alpha-11 — Modal de memória definitivo
- **Agente:** A8 · **Dieta:** [UI-04, GMP-01, GMP-02, ACC-01] · **Dep.:** —
- **Artefato:** `src/lifeos/ui/modal.js`
- **Aceite:** [ ] critérios UI-04 (4) · **Est.:** M

### BKL-alpha-12 — Suíte T4–T6 completa
- **Agente:** A11 · **Dieta:** [TST-01, TST-02 + specs dos alvos] · **Dep.:** alpha-08, 09, 11
- **Artefato:** `tests/` (extensão)
- **Aceite:** [ ] T4, T5, T6 verdes · [ ] matriz TST-02 sem lacuna · **Est.:** M

## Sequência
(01,03,04,06,09,10,11 paralelo) → (02,05,07 paralelo) → 08a → 08b → 12.
Review: waves conforme P04 (R1 em falas/strings; R-todos no 08).
