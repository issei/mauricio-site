/*
 * Busca no site — SDD-catalogo-videos-e-busca.md §4 (RF-BU-01 a RF-BU-14).
 *
 * Roda inteira no navegador: baixa o índice (/busca/pt.json ou /busca/en.json,
 * gerado por scripts/gen-busca.mjs) só na primeira vez que a busca abre, e nada do
 * que a pessoa digita sai do aparelho. Carregado sob demanda pelo cabeçalho comum
 * (scripts/gen-cabecalho.mjs); a página /busca o carrega direto.
 *
 * As funções puras (normaliza, buscar, marcar) não tocam no DOM, para os testes de
 * unidade importarem este arquivo no Node.
 */

const TEXTOS = {
  pt: {
    titulo: 'Buscar no site', rotulo: 'Buscar no site', fechar: 'Fechar', dica: 'Digite uma palavra: tema, ferramenta, título de vídeo.',
    carregando: 'Carregando o índice…', falha: 'Não foi possível carregar o índice de busca. Tente de novo.',
    nenhum: (q) => `Nenhum resultado para “${q}”.`,
    total: (n, q) => `${n} ${n === 1 ? 'resultado' : 'resultados'} para “${q}”`,
    grupos: { video: 'Vídeos', pagina: 'Artigos e páginas', assunto: 'Assuntos' },
    tipos: { video: 'Vídeo', videoArtigo: 'Vídeo com artigo', pagina: 'Página', assunto: 'Assunto' },
    links: [['Conteúdos', '/catalogo.html'], ['Vídeos', '/videos']],
    emPt: ' (em português)',
  },
  en: {
    titulo: 'Search the site', rotulo: 'Search the site', fechar: 'Close', dica: 'Type a word: topic, tool, video title.',
    carregando: 'Loading the index…', falha: 'The search index could not be loaded. Try again.',
    nenhum: (q) => `No results for “${q}”.`,
    total: (n, q) => `${n} ${n === 1 ? 'result' : 'results'} for “${q}”`,
    grupos: { video: 'Videos', pagina: 'Articles and pages', assunto: 'Topics' },
    tipos: { video: 'Video', videoArtigo: 'Video with article', pagina: 'Page', assunto: 'Topic' },
    links: [['Content', '/en/catalogo.html'], ['Videos', '/videos']],
    emPt: ' (in Portuguese)',
  },
};

const ESPERA_MS = 150;
const LIMITE_GRUPO = 8;

// ── Núcleo (sem DOM) ────────────────────────────────────────────────────────

/** Minúsculas e sem acento: "orquestração" casa com "orquestracao". */
export const normaliza = (s) =>
  String(s ?? '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

const palavras = (q) => normaliza(q).split(/[^a-z0-9]+/).filter(Boolean);

/** Índice → itens com os campos já normalizados (feito uma vez, na carga). */
export function prepara(dados) {
  const nomes = dados.temas ?? {};
  return (dados.itens ?? []).map((it) => ({
    ...it,
    _t: normaliza(it.t),
    _a: normaliza((it.a ?? []).map((k) => nomes[k] ?? k).join(' ')),
    _d: normaliza(it.d),
  }));
}

/**
 * Todas as palavras precisam aparecer (E lógico). Peso: título 3, assunto 2, resumo 1.
 * Empate: com artigo antes, depois o mais recente (RF-BU-06).
 */
export function buscar(itens, consulta) {
  const ps = palavras(consulta);
  if (!ps.length) return [];
  const achados = [];
  for (const it of itens) {
    let pontos = 0;
    let todas = true;
    for (const p of ps) {
      const s = (it._t.includes(p) ? 3 : 0) + (it._a.includes(p) ? 2 : 0) + (it._d.includes(p) ? 1 : 0);
      if (!s) { todas = false; break; }
      pontos += s;
    }
    if (todas) achados.push({ it, pontos });
  }
  achados.sort((a, b) =>
    b.pontos - a.pontos
    || (b.it.p ?? 0) - (a.it.p ?? 0)
    || String(b.it.dt ?? '').localeCompare(String(a.it.dt ?? ''))
    || a.it.t.localeCompare(b.it.t));
  return achados.map((x) => x.it);
}

const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

/** Escapa o texto e põe <mark> nas palavras buscadas, ignorando acento e caixa. */
export function marcar(texto, consulta) {
  const original = String(texto ?? '');
  let norm = '';
  const mapa = []; // posição no texto normalizado → posição no original
  for (let i = 0; i < original.length; i++) {
    const n = normaliza(original[i]);
    for (let j = 0; j < n.length; j++) { norm += n[j]; mapa.push(i); }
  }
  const faixas = [];
  for (const p of palavras(consulta)) {
    for (let ini = norm.indexOf(p); ini >= 0; ini = norm.indexOf(p, ini + p.length)) {
      faixas.push([mapa[ini], mapa[ini + p.length - 1] + 1]);
    }
  }
  faixas.sort((a, b) => a[0] - b[0]);
  const fundidas = [];
  for (const f of faixas) {
    const ult = fundidas.at(-1);
    if (ult && f[0] <= ult[1]) ult[1] = Math.max(ult[1], f[1]);
    else fundidas.push([...f]);
  }
  let out = '';
  let pos = 0;
  for (const [a, b] of fundidas) {
    out += esc(original.slice(pos, a)) + '<mark>' + esc(original.slice(a, b)) + '</mark>';
    pos = b;
  }
  return out + esc(original.slice(pos));
}

// ── Interface ───────────────────────────────────────────────────────────────

const CSS = `
.bs{width:min(40rem,calc(100vw - 2rem));max-height:min(40rem,85vh);padding:0;border:1px solid #30363d;border-radius:16px;background:#0d1117;color:#c9d1d9;font-family:Inter,system-ui,sans-serif;box-shadow:0 0 40px rgba(0,123,255,.25)}
.bs::backdrop{background:rgba(1,4,9,.75)}
.bs-caixa{padding:16px 20px 20px}
.bs-cab{display:flex;align-items:center;justify-content:space-between;gap:12px}
.bs-titulo{margin:0;font-size:1.15rem;color:#fff}
.bs-fechar{min-height:44px;min-width:44px;padding:0 14px;border:1px solid #30363d;border-radius:8px;background:transparent;color:#fff;font:inherit;cursor:pointer}
.bs-fechar:hover{border-color:#58a6ff}
.bs label{display:block;margin:12px 0 4px;font-size:.92rem;color:#c9d1d9}
.bs-campo{width:100%;box-sizing:border-box;min-height:44px;padding:8px 12px;border:1px solid #30363d;border-radius:8px;background:#161b22;color:#fff;font:inherit;font-size:1rem}
.bs-campo:focus-visible,.bs a:focus-visible,.bs-fechar:focus-visible{outline:2px solid #58a6ff;outline-offset:2px}
.bs-status{margin:10px 0 0;font-size:.9rem;color:#8b949e;min-height:1.3em}
.bs-res{margin-top:6px;overflow-y:auto;max-height:min(24rem,50vh)}
.bs-res h3{margin:14px 0 6px;font-size:.8rem;letter-spacing:.05em;text-transform:uppercase;color:#8b949e}
.bs-res ul{list-style:none;margin:0;padding:0}
.bs-res a{display:block;padding:8px 10px;border-radius:8px;color:#fff;text-decoration:none}
.bs-res a:hover{background:#161b22}
.bs-ctx{display:block;margin-top:2px;font-size:.85rem;color:#8b949e}
.bs-res mark{background:#264f78;color:#fff;border-radius:3px;padding:0 1px}
.bs-links{display:flex;gap:12px;flex-wrap:wrap;margin-top:8px}
.bs-links a{display:inline-block;padding:8px 14px;border:1px solid #30363d;border-radius:999px;color:#58a6ff}
.bs-pagina .bs-res{max-height:none;overflow:visible}
`.trim();

let estilo = false;
function injetaEstilo() {
  if (estilo) return;
  const s = document.createElement('style');
  s.id = 'busca-css';
  s.textContent = CSS;
  document.head.append(s);
  estilo = true;
}

const idiomaDaPagina = () => (document.documentElement.lang || 'pt').toLowerCase().startsWith('en') ? 'en' : 'pt';

const cacheIndice = {};
function carregaIndice(lang) {
  cacheIndice[lang] ??= fetch(`/busca/${lang}.json`, { credentials: 'omit' })
    .then((r) => { if (!r.ok) throw new Error(String(r.status)); return r.json(); })
    .then(prepara)
    .catch((e) => { delete cacheIndice[lang]; throw e; });
  return cacheIndice[lang];
}

let seq = 0;

/** Monta campo, anúncio e resultados dentro de `host`. Devolve o campo. */
export function montaBusca(host, { lang = idiomaDaPagina(), consultaInicial = '', aoBuscar } = {}) {
  const t = TEXTOS[lang] ?? TEXTOS.pt;
  const id = `bs${++seq}`;
  host.insertAdjacentHTML('beforeend', `<form role="search" class="bs-form" novalidate>
<label for="${id}-q">${esc(t.rotulo)}</label>
<input id="${id}-q" class="bs-campo" type="search" autocomplete="off" spellcheck="false" enterkeyhint="search">
</form>
<p class="bs-status" role="status" aria-live="polite"></p>
<div class="bs-res"></div>`);
  const campo = host.querySelector('.bs-campo');
  const status = host.querySelector('.bs-status');
  const res = host.querySelector('.bs-res');
  host.querySelector('form').addEventListener('submit', (e) => e.preventDefault());

  const links = () => `<div class="bs-links">${t.links.map(([r, h]) => `<a href="${h}">${esc(r)}</a>`).join('')}</div>`;
  const tipo = (it) => (it.k === 'video' && it.p ? t.tipos.videoArtigo : t.tipos[it.k] ?? '');
  const item = (it, q) => {
    const ctx = [tipo(it), it.d ? marcar(it.d.length > 150 ? `${it.d.slice(0, 149).replace(/\s+\S*$/, '')}…` : it.d, q) : ''].filter(Boolean);
    return `<li><a href="${esc(it.u)}"${it.en === 0 ? ' lang="pt-BR"' : ''}>${marcar(it.t, q)}${it.en === 0 ? esc(t.emPt) : ''}<span class="bs-ctx">${ctx.join(' · ')}</span></a></li>`;
  };

  async function executa() {
    const q = campo.value.trim();
    aoBuscar?.(q);
    if (!palavras(q).length) { status.textContent = ''; res.innerHTML = `<p class="bs-status">${esc(t.dica)}</p>${links()}`; return; }
    let indice;
    try { indice = await carregaIndice(lang); } catch { status.textContent = t.falha; res.innerHTML = links(); return; }
    if (campo.value.trim() !== q) return; // a pessoa já digitou outra coisa
    const achados = buscar(indice, q);
    status.textContent = achados.length ? t.total(achados.length, q) : t.nenhum(q);
    if (!achados.length) { res.innerHTML = links(); return; }
    res.innerHTML = ['video', 'pagina', 'assunto']
      .map((g) => {
        const lista = achados.filter((it) => it.k === g);
        if (!lista.length) return '';
        return `<section aria-labelledby="${id}-${g}"><h3 id="${id}-${g}">${esc(t.grupos[g])}</h3><ul>${lista.slice(0, LIMITE_GRUPO).map((it) => item(it, q)).join('')}</ul></section>`;
      }).join('');
  }

  let espera;
  campo.addEventListener('input', () => { clearTimeout(espera); espera = setTimeout(executa, ESPERA_MS); });
  campo.value = consultaInicial;
  executa();
  carregaIndice(lang).catch(() => {}); // aquece o índice enquanto a pessoa digita
  return campo;
}

let dialogo;

/** Abre a busca num <dialog> (RF-BU-02). `gatilho` recebe o foco de volta ao fechar. */
export function abrir(gatilho) {
  injetaEstilo();
  const lang = idiomaDaPagina();
  const t = TEXTOS[lang];
  if (!dialogo) {
    dialogo = document.createElement('dialog');
    dialogo.className = 'bs';
    dialogo.setAttribute('aria-labelledby', 'bs-titulo');
    dialogo.innerHTML = `<div class="bs-caixa"><div class="bs-cab"><h2 class="bs-titulo" id="bs-titulo">${esc(t.titulo)}</h2><button type="button" class="bs-fechar">${esc(t.fechar)}</button></div></div>`;
    document.body.append(dialogo);
    const caixa = dialogo.querySelector('.bs-caixa');
    dialogo._campo = montaBusca(caixa, { lang });
    dialogo.querySelector('.bs-fechar').addEventListener('click', () => dialogo.close());
    dialogo.addEventListener('click', (e) => { if (e.target === dialogo) dialogo.close(); });
    dialogo.addEventListener('close', () => { dialogo._gatilho?.focus(); });
    dialogo.addEventListener('click', (e) => { if (e.target.closest('.bs-res a')) dialogo.close(); });
  }
  dialogo._gatilho = gatilho;
  dialogo.showModal();
  dialogo._campo.focus();
  dialogo._campo.select();
}

/** Página /busca: o mesmo campo e os mesmos resultados, sem diálogo (RF-BU-09). */
export function iniciaPagina(host) {
  injetaEstilo();
  host.classList.add('bs-pagina');
  const q0 = new URLSearchParams(location.search).get('q') ?? '';
  const campo = montaBusca(host, {
    lang: idiomaDaPagina(),
    consultaInicial: q0,
    aoBuscar: (q) => history.replaceState(null, '', `${location.pathname}${q ? `?q=${encodeURIComponent(q)}` : ''}`),
  });
  // Sem campo.focus(): tirar o foco do link "Pular para o conteúdo" na carga quebra a navegação por teclado.
  return campo;
}
