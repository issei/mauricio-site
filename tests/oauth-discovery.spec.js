import { test, expect } from '@playwright/test';

test.describe('OAuth Protected Resource Metadata Discovery', () => {
  test('should serve RFC 9728 compliant metadata at /.well-known/oauth-protected-resource', async ({ request }) => {
    const response = await request.get('/.well-known/oauth-protected-resource');
    expect(response.ok()).toBe(true);

    const metadata = await response.json();
    expect(metadata).toHaveProperty('resource', 'https://mauricio.issei.com.br');
    expect(metadata).toHaveProperty('authorization_servers');
    expect(Array.isArray(metadata.authorization_servers)).toBe(true);
    expect(metadata.authorization_servers).toContain('https://mauricio.issei.com.br');
    expect(metadata).toHaveProperty('scopes_supported');
  });

  test('should be linked in the API catalog', async ({ request }) => {
    const response = await request.get('/.well-known/api-catalog');
    expect(response.ok()).toBe(true);

    const catalog = await response.json();
    const oauthLink = catalog.linkset.find(entry => entry['oauth-protected-resource']);
    expect(oauthLink).toBeDefined();
    expect(oauthLink['oauth-protected-resource'][0].href).toBe('https://mauricio.issei.com.br/.well-known/oauth-protected-resource');
  });

  test('should be listed in the agent catalog', async ({ request }) => {
    const response = await request.get('/.well-known/agent-catalog');
    expect(response.ok()).toBe(true);

    const catalog = await response.json();
    const oauthResource = catalog.resources.find(r => r.title === 'OAuth Protected Resource Metadata');
    expect(oauthResource).toBeDefined();
    expect(oauthResource.url).toBe('https://mauricio.issei.com.br/.well-known/oauth-protected-resource');
  });
});
