# SDD — Cenário de `/life`: chaves de `CONFIG` que não existiam

> Página: `src/life.html` (gêmeo gerado: `src/en/life.html`) · Teste: `tests/life.spec.js`
> Escopo: camadas de fundo, árvores, fade entre fases e posição da foto de memória.
> O personagem não muda (ver [SDD-personagem-pixel-art.md](SDD-personagem-pixel-art.md)).

## 1. Problema

O código lia quatro chaves que o objeto `CONFIG` nunca definiu (desde o primeiro commit do
arquivo, `023a1c0`). Nenhuma dava erro; todas falhavam em silêncio:

| Leitura | Efeito |
| :--- | :--- |
| `CONFIG.PARALLAX_FACTOR` (3ª camada de `drawCities` e `drawMountains`) | `cameraX * undefined` = `NaN`; `fillRect`/path com `NaN` não desenha. A camada mais próxima de prédios e montanhas nunca apareceu. |
| `CONFIG.PROP_COUNT` (`PropsGenerator.generate`) | O laço não roda: nenhuma árvore. |
| `CONFIG.TRANSITION_DURATION` (`UIManager.fadeOut`) | `setTimeout(cb, undefined)` = 0 ms: a fase trocava antes de o overlay escurecer. |
| `CONFIG.FADE_DURATION` (`UIManager.fadeIn`) | Idem: o overlay voltava a clarear no mesmo instante. |

## 2. Decisões

1. **Parallax da camada próxima = `CONFIG.ENV.SKYLINE_LAYERS[2]` (0.25).** O valor já estava no
   `CONFIG` sem ser lido; as duas primeiras entradas (0.08, 0.15) são as das camadas 1 e 2 dos
   prédios. As montanhas usam o mesmo valor, como o código original pretendia (as duas camadas
   apontavam para a mesma chave).
2. **Árvores: `CONFIG.ENV.PROP_COUNT = 5`, espaçadas por `CONFIG.STORY.PHASE_LENGTH` (700 px).** O
   espaçamento era `10000 / PROP_COUNT`, de um mundo de 10 000 px: com ele, quase todas nasceriam
   fora da fase (a câmera mostra no máximo x ≈ 0–1150). Meio passo de margem nas pontas e variação
   simétrica de ±25 px: centros em 70, 210, 350, 490 e 630, nenhuma atrás do personagem no início
   (x = 20) nem embaixo do objetivo (x = 680).
3. **Fade pelas chaves de `CONFIG.STORY`.** `TRANSITION_DURATION` (1000 ms) é a duração da transição
   CSS do `#fadeOverlay` (1 s): a fase troca com a tela toda preta. `FADE_DURATION` (500 ms) é a
   pausa no preto antes de clarear. Medido: escurece em 0 ms, troca em ~1000 ms, clareia em
   ~1515 ms. Com `prefers-reduced-motion: reduce`, a regra global `a11y-motion` zera a transição:
   vira um corte para preto de 1,5 s, sem piscar.
4. **Foto de memória acima do horizonte.** Com a camada próxima visível (montanhas de até 140 px,
   prédios de até 110 px), a metade de baixo da foto ficava coberta em 8 das 11 fases. Decisão do
   autor (2026-10-05): desenhar a foto depois de montanhas e prédios.
   Ordem em `drawBackground`: céu → montanhas → prédios → foto → nuvens → chão.
   Consequência: a foto aparece inteira (antes, as camadas do meio já cobriam a borda de baixo) e
   deixa de "surgir atrás da cidade". As nuvens continuam passando por cima dela.

## 3. Verificação

- Capturas do canvas nas 11 fases, no início e com a foto ≥ 92% revelada, antes e depois, contra
  o dev server (Playwright, Chromium).
- `tests/life.spec.js`: 12/12 (Chromium, Firefox, WebKit). Na faixa lida pelo teste (x 0–300,
  y 190–260), nenhum pixel de árvore ou da camada próxima tem uma das 4 cores da sprite.

## 4. Fora do escopo (registrado)

- **Profundidade invertida.** `drawMountains` desenha as 3 camadas antes de `drawCities`: as
  montanhas próximas (0.25) ficam atrás dos prédios distantes (0.08) e andam mais rápido que eles.
  Corrigir exige intercalar as camadas por profundidade.
- **Contraste mais fraco do personagem:** fase 10 (chão `#2F4F4F` → prédios próximos `#0C2C2C`)
  atrás do cabelo preto no início da fase. Continua legível: rosto, óculos e camiseta se destacam.
- **Chaves de `CONFIG.ENV` ainda sem leitura:** `WIND_SPEED`, `CLOUD_LAYERS`,
  `CITY_WINDOW_CHANCE` e `SKYLINE_LAYERS[0..1]`. O desenho repete os mesmos valores escritos à mão.
- **Foto da fase 2 de outra origem** (`https://mauricio.issei.com.br/static/images/infancia.png`):
  depois que ela é desenhada, o canvas fica "sujo" e `getImageData`/`toDataURL` lançam
  `SecurityError`. Um teste que leia pixels a partir da fase 2 precisa de captura de tela.
