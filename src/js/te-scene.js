/**
 * te-scene.js — cena de fundo "semântica" do Terminal Evolutivo (SPEC v3.0 §3)
 * ---------------------------------------------------------------------------
 * UM sistema persistente que MORFA entre 5 formas LITERAIS conforme o scroll:
 *   grade CRT → wireframe → rede de nós → blocos (microsserviços) → rede neural.
 * Camadas (todas com buffers de capacidade FIXA — nunca realocam):
 *   • Points  (N fixo): a "matéria"; cada estado preenche todos os N pontos.
 *   • Lines   (E fixo): teia que conecta pares de pontos; força (opacidade) por fase.
 *   • Cubes   (InstancedMesh): blocos sólidos na fase 4; viram "blueprint" no Marco.
 * É decoração (canvas aria-hidden). Qualquer falha de WebGL sobe p/ o orquestrador,
 * que ativa o fallback CSS (.no-webgl). Render sob demanda (idle = 0 frames).
 */
import * as THREE from 'three';

const lerp = (a, b, t) => a + (b - a) * t;
const clamp01 = (x) => Math.max(0, Math.min(1, x));
// bump triangular: 0 fora de [a,b], 1 no centro
const bump = (x, a, b) => { const m = (a + b) / 2; const h = (b - a) / 2; return clamp01(1 - Math.abs(x - m) / h); };

function rng(seed) {
  let s = seed >>> 0;
  return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
}

// Cada estado preenche TODOS os N pontos (pos + cor). Cor escura ≈ "apagado"
// (blending aditivo: preto não soma → some). Assim não há índices órfãos.
function buildStates(n) {
  const r = rng(7);
  const A = Array.from({ length: n }, () => [r(), r(), r(), r()]);

  function fill(posFn, colFn) {
    const pos = new Float32Array(n * 3), col = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      const p = posFn(i, A[i]); pos[i * 3] = p[0]; pos[i * 3 + 1] = p[1]; pos[i * 3 + 2] = p[2];
      const c = colFn(i, A[i]); col[i * 3] = c[0]; col[i * 3 + 1] = c[1]; col[i * 3 + 2] = c[2];
    }
    return { pos, col };
  }

  // F1 · CRT — grade rígida 2D no plano (fósforo verde/âmbar), espectador
  const cols = Math.round(Math.sqrt(n * 1.6)), rows = Math.ceil(n / cols);
  const crt = fill(
    (i) => {
      const x = i % cols, y = Math.floor(i / cols);
      return [(x / (cols - 1) - .5) * 11, (y / (rows - 1) - .5) * 7, 0];
    },
    (i, a) => (a[3] > .5 ? [0.95, 0.62, 0.05] : [0.10, 0.85, 0.30]));

  // F2 · WIREFRAME — superfície esférica (lattice estilo Matrix), verde
  const wire = fill(
    (i, a) => {
      const phi = Math.acos(2 * a[0] - 1), th = 2 * Math.PI * a[1], rad = 3.4;
      return [rad * Math.sin(phi) * Math.cos(th), rad * Math.cos(phi), rad * Math.sin(phi) * Math.sin(th)];
    },
    () => [0.05, 0.95, 0.55]);

  // F3 · NÓS — clusters (hubs) conectados (web/discada), azul/ciano
  const NH = 16;
  const hubs = Array.from({ length: NH }, () => [(r() - .5) * 9, (r() - .5) * 6, (r() - .5) * 5]);
  const nodes = fill(
    (i, a) => { const h = hubs[i % NH]; return [h[0] + (a[0] - .5) * 1.5, h[1] + (a[1] - .5) * 1.5, h[2] + (a[2] - .5) * 1.5]; },
    (i) => (i % 2 ? [0.30, 0.66, 1.0] : [0.0, 0.82, 0.78]));

  // F4 · BLOCOS — grade 3D ordenada (microsserviços), azul
  const side = Math.ceil(Math.cbrt(n)), g = 6.4 / side;
  const blocks = fill(
    (i) => {
      const x = i % side, y = Math.floor(i / side) % side, z = Math.floor(i / (side * side)) % side;
      return [(x - side / 2 + .5) * g, (y - side / 2 + .5) * g, (z - side / 2 + .5) * g];
    },
    () => [0.20, 0.55, 0.95]);

  // F5 · NEURAL — camadas verticais (rede neural), roxo/teal + glow
  const L = 5;
  const neural = fill(
    (i, a) => { const layer = i % L; return [(layer - (L - 1) / 2) * 2.5, (a[0] - .5) * 7, (a[1] - .5) * 5]; },
    (i) => (i % 3 === 0 ? [0.62, 0.50, 1.0] : [0.18, 0.90, 0.78]));

  return [crt, wire, nodes, blocks, neural];
}

// Pares de índices (teia) — capacidade fixa; os mesmos pares em todas as fases.
function buildEdges(n, E) {
  const e = new Uint32Array(E * 2);
  for (let k = 0; k < E; k++) { e[k * 2] = (k * 3) % n; e[k * 2 + 1] = (k * 7 + 11) % n; }
  return e;
}

export function createScene(canvas, opts = {}) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
  renderer.setClearColor(0x000000, 0);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setSize(window.innerWidth, window.innerHeight, false);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(52, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.set(0, 0, 8);

  const mobile = window.matchMedia('(max-width: 768px)').matches;
  const low = opts.tier === 'low' || mobile;            // tier baixo: só pontos
  const N = low ? 1100 : 2048;                            // contagem FIXA de pontos
  const E = low ? 0 : 760;                                // contagem FIXA de arestas

  let states = buildStates(N);
  let edges = buildEdges(N, E);
  const cur = Float32Array.from(states[0].pos);
  const curCol = Float32Array.from(states[0].col);

  // --- Points ---
  const geom = new THREE.BufferGeometry();
  geom.setAttribute('position', new THREE.BufferAttribute(cur, 3));
  geom.setAttribute('color', new THREE.BufferAttribute(curCol, 3));
  const pmat = new THREE.PointsMaterial({
    size: low ? 0.05 : 0.045, vertexColors: true, transparent: true,
    opacity: 0.95, depthWrite: false, blending: THREE.AdditiveBlending, sizeAttenuation: true,
  });
  const points = new THREE.Points(geom, pmat);
  points.frustumCulled = false; // os pontos morfam p/ fora do bounding inicial
  const group = new THREE.Group();
  group.add(points);
  scene.add(group);

  // --- Lines (teia) ---
  let lines = null, linePos = null;
  if (E > 0) {
    linePos = new Float32Array(E * 2 * 3);
    const lgeom = new THREE.BufferGeometry();
    lgeom.setAttribute('position', new THREE.BufferAttribute(linePos, 3));
    const lmat = new THREE.LineBasicMaterial({ vertexColors: false, color: 0x66ffcc, transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending });
    lines = new THREE.LineSegments(lgeom, lmat);
    lines.frustumCulled = false;
    group.add(lines);
  }

  // --- Cubes (blocos / blueprint) ---
  let cubes = null, dummy = null, cubeBase = null;
  if (!low) {
    const CN = 64;
    const cside = 4, cg = 3.0;
    cubeBase = [];
    for (let i = 0; i < CN; i++) {
      const x = i % cside, y = Math.floor(i / cside) % cside, z = Math.floor(i / (cside * cside)) % cside;
      cubeBase.push([(x - cside / 2 + .5) * cg, (y - cside / 2 + .5) * cg, (z - cside / 2 + .5) * cg]);
    }
    const cgeom = new THREE.BoxGeometry(0.9, 0.9, 0.9);
    const cmat = new THREE.MeshStandardMaterial({ color: 0x2b6fd6, metalness: 0.2, roughness: 0.5, transparent: true, opacity: 0, emissive: 0x0a2a55, emissiveIntensity: 0.4 });
    cubes = new THREE.InstancedMesh(cgeom, cmat, CN);
    cubes.frustumCulled = false;
    cubes.visible = false;
    dummy = new THREE.Object3D();
    scene.add(new THREE.HemisphereLight(0xbcd6ff, 0x10131a, 1.1));
    const dl = new THREE.DirectionalLight(0xffffff, 0.8); dl.position.set(4, 6, 5); scene.add(dl);
    scene.add(cubes);
  }

  let animating = false;

  function setProgress(p) {
    const clamped = clamp01(p);
    const seg = clamped * (states.length - 1);
    const i = Math.min(Math.floor(seg), states.length - 2);
    const t = seg - i;
    const a = states[i], b = states[i + 1];
    for (let k = 0; k < N * 3; k++) {
      cur[k] = lerp(a.pos[k], b.pos[k], t);
      curCol[k] = lerp(a.col[k], b.col[k], t);
    }
    geom.attributes.position.needsUpdate = true;
    geom.attributes.color.needsUpdate = true;

    // Lines: redesenha a teia a partir das posições atuais; força por fase.
    if (lines) {
      for (let k = 0; k < E; k++) {
        const ia = edges[k * 2] * 3, ib = edges[k * 2 + 1] * 3, o = k * 6;
        linePos[o] = cur[ia]; linePos[o + 1] = cur[ia + 1]; linePos[o + 2] = cur[ia + 2];
        linePos[o + 3] = cur[ib]; linePos[o + 4] = cur[ib + 1]; linePos[o + 5] = cur[ib + 2];
      }
      lines.geometry.attributes.position.needsUpdate = true;
      // forte em wireframe (p~.25) e nós (p~.5); fraca no resto
      lines.material.opacity = 0.06 + 0.5 * bump(clamped, 0.18, 0.58) + 0.10 * bump(clamped, 0.85, 1.0);
    }

    // Cubes: crescem na fase blocos (p~.75); viram blueprint (wireframe emissivo)
    // na banda do Marco (p~.78–.92), antes de dissolver na rede neural.
    if (cubes) {
      const scale = bump(clamped, 0.55, 0.97);          // pico na fase blocos
      const blueprint = bump(clamped, 0.80, 0.94);       // banda do Marco
      cubes.visible = scale > 0.01;
      if (cubes.visible) {
        const s = 0.15 + 0.85 * scale;
        for (let c = 0; c < cubeBase.length; c++) {
          dummy.position.set(cubeBase[c][0], cubeBase[c][1], cubeBase[c][2]);
          dummy.scale.setScalar(s);
          dummy.rotation.set(0, blueprint * 0.4, 0);
          dummy.updateMatrix();
          cubes.setMatrixAt(c, dummy.matrix);
        }
        cubes.instanceMatrix.needsUpdate = true;
        cubes.material.opacity = scale * (blueprint > 0.05 ? 0.55 : 0.9);
        cubes.material.wireframe = blueprint > 0.35;     // "planta" no Marco
        cubes.material.emissiveIntensity = 0.4 + blueprint * 1.6;
        cubes.material.emissive.setHex(blueprint > 0.35 ? 0x1ce0ff : 0x0a2a55);
      }
    }

    // Glow da rede neural (F5): pontos maiores perto do fim.
    pmat.size = (low ? 0.05 : 0.045) * (1 + 0.6 * bump(clamped, 0.82, 1.0));
  }

  function render() {
    renderer.render(scene, camera);
    if (typeof window !== 'undefined') window.__teRenders = (window.__teRenders || 0) + 1;
  }
  function resize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(window.innerWidth, window.innerHeight, false);
  }
  function dispose() {
    geom.dispose(); pmat.dispose();
    if (lines) { lines.geometry.dispose(); lines.material.dispose(); }
    if (cubes) { cubes.geometry.dispose(); cubes.material.dispose(); }
    renderer.dispose();
  }
  function rebuild() { states = buildStates(N); edges = buildEdges(N, E); setProgress(0); }

  return {
    renderer, scene, camera, group,
    render, setProgress, resize, dispose, rebuild,
    isAnimating: () => animating, setAnimating: (on) => { animating = on; },
  };
}
