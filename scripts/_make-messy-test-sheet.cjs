/* _make-messy-test-sheet.cjs — gera um sheet de TESTE "bagunçado" (estilo IA):
 * fundo branco, 12 figuras com posição/escala jitterada e vãos irregulares.
 * Só pra validar scripts/build-sprite-sheet.cjs. Saída em scratchpad.
 */
const fs = require('fs');
const sharp = require('sharp');

const COLS = 6, ROWS = 2, CW = 220, CH = 340;
const W = COLS * CW, H = ROWS * CH;
const TAU = Math.PI * 2;
// jitter determinístico (sem Math.random pra ser reprodutível)
const jit = (i, a, b) => a + ((Math.sin(i * 12.9898) * 43758.5453) % 1 + 1) % 1 * (b - a);

function figure(phase) {
  const cx = 0, hipY = 150, shY = 90, headY = 48;
  const swing = 26 * Math.sin(TAU * phase);
  const leg = (s) => `<line x1="${cx}" y1="${hipY}" x2="${cx + s * 0.6}" y2="${hipY + 70}" stroke="#23304a" stroke-width="16" stroke-linecap="round"/>`;
  const arm = (s) => `<line x1="${cx}" y1="${shY}" x2="${cx + s * 0.7}" y2="${shY + 55}" stroke="#141414" stroke-width="13" stroke-linecap="round"/>`;
  return `${leg(swing)}${leg(-swing)}${arm(-swing)}
    <rect x="${cx - 18}" y="${shY}" width="36" height="${hipY - shY}" rx="8" fill="#141414"/>
    ${arm(swing)}
    <circle cx="${cx + 3}" cy="${headY}" r="21" fill="#d99a6c" stroke="#0a0a0a" stroke-width="2"/>
    <path d="M ${cx - 16} ${headY - 8} l 5 -13 4 9 5 -14 5 12 5 -11 4 13 q -14 -8 -28 -1 z" fill="#141414"/>
    <rect x="${cx + 1}" y="${headY - 4}" width="15" height="10" rx="2" fill="#cfe6ff" stroke="#0a0a0a" stroke-width="3"/>`;
}

let cells = '';
for (let f = 0; f < 12; f++) {
  const col = f % COLS, row = Math.floor(f / COLS);
  const s = jit(f + 1, 0.97, 1.03);                 // escala ~constante (frames reais)
  const ox = CW / 2 + jit(f + 2, -30, 30);          // deslocamento irregular (desregistro)
  const oy = CH - 70 + jit(f + 7, -34, 22);
  cells += `<g transform="translate(${col * CW + ox},${row * CH + oy - 240}) scale(${s.toFixed(3)})">${figure(f / 12)}</g>`;
}
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}"><rect width="${W}" height="${H}" fill="#ffffff"/>${cells}</svg>`;

const out = process.argv[2] || 'C:/Users/issei/AppData/Local/Temp/claude/D--projetos-mauricio-site/a89c896b-245b-4e19-ba5f-b94017bcb08b/scratchpad/messy-test-sheet.png';
sharp(Buffer.from(svg)).png().toFile(out).then((i) => console.log('messy ->', out, `${W}x${H}`));
