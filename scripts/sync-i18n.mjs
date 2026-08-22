#!/usr/bin/env node
/*
 * Sincronização do gêmeo digital `/en/`.
 * -----------------------------------------------------------------------------
 * Orquestra o tradutor local (`scripts/i18n/translate.py`, Argos Translate) e
 * responde a UMA pergunta: quais espelhos em inglês estão velhos em relação ao
 * original em PT-BR?
 *
 * A resposta vem de um manifesto (`scripts/i18n/i18n-manifest.json`) que guarda
 * o sha256 de cada fonte no momento em que o espelho foi gerado. Comparar
 * mtime não serviria: um `git checkout` reescreve a data de todo mundo e o
 * espelho "envelhecia" sem que uma linha mudasse.
 *
 * O manifesto é versionado de propósito — é ele que permite ao gate dizer
 * "este espelho está velho" sem ter 5 GB de modelo instalado.
 *
 * Uso:
 *   node scripts/sync-i18n.mjs                 # traduz o que está velho
 *   node scripts/sync-i18n.mjs --all           # retraduz tudo
 *   node scripts/sync-i18n.mjs --check         # não escreve; sai ≠0 se velho
 *   node scripts/sync-i18n.mjs --check --strict  # exige também o que falta
 *   node scripts/sync-i18n.mjs --soft          # avisa e segue se faltar Argos
 *   node scripts/sync-i18n.mjs --files a.html b.md
 *   node scripts/sync-i18n.mjs --engine identity   # só a camada estrutural
 *
 * Saída: 0 verde · 1 espelho velho/faltando (--check) ou erro · 2 motor ausente.
 */
import { spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const TRADUTOR = join(ROOT, 'scripts', 'i18n', 'translate.py');
const MANIFESTO = join(ROOT, 'scripts', 'i18n', 'i18n-manifest.json');

const args = process.argv.slice(2);
const tem = (f) => args.includes(f);
const valor = (nome, padrao) => {
  const eq = args.find((a) => a.startsWith(`${nome}=`));
  if (eq) return eq.slice(nome.length + 1);
  const i = args.indexOf(nome);
  return i !== -1 && args[i + 1] ? args[i + 1] : padrao;
};

const modoCheck = tem('--check');
const modoStrict = tem('--strict');
const modoSoft = tem('--soft');
const tudo = tem('--all');
const quieto = tem('--quiet');
const motor = valor('--engine', 'argos');
/*
 * `--files` consome tudo até a próxima flag. Filtrar por "não começa com --"
 * engoliria o VALOR da flag seguinte: `--files a.html --engine identity`
 * tratava `identity` como se fosse um arquivo.
 */
const arquivosPedidos = (() => {
  const i = args.indexOf('--files');
  if (i === -1) return null;
  const fim = args.findIndex((a, j) => j > i && a.startsWith('--'));
  return args.slice(i + 1, fim === -1 ? undefined : fim);
})();

const PY = process.env.I18N_PYTHON || 'python3';

const log = (...m) => { if (!quieto) console.log('[i18n]', ...m); };
const erro = (...m) => console.error('[i18n]', ...m);

/* ── Mapa de ativos ──────────────────────────────────────────────────────── */

/**
 * O mapa PT→EN é do Python (`scripts/i18n/assets.py`), não daqui.
 *
 * Ter a lista de ativos escrita duas vezes — uma em JS, outra em Python —
 * garantiria que um dia elas discordariam, e a divergência apareceria como um
 * espelho que ninguém atualiza. Uma fonte, dois leitores.
 */
function carregaMapa() {
  const res = spawnSync(PY, [TRADUTOR, '--print-map'], { encoding: 'utf-8' });
  if (res.status !== 0) {
    const motivo = res.error?.code === 'ENOENT'
      ? `\`${PY}\` não encontrado (defina I18N_PYTHON se o interpretador tiver outro nome)`
      : res.stderr?.trim() || res.error?.message || `saída ${res.status}`;
    // Em --soft (o `prebuild`) isto é aviso, não parada: uma máquina de build
    // sem Python ainda publica os espelhos versionados. Quebrar o deploy por
    // causa de uma dependência de tradução seria trocar um problema de
    // conteúdo por um de disponibilidade.
    if (modoSoft) {
      erro(`AVISO — não foi possível ler o mapa de ativos: ${motivo}`);
      erro('seguindo com os espelhos já versionados (--soft).');
      process.exit(0);
    }
    erro('não foi possível ler o mapa de ativos:', motivo);
    process.exit(1);
  }
  return JSON.parse(res.stdout);
}

const sha = (caminho) =>
  createHash('sha256').update(readFileSync(caminho)).digest('hex');

function leManifesto() {
  if (!existsSync(MANIFESTO)) return { versao: 1, ativos: {} };
  try {
    return JSON.parse(readFileSync(MANIFESTO, 'utf-8'));
  } catch {
    erro('manifesto ilegível; será reconstruído');
    return { versao: 1, ativos: {} };
  }
}

function gravaManifesto(m) {
  mkdirSync(dirname(MANIFESTO), { recursive: true });
  writeFileSync(MANIFESTO, `${JSON.stringify(m, null, 2)}\n`);
}

/* ── Diagnóstico ─────────────────────────────────────────────────────────── */

/**
 * Classifica cada ativo em `ok`, `faltando` (sem espelho) ou `velho` (fonte
 * mudou desde a última tradução). São estados distintos de propósito: um
 * espelho que falta é uma página que ainda não existe em inglês; um espelho
 * velho é uma página em inglês MENTINDO sobre o conteúdo atual — e essa é a
 * falha grave.
 */
function diagnostica(mapa, manifesto) {
  const faltando = [];
  const velhos = [];
  const ok = [];
  for (const ativo of mapa.assets) {
    const fonte = join(ROOT, ativo.source);
    if (!existsSync(fonte)) continue;
    const digest = sha(fonte);
    const alvo = join(ROOT, ativo.target);
    const registro = manifesto.ativos[ativo.source];
    if (!existsSync(alvo)) faltando.push({ ...ativo, digest });
    else if (!registro || registro.sha !== digest) velhos.push({ ...ativo, digest });
    else ok.push({ ...ativo, digest });
  }
  return { faltando, velhos, ok };
}

/* ── Execução ────────────────────────────────────────────────────────────── */

/** Devolve o código de saída do tradutor; 2 significa "motor indisponível". */
function traduz(ativos) {
  const res = spawnSync(
    PY,
    [TRADUTOR, '--engine', motor, ...(quieto ? ['--quiet'] : []), ...ativos.map((a) => a.source)],
    { stdio: 'inherit' }
  );
  if (res.error?.code === 'ENOENT') return 2; // sem Python é o mesmo que sem motor
  return res.status ?? 1;
}

const mapa = carregaMapa();
const manifesto = leManifesto();
const { faltando, velhos, ok } = diagnostica(mapa, manifesto);

/*
 * --check: não escreve nada. É o modo do quality gate e do CI.
 *
 * FALTANDO e VELHO não pesam igual, e a diferença é deliberada:
 *
 *   VELHO    é falha sempre. A página em inglês existe, está publicada e está
 *            MENTINDO sobre o conteúdo atual — pior do que não existir.
 *   FALTANDO só é falha depois que o gêmeo /en/ saiu do papel (algum espelho
 *            já existe) ou sob --strict. Antes disso, cobrar a tradução de 50
 *            ativos deixaria o gate vermelho por uma feature ainda não
 *            implantada, e um gate que vive vermelho deixa de ser lido.
 */
if (modoCheck) {
  const houveImplantacao = ok.length + velhos.length > 0;
  const cobrarFaltantes = modoStrict || houveImplantacao;
  const bloqueantes = [...velhos, ...(cobrarFaltantes ? faltando : [])];

  for (const a of velhos) erro(`VELHO     ${a.target}  (fonte mudou: ${a.source})`);
  if (cobrarFaltantes) {
    for (const a of faltando) erro(`FALTANDO  ${a.target}  (fonte: ${a.source})`);
  }

  if (bloqueantes.length === 0) {
    // Sem cobrança, a lista de faltantes vira uma linha: 50 avisos por
    // execução treinam quem lê o gate a ignorar o que ele diz.
    log(
      `✓ ${ok.length} espelho(s) /en/ em dia` +
        (faltando.length ? ` · ${faltando.length} ativo(s) ainda sem tradução` : '') +
        '.'
    );
    process.exit(0);
  }
  erro(`${bloqueantes.length} ativo(s) fora de sincronia. Rode: npm run i18n:sync`);
  process.exit(modoSoft ? 0 : 1);
}

/* Seleção do que traduzir. */
let alvos;
if (arquivosPedidos) {
  // O mapa vem em caminho posix; o repositório também é usado no Windows
  // (`deploy.bat`), de onde `src\proposta.html` chegaria sem casar com nada.
  const normaliza = (f) => f.replace(/\\/g, '/').replace(/^\.\//, '');
  const pedidos = new Set(arquivosPedidos.map(normaliza));
  alvos = mapa.assets.filter((a) => pedidos.has(a.source));
  const foraDoEscopo = [...pedidos].filter((f) => !mapa.assets.some((a) => a.source === f));
  // Editar `.claude/` ou `docs/specs/` não gera espelho — e isso é o contrato
  // da SDD §2.2, não uma falha.
  if (foraDoEscopo.length) log(`fora do escopo público (ignorados): ${foraDoEscopo.join(', ')}`);
} else if (tudo) {
  alvos = mapa.assets;
} else {
  alvos = [...faltando, ...velhos];
}

if (alvos.length === 0) {
  log(`✓ nada a fazer — ${ok.length} espelhos /en/ já em dia.`);
  process.exit(0);
}

log(`${alvos.length} ativo(s) a sincronizar (motor=${motor}).`);
const status = traduz(alvos);

if (status === 2) {
  const msg =
    'motor de tradução indisponível. Instale com:\n' +
    '  python3 -m venv .venv-i18n && . .venv-i18n/bin/activate\n' +
    '  pip install -r scripts/i18n/requirements.txt\n' +
    '  python3 scripts/i18n/translate.py --install-model';
  if (modoSoft) {
    // No `prebuild` isto é um aviso, não uma parada: os espelhos versionados
    // ainda vão para o dist. Quebrar o deploy porque a máquina de build não
    // tem 5 GB de modelo seria trocar um problema de conteúdo por um de
    // disponibilidade.
    erro(`AVISO — ${msg}`);
    erro('seguindo com os espelhos já versionados (--soft).');
    process.exit(0);
  }
  erro(msg);
  process.exit(2);
}
if (status !== 0) process.exit(status);

/* O manifesto só é atualizado depois da escrita — e só para o que existe. */
for (const ativo of alvos) {
  const alvo = join(ROOT, ativo.target);
  if (!existsSync(alvo)) continue;
  manifesto.ativos[ativo.source] = {
    sha: sha(join(ROOT, ativo.source)),
    target: ativo.target,
    engine: motor,
    at: new Date().toISOString(),
  };
}
gravaManifesto(manifesto);
log(`✓ ${alvos.length} espelho(s) atualizado(s); manifesto gravado.`);
