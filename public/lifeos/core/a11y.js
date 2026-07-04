// CMP-18 AccessibilityManager — ACC-01
// Flags: reducedMotion (default: media query) e safeMode (default: off).
// Override por `config set` (CLI). Persistem via SessionState; publicam a11y:changed.

import { bus } from './bus.js';

export function createA11y(session) {
  const saved = session.get().a11y;
  const mq = globalThis.matchMedia?.('(prefers-reduced-motion: reduce)');
  const flags = {
    safeMode: saved.safeMode,
    reducedMotion: saved.reducedMotion ?? (mq?.matches ?? false),
  };

  function announce() {
    bus.publish('a11y:changed', { ...flags });
  }

  mq?.addEventListener?.('change', (e) => {
    if (session.get().a11y.reducedMotion === null) {   // sem override do usuário
      flags.reducedMotion = e.matches;
      announce();
    }
  });

  return {
    get: () => ({ ...flags }),

    // CTR-05: `config set safe-mode on|off` · `config set motion reduced|full`
    configSet(key, value) {
      if (key === 'safe-mode' && ['on', 'off'].includes(value)) {
        flags.safeMode = value === 'on';
        session.set({ a11y: { ...session.get().a11y, safeMode: flags.safeMode } });
        announce();
        return `safe-mode: ${value}`;
      }
      if (key === 'motion' && ['reduced', 'full'].includes(value)) {
        flags.reducedMotion = value === 'reduced';
        session.set({ a11y: { ...session.get().a11y, reducedMotion: flags.reducedMotion } });
        announce();
        return `motion: ${value}`;
      }
      return null;                                     // parser trata como args inválidos
    },

    announce,                                          // boot inicial (sincronizar consumidores)
  };
}
