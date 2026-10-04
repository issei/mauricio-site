# A11y Exceptions Log

Desvios conhecidos de WCAG 2.2 AA **aceitos temporariamente**. Exceção é temporária e **não muda o requisito**.
Na data de revisão a página é corrigida (e a exceção removida) ou renovada de forma consciente — nunca suprimida em silêncio.
Mecanismo contra piora: `tests/a11y/baseline.json` (catraca em `npm run gate`) — qualquer violação nova nessas páginas derruba o gate.

**Campos comuns às EXC-001…007**
- **Dono do risco:** Maurício Yokoyama Issei
- **Aprovado por:** Maurício Yokoyama Issei (2026-10-03, decisão "o resto não precisa mexer")
- **Issue de rastreio:** não há issue; a dívida é cobrada pela catraca `tests/a11y/baseline.json` e por esta data de revisão
- **Expiração (data de revisão):** 2027-04-03 *(proposta: 6 meses; o autor ajusta)*
- **Origem:** `docs/specs/a11y-first/accessibility-audit.md`; medido em 2026-10-03 (axe, build de produção)

Escopo: as páginas abaixo **não são linkadas por visitantes** como tarefa T1–T7 (utilitárias/experimentais); estão publicadas e **sem `noindex`**.
Isto é um fato registrado, não uma defesa: se um visitante chegar nelas, as barreiras existem.

---

### EXC-001 — `src/diagnostic.html`
- **WCAG:** 1.3.1, 3.3.2, 4.1.2 · **Severidade:** 🔴 Critical (axe `label`, 2 campos) · `placeholder-label` (verify-a11y)
- **Quebrado:** campos sem rótulo programático; leitor de tela não sabe o que preencher. Sem `<main>` nem skip link.
- **Contorno:** nenhum público — página de uso interno. **Resolução:** rótulos `<label>`; ou remover do build público.

### EXC-002 — `src/test-github.html`
- **WCAG:** 1.3.1, 3.3.2, 4.1.2, 1.4.10 · **Severidade:** 🔴 Critical (axe `label`, 2 campos) + rolagem horizontal a 320 px
- **Quebrado:** idem EXC-001. **Contorno:** nenhum público (teste interno). **Resolução:** idem; candidata a remoção.

### EXC-003 — `src/admin.html` e `src/admin-editor.html`
- **WCAG:** 2.4.1, 1.3.1 (sem `<main>`/skip link); `admin-editor.html:50` overlay `div onclick` sem equivalente de teclado (2.1.1); `outline:none` em `admin.html` (2.4.7, verificar)
- **Severidade:** 🟠 High · **Quebrado:** edição do CV por teclado/leitor de tela não verificada. **Contorno:** o CV também se edita direto em `public/cv.json` (workflow documentado).
- **Resolução:** páginas atrás de autenticação ou fora do bundle público; ou corrigir.

### EXC-004 — `src/mapmind.html`
- **WCAG:** 2.4.1, 1.3.1 · **Severidade:** 🟡 Medium · 1º foco cai em `<object>`; sem `<main>` nem skip link.
- **Contorno:** conteúdo equivalente em `know.html`/catálogo (conferir). **Resolução:** corrigir estrutura ou remover.

### EXC-005 — `src/vsl.html`
- **WCAG:** 2.4.1, 1.3.1; **verificar** 2.2.2/1.4.2 (`autoplay` no markup, achado `verify-a11y: media-autoplay`) · **Severidade:** 🟠 High
- **Quebrado:** mídia que inicia sozinha sem mecanismo de pausa comprovado; sem landmark. **Contorno:** nenhum verificado. **Resolução:** `muted` + controle de pausa; `<main>` + skip link.

> **Atualização Fase 5 (revista na Fase 7):** a catraca passou a medir `motion:reduce` e conta `admin` e `admin-editor` (8 animações em execução cada) e `exemplopdi` (1) após `prefers-reduced-motion`; o auditor independente mediu 0 *animações CSS infinitas* nas mesmas páginas. As medições divergem porque contam coisas diferentes (a catraca inclui transições longas de utilitários do Tailwind CDN). Vale a contagem mais severa até a página ser corrigida. `test-github` e `exemplopdi` também seguem com rolagem horizontal a 320 px.

### EXC-006 — `src/exemplopdi.html`
- **WCAG:** 1.4.3 (2 nós `#6a7282` sobre `#0d1117` = 3,91:1), 1.4.10 (rolagem horizontal a 320 px, 461 px de largura), 2.4.1 · **Severidade:** 🟠 High
- **Contorno:** conteúdo de exemplo/demonstração, não proposta. **Resolução:** token muted `#99a1af` (já aprovado) + reflow.

### EXC-008 — `src/digital-workplace-agentico.html` (vídeo embutido)
- **WCAG:** 1.2.2 (legendas, pré-gravado) · **Severidade:** 🟡 Medium · **Aberta em:** 2026-10-04
- **Quebrado:** o vídeo do YouTube só tem legendas autogeradas (ou não verificadas) — rascunho, não alternativa entregue (`docs/a11y/references/guide-media.md` §2). Não há transcrição integral.
- **Contorno:** resumo textual em `<details>` na própria seção e link "Pular o vídeo". **Resolução:** revisar/publicar legendas PT-BR no YouTube Studio e linkar a transcrição; então remover esta entrada. Revisão: 2027-04-03.

### EXC-007 — `aria-soup` — **ENCERRADA (Fase 7)**
- `role="main"`/`role="navigation"` redundantes foram removidos (último caso: `src/life.html`, `<nav aria-label="Controles táteis">`).
- Os `role="list"` em `engenharia-agentes-ia` são deliberados (Safari/VoiceOver remove a semântica de lista com `list-style:none`; o auditor mediu `list-style-type:none` em 7 das 8 listas): registrados em `A11Y-DECISIONS.md`, não são desvio. O `verify-a11y.py` os reporta como erro: falso positivo conhecido.
