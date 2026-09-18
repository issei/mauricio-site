/**
 * Module: epistemic.js
 * Pure logic module for resolving Epistemic Badges.
 * Resolves label to { label, text, icon, colorVar } triple and validates completeness.
 */

export const EPISTEMIC_STATES = Object.freeze({
  ESTABLISHED: {
    label: 'ESTABLISHED',
    text: 'Estabelecido',
    icon: '✓',
    colorVar: '--dg-blue'
  },
  DOCUMENTED: {
    label: 'DOCUMENTED',
    text: 'Documentado',
    icon: '📄',
    colorVar: '--dg-blue'
  },
  PROPOSED: {
    label: 'PROPOSED',
    text: 'Proposta',
    icon: '✦',
    colorVar: '--dg-purple'
  },
  HYPOTHESIS: {
    label: 'HYPOTHESIS',
    text: 'Hipótese',
    icon: '⚡',
    colorVar: '--dg-purple'
  },
  INFERENCE: {
    label: 'INFERENCE',
    text: 'Inferência',
    icon: '↳',
    colorVar: '--dg-purple'
  },
  UNKNOWN: {
    label: 'UNKNOWN',
    text: 'Desconhecido',
    icon: '∅',
    colorVar: '--dg-gray'
  }
});

/**
 * Resolves an epistemic label string to its badge configuration.
 * @param {string} label
 * @returns {{ label: string, text: string, icon: string, colorVar: string }}
 */
export function resolveEpistemicBadge(label) {
  if (!label || typeof label !== 'string') {
    throw new Error(`Invalid epistemic label: ${label}`);
  }
  const normalized = label.trim().toUpperCase();
  const badge = EPISTEMIC_STATES[normalized];
  if (!badge) {
    throw new Error(`Unknown epistemic state label: "${label}"`);
  }
  return { ...badge };
}

/**
 * Validates that an epistemic badge object has all 3 mandatory visual components (text, icon, colorVar).
 * @param {object} badge
 * @returns {boolean}
 */
export function validateEpistemicBadge(badge) {
  if (!badge || typeof badge !== 'object') return false;
  const { text, icon, colorVar } = badge;
  return Boolean(
    typeof text === 'string' && text.trim().length > 0 &&
    typeof icon === 'string' && icon.trim().length > 0 &&
    typeof colorVar === 'string' && colorVar.startsWith('--dg-')
  );
}
