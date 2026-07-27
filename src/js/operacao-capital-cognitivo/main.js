/*
 * Ponto de entrada — Operação Capital Cognitivo (spec doc 01).
 * Orquestra a state machine de cenas, instancia os motores e conecta a UI.
 */
import { DigitalTwinEngine } from './digital-twin.js';
import { EvidenceBoardManager } from './evidence-board.js';
import { StatefulBoardEngine } from './board-engine.js';
import { RandomEventEngine } from './event-engine.js';
import { updateHUD, renderBreadcrumb, revealHudFields } from './hud.js';
import { showEvidenceToast, renderEvidencePanel, openEvidencePanel, closeEvidencePanel } from './evidence-ui.js';
import { renderObjectiveBar, openHelp, openGlossary } from './guide.js';
import * as Chapters from './chapters.js';

const engine = new DigitalTwinEngine();
const board = new EvidenceBoardManager();
const boardEngine = new StatefulBoardEngine(engine.getState(), board);
const eventEngine = new RandomEventEngine();

const done = new Set();
let currentChapter = 0;
let initialized = new Set();

board.onUnlock((card) => { showEvidenceToast(card); renderEvidencePanel(board); });

const SCENES = {
  intro: 'scene-intro', 1: 'scene-cap1', 2: 'scene-cap2', 3: 'scene-cap3',
  4: 'scene-cap4', 5: 'scene-cap5', 6: 'scene-cap6',
  transfer: 'scene-transfer', victory: 'scene-victory', failure: 'scene-failure',
};

function showScene(key) {
  document.querySelectorAll('.scene').forEach((s) => { s.hidden = true; s.setAttribute('aria-hidden', 'true'); });
  const id = SCENES[key];
  const scene = document.getElementById(id);
  if (scene) { scene.hidden = false; scene.setAttribute('aria-hidden', 'false'); }
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function refresh() {
  updateHUD(engine.getState());
  renderEvidencePanel(board);
}

const ctx = {
  complete(n) { done.add(n); goToChapter(n + 1); },
  refresh,
  endGame(outcome) { showEndGame(outcome); },
  finishGame() { showEndGame('VICTORY', true); },
};

const CHAPTER_INIT = {
  1: Chapters.initCap1, 2: Chapters.initCap2, 3: Chapters.initCap3,
  4: Chapters.initCap4, 5: Chapters.initCap5, 6: Chapters.initCap6,
};

function goToChapter(n) {
  if (n > 6) { startBoardOutcome(); return; }
  currentChapter = n;
  document.getElementById('hud').hidden = false;
  document.getElementById('sim-toolbar').hidden = false;
  revealHudFields(n);
  showScene(n);
  renderBreadcrumb(n, done);
  renderObjectiveBar(n);
  const back = document.getElementById('btn-back');
  if (back) back.disabled = n <= 1;
  if (!initialized.has(n)) {
    initialized.add(n);
    CHAPTER_INIT[n]({ engine, board, boardEngine, eventEngine, ctx });
  }
  refresh();
}

function hideChrome() {
  document.getElementById('sim-toolbar').hidden = true;
  document.getElementById('objective-bar').hidden = true;
}

function startBoardOutcome() { /* Cap 6 chama ctx.endGame diretamente */ }

function showEndGame(outcome, fromTransfer = false) {
  document.getElementById('objective-bar').hidden = true;
  if (outcome === 'VICTORY' && !fromTransfer) {
    showScene('transfer');
    if (!initialized.has('transfer')) { initialized.add('transfer'); Chapters.initTransfer({ ctx }); }
    return;
  }
  if (outcome === 'VICTORY') {
    showScene('victory');
    document.getElementById('victory-text').textContent =
      `Você defendeu o Capital Cognitivo da Nexus Tech Corp. UI/$ final: ${engine.getState().metrics.globalUI.toFixed(2)} · Capital Cognitivo: ${Math.round(engine.getState().metrics.cognitiveCapitalIndex)}/100.`;
    return;
  }
  showScene('failure');
  const reasons = {
    FAILURE_CASH: 'Insolvência: o caixa chegou a zero. A CFO Helena vetou a operação.',
    FAILURE_MORALE: 'A equipe entrou em colapso — a VP Ops Sarah pediu demissão coletiva.',
    FAILURE_TRUST: 'Voto de desconfiança: o Conselho não se convenceu das suas decisões.',
  };
  document.getElementById('failure-text').textContent = reasons[outcome] || reasons.FAILURE_TRUST;
}

function restart() {
  engine.reset(); done.clear(); initialized.clear(); currentChapter = 0;
  hideChrome();
  document.getElementById('hud').hidden = true;
  ['ui', 'capital', 'vcore', 'sla'].forEach((k) => document.querySelectorAll(`[data-hud="${k}"]`).forEach((el) => (el.hidden = true)));
  renderBreadcrumb(0, done);
  showScene('intro');
}

// ----- Wiring global -----
document.getElementById('btn-start')?.addEventListener('click', () => goToChapter(1));
document.getElementById('btn-replay')?.addEventListener('click', () => restart());
document.getElementById('btn-open-evidence')?.addEventListener('click', () => { renderEvidencePanel(board); openEvidencePanel(); });
document.getElementById('evidence-panel-close')?.addEventListener('click', closeEvidencePanel);

// Barra de controles amigável
document.getElementById('btn-back')?.addEventListener('click', () => { if (currentChapter > 1) goToChapter(currentChapter - 1); });
document.getElementById('btn-restart')?.addEventListener('click', () => { if (confirm('Recomeçar do início? Seu progresso nesta sessão será perdido.')) restart(); });
document.getElementById('btn-help')?.addEventListener('click', () => openHelp(currentChapter || 1));
document.getElementById('btn-glossary')?.addEventListener('click', () => openGlossary());
document.getElementById('btn-glossary-intro')?.addEventListener('click', () => openGlossary());
document.getElementById('help-close')?.addEventListener('click', () => document.getElementById('help-dialog').close());
document.getElementById('glossary-close')?.addEventListener('click', () => document.getElementById('glossary-dialog').close());

// ----- Debug API (apenas DEV) — contrato do doc 10 §1.6 -----
if (import.meta.env && import.meta.env.DEV) {
  window.__DEBUG_getState = () => engine.getState();
  window.__DEBUG_setState = (partial) => { for (const [k, v] of Object.entries(partial)) engine.state[k] = { ...engine.state[k], ...v }; engine.recompute(); refresh(); };
  window.__DEBUG_completeChapter = (n) => { done.add(n); goToChapter(n); };
  window.__DEBUG_skipToChapter = (n) => { for (let i = 1; i < n; i++) done.add(i); goToChapter(n); };
  window.__DEBUG_reset = () => { engine.reset(); done.clear(); initialized.clear(); refresh(); };
  window.__DEBUG_triggerEvent = (id) => { const ev = eventEngine.resolve(id, engine.getState()); if (ev) { engine.stepQuarter({}, ev); refresh(); } };
  window.__DEBUG_setEventMock = (q, ids) => eventEngine.setRollMock(q, ids);
  window.__DEBUG_setWorkloadComplexity = (n) => engine.setWorkloadComplexity(n);
  window.__DEBUG_humanCostAtVcore = (v) => engine._humanReworkCostWith({ verificationLoad: v });
}

// Estado inicial: só a intro.
renderBreadcrumb(0, done);
