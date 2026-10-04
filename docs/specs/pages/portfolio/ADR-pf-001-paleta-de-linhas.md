# ADR-pf-001: paleta categórica das linhas (namespace `pf-`)

**Status:** aceito
**Data:** 2026-09-22
**Contexto:** home "Mapa de Linhas" (`src/index.html`)

## Contexto

O Dark Tech tem dois acentos (`#007bff` e `#8a2be2`). O mapa da home desenha 7 linhas, uma por grupo de `Habilidades`, e elas precisam ser distinguíveis entre si. Com dois acentos isso não é possível.

## Decisão

1. **Base Dark Tech mantida.** O fundo é `#0d1117`, as superfícies `#161b22`, o texto `#c9d1d9` e o gradiente de acento `#007bff` → `#8a2be2`. Não há fundo claro.
2. **Sete cores categóricas**, só como identidade de linha, definidas como `--pf-l-*` em `src/index.css`. **Nenhum hexadecimal** das linhas aparece fora desse arquivo.
3. **Contraste:** cada cor de linha precisa ter ≥ 4.5:1 sobre `#0d1117`, porque também aparece como texto (siglas e "desde AAAA"). `tests/portfolio.tokens.test.mjs` faz a checagem com `tests/_helpers/contrast.mjs`.
4. **A cor nunca é o único canal:** toda linha tem sigla de 3 letras e nome por extenso na legenda e nos rótulos acessíveis.
5. **Escopo:** `src/index.html` e `src/index.css`. Fora deles a exceção não vale. O namespace `pf-` impede o vazamento.
