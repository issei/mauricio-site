---
id: AUD-02
titulo: AudioEngine — Cue Sheet do Vale (2017)
versao: 1.0.0
status: aprovado
dominio: audio
depende-de: [AUD-01, CTR-07, CTR-02]
consumido-por: [A7]
---

# AUD-02 — Cues do Vale

## Contexto
A fase 11 conta o colapso e a reconstrução por áudio tanto quanto por visual.
Cues disparados por CMP-14 via `cue:trigger` (gatilhos por posição — GMP-03/04).
Implementação sobre as cadeias de AUD-01.

## Cues (implementação)
- **CUE-VALE-01 "desafinacao"** — `chain-familia`: ramp de `detune` do valor
  corrente (-15) até -45 cents em 90s + `Tone.Filter` lowpass na cadeia,
  cutoff 8kHz→900Hz no mesmo intervalo. A progressão I–vi–IV–V continua
  correta — só soa cada vez mais errada.
- **CUE-VALE-02 "packet-loss"** — inserir `Tone.BitCrusher` no master musical
  (não na via SFX): bits 8→4 em 60s. Dropouts: janelas de silêncio de 60–200ms
  agendadas no Transport, probabilidade 5%→25% por compasso. Cliques da
  `chain-tecnologia` degeneram: envelope attack irregular (±50%).
- **CUE-VALE-03 "batimento"** — `Tone.MembraneSynth` C1, colcheias com swing
  0,3 + humanize 20ms; BPM proporcional à distância do Monolito: 52 (12 un) →
  38 (raio). Único elemento rítmico restante (demais cadeias já a gain ≤0,2).
- **CUE-VALE-04 "silencio"** — TODOS os gains (musical + `sfxMuted=true`) → 0
  em 800ms. Seno puro 432Hz a -38dB (oscilador dedicado). Duração exata 4s.
  Timer próprio do cue; ao fim, libera `sfxMuted`.
- **CUE-VALE-05 "ouro"** — `Tone.PluckSynth` (dampening 3500, resonance 0,92)
  → `Tone.Reverb` decay 8s. Escala hirajoshi em D: [D4, Eb4, G4, A4, Bb4].
  Sequenciamento: 1 nota por segmento de fissura percorrido — CMP-13 assina
  `scar:gilded` e agenda notas distribuídas no `durationMs` (14s ≈ 22
  segmentos: ciclar a escala ascendente/descendente).
- **CUE-VALE-06 "retomada"** — crossfade padrão (1,4s) para `chain-maturidade`
  com uma adição única: o motivo da família (I–vi–IV–V em F) reharmonizado —
  mesmas fundamentais tocadas pelo AMSynth como notas esparsas. Detune da
  `chain-familia` volta a 0 (nunca mais desafina). Remover BitCrusher.

## Versão curta de CUE-VALE-05 (marco 7 — solda de 2004)
3 notas apenas (D4, G4, A4), reverb idêntico, 4s. Mesmo sintetizador.

## Regras
- RG-01 Cues são idempotentes: redisparo é no-op logado `[WARN]`.
- RG-02 Ordem obrigatória 01→02→03→04→05→06; cue fora de ordem é erro (throw
  em dev, no-op+WARN em prod).
- RG-03 Nenhum cue aloca sintetizador em runtime: todos pré-construídos no boot
  com gain 0.

## Casos extremos
- Jogador em `cd` para fora após CUE-VALE-02: fase reinicia (CTR-08) → cues
  resetam ao estado pré-Vale (detune -15, sem BitCrusher).
- Aba perde foco durante VALE-04: timer pausa com o Transport; silêncio retoma
  completo ao voltar.

## Critérios de aceite
- [ ] Detune audível como "errado" sem que a progressão mude (teste cego).
- [ ] VALE-04: 4,0s ±50ms de silêncio total.
- [ ] Notas do ouro terminam junto com a varredura visual (±300ms).
- [ ] Reset completo dos efeitos ao reiniciar a fase.
