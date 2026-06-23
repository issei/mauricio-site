/**
 * te-scene.js — cena de fundo do "Terminal Evolutivo" (SDD §3.2)
 * ---------------------------------------------------------------------------
 * UM sistema de partículas persistente que MORFA continuamente entre 5 estados
 * (crt → wire → nodes → blocks → neural). Sem cenas separadas, sem fade: o
 * progresso global do scroll interpola posição e cor dos mesmos pontos.
 *
 * É puramente decorativo (o <canvas> é aria-hidden). Qualquer falha de WebGL é
 * lançada para o orquestrador, que então ativa o fallback CSS (.no-webgl).
 *
 * API: createScene(canvas) → { render, setProgress, isAnimating, setAnimating,
 *                              resize, dispose, rebuild }
 */
import * as THREE from 'three';

const lerp = (a, b, t) => a + (b - a) * t;

// ---- geradores dos 5 estados (posição + cor por ponto) ---------------------
function fill(n, posFn, colFn) {
  const pos = new Float32Array(n * 3);
  const col = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    const p = posFn(i, n);
    pos[i * 3] = p[0]; pos[i * 3 + 1] = p[1]; pos[i * 3 + 2] = p[2];
    const c = colFn(i, n);
    col[i * 3] = c[0]; col[i * 3 + 1] = c[1]; col[i * 3 + 2] = c[2];
  }
  return { pos, col };
}

// pseudo-aleatório determinístico (sem Math.random p/ estabilidade entre frames)
function rng(seed) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

function buildStates(n) {
  const r = rng(7);
  // pré-sorteia ângulos/raios estáveis por ponto
  const A = Array.from({ length: n }, () => [r(), r(), r(), r()]);

  // CRT — nuvem dispersa à deriva (fósforo âmbar/verde)
  const crt = fill(n,
    (i) => {
      const a = A[i];
      return [(a[0] - .5) * 12, (a[1] - .5) * 8, (a[2] - .5) * 8];
    },
    (i) => (A[i][3] > .5 ? [1.0, 0.69, 0.0] : [0.27, 0.98, 0.45]));

  // WIRE — superfície esférica (lattice estilo Matrix), verde
  const wire = fill(n,
    (i) => {
      const a = A[i];
      const phi = Math.acos(2 * a[0] - 1);
      const th = 2 * Math.PI * a[1];
      const rad = 3.4;
      return [rad * Math.sin(phi) * Math.cos(th), rad * Math.cos(phi), rad * Math.sin(phi) * Math.sin(th)];
    },
    () => [0.0, 1.0, 0.62]);

  // NODES — clusters conectados (rede discada), azul/ciano
  const NODES = 14;
  const hubs = Array.from({ length: NODES }, () => [(r() - .5) * 9, (r() - .5) * 6, (r() - .5) * 6]);
  const nodes = fill(n,
    (i) => {
      const h = hubs[i % NODES]; const a = A[i];
      return [h[0] + (a[0] - .5) * 1.4, h[1] + (a[1] - .5) * 1.4, h[2] + (a[2] - .5) * 1.4];
    },
    (i) => (i % NODES % 2 ? [0.29, 0.66, 1.0] : [0.0, 0.82, 0.78]));

  // BLOCKS — grade 3D de cubos (microsserviços), azul (visível em fundo claro)
  const side = Math.ceil(Math.cbrt(n));
  const blocks = fill(n,
    (i) => {
      const x = i % side, y = Math.floor(i / side) % side, z = Math.floor(i / (side * side)) % side;
      const g = 7 / side;
      return [(x - side / 2) * g, (y - side / 2) * g, (z - side / 2) * g];
    },
    () => [0.04, 0.40, 0.76]);

  // NEURAL — camadas verticais (rede neural fluida), roxo/teal
  const LAYERS = 5;
  const neural = fill(n,
    (i) => {
      const a = A[i];
      const layer = i % LAYERS;
      return [(layer - (LAYERS - 1) / 2) * 2.4, (a[0] - .5) * 7, (a[1] - .5) * 5];
    },
    (i) => (i % 3 === 0 ? [0.55, 0.48, 1.0] : [0.17, 0.83, 0.71]));

  return [crt, wire, nodes, blocks, neural];
}

export function createScene(canvas) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
  renderer.setClearColor(0x000000, 0); // transparente: o body (cor sólida do tema) aparece atrás
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setSize(window.innerWidth, window.innerHeight, false);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(52, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.set(0, 0, 8);

  const mobile = window.matchMedia('(max-width: 768px)').matches;
  const N = mobile ? 1400 : 2600;

  let states = buildStates(N);
  const cur = new Float32Array(N * 3);
  const curCol = new Float32Array(N * 3);
  states[0].pos.forEach((v, k) => (cur[k] = v));
  states[0].col.forEach((v, k) => (curCol[k] = v));

  const geom = new THREE.BufferGeometry();
  geom.setAttribute('position', new THREE.BufferAttribute(cur, 3));
  geom.setAttribute('color', new THREE.BufferAttribute(curCol, 3));

  const material = new THREE.PointsMaterial({
    size: mobile ? 0.05 : 0.045,
    vertexColors: true,
    transparent: true,
    opacity: 0.9,
    depthWrite: false,
    sizeAttenuation: true,
  });

  const points = new THREE.Points(geom, material);
  const group = new THREE.Group();
  group.add(points);
  scene.add(group);

  let animating = false; // sem loop ambiente: idle = 0 frames (render sob demanda)

  function setProgress(p) {
    const clamped = Math.max(0, Math.min(1, p));
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
  }

  function render() {
    renderer.render(scene, camera);
    // contador p/ o teste de "idle = 0 frames"
    if (typeof window !== 'undefined') window.__teRenders = (window.__teRenders || 0) + 1;
  }

  function resize() {
    const w = window.innerWidth, h = window.innerHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(w, h, false);
  }

  function dispose() {
    geom.dispose();
    material.dispose();
    renderer.dispose();
  }

  function rebuild() {
    states = buildStates(N); // recria os alvos após perda de contexto
    setProgress(0);
  }

  return {
    renderer, scene, camera, group,
    render, setProgress, resize, dispose, rebuild,
    isAnimating: () => animating,
    setAnimating: (on) => { animating = on; },
  };
}
