---
id: BKL-03
titulo: Backlog — Beta e RC
versao: 1.0.0
status: aprovado
dominio: backlog
depende-de: [RMP-01, BKL-02]
consumido-por: [orquestrador]
---

# BKL-03 — Beta e RC

## §Beta
### BKL-beta-01 — Hardening de segurança (SEC-01)
- **Agente:** A1 · **Dieta:** [SEC-01, CLI-01, CTR-08] · **Dep.:** alpha completo
- **Artefato:** revisão + patches em cli/engine.js, core/session.js + CSP no HTML
- **Aceite:** [ ] critérios SEC-01 (4) · **Est.:** P

### BKL-beta-02 — Fala de revisita (ADR-002) + pools completos
- **Agente:** A10 · **Dieta:** [ADR-002, CAI-02, CAI-01] · **Dep.:** —
- **Aceite:** [ ] fala de revisita dispara 1x na primeira revisita pré-2004
  pós-Vale · [ ] 6 falas/arco revisadas por R1 · **Est.:** P

### BKL-beta-03 — Polish de transições
- **Agente:** A2 · **Dieta:** [RND-01, UI-02, CTR-03] · **Dep.:** —
- **Aceite:** [ ] troca de fase sem frame preto >300ms · [ ] lerp de cor e
  crossfade de áudio simultâneos (±100ms) · [ ] zero "pulos" visuais em 12
  transições gravadas · **Est.:** M

### BKL-beta-04 — Analisador de luminância (antecipado do gate)
- **Agente:** A11 · **Dieta:** [ACC-01, TST-01 §T6, RND-04] · **Dep.:** —
- **Artefato:** `tests/luminance-analyzer.js`
- **Aceite:** [ ] captura sessão inteira e reporta violações WCAG 2.3.1 com
  timestamp · [ ] roda nos 2 modos · **Est.:** M

### BKL-beta-05 — Ajuste fino de mixagem
- **Agente:** A7 · **Dieta:** [AUD-01, AUD-02] · **Dep.:** —
- **Aceite:** [ ] loudness consistente entre cadeias (±3 LU) · [ ] VALE-04
  medido 4,0s ±50ms · [ ] sem clipping no master em sessão inteira · **Est.:** P

### BKL-beta-06 — Teste com usuários (3 pessoas, 1 mobile)
- **Agente:** humano (dono) + A11 compila · **Dieta:** [roteiro em TST-02 §UX]
- **Aceite:** [ ] 3 sessões completas observadas · [ ] achados classificados
  (bloqueia-RC / melhoria / ideia) · **Est.:** M

## §RC
### BKL-rc-01 — Correções bloqueantes do beta
- **Agente:** conforme achado · **Dep.:** beta-06 · **Est.:** dimensionar na emissão

### BKL-rc-02 — Aprovação de conteúdo (NAR-04 → 1.0.0)
- **Agente:** dono (humano) · **Dieta:** [NAR-04, NAR-01, NAR-02, CAI-02]
- **Aceite:** [ ] status aprovado + assinatura no front-matter · **Est.:** P

### BKL-rc-03 — Congelamento e smoke final
- **Agente:** A11 · **Dieta:** [TST-02, RMP-01] · **Dep.:** rc-01, rc-02
- **Aceite:** [ ] suíte completa verde · [ ] matriz TST-02 100% · [ ] tag de
  versão nos docs (1.0.0) · **Est.:** P

## Sequência
Beta: (01,02,03,04,05 paralelo) → 06. RC: 01 → 02 → 03.
