/**
 * Hub de Conexão — lógica pura de filtro e contagem (spec §2.E, evolução 14).
 * ---------------------------------------------------------------------------
 * Três abas fixas, sempre visíveis, com contador de itens ao lado do rótulo.
 * A aba ativa por padrão é "decidir", alinhada ao mesmo princípio de estado
 * padrão executivo aplicado ao Seletor de Perspectiva.
 *
 * Sem DOM: a view só consome o resultado.
 */

/** Ordem de exibição = profundidade crescente. Não reordenar. */
export const TABS = /** @type {const} */ ([
  { id: 'decidir', label: 'Para decidir', hint: 'Síntese e estratégia' },
  { id: 'planejar', label: 'Para planejar', hint: 'Casos e táticas de orquestração' },
  { id: 'especificar', label: 'Para especificar', hint: 'Arquiteturas e ontologias' },
]);

export const DEFAULT_TAB = 'decidir';

/**
 * @typedef {{slug:string, title:string, blurb:string, href:string,
 *            tab:'decidir'|'planejar'|'especificar', minutes:number,
 *            complexity:string}} HubItem
 */

/**
 * @param {HubItem[]} items
 * @param {string} tab
 * @returns {HubItem[]}
 */
export function filterByTab(items, tab) {
  return items.filter((i) => i.tab === tab);
}

/**
 * Contadores por aba, na ordem de TABS. Sempre devolve as três chaves, mesmo
 * com zero itens — uma aba que some quebra a promessa de "três abas fixas".
 * @param {HubItem[]} items
 * @returns {Record<string, number>}
 */
export function countByTab(items) {
  const counts = Object.fromEntries(TABS.map((t) => [t.id, 0]));
  for (const item of items) {
    if (item.tab in counts) counts[item.tab] += 1;
  }
  return counts;
}

/**
 * Rótulo com contador, como a spec pede literalmente: "Para planejar (6)".
 * @param {{id:string,label:string}} tab
 * @param {Record<string, number>} counts
 */
export function tabLabel(tab, counts) {
  return `${tab.label} (${counts[tab.id] ?? 0})`;
}

/**
 * Valida um id de aba, caindo no padrão quando desconhecido (ex.: hash de URL
 * manipulado). Nunca devolve estado inválido para a view.
 * @param {string|null|undefined} tab
 */
export function normalizeTab(tab) {
  return TABS.some((t) => t.id === tab) ? /** @type {string} */ (tab) : DEFAULT_TAB;
}
