# SDD — Vídeos do YouTube, fase 2 (artigos)

> **Status:** código no PR 2A (regras, modelo, skill e testes); artigos nos PRs 2B a 2E. **Data:** 2026-11-08.
> **Origem:** [PROPOSTA-arquitetura.md](PROPOSTA-arquitetura.md) §3.2, §3.3 e §6, decisões D3, D5, D8 e D9.
> **Depende de:** [SDD-fase-1.md](SDD-fase-1.md), no ar desde 2026-11-07 (PRs #135 a #141).

## 1. Objetivo

Um vídeo ganha um **artigo** escrito a partir da transcrição. O artigo só vai ao ar depois
da revisão do Issei. Quando o artigo é publicado, a ficha deixa de ser `noindex` e entra
no sitemap.

**Entra na fase 2:**

- campos do artigo no arquivo de conteúdo (§3);
- âncora de minuto conferida contra a transcrição, sem IA (§4);
- regras para publicar (§5);
- modelo da página publicada (§6);
- skill `video-artigo` para o rascunho numa sessão do Claude Code (D5) (§7);
- os 20 vídeos mais vistos, em lotes de 5 (D8) (§9).

**Fica fora:** áudio e RSS (fase 3), rotina semanal (fase 4), revisão da transcrição.

## 2. Ciclo de um artigo

| Etapa | Quem | `status` | Página |
| :--- | :--- | :--- | :--- |
| 1. Coleta e legenda | workflow | `ficha` | ficha `noindex`, sem artigo |
| 2. Rascunho | Claude, numa sessão do Claude Code | `rascunho` | **igual à ficha**: o rascunho não aparece no site |
| 3. Revisão | Issei, no PR do lote | `rascunho` | igual à ficha |
| 4. Publicação | Issei muda para `publicado` e faz o merge | `publicado` | artigo, indexada, no sitemap, com gêmeo `/en/` |

O rascunho fica só no arquivo de conteúdo. Assim um rascunho errado nunca vai ao ar, nem
com `noindex`.

## 3. Fonte: campos do artigo em `content/videos/<id>.md`

Os campos novos são da pessoa (regra de posse do SDD-fase-1 §3): o ingest não toca neles.

```yaml
---
id: dQw4w9WgXcQ
slug: como-ancorar-agentes-no-repositorio
status: rascunho
temas: [engenharia-agentica]
resumo: "Duas ou três frases. Aparece no topo e na meta description."
fontes:
  - url: https://example.com/artigo
    titulo: "Título da fonte, como está na página dela"
    sustenta: "Qual afirmação do artigo esta fonte sustenta."
    verificada: false        # só o Issei muda para true
revisado_por: ""             # preenchido pelo Issei ao publicar
revisado_em: ""              # AAAA-MM-DD
youtube: { … }               # bloco da coleta, sem mudança
---
## Primeira seção

Parágrafo do artigo. Toda afirmação tirada do vídeo termina com a âncora do minuto [04:12].

## Perguntas frequentes

### Pergunta?

Resposta curta [11:03].
```

O corpo é Markdown com títulos `##` e `###`, parágrafos e listas. Sem HTML, sem imagens na
fase 2.

## 4. Âncora de minuto

Formato: `[mm:ss]` ou `[h:mm:ss]`, no fim da frase ou do parágrafo.

**Regra (conferida pelo gerador, sem IA):**

1. Uma *cue* da transcrição (`<id>.transcricao.vtt`) precisa começar entre 30 segundos antes
   e 10 segundos depois do minuto citado. As *cues* automáticas duram de 2 a 8 segundos, então
   "dentro da *cue*" seria rígido demais para quem copia o minuto de um trecho.
2. Todo parágrafo e todo item de lista do corpo tem ao menos uma âncora. Títulos não precisam.
3. Âncora depois do fim do vídeo é erro.

**O que isso garante:** a afirmação aponta para um trecho que existe no vídeo, e o leitor
confere com um clique. **O que não garante:** que o trecho diz o que a frase afirma, nem que
a afirmação é verdadeira. Isso fica com a revisão do Issei (§5).

Na página, a âncora vira um link para o player da própria página, que começa naquele minuto
(fachada: carrega o `iframe` só no clique, com `start=`). Sem JS, o link aponta para o vídeo
no YouTube com `t=`.

## 5. Regras para publicar

O gerador **falha** se um vídeo com `status: publicado`:

- não tem `resumo`, corpo ou ao menos um tema;
- não tem transcrição (`legenda` é `pendente` ou `ausente`);
- tem âncora fora da regra do §4;
- tem fonte com `verificada: false`, ou fonte sem `url`, `titulo` ou `sustenta`;
- não tem `revisado_por` e `revisado_em`.

Para `rascunho`, as mesmas regras viram **aviso**, para o Claude e o Issei verem o que falta.
Isso libera `publicado`, que a fase 1 proibia (`STATUS_PERMITIDOS_FASE_1`).

**O que o Issei faz na revisão, por artigo:**

1. ler o artigo e corrigir o que não é o que ele quis dizer;
2. abrir cada fonte, confirmar que ela diz o que o campo `sustenta` afirma e só então marcar
   `verificada: true` (ou apagar a fonte);
3. confirmar os temas;
4. preencher `revisado_por` e `revisado_em` e mudar para `status: publicado`.

## 6. Página publicada

Mesmo modelo da ficha (SDD-fase-1 §6), com estas mudanças:

1. `resumo` logo abaixo do título;
2. o artigo entre o player e a descrição, com índice das seções quando houver 3 ou mais;
3. bloco **Fontes**: título, link e o que a fonte sustenta;
4. linha "Revisado por <nome> em <data>";
5. `robots: index, follow`, fora de `sitemap-exclude.json`;
6. JSON-LD `Article` (`headline`, `description`, `datePublished` = `revisado_em`,
   `author`, `citation` com as fontes) junto do `VideoObject`; `FAQPage` quando houver a
   seção "Perguntas frequentes";
7. a transcrição continua em `<details>`, com o aviso de transcrição automática (D3);
8. aviso "O vídeo e a transcrição estão em português", que o Argos traduz no gêmeo `/en/`.

**Análise (F2-3):** todas as páginas geradas (ficha, artigo, assunto e índice) carregam o
mesmo bloco das outras páginas do site: Consent Mode v2 com padrão `denied` antes do
`gtag.js` (GA4 `G-GEKLHZYVYX`) e o banner `/js/cookie-consent.js`. Nada é gravado antes
do aceite (`tests/consent.antes-do-aceite.spec.js` cobre `/videos.html` e uma página de
assunto).

**Gêmeo `/en/` (D9):** só a página publicada entra no `sync-i18n`
(`scripts/i18n/assets.py`, `video_assets()`, lê `src/videos/<slug>.html` com
`robots: index, follow` e o `.md` gêmeo; o `vite.config.js` constrói `src/en/videos/` e põe o
`hreflang` de volta na página em português). A
página em inglês avisa no topo: "The video is in Portuguese." A tradução roda na máquina
do Issei (o Argos não roda na nuvem), então todo lote publicado tem um passo local antes
do merge.

**Risco conhecido:** a coleta diária pode mudar o título ou a descrição de um vídeo
publicado. A página em português muda e o gêmeo `/en/` fica velho, então o gate do PR da
coleta falha até o Issei rodar `npm run i18n:sync`. É o comportamento que o gate já tem
para as outras páginas.

## 7. Rascunho: skill `video-artigo`

`.claude/skills/video-artigo/SKILL.md`, usada numa sessão do Claude Code (D5, sem custo de
API). Para cada vídeo do lote:

1. ler a transcrição inteira e o bloco `youtube:` (título, descrição, links da descrição);
2. escrever `resumo` e o corpo, em PT-BR controlado (skill `ptbr-controlado`), com âncora em
   toda afirmação tirada do vídeo;
3. não acrescentar fato que o vídeo não diz. Contexto de fora do vídeo só entra com fonte;
4. propor fontes **somente** a partir dos links da descrição do vídeo ou de páginas que a
   sessão abriu e leu. Toda fonte nasce `verificada: false`;
5. marcar `status: rascunho` e rodar `node scripts/gen-videos.mjs --check` até ficar sem aviso.

## 8. Testes

- `tests/videos.gen.test.mjs`: cada regra do §4 e do §5 com um caso que falha e um que passa;
  rascunho gera aviso, não erro; rascunho não muda a página.
- `tests/fixtures/videos/`: um vídeo `publicado` com artigo, fontes verificadas e âncoras válidas.
- `tests/videos.spec.js`: modelo da página publicada (âncora carrega o player no minuto certo;
  sem JS o link vai para o YouTube; `robots` sem `noindex`; axe sem violações novas).
- `tests/videos.ingest.test.mjs`: a coleta não toca `resumo`, `fontes`, `revisado_*` nem corpo.

## 9. Entrega em PRs

1. **PR 2A (código):** regras do §4 e §5, modelo do §6, `assets.py`, skill do §7 e testes.
   Sem artigo real, então não muda o site no ar.
2. **PR 2B, 2C, 2D, 2E (conteúdo):** 5 rascunhos por PR, dos 20 vídeos mais vistos com
   transcrição. O Issei revisa no PR, publica os que aprovar, roda o `i18n:sync` e faz o merge.
   Rascunho que ele não revisar pode entrar no merge como `rascunho`: não aparece no site.

## 10. Decisões do Issei

Aprovadas pelo Issei em 2026-11-08, todas no padrão sugerido.

| # | Pergunta | Padrão sugerido |
| :--- | :--- | :--- |
| F2-1 | Âncora obrigatória em todo parágrafo, ou só nas afirmações? | todo parágrafo: é a única regra que a máquina consegue conferir |
| F2-2 | Lotes de 5 artigos por PR, ou outro tamanho? | 5 |
| F2-3 | Páginas de vídeo e de assunto carregam o GTM (com o banner de cookies)? | sim, a partir da primeira página publicada, para medir se os artigos trazem visita |
