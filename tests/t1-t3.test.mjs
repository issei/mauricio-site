// Suíte T1–T3 (subconjunto MVP) — TST-01. Executar: node tests/t1-t3.test.mjs
import { strict as assert } from 'node:assert';
import { STORY_DATA, ARC_THEME, TELEMETRY_RULES, AVATAR_VERSIONS } from '../public/lifeos/story/data.js';
import { bus } from '../public/lifeos/core/bus.js';
import { createSession } from '../public/lifeos/core/session.js';

let passed = 0;
function t(name, fn) { try { fn(); passed++; console.log(`ok   ${name}`); } catch (e) { console.error(`FAIL ${name}: ${e.message}`); process.exitCode = 1; } }

// ---- T1.1 STORY_DATA × CTR-01 ----
t('T1.1 ordem contígua 1..12', () => {
  const orders = STORY_DATA.map((m) => m.order);
  assert.deepEqual(orders, Array.from({ length: 12 }, (_, i) => i + 1));
});
t('T1.1 ids e cliIds únicos', () => {
  assert.equal(new Set(STORY_DATA.map((m) => m.id)).size, 12);
  assert.equal(new Set(STORY_DATA.map((m) => m.cliId)).size, 12);
});
t('T1.1 enums válidos', () => {
  for (const m of STORY_DATA) {
    assert.ok(m.arc in ARC_THEME, m.id);
    assert.ok(['none', 'merge', 'conflict', 'panic', 'cherry-pick', 'rebase'].includes(m.gitOp), m.id);
    assert.ok([0, 1, 2, 3].includes(m.emotionalLoad), m.id);
    assert.ok(Math.abs(m.branchWeight.personal + m.branchWeight.professional - 1) < 1e-9, m.id);
  }
});
t('T1.1 avatarVersion monotônico', () => {
  let last = 0;
  for (const m of STORY_DATA) { assert.ok(m.avatarVersion >= last, m.id); last = m.avatarVersion; }
});
t('T1.1 emotionalLoad=3 só em panic/rebase 2017', () => {
  const heavy = STORY_DATA.filter((m) => m.emotionalLoad === 3).map((m) => m.id);
  assert.deepEqual(heavy, ['kernel_panic_2004', 'kintsugi_rebase']);
});
t('T1.1 premissas P00 (anos)', () => {
  const y = Object.fromEntries(STORY_DATA.map((m) => [m.id, m.year]));
  assert.equal(y.initial_commit, 1982); assert.equal(y.first_deploy, 1998);
  assert.equal(y.kernel_panic_2004, 2004); assert.equal(y['2011_merge_request'], 2011);
  assert.equal(y.fork_twins_x2, 2016); assert.equal(y.kintsugi_rebase, 2017);
});

// ---- T1.2 TELEMETRY_RULES ----
t('T1.2 cobre todos os telemetryKeys', () => {
  for (const m of STORY_DATA) assert.ok(TELEMETRY_RULES[m.telemetryKey], m.telemetryKey);
});
t('T1.2 threads coerentes (1→2→3→5)', () => {
  const seq = STORY_DATA.map((m) => TELEMETRY_RULES[m.telemetryKey].threads.value);
  assert.deepEqual(seq, [1, 1, 1, 1, 1, 1, 1, 2, 3, 5, 5, 5]);
});

// ---- T1.3 AVATAR_VERSIONS ----
t('T1.3 5 versões, v5 sem cabelo, headset só phase:', () => {
  assert.equal(Object.keys(AVATAR_VERSIONS).length, 5);
  assert.equal(AVATAR_VERSIONS[5].components.hair, false);
  assert.equal(AVATAR_VERSIONS[3].components.headset, 'phase:incident_queue');
});

// ---- T3 (bus) ----
t('T3 bus: evento desconhecido lança', () => {
  assert.throws(() => bus.publish('foo:bar', {}));
});
t('T3 bus: handler com exceção não interrompe demais', () => {
  bus._reset();
  let hits = 0;
  bus.subscribe('cli:opened', () => { throw new Error('boom'); });
  bus.subscribe('cli:opened', () => { hits++; });
  bus.publish('cli:opened', {});
  assert.equal(hits, 1);
});
t('T3 bus: payload congelado; defer só roda no flush', () => {
  bus._reset();
  let got = null;
  bus.subscribe('cli:closed', (p) => { got = p; });
  bus.defer('cli:closed', { a: 1 });
  assert.equal(got, null);
  bus.flush();
  assert.ok(Object.isFrozen(got) && got.a === 1);
});

// ---- T3.3 SessionState (storage mockado) ----
function mockStorage(initial = {}) {
  const m = new Map(Object.entries(initial));
  return { getItem: (k) => m.get(k) ?? null, setItem: (k, v) => m.set(k, v), removeItem: (k) => m.delete(k), _m: m };
}
t('T3.3 save corrompido → estado limpo', () => {
  const s = createSession(mockStorage({ 'lifeos.session.v1': '{corrupto' }));
  assert.equal(s.get().currentPhaseId, 'initial_commit');
});
t('T3.3 save adulterado (fase inválida) → descarte íntegro', () => {
  const bad = JSON.stringify({ schemaVersion: 1, unlockedMemories: [], currentPhaseId: 'hackz', scars: [], valeResolved: false, avatarSeenVersions: [], a11y: { safeMode: false, reducedMotion: null }, audioUnlocked: false, stats: { totalWalkUnits: 0, cliCommandsUsed: 0 } });
  const s = createSession(mockStorage({ 'lifeos.session.v1': bad }));
  assert.equal(s.get().currentPhaseId, 'initial_commit');
});
t('T3.3 scars: open→gilded, nunca reverte; memórias append-only', () => {
  const s = createSession(mockStorage());
  s.addScar('scar-x', [[0, 0]]);
  s.gildScar('scar-x'); s.gildScar('scar-x');
  assert.equal(s.get().scars[0].state, 'gilded');
  s.unlockMemory('initial_commit'); s.unlockMemory('initial_commit');
  assert.equal(s.get().unlockedMemories.length, 1);
});
t('T3.3 audioUnlocked nunca persiste true', () => {
  const st = mockStorage();
  const s = createSession(st);
  s.set({ audioUnlocked: true });
  s._flushNow();
  assert.equal(JSON.parse(st._m.get('lifeos.session.v1')).audioUnlocked, false);
});

console.log(`\n${passed} testes ok${process.exitCode ? ' (com falhas)' : ''}`);
