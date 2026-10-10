// Guarda de honestidade da copy da landing "Especificação Conversacional Estruturada".
// Molde: tests/aprendizagem-autorregulada.copy.test.mjs. Spec: wireframe §6.
//
// A página é uma PROPOSTA em avaliação. Esta guarda barra, no HTML, no kit e no
// gêmeo Markdown, as frases que a tornariam mais forte do que a pesquisa permite.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const arquivos = [
  'src/especificacao-conversacional.html',
  'public/downloads/kit-especificacao-conversacional.md',
  'public/especificacao-conversacional.md',
];

const proibidas = [
  [/m[ée]todo\s+validad[oa]/i, '"método validado"'],
  [/workflow[^.<]{0,60}comprovad[oa]/i, '"comprovado" aplicado ao workflow'],
  [/(?<!não )(?<!nem )(?<!Não )(?<!nenhum )\bgarant(?:e|em)\b(?! apenas)/i, '"garante" afirmativo'],
  [/elimina(?:m)?\s+(?:a\s+)?alucina/i, '"elimina a alucinação"'],
  [/fonte\s+[úu]nica\s+da\s+verdade/i, '"fonte única da verdade"'],
  [/em\s+conformidade\s+com[^.<]{0,40}(?:ISO|NIST|29148|SWEBOK)/i, '"em conformidade com" ISO/NIST'],
  [/certificad[oa]/i, '"certificado"'],
  [/(?<!pode )(?<!podem )\breduz(?:em)?\s+(?:os\s+)?(?:defeitos|retrabalho|custos?)/i, '"reduz defeitos/retrabalho/custo" sem modal'],
];

/** Texto que a guarda examina: sem script/style, sem perguntas e sem a lista "O que não é". */
function texto(arquivo) {
  return readFileSync(arquivo, 'utf8')
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    // A lista "O que não é" nega, por definição, as afirmações que a guarda procura.
    .replace(/<h3>O que não é<\/h3>\s*<ul>[\s\S]*?<\/ul>/i, ' ')
    // Negações explícitas ("proposta, não método validado") não são afirmações.
    .replace(/(?:não|nem)\s+(?:é\s+|um\s+|uma\s+)*m[ée]todo\s+validad[oa]/gi, ' ')
    // Perguntas ("Há evidência de que funciona?") não são afirmações.
    .replace(/[^.<>?\n]*\?/g, ' ');
}

for (const arquivo of arquivos) {
  test(`${arquivo}: sem afirmações mais fortes que a pesquisa`, () => {
    const t = texto(arquivo);
    for (const [re, rotulo] of proibidas) {
      assert.doesNotMatch(t, re, `${arquivo}: ${rotulo}`);
    }
  });
}

test('a página declara o status de proposta e a ausência de estudo do workflow completo', () => {
  const html = readFileSync('src/especificacao-conversacional.html', 'utf8');
  assert.match(html, /ainda não foi\s+comparado a uma linha de base/);
  assert.match(html, /Não foi localizado estudo\s+controlado ou longitudinal/);
  assert.match(html, /Método validado ou norma/);
});

test('normas citadas só como fundamento: "compatível com" e "inspirada em"', () => {
  const html = readFileSync('src/especificacao-conversacional.html', 'utf8');
  assert.match(html, /compatível com\s+as\s+atividades/);
  assert.match(html, /inspirada na função\s+<em>Govern<\/em>/);
});
