/*
 * Badges das certificações (SDD-elementos-visuais §4.9, D-EV-4).
 *
 * As imagens originais ficam em assets-fonte/badges/, baixadas da página de verificação de cada
 * credencial (Credly, badges.com.br e outros). assets-fonte/badges/fontes.json lista o que foi
 * baixado e o que foi pulado. gen-imagens.mjs gera as versões leves em public/img/badges/ e
 * gen-portfolio.mjs mostra o badge no bilhete da certificação que tem um.
 *
 * A chave de cada badge é o nome da certificação mais o ano, porque o mesmo nome aparece em
 * anos diferentes ("Arquitetura de Soluções" 2022 e 2024).
 */
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

/** Larguras geradas: 1x e 2x do maior tamanho exibido (bilhete em destaque, 72 px). */
export const BADGE_LARGURAS = [72, 144];

/** "Practitioner – D&A Foundation", 2024 → "practitioner-d-a-foundation-2024". */
export const badgeSlug = (nome, ano) => `${String(nome)
  .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  .toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}-${ano}`;

/** Lê fontes.json. Sem o arquivo, não há badges (a página continua sem imagem). */
export function lerBadges(root) {
  const p = join(root, 'assets-fonte/badges/fontes.json');
  if (!existsSync(p)) return [];
  const dados = JSON.parse(readFileSync(p, 'utf8'));
  const baixados = Array.isArray(dados) ? dados : dados.baixados ?? [];
  return baixados.map((b) => ({ ...b, slug: badgeSlug(b.nome, b.ano), fonte: join(root, 'assets-fonte/badges', b.arquivo) }));
}
