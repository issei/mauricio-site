#!/usr/bin/env node
/*
 * Documentos para agentes gerados — escreve, a partir das fontes únicas do site:
 *   1. public/llms.txt       — índice no padrão llms.txt;
 *   2. public/llms-full.txt  — versão concatenada para contexto longo.
 *
 * Fontes (nada de número ou lista escrito à mão aqui):
 *   - public/cv.json                    → contagem de projetos STAR, anos e certificações;
 *   - specs/ecosystem.nav.yaml + temas  → conteúdos publicados, por tema (o mesmo do catálogo);
 *   - public/cv-for-ai.md, public/career-highlights-star.md e public/catalogo.md
 *                                       → corpo do llms-full.txt, na íntegra.
 *
 * Por quê: o llms.txt escrito à mão dizia "18 projetos" quando o cv.json e a página
 * Carreira têm 19, e deixava 9 conteúdos do catálogo de fora; o llms-full.txt não tinha
 * a organização editorial. Gerar das mesmas fontes impede a divergência de voltar.
 *
 * Uso: node scripts/gen-llms.mjs [--check]
 *   --check  não grava; sai ≠ 0 se algum arquivo divergir da fonte.
 */
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';

import { loadEcossistema, temasDoSite, cardTitle, NATUREZAS, ROOT } from './catalogo/dados.mjs';

const PUB = join(ROOT, 'public');
const ler = (f) => readFileSync(join(PUB, f), 'utf8');

/* ── Números do currículo ──────────────────────────────────────────────────── */

/** Ano (4 dígitos) de um texto como "Outubro de 2025" ou "26 de setembro de 2024". */
const ano = (s) => Number((String(s).match(/(19|20)\d{2}/) || [])[0]);

/**
 * Certificações em IA e sistemas agênticos: emitidas a partir de 2025 e com IA, GenAI,
 * MCP, agente ou Copilot no nome. A regra é explícita para o número ter escopo verificável.
 */
const RE_IA = /\b(AI|IA|GenAI|MCP|Copilot|Agent|Agents|Agentic)\b/;
export function certificacoesIA(cv) {
  return (cv.Certificados || []).filter((c) => ano(c.Data_Emissao) >= 2025 && RE_IA.test(c.Nome));
}

export function numeros(cv) {
  const anos = cv.Projetos.map((p) => ano(p.Periodo)).filter(Boolean);
  const certs = certificacoesIA(cv);
  const anosCert = certs.map((c) => ano(c.Data_Emissao));
  const porInst = new Map();
  for (const c of certs) porInst.set(c.Instituicao, (porInst.get(c.Instituicao) || 0) + 1);
  return {
    projetos: cv.Projetos.length,
    projetosDe: Math.min(...anos),
    projetosAte: Math.max(...anos),
    certs: certs.length,
    certsDe: Math.min(...anosCert),
    certsAte: Math.max(...anosCert),
    certsPorInst: [...porInst].sort((a, b) => b[1] - a[1]),
  };
}

/* ── Conteúdos publicados (mesma fonte do catálogo) ───────────────────────── */

const slugDe = (file) => file.replace(/^\//, '').replace(/\.html$/, '');
/** Link do item: o gêmeo .md quando existe (padrão llms.txt), senão a página. */
const linkDe = (file) => {
  const s = slugDe(file);
  return existsSync(join(PUB, `${s}.md`)) ? `/${s}.md` : `/${s}`;
};

function secaoConteudos() {
  const { eco, temas } = loadEcossistema();
  const L = [];
  const item = (n) => `- [${cardTitle(n)}](${linkDe(n.file)}): *${NATUREZAS[n.natureza]}.* ${n.descricao}`;
  for (const t of temasDoSite({ eco, temas })) {
    if (!t.principais.length) continue;
    L.push(`### ${t.nome}`, '');
    for (const s of t.principais) {
      const n = eco.nodes[s];
      const pares = Object.values(eco.nodes).filter((x) => x.par === s)
        .map((x) => ` Versão completa: [${x.title}](${linkDe(x.file)}).`).join('');
      L.push(item(n) + pares);
    }
    L.push(`- Artigos e vídeos do tema: [/temas/${t.id}.md](/temas/${t.id}.md)`, '');
  }
  L.push('### Narrativas pessoais', '');
  for (const s of eco.trajetoria) L.push(item(eco.nodes[s]));
  L.push('');
  return L.join('\n');
}

/* ── llms.txt ─────────────────────────────────────────────────────────────── */

export function gerarLlms(cv) {
  const n = numeros(cv);
  const inst = n.certsPorInst.map(([i, q]) => `${q} ${i.replace(/, Inc\.$/, '')}`).join(' e ');
  return `# Mauricio Yokoyama Issei - Perfil Técnico e Casos de Sucesso

> Documentação otimizada para IA contendo currículo, stack tecnológica e exemplos de projetos com metodologia STAR.

## Core Documents

- [cv-for-ai.md](/cv-for-ai.md): Currículo completo e skills técnicas
- [career-highlights-star.md](/career-highlights-star.md): Casos de uso detalhados e resolução de problemas (Metodologia STAR)

## Optional

- [cv.json](/cv.json): Dados estruturados do currículo (formato JSON)
- [star.json](/star.json): Dados estruturados dos projetos STAR (formato JSON)
- [catalogo.md](/catalogo.md): Índice de todos os conteúdos, por tema, com a natureza de cada um
- [videos.md](/videos.md): Vídeos do canal, por assunto, com descrição e transcrição

## Conteúdos por tema

Ensaios, estudos e propostas técnicas, na mesma ordem e com o mesmo texto do [catalogo.md](/catalogo.md). Cada item tem uma versão Markdown limpa (\`.md\`) para ingestão por IA e diz a natureza do conteúdo (Experiência, Estudo, Proposta, Experimento ou Referência).

${secaoConteudos()}
---

## About This Profile

**Maurício Yokoyama Issei** é Tech Lead com mais de 20 anos de experiência em desenvolvimento de software, liderança técnica e arquitetura de soluções.

**Principais áreas de expertise:**
- Salesforce Administration & Development
- AWS Cloud Architecture (S3, EC2, Lambda, CodeDeploy)
- APIs REST/SOAP & Integration Patterns
- Site Reliability Engineering (SRE)
- Observability (Datadog, Splunk)
- AI Agentic Design Patterns
- Data Science & Analytics

**Presença Digital:**
- LinkedIn: [linkedin.com/in/mauricioissei](https://www.linkedin.com/in/mauricioissei/)
- GitHub: [github.com/issei](https://github.com/issei)
- YouTube: [youtube.com/@MauricioIssei](https://www.youtube.com/@MauricioIssei)
- Instagram: [instagram.com/yokoyamaissei](https://www.instagram.com/yokoyamaissei/)
- Email: mauricio@issei.com.br

---

## Key Achievements

- **Economia de 3MM+** na negociação de contratos Salesforce (2020)
- **Aumento de 15%** no atingimento de metas comerciais com Pipe Automática (2025)
- **Redução de SLA de 10 dias para tempo real** no processo de Agrupamento Comercial (2024)
- **${n.projetos} projetos documentados** com metodologia STAR (${n.projetosDe}-${n.projetosAte})
- **${n.certs} certificações em IA e sistemas agênticos** (${n.certsDe}-${n.certsAte}): ${inst}, todas listadas com link de verificação em \`cv.json\` e \`cv-for-ai.md\`

---

## How to Use This Documentation

This profile follows the **llms.txt** standard for AI-optimized documentation:

1. **For comprehensive CV review**: Read \`cv-for-ai.md\`
2. **For practical examples & problem-solving**: Read \`career-highlights-star.md\`
3. **For structured data access**: Use \`/cv.json\` and \`/star.json\`
4. **For the list of published content**: Read \`catalogo.md\`
5. **For full context**: See \`llms-full.txt\` (concatenated version)
`;
}

/* ── llms-full.txt ────────────────────────────────────────────────────────── */

export function gerarLlmsFull() {
  const corpo = (f) => ler(f).replace(/\s+$/, '');
  return [
    '=== INÍCIO: CURRÍCULO TÉCNICO ===',
    '',
    corpo('cv-for-ai.md'),
    '',
    '=== INÍCIO: CASOS DE SUCESSO (METODOLOGIA STAR) ===',
    '',
    corpo('career-highlights-star.md'),
    '',
    '=== INÍCIO: ORGANIZAÇÃO EDITORIAL E CONTEÚDOS PUBLICADOS ===',
    '',
    corpo('catalogo.md'),
    '',
    '=== FIM DO DOCUMENTO ===',
    '',
  ].join('\n');
}

/* ── CLI ─────────────────────────────────────────────────────────────────── */

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const check = process.argv.includes('--check');
  const cv = JSON.parse(ler('cv.json'));
  const alvos = [
    [join(PUB, 'llms.txt'), gerarLlms(cv)],
    [join(PUB, 'llms-full.txt'), gerarLlmsFull()],
  ];
  const divergentes = alvos.filter(([f, novo]) => !existsSync(f) || readFileSync(f, 'utf8') !== novo);
  if (check) {
    if (divergentes.length) {
      console.error(`gen-llms: fora de dia: ${divergentes.map(([f]) => f.replace(ROOT + '/', '')).join(', ')}. Rode node scripts/gen-llms.mjs.`);
      process.exit(1);
    }
    console.log('gen-llms: llms.txt e llms-full.txt em dia.');
  } else {
    for (const [f, novo] of divergentes) writeFileSync(f, novo, 'utf8');
    console.log(`gen-llms: ${divergentes.length} arquivo(s) gravado(s).`);
  }
}
