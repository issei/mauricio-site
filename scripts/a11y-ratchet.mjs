/*
 * Catraca (ratchet) da varredura de acessibilidade.
 *
 * Contrato: a dívida só desce. Cada contador (página × regra) medido é comparado
 * ao baseline gravado:
 *   - medido > baseline  → REGRESSÃO  (falha)
 *   - medido < baseline  → MELHORIA   (falha até regravar o baseline — assim a
 *                                      dívida paga não pode voltar em silêncio)
 *   - igual              → ok
 * Página nova não tem baseline: tudo que ela medir acima de zero é regressão.
 *
 * Função pura, sem I/O — coberta por tests/a11y-ratchet.test.mjs.
 */

/** @typedef {Record<string, Record<string, number>>} Counters  página → chave → contagem */

/**
 * @param {Counters} baseline
 * @param {Counters} measured
 * @returns {{regressions: string[], improvements: string[]}}
 */
export function compare(baseline, measured) {
  const regressions = [];
  const improvements = [];
  const pages = new Set([...Object.keys(baseline), ...Object.keys(measured)]);
  for (const page of [...pages].sort()) {
    const b = baseline[page] ?? {};
    const m = measured[page] ?? {};
    const keys = new Set([...Object.keys(b), ...Object.keys(m)]);
    for (const key of [...keys].sort()) {
      const before = b[key] ?? 0;
      const now = m[key] ?? 0;
      if (now > before) regressions.push(`${page} ${key}: ${before} → ${now}`);
      else if (now < before) improvements.push(`${page} ${key}: ${before} → ${now}`);
    }
  }
  return { regressions, improvements };
}

/** Remove zeros e páginas vazias — o baseline lista só o que ainda é dívida. */
export function prune(counters) {
  const out = {};
  for (const [page, keys] of Object.entries(counters)) {
    const kept = Object.fromEntries(Object.entries(keys).filter(([, n]) => n > 0).sort(([a], [b]) => a.localeCompare(b)));
    if (Object.keys(kept).length) out[page] = kept;
  }
  return Object.fromEntries(Object.entries(out).sort(([a], [b]) => a.localeCompare(b)));
}
