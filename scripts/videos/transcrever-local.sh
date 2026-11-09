#!/usr/bin/env bash
# Transcrição local no tempo ocioso do notebook (skill transcricao-local, etapas 1, 2 e 4).
# Sem modelo de linguagem. Só grava commits locais: não faz push e não abre PR.
#
# Fila = vídeos com `legenda: pendente`, sem .transcricao.vtt aqui e sem .vtt no branch
# videos/coleta (o workflow já baixou). Ordem: do MENOS visto para o mais visto, o
# inverso do workflow, para os dois não pegarem o mesmo vídeo.
#
# Uso (Git Bash, num worktree próprio — nunca na cópia de trabalho do Issei):
#   MAX=40 WHISPER=1 scripts/videos/transcrever-local.sh
#   MAX    = máximo de vídeos na etapa 1 (legenda do YouTube) nesta execução
#   WHISPER= máximo de vídeos sem legenda transcritos com o Whisper nesta execução
set -u
cd "$(dirname "$0")/../.."
MAX=${MAX:-40}; WHISPER=${WHISPER:-1}
BASE="${LOCALAPPDATA:-$HOME}/transcricao-local"; LOG="$BASE/log.txt"
YT="$BASE/ytdlp"; TMP="$BASE/tmp"; mkdir -p "$TMP"
log() { echo "$(date '+%F %T') $*" | tee -a "$LOG"; }
ytdlp() { PYTHONPATH="$YT" py -3.12 -m yt_dlp -q --no-warnings --js-runtimes node "$@"; }

marcar() { # $1 = id, $2 = .vtt em $TMP, $3 = origem: grava, troca a legenda e faz o commit
  mv -- "$2" "content/videos/$1.transcricao.vtt"
  sed -i 's/^  legenda: pendente$/  legenda: automatica/' "content/videos/$1.md"
  git add -- "content/videos/$1.transcricao.vtt" "content/videos/$1.md"
  git commit -q -m "chore(videos): transcrição local de $1 ($3)"
  log "ok $1 ($3)"
}

git fetch -q origin main videos/coleta || { log "sem rede"; exit 0; }
git merge -q --no-edit origin/main || { git merge --abort; log "conflito com a main; parei"; exit 1; }
py -3.12 -m pip install -q --target "$YT" -U "yt-dlp[default]" >/dev/null 2>&1
log "início: yt-dlp $(ytdlp --version), MAX=$MAX, WHISPER=$WHISPER"

na_coleta=$(git ls-tree --name-only origin/videos/coleta content/videos/ | sed -n 's#content/videos/\(.*\)\.transcricao\.vtt#\1#p')
fila=$(for f in content/videos/*.md; do
  grep -q '^  legenda: pendente$' "$f" || continue
  grep -q '^status: removido' "$f" && continue
  id=$(basename "$f" .md)
  [ -e "content/videos/$id.transcricao.vtt" ] && continue
  grep -qxF -- "$id" <<<"$na_coleta" && continue
  echo "$(sed -n 's/^  visualizacoes: //p' "$f") $id"
done | sort -n | cut -d' ' -f2)

feitos=0; sem_legenda=()
for id in $fila; do
  [ "$feitos" -ge "$MAX" ] && break
  rm -f "$TMP"/*
  saida=$(ytdlp --skip-download --write-auto-subs --sub-langs pt-orig --sub-format vtt \
    -o "$TMP/$id" -- "https://www.youtube.com/watch?v=$id" 2>&1)
  if grep -q '429' <<<"$saida"; then log "YouTube respondeu 429; parei"; break; fi
  if [ -s "$TMP/$id.pt-orig.vtt" ]; then marcar "$id" "$TMP/$id.pt-orig.vtt" "legenda do YouTube"
  elif [ -n "$saida" ]; then log "erro $id: $(tail -1 <<<"$saida")"
  else sem_legenda+=("$id"); log "sem legenda $id"; fi
  feitos=$((feitos + 1)); sleep 10
done

for id in "${sem_legenda[@]:0:$WHISPER}"; do
  rm -f "$TMP"/*
  ytdlp -x --audio-format mp3 -o "$TMP/$id.%(ext)s" -- "https://www.youtube.com/watch?v=$id" \
    || { log "erro no áudio de $id"; continue; }
  if py -3.12 -m whisper "$TMP/$id.mp3" --model small --language pt --output_format vtt \
    --output_dir "$TMP" --verbose False >/dev/null 2>&1 && [ -s "$TMP/$id.vtt" ]; then
    marcar "$id" "$TMP/$id.vtt" "Whisper small"
  else log "erro no Whisper de $id"; fi
done
rm -f "$TMP"/*

if [ -n "$(git log origin/main..HEAD --format=%h -- content/videos)" ] && [ -d node_modules ]; then
  node scripts/gen-videos.mjs >/dev/null && git add -A content src public scripts/videos/sitemap-exclude.json \
    && { git diff --cached --quiet || git commit -q -m "chore(videos): regenera as páginas"; }
fi
log "fim: $(git log origin/main..HEAD --oneline -- 'content/videos/*.vtt' | wc -l) commits de transcrição no branch"
