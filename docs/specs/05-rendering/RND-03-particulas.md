---
id: RND-03
titulo: ParticleField — Glifos, Modos de Gravidade e Queda de Cabelo
versao: 1.0.0
status: aprovado
dominio: rendering
depende-de: [CTR-02, CTR-03, PRF-01]
consumido-por: [A3]
---

# RND-03 — ParticleField

## Contexto
220 partículas de glifos (0,1,A,F,3,7,C,E) em atlas gerado em runtime (canvas
2D com glow), ShaderMaterial de Points com blending aditivo, oscilação por
seno/cosseno no vertex shader. Extensões: modos de gravidade e reuso para
shockwave/queda de cabelo.

## Objetivo
Um único sistema de partículas servindo 4 usos, sem realocar buffers.

## Regras
- RG-01 Buffer único: 220 (ambiente) + 90 (rajada) = 310 partículas alocadas no
  boot. Atributos estáticos: posição base, índice de glifo, fase de oscilação.
- RG-02 Modos (uniform `uMode` + atributo por partícula para a rajada):
  - `float` (padrão): oscilação senoidal Y/X; atração leve ao avatar
    multiplicada por `absorbRadius` da versão (CTR-06 — v1 = 2×, visível).
  - `fall` (Vale, `vale:act1`): queda 0,3 un/s com deriva lateral; ao tocar o
    chão, fade e reposição no topo.
  - `burst` (shockwave GMP-01): 90 partículas da rajada com velocidade radial,
    gravidade leve, fade 1,2s, cor = accent.
  - `hair` (`vale:act2`): as 90 da rajada emitem da cabeça do avatar, caem com
    física de `fall` mais lenta (0,15 un/s), glifos apagam ao pousar. Uma vez só.
- RG-03 Cor: accent do arco (CTR-03) exceto `hair` (branco-quente `#fbf1cf` a
  40% — cabelo, não dado).
- RG-04 Tamanho/opacidade atenuados pela profundidade da câmera (herdado).
- RG-05 Transições de modo: crossfade 600ms via uniform, nunca troca seca.

## Interfaces
- Assina: `phase:changed`, `monolith:reveal-start` (burst), `vale:act1` (fall),
  `vale:act2` (hair), `a11y:changed`.
- Lê: `ARC_THEME`, versão do avatar (para absorbRadius).

## Casos extremos
- Dois bursts em <1,2s (impossível por lock de GMP-01, mas): reiniciar o mesmo
  buffer — partículas antigas teleportam; aceitável.
- reduced-motion: `float` reduz amplitude 50%; `fall`/`hair` mantidos (lentos,
  não estroboscópicos — ACC-01); `burst` vira fade radial sem movimento.
- Mobile: contagem cai para 140+60 sob fallback de performance (PRF-01).

## Critérios de aceite
- [ ] Zero alocação de buffer após o boot (profiler em troca de fase e burst).
- [ ] Modo `hair` executa no máximo 1 vez por sessão.
- [ ] Absorção 2× perceptível na v1 (teste visual: partículas curvam ao menino).
- [ ] Crossfade de modo sem "pulo" visível.
