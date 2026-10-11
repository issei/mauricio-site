// Seleção por impacto do gate local (docs/specs/QUALITY_GATE_PARALELO.md, P1).
//
// Função pura: recebe os arquivos alterados, as páginas e as specs existentes e
// decide o que o Playwright e a varredura a11y precisam rodar. Na dúvida, o
// arquivo é tratado como COMPARTILHADO e o gate escala para a suíte inteira:
// errar para mais custa minutos; errar para menos deixa passar regressão.

/** Arquivos que não afetam nenhuma página renderizada. */
const SEM_IMPACTO = [
  /^docs\//, /^knowledge\//, /^\.claude\//, /^\.agents\//, /^\.github\//,
  /^[^/]+\.md$/,                        // README, REPORT, AGENTS, EXCEPTIONS… na raiz
  /^tests\/[^/]+\.test\.(mjs|js)$/,     // invariantes node:test rodam sempre
  /^scripts\/i18n\/i18n-manifest\.json$/,
  /^public\/og-[^/]+\.png$/,
  // pages.mjs é a fonte dos blocos AEO; o efeito aparece nos .html regenerados,
  // que já entram na seleção como páginas tocadas.
  /^scripts\/seo\/pages\.mjs$/,
];

/** Nome de arquivo/pasta que não é slug de página → página(s). */
const APELIDOS = [
  [/^eai(-|$)/, ['engenharia-agentes-ia']],
];

/** Specs que percorrem várias páginas: rodam filtradas por GATE_PAGES. */
export const TRANSVERSAIS = [
  'tests/a11y/consent.spec.js', 'tests/a11y/focus-visible.spec.js', 'tests/a11y/independent.spec.js',
  'tests/a11y/label-in-name.spec.js', 'tests/a11y/reflow-zoom.spec.js', 'tests/a11y/tasks.spec.js',
  'tests/a11y/widgets.spec.js', 'tests/aeo.spec.js', 'tests/hreflang.spec.js', 'tests/webmcp.spec.js',
];

const norm = (f) => f.replace(/\\/g, '/').replace(/^\.\//, '');

/** Nome-raiz → slugs de página: exato, apelido ou prefixo ('formulacao' → 'formulacao-de-problemas'). */
function paginasDoNome(nome, slugs) {
  for (const [re, ps] of APELIDOS) if (re.test(nome)) return ps.filter((p) => slugs.includes(p));
  return slugs.filter((s) => s === nome || s.startsWith(`${nome}-`));
}

/**
 * Classifica um arquivo alterado.
 * @returns {{tipo:'nada'}|{tipo:'paginas',paginas:string[]}|{tipo:'tudo',motivo:string}}
 */
export function classificar(arquivo, slugs) {
  const f = norm(arquivo);
  if (SEM_IMPACTO.some((re) => re.test(f))) return { tipo: 'nada' };

  // Specs: a de uma página vira a página (roda ela e as transversais da página);
  // mexer numa transversal ou num helper muda o critério de todas → suíte inteira.
  if (f.startsWith('tests/')) {
    if (TRANSVERSAIS.includes(f) || f.startsWith('tests/_helpers/')) return { tipo: 'tudo', motivo: f };
    const m = f.match(/^tests\/([^/]+?)(\.[a-z]+)?\.spec\.js$/);
    const ps = m ? paginasDoNome(m[1], slugs) : [];
    return ps.length ? { tipo: 'paginas', paginas: ps } : { tipo: 'tudo', motivo: f };
  }

  let m;
  if ((m = f.match(/^src\/(?:en\/)?([^/]+)\.html$/))) return { tipo: 'paginas', paginas: [m[1]] };
  if ((m = f.match(/^public\/(?:en\/)?([^/]+)\.md$/)) && slugs.includes(m[1])) return { tipo: 'paginas', paginas: [m[1]] };
  if ((m = f.match(/^public\/downloads\/(?:kit-)?([^/]+)\.[^./]+$/))) {
    const ps = paginasDoNome(m[1], slugs);
    if (ps.length) return { tipo: 'paginas', paginas: ps };
  }
  // CSS e JS próprios de uma página: src/<nome>.css, src/js/<nome>.js, src/js/<nome>/**
  if ((m = f.match(/^src\/([^/]+)\.css$/)) || (m = f.match(/^src\/js\/([^/]+?)(?:\.js|\/.*)$/))) {
    const ps = paginasDoNome(m[1], slugs);
    if (ps.length) return { tipo: 'paginas', paginas: ps };
  }
  return { tipo: 'tudo', motivo: f };
}

/**
 * Decide o escopo do gate.
 * @param {string[]} alterados  caminhos relativos à raiz
 * @param {string[]} slugs      páginas (src/*.html sem extensão)
 * @param {string[]} specs      specs existentes (tests/**.spec.js)
 * @returns {{modo:'tudo', motivo:string} | {modo:'impacto', paginas:string[], specs:string[]}}
 */
export function selecionar(alterados, slugs, specs) {
  if (!alterados.length) return { modo: 'tudo', motivo: 'nenhuma mudança em relação a origin/main' };
  const paginas = new Set();
  for (const a of alterados) {
    const c = classificar(a, slugs);
    if (c.tipo === 'tudo') return { modo: 'tudo', motivo: `arquivo compartilhado: ${c.motivo}` };
    if (c.tipo === 'paginas') c.paginas.forEach((p) => paginas.add(p));
  }
  const ps = [...paginas].sort();
  const existentes = specs.map(norm);
  const daPagina = existentes.filter((s) => {
    const m = s.match(/^tests\/([^/]+?)(\.[a-z]+)?\.spec\.js$/);
    return m && !TRANSVERSAIS.includes(s) && paginasDoNome(m[1], ps).length > 0;
  });
  const sel = ps.length ? [...daPagina, ...TRANSVERSAIS.filter((t) => existentes.includes(t))] : [];
  return { modo: 'impacto', paginas: ps, specs: sel.sort() };
}
