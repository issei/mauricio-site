// Invariantes do modelo da entrevista por escrito (spec §5 e §8).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import {
  VERSAO, INSTRUMENTO, PARTES, CAMPOS_SITUACAO, estadoVazio, novaSituacao, validarImportacao, nomeSituacao, paraTexto,
} from '../src/js/entrevista/modelo.js';

const roteiro = readFileSync(new URL('../docs/specs/pages/entrevista-acessibilidade-streaming/roteiro.md', import.meta.url), 'utf8');
const html = readFileSync(new URL('../src/entrevista-acessibilidade-streaming.html', import.meta.url), 'utf8');

/** Trecho do HTML de uma <section id>, até a próxima. */
const secao = (id) => html.match(new RegExp(`<section id="${id}"[\\s\\S]*?</section>`))[0];
/** Trecho do roteiro entre dois títulos. */
const bloco = (de, ate) => roteiro.slice(roteiro.indexOf(de), roteiro.indexOf(ate, roteiro.indexOf(de) + 1));
const numeradas = (texto) => (texto.match(/^\d\. /gm) || []).length;

test('cinco partes com situações, uma por eixo do roteiro (A a E), Partes 2 a 6', () => {
  assert.deepEqual(PARTES.map((p) => p.id), ['A', 'B', 'C', 'D', 'E']);
  assert.deepEqual(PARTES.map((p) => p.numero), [2, 3, 4, 5, 6]);
  for (const p of PARTES) {
    assert.ok(roteiro.includes(`### Eixo ${p.id}: ${p.eixo}`), p.eixo);
    assert.match(secao(p.secao), new RegExp(`<h2 id="t-${p.secao}">Parte ${p.numero}\\. `));
  }
});

test('cada parte tem o mesmo número de perguntas principais que o bloco do roteiro', () => {
  const pares = [
    ['rotina', bloco('## 2. ', '**Perguntas de aprofundamento')],
    ...PARTES.map((p, i) => [p.secao, bloco(`### Eixo ${p.id}:`, '**Perguntas de aprofundamento')]),
    ['final', bloco('## 5. ', '**Encerramento')],
  ];
  for (const [id, trecho] of pares) {
    const nPagina = (secao(id).match(new RegExp(`name="${id}-\\d"`, 'g')) || []).length;
    assert.equal(nPagina, numeradas(trecho), id);
  }
  // Bloco 4: cada pergunta entre aspas vira uma pergunta da Parte 7.
  const extras = (bloco('## 4. ', '**Nota ao entrevistador').match(/^- "/gm) || []).length;
  assert.equal((secao('extras').match(/<textarea /g) || []).length, extras);
});

test('a página fala com a pessoa entrevistada: sem notas, colchetes ou instruções ao entrevistador', () => {
  assert.doesNotMatch(html, /entrevistador|\[nome\]|\[o que a pessoa|Pode me contar|Conte-me|Origem do impedimento|cronômetro/i);
});

test('nenhuma opção da autorização vem marcada', () => {
  assert.doesNotMatch(secao('autorizacao'), /\bchecked\b/);
});

test('situação: campos do relato direto, sem campo de causa sugerida', () => {
  const ids = CAMPOS_SITUACAO.map((c) => c.id);
  for (const id of ['aparelho', 'servico', 'recurso', 'controle', 'quando', 'versao', 'passos', 'resultado']) assert.ok(ids.includes(id), id);
  assert.ok(!ids.some((id) => /origem|causa/.test(id)));
  assert.throws(() => novaSituacao('Z', 1));
  assert.equal(novaSituacao('B', 3).id, '3');
  assert.equal(nomeSituacao('B', 2), 'Parte 3, situação 2');
});

test('validarImportacao: recusa versão errada e lixo, descarta o que não conhece', () => {
  assert.equal(validarImportacao(null).ok, false);
  assert.equal(validarImportacao([]).ok, false);
  const v = validarImportacao({ versao: 2 });
  assert.equal(v.ok, false);
  assert.match(v.erro, /versão 2/);

  const r = validarImportacao({
    versao: VERSAO,
    campos: { 'antes-nome': 'Ana', 'rotina-1': 'à noite', '<script>': 'x', 'final-1': true, 'aut-uso': { a: 1 } },
    situacoes: [{ parte: 'C', id: '7', aparelho: 'TV', extra: 'fora' }, { parte: 'Z' }, 'lixo'],
  });
  assert.ok(r.ok);
  assert.deepEqual(r.estado.campos, { 'antes-nome': 'Ana', 'rotina-1': 'à noite' });
  assert.equal(r.estado.situacoes.length, 1);
  assert.equal(r.estado.situacoes[0].aparelho, 'TV');
  assert.equal(r.estado.situacoes[0].extra, undefined);
});

test('instrumento: todo estado leva o id do questionário que a página mostra', () => {
  assert.match(INSTRUMENTO, /^entrevista-streaming@\d+$/);
  assert.equal(estadoVazio().instrumento, INSTRUMENTO);
  // Arquivo antigo, sem o campo, ou de outro questionário: o estado passa a ser o da página atual.
  assert.equal(validarImportacao({ versao: VERSAO }).estado.instrumento, INSTRUMENTO);
  assert.equal(validarImportacao({ versao: VERSAO, instrumento: 'outro@9' }).estado.instrumento, INSTRUMENTO);
});

test('paraTexto: texto simples, só o que foi respondido, situações dentro da parte', () => {
  const e = estadoVazio();
  e.campos = { 'antes-nome': 'Ana', 'rotina-1': 'À noite,\ncom a família.', 'rotina-2': '  ', 'aut-uso': 'Sim' };
  const s = novaSituacao('B', 1);
  s.aparelho = 'Smart TV';
  s.passos = 'Abri o menu.';
  e.situacoes.push(s);
  const perguntas = [
    { nome: 'antes-nome', pergunta: 'Seu nome', secao: 'antes', titulo: 'Antes de começar' },
    { nome: 'rotina-1', pergunta: 'Como o streaming entra na sua rotina?', secao: 'rotina', titulo: 'Parte 1. Rotina' },
    { nome: 'rotina-2', pergunta: 'Quais serviços?', secao: 'rotina', titulo: 'Parte 1. Rotina' },
    { nome: 'comecar-1', pergunta: 'Descreva o início.', secao: 'comecar', titulo: 'Parte 3. Começar' },
    { nome: 'aut-uso', pergunta: 'Trechos podem ser usados?', secao: 'autorizacao', titulo: 'Parte 9. Autorização' },
  ];
  const t = paraTexto(e, perguntas, new Date(2026, 9, 24, 10, 0));
  assert.match(t, /^Entrevista por escrito: acessibilidade em serviços de streaming de vídeo\nRespostas de: Ana\n/);
  assert.match(t, /Parte 1\. Rotina\n\nPergunta: Como o streaming entra na sua rotina\?\nResposta: À noite,\ncom a família\./);
  assert.doesNotMatch(t, /Quais serviços/);
  assert.match(t, /Parte 3\. Começar\n\nParte 3, situação 1\nEm qual aparelho foi\? Smart TV\nO que você fez, passo a passo\? Abri o menu\./);
  assert.ok(t.indexOf('Parte 3. Começar') < t.indexOf('Parte 9. Autorização'));
  assert.doesNotMatch(t, /[*#|]|^- /m);
  assert.match(paraTexto(estadoVazio(), []), /Respostas de: não informado[\s\S]*Nenhuma pergunta respondida\./);
});

test('a página não traz hexadecimal fora do CSS próprio nem script de terceiros', () => {
  assert.doesNotMatch(html.replace(/<meta name="theme-color"[^>]*>/, ''), /#[0-9a-fA-F]{6}\b/);
  assert.doesNotMatch(html, /googletagmanager|clarity|gtag\(/);
});
