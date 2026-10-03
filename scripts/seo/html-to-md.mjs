// Converte o <main> de uma página do site em Markdown (companheiro .md, `mdFromMain` em pages.mjs).
//
// Existe para o .md nunca divergir do HTML: a página é a fonte, o Markdown é derivado. Não é um
// conversor genérico — cobre só os elementos que as páginas do site usam (títulos, parágrafos,
// listas, tabelas, details, dl, pre, figure, selos). Elemento desconhecido passa pelos filhos.
//
// Descartados: svg, script, style, button, form (os controles) e [hidden]. Fieldset vira item de lista.
import { SITE } from './identity.mjs';

const VOID = new Set(['br', 'hr', 'img', 'input', 'meta', 'link']);
const BLOCK = new Set(['p', 'div', 'section', 'article', 'aside', 'header', 'footer', 'nav', 'figure', 'figcaption',
  'ul', 'ol', 'li', 'table', 'details', 'summary', 'dl', 'dt', 'dd', 'pre', 'fieldset', 'form', 'h1', 'h2', 'h3', 'h4']);
const DROP = new Set(['svg', 'script', 'style', 'button', 'noscript']);
/** Fora do Markdown: [hidden] e o que a página marca com data-md="skip" (ex.: botões de CTA). */
const skipped = (n) => /\bhidden\b/.test(n.attrs.replace(/class="[^"]*"/, '')) || /data-md="skip"/.test(n.attrs);

const decode = (s) => s
  .replace(/&nbsp;/g, ' ').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"')
  .replace(/&#39;/g, "'").replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
  .replace(/&amp;/g, '&');

/** HTML → árvore mínima { tag, attrs, children } | string. */
function parse(html) {
  const root = { tag: 'root', attrs: '', children: [] };
  const stack = [root];
  const re = /<!--[\s\S]*?-->|<(\/?)([a-zA-Z][a-zA-Z0-9]*)([^>]*)>|([^<]+)/g;
  for (let m; (m = re.exec(html)); ) {
    if (m[0].startsWith('<!--')) continue;
    const top = stack[stack.length - 1];
    if (m[4] !== undefined) { top.children.push(m[4]); continue; }
    const [, close, name, attrs] = m;
    const tag = name.toLowerCase();
    if (close) {
      const i = stack.map((n) => n.tag).lastIndexOf(tag);
      if (i > 0) stack.length = i;
    } else {
      const node = { tag, attrs, children: [] };
      top.children.push(node);
      if (!VOID.has(tag) && !attrs.endsWith('/')) stack.push(node);
    }
  }
  return root;
}

const attr = (n, name) => n.attrs.match(new RegExp(`\\b${name}="([^"]*)"`))?.[1];
const hasClass = (n, c) => (attr(n, 'class') ?? '').split(/\s+/).includes(c) || (attr(n, 'class') ?? '').includes(c);
const squash = (s) => s.replace(/\s+/g, ' ').trim();

const href = (h = '') => {
  if (h.startsWith('#')) return null; // âncora interna: sem destino no .md
  if (/^https?:/.test(h)) return h;
  const slug = h.replace(/^\.?\//, '').replace(/\.html(#.*)?$/, '').replace(/#.*$/, '');
  return `${SITE.origin}/${slug}`;
};

function inline(n) {
  if (typeof n === 'string') return decode(n).replace(/\s+/g, ' ');
  if (DROP.has(n.tag) || skipped(n)) return '';
  const inner = () => n.children.map(inline).join('');
  switch (n.tag) {
    case 'strong': case 'b': { const t = inner().trim(); return t ? `**${t}**` : ''; }
    case 'em': case 'i': { const t = inner().trim(); return t ? `*${t}*` : ''; }
    case 'code': return `\`${inner().trim()}\``;
    case 'br': return ' ';
    case 'a': {
      const t = inner().trim();
      const u = href(attr(n, 'href'));
      return u && t ? `[${t}](${u})` : t;
    }
    case 'span':
      if (hasClass(n, 'dw-selo')) return `**[${squash(inner())}]**`;
      // translate="no": termo que o tradutor não deve tocar; em Markdown a forma preservada é o código inline.
      return /translate="no"/.test(n.attrs) ? `\`${squash(inner())}\`` : inner();
    default: return inner();
  }
}

const cell = (n) => squash(n.children.map(inline).join('')).replace(/\|/g, '\\|');
const kids = (n, tags) => n.children.filter((c) => typeof c !== 'string' && tags.includes(c.tag));

function table(n) {
  const cap = kids(n, ['caption'])[0];
  const rows = n.children.flatMap((c) => (typeof c === 'string' ? [] : c.tag === 'tr' ? [c] : ['thead', 'tbody', 'tfoot'].includes(c.tag) ? kids(c, ['tr']) : []));
  const grid = rows.map((r) => kids(r, ['th', 'td']).map(cell));
  if (!grid.length) return '';
  const w = Math.max(...grid.map((r) => r.length));
  const pad = (r) => [...r, ...Array(w - r.length).fill('')];
  const line = (r) => `| ${pad(r).join(' | ')} |`;
  const out = [];
  if (cap) out.push(`**${squash(cap.children.map(inline).join(''))}**`, '');
  out.push(line(grid[0]), line(Array(w).fill('---')), ...grid.slice(1).map(line));
  return out.join('\n');
}

function list(n, depth) {
  const ordered = n.tag === 'ol';
  return kids(n, ['li']).map((li, i) => {
    const mark = ordered ? `${i + 1}.` : '-';
    const parts = blocks(li, depth + 1).filter(Boolean);
    const [first = '', ...rest] = parts;
    const pad = '  '.repeat(depth);
    return `${pad}${mark} ${first.replace(/\n/g, `\n${pad}  `)}` + rest.map((r) => `\n${pad}  ${r.replace(/\n/g, `\n${pad}  `)}`).join('');
  }).join('\n');
}

/** Renderiza os filhos de `n` como uma lista de blocos Markdown. */
function blocks(n, depth = 0) {
  const out = [];
  let buf = '';
  const flush = () => { const t = squash(buf); if (t) out.push(t); buf = ''; };
  for (const c of n.children) {
    // Um <a> que embrulha blocos (cartão clicável) vira contêiner: o link se perde, o texto não.
    const cartao = typeof c !== 'string' && c.tag === 'a' && c.children.some((x) => typeof x !== 'string' && BLOCK.has(x.tag));
    if (typeof c === 'string' || (!BLOCK.has(c.tag) && !cartao)) { buf += inline(c); continue; }
    flush();
    if (DROP.has(c.tag) || skipped(c)) continue;
    switch (c.tag) {
      case 'h1': case 'h2': case 'h3': case 'h4': out.push(`${'#'.repeat(Number(c.tag[1]))} ${squash(c.children.map(inline).join(''))}`); break;
      case 'ul': case 'ol': out.push(list(c, depth)); break;
      case 'table': out.push(table(c)); break;
      case 'pre': out.push('```\n' + decode(c.children.map((x) => (typeof x === 'string' ? x : x.children.join(''))).join('')).trim() + '\n```'); break;
      case 'summary': out.push(`**${squash(c.children.map(inline).join(''))}**`); break;
      case 'figcaption': out.push(`*${squash(c.children.map(inline).join(''))}*`); break;
      case 'dl': {
        for (const d of c.children.filter((x) => typeof x !== 'string')) {
          const t = squash(d.children.map(inline).join(''));
          if (d.tag === 'dt') out.push(`**${t}**`); else if (d.tag === 'dd') out.push(t);
        }
        break;
      }
      case 'fieldset': {
        const legend = kids(c, ['legend'])[0];
        out.push(`- ${squash(legend?.children.map(inline).join('') ?? '')}: 0 ausente · 1 parcial · 2 completo`);
        break;
      }
      case 'form': out.push(...blocks(c, depth)); break;
      case 'p': case 'dt': case 'dd': out.push(squash(c.children.map(inline).join(''))); break;
      default: out.push(...blocks(c, depth));
    }
  }
  flush();
  return out;
}

/** @param {string} html página completa; usa só o conteúdo de <main>. */
export function mainToMarkdown(html) {
  const main = html.match(/<main[^>]*>([\s\S]*?)<\/main>/)?.[1];
  if (!main) throw new Error('sem <main> para converter');
  const md = blocks(parse(main)).filter(Boolean).join('\n\n');
  return md.replace(/\n{3,}/g, '\n\n').trim() + '\n';
}
