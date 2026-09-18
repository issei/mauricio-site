/**
 * Module: verdicts.js
 * Pure logic module for filtering verdicts (PASS, FAIL, UNKNOWN, CONFLICT).
 */

export const VERDICTS = Object.freeze({
  PASS: {
    id: 'PASS',
    label: 'PASS',
    description: 'Execução concluída, oracle identificável, subject/configuração vinculados e condições satisfeitas.',
    colorVar: '--dg-green'
  },
  FAIL: {
    id: 'FAIL',
    label: 'FAIL',
    description: 'Execução válida e condição do oracle violada explicitamente.',
    colorVar: '--dg-red'
  },
  UNKNOWN: {
    id: 'UNKNOWN',
    label: 'UNKNOWN',
    description: 'Não há base suficiente por skip, timeout, abort, erro de harness ou ausência de oracle.',
    colorVar: '--dg-gray'
  },
  CONFLICT: {
    id: 'CONFLICT',
    label: 'CONFLICT',
    description: 'Registros válidos e comparáveis produzem resultados incompatíveis entre si.',
    colorVar: '--dg-magenta'
  }
});

/**
 * Filters a list of items by verdict while keeping an exact count of hidden items.
 * @param {Array<{ id: string, verdict: string, [key: string]: any }>} items
 * @param {string} filter 'ALL' | 'PASS' | 'FAIL' | 'UNKNOWN' | 'CONFLICT'
 * @returns {{ visibleItems: Array, hiddenCount: number, totalCount: number }}
 */
export function filterVerdicts(items, filter = 'ALL') {
  if (!Array.isArray(items)) {
    return { visibleItems: [], hiddenCount: 0, totalCount: 0 };
  }
  const totalCount = items.length;
  const normalizedFilter = String(filter).trim().toUpperCase();

  if (normalizedFilter === 'ALL') {
    return { visibleItems: [...items], hiddenCount: 0, totalCount };
  }

  const visibleItems = items.filter(item => {
    return item && String(item.verdict).trim().toUpperCase() === normalizedFilter;
  });

  const hiddenCount = totalCount - visibleItems.length;

  return { visibleItems, hiddenCount, totalCount };
}
