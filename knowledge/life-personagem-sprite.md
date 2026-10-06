---
type: decision
title: "Personagem de /life: sprite em mapa de pixels pré-renderizado"
description: "O avatar do jogo em canvas de src/life.html é a const PlayerSprite: peças (cabeça, tronco, braços, 8 poses de perna) escritas como mapas de caracteres (1 char = 1 pixel, letra = cor da PALETTE), compostas por quadro com contorno automático (silhueta em vizinhança 4 + linha das peças da frente sobre as de trás) e pré-renderizadas uma vez em canvas offscreen via ImageData, nas duas direções; no jogo custa 1 drawImage por quadro. Arte derivada da sprite sheet de referência enviada pelo autor (vista 3/4, óculos, topete, camiseta preta, jeans): 48 px de altura, cabeça 38%. Ciclo de caminhada de 8 quadros escolhido pela distância andada (CONFIG.PLAYER.STRIDE_PX), não pelo relógio; a direção persiste ao soltar a tecla; respiração e piscada parados somem com prefers-reduced-motion. Substituiu ~80 fillRect por quadro com pernas em 'pistão' vertical a 8 Hz. Contrato preservado: drawPlayer(x, y, isMoving, isMovingLeft, gameTime), pés em (x+8, y+23). Teste: tests/life.spec.js (lê pixels do canvas). Spec: docs/specs/pages/life/SDD-personagem-pixel-art.md."
generated: { by: agent/cli, at: "2026-10-06T00:09:29Z" }
---

# Related Concepts
- [i18n: terminologia técnica no Argos Translate (estudo, nada adotado)](i18n-terminologia-argos.md): o gêmeo /en/life.html sai do mesmo pipeline Argos, mas o script do jogo é copiado sem tradução: STORY_DATA (a narrativa no canvas) segue em PT-BR no /en/
