// CMP-02 AvatarSystem — CTR-06 / AVT-01 / AVT-02
// Corpo em primitivas com sub-meshes nomeadas; versões aplicadas por fase.
// Teardown completo antes de apply; changelog publicado; caminhada procedural.

import * as THREE from 'three';
import { bus } from '../core/bus.js';
import { AVATAR_VERSIONS } from '../story/data.js';

export function createAvatar(sceneApi, session) {
  const root = sceneApi.playerRoot;
  const group = new THREE.Group();
  group.name = 'avatar';
  root.add(group);

  const skin = new THREE.MeshStandardMaterial({ color: 0xd9b48f, roughness: 0.8 });
  const cloth = new THREE.MeshStandardMaterial({ color: 0x2a3644, roughness: 0.7 });
  const dark = new THREE.MeshStandardMaterial({ color: 0x141a22, roughness: 0.6 });
  const emis = new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0x4dff9c, emissiveIntensity: 0.8 });
  const gold = new THREE.MeshStandardMaterial({ color: 0xd9b06a, emissive: 0xd9b06a, emissiveIntensity: 0.5 });

  const G = {
    torso: new THREE.BoxGeometry(0.7, 0.9, 0.4),
    head: new THREE.BoxGeometry(0.5, 0.5, 0.5),
    hair: new THREE.BoxGeometry(0.54, 0.16, 0.54),
    limb: new THREE.BoxGeometry(0.18, 0.7, 0.18),
    acc: new THREE.BoxGeometry(0.5, 0.55, 0.2),
    band: new THREE.TorusGeometry(0.3, 0.04, 6, 16),
    small: new THREE.BoxGeometry(0.18, 0.24, 0.05),
    ring: new THREE.RingGeometry(0.9, 1.1, 32),
  };

  const parts = {};
  function mk(name, geo, mat, x, y, z, parent = group) {
    const m = new THREE.Mesh(geo, mat);
    m.name = name; m.position.set(x, y, z);
    parent.add(m); parts[name] = m;
    return m;
  }

  // corpo base (persistente)
  mk('torso', G.torso, cloth, 0, 1.15, 0);
  mk('head', G.head, skin, 0, 1.9, 0);
  const legL = mk('legL', G.limb, dark, -0.18, 0.35, 0);
  const legR = mk('legR', G.limb, dark, 0.18, 0.35, 0);
  const armL = mk('armL', G.limb, cloth, -0.48, 1.2, 0);
  const armR = mk('armR', G.limb, cloth, 0.48, 1.2, 0);

  let version = 0;

  const ACCESSORY_NAMES = ['hair', 'glasses', 'backpack', 'headset', 'notebook', 'aura', 'circuits', 'shadowL', 'shadowR'];
  const shadowMat = (hex) => new THREE.MeshBasicMaterial({ color: hex, transparent: true, opacity: 0.25 });
  const shadowGeo = new THREE.PlaneGeometry(0.7, 1.2);

  function teardown() {                            // CTR-06 RG-01
    for (const n of ACCESSORY_NAMES) {
      const m = parts[n];
      if (m) { m.parent.remove(m); delete parts[n]; }
    }
  }

  function apply(v, marco) {
    const spec = AVATAR_VERSIONS[v];
    teardown();
    group.scale.setScalar(spec.scale);
    sceneApi.setWalkSpeedMul(spec.walkSpeed);

    const c = spec.components;
    if (c.hair) mk('hair', G.hair, dark, 0, 2.2, 0);
    if (c.glasses) {
      const g = mk('glasses', G.small, c.glasses === 'thin' ? emis : dark, 0, 1.92, 0.28);
      g.scale.set(2.2, 0.5, 1);
    }
    if (c.backpack) mk('backpack', G.acc, dark, 0, 1.2, -0.32);
    // headset com prefixo phase: só no marco citado (CTR-06 RG-04)
    if (c.headset === `phase:${marco.id}`) {
      const h = mk('headset', G.band, emis, 0, 2.0, 0);
      h.rotation.x = Math.PI / 2;
    }
    if (c.notebook) mk('notebook', G.small, emis, -0.75, 1.3, 0);
    if (c.aura) {
      const a = mk('aura', G.ring, new THREE.MeshBasicMaterial({
        color: 0xbfa8e0, transparent: true, opacity: 0.3, side: THREE.DoubleSide,
      }), 0, 0.03, 0);
      a.rotation.x = -Math.PI / 2;
    }
    if (c.goldCircuits) {
      const cir = mk('circuits', G.torso, gold, 0, 1.15, 0);
      cir.scale.setScalar(1.04);
    }
    // AVT-01 RG-07: sombra dupla (verde/rosa) apenas no quadrante 5 (conflito)
    if (marco.id === 'parallel_overload') {
      const sL = mk('shadowL', shadowGeo, shadowMat(0xff77c8), -0.5, 0.011, 0.3);
      sL.rotation.x = -Math.PI / 2;
      const sR = mk('shadowR', shadowGeo, shadowMat(0x4dff9c), 0.5, 0.011, -0.3);
      sR.rotation.x = -Math.PI / 2;
    }

    const changed = v !== version;
    const from = version; version = v;
    if (changed) {
      const seen = session.get().avatarSeenVersions;
      if (!seen.includes(v)) { seen.push(v); session.set({ avatarSeenVersions: seen }); }
      bus.publish('avatar:version-changed', { from, to: v, changelog: spec.changelog });
    }
  }

  bus.subscribe('phase:changed', ({ marco }) => {
    // Corpo pertence à época (ADR-002): versão = a do marco visitado.
    // apply() sempre roda (headset/sombra dependem do marco), mas só publica
    // avatar:version-changed quando a versão realmente muda (CTR-06 RG-02).
    apply(marco.avatarVersion, marco);
  });

  bus.subscribe('vale:act2', () => {               // AVT-02 RG-09: queda em cena
    const hair = parts.hair;
    if (!hair) return;
    const mat0 = hair.material;
    hair.material = mat0.clone();
    hair.material.transparent = true;
    let t = 0;
    const iv = setInterval(() => {
      t += 0.1;
      hair.material.opacity = Math.max(0, 1 - t / 1.5);
      if (t >= 1.5) { clearInterval(iv); hair.parent?.remove(hair); delete parts.hair; }
    }, 100);
  });

  // caminhada procedural + circuitos pulsando (AVT-02 RG-06)
  let sessionT = 0;
  sceneApi.onFrame((dt) => {
    sessionT += dt;
    const cyc = sceneApi.walkCycle;
    const swing = sceneApi.walking ? Math.sin(cyc * Math.PI * 2) * 0.5 : 0;
    legL.rotation.x = swing; legR.rotation.x = -swing;
    armL.rotation.x = -swing * 0.8; armR.rotation.x = swing * 0.8;
    parts.torso.position.y = 1.15 + (sceneApi.walking
      ? Math.abs(Math.sin(cyc * Math.PI * 2)) * (version === 1 ? 0.12 : 0.05)   // bounce 2× v1
      : Math.sin(sessionT * 2) * 0.015);                                        // respiração
    if (parts.circuits) parts.circuits.material.emissiveIntensity = 0.35 + 0.25 * Math.sin(sessionT * Math.PI * 2); // 1s
    if (parts.notebook) {                                                       // caderno orbital
      parts.notebook.position.x = -0.75 + Math.cos(sessionT * 1.57) * 0.15;
      parts.notebook.position.z = Math.sin(sessionT * 1.57) * 0.4;
    }
    if (parts.aura) parts.aura.material.opacity = 0.22 + 0.08 * Math.sin(sessionT * Math.PI);  // .5Hz
  });

  return { get version() { return version; }, _parts: parts };
}
