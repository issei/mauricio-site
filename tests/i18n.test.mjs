/*
 * Invariantes do gêmeo digital /en/.
 * -----------------------------------------------------------------------------
 * Testa a MÁQUINA, não a tradução. A qualidade do texto que o Argos produz é
 * julgamento humano; o que se pode cobrar por teste é o que quebra em silêncio:
 * um `lang` errado, um `canonical` apontando para a página em português, um
 * `<link rel=stylesheet>` que virou 404 ao descer um diretório, uma cerca de
 * código traduzida, um JSON-LD que deixou de parsear.
 *
 * Por isso o corpo do teste GERA os espelhos num diretório temporário com
 * `--engine identity` — a camada estrutural inteira, sem baixar 5 GB de modelo
 * nem depender de nada versionado. Se `src/en/` existir na árvore, as mesmas
 * invariantes são cobradas dele também.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdtempSync, rmSync, existsSync, readFileSync, readdirSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve, dirname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const TRADUTOR = join(ROOT, 'scripts', 'i18n', 'translate.py');
const SITE = 'https://mauricio.issei.com.br';
const PY = process.env.I18N_PYTHON || 'python3';

/** Amostra representativa: a home (JS inline + JSON-LD), uma página densa,
 *  uma legal, um markdown com cerca de código, o AEO e os dados. */
const AMOSTRA = [
  'src/index.html',
  'src/engenharia-agentes-ia.html',
  'src/termos.html',
  'public/engenharia-agentes-ia.md',
  'public/llms.txt',
  'public/cv.json',
];

const temPython = spawnSync(PY, ['--version']).status === 0;

function gera(motor = 'identity', arquivos = AMOSTRA) {
  const dir = mkdtempSync(join(tmpdir(), 'i18n-'));
  const res = spawnSync(
    PY,
    [TRADUTOR, '--engine', motor, '--quiet', '--out-root', dir, ...arquivos],
    { cwd: ROOT, encoding: 'utf-8' }
  );
  assert.equal(res.status, 0, `tradutor falhou: ${res.stderr || res.stdout}`);
  return dir;
}

const ler = (base, rel) => readFileSync(join(base, rel), 'utf-8');

/* ── HTML ────────────────────────────────────────────────────────────────── */

test('espelho HTML declara lang="en"', { skip: !temPython }, () => {
  const dir = gera();
  try {
    for (const rel of AMOSTRA.filter((f) => f.endsWith('.html'))) {
      const alvo = rel.replace('src/', 'src/en/');
      const html = ler(dir, alvo);
      assert.match(html, /<html[^>]*\slang="en"/i, `${alvo} não declara lang="en"`);
      assert.doesNotMatch(html, /<html[^>]*\slang="pt-BR"/i, `${alvo} manteve lang pt-BR`);
    }
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('canonical é autorreferencial em /en/ e o hreflang é recíproco', { skip: !temPython }, () => {
  const dir = gera();
  try {
    for (const rel of AMOSTRA.filter((f) => f.endsWith('.html'))) {
      const slug = rel.replace('src/', '').replace('.html', '');
      const rotaEn = slug === 'index' ? '/en/' : `/en/${slug}`;
      const rotaPt = slug === 'index' ? '/' : `/${slug}`;
      const html = ler(dir, rel.replace('src/', 'src/en/'));

      const canonicals = [...html.matchAll(/<link[^>]+rel="canonical"[^>]*>/gi)];
      assert.equal(canonicals.length, 1, `${slug}: esperado exatamente 1 canonical`);
      assert.match(canonicals[0][0], new RegExp(`href="${SITE}${rotaEn}"`),
        `${slug}: canonical não aponta para ${rotaEn}`);

      for (const [lang, rota] of [['pt-BR', rotaPt], ['en', rotaEn], ['x-default', rotaPt]]) {
        assert.match(
          html,
          new RegExp(`<link[^>]+hreflang="${lang}"[^>]+href="${SITE}${rota}"`),
          `${slug}: falta hreflang ${lang} → ${rota}`
        );
      }
    }
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('JSON-LD continua válido e muda inLanguage para en-US', { skip: !temPython }, () => {
  const dir = gera();
  try {
    let blocos = 0;
    for (const rel of AMOSTRA.filter((f) => f.endsWith('.html'))) {
      const html = ler(dir, rel.replace('src/', 'src/en/'));
      for (const m of html.matchAll(
        /<script[^>]+application\/ld\+json[^>]*>([\s\S]*?)<\/script>/gi
      )) {
        blocos += 1;
        assert.doesNotThrow(() => JSON.parse(m[1]), `${rel}: JSON-LD deixou de parsear`);
        assert.doesNotMatch(m[1], /"inLanguage"\s*:\s*"pt-BR"/, `${rel}: inLanguage ficou pt-BR`);
      }
    }
    assert.ok(blocos > 0, 'a amostra deveria conter blocos JSON-LD');
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('rotas internas com espelho apontam para /en/', { skip: !temPython }, () => {
  const dir = gera();
  try {
    for (const rel of AMOSTRA.filter((f) => f.endsWith('.html'))) {
      const html = ler(dir, rel.replace('src/', 'src/en/'));
      // Rotas de página conhecidas não podem ter sobrado sem prefixo.
      for (const rota of ['/engenharia-confianca', '/proposta', '/catalogo.html', '/llms.txt']) {
        assert.doesNotMatch(
          html,
          new RegExp(`href="${rota}"`),
          `${rel}: link ${rota} deveria ter virado /en${rota}`
        );
      }
    }
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('ativo compartilhado (css/js/img) continua resolvendo de dentro de en/', { skip: !temPython }, () => {
  const dir = gera();
  try {
    for (const rel of AMOSTRA.filter((f) => f.endsWith('.html'))) {
      const html = ler(dir, rel.replace('src/', 'src/en/'));
      for (const m of html.matchAll(/(?:href|src)="(\.\.?\/[^"#?]+)"/g)) {
        const ref = m[1];
        const alvo = resolve(ROOT, 'src/en', ref);
        // Uma página irmã (`./proposta.html`) só existe depois de gerada; o
        // que se cobra dela é que a FONTE correspondente exista. Qualquer
        // outra coisa — css, js, imagem, .md — tem de resolver para um arquivo
        // real a partir de `src/en/`, senão o link nasce 404.
        const ehIrma =
          ref.endsWith('.html') &&
          alvo.startsWith(join(ROOT, 'src', 'en')) &&
          existsSync(join(ROOT, 'src', relative(join(ROOT, 'src', 'en'), alvo)));
        assert.ok(
          ehIrma || existsSync(alvo),
          `${rel}: referência relativa quebrada a partir de src/en/ → ${ref}`
        );
      }
    }
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('bloco opaco (script, style, code, pre) sai byte a byte igual', { skip: !temPython }, () => {
  const dir = gera();
  try {
    const conta = (s, re) => (s.match(re) || []).length;
    for (const rel of AMOSTRA.filter((f) => f.endsWith('.html'))) {
      const origem = readFileSync(join(ROOT, rel), 'utf-8');
      const espelho = ler(dir, rel.replace('src/', 'src/en/'));
      for (const tag of ['script', 'style', 'code', 'pre']) {
        const re = new RegExp(`<${tag}[\\s>]`, 'gi');
        assert.equal(
          conta(espelho, re),
          conta(origem, re),
          `${rel}: número de <${tag}> mudou no espelho`
        );
      }
    }
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

/* ── Markdown e dados ────────────────────────────────────────────────────── */

test('markdown preserva cercas de código e marcadores de bloco', { skip: !temPython }, () => {
  const dir = gera();
  try {
    for (const rel of AMOSTRA.filter((f) => f.endsWith('.md') || f.endsWith('.txt'))) {
      const origem = readFileSync(join(ROOT, rel), 'utf-8');
      const espelho = ler(dir, rel.replace('public/', 'public/en/'));
      const cercas = (s) => (s.match(/^\s*(?:```|~~~)/gm) || []).length;
      const cabecalhos = (s) => (s.match(/^\s{0,3}#{1,6}\s/gm) || []).length;
      const itens = (s) => (s.match(/^\s*(?:[-*+]|\d{1,9}[.)])\s/gm) || []).length;
      assert.equal(cercas(espelho), cercas(origem), `${rel}: cercas de código não batem`);
      assert.equal(cabecalhos(espelho), cabecalhos(origem), `${rel}: cabeçalhos não batem`);
      assert.equal(itens(espelho), itens(origem), `${rel}: itens de lista não batem`);
    }
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('cv.json mantém chaves, estrutura e tipos', { skip: !temPython }, () => {
  const dir = gera();
  try {
    const origem = JSON.parse(readFileSync(join(ROOT, 'public/cv.json'), 'utf-8'));
    const espelho = JSON.parse(ler(dir, 'public/en/cv.json'));
    const forma = (v) => {
      if (Array.isArray(v)) return ['array', v.length, v.map(forma)];
      if (v && typeof v === 'object') {
        return ['object', Object.keys(v).sort(), Object.keys(v).sort().map((k) => forma(v[k]))];
      }
      return typeof v;
    };
    assert.deepEqual(forma(espelho), forma(origem), 'cv.json mudou de forma ao ser traduzido');
    assert.equal(espelho.Contato.Email, origem.Contato.Email, 'e-mail foi traduzido');
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

/* ── Espelhos versionados (se existirem) ─────────────────────────────────── */

const SRC_EN = join(ROOT, 'src', 'en');

test('espelhos versionados estão em dia com as fontes', { skip: !existsSync(SRC_EN) }, () => {
  const res = spawnSync('node', [join(ROOT, 'scripts', 'sync-i18n.mjs'), '--check'], {
    cwd: ROOT,
    encoding: 'utf-8',
  });
  assert.equal(res.status, 0, `espelhos fora de sincronia:\n${res.stderr}`);
});

test('nenhum espelho versionado ficou com lang pt-BR', { skip: !existsSync(SRC_EN) }, () => {
  for (const arquivo of readdirSync(SRC_EN).filter((f) => f.endsWith('.html'))) {
    const html = readFileSync(join(SRC_EN, arquivo), 'utf-8');
    assert.match(html, /<html[^>]*\slang="en"/i, `src/en/${arquivo} não declara lang="en"`);
  }
});

/* ── O que vai (e o que não vai) ao modelo ───────────────────────────────── */

/**
 * `identity` prova que a estrutura sobrevive, mas não distingue "protegi o
 * bloco de código" de "mandei o bloco ao modelo e ele devolveu igual". O motor
 * `mock` devolve CAIXA ALTA: o que foi traduzido fica visível, o que foi
 * preservado também.
 */
test('bloco de código não é enviado ao modelo', { skip: !temPython }, () => {
  const alvo = 'src/salesforce-agentic-quickstart.html';
  const dir = gera('mock', [alvo]);
  try {
    const origem = readFileSync(join(ROOT, alvo), 'utf-8');
    const espelho = ler(dir, alvo.replace('src/', 'src/en/'));
    const blocos = (s) => [...s.matchAll(/<(code|pre)[^>]*>([\s\S]*?)<\/\1>/gi)].map((m) => m[2]);

    const a = blocos(origem);
    const b = blocos(espelho);
    assert.ok(a.length > 0, 'a página de amostra deveria ter blocos de código');
    assert.deepEqual(b, a, '<code>/<pre> foram alterados — o conteúdo foi ao modelo');

    // …e a prova do contrário: o texto visível PASSOU pelo modelo. Só o
    // texto — a marcação aninhada (`<span class="...">`) segue em minúsculas.
    const h1 = espelho.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
    assert.ok(h1, 'página sem <h1>');
    const soTexto = h1[1].replace(/<[^>]*>/g, '');
    assert.ok(soTexto.trim().length > 0, '<h1> sem texto');
    assert.equal(soTexto, soTexto.toUpperCase(), '<h1> não passou pelo motor');
    assert.match(h1[1], /<span class="/, 'a marcação dentro do <h1> foi alterada');
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

/**
 * Um modelo NMT não tem obrigação de copiar os marcadores intactos. O motor
 * `mangle` apaga todos eles de propósito: se a contingência de
 * `translate_with_slots` não funcionasse, links e código inline sumiriam.
 */
test('sintaxe sobrevive a um modelo que destrói os marcadores', { skip: !temPython }, () => {
  const alvo = 'public/engenharia-agentes-ia.md';
  const dir = gera('mangle', [alvo]);
  try {
    const origem = readFileSync(join(ROOT, alvo), 'utf-8');
    const espelho = ler(dir, alvo.replace('public/', 'public/en/'));
    const inline = (s) => (s.match(/`[^`\n]+`/g) || []).length;
    const links = (s) => (s.match(/\]\([^)]*\)/g) || []).length;
    assert.equal(inline(espelho), inline(origem), 'código inline perdido na contingência');
    assert.equal(links(espelho), links(origem), 'link perdido na contingência');
    assert.doesNotMatch(espelho, /zzph\d+zz/i, 'marcador vazou para o arquivo final');
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});
