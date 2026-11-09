---
name: transcricao-local
description: Extrai a transcrição de um vídeo do YouTube na máquina do Issei, sem usar a cota da API, e grava content/videos/<id>.transcricao.vtt. Primeiro tenta a legenda automática do YouTube com o yt-dlp; se o vídeo não tem legenda, transcreve o áudio com o Whisper do projeto c3po-interpreter-engine. Depois corrige ortografia e nomes com a skill ptbr-controlado, sem mudar os tempos. Use quando houver vídeos com `legenda: pendente` e a cota diária da coleta (~35 legendas) for o gargalo.
---

# transcricao-local — transcrição sem a cota da API

Fonte de verdade do formato: [`docs/specs/pages/videos-youtube/SDD-fase-1.md`](../../../docs/specs/pages/videos-youtube/SDD-fase-1.md).
A coleta do workflow (`scripts/videos/ingest.mjs`) baixa no máximo ~35 legendas por dia.
Esta skill faz o mesmo trabalho localmente, sem a API do YouTube.

Esta skill roda **só na máquina do Issei** (Windows). Ela não roda no CI nem na nuvem.

## Resultado

Para cada vídeo, a skill grava dois itens:

1. o arquivo `content/videos/<id>.transcricao.vtt`;
2. a troca de `legenda: pendente` para `legenda: automatica` no bloco `youtube:` de
   `content/videos/<id>.md`.

Não mude nenhum outro campo do bloco `youtube:`.

O `ingest.mjs` não baixa de novo um vídeo que já tem `.transcricao.vtt`, e preserva o
valor de `legenda`. Por isso a coleta diária não sobrescreve o trabalho desta skill.

O site mostra as duas origens (legenda do YouTube e Whisper) com o mesmo aviso:
"Transcrição automática, não revisada".

## Ferramentas

| Ferramenta | Onde está | Para quê |
| :--- | :--- | :--- |
| `py -3.12` | Python 3.12 do Issei | É o único Python com `torch` e `openai-whisper`. Não use `python`: ele abre o atalho da Microsoft Store. |
| yt-dlp **2026.10.26 ou mais novo** | instalado à parte (passo 1) | Baixa a legenda automática e o áudio. A versão 2026.08.19, que está no Python do Issei, falha com "This video is not available". |
| `node` | PATH | O yt-dlp usa o Node para resolver o desafio JavaScript do YouTube (`--js-runtimes node`). |
| Whisper (`py -3.12 -m whisper`) | Python 3.12 | Transcreve o áudio quando o vídeo não tem legenda. |
| `ffmpeg` | PATH (WinGet) | O Whisper e o yt-dlp usam para ler e converter o áudio. |
| `D:\projetos\c3po-interpreter-engine` | pasta irmã | Projeto de origem do Whisper local. Os scripts `youread.py` e `transcribe_local.py` gravam só `.txt`, sem tempo por trecho. **Não use esses scripts aqui**: o site precisa de `.vtt`. |

Por que `.vtt`: as âncoras `[mm:ss]` dos artigos (skill `video-artigo`) são conferidas
contra o início de cada trecho do `.vtt`. Um `.txt` não tem tempo, então não serve.

## Passo a passo

Rode os comandos no Git Bash, na raiz do repositório.

### 1. Instale o yt-dlp atual numa pasta temporária

Este passo não muda o Python do Issei.

```bash
py -3.12 -m pip install -q --target "$TEMP/ytdlp-new" -U "yt-dlp[default]"
```

Confira a versão. Ela precisa ser 2026.10.26 ou mais nova:

```bash
PYTHONPATH="$TEMP/ytdlp-new" py -3.12 -m yt_dlp --version
```

### 2. Liste os vídeos pendentes

```bash
grep -l "legenda: pendente" content/videos/*.md | xargs -n1 basename | sed 's/\.md$//'
```

Pule os vídeos com `status: removido`.

### 3. Baixe a legenda automática do YouTube (caminho rápido)

Para um vídeo `<id>`:

```bash
PYTHONPATH="$TEMP/ytdlp-new" py -3.12 -m yt_dlp -q --js-runtimes node \
  --skip-download --write-auto-subs --sub-langs pt-orig --sub-format vtt \
  -o "content/videos/%(id)s" -- "https://www.youtube.com/watch?v=<id>"
```

Se o comando gravou `content/videos/<id>.pt-orig.vtt`, renomeie o arquivo:

```bash
mv -- "content/videos/<id>.pt-orig.vtt" "content/videos/<id>.transcricao.vtt"
```

Depois, vá para o passo 5.

Regras deste passo:

- Peça só `pt-orig`. É a legenda automática original em português. Outras línguas são
  traduções automáticas e o YouTube responde `HTTP Error 429` para elas.
- Se o YouTube responder `429` mesmo assim, espere alguns minutos. Num lote, espere
  ao menos 10 segundos entre um vídeo e o próximo (`sleep 10`).
- Para saber se o vídeo tem legenda **manual**, rode o comando com `--list-subs`. Se tiver,
  baixe com `--write-subs --sub-langs pt` e grave `legenda: manual` no passo 5.

### 4. Sem legenda no YouTube: transcreva com o Whisper (caminho lento)

Use este passo só quando o passo 3 não gravou nenhum `.vtt`.

Baixe o áudio para uma pasta temporária:

```bash
PYTHONPATH="$TEMP/ytdlp-new" py -3.12 -m yt_dlp -q --js-runtimes node \
  -x --audio-format mp3 -o "$TEMP/c3po-audio/%(id)s.%(ext)s" -- "https://www.youtube.com/watch?v=<id>"
```

Transcreva em `.vtt`:

```bash
py -3.12 -m whisper "$TEMP/c3po-audio/<id>.mp3" --model small --language pt \
  --output_format vtt --output_dir "$TEMP/c3po-audio" --verbose False
```

Mova o resultado e apague o áudio:

```bash
mv -- "$TEMP/c3po-audio/<id>.vtt" "content/videos/<id>.transcricao.vtt"
rm -- "$TEMP/c3po-audio/<id>.mp3"
```

Regras deste passo:

- Sempre informe `--language pt`. Sem esse parâmetro, o Whisper detecta a língua pelos
  primeiros 30 segundos e pode errar.
- A máquina do Issei não tem GPU para o `torch` (CPU apenas). Medido em 2026-11-09:
  o modelo `small` leva cerca de 1 minuto por minuto de áudio. O `medium` é mais preciso
  e cerca de 3 vezes mais lento. Para lotes, use `small`.
- Na primeira execução, o Whisper baixa o modelo (`small` = 461 MB) para o cache local.
- Nunca grave o áudio dentro do repositório.

### 4b. Corrija o texto com a skill `ptbr-controlado`

Faça este passo depois do passo 3 ou do passo 4, e só nos `.vtt` que esta skill
gravou nesta sessão.

1. Leia a skill `ptbr-controlado`. Use o modo **Revisão** com **intervenção mínima**.
2. Trate a transcrição como **citação** da fala do Issei (regra B0.03). Corrija só:
   - ortografia e acentuação (exemplo: "amadilha" → "armadilha");
   - nomes próprios, nomes de produto e termos técnicos que o reconhecimento de fala
     escreveu errado. Confira o nome no título ou na descrição do vídeo (bloco `youtube:`);
   - pontuação que muda a leitura da frase.
3. Não reescreva a fala. Não aplique as regras B1, B4, B6 nem B7 (ordem direta,
   estrutura, requisitos, voz editorial): elas mudariam o que o Issei disse.
   Não corte repetições, hesitações nem gírias.
4. Na dúvida sobre o que o vídeo diz, deixe o trecho como está. Não adivinhe.
5. Edite só as linhas de texto. Não mude as linhas de tempo (`-->`), a ordem das *cues*
   nem as tags `<00:00:01.160><c>` da legenda do YouTube. As âncoras `[mm:ss]` dependem
   desses tempos.
6. Na legenda do YouTube, a mesma frase aparece em duas *cues* seguidas. Aplique a mesma
   correção nas duas: o `parseVtt` junta as duas pelo começo do texto, e uma correção
   diferente faz a frase aparecer duplicada na página.

Confira que nenhum tempo mudou. Guarde uma cópia antes de corrigir
(`cp <arquivo> "$TEMP/<id>.antes.vtt"`) e compare depois. O comando abaixo não pode
mostrar diferença:

```bash
diff <(grep -- '-->' "$TEMP/<id>.antes.vtt") <(grep -- '-->' "content/videos/<id>.transcricao.vtt")
```

Mesmo corrigida, a transcrição continua com `legenda: automatica` e o aviso "não
revisada": a correção é de um modelo de linguagem, e não do Issei.

Custo: a legenda do YouTube de um vídeo de 9 minutos tem cerca de 77 KB por causa das
tags de tempo por palavra. Corrija em lotes pequenos (5 vídeos), como na skill
`video-artigo`.

### 5. Atualize o `.md` do vídeo

No bloco `youtube:` de `content/videos/<id>.md`, troque `legenda: pendente` por
`legenda: automatica` (ou `manual`, se veio de uma legenda manual no passo 3).

```bash
sed -i 's/^  legenda: pendente$/  legenda: automatica/' "content/videos/<id>.md"
```

### 6. Gere as páginas e confira

```bash
node scripts/gen-videos.mjs
node scripts/gen-videos.mjs --check
```

Se `node_modules` não existe (worktree novo), rode `npm ci` antes.

O gerador lê o `.vtt` com `parseVtt` em `scripts/gen-videos.mjs`. Os dois formatos
(legenda do YouTube e Whisper) foram conferidos com esse parser em 2026-11-09.

### 7. Entregue como PR

- Use um branch próprio. Não use `videos/coleta`: esse branch é do workflow.
- Commit sugerido: `chore(videos): transcrições locais de <n> vídeos`.
- No corpo do PR, liste os vídeos e a origem de cada transcrição: "legenda do YouTube"
  ou "Whisper small", e se o texto passou pela correção do passo 4b.
- O merge na `main` publica o site. Quem faz o merge é o Issei.

## Não faça

- Não edite um `.vtt` que já existia antes desta sessão: ele veio da coleta.
- Não use LLM para transcrever. O LLM só corrige o texto, no passo 4b, e com as regras
  desse passo.
- Não mude `status` do vídeo. Esta skill só cuida da transcrição.
- Não instale nem atualize pacotes no Python do Issei sem pedir. O passo 1 usa uma pasta
  temporária por esse motivo.
