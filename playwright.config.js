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
  workers: process.env.CI ? 1 : '50%',
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    baseURL: 'http://localhost:5173',

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
      testIgnore: ['**/apresentacao.mobile.spec.js', '**/apresentacao.nojs.spec.js', '**/formulacao.nojs.spec.js'],
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
      testIgnore: ['**/apresentacao.mobile.spec.js', '**/apresentacao.nojs.spec.js', '**/formulacao.nojs.spec.js'],
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
      testIgnore: ['**/apresentacao.mobile.spec.js', '**/apresentacao.nojs.spec.js', '**/formulacao.nojs.spec.js'],
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
    },
    {
      // Degradação sem JavaScript (spec §4.2) — antes, inverificável
      name: 'no-js',
      use: { ...devices['Desktop Chrome'], javaScriptEnabled: false },
      testMatch: ['tests/apresentacao.nojs.spec.js', 'tests/formulacao.nojs.spec.js'],
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

  /* Run your local dev server before starting the tests */
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:5173',
    reuseExistingServer: !process.env.CI,
  },
});

