#!/bin/bash
# ------------------------------------------------------------------------------
# AWS CloudShell Script: Apply Markdown Content-Type Headers
# ------------------------------------------------------------------------------
# Purpose: Sets the correct Content-Type for markdown and text files in S3
# and invalidates the CloudFront cache.
# ------------------------------------------------------------------------------

# --- Configuration (Update these if necessary) ---
BUCKET_NAME="mauricio-issei-site" # Default name from specs
DISTRIBUTION_ID="E1234567890ABC" # Replace with your actual CloudFront ID

echo "🚀 Starting manual infrastructure update..."

# 1. Update Content-Type for Markdown files (.md)
echo "📄 Setting Content-Type: text/markdown for all .md files..."
aws s3 cp s3://$BUCKET_NAME/ s3://$BUCKET_NAME/ \
  --exclude "*" --include "*.md" \
  --no-guess-mime-type \
  --content-type "text/markdown; charset=utf-8" \
  --metadata-directive REPLACE \
  --recursive

# 2. Update Content-Type for Plain Text files (.txt)
echo "📑 Setting Content-Type: text/plain for all .txt files..."
aws s3 cp s3://$BUCKET_NAME/ s3://$BUCKET_NAME/ \
  --exclude "*" --include "*.txt" \
  --no-guess-mime-type \
  --content-type "text/plain; charset=utf-8" \
  --metadata-directive REPLACE \
  --recursive

# 3. Create CloudFront Invalidation
echo "🧹 Invalidating CloudFront cache (/*)..."
aws cloudfront create-invalidation \
  --distribution-id $DISTRIBUTION_ID \
  --paths "/*"

echo "✅ Done! Infrastructure updated successfully."
echo "💡 Note: Ensure the CloudFront Function 'markdown-negotiation' is also published and associated."
