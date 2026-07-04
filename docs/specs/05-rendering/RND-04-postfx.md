---
id: RND-04
titulo: PostFX — Pipeline CRT e Estados de Crise
versao: 1.0.0
status: aprovado
dominio: rendering
depende-de: [CTR-02, PRF-01, ACC-01]
consumido-por: [A3]
---

# RND-04 — PostFX

## Contexto
Pipeline herdado: RenderPass → UnrealBloomPass → ShaderPass CRT único (curvatura
barril, aberração cromática radial, scanlines moduladas, vinheta). Extensão:
estados de crise do Vale e traduções de safe-mode.

## Objetivo
Um passe CRT parametrizado por "estado emocional" do sistema, com teto rígido
de agressão óptica.

## Regras
- RG-01 Uniforms: `uAberration`, `uCurvature`, `uScanline`, `uVignette` +
  novos: `uScanTear` (rasgo de scanline 0–1), `uDesat` (dessaturação 0–1),
  `uExposure`.
- RG-02 Valores de repouso (conservadores): aberração 1,0 (unidade interna),
  curvatura leve, scanlines sutis. São a baseline de TODAS as fases.
- RG-03 Estado de crise (fase 11, entre `vale:act2` e `vale:merge-resolved`):
  aberração até 6×, `uScanTear` até 0,7 — SEMPRE com teto de 3s contínuos de
  pico seguidos de ≥5s de janela estável (loop de envelope, nunca constante).
- RG-04 Flash de revelação (GMP-01): overlay DOM (#glitch-flash), não uniform —
  300ms, easing out. Safe-mode: vira dip-to-black (queda de exposure 40%,
  600ms).
- RG-05 Camera shake: amplitude 40% do life3d_v2, duração máx. 0,5s, nunca em
  loop. Implementado como jitter na câmera (RND-01), mas GOVERNADO por este
  doc: safe-mode/reduced-motion → shake 0, substituir por `uExposure` −12% por
  0,5s.
- RG-06 Limites WCAG 2.3.1 (invioláveis, qualquer modo): ≤3 flashes/s;
  sem inversão de luminância acima dos limiares; validação em TST-01.
- RG-07 Fallback de performance (PRF-01): se frame >33ms por 2s → desligar
  bloom; persiste >33ms → pixelRatio 1. Nunca desligar o passe CRT (identidade
  visual) — apenas reduzir scanline/curvatura a 50%.

## Mapa safe-mode (resumo — fonte completa: ACC-01)
| Efeito | Padrão | Safe-mode |
|---|---|---|
| Flash | overlay 300ms | dip-to-black 600ms |
| Aberração crise | até 6× | `uDesat` até 0,8 (cor vaza, não duplica) |
| Scanline tear | rasgo 0,7 | scanlines desaparecendo (fade) |
| Shake | 0,4× amplitude | exposure −12% |

## Casos extremos
- `a11y:changed` no MEIO de uma crise: interpolar para o conjunto safe em 400ms
  (nunca corte seco).
- Bloom desligado por fallback durante o ouro do Kintsugi: o ouro mantém glow
  via material emissivo próprio (RND-02) — não depende do bloom.

## Critérios de aceite
- [ ] Nenhum estado com >3 flashes/s (teste automatizado de luminância).
- [ ] Crise nunca excede 3s de pico contínuo.
- [ ] Safe-mode alcança os MESMOS beats narrativos (paridade — checklist ACC-01).
- [ ] Pipeline com exatamente 3 passes em qualquer estado.
