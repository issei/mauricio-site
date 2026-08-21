/**
 * Modelo da regra de parada — V4 (doc 02 §2, ficha V4).
 *
 * Módulo PURO: nenhuma referência ao DOM. Existe separado da renderização para
 * poder ser testado por invariantes em `tests/formulacao.model.test.mjs` — a
 * afirmação visual da página ("o ponto de parada se move com o custo do atraso
 * e com λ") é uma propriedade matemática, e propriedade se testa, não se olha.
 *
 * IMPORTANTE — as curvas são ILUSTRATIVAS. O artigo propõe λ como variável
 * experimental a ser calibrada em estudo controlado (§5.6), não como constante
 * conhecida. Os coeficientes abaixo foram escolhidos para exposição didática:
 * retornos decrescentes na investigação, custo de atraso linear e custo
 * cognitivo superlinear. Nenhum deles é resultado empírico.
 *
 * Formalização de origem (§6.4):
 *   EVSI_next + DUG_next + V_frame,next  <  C_next + C_delay + C_overload
 */

/** Domínio do eixo x: rodadas de investigação. */
export const DOMINIO = { min: 0, max: 10, passo: 0.25 };

/** Faixas dos controles expostos ao leitor. */
export const FAIXAS = {
  lambda: { min: 0, max: 1.5, passo: 0.1, padrao: 0.4 },
  urgencia: { min: 0, max: 6, passo: 0.5, padrao: 2 },
};

const EVSI_0 = 92;      // valor marginal da primeira rodada de investigação
const EVSI_K = 0.32;    // taxa de decaimento (retornos decrescentes)
const FRAME_0 = 38;     // valor de descobrir um enquadramento novo…
const FRAME_K = 0.85;   // …que colapsa rápido: frames novos aparecem cedo ou não aparecem
const CUSTO_BASE = 16;  // custo direto por rodada
const COGNITIVO_K = 1.1;
const COGNITIVO_EXP = 1.7;

/**
 * Benefício marginal da próxima rodada: EVSI′ (redução de incerteza relevante)
 * somado a V_frame′ (chance de descobrir objetivo ou alternativa ainda não
 * considerada). Estritamente decrescente — é a hipótese de retornos
 * decrescentes, não um achado.
 */
export function beneficioMarginal(t) {
  return EVSI_0 * Math.exp(-EVSI_K * t) + FRAME_0 * Math.exp(-FRAME_K * t);
}

/** Custo direto da rodada somado ao custo de atraso, que cresce com a urgência. */
export function custoMarginal(t, urgencia) {
  return CUSTO_BASE + urgencia * t;
}

/**
 * C_overload — custo cognitivo marginal da complexidade adicional, governado
 * pela penalidade de hiper-resolução λ (§5.6). Superlinear: cada variável nova
 * custa mais que a anterior porque interage com todas as já presentes.
 */
export function custoCognitivo(t, lambda) {
  return lambda * COGNITIVO_K * Math.pow(t, COGNITIVO_EXP);
}

/** Custo total marginal (direto + atraso + cognitivo). */
export function custoTotal(t, { lambda, urgencia }) {
  return custoMarginal(t, urgencia) + custoCognitivo(t, lambda);
}

/** Benefício líquido da rodada t. Enquanto positivo, investigar compensa. */
export function liquido(t, params) {
  return beneficioMarginal(t) - custoTotal(t, params);
}

/**
 * Ponto de parada t*: a primeira rodada do domínio em que o líquido deixa de
 * ser positivo. Fail-closed: se o líquido nunca vira negativo dentro do
 * domínio, devolve o limite superior — o modelo não inventa um ponto fora da
 * faixa que consegue representar.
 */
export function pontoDeParada(params) {
  const { min, max, passo } = DOMINIO;
  for (let t = min; t <= max + 1e-9; t += passo) {
    if (liquido(t, params) <= 0) return Number(t.toFixed(4));
  }
  return max;
}

/**
 * Benefício líquido acumulado até t* (soma de Riemann). É o valor que a
 * investigação entrega quando ela para na hora certa.
 */
export function liquidoAcumulado(params, ate = pontoDeParada(params)) {
  const { min, passo } = DOMINIO;
  let soma = 0;
  for (let t = min; t < ate - 1e-9; t += passo) soma += liquido(t + passo / 2, params) * passo;
  return soma;
}

/**
 * Leitura qualitativa do regime — o artigo é explícito em que não existe regra
 * de parada universal (§5.5); o rótulo descreve a janela, não prescreve.
 */
export function regime(tEstrela) {
  if (tEstrela <= 2.5) return 'janela curta — decidir cedo e revisar';
  if (tEstrela <= 4.5) return 'investigação curta — parar antes do detalhe';
  return 'investigação longa justificada';
}

/** Série amostrada para desenho, no passo do domínio. */
export function serie(fn) {
  const pontos = [];
  const { min, max, passo } = DOMINIO;
  for (let t = min; t <= max + 1e-9; t += passo) pontos.push([Number(t.toFixed(4)), fn(t)]);
  return pontos;
}
