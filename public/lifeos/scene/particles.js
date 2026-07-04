// CMP-04 ParticleField — RND-03
// Buffer único 310 (220 ambiente + 90 rajada). Modos: float | fall | burst | hair.
// Atlas de glifos gerado em runtime; zero alocação pós-boot.

import * as THREE from 'three';
import { bus } from '../core/bus.js';
import { ARC_THEME } from '../story/data.js';

const AMBIENT = 220, BURST = 90, TOTAL = AMBIENT + BURST;
const GLYPHS = ['0', '1', 'A', 'F', '3', '7', 'C', 'E'];

function makeAtlas() {
  const c = document.createElement('canvas');
  c.width = 512; c.height = 64;
  const ctx = c.getContext('2d');
  ctx.font = 'bold 40px monospace';
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.shadowBlur = 8; ctx.shadowColor = '#fff'; ctx.fillStyle = '#fff';
  GLYPHS.forEach((g, i) => ctx.fillText(g, i * 64 + 32, 34));
  const tex = new THREE.CanvasTexture(c);
  return tex;
}

export function createParticles(sceneApi, session) {
  const pos = new Float32Array(TOTAL * 3);
  const base = new Float32Array(TOTAL * 3);
  const phase = new Float32Array(TOTAL);
  const glyph = new Float32Array(TOTAL);
  const kind = new Float32Array(TOTAL);          // 0=ambiente 1=rajada
  const vel = new Float32Array(TOTAL * 3);       // rajada

  for (let i = 0; i < TOTAL; i++) {
    const amb = i < AMBIENT;
    kind[i] = amb ? 0 : 1;
    base[i * 3] = (Math.random() - 0.5) * 20;
    base[i * 3 + 1] = 0.5 + Math.random() * 5;
    base[i * 3 + 2] = 6 - Math.random() * 62;
    pos.set(base.subarray(i * 3, i * 3 + 3), i * 3);
    phase[i] = Math.random() * Math.PI * 2;
    glyph[i] = Math.floor(Math.random() * 8);
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  geo.setAttribute('aGlyph', new THREE.BufferAttribute(glyph, 1));
  const color = new THREE.Color(ARC_THEME.infancia.accent);
  const mat = new THREE.PointsMaterial({
    size: 0.5, map: makeAtlas(), transparent: true, opacity: 0.7,
    color, blending: THREE.AdditiveBlending, depthWrite: false,
  });
  const points = new THREE.Points(geo, mat);
  sceneApi.scene.add(points);

  let mode = 'float';                            // ambiente: float|fall
  let burstT = -1, burstMode = null;             // burst|hair
  let absorbRadius = 1;
  let hairDone = false;                          // RG: hair 1x/sessão

  function startBurst(kind2, origin, colorHex) {
    burstMode = kind2; burstT = 0;
    if (colorHex) mat.color.set(colorHex);
    for (let i = AMBIENT; i < TOTAL; i++) {
      pos[i * 3] = origin.x + (Math.random() - 0.5) * 0.5;
      pos[i * 3 + 1] = origin.y + Math.random() * (kind2 === 'hair' ? 0.3 : 1);
      pos[i * 3 + 2] = origin.z + (Math.random() - 0.5) * 0.5;
      const sp = kind2 === 'hair' ? 0.15 : 2 + Math.random() * 3;
      const a = Math.random() * Math.PI * 2;
      vel[i * 3] = Math.cos(a) * sp * (kind2 === 'hair' ? 0.3 : 1);
      vel[i * 3 + 1] = kind2 === 'hair' ? -0.15 : 1 + Math.random() * 2;
      vel[i * 3 + 2] = Math.sin(a) * sp * (kind2 === 'hair' ? 0.3 : 1);
    }
  }

  bus.subscribe('phase:changed', ({ marco }) => { mat.color.set(ARC_THEME[marco.arc].accent); mode = 'float'; });
  bus.subscribe('vale:act1', () => { mode = 'fall'; });
  bus.subscribe('vale:act2', () => {
    if (hairDone) return;
    hairDone = true;
    const p = sceneApi.getPlayerPos();
    startBurst('hair', { x: p.x, y: 2.2, z: p.z }, '#fbf1cf');
  });
  bus.subscribe('monolith:reveal-start', () => {
    startBurst('burst', { x: 0, y: 2.5, z: -52 });
  });

  sceneApi.onFrame((dt, t) => {
    const player = sceneApi.getPlayerPos();
    for (let i = 0; i < AMBIENT; i++) {
      const j = i * 3;
      if (mode === 'float') {
        pos[j] = base[j] + Math.sin(t * 0.6 + phase[i]) * 0.4;
        pos[j + 1] = base[j + 1] + Math.sin(t * 0.8 + phase[i] * 2) * 0.3;
        // absorção (v1 = 2× — RND-03 RG-02)
        const dx = player.x - pos[j], dz = player.z - pos[j + 2];
        const d2 = dx * dx + dz * dz;
        const r = 4 * absorbRadius;
        if (d2 < r * r) { pos[j] += dx * dt * 0.4; pos[j + 2] += dz * dt * 0.4; }
      } else {                                   // fall (Vale)
        pos[j + 1] -= dt * 0.3;
        if (pos[j + 1] < 0) pos[j + 1] = 5.5;
      }
    }
    if (burstT >= 0) {
      burstT += dt;
      const life = burstMode === 'hair' ? 6 : 1.2;
      for (let i = AMBIENT; i < TOTAL; i++) {
        const j = i * 3;
        pos[j] += vel[j] * dt;
        pos[j + 1] += vel[j + 1] * dt;
        pos[j + 2] += vel[j + 2] * dt;
        if (burstMode === 'burst') vel[j + 1] -= dt * 3;   // gravidade leve
      }
      if (burstT > life) {
        burstT = -1;
        for (let i = AMBIENT; i < TOTAL; i++) pos[i * 3 + 1] = -10;  // fora de vista
      }
    }
    geo.attributes.position.needsUpdate = true;
  });

  bus.subscribe('avatar:version-changed', ({ to }) => {
    absorbRadius = to === 1 ? 2 : to === 2 ? 1.4 : 1;
  });

  return {};
}
