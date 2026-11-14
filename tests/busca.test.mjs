// Contrato da busca do site — docs/specs/arquitetura-informacao/SDD-catalogo-videos-e-busca.md §4.
//
// Regra, não estética: normalização sem acento, E lógico, pesos, destaque da palavra,
// conteúdo do índice (ficha entra, rascunho não vaza, removido some) e índice em dia.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { gzipSync } from 'node:zlib';

import { normaliza, prepara, buscar, marcar } from '../public/js/busca.js';
import { montaIndice, tituloEDescricao, build } from '../scripts/gen-busca.mjs';
import { loadContent } from '../scripts/gen-videos.mjs';
import { loadEcossistema } from '../scripts/catalogo/dados.mjs';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');

const indice = (itens) => prepara({ temas: { agentes: 'Engenharia agêntica', mente: 'Aprendizagem e mente' }, itens });
const base = [
  { t: 'Orquestração de agentes', u: '/a', k: 'video', a: ['agentes'], d: 'Como coordenar vários agentes.', dt: '2026-01-01' },
  { t: 'Foco e atenção', u: '/b', k: 'video', a: ['mente'], d: 'Orquestração do estudo.', dt: '2026-02-01' },
  { t: 'Agentes na prática', u: '/c', k: 'pagina', a: ['agentes'], d: 'Um estudo.', p: 1, dt: '2025-01-01' },
];

test('normaliza: sem acento e em minúsculas', () => {
  assert.equal(normaliza('Orquestração Ágil'), 'orquestracao agil');
  assert.equal(normaliza(null), '');
});

test('busca ignora acento e caixa: "orquestracao" acha "Orquestração"', () => {
  const r = buscar(indice(base), 'ORQUESTRACAO');
  assert.deepEqual(r.map((i) => i.u), ['/a', '/b']);
});

test('busca exige todas as palavras (E lógico)', () => {
  assert.deepEqual(buscar(indice(base), 'orquestracao agentes').map((i) => i.u), ['/a']);
  assert.deepEqual(buscar(indice(base), 'orquestracao inexistente'), []);
});

test('pesos: título vale mais que assunto, que vale mais que resumo', () => {
  const r = buscar(indice(base), 'orquestracao');
  assert.equal(r[0].u, '/a', 'título (3) antes de resumo (1)');
  const porAssunto = buscar(indice(base), 'mente');
  assert.equal(porAssunto[0].u, '/b', 'o nome do assunto também é pesquisável');
});

test('empate: com artigo antes, depois o mais recente', () => {
  const itens = indice([
    { t: 'Agentes A', u: '/x', k: 'video', a: [], d: '', dt: '2026-05-01' },
    { t: 'Agentes B', u: '/y', k: 'video', a: [], d: '', dt: '2026-06-01' },
    { t: 'Agentes C', u: '/z', k: 'video', a: [], d: '', dt: '2024-01-01', p: 1 },
  ]);
  assert.deepEqual(buscar(itens, 'agentes').map((i) => i.u), ['/z', '/y', '/x']);
});

test('consulta vazia ou só de símbolos não devolve nada', () => {
  assert.deepEqual(buscar(indice(base), '   '), []);
  assert.deepEqual(buscar(indice(base), '!!!'), []);
});

test('marcar: <mark> nas palavras, sem acento, e escapa o HTML', () => {
  assert.equal(marcar('Orquestração de agentes', 'orquestracao'), '<mark>Orquestração</mark> de agentes');
  assert.equal(marcar('a <b> & c', 'b'), 'a &lt;<mark>b</mark>&gt; &amp; c');
  assert.equal(marcar('texto', ''), 'texto');
  assert.equal(marcar('agentes agentes', 'agentes'), '<mark>agentes</mark> <mark>agentes</mark>');
});

const fixture = () => loadContent(join(ROOT, 'tests/fixtures/videos'));
const eco = () => loadEcossistema().eco;

test('índice: ficha entra, removido não, rascunho entra sem o texto do rascunho', () => {
  const c = fixture();
  c.videos.push({ ...c.videos[0], id: 'RRRRRRRRRR9', arquivo: 'RRRRRRRRRR9.md', slug: 'um-rascunho', status: 'rascunho', resumo: 'Resumo secreto', youtube: { ...c.videos[0].youtube, titulo: 'Um rascunho' } });
  const idx = montaIndice(c, eco());
  const urls = idx.itens.map((i) => i.u);
  assert.ok(urls.includes('/videos/como-ancorar-agentes-no-repositorio'), 'ficha entra');
  assert.ok(!urls.includes('/videos/video-removido'), 'removido some');
  assert.doesNotMatch(JSON.stringify(idx), /Resumo secreto/, 'texto do rascunho nunca entra');
  const pub = idx.itens.find((i) => i.u === '/videos/especificacao-antes-do-codigo');
  assert.equal(pub.p, 1);
  assert.ok(idx.itens.some((i) => i.k === 'assunto'));
  assert.ok(idx.itens.some((i) => i.k === 'pagina'));
});

test('índice: descrição sem URL nem hashtag e com até 200 caracteres', () => {
  const idx = montaIndice(fixture(), eco());
  for (const i of idx.itens) {
    assert.ok(i.d.length <= 200, i.u);
    assert.doesNotMatch(i.d, /https?:\/\/|#\w/, i.u);
  }
});

test('índice EN: título e descrição do espelho; sem espelho vira en:0', () => {
  const lerEn = (rel) => (rel === 'know.html' ? '<title>Navigating Complexity | Maurício Yokoyama Issei</title>\n<meta name="description"\n content="The end of best practices.">' : null);
  const idx = montaIndice(fixture(), eco(), { lerEn });
  const know = idx.itens.find((i) => i.u === '/en/know.html');
  assert.equal(know.t, 'Navigating Complexity');
  assert.equal(know.d, 'The end of best practices.');
  assert.equal(idx.itens.find((i) => i.u === '/videos/como-ancorar-agentes-no-repositorio').en, 0);
  assert.deepEqual(tituloEDescricao('<title>X | Maurício Yokoyama Issei</title>'), { t: 'X', d: '' });
});

test('o repositório está em dia e o índice PT cabe em 40 KB gzip', () => {
  const saida = build();
  for (const [rel, texto] of Object.entries(saida)) {
    assert.equal(readFileSync(join(ROOT, rel), 'utf8').replace(/\r\n/g, '\n'), texto, `${rel} fora de sincronia: rode node scripts/gen-busca.mjs`);
  }
  assert.ok(gzipSync(saida['public/busca/pt.json']).length < 40 * 1024);
  assert.match(saida['src/busca.html'], /<meta name="robots" content="noindex, follow">/);
});
