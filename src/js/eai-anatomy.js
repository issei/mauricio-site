/*
 * Anatomia do repositório (T6) — árvore visual interativa (estilo VS Code/GitHub).
 * Dados em eai-anatomy-data.js. Clique numa pasta expande/recolhe; clique em qualquer
 * item atualiza o painel lateral. Acessível: role=tree/treeitem, aria-expanded/selected.
 */
import { REPO_TREE } from './eai-anatomy-data.js';

function buildNode(node, depth, ctx, expanded) {
  const isDir = node.type === 'dir' || node.type === 'root';
  const li = document.createElement('li');
  li.className = 'eai-repo__node';
  li.setAttribute('role', 'treeitem');
  if (isDir) li.setAttribute('aria-expanded', expanded ? 'true' : 'false');

  const row = document.createElement('button');
  row.type = 'button';
  row.className = 'eai-repo__row';
  row.setAttribute('data-type', node.type);
  row.style.setProperty('--depth', String(depth));

  const twistie = isDir && node.children?.length
    ? `<span class="eai-repo__twistie" aria-hidden="true">▸</span>`
    : `<span class="eai-repo__twistie eai-repo__twistie--leaf" aria-hidden="true"></span>`;
  const icon = node.icon ? `<span class="eai-repo__icon" aria-hidden="true">${node.icon}</span>` : '';
  row.innerHTML = `${twistie}${icon}<span class="eai-repo__name">${node.name}</span>`;

  row.addEventListener('click', () => {
    ctx.select(node, row);
    if (isDir && node.children?.length) {
      const open = li.getAttribute('aria-expanded') === 'true';
      li.setAttribute('aria-expanded', open ? 'false' : 'true');
    }
  });

  li.appendChild(row);

  if (isDir && node.children?.length) {
    const group = document.createElement('ul');
    group.className = 'eai-repo__group';
    group.setAttribute('role', 'group');
    node.children.forEach((child) => {
      // raiz expande o 1º nível; subpastas começam recolhidas
      group.appendChild(buildNode(child, depth + 1, ctx, false));
    });
    li.appendChild(group);
  }

  return li;
}

function initAnatomy() {
  const root = document.querySelector('[data-eai-repo]');
  if (!root) return;
  const treeEl = root.querySelector('.eai-repo__tree');
  const panel = root.querySelector('[data-repo-panel]');
  if (!treeEl || !panel) return;

  let activeRow = null;
  const ctx = {
    select(node, row) {
      if (activeRow) activeRow.removeAttribute('data-active');
      row.setAttribute('data-active', 'true');
      activeRow = row;
      panel.innerHTML = `
        <p class="eai-repo__panel-name">${node.icon ? node.icon + ' ' : ''}<code>${node.name}</code></p>
        <p class="eai-repo__panel-desc">${node.desc}</p>`;
    },
  };

  // raiz expandida no primeiro nível
  treeEl.appendChild(buildNode(REPO_TREE, 0, ctx, true));
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAnatomy);
} else {
  initAnatomy();
}
