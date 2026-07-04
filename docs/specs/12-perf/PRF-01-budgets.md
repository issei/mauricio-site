---
id: PRF-01
titulo: Orçamentos de Performance e Fallbacks
versao: 1.0.0
status: aprovado
dominio: perf
depende-de: [P00]
consumido-por: [A2, A3, R4]
---

# PRF-01 — Performance Budgets

## Contexto
Sem build step, tudo roda direto no navegador (Three.js r167 via CDN). Alvo:
60fps desktop médio, ≥30fps mobile de entrada. Este doc é a régua do R4.

## Orçamentos (invioláveis sem ADR)
| Recurso | Budget |
|---|---|
| Draw calls por frame | ≤ 60 |
| Triângulos em cena | ≤ 80k |
| Partículas totais alocadas | 310 (desktop) / 200 (mobile fallback) |
| Texturas geradas em runtime | ≤ 4 (atlas glifos, DataTexture scars, 2 reserva) |
| Passes de pós-processamento | 3 fixos (Render, Bloom, CRT) |
| pixelRatio | ≤ 2 |
| Heap JS após boot | ≤ 120MB |
| Tempo de boot até interativo | ≤ 4s em 4G |
| Payload total (CDN + código + fotos lazy) | código ≤ 300kB; fotos lazy por fase |

## Regras
- RG-01 Zero alocação em loop de frame: geometrias, materiais, vetores
  temporários (usar pool de Vector3 reutilizáveis), arrays. `new` em rajada só
  no boot de quadrante (RND-01 RG-07).
- RG-02 Objetos de cenário: 1 geometria + 1 material por TIPO, compartilhados
  entre instâncias (herdado do life3d_v2).
- RG-03 Efeitos novos REUSAM buffers existentes: queda de cabelo usa buffer da
  shockwave (RND-03); linha de ouro usa a DataTexture do grid (RND-02);
  decodificação progressiva reusa 1 canvas global.
- RG-04 Fotos: lazy por fase (carregar fase atual + próxima); decode async;
  máx. 1600px no maior lado.

## Monitor de fallback (runtime)
- RG-05 Medir média móvel de frame time (janela 120 frames). Degraus:
  1. >33ms por 2s → desligar Bloom (ouro mantém glow próprio — RND-04).
  2. ainda >33ms por 2s → pixelRatio 1 + partículas modo mobile (200).
  3. ainda >33ms → scanline/curvatura a 50%, DataTexture scars 64².
  Cada degrau loga `[WARN] performance: degradando camada {n}.` Reversão: só
  no próximo boot de fase (evitar oscilação).
- RG-06 Nenhum degrau afeta: eventos narrativos, telemetria, áudio, texto —
  degradação é exclusivamente visual.

## Casos extremos
- GPU blocklisted (WebGL software): detectar frame time >80ms no boot → aviso
  único sugerindo desktop/navegador atualizado; seguir no degrau 3.
- Memória: listener de `visibilitychange` NÃO libera cena (retomar rápido);
  fotos de fases distantes podem ser liberadas (revogar ObjectURL).

## Critérios de aceite
- [ ] Profiler: zero alocação de geometria/material/textura fora de boot.
- [ ] Sessão completa (12 fases) sem crescimento de heap >10% pós-boot.
- [ ] Degraus de fallback disparam nos limiares definidos (teste com throttle).
- [ ] Fase 11 inteira dentro do budget mesmo no degrau 2.
