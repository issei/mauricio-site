/**
 * Motor do Seletor de Perspectiva — lógica pura, sem DOM.
 * ---------------------------------------------------------------------------
 * Separado da view para que timing e debounce sejam testáveis em `node --test`,
 * sem navegador e sem sleep. Padrão já estabelecido no repositório pelos
 * módulos `src/js/eai-*-model.js`.
 *
 * O "debounce implícito" da spec §4.2 NÃO é um setTimeout: é uma fila de
 * transição de estado com profundidade um. Alternar rápido nunca sobrepõe
 * transições nem empilha trabalho — o último pedido vence, os do meio somem.
 *
 * Nenhuma referência a `document` ou `window` pode existir neste arquivo.
 */

/** Estado inicial obrigatório — a densidade técnica é sempre escolha ativa (spec §2.B.3). */
export const DEFAULT_PERSONA = 'exec';

/** Teto duro da spec §2.B.2. Acima disso a transição vira fricção cognitiva. */
export const MAX_TRANSITION_MS = 200;

/**
 * @param {{durationMs?: number}} [opts]
 */
export function createPerspectiveMachine(opts = {}) {
  const durationMs = opts.durationMs ?? 160;
  if (durationMs >= MAX_TRANSITION_MS) {
    throw new RangeError(
      `duração ${durationMs}ms excede o teto de ${MAX_TRANSITION_MS}ms (spec §2.B.2)`
    );
  }

  let current = DEFAULT_PERSONA;
  let pending = null;
  let busy = false;

  return {
    get state() { return current; },
    get busy() { return busy; },
    get pending() { return pending; },
    durationMs,

    /**
     * Pede a troca de persona.
     * @param {'exec'|'eng'} next
     * @returns {'applied'|'queued'|'noop'}
     *   applied — a transição começou agora
     *   queued  — havia uma em curso; esta roda quando aquela terminar
     *   noop    — já estamos nesse estado e nada está em curso
     */
    request(next) {
      if (next !== 'exec' && next !== 'eng') {
        throw new TypeError(`persona inválida: ${next}`);
      }
      if (busy) {
        // Profundidade um de propósito: guardar uma fila real faria a interface
        // "reproduzir" cliques antigos que o visitante já abandonou.
        pending = next === current ? null : next;
        return 'queued';
      }
      if (next === current) return 'noop';
      current = next;
      busy = true;
      return 'applied';
    },

    /**
     * Sinaliza o fim da transição corrente e drena a fila.
     * @returns {'applied'|'noop'}
     */
    settle() {
      busy = false;
      const next = pending;
      pending = null;
      if (next && next !== current) {
        current = next;
        busy = true;
        return 'applied';
      }
      return 'noop';
    },

    /** Volta ao estado inicial. Usado apenas em teste. */
    reset() {
      current = DEFAULT_PERSONA;
      pending = null;
      busy = false;
    },
  };
}

/**
 * A persona oposta. Usada pelo atalho de teclado e pelo toggle.
 * @param {'exec'|'eng'} persona
 */
export function otherPersona(persona) {
  return persona === 'exec' ? 'eng' : 'exec';
}
