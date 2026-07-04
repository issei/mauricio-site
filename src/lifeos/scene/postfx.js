// CMP-05 PostFX — RND-04
// RenderPass → UnrealBloom → CRT (curvatura, aberração, scanlines, vinheta,
// dessaturação p/ safe-mode). Fallback de performance (PRF-01 RG-05).

import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';
import { bus } from '../core/bus.js';

const CRTShader = {
  uniforms: {
    tDiffuse: { value: null }, uTime: { value: 0 },
    uAberration: { value: 1.0 },     // 1 = repouso; crise até 6 (RG-03)
    uCurvature: { value: 0.06 }, uScanline: { value: 0.12 },
    uDesat: { value: 0 }, uExposure: { value: 1 },
  },
  vertexShader: `varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`,
  fragmentShader: /* glsl */`
    uniform sampler2D tDiffuse;
    uniform float uTime,uAberration,uCurvature,uScanline,uDesat,uExposure;
    varying vec2 vUv;
    void main(){
      vec2 uv = vUv * 2. - 1.;
      uv *= 1. + uCurvature * dot(uv, uv);            // barril
      uv = uv * .5 + .5;
      if (uv.x<0.||uv.x>1.||uv.y<0.||uv.y>1.) { gl_FragColor=vec4(0.); return; }
      vec2 dir = (uv - .5) * 0.0015 * uAberration;    // aberração radial
      vec3 col;
      col.r = texture2D(tDiffuse, uv + dir).r;
      col.g = texture2D(tDiffuse, uv).g;
      col.b = texture2D(tDiffuse, uv - dir).b;
      float sl = sin((uv.y + uTime*.02) * 800.) * .5 + .5;
      col *= 1. - uScanline * sl;
      float vig = smoothstep(1.0, .35, distance(uv, vec2(.5)));
      col *= mix(.75, 1., vig);
      float g = dot(col, vec3(.299,.587,.114));
      col = mix(col, vec3(g), uDesat);                // safe-mode: cor vaza
      gl_FragColor = vec4(col * uExposure, 1.);
    }`,
};

export function createPostFX(sceneApi, a11y) {
  const { renderer, scene, camera } = sceneApi;
  const composer = new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene, camera));
  const bloom = new UnrealBloomPass(new THREE.Vector2(innerWidth, innerHeight), 0.55, 0.7, 0.82);
  composer.addPass(bloom);
  const crt = new ShaderPass(CRTShader);
  composer.addPass(crt);
  const U = crt.uniforms;

  let safe = a11y.get().safeMode || a11y.get().reducedMotion;
  const lerpTargets = { uAberration: 1, uDesat: 0, uExposure: 1 };

  bus.subscribe('a11y:changed', (f) => {
    safe = f.safeMode || f.reducedMotion;             // interpola 400ms via lerp abaixo
    if (safe) { lerpTargets.uAberration = 1; }
  });

  // flash de revelação: DOM (#glitch-flash) | safe: dip de exposição (RG-04)
  const flashEl = document.getElementById('glitch-flash');
  bus.subscribe('monolith:reveal-start', () => {
    if (safe) {
      lerpTargets.uExposure = 0.6;
      setTimeout(() => { lerpTargets.uExposure = 1; }, 600);
    } else {
      flashEl?.classList.add('on');
      setTimeout(() => flashEl?.classList.remove('on'), 300);
      sceneApi.shake(0.5);
      lerpTargets.uAberration = 4;
      setTimeout(() => { lerpTargets.uAberration = 1; }, 900);   // pico curto (< teto 3s)
    }
  });

  // fallback de performance (PRF-01 RG-05) — degraus 1 e 2
  let acc = 0, n = 0, level = 0;
  sceneApi.onFrame((dt, t) => {
    U.uTime.value = t;
    for (const k of Object.keys(lerpTargets)) {
      U[k].value += (lerpTargets[k] - U[k].value) * Math.min(1, dt / 0.4);
    }
    acc += dt; n++;
    if (acc >= 2) {
      const avg = acc / n; acc = 0; n = 0;
      if (avg > 0.033 && level === 0) { level = 1; bloom.enabled = false; console.warn('[perf] degradando camada 1 (bloom off).'); }
      else if (avg > 0.033 && level === 1) { level = 2; renderer.setPixelRatio(1); console.warn('[perf] degradando camada 2 (pixelRatio 1).'); }
    }
  });

  sceneApi.setRender(() => composer.render());
  addEventListener('resize', () => composer.setSize(innerWidth, innerHeight));

  return {
    setCrisis(v) {                                    // GMP-04 (alpha) usará
      lerpTargets.uAberration = safe ? 1 : (v ? 6 : 1);
      lerpTargets.uDesat = safe && v ? 0.8 : 0;
    },
  };
}
