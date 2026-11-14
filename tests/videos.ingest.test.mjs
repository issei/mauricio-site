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

test('artigo publicado que some e volta ao canal volta publicado, com a revisão intacta', () => {
  const existente = {
    data: { id: 'DDDDDDDDDD4', slug: 'd', status: 'publicado', temas: ['ia'], revisado_por: 'Pessoa', revisado_em: '2026-11-11', youtube: { titulo: 'D', legenda: 'automatica' } },
    body: 'Artigo revisado.',
  };
  const sumiu = le(mescla([existente], canal(), 'x'))['DDDDDDDDDD4.md'];
  assert.equal(sumiu.data.status, 'removido');
  assert.equal(sumiu.data.status_antes_de_remover, 'publicado');
  const segunda = le(mescla([sumiu], canal(), 'x'));
  assert.equal(segunda['DDDDDDDDDD4.md'], undefined, 'já removido: a coleta seguinte não reescreve');
  const voltou = le(mescla([sumiu], canal(doCanal('DDDDDDDDDD4', 'D')), 'x'))['DDDDDDDDDD4.md'];
  assert.equal(voltou.data.status, 'publicado');
  assert.equal('status_antes_de_remover' in voltou.data, false);
  assert.equal(voltou.data.revisado_por, 'Pessoa');
  assert.equal(voltou.body, 'Artigo revisado.');
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

test('campos do artigo (fase 2) sobrevivem à coleta, inclusive a lista de fontes', () => {
  const fontes = [
    { url: 'https://example.com/a', titulo: 'Fonte "A": com dois-pontos', sustenta: 'A afirmação da seção 1.', verificada: true },
    { url: 'https://example.com/b', titulo: 'Fonte B', sustenta: 'Outra afirmação.', verificada: false },
  ];
  const existente = {
    data: {
      id: 'AAAAAAAAAA1', slug: 'artigo', status: 'publicado', temas: ['ia'],
      resumo: 'Resumo: duas frases, com vírgula.', fontes, revisado_por: 'Issei', revisado_em: '2026-11-08',
      youtube: { titulo: 'Velho', legenda: 'automatica' },
    },
    body: '## Seção\n\nParágrafo [00:05].\n\n- item [01:00]',
  };
  const { data, body } = le(mescla([existente], canal(doCanal('AAAAAAAAAA1', 'Título novo')), 'x'))['AAAAAAAAAA1.md'];
  assert.equal(data.status, 'publicado');
  assert.equal(data.resumo, 'Resumo: duas frases, com vírgula.');
  assert.deepEqual(data.fontes, fontes);
  assert.equal(data.revisado_por, 'Issei');
  assert.equal(String(data.revisado_em), '2026-11-08');
  assert.equal(body, '## Seção\n\nParágrafo [00:05].\n\n- item [01:00]');
  assert.equal(data.youtube.titulo, 'Título novo');
});
