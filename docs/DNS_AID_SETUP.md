# Configuração DNS-AID (DNS for AI Discovery) no AWS Route 53

Este guia descreve os registros DNS e passos necessários para configurar o **DNS-AID** no domínio `issei.com.br` / `mauricio.issei.com.br`.

## 1. Visão Geral

O protocolo DNS-AID utiliza registros DNS dos tipos `HTTPS` e `SVCB` no subdomínio de descoberta `_agents.mauricio.issei.com.br` para permitir que agentes de IA e clientes descubram endpoints de serviço diretamente via resolução DNS.

## 2. Registros DNS Necessários

Cadastrar no Route 53 na zona hospedada de `issei.com.br` (com o parâmetro `mandatory=alpn,port` conforme a especificação v2):

```dns
; Descoberta geral (ai-catalog / ARD)
_index._agents.mauricio.issei.com.br. 3600 IN HTTPS 1 mauricio.issei.com.br. alpn="h2,http/1.1" port=443 mandatory=alpn,port

; Endpoint MCP
_mcp._agents.mauricio.issei.com.br. 3600 IN SVCB 1 mauricio.issei.com.br. alpn="mcp" port=443 mandatory=alpn,port

; Endpoint A2A
_a2a._agents.mauricio.issei.com.br. 3600 IN SVCB 1 mauricio.issei.com.br. alpn="a2a" port=443 mandatory=alpn,port
```

*Nota: o Route 53 rejeita SvcParamKeys genéricos (`keyNNNNN`, ex.: `key65001` para "endpoint path") com `InvalidChangeBatch` — só aceita os registrados: `mandatory`, `alpn`, `no-default-alpn`, `port`, `ipv4hint`, `ech`, `ipv6hint`. O caminho de cada manifesto (`ai-catalog.json`, `mcp/server-card.json`, `agent-card.json`) é resolvido via `/.well-known/ai-catalog.json` (ARD), não pelo DNS. O exemplo oficial da skill DNS-AID também não usa parâmetro de path.*

Estado atual (aplicado em `Z1D4C1H8BQ1VJ1`, change `C052794839V2RRB0KNYXK`, `INSYNC`): os 3 registros resolvem via Cloudflare DoH com `Status: 0`. `AD:false` (zona `NOT_SIGNING`) — DNSSEC não é bloqueante para `dnsAid: pass`.

## 3. Script de Automação Route 53

Para aplicar os 3 registros automaticamente via AWS CLI no Route 53, utilize o script `scripts/setup-dns-aid-route53.sh`:

```bash
HOSTED_ZONE_ID="SUA_HOSTED_ZONE_ID" ./scripts/setup-dns-aid-route53.sh
```

## 4. Habilitação de DNSSEC no Route 53

Para que os validadores DNS-AID confirmem a autenticidade das respostas DNS, a assinatura DNSSEC precisa estar ativa na zona:

1. Acesse o console do **AWS Route 53**.
2. Selecione a zona hospedada `issei.com.br`.
3. Acesse a aba **DNSSEC signing** e clique em **Enable DNSSEC signing**.
4. Siga as instruções para criar a chave KSK (Key Signing Key) no AWS KMS.
5. Copie os registros **DS (Delegation Signer)** fornecidos pelo Route 53 e adicione-os no registrador do domínio principal (ex.: Registro.br ou AWS Registrar).

## 5. Verificação

Após propagação DNS, execute a consulta DNS-over-HTTPS:

```bash
curl -H "accept: application/dns-json" "https://cloudflare-dns.com/dns-query?name=_index._agents.mauricio.issei.com.br&type=HTTPS"
```

A resposta deve conter `Status: 0` (NOERROR) com o bloco `Answer`.
