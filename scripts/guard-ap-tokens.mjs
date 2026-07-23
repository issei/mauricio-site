#!/usr/bin/env node
/*
 * Hook PostToolUse — trava arquitetural do ADR-ap-001.
 *
 * A regra "só src/apresentacao.css declara cor" não deve depender da disciplina
 * do agente: aqui ela é aplicada mecanicamente. Qualquer hexadecimal escrito em
 * src/apresentacao.html ou src/js/apresentacao/** bloqueia a ferramenta.
 *
 * Sai 2 (bloqueia e devolve a mensagem ao Claude) quando encontra violação.
 * Configurado em .claude/settings.json (matcher Write|Edit).
 */
import { readFileSync } from 'node:fs';

let raw = '';
try {
  raw = readFileSync(0, 'utf8');
} catch {
  process.exit(0);
}

let data = {};
try {
  data = JSON.parse(raw || '{}');
} catch {
  process.exit(0);
}

const filePath = data.tool_input?.file_path || data.tool_input?.path || '';
if (!filePath) process.exit(0);

const norm = String(filePath).replace(/\\/g, '/');
const guarded =
  /\/src\/apresentacao\.html$/.test(norm) || /\/src\/js\/apresentacao\//.test(norm);
if (!guarded) process.exit(0);

let content = '';
try {
  content = readFileSync(filePath, 'utf8');
} catch {
  process.exit(0);
}

const offenders = [];
content.split('\n').forEach((line, i) => {
  // Ignora comentários e entidades de cor em data URI de favicon/SVG externo.
  const stripped = line.replace(/\/\/.*$/, '').replace(/<!--[\s\S]*?-->/g, '');
  const m = stripped.match(/#[0-9a-fA-F]{3}(?:[0-9a-fA-F]{3})?\b/);
  if (m && !/%23/.test(stripped)) offenders.push(`  linha ${i + 1}: ${m[0]}`);
});

if (offenders.length) {
  console.error(
    `[guard-ap] Hexadecimal proibido em ${filePath}\n` +
      offenders.join('\n') +
      `\n\nToda cor da página v3.0 vive em src/apresentacao.css como var(--ap-*).\n` +
      `Ver docs/specs/pages/apresentação/ADR-ap-001-namespace-e-excecao-dark-tech.md`
  );
  process.exit(2);
}

process.exit(0);
