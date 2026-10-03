// Invariantes do índice de prontidão agêntica (V8) — doc 02 §V8.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { score, CRITERIOS } from '../src/js/digital-workplace/prontidao-model.js';

/** Monta respostas com `n` pontos distribuídos em ordem (2,2,2…, depois 1). */
const comTotal = (n) => {
  const out = {};
  let resto = n;
  for (const { id } of CRITERIOS) {
    const v = Math.min(2, resto);
    out[id] = v;
    resto -= v;
  }
  return out;
};

test('são 10 critérios e o total fica em [0,20]', () => {
  assert.equal(CRITERIOS.length, 10);
  for (let n = 0; n <= 20; n++) {
    const { total } = score(comTotal(n));
    assert.equal(total, n);
    assert.ok(total >= 0 && total <= 20);
  }
});

test('faixas: 9→fundações, 10→RAG, 15→RAG, 16→ações', () => {
  assert.equal(score(comTotal(9)).faixa, 'fundacoes');
  assert.equal(score(comTotal(10)).faixa, 'rag');
  assert.equal(score(comTotal(15)).faixa, 'rag');
  assert.equal(score(comTotal(16)).faixa, 'acoes');
  assert.equal(score(comTotal(20)).faixa, 'acoes');
  assert.equal(score(comTotal(0)).faixa, 'fundacoes');
});

test('resposta ausente conta 0 e entra nas lacunas', () => {
  const r = score({ apis: 2 });
  assert.equal(r.total, 2);
  assert.equal(r.lacunas.length, 9);
  assert.ok(!r.lacunas.includes('apis'));
  assert.deepEqual(score({}).lacunas, CRITERIOS.map((c) => c.id));
});

test('lacunas são os critérios com 0; parcial não é lacuna', () => {
  const r = score({ ...comTotal(20), identidade: 0, busca: 1 });
  assert.deepEqual(r.lacunas, ['identidade']);
});

test('entrada inválida lança erro', () => {
  assert.throws(() => score({ apis: 3 }), RangeError);
  assert.throws(() => score({ apis: '2' }), RangeError);
  assert.throws(() => score({ apis: -1 }), RangeError);
  assert.throws(() => score({ inexistente: 1 }), RangeError);
  assert.throws(() => score(null), TypeError);
  assert.throws(() => score([1, 2]), TypeError);
});

test('a página tem exatamente os rádios dos critérios do modelo (sem deriva)', () => {
  const html = readFileSync(new URL('../src/digital-workplace-agentico.html', import.meta.url), 'utf8');
  for (const { id, rotulo } of CRITERIOS) {
    assert.ok(html.includes(`name="${id}"`), `rádio ${id} ausente da página`);
    assert.ok(html.includes(rotulo), `rótulo "${rotulo}" ausente da página`);
  }
  const names = new Set([...html.matchAll(/<input type="radio" name="([a-z]+)"/g)].map((m) => m[1]));
  assert.equal(names.size, CRITERIOS.length);
});
