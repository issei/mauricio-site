#!/usr/bin/env bash
# ==============================================================================
# Script: setup-dns-aid-route53.sh
# Descrição: Cria/atualiza os registros HTTPS e SVCB para o protocolo DNS-AID
#            no AWS Route 53 sob o subdomínio _agents.mauricio.issei.com.br
#
#            NOTA: o Route 53 só aceita SvcParamKeys registrados (mandatory,
#            alpn, no-default-alpn, port, ipv4hint, ech, ipv6hint). Chaves
#            genéricas keyNNNNN (ex.: key65001 para "endpoint path") são
#            REJEITADAS com InvalidChangeBatch. O caminho de cada manifesto
#            fica publicado em /.well-known/ai-catalog.json (ARD), não no DNS.
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
            "Value": "1 mauricio.issei.com.br. alpn=\"h2,http/1.1\" port=443 mandatory=alpn,port"
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
            "Value": "1 mauricio.issei.com.br. alpn=\"mcp\" port=443 mandatory=alpn,port"
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
            "Value": "1 mauricio.issei.com.br. alpn=\"a2a\" port=443 mandatory=alpn,port"
          }
        ]
      }
    }
  ]
}
EOF
)

CHANGE_ID=$(aws route53 change-resource-record-sets \
  --hosted-zone-id "$HOSTED_ZONE_ID" \
  --change-batch "$BATCH_JSON" \
  --query 'ChangeInfo.Id' --output text)

echo "Change submetido: ${CHANGE_ID} — aguardando INSYNC..."
aws route53 wait resource-record-sets-changed --id "$CHANGE_ID"
echo "Registros DNS-AID propagados nos servidores autoritativos do Route 53."

echo "Validação externa (Cloudflare DoH):"
for sub in _index _mcp _a2a; do
  curl -s -H 'accept: application/dns-json' \
    "https://cloudflare-dns.com/dns-query?name=${sub}._agents.mauricio.issei.com.br&type=SVCB&do=1" \
    | grep -o '"Status":[0-9]*\|"data":"[^"]*"' || true
  curl -s -H 'accept: application/dns-json' \
    "https://cloudflare-dns.com/dns-query?name=${sub}._agents.mauricio.issei.com.br&type=HTTPS&do=1" \
    | grep -o '"Status":[0-9]*\|"data":"[^"]*"' || true
done
echo "Depois rode o rescan e confira checks.discoverability.dnsAid.status == \"pass\"."
