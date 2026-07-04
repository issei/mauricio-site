---
id: RND-01
titulo: SceneCore — Cena, Câmera, Corredor, Input
versao: 1.0.0
status: aprovado
dominio: rendering
depende-de: [CTR-02, PRF-01]
consumido-por: [A2]
---

# RND-01 — SceneCore

## Contexto
Motor base herdado do life3d_v2: Three.js r167, câmera isométrica fixa, corredor
por quadrante, avatar em primitivas. Este doc define o contrato do núcleo que
todos os componentes de render usam.

## Objetivo
Loop estável 60fps desktop / ≥30fps mobile, com API mínima para os demais
componentes adicionarem objetos.

## Regras
- RG-01 Câmera: isométrica com offset diagonal fixo, sem rotação livre; segue o
  avatar com lerp fator 0,08/frame. FOV 50.
- RG-02 Inclinação narrativa: a partir do marco 9 (`fork_daughter`), pitch da
  câmera +4° permanente (aplicado também em revisitas — flag em CTR-08 seria
  redundante: derivar de `unlockedMemories.includes("fork_daughter")`).
- RG-03 Corredor: por quadrante, largura jogável PATH_HW = 2,2 unidades
  (±paredes invisíveis moduladas por GMP-05 RG-02); comprimento 54; Z de 2 até
  −52 (Monolito).
- RG-04 Movimento: velocidade base 6 un/s × `walkSpeed` da versão do avatar
  (CTR-06). Aceleração/desaceleração 150ms (nunca instantâneo).
- RG-05 Input (CMP-17): WASD + setas + d-pad touch + tap-to-move. Enquanto
  `cli:opened`: TODOS os intents de movimento descartados.
- RG-06 `player:moved` publicado com throttle 100ms; `player:idle` a cada 1s
  parado.
- RG-07 Reconstrução de fase (`cd` ou avanço): destruir objetos do quadrante
  anterior via pool de reuso (nunca `new` em rajada — PRF-01); tela preta ≤300ms.
- RG-08 Pausa global: `monolith:reveal-start` congela movimento até
  `memory:unlocked`; loop de render continua (partículas vivem).
- RG-09 pixelRatio limitado a 2. Resize com debounce 200ms.

## Interfaces
- Publica: `player:moved`, `player:idle`.
- Assina: `phase:changed` (reconstrói quadrante), `monolith:reveal-start`,
  `memory:unlocked`, `cli:opened/closed`.
- API exposta: `scene.add(obj)` / `scene.remove(obj)` (Camada 3+),
  `getPlayerPos()` (leitura).

## Casos extremos
- WebGL context lost: overlay `[FATAL] renderer: context lost — recarregue.`
  (única exceção à regra do FATAL de NAR-03: prefixado `renderer:`).
- Aba em background: `requestAnimationFrame` já pausa; ao voltar, delta-time
  clampado a 100ms (evita saltos de física).
- Resize durante modal: modal é DOM, re-layouta sozinho; cena congelada re-renderiza 1 frame.

## Critérios de aceite
- [ ] 60fps em desktop médio com todos os pós-FX (medir PRF-01 §cenas).
- [ ] Zero `new` de geometria/material após boot do quadrante (profiler).
- [ ] Inclinação de 4° presente em revisita a marcos <9? NÃO — só marcos ≥9
      quando `fork_daughter` desbloqueado E marco visitado ≥9 (a época manda).
- [ ] Movimento morto durante CLI aberto e durante revelação.
