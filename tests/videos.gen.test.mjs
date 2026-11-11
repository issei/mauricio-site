// Contrato do gerador das páginas de vídeo — docs/specs/pages/videos-youtube/SDD-fase-1.md
// e SDD-fase-2.md (artigo: âncora de minuto, regras para publicar, rascunho não vai ao ar).
//
// O que se testa é regra, não estética:
//   - validação do §6 (cada regra com um caso que falha e um que passa);
//   - ficha sem artigo revisado é noindex e fica fora do sitemap (§2, D4);
//   - vídeo removido não gera página; assunto sem vídeo não gera página;
//   - o gerador é dono das suas pastas: sobra sem fonte é apagada e reprovada no --check;
//   - a página de assunto lista os artigos do site com o tema (F5a, SDD-F1-F1b.md Parte 5);
//   - o repositório está em dia com content/.
import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, existsSync, readFileSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { build, artigosDoYaml, loadContent, parseVtt, paragrafos, slugify, duracaoPt, dataPt, validate, run, avisos, problemasDoArtigo, STATUS_PERMITIDOS_FASE_1 } from '../scripts/gen-videos.mjs';

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

test('validação: status fora da lista e lista de status permitidos', () => {
  assert.match(erros([video({ status: 'pronto' })]).join(), /fora de/);
  assert.match(validate({ videos: [video({ status: 'publicado' })], temas: {} }, { statusPermitidos: STATUS_PERMITIDOS_FASE_1 }).join(), /não é permitido/);
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

// ── Fase 2: artigo ──────────────────────────────────────────────────────────

const CUES = [{ t: 5, texto: 'a' }, { t: 70, texto: 'b' }, { t: 150, texto: 'c' }];
const artigo = (extra = {}) => video({
  status: 'publicado', temas: ['ia'], resumo: 'Resumo.', body: '## Seção\n\nTexto [00:06].',
  transcricao: CUES, fontes: [], revisado_por: 'Issei', revisado_em: '2026-11-08',
  youtube: { titulo: 'Um vídeo', publicado_em: '2025-01-01', duracao: 'PT3M', legenda: 'automatica' }, ...extra,
});
const TEMAS = { ia: { nome: 'IA' } };
const problemas = (extra) => problemasDoArtigo(artigo(extra)).join(' | ');

test('artigo válido pode ser publicado', () => {
  assert.deepEqual(validate({ videos: [artigo()], temas: TEMAS }), []);
});

test('âncora: precisa bater com a transcrição (30 s antes, 10 s depois) e caber no vídeo', () => {
  assert.equal(problemas({ body: 'Texto [01:20].' }), '', '70 s fala, 80 s citado: dentro da tolerância');
  assert.match(problemas({ body: 'Texto [00:50].' }), /não bate com nenhum trecho/);
  assert.match(problemas({ body: 'Texto [04:00].' }), /depois do fim do vídeo/);
  assert.equal(problemas({ body: 'Texto [0:01:10].' }), '', 'formato h:mm:ss');
});

test('âncora: todo parágrafo e item de lista precisa de uma; títulos não', () => {
  assert.match(problemas({ body: '## Título sem âncora\n\nParágrafo sem âncora.' }), /trecho sem âncora de minuto: "Parágrafo sem âncora\."/);
  assert.match(problemas({ body: '- item com [00:05]\n- item sem' }), /trecho sem âncora de minuto: "item sem"/);
  assert.equal(problemas({ body: '## Título\n\n- um [00:05]\n- dois [01:10]' }), '');
});

test('publicar exige resumo, corpo, tema, transcrição e revisão registrada', () => {
  assert.match(problemas({ resumo: '' }), /sem resumo/);
  assert.match(problemas({ body: '' }), /sem corpo/);
  assert.match(problemas({ temas: [] }), /sem tema/);
  assert.match(problemas({ transcricao: null, youtube: { ...artigo().youtube, legenda: 'pendente' } }), /sem transcrição/);
  assert.match(problemas({ revisado_por: '' }), /revisado_por/);
  assert.match(problemas({ revisado_em: 'ontem' }), /revisado_em/);
});

test('fonte só vale verificada e completa', () => {
  const fonte = { url: 'https://example.com', titulo: 'T', sustenta: 'S', verificada: true };
  assert.equal(problemas({ fontes: [fonte] }), '');
  assert.match(problemas({ fontes: [{ ...fonte, verificada: false }] }), /não verificada/);
  assert.match(problemas({ fontes: [{ ...fonte, sustenta: '' }] }), /sem sustenta/);
});

test('rascunho: as regras viram aviso, não erro, e a página continua sendo a ficha', () => {
  const rascunho = artigo({ status: 'rascunho', body: 'Sem âncora.', resumo: 'Resumo secreto do rascunho.' });
  assert.deepEqual(validate({ videos: [rascunho], temas: TEMAS }), []);
  assert.match(avisos({ videos: [rascunho] }).join(), /trecho sem âncora/);
  const html = build({ videos: [rascunho], temas: TEMAS })['src/videos/um-video.html'];
  assert.match(html, /noindex/);
  assert.doesNotMatch(html, /Resumo secreto|Sem âncora|class="artigo"/, 'nada do rascunho vai ao ar');
});

test('publicado: indexado, fora da exclusão, com artigo, âncoras, fontes, Article e FAQPage', () => {
  const out = build(fixture());
  const html = out['src/videos/especificacao-antes-do-codigo.html'];
  assert.match(html, /<meta name="robots" content="index, follow">/);
  assert.ok(!JSON.parse(out['scripts/videos/sitemap-exclude.json']).includes('/videos/especificacao-antes-do-codigo'));
  assert.match(html, /<a class="ancora" href="https:\/\/www\.youtube\.com\/watch\?v=DDDDDDDDDD4&amp;t=70s|<a class="ancora" href="https:\/\/www\.youtube\.com\/watch\?v=DDDDDDDDDD4&t=70s" data-t="70"/);
  assert.match(html, /Neste artigo/, 'índice com 3 ou mais seções');
  assert.match(html, /<h2 id="h-fontes">Fontes<\/h2>/);
  assert.match(html, /Revisado por Maurício Yokoyama Issei/);
  assert.match(html, /O vídeo e a transcrição estão em português/);
  const ld = JSON.parse(/<script type="application\/ld\+json">(.*?)<\/script>/.exec(html)[1]);
  const tipos = ld['@graph'].map((n) => n['@type']);
  assert.deepEqual(tipos, ['VideoObject', 'Article', 'FAQPage']);
  assert.equal(ld['@graph'][1].datePublished, '2026-11-08');
  assert.equal(ld['@graph'][2].mainEntity[0].acceptedAnswer.text, 'Não: ela evita retrabalho.');
  assert.match(out['public/videos/especificacao-antes-do-codigo.md'], /## Fontes/);
});

test('análise: padrão "negado" vem antes do gtag.js e o banner de cookies carrega', () => {
  const html = build(fixture())['src/videos.html'];
  assert.ok(html.indexOf("gtag('consent', 'default'") < html.indexOf('googletagmanager.com/gtag/js'));
  assert.match(html, /<script type="module" src="\/js\/cookie-consent\.js"><\/script>/);
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

test('assunto lista os artigos do site com o tema antes dos vídeos (F5a)', () => {
  const artigo = { titulo: 'Um artigo', href: '/um-artigo.html', natureza: 'Estudo', formato: 'Ensaio', descricao: 'Sobre agentes.', temas: ['engenharia-agentica'] };
  const out = build(fixture(), { artigos: [artigo] });
  const tema = out['src/temas/engenharia-agentica.html'];
  assert.match(tema, /<h2>Artigos e páginas<\/h2>/);
  assert.match(tema, /<a href="\/um-artigo\.html">Um artigo<\/a>/);
  assert.match(tema, /Estudo · Ensaio/);
  assert.ok(tema.indexOf('Artigos e páginas') < tema.indexOf('<h2>Vídeos</h2>'), 'artigos antes dos vídeos');
  assert.match(tema, /"@type":"WebPage"|"@type": "WebPage"/);
  assert.match(out['public/temas/engenharia-agentica.md'], /## Artigos e páginas[\s\S]*\[Um artigo\]/);
  assert.throws(() => build(fixture(), { artigos: [{ ...artigo, temas: ['nao-existe'] }] }), /tema "nao-existe"/);
});

test('todo tema do YAML tem ao menos um artigo e todo artigo aponta para uma página que existe (F5a)', () => {
  const artigos = artigosDoYaml();
  const { temas } = loadContent(join(ROOT, 'content'));
  for (const t of Object.keys(temas)) assert.ok(artigos.some((a) => a.temas.includes(t)), `tema sem artigo: ${t}`);
  for (const a of artigos) assert.ok(existsSync(join(ROOT, 'src', a.href)), `página inexistente: ${a.href}`);
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
