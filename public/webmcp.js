/*
 * WebMCP — expõe ferramentas do site a agentes de IA pelo navegador.
 *
 * Injetado em TODA página pelo plugin `webmcp` do vite.config.js, e à mão em
 * public/lifeos.html (que não passa pelo Vite). Fica em public/ para ter uma
 * URL estável e ficar fora do bundle. Sem navigator.modelContext, nada
 * acontece e a página segue idêntica.
 *
 * Spec: docs/specs/AGENT_READINESS_POR_PAGINA.md (D3).
 */
if (typeof navigator.modelContext !== 'undefined') {
  const controller = new AbortController();
  const signal = controller.signal;

  try {
    // Tool: Get Full CV
    navigator.modelContext.registerTool({
      name: 'get_cv_data',
      description: 'Retrieve the full structured curriculum vitae of Maurício Issei in JSON format.',
      inputSchema: { type: 'object', properties: {} },
      execute: async () => {
        const response = await fetch('/cv.json');
        return await response.json();
      },
    }, { signal });

    // Tool: Get STAR Projects
    navigator.modelContext.registerTool({
      name: 'get_star_projects',
      description: 'Retrieve project case studies formatted with Situation-Task-Action-Result methodology.',
      inputSchema: {
        type: 'object',
        properties: {
          limit: { type: 'integer', description: 'Number of projects to return' },
        },
      },
      execute: async ({ limit }) => {
        const response = await fetch('/star.json');
        const data = await response.json();
        return limit ? data.slice(0, limit) : data;
      },
    }, { signal });
  } catch (err) {
    console.error('❌ Failed to register WebMCP tools:', err);
  }
}
