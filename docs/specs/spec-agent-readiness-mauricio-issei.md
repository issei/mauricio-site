# Meta-prompt de especificação — Fechar gaps de Agent Readiness no site mauricio.issei.com.br

> Cole este documento inteiro como prompt para o agente de codificação (Claude Code ou similar) que tem acesso ao repositório do site. Ele contém todo o contexto, os requisitos técnicos exatos e os critérios de aceite.

## 1. Contexto

O site **https://mauricio.issei.com.br** (portfólio/CV do Maurício Yokoyama Issei, hospedado em S3 + CloudFront) foi escaneado pelo **isitagentready.com** em 04/09/2026 e obteve **75/100 — Nível 5 (Agent-Native)**.

O site já implementa corretamente:
- `robots.txt` com `Sitemap:` e `Content-Signal: ai-train=no, search=yes, ai-input=yes`
- `sitemap.xml`
- `Link` headers (RFC 8288) com `rel="api-catalog"`, `rel="describedby"`, `rel="service-doc"` apontando para `/llms.txt`, `/llms-full.txt`, `/cv-for-ai.md`, `/cv.json`
- `/.well-known/api-catalog` (RFC 9727) com 3 entradas linkset
- `/.well-known/openid-configuration` (issuer `https://mauricio.issei.com.br`)
- `/.well-known/oauth-protected-resource` (scopes: `cv:read`, `projects:read`, `profile`; `bearer_methods_supported: ["header"]`; `resource_documentation: /cv-for-ai.md`)
- `/.well-known/mcp/server-card.json` (formato SEP, `name: "mauricio-issei-portfolio"`)
- `/.well-known/agent-skills/index.json` (v0.2.0, 2 skills)
- WebMCP via `navigator.modelContext` com as ferramentas `get_cv_data` e `get_star_projects`
- `/openapi.json`, `/cv.json`, `/cv-for-ai.md`

**Faltam 4 itens**, todos hoje com status `fail` no scanner:

| Check | Status atual | Path/mecanismo esperado |
|---|---|---|
| ARD (Agentic Resource Discovery) | fail — manifesto não encontrado | `/.well-known/ai-catalog.json` |
| A2A Agent Card | fail — 404 | `/.well-known/agent-card.json` |
| Auth.md | fail — 404 | `/auth.md` |
| DNS-AID (DNS for AI Discovery) | fail — NXDOMAIN em todos os `_agents` | registros SVCB/HTTPS em `_agents.mauricio.issei.com.br` |

Este documento especifica exatamente o que criar/publicar para cada um.

**Não mexer em nada além do listado abaixo.** Não alterar `cv.json`, `cv-for-ai.md`, `openapi.json`, o server-card MCP existente, robots.txt, sitemap, nem o Google Tag Manager/Analytics. Não é um site de e-commerce — os checks de Commerce (x402, MPP, UCP, ACP, AP2) devem continuar `neutral`, não implementá-los.

---

## 2. Tarefa 1 — ARD: `/.well-known/ai-catalog.json`

Referência: skill `ard` (spec ARD v0.9 / modelo de dados `ai-catalog`).

### Requisitos
- Servir em `/.well-known/ai-catalog.json`, na raiz do domínio, com `Content-Type: application/json` e `Access-Control-Allow-Origin: *`, HTTP 200.
- `specVersion` (string, refere-se à versão do modelo de dados ai-catalog, não da spec ARD — pode ser `"1.0"`).
- `host` com `displayName` e um `identifier` estável (usar `did:web:mauricio.issei.com.br` ou uma URN equivalente).
- `entries`: array não vazio. Cada entrada precisa de `identifier` (formato `urn:air:mauricio.issei.com.br:<namespace>:<name>`), `displayName`, `type` (media type IANA), e **exatamente um** de `url` ou `data` (nunca os dois, nunca nenhum).
- Cada entrada deve ter de 2 a 5 `representativeQueries` (perguntas em linguagem natural que um agente faria para chegar a esse recurso) — isso é o que a spec usa para gerar embeddings semânticos em registries.
- Referenciar os recursos que já existem no site: o MCP server card, o CV estruturado (`cv.json`), o OpenAPI (`openapi.json`), e o skills index — não recriar dados, apenas apontar para eles.

### Conteúdo sugerido (adaptar campos conforme o real conteúdo do CV/projetos)

```json
{
  "specVersion": "1.0",
  "host": {
    "displayName": "Maurício Yokoyama Issei",
    "identifier": "did:web:mauricio.issei.com.br"
  },
  "entries": [
    {
      "identifier": "urn:air:mauricio.issei.com.br:server:portfolio-mcp",
      "displayName": "Portfolio MCP Server",
      "type": "application/mcp-server-card+json",
      "url": "https://mauricio.issei.com.br/.well-known/mcp/server-card.json",
      "representativeQueries": [
        "quais ferramentas MCP este portfólio expõe",
        "como conectar um agente ao servidor MCP do Maurício Issei"
      ]
    },
    {
      "identifier": "urn:air:mauricio.issei.com.br:data:cv",
      "displayName": "Currículo estruturado (CV)",
      "type": "application/json",
      "url": "https://mauricio.issei.com.br/cv.json",
      "representativeQueries": [
        "qual a experiência profissional do Maurício Issei",
        "quais certificações e formações o Maurício Issei possui",
        "resumo do currículo do Maurício Yokoyama Issei"
      ]
    },
    {
      "identifier": "urn:air:mauricio.issei.com.br:api:openapi",
      "displayName": "API do portfólio (OpenAPI)",
      "type": "application/openapi+json;version=3.0",
      "url": "https://mauricio.issei.com.br/openapi.json",
      "representativeQueries": [
        "quais endpoints a API do portfólio expõe",
        "como acessar os dados de projetos via API"
      ]
    },
    {
      "identifier": "urn:air:mauricio.issei.com.br:skills:index",
      "displayName": "Índice de skills do agente",
      "type": "application/json",
      "url": "https://mauricio.issei.com.br/.well-known/agent-skills/index.json",
      "representativeQueries": [
        "quais skills de agente este site publica"
      ]
    }
  ]
}
```

### Descoberta adicional (opcional, mas recomendado)
Como o site já expõe `Link` headers e `robots.txt`, aproveitar e adicionar:
- No `robots.txt`, uma linha `Agentmap: https://mauricio.issei.com.br/.well-known/ai-catalog.json`.
- No `<head>` do HTML: `<link rel="ai-catalog" href="/.well-known/ai-catalog.json">`.

Isso não é obrigatório para o check passar, mas o scanner reporta quais mecanismos de descoberta adicionais existem.

### Critério de aceite
`GET /.well-known/ai-catalog.json` retorna 200, JSON válido, com `specVersion`, `host.displayName`, `host.identifier` e `entries` não vazio; cada entrada tem `identifier`, `displayName`, `type` e exatamente um de `url`/`data`.

---

## 3. Tarefa 2 — A2A Agent Card: `/.well-known/agent-card.json`

Referência: skill `a2a-agent-card` (A2A Protocol Specification).

### Requisitos
- Servir JSON em `/.well-known/agent-card.json`, HTTP 200.
- Campos obrigatórios: `name`, `version`, `description`.
- `supportedInterfaces`: array com pelo menos uma interface, incluindo a URL do serviço e o protocolo de transporte.
- `capabilities`: lista das capacidades do agente/site.
- `skills`: array de objetos, cada um com `id`, `name`, `description` — devem corresponder (ou espelhar) as skills já publicadas em `/.well-known/agent-skills/index.json` e as ferramentas WebMCP `get_cv_data` e `get_star_projects`.

### Conteúdo sugerido

```json
{
  "name": "Maurício Yokoyama Issei — Portfolio Agent",
  "version": "1.0.0",
  "description": "Agente de descoberta para o portfólio profissional de Maurício Yokoyama Issei (Tech Lead e Arquiteto), expondo CV estruturado, projetos STAR e ferramentas MCP para consulta por agentes de IA.",
  "supportedInterfaces": [
    {
      "url": "https://mauricio.issei.com.br/.well-known/mcp/server-card.json",
      "transport": "mcp"
    },
    {
      "url": "https://mauricio.issei.com.br/openapi.json",
      "transport": "http+json"
    }
  ],
  "capabilities": {
    "streaming": false,
    "pushNotifications": false
  },
  "skills": [
    {
      "id": "get_cv_data",
      "name": "Consultar CV estruturado",
      "description": "Recupera o currículo completo de Maurício Issei em formato JSON estruturado (experiência, formação, certificações)."
    },
    {
      "id": "get_star_projects",
      "name": "Consultar estudos de caso de projetos",
      "description": "Recupera estudos de caso de projetos formatados com a metodologia Situação-Tarefa-Ação-Resultado (STAR)."
    }
  ]
}
```

> Ajustar `id`/`name`/`description` das skills para bater exatamente com o que está em `/.well-known/agent-skills/index.json`, para não haver divergência entre os dois manifestos.

### Critério de aceite
`GET /.well-known/agent-card.json` retorna 200 com JSON contendo `name`, `version`, `description`, `supportedInterfaces` (com `url` e transporte) e `skills` (cada uma com `id`, `name`, `description`).

---

## 4. Tarefa 3 — Auth.md: `/auth.md`

Referência: skill `auth-md`.

O site **já publica** OAuth Protected Resource Metadata (`/.well-known/oauth-protected-resource`) e OpenID Connect discovery (`/.well-known/openid-configuration`) com `issuer: https://mauricio.issei.com.br`. Isso significa que o `auth.md` deve referenciar esses documentos existentes, em vez de reinventar autenticação.

### Requisitos
- Servir `/auth.md` na raiz, como Markdown, com um H1 que contenha literalmente "auth.md" (ex.: `# auth.md — Maurício Yokoyama Issei Portfolio`).
- Referenciar a PRM já publicada (`resource`, `authorization_servers`, `scopes_supported`, `bearer_methods_supported: ["header"]`).
- Referenciar o Authorization Server metadata em `/.well-known/openid-configuration`, e confirmar que o `issuer` bate com o anunciado na PRM (`https://mauricio.issei.com.br`).
- Incluir um bloco `agent_auth` com `skill`, `register_uri`, e pelo menos um método de registro completo, já que existe Authorization Server metadata disponível.
- **Não** implementar de fato um endpoint de registro de agentes que crie contas/credenciais reais — este é um portfólio pessoal, não uma API comercial com múltiplos consumidores. Documentar o fluxo de forma honesta: os scopes existentes (`cv:read`, `projects:read`, `profile`) são de leitura pública, então o "registro" pode ser simplificado a "uso anônimo/sem credenciais" para esses escopos de leitura.
- Se optar pelo fluxo anônimo: usar `identity_types_supported: ["anonymous"]`, `anonymous.credential_types_supported`, e `claim_uri`.
- **Importante (segurança):** não expor nem sugerir implementação de um endpoint real `POST /agent/auth` que crie efeitos colaterais (contas, e-mails, credenciais). O documento é apenas descritivo/discovery.

### Conteúdo sugerido

```markdown
# auth.md — Maurício Yokoyama Issei Portfolio

Este documento descreve como agentes de IA podem se autenticar (ou não precisar) para consumir os dados públicos deste portfólio.

## Recursos protegidos

- Resource: `https://mauricio.issei.com.br`
- Authorization Server: `https://mauricio.issei.com.br` (metadata em `/.well-known/openid-configuration`)
- Protected Resource Metadata: `/.well-known/oauth-protected-resource`
- Scopes disponíveis: `cv:read`, `projects:read`, `profile`
- Método de apresentação de token: `header` (Bearer)

## Registro de agentes

Os escopos acima expõem apenas dados públicos de leitura (currículo, projetos, perfil). Não é necessário registro de credenciais para consumo de leitura:

```json
{
  "identity_types_supported": ["anonymous"],
  "anonymous": {
    "credential_types_supported": ["none"]
  },
  "claim_uri": "https://mauricio.issei.com.br/.well-known/oauth-protected-resource"
}
```

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

Para detalhes completos do servidor MCP e das ferramentas disponíveis, ver `/.well-known/mcp/server-card.json`.
```

### Critério de aceite
`GET /auth.md` retorna 200, `Content-Type` markdown/texto, com H1 contendo "auth.md", referenciando a PRM e o AS metadata já existentes.

---

## 5. Tarefa 4 — DNS-AID (registros DNS, fora do repositório do site)

Referência: skill `dns-aid`.

⚠️ **Esta tarefa não é feita no código do site** — é configuração de DNS no provedor que gerencia `issei.com.br` (hoje Route 53 da AWS, conforme nameservers `ns-*.awsdns-*`). Se o agente de codificação não tiver acesso ao provedor DNS, ele deve **gerar os registros exatos para o Maurício aplicar manualmente** (ou via IaC, se o DNS for gerenciado como código, ex. Terraform/CDK).

### Requisitos
- Publicar registros `SVCB`/`HTTPS` no namespace `_agents` do subdomínio `mauricio.issei.com.br`, para pelo menos:
  - `_index._agents.mauricio.issei.com.br` → aponta para o manifesto de descoberta (equivalente ao `/.well-known/ai-catalog.json` / api-catalog).
  - `_mcp._agents.mauricio.issei.com.br` → aponta para o servidor MCP (`/.well-known/mcp/server-card.json`).
  - `_a2a._agents.mauricio.issei.com.br` → aponta para o A2A Agent Card criado na Tarefa 2 (opcional, mas coerente já que o A2A card vai existir).
- Usar registros em **ServiceMode**, com parâmetros `alpn` e de conexão (porta, host de destino).
- Como esses são parâmetros experimentais, usar `keyNNNNN` numéricos até que sejam registrados oficialmente.
- **Assinar a zona com DNSSEC** (`issei.com.br` hoje está com `dnssec: false` no WHOIS — isso precisa ser habilitado no Route 53/registrador para que resolvedores validem os dados).

### Registros sugeridos (formato zonefile)

```dns
; Descoberta geral (ai-catalog / ARD)
_index._agents.mauricio.issei.com.br. 3600 IN HTTPS 1 mauricio.issei.com.br. alpn="h2,http/1.1" port=443 key65001="/.well-known/ai-catalog.json"

; Endpoint MCP
_mcp._agents.mauricio.issei.com.br. 3600 IN SVCB 1 mauricio.issei.com.br. alpn="mcp" port=443 key65001="/.well-known/mcp/server-card.json"

; Endpoint A2A
_a2a._agents.mauricio.issei.com.br. 3600 IN SVCB 1 mauricio.issei.com.br. alpn="a2a" port=443 key65001="/.well-known/agent-card.json"
```

> `key65001` é um placeholder numérico para o parâmetro experimental "endpoint path" até que a IANA registre um SvcParamKey oficial para isso — ajustar conforme convenção que o Maurício preferir usar, contanto que seja consistente e documentada.

### Critério de aceite
Consulta DNS-over-HTTPS (ex.: `https://cloudflare-dns.com/dns-query?name=_index._agents.mauricio.issei.com.br&type=HTTPS`) retorna resposta com `Answer` (não mais `NXDOMAIN`/Status 3), e a zona valida com DNSSEC (`AD: true` na resposta).

---

## 6. Ordem de execução recomendada

1. **Auth.md** (Tarefa 3) — mais simples, zero dependência, reaproveita PRM/OIDC já existentes.
2. **A2A Agent Card** (Tarefa 2) — define os identificadores (`id`/`skills`) que a Tarefa 1 vai referenciar.
3. **ARD / ai-catalog.json** (Tarefa 1) — referencia os artefatos das tarefas anteriores.
4. **DNS-AID** (Tarefa 4) — por último, pois depende de acesso ao provedor DNS e é o único item fora do deploy do site; pode ser feito em paralelo por outra pessoa/processo.

## 7. Validação final

Depois de publicar os 4 itens, rodar novamente o scan:

```
POST https://isitagentready.com/api/scan
Content-Type: application/json

{"url": "https://mauricio.issei.com.br"}
```

Confirmar que:
- `checks.discovery.ard.status` = `"pass"`
- `checks.discovery.a2aAgentCard.status` = `"pass"`
- `checks.discovery.authMd.status` = `"pass"`
- `checks.discoverability.dnsAid.status` = `"pass"`

Isso deve elevar a pontuação de Discoverability (3/4 → 4/4) e Protocol Discovery (6/9 → 9/9), levando o score geral de 75 para próximo de 100.

## 8. Fora de escopo (não corrigir agora)

- O erro de CORS no console (`signature-agent` header bloqueado pelo cdnjs.cloudflare.com e fonts.gstatic.com) é causado por um interceptor de Web Bot Auth do navegador de scan, não é um bug do site — não requer ação.
- Web Bot Auth directory (`/.well-known/http-message-signatures-directory`) está como `neutral`/informativo — não é obrigatório.
- Todos os checks de Commerce (x402, MPP, UCP, ACP, AP2) devem permanecer não implementados; o site não é e-commerce.
