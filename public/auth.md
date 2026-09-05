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

Para detalhes completos do servidor MCP e das ferramentas disponíveis, veja `/.well-known/mcp/server-card.json`.
