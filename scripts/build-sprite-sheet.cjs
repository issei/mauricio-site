/* build-sprite-sheet.cjs — transforma um sheet "cru" (gerado por IA, fundo branco,
 * frames desalinhados) num SPRITE SHEET limpo e game-ready pro componente do
 * Terminal Evolutivo.
 *
 * Pipeline:
 *   1. decodifica (PNG/JPG/WebP) -> RGBA cru
 *   2. remove o fundo por FLOOD-FILL das bordas (preserva brancos internos:
 *      brilho do olho, lente do óculos) -> alpha = 0 no fundo
 *   3. segmenta os frames por PROJEÇÃO (acha linhas/colunas pelos vãos vazios)
 *      — ou fatia em grade fixa com --grid RxC quando os frames se tocam
 *   4. apara cada frame ao seu bounding box e REALINHA (base/pés no mesmo Y,
 *      centro horizontal) numa célula uniforme
 *   5. compõe um STRIP horizontal (rows=1) e exporta PNG transparente
 *
 * Uso:
 *   node scripts/build-sprite-sheet.cjs <entrada.png> [opções]
 * Opções:
 *   --out <arquivo>     saída (default: public/fotos/sprite-mauricio-walk.png)
 *   --grid RxC          força fatiamento em grade fixa (ex: 2x6 = 2 linhas, 6 cols)
 *   --only a-b,c        usa só esses frames (índices 0-based, em ordem de leitura)
 *   --pad N             padding em px na célula (default 6)
 *   --bg "#rrggbb"      cor de fundo explícita (chroma key); senão usa os cantos.
 *                       IMPORTANTE: o fundo precisa CONTRASTAR com o personagem.
 *                       Personagem é majoritariamente preto (camiseta+cabelo) ->
 *                       use fundo BRANCO ou chroma verde/magenta, NUNCA escuro
 *                       (preto-no-preto: a roupa some junto com o fundo).
 *   --bg-tol N          tolerância de cor do fundo p/ remover (default 42)
 *   --align center|hip  alinhamento horizontal (default center = centro do bbox)
 *   --valign top|bottom|center  alinhamento vertical (default top = cabeça fixa,
 *                       o certo p/ walk cycle: a cabeça mal sobe, os pés é que andam)
 *   --scale N           multiplica a saída (default 1)
 *   --defringe N        passos de remoção do halo branco de borda (default 2;
 *                       0 desliga). Tira pixels claros/cinza na borda do alpha
 *                       sem comer a pele (que é saturada).
 *
 * Imprime um JSON com {frames, cellW, cellH, cols, rows, out} — use cols/rows
 * pra configurar o componente (COLS/ROWS/FRAMES no terminal-evolutivo.html).
 */
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// ---- args ------------------------------------------------------------------
const argv = process.argv.slice(2);
const input = argv.find((a) => !a.startsWith('--'));
const opt = (name, def) => {
  const i = argv.indexOf('--' + name);
  return i >= 0 && argv[i + 1] && !argv[i + 1].startsWith('--') ? argv[i + 1] : def;
};
if (!input) { console.error('uso: node scripts/build-sprite-sheet.cjs <entrada.png> [--grid RxC] [--out ...]'); process.exit(1); }
const OUT = opt('out', path.join('public', 'fotos', 'sprite-mauricio-walk.png'));
const PAD = parseInt(opt('pad', '6'), 10);
const BG_TOL = parseInt(opt('bg-tol', '42'), 10);
const SCALE = parseFloat(opt('scale', '1'));
const GRID = opt('grid', null);          // "RxC"
const ONLY = opt('only', null);          // "0-5,8"
const ALIGN = opt('align', 'center');
const VALIGN = opt('valign', 'top');
const DEFRINGE = parseInt(opt('defringe', '2'), 10);
const BGHEX = opt('bg', null); // cor de fundo explícita "#rrggbb" (chroma key)

// remove o "matte" branco de borda: pixels claros/quase-cinza encostados na
// transparência viram transparentes. Não toca pele (saturada) nem preto.
function defringe(buf, w, h, iters) {
  for (let k = 0; k < iters; k++) {
    const clear = [];
    for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
      const i = (y * w + x) * 4;
      if (buf[i + 3] === 0) continue;
      const r = buf[i], g = buf[i + 1], b = buf[i + 2];
      const mn = Math.min(r, g, b), mx = Math.max(r, g, b);
      if (mn > 186 && mx - mn < 46) { // claro e pouco saturado = halo
        if ((x > 0 && buf[(y * w + x - 1) * 4 + 3] === 0) ||
            (x < w - 1 && buf[(y * w + x + 1) * 4 + 3] === 0) ||
            (y > 0 && buf[((y - 1) * w + x) * 4 + 3] === 0) ||
            (y < h - 1 && buf[((y + 1) * w + x) * 4 + 3] === 0)) clear.push(i);
      }
    }
    for (const i of clear) buf[i + 3] = 0;
    if (!clear.length) break;
  }
}

// despill de chroma: tira a franja com a MESMA cor dominante do fundo (ex: verde)
// nas bordas. Só corta pixels onde o canal dominante do fundo também é o máximo
// e domina os outros — não toca contorno escuro (canais ~iguais), pele (R), nem jeans (B).
function despill(buf, w, h, dom, iters) {
  for (let k = 0; k < iters; k++) {
    const clear = [];
    for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
      const i = (y * w + x) * 4;
      if (buf[i + 3] === 0) continue;
      const c = [buf[i], buf[i + 1], buf[i + 2]];
      const mx = Math.max(c[0], c[1], c[2]);
      const other = dom === 0 ? Math.max(c[1], c[2]) : dom === 1 ? Math.max(c[0], c[2]) : Math.max(c[0], c[1]);
      if (c[dom] === mx && c[dom] - other > 12) { // tingido pela cor do fundo
        if ((x > 0 && buf[(y * w + x - 1) * 4 + 3] === 0) ||
            (x < w - 1 && buf[(y * w + x + 1) * 4 + 3] === 0) ||
            (y > 0 && buf[((y - 1) * w + x) * 4 + 3] === 0) ||
            (y < h - 1 && buf[((y + 1) * w + x) * 4 + 3] === 0)) clear.push(i);
      }
    }
    for (const i of clear) buf[i + 3] = 0;
    if (!clear.length) break;
  }
}

// ---- helpers de índices ----------------------------------------------------
function parseOnly(spec, n) {
  if (!spec) return null;
  const set = new Set();
  for (const part of spec.split(',')) {
    const m = part.split('-').map((x) => parseInt(x, 10));
    if (m.length === 2) for (let i = m[0]; i <= m[1]; i++) set.add(i);
    else set.add(m[0]);
  }
  return [...set].filter((i) => i >= 0 && i < n).sort((a, b) => a - b);
}

(async () => {
  const img = sharp(input).ensureAlpha();
  const meta = await img.metadata();
  const W = meta.width, H = meta.height;
  const { data } = await img.raw().toBuffer({ resolveWithObject: true }); // RGBA
  const A = (x, y) => (y * W + x) * 4;

  // ---- 1) cor de fundo: --bg "#hex" explícito, ou média dos 4 cantos ------
  let br, bg, bb;
  if (BGHEX) {
    const m = BGHEX.replace('#', '');
    br = parseInt(m.slice(0, 2), 16); bg = parseInt(m.slice(2, 4), 16); bb = parseInt(m.slice(4, 6), 16);
  } else {
    const corners = [[0, 0], [W - 1, 0], [0, H - 1], [W - 1, H - 1]];
    br = bg = bb = 0;
    for (const [x, y] of corners) { const i = A(x, y); br += data[i]; bg += data[i + 1]; bb += data[i + 2]; }
    br /= 4; bg /= 4; bb /= 4;
  }
  const bgLum = (br + bg + bb) / 3;
  const bgIsWhite = br > 232 && bg > 232 && bb > 232;
  // canal dominante do fundo (p/ despill de chroma). isChroma = dominância forte.
  const bgArr = [br, bg, bb];
  const bgDom = bgArr.indexOf(Math.max(bgArr[0], bgArr[1], bgArr[2]));
  const bgMid = [...bgArr].sort((a, b) => a - b)[1];
  const isChroma = Math.max(bgArr[0], bgArr[1], bgArr[2]) - bgMid > 40;
  // AVISO: fundo escuro = roupa/cabelo pretos têm a mesma cor do fundo e serão
  // comidos pelo flood-fill onde encostam nele. Chroma key exige fundo contrastante.
  if (bgLum < 90 && !isChroma) { // chroma (verde/magenta) tem lum baixa mas é seguro
    console.warn(`\n⚠️  FUNDO ESCURO detectado (lum≈${bgLum.toFixed(0)}, rgb ${br|0},${bg|0},${bb|0}).`);
    console.warn('   Partes PRETAS do personagem (camiseta, cabelo) vão sumir junto com o fundo.');
    console.warn('   Regenere o sheet com fundo BRANCO chapado ou chroma (verde/magenta).\n');
  }
  const isBgColor = (i) => {
    const dr = data[i] - br, dg = data[i + 1] - bg, db = data[i + 2] - bb;
    if (Math.sqrt(dr * dr + dg * dg + db * db) < BG_TOL) return true;
    // fallback de branco quase puro só quando o fundo já é claro (evita comer
    // brilhos brancos do personagem quando o fundo é chroma/escuro)
    return bgIsWhite && data[i] > 244 && data[i + 1] > 244 && data[i + 2] > 244;
  };

  // ---- 2) flood-fill das bordas -> alpha 0 (preserva interior) -------------
  const visited = new Uint8Array(W * H);
  const stack = [];
  const pushIf = (x, y) => {
    if (x < 0 || y < 0 || x >= W || y >= H) return;
    const p = y * W + x;
    if (visited[p]) return;
    if (isBgColor(p * 4)) { visited[p] = 1; stack.push(p); }
  };
  for (let x = 0; x < W; x++) { pushIf(x, 0); pushIf(x, H - 1); }
  for (let y = 0; y < H; y++) { pushIf(0, y); pushIf(W - 1, y); }
  while (stack.length) {
    const p = stack.pop();
    const x = p % W, y = (p - x) / W;
    data[p * 4 + 3] = 0; // transparente
    pushIf(x + 1, y); pushIf(x - 1, y); pushIf(x, y + 1); pushIf(x, y - 1);
  }

  // máscara de conteúdo (alpha presente)
  const mask = new Uint8Array(W * H);
  for (let p = 0; p < W * H; p++) mask[p] = data[p * 4 + 3] > 24 ? 1 : 0;

  // ---- 3) segmentação ----------------------------------------------------
  function colHas(x, y0, y1) { for (let y = y0; y < y1; y++) if (mask[y * W + x]) return true; return false; }
  function rowHas(y, x0, x1) { for (let x = x0; x < x1; x++) if (mask[y * W + x]) return true; return false; }
  // bandas de conteúdo num eixo, dado um predicado "linha tem conteúdo?"
  function bands(n, has, minGap = 4, minLen = 6) {
    const out = []; let s = -1;
    for (let i = 0; i < n; i++) {
      if (has(i)) { if (s < 0) s = i; }
      else if (s >= 0) {
        // só fecha a banda se o vão for grande o suficiente (evita perna no ar separar)
        let gap = 0, j = i; while (j < n && !has(j)) { gap++; j++; }
        if (gap >= minGap || j >= n) { if (i - s >= minLen) out.push([s, i]); s = -1; }
        else { i = j - 1; }
      }
    }
    if (s >= 0 && n - s >= minLen) out.push([s, n]);
    return out;
  }

  let frames = []; // {x0,y0,x1,y1} em ordem de leitura (linha-major)
  if (GRID) {
    const [R, Cc] = GRID.split('x').map((x) => parseInt(x, 10));
    const cw = W / Cc, ch = H / R;
    for (let r = 0; r < R; r++) for (let c = 0; c < Cc; c++)
      frames.push({ x0: Math.round(c * cw), y0: Math.round(r * ch), x1: Math.round((c + 1) * cw), y1: Math.round((r + 1) * ch) });
  } else {
    const rows = bands(H, (y) => rowHas(y, 0, W), 6, 10);
    for (const [y0, y1] of rows) {
      const cols = bands(W, (x) => colHas(x, y0, y1), 6, 10);
      for (const [x0, x1] of cols) frames.push({ x0, y0, x1, y1 });
    }
  }

  // apara cada frame ao bbox real do alpha
  function trim(f) {
    let minx = f.x1, miny = f.y1, maxx = f.x0, maxy = f.y0, any = false;
    for (let y = f.y0; y < f.y1; y++) for (let x = f.x0; x < f.x1; x++) {
      if (mask[y * W + x]) { any = true; if (x < minx) minx = x; if (x > maxx) maxx = x; if (y < miny) miny = y; if (y > maxy) maxy = y; }
    }
    return any ? { x0: minx, y0: miny, x1: maxx + 1, y1: maxy + 1 } : null;
  }
  frames = frames.map(trim).filter(Boolean);

  const pick = parseOnly(ONLY, frames.length);
  if (pick) frames = pick.map((i) => frames[i]);
  if (!frames.length) { console.error('nenhum frame detectado — tente --grid RxC'); process.exit(2); }

  // ---- 4) célula uniforme + realinhamento --------------------------------
  const fw = (f) => f.x1 - f.x0, fh = (f) => f.y1 - f.y0;
  const cellW = Math.max(...frames.map(fw)) + PAD * 2;
  const cellH = Math.max(...frames.map(fh)) + PAD * 2;

  const cols = frames.length, rows = 1;          // strip horizontal (indexação simples)
  const sheetW = cellW * cols, sheetH = cellH * rows;
  const out = Buffer.alloc(sheetW * sheetH * 4, 0); // RGBA transparente

  frames.forEach((f, idx) => {
    const w = fw(f), h = fh(f);
    const cellX = (idx % cols) * cellW;
    const cellY = Math.floor(idx / cols) * cellH;
    const dx = cellX + Math.round((cellW - w) / 2);         // centro horizontal
    const dy = cellY + (
      VALIGN === 'bottom' ? (cellH - PAD - h) :             // pés no mesmo Y
      VALIGN === 'center' ? Math.round((cellH - h) / 2) :   // centro vertical
      PAD                                                   // topo: cabeça no mesmo Y (default)
    );
    for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
      const si = ((f.y0 + y) * W + (f.x0 + x)) * 4;
      if (data[si + 3] === 0) continue;
      const di = ((dy + y) * sheetW + (dx + x)) * 4;
      out[di] = data[si]; out[di + 1] = data[si + 1]; out[di + 2] = data[si + 2]; out[di + 3] = data[si + 3];
    }
  });

  // ---- 5) defringe/despill + exporta -------------------------------------
  if (DEFRINGE > 0) {
    if (isChroma) despill(out, sheetW, sheetH, bgDom, DEFRINGE + 1); // franja verde/magenta
    else defringe(out, sheetW, sheetH, DEFRINGE);                    // halo branco/cinza
  }
  let pipe = sharp(out, { raw: { width: sheetW, height: sheetH, channels: 4 } });
  if (SCALE !== 1) pipe = pipe.resize(Math.round(sheetW * SCALE), Math.round(sheetH * SCALE), { kernel: 'nearest' });
  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  await pipe.png().toFile(OUT);

  const report = { frames: frames.length, cellW, cellH, cols, rows, out: OUT, sheet: `${sheetW}x${sheetH}` };
  console.log(JSON.stringify(report, null, 2));
})().catch((e) => { console.error(e); process.exit(1); });
