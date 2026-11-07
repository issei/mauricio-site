#!/usr/bin/env node
/*
 * Coleta do canal do YouTube → content/videos/<id>.md (+ .transcricao.vtt).
 * Spec: docs/specs/pages/videos-youtube/SDD-fase-1.md §3 e §5.
 *
 * REGRA DE POSSE (§3): esta coleta só reescreve o bloco `youtube:` e cria
 * arquivos novos. `slug`, `status`, `temas`, qualquer outro campo e o corpo são
 * da pessoa e nunca são tocados depois de criados — a coleta pode rodar quantas
 * vezes for preciso sem apagar revisão humana. A única exceção é `status:
 * removido`, que a coleta grava quando o vídeo some do canal (e desfaz, de
 * volta para `ficha`, se ele reaparecer).
 *
 * COTA (§5): a listagem do canal custa poucas unidades; cada legenda custa
 * ~250 (captions.list + captions.download). Por isso no máximo
 * --max-legendas (padrão 35) por execução, dos vídeos mais vistos para os
 * menos vistos (D8), retomando de onde parou na execução seguinte.
 *
 * Credenciais (ambiente ou .env.local na raiz; o ambiente vence):
 *   YOUTUBE_API_KEY, YOUTUBE_CHANNEL_ID                        listagem
 *   YOUTUBE_OAUTH_CLIENT_ID, _CLIENT_SECRET, _REFRESH_TOKEN    legendas (opcional)
 *
 * Uso: node scripts/videos/ingest.mjs [--max-legendas N] [--sem-legendas]
 */
import { readFileSync, writeFileSync, existsSync, readdirSync, mkdirSync, appendFileSync } from 'node:fs';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { stringify as toYaml } from 'yaml';
import { parseFrontmatter, slugify } from '../gen-videos.mjs';
import { parseEnv } from './auth.mjs';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..');
const DIR = join(ROOT, 'content', 'videos');
const API = 'https://www.googleapis.com/youtube/v3';

class CotaEsgotada extends Error {}

function env() {
  const arquivo = join(ROOT, '.env.local');
  const local = existsSync(arquivo) ? parseEnv(readFileSync(arquivo, 'utf8')) : {};
  // Segredo colado com espaço, quebra de linha ou aspas vira "API key not valid" no Google.
  const limpa = (v) => (v ?? '').trim().replace(/^(['"])(.*)\1$/, '$2').trim();
  return (k) => limpa(process.env[k]) || limpa(local[k]) || undefined;
}

async function api(caminho, params, { token, chave, texto = false } = {}) {
  const url = `${API}/${caminho}?${new URLSearchParams({ ...params, ...(chave && { key: chave }) })}`;
  const r = await fetch(url, { headers: token ? { Authorization: `Bearer ${token}` } : {} });
  if (!r.ok) {
    const corpo = await r.text();
    if (r.status === 403 && /quotaExceeded|dailyLimitExceeded/.test(corpo)) throw new CotaEsgotada('cota diária da API esgotada');
    throw new Error(`${caminho}: HTTP ${r.status} ${corpo.slice(0, 300)}`);
  }
  return texto ? r.text() : r.json();
}

/** Todas as páginas de uma listagem paginada da API. */
async function todas(caminho, params, opts) {
  const itens = [];
  let pageToken;
  do {
    const r = await api(caminho, { ...params, maxResults: 50, ...(pageToken && { pageToken }) }, opts);
    itens.push(...(r.items ?? []));
    pageToken = r.nextPageToken;
  } while (pageToken);
  return itens;
}

async function tokenDeAcesso(get) {
  const [id, segredo, refresh] = ['YOUTUBE_OAUTH_CLIENT_ID', 'YOUTUBE_OAUTH_CLIENT_SECRET', 'YOUTUBE_OAUTH_REFRESH_TOKEN'].map(get);
  if (!id || !segredo || !refresh) return null;
  const r = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ client_id: id, client_secret: segredo, refresh_token: refresh, grant_type: 'refresh_token' }),
  });
  const d = await r.json();
  if (!r.ok) throw new Error(`OAuth: ${d.error} ${d.error_description ?? ''} — rode de novo npm run videos:auth`);
  return d.access_token;
}

/** Metadados públicos de todos os vídeos do canal + as playlists de cada um. */
async function coletaCanal(chave, canal) {
  const [c] = (await api('channels', { part: 'contentDetails', id: canal }, { chave })).items ?? [];
  if (!c) throw new Error(`canal ${canal} não encontrado`);
  const ids = (await todas('playlistItems', { part: 'contentDetails', playlistId: c.contentDetails.relatedPlaylists.uploads }, { chave }))
    .map((i) => i.contentDetails.videoId);
  const videos = [];
  for (let i = 0; i < ids.length; i += 50) {
    const r = await api('videos', { part: 'snippet,contentDetails,statistics', id: ids.slice(i, i + 50).join(',') }, { chave });
    videos.push(...r.items);
  }
  const playlists = new Map();
  for (const p of await todas('playlists', { part: 'snippet', channelId: canal }, { chave })) {
    for (const item of await todas('playlistItems', { part: 'contentDetails', playlistId: p.id }, { chave })) {
      const vid = item.contentDetails.videoId;
      playlists.set(vid, [...(playlists.get(vid) ?? []), p.snippet.title]);
    }
  }
  return { videos, playlists };
}

const thumb = (t) => (t.maxres ?? t.standard ?? t.high ?? t.medium ?? t.default)?.url;
const links = (texto) => [...new Set(String(texto ?? '').match(/https?:\/\/[^\s<>"']+[^\s<>"'.,;:!?)\]]/g) ?? [])];

/** Bloco `youtube:` — o ÚNICO que a coleta reescreve. */
function blocoYoutube(v, playlists, anterior = {}, agora) {
  const s = v.snippet;
  return {
    titulo: s.title,
    publicado_em: s.publishedAt.slice(0, 10),
    duracao: v.contentDetails.duration,
    descricao: s.description ?? '',
    miniatura: thumb(s.thumbnails ?? {}) ?? `https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`,
    visualizacoes: Number(v.statistics?.viewCount ?? 0),
    playlists: playlists.get(v.id) ?? [],
    legenda: anterior.legenda ?? 'pendente',
    links_descricao: links(s.description),
    coletado_em: agora,
  };
}

/*
 * Visualizações mudam todo dia. Se só elas (e a data da coleta) mudaram, o bloco
 * anterior fica como está: uma coleta diária não pode virar um PR diário de ruído.
 */
const RUIDO = ['visualizacoes', 'coletado_em'];
function semRuido(anterior, novo) {
  if (!anterior) return novo;
  const sem = (b) => JSON.stringify(Object.fromEntries(Object.entries(b).filter(([k]) => !RUIDO.includes(k))));
  return sem(anterior) === sem(novo) ? anterior : novo;
}

const ORDEM_PESSOA = ['id', 'slug', 'status', 'temas'];
function serializa(data, body) {
  const ordenado = {};
  for (const k of ORDEM_PESSOA) if (k in data) ordenado[k] = data[k];
  for (const k of Object.keys(data)) if (!(k in ordenado) && k !== 'youtube') ordenado[k] = data[k];
  ordenado.youtube = data.youtube;
  return `---\n${toYaml(ordenado, { lineWidth: 0 })}---\n${body ? `\n${body}\n` : ''}`;
}

/** Une o que veio do canal ao que já está em content/. Puro: devolve { arquivo: texto }. */
export function mescla(existentes, canal, agora) {
  const out = {};
  const porId = new Map(existentes.map((e) => [e.data.id, e]));
  const slugsUsados = new Set(existentes.map((e) => e.data.slug));
  const vistos = new Set();
  for (const v of canal.videos) {
    vistos.add(v.id);
    const e = porId.get(v.id);
    if (e) {
      const data = { ...e.data, youtube: semRuido(e.data.youtube, blocoYoutube(v, canal.playlists, e.data.youtube, agora)) };
      if (data.status === 'removido') data.status = 'ficha';
      out[`${v.id}.md`] = serializa(data, e.body);
      continue;
    }
    let slug = slugify(v.snippet.title) || v.id.toLowerCase().replace(/[^a-z0-9]/g, '');
    for (let n = 2; slugsUsados.has(slug); n++) slug = `${slugify(v.snippet.title).slice(0, 56)}-${n}`;
    slugsUsados.add(slug);
    out[`${v.id}.md`] = serializa({ id: v.id, slug, status: 'ficha', temas: [], youtube: blocoYoutube(v, canal.playlists, {}, agora) }, '');
  }
  for (const e of existentes) {
    if (vistos.has(e.data.id) || e.data.status === 'removido') continue;
    out[`${e.data.id}.md`] = serializa({ ...e.data, status: 'removido' }, e.body);
  }
  return out;
}

/** Baixa a legenda pt de um vídeo do próprio canal. null = não há legenda. */
async function legenda(videoId, token) {
  const { items = [] } = await api('captions', { part: 'snippet', videoId }, { token });
  const pt = items.filter((c) => /^pt/i.test(c.snippet.language));
  const escolhida = pt.find((c) => c.snippet.trackKind !== 'asr') ?? pt[0] ?? items.find((c) => c.snippet.trackKind !== 'asr');
  if (!escolhida) return null;
  const vtt = await api(`captions/${escolhida.id}`, { tfmt: 'vtt' }, { token, texto: true });
  return { vtt, tipo: escolhida.snippet.trackKind === 'asr' ? 'automatica' : 'manual' };
}

function lerExistentes() {
  if (!existsSync(DIR)) return [];
  return readdirSync(DIR).filter((f) => f.endsWith('.md')).map((f) => parseFrontmatter(readFileSync(join(DIR, f), 'utf8'), f));
}

async function main() {
  const args = process.argv.slice(2);
  const i = args.indexOf('--max-legendas');
  const maxLegendas = i >= 0 ? Number(args[i + 1]) : 35;
  const get = env();
  const chave = get('YOUTUBE_API_KEY');
  const canal = get('YOUTUBE_CHANNEL_ID');
  if (!chave || !canal) {
    console.error('✗ Faltam YOUTUBE_API_KEY e/ou YOUTUBE_CHANNEL_ID (ambiente ou .env.local).');
    process.exit(2);
  }
  const agora = new Date().toISOString().replace(/\.\d+Z$/, 'Z');
  const resumo = [];

  const dados = await coletaCanal(chave, canal);
  const existentes = lerExistentes();
  const novos = dados.videos.filter((v) => !existentes.some((e) => e.data.id === v.id)).length;
  const arquivos = mescla(existentes, dados, agora);
  mkdirSync(DIR, { recursive: true });
  for (const [f, txt] of Object.entries(arquivos)) writeFileSync(join(DIR, f), txt);
  const removidos = Object.values(arquivos).filter((t) => /^status: removido$/m.test(t)).length;
  resumo.push(`- ${dados.videos.length} vídeos públicos no canal; ${novos} novos; ${removidos} marcados como removidos.`);

  let baixadas = 0, sem = 0, motivoParada = '';
  if (!args.includes('--sem-legendas')) {
    const token = await tokenDeAcesso(get);
    if (!token) motivoParada = 'sem credenciais OAuth: legendas não coletadas';
    else {
      const fila = lerExistentes()
        .filter((e) => e.data.status !== 'removido' && e.data.youtube?.legenda === 'pendente' && !existsSync(join(DIR, `${e.data.id}.transcricao.vtt`)))
        .sort((a, b) => (b.data.youtube.visualizacoes ?? 0) - (a.data.youtube.visualizacoes ?? 0));
      for (const e of fila.slice(0, maxLegendas)) {
        try {
          const l = await legenda(e.data.id, token);
          if (l) writeFileSync(join(DIR, `${e.data.id}.transcricao.vtt`), l.vtt);
          const data = { ...e.data, youtube: { ...e.data.youtube, legenda: l ? l.tipo : 'ausente' } };
          writeFileSync(join(DIR, `${e.data.id}.md`), serializa(data, e.body));
          l ? baixadas++ : sem++;
        } catch (err) {
          if (err instanceof CotaEsgotada) { motivoParada = err.message; break; }
          throw err;
        }
      }
      const restantes = fila.length - baixadas - sem;
      resumo.push(`- Legendas: ${baixadas} baixadas, ${sem} vídeos sem legenda, ${restantes} pendentes para a próxima execução.`);
    }
  }
  if (motivoParada) resumo.push(`- Parou: ${motivoParada}.`);

  const texto = `## Coleta do canal (${agora})\n\n${resumo.join('\n')}\n`;
  console.log(texto);
  if (process.env.GITHUB_STEP_SUMMARY) appendFileSync(process.env.GITHUB_STEP_SUMMARY, texto);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main().catch((e) => { console.error(`✗ coleta: ${e.message}`); process.exit(1); });
}
