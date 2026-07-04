// CMP-13 AudioEngine — AUD-01 / CTR-07
// 4 cadeias procedurais sempre ativas (mix por gain, crossfade 1.4s) +
// via SFX independente (Web Audio pura, latência mínima).
// Nada toca antes de audio:unlocked (gesto do usuário).

import { bus } from '../core/bus.js';
import { ARC_THEME } from '../story/data.js';

const XFADE = 1.4;

export function createAudio() {
  const Tone = globalThis.Tone;
  const chains = {};              // audioChain -> { gain, dispose[] }
  let ready = false;
  let activeChain = null;
  let sfxCtx = null;
  let sfxMuted = false;

  // ---------- via SFX (AUD-01 RG-07/08) ----------
  function beep(freq = 880, durMs = 40, vol = 0.04) {
    if (!sfxCtx || sfxMuted) return;
    const t = sfxCtx.currentTime;
    const osc = sfxCtx.createOscillator();
    const g = sfxCtx.createGain();
    osc.type = 'square'; osc.frequency.value = freq;
    g.gain.setValueAtTime(vol, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + durMs / 1000);
    osc.connect(g).connect(sfxCtx.destination);
    osc.start(t); osc.stop(t + durMs / 1000 + 0.01);
  }

  // ---------- cadeias (AUD-01 RG-02..05) ----------
  function buildChains() {
    const mk = () => { const g = new Tone.Gain(0).toDestination(); return g; };

    { // chain-infancia: quadrada, arpejo pentatônico, 8n, BPM base do transporte
      const g = mk();
      const synth = new Tone.Synth({ oscillator: { type: 'square' }, volume: -18 }).connect(g);
      const notes = ['C4', 'D4', 'E4', 'G4', 'A4', 'G4', 'E4', 'D4'];
      let i = 0;
      const loop = new Tone.Loop((t) => { synth.triggerAttackRelease(notes[i++ % notes.length], '16n', t); }, '8n').start(0);
      chains['chain-infancia'] = { gain: g, parts: [loop, synth] };
    }
    { // chain-tecnologia: cliques de teclado (noise p=.35/16n) + FM esparso
      const g = mk();
      const noise = new Tone.NoiseSynth({ volume: -26, envelope: { attack: 0.001, decay: 0.03, sustain: 0 } }).connect(g);
      const fm = new Tone.FMSynth({ volume: -20 }).connect(g);
      const clicks = new Tone.Loop((t) => { if (Math.random() < 0.35) noise.triggerAttackRelease('16n', t); }, '16n').start(0);
      const chordNotes = ['C3', 'G3', 'D3', 'A3'];
      let ci = 0;
      const pulses = new Tone.Loop((t) => { fm.triggerAttackRelease(chordNotes[ci++ % 4], '8n', t); }, '2n').start(0);
      chains['chain-tecnologia'] = { gain: g, parts: [clicks, pulses, noise, fm], noiseLoop: clicks };
    }
    { // chain-familia: PolySynth triangular, I–vi–IV–V em F, 2 compassos/acorde
      const g = mk();
      const poly = new Tone.PolySynth(Tone.Synth, { oscillator: { type: 'triangle' }, volume: -20 }).connect(g);
      const prog = [['F3', 'A3', 'C4'], ['D3', 'F3', 'A3'], ['Bb2', 'D3', 'F3'], ['C3', 'E3', 'G3']];
      let pi = 0;
      const loop = new Tone.Loop((t) => { poly.triggerAttackRelease(prog[pi++ % 4], '1m', t); }, '2m').start(0);
      chains['chain-familia'] = { gain: g, parts: [loop, poly], poly };
    }
    { // chain-maturidade: AM + reverb longo + blips por ping-pong
      const g = mk();
      const rev = new Tone.Reverb({ decay: 8, wet: 0.6 }).connect(g);
      const am = new Tone.AMSynth({ volume: -18 }).connect(rev);
      const delay = new Tone.PingPongDelay(0.25, 0.5).connect(g);
      const blip = new Tone.Synth({ volume: -24, oscillator: { type: 'sine' } }).connect(delay);
      const notes = ['D4', 'A4', 'F4', 'C5'];
      let ni = 0;
      const slow = new Tone.Loop((t) => { am.triggerAttackRelease(notes[ni++ % 4], '2m', t); }, '4m').start(0);
      const blips = new Tone.Loop((t) => { if (Math.random() < 0.4) blip.triggerAttackRelease(notes[(ni + 2) % 4], '16n', t); }, '1m').start(0);
      chains['chain-maturidade'] = { gain: g, parts: [slow, blips, am, blip, rev, delay] };
    }
  }

  function switchChain(name) {
    if (!ready || !chains[name] || name === activeChain) return;
    const now = Tone.now();
    for (const [k, c] of Object.entries(chains)) {
      c.gain.gain.cancelScheduledValues(now);
      c.gain.gain.rampTo(k === name ? 1 : 0, XFADE);      // crossfade (RG-01)
    }
    activeChain = name;
  }

  bus.subscribe('audio:unlocked', async () => {
    if (ready) return;
    sfxCtx = new (globalThis.AudioContext || globalThis.webkitAudioContext)();
    if (!Tone) { console.warn('[audio] Tone.js ausente — jogo segue mudo (SFX ok).'); return; }
    await Tone.start();
    Tone.Transport.bpm.value = 100;
    buildChains();
    Tone.Transport.start();
    ready = true;
  });

  bus.subscribe('phase:changed', ({ marco }) => {
    switchChain(ARC_THEME[marco.arc].audioChain);
    // pico de digitação no marco 4 (NAR-01) — p sobe p/ .5 aproximando via volume
    const tech = chains['chain-tecnologia'];
    if (tech?.noiseLoop) tech.noiseLoop.probability = marco.id === 'incident_queue' ? 1 : 0.7;
  });

  bus.subscribe('monolith:reveal-start', () => beep(660, 70, 0.05));      // CUE-REVEAL
  bus.subscribe('monolith:decode-progress', ({ holding }) => {            // CUE-DECODE (leve)
    if (holding) beep(440, 25, 0.02);
  });

  return {
    beep,
    decodeBeep(heavy) { beep(heavy ? 352 : 440, 30, 0.03); },             // -20% freq se pesado
    setSfxMuted(v) { sfxMuted = v; },
    get ready() { return ready; },
  };
}
