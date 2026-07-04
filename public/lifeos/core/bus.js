// CMP-15 EventBus — CTR-02 / ADR-003
// Pub/sub síncrono em memória. Catálogo fechado (CTR-02); payloads congelados;
// exceção em handler não interrompe os demais; defer = fila de próximo frame.

const KNOWN = new Set([
  'phase:changed', 'player:moved', 'player:idle',
  'monolith:reveal-start', 'monolith:decode-progress', 'memory:unlocked',
  'metric:paged', 'avatar:version-changed',
  'scar:opened', 'scar:gilded',
  'cli:opened', 'cli:closed', 'cli:command',
  'cue:trigger', 'vale:act1', 'vale:act2', 'vale:act3', 'vale:merge-resolved',
  'companion:speak', 'a11y:changed', 'audio:unlocked',
]);

const handlers = new Map();          // nome -> Set<fn>
const deferred = [];                 // [{name, payload}]

export const bus = {
  subscribe(name, fn) {
    if (!KNOWN.has(name)) throw new Error(`bus: evento desconhecido '${name}'`);
    if (!handlers.has(name)) handlers.set(name, new Set());
    handlers.get(name).add(fn);
    return () => handlers.get(name)?.delete(fn);
  },

  publish(name, payload = {}) {
    if (!KNOWN.has(name)) throw new Error(`bus: evento desconhecido '${name}'`);
    const frozen = Object.freeze(payload);
    const set = handlers.get(name);
    if (!set) return;
    for (const fn of [...set]) {
      try { fn(frozen); }
      catch (err) { console.error(`[bus] handler de '${name}' falhou:`, err); }
    }
  },

  // CTR-02 RG-02: handlers não publicam sincronicamente dentro de si.
  defer(name, payload = {}) {
    if (!KNOWN.has(name)) throw new Error(`bus: evento desconhecido '${name}'`);
    deferred.push({ name, payload });
  },

  // Chamado 1x por frame pelo SceneCore (ou por testes).
  flush() {
    while (deferred.length) {
      const { name, payload } = deferred.shift();
      bus.publish(name, payload);
    }
  },

  _reset() { handlers.clear(); deferred.length = 0; }, // testes
};
