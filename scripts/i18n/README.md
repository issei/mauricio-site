# `scripts/i18n` — tradutor local do gêmeo digital `/en/`

Espelha os ativos públicos em PT-BR para `src/en/` e `public/en/` usando
**Argos Translate** — tradução automática neural open-source, rodando na CPU da
máquina de build. **Zero chamadas de API de LLM, zero custo de token.**

Contrato de escopo e arquitetura de borda: [`docs/specs/pages/SDD-i18n-en.md`](../../docs/specs/pages/SDD-i18n-en.md).
Uso pelo agente: [`.claude/skills/sync-i18n/SKILL.md`](../../.claude/skills/sync-i18n/SKILL.md).

## Instalação (uma vez por máquina)

```bash
python3 -m venv .venv-i18n
. .venv-i18n/bin/activate            # Windows: .venv-i18n\Scripts\activate
pip install -r scripts/i18n/requirements.txt
npm run i18n:install                 # baixa o modelo pt→en (~100 MB)
```

`npm run i18n:install` é o único passo que usa rede. Depois dele tudo roda
offline. O ambiente pesa ~6 GB por causa do `torch` que o `stanza` puxa —
é ferramenta de build, não entra no bundle do site.

> **Rede corporativa:** o modelo vem de `data.argosopentech.com`. Se a política
> de egresso bloquear esse host, `--install-model` falha com 403 e o tradutor
> fica indisponível (saída 2). Libere o host ou rode a sincronização numa
> máquina que o alcance — o resultado é commitado, então basta uma.

## Uso

```bash
npm run i18n:sync          # traduz só o que a fonte mudou (usa o manifesto)
npm run i18n:sync:all      # retraduz tudo, ignorando o manifesto
npm run i18n:check         # não escreve; sai ≠0 se algum espelho está velho
node scripts/sync-i18n.mjs --files src/proposta.html public/proposta.md
```

`npm run build` dispara `prebuild`, que roda a sincronização em modo `--soft`:
sem o Argos instalado, avisa e segue com os espelhos versionados em vez de
derrubar o deploy.

## Como está organizado

| Arquivo | Responsabilidade |
|---|---|
| `assets.py` | Mapa PT→EN dos ativos públicos. **Fonte única** — o Node lê via `--print-map`. |
| `engine.py` | Motores (`argos`, `identity`, `mock`, `mangle`), cache de segmentos, marcadores. |
| `links.py` | Reescrita de rota: só muda o link cujo alvo tem espelho. |
| `html_tx.py` | HTML: `lang`, `hreflang`, `canonical`, rotas, texto e `alt`/`title`/`aria-label`. |
| `jsonld_tx.py` | JSON-LD (AEO) e JSON de dados (`cv.json`, `star.json`). |
| `markdown_tx.py` | Markdown e `llms*.txt`. |
| `translate.py` | CLI. |
| `../sync-i18n.mjs` | Orquestrador: o que está velho, o que traduzir, manifesto. |

### Os quatro motores

`--engine argos` é o único que traduz de verdade. Os outros existem para que a
**camada estrutural** — que é a que quebra o site — seja testável sem 5 GB de
modelo instalado:

- `identity` devolve o texto intacto: exercita `lang`, `hreflang`, `canonical`,
  reescrita de rota e preservação de código, e só.
- `mock` devolve CAIXA ALTA: torna visível **o que foi enviado ao modelo**. Sob
  `identity`, esquecer de proteger um `<pre>` sai idêntico a protegê-lo.
- `mangle` apaga os marcadores, como um modelo ruim faria: exercita a
  contingência que garante a sintaxe mesmo quando o NMT não colabora.

Os três últimos são usados por `tests/i18n.test.mjs`, que roda no `npm run gate`.

## Decisões que valem explicar

**O HTML não é reconstruído.** O parser reemite cada token como veio da origem e
faz cirurgia pontual só onde precisa mudar. Um pretty-printer reescreveria o
arquivo inteiro e o diff entre PT-BR e EN deixaria de ser legível.

**Só se reescreve o link cujo alvo tem espelho.** `/proposta` vira
`/en/proposta`; `/aeo.css` e `/favicon.svg` não viram nada, porque existe um
único arquivo desses servindo as duas línguas.

**Chave de JSON nunca é traduzida.** `src/js/cv-renderer.js` lê `dado.Resumo`;
renomear para `Summary` quebraria o renderizador nas duas línguas.

**A estrutura não depende do comportamento do modelo.** Trechos opacos viram
marcador antes de ir ao NMT, e os marcadores são **conferidos na volta**. Se o
modelo perdeu algum, o caminho determinístico assume: traduz cada trecho
isolado e remonta. Perde-se contexto de frase; não se perde a sintaxe.

**O manifesto compara hash, não data.** `scripts/i18n/i18n-manifest.json` guarda
o sha256 da fonte no momento em que o espelho foi gerado. Comparar `mtime` não
serviria: um `git checkout` reescreve a data de todo mundo e o espelho
"envelheceria" sem que uma linha mudasse.

## Cache

`scripts/i18n/.cache/segments.json` memoriza cada segmento já traduzido. Não é
versionado. Apagar só custa tempo na próxima execução; `I18N_NO_CACHE=1`
desliga.
