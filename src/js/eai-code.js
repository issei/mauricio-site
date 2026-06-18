/*
 * Realce de sintaxe leve (WU-15) — sem dependências.
 * Lê o textContent (conteúdo confiável, nosso) de <code data-lang="python">,
 * escapa &<>, e aplica spans de token num único passo de regex (evita aninhamento).
 * Progressive enhancement: sem JS, o código aparece como texto puro legível.
 */
const KEYWORDS =
  'def|return|if|elif|else|for|while|import|from|class|None|True|False|and|or|not|in|is|as|with|raise|try|except|finally|lambda|yield|assert|await|async|pass|break|continue|global';

const BUILTINS = 'int|float|str|bool|list|dict|set|tuple|self|print|len|range';

const escapeHtml = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// Ordem importa: comentário e string primeiro (capturam tudo até o fim/fechamento).
const TOKEN_RE = new RegExp(
  [
    '(#[^\\n]*)', // 1 comentário
    "('(?:\\\\.|[^'\\\\])*'|\"(?:\\\\.|[^\"\\\\])*\")", // 2 string
    '(\\b\\d+\\.?\\d*\\b)', // 3 número
    `(\\b(?:${KEYWORDS})\\b)`, // 4 keyword
    `(\\b(?:${BUILTINS})\\b)`, // 5 builtin
  ].join('|'),
  'g'
);

function highlight(code) {
  const escaped = escapeHtml(code);
  return escaped.replace(TOKEN_RE, (m, c, s, n, k, b) => {
    if (c) return `<span class="tok-c">${c}</span>`;
    if (s) return `<span class="tok-s">${s}</span>`;
    if (n) return `<span class="tok-n">${n}</span>`;
    if (k) return `<span class="tok-k">${k}</span>`;
    if (b) return `<span class="tok-b">${b}</span>`;
    return m;
  });
}

function initCode() {
  document.querySelectorAll('code[data-lang="python"]').forEach((el) => {
    if (el.dataset.hl === 'done') return;
    el.innerHTML = highlight(el.textContent);
    el.dataset.hl = 'done';
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initCode);
} else {
  initCode();
}
