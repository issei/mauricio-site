#!/usr/bin/env bash
# ==============================================================================
# Script: setup-dns-aid-route53.sh
# Descrição: Cria/atualiza os registros HTTPS e SVCB para o protocolo DNS-AID
#            no AWS Route 53 sob o subdomínio _agents.mauricio.issei.com.br
#
# Uso: HOSTED_ZONE_ID="Z1234567890ABC" ./scripts/setup-dns-aid-route53.sh
# ==============================================================================

set -euo pipefail

HOSTED_ZONE_ID="${HOSTED_ZONE_ID:-}"

if [ -z "$HOSTED_ZONE_ID" ]; then
  echo "Erro: A variável de ambiente HOSTED_ZONE_ID precisa ser informada."
  echo "Exemplo: HOSTED_ZONE_ID=\"Z1234567890ABC\" $0"
  exit 1
fi

echo "Configurando registros DNS-AID no Route 53 para a Hosted Zone: ${HOSTED_ZONE_ID}..."

BATCH_JSON=$(cat <<EOF
{
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
}
EOF
)

aws route53 change-resource-record-sets \
  --hosted-zone-id "$HOSTED_ZONE_ID" \
  --change-batch "$BATCH_JSON"

echo "Registros DNS-AID aplicados com sucesso no Route 53."
