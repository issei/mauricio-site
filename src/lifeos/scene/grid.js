// CMP-03 GridShader — RND-02
// Chão wireframe (fwidth) + cicatrizes persistentes via DataTexture 1 canal:
// 0=normal · 0.5=rachada · 1=dourada. 1 draw call; luz própria no ouro.

import * as THREE from 'three';
import { bus } from '../core/bus.js';
import { ARC_THEME } from '../story/data.js';

const TEX = 128;                       // 64 sob fallback (PRF-01)
const WORLD_W = 24, WORLD_D = 64;      // quadrante coberto (x: -12..12, z: -56..8)

export function createGrid(sceneApi, session) {
  const data = new Uint8Array(TEX * TEX);           // 0 | 128 | 255
  const scarTex = new THREE.DataTexture(data, TEX, TEX, THREE.RedFormat);
  scarTex.needsUpdate = true;

  const uniforms = {
    uColor: { value: new THREE.Color(ARC_THEME.infancia.accent) },
    uColorTarget: { value: new THREE.Color(ARC_THEME.infancia.accent) },
    uLerpT: { value: 1 },
    uPlayerPos: { value: new THREE.Vector3() },
    uWalkPulse: { value: 0 },
    uTime: { value: 0 },
    uGridDensity: { value: 1.0 },
    uScars: { value: scarTex },
  };

  const mat = new THREE.ShaderMaterial({
    uniforms, transparent: true,
    vertexShader: /* glsl */`
      varying vec3 vW;
      void main() {
        vW = (modelMatrix * vec4(position,1.)).xyz;
        gl_Position = projectionMatrix * viewMatrix * vec4(vW,1.);
      }`,
    fragmentShader: /* glsl */`
      uniform vec3 uColor, uColorTarget, uPlayerPos;
      uniform float uLerpT, uWalkPulse, uTime, uGridDensity;
      uniform sampler2D uScars;
      varying vec3 vW;
      void main() {
        vec2 g = vW.xz;
        vec2 grid = abs(fract(g - .5) - .5) / fwidth(g);
        float line = 1. - min(min(grid.x, grid.y), 1.);
        // célula → texel da textura de cicatrizes
        vec2 uv = vec2((vW.x + ${(WORLD_W / 2).toFixed(1)}) / ${WORLD_W.toFixed(1)},
                       (vW.z + ${(WORLD_D - 8).toFixed(1)}) / ${WORLD_D.toFixed(1)});
        float scar = texture2D(uScars, uv).r;
        // densidade: apaga linhas por hash de célula (Vale — GMP-03)
        vec2 cell = floor(g);
        float h = fract(sin(dot(cell, vec2(127.1, 311.7))) * 43758.5453);
        if (h > uGridDensity && scar < .25) line = 0.;
        vec3 col = mix(uColor, uColorTarget, uLerpT);
        float d = distance(vW.xz, uPlayerPos.xz);
        float glow = .35 + .65 * exp(-d * .18) * (0.75 + .25 * sin(uTime * 3. + uWalkPulse * 6.283));
        float alpha = line * glow * .9;
        if (scar > .25 && scar < .75) {                     // rachada: linha quebrada, apagada
          float crack = step(.5, fract(g.x * 7. + g.y * 13. + uTime * .1));
          alpha = line * .12 * crack;
        } else if (scar >= .75) {                           // dourada: luz própria + banda especular
          vec3 gold = mix(vec3(.61,.44,.21), vec3(.98,.95,.81),
                          .5 + .5 * sin(uTime * 1.2 + vW.x * 2. + vW.z));
          col = gold;
          alpha = max(line, .25);
        }
        gl_FragColor = vec4(col, alpha);
      }`,
  });

  const plane = new THREE.Mesh(new THREE.PlaneGeometry(WORLD_W, WORLD_D), mat);
  plane.rotation.x = -Math.PI / 2;
  plane.position.set(0, 0, -(WORLD_D / 2) + 8);
  sceneApi.scene.add(plane);

  function cellToIdx([x, z]) {
    const u = Math.round(((x + WORLD_W / 2) / WORLD_W) * (TEX - 1));
    const v = Math.round(((z + (WORLD_D - 8)) / WORLD_D) * (TEX - 1));
    if (u < 0 || u >= TEX || v < 0 || v >= TEX) return -1;
    return v * TEX + u;
  }
  function stamp(cells, value) {                            // pinta célula + halo 1px
    for (const c of cells) {
      const i = cellToIdx(c);
      if (i < 0) continue;
      data[i] = value;
      for (const off of [1, -1, TEX, -TEX]) {
        const j = i + off;
        if (j >= 0 && j < data.length && data[j] < value) data[j] = value;
      }
    }
    scarTex.needsUpdate = true;
  }

  function rehydrate() {                                    // RG-06: persistência
    data.fill(0);
    for (const s of session.get().scars) stamp(s.gridCells, s.state === 'gilded' ? 255 : 128);
    scarTex.needsUpdate = true;
  }

  bus.subscribe('scar:opened', ({ gridCells }) => stamp(gridCells, 128));
  bus.subscribe('scar:gilded', ({ scarId, durationMs }) => {
    const scar = session.get().scars.find((s) => s.scarId === scarId);
    if (!scar) { console.warn(`[grid] scar '${scarId}' inexistente — no-op`); return; }
    const cells = scar.gridCells;
    const step = durationMs / Math.max(1, cells.length);    // RG-04: varredura sequencial
    cells.forEach((c, i) => setTimeout(() => stamp([c], 255), i * step));
  });
  bus.subscribe('phase:changed', ({ marco }) => {
    uniforms.uColor.value.copy(uniforms.uColorTarget.value);
    uniforms.uColorTarget.value.set(ARC_THEME[marco.arc].accent);
    uniforms.uLerpT.value = 0;                              // lerp 1.4s no frame cb
    uniforms.uGridDensity.value = 1.0;
    rehydrate();
  });

  sceneApi.onFrame((dt, t) => {
    uniforms.uTime.value = t;
    uniforms.uPlayerPos.value.copy(sceneApi.getPlayerPos());
    uniforms.uWalkPulse.value = sceneApi.walkCycle % 1;
    if (uniforms.uLerpT.value < 1) uniforms.uLerpT.value = Math.min(1, uniforms.uLerpT.value + dt / 1.4);
  });

  rehydrate();
  return { setDensity: (v) => { uniforms.uGridDensity.value = Math.max(0.4, v); } };
}
