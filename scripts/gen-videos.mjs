#!/usr/bin/env node
/*
 * Páginas dos vídeos do YouTube — fase 1 (fichas).
 * Spec: docs/specs/pages/videos-youtube/SDD-fase-1.md.
 *
 * O vídeo é DADO, a página é SAÍDA. A fonte é content/videos/<id>.md (frontmatter
 * YAML) + content/videos/<id>.transcricao.vtt, e o vocabulário de assuntos é
 * content/temas.yml. Daqui saem:
 *   src/videos/<slug>.html + public/videos/<slug>.md   ficha de cada vídeo
 *   src/temas/<tema>.html  + public/temas/<tema>.md    página de cada assunto
 *   src/videos.html        + public/videos.md          índice
 *   scripts/videos/sitemap-exclude.json                rotas noindex (lido pelo vite.config.js)
 *
 * O gerador é DONO de src/videos/ e src/temas/: arquivo ali que ele não gerou é
 * apagado (e, com --check, reprovado). Ninguém escreve HTML de vídeo à mão; para
 * corrigir uma página, corrige-se o arquivo de conteúdo.
 *
 * Sem nenhum vídeo em content/videos/, nada é gerado além de uma lista de
 * exclusão vazia: um índice vazio publicado seria uma página rasa indexada.
 *
 * Uso: node scripts/gen-videos.mjs [--check] [--content <dir>] [--out <dir>]
 *   --check    não grava; sai ≠0 se algum arquivo divergir da fonte
 *   --content  raiz que contém videos/ e temas.yml (padrão: content/)
 *   --out      raiz onde gravar src/, public/ e scripts/ (padrão: o repositório)
 */
import { readFileSync, writeFileSync, existsSync, readdirSync, mkdirSync, rmSync } from 'node:fs';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse as parseYaml } from 'yaml';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const SITE = 'https://mauricio.issei.com.br';
const AUTOR = 'Maurício Yokoyama Issei';

export const STATUS = ['ficha', 'rascunho', 'publicado', 'removido'];
/** Fase 1: nada é publicado — não há artigo revisado (SDD §6). */
export const STATUS_PERMITIDOS_FASE_1 = ['ficha', 'rascunho', 'removido'];
const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const SLUG_MAX = 60;
const DONOS = ['src/videos', 'src/temas', 'public/videos', 'public/temas'];
const EXCLUDE_JSON = 'scripts/videos/sitemap-exclude.json';

const esc = (s) =>
  String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

// ── Leitura ─────────────────────────────────────────────────────────────────

/** Separa o frontmatter YAML do corpo Markdown. */
export function parseFrontmatter(texto, origem = '') {
  const m = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/.exec(texto);
  if (!m) throw new Error(`${origem}: sem frontmatter (--- … ---)`);
  return { data: parseYaml(m[1]) ?? {}, body: m[2].trim() };
}

/** Lê content/videos/*.md, as transcrições ao lado e content/temas.yml. */
export function loadContent(contentDir) {
  const dir = join(contentDir, 'videos');
  const temasPath = join(contentDir, 'temas.yml');
  const temas = existsSync(temasPath) ? parseYaml(readFileSync(temasPath, 'utf8')) ?? {} : {};
  const videos = [];
  if (existsSync(dir)) {
    for (const f of readdirSync(dir).filter((n) => n.endsWith('.md')).sort()) {
      const { data, body } = parseFrontmatter(readFileSync(join(dir, f), 'utf8'), `content/videos/${f}`);
      const vtt = join(dir, f.replace(/\.md$/, '.transcricao.vtt'));
      videos.push({ ...data, body, arquivo: f, transcricao: existsSync(vtt) ? parseVtt(readFileSync(vtt, 'utf8')) : null });
    }
  }
  return { videos, temas };
}

// ── Validação ───────────────────────────────────────────────────────────────

/** Devolve a lista de erros; vazia = conteúdo válido. SDD §6. */
export function validate({ videos, temas }, { statusPermitidos = STATUS_PERMITIDOS_FASE_1 } = {}) {
  const erros = [];
  const slugs = new Map();
  for (const [chave, t] of Object.entries(temas)) {
    if (!SLUG.test(chave)) erros.push(`temas.yml: chave "${chave}" fora de [a-z0-9-]`);
    if (!t?.nome) erros.push(`temas.yml: "${chave}" sem nome`);
  }
  for (const v of videos) {
    const onde = `content/videos/${v.arquivo}`;
    if (!v.id) erros.push(`${onde}: sem id`);
    else if (v.arquivo !== `${v.id}.md`) erros.push(`${onde}: o nome do arquivo deve ser <id>.md (${v.id}.md)`);
    if (!v.slug || !SLUG.test(v.slug)) erros.push(`${onde}: slug "${v.slug ?? ''}" fora de [a-z0-9-]`);
    else if (v.slug.length > SLUG_MAX) erros.push(`${onde}: slug com mais de ${SLUG_MAX} caracteres`);
    else if (slugs.has(v.slug)) erros.push(`${onde}: slug "${v.slug}" repetido (também em ${slugs.get(v.slug)})`);
    else slugs.set(v.slug, v.arquivo);
    if (!STATUS.includes(v.status)) erros.push(`${onde}: status "${v.status}" fora de ${STATUS.join(' | ')}`);
    else if (!statusPermitidos.includes(v.status)) erros.push(`${onde}: status "${v.status}" ainda não é permitido (fase 1: sem artigo revisado)`);
    if (!Array.isArray(v.temas ?? [])) erros.push(`${onde}: temas deve ser uma lista`);
    for (const t of v.temas ?? []) if (!(t in temas)) erros.push(`${onde}: tema "${t}" não existe em content/temas.yml`);
    if (!v.youtube?.titulo) erros.push(`${onde}: youtube.titulo ausente`);
    if (!v.youtube?.publicado_em) erros.push(`${onde}: youtube.publicado_em ausente`);
  }
  return erros;
}

// ── Formatação ──────────────────────────────────────────────────────────────

/** Gera slug a partir do título. Usado pela coleta UMA vez; depois o slug é fixo. */
export function slugify(titulo) {
  const s = String(titulo).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
    .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  return s.length <= SLUG_MAX ? s : s.slice(0, SLUG_MAX).replace(/-[^-]*$/, '') || s.slice(0, SLUG_MAX);
}

const MESES = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];
const isoDate = (d) => (d instanceof Date ? d.toISOString().slice(0, 10) : String(d).slice(0, 10));
export function dataPt(d) {
  const [a, m, dia] = isoDate(d).split('-').map(Number);
  return `${dia} de ${MESES[m - 1]} de ${a}`;
}

/** PT14M32S → "14 min 32 s". */
export function duracaoPt(iso) {
  const m = /^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/.exec(iso ?? '');
  if (!m) return '';
  const [, h, min, s] = m.map((x) => Number(x || 0));
  return [h && `${h} h`, min && `${min} min`, s && `${s} s`].filter(Boolean).join(' ') || '0 s';
}

/**
 * VTT → trechos [{ t: segundos, texto }]. Legenda automática repete a linha
 * anterior a cada cue (texto "rolando"); só a parte nova é mantida.
 */
export function parseVtt(vtt) {
  const cues = [];
  let ultimo = '';
  for (const bloco of vtt.replace(/\r/g, '').split(/\n\n+/)) {
    const linhas = bloco.split('\n');
    const i = linhas.findIndex((l) => l.includes('-->'));
    if (i < 0) continue;
    const t = segundos(linhas[i].split('-->')[0].trim());
    const texto = linhas.slice(i + 1).join(' ').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
    if (!texto) continue;
    const novo = texto.startsWith(ultimo) && ultimo ? texto.slice(ultimo.length).trim() : texto;
    ultimo = texto;
    if (novo && novo !== cues.at(-1)?.texto) cues.push({ t, texto: novo });
  }
  return cues;
}
const segundos = (ts) => ts.split(':').reverse().reduce((acc, p, i) => acc + parseFloat(p) * 60 ** i, 0);
const relogio = (s) => {
  const t = Math.floor(s);
  const h = Math.floor(t / 3600), m = Math.floor((t % 3600) / 60), ss = String(t % 60).padStart(2, '0');
  return h ? `${h}:${String(m).padStart(2, '0')}:${ss}` : `${m}:${ss}`;
};

/** Agrupa a transcrição em parágrafos de ~1 minuto, cada um com o minuto de início. */
export function paragrafos(cues, janela = 60) {
  const out = [];
  for (const c of cues) {
    const p = out.at(-1);
    if (p && c.t - p.t < janela) p.texto += ` ${c.texto}`;
    else out.push({ t: c.t, texto: c.texto });
  }
  return out;
}

/** Descrição do YouTube: escapa, torna URLs clicáveis e mantém as quebras de linha. */
export function descricaoHtml(texto) {
  return esc(texto ?? '')
    .replace(/https?:\/\/[^\s<]+[^\s<.,;:!?)\]]/g, (u) => `<a href="${u}" rel="noopener">${u}</a>`)
    .split(/\n{2,}/).map((p) => `<p>${p.replace(/\n/g, '<br>')}</p>`).join('\n');
}

const rotaVideo = (v) => `/videos/${v.slug}`;
const rotaTema = (t) => `/temas/${t}`;
const recentes = (a, b) => isoDate(b.youtube.publicado_em).localeCompare(isoDate(a.youtube.publicado_em));
const resumo = (texto, max = 155) => {
  const s = String(texto ?? '').replace(/https?:\/\/\S+/g, '').replace(/\s+/g, ' ').trim();
  return s.length <= max ? s : `${s.slice(0, max - 1).replace(/\s+\S*$/, '')}…`;
};

// ── Modelos ─────────────────────────────────────────────────────────────────

const CSS = `
:root{--bg:#0d1117;--bg-2:#161b22;--border:#30363d;--text:#c9d1d9;--muted:#8b949e;--accent:#58a6ff;--accent-purple:#8a2be2;--brand:#007bff}
*{box-sizing:border-box}html,body{margin:0;padding:0}
body{font-family:'Inter',system-ui,sans-serif;background:var(--bg);color:var(--text);line-height:1.7;-webkit-font-smoothing:antialiased}
a{color:var(--accent);text-underline-offset:3px}a:hover{color:#79b8ff}
.skip{position:absolute;left:-9999px}.skip:focus{left:16px;top:12px;z-index:99;background:var(--bg-2);padding:8px 12px;border-radius:8px}
.top{position:sticky;top:0;z-index:50;background:rgba(13,17,23,.88);backdrop-filter:blur(8px);border-bottom:1px solid var(--border)}
.top-in,.wrap{max-width:880px;margin:0 auto;padding:14px 24px}
.top-in{display:flex;gap:20px;align-items:center;justify-content:space-between}
.top a{text-decoration:none;font-weight:600}.brand{color:#fff}
.crumb{font-size:.9rem;color:var(--muted)}
h1{font-size:clamp(1.6rem,4vw,2.3rem);line-height:1.25;color:#fff;margin:.6em 0 .3em}
h2{font-size:1.3rem;color:#fff;margin:2em 0 .6em}
.meta{color:var(--muted);font-size:.95rem;margin:0 0 1.4em}
.chips{list-style:none;padding:0;margin:0 0 1.6em;display:flex;flex-wrap:wrap;gap:8px}
.chips a{display:inline-block;padding:4px 12px;border:1px solid var(--border);border-radius:999px;text-decoration:none;font-size:.9rem}
.chips a:hover{border-color:var(--accent);box-shadow:0 0 12px rgba(0,123,255,.35)}
.yt{position:relative;aspect-ratio:16/9;background:#000;border:1px solid var(--border);border-radius:12px;overflow:hidden}
.yt img{width:100%;height:100%;object-fit:cover;opacity:.75}
.yt iframe{position:absolute;inset:0;width:100%;height:100%;border:0}
.yt-play{position:absolute;inset:auto 0 0 0;margin:auto;top:0;width:max-content;height:max-content;padding:14px 24px;border:0;border-radius:999px;font:600 1rem 'Inter',sans-serif;color:#fff;background:linear-gradient(90deg,#007bff,#8a2be2);cursor:pointer;box-shadow:0 0 24px rgba(138,43,226,.45)}
.yt-play:hover{transform:translateY(-2px)}
.yt-link{margin:.6em 0 0;font-size:.95rem}
.box{background:var(--bg-2);border:1px solid var(--border);border-radius:12px;padding:4px 20px}
details summary{cursor:pointer;font-weight:600;padding:12px 0;color:#fff}
.aviso{color:var(--muted);font-size:.9rem;margin:.2em 0 1em}
.ts{font-variant-numeric:tabular-nums;color:var(--muted);margin-right:.6em}
.lista{list-style:none;padding:0;margin:0;display:grid;gap:14px}
.card{display:grid;grid-template-columns:168px 1fr;gap:16px;align-items:start;padding:12px;background:var(--bg-2);border:1px solid var(--border);border-radius:12px;transition:transform .15s,box-shadow .15s}
.card:hover{transform:translateY(-2px);box-shadow:0 0 18px rgba(0,123,255,.25)}
.card img{width:168px;aspect-ratio:16/9;object-fit:cover;border-radius:8px}
.card h3{font-size:1.05rem;margin:0 0 4px}.card h3 a{color:#fff;text-decoration:none}.card h3 a:hover{color:var(--accent)}
.card p{margin:0;color:var(--muted);font-size:.9rem}
.filtro{margin:0 0 1.2em;display:flex;gap:10px;align-items:center;flex-wrap:wrap}
.filtro select{font:inherit;color:var(--text);background:var(--bg-2);border:1px solid var(--border);border-radius:8px;padding:6px 10px}
.foot{border-top:1px solid var(--border);margin-top:4em}.foot .wrap{font-size:.9rem;color:var(--muted);display:flex;flex-wrap:wrap;gap:16px}
@media (max-width:560px){.card{grid-template-columns:1fr}.card img{width:100%}}
@media (prefers-reduced-motion:reduce){*{transition:none!important}.yt-play:hover,.card:hover{transform:none}}
`.trim();

function pagina({ titulo, descricao, rota, robots, jsonld, corpo, script = '' }) {
  return `<!DOCTYPE html>
<!-- GERADO por scripts/gen-videos.mjs a partir de content/ — não edite à mão. -->
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${esc(titulo)} | ${AUTOR}</title>
<meta name="description" content="${esc(descricao)}">
<meta name="robots" content="${robots}">
<link rel="canonical" href="${SITE}${rota}">
<meta property="og:type" content="${rota.startsWith('/videos/') ? 'video.other' : 'website'}">
<meta property="og:title" content="${esc(titulo)}">
<meta property="og:description" content="${esc(descricao)}">
<meta property="og:url" content="${SITE}${rota}">
<meta property="og:locale" content="pt_BR">
<link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96">
<link rel="icon" type="image/svg+xml" href="/favicon.svg">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet" data-async-css media="print" onload="this.media='all'">
<noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap"></noscript>
<style>${CSS}</style>
<script type="application/ld+json">${JSON.stringify(jsonld).replace(/</g, '\\u003c')}</script>
</head>
<body>
<a class="skip" href="#conteudo">Pular para o conteúdo</a>
<header class="top"><nav class="top-in" aria-label="Principal"><a class="brand" href="/">${AUTOR}</a><a href="/videos">Vídeos</a></nav></header>
<main id="conteudo" class="wrap">
${corpo}
</main>
<footer class="foot"><div class="wrap"><a href="/privacidade">Privacidade</a><a href="/cookies">Cookies</a><a href="/termos">Termos</a><a href="https://www.youtube.com/channel/UC551iKrIXGmAB9UcBzHtLhw" rel="noopener">Canal no YouTube</a></div></footer>
${script}</body>
</html>
`;
}

/*
 * Player em fachada (SDD §6): miniatura + botão. O iframe de youtube-nocookie
 * só nasce no clique — nenhum cookie de terceiro nem 1 MB de player antes disso.
 * Sem JS o botão fica oculto e o link "Abrir no YouTube" basta.
 */
const SCRIPT_FACHADA = `<script>
document.querySelectorAll('.yt[data-id]').forEach(function (box) {
  var b = box.querySelector('.yt-play');
  b.hidden = false;
  b.addEventListener('click', function () {
    var f = document.createElement('iframe');
    f.src = 'https://www.youtube-nocookie.com/embed/' + box.dataset.id + '?autoplay=1&rel=0';
    f.title = box.dataset.title;
    f.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
    f.allowFullscreen = true;
    box.replaceChildren(f);
    f.focus();
  });
});
</script>
`;

const SCRIPT_FILTRO = `<script>
(function () {
  var f = document.getElementById('filtro');
  if (!f) return;
  var sel = f.querySelector('select'), status = document.getElementById('filtro-status');
  var itens = document.querySelectorAll('#lista-videos > li');
  f.hidden = false;
  sel.addEventListener('change', function () {
    var n = 0;
    itens.forEach(function (li) {
      var ok = !sel.value || (' ' + li.dataset.temas + ' ').indexOf(' ' + sel.value + ' ') >= 0;
      li.hidden = !ok;
      if (ok) n++;
    });
    status.textContent = n + (n === 1 ? ' vídeo' : ' vídeos');
  });
})();
</script>
`;

function chipsTemas(v, temas) {
  if (!v.temas?.length) return '';
  return `<ul class="chips" aria-label="Assuntos">${v.temas.map((t) => `<li><a href="${rotaTema(t)}">${esc(temas[t].nome)}</a></li>`).join('')}</ul>`;
}

function cartao(v, temas) {
  const y = v.youtube;
  return `<li data-temas="${esc((v.temas ?? []).join(' '))}"><article class="card">
<img src="${esc(y.miniatura || `https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`)}" alt="" loading="lazy" width="168" height="94">
<div><h3><a href="${rotaVideo(v)}">${esc(y.titulo)}</a></h3>
<p>${dataPt(y.publicado_em)}${y.duracao ? ` · ${duracaoPt(y.duracao)}` : ''}${v.temas?.length ? ` · ${v.temas.map((t) => esc(temas[t].nome)).join(', ')}` : ''}</p></div>
</article></li>`;
}

export function renderVideo(v, temas) {
  const y = v.youtube;
  const rota = rotaVideo(v);
  const descricao = resumo(y.descricao) || `Vídeo de ${AUTOR}: ${y.titulo}.`;
  const robots = v.status === 'publicado' ? 'index, follow' : 'noindex, follow';
  const transcricaoTexto = v.transcricao?.map((c) => c.texto).join(' ');
  const jsonld = {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: y.titulo,
    description: descricao,
    thumbnailUrl: y.miniatura || `https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`,
    uploadDate: isoDate(y.publicado_em),
    ...(y.duracao && { duration: y.duracao }),
    embedUrl: `https://www.youtube-nocookie.com/embed/${v.id}`,
    url: `${SITE}${rota}`,
    inLanguage: 'pt-BR',
    author: { '@type': 'Person', name: AUTOR, url: SITE },
    ...(transcricaoTexto && { transcript: transcricaoTexto }),
  };
  const transcricao = v.transcricao?.length
    ? `<section aria-labelledby="h-transcricao"><h2 id="h-transcricao">Transcrição</h2>
<div class="box"><details><summary>Mostrar a transcrição completa</summary>
<p class="aviso">Transcrição automática, não revisada. Pode conter erros de palavras, nomes e pontuação.</p>
${paragrafos(v.transcricao).map((p) => `<p><span class="ts">[${relogio(p.t)}]</span>${esc(p.texto)}</p>`).join('\n')}
</details></div></section>`
    : `<section aria-labelledby="h-transcricao"><h2 id="h-transcricao">Transcrição</h2><p class="aviso">Transcrição ainda não disponível.</p></section>`;
  const corpo = `<p class="crumb"><a href="/videos">Vídeos</a></p>
<h1>${esc(y.titulo)}</h1>
<p class="meta">Publicado em <time datetime="${isoDate(y.publicado_em)}">${dataPt(y.publicado_em)}</time>${y.duracao ? ` · ${duracaoPt(y.duracao)}` : ''}</p>
${chipsTemas(v, temas)}
<div class="yt" data-id="${esc(v.id)}" data-title="${esc(`Vídeo: ${y.titulo}`)}">
<img src="${esc(jsonld.thumbnailUrl)}" alt="" width="1280" height="720">
<button type="button" class="yt-play" hidden aria-label="${esc(`Assistir aqui: ${y.titulo}`)}">▶ Assistir aqui</button>
</div>
<p class="yt-link"><a href="https://www.youtube.com/watch?v=${esc(v.id)}" rel="noopener">Abrir no YouTube</a></p>
<section aria-labelledby="h-descricao"><h2 id="h-descricao">Sobre o vídeo</h2>
${descricaoHtml(y.descricao) || '<p>Sem descrição.</p>'}</section>
${transcricao}`;
  const html = pagina({ titulo: y.titulo, descricao, rota, robots, jsonld, corpo, script: SCRIPT_FACHADA });
  const md = [
    `# ${y.titulo}`, '',
    `Vídeo de ${AUTOR}, publicado em ${dataPt(y.publicado_em)}${y.duracao ? ` (${duracaoPt(y.duracao)})` : ''}.`,
    `Assistir: https://www.youtube.com/watch?v=${v.id}`, '',
    ...(v.temas?.length ? [`Assuntos: ${v.temas.map((t) => `[${temas[t].nome}](${SITE}${rotaTema(t)})`).join(', ')}`, ''] : []),
    '## Sobre o vídeo', '', y.descricao?.trim() || 'Sem descrição.', '',
    '## Transcrição', '',
    ...(v.transcricao?.length
      ? ['_Transcrição automática, não revisada._', '', ...paragrafos(v.transcricao).map((p) => `[${relogio(p.t)}] ${p.texto}\n`)]
      : ['Transcrição ainda não disponível.', '']),
  ].join('\n');
  return { html, md };
}

export function renderTema(chave, tema, lista, temas) {
  const rota = rotaTema(chave);
  const descricao = resumo(tema.resumo) || `Vídeos de ${AUTOR} sobre ${tema.nome}.`;
  const jsonld = {
    '@context': 'https://schema.org', '@type': 'CollectionPage', name: tema.nome, description: descricao,
    url: `${SITE}${rota}`, inLanguage: 'pt-BR',
    hasPart: lista.map((v) => ({ '@type': 'VideoObject', name: v.youtube.titulo, url: `${SITE}${rotaVideo(v)}` })),
  };
  const corpo = `<p class="crumb"><a href="/videos">Vídeos</a></p>
<h1>${esc(tema.nome)}</h1>
${tema.resumo ? `<p>${esc(tema.resumo)}</p>` : ''}
<p class="meta">${lista.length} ${lista.length === 1 ? 'vídeo' : 'vídeos'}</p>
<ul class="lista">
${lista.map((v) => cartao(v, temas)).join('\n')}
</ul>`;
  const html = pagina({ titulo: `${tema.nome} — vídeos`, descricao, rota, robots: 'index, follow', jsonld, corpo });
  const md = [`# ${tema.nome}`, '', tema.resumo ?? '', '',
    ...lista.map((v) => `- [${v.youtube.titulo}](${SITE}${rotaVideo(v)}) — ${dataPt(v.youtube.publicado_em)}`), ''].join('\n');
  return { html, md };
}

export function renderIndice(lista, temas, temasUsados) {
  const rota = '/videos';
  const descricao = `Os vídeos do canal de ${AUTOR}, por assunto, com descrição e transcrição.`;
  const jsonld = {
    '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'Vídeos', description: descricao,
    url: `${SITE}${rota}`, inLanguage: 'pt-BR',
  };
  const filtro = temasUsados.length
    ? `<div id="filtro" class="filtro" hidden><label for="filtro-tema">Filtrar por assunto</label>
<select id="filtro-tema"><option value="">Todos os assuntos</option>${temasUsados.map((t) => `<option value="${t}">${esc(temas[t].nome)}</option>`).join('')}</select>
<span id="filtro-status" role="status" aria-live="polite"></span></div>`
    : '';
  const assuntos = temasUsados.length
    ? `<h2>Assuntos</h2><ul class="chips">${temasUsados.map((t) => `<li><a href="${rotaTema(t)}">${esc(temas[t].nome)}</a></li>`).join('')}</ul>`
    : '';
  const corpo = `<h1>Vídeos</h1>
<p class="meta">${lista.length} ${lista.length === 1 ? 'vídeo' : 'vídeos'} do canal, do mais recente ao mais antigo.</p>
${assuntos}
<h2>Todos os vídeos</h2>
${filtro}
<ul class="lista" id="lista-videos">
${lista.map((v) => cartao(v, temas)).join('\n')}
</ul>`;
  const html = pagina({ titulo: 'Vídeos', descricao, rota, robots: 'index, follow', jsonld, corpo, script: filtro ? SCRIPT_FILTRO : '' });
  const md = ['# Vídeos', '', descricao, '',
    ...(temasUsados.length ? ['## Assuntos', '', ...temasUsados.map((t) => `- [${temas[t].nome}](${SITE}${rotaTema(t)})`), ''] : []),
    '## Todos os vídeos', '',
    ...lista.map((v) => `- [${v.youtube.titulo}](${SITE}${rotaVideo(v)}) — ${dataPt(v.youtube.publicado_em)}`), ''].join('\n');
  return { html, md };
}

// ── Montagem ────────────────────────────────────────────────────────────────

/** Conteúdo → mapa { caminho relativo: texto }. Lança se o conteúdo for inválido. */
export function build(content, opcoes) {
  const erros = validate(content, opcoes);
  if (erros.length) throw new Error(`conteúdo inválido:\n  - ${erros.join('\n  - ')}`);
  const { temas } = content;
  const vivos = content.videos.filter((v) => v.status !== 'removido').sort(recentes);
  const out = {};
  for (const v of vivos) {
    const { html, md } = renderVideo(v, temas);
    out[`src/videos/${v.slug}.html`] = html;
    out[`public/videos/${v.slug}.md`] = md;
  }
  const temasUsados = Object.keys(temas).filter((t) => vivos.some((v) => v.temas?.includes(t)));
  for (const t of temasUsados) {
    const { html, md } = renderTema(t, temas[t], vivos.filter((v) => v.temas?.includes(t)), temas);
    out[`src/temas/${t}.html`] = html;
    out[`public/temas/${t}.md`] = md;
  }
  if (vivos.length) {
    const { html, md } = renderIndice(vivos, temas, temasUsados);
    out['src/videos.html'] = html;
    out['public/videos.md'] = md;
  }
  const noindex = vivos.filter((v) => v.status !== 'publicado').map(rotaVideo).sort();
  out[EXCLUDE_JSON] = `${JSON.stringify(noindex, null, 2)}\n`;
  return out;
}

/** Arquivos que existem nas pastas do gerador (+ índice) e que ele não gerou. */
function orfaos(outRoot, gerados) {
  const achados = [];
  for (const d of DONOS) {
    const abs = join(outRoot, d);
    if (!existsSync(abs)) continue;
    for (const f of readdirSync(abs)) if (!(`${d}/${f}` in gerados)) achados.push(`${d}/${f}`);
  }
  for (const f of ['src/videos.html', 'public/videos.md']) if (existsSync(join(outRoot, f)) && !(f in gerados)) achados.push(f);
  return achados;
}

export function run({ contentDir = join(ROOT, 'content'), outRoot = ROOT, check = false } = {}) {
  const gerados = build(loadContent(contentDir));
  const divergentes = Object.entries(gerados)
    .filter(([p, txt]) => !existsSync(join(outRoot, p)) || readFileSync(join(outRoot, p), 'utf8') !== txt)
    .map(([p]) => p);
  const sobras = orfaos(outRoot, gerados);
  if (check) return { divergentes, sobras, total: Object.keys(gerados).length };
  for (const p of divergentes) {
    mkdirSync(dirname(join(outRoot, p)), { recursive: true });
    writeFileSync(join(outRoot, p), gerados[p]);
  }
  for (const p of sobras) rmSync(join(outRoot, p));
  return { divergentes, sobras, total: Object.keys(gerados).length };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  const opt = (nome) => { const i = args.indexOf(nome); return i >= 0 ? resolve(args[i + 1]) : undefined; };
  const check = args.includes('--check');
  try {
    const r = run({ contentDir: opt('--content'), outRoot: opt('--out'), check });
    if (check) {
      const ruins = [...r.divergentes.map((p) => `desatualizado: ${p}`), ...r.sobras.map((p) => `sem fonte: ${p}`)];
      if (ruins.length) {
        console.error(`✗ vídeos: ${ruins.length} arquivo(s) fora de sincronia — rode node scripts/gen-videos.mjs\n  ${ruins.join('\n  ')}`);
        process.exit(1);
      }
      console.log(`✓ vídeos: ${r.total} arquivo(s) gerados em dia`);
    } else {
      console.log(`✓ vídeos: ${r.divergentes.length} gravado(s), ${r.sobras.length} removido(s), ${r.total} no total`);
    }
  } catch (e) {
    console.error(`✗ vídeos: ${e.message}`);
    process.exit(1);
  }
}

