/**
 * Cálculo de contraste WCAG 2.1 — luminância relativa.
 * Puro, sem DOM, sem dependências: usável em `node --test` e em Playwright.
 *
 * Existe porque nome de cor em prosa ("Azul Cobalto de Precisão") não é fonte
 * de valor hexadecimal. Todo token de cor da página v3.0 é calculado aqui antes
 * de ser escrito em src/apresentacao.css (ADR-ap-001).
 *
 * Referência: WCAG 2.1 — Relative luminance / Contrast ratio.
 */

/** #rgb | #rrggbb → [r, g, b] em 0–255 */
export function parseHex(hex) {
  const h = String(hex).trim().replace(/^#/, '');
  const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
  if (!/^[0-9a-fA-F]{6}$/.test(full)) throw new Error(`hex inválido: ${hex}`);
  return [0, 2, 4].map((i) => parseInt(full.slice(i, i + 2), 16));
}

/** Luminância relativa (WCAG 2.1 §Relative luminance) */
export function luminance(hex) {
  const [r, g, b] = parseHex(hex).map((v) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/** Razão de contraste entre duas cores opacas. Sempre ≥ 1. */
export function contrastRatio(a, b) {
  const la = luminance(a);
  const lb = luminance(b);
  return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
}

/**
 * Compõe uma cor com alfa sobre um fundo opaco. Necessário porque bordas e
 * fundos internos da página usam rgba() — comparar o rgba cru contra o fundo
 * daria um número sem significado perceptual.
 * @param {[number,number,number]} rgb
 * @param {number} alpha 0–1
 * @param {string} bgHex
 */
export function flatten(rgb, alpha, bgHex) {
  const bg = parseHex(bgHex);
  const out = rgb.map((c, i) => Math.round(c * alpha + bg[i] * (1 - alpha)));
  return '#' + out.map((c) => c.toString(16).padStart(2, '0')).join('');
}

/**
 * Extrai `--nome: valor;` do PRIMEIRO bloco `:root { … }` da folha.
 *
 * Ler a folha inteira estaria errado: overrides legítimos dentro de
 * `@media (prefers-reduced-motion: reduce)` sobrescreveriam os valores base e
 * o teste reprovaria um CSS correto. Os tokens declarados são os de `:root`;
 * os overrides são verificados por testes próprios.
 */
export function readTokens(css) {
  const start = css.indexOf(':root');
  if (start === -1) throw new Error('nenhum bloco :root encontrado');
  const open = css.indexOf('{', start);
  const close = css.indexOf('}', open);
  const block = css.slice(open + 1, close);

  const tokens = {};
  for (const m of block.matchAll(/(--ap-[a-z0-9-]+)\s*:\s*([^;]+);/gi)) {
    tokens[m[1]] = m[2].trim();
  }
  return tokens;
}
