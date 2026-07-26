/*
 * Mecânicas dos 6 capítulos — Operação Capital Cognitivo (spec doc 02).
 * Cada init recebe o contexto { engine, board, boardEngine, eventEngine, ctx } e
 * dispara ctx.complete(n) ao atingir o critério de conclusão do capítulo.
 */
import { fmtBRL } from './hud.js';
import { renderEvidencePanel, openEvidencePanel } from './evidence-ui.js';

const $ = (sel, root = document) => root.querySelector(sel);
const el = (tag, cls, html) => { const e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; };

// =============================== CAP 1 ===============================
const INVOICE_LINES = [
  { id: 'api', icon: '🔌', label: 'Custo de API (LLM)', value: 'R$ 3.000', pct: '7,5%', detail: 'Chamadas de inferência ao Model-Lite. 10.000 requests. É a única linha que a maioria das empresas enxerga.' },
  { id: 'human', icon: '👥', label: 'Revisão e Refatoração Humana', mystery: true },
  { id: 'infra', icon: '🗄️', label: 'Infra / Vector DB / Observabilidade', value: 'R$ 4.800', pct: '12%', detail: 'Banco vetorial, índice HNSW, monitoramento e logs. Cresce com a profundidade do RAG.' },
  { id: 'gov', icon: '📋', label: 'Overhead de Governança / Compliance', value: 'R$ 3.400', pct: '8,5%', detail: 'Auditoria, trilhas de decisão e conformidade — invisível até uma regulação bater à porta.' },
  { id: 'over', icon: '🧾', label: 'Outros overheads operacionais', value: 'R$ 0', pct: '0%', detail: 'Custos residuais já absorvidos nas linhas acima nesta simulação.' },
];

export function initCap1({ board, ctx }) {
  const wrap = $('#invoice-explorer');
  wrap.innerHTML = `
    <div class="bg-occ-surface-2 px-6 py-4 border-b border-gray-700/50">
      <h3 class="font-mono text-green-400 text-sm">NEXUS TECH CORP — RELATÓRIO FINANCEIRO DE IA</h3>
      <p class="text-sm text-gray-500">Período: Outubro/2025 · Status: ⚠️ Investigação em curso</p>
    </div>
    <div id="invoice-lines" class="divide-y divide-gray-700/30"></div>`;
  const linesEl = $('#invoice-lines', wrap);
  const opened = new Set();

  INVOICE_LINES.forEach((line) => {
    const d = el('details', 'group');
    d.id = `invoice-${line.id}`;
    const border = line.mystery ? 'border-l-2 border-amber-500' : '';
    d.innerHTML = `
      <summary class="flex items-center justify-between px-6 py-4 cursor-pointer hover:bg-white/5 ${border}">
        <span class="flex items-center gap-3"><span class="text-lg">${line.icon}</span><span class="font-medium">${line.label}</span>
          ${line.mystery ? '<span class="bg-amber-500/20 text-amber-400 text-xs px-2 py-0.5 rounded">?</span>' : ''}</span>
        <span class="flex items-center gap-4">
          ${line.mystery ? '<span class="font-mono text-amber-400 font-bold">Investigar ↓</span>' : `<span class="font-mono text-white font-bold">${line.value}</span><span class="text-xs bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded">${line.pct}</span>`}
          <span class="text-gray-500 group-open:rotate-180 transition-transform">▼</span>
        </span>
      </summary>
      <div class="px-6 pb-4 pt-2 bg-occ-bg/50 text-sm text-gray-400" id="invoice-${line.id}-detail"></div>`;
    linesEl.appendChild(d);
    const detailEl = $(`#invoice-${line.id}-detail`, d);
    d.addEventListener('toggle', () => {
      if (!d.open) return;
      if (line.mystery) {
        detailEl.innerHTML = `
          <p>Sarah Chen (VP Ops): "Aloquei 3 devs sêniores (R$ 120/hora) por 2 semanas para corrigir outputs incorretos."</p>
          <p class="font-mono text-amber-300 mt-2">3 devs × R$ 120/h × 80h = R$ 28.800</p>
          <button id="ctx-switch-btn" class="text-xs text-blue-400 underline mt-2">Por que 80h e não 40h?</button>
          <p id="ctx-switch-detail" hidden class="mt-2 text-gray-500">Cada troca entre revisar a IA e o próprio código custa ~23 min de recontextualização. Metade do tempo é essa fricção — a <strong>Carga de Verificação</strong>, não a correção em si.</p>`;
        $('#ctx-switch-btn', detailEl)?.addEventListener('click', (e) => { e.preventDefault(); $('#ctx-switch-detail', detailEl).hidden = false; });
      } else {
        detailEl.textContent = line.detail;
      }
      opened.add(line.id);
      if (opened.size === INVOICE_LINES.length) revealPie();
    });
  });

  function revealPie() {
    const reveal = $('#cap1-reveal');
    if (!reveal.hidden) return;
    reveal.hidden = false;
    drawPie($('#tco-pie-chart'), [
      { label: 'Tempo Dev', value: 72, color: '#dc2626' },
      { label: 'Infra', value: 12, color: '#3b82f6' },
      { label: 'Governança', value: 8.5, color: '#d97706' },
      { label: 'API', value: 7.5, color: '#22c55e' },
    ]);
    board.unlock('EVID_01');
    reveal.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  $('#show-tco-table')?.addEventListener('click', (e) => {
    const t = $('#tco-data-table'); const open = t.hidden === false;
    t.hidden = open; e.target.setAttribute('aria-expanded', String(!open));
  });
  $('#scene-cap1 [data-next]')?.addEventListener('click', () => ctx.complete(1));
}

function drawPie(canvas, slices) {
  if (!canvas?.getContext) return;
  const c = canvas.getContext('2d');
  const cx = canvas.width / 2, cy = canvas.height / 2, r = Math.min(cx, cy) - 8;
  const total = slices.reduce((s, x) => s + x.value, 0);
  const legend = document.getElementById('tco-pie-legend'); if (legend) legend.innerHTML = '';
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let start = -Math.PI / 2;
  const segs = slices.map((s) => { const ang = (s.value / total) * Math.PI * 2; const seg = { ...s, start, end: start + ang }; start += ang; return seg; });
  const render = (t) => {
    c.clearRect(0, 0, canvas.width, canvas.height);
    for (const s of segs) {
      const end = s.start + (s.end - s.start) * t;
      c.beginPath(); c.moveTo(cx, cy); c.arc(cx, cy, r, s.start, end); c.closePath();
      c.fillStyle = s.color; c.fill();
    }
    if (t < 1 && !reduce) requestAnimationFrame(() => render(Math.min(1, t + 0.04)));
  };
  render(reduce ? 1 : 0);
  if (legend) slices.forEach((s) => legend.appendChild(el('span', 'flex items-center gap-1', `<span style="width:10px;height:10px;border-radius:2px;background:${s.color};display:inline-block"></span>${s.label} ${s.value}%`)));
}

// =============================== CAP 2 ===============================
export function initCap2({ engine, board, ctx }) {
  const body = $('#cap2-body');
  body.innerHTML = `
    <div class="bg-occ-surface rounded-2xl border border-gray-700/50 p-6">
      <p class="text-sm text-gray-400 mb-2">10.000 tarefas. Quantas o modelo conclui <strong>na 1ª tentativa</strong>?</p>
      <button id="btn-run-simulation" class="cta-gradient text-white font-semibold py-2 px-5 rounded-xl">Executar simulação</button>
      <div id="sim-result" hidden class="mt-6">
        <div class="overflow-x-auto"><table class="w-full text-sm">
          <thead><tr class="text-gray-500 text-left"><th>Modelo</th><th>R_m</th><th>Tentativas/tarefa</th><th>Horas Dev</th><th>V_core</th><th class="text-right">TCO real</th></tr></thead>
          <tbody>
            <tr class="border-t border-gray-700/40"><th scope="row" class="text-left font-normal py-2">Model-Lite</th><td>42%</td><td class="font-mono">2,38</td><td>87h</td><td class="font-mono" style="color:var(--color-sim-vcore)">68</td><td class="text-right font-mono">R$ 12.900</td></tr>
            <tr class="border-t border-gray-700/40"><th scope="row" class="text-left font-normal py-2">Model-Pro</th><td>91%</td><td class="font-mono">1,10</td><td>10h</td><td class="font-mono" style="color:var(--color-sim-vcore-ok)">24</td><td class="text-right font-mono">R$ 2.450</td></tr>
          </tbody>
        </table></div>
        <p class="text-sm text-gray-400 mt-4">Tentativas esperadas por tarefa = <span class="font-mono">1 / R_m</span>. O Model-Lite, <em>overconfident</em> (declara 85%, entrega 42%), infla a Carga de Verificação e leva o time à fadiga.</p>
        <div class="mt-6">
          <p class="text-sm text-white font-medium mb-3">Qual modelo você recomenda?</p>
          <div class="flex gap-3">
            <button id="choice-model-lite" class="border border-gray-600 rounded-lg py-2 px-4 hover:border-red-500/60">Model-Lite (barato/token)</button>
            <button id="choice-model-pro" class="border border-gray-600 rounded-lg py-2 px-4 hover:border-green-500/60">Model-Pro (maior R_m)</button>
          </div>
        </div>
      </div>
    </div>`;

  $('#btn-run-simulation', body).addEventListener('click', () => {
    $('#sim-result', body).hidden = false;
    board.unlock('EVID_02'); board.unlock('EVID_08');
  });
  const pick = (model) => { engine.recordModelChoice(model); ctx.refresh(); ctx.complete(2); };
  $('#choice-model-lite', body).addEventListener('click', () => pick('lite'));
  $('#choice-model-pro', body).addEventListener('click', () => pick('pro'));
}

// =============================== CAP 3 ===============================
const F_BLOCKS = [
  { c: 'work', label: 'Trabalho Correto Aprovado', group: 'num' },
  { c: 'api', label: 'Custo API', group: 'mon' },
  { c: 'infra', label: 'Custo de Infraestrutura', group: 'mon' },
  { c: 'human', label: 'Custo Revisão Humana', group: 'hum' },
];

export function initCap3({ board, ctx }) {
  const canvas = $('#formula-canvas');
  canvas.innerHTML = `
    <div id="formula-blocks" class="flex flex-wrap gap-2 mb-8" aria-label="Blocos de conceito"></div>
    <div class="flex flex-col items-center gap-3">
      <div id="formula-numerator" class="drop-zone min-w-[220px] min-h-[52px] border-2 border-dashed border-gray-600 rounded-xl flex flex-wrap items-center justify-center gap-1 text-gray-500 text-sm p-2" role="group" aria-label="Numerador" aria-live="assertive">Numerador — arraste aqui</div>
      <div class="text-3xl text-gray-500">÷</div>
      <div id="formula-denominator" class="drop-zone min-w-[220px] min-h-[52px] border-2 border-dashed border-gray-600 rounded-xl flex flex-wrap items-center justify-center gap-1 text-gray-500 text-sm p-2" role="group" aria-label="Denominador" aria-live="assertive">Denominador — arraste aqui</div>
    </div>
    <div id="formula-validator" class="mt-6 text-center text-sm" hidden></div>
    <div id="formula-naming" class="mt-8" hidden>
      <label class="block text-sm text-gray-400 mb-2" for="metric-name-input">Ótima lógica. Dê um nome para esse indicador:</label>
      <input type="text" id="metric-name-input" maxlength="60" placeholder="Ex.: Índice de Eficiência de IA"
        class="w-full bg-occ-surface border border-gray-600 rounded-xl px-4 py-3 text-white focus:border-purple-500 focus:outline-none" />
      <button id="metric-name-confirm" class="mt-3 cta-gradient text-white font-semibold py-2 px-5 rounded-xl">Nomear</button>
    </div>
    <div id="formula-reveal" hidden class="mt-8 text-center"></div>`;

  const blocksEl = $('#formula-blocks', canvas);
  const num = $('#formula-numerator', canvas), den = $('#formula-denominator', canvas);
  const placed = { num: [], den: [] };
  let selected = null;
  const groupColor = { num: '#8a2be2', mon: '#3b82f6', hum: '#f97316' };

  F_BLOCKS.forEach((b) => {
    const chip = el('div', 'formula-block bg-occ-surface border rounded-lg px-3 py-2 text-sm text-white');
    chip.style.borderColor = groupColor[b.group];
    chip.textContent = b.label; chip.tabIndex = 0; chip.dataset.concept = b.c; chip.draggable = true;
    chip.addEventListener('dragstart', (e) => e.dataTransfer.setData('text/plain', b.c));
    chip.addEventListener('click', () => { document.querySelectorAll('.formula-block').forEach((x) => x.classList.remove('selected')); chip.classList.add('selected'); selected = b.c; });
    blocksEl.appendChild(chip);
  });

  const place = (zone, concept) => {
    const b = F_BLOCKS.find((x) => x.c === concept); if (!b) return;
    const key = zone === num ? 'num' : 'den';
    if (placed[key].includes(concept)) return;
    placed[key].push(concept);
    if (placed[key].length === 1) zone.innerHTML = '';
    const tag = el('span', 'inline-block bg-occ-bg rounded px-2 py-1 text-xs text-white'); tag.textContent = b.label; tag.style.border = `1px solid ${groupColor[b.group]}`;
    zone.appendChild(tag);
    validate();
  };
  [num, den].forEach((zone) => {
    zone.addEventListener('dragover', (e) => e.preventDefault());
    zone.addEventListener('drop', (e) => { e.preventDefault(); place(zone, e.dataTransfer.getData('text/plain')); });
    zone.addEventListener('click', () => { if (selected) { place(zone, selected); } });
  });

  function validate() {
    const v = $('#formula-validator', canvas); v.hidden = false;
    const numOk = placed.num.length === 1 && placed.num[0] === 'work';
    const denOk = ['api', 'infra', 'human'].every((x) => placed.den.includes(x)) && placed.den.length === 3;
    if (numOk && denOk) {
      v.textContent = '✓ Lógica correta: trabalho útil sobre o custo total.'; v.style.color = 'var(--color-sim-green)';
      num.classList.add('valid'); den.classList.add('valid');
      $('#formula-naming', canvas).hidden = false;
    } else {
      v.textContent = 'Continue montando: trabalho útil no numerador; API + Humano + Infra no denominador.'; v.style.color = 'var(--color-sim-amber)';
    }
  }

  $('#metric-name-confirm', canvas).addEventListener('click', () => {
    const name = $('#metric-name-input', canvas).value.trim() || 'Índice de Eficiência de IA';
    const r = $('#formula-reveal', canvas); r.hidden = false;
    r.innerHTML = `
      <p class="text-gray-400 mb-2">Você chamou de <em>"${name}"</em>.</p>
      <p class="text-white">Na literatura de FinOps de IA, essa relação exata é o <strong>Useful Intelligence per Dollar (UI/$)</strong>.</p>
      <p class="formula text-teal-400 mt-3">UI/$ = Trabalho Útil ÷ (Custo API + Custo Humano + Custo Infra)</p>
      <button data-next class="mt-6 cta-gradient text-white font-semibold py-3 px-6 rounded-xl">Continuar →</button>`;
    board.unlock('EVID_03');
    $('[data-next]', r).addEventListener('click', () => ctx.complete(3));
    r.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
}

// =============================== CAP 4 ===============================
export function initCap4({ board, ctx }) {
  const body = $('#cap4-body');
  body.innerHTML = `
    <div class="grid gap-4">
      ${modelCard('Modelo 1 — Cost-of-Pass (Erol et al., Stanford 2025)', 'v(m,p) = C_m(p) / R_m(p)', 'Custo por tarefa útil. Quando R_m → 0, v(m,p) → ∞.')}
      ${modelCard('Modelo 2 — Useful Intelligence per Dollar (OpenAI 2026)', 'UI/$ = [ W_u × (1 − E_f) ] / (C_t + C_h + C_r)', 'Trabalho útil descontado do erro residual, sobre o custo total.')}
      ${modelCard('Modelo 3 — Governed UI/$ (Swider 2026)', 'Governed UI/$ = (Qualidade × Utilidade) / (Custo Total × Prêmio de Risco R)', 'Em setores regulados, o Prêmio de Risco (R > 1) pode anular o desconto open-source.')}
    </div>
    <div class="rounded-xl border p-4 text-sm" style="border-color:rgba(59,130,246,.3);background:rgba(59,130,246,.06)">
      🔎 UI/$, V_core e Governed UI/$ são <strong>convenções operacionais de FinOps em consolidação</strong> — não normas ISO/IEEE. Os coeficientes variam por arquitetura e escala.
    </div>
    <div class="bg-occ-surface rounded-2xl border border-gray-700/50 p-6">
      <p class="text-sm text-white font-medium mb-2">Quiz: Modelo A tem C_m=R$2, R_m=0,5. Modelo B tem C_m=R$3, R_m=0,9. Qual tem menor v(m,p)?</p>
      <div class="flex gap-3">
        <button data-quiz="A" class="border border-gray-600 rounded-lg py-2 px-4">Modelo A</button>
        <button data-quiz="B" class="border border-gray-600 rounded-lg py-2 px-4">Modelo B</button>
      </div>
      <p id="quiz-feedback" class="mt-3 text-sm" hidden></p>
    </div>`;

  board.unlock('EVID_04'); board.unlock('EVID_07'); board.unlock('EVID_10');
  body.querySelectorAll('[data-quiz]').forEach((btn) => btn.addEventListener('click', () => {
    // v(A)=2/0.5=4 ; v(B)=3/0.9=3.33 → B menor.
    const fb = $('#quiz-feedback', body); fb.hidden = false;
    if (btn.dataset.quiz === 'B') { fb.textContent = '✓ Correto. v(A)=4,00; v(B)≈3,33 — o modelo mais caro por token é mais barato por tarefa útil.'; fb.style.color = 'var(--color-sim-green)'; setTimeout(() => ctx.complete(4), 900); }
    else { fb.textContent = 'v(A)=2/0,5=4,00; v(B)=3/0,9≈3,33. Recalcule.'; fb.style.color = 'var(--color-sim-amber)'; }
  }));
}
function modelCard(title, formula, note) {
  return `<div class="bg-occ-surface rounded-xl border border-gray-700/50 p-4">
    <p class="text-xs text-blue-400 uppercase tracking-wider mb-2">${title}</p>
    <p class="formula text-white text-sm mb-2">${formula}</p>
    <p class="text-xs text-gray-500">${note}</p></div>`;
}

// =============================== CAP 5 ===============================
export function initCap5({ engine, board, eventEngine, ctx }) {
  engine.setWorkloadComplexity(2);
  const controls = $('#sandbox-controls');
  controls.innerHTML = `
    <div class="flex items-center justify-between">
      <label for="ctrl-routellm" class="font-semibold text-white text-sm">🔀 Roteamento (RouteLLM)</label>
      <input type="checkbox" id="ctrl-routellm" role="switch" aria-label="Ativar roteamento semântico" />
    </div>
    <div id="slm-group" hidden>
      <div class="flex justify-between text-xs text-gray-400 mb-1"><span>Prompts → SLM</span><span id="slm-pct" class="font-mono text-teal-400">0%</span></div>
      <input type="range" id="ctrl-slm-ratio" min="0" max="100" value="0" class="w-full" aria-label="Proporção de prompts roteados para SLM, 0 a 100 por cento" />
    </div>
    <div>
      <div class="flex justify-between text-sm mb-1"><label for="ctrl-rag" class="font-semibold text-white">📚 Profundidade RAG</label><span id="rag-label" class="font-mono text-blue-400">Nível 1</span></div>
      <input type="range" id="ctrl-rag" min="1" max="5" value="1" step="1" class="w-full" aria-label="Profundidade do RAG de 1 a 5" />
    </div>
    <div>
      <label for="ctrl-rerank" class="font-semibold text-white text-sm block mb-1">🎯 Reranking</label>
      <select id="ctrl-rerank" class="w-full bg-occ-bg border border-gray-600 rounded-lg px-3 py-2 text-sm text-white" aria-label="Estratégia de reranking semântico">
        <option value="off">Desligado</option>
        <option value="conditional">Condicional (baixa confiança)</option>
        <option value="universal">Universal (100% — +300ms/req)</option>
      </select>
    </div>
    <div>
      <div class="flex justify-between text-sm mb-1"><label for="ctrl-ttc" class="font-semibold text-white">🧠 Test-Time Compute</label><span id="ttc-label" class="font-mono text-purple-400">Nível 1</span></div>
      <input type="range" id="ctrl-ttc" min="1" max="5" value="1" step="1" class="w-full" aria-label="Test-Time Compute de 1 a 5" />
      <p id="ttc-warning" hidden class="mt-1 text-xs text-amber-400">⚠️ Nível > 3 com carga simples: risco de overthinking.</p>
    </div>
    <div class="flex items-center justify-between">
      <label for="ctrl-cache" class="font-semibold text-white text-sm">🧊 Cache Semântico</label>
      <input type="checkbox" id="ctrl-cache" role="switch" aria-label="Ativar cache semântico" />
    </div>
    <div>
      <div class="flex justify-between text-sm mb-1"><label for="ctrl-context-tokens" class="font-semibold text-white">🪟 Contexto médio</label><span id="context-label" class="font-mono text-blue-400">8k tokens</span></div>
      <input type="range" id="ctrl-context-tokens" min="4000" max="128000" value="8000" step="4000" class="w-full" aria-label="Tamanho médio de contexto por chamada, em tokens" />
      <p id="context-rot-meter" hidden role="status" aria-live="polite" class="mt-1 text-xs bg-orange-900/30 rounded p-2">🪟 <span class="text-orange-300 font-semibold">Context Rot</span>: <span id="rot-value" class="font-mono">−0 p.p.</span></p>
    </div>
    <div class="flex items-center justify-between">
      <label for="ctrl-multiagent" class="font-semibold text-white text-sm">🤖 Multiagente</label>
      <input type="checkbox" id="ctrl-multiagent" role="switch" aria-label="Ativar orquestração multiagente" />
    </div>
    <div id="isolation-group" hidden class="flex items-center justify-between pl-4">
      <label for="ctrl-agent-isolation" class="text-sm text-gray-300">Isolamento de contexto</label>
      <input type="checkbox" id="ctrl-agent-isolation" role="switch" checked aria-label="Ativar isolamento de contexto entre agentes" />
    </div>
    <p id="cascade-warning" hidden class="text-xs text-orange-400 bg-orange-500/10 rounded p-2">🔥 Multiagente sem isolamento: risco de cascata (contexto reenviado).</p>
    <button id="btn-advance-quarter" class="w-full py-3 cta-gradient rounded-xl font-bold text-white">Avançar para Q1 →</button>`;

  const read = () => ({
    useRouteLLM: $('#ctrl-routellm').checked,
    slmRatio: +$('#ctrl-slm-ratio').value / 100,
    ragDepth: +$('#ctrl-rag').value,
    ragReranking: $('#ctrl-rerank').value,
    testTimeComputeLevel: +$('#ctrl-ttc').value,
    semanticCaching: $('#ctrl-cache').checked,
    avgContextTokens: +$('#ctrl-context-tokens').value,
    multiAgent: $('#ctrl-multiagent').checked,
    agentIsolation: $('#ctrl-agent-isolation').checked,
  });

  const sync = () => {
    $('#slm-group').hidden = !$('#ctrl-routellm').checked;
    $('#isolation-group').hidden = !$('#ctrl-multiagent').checked;
    $('#slm-pct').textContent = $('#ctrl-slm-ratio').value + '%';
    $('#rag-label').textContent = 'Nível ' + $('#ctrl-rag').value;
    $('#ttc-label').textContent = 'Nível ' + $('#ctrl-ttc').value;
    $('#ttc-warning').hidden = +$('#ctrl-ttc').value <= 3;
    const tok = +$('#ctrl-context-tokens').value;
    $('#context-label').textContent = (tok / 1000) + 'k tokens';
    const rot = tok > 50000 ? Math.min(15, Math.round(((tok - 50000) / 50000) * 10)) : 0;
    $('#context-rot-meter').hidden = rot === 0;
    $('#rot-value').textContent = `−${rot} p.p.`;
    $('#cascade-warning').hidden = !($('#ctrl-multiagent').checked && !$('#ctrl-agent-isolation').checked);
    // preview (sem avançar trimestre)
    const preview = new engine.constructor(engine.getState());
    preview.applyDecisions(read()); preview.recompute();
    drawSankey(preview.getState());
    if (rot > 0) board.unlock('EVID_11');
    if ($('#ctrl-cache').checked) board.unlock('EVID_11');
    if ($('#ctrl-multiagent').checked && !$('#ctrl-agent-isolation').checked) board.unlock('EVID_09');
    if ($('#ctrl-routellm').checked) board.unlock('EVID_05');
    if (+$('#ctrl-ttc').value >= 4) board.unlock('EVID_06');
  };
  controls.addEventListener('input', sync);
  controls.addEventListener('change', sync);

  const advBtn = $('#btn-advance-quarter');
  advBtn.addEventListener('click', () => {
    const nextQ = (engine.getState().currentQuarter || 0) + 1;
    const decisions = read();
    engine.applyDecisions(decisions);
    // sorteio de evento para o trimestre
    const qKey = `Q${nextQ}`;
    const ids = eventEngine.rollQuarterEvents(qKey, engine.getState());
    const events = ids.map((id) => eventEngine.resolve(id, engine.getState())).filter(Boolean);
    const runStep = () => {
      const ev = events.shift() || null;
      engine.stepQuarter(decisions, ev);
      ctx.refresh();
      drawHistory(engine.getHistory());
      const q = engine.getState().currentQuarter;
      advBtn.textContent = q >= 4 ? 'Ir ao Conselho →' : `Avançar para Q${q + 1} →`;
      if (q >= 4) { advBtn.onclick = null; advBtn.addEventListener('click', () => ctx.complete(5), { once: true }); }
    };
    if (events.length) showEventDialog(events, `Q${nextQ}`, runStep);
    else runStep();
  });

  advBtn.textContent = 'Avançar para Q1 →';
  sync();
}

function showEventDialog(events, quarter, done) {
  const dlg = $('#event-alert-dialog');
  const ev = events[0];
  $('#dialog-quarter').textContent = quarter;
  $('#dialog-severity-icon').textContent = ev.severity === 'critical' ? '🔴' : ev.severity === 'warning' ? '⚠️' : '⚡';
  $('#dialog-title').textContent = ev.title;
  $('#dialog-description').textContent = ev.description;
  $('#dialog-impact').textContent = 'Impacto: ' + ev.impact;
  const mit = $('#dialog-mitigation');
  if (ev.mitigated) { mit.hidden = false; mit.textContent = 'Mitigação aplicada pela sua arquitetura.'; } else mit.hidden = true;
  if (typeof dlg.showModal === 'function') dlg.showModal();
  $('#dialog-close').onclick = () => { dlg.close(); done(); };
}

function drawSankey(state) {
  const svg = $('#sankey-chart'); if (!svg) return;
  const f = state.finances;
  const items = [
    { label: 'API', v: f.apiCost, color: '#22c55e' },
    { label: 'Infra', v: f.infrastructureCost, color: '#3b82f6' },
    { label: 'Humano', v: f.humanReworkCost, color: '#f97316' },
    { label: 'Re-sent', v: f.resentContextCost, color: 'var(--color-sim-cascade)', cascade: true },
  ].filter((x) => x.v > 0);
  const total = items.reduce((s, x) => s + x.v, 0) || 1;
  let y = 10; const H = 180;
  svg.innerHTML = items.map((it) => {
    const h = Math.max(4, (it.v / total) * H);
    const rect = `<rect x="10" y="${y}" width="180" height="${h - 4}" fill="${it.color}" rx="3" opacity="0.85"></rect>
      <path d="M190 ${y + h / 2} C 320 ${y + h / 2}, 380 100, 500 100" stroke="${it.color}" stroke-width="${Math.max(2, h / 3)}" fill="none" opacity="0.5" class="${it.cascade ? 'cascade-edge' : ''}"></path>
      <text x="14" y="${y + 14}" fill="#fff" font-size="11">${it.label}</text>`;
    y += h;
    return rect;
  }).join('') + `<rect x="500" y="60" width="90" height="80" fill="#161b22" stroke="#30363d" rx="6"></rect><text x="545" y="105" fill="#fff" font-size="11" text-anchor="middle">TCO</text>`;
}

function drawHistory(history) {
  const canvas = $('#history-chart'); if (!canvas?.getContext || !history.length) return;
  const c = canvas.getContext('2d'); c.clearRect(0, 0, canvas.width, canvas.height);
  const W = canvas.width, H = canvas.height, pad = 24;
  const uis = history.map((s) => s.metrics.globalUI);
  const maxUI = Math.max(0.01, ...uis);
  c.strokeStyle = '#0d9488'; c.lineWidth = 2; c.beginPath();
  history.forEach((s, i) => {
    const x = pad + (i / Math.max(1, history.length - 1)) * (W - pad * 2);
    const yv = H - pad - (s.metrics.globalUI / maxUI) * (H - pad * 2);
    i ? c.lineTo(x, yv) : c.moveTo(x, yv);
  });
  c.stroke();
  c.fillStyle = '#8b949e'; c.font = '10px monospace'; c.fillText('UI/$ por trimestre', pad, 12);
}

// =============================== CAP 6 ===============================
export function initCap6({ engine, board, boardEngine, ctx }) {
  const area = $('#board-dialog-area');
  boardEngine.setState(engine.getState());
  const questions = boardEngine.generateQuestions();
  const trust = engine.getState().social.stakeholderTrust;
  let idx = 0;

  const updateConfidence = () => {
    const conf = boardEngine.aggregateConfidence(engine.getState().social.stakeholderTrust);
    $('#board-confidence-pct').textContent = conf + '%';
    const bar = $('#board-confidence-bar'); bar.style.width = conf + '%';
    bar.style.background = conf < 40 ? '#dc2626' : conf < 70 ? 'linear-gradient(90deg,#eab308,#f59e0b)' : 'linear-gradient(90deg,#22c55e,#0d9488)';
    return conf;
  };
  updateConfidence();

  const renderQuestion = () => {
    if (idx >= questions.length) return finish();
    const q = questions[idx];
    area.innerHTML = '';
    const card = el('div', 'bg-occ-surface rounded-2xl border border-gray-700/50 p-6');
    card.innerHTML = `<p class="text-sm font-bold mb-3" style="color:#f59e0b">Conselheiro — pergunta ${idx + 1}/${questions.length}</p>
      <p class="text-gray-200 mb-4">${q.speechText}</p>
      <div id="q-options" class="space-y-2 mb-4"></div>
      <div class="flex items-center justify-between gap-3">
        <button id="q-attach" class="text-sm border border-gray-600 rounded-lg py-2 px-4">🗂 Anexar evidência <span id="q-attached" class="text-teal-400"></span></button>
        <button id="q-confirm" class="cta-gradient text-white font-semibold py-2 px-5 rounded-xl opacity-40 cursor-not-allowed" aria-disabled="true" title="Selecione um argumento e uma evidência">Confirmar</button>
      </div>
      <p id="q-feedback" class="mt-3 text-sm" hidden></p>`;
    area.appendChild(card);

    let chosenOption = null, chosenEvidence = null;
    const opts = $('#q-options', card);
    q.options.forEach((o) => {
      const b = el('button', 'block w-full text-left border border-gray-600 rounded-lg py-2 px-4 text-sm hover:border-blue-500/60');
      b.textContent = o.text;
      b.addEventListener('click', () => { chosenOption = o.id; opts.querySelectorAll('button').forEach((x) => x.classList.remove('border-blue-500')); b.classList.add('border-blue-500'); refreshConfirm(); });
      opts.appendChild(b);
    });

    const confirm = $('#q-confirm', card);
    const refreshConfirm = () => {
      const ready = chosenOption && chosenEvidence;
      confirm.classList.toggle('opacity-40', !ready);
      confirm.classList.toggle('cursor-not-allowed', !ready);
      confirm.setAttribute('aria-disabled', String(!ready));
    };

    $('#q-attach', card).addEventListener('click', () => {
      renderEvidencePanel(board, { selectable: true, requiredCategory: q.requiredCategory, onSelect: (id) => {
        chosenEvidence = id; $('#q-attached', card).textContent = '✓ ' + id; refreshConfirm();
      } });
      openEvidencePanel();
    });

    confirm.addEventListener('click', () => {
      if (!(chosenOption && chosenEvidence)) return;
      const res = boardEngine.evaluateAnswer(q.id, chosenOption, [chosenEvidence]);
      engine.applyBoardAnswer(res.stakeholderId, res.correct);
      const fb = $('#q-feedback', card); fb.hidden = false;
      fb.textContent = res.correct ? '✓ Argumento sólido e bem fundamentado.' : '✗ Sem evidência válida ou raciocínio frágil. Confiança caiu.';
      fb.style.color = res.correct ? 'var(--color-sim-green)' : 'var(--color-sim-red)';
      updateConfidence(); ctx.refresh();
      confirm.disabled = true; confirm.classList.add('opacity-40');
      setTimeout(() => { idx++; renderQuestion(); }, 1200);
    });
  };

  const finish = () => {
    const conf = updateConfidence();
    const outcome = engine.checkEndConditions(conf);
    ctx.endGame(outcome === 'VICTORY' ? 'VICTORY' : (outcome || 'FAILURE_TRUST'));
  };

  renderQuestion();
}

// =============================== TRANSFER ===============================
export function initTransfer({ ctx }) {
  const wrap = $('#transfer-case');
  wrap.innerHTML = `
    <p class="text-gray-300 mb-4">Uma clínica quer automatizar triagem de exames. <strong>Modelo A</strong>: R$ 0,10/imagem, 88% de precisão. <strong>Modelo B</strong>: R$ 1,50/imagem, 99,2%. Cada erro exige 1h de radiologista (R$ 250/h). Qual tem maior UI/$?</p>
    <div class="flex gap-3">
      <button data-t="A" class="border border-gray-600 rounded-lg py-2 px-4">Modelo A</button>
      <button data-t="B" class="border border-gray-600 rounded-lg py-2 px-4">Modelo B</button>
    </div>
    <p id="transfer-fb" class="mt-4 text-sm" hidden></p>`;
  wrap.querySelectorAll('[data-t]').forEach((b) => b.addEventListener('click', () => {
    const fb = $('#transfer-fb', wrap); fb.hidden = false;
    // A: 12% erro × R$250 = R$30/img + 0,10 ≫ B: 0,8% × 250 = R$2 + 1,50 = R$3,50
    if (b.dataset.t === 'B') { fb.textContent = '✓ Correto. O custo humano de revisão médica domina: Modelo A custa ~R$30/imagem em revisão; Modelo B, ~R$3,50. Maior precisão = maior UI/$.'; fb.style.color = 'var(--color-sim-green)'; setTimeout(() => ctx.finishGame(), 1200); }
    else { fb.textContent = 'Lembre do custo humano: 12% de erro × R$250 = R$30/imagem. Recalcule.'; fb.style.color = 'var(--color-sim-amber)'; }
  }));
}
