---
name: sync-i18n
description: Sincroniza o gêmeo digital em inglês (/en/) depois de qualquer edição em ativo público PT-BR — src/*.html, public/*.md, cv.json, star.json, llms.txt, llms-full.txt, cv-for-ai.md. Roda o tradutor local Argos Translate (custo zero de token), confere lang/hreflang/canonical/inLanguage e o quality gate. Use SEMPRE que criar, alterar ou refatorar um desses arquivos.
---

# sync-i18n — manter `/en/` espelhando o PT-BR

O site publica duas línguas a partir de UMA fonte: o português na raiz e um
gêmeo gerado em `/en/`. O gêmeo não é escrito à mão — é derivado por
`scripts/i18n/translate.py` (Argos Translate, NMT local, **sem chamada de API
de LLM**).

Isso cria uma obrigação: **toda edição em ativo público PT-BR deixa o espelho
em inglês velho.** Um espelho velho é pior do que um espelho ausente — a página
existe, está indexada e está mentindo sobre o conteúdo atual. Fechar esse ciclo
na mesma sessão da edição é o trabalho desta skill.

> Contrato de escopo e arquitetura de borda:
> [`docs/specs/pages/SDD-i18n-en.md`](../../../docs/specs/pages/SDD-i18n-en.md).
> Detalhes do tradutor: [`scripts/i18n/README.md`](../../../scripts/i18n/README.md).

## Quando disparar

**Sempre** que a sessão criar, alterar ou refatorar:

- `src/*.html` — qualquer página pública (as administrativas estão fora, ver §2.2 da SDD);
- `public/*.md` — artigos e conteúdo;
- `public/llms.txt`, `public/llms-full.txt`, `public/cv-for-ai.md` — ativos AEO;
- `public/cv.json`, `public/star.json` — dados estruturados.

**Não dispare** para `.agents/`, `.claude/`, `docs/specs/`, `tests/`,
`scripts/`, `infra/` nem para as páginas internas (`admin`, `admin-editor`,
`diagnostic`, `test-github`, `exemplopdi`, `mapmind`, `vsl`, `404`). Elas não
têm espelho — e o tradutor as ignora sozinho, então rodar não estraga nada,
só não faz nada.

Em caso de dúvida sobre um arquivo, pergunte ao mapa em vez de adivinhar:

```bash
python3 scripts/i18n/translate.py --print-map | grep <nome-do-arquivo>
```

## Fluxo

### 1. Identificar o que mudou na sessão

```bash
git status --porcelain -- src public
git diff --name-only origin/main...HEAD -- src public
```

### 2. Sincronizar

O caminho normal descobre sozinho o que está velho (compara o sha256 da fonte
com o manifesto):

```bash
npm run i18n:sync
```

Para forçar arquivos específicos:

```bash
node scripts/sync-i18n.mjs --files src/proposta.html public/proposta.md
```

**Se o motor não estiver instalado** o comando sai com código 2 e imprime as
instruções. Instale (uma vez por máquina) e repita:

```bash
python3 -m venv .venv-i18n && . .venv-i18n/bin/activate
pip install -r scripts/i18n/requirements.txt
npm run i18n:install
```

Se a rede bloquear `data.argosopentech.com`, **não invente uma tradução à mão e
não use um LLM para traduzir** — o gêmeo passaria a ter duas procedências
diferentes e ninguém saberia qual página veio de onde. Registre o bloqueio no
resumo e siga com o resto do trabalho.

### 3. Validar que o espelho existe e está em dia

```bash
npm run i18n:check
```

Sai 0 quando todo espelho corresponde à sua fonte. `VELHO` é sempre falha;
`FALTANDO` é falha depois que o gêmeo `/en/` foi implantado.

### 4. Revisar SEO/AEO do que foi gerado

Para cada `src/en/*.html` tocado, confira à mão (o tradutor faz, mas o gate não
cobre página por página):

- [ ] `<html lang="en">`;
- [ ] **um** `<link rel="canonical">`, apontando para `https://mauricio.issei.com.br/en/<slug>`;
- [ ] trio `hreflang` — `pt-BR` → rota PT, `en` → rota EN, `x-default` → rota PT;
- [ ] JSON-LD com `"inLanguage": "en-US"` e `@id` sob `/en/`;
- [ ] nenhum link interno apontando para a rota em português de uma página que
      tem espelho.

Um comando resolve os quatro primeiros:

```bash
grep -n 'lang=\|canonical\|hreflang\|inLanguage' src/en/<slug>.html
```

### 5. Rodar o quality gate

```bash
npm run gate
```

O gate já inclui `sync-i18n --check` e `tests/i18n.test.mjs` (invariantes de
estrutura: `lang`, `canonical`, `hreflang`, JSON-LD válido, bloco de código
preservado, `cv.json` com as mesmas chaves). **Fail-closed**: pare na primeira
falha.

## Regras que não se negociam

1. **Nunca edite `src/en/**` ou `public/en/**` à mão.** São gerados; a próxima
   sincronização sobrescreve. Se o inglês está errado, o defeito está no
   português ou no tradutor — corrija lá.
2. **Nunca traduza com LLM.** O custo de token é justamente o que esta
   arquitetura elimina. O motor é o Argos, local.
3. **Commite fonte, espelho e manifesto juntos.** `scripts/i18n/i18n-manifest.json`
   é o que permite ao gate saber que o espelho corresponde à fonte; separá-los
   deixa a próxima sessão com um falso "está em dia".
4. **Chave de JSON não se traduz.** `src/js/cv-renderer.js` lê `dado.Resumo`.

## Saída esperada

Um resumo com: quais fontes PT-BR mudaram, quais espelhos foram regravados,
o resultado do `i18n:check`, os itens de SEO/AEO conferidos e o resultado do
`npm run gate` — ou a lista do que ficou pendente e por quê.
