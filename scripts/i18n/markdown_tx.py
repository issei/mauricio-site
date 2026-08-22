"""
Tradução de Markdown e dos arquivos AEO (`llms.txt`, `llms-full.txt`).

Markdown é texto e estrutura no MESMO caractere: `#`, `-`, `**`, `` ` ``, `|`.
Mandar a linha inteira para um modelo NMT devolve, com frequência, um `**`
solto ou uma lista que virou parágrafo. Então o arquivo é processado em duas
camadas:

  1. **Bloco** — cada linha é classificada antes de qualquer tradução. Cerca de
     código (```), bloco indentado, front matter YAML, tabela e regra
     horizontal são copiados byte a byte. Um bloco de código traduzido é código
     quebrado, e é justamente ele que um agente de IA vai executar.

  2. **Inline** — na linha traduzível, o marcador de estrutura fica de fora do
     que vai ao modelo: o `## ` do cabeçalho, o `- ` da lista e o `> ` da
     citação são recortados, o texto restante é traduzido e o marcador é
     recolocado. Código inline, URL, tag HTML e imagem viram marcador
     (`engine.translate_with_slots`), com conferência na volta.

Links são reescritos pela mesma regra do HTML: só o que tem espelho em `/en/`
muda de rota.
"""

from __future__ import annotations

import re

from links import rewrite_route

#: `# título`, `## título`, ...
_CABECALHO = re.compile(r"^(\s{0,3}#{1,6}\s+)(.*?)(\s*#*\s*)$")
#: `- item`, `* item`, `+ item`, `1. item`, com indentação e checkbox opcional.
_LISTA = re.compile(r"^(\s*(?:[-*+]|\d{1,9}[.)])\s+(?:\[[ xX]\]\s+)?)(.*)$")
#: `> citação`, aninhada ou não.
_CITACAO = re.compile(r"^(\s*(?:>\s?)+)(.*)$")
#: `Termo`\n`:   definição` (listas de definição) e `**Campo:** valor`.
_CERCA = re.compile(r"^(\s*)(```+|~~~+)(.*)$")
_REGRA = re.compile(r"^\s*([-*_])(?:\s*\1){2,}\s*$")
_TABELA_SEP = re.compile(r"^\s*\|?[\s:|-]+\|[\s:|-]*$")
_INDENTADO = re.compile(r"^(?: {4}|\t)")
#: Linha de referência de link: `[id]: /rota "título"`.
_REF_LINK = re.compile(r"^(\s*\[[^\]]+\]:\s*)(\S+)(.*)$")

#: Construções que não podem ir ao modelo como texto.
_PROTEGIDOS = re.compile(
    r"""
      (?P<code>`+[^`]*`+)                       # código inline
    | (?P<img>!\[(?P<img_alt>[^\]]*)\]\((?P<img_url>[^)\s]*)(?P<img_tit>[^)]*)\))
    | (?P<link>\[(?P<link_txt>[^\]]*)\]\((?P<link_url>[^)\s]*)(?P<link_tit>[^)]*)\))
    | (?P<autolink><https?://[^>\s]+>)
    | (?P<html><[/!]?[a-zA-Z][^>]*>)            # tag HTML solta
    | (?P<url>\bhttps?://\S+)                   # URL nua
    | (?P<entity>&[a-zA-Z#][a-zA-Z0-9]{1,8};)
    """,
    re.VERBOSE,
)


def _rota(url: str, base: str) -> str:
    return rewrite_route(url, relative_base=base)


def translate_inline(linha: str, engine, base: str) -> str:
    """Traduz o texto de uma linha, deixando a sintaxe inline intocada."""
    if not linha.strip():
        return linha

    slots: list[str] = []
    partes: list[str] = []
    pos = 0

    for m in _PROTEGIDOS.finditer(linha):
        partes.append(linha[pos : m.start()])
        if m.group("img") is not None:
            alt = engine.translate(m.group("img_alt") or "")
            url = _rota(m.group("img_url") or "", base)
            slots.append(f"![{alt}]({url}{m.group('img_tit') or ''})")
        elif m.group("link") is not None:
            texto = translate_inline(m.group("link_txt") or "", engine, base)
            url = _rota(m.group("link_url") or "", base)
            slots.append(f"[{texto}]({url}{m.group('link_tit') or ''})")
        elif m.group("autolink") is not None:
            slots.append(f"<{_rota(m.group('autolink')[1:-1], base)}>")
        elif m.group("url") is not None:
            # URL nua do próprio site também aponta para o gêmeo.
            slots.append(_rota(m.group("url"), base))
        else:
            slots.append(m.group(0))
        partes.append(f"__SLOT{len(slots) - 1}__")
        pos = m.end()
    partes.append(linha[pos:])

    template = "".join(partes)
    # Reindexa para o formato do motor (que confere a volta e tem contingência).
    from engine import slot as slot_token

    for i in range(len(slots)):
        template = template.replace(f"__SLOT{i}__", slot_token(i))
    return engine.translate_with_slots(template, slots)


def _traduz_enfase(texto: str, engine, base: str) -> str:
    """
    `**negrito**` e `*itálico*` sobrevivem porque o marcador é recortado antes.

    Traduzir o trecho enfatizado fora da frase custa contexto; mandar `**` ao
    modelo custa a sintaxe. O acordo é explícito e a favor da sintaxe.
    """
    padrao = re.compile(r"(\*\*|__|\*|_)(?=\S)(.+?)(?<=\S)\1")
    if not padrao.search(texto):
        return translate_inline(texto, engine, base)

    saida, pos = [], 0
    for m in padrao.finditer(texto):
        saida.append(translate_inline(texto[pos : m.start()], engine, base))
        saida.append(f"{m.group(1)}{translate_inline(m.group(2), engine, base)}{m.group(1)}")
        pos = m.end()
    saida.append(translate_inline(texto[pos:], engine, base))
    return "".join(saida)


def _linha_de_tabela(linha: str, engine, base: str) -> str:
    if _TABELA_SEP.match(linha):
        return linha
    partes = linha.split("|")
    return "|".join(
        p if not p.strip() else _preserva_espaco(p, engine, base) for p in partes
    )


def _preserva_espaco(celula: str, engine, base: str) -> str:
    esq = celula[: len(celula) - len(celula.lstrip())]
    dir_ = celula[len(celula.rstrip()) :]
    return f"{esq}{_traduz_enfase(celula.strip(), engine, base)}{dir_}"


def translate_markdown(texto: str, engine, *, base: str = "public/en") -> str:
    linhas = texto.split("\n")
    saida: list[str] = []
    i = 0
    dentro_front_matter = False

    # Front matter YAML só existe se o arquivo começa com `---`.
    if linhas and linhas[0].strip() == "---":
        dentro_front_matter = True
        saida.append(linhas[0])
        i = 1
        while i < len(linhas) and linhas[i].strip() not in ("---", "..."):
            saida.append(linhas[i])
            i += 1
        if i < len(linhas):
            saida.append(linhas[i])
            i += 1
        dentro_front_matter = False

    cerca: str | None = None
    while i < len(linhas):
        linha = linhas[i]

        # 1. Cerca de código: tudo lá dentro é literal.
        m = _CERCA.match(linha)
        if m:
            marcador = m.group(2)
            if cerca is None:
                cerca = marcador[0] * 3
            elif marcador.startswith(cerca):
                cerca = None
            saida.append(linha)
            i += 1
            continue
        if cerca is not None or _INDENTADO.match(linha) or _REGRA.match(linha):
            saida.append(linha)
            i += 1
            continue

        if not linha.strip():
            saida.append(linha)
            i += 1
            continue

        # 2. Referência de link no rodapé: só a rota muda.
        m = _REF_LINK.match(linha)
        if m:
            saida.append(f"{m.group(1)}{_rota(m.group(2), base)}{m.group(3)}")
            i += 1
            continue

        # 3. Tabela: célula a célula, para não perder os pipes.
        if linha.lstrip().startswith("|"):
            saida.append(_linha_de_tabela(linha, engine, base))
            i += 1
            continue

        # 4. Marcadores de bloco: recortados, traduzidos, recolocados.
        for padrao in (_CABECALHO, _LISTA, _CITACAO):
            m = padrao.match(linha)
            if m:
                corpo = _traduz_enfase(m.group(2), engine, base)
                sufixo = m.group(3) if padrao is _CABECALHO else ""
                saida.append(f"{m.group(1)}{corpo}{sufixo}")
                break
        else:
            saida.append(_traduz_enfase(linha, engine, base))
        i += 1

    return "\n".join(saida)
