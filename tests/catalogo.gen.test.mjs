/**
 * Catálogo gerado do YAML — INV-8 e o conteúdo dos cartões.
 * Spec: docs/specs/arquitetura-informacao/SDD-F1-F1b.md (Parte 1, RF-F1-12 a RF-F1-18, §5;
 * Parte 8, RF-F8-03 a RF-F8-05 e RF-F8-08: os temas no lugar dos pilares).
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { loadEcossistema, ROOT, NATUREZAS, temasDoSite } from '../scripts/catalogo/dados.mjs';
import { renderCatalogo, renderMd, extrair } from '../scripts/gen-catalogo.mjs';

const dados = loadEcossistema();
const { eco, temas } = dados;
const ler = (rel) => readFileSync(join(ROOT, rel), 'utf8');
const html = ler('src/catalogo.html');
const bloco = extrair(html);

test('INV-8 · o catálogo entre os marcadores é igual à saída do gerador', () => {
  assert.ok(bloco !== null, 'marcadores CATALOGO ausentes');
  assert.equal(bloco, renderCatalogo(dados));
});

test('o catalogo.md é igual à saída do gerador', () => {
  assert.equal(ler('public/catalogo.md'), renderMd());
});

const cartoes = [...bloco.matchAll(/<a href="([^"]+)" class="card-glass[^"]*">([\s\S]*?)<\/a>/g)]
  .map((m) => ({ href: m[1], body: m[2] }));

test('CA-F1-02 · 28 cartões nos temas e 5 na carreira', () => {
  const nosTemas = bloco.slice(0, bloco.indexOf('id="trajetoria"'));
  const nTemas = [...nosTemas.matchAll(/class="card-glass/g)].length;
  assert.equal(nTemas, 28);
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

test('CA-F1-04 · todo cartão mostra só o formato na etiqueta, a natureza e os outros temas', () => {
  for (const [s, n] of Object.entries(eco.nodes)) {
    if (n.catalogo === false) continue;
    const c = cartoes.find((x) => x.href === `./${n.file}`);
    assert.match(c.body, new RegExp(`category-tag">${n.kind}</span>`), `${s}: formato sem assunto`);
    assert.match(c.body, new RegExp(`Natureza: ${NATUREZAS[n.natureza]}`), `${s}: natureza`);
    const fora = eco.trajetoria.includes(s) ? n.temas ?? [] : (n.temas ?? []).slice(1);
    for (const t of fora) assert.ok(c.body.includes(temas[t].nome), `${s}: tema ${t}`);
  }
});

test('RF-F8-03/05 · índice e seções dos 10 temas, na ordem do total', () => {
  const grupos = temasDoSite(dados);
  assert.equal(grupos.length, Object.keys(temas).length);
  for (let i = 1; i < grupos.length; i++) assert.ok(grupos[i - 1].total >= grupos[i].total, 'ordem pelo total');
  const indice = [...bloco.matchAll(/<li><a href="#tema-([a-z-]+)"/g)].map((m) => m[1]);
  assert.deepEqual(indice, grupos.map((g) => g.id));
  const secoes = [...bloco.matchAll(/<section id="tema-([a-z-]+)"/g)].map((m) => m[1]);
  assert.deepEqual(secoes, grupos.map((g) => g.id));
  for (const g of grupos) assert.ok(bloco.includes(`href="/temas/${g.id}"`), `${g.id}: link para a página do tema`);
});

test('RF-F8-04 · cada cartão fica no tema principal; o tema secundário só tem link', () => {
  for (const g of temasDoSite(dados)) {
    const ini = bloco.indexOf(`<section id="tema-${g.id}"`);
    const sec = bloco.slice(ini, bloco.indexOf('</section>', ini));
    for (const s of g.principais) assert.ok(sec.includes(`class="card-glass`) && sec.includes(`href="./${eco.nodes[s].file}" class="card-glass`), `${s} em ${g.id}`);
    for (const s of g.secundarios) assert.ok(sec.includes(`href="./${eco.nodes[s].file}" class="text-blue-400`), `${s}: link em ${g.id}`);
  }
});

test('RF-F8-08 · nenhum nome de pilar no catálogo nem no .md', () => {
  const md = ler('public/catalogo.md');
  for (const p of eco.pillars) {
    for (const nome of [p.label, p.subtitle]) {
      assert.ok(!bloco.includes(esc(nome)) && !md.includes(nome), `pilar visível: ${nome}`);
    }
  }
  assert.doesNotMatch(html, /Mentalidade → Método/);
  assert.doesNotMatch(html, /class="journey-step"/);
});

const esc = (s) => s.replace(/&/g, '&amp;');
