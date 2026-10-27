# Proposta — páginas automáticas dos vídeos do YouTube

> **Status:** proposta, nada implementado. Precisa das decisões da seção 9 antes do SDD.
> **Data:** 2026-10-27 · **Pedido de:** Issei · **Escopo:** repositório `issei/mauricio-site`.

## 1. Problema

O canal tem cerca de 178 vídeos e cresce. O Issei quer:

- uma página por vídeo, escrita como artigo, com fontes e referências;
- páginas que agrupam os vídeos por assunto;
- recursos extras, como um áudio de podcast por assunto;
- manutenção fácil: nenhuma página escrita ou regenerada à mão.

Hoje cada página do site é um `src/<slug>.html` escrito à mão. Com 178 vídeos ou mais,
esse modelo não escala.

## 2. Princípio: o vídeo vira **dado**, a página vira **saída**

O site já usa esse padrão em três lugares, e a proposta copia o mesmo desenho:

| Já existe | Fonte única | Gerador | Conferência no gate |
| :--- | :--- | :--- | :--- |
| Home e currículo | `public/cv.json` | `scripts/gen-portfolio.mjs` | `--check` |
| Camada editorial | `scripts/editorial/editorial.data.mjs` | `scripts/gen-editorial.mjs` | `--check` |
| Gêmeo em inglês | o próprio PT-BR | `scripts/sync-i18n.mjs` (Argos, local) | `i18n:check` |

Para os vídeos: **um arquivo de conteúdo por vídeo** é a fonte. Um gerador transforma esse
arquivo em HTML, em Markdown (gêmeo para agentes) e em entradas do sitemap. Ninguém edita
HTML de vídeo. Para corrigir uma página, a pessoa corrige o arquivo de conteúdo.

## 3. Arquitetura proposta

```
YouTube (API)           content/videos/<id>.md          scripts/gen-videos.mjs
 metadados  ──┐          frontmatter (dados)   ──────►  src/videos/<slug>.html
 legendas   ──┼─► ingest ─► corpo (artigo)              public/videos/<slug>.md
 descrição  ──┘   + IA     status: rascunho│publicado   src/temas/<tema>.html
                   (rascunho)                           src/videos.html (índice)
                                                        public/podcast.xml (RSS)
content/temas.yml  (vocabulário controlado de assuntos)
```

### 3.1 Etapa 1 — coleta (automática)

`scripts/videos/ingest.mjs` lista o canal pela **YouTube Data API v3** e, para cada vídeo
novo, grava `content/videos/<id>.md` com:

- metadados: título, data, duração, miniatura, descrição, *playlist*;
- transcrição: legenda do próprio canal (o Issei é dono, então a API entrega a legenda com
  OAuth) ou, se não houver, transcrição local com Whisper (sem custo por uso);
- links que já estão na descrição do vídeo, como candidatos a fonte.

A transcrição fica em `content/videos/<id>.transcricao.vtt`. São poucos KB por vídeo; 178
vídeos cabem no git sem problema.

### 3.2 Etapa 2 — rascunho do artigo (automático, com IA)

Um modelo de linguagem lê a transcrição e escreve o rascunho: resumo, seções, termos,
perguntas frequentes, assuntos sugeridos e fontes sugeridas. O arquivo sai com
`status: rascunho`. **Rascunho não gera página pública.**

Regra que reduz erro: **cada afirmação do artigo aponta para um minuto do vídeo**
(`[12:40]`). O gerador confere, sem IA, se o trecho citado existe na transcrição. Se não
existir, o build falha. Isso não prova que a afirmação é verdadeira, mas prova que o vídeo
diz aquilo, e impede que a IA invente conteúdo que não está no vídeo.

### 3.3 Etapa 3 — revisão humana (obrigatória para publicar)

O Issei lê o rascunho e muda para `status: publicado`. O gerador **recusa** publicar se:

- alguma fonte está com `verificada: false`;
- algum assunto não existe em `content/temas.yml`;
- alguma âncora de minuto não bate com a transcrição;
- falta campo obrigatório (título, data, resumo, ao menos um assunto).

### 3.4 Etapa 4 — geração do site (automática)

`scripts/gen-videos.mjs` (com `--check`, igual aos outros geradores) produz:

- `src/videos/<slug>.html` — vídeo incorporado, artigo, fontes, assuntos, JSON-LD
  `VideoObject` + `Article`, *canonical*, OG e acessibilidade (legenda, transcrição
  expansível, player com rótulo);
- `public/videos/<slug>.md` — gêmeo Markdown, exigido por `check-md-twins.mjs`;
- `src/temas/<tema>.html` — introdução do assunto (escrita uma vez pelo Issei em
  `temas.yml`), lista dos vídeos publicados, áudio do assunto (se houver);
- `src/videos.html` — índice com filtro por assunto;
- `public/podcast.xml` — feed RSS dos áudios por assunto.

O sitemap continua automático: `vite-plugin-sitemap` lê as entradas do Vite. Basta incluir
`src/videos/*.html` e `src/temas/*.html` no *glob* de `vite.config.js`.

### 3.5 Etapa 5 — inglês (automático, local)

Os HTML e MD gerados entram no `sync-i18n` como qualquer outra página. O Argos traduz só o
que mudou (manifesto por *hash*), sem custo de token. O vídeo continua em português; a
página em inglês declara isso (`inLanguage: pt-BR` no `VideoObject`).

Limite conhecido: o ambiente de nuvem bloqueia o host do Argos, então hoje a tradução roda
na máquina do Issei. Com 178 páginas novas, a primeira tradução é longa (CPU); depois só
entram os vídeos novos.

### 3.6 Etapa 6 — áudio por assunto

O áudio de cada vídeo já existe: é o próprio vídeo. Gerar um áudio por vídeo duplica
conteúdo. A proposta é **um episódio por assunto** (cerca de 10 a 20 episódios):

1. a IA escreve o roteiro a partir dos artigos **publicados** do assunto;
2. o Issei revisa o roteiro (mesma regra: rascunho não publica);
3. o roteiro vira áudio por TTS — Amazon Polly (voz neural pt-BR, o site já está na AWS),
   ou Piper (local, sem custo, qualidade menor), ou gravação do próprio Issei;
4. o MP3 vai para `s3://…/static/podcast/`, fora do git. O deploy já preserva `static/*`.

O roteiro revisado fica no repositório (`content/temas/<tema>.roteiro.md`) e serve também
como transcrição do áudio (acessibilidade).

### 3.7 Automação do ciclo

Um *workflow* semanal do GitHub Actions roda a coleta e o rascunho e **abre um PR** com os
vídeos novos em `status: rascunho`. O Issei revisa no próprio PR, muda o status e faz o
merge. O merge na `main` já publica (deploy atual). Nada vai ao ar sem um merge humano.

## 4. O que é automático e o que exige pessoa

| Item | Automático | Revisão humana |
| :--- | :---: | :--- |
| Metadados, miniatura, data, duração | ✅ | não |
| Transcrição | ✅ | opcional (nomes próprios e termos técnicos) |
| Rascunho do artigo | ✅ | **sim, sempre** |
| Âncoras de minuto conferidas contra a transcrição | ✅ | não |
| **Fontes e referências** | só sugestão | **sim, cada link** — abrir, confirmar que diz o que o artigo afirma, marcar `verificada: true` |
| Links quebrados nas fontes | ✅ (verificação semanal) | corrigir quando quebra |
| Assuntos de cada vídeo | sugestão | confirmar |
| Vocabulário de assuntos e texto de cada página de assunto | não | **sim**, uma vez por assunto |
| Páginas, sitemap, gêmeo MD, JSON-LD | ✅ | não |
| Tradução para inglês | ✅ | não (regra do site: corrige-se o português) |
| Roteiro do áudio | ✅ | **sim** |
| Áudio (TTS) e feed RSS | ✅ | ouvir antes de publicar |

**Por que as fontes não podem ser automáticas:** um modelo de linguagem pode citar um artigo
que não existe, uma URL que não diz o que ele afirma ou um autor errado. O verificador
automático só garante que o link responde. Só uma pessoa garante que a fonte sustenta a
afirmação. Por isso a fonte sugerida pela IA nasce `verificada: false` e bloqueia a
publicação até a revisão.

## 5. Opções e custo de manutenção

Estimativas grosseiras. Os preços de API e TTS mudam: confirmar o valor vigente antes de
decidir.

| Opção | O que entrega | Implantação | Custo por vídeo novo | Custo em dinheiro |
| :--- | :--- | :--- | :--- | :--- |
| **A. Ficha automática** | página com vídeo, descrição, transcrição e assuntos; sem IA | 2 a 3 dias | ~0 min | ~zero |
| **B. Ficha + artigo revisado** *(recomendada)* | A + artigo e fontes revisados, publicados aos poucos | 5 a 7 dias | 15 a 25 min de revisão | baixo: ~1,5 M de tokens para os 178 vídeos |
| **C. CMS externo** (Notion, Sanity etc.) | edição em interface visual | 1 a 2 semanas | 15 a 25 min | mensalidade + integração para manter |
| **D. Publicação 100% automática** | artigo da IA vai direto ao ar | 3 a 4 dias | ~0 min | baixo |

- **A** é segura e barata, mas a página tem pouco texto próprio; o valor para busca é menor.
- **B** reaproveita os padrões do site (gerador + `--check` + gate + Argos). O custo real é o
  **tempo de revisão**: cerca de 45 a 75 horas para o acervo inteiro. Não é preciso fazer
  tudo de uma vez (ver seção 6).
- **C** tira a fonte do repositório, cria uma dependência paga e quebra o padrão
  "repositório como CMS" que o site já usa. Não recomendo.
- **D** publica erro com o nome do Issei. Não recomendo.

O rascunho por IA pode rodar pela API (precisa de chave como segredo do repositório) ou
dentro de uma sessão do Claude Code, sem chave de API. Áudio por assunto: com Polly, poucos
dólares para todos os episódios; com Piper ou gravação própria, sem custo de API.

## 6. Recomendação: opção B em fases

1. **Fase 1 — fundação (A):** coleta, `content/videos/`, gerador, `temas.yml`, índice e
   páginas de assunto. Todos os vídeos ganham ficha. Fichas sem artigo revisado ficam com
   `noindex` e fora do sitemap, para não oferecer ao Google páginas rasas.
2. **Fase 2 — artigos:** rascunho por IA para os 20 vídeos mais vistos; o Issei revisa;
   cada um publicado sai do `noindex`. Depois, um lote por semana no ritmo que o Issei
   escolher.
3. **Fase 3 — áudio:** episódios por assunto para os assuntos com ao menos 5 artigos
   publicados, mais o feed RSS.
4. **Fase 4 — rotina:** *workflow* semanal que abre o PR com os vídeos novos.

Cada fase é um PR separado, com spec no padrão SDD do repositório antes do código.

## 7. Mudanças técnicas que a implantação vai exigir

- `vite.config.js`: incluir `src/videos/*.html`, `src/temas/*.html` e os gêmeos `/en/`
  no *glob*. Hoje ele lê só um nível (`src/*.html`).
- `scripts/i18n/`: confirmar que o tradutor espelha subpastas (`src/videos/` →
  `src/en/videos/`).
- Edge (`infra/cloudfront-functions/viewer-request.js`): `baseDaPagina` já aceita
  caminhos com subpasta; acrescentar um teste para `/videos/<slug>` e `/en/videos/<slug>`.
- `scripts/quality-gate.mjs`: incluir `gen-videos.mjs --check`.
- Testes Playwright: um teste por **modelo** (vídeo, assunto, índice), não por página.
- `.github/workflows/`: segredo da API do YouTube (e, se escolhido, da API do modelo).
- Acessibilidade: o player incorporado precisa de título e alternativa em texto
  (a transcrição), conforme `docs/a11y/A11Y.md`.

## 8. Riscos

| Risco | Mitigação |
| :--- | :--- |
| IA inventa conteúdo ou fonte | âncora de minuto conferida + fonte bloqueia até `verificada: true` |
| Páginas rasas prejudicam a busca | `noindex` até o artigo ser revisado |
| Backlog de revisão desanima | fases e lotes pequenos; a ficha já publica valor sem revisão |
| Gate fica lento com +350 páginas | testes por modelo; tradução incremental por *hash* |
| Vídeo removido ou privado no YouTube | a coleta marca `status: removido`; a página sai do sitemap |
| Áudio no git incha o repositório | MP3 no S3 `static/`, fora do git |
| Menção a marca de terceiro em vídeo antigo | a revisão humana decide o que publicar (o mesmo cuidado já aplicado a outras páginas) |

## 9. Decisões do Issei

| # | Pergunta | Padrão sugerido |
| :--- | :--- | :--- |
| D1 | Qual opção: A, B, C ou D? | **B em fases** |
| D2 | URL: `/videos/<slug>` e `/temas/<tema>`, ou nomes planos (`/video-<slug>`)? A URL é permanente. | `/videos/<slug>` |
| D3 | Publicar a transcrição completa na página? | sim, em bloco expansível (ajuda acessibilidade e busca) |
| D4 | Fichas sem artigo revisado: `noindex` ou indexadas? | `noindex` |
| D5 | Onde roda a IA do rascunho: API (custo por token) ou sessão do Claude Code? | sessão do Claude Code na fase 2; API só se a rotina semanal exigir |
| D6 | Áudio: Polly, Piper ou voz própria? Um episódio por assunto ou também por vídeo? | Polly, por assunto |
| D7 | Lista inicial de assuntos (vocabulário controlado). | a IA propõe a partir das *playlists*; o Issei aprova |
| D8 | Os 20 primeiros vídeos da fase 2: os mais vistos ou os que o Issei escolher? | os mais vistos |
| D9 | Páginas em inglês para os vídeos (o vídeo segue em português)? | sim, com aviso do idioma do vídeo |
| D10 | Credencial da YouTube Data API: o Issei cria o projeto no Google Cloud e o OAuth do canal. | necessário para a fase 1 |
