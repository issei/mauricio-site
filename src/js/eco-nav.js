/**
 * <eco-nav> — Navegação global do ecossistema (camada de orquestração)
 * ---------------------------------------------------------------------------
 * Fase 3 IMPLEMENT da SPEC_ECOSYSTEM.md. Componente autônomo, vanilla JS, sem
 * dependências externas (D-06). Adiciona TOPOLOGIA sem reescrever conteúdo:
 * nunca toca no <body> autoral — injeta a si mesmo e renderiza em Shadow DOM
 * isolado (D-01, D-02, CA-02).
 *
 * Progressive Disclosure (SPEC §3):
 *   L0 — botão fixo "Ecossistema" + pílula do pilar atual (sempre visível)
 *   L1 — os 5 pilares (subtitle + summary) ao abrir o painel
 *   L2 — nós do pilar expandido (title + blurb) + crosslinks relevantes
 * Acordeão: só um pilar aberto por vez; o pilar da página atual vem pré-aberto.
 *
 * DADOS: derivados de specs/ecosystem.nav.yaml (SSOT). Esta é uma cópia
 * compilada (< 8 KB). Ao alterar o grafo, atualize o YAML E aqui, com bump de
 * `meta.version` (governança SPEC §4.4 — ver ECOSYSTEM.md).
 *
 * Acessibilidade (D-07): navegável por teclado, ARIA de disclosure, foco
 * gerenciado, Esc/clique-fora fecham, prefers-reduced-motion respeitado.
 * Degradação (D-08): sem JS, nada é injetado e a página fica intacta.
 */

const DATA = {
  version: '1.1.0',
  base: './', // D-05: URL relativa atual
  pillars: [
    { id: 'p1', n: '01', label: 'Fundação', subtitle: 'Mentalidade', summary: 'Princípios de pensamento sistêmico e gestão do conhecimento.', nodes: ['know', 'devin'] },
    { id: 'p2', n: '02', label: 'Engenharia de Confiança', subtitle: 'O Método', summary: 'Da intenção à execução agêntica confiável.', nodes: ['engenharia-confianca', 'engenharia-agentes-ia', 'knowledge-os-presentation'] },
    { id: 'p3', n: '03', label: 'Ecossistema Salesforce', subtitle: 'A Aplicação', summary: 'Métodos agênticos aplicados à plataforma Salesforce.', nodes: ['devops-salesforce', 'proposta-engenharia-reversa', 'salesforce-agentic-quickstart', 'salesforce-agentic-dev'] },
    { id: 'p4', n: '04', label: 'Sustentação & Resiliência', subtitle: 'O Valor', summary: 'Operação de serviço, SRE e resiliência em produção.', nodes: ['sustentacao', 'service-operations-2-0', 'proposta', 'proposta-observabilidade-mobile'] },
    { id: 'p5', n: '05', label: 'Soluções & Portfólio', subtitle: 'Resultados', summary: 'Soluções entregues e a jornada pessoal.', nodes: ['socialselling', 'index', 'life', 'life3d', 'terminal-evolutivo'] },
  ],
  nodes: {
    know: { file: 'know.html', title: 'Navegando na Complexidade', blurb: 'O fim das melhores práticas.' },
    devin: { file: 'devin.html', title: 'Vibe Coding com Devin', blurb: 'Engenharia agêntica na prática.' },
    'engenharia-confianca': { file: 'engenharia-confianca.html', title: 'A Engenharia da Confiança', blurb: 'Da intenção à execução agêntica.' },
    'engenharia-agentes-ia': { file: 'engenharia-agentes-ia.html', title: 'Engenharia de Agentes de IA', blurb: 'Os princípios da IA confiável.' },
    'knowledge-os-presentation': { file: 'knowledge-os-presentation.html', title: 'Knowledge OS Enterprise', blurb: 'Rastreabilidade e segurança para a IA.' },
    'devops-salesforce': { file: 'devops-salesforce.html', title: 'DevOps Salesforce', blurb: 'Entrega contínua agêntica no Salesforce.' },
    'proposta-engenharia-reversa': { file: 'proposta-engenharia-reversa.html', title: 'Engenharia Reversa Assistida por IA', blurb: 'Salesforce legado transformado por IA.' },
    'salesforce-agentic-quickstart': { file: 'salesforce-agentic-quickstart.html', title: 'Quick Start: Salesforce + Devin + Flosum', blurb: 'Primeiro deploy governado.' },
    'salesforce-agentic-dev': { file: 'salesforce-agentic-dev.html', title: 'Agentic DevOps for Salesforce', blurb: 'Portal de treinamento Spec-Driven.' },
    sustentacao: { file: 'sustentacao.html', title: 'Do Caos à Resiliência', blurb: 'Gestão de incidentes e SRE.' },
    'service-operations-2-0': { file: 'service-operations-2-0.html', title: 'Service Operations 2.0', blurb: 'Protocolo Manchester aplicado à TI.' },
    proposta: { file: 'proposta.html', title: 'Inteligência de Vendas: Salesforce + AWS', blurb: 'Dados de vendas em tempo real.' },
    'proposta-observabilidade-mobile': { file: 'proposta-observabilidade-mobile.html', title: 'Observabilidade SRE para Mobilidade', blurb: 'Correlação device-rede-app.' },
    socialselling: { file: 'socialselling.html', title: 'SocialSelling', blurb: 'Boas práticas de vendas sociais com IA.' },
    index: { file: 'index.html', title: 'Maurício Yokoyama Issei', blurb: 'Tech Lead / Análise de Sistemas.' },
    life: { file: 'life.html', title: 'A Jornada em Pixel Art', blurb: 'Narrativa pessoal desde 1982.' },
    life3d: { file: 'life3d.html', title: 'Vida em 3D', blurb: 'Memórias numa viagem imersiva.' },
    'terminal-evolutivo': { file: 'terminal-evolutivo.html', title: 'Terminal Evolutivo', blurb: 'A jornada 1982–2026 que envelhece ao rolar.' },
  },
  crosslinks: [
    { from: 'knowledge-os-presentation', to: 'proposta-engenharia-reversa', rationale: 'Knowledge OS fundamenta a Engenharia Reversa assistida por IA.' },
    { from: 'devin', to: 'salesforce-agentic-quickstart', rationale: 'Devin como executor concreto no stack Salesforce.' },
    { from: 'engenharia-agentes-ia', to: 'socialselling', rationale: 'Agentes de IA aplicados a Social Selling.' },
  ],
};

// ---- utilidades ------------------------------------------------------------
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

function currentSlug() {
  let p = (location.pathname.split('/').pop() || 'index').replace(/\.html$/i, '');
  return p === '' ? 'index' : p;
}

function pillarOf(slug) {
  return DATA.pillars.find((p) => p.nodes.includes(slug)) || null;
}

const STYLE = `
  :host {
    position: fixed; right: 1rem; bottom: 1rem; z-index: 2147483000;
    /* tokens herdados do host com fallback (SPEC §4.3) */
    --a: var(--eco-accent, #007bff);
    --a2: var(--eco-accent-2, #8a2be2);
    --soft: #7ab0ff;
    --panel: #0e131b; --panel2: #141b26;
    --line: rgba(255,255,255,.09);
    --tx: #e6edf6; --tx2: #aab3c0;
    font-family: Inter, system-ui, sans-serif;
  }
  * { box-sizing: border-box; }
  button { font: inherit; cursor: pointer; }

  /* L0 — launcher */
  .fab {
    display: inline-flex; align-items: center; gap: .55rem;
    padding: .6rem .9rem; border-radius: 999px;
    background: var(--panel); color: #fff;
    border: 1px solid transparent;
    background-image: linear-gradient(var(--panel), var(--panel)), linear-gradient(135deg, var(--a), var(--a2));
    background-origin: border-box; background-clip: padding-box, border-box;
    box-shadow: 0 8px 28px rgba(0,0,0,.45), 0 0 16px rgba(0,123,255,.25);
  }
  .fab__icon { width: 18px; height: 18px; display: grid; place-items: center; color: var(--soft); }
  .fab__txt { font-size: .9rem; font-weight: 700; letter-spacing: .01em; }
  .fab__pill {
    font-size: .62rem; font-weight: 700; text-transform: uppercase; letter-spacing: .12em;
    color: var(--soft); padding-left: .55rem; margin-left: .15rem; border-left: 1px solid var(--line);
  }
  .fab:hover { box-shadow: 0 10px 32px rgba(0,0,0,.5), 0 0 22px rgba(138,43,226,.35); }
  .fab:focus-visible, .acc__head:focus-visible, .node:focus-visible, .close:focus-visible, .foot a:focus-visible, .xl a:focus-visible {
    outline: 2px solid var(--soft); outline-offset: 2px;
  }

  /* painel */
  .panel[hidden] { display: none; }
  .panel {
    position: absolute; right: 0; bottom: calc(100% + .6rem);
    width: min(360px, calc(100vw - 2rem));
    max-height: min(78vh, 640px); overflow: auto;
    background: var(--panel); color: var(--tx);
    border: 1px solid var(--line); border-radius: 16px;
    box-shadow: 0 20px 60px rgba(0,0,0,.55);
    padding: .35rem;
  }
  .head { display: flex; align-items: center; justify-content: space-between; padding: .7rem .8rem .55rem; }
  .head__eyebrow { font-size: .6rem; font-weight: 700; text-transform: uppercase; letter-spacing: .18em; color: var(--soft); margin: 0; }
  .head__title { font-size: .98rem; font-weight: 700; color: #fff; margin: .15rem 0 0; }
  .close { background: transparent; border: 0; color: var(--tx2); width: 30px; height: 30px; border-radius: 8px; font-size: 1.2rem; line-height: 1; }
  .close:hover { color: #fff; background: rgba(255,255,255,.06); }

  .acc { list-style: none; margin: 0; padding: 0; }
  .acc__item { border-top: 1px solid var(--line); }
  .acc__head {
    width: 100%; display: flex; align-items: center; gap: .7rem; text-align: left;
    background: transparent; border: 0; color: var(--tx); padding: .7rem .8rem;
  }
  .acc__head[aria-current="page"] { background: rgba(0,123,255,.07); }
  .acc__num { font-size: 1rem; font-weight: 800; color: var(--soft); min-width: 1.6rem; }
  .acc__labels { display: flex; flex-direction: column; flex: 1; }
  .acc__eyebrow { font-size: .58rem; font-weight: 700; text-transform: uppercase; letter-spacing: .14em; color: var(--soft); }
  .acc__label { font-size: .92rem; font-weight: 700; color: #fff; line-height: 1.2; }
  .acc__chev { color: var(--tx2); transition: transform .2s ease; }
  .acc__head[aria-expanded="true"] .acc__chev { transform: rotate(90deg); }

  .acc__body[hidden] { display: none; }
  .acc__body { padding: 0 .8rem .8rem 3.1rem; }
  .acc__summary { font-size: .78rem; color: var(--tx2); margin: 0 0 .6rem; }

  .nodes { list-style: none; margin: 0; padding: 0; display: grid; gap: .3rem; }
  .node { display: block; text-decoration: none; padding: .5rem .6rem; border-radius: 10px; border: 1px solid transparent; }
  .node:hover { background: rgba(255,255,255,.04); border-color: var(--line); }
  .node[aria-current="page"] { background: rgba(0,123,255,.1); border-color: rgba(0,123,255,.35); }
  .node__title { display: block; font-size: .84rem; font-weight: 600; color: #f3f6fb; }
  .node__blurb { display: block; font-size: .72rem; color: var(--tx2); margin-top: .1rem; }

  .xl { list-style: none; margin: .7rem 0 0; padding: .6rem 0 0; border-top: 1px dashed var(--line); display: grid; gap: .35rem; }
  .xl__cap { font-size: .58rem; font-weight: 700; text-transform: uppercase; letter-spacing: .14em; color: var(--tx2); margin: 0 0 .1rem; }
  .xl a { font-size: .74rem; color: var(--soft); text-decoration: none; display: inline-flex; gap: .35rem; }
  .xl a:hover { text-decoration: underline; }

  .foot { padding: .55rem .8rem .35rem; border-top: 1px solid var(--line); margin-top: .25rem; }
  .foot a { font-size: .78rem; font-weight: 600; color: var(--soft); text-decoration: none; }
  .foot a:hover { text-decoration: underline; }

  @media (prefers-reduced-motion: reduce) {
    .acc__chev { transition: none; }
  }
`;

class EcoNav extends HTMLElement {
  connectedCallback() {
    if (this._mounted) return;
    this._mounted = true;
    this._open = false;
    this.slug = currentSlug();
    this.curPillar = pillarOf(this.slug);
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `<style>${STYLE}</style>${this.markup()}`;
    this.wire();
  }

  markup() {
    const pillLabel = this.curPillar ? esc(this.curPillar.subtitle) : 'Mapa';
    const acc = DATA.pillars.map((p) => this.pillarMarkup(p)).join('');
    return `
      <button class="fab" type="button" aria-expanded="false" aria-controls="eco-panel"
              aria-label="Abrir o mapa do ecossistema do site">
        <span class="fab__icon" aria-hidden="true">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
               stroke-linecap="round" stroke-linejoin="round">
            <circle cx="5" cy="6" r="2"></circle><circle cx="5" cy="18" r="2"></circle><circle cx="19" cy="12" r="2"></circle>
            <path d="M7 6h6a3 3 0 0 1 3 3v0M7 18h6a3 3 0 0 0 3-3v0"></path>
          </svg>
        </span>
        <span class="fab__txt">Ecossistema</span>
        <span class="fab__pill">${pillLabel}</span>
      </button>
      <div class="panel" id="eco-panel" hidden>
        <nav aria-label="Mapa do ecossistema do site">
          <div class="head">
            <div>
              <p class="head__eyebrow">Jornada</p>
              <p class="head__title">Mentalidade &rarr; Resultados</p>
            </div>
            <button class="close" type="button" aria-label="Fechar o mapa do ecossistema">&times;</button>
          </div>
          <ul class="acc">${acc}</ul>
          <div class="foot"><a href="${DATA.base}catalogo.html">Ver catálogo completo &rarr;</a></div>
        </nav>
      </div>`;
  }

  pillarMarkup(p) {
    const isCur = this.curPillar && this.curPillar.id === p.id;
    const secId = `eco-sec-${p.id}`;
    const nodes = p.nodes
      .map((slug) => {
        const n = DATA.nodes[slug];
        if (!n) return '';
        const cur = slug === this.slug ? ' aria-current="page"' : '';
        return `<li><a class="node" href="${DATA.base}${esc(n.file)}"${cur}>
          <span class="node__title">${esc(n.title)}</span>
          <span class="node__blurb">${esc(n.blurb)}</span></a></li>`;
      })
      .join('');

    const links = DATA.crosslinks.filter((c) => p.nodes.includes(c.from));
    const xl = links.length
      ? `<ul class="xl"><li class="xl__cap">Conexões</li>${links
          .map((c) => {
            const to = DATA.nodes[c.to];
            const from = DATA.nodes[c.from];
            if (!to || !from) return '';
            return `<li><a href="${DATA.base}${esc(to.file)}" title="${esc(c.rationale)}">
              &#8627; ${esc(from.title)} &rarr; ${esc(to.title)}</a></li>`;
          })
          .join('')}</ul>`
      : '';

    return `<li class="acc__item">
      <button class="acc__head" type="button" aria-expanded="${isCur ? 'true' : 'false'}"
              aria-controls="${secId}"${isCur ? ' aria-current="page"' : ''}>
        <span class="acc__num" aria-hidden="true">${p.n}</span>
        <span class="acc__labels">
          <span class="acc__eyebrow">${esc(p.subtitle)}</span>
          <span class="acc__label">${esc(p.label)}</span>
        </span>
        <span class="acc__chev" aria-hidden="true">&#9656;</span>
      </button>
      <div class="acc__body" id="${secId}" role="region" aria-label="${esc(p.label)}"${isCur ? '' : ' hidden'}>
        <p class="acc__summary">${esc(p.summary)}</p>
        <ul class="nodes">${nodes}</ul>
        ${xl}
      </div>
    </li>`;
  }

  wire() {
    const root = this.shadowRoot;
    this.fab = root.querySelector('.fab');
    this.panel = root.querySelector('.panel');
    this.fab.addEventListener('click', () => this.toggle());
    root.querySelector('.close').addEventListener('click', () => this.setOpen(false));

    // acordeão: só um aberto por vez
    root.querySelectorAll('.acc__head').forEach((head) => {
      head.addEventListener('click', () => {
        const expanded = head.getAttribute('aria-expanded') === 'true';
        root.querySelectorAll('.acc__head').forEach((h) => {
          h.setAttribute('aria-expanded', 'false');
          root.getElementById(h.getAttribute('aria-controls')).hidden = true;
        });
        if (!expanded) {
          head.setAttribute('aria-expanded', 'true');
          root.getElementById(head.getAttribute('aria-controls')).hidden = false;
        }
      });
    });

    // Esc fecha; clique-fora fecha. O listener no document garante o Esc mesmo
    // quando o foco não está dentro do host (WebKit não foca botão ao clicar).
    this._onDocKey = (e) => { if (e.key === 'Escape' && this._open) { this.setOpen(false); this.fab.focus(); } };
    this.addEventListener('keydown', this._onDocKey);
    document.addEventListener('keydown', this._onDocKey);
    this._onDocClick = (e) => { if (this._open && !e.composedPath().includes(this)) this.setOpen(false); };
    document.addEventListener('click', this._onDocClick);
  }

  toggle() { this.setOpen(!this._open); }

  setOpen(open) {
    this._open = open;
    this.panel.hidden = !open;
    this.fab.setAttribute('aria-expanded', String(open));
    if (open) {
      const head = this.shadowRoot.querySelector('.acc__head[aria-current="page"]') || this.shadowRoot.querySelector('.acc__head');
      if (head) head.focus();
    }
  }

  disconnectedCallback() {
    if (this._onDocClick) document.removeEventListener('click', this._onDocClick);
    if (this._onDocKey) document.removeEventListener('keydown', this._onDocKey);
  }
}

if (!customElements.get('eco-nav')) customElements.define('eco-nav', EcoNav);

// Auto-injeção (D-03): uma linha de <script> basta; o elemento se monta sozinho.
function mount() {
  if (document.querySelector('eco-nav')) return;
  document.body.appendChild(document.createElement('eco-nav'));
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount);
else mount();
