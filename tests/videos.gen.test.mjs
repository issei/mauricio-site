// Contrato do gerador das páginas de vídeo — docs/specs/pages/videos-youtube/SDD-fase-1.md.
//
// O que se testa é regra, não estética:
//   - validação do §6 (cada regra com um caso que falha e um que passa);
//   - ficha sem artigo revisado é noindex e fica fora do sitemap (§2, D4);
//   - vídeo removido não gera página; assunto sem vídeo não gera página;
//   - o gerador é dono das suas pastas: sobra sem fonte é apagada e reprovada no --check;
//   - o repositório está em dia com content/.
import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, existsSync, readFileSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { build, loadContent, parseVtt, paragrafos, slugify, duracaoPt, dataPt, validate, run } from '../scripts/gen-videos.mjs';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const FIXTURES = join(ROOT, 'tests/fixtures/videos');
const fixture = () => loadContent(FIXTURES);

const video = (extra = {}) => ({
  id: 'XXXXXXXXXX1', arquivo: 'XXXXXXXXXX1.md', slug: 'um-video', status: 'ficha', temas: [],
  youtube: { titulo: 'Um vídeo', publicado_em: '2025-01-01' }, ...extra,
});
const erros = (videos, temas = {}) => validate({ videos, temas });

test('validação: conteúdo das fixtures é válido', () => {
  assert.deepEqual(validate(fixture()), []);
});

test('validação: slug repetido, fora do padrão ou longo demais', () => {
  assert.match(erros([video(), video({ id: 'XXXXXXXXXX2', arquivo: 'XXXXXXXXXX2.md' })]).join(), /repetido/);
  assert.match(erros([video({ slug: 'Com Espaço' })]).join(), /fora de \[a-z0-9-\]/);
  assert.match(erros([video({ slug: 'a'.repeat(61) })]).join(), /mais de 60/);
  assert.deepEqual(erros([video({ slug: 'a'.repeat(60) })]), []);
});

test('validação: status fora da lista e "publicado" proibido na fase 1', () => {
  assert.match(erros([video({ status: 'pronto' })]).join(), /fora de/);
  assert.match(erros([video({ status: 'publicado' })]).join(), /ainda não é permitido/);
  assert.deepEqual(validate({ videos: [video({ status: 'publicado' })], temas: {} }, { statusPermitidos: ['publicado'] }), []);
});

test('validação: tema que não existe em temas.yml', () => {
  assert.match(erros([video({ temas: ['inexistente'] })]).join(), /não existe em content\/temas.yml/);
  assert.deepEqual(erros([video({ temas: ['ia'] })], { ia: { nome: 'IA' } }), []);
});

test('validação: arquivo precisa se chamar <id>.md e ter título e data', () => {
  assert.match(erros([video({ arquivo: 'outro.md' })]).join(), /<id>\.md/);
  assert.match(erros([video({ youtube: { publicado_em: '2025-01-01' } })]).join(), /titulo/);
  assert.match(erros([video({ youtube: { titulo: 'x' } })]).join(), /publicado_em/);
});

test('build: conteúdo inválido não gera nada', () => {
  assert.throws(() => build({ videos: [video({ status: 'publicado' })], temas: {} }), /conteúdo inválido/);
});

test('ficha: noindex, fora do sitemap, player só por clique', () => {
  const out = build(fixture());
  const html = out['src/videos/como-ancorar-agentes-no-repositorio.html'];
  assert.match(html, /<meta name="robots" content="noindex, follow">/);
  assert.doesNotMatch(html, /<iframe/, 'nenhum iframe no HTML servido: só nasce no clique');
  assert.match(html, /youtube-nocookie\.com\/embed\//);
  assert.match(html, /Transcrição automática, não revisada/);
  assert.match(html, /"@type":"VideoObject"/);
  assert.deepEqual(JSON.parse(out['scripts/videos/sitemap-exclude.json']),
    ['/videos/acessibilidade-em-streaming', '/videos/como-ancorar-agentes-no-repositorio']);
});

test('ficha sem legenda avisa que a transcrição ainda não existe', () => {
  const html = build(fixture())['src/videos/acessibilidade-em-streaming.html'];
  assert.match(html, /Transcrição ainda não disponível/);
  assert.doesNotMatch(html, /<details>/);
});

test('removido não gera página; assunto sem vídeo não gera página', () => {
  const out = build(fixture());
  assert.ok(!('src/videos/video-removido.html' in out));
  assert.ok(!('src/temas/sem-videos.html' in out));
  assert.ok('src/temas/acessibilidade.html' in out);
});

test('página de assunto e índice listam os vídeos, do mais recente ao mais antigo', () => {
  const out = build(fixture());
  const tema = out['src/temas/engenharia-agentica.html'];
  assert.ok(tema.indexOf('acessibilidade-em-streaming') < tema.indexOf('como-ancorar-agentes'));
  assert.match(tema, /<meta name="robots" content="index, follow">/);
  assert.match(out['src/videos.html'], /<label for="filtro-tema">Filtrar por assunto<\/label>/);
  for (const p of Object.keys(out).filter((k) => k.startsWith('src/'))) {
    const md = p.replace(/^src\//, 'public/').replace(/\.html$/, '.md');
    assert.ok(md in out, `sem gêmeo Markdown: ${p}`);
  }
});

test('sem vídeos, nada além da lista de exclusão vazia', () => {
  assert.deepEqual(build({ videos: [], temas: {} }), { 'scripts/videos/sitemap-exclude.json': '[]\n' });
});

test('legenda automática "rolando" vira texto sem repetição, em parágrafos por minuto', () => {
  const cues = parseVtt(readFileSync(join(FIXTURES, 'videos/AAAAAAAAAA1.transcricao.vtt'), 'utf8'));
  assert.deepEqual(cues.map((c) => c.texto), ['olá pessoal', 'hoje vamos falar', 'de agentes e repositórios', 'segunda parte do vídeo']);
  assert.deepEqual(paragrafos(cues).map((p) => p.t), [0, 70]);
});

test('formatação: slug, duração e data', () => {
  assert.equal(slugify('Ação & Reação: o que é?'), 'acao-reacao-o-que-e');
  assert.ok(slugify('palavra '.repeat(20)).length <= 60);
  assert.equal(duracaoPt('PT1H2M5S'), '1 h 2 min 5 s');
  assert.equal(dataPt('2025-03-14'), '14 de março de 2025');
});

test('--check reprova sobra sem fonte e a escrita a apaga', () => {
  const out = mkdtempSync(join(tmpdir(), 'videos-'));
  try {
    run({ contentDir: FIXTURES, outRoot: out });
    assert.deepEqual(run({ contentDir: FIXTURES, outRoot: out, check: true }).divergentes, []);
    writeFileSync(join(out, 'src/videos/feito-a-mao.html'), '<p>x</p>');
    assert.deepEqual(run({ contentDir: FIXTURES, outRoot: out, check: true }).sobras, ['src/videos/feito-a-mao.html']);
    run({ contentDir: FIXTURES, outRoot: out });
    assert.ok(!existsSync(join(out, 'src/videos/feito-a-mao.html')));
  } finally {
    rmSync(out, { recursive: true, force: true });
  }
});

test('o repositório está em dia com content/', () => {
  const r = run({ check: true });
  assert.deepEqual([...r.divergentes, ...r.sobras], []);
});
