# Especificação v2 — Fechar os 2 gaps restantes de Agent Readiness

## Status atual (rescan de 04/09/2026)

Score subiu de **75 → 88/100**, ainda Nível 5. Confirmado que passaram:
- ✅ ARD (`/.well-known/ai-catalog.json`) — 4 recursos válidos, `urn:air` conforme.
- ✅ A2A Agent Card (`/.well-known/agent-card.json`) — "Maurício Yokoyama Issei — Portfolio Agent" v1.0.0, 2 skills, 2 interfaces.

**Restam 2 itens**, ambos com causa raiz específica e diagnosticada pelo próprio scanner:

| Check | Status | Causa raiz exata |
|---|---|---|
| Auth.md | `fail` | `auth.md` existe (200, `text/markdown`, 2 marcadores encontrados), **mas falta o bloco `agent_auth` completo** — porque `/.well-known/oauth-authorization-server` retorna 404 |
| DNS-AID | `fail` | Nenhum registro em `_index/_mcp/_a2a._agents.mauricio.issei.com.br` — ainda `NXDOMAIN` em todas as consultas |

Não alterar mais nada além do listado abaixo — os outros 8 checks de Protocol Discovery e todo o resto já estão `pass`.

---

## 1. Auth.md — publicar AS metadata + bloco `agent_auth`

O scanner detectou que a **PRM** (`/.well-known/oauth-protected-resource`) já é válida (`resource: https://mauricio.issei.com.br`, 1 authorization server), mas o **Authorization Server metadata em RFC 8414** (`/.well-known/oauth-authorization-server`) não existe — só existe o **OIDC discovery** (`/.well-known/openid-configuration`), que é um documento diferente. Sem o AS metadata em RFC 8414, o checker classifica a situação como "sem AS metadata disponível" e exige que o `auth.md` seja **totalmente autocontido**; hoje ele tem marcadores parciais, mas não o fluxo completo.

**Correção mais direta (recomendada): publicar também o RFC 8414 metadata**, espelhando o conteúdo do `openid-configuration` já existente (são compatíveis — OIDC discovery é um superconjunto de RFC 8414). Isso destrava o caminho "AS metadata disponível" e só falta então o bloco `agent_auth` no `auth.md`.

### 1.1 Criar `/.well-known/oauth-authorization-server`

Copiar o conteúdo do `/.well-known/openid-configuration` atual para este novo path (mesmo `issuer`, mesmo `Content-Type: application/json`, HTTP 200). Se o `openid-configuration` tiver campos específicos de OIDC que não fazem sentido em RFC 8414 puro (ex.: `userinfo_endpoint`, `subject_types_supported` sem uso), pode mantê-los — não invalida o documento, campos extras são ignorados.

### 1.2 Editar `/auth.md` — adicionar bloco `agent_auth`

Manter tudo que já existe em `/auth.md` e garantir que ele contenha, em algum bloco JSON (formatado como code block markdown), exatamente esta estrutura:

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

E, junto a esse bloco, incluir também o objeto de identidade que o checker espera para o fluxo anônimo (referência: skill `auth-md`, seção "Flow Metadata → Anonymous"):

```json
{
  "identity_types_supported": ["anonymous"],
  "anonymous": {
    "credential_types_supported": ["none"]
  },
  "claim_uri": "https://mauricio.issei.com.br/.well-known/oauth-protected-resource"
}
```

> Se o `auth.md` atual já tem uma seção parecida mas incompleta, só garanta que os 3 campos obrigatórios do `agent_auth` estejam presentes juntos no mesmo bloco: `skill`, `register_uri`, e `methods` (com pelo menos 1 método completo, com `type` e `scopes`/credenciais). É provavelmente isso que falta hoje — os "2 marcadores" encontrados são prováveis referências textuais à PRM sem esse bloco estruturado.

### Critério de aceite
1. `GET /.well-known/oauth-authorization-server` → 200, JSON válido, `issuer: https://mauricio.issei.com.br` (igual ao do openid-configuration).
2. `GET /auth.md` → 200, contém o bloco `agent_auth` com `skill`, `register_uri` e `methods` completos.
3. Rescan: `checks.discovery.authMd.status == "pass"`.

---

## 2. DNS-AID — publicar os registros SVCB/HTTPS ✅ CONCLUÍDO

Aplicado em `2026-09-05` na hosted zone `Z1D4C1H8BQ1VJ1` (`issei.com.br`), change `C052794839V2RRB0KNYXK` (`INSYNC`). Os 3 registros resolvem via Cloudflare DoH com `Status: 0` / `Answer` não vazio.

```dns
_index._agents.mauricio.issei.com.br. 3600 IN HTTPS 1 mauricio.issei.com.br. alpn="h2,http/1.1" port=443 mandatory=alpn,port

_mcp._agents.mauricio.issei.com.br. 3600 IN SVCB 1 mauricio.issei.com.br. alpn="mcp" port=443 mandatory=alpn,port

_a2a._agents.mauricio.issei.com.br. 3600 IN SVCB 1 mauricio.issei.com.br. alpn="a2a" port=443 mandatory=alpn,port
```

> **`mandatory=alpn,port`** incluído conforme o exemplo oficial da skill DNS-AID.
> **`key65001="..."` removido:** o Route 53 rejeita SvcParamKeys genéricos (`keyNNNNN`) com `InvalidChangeBatch` — só aceita `mandatory`, `alpn`, `no-default-alpn`, `port`, `ipv4hint`, `ech`, `ipv6hint`. O exemplo oficial da skill também não carrega parâmetro de path; o caminho dos manifestos fica em `/.well-known/ai-catalog.json` (ARD).

Se o script `setup-dns-aid-route53.sh` já foi executado e mesmo assim o rescan continua `NXDOMAIN`, verificar nesta ordem:
1. `aws route53 list-resource-record-sets --hosted-zone-id <ID> --query "ResourceRecordSets[?contains(Name, '_agents')]"` — confirmar que os 3 registros existem na zona certa.
2. Confirmar que a hosted zone editada é a que realmente é autoritativa (`dig NS issei.com.br +short` deve bater com os nameservers da hosted zone do Route 53 usada).
3. Rodar a validação externa: `curl -s -H 'accept: application/dns-json' "https://cloudflare-dns.com/dns-query?name=_index._agents.mauricio.issei.com.br&type=HTTPS"` e conferir se `Answer` aparece.

DNSSEC continua **opcional** para este check específico — o requisito de assinatura é para robustez (dados autenticados), mas não é bloqueante para o `status: pass` do check em si segundo a skill oficial; o item de DNSSEC pode ficar para depois, tratado separadamente.

### Critério de aceite
1. Consulta DoH para `_index`, `_mcp` e `_a2a._agents.mauricio.issei.com.br` (tipo `HTTPS`/`SVCB`) retorna `Answer` não vazio.
2. Rescan: `checks.discoverability.dnsAid.status == "pass"`.

---

## 3. Validação final

```
POST https://isitagentready.com/api/scan
Content-Type: application/json

{"url": "https://mauricio.issei.com.br"}
```

Esperado após os 2 ajustes: `checks.discovery.authMd.status == "pass"` e `checks.discoverability.dnsAid.status == "pass"` → Discoverability 4/4, Protocol Discovery 9/9, score geral próximo de 100.
