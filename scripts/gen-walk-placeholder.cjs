/* gen-walk-placeholder.cjs — gera um sprite sheet PLACEHOLDER do andarilho.
 * Grade 6 colunas × 2 linhas = 12 frames de um walk cycle (vista lateral, → direita).
 * Saída: public/fotos/sprite-mauricio-walk.placeholder.svg
 *
 * É só um stand-in limpo (grade regular) pra validar o mecanismo de animação.
 * Quando o PNG real (public/fotos/sprite-mauricio-walk.png) existir, o componente
 * o usa no lugar — mesma geometria de grade (6×2), zero reconfiguração.
 *
 * Uso:  node scripts/gen-walk-placeholder.cjs
 */
const fs = require('fs');
const path = require('path');

const COLS = 6, ROWS = 2, FRAMES = 12;
const CW = 160, CH = 260;            // tamanho de cada célula
const W = COLS * CW, H = ROWS * CH;  // 960 × 520

// paleta fiel à referência (chibi de óculos, camiseta preta, jeans escuro)
const C = {
  outline: '#0a0a0a',
  skin: '#d99a6c', skinShade: '#bd824f',
  hair: '#141414', shirt: '#141414', shirtShade: '#000000',
  jeans: '#2b3a55', jeansShade: '#1f2c41',
  shoe: '#111111',
  glass: '#0a0a0a', lens: '#cfe6ff',
  shadow: 'rgba(0,0,0,.28)',
};

const TAU = Math.PI * 2;
const deg = (d) => (d * Math.PI) / 180;
// extremidade de um segmento a partir de (x,y) com ângulo medido do eixo +Y (pra baixo)
const seg = (x, y, ang, len) => [x + Math.sin(ang) * len, y + Math.cos(ang) * len];

function leg(hx, hy, phase) {
  const thigh = 40, calf = 38;
  const thighAng = deg(24) * Math.sin(TAU * phase);            // balanço fwd/back
  const kneeBend = deg(8) + deg(40) * (0.5 - 0.5 * Math.cos(TAU * phase)); // dobra ao recuar
  const [kx, ky] = seg(hx, hy, thighAng, thigh);
  const [fx, fy] = seg(kx, ky, thighAng + kneeBend, calf);
  return { kx, ky, fx, fy, thighAng, footAng: thighAng + kneeBend };
}

function arm(sx, sy, phase) {
  const upper = 30, fore = 28;
  const shAng = deg(22) * Math.sin(TAU * phase);              // oposto à perna do mesmo lado
  const elbow = deg(18) + deg(22) * (0.5 - 0.5 * Math.cos(TAU * phase));
  const [ex, ey] = seg(sx, sy, shAng, upper);
  const [hx, hy] = seg(ex, ey, shAng + elbow, fore);
  return { ex, ey, hx, hy };
}

function frameSVG(f) {
  const p = f / FRAMES;                 // 0..1 ao longo do ciclo
  const bob = -Math.abs(Math.sin(TAU * 2 * p)) * 4;  // corpo sobe/desce 2× por ciclo
  const cx = CW / 2;                    // eixo do corpo
  const groundY = 232;
  const hipY = 150 + bob;
  const shoulderY = 96 + bob;
  const headCY = 60 + bob;

  // perna A (frente) e B (trás) em contrafase; braços opostos às pernas
  const legBack = leg(cx, hipY, p + 0.5);
  const legFront = leg(cx, hipY, p);
  const armBack = arm(cx, shoulderY, p);        // oposto à perna da frente
  const armFront = arm(cx, shoulderY, p + 0.5);

  const limb = (a, b, w, col) =>
    `<line x1="${a[0].toFixed(1)}" y1="${a[1].toFixed(1)}" x2="${b[0].toFixed(1)}" y2="${b[1].toFixed(1)}" stroke="${col}" stroke-width="${w}" stroke-linecap="round"/>`;
  const foot = (fx, fy, ang) => {
    const [tx, ty] = seg(fx, fy, ang + deg(90), 16); // pé aponta pra frente
    return `<line x1="${fx.toFixed(1)}" y1="${fy.toFixed(1)}" x2="${tx.toFixed(1)}" y2="${ty.toFixed(1)}" stroke="${C.shoe}" stroke-width="11" stroke-linecap="round"/>`;
  };

  return `
  <g transform="translate(${(f % COLS) * CW},${Math.floor(f / COLS) * CH})">
    <ellipse cx="${cx}" cy="${groundY + 14}" rx="34" ry="7" fill="${C.shadow}"/>
    <!-- membros de trás (mais escuros) -->
    ${limb([armBack.ex, armBack.ey], [armBack.hx, armBack.hy], 12, C.shirtShade)}
    ${limb([cx, shoulderY], [armBack.ex, armBack.ey], 13, C.shirtShade)}
    ${foot(legBack.fx, legBack.fy, legBack.footAng)}
    ${limb([legBack.kx, legBack.ky], [legBack.fx, legBack.fy], 13, C.jeansShade)}
    ${limb([cx, hipY], [legBack.kx, legBack.ky], 15, C.jeansShade)}
    <!-- pernas da frente -->
    ${foot(legFront.fx, legFront.fy, legFront.footAng)}
    ${limb([legFront.kx, legFront.ky], [legFront.fx, legFront.fy], 14, C.jeans)}
    ${limb([cx, hipY], [legFront.kx, legFront.ky], 16, C.jeans)}
    <!-- torso (camiseta preta) -->
    <path d="M ${cx - 19} ${shoulderY - 2} Q ${cx} ${shoulderY - 8} ${cx + 19} ${shoulderY - 2}
             L ${cx + 16} ${hipY} Q ${cx} ${hipY + 8} ${cx - 16} ${hipY} Z" fill="${C.shirt}"/>
    <!-- braço da frente -->
    ${limb([armFront.ex, armFront.ey], [armFront.hx, armFront.hy], 12, C.skin)}
    ${limb([cx, shoulderY], [armFront.ex, armFront.ey], 13, C.shirt)}
    <!-- pescoço (conecta cabeça ao tronco) -->
    ${limb([cx + 3, shoulderY - 2], [cx + 3, shoulderY - 16], 12, C.skin)}
    <!-- cabeça -->
    <circle cx="${cx + 4}" cy="${headCY}" r="22" fill="${C.skin}" stroke="${C.outline}" stroke-width="2"/>
    <!-- cabelo espetado -->
    <path d="M ${cx - 18} ${headCY - 6}
             l 4 -14 4 10 4 -16 5 12 5 -12 4 14 4 -7 3 11
             q -16 -10 -33 -1 z" fill="${C.hair}"/>
    <!-- óculos retangular preto -->
    <rect x="${cx + 0}" y="${headCY - 4}" width="16" height="11" rx="2" fill="${C.lens}" stroke="${C.glass}" stroke-width="3"/>
    <line x1="${cx + 16}" y1="${headCY + 1}" x2="${cx + 22}" y2="${headCY - 1}" stroke="${C.glass}" stroke-width="2"/>
    <!-- sorriso leve -->
    <path d="M ${cx + 14} ${headCY + 13} q 5 4 9 0" fill="none" stroke="${C.skinShade}" stroke-width="2" stroke-linecap="round"/>
  </g>`;
}

let cells = '';
for (let f = 0; f < FRAMES; f++) cells += frameSVG(f);

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">
  <title>Placeholder walk cycle — Maurício (andarilho)</title>
${cells}
</svg>
`;

const out = path.join(__dirname, '..', 'public', 'fotos', 'sprite-mauricio-walk.placeholder.svg');
fs.writeFileSync(out, svg);
console.log('ok ->', path.relative(path.join(__dirname, '..'), out), `(${W}x${H}, ${FRAMES} frames, grade ${COLS}x${ROWS})`);
