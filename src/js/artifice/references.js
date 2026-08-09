// Acervo Acadêmico (Seção 05): fetch assíncrono do JSON de referências,
// filtro dinâmico por tema e download da bibliografia consolidada.

const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

// Fallback gracioso: usado só se o fetch falhar (rede indisponível etc.).
const FALLBACK = [
  {
    id: 'sennett-2009', author: 'Richard Sennett', title: 'O Artífice', year: 2009, publisher: 'Record',
    tema: 'Maestria & Trabalho Vivo',
    thesis: 'A busca humana pela excelência intrínseca e o conflito com as estruturas de trabalho do capitalismo flexível.',
    quote: 'A maestria é o desejo humano de realizar um trabalho bem-feito pelo simples valor de fazê-lo bem.',
  },
  {
    id: 'han-2015', author: 'Byung-Chul Han', title: 'A Sociedade do Cansaço & Psicopolítica', year: 2015, publisher: 'Vozes',
    tema: 'Autoexploração & Desempenho',
    thesis: 'A transição da coação externa para a autoexploração punitiva no sujeito do desempenho.',
    quote: 'O sujeito do desempenho converte-se no seu próprio vigilante e carrasco.',
  },
  {
    id: 'reilly-2019', author: 'Tanya Reilly', title: 'Being Glue', year: 2019, publisher: "StaffEng / O'Reilly",
    tema: 'Glue Work & Carreira',
    thesis: 'O impacto invisibilizante do trabalho de sustentação (Glue Work) na carreira de engenheiros de software.',
    quote: 'Glue work mantém a equipe funcionando — e, sem crédito formal, também te prende ao mesmo nível.',
  },
  {
    id: 'newport-2016', author: 'Cal Newport', title: 'Deep Work', year: 2016, publisher: 'Grand Central Publishing',
    tema: 'Hiperatividade & Deep Work',
    thesis: 'A cultura da hiperatividade e da disponibilidade constante destrói a capacidade de trabalho profundo do especialista.',
    quote: 'A capacidade de produzir trabalho profundo está se tornando cada vez mais rara exatamente quando está se tornando cada vez mais valiosa.',
  },
];

function refCard(r) {
  return `
    <article class="art-card p-5">
      <p class="art-mono text-xs text-art-cyan uppercase tracking-widest mb-1">${esc(r.tema || 'Geral')}</p>
      <h3 class="font-semibold text-art-text">${esc(r.author)} <span class="text-art-muted font-normal">(${esc(r.year)})</span></h3>
      <p class="text-sm text-art-text italic mb-2">${esc(r.title)}${r.publisher ? `, ${esc(r.publisher)}` : ''}</p>
      ${r.thesis ? `<p class="text-sm text-art-muted mb-2">${esc(r.thesis)}</p>` : ''}
      ${r.quote ? `<blockquote class="text-sm text-art-muted border-l-2 border-art-border pl-3">"${esc(r.quote)}"</blockquote>` : ''}
    </article>`;
}

function buildMarkdown(data) {
  const lines = ['# O Artífice Invisível — Acervo Acadêmico', ''];
  data.forEach((r) => {
    lines.push(`## ${r.author} (${r.year}) — ${r.title}`);
    if (r.publisher) lines.push(`*${r.publisher}${r.place ? `, ${r.place}` : ''}*`);
    if (r.thesis) lines.push('', r.thesis);
    if (r.quote) lines.push('', `> ${r.quote}`);
    lines.push('');
  });
  return lines.join('\n');
}

export async function initReferences(root, { dataUrl = '/data/artifice-references.json' } = {}) {
  const listEl = root.querySelector('#acervo-list');
  const filtersEl = root.querySelector('#acervo-filters');
  const errorEl = root.querySelector('#acervo-error');
  const downloadBtn = root.querySelector('#acervo-download');
  if (!listEl) return;

  let data = FALLBACK;
  try {
    const res = await fetch(dataUrl);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    if (Array.isArray(json) && json.length) data = json;
  } catch {
    if (errorEl) errorEl.hidden = false;
  }

  let active = 'Todos';

  function render() {
    const temas = ['Todos', ...new Set(data.map((d) => d.tema).filter(Boolean))];
    if (filtersEl) {
      filtersEl.innerHTML = temas
        .map((t) => `<button type="button" class="art-filter" data-tema="${esc(t)}" aria-pressed="${t === active}">${esc(t)}</button>`)
        .join('');
      filtersEl.querySelectorAll('.art-filter').forEach((btn) => {
        btn.addEventListener('click', () => {
          active = btn.dataset.tema;
          render();
        });
      });
    }

    const items = active === 'Todos' ? data : data.filter((d) => d.tema === active);
    listEl.innerHTML = items.map(refCard).join('');
  }

  render();

  downloadBtn?.addEventListener('click', () => {
    const blob = new Blob([buildMarkdown(data)], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'artifice-bibliografia.md';
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  });
}
