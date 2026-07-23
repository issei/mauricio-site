/**
 * Indicador de progresso adaptativo — lógica pura (spec §2.G, evolução 16).
 * ---------------------------------------------------------------------------
 * Não é `scrollY / scrollHeight`. O progresso é ponderado por camada, com peso
 * INVERSO à densidade: a Camada 1 é curta e consome pouco da barra (passa
 * rápido); a Camada 3 é densa e consome metade (desacelera).
 *
 * A barra deixa de ser um indicador genérico e vira a própria metáfora de
 * densidade crescente descrita em §1.2 — "acelera na Camada 1 e desacelera na
 * Camada 3".
 */

/** Soma exatamente 1. Alterar aqui muda o ritmo percebido da página inteira. */
export const LAYER_WEIGHTS = { 1: 0.2, 2: 0.3, 3: 0.5 };

const clamp01 = (n) => (n < 0 ? 0 : n > 1 ? 1 : n);

/**
 * @typedef {{layer:1|2|3, top:number, height:number}} LayerBox
 */

/**
 * Progresso total 0–1 dado o scroll atual e as caixas de cada camada.
 *
 * @param {number} scrollY posição de rolagem (topo da viewport)
 * @param {number} viewportH altura da viewport
 * @param {LayerBox[]} boxes caixas das camadas, em ordem de documento
 * @returns {number} 0–1
 */
export function computeProgress(scrollY, viewportH, boxes) {
  if (!boxes || boxes.length === 0) return 0;

  // Âncora no centro da viewport: usar o topo faria a barra ficar em 0 durante
  // toda a primeira dobra, e usar a base a deixaria adiantada no fim.
  const anchor = scrollY + viewportH / 2;

  // A página alterna entre camadas várias vezes (cada Zona percorre 1→2→3), de
  // modo que existem VÁRIAS caixas por camada. O peso pertence à camada, não à
  // caixa: ele é repartido proporcionalmente à altura das caixas daquela
  // camada. Sem isso, três seções de Camada 1 somariam 3 × 0.20 e a barra
  // chegaria a 100% no meio da página.
  const heightByLayer = new Map();
  for (const box of boxes) {
    if (box.height <= 0) continue;
    heightByLayer.set(box.layer, (heightByLayer.get(box.layer) ?? 0) + box.height);
  }

  let total = 0;
  for (const box of boxes) {
    if (box.height <= 0) continue;
    const layerHeight = heightByLayer.get(box.layer) ?? 0;
    if (layerHeight <= 0) continue;
    const weight = (LAYER_WEIGHTS[box.layer] ?? 0) * (box.height / layerHeight);
    const fraction = clamp01((anchor - box.top) / box.height);
    total += fraction * weight;
  }
  return clamp01(total);
}

/**
 * Soma dos pesos das camadas presentes. Quando a página não tem as três, os
 * pesos são renormalizados para que o fim da página continue sendo 100%.
 * @param {LayerBox[]} boxes
 */
export function normalizedWeights(boxes) {
  const present = [...new Set(boxes.map((b) => b.layer))];
  const sum = present.reduce((acc, l) => acc + (LAYER_WEIGHTS[l] ?? 0), 0);
  if (sum === 0) return { ...LAYER_WEIGHTS };
  return Object.fromEntries(
    present.map((l) => [l, (LAYER_WEIGHTS[l] ?? 0) / sum])
  );
}
