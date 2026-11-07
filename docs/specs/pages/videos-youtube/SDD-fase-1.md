# SDD — Vídeos do YouTube, fase 1 (fundação)

> **Status:** especificação, sem código. **Data:** 2026-11-07.
> **Origem:** [PROPOSTA-arquitetura.md](PROPOSTA-arquitetura.md), opção B, decisões D1 a D9 aceitas pelo Issei em 2026-11-04.
> **Bloqueio:** a coleta (§5) precisa das credenciais da D10. O gerador (§6) e os testes não precisam.

## 1. Objetivo

Cada vídeo do canal ganha uma **ficha** gerada a partir de um arquivo de conteúdo. Nenhuma
página de vídeo é escrita à mão. A fase 1 não usa IA para escrever artigo.

**Entra na fase 1:**

- coleta dos metadados e das legendas do canal;
- `content/videos/<id>.md` (fonte) e `content/temas.yml` (vocabulário);
- gerador `scripts/gen-videos.mjs` com `--check` no gate;
- páginas: ficha de cada vídeo, uma página por assunto e o índice `/videos`;
- comando único de autorização OAuth (`npm run videos:auth`).

**Fica fora:** artigo e fontes (fase 2), áudio e RSS (fase 3), rotina semanal (fase 4).

## 2. URLs e arquivos gerados

| URL | Arquivo gerado | Indexada? | Gêmeo `/en/` na fase 1 |
| :--- | :--- | :--- | :--- |
| `/videos` | `src/videos.html` + `public/videos.md` | sim | sim |
| `/videos/<slug>` | `src/videos/<slug>.html` + `public/videos/<slug>.md` | **não** (`noindex`, fora do sitemap) até `status: publicado` | não; entra quando o vídeo é publicado (fase 2) |
| `/temas/<tema>` | `src/temas/<tema>.html` + `public/temas/<tema>.md` | sim, se tiver ao menos 1 vídeo | sim |

**Escolha minha, reversível:** a ficha não ganha gêmeo em inglês na fase 1. Ela ainda é
`noindex` e a transcrição longa custaria horas de CPU no Argos para páginas que ninguém
encontra pela busca. O gêmeo nasce quando o artigo é publicado (D9).

`<slug>` vem do título, em minúsculas, sem acento, só `[a-z0-9-]`, até 60 caracteres. Uma vez
gravado no arquivo de conteúdo, **não muda** se o título do vídeo mudar. URL é permanente.

## 3. Fonte: `content/videos/<id>.md`

`<id>` é o ID do vídeo no YouTube. Frontmatter YAML (dependência nova: pacote `yaml`, sem
dependências próprias) + corpo Markdown.

```yaml
---
id: dQw4w9WgXcQ
slug: como-ancorar-agentes-no-repositorio   # gravado uma vez; nunca regenerado
status: ficha            # ficha | rascunho | publicado | removido
temas: [engenharia-agentica]               # só chaves de content/temas.yml
youtube:                 # bloco DONO DA COLETA: só o ingest escreve aqui
  titulo: "…"
  publicado_em: 2025-03-14
  duracao: PT14M32S
  descricao: "…"
  miniatura: https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg
  visualizacoes: 1234
  playlists: ["…"]
  legenda: automatica     # manual | automatica | ausente
  links_descricao: ["https://…"]
  coletado_em: 2026-11-08T10:00:00Z
---
(corpo vazio na fase 1; o artigo entra na fase 2)
```

A transcrição fica ao lado: `content/videos/<id>.transcricao.vtt`.

**Regra de posse dos campos.** O ingest só reescreve o bloco `youtube:` e cria arquivos novos.
`slug`, `status`, `temas` e o corpo são da pessoa: o ingest nunca os altera depois de criados.
Assim a coleta pode rodar quantas vezes for preciso sem apagar revisão humana.

## 4. Vocabulário: `content/temas.yml`

```yaml
engenharia-agentica:
  nome: Engenharia agêntica
  resumo: "Uma ou duas frases escritas pelo Issei."
  pilar: p3            # pilar do site, opcional
```

Na fase 1 eu proponho a lista a partir das *playlists* e dos títulos (D7). O Issei aprova no
PR. Até a aprovação, `temas: []` em todos os vídeos e nenhuma página `/temas/` é gerada.

## 5. Coleta: `scripts/videos/ingest.mjs`

1. `channels.list` → *playlist* de uploads do canal (`YOUTUBE_CHANNEL_ID` = `UC551iKrIXGmAB9UcBzHtLhw`, público).
2. `playlistItems.list` + `videos.list`, de 50 em 50 → metadados, duração, visualizações.
3. Para cada vídeo sem `.vtt`: `captions.list` e `captions.download` (OAuth do canal).
4. Vídeo que sumiu do canal ou ficou privado → `status: removido` (a página sai do site).

**Cota diária da API (10.000 unidades).** A listagem custa cerca de 10 unidades para o canal
inteiro. A legenda custa cerca de 250 unidades por vídeo (`captions.list` + `captions.download`;
conferir os valores na tabela de cota do Google antes de implementar). Por isso o ingest baixa
no máximo **35 legendas por execução** e retoma de onde parou: as 178 legendas levam cerca de
5 dias de execução. A ficha é publicada sem transcrição enquanto a legenda não chega.

Credenciais: variáveis de ambiente (GitHub Actions) ou `.env.local` (máquina do Issei, já no
`.gitignore`). Nomes em [`PROPOSTA` §9, D10](PROPOSTA-arquitetura.md) e no passo a passo
entregue ao Issei.

`scripts/videos/auth.mjs` (`npm run videos:auth`): fluxo OAuth de app para computador com
*loopback* em `127.0.0.1`, escopo `youtube.force-ssl`. Abre o navegador, recebe o código e
mostra o *refresh token* uma vez no terminal. Não grava o token em disco.

## 6. Gerador: `scripts/gen-videos.mjs`

Mesmo contrato dos outros geradores: `node scripts/gen-videos.mjs [--check]`. Com `--check`,
não grava e sai ≠0 se algum arquivo gerado divergir da fonte.

**Validação (o build falha se):**

- `slug` repetido, fora de `[a-z0-9-]` ou com mais de 60 caracteres;
- `status` fora da lista;
- tema que não existe em `content/temas.yml`;
- `status: publicado` (proibido na fase 1: não há artigo revisado).

**Ficha de vídeo** (modelo único, sem HTML escrito por vídeo):

1. título (H1), data e duração;
2. player em modo **fachada**: miniatura + botão "Assistir no site" que só então carrega o
   `iframe` de `youtube-nocookie.com`, com `title` descritivo. Nenhum cookie de terceiro antes
   do clique; carregamento leve;
3. descrição do vídeo, com os links tornados clicáveis;
4. assuntos (links para `/temas/<tema>`);
5. transcrição em `<details>`, com o aviso **"Transcrição automática, não revisada"** (D3);
   legenda ausente → "Transcrição ainda não disponível";
6. `<meta name="robots" content="noindex">` enquanto `status ≠ publicado` (D4);
7. JSON-LD `VideoObject` (`name`, `description`, `thumbnailUrl`, `uploadDate`, `duration`,
   `embedUrl`, `inLanguage: pt-BR`, `transcript` quando houver).

**Página de assunto:** nome, resumo de `temas.yml`, lista dos vídeos do assunto (mais recentes
primeiro). **Índice `/videos`:** todos os vídeos não removidos, com filtro por assunto em JS
progressivo (sem JS, a lista completa continua legível).

Visual: tema Dark Tech e Inter, como em `src/service-operations-2-0.html`. Acessibilidade:
`docs/a11y/A11Y.md`, guias de *disclosure* (para `<details>`) e de mídia incorporada.

## 7. Mudanças no que já existe

| Arquivo | Mudança |
| :--- | :--- |
| `vite.config.js` | *glob* inclui `src/videos/*.html`, `src/temas/*.html`, `src/en/temas/*.html`; sitemap exclui as fichas `noindex` (lista lida de um JSON escrito pelo gerador) |
| `scripts/i18n/assets.py` | hoje lê só `src/*.html` e `public/*.md`; passa a ler também `temas/` e as fichas publicadas de `videos/`. Conferir se `links.py` reescreve links com subpasta para `/en/…` |
| `infra/cloudfront-functions/viewer-request.js` | sem mudança esperada (`baseDaPagina` já aceita subpasta); acrescentar casos de teste para `/videos/<slug>` e `/en/temas/<tema>` |
| `scripts/quality-gate.mjs` | etapa `gen-videos.mjs --check` junto dos outros geradores |
| `package.json` | `videos:ingest`, `videos:auth`, `videos:gen`; dependência `yaml` |
| `.gitignore` | já cobre `.env.local`; nada a mudar |

## 8. Testes

- `tests/videos.gen.test.mjs` (`node --test`): cada regra de validação do §6 com um caso que
  falha e um que passa; a regra de posse dos campos do §3 (ingest não toca `slug`, `status`,
  `temas`, corpo).
- `tests/videos.spec.js` (Playwright): **um teste por modelo**, não por vídeo. Ficha (fachada
  carrega o `iframe` só depois do clique; `noindex` presente; `<details>` abre pelo teclado),
  assunto e índice (filtro funciona e, sem JS, a lista aparece). axe sem violações novas.
- Dados de teste: 3 vídeos fictícios em `tests/fixtures/videos/`, para os testes não dependerem
  da API nem das credenciais.

## 9. Critérios de aceite

1. `npm run videos:ingest` com as credenciais cria um arquivo por vídeo do canal; rodar de novo
   não altera nenhum campo da pessoa.
2. `npm run videos:gen` gera ficha para todos os vídeos não removidos, sem nenhum HTML escrito à mão.
3. Nenhuma ficha aparece no `sitemap.xml`; todas têm `noindex`.
4. `/videos` e as páginas de assunto aparecem no sitemap, com gêmeo `.md` e `/en/`.
5. `npm run gate` passa, incluindo `gen-videos.mjs --check`.
6. Nenhum `iframe` do YouTube carrega antes do clique.

## 10. Entrega em PRs

0. **Antecipado (2026-11-07):** `videos:auth` entrou junto com esta spec, para o Issei gerar o
   *refresh token* sem esperar o gerador.
1. **PR A (sem credenciais):** gerador, modelos, testes com *fixtures* e mudanças do §7.
2. **PR B (com credenciais):** `ingest.mjs`, primeira coleta (metadados de todos os vídeos) e a
   proposta de `temas.yml` para o Issei aprovar.
3. **PRs seguintes:** lotes de legendas, no limite da cota diária.

## 11. Pendências

| # | Item | Dono |
| :--- | :--- | :--- |
| P1 | Segredos no GitHub (D10). ID do canal já recebido em 2026-11-07 | Issei |
| P2 | Rodar `npm run videos:auth` uma vez e salvar o token como segredo | Issei |
| P3 | Aprovar a lista de assuntos proposta no PR B | Issei |
| P4 | Primeira tradução `/en/` das páginas de assunto e do índice (Argos na máquina dele) | Issei |
