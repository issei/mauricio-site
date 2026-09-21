# Boutique Empresarial Showcase: Engenharia de Software, Arquitetura de Agentes e Infraestrutura Cloud

## Resumo Executivo e Visão Geral

Este documento apresenta a especificação técnica e a arquitetura de engenharia do **Boutique Empresarial Showcase**, uma plataforma web de alta performance construída sob a premissa de **Agent-Driven Development (ADD)**, **Specification-Driven Development (SDD)** e prontidão nativa para motores de busca e agentes autônomos (**Agent Readiness & AEO**).

A plataforma transcende o modelo tradicional de aplicação web interativa: ela opera como uma vitrine de capacidades de engenharia, integrando infraestrutura serverless resiliente na AWS, um pipeline de CI/CD autenticado via OIDC sem credenciais estáticas, um design system de alta elegância e zero-runtime CSS, e uma camada de descoberta e interação para agentes de Inteligência Artificial baseada nos padrões WebMCP, DNS-AID e RFC 8414.

---

## 1. Aprofundamento Arquitetural (Stack e Infraestrutura)

```
                                  [ Requisição do Usuário / Agente ]
                                                  │
                                                  ▼
                                      [ AWS CloudFront (CDN) ]
                                                  │
                                      (CloudFront Function)
                          ┌───────────────────────┴───────────────────────┐
                          ▼                                               ▼
              [ Negociação de Conteúdo ]                             [ Injeção Header ]
          (text/markdown -> llms.txt / .md)                     (RFC 8288 Link Header)
                          │                                               │
                          └───────────────────────┬───────────────────────┘
                                                  ▼
                                     [ AWS S3 (Static Storage) ]
                                     (Dist / MPA / Static Assets)
                                                  │
                                                  ▼
                                [ Google Apps Script (Serverless) ]
                                (Lead Capture & Meta Conversions API)
```

### 1.1 Stack Frontend: Multi-Page Application (MPA) com Vite 6 e Tailwind CSS v4

A escolha por uma arquitetura **Multi-Page Application (MPA)** baseada em **Vite 6** e **Tailwind CSS v4** responde a um princípio rígido de eficiência: **Zero-Runtime CSS** e eliminação da sobretaxa de hidratação JS inerente aos frameworks Single-Page Application (SPA) modernos (React, Next.js).

* **Vite 6 e Rollup Engine:** O Vite 6 atua como o bundler de tempo de compilação, mapeando de forma declarativa cada arquivo HTML contido em `src/*.html` (e suas contrapartidas i18n em `src/en/*.html`) como pontos de entrada (*entrypoints*) independentes no Rollup. Isso garante que cada página sirva estritamente o código JavaScript vanilla e o CSS necessários para seu próprio funcionamento, resultando em um First Contentful Paint (FCP) inferior a 400ms em redes 4G.
* **Tailwind CSS v4 (Engine Rust / Lightning CSS):** A quarta geração do Tailwind CSS elimina completamente o arquivo de configuração JavaScript (`tailwind.config.js`) em favor da diretiva nativa `@import "tailwindcss";` no arquivo de estilo raiz. Alimentado pelo Lightning CSS, a compilação gera um arquivo CSS final minificado com purga rigorosa (*tree-shaking*), garantindo zero impacto de runtime no navegador.

#### Bloco de Reflexão Técnica: Trade-offs da Escolha MPA estático vs. SPA Hidratado

> **Inconveniência aceita:** A perda de transições de página perfeitamente suaves entre rotas distintas e a necessidade de replicar estruturas de cabeçalho e rodapé durante o build (solucionado via scripts de injeção em build time como `scripts/inject-eco-nav.mjs`).
>
> **Ganho estratégico:**
> 1. **Indexabilidade e Parsing Impossível de Falhar:** Agentes de IA e crawlers de busca (Googlebot, ClaudeBot, GPTBot) recebem o HTML semântico completo e renderizado diretamente do servidor HTTP, sem depender de execução de scripts de terceiros ou tolerância a falhas na hidratação JS.
> 2. **Performance Extrema:** Tempos de interatividade (TTI) instantâneos. O navegador realiza o parse do DOM diretamente, liberando a thread principal para animações fluidas via CSS compositor/GPU.

---

### 1.2 Pipeline de CI/CD no GitHub Actions com Autenticação OIDC na AWS

O pipeline de entrega contínua (`.github/workflows/deploy.yml`) elimina categoricamente o risco de vazamento de credenciais ao descartar o uso de chaves estáticas de longa duração (`AWS_ACCESS_KEY_ID` / `AWS_SECRET_ACCESS_KEY`).

```yaml
# .github/workflows/deploy.yml
permissions:
  id-token: write
  contents: read

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'
      - run: npm install
      - run: npm run build

      - name: Configure AWS Credentials via OIDC
        uses: aws-actions/configure-aws-credentials@v4
        with:
          role-to-assume: ${{ secrets.AWS_ROLE_ARN }}
          aws-region: ${{ secrets.AWS_REGION }}

      - name: Deploy to S3
        run: |
          aws s3 sync dist/ s3://${{ secrets.S3_BUCKET_NAME }} --delete --exclude "static/*"

      - name: Invalidate CloudFront Cache
        run: |
          aws cloudfront create-invalidation \
            --distribution-id ${{ secrets.CLOUDFRONT_DISTRIBUTION_ID }} \
            --paths "/*"
```

#### Funcionamento da Segurança OIDC
1. O GitHub Actions solicita um token JWT assinado criptograficamente pelo ID Provider (`token.actions.githubusercontent.com`).
2. O IAM Role na AWS troca esse token temporário por credenciais de escopo reduzido via `sts:AssumeRoleWithWebIdentity`, validando a condição de *Subject* (`repo:issei/curriculo:environment:production`).
3. As credenciais expiram automaticamente ao término do job.

---

### 1.3 Roteamento em Edge no AWS CloudFront e Backend Serverless

A camada de borda (Edge) utiliza **CloudFront Functions** para executar operações leves de roteamento e enriquecimento de resposta HTTP com baixíssima latência (<1ms):

* **Negociação de Conteúdo para IA:** Quando o header `Accept` da requisição indica preferência por `text/markdown`, ou quando o agente requisita uma URL sem extensão contendo um equivalente markdown versionado, a CloudFront Function redireciona transparentemente a requisição para o recurso `.md` estático correspondente em `public/`.
* **Injeção de Headers RFC 8288 (Link Header Navigation):** A borda injeta headers de linkagem RFC 8288 apontando para a especificação OpenAPI (`/openapi.json`), o catálogo de IA (`/.well-known/ai-catalog.json`) e o documento de autenticação (`/auth.md`):

```http
Link: </.well-known/ai-catalog.json>; rel="service-desc"; type="application/json",
      </auth.md>; rel="authorizing-documentation"; type="text/markdown"
```

* **Backend Serverless (Google Apps Script & Meta Conversions API):** A captura de leads e formulários interativos dispara requisições assíncronas `POST` para um endpoint serverless em Google Apps Script. O webhook processa os dados, persiste na planilha de auditoria e executa uma chamada server-to-server para a **Meta Conversions API (CAPI)** via hash SHA-256 (e-mail e telefone), contornando bloqueadores de anúncios de navegação e garantindo atribuição precisa de conversão com 100% de privacidade (LGPD/GDPR).

---

## 2. Detalhes Metodológicos (SDD e Multi-Agentes)

### 2.1 Specification-Driven Development (SDD)

A metodologia **Specification-Driven Development (SDD)** é a pedra angular da previsibilidade no desenvolvimento auxiliado por Inteligência Artificial. Nenhuma linha de código é alterada sem que haja um contrato técnico prévio, armazenado sob versão estrita na árvore `docs/specs/`.

```
docs/specs/
├── 01-templates/
│   └── TPL-spec.md
├── 14-adr/
├── PAGE_SPEC_TEMPLATE.md
├── spec-agent-readiness-mauricio-issei.md
└── spec-agent-readiness-v2-mauricio-issei.md
```

#### Ciclo de Vida do Desenvolvimento no SDD
1. **Especificação de Requisitos:** Redação da especificação técnica com critérios de aceite determinísticos, mapeamento de risco e definição dos endpoints ou componentes envolvidos.
2. **Validação das Suposições:** O agente de IA entra em modo de planejamento profundo, formulando perguntas para sanar ambiguidades do contrato antes da execução.
3. **Execução Autônoma Baseada na Spec:** A especificação serve como o *system prompt* estendido do agente. Qualquer desvio durante o desenvolvimento é considerado uma regressão de contrato.

---

### 2.2 Manifesto APM (Agent Package Manager) e Alocação Econômica de Modelos

O gerenciamento da equipe sintética de agentes é orquestrado pelo manifesto `apm.yml`. Ele unifica a configuração de múltiplos *harnesses* (Claude Code, GitHub Copilot, Cursor, Codex, Antigravity) sob um único ponto de verdade versionado.

```yaml
# apm.yml
name: mauricio-site
version: 1.0.0
description: >-
  Site MPA (Vite 6 + Tailwind v4 + JS vanilla) desenvolvido em fluxo agent-driven
  e spec-driven com quality gate determinístico.
target: [claude, copilot, cursor, codex, antigravity]

dependencies:
  apm:
    - thinkjones/awesome-apm-stacks/user-core
    - thinkjones/awesome-apm-stacks/code-core
    - thinkjones/awesome-apm-stacks/design-frontend
    - thinkjones/awesome-apm-stacks/test-core
    - thinkjones/awesome-apm-stacks/architect-devops
    - anthropics/skills/skills/code-review
```

#### Matriz de Alocação Econômica de Modelos de IA

| Papel / Task | Modelo Alocado | Justificativa de Engenharia & Custo |
| :--- | :--- | :--- |
| **Arbitragem Arquitetural e RFCs** | Claude 3.5 Opus | Capacidade superior de raciocínio lógico em cenários de alta complexidade e análise de impacto sistêmico. |
| **Escrita de Código, Testes e Copy** | Claude 3.5 Sonnet | Equilíbrio ideal entre precisão técnica, sintaxe limpa de código/testes Playwright e elegância textual em PT-BR/EN. |
| **Execução Mecânica e Auditorias** | Claude 3.5 Haiku | Custo de token 80% menor; ideal para tarefas estruturadas como purga de arquivos, linters e validações de esquema JSON. |

---

### 2.3 Quality Gate Fail-Closed (`npm run gate`)

O repositório impõe um portão de qualidade implacável antes de qualquer mesclagem para a ramificação principal (`main`). Executado pelo comando `npm run gate` (`scripts/quality-gate.mjs`), o script opera em modo **fail-closed** (qualquer falha interrompe imediatamente a pipeline).

```
  [ npm run gate ]
         │
         ├──► 1. Compilação estática (`vite build`)
         ├──► 2. Testes de Unidade (`node --test tests/eai.test.js`)
         ├──► 3. Testes End-to-End (`npx playwright test`)
         └──► 4. Auditoria de Acessibilidade Automática (`@axe-core/playwright`)
```

O teste de acessibilidade garante que 100% das páginas estáticas atendam aos critérios **WCAG 2.1 nível AA**, verificando contraste de cor, marcação ARIA válida, ordem de navegação por teclado e semântica de formulários.

---

## 3. UX, Design System e Formulário Conversacional

### 3.1 Arquitetura do Formulário Conversacional e Diagnóstico Dinâmico

O formulário de engajamento do projeto substitui as abordagens tradicionais baseadas em extensos questionários estáticos por uma **arquitetura de micro-entregas de valor**.

```
  [ Etapa N: Pergunta Contextual ]
                 │
                 ▼
     [ Escolha do Usuário ]
                 │
                 ▼
  [ Devolutiva Diagnóstica Imediata ]
  ("Seu custo computacional em IA está 35% acima da média por falta de Caching de Prompt")
                 │
                 ▼
  [ Etapa N+1: Pergunta Ajustada ao Contexto ]
```

* **Micro-Entregas Dinâmicas:** A cada resposta selecionada, o motor JavaScript avalia o perfil da escolha e renderiza instantaneamente uma análise técnica preventiva.
* **Persistência de Estado Local:** O progresso do formulário é mantido em estado imutável na memória do navegador, permitindo retrocesso e reavaliação sem perda de contexto ou recarregamento de página.

---

### 3.2 Design System: A Tradução Técnica do "Silêncio e Elegância"

O conceito estético da interface é fundamentado na filosofia do **"Comando Silencioso"**: a autoridade técnica demonstrada através da clareza, do espaço em branco e do absoluto rigor tipográfico, eliminando ornamentos visuais desnecessários.

```
       ┌────────────────────────────────────────────────────────┐
       │                PALETA DE CORES STRICT                  │
       ├──────────────────────────┬─────────────────────────────┤
       │ Navy Principal           │ #0a0f1d (Fundo de Profundidade)│
       │ Slate Neutro             │ #1e293b (Estrutura de Card) │
       │ Neon Accent              │ #38bdf8 (Destaque de Foco)  │
       └──────────────────────────┴─────────────────────────────┘
```

* **Tipografia Fluida e Controle de Medida:** Combinação tipográfica entre a elegância editorial de *Playfair Display* (títulos e reflexões) e a clareza técnica de *Inter* (corpo de texto e código). A medida de leitura (*line-length*) é restrita rigorosamente entre 60 e 75 caracteres por linha via utilitários `max-w-prose` e tamanhos de fonte fluidos usando unidades `clamp()` do CSS.
* **Animações Respeitosas e Hardware-Accelerated:** O uso da biblioteca **Lenis** assegura *smooth scrolling* sem interferir no scroll nativo da thread principal. Animações e efeitos de transição são restritos às propriedades `transform` e `opacity`, garantindo execução a 60fps promovida à camada da GPU.
* **Nativismo CSS/HTML:** Componentes gráficos não utilizam bibliotecas pesadas de terceiros; cards com efeito *glassmorphism* utilizam diretivas nativas CSS `backdrop-filter: blur(12px);` e bordas com gradiente linear.

---

### 3.3 Conformidade com LGPD e Google Consent Mode v2

A conformidade com a Lei Geral de Proteção de Dados (LGPD) e as exigências do **Google Consent Mode v2** é tratada no nível mais baixo da renderização DOM:

1. **Bloqueio Padrão de Scripts na Tag `<head>`:**
   Todos os scripts de rastreamento (Google Tag Manager, Meta Pixel) são declarados originalmente com o tipo `type="text/plain"` e atributados com `data-consent-category="analytics"`. Isso previne que o navegador interprete ou execute o código JavaScript antes da ação do usuário.

2. **Injeção Dinâmica Pós-Consentimento:**
   Apenas quando o usuário concede consentimento explícito no banner de privacidade, o módulo `cookie-consent.js` atualiza os estados do Consent Mode v2 (`analytics_storage: 'granted'`, `ad_storage: 'granted'`) e reescreve as tags de script na memória para `type="text/javascript"`, permitindo a execução imediata dos serviços.

---

## 4. Answer Engine Optimization (AEO) e Agent Readiness

O projeto é pioneiro na implementação completa da especificação **Agent Readiness v2**, convertendo a aplicação web em uma infraestrutura amigável para leitura por agentes de IA autônomos.

```
/.well-known/
├── ai-catalog.json            # AI Resource Discovery (ARD) - urn:air conforme
├── agent-card.json             # A2A Agent Card - Definição de interfaces e skills
├── oauth-authorization-server  # RFC 8414 Authorization Server Metadata
├── openid-configuration        # OIDC Discovery Metadata
└── oauth-protected-resource   # RFC 9728 Protected Resource Metadata (PRM)
```

### 4.1 Infraestrutura de Descoberta para Agentes (`/.well-known/`)

1. **OAuth Authorization Server Metadata (RFC 8414):**
   Disponibilização do endpoint `/.well-known/oauth-authorization-server` com estrutura idêntica ao OIDC Discovery, garantindo compatibilidade com verificadores RFC 8414 que exigem servidor de autorização explicitado na apex do domínio:

```json
{
  "issuer": "https://mauricio.issei.com.br",
  "authorization_endpoint": "https://mauricio.issei.com.br/oauth/authorize",
  "token_endpoint": "https://mauricio.issei.com.br/oauth/token",
  "jwks_uri": "https://mauricio.issei.com.br/.well-known/jwks.json",
  "scopes_supported": ["openid", "profile", "cv:read", "projects:read"],
  "response_types_supported": ["code", "token"]
}
```

2. **Autenticação Autocontida em `auth.md`:**
   O arquivo `/auth.md` na raiz pública expõe os blocos estruturados em JSON que detalham os métodos de acesso anônimo suportados para consumo dos dados públicos:

```markdown
## agent_auth

```json
{
  "agent_auth": {
    "skill": "portfolio-read",
    "register_uri": "https://mauricio.issei.com.br/.well-known/oauth-protected-resource",
    "methods": [
      {
        "type": "anonymous",
        "scopes": ["cv:read", "projects:read", "profile"]
      }
    ]
  }
}
```
```

---

### 4.2 Descoberta via DNS (Protocolo DNS-AID)

Para permitir a descoberta de serviços de agentes diretamente via resolução de nomes de domínio, o projeto publica registros DNS dos tipos **HTTPS** e **SVCB** no subdomínio `_agents.mauricio.issei.com.br`.

A automação desses registros no AWS Route 53 é fornecida pelo script `scripts/setup-dns-aid-route53.sh`:

```bash
#!/usr/bin/env bash
# Trecho do script setup-dns-aid-route53.sh
set -euo pipefail

aws route53 change-resource-record-sets \
  --hosted-zone-id "$HOSTED_ZONE_ID" \
  --change-batch '{
    "Comment": "DNS-AID Records for Agent Discovery (v2 specification)",
    "Changes": [
      {
        "Action": "UPSERT",
        "ResourceRecordSet": {
          "Name": "_index._agents.mauricio.issei.com.br.",
          "Type": "HTTPS",
          "TTL": 3600,
          "ResourceRecords": [
            {
              "Value": "1 mauricio.issei.com.br. alpn=\"h2,http/1.1\" port=443 mandatory=alpn,port key65001=\"/.well-known/ai-catalog.json\""
            }
          ]
        }
      },
      {
        "Action": "UPSERT",
        "ResourceRecordSet": {
          "Name": "_mcp._agents.mauricio.issei.com.br.",
          "Type": "SVCB",
          "TTL": 3600,
          "ResourceRecords": [
            {
              "Value": "1 mauricio.issei.com.br. alpn=\"mcp\" port=443 mandatory=alpn,port key65001=\"/.well-known/mcp/server-card.json\""
            }
          ]
        }
      },
      {
        "Action": "UPSERT",
        "ResourceRecordSet": {
          "Name": "_a2a._agents.mauricio.issei.com.br.",
          "Type": "SVCB",
          "TTL": 3600,
          "ResourceRecords": [
            {
              "Value": "1 mauricio.issei.com.br. alpn=\"a2a\" port=443 mandatory=alpn,port key65001=\"/.well-known/agent-card.json\""
            }
          ]
        }
      }
    ]
  }'
```

---

### 4.3 Arquivos de Contexto `llms.txt`, `cv-for-ai.md` e JSON-LD Dinâmico

* **`public/llms.txt`:** Mapeamento estruturado do site projetado para ingestão por LLMs, contendo links diretos para resumos executivos de cada página, diretórios de API e especificações técnicas.
* **`public/cv-for-ai.md`:** Versão semântica e densa do currículo profissional otimizada para parsing por algoritmos de recrutamento e agentes autônomos.
* **Dados Estruturados JSON-LD (E-E-A-T):** Injeção de entidades fortemente tipadas via Schema.org (`Person`, `WebSite`, `FAQPage`), ligadas por identificadores `@id` únicos e inalteráveis (`https://mauricio.issei.com.br/#person`).

---

## 5. Métricas e Otimizações de Contexto da IA

Em um ecossistema focado em **Agent-Driven Development**, a gestão da janela de contexto (*context window*) e o consumo de tokens de API são tratados com o mesmo rigor de engenharia dedicado ao consumo de memória RAM ou largura de banda em redes.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                   OTIMIZAÇÃO DO CONSUMO DE TOKENS (LLM)                     │
├────────────────────────────────┬────────────────────────────────────────────┤
│ Ferramenta / Prática           │ Função & Redução no Consumo de Tokens      │
├────────────────────────────────┼────────────────────────────────────────────┤
│ Rust Token Killer (`rtk`)       │ Filtra e comprime logs verbosos de testes  │
│                                │ e builds antes do envio ao modelo (-70%).  │
├────────────────────────────────┼────────────────────────────────────────────┤
│ Plugin `ponytail`              │ Contém e limita diffs de Git ao escopo      │
│                                │ exato das modificações solicitadas.       │
├────────────────────────────────┼────────────────────────────────────────────┤
│ Analisador `caveman`           │ Audita custo de prompt por sessão e alerta  │
│                                │ sobre ineficiências na estrutura de instrução│
└────────────────────────────────┴────────────────────────────────────────────┘
```

1. **Rust Token Killer (`rtk`):** Ferramenta utilitária escrita em Rust que intercepta a saída padrão (*stdout*) de pipelines como `npx playwright test`. O `rtk` analisa estruturas repetitivas em logs de erro e rastros de pilha, removendo frames desnecessários da biblioteca do Node.js e comprimindo a saída em um formato conciso antes que ela seja lida pelo agente de IA.
2. **Contenção de Diffs via `ponytail`:** Impede a poluição do contexto causada por reformatações em massa de arquivos (*auto-formatting*). A ferramenta assegura que o agente forneça diffs estritamente delimitados aos blocos afetados pela mudança.
3. **Análise de Custo com `caveman`:** Executa a contagem e análise contínua da utilização de tokens da API da Anthropic e OpenAI por sessão de desenvolvimento, auxiliando na escolha do modelo mais econômico para cada tipo de subtarefa.

---

## Conclusão e Diretrizes de Manutenção

O **Boutique Empresarial Showcase** estabelece um novo patamar de excelência para aplicações web modernas. Ao harmonizar performance frontend extrema, segurança e automação em nuvem, metodologias rigorosas guiadas por especificações (SDD) e prontidão nativa para a era dos agentes de Inteligência Artificial (Agent Readiness), a plataforma consolida-se como um modelo replicável de arquitetura de software de alta maturidade.

Para atualizações futuras na plataforma, os desenvolvedores e agentes autônomos devem respeitar estritamente o ciclo: **Especificação em `docs/specs/` → Validação de Premissas → Execução do Código → Quality Gate (`npm run gate`)**.
