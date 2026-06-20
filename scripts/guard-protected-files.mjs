#!/usr/bin/env node
/*
 * Hook PreToolUse — protege arquivos gerados/sensíveis de edição pelo agente.
 * Lê o payload do hook em stdin (JSON com tool_input.file_path) e sai com
 * código 2 (bloqueia a chamada e devolve a mensagem ao Claude) quando o
 * caminho casa com um padrão protegido. Caso contrário, sai 0 (permite).
 *
 * Configurado em .claude/settings.json (matcher Write|Edit).
 * Node é usado em vez de shell para ser portável (Windows/macOS/Linux).
 */
import { readFileSync } from 'node:fs';

let raw = '';
try {
  raw = readFileSync(0, 'utf8');
} catch {
  process.exit(0); // sem stdin → não bloqueia
}

let data = {};
try {
  data = JSON.parse(raw || '{}');
} catch {
  process.exit(0);
}

const input = data.tool_input || {};
const filePath = input.file_path || input.path || '';
if (!filePath) process.exit(0);

const norm = String(filePath).replace(/\\/g, '/');

const RULES = [
  {
    re: /(^|\/)package-lock\.json$/,
    msg: 'package-lock.json é gerenciado pelo npm. Rode `npm install` em vez de editá-lo à mão.',
  },
  {
    re: /(^|\/)dist\//,
    msg: 'dist/ é saída de build (vite build). Edite a fonte em src/, não o artefato gerado.',
  },
  {
    re: /(^|\/)\.env(\.[^/]*)?$/,
    msg: '.env contém segredos/credenciais — não deve ser editado pelo agente.',
  },
];

for (const rule of RULES) {
  if (rule.re.test(norm)) {
    console.error(`[guard] Edição bloqueada: ${filePath}\n${rule.msg}`);
    process.exit(2); // 2 = bloqueia a ferramenta e mostra stderr ao Claude
  }
}

process.exit(0);
