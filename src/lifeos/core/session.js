// CMP-16 SessionState — CTR-08 / SEC-01 RG-03
// Estado persistente único. localStorage tratado como input hostil:
// validação campo a campo; qualquer inválido descarta o save inteiro.

const KEY = 'lifeos.session.v1';
const MAX_READ = 64 * 1024;                      // SEC-01 §extremos
const PHASE_IDS = [
  'initial_commit', 'moral_kernel', 'first_deploy', 'incident_queue',
  'parallel_overload', 'kernel_panic_2004', 'graduation_delivery',
  '2011_merge_request', 'fork_daughter', 'fork_twins_x2',
  'kintsugi_rebase', 'head_2026',
];

function freshState() {
  return {
    schemaVersion: 1,
    unlockedMemories: [],
    currentPhaseId: 'initial_commit',
    scars: [],                                   // {scarId, state:'open'|'gilded', gridCells:[[x,z]]}
    valeResolved: false,
    avatarSeenVersions: [],
    a11y: { safeMode: false, reducedMotion: null },
    audioUnlocked: false,                        // nunca persistido como true (CTR-08 RG-03)
    stats: { totalWalkUnits: 0, cliCommandsUsed: 0 },
  };
}

function validate(s) {                           // true = save íntegro
  try {
    if (s.schemaVersion !== 1) return false;
    if (!Array.isArray(s.unlockedMemories) ||
        !s.unlockedMemories.every((id) => PHASE_IDS.includes(id))) return false;
    if (!PHASE_IDS.includes(s.currentPhaseId)) return false;
    if (!Array.isArray(s.scars) || !s.scars.every((sc) =>
      typeof sc.scarId === 'string' && ['open', 'gilded'].includes(sc.state) &&
      Array.isArray(sc.gridCells) && sc.gridCells.every(
        (c) => Array.isArray(c) && c.length === 2 && c.every(Number.isFinite)))) return false;
    if (typeof s.valeResolved !== 'boolean') return false;
    if (!Array.isArray(s.avatarSeenVersions) ||
        !s.avatarSeenVersions.every((v) => Number.isInteger(v) && v >= 1 && v <= 5)) return false;
    if (typeof s.a11y?.safeMode !== 'boolean') return false;
    if (s.a11y.reducedMotion !== null && typeof s.a11y.reducedMotion !== 'boolean') return false;
    if (!Number.isFinite(s.stats?.totalWalkUnits) || !Number.isFinite(s.stats?.cliCommandsUsed)) return false;
    return true;
  } catch { return false; }
}

let storageOk = true;
let state = freshState();
let saveTimer = null;
let warned = false;

function load(storage) {
  try {
    const raw = storage.getItem(KEY);
    if (!raw) return;
    if (raw.length > MAX_READ) throw new Error('save excede limite');
    const parsed = JSON.parse(raw);
    parsed.audioUnlocked = false;                // CTR-08 RG-03
    if (validate(parsed)) state = parsed;
    else console.warn('[session] sessão anterior incompatível — novo boot.');
  } catch { /* corrupção → estado limpo, silencioso (CTR-08 RG-06) */ }
}

function persist(storage) {
  if (!storageOk) return;
  clearTimeout(saveTimer);
  saveTimer = setTimeout(() => {                 // debounce 500ms (RG-04)
    try {
      const copy = { ...state, audioUnlocked: false };
      storage.setItem(KEY, JSON.stringify(copy));
    } catch {
      storageOk = false;                         // modo memória (§extremos)
      if (!warned) { warned = true; console.warn('[session] armazenamento indisponível — modo memória.'); }
    }
  }, 500);
}

export function createSession(storage = globalThis.localStorage) {
  const store = storage ?? { getItem: () => null, setItem: () => { throw new Error('no storage'); } };
  load(store);
  return {
    get: () => state,
    set(patch) { Object.assign(state, patch); persist(store); },
    unlockMemory(id) {
      if (!state.unlockedMemories.includes(id)) {   // append-only (RG-02)
        state.unlockedMemories.push(id); persist(store);
      }
    },
    addScar(scarId, gridCells) {
      if (!state.scars.some((s) => s.scarId === scarId)) {
        state.scars.push({ scarId, state: 'open', gridCells }); persist(store);
      }
    },
    gildScar(scarId) {                              // open→gilded, nunca reverte (RG-01)
      const sc = state.scars.find((s) => s.scarId === scarId);
      if (sc && sc.state === 'open') { sc.state = 'gilded'; persist(store); }
    },
    reset() {                                       // GMP-06 RG-04: apaga TUDO
      state = freshState();
      try { store.removeItem?.(KEY); } catch { /* ok */ }
    },
    _flushNow() { clearTimeout(saveTimer); try { store.setItem(KEY, JSON.stringify({ ...state, audioUnlocked: false })); } catch { /* ok */ } },
  };
}
