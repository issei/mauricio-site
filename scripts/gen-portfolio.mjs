#!/usr/bin/env node
/*
 * Grava o currículo (public/cv.json) como HTML ESTÁTICO em duas páginas:
 *
 *   src/index.html     → home "Mapa de Linhas"   (bloco <!-- PF:START/END -->)
 *   src/curriculo.html → home anterior, mesma aparência (blocos <!-- CV:<id>:START/END -->)
 *   public/curriculo.md → gêmeo Markdown de /curriculo (arquivo inteiro)
 *
 * Por que build-time e não fetch: a SDD do portfólio (docs/specs/pages/portfolio/)
 * exige que crawler, parser de ATS, agente de IA e tradutor do navegador vejam
 * 100% do texto sem executar JavaScript. Nenhuma das duas páginas busca o JSON.
 *
 * PROCEDÊNCIA: todo texto vem literal de public/cv.json. public/star.json só
 * valida a contagem de projetos por ano (SDD §13). A única camada editorial é
 * LINE_OF (termo → linha do mapa) — e um termo sem linha QUEBRA o gerador, para
 * nenhum dado sumir do mapa em silêncio.
 *
 * Uso: node scripts/gen-portfolio.mjs [--check]
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { PAGES } from './seo/pages.mjs';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const cv = JSON.parse(readFileSync(join(ROOT, 'public/cv.json'), 'utf8'));
const star = JSON.parse(readFileSync(join(ROOT, 'public/star.json'), 'utf8'));

// Data de referência determinística (senão o --check falharia a cada virada de dia).
const MODIFIED = PAGES.find((p) => p.slug === 'index').dateModified;
const NOW_YEAR = +MODIFIED.slice(0, 4);

const fail = (msg) => { console.error(`✗ [portfolio] ${msg}`); process.exit(1); };
const esc = (s = '') => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const slug = (s) => String(s).normalize('NFD').replace(/\p{M}/gu, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const firstYear = (s) => +String(s).match(/\d{4}/)[0];
const lastYear = (s) => +String(s).match(/\d{4}/g).at(-1);
const certDate = (c) => c.Data_Emissao || c.Ano || c.Periodo;

// Métrica numérica dentro de uma frase: destacada sem quebrar a frase.
const METRIC = /\b\d+(?:[.,]\d+)?(?:%|MM|k)(?!\w)|\bD[02]\b/g;
const hl = (s) => esc(s).replace(METRIC, '<strong class="pf-metric">$&</strong>');
const hasMetric = (s) => new RegExp(METRIC.source).test(s);

// ---------------------------------------------------------------------------
// Validação cruzada com star.json (SDD §13): mesmos projetos por ano.
// ---------------------------------------------------------------------------
for (const [year, cases] of Object.entries(star)) {
  const n = cases.reduce((a, c) => a + (c.sub_projetos?.length || 1), 0);
  const m = cv.Projetos.filter((p) => String(p.Periodo) === year).length;
  if (n !== m) fail(`star.json tem ${n} projeto(s) em ${year}, cv.json tem ${m}`);
}

// ---------------------------------------------------------------------------
// Linhas do mapa = grupos de Habilidades. Ordem escolhida para que as
// competências de cada empregador fiquem em linhas vizinhas (cápsulas curtas).
// ---------------------------------------------------------------------------
const LINES = [
  { id: 'dev', code: 'DEV', group: 'Desenvolvimento' },
  { id: 'lid', code: 'LID', group: 'Liderança & Habilidades Interpessoais' },
  { id: 'cld', code: 'CLD', group: 'Cloud & DevOps' },
  { id: 'plt', code: 'PLT', group: 'Plataformas & APIs' },
  { id: 'agi', code: 'AGI', group: 'Gestão & Metodologias Ágeis' },
  { id: 'uxd', code: 'UXD', group: 'UX & Design' },
  { id: 'dat', code: 'DAT', group: 'Data Science & Analytics' },
];
for (const l of LINES) if (!cv.Habilidades[l.group]) fail(`grupo "${l.group}" ausente em Habilidades`);
if (LINES.length !== Object.keys(cv.Habilidades).length) fail('Habilidades tem grupo sem linha no mapa');
const LINE = Object.fromEntries(LINES.map((l, i) => [l.id, { ...l, row: i + 2 }]));

/** Termo de Competencias / Tecnologias / curso → linha. ⚠ Editorial: revisar (spec §4). */
const LINE_OF = {
  // Competencias dos empregadores
  'Salesforce Administration': 'plt', SRE: 'cld', 'Liderança Técnica': 'lid', 'Arquitetura de Soluções': 'plt',
  'Amazon Web Services': 'cld', 'Experiência do usuário (UX)': 'uxd', Java: 'dev', 'APIs REST': 'plt', Scrum: 'agi',
  'Liderança de equipe': 'lid', Android: 'dev', Ionic: 'dev', 'Oracle PL/SQL': 'dev',
  'Java (J2EE/J2SE)': 'dev', MVC: 'dev', UML: 'dev', MDA: 'dev', DB2: 'dev', PostgreSQL: 'dev',
  EJB: 'dev', JBoss: 'dev', Oracle: 'dev',
  // Tecnologias dos projetos STAR
  Salesforce: 'plt', Quicksight: 'dat', AWS: 'cld', APIs: 'plt', STS: 'plt', 'WhatsApp API': 'plt',
  Ipricing: 'plt', 'Low-code': 'plt', 'Cockpit Rede': 'plt', 'Itaú PJ': 'plt', Cockpit: 'plt',
  'Força Campo': 'plt', 'Força Campo App': 'plt', Mainframe: 'plt',
  Agile: 'agi', 'Gestão de Contratos': 'agi', Orçamento: 'agi',
  DevOps: 'cld', Sybase: 'cld', Infraestrutura: 'cld', 'PCI Compliance': 'cld', Splunk: 'cld',
  // Formação dentro do eixo do mapa
  'Pós-graduação em Ciência de Dados – Data Analytics / Big Data': 'dat',
};
const lineOf = (term) => LINE_OF[term] ?? fail(`termo sem linha no mapa: "${term}" (adicione em LINE_OF)`);

// ---------------------------------------------------------------------------
// Dados derivados
// ---------------------------------------------------------------------------
const jobs = cv.Experiencia
  .map((e) => ({ ...e, id: `exp-${slug(e.Empresa)}`, start: firstYear(e.Periodo), lines: [...new Set(e.Competencias.map(lineOf))] }))
  .sort((a, b) => b.start - a.start);
const START_YEAR = Math.min(...jobs.map((j) => j.start));
const projects = cv.Projetos.map((p) => ({ ...p, id: `p-${p.Periodo}-${slug(p.Nome)}`, lines: [...new Set(p.Tecnologias.map(lineOf))] }));
const yearGroupId = (empresa, year) => `${slug(empresa)}-${year}`;
const edu = cv.Formacao_Academica.filter((f) => firstYear(f.Periodo) >= START_YEAR)
  .map((f) => ({ ...f, year: firstYear(f.Periodo), line: lineOf(f.Curso) }));

// Estações simples: (linha, ano) → itens
const stops = new Map();
const addStop = (line, year, item) => {
  const k = `${line}|${year}`;
  if (!stops.has(k)) stops.set(k, { line, year, items: [] });
  stops.get(k).items.push(item);
};
for (const p of projects) for (const l of p.lines) addStop(l, +p.Periodo, { name: p.Nome, href: `#${yearGroupId(p.Empresa, p.Periodo)}` });
for (const f of edu) addStop(f.line, f.year, { name: f.Curso, href: '#education' });

// Início de cada linha: a primeira estação (inclui empregadores). A linha segue
// contínua até hoje — a competência continua em uso, com ou sem projeto público.
const span = Object.fromEntries(LINES.map((l) => [l.id, { first: Infinity, firstName: '' }]));
const touch = (line, year, name) => {
  const s = span[line];
  if (year < s.first) Object.assign(s, { first: year, firstName: name });
};
for (const j of jobs) for (const l of j.lines) touch(l, j.start, j.Empresa);
for (const s of stops.values()) touch(s.line, s.year, s.items[0].name);
for (const l of LINES) if (span[l.id].first === Infinity) fail(`linha ${l.code} sem nenhuma estação`);

const col = (year) => year - START_YEAR + 2;

// ---------------------------------------------------------------------------
// Blocos da home (index.html)
// ---------------------------------------------------------------------------
const ICON = {
  linkedin: '<path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.5h4V21H3zM9.5 9.5h3.8v1.6h.06c.53-1 1.83-2.06 3.77-2.06 4.03 0 4.77 2.65 4.77 6.1V21h-4v-5.1c0-1.22-.02-2.78-1.7-2.78-1.7 0-1.96 1.33-1.96 2.7V21h-4z"/>',
  github: '<path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.1-1.46-1.1-1.46-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.58 9.58 0 0 1 5 0c1.91-1.3 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2z"/>',
  youtube: '<path d="M23 7.2a3 3 0 0 0-2.1-2.1C19 4.6 12 4.6 12 4.6s-7 0-8.9.5A3 3 0 0 0 1 7.2 31 31 0 0 0 .5 12a31 31 0 0 0 .5 4.8 3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1 31 31 0 0 0 .5-4.8 31 31 0 0 0-.5-4.8zM9.75 15.02V8.98L15.5 12z"/>',
  instagram: '<path d="M12 2.2c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92C2.21 15.58 2.2 15.2 2.2 12s.01-3.58.07-4.85C2.42 3.92 3.94 2.37 7.15 2.27 8.42 2.21 8.8 2.2 12 2.2zm0 4.86a4.94 4.94 0 1 0 0 9.88 4.94 4.94 0 0 0 0-9.88zm0 8.15a3.21 3.21 0 1 1 0-6.42 3.21 3.21 0 0 1 0 6.42zm5.14-9.5a1.15 1.15 0 1 0 0 2.3 1.15 1.15 0 0 0 0-2.3z"/>',
  mail: '<path d="M3 5h18a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zm9 7.2L4 7.3V17h16V7.3zM5.2 7l6.8 4.2L18.8 7z"/>',
};
// "@MauricioIssei" — lido da própria URL do canal, sem digitar o handle.
const YT_HANDLE = decodeURIComponent(cv.Contato.youtube.match(/\/(@[^/?]+)/)?.[1] ?? 'YouTube');
const icon = (k) => `<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true" focusable="false">${ICON[k]}</svg>`;
const ext = (label) => `target="_blank" rel="noopener noreferrer" aria-label="${esc(label)} (abre em nova aba)"`;
const socials = () => {
  const C = cv.Contato;
  return `<ul class="pf-social">
  <li><a href="${esc(C.LinkedIn)}" ${ext('LinkedIn de ' + cv.Nome)}>${icon('linkedin')}</a></li>
  <li><a href="${esc(C.GitHub)}" ${ext('GitHub de ' + cv.Nome)}>${icon('github')}</a></li>
  <li><a href="${esc(C.youtube)}" ${ext('Canal no YouTube de ' + cv.Nome)}>${icon('youtube')}</a></li>
  <li><a href="${esc(C.instagram)}" ${ext('Instagram de ' + cv.Nome)}>${icon('instagram')}</a></li>
  <li><a href="mailto:${esc(C.Email)}" aria-label="Enviar e-mail para ${esc(C.Email)}">${icon('mail')}</a></li>
</ul>`;
};
const pills = (arr, tag = 'ul') => tag === 'ul'
  ? `<ul class="pf-pills">${arr.map((t) => `<li>${esc(t)}</li>`).join('')}</ul>`
  : `<span class="pf-pills">${arr.map((t) => `<span>${esc(t)}</span>`).join('')}</span>`;
const bullets = (arr, fmt = esc) => `<ul>${arr.map((t) => `<li>${fmt(t)}</li>`).join('')}</ul>`;
const lineTicks = (ids) => `<ul class="pf-ticks" aria-label="Linhas do mapa">${ids.map((id) =>
  `<li data-l="${id}"><abbr title="${esc(LINE[id].group)}">${LINE[id].code}</abbr></li>`).join('')}</ul>`;

function hero() {
  const cur = jobs[0];
  const [city, mode] = cur.Local.split(' · ');
  return `<header id="home" class="pf-hero">
  <div class="pf-hero-lines" aria-hidden="true">${LINES.map((l) => `<i data-l="${l.id}"></i>`).join('')}</div>
  <div class="pf-wrap">
    <p class="pf-eyebrow">${esc(cur.Cargo)} · ${esc(cur.Empresa)}</p>
    <h1>${esc(cv.Nome)}</h1>
    <p class="pf-hero-title">${esc(cv.Titulo)}</p>
    <p class="pf-hero-lead">${esc(cv.ResumoHero)}</p>
    <dl class="pf-facts">
      <div><dt>Localização</dt><dd>${esc(city)}</dd></div>
      ${mode ? `<div><dt>Modelo de trabalho</dt><dd>${esc(mode)}</dd></div>` : ''}
      <div><dt>Carreira desde</dt><dd>${START_YEAR} (${esc(jobs.at(-1).Empresa)})</dd></div>
      <div><dt>Atuação atual</dt><dd>${esc(cur.Empresa)}, desde ${cur.start}</dd></div>
    </dl>
    <div class="pf-cta">
      <a class="pf-btn" href="#experience">Ver experiência</a>
      <a class="pf-btn pf-btn--ghost" href="./curriculo.html">Currículo em formato clássico</a>
      <a class="pf-btn pf-btn--ghost pf-btn--yt" href="${esc(cv.Contato.youtube)}" ${ext(`Canal ${YT_HANDLE} no YouTube`)}>${icon('youtube')} ${esc(YT_HANDLE)}</a>
    </div>
    ${socials()}
  </div>
</header>`;
}

function metroMap() {
  const N = NOW_YEAR - START_YEAR + 1;
  const out = [];
  // Rótulos de ano (topo no desktop, coluna esquerda no mobile)
  for (let y = START_YEAR; y <= NOW_YEAR; y++) {
    out.push(`<span class="pf-yr" style="--c:${col(y)};--r:1" aria-hidden="true">${y}</span>`);
  }
  // Siglas das linhas
  for (const l of LINES) out.push(`<span class="pf-code" data-l="${l.id}" style="--c:1;--r:${LINE[l.id].row}" aria-hidden="true">${l.code}</span>`);
  // Traçado: contínuo da 1ª estação até hoje
  for (const l of LINES) {
    const { first } = span[l.id];
    out.push(`<span class="pf-seg" data-l="${l.id}" style="--c:${col(first)};--c2:${col(NOW_YEAR) + 1};--r:${LINE[l.id].row};--n:${NOW_YEAR - first + 1}" aria-hidden="true"></span>`);
  }
  // Estações em ordem cronológica — é a ordem de leitura do leitor de tela
  const events = [
    ...jobs.map((j) => ({ year: j.start, order: 0, html: hub(j) })),
    ...[...stops.values()].map((s) => ({ year: s.year, order: LINE[s.line].row, html: stop(s) })),
  ].sort((a, b) => a.year - b.year || a.order - b.order);
  for (const e of events) out.push(e.html);

  return `<div class="pf-metro" id="mapa">
  <ul class="pf-legend" aria-label="Linhas: grupos de competência">
${LINES.map((l) => `    <li><a class="pf-key" data-l="${l.id}" href="#linha-${l.id}"><span class="pf-key-code">${l.code}</span> ${esc(l.group)} <span class="pf-key-since">desde ${span[l.id].first}</span></a></li>`).join('\n')}
  </ul>
  <nav class="pf-grid" style="--years:${N}" aria-label="Mapa de linhas: competências e projetos por ano, de ${START_YEAR} a ${NOW_YEAR}">
${out.join('\n')}
  </nav>
  <p class="pf-map-note">Cada linha é um grupo de competência: começa na primeira estação em que ela aparece e segue até hoje. Os pontos são projetos, e as estações que cruzam várias linhas são empregadores.</p>
</div>`;

  function hub(j) {
    const rows = j.lines.map((id) => LINE[id].row);
    const r1 = Math.min(...rows), r2 = Math.max(...rows) + 1;
    const names = j.lines.map((id) => LINE[id].group).join(', ');
    return `<a class="pf-hub" href="#${j.id}" style="--c:${col(j.start)};--r:${r1};--r2:${r2}"><span class="pf-sr">${j.start}, ${esc(j.Empresa)}: ${esc(names)}</span></a>
<span class="pf-hub-name" style="--c:${col(j.start)};--r:${LINES.length + 2}" aria-hidden="true">${esc(j.Empresa)}</span>`;
  }
  function stop(s) {
    const n = s.items.length;
    return `<a class="pf-stop" data-l="${s.line}" href="${s.items[0].href}" style="--c:${col(s.year)};--r:${LINE[s.line].row}">${n > 1 ? `<span class="pf-stop-n" aria-hidden="true">${n}</span>` : ''}<span class="pf-sr">${s.year}, ${esc(LINE[s.line].group)}: ${s.items.map((i) => esc(i.name)).join('; ')}</span></a>`;
  }
}

function linesSection() {
  return `<ul class="pf-lines">
${LINES.map((l) => `  <li class="pf-line-card" id="linha-${l.id}" data-l="${l.id}">
    <h4><span class="pf-key-code">${l.code}</span> ${esc(l.group)}</h4>
    <p class="pf-since">Desde ${span[l.id].first} (primeira estação: ${esc(span[l.id].firstName)})</p>
    ${pills(cv.Habilidades[l.group])}
  </li>`).join('\n')}
</ul>`;
}

function board() {
  const rows = projects.flatMap((p) => p.Resultados.filter(hasMetric).map((r) => ({ r, p })));
  return `<ol class="pf-board">
${rows.map(({ r, p }) => `  <li>
    <span class="pf-board-val" aria-hidden="true">${[...r.match(new RegExp(METRIC.source))[0]].map((ch) => `<span class="pf-flap">${esc(ch)}</span>`).join('')}</span>
    <span class="pf-board-text">${hl(r)}</span>
    <a class="pf-board-src" href="#${p.id}">${esc(p.Nome)} · ${p.Periodo}</a>
  </li>`).join('\n')}
</ol>`;
}

function starCard(p) {
  const key = p.Resultados.find(hasMetric);
  const step = (letter, label, body) => `<section class="pf-step" data-step="${letter}"><h6>${label}</h6>${body}</section>`;
  return `<details class="pf-star" id="${p.id}" data-l="${p.lines[0]}">
  <summary>
    <h5>${esc(p.Nome)}</h5>
    ${key ? `<span class="pf-star-key">${hl(key)}</span>` : ''}
    ${pills(p.Tecnologias, 'span')}
  </summary>
  <div class="pf-star-body">
    ${step('S', 'Situação', `<p>${esc(p.Situacao)}</p>`)}
    ${step('T', 'Tarefas', bullets(p.Tarefas || []))}
    ${step('A', 'Ações', bullets(p.Acoes || []))}
    ${step('R', 'Resultados', bullets(p.Resultados || [], hl))}
  </div>
</details>`;
}

function experience() {
  return jobs.map((j) => {
    const own = projects.filter((p) => p.Empresa === j.Empresa);
    const years = [...new Set(own.map((p) => p.Periodo))].sort((a, b) => b - a);
    return `<article class="pf-exp" id="${j.id}" aria-labelledby="${j.id}-h">
  <header class="pf-exp-head">
    <p class="pf-exp-when">${esc(j.Periodo)} · ${esc(j.Local)}</p>
    <h3 id="${j.id}-h">${esc(j.Cargo)} <span class="pf-exp-org">${esc(j.Empresa)}</span></h3>
    ${lineTicks(j.lines)}
  </header>
  <p class="pf-exp-desc">${esc(j.Descricao)}</p>
  ${j.Resultados?.length ? `<h4 class="pf-h4">Resultados</h4>${bullets(j.Resultados, hl)}` : ''}
  ${j.Principais_Projetos?.length ? `<h4 class="pf-h4">Principais projetos</h4>${bullets(j.Principais_Projetos)}` : ''}
  ${pills(j.Competencias)}
  ${years.length ? `<h4 class="pf-h4">Projetos em formato STAR (${own.length})</h4>
  <div class="pf-years">
${years.map((y) => `  <section class="pf-year" id="${yearGroupId(j.Empresa, y)}" aria-label="Projetos de ${y}">
    <p class="pf-year-num" aria-hidden="true">${y}</p>
    <div class="pf-year-list">
${own.filter((p) => p.Periodo === y).map(starCard).join('\n')}
    </div>
  </section>`).join('\n')}
  </div>` : ''}
</article>`;
  }).join('\n');
}

/** Os 4 cards obrigatórios da SDD §9.4.2 (nome + ano, para desambiguar "Arquitetura de Soluções"). */
const FEATURED = [['AWS Certified Cloud Practitioner', 2022], ['SRE Essentials', 2021], ['Datadog Power User', 2025], ['Arquitetura de Soluções', 2024]];
function ticket(c, featured = false) {
  return `<li class="pf-ticket${featured ? ' pf-ticket--featured' : ''}">
    <span class="pf-ticket-date">${esc(certDate(c))}</span>
    <span class="pf-ticket-name">${esc(c.Nome)}</span>
    <span class="pf-ticket-org">${esc(c.Instituicao)}</span>
    ${c.Verificacao ? `<a class="pf-ticket-link" href="${esc(c.Verificacao)}" ${ext('Verificar credencial: ' + c.Nome)}>Verificar</a>` : ''}
  </li>`;
}
function education() {
  const featured = FEATURED.map(([n, y]) => cv.Certificados.find((c) => c.Nome === n && lastYear(certDate(c)) === y) ?? fail(`certificado em destaque ausente: ${n} ${y}`));
  const byYear = new Map();
  for (const c of cv.Certificados) {
    const y = lastYear(certDate(c));
    if (!byYear.has(y)) byYear.set(y, []);
    byYear.get(y).push(c);
  }
  const years = [...byYear.keys()].sort((a, b) => b - a);
  const alura = cv.Certificados.find((c) => c.Instituicao === 'Alura');
  return `<h3 class="pf-h3">Formação acadêmica</h3>
<ol class="pf-edu">
${cv.Formacao_Academica.map((f) => `  <li>
    <p class="pf-edu-when">${esc(f.Periodo)}</p>
    <p class="pf-edu-course">${esc(f.Curso)}</p>
    <p class="pf-edu-inst">${esc(f.Instituicao)}</p>
    ${f.Diploma_Digital_Codigo ? `<p class="pf-edu-code">Diploma digital: <code>${esc(f.Diploma_Digital_Codigo)}</code></p>` : ''}
    ${f.Verificacao ? `<a class="pf-btn pf-btn--ghost pf-btn--sm" href="${esc(f.Verificacao)}" ${ext('Verificar diploma: ' + f.Curso)}>Verificar diploma</a>` : ''}
  </li>`).join('\n')}
</ol>
<h3 class="pf-h3">Certificações em destaque</h3>
<ul class="pf-featured">
${featured.map((c) => ticket(c, true)).join('\n')}
</ul>
<h3 class="pf-h3">Todas as certificações (${cv.Certificados.length})</h3>
<div class="pf-certs">
${years.map((y) => `  <section class="pf-cert-year" aria-label="Certificações de ${y}">
    <p class="pf-cert-y" aria-hidden="true">${y}</p>
    <ul class="pf-tickets">
${byYear.get(y).map((c) => ticket(c)).join('\n')}
    </ul>
  </section>`).join('\n')}
</div>
<h3 class="pf-h3">Trilhas Alura</h3>
<div class="pf-alura">
${Object.entries(cv.Cursos_Alura).map(([k, list]) => `  <details class="pf-alura-cat">
    <summary>${esc(ALURA_LABEL[k] ?? fail(`categoria Alura sem rótulo: ${k}`))} <span class="pf-count">${list.length}</span></summary>
    ${pills(list)}
  </details>`).join('\n')}
</div>
${alura ? `<p class="pf-alura-all"><a href="${esc(alura.Verificacao)}" ${ext('Certificado geral Alura')}>Ver certificado geral Alura</a></p>` : ''}`;
}
/** As chaves de Cursos_Alura vêm sem acento (são identificadores); só a acentuação é restaurada. */
const ALURA_LABEL = {
  Desenvolvimento_de_Software_e_Programacao: 'Desenvolvimento de Software e Programação',
  Data_Science_e_Analise_de_Dados: 'Data Science e Análise de Dados',
  Gestao_e_Metodologias_Ageis: 'Gestão e Metodologias Ágeis',
  Lideranca_e_Habilidades_Interpessoais: 'Liderança e Habilidades Interpessoais',
  UX_e_Design: 'UX e Design',
  Infraestrutura_e_Cloud: 'Infraestrutura e Cloud',
};

function recommendations() {
  return `<div class="pf-recs">
${cv.Recomendacoes_Recebidas.map((r) => `  <figure class="pf-rec">
    <blockquote><p>${esc(r.Recomendacao)}</p></blockquote>
    <figcaption><cite>${esc(r.Autor)}</cite><span>${esc(r.Cargo)}</span><span>${esc(r.Data_Trabalho)}</span></figcaption>
  </figure>`).join('\n')}
</div>`;
}

const NAV = [['#about', 'Sobre'], ['#experience', 'Experiência'], ['#education', 'Formação'], ['#recommendations', 'Recomendações'], ['#contact', 'Contato']];
const dateBR = (iso) => iso.split('-').reverse().join('/');

function footer() {
  return `<footer class="pf-footer" id="contact">
  <div class="pf-wrap">
    <h2 class="pf-h2">Contato</h2>
    <p class="pf-contact"><a href="mailto:${esc(cv.Contato.Email)}">${esc(cv.Contato.Email)}</a></p>
    ${socials()}
    <nav aria-label="Navegação do rodapé"><ul class="pf-foot-nav">${NAV.map(([h, t]) => `<li><a href="${h}">${t}</a></li>`).join('')}<li><a href="./curriculo.html">Currículo em formato clássico</a></li><li><a href="./catalogo.html">Catálogo</a></li></ul></nav>
    <p class="pf-ai-note">Os dados estruturados desta página (JSON-LD, o formato que buscadores e agentes de IA leem) refletem integralmente as informações públicas do currículo e são gerados do mesmo cv.json que produz o texto visível. Última atualização: ${dateBR(MODIFIED)}. Versões para máquina: <a href="/cv.json">cv.json</a> · <a href="/cv-for-ai.md">cv-for-ai.md</a> · <a href="/llms.txt">llms.txt</a>.</p>
    <p class="pf-legal">© ${NOW_YEAR} ${esc(cv.Nome)}. Todos os direitos reservados. · <a href="./privacidade.html">Privacidade</a> · <a href="./termos.html">Termos</a> · <a href="./cookies.html">Cookies</a> · <button type="button" class="pf-linkbtn" onclick="window.cookieConsent && window.cookieConsent.open()">Preferências de cookies</button></p>
  </div>
</footer>`;
}

const section = (id, title, lead, body) => `<section id="${id}" class="pf-section" aria-labelledby="${id}-title">
  <div class="pf-wrap">
    <h2 class="pf-h2" id="${id}-title">${title}</h2>
    ${lead ? `<p class="pf-lead">${lead}</p>` : ''}
${body}
  </div>
</section>`;

const pfBlock = `<!-- PF:START — gerado por scripts/gen-portfolio.mjs a partir de public/cv.json (NÃO editar à mão) -->
<div class="pf-ambient" aria-hidden="true"><span class="pf-aurora"></span>${LINES.slice(0, 5).map((l) => `<i data-l="${l.id}"></i>`).join('')}</div>
<div class="pf-bundle" aria-hidden="true">${LINES.map((l) => `<i data-l="${l.id}"></i>`).join('')}</div>
${hero()}
<main id="conteudo">
${section('about', 'Sobre', '', `<div class="pf-about">${cv.Resumo.map((p) => `<p>${esc(p)}</p>`).join('\n')}</div>
<h3 class="pf-h3">Mapa de linhas</h3>
${metroMap()}
<h3 class="pf-h3">Competências por linha</h3>
${linesSection()}`)}
${section('results', 'Resultados quantificados', 'Resultados de projeto que citam percentual, valor ou prazo, transcritos sem edição. Cada linha leva ao projeto de origem.', board())}
${section('experience', 'Experiência', `${jobs.length} empregadores e ${projects.length} projetos descritos no formato STAR (Situação, Tarefas, Ações, Resultados). Abra um projeto para ver o detalhe.`, `<div class="pf-exps">\n${experience()}\n</div>`)}
${section('education', 'Formação e certificações', '', education())}
${section('recommendations', 'Recomendações', `${cv.Recomendacoes_Recebidas.length} recomendações recebidas no LinkedIn, em texto integral.`, recommendations())}
</main>
${footer()}
<!-- PF:END -->`;

// ---------------------------------------------------------------------------
// Blocos de /curriculo — a MESMA marcação que src/js/curriculo.js (ex-cv-renderer)
// montava no cliente, agora gravada no HTML. Não mudar classes: é a aparência.
// ---------------------------------------------------------------------------
const CV = {
  'hero-content': `
        <h1 class="text-5xl md:text-7xl font-extrabold mb-4 leading-tight">
            ${esc(cv.Nome)}
        </h1>
        <p class="text-2xl md:text-4xl font-light mb-8 text-blue-300">
            ${esc(cv.Titulo)}
        </p>
        <p class="text-lg md:text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
            ${esc(cv.ResumoHero)}
        </p>
        <div class="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <a href="#projects" class="btn-primary inline-block">Ver Projetos</a>
            <a href="${esc(cv.Contato.LinkedIn)}" target="_blank" rel="noopener noreferrer" class="btn-secondary inline-block">Conectar no LinkedIn</a>
        </div>`,

  'about-content': cv.Resumo.map((p) => `<p class="mb-4">${esc(p)}</p>`).join(''),

  'skills-container': Object.entries(cv.Habilidades).map(([category, list]) => `<div class="bg-gray-900 p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 border border-gray-700">
            <h3 class="text-xl font-semibold text-blue-300 mb-4">${esc(category.replace(/_/g, ' '))}</h3>
            <div class="flex flex-wrap gap-2">
                ${list.map((skill) => `
                    <span class="bg-gray-700 text-gray-200 text-sm px-3 py-1 rounded-full hover:bg-blue-600 hover:text-white transition-colors duration-200 cursor-default">
                        ${esc(skill)}
                    </span>
                `).join('')}
            </div>
        </div>`).join('\n'),

  'experience-container': cv.Experiencia.map((exp) => `<div class="relative mb-10 pl-12 md:pl-16 timeline-item">
            <div class="timeline-dot absolute left-[-8px] top-1 transform -translate-x-1/2"></div>
            <div class="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700 hover:border-blue-500 transition-colors duration-300">
                <h3 class="text-2xl font-bold text-white">${esc(exp.Cargo)}</h3>
                <p class="text-lg font-semibold text-blue-400 mb-1">${esc(exp.Empresa)}</p>
                <p class="text-gray-400 text-sm mb-3">${esc(exp.Periodo)} &bull; ${esc(exp.Local)}</p>
                <p class="text-gray-300 mb-4">${esc(exp.Descricao)}</p>
                ${exp.Resultados?.length ? `
                    <h4 class="text-md font-semibold text-gray-200 mt-4 mb-2">Principais Resultados:</h4>
                    <ul class="list-disc list-inside text-gray-400 text-sm pl-4 space-y-1">
                        ${exp.Resultados.map((res) => `<li>${esc(res)}</li>`).join('')}
                    </ul>
                ` : ''}
                ${exp.Principais_Projetos?.length ? `
                    <h4 class="text-md font-semibold text-gray-200 mt-4 mb-2">Principais Projetos:</h4>
                    <ul class="list-disc list-inside text-gray-400 text-sm pl-4 space-y-1">
                        ${exp.Principais_Projetos.map((proj) => `<li>${esc(proj)}</li>`).join('')}
                    </ul>
                ` : ''}
                ${exp.Competencias?.length ? `
                    <div class="flex flex-wrap gap-2 mt-4">
                        ${exp.Competencias.map((comp) => `
                            <span class="bg-blue-900/50 text-blue-300 text-xs font-medium px-2.5 py-1 rounded-full border border-blue-700">
                                ${esc(comp)}
                            </span>
                        `).join('')}
                    </div>
                ` : ''}
            </div>
        </div>`).join('\n'),

  // O bloco [data-star] é o que o modal exibe: o JS só copia, não monta texto.
  'projects-container': cv.Projetos.map((project, index) => `<div class="project-card bg-gray-700 p-6 rounded-lg shadow-md flex flex-col justify-between h-full">
            <div>
                <h3 class="text-xl font-semibold text-white mb-2">${esc(project.Nome)}</h3>
                <p class="text-blue-300 text-sm mb-2">${esc(project.Empresa)} (${esc(project.Periodo)})</p>
                <p class="text-gray-300 text-sm mb-4">${esc((project.Situacao || 'Clique para ver detalhes.').substring(0, 120))}...</p>
            </div>
            <button onclick="openModal(this, ${index})" class="btn-secondary mt-4 self-start">Saiba Mais</button>
            <div data-star hidden>
                <span data-f="name">${esc(project.Nome)}</span>
                <span data-f="period">${esc(project.Periodo)}</span>
                <span data-f="company">${esc(project.Empresa)}</span>
                ${project.Situacao && project.Situacao !== 'N/A' ? `<span data-f="situacao">${esc(project.Situacao)}</span>
                <ul data-f="tarefas">${(project.Tarefas || []).map((t) => `<li>${esc(t)}</li>`).join('')}</ul>
                <ul data-f="acoes">${(project.Acoes || []).map((a) => `<li>${esc(a)}</li>`).join('')}</ul>
                <ul data-f="resultados">${(project.Resultados || []).map((r) => `<li>${esc(r)}</li>`).join('')}</ul>` : ''}
                ${project.Tecnologias?.length ? `<div data-f="technologies">${project.Tecnologias.map((tech) => `
            <span class="bg-gray-600 text-gray-200 text-sm px-3 py-1 rounded-full">
                ${esc(tech)}
            </span>
        `).join('')}</div>` : ''}
            </div>
        </div>`).join('\n'),

  'education-container': cv.Formacao_Academica.map((edu) => `<div class="bg-gray-800 p-6 rounded-lg shadow-md border border-gray-700">
            <h4 class="text-xl font-semibold text-white">${esc(edu.Curso)}</h4>
            <p class="text-blue-300 text-md mb-2">${esc(edu.Instituicao)}</p>
            <p class="text-gray-400 text-sm">${esc(edu.Periodo || edu.Ano)}</p>
            ${edu.Diploma_Digital_Codigo ? `<p class="text-gray-500 text-xs mt-2">Código do Diploma: <span class="font-mono">${esc(edu.Diploma_Digital_Codigo)}</span></p>` : ''}
            ${edu.Verificacao ? `<a href="${esc(edu.Verificacao)}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 text-blue-400 hover:underline text-sm mt-3" aria-label="Verificar diploma de ${esc(edu.Curso)} — ${esc(edu.Instituicao)} (abre em nova aba)">Verificar diploma <i class="fa-solid fa-arrow-up-right-from-square text-xs" aria-hidden="true"></i></a>` : ''}
        </div>`).join('\n'),

  'certifications-container': cv.Certificados.map((cert) => `<div class="bg-gray-700 p-4 rounded-lg shadow-md flex flex-col justify-between h-full">
            <div>
                <h4 class="text-md font-semibold text-white">${esc(cert.Nome)}</h4>
                <p class="text-blue-300 text-sm">${esc(cert.Instituicao)}</p>
                <p class="text-gray-400 text-xs mb-2">Emitido em: ${esc(certDate(cert))}</p>
            </div>
            ${cert.Verificacao ? `<a href="${esc(cert.Verificacao)}" target="_blank" rel="noopener noreferrer" class="text-blue-400 hover:underline text-sm mt-2 self-start">Ver Credencial <i class="fa-solid fa-arrow-up-right-from-square text-xs"></i></a>` : ''}
        </div>`).join('\n'),

  'courses-container': Object.entries(cv.Cursos_Alura).map(([category, list]) => `<div class="bg-gray-900 p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 border border-gray-700">
            <h3 class="text-xl font-semibold text-blue-300 mb-4">${esc(category.replace(/_/g, ' '))}</h3>
            <ul class="space-y-2">
                ${list.map((course) => `
                    <li class="text-gray-300 text-sm flex items-start">
                        <i class="fa-solid fa-check-circle text-green-500 mr-2 mt-1"></i>
                        <span>${esc(course)}</span>
                    </li>
                `).join('')}
            </ul>
        </div>`).join('\n'),

  'recommendations-container': cv.Recomendacoes_Recebidas.map((rec) => `<div class="bg-gray-700 p-6 rounded-lg shadow-md">
            <p class="text-gray-300 italic mb-4">"${esc(rec.Recomendacao)}"</p>
            <p class="text-white font-semibold">${esc(rec.Autor)}</p>
            <p class="text-blue-300 text-sm">${esc(rec.Cargo)}</p>
            <p class="text-gray-400 text-xs mt-1">${esc(rec.Data_Trabalho)}</p>
        </div>`).join('\n'),

  'contact-container': `
        <p class="text-lg text-gray-300 mb-8">Estou sempre aberto a novas oportunidades e colaborações. Sinta-se à vontade para entrar em contato!</p>
        <div class="flex flex-col items-center space-y-6">
            <a href="mailto:${esc(cv.Contato.Email)}" class="btn-primary inline-flex items-center space-x-3 text-lg">
                <i class="fa-solid fa-envelope"></i>
                <span>${esc(cv.Contato.Email)}</span>
            </a>
            <a href="${esc(cv.Contato.LinkedIn)}" target="_blank" rel="noopener noreferrer" class="btn-secondary inline-flex items-center space-x-3 text-lg">
                <i class="fa-brands fa-linkedin"></i>
                <span>LinkedIn/${esc(cv.Contato.LinkedInUser)}</span>
            </a>
            <a href="${esc(cv.Contato.youtube)}" target="_blank" rel="noopener noreferrer" class="btn-secondary inline-flex items-center space-x-3 text-lg">
                <i class="fa-brands fa-youtube"></i>
                <span>Youtube/@MauricioIssei</span>
            </a>
        </div>`,

  year: String(NOW_YEAR),
};

// Gêmeo .md de /curriculo (a edge function serve <caminho>.md a agentes).
const md = [
  `# ${cv.Nome}`, '', `**${cv.Titulo}**`, '',
  `> Currículo completo, gerado de public/cv.json. HTML: https://mauricio.issei.com.br/curriculo`, '',
  '## Resumo', '', ...cv.Resumo.flatMap((p) => [p, '']),
  '## Habilidades', '', ...Object.entries(cv.Habilidades).map(([k, v]) => `- **${k}:** ${v.join(', ')}`), '',
  '## Experiência', '',
  ...cv.Experiencia.flatMap((e) => [`### ${e.Cargo} — ${e.Empresa}`, '', `${e.Periodo} · ${e.Local}`, '', e.Descricao, '',
    ...(e.Resultados || []).map((r) => `- ${r}`), ...(e.Principais_Projetos || []).map((r) => `- ${r}`),
    `- Competências: ${e.Competencias.join(', ')}`, '']),
  '## Projetos (STAR)', '',
  ...cv.Projetos.flatMap((p) => [`### ${p.Nome} (${p.Empresa}, ${p.Periodo})`, '', `**Situação:** ${p.Situacao}`, '',
    '**Tarefas:**', ...(p.Tarefas || []).map((t) => `- ${t}`), '', '**Ações:**', ...(p.Acoes || []).map((t) => `- ${t}`), '',
    '**Resultados:**', ...(p.Resultados || []).map((t) => `- ${t}`), '', `**Tecnologias:** ${p.Tecnologias.join(', ')}`, '']),
  '## Formação acadêmica', '',
  ...cv.Formacao_Academica.map((f) => `- ${f.Curso} — ${f.Instituicao} (${f.Periodo})${f.Verificacao ? ` · [verificar diploma](${f.Verificacao})` : ''}`), '',
  '## Certificações', '',
  ...cv.Certificados.map((c) => `- ${c.Nome} — ${c.Instituicao} (${certDate(c)})${c.Verificacao ? ` · [verificar](${c.Verificacao})` : ''}`), '',
  '## Cursos Alura', '', ...Object.entries(cv.Cursos_Alura).map(([k, v]) => `- **${ALURA_LABEL[k]}:** ${v.join(', ')}`), '',
  '## Recomendações', '',
  ...cv.Recomendacoes_Recebidas.flatMap((r) => [`> ${r.Recomendacao}`, '', `— **${r.Autor}**, ${r.Cargo} (${r.Data_Trabalho})`, '']),
  '## Contato', '', `- E-mail: ${cv.Contato.Email}`, `- LinkedIn: ${cv.Contato.LinkedIn}`, `- GitHub: ${cv.Contato.GitHub}`, `- YouTube: ${cv.Contato.youtube}`, '',
].join('\n');

// ---------------------------------------------------------------------------
// Escrita / --check (padrão de gen-hub-data.mjs)
// ---------------------------------------------------------------------------
const reBlock = (start, end) => new RegExp(`${start.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}[\\s\\S]*?${end.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`);
function whole(file, next) {
  const path = join(ROOT, file);
  return { path, file, prev: existsSync(path) ? readFileSync(path, 'utf8') : '', next };
}
function fill(file, blocks) {
  const path = join(ROOT, file);
  const prev = readFileSync(path, 'utf8');
  let next = prev;
  for (const [start, end, body] of blocks) {
    const re = reBlock(start, end);
    if (!re.test(next)) fail(`marcadores ${start} … ${end} ausentes em ${file}`);
    next = next.replace(re, () => body);
  }
  return { path, file, prev, next };
}

const targets = [
  fill('src/index.html', [['<!-- PF:START', '<!-- PF:END -->', pfBlock]]),
  fill('src/curriculo.html', Object.entries(CV).map(([id, body]) => {
    const s = `<!-- CV:${id}:START -->`, e = `<!-- CV:${id}:END -->`;
    return [s, e, `${s}${body}${e}`];
  })),
  whole('public/curriculo.md', md),
];

const eol = (s) => s.replace(/\r\n/g, '\n');
const stale = targets.filter((t) => eol(t.prev) !== eol(t.next));
if (!stale.length) {
  console.log(`✓ [portfolio] sincronizado (${projects.length} projetos, ${cv.Certificados.length} certificações)`);
  process.exit(0);
}
if (process.argv.includes('--check')) fail(`dessincronizado: ${stale.map((t) => t.file).join(', ')}. Rode: node scripts/gen-portfolio.mjs`);
for (const t of stale) writeFileSync(t.path, t.next);
console.log(`✓ [portfolio] gravado: ${stale.map((t) => t.file).join(', ')}`);
