---
name: video-artigo
description: Escreve o rascunho do artigo de um vídeo do YouTube a partir da transcrição (content/videos/<id>.md), com âncora de minuto em todo parágrafo e fontes só da descrição do vídeo ou de páginas lidas na sessão. Use ao preparar um lote de artigos da fase 2 (SDD-fase-2 §7). Nunca publica: o status fica rascunho até a revisão do Issei.
---

# video-artigo — rascunho de artigo a partir do vídeo

Fonte de verdade: [`docs/specs/pages/videos-youtube/SDD-fase-2.md`](../../../docs/specs/pages/videos-youtube/SDD-fase-2.md).
O rascunho fica só no arquivo de conteúdo. Enquanto o `status` for `rascunho`,
o site mostra a ficha, igual a antes. Quem publica é o Issei.

## Antes de começar

1. Leia a skill `ptbr-controlado`: o artigo segue o PT-BR controlado.
2. Confira que o vídeo tem transcrição: `youtube.legenda` é `automatica` ou
   `manual`, e existe `content/videos/<id>.transcricao.vtt`. Sem transcrição,
   pule o vídeo e diga isso no PR.

## Para cada vídeo do lote

1. **Leia tudo.** A transcrição inteira (o `.vtt`) e o bloco `youtube:`
   (título, descrição, `links_descricao`, `duracao`). Não escreva a partir do
   título.
2. **Escreva `resumo`.** Duas ou três frases, sem âncora. Aparece no topo da
   página e na meta description.
3. **Escreva o corpo**, abaixo do frontmatter:
   - títulos `##` para as seções e `###` só dentro de "Perguntas frequentes";
   - parágrafos curtos e listas; sem HTML e sem imagens;
   - **todo parágrafo e todo item de lista tem ao menos uma âncora** `[mm:ss]`
     (ou `[h:mm:ss]`), no fim da frase que ela sustenta;
   - a âncora aponta para o momento em que o vídeo diz aquilo. Copie o minuto
     da *cue* do `.vtt`; não estime;
   - seção opcional `## Perguntas frequentes`, com perguntas `###` e respostas
     curtas com âncora. Ela vira `FAQPage` no JSON-LD.
4. **Não acrescente fato que o vídeo não diz.** Contexto de fora do vídeo só
   entra com fonte. Na dúvida, deixe de fora.
5. **Fontes.** Proponha fontes **somente** a partir de `links_descricao` ou de
   páginas que você abriu e leu nesta sessão. Para cada uma:
   ```yaml
   fontes:
     - url: https://...
       titulo: "Título como está na página da fonte"
       sustenta: "Qual afirmação do artigo esta fonte sustenta."
       verificada: false
   ```
   Toda fonte nasce `verificada: false`. **Nunca** marque `true`: só o Issei
   marca, depois de abrir a fonte.
6. **Status.** `status: rascunho`. Não preencha `revisado_por` nem
   `revisado_em`. Confira os `temas` contra `content/temas.yml`.
7. **Confira.** Rode `node scripts/gen-videos.mjs --check` e corrija até não
   sobrar aviso deste vídeo, exceto os que só o Issei resolve (fonte
   `verificada: false`, `revisado_por`, `revisado_em`).

## O que o gerador confere (e o que não confere)

A âncora precisa ter uma *cue* que começa até 30 s antes ou 10 s depois do
minuto citado, e não pode passar do fim do vídeo. Isso garante que o trecho
existe. **Não** garante que o trecho diz o que a frase afirma: releia cada
parágrafo contra o trecho antes de entregar.

## Entrega

Um PR por lote de 5 vídeos (F2-2), com os campos `youtube:` intocados. No corpo
do PR, liste por vídeo: o título, quantas âncoras, quantas fontes e o que ficou
de dúvida para o Issei. Lembre no PR que, ao publicar, o Issei roda
`npm run i18n:sync` na máquina dele antes do merge (o gêmeo `/en/`).

## Não faça

- Não edite o bloco `youtube:` nem o `.vtt`: são da coleta.
- Não mude `status` para `publicado`.
- Não traduza com LLM; o `/en/` sai do Argos, na máquina do Issei.
