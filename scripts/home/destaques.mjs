// Destaques da home (3 a 4; pelo menos um de natureza Experiência).
// Fonte única para scripts/gen-portfolio.mjs (cartões) e scripts/gen-imagens.mjs
// (capas derivadas do og:image de cada página). SDD-elementos-visuais §4.7.
export const DESTAQUES = ['agent-ready', 'engenharia-agentes-ia', 'knowledge-os-presentation', 'acessibilidade'];

// Recentes da home nova (Sessão 03, SDD-nova-home §13.5): caminho sem ".html", rótulo e formato.
// Também são destinos da família de transição `destinos` (SDD-destinos-da-home, RF-VT-38).
export const RECENTES = [
  { rota: '/a-quem-a-empresa-delega', titulo: 'A quem a empresa delega quando delega à IA?', formato: 'Artigo' },
  { rota: '/curiosidade-e-investigacao', titulo: 'Curiosidade e investigação', formato: 'Ensaio' },
  { rota: '/videos/domine-a-ia-com-google-antigravity-da-codificacao-a', titulo: 'Domine a IA com Google Antigravity', formato: 'Vídeo' },
];
