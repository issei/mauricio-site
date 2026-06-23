# Terminal Evolutivo — Specs

Página única de **scrollytelling híbrido** que conta a jornada de Maurício Issei (1982→2026)
com uma estética que **evolui conforme o scroll** através de **5 eras visuais** — agora com
**fundo WebGL (Three.js)** dirigido por **GSAP ScrollTrigger** e foreground HTML semântico.

| Doc | Versão | Conteúdo |
|:----|:-------|:---------|
| [`00_SDD_terminal_evolutivo.md`](00_SDD_terminal_evolutivo.md) | **v2.0** | Arquitetura híbrida (canvas WebGL `z-index:-1` + HTML por cima); CSS de foreground (5 temas/scrim); motor GSAP ScrollTrigger ⇄ Three.js; mapeamento 5 fases × cena WebGL × STAR × foto; **§7 Performance Budget WebGL**; milestones M1–M9 |

## Em uma frase (v2.0)
CRT + partículas (F1 · 1982–1994) → wireframes Matrix (F2 · 1995–1999) → nós/linhas de dados
(F3 · 2000–2009) → blocos de microsserviços (F4 · 2010–2019) → rede neural holográfica
(F5 · 2020–2026). Câmera e materiais 3D **scrubados** pelo scroll; o foreground HTML rola por
cima com fundo transparente. **100% legível sem JS e sem WebGL** (fallback CSS por tema).

## Evolução v1.0 → v2.0
- v1.0: 3 fases, HTML/CSS/JS puro, `IntersectionObserver`, ornamentos (CRT/glow) em CSS.
- v2.0: **5 fases**, **arquitetura híbrida WebGL**, **GSAP ScrollTrigger**, ornamentos em **shaders**;
  CSS passa a governar só o foreground; a11y preservada via *progressive enhancement* + fallback.

## Entregável de produto (a construir)
- `src/terminal-evolutivo.html` + `src/js/terminal-evolutivo.js` (orquestrador) + `src/js/te-scene.js` (Three.js)
- Dependências: `three` + `gsap` (com `ScrollTrigger`) via npm (bundle Vite, não CDN)
- URL: `mauricio.issei.com.br/terminal-evolutivo`
- Status: **especificado, código ainda não escrito**

## Fontes de conteúdo
- Narrativa (5 arcos): `docs/references/jornada.txt`
- STAR/CV: `public/llms-full.txt`, `src/index.html`
- Jogos: `src/life.html` (2D), `src/life3d.html` (3D — referência de canvas/loop) · Vídeo: youtu.be/nQt9JjzXDd4
- Fotos: `public/fotos/`
