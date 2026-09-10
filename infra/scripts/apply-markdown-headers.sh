#!/bin/bash
# ------------------------------------------------------------------------------
# AWS CloudShell Script: Apply Content-Type headers for agent-facing files
# ------------------------------------------------------------------------------
# Purpose: `aws s3 sync` guesses MIME by extension, so the extensionless
# `.well-known/*` metadata files land as `binary/octet-stream` — which strict
# agent scanners (isitagentready, RFC 9728 clients) reject as "not JSON", i.e.
# "no OAuth Protected Resource Metadata found". This re-PUTs the affected
# objects with the right Content-Type and invalidates CloudFront.
#
# Run in AWS CloudShell after `deploy.bat` (or `aws s3 sync dist/ ...`).
# ------------------------------------------------------------------------------

set -euo pipefail

BUCKET_NAME="mauricio.issei.com.br"      # S3 bucket (matches deploy.bat)
DISTRIBUTION_ID="E201F4RL889YZH"         # CloudFront distribution (matches deploy.bat)

echo "🚀 Applying Content-Type headers on s3://$BUCKET_NAME ..."

# 1. Markdown twins (.md) — served to agents that send `Accept: text/markdown`
echo "📄 text/markdown  → *.md"
aws s3 cp "s3://$BUCKET_NAME/" "s3://$BUCKET_NAME/" \
  --exclude "*" --include "*.md" \
  --no-guess-mime-type --content-type "text/markdown; charset=utf-8" \
  --metadata-directive REPLACE --recursive

# 2. Plain-text catalogs (.txt) — llms.txt, llms-full.txt, robots.txt
echo "📑 text/plain     → *.txt"
aws s3 cp "s3://$BUCKET_NAME/" "s3://$BUCKET_NAME/" \
  --exclude "*" --include "*.txt" \
  --no-guess-mime-type --content-type "text/plain; charset=utf-8" \
  --metadata-directive REPLACE --recursive

# 3. Extensionless .well-known JSON (IANA registered names, no file extension).
#    api-catalog is an RFC 9727 linkset → application/linkset+json.
echo "🔗 application/json → .well-known/* (extensionless)"
for name in oauth-protected-resource oauth-authorization-server openid-configuration agent-catalog; do
  aws s3 cp "s3://$BUCKET_NAME/.well-known/$name" "s3://$BUCKET_NAME/.well-known/$name" \
    --no-guess-mime-type --content-type "application/json; charset=utf-8" \
    --metadata-directive REPLACE
done
aws s3 cp "s3://$BUCKET_NAME/.well-known/api-catalog" "s3://$BUCKET_NAME/.well-known/api-catalog" \
  --no-guess-mime-type --content-type "application/linkset+json; charset=utf-8" \
  --metadata-directive REPLACE

# 4. Invalidate CloudFront so the new headers take effect
echo "🧹 CloudFront invalidation (/*) ..."
aws cloudfront create-invalidation --distribution-id "$DISTRIBUTION_ID" --paths "/*"

echo "✅ Done."
echo "💡 Also publish + associate the CloudFront Function 'MarkdownCovert'"
echo "   (infra/cloudfront-functions/viewer-request.js) on the viewer-request event,"
echo "   with a Response Headers Policy carrying 'Vary: Accept'."
