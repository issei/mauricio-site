// Regra de posse da coleta — docs/specs/pages/videos-youtube/SDD-fase-1.md §3.
//
// A coleta só reescreve o bloco `youtube:` e cria arquivos novos. O que a
// pessoa escreveu (slug, status, temas, outros campos, corpo) sobrevive a
// qualquer número de coletas. Testa-se a função pura `mescla`, sem rede.
import test from 'node:test';
import assert from 'node:assert/strict';
import { mescla } from '../scripts/videos/ingest.mjs';
import { parseFrontmatter, validate } from '../scripts/gen-videos.mjs';

const doCanal = (id, titulo, extra = {}) => ({
  id,
  snippet: { title: titulo, publishedAt: '2025-05-10T12:00:00Z', description: 'Veja https://example.com/a.', thumbnails: { high: { url: `https://i.ytimg.com/vi/${id}/hq.jpg` } } },
  contentDetails: { duration: 'PT10M' },
  statistics: { viewCount: '42' },
  ...extra,
});
const canal = (...videos) => ({ videos, playlists: new Map([['AAAAAAAAAA1', ['Agentes']]]) });
const le = (out) => Object.fromEntries(Object.entries(out).map(([f, t]) => [f, parseFrontmatter(t, f)]));

test('vídeo novo nasce como ficha, sem temas, com slug do título', () => {
  const out = le(mescla([], canal(doCanal('AAAAAAAAAA1', 'Ação & Reação')), '2026-11-07T00:00:00Z'));
  const { data } = out['AAAAAAAAAA1.md'];
  assert.equal(data.slug, 'acao-reacao');
  assert.equal(data.status, 'ficha');
  assert.deepEqual(data.temas, []);
  assert.deepEqual(data.youtube.playlists, ['Agentes']);
  assert.deepEqual(data.youtube.links_descricao, ['https://example.com/a']);
  assert.equal(data.youtube.legenda, 'pendente');
});

test('o que a pessoa escreveu sobrevive à coleta; só youtube: muda', () => {
  const existente = {
    data: { id: 'AAAAAAAAAA1', slug: 'slug-escolhido', status: 'rascunho', temas: ['ia'], nota: 'minha', youtube: { titulo: 'Velho', legenda: 'manual' } },
    body: 'Texto revisado pela pessoa.',
  };
  const { data, body } = le(mescla([existente], canal(doCanal('AAAAAAAAAA1', 'Título novo')), 'x'))['AAAAAAAAAA1.md'];
  assert.equal(data.slug, 'slug-escolhido', 'slug é permanente mesmo com título novo');
  assert.equal(data.status, 'rascunho');
  assert.deepEqual(data.temas, ['ia']);
  assert.equal(data.nota, 'minha');
  assert.equal(body, 'Texto revisado pela pessoa.');
  assert.equal(data.youtube.titulo, 'Título novo');
  assert.equal(data.youtube.legenda, 'manual', 'estado da legenda não volta a pendente');
});

test('vídeo que sumiu do canal vira removido e volta a ficha se reaparecer', () => {
  const existente = { data: { id: 'BBBBBBBBBB2', slug: 'b', status: 'ficha', temas: [], youtube: { titulo: 'B' } }, body: '' };
  const sumiu = le(mescla([existente], canal(), 'x'));
  assert.equal(sumiu['BBBBBBBBBB2.md'].data.status, 'removido');
  const voltou = le(mescla([sumiu['BBBBBBBBBB2.md']], canal(doCanal('BBBBBBBBBB2', 'B')), 'x'));
  assert.equal(voltou['BBBBBBBBBB2.md'].data.status, 'ficha');
});

test('títulos iguais geram slugs distintos e o resultado passa na validação do gerador', () => {
  const out = le(mescla([], canal(doCanal('AAAAAAAAAA1', 'Live'), doCanal('CCCCCCCCCC3', 'Live')), '2026-11-07T00:00:00Z'));
  assert.notEqual(out['AAAAAAAAAA1.md'].data.slug, out['CCCCCCCCCC3.md'].data.slug);
  const videos = Object.entries(out).map(([arquivo, { data, body }]) => ({ ...data, body, arquivo }));
  assert.deepEqual(validate({ videos, temas: {} }), []);
});

test('coleta diária sem mudança real não reescreve o bloco (só visualizações mudaram)', () => {
  const primeira = le(mescla([], canal(doCanal('AAAAAAAAAA1', 'Um')), '2026-11-07T00:00:00Z'))['AAAAAAAAAA1.md'];
  const outroDia = doCanal('AAAAAAAAAA1', 'Um', { statistics: { viewCount: '99' } });
  const segunda = mescla([primeira], canal(outroDia), '2026-11-08T00:00:00Z')['AAAAAAAAAA1.md'];
  assert.match(segunda, /visualizacoes: 42/);
  assert.match(segunda, /coletado_em: 2026-11-07T00:00:00Z/);
});
