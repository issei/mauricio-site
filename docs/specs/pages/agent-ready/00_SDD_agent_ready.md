# SDD — `agent-ready.html`

**Como tornar um site Agent-Ready — e o que realmente significa tirar 100 no IsItAgentReady**

| Campo | Valor |
|---|---|
| Slug | `agent-ready` |
| Arquivo | `src/agent-ready.html` (+ `src/agent-ready.css` se passar de ~15 KB de estilo) |
| URL | `https://mauricio.issei.com.br/agent-ready` |
| Gêmeo Markdown | `public/agent-ready.md` (gerado por `build-aeo.mjs --md`) |
| Gêmeo `/en/` | `src/en/agent-ready.html` + `public/en/agent-ready.md` (gerado por `sync-i18n`) |
| Tier AEO | **S** (página de autoridade; concorre com documentação primária) |
| Pilar do ecossistema | **p2 — Engenharia de Confiança / O Método** |
| Status | Especificação. Nenhuma linha de página escrita. |
| Base | auditoria de repositório + verificação em produção, 2026-09-07 |

---

## 0. Auditoria — o que existe de verdade (Fase 1)

Tudo abaixo foi verificado **duas vezes**: no repositório (caminho de arquivo) e
**em produção** (`curl` contra `https://mauricio.issei.com.br`, 2026-09-07). Nada
nesta seção é inferido a partir do score.

### 0.1 Scan de referência (executado em 2026-09-07)

```bash
curl -s -X POST https://isitagentready.com/api/scan \
  -H 'content-type: application/json' \
  -d '{"url":"https://mauricio.issei.com.br"}' > scan.json
```

Resultado medido: **16 pass · 0 fail · 6 neutral**, `level: 5`, `levelName: "Agent-Native"`.
Os 6 `neutral` são `webBotAuth` (informativo) e os 5 checks de Commerce
(`x402`, `mpp`, `ucp`, `acp`, `ap2` — "not a commerce site"). O JSON da API **não
carrega um campo `score`**; o 100 é o número que a UI compõe por categoria.
A página deve dizer isso — é a primeira lição de método.

### 0.2 Inventário: check → implementação → evidência

| Check | Status | Implementação real | Arquivo no repo | Evidência em produção |
|---|---|---|---|---|
| `discoverability.robotsTxt` | pass | `User-agent: *` + `Allow: /` + `Sitemap:` | `public/robots.txt` | `GET /robots.txt` 200 |
| `discoverability.sitemap` | pass | gerado no build, com `exclude[]` explícito | `vite.config.js` (plugin `vite-plugin-sitemap`) | `GET /sitemap.xml` → 200 `application/xml` |
| `discoverability.linkHeaders` | pass | header `Link` RFC 8288 com 7 relações | **não está no repo** — CloudFront Response Headers Policy `RFC8288-Link-Headers-AgentDiscovery` | header `link:` presente em toda resposta (medido) |
| `discoverability.dnsAid` | pass | 3 registros SVCB/HTTPS sob `_agents.` + **DNSSEC** | `scripts/setup-dns-aid-route53.sh`, `docs/DNS_AID_SETUP.md` | DoH Cloudflare: `Status:0`, `AD:true` nos 3 nomes |
| `contentAccessibility.markdownNegotiation` | pass | negociação `Accept: text/markdown` → `.md` | `infra/cloudfront-functions/viewer-request.js` + `public/*.md` | `GET /devin` com `Accept: text/markdown` → 200 `text/markdown`, `vary: Accept` |
| `botAccessControl.robotsTxtAiRules` | pass | wildcard cobre bots de IA | `public/robots.txt` | mensagem do scanner: *"No AI-specific bot rules; wildcard rules apply"* |
| `botAccessControl.contentSignals` | pass | `Content-Signal: ai-train=no, search=yes, ai-input=yes` | `public/robots.txt` | linha presente no arquivo servido |
| `botAccessControl.webBotAuth` | **neutral** | **não implementado** | — | `GET /.well-known/http-message-signatures-directory` → 404 |
| `discovery.apiCatalog` | pass | linkset RFC 9727, 3 âncoras | `public/.well-known/api-catalog` | 200 (mas `binary/octet-stream` — ver §0.4) |
| `discovery.ard` | pass | ARD com 4 recursos, `urn:air:` | `public/.well-known/ai-catalog.json` | 200 `application/json` |
| `discovery.oauthDiscovery` | pass | OIDC discovery (RFC 8414 compatível) | `public/.well-known/openid-configuration` | 200 |
| `discovery.oauthProtectedResource` | pass | PRM RFC 9728 | `public/.well-known/oauth-protected-resource` | 200 |
| `discovery.authMd` | pass | `auth.md` + bloco `agent_auth` na **AS metadata** | `public/auth.md` + `public/.well-known/oauth-authorization-server` | `GET /auth.md` → 200 `text/markdown` |
| `discovery.mcpServerCard` | pass | MCP server card com 3 tools e 4 resources | `public/.well-known/mcp/server-card.json` | 200 — **mas o endpoint declarado não existe (§0.3)** |
| `discovery.a2aAgentCard` | pass | A2A Agent Card, 2 skills, 2 interfaces | `public/.well-known/agent-card.json` | 200 `application/json` |
| `discovery.agentSkills` | pass | índice + 2 `SKILL.md` com digest SHA-256 | `public/.well-known/agent-skills/` | 200 `application/json` |
| `discovery.webMcp` | pass | 2 tools via `navigator.modelContext` | `src/index.html:673-712` | scanner: *"Found 2 WebMCP tools: get_cv_data, get_star_projects"* |
| `commerce.*` (5) | **neutral** | **fora de escopo por decisão** — o site não vende nada | — | — |

### 0.3 Declarado mas não executável — a matéria-prima da seção mais honesta da página

Medido em 2026-09-07, todos **404**:

| URL declarada | Onde é declarada | Situação |
|---|---|---|
| `/mcp` | `mcp/server-card.json` → `"endpoint"`, `"transport": "streamable-http"` | 404 — não há servidor MCP |
| `/oauth/authorize` | `oauth-authorization-server` + `openid-configuration` | 404 |
| `/oauth/token` | idem | 404 |
| `/.well-known/jwks.json` | idem (`jwks_uri`) | 404 |

Isto **não é um bug do site nem uma falha do scanner**: os checks validam
*metadados de descoberta*, não *runtime*. Um site estático em S3 + CloudFront não
tem como servir um endpoint MCP nem um fluxo OAuth. Mas declarar endpoint que
não responde é um contrato quebrado com o agente — e é exatamente o assunto da
§11 da página. **Ação recomendada (fora do escopo desta página, registrar como
follow-up):** ou implementar, ou enxugar o metadado para o que de fato existe.

### 0.4 Pendências conhecidas (documentadas em `docs/AGENT_READINESS.md` §8)

- `/.well-known/api-catalog` (sem extensão) é servido como `binary/octet-stream`.
  O scanner tolera; outras ferramentas podem não tolerar.
- `webBotAuth` `neutral` — não conta contra o score, é identidade assinada de agente.

### 0.5 O que existe e **não** é avaliado pelo IsItAgentReady

Material excelente para a página (mostra que Agent Readiness ≠ passar num checklist):

| Artefato | Arquivo | Papel |
|---|---|---|
| `llms.txt` / `llms-full.txt` | `public/llms.txt`, `public/llms-full.txt` | índice e corpus para LLMs (padrão llms.txt) |
| `/.well-known/agent-catalog` | `public/.well-known/agent-catalog` | catálogo próprio; `$schema` aponta para um namespace do IsItAgentReady, mas **não é um dos 22 checks** |
| Sistema AEO/GEO | `scripts/seo/{identity,pages,lib,build-aeo,gen-og}.mjs` | injeta meta + JSON-LD + bloco "Em síntese"/FAQ + gera `.md` e OG em todas as páginas |
| Gêmeo `/en/` | `scripts/i18n/`, `scripts/sync-i18n.mjs` | tradução local (Argos), custo zero de token |
| Gates | `scripts/quality-gate.mjs`, `tests/aeo.spec.js`, `tests/oauth-discovery.spec.js`, `tests/cloudfront-viewer-request.test.js` | impedem regressão dos artefatos acima |

### 0.6 Fontes internas que a página consome

- `docs/AGENT_READINESS.md` — **a base de conhecimento** (armadilhas, ordem de rollback do DNSSEC, como ler o scanner). É a fonte da verdade; a página é a versão pública e didática dela.
- `docs/DNS_AID_SETUP.md` — operação dos registros DNS.
- `docs/specs/OAUTH_PROTECTED_RESOURCE.md` — PRM.
- `docs/specs/spec-agent-readiness-v2-mauricio-issei.md` — histórico da jornada 75 → 88 → 100. **§1.2 está marcada como corrigida**; usar apenas como narrativa de "o que deu errado antes".

---

## 1. Objetivo

Publicar a página de referência em português sobre **Agent Readiness**, que
simultaneamente:

1. ensina o conceito (por que a Web precisa de uma superfície para agentes);
2. destrincha os checks do IsItAgentReady pelo **princípio**, não pela lista;
3. usa `mauricio.issei.com.br` como estudo de caso auditável, citando arquivo e comando de verificação;
4. entrega um tutorial reexecutável pelo leitor no próprio site;
5. delimita honestamente o que um score 100 **não** prova.

**Não-objetivos:** vender serviço; comparar ferramentas de scan; cobrir Commerce
(`x402`/`ap2`/`ucp`/`acp`/`mpp`) além de explicar por que são `neutral` aqui.

## 2. Público

Primário: engenheiros de software, arquitetos, SREs e tech leads que já dominam
HTTP, DNS e APIs, e ainda não trabalharam Agent Readiness.
Secundário: profissionais de SEO técnico migrando de SEO/AEO para superfície agêntica.
Terciário: **o próprio agente de código** — a página deve ser executável a partir do `.md`.

Pressupostos: sabe ler `curl -I`, entende `Accept`/`Vary`, sabe o que é um registro DNS.
Não pressupõe: MCP, A2A, ARD, DNS-AID, RFC 9727/9728.

## 3. Proposta editorial

**Tese:** *Agent Readiness não é uma lista de arquivos em `/.well-known/`. É
tratar o agente como um terceiro consumidor de primeira classe — que chega sem
sessão, sem layout e sem contexto — e publicar, por leitura de máquina, o que
existe, em que formato, sob quais regras e com qual credencial.*

Voz: engenharia, não marketing. Nenhuma afirmação sem evidência: cada
implementação vem com caminho de arquivo **e** comando de verificação. Os erros
do caminho entram na página — a colisão de CloudFront Functions que derrubou 21
URLs e o `agent_auth` no lugar errado valem mais como conteúdo do que o
resultado final.

Diferencial: praticamente todo conteúdo público sobre o tema é a checklist da
Cloudflare reescrita. Aqui existe algo raro — **um site que fechou 16/16 e pode
mostrar o diff, o scan e as três iterações de deploy que custou**.

## 4. Arquitetura da informação

Fluxo linear (leitura de cima a baixo), com três portas de entrada declaradas no início:

```
[Hero: tese + placar 16/0/6 auditável]
        │
        ├─► "quero entender"    → §1 problema · §2 conceito · §3 evolução · §4 vídeo
        ├─► "quero implementar" → §9 tutorial (8 etapas)
        └─► "quero auditar"     → §6 categorias · §8 casos · §10 teste
        │
[§5 arquitetura em 5 camadas — o diagrama que amarra tudo]
        │
[§6 categorias do score — princípio → padrão → implementação → evidência → validação]
        │
[§7 do zero ao Agent-Native — a progressão]
        │
[§8 estudo de caso deste site — 7 casos com PROBLEMA→…→IMPACTO]
        │
[§9 tutorial · §10 como testar · §11 o que 100 não significa · §12 referências]
```

Profundidade máxima de heading: **H3**. H4 apenas dentro de blocos de tutorial e nunca no sumário.

## 5. Estrutura completa de headings

```
H1  Como tornar um site Agent-Ready — e o que 100 no IsItAgentReady realmente prova

H2  1. A Web foi construída para humanos e para buscadores
    H3  O terceiro consumidor chegou sem convite
    H3  O que um agente não consegue fazer no seu site hoje

H2  2. O que é Agent Readiness
    H3  Definição operacional
    H3  As cinco propriedades: discoverable, readable, controllable, callable, payable
    H3  O que Agent Readiness não é

H2  3. HTML → SEO → AEO → Agent Readiness
    H3  Quatro consumidores, quatro contratos
    H3  Por que AEO não basta

H2  4. Antes de continuar: contexto em vídeo          ← VÍDEO
    H3  O que assistir com atenção

H2  5. A arquitetura em cinco camadas
    H3  DNS · Header · Well-known · Auth · Runtime
    H3  Por que redundância deliberada, e não uma camada só
    H3  Diagrama: do agente ao serviço

H2  6. As categorias do score, uma a uma
    H3  6.1 Discoverability — o agente precisa saber o que existe
        H4  robots.txt · sitemap.xml · Link headers (RFC 8288) · DNS-AID
    H3  6.2 Content Accessibility — o agente precisa ler sem parsear layout
        H4  Negociação de conteúdo Markdown
    H3  6.3 Bot Access Control — o agente precisa saber o que pode fazer com o conteúdo
        H4  Regras para AI bots · Content Signals · Web Bot Auth
    H3  6.4 API, Auth, MCP & Skill Discovery — o agente precisa poder agir
        H4  API Catalog (RFC 9727) · ARD · OAuth discovery (RFC 8414) · PRM (RFC 9728)
        H4  auth.md · MCP Server Card · A2A Agent Card · Agent Skills · WebMCP
    H3  6.5 Commerce — por que cinco checks ficam neutros aqui

H2  7. Do zero ao Agent-Native
    H3  Nível por nível, o que muda de verdade
    H3  "Acessível por um bot" ≠ "projetado para agentes"

H2  8. Estudo de caso: este site, do 75 ao 100
    H3  8.1 O agente não sabia que existiam recursos → Link header em toda resposta
    H3  8.2 O agente lia 196 KB de HTML para extrair 3,7 KB de texto → Markdown negociado
    H3  8.3 A negociação de Markdown derrubou 21 URLs do Search Console
    H3  8.4 O agente não sabia se podia treinar com o conteúdo → Content Signals
    H3  8.5 O check de auth falhou três vezes seguidas → o shape do `agent_auth`
    H3  8.6 DNS-AID publicado e ainda em fail → DNSSEC é bloqueante
    H3  8.7 O agente que executa a página → WebMCP

H2  9. Tutorial: implemente no seu site
    H3  Etapa 1 — Discoverability
    H3  Etapa 2 — Content accessibility
    H3  Etapa 3 — Bot access control
    H3  Etapa 4 — API e protocol discovery
    H3  Etapa 5 — MCP
    H3  Etapa 6 — Agent Skills
    H3  Etapa 7 — Autenticação e OAuth
    H3  Etapa 8 — Avançado: DNS-AID, WebMCP, Web Bot Auth

H2  10. Como testar seu site
    H3  Rodar o scan e ler a UI
    H3  Ler o JSON: onde está o sinal de verdade
    H3  O ciclo corrigir → publicar → rescanear

H2  11. O que um score 100 não prova
    H3  Metadado não é runtime: quatro endpoints deste site que retornam 404
    H3  Neutral não é pass
    H3  A régua é o instrumento, não a realidade

H2  12. Referências
```

## 6. Conteúdo proposto por seção

### §1 — O problema
Abrir com a frase-âncora, sem adorno: *a Web foi construída para humanos e para
mecanismos de busca; agora precisa ser compreensível, descobrível e utilizável
por agentes de IA.* Concretizar com um contraste medido neste site:
`src/devin.html` tem **196 KB**; o `.md` equivalente, **3,7 KB**. O agente que só
sabe pedir HTML gasta ~50× mais contexto para chegar ao mesmo texto.
Fechar listando o que o agente **não** consegue fazer sem superfície: descobrir
recursos, escolher formato, saber as regras de uso, invocar uma ação.

### §2 — Conceito
Definição operacional em uma frase (a tese do §3 desta spec). Depois as cinco
propriedades, cada uma com a pergunta que o agente faz:
`discoverable` (o que existe aqui?) · `readable` (em que formato eu leio?) ·
`controllable` (o que posso fazer com isto?) · `callable` (como eu invoco algo?) ·
`payable` (como eu pago, se houver o que pagar?).
Bloco "o que não é": não é bloquear crawler de IA; não é `llms.txt` sozinho;
não é criar `/.well-known/` no chute.

### §3 — Evolução
Tabela de quatro linhas: consumidor · o que ele lê · o que quebra se faltar.
HTML/humano/layout · SEO/crawler/`sitemap` + meta · AEO/motor de resposta/dados
estruturados + resposta direta · Agent Readiness/agente/descoberta + formato +
regra + invocação. Ponto crítico: **AEO otimiza a citação; Agent Readiness
habilita a ação.** Ligar a `engenharia-agentes-ia.html` (o MCP como fronteira).

### §4 — Vídeo
Ver §9 desta spec.

### §5 — Cinco camadas
Reaproveitar a tabela de `docs/AGENT_READINESS.md` §1 (DNS · Header HTTP ·
Well-known · Auth · Runtime), com a coluna "descoberto por". O argumento é
arquitetural: **nenhuma camada depende da outra**, e o agente entra por qualquer
uma. Um agente que resolve DNS antes de qualquer HTTP encontra o site; um agente
que faz um `GET /` qualquer recebe o `Link`; um agente que segue convenção acha
`/.well-known/`. Diagrama em §13.

### §6 — Categorias
Para **cada** check, o mesmo esqueleto de 6 blocos (componente repetido, ver §13):

1. **Princípio** — o que o check realmente mede (nunca "ter o arquivo X").
2. **Padrão** — RFC/spec, com link para a fonte primária.
3. **Como implementar** — exemplo mínimo, genérico, marcado como genérico.
4. **Neste projeto** — o trecho real, com caminho e linha.
5. **Como validar** — comando `curl`/DoH copiável.
6. **Estado aqui** — `pass` / `neutral` / `declarado mas não executável`.

Textos-âncora de princípio, para não virar lista de padrões:
- *Discoverability não é ter sitemap. É dar ao agente mecanismos explícitos para descobrir quais recursos existem e como chegar até eles — em pelo menos duas camadas independentes.*
- *Content accessibility não é ter `.md`. É responder no formato que o cliente pediu — e caber no orçamento de contexto dele.*
- *Bot access control não é bloquear. É declarar a regra de uso de forma legível por máquina: indexar sim, treinar não, responder pergunta sim.*
- *Protocol discovery não é publicar JSON. É publicar um contrato que alguém pode invocar — e honrá-lo.*

Nota obrigatória em 6.3: o `robotsTxtAiRules` passa com a mensagem *"No
AI-specific bot rules; wildcard rules apply to all crawlers including AI bots"* —
ou seja, **passa por ausência de bloqueio, não por presença de regra**. Explicar
a diferença é mais útil que celebrar o verde.

### §7 — Do zero ao Agent-Native
Progressão pelos níveis do instrumento (1 a 5), amarrando cada degrau a uma das
cinco propriedades do §2. Encerrar com o contraste pedido:
"site que pode ser acessado por um bot" = não bloqueia, serve 200, tem sitemap.
"Site projetado para agentes" = o agente descobre sem adivinhar, lê no formato
que pediu, sabe a regra de uso e encontra um contrato invocável.

### §8 — Estudo de caso
Sete casos, todos no formato **PROBLEMA → SOLUÇÃO → IMPLEMENTAÇÃO → VALIDAÇÃO →
IMPACTO**. Regra rígida: **IMPACTO é qualitativo**. Nada de "+X% de tráfego de
agentes" — o site não mede isso. Impacto legítimo: "o agente deixa de precisar de
uma segunda requisição", "o check saiu de fail para pass", "21 URLs voltaram a
responder 200".

Os três casos que carregam a página são os de fracasso:

- **8.3** — `HandlerExtentionHTML.js` e `markdown-negotiation.js` eram duas CloudFront Functions; uma cache behavior aceita **uma** associação por tipo de evento. Escolher a de Markdown fez toda URL sem `.html` cair em 404 — 21 páginas em "Não encontrado" no Search Console, exatamente as do sitemap. Solução: função única, responsabilidades em ordem, com `/.well-known/` isento da sufixação `.html` (senão a descoberta quebra). Fonte: `infra/cloudfront-functions/viewer-request.js`; gate em `tests/cloudfront-viewer-request.test.js`.
- **8.5** — o `agent_auth` vive na **AS metadata**, não no `auth.md`; `skill` aponta para `/auth.md`; e o trio anônimo (`identity_types_supported` + `anonymous.credential_types_supported` + `claim_uri`) precisa estar **dentro** do bloco `agent_auth` — em `methods[]` ou no topo do documento é ignorado. Três iterações de deploy. Fonte: `docs/AGENT_READINESS.md` §5.
- **8.6** — os 3 registros DNS-AID publicados e o check ainda em `fail`: o scanner exige `dnssecValidated: true`. Como `issei.com.br` é registrado no Registro.br, o DS é cadastrado à mão e leva ~4 h para propagar. Incluir o aviso de rollback (remover DS → esperar ~24 h → só então desabilitar signing), porque a KMS key é ponto único de falha do domínio inteiro.

### §9 — Tutorial
Oito etapas na ordem do briefing. Cada etapa: **objetivo · pré-requisito ·
implementação · exemplo · validação · ferramenta**. Todo bloco de código marcado
com um dos dois rótulos visuais: `EXEMPLO GENÉRICO` ou `CÓDIGO REAL DESTE SITE`.

Aviso obrigatório na Etapa 1: **Link headers exigem controle do servidor/CDN**.
Neste site a policy vive no CloudFront e **não está no repositório** — o leitor
em Vercel/Netlify/nginx precisa da receita do seu próprio stack. Não fingir que
é um arquivo commitável.

Aviso obrigatório na Etapa 5: publicar um MCP Server Card **não** cria um
servidor MCP. Ver §11.

### §10 — Como testar
Rodar o scan pela UI. Depois a parte que ninguém publica: **a UI devolve
remediação genérica fixa**, idêntica em todo scan que falha aquele check. O sinal
real está em `evidence[].finding.summary`, só visível no JSON. Incluir o script
de leitura de `docs/AGENT_READINESS.md` §6, adaptado, e a sequência real que
destravou o `authMd` (a fila de validadores: cada correção revela a próxima
mensagem, enquanto o texto de topo não muda).
Regra operacional: **confira o que está no ar, não o que está no repo** — um scan
roda contra produção; repo certo + deploy pendente parece bug de implementação e não é.

### §11 — O que 100 não prova
A seção que justifica a página existir. Três subseções:

1. **Metadado não é runtime.** Tabela dos 404 medidos (§0.3): `/mcp`,
   `/oauth/authorize`, `/oauth/token`, `/.well-known/jwks.json`. O check
   `mcpServerCard` valida que o card existe e é JSON válido; não conecta.
   Dizer explicitamente: *este site declara um endpoint MCP que não existe. Ou se
   implementa, ou se enxuga o metadado.*
2. **Neutral não é pass.** 6 dos 22 checks aqui são `neutral`. Cinco por decisão
   de escopo (não é e-commerce); um — `webBotAuth` — porque não foi implementado.
   Um instrumento que não penaliza ausência não atesta presença.
3. **A régua é o instrumento.** 100 significa: passou nos checks considerados por
   aquele instrumento, naquela configuração, naquela data. Não significa que
   qualquer agente consegue fazer qualquer coisa no site.

## 7. Exemplos técnicos (conteúdo dos blocos de código)

Todos verificados. Rótulo obrigatório em cada bloco.

**`CÓDIGO REAL` — `public/robots.txt`**
```
User-agent: *
Allow: /
Content-Signal: ai-train=no, search=yes, ai-input=yes

Sitemap: https://mauricio.issei.com.br/sitemap.xml
Agentmap: https://mauricio.issei.com.br/.well-known/ai-catalog.json
LLMs: https://mauricio.issei.com.br/llms.txt
```

**`CÓDIGO REAL` — header `Link` servido em toda resposta** (medido; quebras de linha adicionadas para leitura)
```http
link: </.well-known/api-catalog>; rel="api-catalog",
      </.well-known/ai-catalog.json>; rel="service-desc"; type="application/json",
      </llms.txt>; rel="service-doc"; type="text/plain",
      </llms-full.txt>; rel="describedby"; type="text/plain",
      </cv-for-ai.md>; rel="service-doc"; type="text/markdown",
      </cv.json>; rel="describedby"; type="application/json",
      </.well-known/oauth-protected-resource>; rel="oauth-protected-resource"
vary: Accept
```

**`CÓDIGO REAL` — negociação de conteúdo** (`infra/cloudfront-functions/viewer-request.js`)
Mostrar `prefersMarkdown()` inteiro. É o coração pedagógico: um navegador manda
`text/html,…,*/*;q=0.8` e **não** pode receber Markdown; a função compara os `q`
de `text/markdown` e `text/html` conforme RFC 7231 §5.3.2. Mostrar também as duas
guardas que vieram do incidente: `/.well-known/` isento de sufixação `.html`, e o
teste de extensão no **último segmento**, não na URI inteira.
Acompanhar com a nota de cache: sem `Vary: Accept` na Response Headers Policy, o
CloudFront serve Markdown para navegador.

**`CÓDIGO REAL` — bloco `agent_auth`** (`public/.well-known/oauth-authorization-server`)
Colar o bloco literal e, ao lado, as três regras não óbvias (§8.5).

**`CÓDIGO REAL` — WebMCP** (`src/index.html:675-706`) — o `registerTool` de
`get_cv_data`, com o guard `typeof navigator.modelContext !== 'undefined'`.

**`EXEMPLO GENÉRICO` — API Catalog mínimo** (RFC 9727), 1 âncora com `service-desc`.

**`EXEMPLO GENÉRICO` — PRM mínima** (RFC 9728), 4 campos.

**`CÓDIGO REAL` — validação**
```bash
# Link headers + Vary
curl -sI https://mauricio.issei.com.br/ | grep -i '^link\|^vary'

# Negociação de Markdown (deve responder text/markdown)
curl -s -H 'Accept: text/markdown' -o /dev/null \
  -w '%{content_type}\n' https://mauricio.issei.com.br/devin

# Um navegador NÃO pode receber Markdown (deve responder text/html)
curl -s -H 'Accept: text/html,application/xhtml+xml,*/*;q=0.8' -o /dev/null \
  -w '%{content_type}\n' https://mauricio.issei.com.br/devin

# DNS-AID com validação DNSSEC (exige Status:0 e AD:true)
curl -s -H 'accept: application/dns-json' \
  'https://cloudflare-dns.com/dns-query?name=_index._agents.mauricio.issei.com.br&type=HTTPS&do=1'

# agent_auth no ar
curl -s https://mauricio.issei.com.br/.well-known/oauth-authorization-server | jq .agent_auth
```

## 8. Referências externas (âncoras descritivas, fonte primária)

| Âncora sugerida | URL | Onde entra |
|---|---|---|
| o anúncio de Agent Readiness da Cloudflare | https://blog.cloudflare.com/agent-readiness/ | §2, §12 |
| o avaliador IsItAgentReady | https://isitagentready.com/ | hero, §10, §12 |
| RFC 8288 — Web Linking | https://www.rfc-editor.org/rfc/rfc8288 | §6.1 |
| RFC 9309 — Robots Exclusion Protocol | https://www.rfc-editor.org/rfc/rfc9309 | §6.1 |
| RFC 9460 — SVCB/HTTPS records | https://www.rfc-editor.org/rfc/rfc9460 | §6.1 |
| RFC 7231 §5.3.2 — negociação de conteúdo (`Accept`) | https://www.rfc-editor.org/rfc/rfc7231#section-5.3.2 | §6.2 |
| RFC 7763 — `text/markdown` | https://www.rfc-editor.org/rfc/rfc7763 | §6.2 |
| RFC 9727 — API Catalog | https://www.rfc-editor.org/rfc/rfc9727 | §6.4 |
| RFC 9728 — OAuth Protected Resource Metadata | https://www.rfc-editor.org/rfc/rfc9728 | §6.4 |
| RFC 8414 — OAuth Authorization Server Metadata | https://www.rfc-editor.org/rfc/rfc8414 | §6.4 |
| Content Signals Policy | https://contentsignals.org/ | §6.3 |
| Web Bot Auth (Cloudflare Docs) | https://developers.cloudflare.com/bots/concepts/bot/verified-bots/web-bot-auth/ | §6.3, §11 |
| a especificação do Model Context Protocol | https://modelcontextprotocol.io/ | §6.4 |
| o padrão llms.txt | https://llmstxt.org/ | §6.2 |
| Agent2Agent (A2A) | https://a2a-protocol.org/ | §6.4 |
| Agent Skills | https://agentskills.io/ | §6.4 |
| WebMCP / `navigator.modelContext` | https://github.com/webmachinelearning/webmcp | §6.4, §8.7 |

Internos: `engenharia-agentes-ia.html` (MCP como fronteira), `engenharia-confianca.html`
(determinístico-primeiro), `knowledge-os-presentation.html` (conhecimento como
infraestrutura), `catalogo.html` (mapa), `llms.txt`.
**Verificar toda URL externa antes de publicar (§15)** — `audit-site.mjs` não cobre externos.

## 9. Integração do vídeo

**Vídeo:** https://www.youtube.com/watch?v=g3JWoT7EGYs
**Posição:** §4, imediatamente após a evolução HTML→SEO→AEO→Agent Readiness e
**antes** do mergulho técnico do §5.

**Justificativa editorial (texto de enquadramento, ~90 palavras):** o leitor
acabou de aceitar que existe um quarto consumidor da Web e ainda não tem intuição
de por que isso muda a arquitetura de um site. O vídeo entrega essa intuição em
formato narrativo; o resto da página entrega a implementação. Quem já tem a
intuição pode pular — dizer isso explicitamente, com âncora direta para §5.

Requisitos de implementação:
- `<iframe>` `youtube-nocookie.com/embed/g3JWoT7EGYs?rel=0&modestbranding=1`, `loading="lazy"`, `title` descritivo, container com `aspect-ratio` — mesmo padrão de `src/artifice.html:523` e `src/formulacao-de-problemas.html:766`.
- Entrada `video: { name, description, thumb, uploadDate, embed, url }` em `scripts/seo/pages.mjs` → gera o `VideoObject` no JSON-LD automaticamente (mesmo mecanismo de `artifice` e `formulacao-de-problemas`).
- **Antes de escrever o texto de enquadramento, assistir ao vídeo.** Esta spec não afirma o conteúdo dele; `name`, `description` e `uploadDate` precisam ser preenchidos com o que o vídeo de fato é. Não inventar.
- Abaixo do player, um bloco "o que assistir com atenção" com 3 pontos ligados a seções da página.

## 10. Seção × check do IsItAgentReady

| Seção | Checks cobertos | Papel |
|---|---|---|
| §1–§3 | — | conceito; nenhum check |
| §4 vídeo | — | intuição |
| §5 camadas | todos os 16 `pass` | mapa mental |
| §6.1 | `robotsTxt`, `sitemap`, `linkHeaders`, `dnsAid` | 4/4 Discoverability |
| §6.2 | `markdownNegotiation` | 1/1 Content |
| §6.3 | `robotsTxtAiRules`, `contentSignals`, `webBotAuth` | 2/2 pass + 1 neutral |
| §6.4 | `apiCatalog`, `ard`, `oauthDiscovery`, `oauthProtectedResource`, `authMd`, `mcpServerCard`, `a2aAgentCard`, `agentSkills`, `webMcp` | a categoria "8/8" do relatório |
| §6.5 | `x402`, `mpp`, `ucp`, `acp`, `ap2` | 5 neutral |
| §8 | `linkHeaders`, `markdownNegotiation`, `contentSignals`, `authMd`, `dnsAid`, `webMcp` | os 6 que custaram trabalho |
| §9 | todos | reexecução pelo leitor |
| §11 | `mcpServerCard`, `oauthDiscovery`, `webBotAuth`, commerce | limites do instrumento |

> Nota de precisão obrigatória: a UI reporta **API, Auth, MCP & Skill Discovery: 8/8**;
> o JSON lista **9** entradas em `checks.discovery` (as 8 + `ard`, que a UI conta em
> outra agregação). A página registra isso em nota de rodapé em vez de escolher um
> dos dois números em silêncio.

## 11. Evidências no código (resumo executivo da §0)

**Comprovadamente implementado (repo + produção):** `robots.txt` com Content
Signals · sitemap gerado no build · header `Link` com 7 relações · DNS-AID com
DNSSEC validado · negociação Markdown · api-catalog · ai-catalog (ARD) ·
openid-configuration · oauth-protected-resource · oauth-authorization-server com
`agent_auth` · auth.md · MCP server card · A2A agent card · agent-skills com
digest · WebMCP com 2 tools.

**Parcial / declarado mas não executável:** endpoint `/mcp` (404) ·
`/oauth/authorize`, `/oauth/token`, `/.well-known/jwks.json` (404) ·
`/.well-known/api-catalog` servido como `binary/octet-stream`.

**Não implementado (e a página deve dizer):** Web Bot Auth · os 5 de Commerce.

**Existe, mas fora do escopo do scanner:** `llms.txt`, `llms-full.txt`,
`/.well-known/agent-catalog`, sistema AEO/GEO, gêmeo `/en/`.

**Não mencionar:** nenhum outro `.well-known`, endpoint, header ou padrão.
Identificadores opacos de recurso AWS (distribution ID, hosted zone ID, key ID,
account ID) ficam **fora** — o repositório é público (`docs/AGENT_READINESS.md` §3).
Nomes de policy e de função são citáveis; IDs não.

## 12. Requisitos de SEO / AEO / Agent Readiness da própria página

A página entra em `scripts/seo/pages.mjs` como qualquer outra — meta, JSON-LD,
bloco "Em síntese" + FAQ, OG e `.md` são **gerados**, não escritos à mão.

| Campo | Valor |
|---|---|
| `slug` | `agent-ready` |
| `type` | `TechArticle` |
| `tier` | `S` |
| `hasMd` | `true` |
| `title` | `Agent Ready — como um site alcança 100 no IsItAgentReady` |
| `headline` | `Como tornar um site Agent-Ready: os padrões, a implementação e o que o score não prova` |
| `description` | `Agent Readiness na prática: robots.txt, Link headers RFC 8288, Markdown negociado, Content Signals, API Catalog, MCP, Agent Skills e OAuth — com o código real de um site que mede 16/16 no IsItAgentReady, e os limites do instrumento.` |
| `canonical` | `https://mauricio.issei.com.br/agent-ready` (gerado por `pageUrl()`) |
| `section` | `Engenharia de IA · Web Standards` |
| `audience` | `Engenheiros de software, arquitetos, SREs, tech leads e SEO técnico` |
| `datePublished` / `dateModified` | data real do merge |

**H1 (único, obrigatório — `tests/aeo.spec.js` cobra):**
`Como tornar um site Agent-Ready — e o que 100 no IsItAgentReady realmente prova`

**`keywords`:** agent readiness, agent-ready, IsItAgentReady, agentic web,
Markdown para agentes, MCP Server Card, Agent Skills, WebMCP, A2A Agent Card,
API Catalog RFC 9727, OAuth Protected Resource RFC 9728, Link header RFC 8288,
Content Signals, DNS-AID, llms.txt, AEO, crawler de IA.

**`about[]`:** Agent Readiness · Model Context Protocol (`sameAs` https://modelcontextprotocol.io) ·
Web Standards · Answer Engine Optimization · OAuth 2.0.

**`teaches[]`:** publicar uma superfície de descoberta em cinco camadas independentes ·
servir Markdown por negociação de conteúdo sem quebrar o site para navegadores ·
declarar regras de uso legíveis por máquina com Content Signals ·
publicar contratos invocáveis (API Catalog, MCP, Agent Skills) ·
ler o JSON de um scan em vez da mensagem genérica da UI ·
distinguir metadado declarado de runtime existente.

**`faq[]` — obrigatório; cobre as 9 perguntas do briefing** (uma a uma, resposta
autossuficiente de 40–90 palavras, porque vira `FAQPage` no JSON-LD e é o que
motor de resposta cita):
O que é Agent Readiness? · O que significa ser Agent-Ready? · Como alcançar score
100 no IsItAgentReady? · O que é Markdown para agentes? · O que é um MCP Server
Card? · O que são Agent Skills? · Como agentes descobrem APIs? · Como controlar o
acesso de AI bots? · Como testar se um site é Agent-Native? ·
**\+ obrigatória:** Um score 100 significa que o site é perfeito para agentes?
(resposta: não — e por quê, com os 404 medidos).

**`terms[]` (glossário):** Agent Readiness · Agent-Native · ARD · DNS-AID ·
Content Signals · Negociação de conteúdo · MCP Server Card · A2A Agent Card ·
Agent Skills · WebMCP · PRM · API Catalog · Web Bot Auth · llms.txt.

**`mdSections[]`:** o `.md` precisa ser **autossuficiente** — um agente que só lê
`/agent-ready.md` deve conseguir implementar. Espelhar §5, §6, §9, §10 e §11.
Não é resumo: é a versão sem layout.

**`og{}`:** `eyebrow: 'Agentic Web'`, `title: 'Agent {Ready}'`, `subtitle` com o
placar auditável, `chips: ['RFC 8288','RFC 9727','RFC 9728','MCP','DNS-AID','WebMCP']`.
Gerar com `node scripts/seo/gen-og.mjs agent-ready`.

**Agent Readiness da própria página:**
- entrada nova em `MARKDOWN_MAP` de `infra/cloudfront-functions/viewer-request.js` (`/agent-ready` e `/agent-ready.html` → `/agent-ready.md`) **e** caso novo em `tests/cloudfront-viewer-request.test.js`;
- entrada em `public/llms.txt` (seção "Conteúdo Técnico em Destaque") e regeneração de `llms-full.txt`;
- nó `agent-ready` no pilar **p2** de `specs/ecosystem.nav.yaml` **e** na cópia compilada `src/js/eco-nav.js`, com bump de `meta.version` para `1.5.0` (governança SPEC §4.4);
- card em `src/catalogo.html`, pilar p2;
- ≥ 2 crosslinks reais de entrada (de `engenharia-agentes-ia.html` e `engenharia-confianca.html`) — `audit-site.mjs --strict` reprova página órfã;
- gêmeo `/en/` gerado por `npm run i18n:sync` (**tradução local, nunca por LLM**).

**Fragmentabilidade:** todo H2/H3 com `id` estável e âncora visível; parágrafos
curtos; cada bloco de check autocontido (um agente que recupera só aquele
fragmento consegue implementar sem ler o resto).

## 13. Elementos visuais

Paleta **Dark Tech** obrigatória (`#0d1117`, acentos `#007bff`→`#8a2be2`).
Nenhum fundo claro — `audit-site.mjs` INV-S9 reprova.

1. **Placar auditável (hero).** `16 pass · 0 fail · 6 neutral · Level 5` com a data
   do scan e link para o IsItAgentReady. **Estático, escrito à mão.** Nada de
   fetch para a API do scanner: promessa que envelhece mal e cria dependência de
   terceiro em runtime. A data explícita é parte do componente.
2. **Diagrama das 5 camadas (SVG inline, §5).** Vertical:
   `USER / AGENT → DISCOVERY → CONTENT → ACCESS CONTROL → API / MCP / SKILLS → SITE / SERVICES`.
   Cada bloco anotado com o artefato real deste site (`_agents.` DNS + `Link` header ·
   `.md` negociado · `Content-Signal` · `api-catalog` / `server-card` / `agent-skills` ·
   S3 + CloudFront). SVG inline com `<title>`/`<desc>`, texto real (não path),
   `role="img"`, `aria-labelledby`, viewBox responsivo. Sem biblioteca.
3. **Cartão de check (componente repetido, §6).** Cabeçalho com badge de estado
   (`pass` verde · `neutral` âmbar · `declarado` roxo) + nome do check; corpo nos
   6 blocos do §6; rodapé com o `curl` de validação e botão copiar.
4. **Tabela dos quatro consumidores (§3).** `overflow-x: auto` obrigatório.
5. **Trilha do nível 1→5 (§7).** Progressão horizontal (vertical no mobile), sem
   animação obrigatória; respeitar `prefers-reduced-motion`.
6. **Bloco de incidente (§8.3, 8.5, 8.6).** Variante visual distinta (borda âmbar)
   — sinaliza "isto deu errado" sem depender só de cor (ícone + rótulo textual).
7. **Rótulo de bloco de código.** `EXEMPLO GENÉRICO` vs `CÓDIGO REAL DESTE SITE`,
   com o caminho do arquivo quando real.
8. **Player do vídeo (§4).** `aspect-ratio`, `loading="lazy"`, `youtube-nocookie`.
9. **Tabela dos 404 (§11).** Deliberadamente sóbria — é a seção de honestidade,
   não de alarme.

Sem GSAP/Lenis nesta página salvo necessidade real: o conteúdo é dado, não espetáculo.

## 14. Critérios de aceite

**Conteúdo e verdade**
- **CA-01** Todo artefato citado como implementado existe no repositório **e** responde em produção; conferido por `curl` no dia da publicação.
- **CA-02** Nenhum padrão, endpoint, arquivo ou header fora da lista da §0 aparece descrito como implementado neste site.
- **CA-03** Todo bloco de código carrega o rótulo `EXEMPLO GENÉRICO` ou `CÓDIGO REAL DESTE SITE`; os reais batem literalmente com o arquivo citado.
- **CA-04** §11 existe, nomeia os quatro 404 medidos e afirma explicitamente que o site declara um endpoint MCP que não existe.
- **CA-05** Nenhum resultado quantitativo inventado (tráfego, conversão, "% de agentes"). Números permitidos: contagens de checks, tamanhos de arquivo medidos, contagem de URLs do incidente do Search Console.
- **CA-06** Nenhum identificador opaco de recurso AWS.
- **CA-07** Os 7 casos da §8 seguem PROBLEMA→SOLUÇÃO→IMPLEMENTAÇÃO→VALIDAÇÃO→IMPACTO, com pelo menos 3 casos de fracasso.
- **CA-08** As 9 perguntas do briefing + a pergunta sobre os limites do 100 estão no `faq[]`, com resposta autossuficiente.
- **CA-09** Texto de enquadramento do vídeo escrito **depois** de assistir; `video.name`/`description`/`uploadDate` correspondem ao vídeo real.
- **CA-10** Tom de engenharia (`tone-reviewer` sem apontamento de marketing).

**Técnico**
- **CA-11** H1 único; canonical == `pageUrl('agent-ready')`; sem `noindex` — `tests/aeo.spec.js` verde.
- **CA-12** Entrada completa em `scripts/seo/pages.mjs`; `build-aeo.mjs agent-ready --md` idempotente (rodar duas vezes não muda o diff).
- **CA-13** `public/agent-ready.md` autossuficiente: um agente que só o lê consegue implementar as 8 etapas.
- **CA-14** `MARKDOWN_MAP` + caso novo em `tests/cloudfront-viewer-request.test.js`; após deploy, `curl -H 'Accept: text/markdown' .../agent-ready` → `text/markdown`, e um `Accept` de navegador → `text/html`.
- **CA-15** `specs/ecosystem.nav.yaml` (p2, `meta.version` → 1.5.0) **e** `src/js/eco-nav.js` atualizados juntos; card em `catalogo.html`.
- **CA-16** ≥ 2 crosslinks reais de entrada; `node scripts/audit-site.mjs --strict` verde.
- **CA-17** Entrada em `public/llms.txt` + `llms-full.txt` regenerado.
- **CA-18** OG gerado (`gen-og.mjs agent-ready`); `public/og-agent-ready.png` existe.
- **CA-19** Gêmeo `/en/` gerado por `npm run i18n:sync`; `npm run i18n:check` verde. Tradução **local**.
- **CA-20** `tests/agent-ready.spec.js` novo: smoke (200, H1, `<title>`), a11y (`expectNoSeriousA11yViolations`), presença do iframe do vídeo com `title`, presença do SVG do diagrama com `<title>`.
- **CA-21** Dark Tech: nenhum fundo claro declarado (INV-S9).
- **CA-22** `npm run gate` verde de ponta a ponta.
- **CA-23** Toda tabela e todo bloco de código largo dentro de container com `overflow-x: auto`; sem scroll horizontal no `<body>` a 360 px.

## 15. Checklist final de validação da página

Rodar **na ordem**, antes de abrir o PR:

```bash
# 1. artefatos AEO gerados e idempotentes
node scripts/seo/build-aeo.mjs agent-ready --md
git diff --stat                     # rodar de novo não pode mudar nada
node scripts/seo/gen-og.mjs agent-ready

# 2. gêmeo em inglês
npm run i18n:sync && npm run i18n:check

# 3. gate completo (build + artefatos + grafo + invariantes + playwright/axe + perf)
npm run gate
```

Depois do deploy, contra produção:

```bash
# 4. a página responde e negocia Markdown
curl -sI https://mauricio.issei.com.br/agent-ready | head -3
curl -s -H 'Accept: text/markdown' -o /dev/null \
  -w '%{content_type}\n' https://mauricio.issei.com.br/agent-ready   # text/markdown
curl -s -H 'Accept: text/html,*/*;q=0.8' -o /dev/null \
  -w '%{content_type}\n' https://mauricio.issei.com.br/agent-ready   # text/html

# 5. a página não regrediu a descoberta do site
curl -sI https://mauricio.issei.com.br/ | grep -i '^link\|^vary'

# 6. rescan — deve continuar 16 pass / 0 fail / 6 neutral
curl -s -X POST https://isitagentready.com/api/scan \
  -H 'content-type: application/json' \
  -d '{"url":"https://mauricio.issei.com.br"}' > scan.json
```

Conferência editorial final:

- [ ] Toda URL externa da §8 desta spec abre (verificação manual; o gate não cobre externos).
- [ ] Nenhuma afirmação sobre o vídeo antes de assistir.
- [ ] Cada bloco `CÓDIGO REAL` conferido contra o arquivo, linha a linha.
- [ ] §11 sobrevive à leitura de alguém cético: um leitor hostil não consegue acusar a página de vender o 100.
- [ ] Data do scan visível no hero.
- [ ] `docs/AGENT_READINESS.md` atualizado se a página revelar algo novo (a KB é a fonte da verdade; a página é a versão pública dela).

---

## Follow-ups gerados por esta auditoria (fora do escopo da página)

1. **Resolver os quatro 404 declarados.** Implementar `/mcp` ou remover
   `endpoint`/`transport` do server-card; remover `authorization_endpoint`,
   `token_endpoint` e `jwks_uri` da AS metadata e do `openid-configuration`, já
   que o fluxo real é anônimo. Publicar a página descrevendo a inconsistência e
   deixá-la de pé é pior que corrigi-la antes.
2. **`Content-Type` dos `/.well-known/` sem extensão** — hoje `binary/octet-stream`.
3. **`docs/specs/spec-agent-readiness-v2-mauricio-issei.md`** — marcar como
   superseta por `docs/AGENT_READINESS.md`.

---

## Registro de implementação (2026-09-07)

A página foi construída. Arquivos: `src/agent-ready.html`, `src/agent-ready.css`,
entrada em `scripts/seo/pages.mjs`, `public/agent-ready.md` e
`public/og-agent-ready.png` gerados, `tests/agent-ready.spec.js`, nó `agent-ready`
em `specs/ecosystem.nav.yaml` + `src/js/eco-nav.js` (`meta.version` 1.5.0), card em
`src/catalogo.html` (p2), entrada em `public/llms.txt`, `MARKDOWN_MAP` e três casos
novos em `tests/cloudfront-viewer-request.test.js`. Crosslinks reais de entrada:
`engenharia-agentes-ia.html` (bloco de conexões do pilar MCP) e
`engenharia-confianca.html` (tabela de referências cruzadas do M2).

### Desvio deliberado da spec — §11 e CA-04

**Decisão do autor, 2026-09-07:** a página **não** nomeia endpoints deste domínio
que estejam declarados em metadado e ainda não respondam. A §11 foi reescrita para
ensinar o mesmo princípio em forma geral — *os checks de descoberta validam
documentos, não runtime; declare o que você sustenta e teste cada capacidade
exercitando-a* — sem expor a superfície específica deste site.

**CA-04 fica revogado** e substituído por: *§11 existe, afirma que metadado de
descoberta não é runtime, que neutral não é pass e que a régua é o instrumento —
sem enumerar endpoints deste domínio.* O follow-up 1 (resolver os quatro 404
declarados) **permanece aberto** e independe da página.

Pelo mesmo motivo, nenhum identificador ou nome de recurso de infraestrutura
aparece no texto: a política de headers e a função de borda são descritas pelo que
fazem ("uma política de headers no CDN", "uma função na borda"), nunca pelo nome
ou pelo identificador. O repositório é público.

### Ajustes de conteúdo em relação à spec

- **Casos da §8:** seis, não sete. O caso que dependia de descrever a lacuna entre
  card e endpoint saiu junto com a §11 original; os três incidentes previstos
  (colisão de funções de borda, forma do `agent_auth`, DNSSEC bloqueante) estão
  todos presentes, que era o requisito real de CA-07.
- **Vídeo:** título, canal e data de publicação foram lidos da própria API do
  YouTube (`oembed` + página do vídeo) antes de escrever o enquadramento —
  `O Seu Site Está Pronto para IA?`, publicado em 2026-04-26. O texto de
  enquadramento fala do lugar do vídeo na leitura, não do conteúdo dele.
- **Números:** só medidos. `/devin` responde 197.642 bytes de HTML contra 3.773 do
  Markdown (52×), medido em produção em 2026-09-07; o placar 16/0/6 nível 5 carrega
  a data no próprio componente.
- **Regra de sublinhado (a11y):** os links da página são sublinhados por exclusão,
  não por lista de contextos — o azul do link contra o cinza do corpo dá 1,63:1, e
  uma allowlist de seções falha em silêncio na primeira seção nova. Coberto por
  `tests/agent-ready.spec.js`.
