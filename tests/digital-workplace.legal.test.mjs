// Guarda legal da página "Digital Workplace Agêntico".
// Spec: docs/specs/pages/digital-workplace-agentico/06_restricao_legal_e_procedencia.md
//
// A página não pode citar nem referenciar a organização de referência que motivou o estudo.
// A lista de padrões proibidos fica codificada em base64 para que o repositório não carregue
// o nome em texto puro. Ver a lista: `node tests/digital-workplace.legal.test.mjs --print-terms`.
//
// Arquivos ainda inexistentes são ignorados: a guarda protege hoje a fonte e a spec e passa a
// proteger a página, o Markdown e o gêmeo /en/ assim que forem criados.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative, basename } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const SLUG = 'digital-workplace-agentico';
const SELF = basename(fileURLToPath(import.meta.url));

const ENCODED =
  'WyJcXGJpdGFbdcO6XSIsInVuaWJhbmNvIiwiXFxiaXVcXHM/LT9jb25lY3RhIiwiaXVjb25lY3RhIiwiY29uZWN0YVxcLml0YXUiLCJcXGJsYXJhXFxiIiwiZnVuZGFbY8OnXVthw6Ndb1xccytzYVt1w7pdZGUiXQ==';
const PATTERNS = JSON.parse(Buffer.from(ENCODED, 'base64').toString('utf8')).map(
  (src) => new RegExp(src, 'iu'),
);

if (process.argv.includes('--print-terms')) {
  console.log(PATTERNS.map(String).join('\n'));
  process.exit(0);
}

/** Arquivos inteiros sob a guarda (doc 06 §3). */
const FILES = [
  `src/${SLUG}.html`,
  `src/${SLUG}.css`,
  `public/${SLUG}.md`,
  `src/en/${SLUG}.html`,
  `public/en/${SLUG}.md`,
];

/** Diretórios varridos recursivamente (só arquivos de texto). */
const DIRS = [
  'src/js/digital-workplace',
  `docs/references/${SLUG}`,
  `docs/specs/pages/${SLUG}`,
];

const TEXT_EXT = /\.(html|css|m?js|md|json|txt|ya?ml)$/i;

const walk = (dir) =>
  readdirSync(dir).flatMap((name) => {
    const full = join(dir, name);
    return statSync(full).isDirectory() ? walk(full) : TEXT_EXT.test(name) ? [full] : [];
  });

/** Testes da página, exceto esta própria guarda. */
const pageTests = () =>
  readdirSync(join(ROOT, 'tests'))
    .filter((n) => n.startsWith('digital-workplace') && n !== SELF)
    .map((n) => join(ROOT, 'tests', n));

/** Procura os padrões num texto; devolve `rótulo:linha` de cada ocorrência. */
const scan = (label, text, lineOffset = 0) =>
  text.split('\n').flatMap((line, i) =>
    PATTERNS.some((re) => re.test(line)) ? [`${label}:${i + 1 + lineOffset}`] : [],
  );

const scanFile = (abs) => scan(relative(ROOT, abs), readFileSync(abs, 'utf8'));

/** Bloco da entrada do slug em scripts/seo/pages.mjs (do `slug:` até o próximo `slug:`). */
const pagesEntry = () => {
  const file = join(ROOT, 'scripts/seo/pages.mjs');
  const lines = readFileSync(file, 'utf8').split('\n');
  const start = lines.findIndex((l) => l.includes(`slug: '${SLUG}'`));
  if (start < 0) return [];
  const rest = lines.slice(start + 1).findIndex((l) => /\bslug:\s*'/.test(l));
  const end = rest < 0 ? lines.length : start + 1 + rest;
  return scan('scripts/seo/pages.mjs', lines.slice(start, end).join('\n'), start);
};

/** Linhas que citam o slug em arquivos compartilhados com outras páginas. */
const sharedLines = (rel) => {
  const abs = join(ROOT, rel);
  if (!existsSync(abs)) return [];
  return readFileSync(abs, 'utf8')
    .split('\n')
    .flatMap((line, i) => (line.includes(SLUG) ? scan(rel, line, i) : []));
};

test('a lista codificada decodifica para padrões válidos', () => {
  assert.ok(PATTERNS.length >= 5);
});

test('página, Markdown, gêmeo /en/, fonte, spec e testes não citam a organização de referência', () => {
  const targets = [
    ...FILES.map((f) => join(ROOT, f)).filter(existsSync),
    ...DIRS.map((d) => join(ROOT, d)).filter(existsSync).flatMap(walk),
    ...pageTests(),
  ];
  assert.ok(targets.length > 0, 'nada para verificar: fonte e spec deveriam existir');
  const hits = targets.flatMap(scanFile);
  assert.deepEqual(hits, [], `termos proibidos encontrados em:\n${hits.join('\n')}`);
});

test('metadados compartilhados (pages.mjs, llms*.txt, ecossistema, catálogo) estão limpos para o slug', () => {
  const hits = [
    ...pagesEntry(),
    ...sharedLines('public/llms.txt'),
    ...sharedLines('public/llms-full.txt'),
    ...sharedLines('specs/ecosystem.nav.yaml'),
    ...sharedLines('src/catalogo.html'),
  ];
  assert.deepEqual(hits, [], `termos proibidos encontrados em:\n${hits.join('\n')}`);
});

// Só os links do corpo (<main>): a navegação global do site (início, currículo) fica de fora,
// porque é estrutura do site, não associação editorial feita pela página.
test('páginas de destino dos crosslinks do corpo estão limpas', () => {
  const page = join(ROOT, `src/${SLUG}.html`);
  if (!existsSync(page)) return; // a página ainda não existe
  const html = readFileSync(page, 'utf8').match(/<main[\s\S]*?<\/main>/)?.[0] ?? '';
  const targets = [...html.matchAll(/href="\.?\/([a-z0-9-]+)(?:\.html)?(?:#[^"]*)?"/g)]
    .map((m) => `src/${m[1]}.html`)
    .filter((rel, i, all) => all.indexOf(rel) === i && rel !== `src/${SLUG}.html`)
    .filter((rel) => existsSync(join(ROOT, rel)));
  const hits = targets.flatMap((rel) => scanFile(join(ROOT, rel)));
  assert.deepEqual(hits, [], `crosslink para página que cita a organização:\n${hits.join('\n')}`);
});
