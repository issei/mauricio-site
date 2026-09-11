import { spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { platform } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../..');

/**
 * Resolve o interpretador Python apropriado para o pipeline de i18n.
 *
 * Prioridade:
 *   1. Variável de ambiente I18N_PYTHON (se definida explicitamente)
 *   2. Ambientes virtuais locais (.venv-i18n, .venv, venv)
 *   3. Interpretadores do sistema ('py', 'python', 'python3' no Windows; 'python3', 'python' no Unix)
 */
export function resolvePython(root = ROOT) {
  if (process.env.I18N_PYTHON) {
    return process.env.I18N_PYTHON;
  }

  const isWin = platform() === 'win32';
  const venvs = ['.venv-i18n', '.venv', 'venv'];
  for (const venv of venvs) {
    const candidate = join(root, venv, isWin ? 'Scripts/python.exe' : 'bin/python');
    if (existsSync(candidate)) {
      return candidate;
    }
  }

  const fallbacks = isWin ? ['py', 'python', 'python3'] : ['python3', 'python'];
  for (const cmd of fallbacks) {
    try {
      const res = spawnSync(cmd, ['--version'], { encoding: 'utf-8', shell: false });
      if (res.status === 0 && !res.error) {
        return cmd;
      }
    } catch {
      // continua tentando
    }
  }

  return isWin ? 'python' : 'python3';
}
