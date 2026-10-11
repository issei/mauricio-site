// Gate por impacto (docs/specs/QUALITY_GATE_PARALELO.md, P1).
//
// O gate local exporta GATE_PAGES=slug1,slug2 com as páginas tocadas pela
// mudança. As specs transversais (que visitam várias páginas) declaram cada
// teste com `testDoGate(test, 'pagina')(titulo, fn)`, ou, num describe inteiro,
// `test.skip(foraDoGate('pagina'), FORA_DO_GATE)`: só roda o que a mudança
// pode ter afetado.
//
// Sem GATE_PAGES (CI, `npm run gate -- --full`, `npx playwright test` direto),
// foraDoGate() é sempre false e a suíte roda inteira, como antes.

/** 'en/devin.html', '/devin.html', 'devin' → 'devin'; '/' → 'index'. */
export const slugDe = (p) => String(p).replace(/^\/+/, '').replace(/^en(\/|$)/, '').replace(/\.html$/, '') || 'index';

const paginas = process.env.GATE_PAGES
  ? new Set(process.env.GATE_PAGES.split(',').filter(Boolean).map(slugDe))
  : null;

/** true quando o gate por impacto está ativo e nenhuma das páginas foi tocada. */
export const foraDoGate = (...ps) => !!paginas && !ps.some((p) => paginas.has(slugDe(p)));

export const FORA_DO_GATE = 'fora do gate por impacto (GATE_PAGES)';

/**
 * `testDoGate(test, 'pagina')(titulo, fn)`: declara o teste já pulado quando a
 * página está fora do gate. Diferente de `test.skip(cond)` no corpo, não abre
 * página nem contexto para depois pular.
 */
export const testDoGate = (test, ...ps) => (foraDoGate(...ps) ? test.skip : test);
