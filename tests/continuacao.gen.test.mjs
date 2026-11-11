// Continuação "Se este tema interessa a você" (F5c) — SDD-F1-F1b.md, Parte 5.
// Regra mecânica: duas páginas com tema em comum (ou do mesmo pilar), motivo factual, sem texto inventado.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

import { loadEcossistema, ROOT } from '../scripts/catalogo/dados.mjs';
import { EDITORIAL } from '../scripts/editorial/editorial.data.mjs';
import { paginasF5c, escolhas, preencher, FORA } from '../scripts/gen-continuacao.mjs';

const { eco } = loadEcossistema();
const page = (slug) => readFileSync(join(ROOT, 'src', eco.nodes[slug].file), 'utf8');

test('toda página do YAML tem continuação, salvo as imersivas e as sem tema (RF-F5-06, RF-F5-08)', () => {
  const f5c = new Set(paginasF5c(eco));
  for (const [slug, n] of Object.entries(eco.nodes)) {
    const doAutor = Boolean(EDITORIAL[slug]?.next?.length);
    if (doAutor || FORA.has(slug) || !n.temas?.length) {
      assert.ok(!f5c.has(slug), `${slug} não deveria ter continuação gerada`);
      assert.ok(!page(slug).includes('<!-- CONTINUACAO:START'), `${slug}: marcador sobrando`);
    } else {
      assert.ok(f5c.has(slug), `${slug} deveria ter continuação gerada`);
    }
  }
});

for (const slug of paginasF5c(eco)) {
  test(`${slug}: duas sugestões válidas, motivo factual, em dia com o gerador`, () => {
    const itens = escolhas(slug, eco);
    assert.equal(itens.length, 2);
    for (const c of itens) {
      assert.notEqual(c.slug, slug, 'não sugere a própria página');
      assert.ok(existsSync(join(ROOT, 'src', eco.nodes[c.slug].file)), `página inexistente: ${c.slug}`);
      if (c.comuns.length) for (const t of c.comuns) assert.ok(eco.nodes[c.slug].temas.includes(t) && eco.nodes[slug].temas.includes(t));
      else assert.equal(eco.nodes[c.slug].pillar, eco.nodes[slug].pillar, 'sem tema em comum, só o mesmo pilar');
    }
    const html = page(slug);
    const bloco = /<!-- CONTINUACAO:START -->([\s\S]*?)<!-- CONTINUACAO:END -->/.exec(html);
    assert.ok(bloco, 'marcadores ausentes');
    assert.doesNotMatch(bloco[1], /<h[1-6]\b/, 'sem heading');
    assert.doesNotMatch(bloco[1], /#[0-9a-f]{3,8}\b/i, 'sem hexadecimal');
    assert.match(bloco[1], /aria-labelledby="cont-label"/);
    assert.ok(html.indexOf('<!-- CONTINUACAO:END -->') < html.lastIndexOf('</main>'), 'dentro do <main>');
    assert.equal(preencher(html, slug, eco), html, 'HTML fora de sincronia com o gerador');
  });
}
