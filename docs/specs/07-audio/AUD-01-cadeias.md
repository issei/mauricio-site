---
id: AUD-01
titulo: AudioEngine — Cadeias por Arco e Via SFX
versao: 1.0.0
status: aprovado
dominio: audio
depende-de: [CTR-07, CTR-02]
consumido-por: [A7]
---

# AUD-01 — Cadeias e SFX

## Contexto
Trilha 100% procedural (Tone.js 14.8, zero samples). 4 cadeias concorrentes
sempre ativas, mixadas por gain — trocar de arco é crossfade, nunca reload.
Cues do Vale em AUD-02. Nomes canônicos em CTR-07.

## Objetivo
Motor musical que reage à narrativa por mixagem, com via SFX independente de
latência mínima.

## Regras — cadeias
- RG-01 Arquitetura: 1 `Tone.Gain` de saída por cadeia → master. Crossfade:
  ramp de 1,4s (sincronizado com lerp de cor — CTR-03 RG-02).
- RG-02 `chain-infancia`: Tone.Synth quadrada, arpejo pentatônico (C-D-E-G-A
  oitava 4), loop 8n, BPM 100.
- RG-03 `chain-tecnologia`: NoiseSynth disparo p=0,35 por 16n (cliques de
  teclado) + FMSynth acordes espaçados (2 por compasso, sus2). No marco 4,
  p sobe a 0,5 (pico de digitação — NAR-01).
- RG-04 `chain-familia`: PolySynth triangular, progressão I–vi–IV–V em F,
  2 compassos/acorde, BPM 72. Detune modulável (CUE-VALE-01; -15 cents
  silencioso a partir do marco 10 — NAR-02).
- RG-05 `chain-maturidade`: AMSynth notas esparsas (1 por 4 compassos) +
  Reverb decay 8s + blips (Synth) por PingPongDelay 0,25.
- RG-06 `Tone.Transport` inicia apenas em `audio:unlocked`; nunca para depois
  (pausas são gains a zero).

## Regras — via SFX (Web Audio pura, sem Tone.js)
- RG-07 Oscilador quadrado + envelope de ganho por beep; latência prioritária.
- RG-08 Consumidores: typewriter (beep 3/caracteres), CUE-DECODE (por passo,
  -20% freq se emotionalLoad 3), CUE-REVEAL, teclas do CLI.
- RG-09 Independente do master do Tone.js — EXCETO durante CUE-VALE-04
  (silêncio): flag global `sfxMuted` respeitada por 4s (única exceção).

## Interfaces
- Assina: `phase:changed` (crossfade por `ARC_THEME.audioChain`), `cue:trigger`,
  `audio:unlocked`, `vale:*`.
- Expõe: `sfx.beep(freq, durMs)` para CMP-07/10.

## Casos extremos
- `phase:changed` durante crossfade: cancelar ramps e iniciar novo do valor atual.
- AudioContext suspenso pelo SO (mobile em background): ao retomar, `resume()`
  e re-sincronizar Transport; nunca reiniciar cadeias.
- Usuário nunca clica "Iniciar Jornada": jogo funciona mudo; nenhum erro.

## Critérios de aceite
- [ ] Troca de arco sem clique/pop audível (ramp completo).
- [ ] Silêncio VALE-04 total: análise de saída = piso de ruído por 4s
      (exceto seno 432Hz @ -38dB).
- [ ] Zero requisições de rede de áudio (tudo sintetizado).
- [ ] Beep de typewriter com latência <30ms do caractere.
