// Guarda de honestidade da copy (SDD §3): a landing e o artigo não podem
// vender o ciclo como comprovado nem o protocolo como validado.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const paginas = ['src/aprendizagem-autorregulada.html', 'src/aprendizagem-autorregulada-artigo.html'];
const proibidas = [
  /método infalível/i,
  /ciclo[^.<]{0,60}comprovado/i,
  /(método|protocolo|ficha)\s+validad[oa]/i,
  /\d+\s*x\s+mais rápido/i,
];

for (const arquivo of paginas) {
  test(`${arquivo}: sem afirmações proibidas`, () => {
    const texto = readFileSync(arquivo, 'utf8')
      // Perguntas do FAQ ("O ciclo completo é comprovado?") e negações explícitas
      // da fonte ("não uma intervenção validada") não são afirmações.
      .replace(/[^.<>?]*\?/g, '')
      .replace(/não (é |uma )?[^.<]{0,40}validad[oa]/gi, '');
    for (const re of proibidas) assert.doesNotMatch(texto, re, `${arquivo} casou ${re}`);
  });
}
