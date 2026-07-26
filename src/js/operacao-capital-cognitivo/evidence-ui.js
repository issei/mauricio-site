/*
 * UI do Mural de Evidências — toast de desbloqueio + painel lateral (spec docs 04/08).
 */
import { LEVEL_COLOR, CATEGORY_ABBR } from './evidence-board.js';

let toastTimer = null;

export function showEvidenceToast(card) {
  const el = document.getElementById('toast-evidence');
  if (!el) return;
  document.getElementById('toast-evidence-icon').textContent = card.icon;
  document.getElementById('toast-evidence-title').textContent = card.title;
  el.hidden = false;
  el.classList.add('toast-in');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { el.hidden = true; el.classList.remove('toast-in'); }, 3200);
}

function levelBadge(card) {
  const color = LEVEL_COLOR[card.evidenceLevel] || '#888';
  const letter = card.evidenceLevel.replace('Level_', '');
  const cat = CATEGORY_ABBR[card.category] || card.category;
  return `<span class="text-[10px] font-bold rounded-full px-2 py-0.5" style="background:${color}22;color:${color}">${letter}</span>
          <span class="text-[10px] text-gray-500">${cat}</span>`;
}

export function renderEvidencePanel(board, { selectable = false, requiredCategory = null, onSelect = null } = {}) {
  const wrap = document.getElementById('evidence-panel-cards');
  const countEl = document.getElementById('evidence-count');
  if (!wrap) return;
  const { unlocked, total } = board.count();
  if (countEl) countEl.textContent = `${unlocked}/${total}`;

  wrap.innerHTML = '';
  for (const card of board.cards) {
    const div = document.createElement('div');
    const locked = !card.unlocked;
    const highlight = selectable && requiredCategory && card.category === requiredCategory && card.unlocked;
    div.className = 'rounded-xl border p-3 text-sm ' +
      (locked ? 'opacity-40 grayscale border-gray-700' : 'border-gray-700 hover:border-blue-500/50') +
      (highlight ? ' ring-1 ring-teal-400' : '');
    div.setAttribute('role', 'article');
    if (card.unlocked && selectable) { div.tabIndex = 0; div.setAttribute('role', 'button'); div.style.cursor = 'pointer'; }
    div.innerHTML = `
      <div class="flex items-center justify-between gap-2 mb-1">
        <span class="flex items-center gap-2"><span>${card.icon}</span><span class="font-medium text-white text-xs">${card.title}</span></span>
      </div>
      <div class="flex items-center gap-2">${locked ? '<span class="text-[10px] text-gray-500">BLOQUEADO</span>' : levelBadge(card)}</div>
      ${card.unlocked ? `<p class="text-xs text-gray-500 mt-2">${card.claim}</p>
        <p class="text-[11px] text-gray-600 mt-1"><strong>Limitações:</strong> ${card.limitations}</p>` : ''}`;
    if (card.unlocked && selectable && onSelect) {
      const pick = () => onSelect(card.id);
      div.addEventListener('click', pick);
      div.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); pick(); } });
    }
    wrap.appendChild(div);
  }
}

export function openEvidencePanel() { document.getElementById('evidence-panel')?.classList.remove('translate-x-full'); }
export function closeEvidencePanel() { document.getElementById('evidence-panel')?.classList.add('translate-x-full'); }
