# SDD — Personagem em pixel art de `/life`

> Página: `src/life.html` (gêmeo gerado: `src/en/life.html`) · Teste: `tests/life.spec.js`
> Escopo: só o avatar do jogador. Cenário, fases e narrativa não mudam.

## 1. Problema

O avatar era desenhado a cada quadro com ~80 `fillRect` posicionados por senoides. Na prática:

- **Pernas e braços subiam e desciam** em vez de balançar: `legSwing` deslocava as pernas no
  eixo Y em ±5,5 px num ciclo de 120 ms (≈ 8 Hz) — um "pistão" trêmulo, não uma passada.
- **Rosto de frente andando de lado**, cabeça de 11×13 px sem leitura (óculos de 3×4 px).
- **Ao soltar ←, ele voltava a olhar para a direita**: a direção vinha de `keys.left`, que
  volta a `false` quando a tecla é solta.
- **Sombra acima dos pés** (centro em y+18; os pés terminam em y+23).
- `fillRect` em coordenada fracionária (câmera com lerp) borrava as bordas.

## 2. Referência de arte

Sprite sheet 3/4 andando para a direita, enviada pelo autor (8 quadros, fundo verde). Dela
saíram, por análise de cor (k-means) e reamostragem da grade:

| Item | Valor |
| :--- | :--- |
| Proporção | cabeça 38% · camiseta 29% · pernas 33% da altura |
| Cabelo | preto `#0d0d12` com fios azul-marinho `#2a3550`, topete espetado na frente |
| Pele | base `#ec9e67`, sombra `#cf714d`, luz `#f7c194`, boca `#8e4b34` |
| Óculos | armação grossa preta; reflexo `#f5f2f1`; pupila visível nas duas lentes |
| Roupa | camiseta preta lisa, jeans escuro, tênis preto com sola cinza |

A referência tem ~72 linhas de pixel; no jogo o personagem tem **48 px de altura** (+1 px de
contorno), para caber na escala do cenário (mundo de 740×380).

## 3. Decisões

1. **Mapa de pixels no código, sem arquivo de imagem.** Cada peça (cabeça, tronco, braços,
   pernas) é um array de strings; 1 caractere = 1 pixel, `'.'` = vazio, letra = cor da paleta.
2. **Composição por peças + contorno automático.** Os quadros são montados em camadas
   (braço de trás → perna de trás → perna da frente → tronco → braço da frente → cabeça).
   O contorno externo é gerado (vizinhança 4); peças da frente ganham 1 px de linha sobre o
   que está atrás (`ringOver`). Braço e perna de trás descem um tom (`SHADE`).
3. **Pré-renderização.** `PlayerSprite.bake()` compõe todos os quadros uma vez, em canvas
   offscreen via `ImageData`, nas duas direções (a esquerda é o espelho). Desenhar o personagem
   custa **um `drawImage` por quadro** (antes: ~80 `fillRect` + gradientes de alfa).
4. **Ciclo de caminhada de 8 quadros** (contato, descida, passagem, impulso — para cada perna),
   com o corpo subindo e descendo 1 px e os braços em oposição às pernas. Andando, os quadris
   ficam quase alinhados (colunas 12/13) para as pernas não cruzarem em X.
5. **Quadro pela distância, não pelo relógio.** `quadro = ⌊x / STRIDE_PX⌋ mod 8`: a passada
   acompanha o deslocamento e congela quando o personagem para.
6. **Anda só quando `x` muda.** Com as duas setas apertadas, ou na pausa do level-up, a tecla
   segue pressionada mas o personagem está parado — ele não "anda no lugar".
7. **A direção persiste** em `Renderer._facing` depois que a tecla é solta.
8. **Parado: respiração (2 quadros, `BREATH_MS`) e piscada (`BLINK_EVERY_MS`/`BLINK_MS`).** São
   animações automáticas: com `prefers-reduced-motion: reduce` o personagem fica estático.
9. **Grid de pixels.** A posição na tela é arredondada (`getTransform()` do contexto) antes do
   `drawImage`, porque a câmera anda em frações de pixel.

## 4. Contrato (não muda)

- Assinatura: `Renderer.drawPlayer(x, y, isMoving, isMovingLeft, gameTime)`.
- Âncora: centro dos pés em **(x + 8, y + 23)**, a mesma posição do avatar antigo; lógica de
  fase, colisão com o objetivo, partículas e texto de level-up seguem intactos.
- Parâmetros em `CONFIG.PLAYER`: `STRIDE_PX`, `BREATH_MS`, `BLINK_EVERY_MS`, `BLINK_MS`
  (substituem `ANIM_FPS`, `BOB_INTENSITY` e `HAIR_INERTIA`, que não eram lidos por nada).

## 5. Divergências do metaprompt de origem

O pedido partiu de um metaprompt gerado antes da leitura completa do código. Onde ele
divergia do código real, valeu o código:

| Metaprompt | Decisão | Motivo |
| :--- | :--- | :--- |
| Preservar a física (ciclo de 120 ms, bob senoidal) | Substituída por quadros | Era a causa do "pistão" (§1) |
| "Reduzir a cabeça" | Cabeça em 38% | É a proporção da referência enviada |
| Desenhar com `fillRect` a cada quadro | Mapa de pixels pré-renderizado | Mesma regra (sem arquivo externo), qualidade e custo melhores |
| Projeto "Next.js"; teste `terminal-evolutivo.spec.js` | Vite MPA; `tests/life.spec.js` | Fatos do repositório |

## 6. Como editar a arte

1. Edite o mapa da peça em `PlayerSprite` (`src/life.html`) — só letras da `PALETTE` ou `'.'`.
2. Pernas: quadril no centro da coluna 6; sola padrão na linha 16 (P1 −1 px, P3 +1 px, por
   causa do sobe-desce do corpo).
3. Rode `npm run i18n:sync` (o gêmeo `/en/` carrega o mesmo script) e `npx playwright test tests/life.spec.js`.

## 7. Verificação

`tests/life.spec.js` lê os pixels do canvas (a cena não tem DOM):

- a paleta da sprite aparece (reflexo da lente, pele, cabelo, jeans);
- depois de andar para a esquerda e soltar a seta, o rosto continua virado para a esquerda;
- com `reducedMotion: 'reduce'`, o personagem parado não muda em 2 s; sem a preferência, muda.

## 8. Fora do escopo (registrado)

- Fases de 2017 em diante ("fiquei careca") ainda mostram o personagem com cabelo; uma variante
  da cabeça seria uma linha de `HEAD` a mais por fase.
- Em `devicePixelRatio` fracionário (ex.: 1,25) a cena toda — não só o avatar — tem pixels de
  largura irregular, porque o backing store é `740 × dpr`. Corrigir exige mudar `resize()`.
