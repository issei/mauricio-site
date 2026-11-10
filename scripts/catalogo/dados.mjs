/*
 * Leitura e validação de specs/ecosystem.nav.yaml (2.0.0), a fonte única da
 * lista de conteúdos do site. Spec: docs/specs/arquitetura-informacao/SDD-F1-F1b.md
 * (Parte 1, §3).
 *
 * Quem usa: scripts/gen-catalogo.mjs (catálogo e eco-nav.data.js),
 * scripts/seo/pages.mjs (seções do catalogo.md) e os testes do esquema.
 */
import { readFileSync } from 'node:fs';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import YAML from 'yaml';
import { KINDS } from '../editorial/editorial.data.mjs';

export const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..');
export const YAML_PATH = join(ROOT, 'specs/ecosystem.nav.yaml');
export const SITE = 'https://mauricio.issei.com.br';

/** Natureza (D5): chave do YAML → rótulo por extenso. */
export const NATUREZAS = {
  experiencia: 'Experiência',
  estudo: 'Estudo',
  proposta: 'Proposta',
  experimento: 'Experimento',
  referencia: 'Referência',
};

export { KINDS };

/** Lê o YAML e o vocabulário de temas. Síncrono: pages.mjs é um módulo de dados. */
export function loadEcossistema() {
  const eco = YAML.parse(readFileSync(YAML_PATH, 'utf8'));
  const temas = YAML.parse(readFileSync(join(ROOT, 'content/temas.yml'), 'utf8'));
  return { eco, temas };
}

/** Título do cartão: cartao_titulo, senão o rótulo curto, senão o título. */
export const cardTitle = (n) => n.cartao_titulo || n.label || n.title;

/** Etiqueta do cartão: "formato · assunto". */
export const cardTag = (n) => (n.assunto ? `${n.kind} · ${n.assunto}` : n.kind);

/** href relativo à base (D-05), salvo os absolutos previstos. */
export const hrefOf = (eco, file) => (file.startsWith('/') ? file : `${eco.meta.canonical_base}${file}`);

/** URL pública sem extensão (padrão do site para o .md e o JSON-LD). */
export const publicUrl = (file) => {
  const slug = file.replace(/^\//, '').replace(/\.html$/, '');
  return slug === 'index' ? `${SITE}/` : `${SITE}/${slug}`;
};

/**
 * Confere as invariantes que dependem só do YAML e dos temas (INV-1, 2, 4, 5, 6).
 * INV-3 e INV-7 dependem do disco e do SEO; ficam no teste do esquema.
 * Devolve a lista de erros (vazia = válido).
 */
export function validar({ eco, temas }) {
  const erros = [];
  const nodes = eco.nodes || {};
  const slugs = new Set(Object.keys(nodes));

  // INV-2
  const ids = (eco.pillars || []).map((p) => p.id);
  if (JSON.stringify(ids) !== JSON.stringify(['p1', 'p2', 'p3', 'p4'])) erros.push(`INV-2: pilares ${ids.join(',')}`);
  (eco.pillars || []).forEach((p, i) => { if (p.order !== i + 1) erros.push(`INV-2: ${p.id} com order ${p.order}`); });

  // INV-1 e coerência pilar ↔ nó
  const emPilar = new Map();
  for (const p of eco.pillars || []) {
    for (const s of p.nodes) {
      if (!slugs.has(s)) erros.push(`INV-1: ${s} (em ${p.id}) não existe em nodes`);
      if (emPilar.has(s)) erros.push(`INV-1: ${s} em dois pilares`);
      emPilar.set(s, p.id);
      if (nodes[s] && nodes[s].pillar !== p.id) erros.push(`${s}: pillar ${nodes[s].pillar} mas listado em ${p.id}`);
    }
  }
  const trajetoria = eco.trajetoria || [];
  for (const s of trajetoria) {
    if (!slugs.has(s)) erros.push(`trajetoria: ${s} não existe em nodes`);
    if (nodes[s]?.pillar) erros.push(`trajetoria: ${s} não pode ter pilar`);
  }
  for (const s of slugs) {
    if (!emPilar.has(s) && !trajetoria.includes(s)) erros.push(`${s}: nó fora de pilar e de trajetoria`);
  }

  // INV-4
  for (const c of eco.crosslinks || []) {
    if (!slugs.has(c.from)) erros.push(`INV-4: crosslink from ${c.from}`);
    if (!slugs.has(c.to)) erros.push(`INV-4: crosslink to ${c.to}`);
  }

  // INV-5
  const absolutosPrevistos = new Set(['/videos.html']);
  const files = [...Object.values(nodes).map((n) => n.file), ...(eco.entradas || []).map((e) => e.file)];
  for (const f of files) {
    if (f.startsWith('/') && !absolutosPrevistos.has(f)) erros.push(`INV-5: href absoluto não previsto ${f}`);
    if (/^https?:/.test(f)) erros.push(`INV-5: URL absoluta ${f}`);
  }

  // INV-6 e campos obrigatórios (RF-F1-05)
  for (const [s, n] of Object.entries(nodes)) {
    for (const campo of ['file', 'title', 'blurb', 'kind', 'natureza', 'temas']) {
      if (n[campo] === undefined) erros.push(`${s}: falta ${campo}`);
    }
    if (n.catalogo !== false && !n.descricao) erros.push(`${s}: falta descricao`);
    if (n.blurb && n.blurb.length > 60) erros.push(`${s}: blurb com ${n.blurb.length} caracteres (máx. 60)`);
    if (n.kind && !KINDS.includes(n.kind)) erros.push(`INV-6: ${s}: formato fora de KINDS: ${n.kind}`);
    if (n.natureza && !NATUREZAS[n.natureza]) erros.push(`INV-6: ${s}: natureza inválida: ${n.natureza}`);
    const t = n.temas || [];
    const [min, max] = trajetoria.includes(s) ? [0, 3] : [1, 3];
    if (t.length < min || t.length > max) erros.push(`INV-6: ${s}: ${t.length} temas (esperado ${min} a ${max})`);
    for (const k of t) if (!temas[k]) erros.push(`INV-6: ${s}: tema desconhecido ${k}`);
    if (n.par && !slugs.has(n.par)) erros.push(`${s}: par ${n.par} não existe`);
    if (n.selo && !['sobe', 'desce'].includes(n.selo.direcao)) erros.push(`${s}: selo.direcao inválida`);
  }

  // Entradas (RF-F1-03)
  const ent = (eco.entradas || []).map((e) => e.id);
  if (JSON.stringify(ent) !== JSON.stringify(['index', 'curriculo', 'catalogo', 'videos'])) erros.push(`entradas: ${ent.join(',')}`);
  for (const e of eco.entradas || []) {
    for (const campo of ['file', 'label', 'label_en']) if (!e[campo]) erros.push(`entrada ${e.id}: falta ${campo}`);
  }
  return erros;
}

/** Seções do public/catalogo.md (mdSections de pages.mjs), na ordem do catálogo. */
export function catalogoMdSections({ eco } = loadEcossistema()) {
  const item = (titulo, file, descricao) => `- [${titulo}](${publicUrl(file)}) — ${descricao}`;
  const secs = [{
    h: 'Como o catálogo está organizado',
    body: 'Uma jornada em quatro pilares — Mentalidade → Método → Aplicação → Valor. Cada cartão diz o ' +
      'formato, a natureza (Experiência, Estudo, Proposta, Experimento ou Referência) e os temas do ' +
      'conteúdo. No fim, a trajetória do autor e os vídeos do canal.',
  }];
  for (const p of eco.pillars) {
    const linhas = [p.resumo.replace(' — ', ': '), ''];
    for (const s of p.nodes) {
      const n = eco.nodes[s];
      if (n.catalogo === false) continue;
      // O par (ex.: a revisão completa de um resumo) não tem cartão; o .md liga os dois.
      const pares = Object.values(eco.nodes).filter((x) => x.par === s)
        .map((x) => ` Versão completa: [${x.title}](${publicUrl(x.file)}).`).join('');
      linhas.push(item(cardTitle(n), n.file, n.descricao) + pares);
    }
    secs.push({ h: `${String(p.order).padStart(2, '0')} · ${p.subtitle} — ${p.label}`, body: linhas.join('\n') });
  }
  const ent = Object.fromEntries(eco.entradas.map((e) => [e.id, e]));
  const linhas = ['A trajetória profissional, as narrativas pessoais e os vídeos do canal.', ''];
  linhas.push(item(ent.curriculo.titulo, ent.curriculo.file, ent.curriculo.descricao));
  for (const s of eco.trajetoria) linhas.push(item(cardTitle(eco.nodes[s]), eco.nodes[s].file, eco.nodes[s].descricao));
  linhas.push(item(ent.videos.titulo, ent.videos.file, ent.videos.descricao));
  secs.push({ h: 'Trajetória e vídeos', body: linhas.join('\n') });
  return secs;
}
