/**
 * INV-AP-01 — paridade sintática dos pares Executiva ⇄ Engenharia
 * (evolução 12 da spec v3.0) + regra dos 8 segundos da Camada 1 (spec §1.2).
 *
 * A transição de 160ms só parece transmutação se as frases forem
 * estruturalmente gêmeas. Este teste é o que impede que "corrigir depois com
 * animação mais lenta" seja uma opção — exatamente o que a spec proíbe.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  PERSPECTIVE_CONTENT,
  PERSONAS,
} from '../src/js/apresentacao/perspective-content.js';

const words = (s) => s.trim().split(/\s+/).filter(Boolean).length;
const sentences = (s) => (s.match(/[.!?](\s|$)/g) || []).length || 1;
const finalPunct = (s) => (s.trim().match(/[.!?]$/) || [''])[0];
const numerals = (s) => (s.match(/\d+(?:[.,]\d+)?%?/g) || []).slice().sort();

// A 200 palavras/min em PT-BR, 8 segundos ≈ 27 palavras (spec §1.2).
const MAX_WORDS_LAYER_1 = 27;

test('há conteúdo para testar', () => {
  assert.ok(PERSPECTIVE_CONTENT.length >= 10, 'esperado ao menos 10 pares');
});

test('todo par tem id único, zona, camada e ambas as personas', () => {
  const seen = new Set();
  for (const p of PERSPECTIVE_CONTENT) {
    assert.ok(p.id, 'par sem id');
    assert.ok(!seen.has(p.id), `id duplicado: ${p.id}`);
    seen.add(p.id);
    assert.ok(p.zone, `${p.id}: sem zona`);
    assert.ok([1, 2, 3].includes(p.layer), `${p.id}: camada inválida (${p.layer})`);
    for (const persona of PERSONAS) {
      assert.ok(
        typeof p[persona] === 'string' && p[persona].trim().length > 0,
        `${p.id}: persona "${persona}" vazia`
      );
    }
  }
});

test('INV-AP-01.1 · mesmo número de sentenças', () => {
  for (const p of PERSPECTIVE_CONTENT) {
    assert.equal(
      sentences(p.exec), sentences(p.eng),
      `${p.id}: exec tem ${sentences(p.exec)} sentença(s), eng tem ${sentences(p.eng)}`
    );
  }
});

test('INV-AP-01.2 · diferença de no máximo 2 palavras', () => {
  for (const p of PERSPECTIVE_CONTENT) {
    const d = Math.abs(words(p.exec) - words(p.eng));
    assert.ok(
      d <= 2,
      `${p.id}: diferença de ${d} palavras (exec ${words(p.exec)}, eng ${words(p.eng)}).\n` +
        `  exec: ${p.exec}\n  eng:  ${p.eng}`
    );
  }
});

test('INV-AP-01.3 · mesma pontuação final', () => {
  for (const p of PERSPECTIVE_CONTENT) {
    assert.equal(
      finalPunct(p.exec), finalPunct(p.eng),
      `${p.id}: exec termina em "${finalPunct(p.exec)}", eng em "${finalPunct(p.eng)}"`
    );
  }
});

test('INV-AP-01.4 · os mesmos numerais nas duas versões', () => {
  for (const p of PERSPECTIVE_CONTENT) {
    assert.deepEqual(
      numerals(p.exec), numerals(p.eng),
      `${p.id}: métricas divergem — não é a mesma verdade em dois vocabulários.\n` +
        `  exec: ${p.exec}\n  eng:  ${p.eng}`
    );
  }
});

test('regra dos 8 segundos · nenhum bloco da Camada 1 excede 27 palavras', () => {
  for (const p of PERSPECTIVE_CONTENT.filter((x) => x.layer === 1)) {
    for (const persona of PERSONAS) {
      const n = words(p[persona]);
      assert.ok(
        n <= MAX_WORDS_LAYER_1,
        `${p.id} (${persona}): ${n} palavras — teto da Camada 1 é ${MAX_WORDS_LAYER_1}. ` +
          `Conteúdo mais longo pertence à Camada 2.`
      );
    }
  }
});

test('vocabulário de engenharia, não de marketing (ECOSYSTEM.md §4.2)', () => {
  const banned = [
    'revolucionário', 'revolucionária', 'disruptivo', 'disruptiva',
    'game-changer', 'solução completa', 'poderoso', 'poderosa',
    'incrível', 'mágico', 'mágica', 'inovador único',
  ];
  for (const p of PERSPECTIVE_CONTENT) {
    for (const persona of PERSONAS) {
      const low = p[persona].toLowerCase();
      for (const w of banned) {
        assert.ok(!low.includes(w), `${p.id} (${persona}): termo de marketing "${w}"`);
      }
    }
  }
});

test('lexical lock · grafia fixa dos nomes do ecossistema (ECOSYSTEM.md §4.1)', () => {
  // Se o termo aparece, tem de aparecer com a grafia canônica.
  const canonical = ['Devin', 'Knowledge OS', 'Salesforce', 'GraphRAG', 'Flosum'];
  for (const p of PERSPECTIVE_CONTENT) {
    for (const persona of PERSONAS) {
      const text = p[persona];
      for (const term of canonical) {
        const loose = new RegExp(term.replace(/\s/g, '\\s'), 'i');
        if (!loose.test(text)) continue;
        assert.ok(
          text.includes(term),
          `${p.id} (${persona}): "${term}" fora da grafia canônica`
        );
      }
    }
  }
});
