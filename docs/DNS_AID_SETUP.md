# Configuração DNS-AID (DNS for AI Discovery) no AWS Route 53

Este guia descreve os registros DNS e passos necessários para configurar o **DNS-AID** no domínio `issei.com.br` / `mauricio.issei.com.br`.

## 1. Visão Geral

O protocolo DNS-AID utiliza registros DNS dos tipos `HTTPS` e `SVCB` no subdomínio de descoberta `_agents.mauricio.issei.com.br` para permitir que agentes de IA e clientes descubram endpoints de serviço diretamente via resolução DNS.

## 2. Registros DNS Necessários

Cadastrar no Route 53 na zona hospedada de `issei.com.br`:

```dns
; Descoberta geral (ai-catalog / ARD)
_index._agents.mauricio.issei.com.br. 3600 IN HTTPS 1 mauricio.issei.com.br. alpn="h2,http/1.1" port=443 key65001="/.well-known/ai-catalog.json"

; Endpoint MCP
_mcp._agents.mauricio.issei.com.br. 3600 IN SVCB 1 mauricio.issei.com.br. alpn="mcp" port=443 key65001="/.well-known/mcp/server-card.json"

; Endpoint A2A
_a2a._agents.mauricio.issei.com.br. 3600 IN SVCB 1 mauricio.issei.com.br. alpn="a2a" port=443 key65001="/.well-known/agent-card.json"
```

*Nota: `key65001` representa o parâmetro numérico de chave privada/experimental para "endpoint path" até padronização formal da IANA.*

## 3. Habilitação de DNSSEC no Route 53

Para que os validadores DNS-AID confirmem a autenticidade das respostas DNS (evitando status `NXDOMAIN` ou rejeição de segurança), a assinatura DNSSEC precisa estar ativa na zona:

1. Acesse o console do **AWS Route 53**.
2. Selecione a zona hospedada `issei.com.br`.
3. Acesse a aba **DNSSEC signing** e clique em **Enable DNSSEC signing**.
4. Siga as instruções para criar a chave KSK (Key Signing Key) no AWS KMS.
5. Copie os registros **DS (Delegation Signer)** fornecidos pelo Route 53 e adicione-os no registrador do domínio principal (ex.: Registro.br ou AWS Registrar).

## 4. Verificação

Após propagação DNS, execute a consulta DNS-over-HTTPS:

```bash
curl -H "accept: application/dns-json" "https://cloudflare-dns.com/dns-query?name=_index._agents.mauricio.issei.com.br&type=HTTPS"
```

A resposta deve conter `Status: 0` (NOERROR) e a chave `AD: true` (Authenticated Data).
