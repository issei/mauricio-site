#!/bin/bash
# 🚀 Script para publicar o API Catalog com MIME Types corretos
# Para ser executado no AWS CloudShell

BUCKET_NAME="mauricio.issei.com.br"
DISTRIBUTION_ID="E201F4RL889YZH"

echo "📂 Configurando MIME Types para Descoberta Automática..."

# 1. API Catalog (RFC 9727) - MANDATÓRIO: application/linkset+json
echo "📡 Publicando /.well-known/api-catalog..."
aws s3 cp dist/.well-known/api-catalog s3://${BUCKET_NAME}/.well-known/api-catalog \
    --content-type "application/linkset+json" \
    --acl public-read

# 2. OpenAPI Specification
echo "📄 Publicando /openapi.json..."
aws s3 cp dist/openapi.json s3://${BUCKET_NAME}/openapi.json \
    --content-type "application/openapi+json;version=3.0" \
    --acl public-read

# 3. Agent Catalog (Opcional, mas bom manter consistente)
echo "🤖 Publicando /.well-known/agent-catalog..."
aws s3 cp dist/.well-known/agent-catalog s3://${BUCKET_NAME}/.well-known/agent-catalog \
    --content-type "application/json" \
    --acl public-read

# 4. Invalidação de Cache
echo "🔄 Invalidando cache no CloudFront..."
aws cloudfront create-invalidation --distribution-id ${DISTRIBUTION_ID} --paths "/.well-known/*" "/openapi.json"

echo "✅ API Catalog publicado com sucesso!"
