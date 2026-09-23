#!/usr/bin/env bash
# Corrige o Content-Type dos manifestos .well-known sem extensão que já estão
# em produção como binary/octet-stream (docs/AGENT_READINESS.md §8).
# Rode em AWS CloudShell (ou localmente com credenciais válidas):
#   BUCKET=<nome-do-bucket> ./infra/scripts/fix-well-known-content-type.sh
set -euo pipefail

: "${BUCKET:?defina BUCKET=<nome-do-bucket-s3>}"
: "${DISTRIBUTION_ID:=}"

FILES=(api-catalog agent-catalog oauth-authorization-server oauth-protected-resource openid-configuration)

for f in "${FILES[@]}"; do
  echo "→ .well-known/$f"
  aws s3api copy-object \
    --bucket "$BUCKET" \
    --copy-source "$BUCKET/.well-known/$f" \
    --key ".well-known/$f" \
    --content-type "application/json" \
    --metadata-directive REPLACE
done

if [ -n "$DISTRIBUTION_ID" ]; then
  echo "→ invalidando cache do CloudFront"
  aws cloudfront create-invalidation --distribution-id "$DISTRIBUTION_ID" \
    --paths "/.well-known/api-catalog" "/.well-known/agent-catalog" \
    "/.well-known/oauth-authorization-server" "/.well-known/oauth-protected-resource" \
    "/.well-known/openid-configuration"
else
  echo "DISTRIBUTION_ID não definido — invalide o cache manualmente no console do CloudFront."
fi

echo
echo "Checklist de verificação manual:"
echo "  [ ] curl -sI https://mauricio.issei.com.br/.well-known/api-catalog | grep -i content-type"
echo "  [ ]   (repetir para agent-catalog, oauth-authorization-server, oauth-protected-resource, openid-configuration)"
echo "  [ ] cada um deve responder 'content-type: application/json' e HTTP 200"
