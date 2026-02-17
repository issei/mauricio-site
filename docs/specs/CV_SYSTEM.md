# Sistema de CV Dinâmico - Especificação Técnica

**Versão**: 1.0  
**Última Atualização**: 2026-02-16  
**Padrão**: Specification-Driven Development (SDD)  
**Relacionado**: ARCHITECTURE.md

---

## 📋 Índice

1. [Visão Geral](#visão-geral)
2. [Requisitos Funcionais](#requisitos-funcionais)
3. [Requisitos Não-Funcionais](#requisitos-não-funcionais)
4. [Arquitetura do Sistema](#arquitetura-do-sistema)
5. [Especificação de Dados](#especificação-de-dados)
6. [API de Renderização](#api-de-renderização)
7. [Tratamento de Erros](#tratamento-de-erros)
8. [Casos de Uso](#casos-de-uso)
9. [Testes](#testes)

---

## Visão Geral

O **Sistema de CV Dinâmico** permite atualizar o conteúdo do currículo profissional sem necessidade de rebuild ou redeploy do site. O sistema busca dados de um arquivo JSON hospedado no GitHub e renderiza dinamicamente todas as seções do CV.

### Objetivos

- ✅ **Agilidade**: Atualizar CV em minutos, não horas
- ✅ **Confiabilidade**: Fallback automático em caso de falha
- ✅ **Manutenibilidade**: Separação clara entre dados e apresentação
- ✅ **Performance**: Carregamento rápido mesmo com renderização client-side
- ✅ **Versionamento**: Histórico completo de mudanças via Git

---

## Requisitos Funcionais

### RF-001: Busca de Dados

**Descrição**: O sistema deve buscar dados do CV de uma fonte externa (GitHub) com fallback local.

**Critérios de Aceitação**:
- [ ] Tentar buscar de `https://raw.githubusercontent.com/issei/curriculo/main/cv.json`
- [ ] Em caso de erro (network, 404, timeout), usar `./cv.json` local
- [ ] Timeout máximo de 5 segundos para fetch primário
- [ ] Logging de erros no console para debug

**Prioridade**: Alta

---

### RF-002: Renderização de Seções

**Descrição**: O sistema deve renderizar todas as seções do CV dinamicamente.

**Seções Obrigatórias**:
1. Hero (Nome, Título, Resumo)
2. Sobre Mim
3. Habilidades (por categoria)
4. Experiência Profissional (timeline)
5. Projetos (com modais STAR)
6. Formação Acadêmica
7. Certificações
8. Cursos (Alura)
9. Recomendações
10. Contato

**Critérios de Aceitação**:
- [ ] Cada seção deve ter função de renderização dedicada
- [ ] Renderização deve usar template literals para HTML
- [ ] Dados ausentes não devem quebrar a renderização
- [ ] Seções vazias devem ser ocultadas graciosamente

**Prioridade**: Alta

---

### RF-003: Modais de Projetos

**Descrição**: Projetos devem abrir em modal com detalhes completos (metodologia STAR).

**Critérios de Aceitação**:
- [ ] Click em "Saiba Mais" abre modal
- [ ] Modal exibe: Situação, Tarefas, Ações, Resultados, Tecnologias
- [ ] Fechar modal com: botão X, click fora, tecla ESC
- [ ] Foco retorna ao elemento que abriu o modal
- [ ] Scroll da página desabilitado quando modal aberto

**Prioridade**: Média

---

### RF-004: Animações de Scroll

**Descrição**: Seções devem animar ao entrar no viewport.

**Critérios de Aceitação**:
- [ ] Usar Intersection Observer API
- [ ] Threshold de 10% (0.1)
- [ ] Adicionar classe `.is-visible` quando visível
- [ ] Animação fade-in + translateY

**Prioridade**: Baixa

---

### RF-005: Menu Mobile

**Descrição**: Menu responsivo para dispositivos móveis.

**Critérios de Aceitação**:
- [ ] Botão hamburger visível em telas < 768px
- [ ] Toggle de visibilidade do menu
- [ ] Fechar menu ao clicar em link
- [ ] Atributo `aria-expanded` atualizado

**Prioridade**: Alta

---

## Requisitos Não-Funcionais

### RNF-001: Performance

- **Tempo de Carregamento**: < 2s para renderização completa
- **First Contentful Paint**: < 1s
- **Largest Contentful Paint**: < 2.5s
- **Bundle Size**: cv-renderer.js < 20KB (minificado)

### RNF-002: Compatibilidade

- **Browsers**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Dispositivos**: Desktop, Tablet, Mobile
- **Resoluções**: 320px a 2560px

### RNF-003: Acessibilidade

- **WCAG**: Nível AA
- **Navegação por Teclado**: Completa
- **Screen Readers**: Compatível
- **ARIA Labels**: Presentes em elementos interativos

### RNF-004: Segurança

- **XSS Protection**: Sanitização de conteúdo HTML
- **HTTPS Only**: Todas as requisições via HTTPS
- **Token GitHub**: Não exposto no client-side (apenas para admin)

---

## Arquitetura do Sistema

### Componentes

```
┌─────────────────────────────────────────────────┐
│              SISTEMA DE CV DINÂMICO              │
└─────────────────────────────────────────────────┘

┌──────────────────┐
│  index.html      │
│  (Entry Point)   │
└────────┬─────────┘
         │
         │ <script type="module">
         ▼
┌──────────────────────────┐
│  cv-renderer.js          │
│  ┌────────────────────┐  │
│  │ initCVRenderer()   │  │
│  └────────┬───────────┘  │
│           │              │
│           ├─ fetch()     │
│           ├─ renderAll() │
│           ├─ setupUI()   │
│           └─ events      │
└──────────┬───────────────┘
           │
           ├──────────────┐
           │              │
           ▼              ▼
    ┌──────────┐   ┌──────────┐
    │ GitHub   │   │  Local   │
    │ cv.json  │   │ cv.json  │
    └──────────┘   └──────────┘
```

### Fluxo de Execução

```javascript
// 1. Inicialização
document.addEventListener('DOMContentLoaded', () => {
  initCVRenderer(CV_JSON_URL);
});

// 2. Fetch de Dados
async function fetchCVData(url) {
  try {
    const response = await fetch(url, { timeout: 5000 });
    return await response.json();
  } catch (error) {
    // Fallback
    return await fetch('./cv.json').then(r => r.json());
  }
}

// 3. Renderização
function renderAll(data) {
  renderHero(data);
  renderAbout(data);
  renderSkills(data);
  // ... outras seções
  setupMobileMenu();
  setupScrollAnimations();
  setupModalEvents();
}

// 4. Interatividade
function setupModalEvents() {
  window.openModal = (element, index) => { /* ... */ };
  window.closeModal = () => { /* ... */ };
}
```

---

## Especificação de Dados

### Schema JSON (cv.json)

```typescript
interface CVData {
  // Informações Básicas
  Nome: string;
  Titulo: string;
  ResumoHero: string;
  Resumo: string[];

  // Habilidades
  Habilidades: {
    [categoria: string]: string[];
  };

  // Experiência
  Experiencia: ExperienciaItem[];

  // Projetos
  Projetos: ProjetoItem[];

  // Educação
  Formacao_Academica: FormacaoItem[];
  Certificados: CertificadoItem[];
  Cursos_Alura: {
    [categoria: string]: string[];
  };

  // Social
  Recomendacoes_Recebidas: RecomendacaoItem[];
  Contato: ContatoInfo;
}

interface ExperienciaItem {
  Cargo: string;
  Empresa: string;
  Periodo: string;
  Local: string;
  Descricao: string;
  Resultados?: string[];
  Principais_Projetos?: string[];
  Competencias?: string[];
}

interface ProjetoItem {
  Nome: string;
  Empresa: string;
  Periodo: string;
  Situacao: string;        // STAR: Situation
  Tarefas: string[];       // STAR: Task
  Acoes: string[];         // STAR: Action
  Resultados: string[];    // STAR: Result
  Tecnologias: string[];
}

interface FormacaoItem {
  Curso: string;
  Instituicao: string;
  Periodo?: string;
  Ano?: string;
  Diploma_Digital_Codigo?: string;
  Verificacao?: string;    // URL
}

interface CertificadoItem {
  Nome: string;
  Instituicao: string;
  Data_Emissao?: string;
  Ano?: string;
  Periodo?: string;
  Verificacao?: string;    // URL
}

interface RecomendacaoItem {
  Recomendacao: string;
  Autor: string;
  Cargo: string;
  Data_Trabalho: string;
}

interface ContatoInfo {
  Email: string;
  LinkedIn: string;
  LinkedInUser: string;
  youtube: string;
}
```

### Exemplo de Dados

```json
{
  "Nome": "Maurício Yokoyama Issei",
  "Titulo": "Tech Lead | Especialista em Análise de Sistemas",
  "ResumoHero": "Mais de 20 anos de experiência em desenvolvimento...",
  "Resumo": [
    "Profissional com vasta experiência...",
    "Especialista em arquitetura de soluções..."
  ],
  "Habilidades": {
    "Linguagens_de_Programacao": ["Python", "JavaScript", "SQL"],
    "Frameworks_e_Bibliotecas": ["React", "Node.js", "Django"],
    "Cloud_e_DevOps": ["AWS", "Docker", "Kubernetes"]
  },
  "Experiencia": [
    {
      "Cargo": "Tech Lead",
      "Empresa": "Empresa XYZ",
      "Periodo": "2020 - Presente",
      "Local": "São Paulo, SP",
      "Descricao": "Liderança técnica de equipe de 10 desenvolvedores...",
      "Resultados": [
        "Redução de 40% no tempo de deploy",
        "Aumento de 30% na cobertura de testes"
      ],
      "Principais_Projetos": [
        "Migração para microserviços",
        "Implementação de CI/CD"
      ],
      "Competencias": ["Python", "AWS", "Kubernetes"]
    }
  ],
  "Projetos": [
    {
      "Nome": "Sistema de Vendas em Tempo Real",
      "Empresa": "Empresa ABC",
      "Periodo": "2023",
      "Situacao": "Sistema legado com alta latência afetando vendas",
      "Tarefas": ["Analisar gargalos", "Propor arquitetura"],
      "Acoes": ["Implementei cache Redis", "Otimizei queries SQL"],
      "Resultados": ["Latência reduzida em 80%", "Aumento de 25% em vendas"],
      "Tecnologias": ["Python", "Redis", "PostgreSQL"]
    }
  ],
  "Contato": {
    "Email": "contato@example.com",
    "LinkedIn": "https://linkedin.com/in/mauricioissei",
    "LinkedInUser": "mauricioissei",
    "youtube": "https://youtube.com/@MauricioIssei"
  }
}
```

---

## API de Renderização

### Função Principal

```javascript
/**
 * Inicializa o sistema de renderização do CV
 * @param {string} cvUrl - URL do arquivo cv.json
 */
export function initCVRenderer(cvUrl) {
  document.addEventListener('DOMContentLoaded', () => {
    console.log(`🔄 Carregando dados de: ${cvUrl}`);
    
    fetch(cvUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        profileData = data;
        console.log('✅ Dados carregados com sucesso!');
        renderAll(profileData);
        exposeGlobalFunctions();
      })
      .catch(error => {
        console.error('❌ Erro ao carregar dados:', error);
        handleFallback();
      });
  });
}
```

### Funções de Renderização

```javascript
/**
 * Renderiza a seção Hero
 * @param {CVData} data - Dados do CV
 */
function renderHero(data) {
  const container = document.getElementById('hero-content');
  if (!container) return;
  
  container.innerHTML = `
    <h1 class="text-5xl md:text-7xl font-extrabold mb-4 leading-tight">
      ${data.Nome}
    </h1>
    <p class="text-2xl md:text-4xl font-light mb-8 text-blue-300">
      ${data.Titulo}
    </p>
    <p class="text-lg md:text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
      ${data.ResumoHero}
    </p>
    <!-- Botões de ação -->
  `;
}

/**
 * Renderiza a seção de Projetos
 * @param {CVData} data - Dados do CV
 */
function renderProjects(data) {
  const container = document.getElementById('projects-container');
  if (!container) return;
  container.innerHTML = '';
  
  data.Projetos.forEach((project, index) => {
    const projectCard = document.createElement('div');
    projectCard.className = 'project-card bg-gray-700 p-6 rounded-lg shadow-md';
    projectCard.innerHTML = `
      <h3 class="text-xl font-semibold text-white mb-2">${project.Nome}</h3>
      <p class="text-blue-300 text-sm mb-2">${project.Empresa} (${project.Periodo})</p>
      <p class="text-gray-300 text-sm mb-4">${project.Situacao.substring(0, 120)}...</p>
      <button onclick="openModal(this, ${index})" class="btn-secondary mt-4">
        Saiba Mais
      </button>
    `;
    container.appendChild(projectCard);
  });
}
```

---

## Tratamento de Erros

### Estratégia de Fallback

```javascript
function handleFallback() {
  if (cvUrl !== './cv.json') {
    console.log('🔄 Tentando fallback para cv.json local...');
    fetch('./cv.json')
      .then(response => response.json())
      .then(data => {
        profileData = data;
        console.log('✅ Dados locais carregados com sucesso!');
        renderAll(profileData);
      })
      .catch(err => {
        console.error('❌ Erro no fallback:', err);
        showErrorMessage();
      });
  } else {
    showErrorMessage();
  }
}

function showErrorMessage() {
  alert('Erro ao carregar dados do currículo. Recarregue a página.');
}
```

### Validação de Dados

```javascript
function validateCVData(data) {
  const required = ['Nome', 'Titulo', 'Contato'];
  const missing = required.filter(field => !data[field]);
  
  if (missing.length > 0) {
    console.warn(`⚠️ Campos obrigatórios ausentes: ${missing.join(', ')}`);
    return false;
  }
  
  return true;
}
```

---

## Casos de Uso

### UC-001: Atualizar CV via GitHub

**Ator**: Maurício (Proprietário)

**Pré-condições**:
- Acesso ao repositório `issei/curriculo`
- Arquivo `cv.json` existe

**Fluxo Principal**:
1. Maurício edita `cv.json` no GitHub
2. Faz commit das alterações
3. Usuário acessa o site
4. Sistema busca nova versão do GitHub
5. CV é renderizado com dados atualizados

**Pós-condições**:
- CV exibe informações atualizadas
- Sem necessidade de redeploy

---

### UC-002: Visualizar Detalhes de Projeto

**Ator**: Visitante do Site

**Pré-condições**:
- Site carregado com sucesso
- Seção de projetos renderizada

**Fluxo Principal**:
1. Visitante clica em "Saiba Mais" em um projeto
2. Modal abre com detalhes completos
3. Visitante lê informações STAR
4. Visitante fecha modal (X, ESC, ou click fora)

**Pós-condições**:
- Modal fechado
- Foco retorna ao botão

---

## Testes

### Testes Unitários

```javascript
// cv-renderer.test.js
describe('CV Renderer', () => {
  test('deve renderizar hero com dados válidos', () => {
    const mockData = {
      Nome: 'Teste',
      Titulo: 'Dev',
      ResumoHero: 'Resumo'
    };
    
    renderHero(mockData);
    
    const container = document.getElementById('hero-content');
    expect(container.innerHTML).toContain('Teste');
    expect(container.innerHTML).toContain('Dev');
  });
  
  test('deve fazer fallback em caso de erro', async () => {
    global.fetch = jest.fn()
      .mockRejectedValueOnce(new Error('Network error'))
      .mockResolvedValueOnce({
        json: () => Promise.resolve({ Nome: 'Local' })
      });
    
    await initCVRenderer('https://invalid-url.com/cv.json');
    
    expect(fetch).toHaveBeenCalledTimes(2);
  });
});
```

### Testes E2E (Playwright)

```javascript
// cv-system.spec.js
import { test, expect } from '@playwright/test';

test.describe('Sistema de CV Dinâmico', () => {
  test('deve carregar e renderizar CV completo', async ({ page }) => {
    await page.goto('/');
    
    // Aguardar renderização
    await page.waitForSelector('#hero-content h1');
    
    // Verificar seções principais
    await expect(page.locator('#hero-content')).toBeVisible();
    await expect(page.locator('#about-content')).toBeVisible();
    await expect(page.locator('#skills-container')).toBeVisible();
    await expect(page.locator('#experience-container')).toBeVisible();
    await expect(page.locator('#projects-container')).toBeVisible();
  });
  
  test('deve abrir modal de projeto', async ({ page }) => {
    await page.goto('/');
    
    // Click no primeiro projeto
    await page.click('#projects-container .project-card button');
    
    // Verificar modal aberto
    const modal = page.locator('#project-modal');
    await expect(modal).toBeVisible();
    
    // Verificar conteúdo STAR
    await expect(modal.locator('#modal-project-situacao')).toBeVisible();
    await expect(modal.locator('#modal-project-tarefas')).toBeVisible();
    await expect(modal.locator('#modal-project-acoes')).toBeVisible();
    await expect(modal.locator('#modal-project-resultados')).toBeVisible();
  });
  
  test('deve fechar modal com ESC', async ({ page }) => {
    await page.goto('/');
    await page.click('#projects-container .project-card button');
    
    // Pressionar ESC
    await page.keyboard.press('Escape');
    
    // Verificar modal fechado
    const modal = page.locator('#project-modal');
    await expect(modal).not.toBeVisible();
  });
});
```

---

## Conformidade com SDD

✅ **Requisitos Documentados**: Funcionais e não-funcionais  
✅ **Casos de Uso**: Fluxos principais mapeados  
✅ **Schema de Dados**: Estrutura completa em TypeScript  
✅ **API Especificada**: Funções públicas documentadas  
✅ **Testes Definidos**: Unitários e E2E  
✅ **Tratamento de Erros**: Estratégias documentadas

---

**Referências**:
- `ARCHITECTURE.md` - Arquitetura geral do sistema
- `TESTING_GUIDE.md` - Estratégia de testes
- `STYLE_GUIDE.md` - Padrões de UI/UX
