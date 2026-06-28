# Terminal Evolutivo — Specs

Página única de **scrollytelling híbrido** que conta a jornada de Maurício Issei (1982→2026)
com uma estética que **evolui conforme o scroll** através de **5 eras visuais** — agora com
**fundo WebGL (Three.js)** dirigido por **GSAP ScrollTrigger** e foreground HTML semântico.

| Doc | Versão | Conteúdo |
|:----|:-------|:---------|
| [`00_SDD_terminal_evolutivo.md`](00_SDD_terminal_evolutivo.md) | **v2.1** | Arquitetura híbrida (canvas WebGL `z-index:-1` + HTML por cima); CSS de foreground (5 temas/scrim); motor GSAP ScrollTrigger ⇄ Three.js; mapeamento 5 fases × cena WebGL × STAR × foto; **§7 Performance Budget WebGL**; milestones M1–M9. **Implementada e publicada.** |
| [`01_SPEC_refatoracao_v3.md`](01_SPEC_refatoracao_v3.md) | **v3.0** | Refatoração: **narrativa madura** (sem anime nas fases adultas, trincheira 2003–2017, cronologia do arquiteto corrigida, anti-herói) + **WebGL semântico** (morph em formas literais: grade CRT → wireframe → nós/links → blocos → blueprint → neural) + theme-color dinâmico. Copy pronta para colar + plano R1–R5. |
| [`02_BRIEF_conceitual_shokunin_kintsugi_bambu.md`](02_BRIEF_conceitual_shokunin_kintsugi_bambu.md) | **v4.0** *(conceitual + §16 execução)* | **Direção criativa, não técnica.** Reescreve a alma do site em torno de três filosofias japonesas — **Shokunin** (ofício/evolução), **Kintsugi** (fraturas viradas ouro/resiliência) e **Bambu** (raízes, flexão, legado e final aberto). Objetivo: conexão, não venda nem recrutamento. Princípio "cena primeiro, nome depois". **Autossuficiente** (legível por LLM sem contexto). **§16 registra a EXECUÇÃO:** o protótipo Claude Design **"Caminho 2 · Laca e Folha"** foi escolhido e **implementado** em `src/terminal-evolutivo.html` (gate verde 114/114; sem WebGL, CSS+SVG; Spectral + IBM Plex Mono). Pendentes: regeneração AEO/SEO e commit/push. |
| [`../../../decisions/ADR-te-001-...`](../../../decisions/ADR-te-001-refatoracao-narrativa-e-3d-semantico.md) | ADR | Decisão de refatorar para a v3.0 (contexto das críticas, alternativas, consequências). |

## Em uma frase (v2.0)
CRT + partículas (F1 · 1982–1994) → wireframes Matrix (F2 · 1995–1999) → nós/linhas de dados
(F3 · 2000–2009) → blocos de microsserviços (F4 · 2010–2019) → rede neural holográfica
(F5 · 2020–2026). Câmera e materiais 3D **scrubados** pelo scroll; o foreground HTML rola por
cima com fundo transparente. **100% legível sem JS e sem WebGL** (fallback CSS por tema).

## Evolução
- **v1.0:** 3 fases, HTML/CSS/JS puro, `IntersectionObserver`, ornamentos (CRT/glow) em CSS.
- **v2.0/2.1:** 5 fases, arquitetura híbrida WebGL, GSAP ScrollTrigger; CSS só no foreground; a11y via *progressive enhancement* + fallback. **Implementada e publicada na main.**
- **v3.0 (próxima, especificada):** mesmo esqueleto; refatora **conteúdo** (narrativa madura) e **cenas 3D** (formas semânticas que morfam) + theme-color dinâmico. Ver `01_SPEC_refatoracao_v3.md` e ADR-te-001.
- **v3 "Semântica Humana" (implementada e publicada, `commit ba957d3`):** Three.js/WebGL **removido**; ambiente vira CSS+SVG; narrativa de vida em 1º plano, trabalho como background. Ver `01_SDD_v3_semantica_humana.md`.
- **v4.0 "Laca e Folha" (IMPLEMENTADA no working tree, gate verde):** nova **alma** = Shokunin · Kintsugi · Bambu; foco em conexão (não venda); "cena primeiro, nome depois"; final aberto (bambu que continua). Scrollytelling de cenas (sem timeline/eras), **sem WebGL** (CSS + SVG), Spectral + IBM Plex Mono, laca `#0a0706` + ouro `#d9b06a`. Protótipo Claude Design "Caminho 2". **Pendentes:** regenerar AEO/SEO (ainda descreve a v3) + commit/push. Ver `02_BRIEF_…` §16.

## Entregável de produto
- `src/terminal-evolutivo.html` + `src/js/terminal-evolutivo.js` (orquestrador) + `src/js/te-scene.js` (Three.js)
- Dependências: `three` + `gsap` (com `ScrollTrigger`) via npm (bundle Vite, não CDN)
- URL: `mauricio.issei.com.br/terminal-evolutivo`
- Status: **v3.0 implementada e publicada na main** (narrativa de vida + WebGL semântico + trabalho como background)

## Fontes de conteúdo
- Narrativa (5 arcos): `docs/references/jornada.txt`
- STAR/CV: `public/llms-full.txt`, `src/index.html`
- Jogos: `src/life.html` (2D), `src/life3d.html` (3D — referência de canvas/loop) · Vídeo: youtu.be/nQt9JjzXDd4
- Fotos: `public/fotos/`
