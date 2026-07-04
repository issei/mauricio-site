---
id: RND-02
titulo: GridShader — Chão de Dados e Cicatrizes Douradas
versao: 1.0.0
status: aprovado
dominio: rendering
depende-de: [CTR-02, CTR-03, CTR-08, PRF-01]
consumido-por: [A3]
---

# RND-02 — GridShader

## Contexto
Chão wireframe estilo Tron: linhas calculadas em GLSL via `fwidth` sobre posição
mundial XZ, brilho reativo ao jogador e ao passo. Extensão nova: fissuras
persistentes que podem ser "soldadas" em ouro (Kintsugi).

## Objetivo
Um único ShaderMaterial que renderiza grid + fissuras + ouro, sem geometria
adicional nem segundo material.

## Regras
- RG-01 Uniforms base (herdados): `uColor` (accent CTR-03, lerp 1,4s na troca de
  arco), `uPlayerPos`, `uWalkPulse`, `uTime`, `uGridDensity` (0,4–1,0).
- RG-02 Fissuras: textura de dados 1 canal (DataTexture 128×128 cobrindo o
  quadrante; 1 texel = 1 célula do grid). Valores: 0 normal · 0,5 rachada
  (linha apagada/deformada) · 1,0 dourada.
- RG-03 `scar:opened {gridCells}`: setar texels para 0,5; célula rachada
  renderiza a linha com ruído de deslocamento (quebra visual) e brilho 0.
- RG-04 `scar:gilded {scarId, durationMs}`: animar texels 0,5→1,0 em varredura
  sequencial ao longo do caminho da fissura (ordem do array `gridCells`),
  distribuída no `durationMs` (14s no Vale, 4s no marco 7).
- RG-05 Célula dourada: cor fixa do gradiente ouro (CTR-03 §Cores fixas) com
  banda especular animada (`uTime`), brilho independente de `uPlayerPos` —
  o ouro tem luz própria.
- RG-06 Persistência: na reconstrução de quadrante, reidratar a DataTexture a
  partir de `scars` (CTR-08). Cicatriz só aparece em revisita se o marco da
  cicatriz já foi vivido.
- RG-07 Densidade do Vale (GMP-03): `uGridDensity` decai por posição; células
  removidas por densidade ≠ células rachadas (canais distintos — densidade não
  persiste).
- RG-08 Proibido: segundo draw call para o ouro; alocação de textura fora do
  boot do quadrante.

## Interfaces
- Assina: `phase:changed`, `scar:opened`, `scar:gilded`, `player:moved`.
- Lê: `scars` (CTR-08), `ARC_THEME` (CTR-03).

## Casos extremos
- `scar:gilded` de cicatriz inexistente: no-op + `[WARN]` no log.
- Duas cicatrizes no mesmo quadrante (não ocorre no conteúdo atual, mas):
  varreduras independentes por scarId, texture compartilhada.
- Mobile (DataTexture 128² pesada?): reduzir para 64² sob flag de fallback
  (PRF-01) — degradação aceitável: fissura mais serrilhada.

## Critérios de aceite
- [ ] 1 draw call para o chão em qualquer estado.
- [ ] Cicatrizes idênticas após reload (persistência CTR-08).
- [ ] Varredura do ouro percorre células na ordem do array (visível como linha
      contínua avançando, nunca "tudo de uma vez").
- [ ] Ouro visível mesmo com jogador longe (luz própria).
