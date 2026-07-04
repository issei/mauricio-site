---
id: ACC-01
titulo: Acessibilidade — Safe-mode, Reduced Motion, Cinetose
versao: 1.0.0
status: aprovado
dominio: a11y
depende-de: [CTR-02, CTR-08]
consumido-por: [A1, A3, A5, R5]
---

# ACC-01 — Acessibilidade

## Contexto
O jogo usa flash, glitch, aberração e shake como linguagem narrativa. Nada
disso pode ser inegociável. Princípio: **traduzir, não remover** — o modo
seguro muda a linguagem do impacto, nunca corta conteúdo.

## Objetivo
Experiência narrativamente completa para usuários fotossensíveis, com cinetose,
ou com preferência por movimento reduzido.

## Regras — flags
- RG-01 `reducedMotion`: default = media query `prefers-reduced-motion`;
  override por `config set motion reduced|full`. `safeMode`: default off;
  `config set safe-mode on|off`. Ambos persistem (CTR-08) e publicam
  `a11y:changed`.
- RG-02 `safeMode on` implica todas as traduções da tabela; `reducedMotion`
  implica o subconjunto de movimento (shake, parallax de partículas,
  macroblock animado). Flags independentes; união quando ambas ativas.
- RG-03 Mudança de flag em runtime: interpolar para o novo conjunto em 400ms
  (nunca corte seco — RND-04).

## Tabela de traduções (fonte única — componentes citam, não copiam)
| Efeito padrão | Tradução | Onde |
|---|---|---|
| Flash overlay 300ms | dip-to-black 600ms | RND-04 |
| Aberração 6× (crise) | dessaturação até 0,8 | RND-04 |
| Scanline tear | scanlines em fade-out | RND-04 |
| Camera shake | exposure −12% por 0,5s | RND-04 |
| Macroblock animado | macroblock estático | GMP-02 |
| Contador regredindo | contador pausado pulsando | GMP-02 |
| Flicker conflito 2Hz | pulso opacidade 0,5Hz | GMP-05 |
| Glitch de token errado | pulso de opacidade | CLI-02 |
| Shockwave burst | fade radial sem movimento | RND-03 |

## Regras — limites absolutos (qualquer modo, invioláveis)
- RG-04 ≤3 flashes/s; sem inversões de luminância acima dos limiares WCAG
  2.3.1 (validação automatizada — TST-01).
- RG-05 Picos de efeito: máx. 3s contínuos, seguidos de ≥5s estáveis.
- RG-06 Cinetose estrutural: câmera isométrica sem rotação livre (RND-01);
  rampa do Vale é do mundo, HUD nivelado (referência vestibular); FOV fixo.

## Regras — outros
- RG-07 Alvos de toque ≥48×48px (CLI-02, controles touch, botões HUD).
- RG-08 Texto: contraste ≥4,5:1 sobre fundo (verificar accents de CTR-03 sobre
  #0a0706 — o rosa e o ciano passam; o verde-limão em texto pequeno: usar
  variante clareada `#c8ff8a` APENAS para texto).
- RG-09 Leitor de tela: modal de memória com aria-live polite (texto completo
  após typewriter); tokens do composer como buttons (CLI-02 §extremos).
- RG-10 Paridade de conteúdo: TODOS os beats narrativos alcançáveis em
  qualquer combinação de flags — checklist de beats em TST-01.

## Critérios de aceite
- [ ] Fase 11 completável em safe-mode com os mesmos eventos publicados.
- [ ] Análise de luminância da sessão inteira sem violação WCAG 2.3.1.
- [ ] Toggle em runtime sem corte visual (interpolação 400ms).
- [ ] Verde-limão nunca usado em texto <14px sem a variante clareada.
