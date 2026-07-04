// CMP-01 SceneCore + CMP-17 Input — RND-01
// Cena, câmera isométrica, corredor, movimento, loop. Bus.flush() 1x/frame.
// Camadas 3+ adicionam objetos via api.scene; callbacks de frame via api.onFrame.

import * as THREE from 'three';
import { bus } from '../core/bus.js';

const PATH_HW = 2.2;                 // meia-largura jogável (RG-03)
const Z_START = 2, Z_MONOLITH = -52;
const BASE_SPEED = 6;                // un/s (RG-04)

export function createScene(canvas, session) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));      // RG-09
  renderer.setSize(innerWidth, innerHeight);

  const scene = new THREE.Scene();
  scene.background = new THREE.Color('#05070a');
  scene.fog = new THREE.Fog('#05070a', 30, 85);

  const camera = new THREE.PerspectiveCamera(50, innerWidth / innerHeight, 0.1, 200);
  const CAM_OFFSET = new THREE.Vector3(9, 11, 12);
  let camTilt = 0;                   // RG-02: +4° a partir do fork_daughter
  let shakeTime = 0;

  scene.add(new THREE.AmbientLight(0x99aabb, 0.7));
  const key = new THREE.DirectionalLight(0xffffff, 0.8);
  key.position.set(5, 12, 6); scene.add(key);

  const playerRoot = new THREE.Group();                      // avatar (CMP-02 popula)
  playerRoot.position.set(0, 0, Z_START);
  scene.add(playerRoot);

  const phaseRoot = new THREE.Group();                       // objetos do quadrante
  scene.add(phaseRoot);

  // ---------- input (CMP-17) ----------
  const keys = new Set();
  let cliOpen = false, paused = false;
  addEventListener('keydown', (e) => { if (!cliOpen) keys.add(e.code); });
  addEventListener('keyup', (e) => keys.delete(e.code));
  bus.subscribe('cli:opened', () => { cliOpen = true; keys.clear(); });
  bus.subscribe('cli:closed', () => { cliOpen = false; });
  bus.subscribe('monolith:reveal-start', () => { paused = true; keys.clear(); });
  bus.subscribe('memory:unlocked', () => { paused = false; });

  const touch = { x: 0, z: 0 };                              // d-pad seta via api.setTouch
  function intent() {
    let x = touch.x, z = touch.z;
    if (keys.has('KeyW') || keys.has('ArrowUp')) z -= 1;
    if (keys.has('KeyS') || keys.has('ArrowDown')) z += 1;
    if (keys.has('KeyA') || keys.has('ArrowLeft')) x -= 1;
    if (keys.has('KeyD') || keys.has('ArrowRight')) x += 1;
    return { x: Math.max(-1, Math.min(1, x)), z: Math.max(-1, Math.min(1, z)) };
  }

  // ---------- movimento (RG-04/06) ----------
  const vel = new THREE.Vector3();
  let walkSpeedMul = 1, walkCycle = 0, walking = false;
  let lastMoveEmit = 0, idleAccum = 0, idleEmitted = 0;

  function updateMovement(dt, now) {
    if (paused || cliOpen) { vel.set(0, 0, 0); walking = false; return; }
    const it = intent();
    const target = new THREE.Vector3(it.x, 0, it.z);
    if (target.lengthSq() > 0) target.normalize().multiplyScalar(BASE_SPEED * walkSpeedMul);
    vel.lerp(target, Math.min(1, dt / 0.15));                // aceleração 150ms
    playerRoot.position.addScaledVector(vel, dt);
    playerRoot.position.x = Math.max(-PATH_HW, Math.min(PATH_HW, playerRoot.position.x));
    playerRoot.position.z = Math.max(Z_MONOLITH, Math.min(Z_START, playerRoot.position.z));

    const speed = vel.length();
    walking = speed > 0.3;
    if (walking) {
      walkCycle += dt * speed * 1.6;
      playerRoot.rotation.y = Math.atan2(vel.x, vel.z);
      session.addWalkUnits(speed * dt);
      idleAccum = 0; idleEmitted = 0;
      if (now - lastMoveEmit > 100) {                        // throttle 100ms (RG-06)
        lastMoveEmit = now;
        bus.publish('player:moved', { x: playerRoot.position.x, z: playerRoot.position.z, speed, walking: true });
      }
    } else {
      idleAccum += dt;
      if (idleAccum - idleEmitted >= 1) {
        idleEmitted = Math.floor(idleAccum);
        bus.publish('player:idle', { seconds: idleEmitted });
      }
    }
  }

  function updateCamera(dt) {
    const target = playerRoot.position.clone().add(CAM_OFFSET);
    camera.position.lerp(target, Math.min(1, dt / 0.12));    // lerp .08/frame≈
    if (shakeTime > 0) {                                     // RND-04 RG-05 (amplitude reduzida)
      shakeTime -= dt;
      camera.position.x += (Math.random() - 0.5) * 0.08;
      camera.position.y += (Math.random() - 0.5) * 0.08;
    }
    camera.lookAt(playerRoot.position.x, playerRoot.position.y + 1, playerRoot.position.z);
    camera.rotation.x -= THREE.MathUtils.degToRad(camTilt);
  }

  // ---------- quadrante (RG-07) — cenário simples por arco; pool de materiais ----------
  const mats = {
    pillar: new THREE.MeshStandardMaterial({ color: 0x18222c, roughness: 0.6, metalness: 0.4 }),
    accent: new THREE.MeshStandardMaterial({ color: 0x4dff9c, emissive: 0x4dff9c, emissiveIntensity: 0.6 }),
  };
  const geos = {
    pillar: new THREE.BoxGeometry(0.8, 3.2, 0.8),
    slab: new THREE.BoxGeometry(1.6, 0.2, 1.6),
    mono: new THREE.BoxGeometry(2.2, 5, 0.9),
  };
  let monolith = null;

  function buildPhase(marco, accentHex) {
    while (phaseRoot.children.length) {                      // teardown (reuso de geo/mat)
      const c = phaseRoot.children.pop();
      phaseRoot.remove(c);
    }
    mats.accent.color.set(accentHex); mats.accent.emissive.set(accentHex);
    const rng = mulberry(marco.order * 7919);
    for (let i = 0; i < 14; i++) {                           // pilares laterais
      const side = i % 2 ? 1 : -1;
      const p = new THREE.Mesh(geos.pillar, mats.pillar);
      p.position.set(side * (PATH_HW + 1.6 + rng() * 2.5), 1.6, -3 - i * 3.6);
      p.scale.y = 0.6 + rng() * 1.4;
      phaseRoot.add(p);
      if (rng() > 0.6) {
        const s = new THREE.Mesh(geos.slab, mats.accent);
        s.position.set(p.position.x, p.scale.y * 3.2 / 2 + 1.7, p.position.z);
        phaseRoot.add(s);
      }
    }
    monolith = new THREE.Mesh(geos.mono, mats.accent);       // Monolito (CMP-07 anima)
    monolith.position.set(0, 2.5, Z_MONOLITH);
    phaseRoot.add(monolith);
    playerRoot.position.set(0, 0, Z_START);
    vel.set(0, 0, 0);
  }

  bus.subscribe('phase:changed', ({ marco }) => {
    // tilt permanente pós fork_daughter, para marcos ≥9 (RND-01 aceite)
    camTilt = (marco.order >= 9 && session.get().unlockedMemories.includes('fork_daughter')) ? 4 : 0;
  });

  // ---------- loop ----------
  const frameCbs = [];
  let last = performance.now();
  let renderFn = () => renderer.render(scene, camera);       // postfx substitui
  function animate(now) {
    requestAnimationFrame(animate);
    const dt = Math.min(0.1, (now - last) / 1000);           // clamp 100ms (§extremos)
    last = now;
    updateMovement(dt, now);
    updateCamera(dt);
    for (const cb of frameCbs) cb(dt, now / 1000);
    bus.flush();
    renderFn();
  }

  addEventListener('resize', debounce(() => {
    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(innerWidth, innerHeight);
  }, 200));

  return {
    scene, camera, renderer, playerRoot,
    get monolith() { return monolith; },
    get walking() { return walking; },
    get walkCycle() { return walkCycle; },
    buildPhase,
    onFrame: (cb) => frameCbs.push(cb),
    setRender: (fn) => { renderFn = fn; },
    setWalkSpeedMul: (m) => { walkSpeedMul = m; },
    setTouch: (x, z) => { touch.x = x; touch.z = z; },
    shake: (s = 0.5) => { shakeTime = s; },
    start: () => requestAnimationFrame(animate),
    getPlayerPos: () => playerRoot.position,
  };
}

function mulberry(a) {
  return () => {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
function debounce(fn, ms) { let t; return (...a) => { clearTimeout(t); t = setTimeout(() => fn(...a), ms); }; }
