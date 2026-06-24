# Terminal Evolutivo — A Jornada de Maurício Issei (1982–2026)

> Versão Markdown (GEO/AEO) de <https://mauricio.issei.com.br/terminal-evolutivo>. Autor: **Maurício Yokoyama Issei** · pt-BR · Publicado: 2026-06-22 · Atualizado: 2026-06-22.

## Em síntese

O **Terminal Evolutivo** conta a evolução de **Maurício Issei** de 1982 a 2026 em **cinco fases** — de espectador a operador a arquiteto/mentor — numa página de *scrollytelling* cuja **estética envelhece conforme você rola** (terminal CRT → wireframe → rede de dados → blocos corporativos → rede neural).

- **Cinco fases** alinhadas aos arcos de vida: Infância, Treinamento, Rede Discada, Nuvem Corporativa e o Prompt da IA.
- **Casos STAR reais** embutidos no fluxo: −R$3MM no contrato Salesforce, +15% nas metas com a Pipe Automática, 10 dias → tempo real no Agrupamento.
- **Marco do Arquiteto** — a virada de Analista para Arquiteto: "desenhar sistemas eu já fazia; agora desenho a inteligência — e os times — que os operam".
- **Arquitetura híbrida** — foreground HTML semântico (a11y/SEO) sobre fundo WebGL, com fallback acessível sem WebGL/JS.

## As cinco fases

A jornada se divide em cinco eras visuais: 1) Terminal Analógico (1982–1994, infância e os heróis japoneses); 2) O Treinamento (1995–1999, adolescência e o primeiro computador); 3) A Rede Discada (2000–2009, início da carreira em Java e a virada de operador a analista); 4) A Nuvem Corporativa (2010–2019, família, liderança técnica e os primeiros grandes resultados na Rede); 5) O Prompt da IA (2020–2026, maturidade, arquitetura de soluções e foco em IA agêntica).

## Arquitetura técnica

A página combina foreground HTML semântico (preservando SEO e acessibilidade) com um fundo WebGL em Three.js que morfa continuamente entre cinco estados, dirigido por GSAP ScrollTrigger. A renderização é sob demanda (sem ticker contínuo) e há fallback CSS sólido por tema quando o WebGL não está disponível.

## Perguntas frequentes

**O que é o Terminal Evolutivo?**

É uma página de portfólio em scrollytelling que conta a evolução de Maurício Issei de 1982 a 2026 em cinco fases. O diferencial é que a própria estética da página evolui conforme o usuário rola, espelhando a maturidade tecnológica de cada época — de um terminal analógico a uma rede neural holográfica.

**Quais resultados de carreira a página destaca?**

Casos reais com impacto mensurável: economia de mais de R$3 milhões na renegociação do contrato Salesforce (2020), aumento de mais de 15% no atingimento de metas com a Pipe Automática (2025) e a redução do SLA de Agrupamento Comercial de 10 dias para tempo real (2024). Somam-se 20+ anos em tecnologia e 15+ em grandes empresas.

**A página funciona sem WebGL ou JavaScript?**

Sim. O conteúdo é HTML semântico linear e legível por leitores de tela; o fundo 3D (WebGL/Three.js) é progressive enhancement puramente decorativo. Sem WebGL ou sem JavaScript, a página exibe um fundo sólido por tema e todo o conteúdo permanece intacto e indexável.

## Glossário

- **Scrollytelling** — Narrativa cuja progressão visual é controlada pelo scroll do usuário.
- **Progressive enhancement** — Camada extra (WebGL) que enriquece a experiência sem ser pré-requisito do conteúdo.
- **Morphing semântico** — Transição contínua entre cenas 3D interpolando um único sistema de partículas, sem fade.
- **Marco do Arquiteto** — Beat narrativo da virada de Analista para Arquiteto: desenhar sistemas em vez de só construí-los.

*© 2026 Maurício Yokoyama Issei. Conteúdo citável com atribuição (fair use educacional).*
