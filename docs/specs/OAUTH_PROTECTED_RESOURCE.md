# Specification: OAuth Protected Resource Metadata

**Version**: 1.0  
**Status**: Draft  
**Reference**: [RFC 9728](https://www.rfc-editor.org/rfc/rfc9728)

## Overview

This specification defines the publication of OAuth 2.0 Protected Resource Metadata for the Maurício Yokoyama Issei portfolio site. This metadata allows AI agents and other automated clients to discover how to authenticate when accessing protected APIs (e.g., CV data, project details).

## Implementation Details

### Metadata Location

The metadata MUST be served at the following well-known URI:
`/.well-known/oauth-protected-resource`

### Content-Type

The response MUST be served with `Content-Type: application/json`.

### Metadata Fields

The following fields will be included:

- `resource`: `https://mauricio.issei.com.br` (The resource identifier).
- `authorization_servers`: `["https://mauricio.issei.com.br"]` (The OIDC issuer).
- `scopes_supported`: `["cv:read", "projects:read", "profile"]`.
- `bearer_methods_supported`: `["header"]`.
- `resource_documentation`: `https://mauricio.issei.com.br/cv-for-ai.md`.
- `resource_policy_uri`: `https://maurici.issei.com.br/privacidade`.

## Discovery Integration

### 1. API Catalog (RFC 9727)
The `oauth-protected-resource` link should be added to `/.well-known/api-catalog` to facilitate discovery.

### 2. Robots.txt
While not strictly required by the RFC, adding a comment or link in `robots.txt` helps agent crawlers.

### 3. HTML Link Headers (Optional)
The metadata can be advertised via HTML `<link>` tags:
`<link rel="oauth-protected-resource" href="/.well-known/oauth-protected-resource">`

## Quality Assurance

- **Validation**: Use `https://isitagentready.com/api/scan` to verify discovery.
- **MIME Type**: Ensure S3/CloudFront serves the file with `application/json`.
- **Testing**: Playwright smoke test to ensure the file is accessible and contains valid JSON.
