// Natureza no topo da página (F4b) — docs/specs/arquitetura-informacao/SDD-F1-F1b.md, Parte 4.
// Todo nó do YAML mostra a natureza no topo: no quadro editorial (F4a) ou no rótulo gerado (F4b).
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { loadEcossistema, NATUREZAS, ROOT } from '../scripts/catalogo/dados.mjs';
import { EDITORIAL } from '../scripts/editorial/editorial.data.mjs';
import { paginasF4b, preencher } from '../scripts/gen-natureza.mjs';

const { eco } = loadEcossistema();
const page = (slug) => readFileSync(join(ROOT, 'src', eco.nodes[slug].file), 'utf8');

test('F4a e F4b cobrem todos os nós do YAML, sem sobreposição (RF-F4-05)', () => {
  const f4b = new Set(paginasF4b(eco));
  for (const slug of Object.keys(eco.nodes)) {
    const f4a = Boolean(EDITORIAL[slug]?.kind);
    assert.notEqual(f4a, f4b.has(slug), `${slug}: precisa estar em exatamente um lote`);
  }
});

for (const slug of paginasF4b(eco)) {
  test(`${slug}: rótulo da natureza do YAML, logo antes do h1, em dia com o gerador`, () => {
    const html = page(slug);
    const esperado = `Natureza: ${NATUREZAS[eco.nodes[slug].natureza]}`;
    const bloco = /<!-- NATUREZA:START -->([\s\S]*?)<!-- NATUREZA:END -->/.exec(html);
    assert.ok(bloco, 'marcadores NATUREZA ausentes');
    assert.ok(bloco[1].endsWith(`>${esperado}</p>`), `rótulo esperado: ${esperado}`);
    assert.doesNotMatch(bloco[1], /<h[1-6]\b/, 'o rótulo não cria heading');
    assert.doesNotMatch(bloco[1], /#[0-9a-f]{3,8}\b/i, 'sem hexadecimal (vale em apresentacao.html)');
    assert.equal(html.indexOf('<!-- NATUREZA:START'), html.lastIndexOf('<!-- NATUREZA:START'), 'um bloco só');
    const depois = html.slice(html.indexOf('<!-- NATUREZA:END -->'));
    assert.match(depois, /^<!-- NATUREZA:END -->\s*<h1\b/, 'o rótulo vem logo antes do h1');
    assert.equal(preencher(html, slug, eco), html, 'HTML fora de sincronia com o gerador');
  });
}
