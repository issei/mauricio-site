/**
 * Catálogo gerado do YAML — INV-8 e o conteúdo dos cartões.
 * Spec: docs/specs/arquitetura-informacao/SDD-F1-F1b.md (Parte 1, RF-F1-12 a RF-F1-18, §5).
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { loadEcossistema, ROOT, NATUREZAS } from '../scripts/catalogo/dados.mjs';
import { renderCatalogo, renderEcoNavData, renderMd, extrair } from '../scripts/gen-catalogo.mjs';

const dados = loadEcossistema();
const { eco, temas } = dados;
const ler = (rel) => readFileSync(join(ROOT, rel), 'utf8');
const html = ler('src/catalogo.html');
const bloco = extrair(html);

test('INV-8 · o catálogo entre os marcadores é igual à saída do gerador', () => {
  assert.ok(bloco !== null, 'marcadores CATALOGO ausentes');
  assert.equal(bloco, renderCatalogo(dados));
});

test('RF-F1-18 · eco-nav.data.js é igual à saída do gerador', () => {
  assert.equal(ler('src/js/eco-nav.data.js'), renderEcoNavData(dados));
});

test('o catalogo.md é igual à saída do gerador', () => {
  assert.equal(ler('public/catalogo.md'), renderMd());
});

const cartoes = [...bloco.matchAll(/<a href="([^"]+)" class="card-glass[^"]*">([\s\S]*?)<\/a>/g)]
  .map((m) => ({ href: m[1], body: m[2] }));

test('CA-F1-02 · 28 cartões nos pilares e 5 na trajetória', () => {
  const pilares = bloco.slice(0, bloco.indexOf('id="trajetoria"'));
  const nPilares = [...pilares.matchAll(/class="card-glass/g)].length;
  assert.equal(nPilares, 28);
  assert.equal(cartoes.length, 33);
  for (const href of ['./curriculo.html', './life.html', './life3d.html', './terminal-evolutivo.html', '/videos.html']) {
    assert.ok(cartoes.some((c) => c.href === href), `falta ${href} na trajetória`);
  }
});

test('todo nó com catálogo aparece uma vez; o par -artigo não aparece', () => {
  for (const [s, n] of Object.entries(eco.nodes)) {
    const href = `./${n.file}`;
    const vezes = cartoes.filter((c) => c.href === href).length;
    assert.equal(vezes, n.catalogo === false ? 0 : 1, `${s}: ${vezes} cartões`);
  }
});

test('CA-F1-04 · todo cartão de conteúdo mostra formato, natureza e temas do YAML', () => {
  for (const [s, n] of Object.entries(eco.nodes)) {
    if (n.catalogo === false) continue;
    const c = cartoes.find((x) => x.href === `./${n.file}`);
    assert.match(c.body, new RegExp(`category-tag">${n.kind}`), `${s}: formato`);
    assert.match(c.body, new RegExp(`Natureza: ${NATUREZAS[n.natureza]}`), `${s}: natureza`);
    for (const t of n.temas) assert.ok(c.body.includes(temas[t].nome), `${s}: tema ${t}`);
  }
});

test('trilha e textos de pilar: 4 pilares, sem p5', () => {
  assert.match(bloco, /aria-label="Jornada do ecossistema em quatro pilares"/);
  assert.equal([...bloco.matchAll(/class="journey-step"/g)].length, 4);
  assert.doesNotMatch(html, /id="p5"/);
  assert.doesNotMatch(html, /Soluções &amp; Portfólio/);
});
