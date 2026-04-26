# Arquitetura do Sistema - Site Pessoal Mauricio Yokoyama Issei

**Versão**: 2.0  
**Última Atualização**: 2026-02-16  
**Padrão**: Specification-Driven Development (SDD)

Este documento descreve a arquitetura completa do site pessoal, incluindo o **sistema de renderização dinâmica de CV**, infraestrutura AWS, e processo de build. Nossa arquitetura é focada em **performance (Load Time < 1s)**, **simplicidade**, **segurança** e **manutenibilidade**.

---

## 📋 Índice

1. [Visão Geral](#visão-geral)
2. [Arquitetura de Alto Nível](#arquitetura-de-alto-nível)
3. [Sistema de CV Dinâmico](#sistema-de-cv-dinâmico)
4. [Módulos JavaScript](#módulos-javascript)
5. [Estrutura do Código](#estrutura-do-código)
6. [Stack Tecnológico](#stack-tecnológico)
7. [Decisões de Arquitetura](#decisões-de-arquitetura)
8. [Processo de Build](#processo-de-build)
9. [Fluxo de Deploy](#fluxo-de-deploy)

---

## Visão Geral

O projeto é um **Multi-Page Application (MPA)** híbrido que combina:
- **Páginas estáticas** para conteúdo institucional
- **Renderização dinâmica** para o currículo profissional
- **Módulos ES6** para funcionalidades interativas

**Princípio Fundamental**: Entregar HTML + CSS puro com JavaScript progressivo apenas onde necessário.

---

## Arquitetura de Alto Nível

### Fluxo de Dados Completo

```
┌─────────────────────────────────────────────────────────────┐
│                    DEVELOPMENT FLOW                          │
└─────────────────────────────────────────────────────────────┘
                              │
                    ┌─────────▼─────────┐
                    │   Git Push (main)  │
                    └─────────┬─────────┘
                              │
                    ┌─────────▼─────────┐
                    │  GitHub Actions    │
                    │  (CI/CD Pipeline)  │
                    └─────────┬─────────┘
                              │
                    ┌─────────▼─────────┐
                    │   npm run build    │
                    │   (Vite Bundler)   │
                    └─────────┬─────────┘
                              │
                    ┌─────────▼─────────┐
                    │   dist/ folder     │
                    │   (Static Assets)  │
                    └─────────┬─────────┘
                              │
                    ┌─────────▼─────────┐
                    │   AWS S3 Bucket    │
                    │   (Origin Server)  │
                    └─────────┬─────────┘
                              │
                    ┌─────────▼─────────┐
                    │  CloudFront CDN    │
                    │  (Edge Locations)  │
                    └─────────┬─────────┘
                              │
                    ┌─────────▼─────────┐
                    │   Route 53 DNS     │
                    │  mauricio.issei... │
                    └─────────┬─────────┘
                              │
                    ┌─────────▼─────────┐
                    │   END USER         │
                    └───────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                    RUNTIME FLOW (CV)                         │
└─────────────────────────────────────────────────────────────┘

    Browser Loads index.html
              │
              ▼
    ┌──────────────────┐
    │  cv-renderer.js  │
    │  (ES6 Module)    │
    └────────┬─────────┘
             │
             ├─────── Primary ──────┐
             │                      │
             ▼                      ▼
    ┌─────────────────┐    ┌──────────────┐
    │  GitHub Raw URL │    │ Local Fallback│
    │  (cv.json)      │    │ (./cv.json)   │
    └────────┬────────┘    └──────┬───────┘
             │                     │
             └──────┬──────────────┘
                    │
                    ▼
          ┌──────────────────┐
          │  JSON Parsing     │
          │  Data Validation  │
          └────────┬─────────┘
                   │
                   ▼
          ┌──────────────────┐
          │  DOM Rendering    │
          │  (Template Literals)│
          └────────┬─────────┘
                   │
                   ▼
          ┌──────────────────┐
          │  Interactive UI   │
          │  (Modals, Animations)│
          └──────────────────┘
```

---

## Sistema de CV Dinâmico

### Especificação Funcional

**Objetivo**: Permitir atualizações do currículo sem rebuild/redeploy do site.

**Requisitos**:
1. ✅ Buscar dados de `cv.json` hospedado no GitHub
2. ✅ Fallback automático para versão local em caso de falha
3. ✅ Renderização client-side usando JavaScript vanilla
4. ✅ Suporte a estrutura STAR para projetos
5. ✅ Validação de dados antes da renderização
6. ✅ Tratamento de erros gracioso

### Componentes do Sistema

#### 1. Fonte de Dados (cv.json)

**Localização Primária**: `https://raw.githubusercontent.com/issei/curriculo/main/cv.json`  
**Localização Fallback**: `./cv.json` (local)

**Estrutura de Dados** (Schema):

```typescript
interface CVData {
  Nome: string;
  Titulo: string;
  ResumoHero: string;
  Resumo: string[];
  Habilidades: {
    [categoria: string]: string[];
  };
  Experiencia: ExperienciaItem[];
  Projetos: ProjetoItem[];
  Formacao_Academica: FormacaoItem[];
  Certificados: CertificadoItem[];
  Cursos_Alura: {
    [categoria: string]: string[];
  };
  Recomendacoes_Recebidas: RecomendacaoItem[];
  Contato: ContatoInfo;
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
```

#### 2. Motor de Renderização (cv-renderer.js)

**Responsabilidades**:
- Fetch de dados (GitHub → Local fallback)
- Parsing e validação de JSON
- Renderização de todas as seções do CV
- Gerenciamento de modais de projetos
- Setup de animações e interações

**Funções Principais**:

```javascript
// Função de inicialização
export function initCVRenderer(cvUrl: string): void

// Funções de renderização por seção
function renderHero(data: CVData): void
function renderAbout(data: CVData): void
function renderSkills(data: CVData): void
function renderExperience(data: CVData): void
function renderProjects(data: CVData): void
function renderEducation(data: CVData): void
function renderCertifications(data: CVData): void
function renderCourses(data: CVData): void
function renderRecommendations(data: CVData): void
function renderContact(data: CVData): void

// Funções auxiliares
function setupMobileMenu(): void
function setupScrollAnimations(): void
function setupModalEvents(): void
function openModal(triggerElement, index, data): void
function closeModal(): void
```

#### 3. Serviço GitHub (github-service.js)

**Responsabilidades**:
- Validação de tokens GitHub
- Leitura de arquivos via GitHub API
- Escrita de arquivos (para admin panel)
- Codificação/decodificação Base64 UTF-8

**API Pública**:

```javascript
class GitHubService {
  async validateToken(token: string): Promise<UserData>
  async getFile(token, owner, repo, path): Promise<{content, sha}>
  async updateFile(token, owner, repo, path, content, sha, message): Promise<Response>
}
```

#### 4. Configuração (config.js)

**Responsabilidades**:
- Armazenar credenciais GitHub
- Gerar URLs dinâmicas
- Definir fallbacks

**Estrutura**:

```javascript
export const GITHUB_CONFIG = {
  username: string,
  repository: string,
  branch: string,
  filePath: string,
  token: string
}

export function getGitHubRawUrl(): string
export const LOCAL_CV_URL: string
```

### Fluxo de Atualização do CV

**Método 1: Via GitHub (Recomendado)**
```
1. Editar cv.json no repo issei/curriculo
2. Commit + Push
3. Site busca automaticamente nova versão
4. Renderização instantânea (sem rebuild)
```

**Método 2: Via Admin Panel (Em Desenvolvimento)**
```
1. Acessar /admin.html
2. Autenticar com GitHub token
3. Editar conteúdo via UI
4. Salvar → GitHub API → Commit automático
```

**Método 3: Local (Fallback)**
```
1. Editar src/cv.json
2. npm run build
3. Deploy via GitHub Actions
```

---

## Módulos JavaScript

### Arquitetura Modular (ES6)

**Princípio**: Separação de responsabilidades com módulos independentes e testáveis.

```
src/js/
├── cv-renderer.js      # Motor de renderização do CV
├── github-service.js   # Cliente GitHub API
└── admin-ui.js         # Lógica do painel administrativo
```

### Padrões de Importação

**index.html**:
```html
<script type="module">
  import { initCVRenderer } from './js/cv-renderer.js';
  const CV_JSON_URL = './cv.json';
  initCVRenderer(CV_JSON_URL);
</script>
```

**admin.html**:
```html
<script type="module">
  import { GitHubService } from './js/github-service.js';
  import { GITHUB_CONFIG } from './config.js';
  // Admin logic...
</script>
```

### Gestão de Estado

**Abordagem**: Estado local por módulo, sem state management global.

- `cv-renderer.js`: Mantém `profileData` em closure
- `admin-ui.js`: Mantém `currentData` e `fileSha` em closure
- Comunicação via eventos DOM quando necessário

---

## Estrutura do Código

```
mauricio-site/
├── .github/
│   └── workflows/
│       └── deploy.yml          # CI/CD Pipeline (AWS OIDC)
│
├── docs/
│   └── specs/                  # Especificações SDD
│       ├── ARCHITECTURE.md     # Este documento
│       ├── CV_SYSTEM.md        # Spec do sistema de CV
│       ├── STYLE_GUIDE.md      # Guia de estilos
│       ├── TESTING_GUIDE.md    # Estratégia de testes
│       └── ...
│
├── public/                     # Assets estáticos (não processados)
│   ├── favicon.svg
│   ├── robots.txt
│   ├── site.webmanifest
│   ├── cv.json                 # Fallback local do CV
│   └── *.pdf, *.png, *.m4a
│
├── src/                        # Código-fonte (processado pelo Vite)
│   ├── index.html              # Landing page (CV dinâmico)
│   ├── index.template.html     # Template alternativo
│   ├── admin.html              # Painel administrativo
│   ├── admin-editor.html       # Editor de conteúdo
│   ├── proposta.html           # Propostas técnicas
│   ├── know.html               # Página de conhecimento
│   ├── life.html               # Timeline pessoal
│   ├── *.html                  # Outras páginas
│   │
│   ├── js/                     # Módulos JavaScript
│   │   ├── cv-renderer.js      # Motor de renderização
│   │   ├── github-service.js   # Cliente GitHub API
│   │   └── admin-ui.js         # Lógica administrativa
│   │
│   ├── config.js               # Configurações GitHub
│   ├── input.css               # Entrada Tailwind CSS
│   └── style.css               # Estilos customizados
│
├── dist/                       # Build de produção (gerado)
│   └── (arquivos otimizados)
│
├── vite.config.js              # Configuração do Vite
├── playwright.config.js        # Configuração de testes E2E
├── package.json                # Dependências e scripts
└── README.md                   # Documentação do projeto
```

---

## Stack Tecnológico

### Frontend

| Componente | Tecnologia | Versão | Função |
|:-----------|:-----------|:-------|:-------|
| **Markup** | HTML5 | - | Estrutura semântica e acessível |
| **Scripting** | JavaScript ES6+ | ES2022 | Módulos nativos, async/await, fetch API |
| **Estilização** | Tailwind CSS | v4.0 | Utility-first CSS framework |
| **Tipografia** | Google Fonts (Inter) | - | Fonte moderna e legível |
| **Ícones** | Font Awesome | 6.5.1 | Ícones vetoriais |

### Build & Tooling

| Componente | Tecnologia | Versão | Função |
|:-----------|:-----------|:-------|:-------|
| **Build Tool** | Vite | 6.0 | Bundler ultrarrápido com HMR |
| **CSS Processor** | @tailwindcss/vite | 4.0 | Plugin Tailwind para Vite |
| **File Globbing** | glob | 10.3 | Resolução de entradas HTML |
| **Sitemap** | vite-plugin-sitemap | 0.8 | Geração automática de sitemap.xml |

### Testing

| Componente | Tecnologia | Versão | Função |
|:-----------|:-----------|:-------|:-------|
| **E2E Testing** | Playwright | 1.58 | Testes cross-browser (Chromium, Firefox, WebKit) |

### DevOps & Infrastructure

| Componente | Tecnologia | Função |
|:-----------|:-----------|:-------|
| **CI/CD** | GitHub Actions | Pipeline automatizado |
| **Autenticação** | AWS OIDC | Auth sem credenciais hardcoded |
| **Hospedagem** | AWS S3 | Origin server para arquivos estáticos |
| **CDN** | AWS CloudFront | Distribuição global com HTTPS |
| **DNS** | AWS Route 53 | Gerenciamento de domínio |

### Analytics

| Componente | Tecnologia | Função |
|:-----------|:-----------|:-------|
| **Tag Manager** | Google Tag Manager | Gerenciamento de tags |
| **Analytics** | Google Analytics 4 | Análise de comportamento |

---

## Decisões de Arquitetura

### 1. Multi-Page Application (MPA) vs Single-Page Application (SPA)

**Decisão**: MPA  
**Rationale**:
- ✅ SEO perfeito (HTML estático indexável)
- ✅ Performance superior (sem hydration overhead)
- ✅ Simplicidade de manutenção
- ✅ Menor bundle size
- ❌ Não precisa de state management complexo

### 2. Renderização Client-Side para CV

**Decisão**: Client-side rendering para seção de CV  
**Rationale**:
- ✅ Permite atualizações sem rebuild
- ✅ Separação de dados e apresentação
- ✅ Facilita manutenção do conteúdo
- ⚠️ Trade-off: Pequeno delay no carregamento inicial (mitigado com fallback local)

### 3. ES6 Modules Nativos

**Decisão**: Usar `<script type="module">` sem transpilação para ES5  
**Rationale**:
- ✅ Suporte nativo em todos os browsers modernos (>95% cobertura)
- ✅ Code splitting automático
- ✅ Menor bundle size
- ✅ Melhor tree-shaking

### 4. Tailwind CSS v4

**Decisão**: Tailwind v4 com nova sintaxe `@import`  
**Rationale**:
- ✅ Zero-config (sem tailwind.config.js)
- ✅ Performance superior
- ✅ Sintaxe moderna e limpa
- ✅ Melhor integração com Vite

### 5. GitHub como CMS

**Decisão**: Usar GitHub como backend para cv.json  
**Rationale**:
- ✅ Versionamento automático
- ✅ Auditoria de mudanças
- ✅ Rollback fácil
- ✅ API robusta e gratuita
- ✅ Integração com CI/CD

### 6. AWS S3 + CloudFront

**Decisão**: Hospedagem em S3 com CDN CloudFront  
**Rationale**:
- ✅ Custo baixíssimo (~$1-2/mês)
- ✅ Performance global (edge locations)
- ✅ HTTPS nativo
- ✅ Alta disponibilidade (99.99% SLA)
- ✅ Escalabilidade automática

### 7. OIDC para Deploy

**Decisão**: GitHub Actions com OIDC (sem access keys)  
**Rationale**:
- ✅ Segurança superior (tokens temporários)
- ✅ Sem rotação manual de credenciais
- ✅ Auditoria via CloudTrail
- ✅ Princípio de menor privilégio

---

## Processo de Build

### Configuração do Vite (vite.config.js)

```javascript
import { defineConfig } from 'vite'
import { resolve, parse } from 'path';
import tailwindcss from '@tailwindcss/vite'
import { globSync } from 'glob';
import sitemap from 'vite-plugin-sitemap';

// Resolução automática de todos os HTMLs em src/
const htmlFiles = globSync('src/*.html');
const htmlInput = Object.fromEntries(
  htmlFiles.map(file => [
    parse(file).name,
    resolve(__dirname, file)
  ])
);

export default defineConfig({
  root: 'src',                    // Código-fonte em src/
  publicDir: '../public',         // Assets estáticos em public/
  build: {
    outDir: '../dist',            // Output em dist/
    emptyOutDir: true,            // Limpa dist/ antes do build
    target: 'esnext',             // Target ES2022+
    rollupOptions: {
      input: htmlInput,           // Múltiplos pontos de entrada
    },
  },
  plugins: [
    tailwindcss(),                // Processamento Tailwind CSS
    sitemap({                     // Geração de sitemap.xml
      hostname: 'https://mauricio.issei.com.br'
    })
  ]
})
```

### Otimizações Automáticas

**Vite aplica automaticamente**:
1. ✅ Minificação de HTML/CSS/JS
2. ✅ Tree-shaking (remoção de código não usado)
3. ✅ Code splitting (chunks otimizados)
4. ✅ Asset hashing (cache busting)
5. ✅ Compressão de imagens
6. ✅ Inlining de assets pequenos

### Scripts NPM

```json
{
  "scripts": {
    "dev": "vite --port 5173 --strictPort",
    "build": "vite build",
    "preview": "vite preview",
    "start": "npm run dev"
  }
}
```

---

## Fluxo de Deploy

### Pipeline CI/CD (GitHub Actions)

**Arquivo**: `.github/workflows/deploy.yml`

**Trigger**: Push para branch `main`

**Steps**:

```yaml
1. Checkout Repository
   ├─ actions/checkout@v4
   
2. Setup Node.js 20
   ├─ actions/setup-node@v4
   └─ Cache npm dependencies
   
3. Install Dependencies
   └─ npm install
   
4. Build Project
   └─ npm run build → dist/
   
5. Configure AWS Credentials (OIDC)
   ├─ aws-actions/configure-aws-credentials@v4
   ├─ Role ARN: ${{ secrets.AWS_ROLE_ARN }}
   └─ Region: ${{ secrets.AWS_REGION }}
   
6. Deploy to S3
   └─ aws s3 sync dist/ s3://${{ secrets.S3_BUCKET_NAME }} --delete
   
7. Invalidate CloudFront Cache
   └─ aws cloudfront create-invalidation --distribution-id ${{ secrets.CLOUDFRONT_DISTRIBUTION_ID }} --paths "/*"

### Protocolo de Manutenção Infra (AWS)

Para qualquer alteração manual ou correção de emergência na infraestrutura:
1. **Script de Terminal**: Todo Agent deve gerar um script shell (`.sh`) pronto para o **AWS CloudShell**.
2. **Consistência**: O script manual deve refletir as mesmas operações realizadas no CI/CD.
3. **MIME Types**: Operações de cópia para o S3 devem especificar explicitamente o `--content-type` quando não for padrão (ex: `.md`, `.txt`).
```

### Secrets Necessários

Configure em **GitHub Settings → Secrets and variables → Actions**:

| Secret | Descrição | Exemplo |
|:-------|:----------|:--------|
| `AWS_ROLE_ARN` | ARN da IAM Role com permissões S3/CloudFront | `arn:aws:iam::123456789012:role/GitHubActionsRole` |
| `AWS_REGION` | Região AWS | `us-east-1` |
| `S3_BUCKET_NAME` | Nome do bucket S3 | `mauricio-issei-site` |
| `CLOUDFRONT_DISTRIBUTION_ID` | ID da distribuição CloudFront | `E1234567890ABC` |

---

## Conformidade com SDD

Este documento segue os princípios de **Specification-Driven Development**:

✅ **Especificação Completa**: Todos os componentes estão documentados  
✅ **Decisões Justificadas**: Rationale para cada escolha arquitetural  
✅ **Diagramas Visuais**: Fluxos de dados ilustrados  
✅ **Versionamento**: Documento versionado e datado  
✅ **Referências Cruzadas**: Links para outras specs (STYLE_GUIDE.md, TESTING_GUIDE.md)  
✅ **Manutenibilidade**: Estrutura clara para futuras atualizações

---

**Próximos Passos**:
1. Ler `CV_SYSTEM.md` para detalhes do sistema de CV
2. Consultar `STYLE_GUIDE.md` antes de alterações de UI
3. Seguir `TESTING_GUIDE.md` para novos testes
4. Validar deploys contra `CICD_OIDC.md`
