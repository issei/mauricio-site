// CMP-07 MonolithSystem — GMP-01 / GMP-02
// Proximidade → sequência de revelação → modal com decode progressivo.
// emotionalLoad 3: hold sustentado em 3 ciclos de respiração (anti-freeze RG-01).

import { bus } from '../core/bus.js';

const REVEAL_DIST = 4;
const RES_STEPS = [6, 14, 32, 64, 128, 0];      // 0 = resolução final

export function createMonolith(sceneApi, story, session, audio, dom) {
  // dom: { modal, canvas, status, period, title, text, closeBtn, holdPrompt }
  let lock = false;
  const ctx = dom.canvas.getContext('2d');       // 1 canvas global (PRF-01 RG-03)
  ctx.imageSmoothingEnabled = false;

  bus.subscribe('player:moved', ({ z }) => {
    if (lock) return;
    if (Math.abs(z - (-52)) < REVEAL_DIST) {
      const marco = story.current;
      if (story.isUnlocked(marco.id)) return;    // GMP-01 RG-06 tratado no cd/revisita
      lock = true;
      bus.publish('monolith:reveal-start', { marcoId: marco.id });
      setTimeout(() => openModal(marco), 1300);  // timeline RG-02
    }
  });

  function loadImage(src) {
    return new Promise((res) => {
      if (!src) return res(null);
      const img = new Image();
      img.onload = () => res(img);
      img.onerror = () => res(null);             // 404 → frame corrompido (RG §extremos)
      img.src = src;
    });
  }

  function drawStep(img, stepPx) {
    const W = dom.canvas.width, H = dom.canvas.height;
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, W, H);
    if (!img) {                                  // frame preto (marco 6 / 404)
      ctx.fillStyle = '#111';
      for (let i = 0; i < 40; i++) ctx.fillRect(Math.random() * W, Math.random() * H, 24, 8);
      return;
    }
    if (stepPx === 0) { ctx.drawImage(img, 0, 0, W, H); return; }
    const t = document.createElement('canvas');  // downscale → upscale sem smoothing
    t.width = stepPx; t.height = Math.max(1, Math.round(stepPx * H / W));
    t.getContext('2d').drawImage(img, 0, 0, t.width, t.height);
    ctx.drawImage(t, 0, 0, W, H);
  }

  async function openModal(marco) {
    dom.period.textContent = marco.period;
    dom.title.textContent = marco.title;
    dom.text.textContent = '';
    dom.status.textContent = 'decodificando… 0%';
    dom.closeBtn.disabled = true;
    dom.holdPrompt.hidden = true;
    dom.modal.classList.add('open');
    const img = await loadImage(marco.image?.src);
    if (marco.emotionalLoad === 3) await decodeHeavy(img);
    else await decodeLight(img, marco.emotionalLoad);
    await typewriter(marco.text, marco.emotionalLoad === 3);
    dom.closeBtn.disabled = false;
    dom.closeBtn.focus();
  }

  function pct(p) { dom.status.textContent = `decodificando… ${Math.round(p)}%`; }

  async function decodeLight(img, load) {
    for (let i = 0; i < RES_STEPS.length; i++) {
      drawStep(img, RES_STEPS[i]);
      pct((i + 1) / RES_STEPS.length * 100);
      audio.decodeBeep(false);
      bus.publish('monolith:decode-progress', { marcoId: story.current.id, pct: (i + 1) / RES_STEPS.length * 100, holding: false });
      await sleep(load === 2 && i === 2 ? 800 : 350);   // travamento breve (RG-04)
    }
  }

  // GMP-02: 3 ciclos de ~2,5s com janelas de respiração; feedback ≤1,5s sempre.
  async function decodeHeavy(img) {
    drawStep(img, 14);
    dom.holdPrompt.hidden = false;
    let held = false;
    const down = (e) => { if (e.type !== 'keydown' || e.code === 'Enter') held = true; };
    const up = () => { held = false; };
    addEventListener('keydown', down); addEventListener('keyup', up);
    dom.modal.addEventListener('pointerdown', down);       // mobile: área inteira (RG-06)
    dom.modal.addEventListener('pointerup', up);

    let progress = 0;                                      // 0..100
    for (let cycle = 0; cycle < 3; cycle++) {
      const target = (cycle + 1) * 33.4;
      let sinceFeedback = 0;
      while (progress < target) {
        await sleep(100);
        sinceFeedback += 100;
        if (held) {
          progress = Math.min(target, progress + 100 / 2500 * 33.4);   // ciclo ~2,5s
          pct(progress);
          if (sinceFeedback >= 700) {                       // beep+bloco ≤1,5s (RG-01)
            sinceFeedback = 0;
            audio.decodeBeep(true);
            drawStep(img, 14 + Math.round(progress));       // resolução avança
          }
          bus.publish('monolith:decode-progress', { marcoId: story.current.id, pct: progress, holding: true });
        } else {
          // pausado: percentual congela ANIMANDO (pulso) — RG-03
          dom.status.style.opacity = 0.4 + 0.4 * Math.sin(performance.now() / 300);
          if (sinceFeedback >= 1400) { sinceFeedback = 0; audio.decodeBeep(true); }
        }
        dom.status.style.opacity = held ? 1 : dom.status.style.opacity;
      }
      if (cycle < 2) {                                      // janela de respiração (RG-02)
        dom.holdPrompt.textContent = '> solte. respire. segure de novo.';
        await sleep(800);
        dom.holdPrompt.textContent = 'SEGURE PARA SUSTENTAR A DECODIFICAÇÃO';
      }
    }
    drawStep(img, 0);
    pct(100);
    dom.holdPrompt.hidden = true;
    removeEventListener('keydown', down); removeEventListener('keyup', up);
    dom.modal.removeEventListener('pointerdown', down);
    dom.modal.removeEventListener('pointerup', up);
  }

  async function typewriter(text, heavy) {
    // GMP-02 RG-05: backspaces roteirizados nas memórias pesadas (NAR-04)
    const script = heavy && text.includes('a conta venceu')
      ? [['a conta venceu tod', 18], ['\b', 1], ['a de uma vez.', 18], [text.slice(text.indexOf('a conta venceu toda de uma vez.') + 31), 18]]
      : [[text, 18]];
    let out = '';
    let n = 0;
    for (const [chunk, delay] of script) {
      for (const ch of chunk) {
        if (ch === '\b') out = out.slice(0, -1);
        else out += ch;
        dom.text.textContent = out;
        if (++n % 3 === 0) audio.beep(880, 15, 0.015);
        await sleep(delay);
      }
    }
    dom.text.textContent = heavy ? text : out;             // leitor de tela: íntegro (UI-04 RG-07)
  }

  dom.closeBtn.addEventListener('click', () => {
    dom.modal.classList.remove('open');
    const marco = story.current;
    bus.publish('memory:unlocked', { marcoId: marco.id });
    lock = false;
    setTimeout(() => story.advance(), 600);                // avanço de fase (fluxo P01)
  });

  return {};
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
