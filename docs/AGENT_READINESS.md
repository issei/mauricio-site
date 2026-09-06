# Agent Readiness — Base de Conhecimento

Como `mauricio.issei.com.br` é descoberto, lido e autenticado por agentes de IA.
Documenta **o que está implementado**, **onde fica cada peça** (repo *e* AWS) e
**as armadilhas** que custaram caro descobrir.

Referência de validação: [isitagentready.com](https://isitagentready.com).
Estado atual: **16 pass / 0 fail / 6 neutral** — nível 5 "Agent-Native".

---

## 1. Por que isto existe

Um site tradicional é otimizado para humanos com navegador e para crawlers de
busca. Um agente de IA é um terceiro consumidor: chega sem sessão, precisa
descobrir o que existe, em que formato, sob quais regras de uso e com qual
credencial — tudo por leitura de máquina, sem interpretar layout.

A estratégia aqui é **redundância deliberada em 5 camadas**. Um agente pode
entrar por qualquer uma delas, e nenhuma depende das outras:

| Camada | Mecanismo | Descoberto por |
|---|---|---|
| **DNS** | registros SVCB/HTTPS em `_agents.` | resolver, antes de qualquer HTTP |
| **Header HTTP** | `Link` (RFC 8288) em toda resposta | quem faz um `GET /` qualquer |
| **Arquivo bem-conhecido** | `/.well-known/*`, `/llms.txt`, `/robots.txt` | convenção |
| **Autenticação** | `/auth.md` + metadados OAuth | quem precisa de escopo/credencial |
| **Runtime** | `navigator.modelContext` (WebMCP) | agente que executa a página |

---

## 2. Inventário — cada check e o que o satisfaz

### Discoverability

| Check | Satisfeito por | Onde |
|---|---|---|
| `robotsTxt` | regras `User-agent: *` | `public/robots.txt` |
| `sitemap` | sitemap XML | gerado no build por `vite-plugin-sitemap` |
| `linkHeaders` | header `Link` RFC 8288 | **CloudFront**, policy `RFC8288-Link-Headers-AgentDiscovery` |
| `dnsAid` | SVCB/HTTPS em `_agents.` + DNSSEC | **Route 53**, zona `issei.com.br` |

### Content Accessibility

| Check | Satisfeito por | Onde |
|---|---|---|
| `markdownNegotiation` | gêmeo `.md` de cada página HTML | `public/*.md` + CloudFront Function `MarkdownCovert` |

### Bot Access Control

| Check | Satisfeito por | Onde |
|---|---|---|
| `robotsTxtAiRules` | wildcard cobre bots de IA | `public/robots.txt` |
| `contentSignals` | `Content-Signal: ai-train=no, search=yes, ai-input=yes` | `public/robots.txt` |
| `webBotAuth` | *(neutral — não implementado)* | — |

### Protocol Discovery

| Check | Satisfeito por | Onde |
|---|---|---|
| `apiCatalog` | linkset RFC 9727 (3 âncoras) | `public/.well-known/api-catalog` |
| `ard` | catálogo de recursos agênticos (4 entradas) | `public/.well-known/ai-catalog.json` |
| `oauthDiscovery` | OIDC discovery | `public/.well-known/openid-configuration` |
| `oauthProtectedResource` | PRM RFC 9728 | `public/.well-known/oauth-protected-resource` |
| `authMd` | `/auth.md` + bloco `agent_auth` | `public/auth.md` + `public/.well-known/oauth-authorization-server` |
| `mcpServerCard` | MCP server card | `public/.well-known/mcp/server-card.json` |
| `a2aAgentCard` | A2A agent card | `public/.well-known/agent-card.json` |
| `agentSkills` | índice de skills + `SKILL.md` | `public/.well-known/agent-skills/` |
| `webMcp` | 2 tools via `navigator.modelContext` | `src/index.html` |

### Commerce — 5 checks `neutral`

`x402`, `mpp`, `ucp`, `acp`, `ap2` retornam *"not a commerce site"*.
**Não são falhas e não devem ser implementados** — o site não vende nada.

---

## 3. Infraestrutura AWS

Peças que **não aparecem no repositório** e por isso são invisíveis numa leitura
só do código:

| Recurso | Nome | Função |
|---|---|---|
| CloudFront | distribuição com alias `mauricio.issei.com.br` | entrega do site |
| Response Headers Policy | `RFC8288-Link-Headers-AgentDiscovery` | injeta o header `Link` em toda resposta |
| CloudFront Function | `MarkdownCovert` (viewer-request) | negociação de conteúdo Markdown |
| Route 53 Hosted Zone | `issei.com.br` (pública) | registros DNS-AID + DNSSEC |
| KMS key (us-east-1) | `alias/dnssec-issei-com-br` | KSK do DNSSEC — **~US$1/mês** |
| KSK | `issei_com_br_ksk`, keytag `42785` | assina a zona |

> Este repositório é **público**: identificadores opacos de recurso (distribution
> ID, hosted zone ID, key ID, account ID) ficam deliberadamente **fora** da
> documentação. Eles não são credenciais, mas em repositório aberto só servem a
> reconhecimento e a engenharia social contra o suporte da AWS — quem tem acesso
> ao console resolve pelo nome. Para obtê-los:

```bash
aws cloudfront list-distributions \
  --query "DistributionList.Items[?contains(Aliases.Items,'mauricio.issei.com.br')].[Id,DefaultCacheBehavior.ResponseHeadersPolicyId]" --output text

aws route53 list-hosted-zones-by-name --dns-name issei.com.br. \
  --query "HostedZones[0].Id" --output text

aws kms describe-key --region us-east-1 --key-id alias/dnssec-issei-com-br \
  --query "KeyMetadata.KeyId" --output text
```

### Proteção contra destruição acidental

A KMS key é **ponto único de falha de `issei.com.br` inteiro**: com o DS publicado
no Registro.br, apagá-la ou desabilitá-la derruba a resolução de todo o domínio
para resolvers validadores — não só do subdomínio do portfólio.

A key policy carrega um statement `DenyAccidentalKeyDestruction` que nega
`kms:ScheduleKeyDeletion` e `kms:DisableKey` a **todos os principals**. O root
mantém `kms:*` (inclusive `PutKeyPolicy`), então destruir a chave exige antes
remover esse statement — de um clique acidental para um ato deliberado em dois
passos. Não interfere em `Sign`/`GetPublicKey`/`DescribeKey`/`CreateGrant`, que
são o que o Route 53 usa para assinar.

> **A zona autoritativa é `issei.com.br`, não `mauricio.issei.com.br`.** Não
> existe hosted zone para o subdomínio; os registros `_agents.mauricio…` moram
> na zona apex.

### Deploy

`push` na `main` → GitHub Actions (`.github/workflows/deploy.yml`) → build Vite
→ OIDC na AWS → sync no S3 → invalidação do CloudFront. Tudo em `public/` é
copiado literalmente para a raiz do site.

---

## 4. Camada DNS — DNS-AID

Três registros na zona `issei.com.br`:

```dns
_index._agents.mauricio.issei.com.br. 3600 IN HTTPS 1 mauricio.issei.com.br. alpn="h2,http/1.1" port=443 mandatory=alpn,port
_mcp._agents.mauricio.issei.com.br.   3600 IN SVCB  1 mauricio.issei.com.br. alpn="mcp"        port=443 mandatory=alpn,port
_a2a._agents.mauricio.issei.com.br.   3600 IN SVCB  1 mauricio.issei.com.br. alpn="a2a"        port=443 mandatory=alpn,port
```

Script: `scripts/setup-dns-aid-route53.sh`. Guia: `docs/DNS_AID_SETUP.md`.

### ⚠️ Armadilha: Route 53 rejeita `keyNNNNN`

O Route 53 aceita **somente** SvcParamKeys registrados — `mandatory`, `alpn`,
`no-default-alpn`, `port`, `ipv4hint`, `ech`, `ipv6hint`. Chaves genéricas
(`key65001="/.well-known/…"`, usada para anunciar o caminho do manifesto)
falham com `InvalidChangeBatch: does not support undefined parameters`, e o
change batch é atômico — nada é aplicado.

**O caminho dos manifestos vive no ARD** (`/.well-known/ai-catalog.json`), não
no DNS. O exemplo oficial da skill DNS-AID também não usa parâmetro de path.

### ⚠️ Armadilha: DNSSEC é bloqueante

O check `dnsAid` **não passa** só com os registros publicados. O scanner exige
`dnssecValidated: true` — a mensagem muda de *"records not found"* para
*"records found, but DNSSEC was not validated"*, o que parece progresso mas
continua `fail`.

`issei.com.br` é registrado no **Registro.br**, então a AWS não publica o DS
automaticamente. O fluxo é: habilitar signing no Route 53 → pegar o DS →
cadastrar **manualmente** no painel do Registro.br → aguardar propagação (~4h).

### 🔴 Rollback de DNSSEC — ordem obrigatória

O DNSSEC é da **zona apex inteira**: afeta todo subdomínio de `issei.com.br`.

```
1. remover o DS no Registro.br
2. aguardar ~24h de propagação
3. só então: DisableHostedZoneDNSSEC + DeleteKeySigningKey
```

Apagar a KMS key ou desativar o signing **antes** de tirar o DS causa
`SERVFAIL` em todo `issei.com.br` para qualquer resolver validador.

---

## 5. Camada de autenticação — `auth.md` + `agent_auth`

O acesso é **anônimo**: tudo é leitura de dado público (CV, projetos, perfil).
Os escopos `cv:read`, `projects:read`, `profile` são informativos.

### O shape que funciona

O bloco `agent_auth` vive em **`/.well-known/oauth-authorization-server`** — a
Authorization Server metadata — e **não** no `auth.md`:

```json
"agent_auth": {
  "skill": "https://mauricio.issei.com.br/auth.md",
  "register_uri": "https://mauricio.issei.com.br/.well-known/oauth-protected-resource",
  "identity_types_supported": ["anonymous"],
  "anonymous": { "credential_types_supported": ["none"] },
  "claim_uri": "https://mauricio.issei.com.br/.well-known/oauth-protected-resource",
  "methods": [{ "type": "anonymous", "scopes": ["cv:read", "projects:read", "profile"] }]
}
```

Três regras não óbvias, cada uma custou uma iteração de deploy:

1. **O bloco vai na AS metadata, não no `auth.md`.** O `auth.md` só precisa
   existir, servir como `text/markdown` e ter um H1 contendo `auth.md`. Blocos
   ```json``` dentro dele **não são parseados**.
2. **`skill` aponta para `/auth.md`.** Não é a URL de uma agent-skill publicada.
   O check se chama `authMd` justamente porque valida que a AS metadata amarra
   de volta ao documento `auth.md`.
3. **O trio anônimo tem que estar dentro do bloco `agent_auth`.**
   `identity_types_supported` + `anonymous.credential_types_supported` +
   `claim_uri`, os três no mesmo nível. Colocá-los em `methods[]` ou no topo do
   documento **é ignorado** — o validador não lê esses níveis.

> A `docs/specs/spec-agent-readiness-v2-mauricio-issei.md` §1.2 está **errada**
> nesse ponto (manda pôr o `agent_auth` no `auth.md`). Esta KB prevalece.

---

## 6. Como ler o scanner — o erro de método mais caro

O texto que a UI devolve —

> *"Serve /auth.md at the site root with agent registration instructions, publish
> /.well-known/oauth-protected-resource, and include an agent_auth block…"*

— é **remediação genérica fixa**. É idêntica em todo scan que falha aquele
check, não importa a causa. Tratá-la como diagnóstico faz você girar em círculo.

O sinal real está em `evidence[].finding.summary`, que só aparece no JSON:

```bash
curl -s -X POST https://isitagentready.com/api/scan \
  -H 'content-type: application/json' \
  -d '{"url":"https://mauricio.issei.com.br"}' > scan.json

node -e '
const d=JSON.parse(require("fs").readFileSync("scan.json","utf8"));
const f=(o,k)=>{let r;const w=x=>{if(x&&typeof x=="object")for(const[a,b]of Object.entries(x)){if(a===k&&r===undefined)r=b;else w(b)}};w(o);return r};
const c=f(d,"checks");
for(const cat in c) for(const k in c[cat]) if(c[cat][k].status)
  console.log(c[cat][k].status.toUpperCase().padEnd(8), cat+"."+k, "|", c[cat][k].message);
const a=c.discovery.authMd;
(a.evidence||[]).forEach(e=>console.log(" -",e.label,"=>",(e.finding||{}).outcome,"|",(e.finding||{}).summary));
'
```

**Os validadores são uma fila.** Cada correção destrava o próximo — a mensagem
de topo continua igual enquanto a evidência avança. A sequência real que
resolveu o `authMd` foi:

```
"no agent_auth block"
  → "Missing or unsafe skill URL pointing to /auth.md"
    → "anonymous registration requires anonymous.credential_types_supported; … claim_uri"
      → "Found agent_auth with register_uri and supported methods"  ✅
```

### Diagnosticar por eliminação, não por tentativa

Quando o validador diz que um campo falta e ele **já existe** em algum nível,
isso prova que o validador não lê aquele nível. Foi assim que o último erro
saiu em uma tentativa: `claim_uri` existia em `methods[0]` *e* no topo do
documento e ainda era reportado como ausente → logo o alvo só podia ser o único
nível não preenchido, dentro de `agent_auth`.

---

## 7. Boas práticas operacionais

### Sempre conferir o que está **no ar**, não o que está no repo

Antes de mudar código por causa de um scan, confirme o artefato servido:

```bash
curl -s https://mauricio.issei.com.br/.well-known/oauth-authorization-server | jq .agent_auth
```

Um scan roda contra produção. Repo correto + deploy pendente parece bug de
implementação e não é.

### Conferir que o merge pegou **todos** os commits

Um commit empurrado para o branch **depois** que o PR já foi mergeado não entra
na `main` — o merge captura o head do momento. Aconteceu aqui (PR #39 levou só
o 1º de 2 commits, e o segundo ficou órfão).

```bash
git fetch origin && git log --oneline -3 origin/main
git merge-base --is-ancestor <sha> origin/main && echo "na main" || echo "FORA"
```

### Validar DNS pelo mesmo resolver que o scanner usa

```bash
curl -s -H 'accept: application/dns-json' \
  "https://cloudflare-dns.com/dns-query?name=_index._agents.mauricio.issei.com.br&type=HTTPS&do=1"
# Status: 0 + Answer não vazio + AD: true (cadeia DNSSEC fechada)
```

### Mudança em ativo público PT-BR exige sync do gêmeo `/en/`

Qualquer edição em `src/*.html`, `public/*.md`, `cv.json`, `star.json`,
`llms.txt`, `llms-full.txt`, `cv-for-ai.md` precisa rodar `npm run i18n:sync`.

### Manter os digests das skills em sincronia

`public/.well-known/agent-skills/index.json` carrega `digest: sha256:…` de cada
`SKILL.md`. Ao editar uma skill:

```bash
sha256sum public/.well-known/agent-skills/<nome>/SKILL.md
# e atualizar o digest correspondente no index.json
```

---

## 8. Pendências conhecidas (não bloqueantes)

| Item | Impacto | Ação sugerida |
|---|---|---|
| `.well-known` sem extensão servido como `binary/octet-stream` | scanner tolera; outras ferramentas podem não tolerar | definir `ContentType: application/json` no objeto S3, ou via response headers policy |
| `webBotAuth` `neutral` | informativo, não conta contra o score | publicar `/.well-known/http-message-signatures-directory` se quiser identidade de agente assinada |
| `spec-agent-readiness-v2` §1.2 desatualizada | pode induzir a erro | já contradita por esta KB; corrigir ou marcar como superseta |
| KMS key do DNSSEC | ~US$1/mês recorrente | manter enquanto o DNSSEC existir — ver ordem de rollback (§4) |

---

## 9. Referências

- Skills oficiais do validador: `https://isitagentready.com/.well-known/agent-skills/<nome>/SKILL.md` (`dns-aid`, `auth-md`, …)
- `docs/DNS_AID_SETUP.md` — guia operacional dos registros DNS
- `docs/specs/OAUTH_PROTECTED_RESOURCE.md` — PRM
- `scripts/setup-dns-aid-route53.sh` — automação Route 53
- RFC 8288 (Link) · RFC 9460 (SVCB/HTTPS) · RFC 9727 (api-catalog) · RFC 9728 (PRM) · RFC 8414 (AS metadata)
