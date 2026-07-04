---
id: GMP-01
titulo: Monolito — Sequência de Revelação
versao: 1.0.0
status: aprovado
dominio: gameplay
depende-de: [CTR-01, CTR-02, CTR-07]
consumido-por: [A5]
---

# GMP-01 — Revelação do Monolito

## Contexto
Cada quadrante termina num Monolito (pilar wireframe) que guarda a memória do
marco. Ao aproximar-se, dispara sequência coesa de "decodificação de pacote
protegido". O decode com hold (memórias pesadas) está em GMP-02.

## Objetivo
Sequência automática, percebida como UM evento contínuo, do raio de ativação
até o modal aberto.

## Regras
- RG-01 Raio de ativação: 4 unidades de mundo (REVEAL_DIST). Ao cruzar:
  publicar `monolith:reveal-start`; CMP-01 pausa movimento.
- RG-02 Sequência (timeline fixa):
  `t0` shockwave ~90 partículas radiais, cor = accent do arco, gravidade leve,
  fade 1,2s · `t0+100ms` flash overlay (300ms) + camera shake 0,5s (amplitude
  reduzida — ver ACC/RND-04) · `t0+150ms` CUE-REVEAL (beep) + `[WARN] pacote de
  memória detectado. decodificando…` no log · `t0+700ms` fade-out da cena
  (600ms) · `t0+1300ms` modal abre.
- RG-03 Modal: imagem decodificada em passos de resolução 6→14→32→64→128→final px,
  canvas sem smoothing, rótulo `#decode-status` com percentual; depois texto
  typewriter 18ms/caractere com CUE-DECODE a cada 3 caracteres.
- RG-04 `emotionalLoad` (CTR-01): 0–1 = decode limpo; 2 = 1 travamento breve
  (800ms em 32px); 3 = delega a GMP-02 (hold sustentado).
- RG-05 Ao fechar o modal: publicar `memory:unlocked`; StoryEngine decide avanço.
- RG-06 Monolito já revelado (revisita via `cd`): sem shockwave/flash; abre modal
  direto com decode instantâneo (memória já "em cache").

## Interfaces
- Publica: `monolith:reveal-start`, `monolith:decode-progress`, `memory:unlocked`.
- Assina: `player:moved` (checagem de raio).
- Lê: marco ativo (`currentPhase`), `unlockedMemories` (CTR-08).

## Casos extremos
- Jogador entra no raio via teleporte `cd`: sequência normal se não desbloqueada.
- Duplo disparo (jitter na fronteira do raio): lock booleano até `memory:unlocked`.
- Imagem 404: modal abre com frame de "pacote corrompido" (padrão de macroblock
  estático) + texto normal; nunca quebra a sequência. `[WARN]` no log.
- Safe-mode: flash → dip-to-black; shake → off (mapa completo em ACC-01).

## Critérios de aceite
- [ ] Sequência inteira sem input do jogador (exceto emotionalLoad 3).
- [ ] Nenhum passo da timeline com gap >1,5s sem feedback audiovisual.
- [ ] Revisita não repete shockwave.
- [ ] 404 de imagem não impede `memory:unlocked`.

## Referências
GMP-02 (hold), RND-03 (partículas), CTR-07 (cues), ACC-01 (traduções).
