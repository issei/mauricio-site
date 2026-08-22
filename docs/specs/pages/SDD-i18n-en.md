# SDD - Especificação de Design Técnico: Internacionalização (i18n) & Ativos Públicos /en/

**Status:** Rascunho / Em Revisão
**Autor:** Arquiteto Agêntico e Implementador i18n
**Data:** 2025-02-22
**Alvo:** Infraestrutura de Borda (CloudFront), Vite, Estrutura de Arquivos de Origem e SEO/AEO

---

## 1. Visão Geral e Objetivos

O objetivo deste documento de design técnico (Software Design Document - SDD) é especificar a arquitetura e a estratégia de internacionalização (i18n) do repositório `mauricio-site`.

A presença pública será estendida para o idioma inglês através da rota `/en/`, mantendo o português (PT-BR) como idioma padrão na raiz (`/`). A internacionalização foca exclusivamente nos **ativos públicos acessíveis via web**, consumidos por visitantes humanos, crawlers de busca e agentes de inteligência artificial (SEO e AEO - Artificial Intelligence Engine Optimization).

Documentações técnicas de especificação interna, governança e regras de desenvolvimento permanecerão inalteradas em seu local de origem.

---

## 2. Escopo de Atuação

### 2.1. Incluído no Escopo (Ativos Públicos)
* **Páginas HTML Públicas:** Páginas em `src/` destinadas à exibição pública na Web.
* **Ativos Markdown e Arquivos de Contexto AI (AEO):** Arquivos consumidos por agentes LLM e crawlers (`llms.txt`, `llms-full.txt`, `cv-for-ai.md`, `cv.json` e arquivos `.md` públicos espelhados).
* **Configuração de Borda (CloudFront Functions):** Tratamento de redirecionamento por idioma, gerenciamento do cookie de preferência e negociação de conteúdo (`Accept: text/markdown`).
* **Configuração de Build e SEO/AEO:** Atualizações no `vite.config.js`, tags `hreflang`, atributo `lang` no HTML e mapa do site (`sitemap.xml`).

### 2.2. Excluído do Escopo (Documentação Interna e Utilitários)
* **Especificações e Governança Interna:** `docs/specs/`, `.agents/`, `.claude/`, `.ai/`, `ADMIN_README.md`, `ECOSYSTEM.md`.
* **Ferramentas Internas e Páginas Administrativas:** `src/admin.html`, `src/admin-editor.html`, `src/diagnostic.html`, `src/test-github.html`, `src/exemplopdi.html`, `src/vsl.html`, `src/mapmind.html`.

---

## 3. Mapeamento de Ativos Públicos

A tabela a seguir apresenta o mapeamento exato das páginas e ativos públicos com suas respectivas origens e rotas em PT-BR e EN:

| Tipo | Ativo Original (PT-BR) | Origem /en/ | Rota Pública PT-BR | Rota Pública EN |
|---|---|---|---|---|
| **HTML** | `src/index.html` | `src/en/index.html` | `/` ou `/index.html` | `/en/` ou `/en/index.html` |
| **HTML** | `src/apresentacao.html` | `src/en/apresentacao.html` | `/apresentacao` | `/en/apresentacao` |
| **HTML** | `src/artifice.html` | `src/en/artifice.html` | `/artifice` | `/en/artifice` |
| **HTML** | `src/catalogo.html` | `src/en/catalogo.html` | `/catalogo` | `/en/catalogo` |
| **HTML** | `src/devin.html` | `src/en/devin.html` | `/devin` | `/en/devin` |
| **HTML** | `src/devops-salesforce.html` | `src/en/devops-salesforce.html` | `/devops-salesforce` | `/en/devops-salesforce` |
| **HTML** | `src/engenharia-agentes-ia.html` | `src/en/engenharia-agentes-ia.html` | `/engenharia-agentes-ia` | `/en/engenharia-agentes-ia` |
| **HTML** | `src/engenharia-confianca.html` | `src/en/engenharia-confianca.html` | `/engenharia-confianca` | `/en/engenharia-confianca` |
| **HTML** | `src/formulacao-de-problemas.html` | `src/en/formulacao-de-problemas.html` | `/formulacao-de-problemas` | `/en/formulacao-de-problemas` |
| **HTML** | `src/know.html` | `src/en/know.html` | `/know` | `/en/know` |
| **HTML** | `src/knowledge-os-presentation.html` | `src/en/knowledge-os-presentation.html` | `/knowledge-os-presentation` | `/en/knowledge-os-presentation` |
| **HTML** | `src/life.html` | `src/en/life.html` | `/life` | `/en/life` |
| **HTML** | `src/life3d.html` | `src/en/life3d.html` | `/life3d` | `/en/life3d` |
| **HTML** | `src/operacao-capital-cognitivo.html` | `src/en/operacao-capital-cognitivo.html` | `/operacao-capital-cognitivo` | `/en/operacao-capital-cognitivo` |
| **HTML** | `src/proposta.html` | `src/en/proposta.html` | `/proposta` | `/en/proposta` |
| **HTML** | `src/proposta-engenharia-reversa.html` | `src/en/proposta-engenharia-reversa.html` | `/proposta-engenharia-reversa` | `/en/proposta-engenharia-reversa` |
| **HTML** | `src/proposta-observabilidade-mobile.html` | `src/en/proposta-observabilidade-mobile.html` | `/proposta-observabilidade-mobile` | `/en/proposta-observabilidade-mobile` |
| **HTML** | `src/salesforce-agentic-dev.html` | `src/en/salesforce-agentic-dev.html` | `/salesforce-agentic-dev` | `/en/salesforce-agentic-dev` |
| **HTML** | `src/salesforce-agentic-quickstart.html` | `src/en/salesforce-agentic-quickstart.html` | `/salesforce-agentic-quickstart` | `/en/salesforce-agentic-quickstart` |
| **HTML** | `src/service-operations-2-0.html` | `src/en/service-operations-2-0.html` | `/service-operations-2-0` | `/en/service-operations-2-0` |
| **HTML** | `src/socialselling.html` | `src/en/socialselling.html` | `/socialselling` | `/en/socialselling` |
| **HTML** | `src/sustentacao.html` | `src/en/sustentacao.html` | `/sustentacao` | `/en/sustentacao` |
| **HTML** | `src/terminal-evolutivo.html` | `src/en/terminal-evolutivo.html` | `/terminal-evolutivo` | `/en/terminal-evolutivo` |
| **HTML Legais** | `src/cookies.html`, `privacidade.html`, `termos.html` | `src/en/cookies.html`, etc. | `/cookies`, `/privacidade`, `/termos` | `/en/cookies`, `/en/privacidade`, `/en/termos` |
| **Markdown / AI** | `public/llms.txt` | `public/en/llms.txt` | `/llms.txt` | `/en/llms.txt` |
| **Markdown / AI** | `public/llms-full.txt` | `public/en/llms-full.txt` | `/llms-full.txt` | `/en/llms-full.txt` |
| **Markdown / AI** | `public/cv-for-ai.md` | `public/en/cv-for-ai.md` | `/cv-for-ai.md` | `/en/cv-for-ai.md` |
| **JSON / Data** | `public/cv.json` | `public/en/cv.json` | `/cv.json` | `/en/cv.json` |
| **Markdown Páginas** | `public/*.md` (ex: `index.md`, `proposta.md`, etc.) | `public/en/*.md` (ex: `index.md`, `proposta.md`, etc.) | `/[pagina].md` | `/en/[pagina].md` |

---

## 4. Estrutura de Arquivos Gerados

A organização física no repositório e no artefato gerado pelo build seguirá o padrão:

```text
mauricio-site/
├── public/
│   ├── cv.json
│   ├── cv-for-ai.md
│   ├── llms.txt
│   ├── llms-full.txt
│   ├── index.md
│   ├── ... (outros ativos .md em PT-BR)
│   └── en/                       <-- Diretório de ativos públicos em inglês
│       ├── cv.json
│       ├── cv-for-ai.md
│       ├── llms.txt
│       ├── llms-full.txt
│       ├── index.md
│       └── ... (outros ativos .md traduzidos)
├── src/
│   ├── index.html
│   ├── proposta.html
│   ├── ...
│   └── en/                       <-- Diretório de páginas HTML em inglês
│       ├── index.html
│       ├── proposta.html
│       └── ...
└── dist/                         <-- Saída do Build (Vite)
    ├── index.html
    ├── proposta.html
    ├── cv.json
    ├── en/
    │   ├── index.html
    │   ├── proposta.html
    │   ├── cv.json
    │   ├── llms.txt
    │   └── ...
```

---

## 5. Arquitetura de Borda (CloudFront Functions)

Duas CloudFront Functions (associadas no gatilho `viewer-request`) gerenciam o roteamento, a detecção de idioma e a negociação de conteúdo para IA.

### 5.1. Função 1: Roteamento de Idioma & Tratamento de Extensões (`HandlerExtentionHTML.js` estendida)

#### Comportamento e Regras:
1. **Cookie de Preferência (`pref_lang`):**
   - Checa se existe o cookie `pref_lang` na requisição (`pref_lang=en` ou `pref_lang=pt`).
   - Se `pref_lang=en` e a URI for a raiz `/` ou `/index.html`, redireciona via HTTP 302 para `/en/`.
   - Se `pref_lang=pt` e a URI iniciar com `/en/` ou `/en`, redireciona via HTTP 302 para `/` (ou equivalente sem `/en`).
   - O valor do cookie possui **precedência absoluta** sobre qualquer cabeçalho `Accept-Language`, prevenindo loops e respeitando a escolha manual do usuário no seletor de idioma (com validade de 1 ano).

2. **Detecção de Idioma via Cabeçalho (`Accept-Language`):**
   - Se o cookie `pref_lang` não estiver presente:
     - Quando o visitante acessa a raiz `/` e o cabeçalho `Accept-Language` prioriza o inglês (ex: inicia com `en`, `en-US`, `en-GB` com peso maior que `pt`), retorna uma resposta HTTP 302 de redirecionamento para `/en/`.
     - Caso contrário, mantém o fluxo normal para a raiz em PT-BR.

3. **Normalização de URIs sem extensão:**
   - Para requisições em `/en/` ou `/en`, resolve internamente para `/en/index.html`.
   - Para requisições do tipo `/en/proposta`, acrescenta a extensão `.html` para apontar ao arquivo `/en/proposta.html` no S3.

#### Pseudocódigo da CloudFront Function:
```javascript
function handler(event) {
    var request = event.request;
    var uri = request.uri;
    var headers = request.headers;
    var cookies = request.cookies || {};

    // 1. Verificar Cookie pref_lang
    var prefLang = cookies['pref_lang'] ? cookies['pref_lang'].value : null;

    if (prefLang === 'en' && (uri === '/' || uri === '' || uri === '/index.html')) {
        return {
            statusCode: 302,
            statusDescription: 'Found',
            headers: { 'location': { value: '/en/' } }
        };
    }

    if (prefLang === 'pt' && (uri === '/en' || uri === '/en/' || uri.indexOf('/en/') === 0)) {
        var newUri = uri.replace(/^\/en/, '') || '/';
        return {
            statusCode: 302,
            statusDescription: 'Found',
            headers: { 'location': { value: newUri } }
        };
    }

    // 2. Se sem cookie, verificar Accept-Language apenas na raiz
    if (!prefLang && (uri === '/' || uri === '' || uri === '/index.html')) {
        var acceptLang = (headers['accept-language'] || {}).value || '';
        if (prefersEnglish(acceptLang)) {
            return {
                statusCode: 302,
                statusDescription: 'Found',
                headers: { 'location': { value: '/en/' } }
            };
        }
    }

    // 3. Resolução de Extensões de Arquivo
    if (uri === '/en' || uri === '/en/') {
        request.uri = '/en/index.html';
    } else if (!uri.includes('.')) {
        request.uri += '.html';
    }

    return request;
}

function prefersEnglish(acceptLang) {
    if (!acceptLang) return false;
    var primary = acceptLang.split(',')[0].trim().toLowerCase();
    return primary.indexOf('en') === 0;
}
```

---

### 5.2. Função 2: Negociação de Conteúdo Markdown para IAs (`markdown-negotiation.js` estendida)

#### Comportamento e Regras:
1. Quando um crawler/agente de IA envia o cabeçalho `Accept: text/markdown`:
   - Se a requisição for para `/en/` ou `/en/index.html`, reescreve internamente para `/en/index.md`.
   - Se a requisição for para `/en/[pagina]` ou `/en/[pagina].html`, reescreve internamente para `/en/[pagina].md`.
   - Se a requisição for em PT-BR (ex: `/proposta`), reescreve internamente para `/proposta.md`.
2. Se o agente solicitar `/en/llms.txt`, `/en/llms-full.txt` ou `/en/cv-for-ai.md`, a requisição é servida diretamente do repositório de arquivos estáticos de `public/en/`.

#### Tabela de Mapeamento de Negociação Markdown (`MARKDOWN_MAP`):

```javascript
var MARKDOWN_MAP = {
  // Rotas PT-BR
  '/':                                     '/index.md',
  '/index.html':                           '/index.md',
  '/service-operations-2-0':               '/service-operations-2-0.md',
  '/service-operations-2-0.html':          '/service-operations-2-0.md',
  '/devops-salesforce':                    '/devops-salesforce.md',
  '/devops-salesforce.html':               '/devops-salesforce.md',
  '/proposta':                             '/proposta.md',
  '/proposta.html':                        '/proposta.md',
  '/proposta-observabilidade-mobile':      '/proposta-observabilidade-mobile.md',
  '/proposta-observabilidade-mobile.html': '/proposta-observabilidade-mobile.md',
  '/know':                                 '/know.md',
  '/know.html':                            '/know.md',
  '/life':                                 '/life.md',
  '/life.html':                            '/life.md',
  '/sustentacao':                          '/sustentacao.md',
  '/sustentacao.html':                     '/sustentacao.md',

  // Rotas EN
  '/en':                                   '/en/index.md',
  '/en/':                                  '/en/index.md',
  '/en/index.html':                        '/en/index.md',
  '/en/service-operations-2-0':            '/en/service-operations-2-0.md',
  '/en/service-operations-2-0.html':       '/en/service-operations-2-0.md',
  '/en/devops-salesforce':                 '/en/devops-salesforce.md',
  '/en/devops-salesforce.html':            '/en/devops-salesforce.md',
  '/en/proposta':                          '/en/proposta.md',
  '/en/proposta.html':                     '/en/proposta.md',
  '/en/proposta-observabilidade-mobile':   '/en/proposta-observabilidade-mobile.md',
  '/en/proposta-observabilidade-mobile.html': '/en/proposta-observabilidade-mobile.md',
  '/en/know':                              '/en/know.md',
  '/en/know.html':                         '/en/know.md',
  '/en/life':                              '/en/life.md',
  '/en/life.html':                         '/en/life.md',
  '/en/sustentacao':                       '/en/sustentacao.md',
  '/en/sustentacao.html':                  '/en/sustentacao.md'
};
```

---

## 6. Ajustes de SEO & AEO

### 6.1. Metatags de Idioma e Reciprocidade `hreflang`

Todas as páginas HTML públicas devem conter na seção `<head>` o atributo de idioma correto e os links de alternância bidirecional para SEO.

#### Exemplo na versão PT-BR (`src/proposta.html`):
```html
<html lang="pt-BR">
<head>
  <link rel="alternate" hreflang="pt-BR" href="https://mauricio.issei.com.br/proposta" />
  <link rel="alternate" hreflang="en" href="https://mauricio.issei.com.br/en/proposta" />
  <link rel="alternate" hreflang="x-default" href="https://mauricio.issei.com.br/proposta" />
</head>
```

#### Exemplo na versão EN (`src/en/proposta.html`):
```html
<html lang="en">
<head>
  <link rel="alternate" hreflang="pt-BR" href="https://mauricio.issei.com.br/proposta" />
  <link rel="alternate" hreflang="en" href="https://mauricio.issei.com.br/en/proposta" />
  <link rel="alternate" hreflang="x-default" href="https://mauricio.issei.com.br/proposta" />
</head>
```

### 6.2. Estrutura de Dados JSON-LD para AEO / Motores Conversacionais

As versões em inglês incorporarão dados estruturados alinhados com o esquema internacional:
- Entidades `Person`, `WebSite`, `FAQPage`.
- Atributo `@id` consistente (ex: `https://mauricio.issei.com.br/#person` e `https://mauricio.issei.com.br/en/#person`).
- Atributo `inLanguage`: `"en-US"` nas versões de `/en/`.

### 6.3. Atualização do Gerador de Mapa do Site (`vite.config.js`)

A configuração do Vite deve ser atualizada para:
1. Incluir automaticamente as entradas de `src/en/*.html` como múltiplos pontos de entrada no Rollup.
2. Atualizar a geração de `sitemap.xml` para contemplar as rotas em inglês mantendo a exclusão das rotas administrativas.

```javascript
// vite.config.js - trecho de especificação
const htmlFiles = globSync(['src/*.html', 'src/en/*.html']).filter(
  (file) => !EXCLUIR.test(parse(file).name)
);
```

### 6.4. Reescrita de Links Internos e Seletor de Idioma
* Todos os links internos nas páginas `src/en/*.html` devem apontar para seus respectivos equivalentes em `/en/` (ex: `<a href="/en/proposta">` em vez de `<a href="/proposta">`).
* O seletor de idioma no cabeçalho/rodapé do site executará uma função JavaScript simples para definir o cookie `pref_lang` e navegar para a versão equivalente:

```javascript
function switchLanguage(targetLang) {
    document.cookie = "pref_lang=" + targetLang + "; path=/; max-age=31536000; SameSite=Lax";
    if (targetLang === 'en') {
        window.location.href = '/en' + window.location.pathname.replace(/^\/en/, '');
    } else {
        window.location.href = window.location.pathname.replace(/^\/en/, '') || '/';
    }
}
```

---

## 7. Próximos Passos (Fases Futuras de Implementação)

Após a aprovação formal desta SDD, as seguintes etapas de execução técnica poderão ser iniciadas:
1. Criação da estrutura de diretórios `src/en/` e `public/en/`.
2. Tradução do arquivo de dados base `public/en/cv.json` e dos arquivos AEO (`llms.txt`, `llms-full.txt`, `cv-for-ai.md`).
3. Adaptação das páginas HTML em `src/en/` e seus scripts associados.
4. Atualização e implantação dos scripts de CloudFront Functions em `infra/cloudfront-functions/`.
5. Validação via Playwright de SEO, redirecionamentos e integridade AEO.
