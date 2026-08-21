/**
 * Invariantes do modelo da regra de parada (V4).
 *
 * O que a Figura 4 afirma ao leitor é uma propriedade, não um desenho: o ponto
 * de parada existe, é único no domínio e recua quando a urgência ou a
 * penalidade de hiper-resolução aumentam. Propriedade se testa — se algum
 * coeficiente do modelo for alterado sem cuidado, é aqui que a página deixa de
 * dizer a verdade, não no pixel.
 *
 * Spec: docs/specs/pages/formulacao-de-problemas/02_recursos_visuais_e_direcao_de_arte.md (ficha V4).
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import {
  DOMINIO, FAIXAS, beneficioMarginal, custoMarginal, custoCognitivo,
  liquido, liquidoAcumulado, pontoDeParada, regime,
} from '../src/js/formulacao/parada-model.js';

const PADRAO = { lambda: FAIXAS.lambda.padrao, urgencia: FAIXAS.urgencia.padrao };

const grade = (faixa, n = 8) =>
  Array.from({ length: n + 1 }, (_, i) => faixa.min + ((faixa.max - faixa.min) * i) / n);

test('INV-1 · benefício marginal é estritamente decrescente', () => {
  for (let t = DOMINIO.min; t < DOMINIO.max; t += DOMINIO.passo) {
    assert.ok(
      beneficioMarginal(t + DOMINIO.passo) < beneficioMarginal(t),
      `benefício subiu entre t=${t} e t=${t + DOMINIO.passo}`
    );
  }
});

test('INV-2 · t* é não crescente em λ', () => {
  let anterior = Infinity;
  for (const lambda of grade(FAIXAS.lambda)) {
    const t = pontoDeParada({ lambda, urgencia: PADRAO.urgencia });
    assert.ok(t <= anterior, `t* subiu ao aumentar λ para ${lambda}`);
    anterior = t;
  }
});

test('INV-3 · t* é não crescente no custo de atraso', () => {
  let anterior = Infinity;
  for (const urgencia of grade(FAIXAS.urgencia)) {
    const t = pontoDeParada({ lambda: PADRAO.lambda, urgencia });
    assert.ok(t <= anterior, `t* subiu ao aumentar a urgência para ${urgencia}`);
    anterior = t;
  }
});

test('INV-4 · t* existe dentro do domínio para toda combinação exposta ao leitor', () => {
  for (const lambda of grade(FAIXAS.lambda)) {
    for (const urgencia of grade(FAIXAS.urgencia)) {
      const t = pontoDeParada({ lambda, urgencia });
      assert.ok(t > DOMINIO.min && t < DOMINIO.max, `t*=${t} fora do domínio (λ=${lambda}, u=${urgencia})`);
    }
  }
});

test('INV-5 · a rodada anterior a t* ainda é lucrativa e t* não é', () => {
  for (const lambda of grade(FAIXAS.lambda, 4)) {
    for (const urgencia of grade(FAIXAS.urgencia, 4)) {
      const params = { lambda, urgencia };
      const t = pontoDeParada(params);
      assert.ok(liquido(t, params) <= 0, `líquido positivo em t*=${t}`);
      assert.ok(liquido(t - DOMINIO.passo, params) > 0, `líquido não positivo antes de t*=${t}`);
    }
  }
});

test('INV-6 · custo cognitivo é nulo quando λ = 0 e cresce com λ', () => {
  assert.equal(custoCognitivo(5, 0), 0);
  assert.ok(custoCognitivo(5, 1) > custoCognitivo(5, 0.5));
  // Superlinear: dobrar as rodadas mais que dobra o custo cognitivo.
  assert.ok(custoCognitivo(8, 1) > 2 * custoCognitivo(4, 1));
});

test('INV-7 · custo marginal não decresce e cresce com a urgência', () => {
  assert.ok(custoMarginal(6, 3) > custoMarginal(6, 1));
  assert.equal(custoMarginal(0, 5), custoMarginal(0, 0));
});

test('INV-8 · parar na hora deixa benefício líquido acumulado positivo', () => {
  const acumulado = liquidoAcumulado(PADRAO);
  assert.ok(acumulado > 0, `acumulado não positivo: ${acumulado}`);
  // Continuar até o fim do domínio destrói parte do valor acumulado.
  assert.ok(liquidoAcumulado(PADRAO, DOMINIO.max) < acumulado);
});

test('INV-9 · o regime é rotulado, nunca vazio', () => {
  for (const lambda of grade(FAIXAS.lambda, 4)) {
    const t = pontoDeParada({ lambda, urgencia: PADRAO.urgencia });
    assert.match(regime(t), /\S/);
  }
});

test('cenário padrão da página confere com o desenho estático do SVG', () => {
  // O HTML nasce com a linha de parada em t = 4,0 (x = 474). Se o modelo mudar,
  // o desenho estático (usado sem JavaScript) precisa ser regerado junto.
  assert.equal(pontoDeParada(PADRAO), 4);
});
