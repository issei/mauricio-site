# 🌐 Maurício Yokoyama Issei - Site Pessoal e Portfólio Profissional

[![Deploy Status](https://img.shields.io/badge/deploy-AWS%20S3%20%2B%20CloudFront-orange)](https://mauricio.issei.com.br)
[![Built with Vite](https://img.shields.io/badge/built%20with-Vite-646CFF?logo=vite)](https://vitejs.dev/)
[![Styled with Tailwind CSS](https://img.shields.io/badge/styled%20with-Tailwind%20CSS-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![Tested with Playwright](https://img.shields.io/badge/tested%20with-Playwright-2EAD33?logo=playwright)](https://playwright.dev/)

Site pessoal e portfólio profissional desenvolvido com arquitetura moderna e **renderização dinâmica de currículo**. O projeto permite atualizar o conteúdo do CV sem necessidade de novos deploys, consumindo dados de um arquivo JSON hospedado no GitHub ou localmente.

🔗 **Site em produção**: [https://mauricio.issei.com.br](https://mauricio.issei.com.br)

---

## 📋 Índice

- [Visão Geral](#-visão-geral)
- [Funcionalidades](#-funcionalidades)
- [Arquitetura](#-arquitetura)
- [Tecnologias](#️-tecnologias)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Instalação e Execução](#-instalação-e-execução)
- [Build e Deploy](#-build-e-deploy)
- [Sistema de CV Dinâmico](#-sistema-de-cv-dinâmico)
- [Testes](#-testes)
- [CI/CD](#-cicd)
- [Configuração](#️-configuração)
- [Contribuindo](#-contribuindo)
- [Licença](#-licença)

---

## 🎯 Visão Geral

Este projeto é um **site pessoal profissional** que funciona como vitrine de habilidades, experiências e projetos. A principal característica é o **sistema de renderização dinâmica de currículo**, que permite:

- ✅ Atualizar o conteúdo do CV editando apenas um arquivo JSON
- ✅ Hospedar o JSON no GitHub para atualizações sem redeploy
- ✅ Fallback automático para versão local em caso de falha
- ✅ Interface administrativa para gerenciar conteúdo (em desenvolvimento)

---

## ✨ Funcionalidades

### 🔄 Renderização Dinâmica de CV

O site consome um arquivo `cv.json` (hospedado no GitHub ou localmente) e gera automaticamente:

- **Hero Section**: Nome, título e resumo profissional
- **Sobre Mim**: Biografia e apresentação pessoal
- **Habilidades**: Competências técnicas organizadas por categoria
- **Experiência Profissional**: Timeline interativa com cargos, empresas e resultados
- **Projetos**: Cards com modais detalhados usando metodologia STAR
- **Formação Acadêmica**: Diplomas e certificações com verificação digital
- **Cursos**: Capacitações e treinamentos (Alura, etc.)
- **Recomendações**: Depoimentos de colegas e líderes
- **Contato**: Links para email, LinkedIn e YouTube

### 🎨 Design e UX

- **Responsivo**: Layout adaptável para mobile, tablet e desktop
- **Modo Escuro**: Design elegante com paleta de cores escuras
- **Animações**: Transições suaves e micro-interações
- **Acessibilidade**: Estrutura semântica e navegação por teclado
- **Performance**: Otimizado com lazy loading e code splitting

### 📄 Páginas Especiais

- **Propostas Técnicas**: Páginas dedicadas para apresentações de consultoria
- **Diagnóstico**: Ferramentas interativas para análise
- **Admin Panel**: Interface para gerenciamento de conteúdo (em desenvolvimento)

---

## 🏗️ Arquitetura

### Fluxo de Dados do CV

```
┌─────────────────┐
│  GitHub Repo    │
│  (cv.json)      │
└────────┬────────┘
         │
         │ Fetch (Primary)
         ▼
┌─────────────────────────┐
│  cv-renderer.js         │
│  (Renderização)         │
└────────┬────────────────┘
         │
         │ Fallback on Error
         ▼
┌─────────────────┐
│  Local cv.json  │
│  (Backup)       │
└─────────────────┘
         │
         ▼
┌─────────────────────────┐
│  DOM (HTML Dinâmico)    │
└─────────────────────────┘
```

### Componentes Principais

1. **cv-renderer.js**: Motor de renderização que transforma JSON em HTML
2. **github-service.js**: Cliente para API do GitHub (validação, leitura, escrita)
3. **admin-ui.js**: Lógica da interface administrativa
4. **config.js**: Configurações do repositório GitHub e URLs

---

## 🛠️ Tecnologias

### Frontend

- **HTML5**: Estrutura semântica e acessível
- **JavaScript (ES6+)**: Módulos nativos, async/await, fetch API
- **Tailwind CSS v4**: Framework de estilização utilitária
- **Google Fonts (Inter)**: Tipografia moderna

### Build & Tooling

- **Vite 6**: Build tool ultrarrápido com HMR
- **Glob**: Geração automática de entradas HTML
- **vite-plugin-sitemap**: Geração automática de sitemap.xml

### Testing

- **Playwright**: Testes E2E cross-browser (Chromium, Firefox, WebKit)

### DevOps & Deploy

- **GitHub Actions**: CI/CD automatizado
- **AWS S3**: Hospedagem de arquivos estáticos
- **AWS CloudFront**: CDN global com HTTPS
- **AWS OIDC**: Autenticação sem credenciais hardcoded

### Analytics

- **Google Tag Manager**: Gerenciamento de tags
- **Google Analytics 4**: Análise de comportamento

---

## 📂 Estrutura do Projeto

```
mauricio-site/
├── .github/
│   └── workflows/
│       └── deploy.yml          # CI/CD para AWS
├── public/                     # Arquivos estáticos
│   ├── favicon.svg
│   ├── robots.txt
│   ├── site.webmanifest
│   ├── arq-proposta.png
│   └── *.pdf, *.m4a           # Documentos e áudios
├── src/                        # Código-fonte
│   ├── index.html             # Página principal
│   ├── index.template.html    # Template (se usado em build)
│   ├── cv.json                # Dados do currículo (fallback local)
│   ├── config.js              # Configurações GitHub
│   ├── input.css              # Entrada Tailwind
│   ├── style.css              # Estilos customizados
│   ├── js/
│   │   ├── cv-renderer.js     # Motor de renderização
│   │   ├── github-service.js  # Cliente GitHub API
│   │   └── admin-ui.js        # Lógica do admin
│   ├── admin.html             # Painel administrativo
│   ├── admin-editor.html      # Editor de conteúdo
│   ├── proposta.html          # Propostas técnicas
│   ├── know.html              # Página de conhecimento
│   ├── life.html              # Linha do tempo pessoal
│   └── *.html                 # Outras páginas
├── dist/                       # Build de produção (gerado)
├── node_modules/               # Dependências (ignorado)
├── .gitignore
├── package.json
├── package-lock.json
├── vite.config.js             # Configuração do Vite
├── playwright.config.js       # Configuração do Playwright
└── README.md
```

---

## ⚡ Instalação e Execução

### Pré-requisitos

- **Node.js** v18+ (recomendado v20)
- **npm** v9+

### Instalação

```bash
# Clone o repositório
git clone https://github.com/issei/mauricio-site.git
cd mauricio-site

# Instale as dependências
npm install
```

### Desenvolvimento

```bash
# Inicia o servidor de desenvolvimento (porta 5173)
npm run dev
```

O site estará disponível em: **http://localhost:5173**

### Comandos Disponíveis

```bash
npm run dev      # Servidor de desenvolvimento
npm run build    # Build de produção
npm run preview  # Preview do build local
npm start        # Alias para npm run dev
```

---

## 🏗️ Build e Deploy

### Build Local

```bash
npm run build
```

Gera a pasta `dist/` com os arquivos otimizados:
- Minificação de JS/CSS
- Tree-shaking
- Code splitting
- Otimização de assets

### Preview do Build

```bash
npm run preview
```

Serve a pasta `dist/` localmente para validação antes do deploy.

### Deploy Automático (AWS)

O projeto utiliza **GitHub Actions** para deploy automático em **AWS S3 + CloudFront**:

1. **Push para `main`** → Trigger do workflow
2. **Build do projeto** → `npm run build`
3. **Autenticação AWS** → OIDC (sem credenciais no código)
4. **Sync para S3** → `aws s3 sync dist/ s3://bucket`
5. **Invalidação CloudFront** → Cache refresh

#### Secrets Necessários (GitHub)

Configure em **Settings → Secrets and variables → Actions**:

- `AWS_ROLE_ARN`: ARN da role IAM com permissões S3/CloudFront
- `AWS_REGION`: Região AWS (ex: `us-east-1`)
- `S3_BUCKET_NAME`: Nome do bucket S3
- `CLOUDFRONT_DISTRIBUTION_ID`: ID da distribuição CloudFront

---

## 🔄 Sistema de CV Dinâmico

### Como Funciona

1. **Fonte de Dados**: Arquivo `cv.json` no GitHub (repositório `issei/curriculo`)
2. **Fetch Dinâmico**: `cv-renderer.js` busca o JSON via GitHub Raw URL
3. **Renderização**: Transforma JSON em HTML usando template literals
4. **Fallback**: Se o GitHub falhar, usa `./cv.json` local

### Estrutura do cv.json

```json
{
  "Nome": "Maurício Yokoyama Issei",
  "Titulo": "Tech Lead | Especialista em Análise de Sistemas",
  "ResumoHero": "Mais de 20 anos de experiência...",
  "Resumo": ["Parágrafo 1", "Parágrafo 2"],
  "Habilidades": {
    "Linguagens_de_Programacao": ["Python", "JavaScript"],
    "Frameworks_e_Bibliotecas": ["React", "Node.js"]
  },
  "Experiencia": [
    {
      "Cargo": "Tech Lead",
      "Empresa": "Empresa XYZ",
      "Periodo": "2020 - Presente",
      "Local": "São Paulo, SP",
      "Descricao": "Liderança técnica...",
      "Resultados": ["Resultado 1", "Resultado 2"],
      "Principais_Projetos": ["Projeto A", "Projeto B"],
      "Competencias": ["Python", "AWS"]
    }
  ],
  "Projetos": [
    {
      "Nome": "Projeto X",
      "Empresa": "Empresa Y",
      "Periodo": "2023",
      "Situacao": "Descrição STAR",
      "Tarefas": ["Tarefa 1"],
      "Acoes": ["Ação 1"],
      "Resultados": ["Resultado 1"],
      "Tecnologias": ["Python", "AWS"]
    }
  ],
  "Formacao_Academica": [...],
  "Certificados": [...],
  "Cursos_Alura": {...},
  "Recomendacoes_Recebidas": [...],
  "Contato": {
    "Email": "email@example.com",
    "LinkedIn": "https://linkedin.com/in/...",
    "LinkedInUser": "usuario",
    "youtube": "https://youtube.com/@..."
  }
}
```

### Atualizando o CV

#### Opção 1: Via GitHub (Recomendado)

1. Edite o arquivo `cv.json` no repositório `issei/curriculo`
2. Commit e push das alterações
3. O site buscará automaticamente a nova versão

#### Opção 2: Via Admin Panel (Em Desenvolvimento)

1. Acesse `/admin.html`
2. Autentique com token GitHub
3. Edite o conteúdo visualmente
4. Salve diretamente no GitHub

#### Opção 3: Local (Fallback)

1. Edite `src/cv.json`
2. Faça rebuild e redeploy

### Configuração do GitHub

Edite `src/config.js`:

```javascript
export const GITHUB_CONFIG = {
    username: 'issei',
    repository: 'curriculo',
    branch: 'main',
    filePath: 'cv.json',
    token: 'GITHUB_TOKEN' // Personal Access Token
};
```

---

## ✅ Testes

### Executar Testes E2E

```bash
# Instalar browsers (primeira vez)
npx playwright install

# Rodar todos os testes
npx playwright test

# Rodar em modo UI (interativo)
npx playwright test --ui

# Rodar em browser específico
npx playwright test --project=chromium

# Gerar relatório
npx playwright show-report
```

### Configuração

- **Arquivo**: `playwright.config.js`
- **Browsers**: Chromium, Firefox, WebKit
- **Base URL**: `http://localhost:5173`
- **Auto-start**: Servidor de dev inicia automaticamente

---

## 🚀 CI/CD

### Workflow GitHub Actions

**Arquivo**: `.github/workflows/deploy.yml`

**Trigger**: Push para branch `main`

**Steps**:
1. ✅ Checkout do código
2. ✅ Setup Node.js 20 com cache npm
3. ✅ Instalação de dependências
4. ✅ Build do projeto
5. ✅ Configuração de credenciais AWS (OIDC)
6. ✅ Sync para S3 (com `--delete`)
7. ✅ Invalidação de cache CloudFront

**Ambiente**: `production` (GitHub Environments)

---

## ⚙️ Configuração

### Variáveis de Ambiente

Crie um arquivo `.env` (opcional):

```env
VITE_GITHUB_TOKEN=ghp_xxxxxxxxxxxxx
VITE_API_URL=https://api.example.com
```

### Vite Config

**Arquivo**: `vite.config.js`

```javascript
export default defineConfig({
  root: 'src',
  publicDir: '../public',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    target: 'esnext',
    rollupOptions: {
      input: htmlInput, // Todos os HTMLs em src/
    },
  },
  plugins: [
    tailwindcss(),
    sitemap({ hostname: 'https://mauricio.issei.com.br' })
  ]
})
```

### Tailwind CSS

**Arquivo**: `src/input.css`

```css
@import "tailwindcss";
```

Tailwind v4 usa a nova sintaxe `@import` nativa.

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Para contribuir:

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

### Padrões de Código

- **JavaScript**: ES6+ modules, async/await
- **CSS**: Tailwind utilities first, custom CSS quando necessário
- **HTML**: Semântico e acessível (ARIA labels)
- **Commits**: Conventional Commits (feat, fix, docs, etc.)

---

## 📄 Licença

Este projeto é de propriedade de **Maurício Yokoyama Issei**. Todos os direitos reservados.

O código-fonte está disponível para fins educacionais e de portfólio. Para uso comercial ou redistribuição, entre em contato.

---

## 📧 Contato

**Maurício Yokoyama Issei**

- 🌐 Website: [mauricio.issei.com.br](https://mauricio.issei.com.br)
- 💼 LinkedIn: [linkedin.com/in/mauricioissei](https://linkedin.com/in/mauricioissei)
- 📺 YouTube: [@MauricioIssei](https://youtube.com/@MauricioIssei)
- 📧 Email: [contato via site](https://mauricio.issei.com.br#contact)

---

## 🙏 Agradecimentos

- **Tailwind CSS** pela framework de estilização incrível
- **Vite** pela velocidade e DX excepcional
- **Playwright** pelos testes confiáveis
- **AWS** pela infraestrutura robusta
- **Google Fonts** pela tipografia Inter

---

<div align="center">

**Desenvolvido com ❤️ e tecnologia por Maurício Issei**

⭐ Se este projeto foi útil, considere dar uma estrela!

</div>
