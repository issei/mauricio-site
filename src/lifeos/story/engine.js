// CMP-08 StoryEngine — CTR-01 / NAR-*
// Fonte de verdade da fase ativa. Único leitor do STORY_DATA cru.
// Transições: walk (após memory:unlocked) e cd (CLI). Publica phase:changed.

import { bus } from '../core/bus.js';
import { STORY_DATA } from './data.js';

export function createStory(session) {
  const byId = new Map(STORY_DATA.map((m) => [m.id, m]));
  let current = byId.get(session.get().currentPhaseId) ?? STORY_DATA[0];

  function change(marco, via) {
    const prev = current?.id ?? null;
    current = marco;
    session.set({ currentPhaseId: marco.id });
    bus.publish('phase:changed', { marco, prev, via });
  }

  bus.subscribe('memory:unlocked', ({ marcoId }) => {
    session.unlockMemory(marcoId);
    // Cicatrizes roteirizadas (NAR-01/02): abrir no 6; dourar no 7 é na ENTRADA do marco 7.
    if (marcoId === 'kernel_panic_2004' &&
        !session.get().scars.some((s) => s.scarId === 'scar-2004')) {
      const cells = [];                                    // fissura diagonal no quadrante
      for (let i = 0; i < 22; i++) cells.push([Math.round(-2 + i * 0.35), Math.round(-6 - i * 2)]);
      session.addScar('scar-2004', cells);
      bus.defer('scar:opened', { scarId: 'scar-2004', gridCells: cells });
    }
  });

  return {
    get current() { return current; },
    get all() { return STORY_DATA; },

    // Avanço padrão: chamado pelo fluxo do jogo após fechar o modal da fase atual.
    advance() {
      const next = STORY_DATA.find((m) => m.order === current.order + 1);
      if (!next) return false;                             // HEAD — GMP-06 assume
      change(next, 'walk');
      this._onEnter(next);
      return true;
    },

    // CTR-05 `cd <ano>` — teleporta; memórias não desbloqueiam por cd.
    cdToYear(year) {
      const marco = STORY_DATA.find((m) => m.year === Number(year));
      if (!marco) return null;
      change(marco, 'cd');
      this._onEnter(marco);
      return marco;
    },

    isUnlocked: (id) => session.get().unlockedMemories.includes(id),

    _onEnter(marco) {                                      // efeitos de entrada de quadrante
      if (marco.id === 'graduation_delivery') {            // NAR-02: solda de 2004 ao ENTRAR no 7
        const sc = session.get().scars.find((s) => s.scarId === 'scar-2004');
        if (sc && sc.state === 'open') {
          session.gildScar('scar-2004');
          bus.defer('scar:gilded', { scarId: 'scar-2004', durationMs: 4000 }); // versão curta (AUD-02)
        }
      }
    },

    boot() {                                               // sincronização inicial
      change(current, 'walk');
    },
  };
}
