import { test, expect } from '@playwright/test';

/**
 * Guarda contra a classe de bug que nos custou vários deploys: documentos de
 * descoberta anunciando URLs que retornam 404. Um agente confia no metadata —
 * se ele aponta para o vazio, o agente falha, e nenhum scanner passivo detecta
 * porque eles validam os documentos, não os alvos.
 *
 * Regra: tudo que é anunciado tem que resolver, OU estar explicitamente
 * marcado como planejado.
 */

const ORIGIN = 'https://mauricio.issei.com.br';
/** Anunciado como URL absoluta de produção; testar o path contra o build. */
const asPath = (url) => url.replace(ORIGIN, '') || '/';

test.describe('Discovery documents: o que é anunciado precisa existir', () => {
  test('jwks_uri resolve (não pode ser 404)', async ({ request }) => {
    const as = await (await request.get('/.well-known/oauth-authorization-server')).json();
    expect(as.jwks_uri, 'jwks_uri deve estar declarado').toBeTruthy();

    const jwks = await request.get(asPath(as.jwks_uri));
    expect(jwks.ok(), `${as.jwks_uri} não resolve`).toBe(true);
    expect(await jwks.json()).toHaveProperty('keys');
  });

  test('agent_auth.skill resolve e aponta para o auth.md', async ({ request }) => {
    const as = await (await request.get('/.well-known/oauth-authorization-server')).json();
    const skill = as.agent_auth?.skill;

    // O validador do isitagentready exige a URL apontando para /auth.md.
    expect(skill, 'agent_auth.skill ausente').toBeTruthy();
    expect(skill).toBe(`${ORIGIN}/auth.md`);
    expect((await request.get(asPath(skill))).ok()).toBe(true);
  });

  test('todo resource do MCP server card resolve', async ({ request }) => {
    const card = await (await request.get('/.well-known/mcp/server-card.json')).json();

    for (const r of card.resources) {
      const res = await request.get(asPath(r.uri));
      expect(res.ok(), `resource "${r.name}" → ${r.uri} não resolve`).toBe(true);
    }
  });

  test('endpoint MCP está no ar OU marcado como planejado', async ({ request }) => {
    const card = await (await request.get('/.well-known/mcp/server-card.json')).json();
    const live = (await request.get(asPath(card.endpoint))).ok();

    // Enquanto /mcp não existir, o card precisa dizer isso. Se alguém subir o
    // servidor, remover o marcador faz este teste voltar a passar pelo outro
    // lado do OR — e se alguém remover o marcador SEM subir, o teste quebra.
    if (!live) {
      expect(
        card.status?.endpoint,
        `${card.endpoint} não responde e o card não marca status.endpoint como "planned"`,
      ).toBe('planned');
    }
  });

  test('agent-skills: todo SKILL.md indexado resolve', async ({ request }) => {
    const index = await (await request.get('/.well-known/agent-skills/index.json')).json();

    for (const s of index.skills) {
      const res = await request.get(asPath(s.url));
      expect(res.ok(), `skill "${s.name}" → ${s.url} não resolve`).toBe(true);
    }
  });
});
