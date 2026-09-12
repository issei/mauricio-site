# Agent Readiness por página — SDD

> **Status:** aprovado para execução · **Data:** 2026-09-12
> **Origem:** scan Cloudflare Radar / isitagentready de `/curiosidade-e-investigacao`
> (nível 2 "Bot-Aware") + varredura das 61 URLs do sitemap em produção.
> **Base:** [`docs/AGENT_READINESS.md`](../AGENT_READINESS.md). Este SDD estende o
> estado "a raiz passa" para "toda página do sitemap passa".

---

## 1. Problema

O scan da raiz fecha 16 pass / 0 fail (nível 5). O scanner avalia a **URL
informada**, e três checks são por página — numa página interna o resultado cai
para nível 2:

| Check | URLs do sitemap que falham (de 61) | Evidência do scanner |
|---|---|---|
| `contentAccessibility.markdownNegotiation` | 42 (12 PT + 30 `/en`) | `Response content-type is text/html, not text/markdown` |
| `discovery.oauthProtectedResource` | 60 (todas menos `/`) | `GET /.well-known/oauth-protected-resource/<página> → 404` |
| `discovery.webMcp` | todas menos a home | `No tools registered via navigator.modelContext` |

`markdownNegotiation` é o requisito do nível 3 (`nextLevel.requirements` do scan).

Extra: `/en` (listado no sitemap) responde **404** para qualquer cliente.

Sem ação: os 6 `neutral` (`webBotAuth`, `commerce.*`) e os erros de CORS de fonte
no console do scan — causados pelo header `signature-agent` que o próprio
scanner envia no preflight.

## 2. Causas raiz

| # | Causa | Onde |
|---|---|---|
| C1 | `MARKDOWN_MAP` escrito à mão: sem `curiosidade-e-investigacao` e sem nenhuma rota `/en/`, embora os `.md` existam | `infra/cloudfront-functions/viewer-request.js` |
| C2 | Function publicada defasada do repo: `f192c6d` (rotas `case-agents`/`agent-ready`) nunca foi publicado. O publish é manual e não faz parte do deploy | `.github/workflows/deploy.yml` |
| C3 | 9 páginas sem `.md`: `catalogo`, `know`, `life`, `life3d` (`hasMd:false`, sem `tldr`/`faq`/`mdSections`); `cookies`, `privacidade`, `termos`, `operacao-capital-cognitivo`, `lifeos` (fora do `pages.mjs`) | `scripts/seo/pages.mjs`, `public/` |
| C4 | Só existe o PRM da raiz. A RFC 9728 §3.1 deriva `/.well-known/oauth-protected-resource<caminho>`; não dá para servir por arquivo — `oauth-protected-resource` já é arquivo e não pode ser também diretório | `public/.well-known/` |
| C5 | Tools WebMCP inline só em `src/index.html` | `src/index.html` |
| C6 | `/en` vira `/en.html`, que não existe | `viewer-request.js` |

## 3. Decisões

- **D1 — Markdown por regra, não por mapa.** Com `Accept: text/markdown`, um
  caminho de página (último segmento sem extensão, ou `.html`) é reescrito para
  o mesmo caminho em `.md`. Página nova fica coberta sem republicar a function.
  *Custo aceito:* `.md` ausente vira 404 em vez de cair no HTML — compensado pela
  trava D6.
- **D2 — PRM por caminho sintetizado na function.** `/.well-known/oauth-protected-resource/<caminho>`
  devolve 200 `application/json` gerado na edge: `resource` = origem + caminho;
  demais campos idênticos ao PRM da raiz (um teste confere contra o arquivo, para
  não divergirem). Só caminhos com forma de página são aceitos — o resto segue
  para o S3 (404). A function não reflete string arbitrária.
- **D3 — WebMCP num arquivo só, injetado no build.** `public/webmcp.js` (fora do
  bundle, URL estável) + plugin `transformIndexHtml` no `vite.config.js` que
  injeta a tag em todo HTML de entrada (PT e EN). Página futura já nasce coberta.
  `public/lifeos.html` não passa pelo Vite: tag manual.
- **D4 — O deploy publica a function.** Depois do sync do S3:
  `update-function` → `test-function` (falha o job em erro de runtime) →
  `publish-function`. Antes do sync, os testes unitários da function. Uma
  function quebrada derruba o site inteiro — por isso duas travas.
- **D5 — `.md` das 9 páginas.** `catalogo`/`know`/`life`/`life3d`: `hasMd:true` +
  `mdSections` escritas a partir do conteúdo real da página. `cookies`/
  `privacidade`/`termos`/`operacao-capital-cognitivo`/`lifeos`: `.md` curto
  escrito à mão, no padrão de `public/index.md`.
- **D6 — Trava de presença.** Etapa do gate, depois do build: para cada `<loc>`
  de `dist/sitemap.xml` existe o `.md` correspondente em `dist/`.

---

## 4. Execução — sessão cloud

Branch: **`feat/agent-readiness-por-pagina`**. Ordem T0 → T7. Guardrails na §6.

### T0 — Setup

```bash
npm ci
npx playwright install --with-deps chromium
# opcional (ver T5): tradutor local — baixa o modelo PT→EN e pode falhar por rede
pip install argostranslate && npm run i18n:install
```

### T1 — Function de edge (C1, C4, C6) — `infra/cloudfront-functions/viewer-request.js`

- Remover `MARKDOWN_MAP`. Manter só os dois atalhos de catálogo: `/llms` →
  `/llms.txt`, `/llms-full` → `/llms-full.txt`.
- `/en` e `/en/` → `/en/index.html` (e `/en/index.md` com Accept Markdown).
- PRM por caminho (D2). Sufixo aceito (após `/.well-known/oauth-protected-resource`):
  `/^(\/en)?(\/[a-z0-9-]+(\.html)?)?$/`, não vazio. O PRM da raiz (sem sufixo)
  continua vindo do S3.
- Runtime `cloudfront-js-2.0`: conferir na documentação da AWS o formato de
  resposta com `body` gerada em viewer-request; manter o arquivo < 10 KB.

Casos obrigatórios em `tests/cloudfront-viewer-request.test.js`:

| Entrada | Accept | Resultado |
|---|---|---|
| `/` | markdown | `/index.md` |
| `/devin`, `/devin.html`, `/devin/` | markdown | `/devin.md` |
| `/curiosidade-e-investigacao` | markdown | `/curiosidade-e-investigacao.md` |
| `/catalogo` | markdown | `/catalogo.md` (substitui o caso antigo que caía no HTML) |
| `/en/devin` | markdown | `/en/devin.md` |
| `/en`, `/en/` | — | `/en/index.html` |
| `/en` | markdown | `/en/index.md` |
| `/llms` | markdown | `/llms.txt` |
| `/devin` | navegador (`text/html,...,*/*;q=0.8`) | `/devin.html` |
| `/assets/devin-BRjrEIyn.js` | markdown | inalterado |
| `/.well-known/api-catalog` | markdown | inalterado |
| `/.well-known/oauth-protected-resource` | — | inalterado (arquivo da raiz) |
| `/.well-known/oauth-protected-resource/curiosidade-e-investigacao.html` | — | resposta 200, `resource` = `https://mauricio.issei.com.br/curiosidade-e-investigacao.html` |
| `/.well-known/oauth-protected-resource/en/devin` | — | resposta 200, `resource` = `https://mauricio.issei.com.br/en/devin` |
| `/.well-known/oauth-protected-resource/../x`, `/<script>` | — | inalterado (não sintetiza) |

O harness `rota()` hoje devolve `.uri`; nos casos de PRM o handler devolve uma
**resposta** — conferir `statusCode`, `content-type` e o `body` parseado. Um teste
de não divergência compara o body com `public/.well-known/oauth-protected-resource`
(apenas `resource` difere). Manter os casos existentes que continuam válidos.

**Aceite:** `npm run test:unit` verde.

### T2 — `.md` faltantes (C3) + trava (D6)

- `scripts/seo/pages.mjs`: `catalogo`, `know`, `life`, `life3d` com `hasMd:true` e
  `mdSections` fiéis ao conteúdo da página (ler o HTML; nada inventado; voz
  "engenharia, não marketing"). Rodar `node scripts/seo/build-aeo.mjs catalogo know life life3d`
  e revisar o diff dos HTML (o injetor é idempotente, mas regrava o `<head>`).
- `public/{cookies,privacidade,termos,operacao-capital-cognitivo,lifeos}.md`
  escritos à mão, curtos, com H1 = título da página e link para a URL canônica.
- Nova etapa no `scripts/quality-gate.mjs`, logo após o build: ler
  `dist/sitemap.xml`; para cada `<loc>` exigir o `.md` em `dist/`
  (`/` → `/index.md`, `/en` → `/en/index.md`, `/x` → `/x.md`).

**Aceite:** a etapa passa após `npx vite build`; apagar um `.md` faz a etapa falhar.

### T3 — WebMCP em todas as páginas (C5)

- Mover o bloco de `src/index.html` (seção `// --- WebMCP Implementation ---`)
  para `public/webmcp.js`, mantendo o guard `typeof navigator.modelContext`, o
  `AbortController` e o `try/catch`. Remover o inline — registrar a mesma tool
  duas vezes lança erro.
- Plugin no `vite.config.js`: `transformIndexHtml` devolvendo
  `[{ tag: 'script', attrs: { type: 'module', src: '/webmcp.js' }, injectTo: 'body' }]`.
  Sem `order: 'pre'` — a tag não deve ser empacotada.
- `public/lifeos.html`: `<script type="module" src="/webmcp.js"></script>` antes de `</body>`.
- `tests/webmcp.spec.js`: `page.addInitScript` com um `navigator.modelContext`
  falso que registra os nomes recebidos; visitar `/index.html`,
  `/curiosidade-e-investigacao.html`, `/catalogo.html`, `/en/devin.html`,
  `/lifeos.html`; esperar `get_cv_data` e `get_star_projects`, uma vez cada.

**Aceite:** `npx playwright test tests/webmcp.spec.js --project chromium` verde, e
depois de `npx vite build`, `grep -L 'src="/webmcp.js"' dist/*.html dist/en/*.html`
não lista nenhuma página pública.

### T4 — Deploy publica a function (C2, D4) — `.github/workflows/deploy.yml`

- Antes de "Deploy to S3": passo `node --test tests/cloudfront-viewer-request.test.js`.
- Criar `infra/cloudfront-functions/test-event.json`: evento `viewer-request`,
  `GET /devin`, header `accept: text/markdown`.
- Entre "Deploy to S3" e "Invalidate CloudFront Cache":

```yaml
      - name: Publish CloudFront Function (viewer-request)
        # A function fica na frente de TODO request: testa no estágio
        # DEVELOPMENT antes de promover para LIVE.
        env:
          FN: MarkdownCovert
        run: |
          ETAG=$(aws cloudfront describe-function --name "$FN" --query ETag --output text)
          ETAG=$(aws cloudfront update-function --name "$FN" --if-match "$ETAG" \
            --function-config "Comment=viewer-request deploy ${GITHUB_SHA::7},Runtime=cloudfront-js-2.0" \
            --function-code fileb://infra/cloudfront-functions/viewer-request.js \
            --query ETag --output text)
          R=$(aws cloudfront test-function --name "$FN" --if-match "$ETAG" --stage DEVELOPMENT \
            --event-object fileb://infra/cloudfront-functions/test-event.json --output json)
          echo "$R" | jq -e '(.TestResult.FunctionErrorMessage // "") == ""' >/dev/null \
            || { echo "::error::$(echo "$R" | jq -r .TestResult.FunctionErrorMessage)"; exit 1; }
          echo "$R" | jq -r .TestResult.FunctionOutput | grep -q '/devin.md' \
            || { echo "::error::test-function: saída inesperada"; exit 1; }
          aws cloudfront publish-function --name "$FN" --if-match "$ETAG"
```

- Nenhum secret novo e nenhum identificador de conta: o nome da function já é
  público (`docs/AGENT_READINESS.md`).
- Este passo só roda no merge e depende da permissão IAM do role de deploy —
  aplicada pelo mantenedor, fora do repositório.

**Aceite:** YAML revisado; o comando do passo reproduz localmente a sintaxe (sem
credenciais, basta revisar).

### T5 — i18n + gate

```bash
npm run i18n:sync && npm run i18n:check
npm run gate
```

Se o Argos não estiver disponível: **não** gerar `/en/` à mão, **não** usar
`--engine identity`, **não** traduzir com LLM. Seguir adiante e marcar no PR
**"i18n pendente — rodar local"**. Nesse caso a etapa de espelhos do gate falha
por construção: rodar `npm run test:unit` e `npx playwright test --project chromium`
e reportar esses resultados.

### T6 — Documentação

- `docs/AGENT_READINESS.md`: §2 — os três checks são por página; `webMcp` →
  `public/webmcp.js` + plugin; `markdownNegotiation` → regra D1; `oauthProtectedResource`
  → PRM por caminho (D2). §3 — o deploy publica a function. §8 — remover a
  pendência resolvida. Atualizar a linha "Estado atual".
- `docs/specs/CICD_OIDC.md`: o role de deploy precisa de
  `cloudfront:DescribeFunction`, `UpdateFunction`, `TestFunction` e
  `PublishFunction` na function `MarkdownCovert` — **sem ARN nem número de conta**.
- `knowledge/` (OKF): atualizar o conceito de agent readiness e rodar
  `okf validate knowledge --strict`.

### T7 — Pull request

PR para `main` contendo: checklist de aceite T1–T6, status do i18n e, em
destaque, **"não fazer merge antes da permissão IAM do role de deploy (passo
manual do mantenedor)"**. Não fazer merge.

---

## 5. Fora do escopo da sessão cloud

AWS (IAM, backup e rollback da function), merge e verificação em produção. As
instruções operacionais — que envolvem identificadores da conta — ficam num
arquivo local do mantenedor, fora do repositório.

## 6. Guardrails

- Nunca editar `src/en/**` nem `public/en/**` à mão.
- Nenhum identificador AWS (conta, distribution, hosted zone, KMS key, ARN de
  role) em arquivo versionado — o repositório é público (`AGENT_READINESS.md` §3).
- Sem tradução por LLM.
- Não implementar `webBotAuth` nem `commerce.*`.
- Sem merge e sem push em `main`.

## 7. Aceite em produção (após o merge)

```bash
B=https://mauricio.issei.com.br
for u in $(curl -s $B/sitemap.xml | grep -o '<loc>[^<]*</loc>' | sed 's/<\/\?loc>//g'); do
  p=${u#$B}; [ -z "$p" ] && p=/
  html=$(curl -s -o /dev/null -w '%{http_code}' "$u")
  prm=$(curl -s -o /dev/null -w '%{http_code}' "$B/.well-known/oauth-protected-resource${p%/}")
  md=$(curl -s -o /dev/null -w '%{content_type}' -H 'Accept: text/markdown' "$u")
  echo "$html $prm $md $p"
done | grep -v '^200 200 text/markdown'   # saída vazia = todas as páginas ok
```

E `POST https://isitagentready.com/api/scan` em uma página PT, uma `/en/` e em
`/lifeos`: **16 pass / 0 fail / 6 neutral** em cada uma.
