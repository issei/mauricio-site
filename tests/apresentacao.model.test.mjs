/**
 * Motores da página v3.0 — Seletor, progresso adaptativo e Hub.
 *
 * Roda em `node --test`: sem navegador, sem sleep, determinístico. É por isso
 * que os modelos são puros — testar debounce com `waitForTimeout` seria
 * exatamente o não-determinismo contra o qual esta página argumenta.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve, join } from 'node:path';

import {
  createPerspectiveMachine,
  otherPersona,
  DEFAULT_PERSONA,
  MAX_TRANSITION_MS,
} from '../src/js/apresentacao/perspective-model.js';
import { computeProgress, LAYER_WEIGHTS } from '../src/js/apresentacao/progress-model.js';
import {
  TABS, DEFAULT_TAB, filterByTab, countByTab, tabLabel, normalizeTab,
} from '../src/js/apresentacao/hub-model.js';
import { HUB_ITEMS } from '../src/js/apresentacao/hub-data.js';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');

/* ── Seletor de Perspectiva ─────────────────────────────────────────────── */

test('estado inicial é sempre Executiva (evolução: spec §2.B.3)', () => {
  assert.equal(DEFAULT_PERSONA, 'exec');
  assert.equal(createPerspectiveMachine().state, 'exec');
});

test('a duração declarada tem de caber no teto de 200ms', () => {
  assert.throws(() => createPerspectiveMachine({ durationMs: MAX_TRANSITION_MS }), RangeError);
  assert.throws(() => createPerspectiveMachine({ durationMs: 280 }), RangeError);
  assert.doesNotThrow(() => createPerspectiveMachine({ durationMs: 160 }));
});

test('trocar de persona aplica a transição', () => {
  const m = createPerspectiveMachine();
  assert.equal(m.request('eng'), 'applied');
  assert.equal(m.state, 'eng');
  assert.equal(m.busy, true);
});

test('pedir a persona corrente, parado, não faz nada', () => {
  const m = createPerspectiveMachine();
  assert.equal(m.request('exec'), 'noop');
  assert.equal(m.busy, false);
});

test('spec §4.2 · alternância rápida enfileira em vez de sobrepor', () => {
  const m = createPerspectiveMachine();
  assert.equal(m.request('eng'), 'applied');   // começa exec→eng
  assert.equal(m.request('exec'), 'queued');   // clique durante a transição
  assert.equal(m.request('eng'), 'queued');    // e outro
  assert.equal(m.state, 'eng', 'o estado visível não muda no meio da transição');

  // Profundidade um: os cliques do meio somem, o último vence. Neste caso o
  // último pedido coincide com o estado atual, então nada fica pendente.
  assert.equal(m.pending, null);
  assert.equal(m.settle(), 'noop');
  assert.equal(m.busy, false);
});

test('spec §4.2 · o último pedido durante a transição é o que roda depois', () => {
  const m = createPerspectiveMachine();
  m.request('eng');            // applied
  assert.equal(m.request('exec'), 'queued');
  assert.equal(m.pending, 'exec');
  assert.equal(m.settle(), 'applied', 'a fila drena ao terminar a transição');
  assert.equal(m.state, 'exec');
  assert.equal(m.busy, true);
  assert.equal(m.settle(), 'noop');
});

test('persona inválida é erro, não estado silencioso', () => {
  const m = createPerspectiveMachine();
  assert.throws(() => m.request('executiva'), TypeError);
});

test('otherPersona alterna nos dois sentidos', () => {
  assert.equal(otherPersona('exec'), 'eng');
  assert.equal(otherPersona('eng'), 'exec');
});

/* ── Progresso adaptativo ───────────────────────────────────────────────── */

test('os pesos de camada somam 1', () => {
  const sum = Object.values(LAYER_WEIGHTS).reduce((a, b) => a + b, 0);
  assert.ok(Math.abs(sum - 1) < 1e-9, `pesos somam ${sum}`);
});

test('progresso vai de 0 a 1 e satura nas pontas', () => {
  const boxes = [
    { layer: 1, top: 0, height: 1000 },
    { layer: 2, top: 1000, height: 1000 },
    { layer: 3, top: 2000, height: 1000 },
  ];
  assert.equal(computeProgress(-500, 0, boxes), 0);
  assert.ok(computeProgress(3000, 0, boxes) >= 0.999);
});

test('evolução 16 · a barra acelera na Camada 1 e desacelera na Camada 3', () => {
  // Camadas de altura idêntica: qualquer diferença de velocidade vem do peso.
  const boxes = [
    { layer: 1, top: 0, height: 1000 },
    { layer: 2, top: 1000, height: 1000 },
    { layer: 3, top: 2000, height: 1000 },
  ];
  const rate = (from, to) =>
    (computeProgress(to, 0, boxes) - computeProgress(from, 0, boxes)) / (to - from);

  const r1 = rate(100, 400);   // dentro da Camada 1
  const r3 = rate(2100, 2400); // dentro da Camada 3
  assert.ok(
    r1 < r3,
    `a Camada 1 deveria consumir MENOS barra por pixel que a Camada 3 ` +
      `(r1=${r1.toFixed(5)}, r3=${r3.toFixed(5)}) — é assim que ela "passa rápido"`
  );
});

test('várias seções da mesma camada não estouram o peso dela', () => {
  // Regressão: a página alterna 1→2→3 três vezes; sem repartir o peso por
  // altura, a barra chegaria a 100% muito antes do fim.
  const boxes = [
    { layer: 1, top: 0, height: 500 },
    { layer: 2, top: 500, height: 500 },
    { layer: 3, top: 1000, height: 500 },
    { layer: 1, top: 1500, height: 500 },
    { layer: 2, top: 2000, height: 500 },
    { layer: 3, top: 2500, height: 500 },
  ];
  const mid = computeProgress(1500, 0, boxes);
  assert.ok(mid > 0 && mid < 1, `progresso no meio saiu ${mid}`);
  assert.ok(computeProgress(3000, 0, boxes) <= 1);
  assert.ok(computeProgress(3000, 0, boxes) >= 0.999, 'o fim da página deve ser 100%');
});

test('caixa de altura zero não quebra o cálculo', () => {
  const boxes = [{ layer: 1, top: 0, height: 0 }, { layer: 2, top: 0, height: 100 }];
  const p = computeProgress(50, 0, boxes);
  assert.ok(Number.isFinite(p), `progresso não numérico: ${p}`);
});

/* ── Hub de Conexão ─────────────────────────────────────────────────────── */

test('evolução 14 · três abas fixas, "Para decidir" ativa por padrão', () => {
  assert.equal(TABS.length, 3);
  assert.deepEqual(TABS.map((t) => t.id), ['decidir', 'planejar', 'especificar']);
  assert.equal(DEFAULT_TAB, 'decidir');
});

test('os contadores batem com o conteúdo real do Hub', () => {
  const counts = countByTab(HUB_ITEMS);
  for (const tab of TABS) {
    assert.equal(
      counts[tab.id], filterByTab(HUB_ITEMS, tab.id).length,
      `contador de "${tab.id}" divergente do filtro`
    );
  }
  assert.equal(
    Object.values(counts).reduce((a, b) => a + b, 0), HUB_ITEMS.length,
    'todo item pertence a exatamente uma aba'
  );
});

test('nenhuma aba fica vazia — três abas fixas precisam ter conteúdo', () => {
  const counts = countByTab(HUB_ITEMS);
  for (const tab of TABS) {
    assert.ok(counts[tab.id] > 0, `aba "${tab.id}" sem itens`);
  }
});

test('o rótulo traz o contador, como a spec pede literalmente', () => {
  const counts = countByTab(HUB_ITEMS);
  assert.match(tabLabel(TABS[1], counts), /^Para planejar \(\d+\)$/);
});

test('aba desconhecida cai no padrão em vez de sumir com a lista', () => {
  assert.equal(normalizeTab('inexistente'), DEFAULT_TAB);
  assert.equal(normalizeTab(null), DEFAULT_TAB);
  assert.equal(normalizeTab('especificar'), 'especificar');
});

test('todo item do Hub tem tempo de leitura plausível e destino real', () => {
  for (const item of HUB_ITEMS) {
    assert.ok(item.minutes >= 1 && item.minutes <= 120, `${item.slug}: ${item.minutes} min`);
    assert.match(item.href, /^\.\/[a-z0-9-]+\.html$/, `${item.slug}: href fora do padrão`);
    assert.ok(item.title?.length, `${item.slug}: sem título`);
    assert.ok(item.blurb?.length > 30, `${item.slug}: blurb curto demais`);
  }
});

test('as três etiquetas de complexidade estão em uso (spec §3.1)', () => {
  const used = new Set(HUB_ITEMS.map((i) => i.complexity));
  for (const label of ['Estratégica', 'Técnica Aplicada', 'Tópico Profundo']) {
    assert.ok(used.has(label), `etiqueta "${label}" sem nenhum item`);
  }
});

/* ── Pureza dos modelos ─────────────────────────────────────────────────── */

test('os modelos não tocam no DOM', () => {
  for (const file of ['perspective-model.js', 'progress-model.js', 'hub-model.js']) {
    const src = readFileSync(join(ROOT, 'src/js/apresentacao', file), 'utf8')
      .replace(/\/\*[\s\S]*?\*\//g, '')
      .replace(/\/\/.*$/gm, '');
    assert.doesNotMatch(src, /\bdocument\b/, `${file} referencia document`);
    assert.doesNotMatch(src, /\bwindow\b/, `${file} referencia window`);
  }
});
