#!/usr/bin/env node
/*
 * Gera a home "O pensamento em prática" (SDD-nova-home §13 e §14; protótipo em
 * docs/specs/pages/portfolio/prototipo/, que é a referência visual e de código).
 *
 *   src/index.html  → bloco <!-- HM:START --> … <!-- HM:END --> (o corpo da página)
 *   public/index.md → gêmeo Markdown da home (arquivo inteiro)
 *
 * Fontes: public/cv.json (nome, contato), specs/ecosystem.nav.yaml (projetos com
 * natureza "experiencia", na ordem do YAML), scripts/home/destaques.mjs (recentes) e
 * scripts/home/home.data.mjs (textos aprovados). Nenhum JavaScript insere texto na página.
 *
 * Uso: node scripts/home/gen-home.mjs [--check]
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadEcossistema } from '../catalogo/dados.mjs';
import { RECENTES } from './destaques.mjs';
import { ABERTURA, PERGUNTA, ETAPAS_DO_GATE, INCIDENTE, ESTUDO, NARRACAO, HISTORIA, IDEIAS, PROJETOS, CONTATO, RETRATO, DIAGRAMA } from './home.data.mjs';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const SITE = 'https://mauricio.issei.com.br';
const fail = (m) => { console.error(`✗ [home] ${m}`); process.exit(1); };
const cv = JSON.parse(readFileSync(join(ROOT, 'public/cv.json'), 'utf8'));
const { eco } = loadEcossistema();

/** Projetos da S04: nós "experiencia" do YAML, na ordem do YAML, cada um com cartão em home.data. */
const projetos = Object.entries(eco.nodes).filter(([, n]) => n.natureza === 'experiencia').map(([slug, n]) => {
  const c = PROJETOS.cartoes[slug] ?? fail(`projeto "${slug}" do YAML sem cartão em home.data.mjs`);
  return { slug, href: `/${n.file}`, img: c.img ?? slug, ...c };
});

// ---------------------------------------------------------------------------
// Imagens: AVIF e WebP gerados por scripts/gen-imagens.mjs (jobs "home:*" e "retrato")
// ---------------------------------------------------------------------------
const LARGURAS = { diagrama: [960, 1600] };
const srcset = (base, ws, fmt) => ws.map((w) => `${base}-${w}.${fmt} ${w}w`).join(', ');
function foto(base, ws, alt, w, h, sizes, extra = 'loading="lazy"') {
  const maior = ws[ws.length - 1];
  return `<picture><source type="image/avif" srcset="${srcset(base, ws, 'avif')}" sizes="${sizes}">`
    + `<img src="${base}-${maior}.webp" srcset="${srcset(base, ws, 'webp')}" sizes="${sizes}" alt="${alt}" width="${w}" height="${h}" decoding="async" ${extra}></picture>`;
}
const imgHome = (n, alt, w, h, sizes, extra) => foto(`/img/home/${n}`, LARGURAS[n] ?? [480, 960], alt, w, h, sizes, extra);
const retrato = (alt, sizes, extra) => foto('/img/retrato', [480, 960, 1200], alt, 1200, 1500, sizes, extra);

// ---------------------------------------------------------------------------
// Blocos
// ---------------------------------------------------------------------------
const leg = ([dims, narr], cls = '') => `<div class="hm-leg hm-tl${cls}"><p class="hm-dims">${dims}</p><p class="hm-narr">${narr}</p></div>`;
const cena = (n, m, legs) => `<li class="hm-cena" data-cena="${n}"><figure>${m}<figcaption>${legs}</figcaption></figure></li>`;

const c02 = `<div class="hm-m1 hm-tl"><div class="hm-q"><p class="hm-q__pergunta hm-tl"><span class="hm-q__digita hm-tl">${PERGUNTA.texto}</span></p><ul class="hm-q__partes hm-tl" aria-label="A pergunta em partes">${PERGUNTA.partes.map(([p, f], k) => `<li class="hm-q__parte hm-tl" style="--k:${k}"><span class="hm-q__p">${p}</span><span class="hm-q__fontes hm-tl">${f}</span></li>`).join('')}</ul><p class="hm-q__sintese hm-tl"><span>${PERGUNTA.sintese}</span><span class="hm-traco hm-tl" aria-hidden="true"></span></p></div></div>`;
const c03 = `<div class="hm-m1 hm-tl"><div class="hm-img hm-img--a">${imgHome(DIAGRAMA.img, DIAGRAMA.alt, 1600, 1067, '(min-width: 900px) 50vw, 100vw', 'loading="lazy" class="hm-tl"')}</div><div class="hm-gate hm-tl" role="group" aria-label="Saída do quality gate deste site"><p class="hm-gate__cmd">$ npm run gate</p><ul>${ETAPAS_DO_GATE.map((e, k) => `<li class="hm-tl" style="--k:${k}"><span aria-hidden="true">✓</span> ${e}</li>`).join('')}</ul></div></div>`;
const c04 = `<div class="hm-m1 hm-m1--noite hm-tl"><ol class="hm-inc" aria-label="Estados de um incidente">${INCIDENTE.map((t, k) => `<li class="hm-tl" style="--k:${k}">${t}</li>`).join('')}</ol></div>`;
const c05 = `<div class="hm-m1 hm-tl"><div class="hm-estudo hm-tl"><p class="hm-estudo__tit">${ESTUDO.titulo}</p><p class="hm-estudo__url">${ESTUDO.href}</p><ol class="hm-estudo__lista" aria-label="Os dez princípios do estudo">${ESTUDO.principios.map((t) => `<li>${t}</li>`).join('')}</ol></div></div>`;
const [d4, n4, n4b] = NARRACAO['04'];
const leg04 = `<div class="hm-leg hm-tl"><p class="hm-dims">${d4}</p><p class="hm-narr">${n4}</p><span class="hm-kintsugi hm-tl" aria-hidden="true"></span><p class="hm-narr hm-narr--2 hm-tl">${n4b}</p></div>`;

const menu = [['#apresentacao', 'mn1', 'Apresentação', 'Início'], ['#historia', 'mn2', 'Minha história', 'História'], ['#ideias', 'mn3', 'Minhas ideias', 'Ideias'], ['#projetos', 'mn4', 'Meus projetos', 'Projetos']]
  .map(([h, c, l, cur]) => `<li><a href="${h}" class="${c}" aria-label="${l}"><span class="hm-menu__l" aria-hidden="true">${l}</span><span class="hm-menu__c" aria-hidden="true">${cur}</span></a></li>`).join('');

const marcos = HISTORIA.marcos.map((m, i) => `<li class="hm-marco${m.atual ? ' hm-marco--atual' : ''}" style="--i:${i + 1}"><b>${m.anos}:</b><span>${m.texto}</span></li>`).join('');
// Páginas geradas em subpasta (src/videos/) são ligadas sem ".html", como no resto do site (audit-site).
const hrefDe = (rota) => (rota.startsWith('/videos/') ? rota : `${rota}.html`);
const recentes = RECENTES.map((r) => `<li><a href="${hrefDe(r.rota)}">${r.titulo}</a><span class="hm-dims">${r.formato}</span></li>`).join('');
const mesa = IDEIAS.mesa.map((m) => `<div class="foto m1${m.contem ? ' contem' : ''}">${imgHome(m.img, m.alt, 960, m.img === 'estados' ? 768 : 600, '(min-width: 640px) 40vw, 100vw')}</div>`).join('');
const cartoes = projetos.map((p, i) => `<li style="--i:${i}"><div class="foto m1">${imgHome(p.img, p.alt, 960, 600, '(min-width: 1100px) 22vw, (min-width: 640px) 45vw, 50vw')}</div><a href="${p.href}">${p.titulo}</a><p class="hm-tese">${p.tese}</p><p class="hm-dims">${p.dims}</p></li>`).join('');
const contatos = [[`mailto:${cv.Contato.Email}`, cv.Contato.Email], [cv.Contato.LinkedIn, 'LinkedIn'], [cv.Contato.GitHub, 'GitHub'], [cv.Contato.youtube, 'YouTube']];

const bloco = `<!-- HM:START — gerado por scripts/home/gen-home.mjs (SDD-nova-home §14). NÃO editar à mão -->
<nav class="hm-menu" aria-label="Sessões"><ul>${menu}</ul></nav>
<main id="conteudo" class="hm">
<section class="hm-s hm-s01" id="apresentacao" aria-labelledby="hm-nome"><div class="palco">
<div class="hm-noite hm-tl" aria-hidden="true"></div><span class="hm-fio hm-tl" aria-hidden="true"></span>
<div class="hm-intro hm-tl"><span class="hm-fio01 hm-tl" aria-hidden="true"></span><div class="hm-intro__bloco"><p class="hm-num" aria-hidden="true">01</p><div class="hm-intro__nome hm-tl"><h1 id="hm-nome">${cv.Nome}</h1></div>
<div class="hm-intro__resto hm-tl"><p class="hm-mensagem">${ABERTURA.mensagem.join('<br>')}</p><p class="hm-sub">${ABERTURA.sub}</p>
<p class="hm-contexto">${ABERTURA.contexto}</p>
<nav class="hm-caminhos" aria-label="Caminhos principais"><a href="#historia">Minha história</a><a href="#ideias">Minhas ideias</a><a href="#projetos">Meus projetos</a></nav></div></div>
<div class="m1 retrato hm-tl">${retrato(RETRATO.alt01, '(min-width: 900px) 40vw, 38vw', 'fetchpriority="high"')}</div></div>
<ol class="hm-cenas" aria-label="Como trabalho">
${cena('02', c02, leg(NARRACAO['02a'], ' hm-leg--a') + leg(NARRACAO['02b'], ' hm-leg--b'))}
${cena('03', c03, leg(NARRACAO['03']))}
${cena('04', c04, leg04)}
${cena('05', c05, leg(NARRACAO['05']))}
</ol></div></section>
<section class="hm-s hm-s02" aria-labelledby="t2"><span class="hm-ancora" id="historia"></span><div class="palco"><div class="hm-duas">
<div class="m1 retrato">${retrato(RETRATO.alt02, '(min-width: 640px) 33vw, 40vw')}</div>
<div class="hm-texto"><p class="hm-num" aria-hidden="true">02</p><h2 id="t2">Minha história</h2>
<p class="hm-marco">${HISTORIA.frase}</p>
<ul class="marcos">${marcos}</ul>
<p><a class="hm-cta" href="/curriculo.html">Conheça minha história →</a></p></div></div></div></section>
<section class="hm-s hm-s03" aria-labelledby="t3"><span class="hm-ancora" id="ideias"></span><div class="palco"><div class="hm-duas">
<div class="hm-texto"><p class="hm-num" aria-hidden="true">03</p><h2 id="t3">Minhas ideias</h2>
<p class="hm-frase">${IDEIAS.frase}</p>
<p>${IDEIAS.texto}</p>
<ul class="recentes" aria-label="Recentes">${recentes}</ul>
<p class="ctas"><a class="hm-cta" href="/catalogo.html">Explore minhas ideias →</a><a href="/videos.html">Vídeos do canal →</a></p></div>
<div class="mesa">${mesa}</div></div></div></section>
<section class="hm-s hm-s04" aria-labelledby="t4"><span class="hm-ancora" id="projetos"></span><div class="palco"><div class="hm-texto">
<p class="hm-num" aria-hidden="true">04</p><h2 id="t4">Meus projetos</h2>
<p>${PROJETOS.texto}</p>
<ul class="projetos">${cartoes}</ul>
<p><a class="hm-cta hm-fim" href="${PROJETOS.cta.href}">${PROJETOS.cta.texto}</a></p></div></div></section>
</main>
<footer class="hm hm-rodape" id="contact"><h2>Contato</h2><p class="hm-convite">${CONTATO.convite}</p><ul>${contatos.map(([h, t]) => `<li><a href="${h}">${t}</a></li>`).join('')}</ul></footer>
<!-- HM:END -->`;

// Gêmeo Markdown (agentes de IA pedem Markdown de "/"). Mesmo conteúdo, mesma ordem.
const md = [
  `# ${cv.Nome}`, '', `**${ABERTURA.mensagem.join(' ')}**`, '', ABERTURA.sub, '',
  `> Página inicial, gerada por scripts/home/gen-home.mjs. HTML: ${SITE}/`, '',
  ABERTURA.contexto, '',
  '## Como trabalho', '',
  `- **${NARRACAO['02a'][0]}.** ${NARRACAO['02a'][1]} Exemplo: "${PERGUNTA.texto}" — ${PERGUNTA.partes.map(([p, f]) => `${p} (${f})`).join('; ')}.`,
  `- **${NARRACAO['02b'][0]}.** ${NARRACAO['02b'][1]} Síntese: "${PERGUNTA.sintese}"`,
  `- **${NARRACAO['03'][0]}.** ${NARRACAO['03'][1]} O gate deste site: ${ETAPAS_DO_GATE.join(', ')}.`,
  `- **${d4}.** ${n4} ${n4b} Estados de um incidente: ${INCIDENTE.join(' → ')}.`,
  `- **${NARRACAO['05'][0]}.** ${NARRACAO['05'][1]} Exemplo: [${ESTUDO.titulo}](${SITE}${ESTUDO.href.replace(/\.html$/, '')}), com dez princípios: ${ESTUDO.principios.join('; ')}.`, '',
  '## Minha história', '', HISTORIA.frase, '', ...HISTORIA.marcos.map((m) => `- **${m.anos}:** ${m.texto}`), '', `Carreira completa: ${SITE}/curriculo`, '',
  '## Minhas ideias', '', IDEIAS.frase, '', IDEIAS.texto, '',
  ...RECENTES.map((r) => `- [${r.titulo}](${SITE}${r.rota}) — ${r.formato}`), '',
  `Todos os conteúdos: ${SITE}/catalogo · Vídeos do canal: ${SITE}/videos`, '',
  '## Meus projetos', '', PROJETOS.texto, '',
  ...projetos.map((p) => `- [${p.titulo}](${SITE}${p.href.replace(/\.html$/, '')}) — ${p.tese} *(${p.dims})*`), '',
  '## Para agentes de IA', '',
  '- [cv-for-ai.md](/cv-for-ai.md) — Currículo detalhado e stack técnica',
  '- [career-highlights-star.md](/career-highlights-star.md) — Projetos no formato STAR',
  '- [cv.json](/cv.json) — Dados estruturados do currículo',
  '- [catalogo.md](/catalogo.md) — Todos os conteúdos, por tema',
  '- [llms.txt](/llms.txt) — Índice de documentação para IA',
  '- [llms-full.txt](/llms-full.txt) — Documentação completa concatenada',
  '- [agent-catalog](/.well-known/agent-catalog) — Endpoints disponíveis', '',
  '## Contato', '', CONTATO.convite, '', `- E-mail: ${cv.Contato.Email}`, `- LinkedIn: ${cv.Contato.LinkedIn}`, `- GitHub: ${cv.Contato.GitHub}`, `- YouTube: ${cv.Contato.youtube}`, '',
].join('\n');

// ---------------------------------------------------------------------------
// Escrita / --check
// ---------------------------------------------------------------------------
const eol = (s) => s.replace(/\r\n/g, '\n');
const htmlPath = join(ROOT, 'src/index.html'), mdPath = join(ROOT, 'public/index.md');
const html = readFileSync(htmlPath, 'utf8');
const re = /<!-- HM:START[\s\S]*?<!-- HM:END -->/;
if (!re.test(html)) fail('marcadores HM:START … HM:END ausentes em src/index.html');
const alvos = [[htmlPath, html, html.replace(re, () => bloco)], [mdPath, existsSync(mdPath) ? readFileSync(mdPath, 'utf8') : '', md]];
const velhos = alvos.filter(([, a, b]) => eol(a) !== eol(b));
const nome = (p) => p.slice(ROOT.length + 1).replace(/\\/g, '/');
if (!velhos.length) { console.log(`✓ [home] sincronizado (${projetos.length} projetos, ${RECENTES.length} recentes)`); process.exit(0); }
if (process.argv.includes('--check')) fail(`dessincronizado: ${velhos.map(([p]) => nome(p)).join(', ')}. Rode: node scripts/home/gen-home.mjs`);
for (const [p, , b] of velhos) writeFileSync(p, b);
console.log(`✓ [home] gravado: ${velhos.map(([p]) => nome(p)).join(', ')}`);
