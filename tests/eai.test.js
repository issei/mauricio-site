/*
 * Testes de lógica pura (T7) — node:test (built-in, zero dependência).
 * Rodar: `node --test tests/eai.test.js`  ou  `npm run test:unit`.
 * As interações de DOM ficam no Playwright (engenharia-agentes-ia.spec.js).
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';

import { score, SIM_MODEL, explainGuardrail, formatImpact } from '../src/js/eai-sim-model.js';
import { evaluate, insightFor, COMPONENT_INSIGHTS } from '../src/js/eai-playground-rules.js';
import { feedbackFor, scoreMessage, QUIZ } from '../src/js/eai-quiz-data.js';
import { REPO_TREE, flatten } from '../src/js/eai-anatomy-data.js';
import { classifyAutonomy, maturityStage, MATURITY, QUADRANTS } from '../src/js/eai-pilares-model.js';

// ---------- T7.1 — Modelo do simulador ----------
const ALL_ON = { schemas: true, cache: true, ledger: true, human: true, bdd: true, evals: true, observability: true };
const ALL_OFF = { schemas: false, cache: false, ledger: false, human: false, bdd: false, evals: false, observability: false };

test('SimModel: custo nunca abaixo de 30 com qualquer combinação de guardrails', () => {
  // pior caso para o piso de custo: autonomia 0 + todos os redutores de custo ligados
  assert.equal(score({ autonomy: 0, ...ALL_ON }).custo, 30);
  assert.ok(score({ autonomy: 0.5, ...ALL_ON }).custo >= 30);
  assert.ok(score({ autonomy: 1, ...ALL_OFF }).custo >= 30);
});

test('SimModel: risco nunca abaixo de 40 com qualquer combinação', () => {
  assert.equal(score({ autonomy: 0, ...ALL_ON }).risco, 40);
  assert.ok(score({ autonomy: 0.5, ...ALL_ON }).risco >= 40);
});

test('SimModel: ativar Cache reduz custo em exatamente 20 pontos', () => {
  const base = { autonomy: 0.6, ...ALL_OFF }; // custo bem acima do piso, sem outros redutores
  const off = score(base).custo;
  const on = score({ ...base, cache: true }).custo;
  assert.equal(off - on, 20);
});

test('SimModel: ativar Schema reduz risco em exatamente 15 pontos', () => {
  const base = { autonomy: 0.6, ...ALL_OFF };
  const off = score(base).risco;
  const on = score({ ...base, schemas: true }).risco;
  assert.equal(off - on, 15);
});

test('SimModel: autonomia 100% + nenhum guardrail = custo e risco máximos', () => {
  const wild = score({ autonomy: 1, ...ALL_OFF });
  // nenhum outro ponto possível supera este (varredura de combinações)
  for (const a of [0, 0.5, 1]) {
    for (const g of [ALL_OFF, ALL_ON, { schemas: true }]) {
      const s = score({ autonomy: a, ...ALL_OFF, ...g });
      assert.ok(s.custo <= wild.custo, `custo ${s.custo} > ${wild.custo}`);
      assert.ok(s.risco <= wild.risco, `risco ${s.risco} > ${wild.risco}`);
    }
  }
  assert.equal(wild.risco, 100); // 40 + 80 (clamp no teto)
});

test('SimModel: autonomia 0% + todos os guardrails = melhores valores possíveis', () => {
  const best = score({ autonomy: 0, ...ALL_ON });
  assert.equal(best.custo, 30); // piso
  assert.equal(best.risco, 40); // piso
  // confiança e auditabilidade elevadas
  assert.ok(best.confianca >= 60);
  assert.ok(best.auditabilidade >= 60);
});

test('SimModel: determinismo — mesma entrada, mesma saída', () => {
  const inp = { autonomy: 0.37, schemas: true, cache: false, ledger: true, human: false, bdd: true, evals: false, observability: true };
  assert.deepEqual(score(inp), score(inp));
});

test('SimModel: explainGuardrail descreve impacto e razão', () => {
  const e = explainGuardrail('cache', true);
  assert.match(e.title, /ativou/);
  assert.ok(e.impacts.some((i) => i.metric === 'custo' && i.delta === -20));
  assert.equal(formatImpact({ metric: 'custo', delta: -20 }), 'custo −20');
  // desativar inverte o sinal
  const off = explainGuardrail('cache', false);
  assert.ok(off.impacts.some((i) => i.metric === 'custo' && i.delta === 20));
});

test('SimModel: SIM_MODEL e fixture cobrem as 7 chaves de guardrail', () => {
  assert.deepEqual(
    Object.keys(SIM_MODEL.guardrails).sort(),
    ['bdd', 'cache', 'evals', 'human', 'ledger', 'observability', 'schemas']
  );
});

// ---------- T7.2 — Lógica do Playground ----------
test('Playground: LLM sem Schema gera alerta de risco (bad)', () => {
  const { verdicts, sev } = evaluate(new Set(['LLM']));
  assert.equal(sev, 'bad');
  assert.ok(verdicts.some((v) => v.sev === 'bad' && /LLM sem Schema/.test(v.message)));
});

test('Playground: LLM com Schema não gera alerta de Schema ausente', () => {
  const { verdicts } = evaluate(new Set(['LLM', 'Schema', 'Ledger', 'BDD']));
  assert.ok(!verdicts.some((v) => /LLM sem Schema/.test(v.message)));
});

test('Playground: RAG sem Schema gera aviso específico de risco', () => {
  const { verdicts } = evaluate(new Set(['LLM', 'Schema', 'RAG', 'Ledger', 'BDD']));
  // tem Schema, então o aviso RAG-sem-Schema não aparece
  assert.ok(!verdicts.some((v) => /RAG sem Schema/.test(v.message)));
  const semSchema = evaluate(new Set(['RAG']));
  assert.ok(semSchema.verdicts.some((v) => /RAG sem Schema/.test(v.message)));
});

test('Playground: 5+ componentes sem Observabilidade gera aviso de rastreabilidade', () => {
  const { verdicts } = evaluate(new Set(['LLM', 'Schema', 'BDD', 'Ledger', 'Cache']));
  assert.ok(verdicts.some((v) => /5\+ componentes\) sem Observabilidade/.test(v.message)));
});

test('Playground: LLM + Schema + BDD + Ledger gera feedback positivo', () => {
  const { verdicts, sev } = evaluate(new Set(['LLM', 'Schema', 'BDD', 'Ledger', 'Observabilidade']));
  assert.equal(sev, 'good');
  assert.ok(verdicts.some((v) => v.sev === 'good' && /Boa base arquitetural/.test(v.message)));
});

test('Playground: insightFor distingue adicionar de remover', () => {
  assert.match(insightFor('BDD', true), /critério objetivo/);
  assert.match(insightFor('BDD', false), /percepção/);
  assert.equal(insightFor('Inexistente', true), '');
  // todo componente da paleta tem insight de add e remove
  for (const k of Object.keys(COMPONENT_INSIGHTS)) {
    assert.ok(COMPONENT_INSIGHTS[k].add && COMPONENT_INSIGHTS[k].remove);
  }
});

test('Playground: conjunto vazio pede componentes', () => {
  assert.deepEqual(evaluate(new Set()).verdicts, []);
});

// ---------- T7.3 — Quiz ----------
test('Quiz: resposta correta retorna feedback com nome do princípio', () => {
  const fb = feedbackFor('q2', 1); // opção b (correta)
  assert.equal(fb.correct, true);
  assert.match(fb.principle, /P7/);
  assert.match(fb.text, /Open-World/);
});

test('Quiz: resposta errada retorna feedback específico daquela opção (não genérico)', () => {
  const a = feedbackFor('q2', 0); // opção a
  const c = feedbackFor('q2', 2); // opção c
  assert.equal(a.correct, false);
  assert.equal(c.correct, false);
  assert.notEqual(a.text, c.text); // específico por opção
  assert.match(a.text, /Mundo Fechado/);
  assert.match(c.text, /m[ée]dio|fabricad/i);
});

test('Quiz: Q2 (Open-World) tem feedback para as opções A, B e C', () => {
  assert.ok(feedbackFor('q2', 0).text.length > 10);
  assert.ok(feedbackFor('q2', 1).text.length > 10);
  assert.ok(feedbackFor('q2', 2).text.length > 10);
});

test('Quiz: gabarito difere de zero e há quatro faixas distintas', () => {
  const T = QUIZ.length;
  assert.notEqual(scoreMessage(T), scoreMessage(0));
  assert.match(scoreMessage(T), /Excelente/);
  assert.match(scoreMessage(0), /Sem acertos/);
  assert.match(scoreMessage(T - 1), /Quase/);
  // quatro faixas distintas: zero, parcial, quase, gabarito
  const msgs = new Set([scoreMessage(0), scoreMessage(1), scoreMessage(T - 1), scoreMessage(T)]);
  assert.equal(msgs.size, 4);
});

test('Quiz: toda questão tem id, princípio, correct e feedback correto', () => {
  for (const q of QUIZ) {
    assert.ok(q.id && q.principle && q.correct);
    assert.ok(q.feedback.correct);
  }
});

// ---------- T7.4 — Árvore do repositório ----------
test('RepoTree: todos os nós têm name, type e desc', () => {
  for (const node of flatten()) {
    assert.ok(node.name, 'name ausente');
    assert.ok(node.type, `type ausente em ${node.name}`);
    assert.ok(node.desc && node.desc.length > 10, `desc ausente/curta em ${node.name}`);
  }
});

test('RepoTree: raiz tem as 5 pastas-chave', () => {
  const top = REPO_TREE.children.map((c) => c.name);
  for (const f of ['.ai/', 'docs/', 'tests/', 'scripts/', '.github/']) {
    assert.ok(top.includes(f), `pasta ${f} ausente`);
  }
});

test('RepoTree: PROGRESS.md existe e descreve retomada de sessão', () => {
  const progress = flatten().find((n) => n.name === 'PROGRESS.md');
  assert.ok(progress);
  assert.match(progress.desc, /sess[ãa]o|recome[çc]a/i);
});

test('RepoTree: tipos válidos (root/dir/file)', () => {
  for (const node of flatten()) {
    assert.ok(['root', 'dir', 'file'].includes(node.type), `tipo inválido: ${node.type}`);
  }
});

// ---------- Pilares — Calibrador de Autonomia (Pilar 1) ----------
test('Calibrador: os quatro quadrantes da matriz custo × reversibilidade', () => {
  assert.equal(classifyAutonomy({ cost: 10, reversibility: 10 }).quadrant, 'exploracao');
  assert.equal(classifyAutonomy({ cost: 90, reversibility: 10 }).quadrant, 'reversivel-caro');
  assert.equal(classifyAutonomy({ cost: 10, reversibility: 90 }).quadrant, 'irreversivel-barato');
  assert.equal(classifyAutonomy({ cost: 90, reversibility: 90 }).quadrant, 'missao-critica');
});

test('Calibrador: todo quadrante tem label, cerimônia e recomendação', () => {
  for (const q of Object.values(QUADRANTS)) {
    assert.ok(q.label && q.ceremony && q.recommendation && q.recommendation.length > 20);
  }
});

test('Calibrador: vazamento de modo só dispara em exploração + dependência de produção', () => {
  // exploração leve, mas já dependida como produção → vazamento
  assert.equal(classifyAutonomy({ cost: 10, reversibility: 10, dependedInProd: true }).modeLeak, true);
  // exploração sem dependência → sem vazamento
  assert.equal(classifyAutonomy({ cost: 10, reversibility: 10, dependedInProd: false }).modeLeak, false);
  // missão crítica já assume rigor → não é vazamento de modo, mesmo com dependência
  assert.equal(classifyAutonomy({ cost: 90, reversibility: 90, dependedInProd: true }).modeLeak, false);
});

test('Calibrador: determinismo e clamp dos eixos (0–100)', () => {
  const a = classifyAutonomy({ cost: 200, reversibility: -5 });
  assert.equal(a.cost, 100);
  assert.equal(a.reversibility, 0);
  assert.deepEqual(
    classifyAutonomy({ cost: 60, reversibility: 60, dependedInProd: true }),
    classifyAutonomy({ cost: 60, reversibility: 60, dependedInProd: true })
  );
});

// ---------- Pilares — Maturidade (Pilar 4) ----------
test('Maturidade: quatro estágios 0–3, cada um com has/missing/next', () => {
  assert.equal(MATURITY.length, 4);
  MATURITY.forEach((s, i) => {
    assert.equal(s.id, i);
    assert.ok(s.name && s.tagline);
    assert.ok(s.has && s.missing && s.next);
  });
});

test('Maturidade: maturityStage retorna o estágio por id e null fora do intervalo', () => {
  assert.equal(maturityStage(0).name, 'Mágica de Prompt');
  assert.equal(maturityStage(3).name, 'Governado');
  assert.equal(maturityStage(9), null);
});
