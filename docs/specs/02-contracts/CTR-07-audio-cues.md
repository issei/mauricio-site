---
id: CTR-07
titulo: Contrato AUDIO_CUES (cadeias e cues)
versao: 1.0.0
status: aprovado
produtores: [dados-estaticos]
consumidores: [CMP-13, CMP-14]
---

# CTR-07 — AUDIO_CUES

## Propósito
Nomes canônicos e parâmetros das 4 cadeias musicais e dos cues pontuais.
Implementação sonora em AUD-01/02. CMP-14 dispara cues via `cue:trigger` (CTR-02).

## Cadeias (uma por arco — CTR-03.audioChain)
| id | Síntese | Caráter |
|---|---|---|
| `chain-infancia` | Synth quadrada, arpejo pentatônico loop 8n | 8-bit NES/tokusatsu |
| `chain-tecnologia` | NoiseSynth (cliques ~35%/16n) + FMSynth acordes esparsos | teclado mecânico + pulso digital |
| `chain-familia` | PolySynth triangular, 4 acordes quentes, 2 compassos/acorde | estabilidade harmônica |
| `chain-maturidade` | AMSynth + Reverb cauda longa + blips com PingPongDelay | atmosfera quântica |

Regras de mixagem: 4 cadeias sempre ativas em paralelo; troca por gain ramp 1,4s
(crossfade); nunca recarregar/parar transporte.

## Cues (eventos pontuais — id · gatilho · resumo)
```
CUE-VALE-01 "desafinacao"   vale:act1        detune familia 0→-45cents/90s + LPF 8k→900Hz
CUE-VALE-02 "packet-loss"   meio do act1     BitCrusher 8→4 bits; dropouts 60–200ms, p 5→25%
CUE-VALE-03 "batimento"     aproximação      MembraneSynth C1, 52→38bpm, swing .3
CUE-VALE-04 "silencio"      vale:merge-resolved  todos gains→0 (800ms); seno 432Hz @ -38dB; 4s
CUE-VALE-05 "ouro"          scar:gilded      PluckSynth hirajoshi em D (D,Eb,G,A,Bb); 1 nota/segmento; reverb decay 8s
CUE-VALE-06 "retomada"      fim do act3      crossfade p/ chain-maturidade com motivo familia reharmonizado; detune→0
CUE-REVEAL  "shock"         monolith:reveal-start  beep quadrado curto (via SFX)
CUE-DECODE  "beep-passo"    decode-progress  beep por passo; -20% freq se emotionalLoad=3
```

## Via SFX (separada do Tone.js)
Web Audio pura (oscilador + envelope), latência mínima. Usada por: beeps de
typewriter, teclas do CLI, CUE-REVEAL, CUE-DECODE. NÃO passa pelos gains das
cadeias — exceção: durante CUE-VALE-04 a via SFX também é silenciada (única vez).

## Regras
1. Nada toca antes de `audio:unlocked` (gesto do usuário).
2. `emotionalLoad` (CTR-01) modula CUE-DECODE (freq -20%, intervalo irregular).
3. Cues VALE só válidos na fase 11; disparo fora dela é no-op logado como WARN.
