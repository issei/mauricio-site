#!/bin/bash
# ------------------------------------------------------------------------------
# AWS CloudShell Script: Associate CloudFront Function `MarkdownCovert` (viewer-request)
# ------------------------------------------------------------------------------
# Por que isto existe: o deploy (.github/workflows/deploy.yml) faz
# update-function → test-function → publish-function a cada push na main, mas
# NUNCA fez update-distribution — publicar não é o mesmo que associar. O job
# já detecta e avisa isso (imprime "MarkdownCovert LIVE: UNASSOCIATED"), e é
# exatamente o estado hoje: a distribution roda outra function (ou nenhuma) no
# evento viewer-request, então a produção nunca refletiu o código do repo —
# negociação de Markdown e PRM por caminho (RFC 9728 §3.1) ficam mortos mesmo
# com o `infra/cloudfront-functions/viewer-request.js` correto e testado.
# Documentado em docs/AGENT_READINESS.md §3.
#
# O que este script faz:
#   1. Resolve a distribution pelo alias (sem hardcode de ID — repo é público).
#   2. Lê o ARN LIVE atual da function MarkdownCovert.
#   3. Associa esse ARN ao evento viewer-request do DefaultCacheBehavior,
#      substituindo o que estiver lá (CloudFront só aceita 1 function por
#      evento por behavior — é o mesmo limite que motivou unificar as duas
#      functions antigas em `viewer-request.js`, ver o comentário no topo dele).
#   4. Avisa (sem mexer) se algum CacheBehavior explícito já tiver uma
#      associação diferente no mesmo evento — decisão de revisão manual.
#   5. Aplica via update-distribution (exige o ETag da config atual) e invalida
#      o cache.
#
# Requer no principal que rodar isto (usuário/role do console, NÃO o role de
# deploy — CICD_OIDC.md restringe o role de deploy a
# Describe/Update/Test/PublishFunction, de propósito: mudar a distribution é
# um raio de ação maior e fica manual):
#   cloudfront:ListDistributions, GetDistributionConfig, UpdateDistribution,
#   DescribeFunction, CreateInvalidation
#
# Uso (em AWS CloudShell):
#   export DOMAIN="mauricio.issei.com.br"   # alias da distribution
#   export FN="MarkdownCovert"              # nome da function (opcional, é o default)
#   bash infra/scripts/associate-viewer-request-function.sh
# ------------------------------------------------------------------------------

set -euo pipefail

DOMAIN="${DOMAIN:?defina DOMAIN (alias da distribution, ex: mauricio.issei.com.br)}"
FN="${FN:-MarkdownCovert}"

echo "🔎 Resolvendo distribution pelo alias $DOMAIN ..."
DISTRIBUTION_ID=$(aws cloudfront list-distributions \
  --query "DistributionList.Items[?contains(Aliases.Items, '$DOMAIN')].Id | [0]" \
  --output text)
[ -n "$DISTRIBUTION_ID" ] && [ "$DISTRIBUTION_ID" != "None" ] \
  || { echo "❌ Nenhuma distribution com alias $DOMAIN encontrada."; exit 1; }
echo "   distribution: $DISTRIBUTION_ID"

echo "🔎 ARN LIVE de $FN ..."
FN_ARN=$(aws cloudfront describe-function --name "$FN" --stage LIVE \
  --query "FunctionSummary.FunctionMetadata.FunctionARN" --output text)
FN_STATUS=$(aws cloudfront describe-function --name "$FN" --stage LIVE \
  --query "FunctionSummary.Status" --output text)
echo "   $FN_ARN (status atual: $FN_STATUS)"

echo "📥 Baixando config atual da distribution ..."
aws cloudfront get-distribution-config --id "$DISTRIBUTION_ID" > /tmp/dist-config.json
ETAG=$(jq -r '.ETag' /tmp/dist-config.json)

# Aviso (não mexe) para qualquer CacheBehavior explícito com uma associação
# viewer-request diferente — decisão de revisão manual, não automática.
jq -r --arg fn "$FN_ARN" '
  .DistributionConfig.CacheBehaviors.Items[]? |
  select(.FunctionAssociations.Items[]? | select(.EventType=="viewer-request" and .FunctionARN != $fn)) |
  .PathPattern' /tmp/dist-config.json | while read -r p; do
    echo "⚠️  CacheBehavior '$p' tem outra function em viewer-request — não alterado, revisar manualmente."
done

echo "✏️  Associando $FN ao viewer-request do DefaultCacheBehavior ..."
jq --arg fn "$FN_ARN" '
  .DistributionConfig.DefaultCacheBehavior.FunctionAssociations = {
    Quantity: 1,
    Items: [{ FunctionARN: $fn, EventType: "viewer-request" }]
  } |
  .DistributionConfig' /tmp/dist-config.json > /tmp/dist-config.new.json

aws cloudfront update-distribution --id "$DISTRIBUTION_ID" \
  --if-match "$ETAG" \
  --distribution-config file:///tmp/dist-config.new.json > /dev/null
echo "✅ update-distribution aplicado."

echo "🧹 Invalidando cache (/*) ..."
aws cloudfront create-invalidation --distribution-id "$DISTRIBUTION_ID" --paths "/*" > /dev/null

echo "⏳ Aguardando a distribution ficar Deployed (pode levar alguns minutos) ..."
aws cloudfront wait distribution-deployed --id "$DISTRIBUTION_ID"

echo "🔁 Conferindo status LIVE de $FN (esperado: DEPLOYED, não mais UNASSOCIATED) ..."
aws cloudfront describe-function --name "$FN" --stage LIVE --query "FunctionSummary.Status" --output text

cat <<'EOF'

✅ Feito. Validar em produção (docs/specs/AGENT_READINESS_POR_PAGINA.md §7):

  curl -s -o /dev/null -w '%{http_code} %{content_type}\n' \
    -H 'Accept: text/markdown' https://mauricio.issei.com.br/case-agents
  # esperado: 200 text/markdown

  curl -s -o /dev/null -w '%{http_code}\n' \
    https://mauricio.issei.com.br/.well-known/oauth-protected-resource/case-agents.html
  # esperado: 200

Se algum CacheBehavior foi listado como "não alterado" acima, decidir à mão se
ele também deve rodar MarkdownCovert (ex: editar o JSON e reaplicar
update-distribution) ou se está assim de propósito.
EOF
