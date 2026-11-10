import { test } from 'node:test';
import assert from 'node:assert/strict';
import { aplicarTrocas } from '../scripts/videos/aplicar-trocas.mjs';

const vtt = `WEBVTT
Kind: captions
Language: pt

00:00:00.199 --> 00:00:02.750 align:start position:0%

a<00:00:00.960><c> amadilha</c><00:00:01.160><c> do</c>

00:00:02.750 --> 00:00:02.760 align:start position:0%
a amadilha do
`;

test('troca o texto, remove tags de palavra e mantém os tempos', () => {
  const { vtt: saida, naoAchadas } = aplicarTrocas(vtt, [{ de: 'amadilha', para: 'armadilha' }, { de: 'xyz', para: 'w' }]);
  const tempos = (s) => s.split('\n').filter((l) => l.includes('-->')).join();
  assert.equal(tempos(saida), tempos(vtt));
  assert.equal(saida.match(/armadilha/g).length, 2);
  assert.doesNotMatch(saida, /<c>/);
  assert.deepEqual(naoAchadas.map((t) => t.de), ['xyz']);
});
