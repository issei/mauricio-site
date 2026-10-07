# Guia de Testes - Estratégia de Qualidade

**Versão**: 2.0  
**Última Atualização**: 2026-02-16  
**Padrão**: Specification-Driven Development (SDD)

---

## 📋 Índice

1. [Visão Geral](#visão-geral)
2. [Estratégia de Testes](#estratégia-de-testes)
3. [Testes E2E com Playwright](#testes-e2e-com-playwright)
4. [Testes Unitários](#testes-unitários)
5. [Testes de Acessibilidade](#testes-de-acessibilidade)
6. [Testes de Performance](#testes-de-performance)
7. [Padrões e Convenções](#padrões-e-convenções)
8. [CI/CD Integration](#cicd-integration)

---

## Visão Geral

### Objetivo

Garantir que cada alteração no código não quebre a **experiência do usuário**, **SEO**, **acessibilidade** ou **performance**.

### Princípios

- ✅ **Testes como Especificação**: Testes documentam comportamento esperado
- ✅ **Fail Fast**: Detectar problemas o mais cedo possível
- ✅ **Cobertura Crítica**: Focar em fluxos críticos do usuário
- ✅ **Manutenibilidade**: Testes fáceis de entender e manter

### Pirâmide de Testes

```
        ┌─────────────┐
        │   Manual    │  (5%)
        │   Testing   │
        └─────────────┘
      ┌─────────────────┐
      │   E2E Tests     │  (20%)
      │   (Playwright)  │
      └─────────────────┘
    ┌───────────────────────┐
    │  Integration Tests    │  (30%)
    │  (API, Components)    │
    └───────────────────────┘
  ┌─────────────────────────────┐
  │     Unit Tests              │  (45%)
  │  (Functions, Modules)       │
  └─────────────────────────────┘
```

---

## Estratégia de Testes

### Níveis de Teste

| Nível | Ferramenta | Escopo | Frequência |
|:------|:-----------|:-------|:-----------|
| **Unit** | Jest / Vitest | Funções isoladas | A cada commit |
| **Integration** | Playwright | Módulos integrados | A cada PR |
| **E2E** | Playwright | Fluxos completos | A cada deploy |
| **Performance** | Lighthouse | Métricas web vitals | Semanal |
| **Acessibilidade** | axe-core | WCAG compliance | A cada PR |

### Cobertura Mínima

- **Código**: 70% (funções críticas: 90%)
- **Fluxos Críticos**: 100%
- **Páginas**: 100% (smoke tests)

---

## Testes E2E com Playwright

### Configuração

**Arquivo**: `playwright.config.js`

```javascript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: '.',
  testMatch: ['e2e/**/*.spec.js', 'tests/**/*.spec.js'],
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  
  use: {
    baseURL: 'http://localhost:5173',
    trace: 'on-first-retry',
  },
  
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  ],
  
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:5173',
    reuseExistingServer: !process.env.CI,
  },
});
```

### Regras de Ouro

#### 1. Critical Path Testing

**Regra**: Toda página nova deve ter um teste de carregamento (Status 200).

**Exemplo**:

```javascript
// tests/pages.spec.js
import { test, expect } from '@playwright/test';

const pages = [
  '/',
  '/admin.html',
  '/proposta.html',
  '/know.html',
  '/life.html'
];

test.describe('Smoke Tests - Todas as Páginas', () => {
  for (const page of pages) {
    test(`deve carregar ${page} com sucesso`, async ({ page: p }) => {
      const response = await p.goto(page);
      expect(response.status()).toBe(200);
    });
  }
});
```

#### 2. SEO Check

**Regra**: Validar se a tag `<title>` e `<meta description>` estão presentes.

**Exemplo**:

```javascript
// tests/seo.spec.js
import { test, expect } from '@playwright/test';

test.describe('SEO - Meta Tags', () => {
  test('index.html deve ter title e description', async ({ page }) => {
    await page.goto('/');
    
    // Title
    const title = await page.title();
    expect(title).toBeTruthy();
    expect(title.length).toBeGreaterThan(10);
    expect(title.length).toBeLessThan(60);
    
    // Meta Description
    const description = await page.getAttribute(
      'meta[name="description"]',
      'content'
    );
    expect(description).toBeTruthy();
    expect(description.length).toBeGreaterThan(50);
    expect(description.length).toBeLessThan(160);
  });
});
```

#### 3. Responsividade

**Regra**: Testar sempre em Desktop e Mobile (Pixel 5/iPhone).

**Exemplo**:

```javascript
// tests/responsive.spec.js
import { test, expect, devices } from '@playwright/test';

const viewports = [
  { name: 'Desktop', ...devices['Desktop Chrome'] },
  { name: 'Mobile', ...devices['Pixel 5'] },
  { name: 'Tablet', ...devices['iPad Pro'] }
];

test.describe('Responsividade', () => {
  for (const viewport of viewports) {
    test(`deve renderizar corretamente em ${viewport.name}`, async ({ browser }) => {
      const context = await browser.newContext(viewport);
      const page = await context.newPage();
      
      await page.goto('/');
      
      // Verificar elementos visíveis
      await expect(page.locator('#hero-content')).toBeVisible();
      await expect(page.locator('nav')).toBeVisible();
      
      // Screenshot para comparação visual
      await page.screenshot({
        path: `tests/screenshots/${viewport.name}.png`,
        fullPage: true
      });
      
      await context.close();
    });
  }
});
```

#### 4. No Broken Links

**Regra**: Verificar se os links internos não retornam 404.

**Exemplo**:

```javascript
// tests/links.spec.js
import { test, expect } from '@playwright/test';

test.describe('Validação de Links', () => {
  test('não deve ter links quebrados', async ({ page }) => {
    await page.goto('/');
    
    // Coletar todos os links internos
    const links = await page.$$eval('a[href^="/"], a[href^="./"]', 
      anchors => anchors.map(a => a.href)
    );
    
    // Testar cada link
    for (const link of links) {
      const response = await page.goto(link);
      expect(response.status()).not.toBe(404);
    }
  });
});
```

### Testes do Sistema de CV

```javascript
// tests/cv-system.spec.js
import { test, expect } from '@playwright/test';

test.describe('Sistema de CV Dinâmico', () => {
  test('deve carregar dados e renderizar todas as seções', async ({ page }) => {
    await page.goto('/');
    
    // Aguardar renderização
    await page.waitForSelector('#hero-content h1', { timeout: 5000 });
    
    // Verificar seções obrigatórias
    const sections = [
      '#hero-content',
      '#about-content',
      '#skills-container',
      '#experience-container',
      '#projects-container',
      '#education-container',
      '#certifications-container',
      '#courses-container',
      '#recommendations-container',
      '#contact-container'
    ];
    
    for (const selector of sections) {
      await expect(page.locator(selector)).toBeVisible();
    }
  });
  
  test('deve abrir e fechar modal de projeto', async ({ page }) => {
    await page.goto('/');
    
    // Aguardar projetos
    await page.waitForSelector('#projects-container .project-card');
    
    // Abrir modal
    await page.click('#projects-container .project-card button');
    const modal = page.locator('#project-modal');
    await expect(modal).toBeVisible();
    
    // Verificar conteúdo STAR
    await expect(modal.locator('#modal-project-situacao')).toBeVisible();
    await expect(modal.locator('#modal-project-tarefas')).toBeVisible();
    
    // Fechar com ESC
    await page.keyboard.press('Escape');
    await expect(modal).not.toBeVisible();
  });
  
  test('deve fazer fallback para cv.json local em caso de erro', async ({ page }) => {
    // Interceptar requisição GitHub e forçar erro
    await page.route('**/raw.githubusercontent.com/**', route => {
      route.abort('failed');
    });
    
    await page.goto('/');
    
    // Deve carregar dados locais
    await page.waitForSelector('#hero-content h1');
    const name = await page.textContent('#hero-content h1');
    expect(name).toBeTruthy();
  });
});
```

### Comandos Úteis

```bash
# Rodar todos os testes
npx playwright test

# Rodar em modo UI (interativo)
npx playwright test --ui

# Rodar apenas um arquivo
npx playwright test tests/cv-system.spec.js

# Rodar em browser específico
npx playwright test --project=chromium

# Debug mode
npx playwright test --debug

# Gerar relatório
npx playwright show-report
```

---

## Testes Unitários

### Configuração (Vitest)

**Arquivo**: `vitest.config.js`

```javascript
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'dist/',
        '**/*.spec.js'
      ]
    }
  }
});
```

### Exemplo de Teste Unitário

```javascript
// tests/unit/cv-renderer.test.js
import { describe, test, expect, beforeEach } from 'vitest';
import { renderHero, renderProjects } from '../../src/js/cv-renderer.js';

describe('cv-renderer', () => {
  beforeEach(() => {
    // Setup DOM
    document.body.innerHTML = `
      <div id="hero-content"></div>
      <div id="projects-container"></div>
    `;
  });
  
  describe('renderHero', () => {
    test('deve renderizar nome e título', () => {
      const mockData = {
        Nome: 'João Silva',
        Titulo: 'Desenvolvedor Full Stack',
        ResumoHero: 'Apaixonado por tecnologia'
      };
      
      renderHero(mockData);
      
      const container = document.getElementById('hero-content');
      expect(container.innerHTML).toContain('João Silva');
      expect(container.innerHTML).toContain('Desenvolvedor Full Stack');
    });
    
    test('não deve quebrar com dados ausentes', () => {
      const mockData = {
        Nome: 'João Silva'
      };
      
      expect(() => renderHero(mockData)).not.toThrow();
    });
  });
  
  describe('renderProjects', () => {
    test('deve criar cards para cada projeto', () => {
      const mockData = {
        Projetos: [
          { Nome: 'Projeto A', Empresa: 'Empresa X', Periodo: '2023' },
          { Nome: 'Projeto B', Empresa: 'Empresa Y', Periodo: '2024' }
        ]
      };
      
      renderProjects(mockData);
      
      const cards = document.querySelectorAll('.project-card');
      expect(cards.length).toBe(2);
    });
  });
});
```

---

## Testes de Acessibilidade

### Usando axe-core

```javascript
// tests/a11y.spec.js
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Acessibilidade (WCAG AA)', () => {
  test('index.html deve passar em testes de acessibilidade', async ({ page }) => {
    await page.goto('/');
    
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze();
    
    expect(accessibilityScanResults.violations).toEqual([]);
  });
  
  test('modal deve ser acessível por teclado', async ({ page }) => {
    await page.goto('/');
    
    // Navegar até botão com Tab
    await page.keyboard.press('Tab');
    // ... navegar até botão de projeto
    
    // Abrir modal com Enter
    await page.keyboard.press('Enter');
    
    // Verificar foco no título do modal
    const focusedElement = await page.evaluate(() => document.activeElement.id);
    expect(focusedElement).toBe('modal-project-name');
  });
});
```

---

## Testes de Performance

### Lighthouse CI

```javascript
// lighthouserc.js
module.exports = {
  ci: {
    collect: {
      url: ['http://localhost:5173/'],
      numberOfRuns: 3,
    },
    assert: {
      assertions: {
        'categories:performance': ['error', { minScore: 0.9 }],
        'categories:accessibility': ['error', { minScore: 0.9 }],
        'categories:best-practices': ['error', { minScore: 0.9 }],
        'categories:seo': ['error', { minScore: 0.9 }],
        'first-contentful-paint': ['error', { maxNumericValue: 2000 }],
        'largest-contentful-paint': ['error', { maxNumericValue: 2500 }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }],
      },
    },
  },
};
```

---

## Padrões e Convenções

### Nomenclatura de Testes

```javascript
// ✅ BOM
test('deve renderizar hero com dados válidos', () => {});
test('não deve quebrar com array vazio', () => {});

// ❌ RUIM
test('test1', () => {});
test('hero', () => {});
```

### Estrutura de Testes

```javascript
describe('Módulo/Componente', () => {
  describe('Função/Método', () => {
    test('deve fazer X quando Y', () => {
      // Arrange (preparar)
      const input = { ... };
      
      // Act (executar)
      const result = funcao(input);
      
      // Assert (verificar)
      expect(result).toBe(expected);
    });
  });
});
```

### Mocks e Stubs

```javascript
// Mock de fetch
global.fetch = vi.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ data: 'mock' })
  })
);

// Restaurar após teste
afterEach(() => {
  vi.restoreAllMocks();
});
```

---

## CI/CD Integration

### GitHub Actions Workflow

Fonte da verdade: [`.github/workflows/quality-gate.yml`](../../.github/workflows/quality-gate.yml).

| Job | O que roda | Paralelismo |
| :--- | :--- | :--- |
| `static` | `node scripts/quality-gate.mjs --no-e2e`: build, geradores `--check`, i18n, `audit-site`, `node --test`, varredura a11y (catraca), a11y estático, perf | 1 runner, em paralelo aos shards |
| `e2e` | `npx playwright test --shard=i/6` | 6 runners × 2 workers |
| `report` | `playwright merge-reports` dos blobs → artefato `playwright-report` | — |
| `gate` | Check único para a branch protection: verde só se `static` e todos os shards passaram | — |

**Camadas (por projeto Playwright, não por tag):**

| Gatilho | Camada | Projetos |
| :--- | :--- | :--- |
| `pull_request` | `fast` | `chromium`, `mobile`, `no-js` |
| `push` na `main`, nightly (03:00 BRT), manual | `full` | + `firefox`, `webkit` |

Regressão exclusiva de Firefox/WebKit aparece no push da `main` ou no nightly, não no PR.
Para cobrar os 3 navegadores antes do merge, rode `npm run gate` localmente (roda tudo).

Reproduzir um shard: `CI=1 npx playwright test --shard=3/6 --project=chromium --project=mobile --project=no-js`.

---

## Comando de Vibe Coding

**Prompt para Agente**:

> "Agente, analise a nova página `servicos.html` e gere um arquivo de teste em `tests/servicos.spec.js` seguindo o padrão definido em `docs/specs/TESTING_GUIDE.md`. O teste deve incluir: smoke test (status 200), validação de SEO (title e description), teste de responsividade (desktop e mobile), e verificação de links internos."

---

## Conformidade com SDD

✅ **Estratégia Documentada**: Níveis e ferramentas definidos  
✅ **Padrões Estabelecidos**: Nomenclatura e estrutura  
✅ **Exemplos Práticos**: Código real e executável  
✅ **Integração CI/CD**: Automação completa  
✅ **Cobertura Definida**: Metas claras de qualidade

---

**Referências**:
- `ARCHITECTURE.md` - Arquitetura do sistema
- `CV_SYSTEM.md` - Especificação do sistema de CV
- [Playwright Docs](https://playwright.dev/)
- [Vitest Docs](https://vitest.dev/)