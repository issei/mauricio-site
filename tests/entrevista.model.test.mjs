// Invariantes do modelo da página de entrevista (spec §5).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import {
  VERSAO, EIXOS, ORIGENS, CAMPOS_EPISODIO, estadoVazio, novoEpisodio, validarImportacao,
  decorrido, formatarDuracao, pausasCruzadas, textoTopicos, paraMarkdown,
} from '../src/js/entrevista/modelo.js';

const roteiro = readFileSync(new URL('../docs/specs/pages/entrevista-acessibilidade-streaming/roteiro.md', import.meta.url), 'utf8');
const html = readFileSync(new URL('../src/entrevista-acessibilidade-streaming.html', import.meta.url), 'utf8');

test('cinco eixos, A a E, com os títulos do roteiro', () => {
  assert.deepEqual(EIXOS.map((e) => e.id), ['A', 'B', 'C', 'D', 'E']);
  for (const e of EIXOS) assert.ok(roteiro.includes(`### Eixo ${e.id}: ${e.titulo}`), e.titulo);
});

test('origem do impedimento: as três categorias do roteiro, nessa ordem, mais "não houve"', () => {
  assert.deepEqual(ORIGENS.map((o) => o.valor), ['ausencia', 'interacao', 'indefinido', 'sem-impedimento']);
});

test('o episódio cobre todos os itens de "Como registrar os relatos"', () => {
  const ids = CAMPOS_EPISODIO.map((c) => c.id);
  for (const id of ['aparelho', 'servico', 'recurso', 'sequencia', 'resultado', 'palavras', 'quando', 'versao', 'tempo',
    'interpretacaoPessoa', 'interpretacaoEntrevistador', 'lacunas']) assert.ok(ids.includes(id), id);
});

test('novoEpisodio recusa eixo desconhecido e nasce sem origem marcada', () => {
  assert.throws(() => novoEpisodio('Z', 1));
  const ep = novoEpisodio('B', 3);
  assert.equal(ep.origem, '');
  assert.equal(ep.id, '3');
});

test('validarImportacao: recusa versão errada e lixo, descarta campo estranho, não volta rodando', () => {
  assert.equal(validarImportacao(null).ok, false);
  assert.equal(validarImportacao([]).ok, false);
  const v = validarImportacao({ versao: 2 });
  assert.equal(v.ok, false);
  assert.match(v.erro, /versão 2/);

  const r = validarImportacao({
    versao: VERSAO,
    campos: { 'ab-identificador': 'E-1', 'q2-1': true, '<script>': 'x', 'ab-x': { a: 1 } },
    episodios: [{ eixo: 'C', id: '7', origem: 'interacao', aparelho: 'TV', extra: 'fora' }, { eixo: 'Z' }, { eixo: 'A', origem: 'chute' }],
    cronometro: { acumuladoMs: 1000, iniciadoEm: 123 },
  });
  assert.ok(r.ok);
  assert.deepEqual(r.estado.campos, { 'ab-identificador': 'E-1', 'q2-1': true });
  assert.equal(r.estado.episodios.length, 2);
  assert.equal(r.estado.episodios[0].aparelho, 'TV');
  assert.equal(r.estado.episodios[0].extra, undefined);
  assert.equal(r.estado.episodios[1].origem, '');
  assert.deepEqual(r.estado.cronometro, { acumuladoMs: 1000, iniciadoEm: null });
});

test('cronômetro: decorrido, formato e pausas de 35 e 60 minutos', () => {
  assert.equal(decorrido({ acumuladoMs: 1000, iniciadoEm: 5000 }, 8000), 4000);
  assert.equal(formatarDuracao(35 * 60000), '35:00');
  assert.equal(formatarDuracao(3909000), '1:05:09');
  assert.deepEqual(pausasCruzadas(34 * 60000, 35 * 60000), [35]);
  assert.deepEqual(pausasCruzadas(35 * 60000, 36 * 60000), []);
  assert.deepEqual(pausasCruzadas(0, 61 * 60000), [35, 60]);
});

test('textoTopicos: igual ao Anexo do roteiro, sem tabela, negrito nem símbolo de lista', () => {
  const t = textoTopicos();
  for (const linha of t.split('\n').filter(Boolean)) assert.ok(roteiro.includes(linha), linha);
  assert.doesNotMatch(t, /[*|#]|^- /m);
  assert.match(textoTopicos('  Ana '), /^Olá, Ana\./);
});

test('o texto estático da lista no HTML é o mesmo que textoTopicos() gera', () => {
  const m = html.match(/<textarea id="topicos-texto"[^>]*>([\s\S]*?)<\/textarea>/);
  assert.equal(m[1], textoTopicos());
});

test('as perguntas principais do roteiro estão todas na página', () => {
  const perguntas = [...roteiro.matchAll(/^\d\. (.+)$/gm)].map((m) => m[1]);
  assert.ok(perguntas.length >= 36);
  for (const p of perguntas) assert.ok(html.includes(p), p);
});

test('paraMarkdown: só o que foi preenchido, episódios por eixo e origem', () => {
  const e = estadoVazio();
  e.campos = { 'ab-identificador': 'E-3', 'ctx-notas': '', 'q2-1': true, 'q2-2': false };
  const ep = novoEpisodio('B', 1);
  ep.origem = 'ausencia';
  ep.palavras = 'não tinha\nlegenda';
  e.episodios.push(ep);
  const md = paraMarkdown(e, { 'ab-identificador': { rotulo: 'Identificador', secao: 'Abertura' } }, new Date(2026, 9, 24));
  assert.match(md, /## Abertura\n\n- Identificador: E-3/);
  assert.doesNotMatch(md, /ctx-notas|q2-2/);
  assert.match(md, /- q2-1: sim/);
  assert.match(md, /### Eixo B, episódio 1\n\n- Origem do impedimento: Ausência do recurso no conteúdo/);
  assert.match(md, /- Palavras exatas da pessoa: não tinha \/ legenda/);
});

test('a página não traz hexadecimal fora do CSS próprio nem script de terceiros', () => {
  assert.doesNotMatch(html.replace(/<meta name="theme-color"[^>]*>/, ''), /#[0-9a-fA-F]{6}\b/);
  assert.doesNotMatch(html, /googletagmanager|clarity|gtag\(/);
});
