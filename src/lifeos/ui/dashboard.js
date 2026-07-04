// CMP-09 TelemetryDashboard — UI-01 / UI-02 / CTR-04
// 4 métricas com sparklines; estados AMBIENT/PAGED/FOCUS; valores da tabela
// TELEMETRY_RULES + ruído ±3%; NaN = lacuna; linha dourada 97 pós-Vale.

import { bus } from '../core/bus.js';
import { TELEMETRY_RULES, PAGED_THRESHOLDS, ARC_THEME, FIXED_COLORS } from '../story/data.js';

const N = 40, REFRESH = 350;

export function createDashboard(container, session, story) {
  const metrics = ['stress', 'threads', 'loc', 'tokens'];
  const labels = { stress: 'STRESS', threads: 'ACTIVE THREADS', loc: 'LOC COMPILED', tokens: 'TOKEN/S' };
  const colors = { stress: FIXED_COLORS.stress, threads: FIXED_COLORS.threads, tokens: FIXED_COLORS.tokens, loc: null };

  const hist = {}; const panels = {};
  let uiState = 'AMBIENT';                        // UI-02
  let pagedMetric = null, pagedTimer = null;
  const lastPaged = {};                           // cooldown 8s
  let walking = false, locVal = 0, phaseT = 0, prevThreads = 1, prevLocMode = null;

  container.replaceChildren();                    // SEC-01 RG-01
  const strip = el('div', 'tele-strip');          // régua AMBIENT
  container.appendChild(strip);
  const stripVals = {};
  for (const m of metrics) {
    const s = el('span', 'tele-strip-item');
    s.append(el('b', '', labels[m].split(' ')[0]), stripVals[m] = el('i'));
    strip.appendChild(s);
    hist[m] = new Array(N).fill(NaN);
    const p = el('div', 'tele-panel');
    p.append(el('label', '', labels[m]), panels[`${m}Val`] = el('output'),
             panels[`${m}Cv`] = Object.assign(document.createElement('canvas'), { width: 150, height: 40 }),
             panels[`${m}Sub`] = el('small'));
    p.hidden = true;
    container.appendChild(p);
    panels[m] = p;
  }

  bus.subscribe('player:moved', () => { walking = true; });
  bus.subscribe('player:idle', () => { walking = false; });
  bus.subscribe('monolith:reveal-start', () => setState('FOCUS'));
  bus.subscribe('memory:unlocked', () => setState('AMBIENT'));
  bus.subscribe('cli:opened', () => setState('FOCUS'));
  bus.subscribe('cli:closed', () => setState('AMBIENT'));
  bus.subscribe('phase:changed', () => { phaseT = 0; });

  function setState(s) {
    uiState = s;
    container.dataset.state = s;                  // CSS controla opacidades (UI-02)
    if (s !== 'PAGED' && pagedMetric) { panels[pagedMetric].hidden = true; pagedMetric = null; }
  }

  function page(metric, citavel) {
    const now = performance.now();
    if (uiState === 'FOCUS') return;              // suprimido (RG-04)
    if (now - (lastPaged[metric] ?? -1e9) < 8000) return;
    lastPaged[metric] = now;
    if (pagedMetric) panels[pagedMetric].hidden = true;
    pagedMetric = metric;
    panels[metric].hidden = false;
    panels[`${metric}Sub`].textContent = citavel;
    panels[metric].classList.remove('pulse'); void panels[metric].offsetWidth;
    panels[metric].classList.add('pulse');
    setState('PAGED');
    clearTimeout(pagedTimer);
    pagedTimer = setTimeout(() => setState('AMBIENT'), 8000);
    bus.publish('metric:paged', { metric, value: hist[metric][N - 1], threshold: 0, citavel });
  }

  function sample() {
    const marco = story.current;
    const R = TELEMETRY_RULES[marco.telemetryKey];
    phaseT += REFRESH / 1000;
    const noise = () => 1 + (Math.random() - 0.5) * 0.06;   // ±3% (CTR-04 RG-01)

    // stress
    let stress;
    const S = R.stress;
    if (S.ramp) {                                            // Vale: rampa + NaN
      const t = Math.min(1, phaseT / 60);
      stress = (S.ramp[0] + (S.ramp[1] - S.ramp[0]) * t) * noise();
      if (Math.random() * 100 < S.nanPct) stress = NaN;
    } else if (S.osc) {
      stress = (S.base + Math.sin(phaseT * 2 * Math.PI / S.oscPeriod) * S.osc) * noise();
    } else stress = S.base * noise();

    // threads (com paged em mudança)
    const th = R.threads.value;
    if (th !== prevThreads) {
      page('threads', PAGED_THRESHOLDS.threads.citavel(prevThreads, th));
      prevThreads = th;
    }

    // loc
    const L = R.loc;
    if (L.mode !== prevLocMode) {
      if (prevLocMode !== null) page('loc', PAGED_THRESHOLDS.loc.citavel(L.mode));
      prevLocMode = L.mode;
    }
    if (L.mode === 'linear' && walking) locVal += 3 * (L.rate ?? 1);
    else if (L.mode === 'exp' && walking) locVal += Math.max(3, locVal * 0.004) * (L.rate ?? 1);

    // tokens
    const tokens = R.tokens.saturated ? 96 + Math.random() * 4 : R.tokens.value * noise();

    push('stress', stress); push('threads', th); push('loc', locVal); push('tokens', tokens);

    if (stress > PAGED_THRESHOLDS.stress.above) page('stress', PAGED_THRESHOLDS.stress.citavel(stress));
    if (tokens >= PAGED_THRESHOLDS.tokens.above) page('tokens', PAGED_THRESHOLDS.tokens.citavel(tokens));

    render();
  }

  function push(m, v) { hist[m].shift(); hist[m].push(v); }

  function fmt(m, v) {
    if (Number.isNaN(v)) return '—';
    if (m === 'loc') return v > 1e6 ? `${(v / 1e6).toFixed(1)}M` : v > 1e3 ? `${(v / 1e3).toFixed(1)}k` : `${Math.round(v)}`;
    if (m === 'stress' || m === 'tokens') return `${Math.round(v)}${m === 'stress' ? '%' : ''}`;
    return `${v}`;
  }

  function render() {
    const arcColor = ARC_THEME[story.current.arc].accent;
    for (const m of metrics) {
      const v = hist[m][N - 1];
      stripVals[m].textContent = fmt(m, v);
      panels[`${m}Val`].textContent = fmt(m, v);
      const cv = panels[`${m}Cv`], c = cv.getContext('2d');
      c.clearRect(0, 0, cv.width, cv.height);
      const max = m === 'threads' ? 6 : m === 'loc' ? Math.max(10, ...hist.loc.filter(Number.isFinite)) : 100;
      c.strokeStyle = colors[m] ?? arcColor;
      c.lineWidth = 1;
      c.beginPath();
      let pen = false;
      hist[m].forEach((val, i) => {
        if (Number.isNaN(val)) { pen = false; return; }     // NaN = lacuna (UI-01 RG-03)
        const x = i / (N - 1) * cv.width;
        const y = cv.height - Math.min(1, val / max) * (cv.height - 4) - 2;
        pen ? c.lineTo(x, y) : c.moveTo(x, y);
        pen = true;
      });
      c.stroke();
      if (m === 'stress' && session.get().valeResolved) {   // linha dourada 97 (RG-03)
        c.strokeStyle = FIXED_COLORS.gold;
        const y = cv.height - 0.97 * (cv.height - 4) - 2;
        c.beginPath(); c.moveTo(0, y); c.lineTo(cv.width, y); c.stroke();
        c.fillStyle = FIXED_COLORS.gold; c.font = '8px monospace';
        c.fillText('max', cv.width - 20, y - 2);
      }
    }
  }

  setInterval(sample, REFRESH);
  setState('AMBIENT');
  return { get state() { return uiState; } };
}

function el(tag, cls = '', text = '') {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (text) e.textContent = text;
  return e;
}
