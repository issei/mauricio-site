# auth.md — Maurício Yokoyama Issei Portfolio

Este documento descreve como agentes de IA podem se autenticar (ou consumir sem necessidade de credenciais) os dados públicos deste portfólio.

## Recursos protegidos

- Resource: `https://mauricio.issei.com.br`
- Authorization Server: `https://mauricio.issei.com.br` (metadata em `/.well-known/oauth-authorization-server` e `/.well-known/openid-configuration`)
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

## Escopo dos metadados OAuth

Os documentos `/.well-known/openid-configuration` e `/.well-known/oauth-authorization-server` existem para conformidade de descoberta (RFC 8414 / OIDC Discovery) e para carregar o bloco `agent_auth`. Eles são **declarativos**: não há authorization server em operação neste domínio.

- Nenhum token é emitido. `authorization_endpoint` e `token_endpoint` estão declarados por exigência de formato, mas **não respondem** — não tente executar `authorization_code` nem `implicit`.
- `jwks_uri` resolve para um conjunto de chaves vazio (`{"keys": []}`), o que é a verdade: nada é assinado porque nada é emitido.
- O modelo de acesso real é o declarado em `agent_auth`: **anônimo**, `credential_types_supported: ["none"]`. Basta fazer `GET` nos recursos.

Para detalhes do servidor MCP e das ferramentas, veja `/.well-known/mcp/server-card.json` — atenção ao campo `status`: o endpoint HTTP em `/mcp` ainda é **planejado**. Hoje as ferramentas rodam na própria página via WebMCP (`navigator.modelContext`), e todos os recursos são acessíveis por HTTPS direto.
