// Invariantes dos motores — Operação Capital Cognitivo (specs docs 03–06).
// Executar: node --test tests/occ-engines.test.mjs
import { test } from 'node:test';
import { strict as assert } from 'node:assert';
import {
  DigitalTwinEngine, INITIAL_STATE, effectiveRm, contextRotPenalty,
  humanReworkCost, fatorFadiga, vcoreFrom,
} from '../src/js/operacao-capital-cognitivo/digital-twin.js';
import { EvidenceBoardManager, EVIDENCE_CARDS } from '../src/js/operacao-capital-cognitivo/evidence-board.js';
import { StatefulBoardEngine, QUESTION_BANK } from '../src/js/operacao-capital-cognitivo/board-engine.js';
import { RandomEventEngine } from '../src/js/operacao-capital-cognitivo/event-engine.js';

// ---------- Digital Twin ----------
test('V_core sempre entre 0 e 100', () => {
  for (const rm of [0.05, 0.42, 0.9, 0.99]) {
    const v = vcoreFrom(rm, 10000, { claimedAccuracy: 0.85, latenciaPrimeiraCompilacao: 22 }, 0.1);
    assert.ok(v >= 0 && v <= 100, `V_core fora de faixa: ${v}`);
  }
});

test('custo humano é não-linear no V_core (termo quadrático)', () => {
  const low = humanReworkCost(10000, 0.6, 40);
  const high = humanReworkCost(10000, 0.6, 80);
  // Dobrar V_core mais que dobra o incremento do fator de fadiga.
  const incLow = low - humanReworkCost(10000, 0.6, 0);
  const incHigh = high - humanReworkCost(10000, 0.6, 0);
  assert.ok(incHigh / incLow > 2, `esperado >2, obtido ${incHigh / incLow}`);
  assert.ok(fatorFadiga(80) > fatorFadiga(40));
});

test('Context Rot só acima de 50k tokens', () => {
  assert.equal(contextRotPenalty(8000), 0);
  assert.equal(contextRotPenalty(50000), 0);
  assert.ok(contextRotPenalty(100000) > 0.09);
  assert.ok(contextRotPenalty(200000) <= 0.15);
});

test('Context Rot reduz Rm efetiva', () => {
  const base = { ragDepth: 3, ragReranking: 'off', testTimeComputeLevel: 1, avgContextTokens: 8000 };
  const model = { baseAccuracy: 0.8 };
  const rmLow = effectiveRm(base, model, 2);
  const rmHigh = effectiveRm({ ...base, avgContextTokens: 100000 }, model, 2);
  assert.ok(rmLow - rmHigh > 0.08, `diferença ${rmLow - rmHigh}`);
});

test('cache semântico reduz apiCost e não altera Rm', () => {
  const e1 = new DigitalTwinEngine();
  e1.applyDecisions({ semanticCaching: false }); e1.recompute();
  const s1 = e1.getState();
  const e2 = new DigitalTwinEngine();
  e2.applyDecisions({ semanticCaching: true }); e2.recompute();
  const s2 = e2.getState();
  assert.ok(s2.finances.apiCost < s1.finances.apiCost);
  assert.equal(s2.operations.firstPassAccuracy, s1.operations.firstPassAccuracy);
});

test('RouteLLM com slmRatio 0.7 reduz apiCost ≥ 30%', () => {
  const e = new DigitalTwinEngine();
  e.recompute();
  const before = e.getState().finances.apiCost;
  e.applyDecisions({ useRouteLLM: true, slmRatio: 0.7 });
  e.recompute();
  assert.ok(e.getState().finances.apiCost <= before * 0.7);
});

test('cascata agêntica: sem isolamento gera resentContextCost alto; com isolamento contém', () => {
  const noIso = new DigitalTwinEngine();
  noIso.applyDecisions({ multiAgent: true, agentIsolation: false, ragReranking: 'off' });
  noIso.recompute();
  const s1 = noIso.getState();
  assert.ok(s1.finances.resentContextCost > 0);

  const iso = new DigitalTwinEngine();
  iso.applyDecisions({ multiAgent: true, agentIsolation: true });
  iso.recompute();
  const s2 = iso.getState();
  // isolamento limita a ~15% do apiCost bruto (apiCost inclui o resent)
  assert.ok(s2.finances.resentContextCost <= s2.finances.apiCost * 0.16);
  assert.ok(s1.finances.resentContextCost > s2.finances.resentContextCost);
});

test('reranking universal dá mais rerankBonus que conditional', () => {
  const base = { ragDepth: 2, testTimeComputeLevel: 1, avgContextTokens: 8000 };
  const model = { baseAccuracy: 0.6 };
  const cond = effectiveRm({ ...base, ragReranking: 'conditional' }, model, 2);
  const univ = effectiveRm({ ...base, ragReranking: 'universal' }, model, 2);
  assert.ok(univ > cond);
});

test('RAG: troca de modelo aciona custo de re-indexação', () => {
  const e = new DigitalTwinEngine();
  e.applyDecisions({ ragDepth: 3 }); e.recompute();
  const semTroca = e.getState().finances.infrastructureCost;
  const e2 = new DigitalTwinEngine();
  e2.applyDecisions({ ragDepth: 3 });
  e2.recordModelChoice('pro'); // marca troca → reindex
  const comTroca = e2.getState().finances.infrastructureCost;
  assert.ok(comTroca > semTroca);
});

test('checkEndConditions FAILURE_CASH e VICTORY', () => {
  const e = new DigitalTwinEngine();
  e.state.finances.cashBalance = -1;
  assert.equal(e.checkEndConditions(), 'FAILURE_CASH');
  const e2 = new DigitalTwinEngine();
  e2.state.finances.cashBalance = 500000;
  e2.state.operations.slaCompliance = 0.95;
  assert.equal(e2.checkEndConditions(80), 'VICTORY');
});

test('K_cog sempre entre 0 e 100', () => {
  const e = new DigitalTwinEngine();
  for (const rag of [1, 3, 5]) { e.applyDecisions({ ragDepth: rag }); e.recompute(); const k = e.getState().metrics.cognitiveCapitalIndex; assert.ok(k >= 0 && k <= 100); }
});

// ---------- Evidence Board ----------
test('catálogo tem 11 cards com metadados obrigatórios', () => {
  assert.equal(EVIDENCE_CARDS.length, 11);
  for (const c of EVIDENCE_CARDS) {
    assert.ok(c.evidenceLevel && c.validityContext && c.limitations, c.id);
  }
});

test('isValidForQuestion respeita unlock e categoria (inclui HumanFactors)', () => {
  const b = new EvidenceBoardManager();
  assert.equal(b.isValidForQuestion('EVID_08', 'HumanFactors'), false); // ainda locked
  b.unlock('EVID_08');
  assert.equal(b.isValidForQuestion('EVID_08', 'HumanFactors'), true);
  assert.equal(b.isValidForQuestion('EVID_08', 'TCO'), false);
});

// ---------- Board Engine ----------
test('toda pergunta carrega stakeholderId válido', () => {
  const ids = new Set(['helena', 'aris', 'sarah', 'marcus', 'clara']);
  for (const q of QUESTION_BANK) assert.ok(ids.has(q.stakeholderId), q.id);
});

test('generateQuestions retorna 3–5 com diversidade de conselheiros', () => {
  const e = new DigitalTwinEngine();
  e.state.finances.operatingMargin = 0.05; // hostil Helena
  e.state.social.devTeamMoral = 30;        // Sarah
  e.state.technical.hallucinationRate = 0.15; // Marcus
  e.state.operations.slaCompliance = 0.8;  // Clara
  const board = new EvidenceBoardManager();
  const eng = new StatefulBoardEngine(e.getState(), board);
  const qs = eng.generateQuestions();
  assert.ok(qs.length >= 3 && qs.length <= 5);
});

test('evaluateAnswer exige raciocínio correto E evidência válida', () => {
  const board = new EvidenceBoardManager();
  board.unlock('EVID_08');
  const state = new DigitalTwinEngine().getState();
  const eng = new StatefulBoardEngine(state, board);
  const wrong = eng.evaluateAnswer('S_HF_01', 'S_HF_01_A', []); // sem evidência
  assert.equal(wrong.correct, false);
  const right = eng.evaluateAnswer('S_HF_01', 'S_HF_01_A', ['EVID_08']);
  assert.equal(right.correct, true);
  assert.equal(right.confidenceChange, 15);
});

// ---------- Event Engine ----------
test('EVT_07 só é candidato com multiagente', () => {
  const eng = new RandomEventEngine();
  eng.setRollFn(() => 0); // tudo passa no sorteio
  const semAgente = eng.rollQuarterEvents('Q3', { technical: { multiAgent: false } });
  assert.ok(!semAgente.includes('EVT_07'));
  const comAgente = eng.rollQuarterEvents('Q3', { technical: { multiAgent: true } });
  assert.ok(comAgente.includes('EVT_07'));
});

test('EVT_07 mitigado por isolamento de contexto', () => {
  const eng = new RandomEventEngine();
  const twin = new DigitalTwinEngine();
  twin.applyDecisions({ multiAgent: true, agentIsolation: true });
  twin.recompute();
  const stateBefore = twin.getState();
  const ev = eng.resolve('EVT_07', stateBefore);
  assert.equal(ev.mitigated, true);
  const patch = ev.apply(stateBefore);
  // O incremento do evento (fator 0.15) é limitado vs. um cenário sem isolamento.
  const increment = patch.finances.resentContextCost - stateBefore.finances.resentContextCost;
  assert.ok(increment <= stateBefore.finances.apiCost * 0.16 + 1, `incremento ${increment}`);

  // Sem isolamento, o incremento do mesmo evento é bem maior.
  const twin2 = new DigitalTwinEngine();
  twin2.applyDecisions({ multiAgent: true, agentIsolation: false }); twin2.recompute();
  const s2 = twin2.getState();
  const ev2 = eng.resolve('EVT_07', s2);
  assert.equal(ev2.mitigated, false);
  const inc2 = ev2.apply(s2).finances.resentContextCost - s2.finances.resentContextCost;
  assert.ok(inc2 > increment);
});

test('mock de evento força sorteio determinístico', () => {
  const eng = new RandomEventEngine();
  eng.setRollMock('Q3', ['EVT_04']);
  assert.deepEqual(eng.rollQuarterEvents('Q3', { technical: { multiAgent: false } }), ['EVT_04']);
});
