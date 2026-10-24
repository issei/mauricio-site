// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
/*
 * testDir é a raiz (para cobrir e2e/ e tests/), então o glob 'tests/**' também
 * casava com as cópias do repositório em .claude/worktrees/: cada worktree
 * velha somava a suíte inteira de novo (9.286 testes locais contra 1.381 reais,
 * medido em 2026-10-11). O testIgnore de projeto substitui o global, por isso a
 * lista entra em todo projeto.
 */
const PREVIEW = process.env.PW_SERVIDOR === 'preview';
// PW_PORTA: roda a suíte numa porta própria, sem disputar a 5173 com um dev server aberto.
const PORTA = Number(process.env.PW_PORTA) || 5173;

const SEMPRE_IGNORAR = ['**/.claude/**', '**/node_modules/**', '**/dist/**'];

/*
 * Specs que só fazem sentido no Chromium (comparação de pixel, varredura
 * estática do DOM, hreflang). Fora do projeto por config, não por test.skip no
 * corpo: o sharding só desconta testes pulados de forma ESTÁTICA, e um skip no
 * corpo conta como carga num shard de firefox/webkit que não roda nada.
 */
const SO_CHROMIUM = ['**/a11y/focus-visible.spec.js', '**/a11y/label-in-name.spec.js', '**/hreflang.spec.js'];

export default defineConfig({
  testDir: '.',
  testMatch: ['e2e/**/*.spec.js', 'tests/**/*.spec.js'],
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /*
   * Uma tentativa extra também localmente.
   *
   * Motivo, honestamente: no dev server o Vite injeta o CSS por JavaScript, o
   * que abre uma janela de FOUC em que o axe mede texto ainda sem cor temática
   * e acusa contraste ~1:1 (ver a nota em tests/_helpers/axe.js). Sob carga,
   * isso atinge de forma rotativa uma suíte diferente a cada execução.
   *
   * Retry NÃO mascara defeito determinístico: um teste que falha de verdade
   * falha nas duas tentativas. A correção estrutural é rodar os testes contra
   * o build (`vite preview`), onde o CSS é um arquivo real — mudança que afeta
   * as 500+ asserções existentes e merece um PR próprio.
   */
  retries: process.env.CI ? 2 : 1,
  /*
   * Local: 50% dos núcleos. Com o padrão (undefined → um worker por núcleo) a
   * suíte passou a falhar de forma rotativa após a entrada dos projetos `mobile`
   * e `no-js`: cinco projetos saturavam a máquina e testes de timing no Firefox
   * estouravam por lentidão, não por defeito. Menos workers devolve
   * determinismo — um gate que falha ao acaso não é um gate.
   */
  /*
   * CI: 2 workers por shard (runner de 4 vCPU — o dev server divide a máquina
   * com os navegadores). A escala vem dos shards da matriz, não daqui.
   * PW_WORKERS sobrescreve, para calibrar sem mexer no arquivo.
   */
  workers: Number(process.env.PW_WORKERS) || (process.env.CI ? 2 : '50%'),
  /* CI: blob por shard (unido no job merge-reports) + anotações no PR. */
  reporter: process.env.CI ? [['blob'], ['github']] : 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    baseURL: `http://localhost:${PORTA}`,

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  projects: [
    /*
     * As specs .mobile e .nojs exigem viewport/flag próprios e rodam apenas nos
     * projetos dedicados abaixo — sem isto, os três projetos desktop também as
     * executariam, com JS ligado e a 1280px, invalidando o que elas verificam.
     */
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
      testIgnore: [...SEMPRE_IGNORAR, '**/apresentacao.mobile.spec.js', '**/apresentacao.nojs.spec.js', '**/formulacao.nojs.spec.js', '**/index.nojs.spec.js', '**/digital-workplace.nojs.spec.js', '**/entrevista.nojs.spec.js'],
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
      testIgnore: [...SEMPRE_IGNORAR, ...SO_CHROMIUM, '**/apresentacao.mobile.spec.js', '**/apresentacao.nojs.spec.js', '**/formulacao.nojs.spec.js', '**/index.nojs.spec.js', '**/digital-workplace.nojs.spec.js', '**/entrevista.nojs.spec.js'],
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
      testIgnore: [...SEMPRE_IGNORAR, ...SO_CHROMIUM, '**/apresentacao.mobile.spec.js', '**/apresentacao.nojs.spec.js', '**/formulacao.nojs.spec.js', '**/index.nojs.spec.js', '**/digital-workplace.nojs.spec.js', '**/entrevista.nojs.spec.js'],
    },

    /*
     * Projetos da página v3.0 (ESPECIFICACAO-AGENTICA-IMPLEMENTACAO.md, D-T03/D-T04).
     * Escopados por testMatch: não custam tempo às suítes legadas.
     */
    {
      // Cartões empilhados e regra dos 8 segundos em tela pequena (evolução 10)
      name: 'mobile',
      use: { ...devices['Pixel 5'] },
      testMatch: ['tests/apresentacao.mobile.spec.js'],
      testIgnore: SEMPRE_IGNORAR,
    },
    {
      // Degradação sem JavaScript (spec §4.2) — antes, inverificável
      name: 'no-js',
      use: { ...devices['Desktop Chrome'], javaScriptEnabled: false },
      testMatch: ['tests/apresentacao.nojs.spec.js', 'tests/formulacao.nojs.spec.js', 'tests/index.nojs.spec.js', 'tests/digital-workplace.nojs.spec.js', 'tests/entrevista.nojs.spec.js'],
      testIgnore: SEMPRE_IGNORAR,
    },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /*
   * Servidor dos testes. Padrão: dev server do Vite. PW_SERVIDOR=preview serve o
   * build (dist/, exige `vite build` antes): o CSS chega como arquivo, sem a
   * janela de FOUC em que o axe mede contraste antes da cor temática (ver
   * retries acima) — docs/specs/QUALITY_GATE_PARALELO.md, P3.
   */
  webServer: {
    command: PREVIEW ? `npx vite preview --port ${PORTA} --strictPort` : `npx vite --port ${PORTA} --strictPort`,
    url: `http://localhost:${PORTA}`,
    // Em preview, nunca reaproveitar: o que estiver na 5173 pode ser o dev server.
    reuseExistingServer: !process.env.CI && !PREVIEW,
  },
});

