#!/usr/bin/env node
/*
 * Autorização OAuth do canal — roda UMA vez, na máquina do Issei.
 * Spec: docs/specs/pages/videos-youtube/SDD-fase-1.md §5.
 *
 * Por que existe: baixar legenda pela YouTube Data API exige o consentimento
 * do DONO do canal (escopo youtube.force-ssl). A chave de API não basta. Este
 * comando faz o fluxo de "app para computador" com loopback em 127.0.0.1 e
 * PKCE, e mostra o refresh token para ser salvo como segredo
 * YOUTUBE_OAUTH_REFRESH_TOKEN no GitHub e no .env.local.
 *
 * O token NUNCA é gravado em disco por este script: quem decide onde ele mora
 * é a pessoa. Um token impresso some com o terminal; um token gravado num
 * arquivo esquecido vira vazamento no próximo commit.
 *
 * Lê YOUTUBE_OAUTH_CLIENT_ID e YOUTUBE_OAUTH_CLIENT_SECRET do ambiente ou do
 * .env.local na raiz do repositório (o ambiente vence).
 *
 * Uso: npm run videos:auth
 */
import { readFileSync, existsSync } from 'node:fs';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createServer } from 'node:http';
import { randomBytes, createHash } from 'node:crypto';
import { spawn } from 'node:child_process';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..');
const SCOPE = 'https://www.googleapis.com/auth/youtube.force-ssl';
const AUTH_URL = 'https://accounts.google.com/o/oauth2/v2/auth';
const TOKEN_URL = 'https://oauth2.googleapis.com/token';
const PRAZO_MS = 5 * 60 * 1000;

/** Lê KEY=VALOR de .env.local sem dependência; aspas simples ou duplas opcionais. */
export function parseEnv(texto) {
  const env = {};
  for (const linha of texto.split(/\r?\n/)) {
    const m = linha.match(/^\s*(?:export\s+)?([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*?)\s*$/);
    if (!m || linha.trimStart().startsWith('#')) continue;
    env[m[1]] = m[2].replace(/^(['"])(.*)\1$/, '$2');
  }
  return env;
}

function credenciais() {
  const arquivo = join(ROOT, '.env.local');
  const local = existsSync(arquivo) ? parseEnv(readFileSync(arquivo, 'utf8')) : {};
  const pega = (k) => process.env[k] || local[k];
  const clientId = pega('YOUTUBE_OAUTH_CLIENT_ID');
  const clientSecret = pega('YOUTUBE_OAUTH_CLIENT_SECRET');
  if (!clientId || !clientSecret) {
    console.error('✗ Faltam YOUTUBE_OAUTH_CLIENT_ID e/ou YOUTUBE_OAUTH_CLIENT_SECRET (ambiente ou .env.local).');
    process.exit(2);
  }
  return { clientId, clientSecret };
}

const b64url = (buf) => buf.toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

/** Abre o navegador padrão; se falhar, a URL impressa basta. */
function abreNavegador(url) {
  const [cmd, args] =
    process.platform === 'win32' ? ['rundll32', ['url.dll,FileProtocolHandler', url]]
    : process.platform === 'darwin' ? ['open', [url]]
    : ['xdg-open', [url]];
  try {
    spawn(cmd, args, { stdio: 'ignore', detached: true }).on('error', () => {}).unref();
  } catch { /* sem navegador: a pessoa copia a URL */ }
}

async function main() {
  const { clientId, clientSecret } = credenciais();
  const verifier = b64url(randomBytes(32));
  const challenge = b64url(createHash('sha256').update(verifier).digest());
  const state = b64url(randomBytes(16));

  const server = createServer();
  await new Promise((ok) => server.listen(0, '127.0.0.1', ok));
  const redirectUri = `http://127.0.0.1:${server.address().port}`;

  const url = `${AUTH_URL}?${new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: 'code',
    scope: SCOPE,
    access_type: 'offline', // sem isto não vem refresh token
    prompt: 'consent',      // força um refresh token novo mesmo se já autorizou antes
    code_challenge: challenge,
    code_challenge_method: 'S256',
    state,
  })}`;

  console.log('\nAbra esta URL no navegador (tentando abrir sozinho):\n');
  console.log(url + '\n');
  console.log('Entre com a conta do canal. Se o canal for uma conta de marca, escolha o canal.');
  console.log('O aviso "app não verificado" é esperado: clique em Avançado → Acessar.\n');
  abreNavegador(url);

  const code = await new Promise((ok, falha) => {
    const timer = setTimeout(() => falha(new Error('tempo esgotado (5 min) sem autorização')), PRAZO_MS);
    server.on('request', (req, res) => {
      const q = new URL(req.url, redirectUri).searchParams;
      if (!q.has('code') && !q.has('error')) { res.writeHead(404).end(); return; }
      const erro = q.get('error') || (q.get('state') !== state ? 'state não confere' : null);
      res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end(erro ? `Falhou: ${erro}. Volte ao terminal.` : 'Autorizado. Pode fechar esta aba e voltar ao terminal.');
      clearTimeout(timer);
      erro ? falha(new Error(erro)) : ok(q.get('code'));
    });
  }).finally(() => server.close());

  const resp = await fetch(TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      code,
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: redirectUri,
      grant_type: 'authorization_code',
      code_verifier: verifier,
    }),
  });
  const dados = await resp.json();
  if (!resp.ok || !dados.refresh_token) {
    console.error(`✗ O Google não devolveu refresh token: ${dados.error || resp.status} ${dados.error_description || ''}`);
    process.exit(1);
  }

  console.log('✓ Autorizado. Refresh token (aparece só agora; não é gravado em disco):\n');
  console.log(dados.refresh_token + '\n');
  console.log('Salve como YOUTUBE_OAUTH_REFRESH_TOKEN no GitHub (Secrets) e no .env.local.');
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main().catch((e) => { console.error(`✗ ${e.message}`); process.exit(1); });
}
