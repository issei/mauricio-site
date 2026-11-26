// Home nova (SDD-nova-home §14.8): todo fato da home tem fonte no repositório.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { HISTORIA, ESTUDO, ETAPAS_DO_GATE, PROJETOS, NARRACAO, ABERTURA, PERGUNTA, IDEIAS, CONTATO } from '../scripts/home/home.data.mjs';

const ler = (p) => readFileSync(new URL(`../${p}`, import.meta.url), 'utf8');
const cv = JSON.parse(ler('public/cv.json'));
const home = ler('src/index.html');
const semTags = (s) => s.replace(/<[^>]+>/g, ' ').replace(/&amp;/g, '&').replace(/\s+/g, ' ');

test('o nome vem do cv.json', () => {
  assert.ok(home.includes(`<h1 id="hm-nome">${cv.Nome}</h1>`));
});

test('cada marco da S02 bate com o cv.json: empresa e anos de início e fim', () => {
  for (const m of HISTORIA.marcos.filter((x) => x.fonte)) {
    const [ini, fim] = m.anos.split('–');
    if (m.fonte.formacao) {
      const f = cv.Formacao_Academica.find((x) => x.Instituicao === m.fonte.formacao);
      assert.ok(f && f.Periodo.startsWith(ini), m.anos);
      continue;
    }
    const e = cv.Experiencia.find((x) => x.Empresa === m.fonte.empresa);
    assert.ok(e, m.fonte.empresa);
    assert.ok(m.texto.includes(m.fonte.empresa), m.texto);
    assert.ok(e.Periodo.includes(ini), `${m.anos} × ${e.Periodo}`);
    if (fim === 'hoje') assert.match(e.Periodo, /o momento/);
    else assert.ok(e.Periodo.includes(fim), `${m.anos} × ${e.Periodo}`);
  }
});

test('os dez princípios são os títulos de /engenharia-agentes-ia', () => {
  const pagina = semTags(ler('src/engenharia-agentes-ia.html'));
  assert.equal(ESTUDO.principios.length, 10);
  for (const t of ESTUDO.principios) assert.ok(pagina.includes(t), t);
});

test('as etapas do gate existem em scripts/quality-gate.mjs', () => {
  const gate = ler('scripts/quality-gate.mjs');
  for (const e of ETAPAS_DO_GATE) assert.ok(gate.includes(`label: '${e}'`), e);
});

test('cada tese tem a frase de origem na página do projeto', () => {
  for (const [slug, c] of Object.entries(PROJETOS.cartoes)) {
    assert.ok(semTags(ler(`src/${slug}.html`)).includes(c.origem), `${slug}: ${c.origem}`);
  }
});

test('a narração não usa jargão de portfólio ("soluções", "resultados", "experiências")', () => {
  const textos = [...Object.values(NARRACAO).flat(), ...Object.values(ABERTURA).flat(), PERGUNTA.sintese, IDEIAS.frase, IDEIAS.texto, PROJETOS.texto, CONTATO.convite, HISTORIA.frase];
  for (const t of textos) assert.doesNotMatch(t, /\b(soluç(ão|ões)|resultados?|experiências?)\b/i, t);
});
