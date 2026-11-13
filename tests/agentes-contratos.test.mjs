/**
 * Contratos dos documentos para agentes: o que é anunciado bate com os dados publicados.
 *
 * Cobre as divergências corrigidas em 2026-11-13:
 *   - llms.txt dizia "18 projetos" (cv.json e a página Carreira têm 19) e "8 certificações"
 *     sem escopo (cv.json tem 9 em IA desde 2025); agent-catalog e MCP server card repetiam o 18;
 *   - openapi.json descrevia /star.json como lista, e ele é um objeto por ano;
 *   - cv-for-ai.md não listava duas certificações do cv.json;
 *   - digest do SKILL.md precisa acompanhar o arquivo.
 *
 * Uso: node --test tests/agentes-contratos.test.mjs
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { gerarLlms, gerarLlmsFull, numeros } from '../scripts/gen-llms.mjs';

const PUB = join(import.meta.dirname, '..', 'public');
const ler = (f) => readFileSync(join(PUB, f), 'utf8');
const json = (f) => JSON.parse(ler(f));

const cv = json('cv.json');
const star = json('star.json');

/** Projetos do star.json: um sub_projeto conta como projeto (ex.: "Sustentação AFVC"). */
const projetosStar = Object.values(star).flat()
  .reduce((n, p) => n + (p.sub_projetos?.length || 1), 0);

test('llms.txt e llms-full.txt estão em dia com as fontes', () => {
  assert.equal(ler('llms.txt'), gerarLlms(cv), 'rode node scripts/gen-llms.mjs');
  assert.equal(ler('llms-full.txt'), gerarLlmsFull(), 'rode node scripts/gen-llms.mjs');
});

test('contagem de projetos STAR é a mesma em todas as superfícies', () => {
  const n = cv.Projetos.length;
  assert.equal(projetosStar, n, 'star.json e cv.json');
  assert.equal(numeros(cv).projetos, n);
  assert.match(ler('llms.txt'), new RegExp(`\\*\\*${n} projetos documentados\\*\\*`));
  assert.match(ler('.well-known/agent-catalog'), new RegExp(`"${n} documented projects`));
  assert.match(ler('.well-known/mcp/server-card.json'), new RegExp(`"${n} project case studies`));
  const titulos = ler('career-highlights-star.md').match(/^### /gm) || [];
  assert.equal(titulos.length, n, 'career-highlights-star.md');
});

test('cv-for-ai.md lista toda certificação do cv.json que tem link de verificação', () => {
  const md = ler('cv-for-ai.md');
  const semProtocolo = (u) => u.replace(/^https?:\/\//, '').replace(/\?source=.*$/, '');
  const faltam = cv.Certificados.filter((c) => c.Verificacao && !md.includes(semProtocolo(c.Verificacao)))
    .map((c) => `${c.Nome} (${c.Data_Emissao})`);
  assert.deepEqual(faltam, []);
});

/* ── openapi.json × dados reais ─────────────────────────────────────────── */

const api = json('openapi.json');
const S = api.components.schemas;
const resolve = (s) => (s.$ref ? S[s.$ref.split('/').pop()] : s);

/** Validador mínimo para o subconjunto de JSON Schema usado no openapi.json. */
function valida(valor, schema, onde, erros) {
  const s = resolve(schema);
  if (s.oneOf) {
    const ok = s.oneOf.filter((alt) => { const e = []; valida(valor, alt, onde, e); return !e.length; });
    if (ok.length !== 1) erros.push(`${onde}: não casa com exatamente um oneOf`);
    return erros;
  }
  const tipo = Array.isArray(valor) ? 'array' : valor === null ? 'null' : typeof valor;
  if (s.type && s.type !== tipo) { erros.push(`${onde}: esperado ${s.type}, veio ${tipo}`); return erros; }
  if (s.type === 'array' && s.items) valor.forEach((v, i) => valida(v, s.items, `${onde}[${i}]`, erros));
  if (s.type === 'object') {
    for (const r of s.required || []) if (!(r in valor)) erros.push(`${onde}: falta ${r}`);
    for (const [k, v] of Object.entries(valor)) {
      if (s.properties?.[k]) valida(v, s.properties[k], `${onde}.${k}`, erros);
      else if (s.additionalProperties) valida(v, s.additionalProperties, `${onde}.${k}`, erros);
    }
  }
  return erros;
}

const schemaDe = (path) => api.paths[path].get.responses['200'].content['application/json'].schema;

test('openapi.json: /cv.json descreve o cv.json publicado', () => {
  assert.deepEqual(valida(cv, schemaDe('/cv.json'), 'cv.json', []), []);
});

test('openapi.json: /star.json descreve o star.json publicado (objeto por ano)', () => {
  assert.deepEqual(valida(star, schemaDe('/star.json'), 'star.json', []), []);
  const props = new Set(Object.keys(S.StarProject.properties));
  const chaves = new Set();
  const junta = (p) => { Object.keys(p).forEach((k) => chaves.add(k)); (p.sub_projetos || []).forEach(junta); };
  Object.values(star).flat().forEach(junta);
  assert.deepEqual([...chaves].filter((k) => !props.has(k)), [], 'chave do star.json fora do schema');
});

test('agent-skills: digest do índice confere com cada SKILL.md', () => {
  for (const s of json('.well-known/agent-skills/index.json').skills) {
    const caminho = s.url.replace('https://mauricio.issei.com.br/', '');
    const hash = createHash('sha256').update(readFileSync(join(PUB, caminho))).digest('hex');
    assert.equal(s.digest, `sha256:${hash}`, s.name);
  }
});

test('WebMCP: get_star_projects com limite devolve lista (star.json não é array)', async () => {
  const fonte = readFileSync(join(PUB, 'webmcp.js'), 'utf8');
  const tools = {};
  const navigator = { modelContext: { registerTool: (t) => { tools[t.name] = t; } } };
  const fetch = async (u) => ({ json: async () => (u === '/star.json' ? star : cv) });
  new Function('navigator', 'fetch', 'AbortController', fonte)(navigator, fetch, AbortController);

  const todos = await tools.get_star_projects.execute({});
  assert.deepEqual(todos, star);
  const tres = await tools.get_star_projects.execute({ limit: 3 });
  assert.equal(tres.length, 3);
  assert.equal(tres[0].ano, Object.keys(star).sort().at(-1));
  assert.deepEqual(await tools.get_cv_data.execute(), cv);
});
