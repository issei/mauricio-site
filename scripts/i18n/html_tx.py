"""
Tradução de HTML preservando o documento.

O parser NÃO reconstrói o HTML. Ele reemite cada token exatamente como veio da
origem — inclusive aspas, quebras de linha e a indentação de atributos — e faz
cirurgia pontual só onde precisa mudar. Um pretty-printer (BeautifulSoup, lxml)
reescreveria o arquivo inteiro e o diff entre PT-BR e EN deixaria de ser
legível: quem revisa o espelho quer ver a tradução, não a reformatação.

O que muda numa página espelhada:
  * `<html lang>` → `en`;
  * nós de texto visíveis e atributos de acessibilidade/SEO (`alt`, `title`,
    `placeholder`, `aria-label`) traduzidos;
  * `<script>`, `<style>`, `<code>`, `<pre>`, `<kbd>`, `<samp>` e qualquer
    elemento marcado `translate="no"` intocados — byte a byte;
  * `<script type="application/ld+json">` reprocessado como dado (§ jsonld_tx);
  * rotas internas apontando para `/en/`;
  * `canonical` autorreferencial em `/en/` e o trio `hreflang` recíproco.
"""

from __future__ import annotations

import re
from html.parser import HTMLParser

from assets import SITE
from jsonld_tx import translate_jsonld
from links import rewrite_route

#: Conteúdo destes elementos jamais vai ao modelo. Código traduzido é código
#: quebrado, e um `<script>` mexido é a página quebrada.
ELEMENTOS_OPACOS = frozenset(
    {"script", "style", "code", "pre", "kbd", "samp", "var", "textarea", "svg"}
)

#: Elementos que não têm texto visível — evita traduzir ruído.
SEM_TEXTO = frozenset({"head", "html", "body", "ul", "ol", "table", "tr", "select"})

#: Atributos de acessibilidade e SEO que carregam texto para humano.
ATRIBUTOS_TRADUZIVEIS = ("alt", "title", "placeholder", "aria-label", "aria-description")

#: Atributos que carregam rota.
ATRIBUTOS_DE_ROTA = ("href", "src", "action", "data-href")

#: `<meta>` cujo `content` é texto de leitura humana.
META_TRADUZIVEL = frozenset(
    {
        "description",
        "keywords",
        "abstract",
        "og:title",
        "og:description",
        "og:image:alt",
        "twitter:title",
        "twitter:description",
        "twitter:image:alt",
    }
)

#: `<meta>` cujo `content` é rota do próprio site.
META_DE_ROTA = frozenset({"og:url", "twitter:url", "al:web:url"})

#: HTMLParser entrega o nome da tag em minúsculas; SVG é case-sensitive
#: (`linearGradient`, `clipPath`, `feMerge`). A caixa original é lida do texto
#: cru da abertura e reaplicada no fechamento.
_NOME_DA_TAG = re.compile(r"<\s*([a-zA-Z][^\s/>]*)")

#: Únicos elementos que o HTMLParser trata como CDATA — só neles o conteúdo
#: chega sem passar por `unescape`, e só neles reescapar seria corrupção.
CDATA = frozenset({"script", "style"})

#: Especificador de módulo ES relativo dentro de `<script type="module">`
#: inline. É a ÚNICA coisa que se mexe dentro de um script — e mexe porque o
#: Rollup resolve o caminho a partir do arquivo HTML: em `src/en/index.html`,
#: `./js/cv-renderer.js` simplesmente não existe e o build quebra.
_ESPECIFICADOR = re.compile(
    r"""(\bfrom\s*|\bimport\s*\(\s*|\bimport\s+)(['"])(\.\.?/[^'"]+)\2"""
)

_ATTR_RE_CACHE: dict[str, re.Pattern] = {}


def _attr_re(nome: str) -> re.Pattern:
    if nome not in _ATTR_RE_CACHE:
        _ATTR_RE_CACHE[nome] = re.compile(
            rf"(\s{re.escape(nome)}\s*=\s*)(\"|')(.*?)\2",
            re.IGNORECASE | re.DOTALL,
        )
    return _ATTR_RE_CACHE[nome]


def _troca_atributo(raw: str, nome: str, valor: str) -> str:
    """Substitui o valor de um atributo no texto CRU da tag, sem reconstruí-la."""

    def _sub(m: re.Match) -> str:
        return f"{m.group(1)}{m.group(2)}{_escapa_attr(valor, m.group(2))}{m.group(2)}"

    return _attr_re(nome).sub(_sub, raw, count=1)


def _escapa_attr(valor: str, aspas: str) -> str:
    valor = valor.replace("&", "&amp;")
    return valor.replace(aspas, "&quot;" if aspas == '"' else "&#39;")


def _escapa_saida(texto: str) -> str:
    """
    Reescape mínimo do que SAI do modelo: só `<`.

    O texto de origem é reemitido cru (as entidades chegam por
    `handle_entityref`, nunca decodificadas), então não há `&` para reescapar —
    e reescapá-lo transformaria `A & B` em `A &amp; B` sem necessidade. Já um
    `<` inventado pelo modelo abriria uma tag que ninguém escreveu.
    """
    return texto.replace("<", "&lt;")


class TradutorHTML(HTMLParser):
    def __init__(self, engine, route_pt: str, route_en: str):
        # convert_charrefs=False é deliberado: com a decodificação ligada,
        # `&gt;` voltava como `>` e `&quot;` como `"` — válido, mas é mutação
        # de conteúdo dentro de um `<pre>` que deveria sair byte a byte igual.
        # Aqui as entidades chegam inteiras por `handle_entityref` e viram
        # marcador na tradução, preservadas exatamente como estavam.
        super().__init__(convert_charrefs=False)
        self.engine = engine
        self.route_pt = route_pt
        self.route_en = route_en
        self.saida: list[str] = []
        # Pilha de (tag em minúsculas, opaco?, caixa original). A opacidade é
        # herdada, então basta contar quantos ancestrais opacos estão abertos;
        # a caixa original volta no fechamento (SVG é case-sensitive).
        self.pilha: list[tuple[str, bool, str]] = []
        self.opaco = 0
        self.jsonld = False
        self.script_inline = False
        self.canonical_visto = False
        self.hreflang_injetado = False
        self._buffer_jsonld: list[str] = []
        # Texto e entidades chegam em eventos separados; a tradução precisa da
        # frase inteira, então tudo é acumulado e só resolvido na fronteira da
        # próxima tag.
        self._texto: list[tuple[str, bool]] = []

    # -- utilidades --------------------------------------------------------
    def _emite(self, s: str) -> None:
        self.saida.append(s)

    def _dentro_de_opaco(self) -> bool:
        return self.opaco > 0

    def _rota(self, url: str) -> str:
        return rewrite_route(url, relative_base="src/en")

    # -- tags --------------------------------------------------------------
    def handle_starttag(self, tag, attrs):
        self._descarrega()
        d = {k.lower(): (v or "") for k, v in attrs}
        # `translate="no"` é a saída de emergência padrão do HTML para "não
        # mexa neste texto"; vale tanto quanto estar dentro de um `<pre>`.
        opaco = tag in ELEMENTOS_OPACOS or d.get("translate", "").lower() == "no"
        bruto = self.get_starttag_text() or ""
        m = _NOME_DA_TAG.match(bruto)
        self._tag_de_abertura(tag, d)
        if opaco:
            self.opaco += 1
        self.pilha.append((tag, opaco, m.group(1) if m else tag))

    def handle_startendtag(self, tag, attrs):
        self._descarrega()
        d = {k.lower(): (v or "") for k, v in attrs}
        self._tag_de_abertura(tag, d)

    def _tag_de_abertura(self, tag, d: dict):
        raw = self.get_starttag_text() or ""

        if tag == "html":
            raw = _troca_atributo(raw, "lang", "en")
            if "lang" not in d:
                raw = re.sub(r"^<html", '<html lang="en"', raw, count=1, flags=re.I)

        elif tag == "meta":
            raw = self._meta(raw, d)

        elif tag == "link":
            rel = d.get("rel", "").lower()
            if rel == "alternate" and "hreflang" in d:
                return  # o trio é reinjetado inteiro antes de `</head>`
            if rel == "canonical":
                self.canonical_visto = True
                raw = _troca_atributo(raw, "href", f"{SITE}{self.route_en}")
            else:
                raw = self._reescreve_rotas(raw, d)

        elif tag == "script" and d.get("type", "").lower() == "application/ld+json":
            self.jsonld = True
            self._buffer_jsonld = []
            self._emite(raw)
            return

        elif tag == "script" and not d.get("src"):
            self.script_inline = True

        else:
            raw = self._reescreve_rotas(raw, d)

        for attr in ATRIBUTOS_TRADUZIVEIS:
            if d.get(attr) and self.engine:
                raw = _troca_atributo(raw, attr, self.engine.translate(d[attr]))

        self._emite(raw)

    def _reescreve_rotas(self, raw: str, d: dict) -> str:
        for attr in ATRIBUTOS_DE_ROTA:
            valor = d.get(attr)
            if valor:
                novo = self._rota(valor)
                if novo != valor:
                    raw = _troca_atributo(raw, attr, novo)
        return raw

    def _meta(self, raw: str, d: dict) -> str:
        chave = (d.get("name") or d.get("property") or "").lower()
        conteudo = d.get("content", "")
        if not conteudo:
            return raw
        if chave in META_DE_ROTA:
            return _troca_atributo(raw, "content", self._rota(conteudo))
        if chave == "og:locale":
            return _troca_atributo(raw, "content", "en_US")
        if chave in META_TRADUZIVEL:
            return _troca_atributo(raw, "content", self.engine.translate(conteudo))
        return raw

    def _reescreve_modulos(self, corpo: str) -> str:
        return _ESPECIFICADOR.sub(
            lambda m: f"{m.group(1)}{m.group(2)}{self._rota(m.group(3))}{m.group(2)}",
            corpo,
        )

    def handle_endtag(self, tag):
        self._descarrega()
        if tag == "script":
            self.script_inline = False
        if self.jsonld and tag == "script":
            self._emite(translate_jsonld("".join(self._buffer_jsonld), self.engine, self.route_en))
            self.jsonld = False
            self._emite(f"</{tag}>")
            return

        if tag == "head" and not self.hreflang_injetado:
            # Só uma vez: um `</head>` duplicado numa página mal formada não
            # pode render dois trios de hreflang — o Google descarta ambos.
            self.hreflang_injetado = True
            self._emite(self._bloco_hreflang())

        # HTML real tem tag de fechamento solta e elemento não fechado.
        # Só desempilha se o par existir; caso contrário ignora o fechamento.
        nome = tag
        if any(t == tag for t, _, _ in self.pilha):
            while self.pilha:
                topo, era_opaco, original = self.pilha.pop()
                if era_opaco:
                    self.opaco = max(0, self.opaco - 1)
                if topo == tag:
                    nome = original
                    break

        self._emite(f"</{nome}>")

    def _bloco_hreflang(self) -> str:
        """
        Reciprocidade `hreflang` + canonical autorreferencial.

        Reinjetado inteiro (em vez de editado no lugar) porque o trio precisa
        ser consistente entre as duas línguas: um `hreflang` que aponta para
        uma página que não devolve o link de volta é ignorado pelo Google.
        """
        linhas = []
        if not self.canonical_visto:
            linhas.append(f'    <link rel="canonical" href="{SITE}{self.route_en}" />')
        linhas += [
            f'    <link rel="alternate" hreflang="pt-BR" href="{SITE}{self.route_pt}" />',
            f'    <link rel="alternate" hreflang="en" href="{SITE}{self.route_en}" />',
            f'    <link rel="alternate" hreflang="x-default" href="{SITE}{self.route_pt}" />',
        ]
        return "\n" + "\n".join(linhas) + "\n"

    # -- conteúdo ----------------------------------------------------------
    def handle_data(self, data):
        if self.jsonld:
            self._buffer_jsonld.append(data)
            return
        self._texto.append((data, False))

    def handle_entityref(self, name):
        self._texto.append((f"&{name};", True))

    def handle_charref(self, name):
        self._texto.append((f"&#{name};", True))

    def _descarrega(self) -> None:
        """Resolve o texto acumulado desde a última tag."""
        if not self._texto:
            return
        pecas, self._texto = self._texto, []
        cru = "".join(t for t, _ in pecas)
        pai = self.pilha[-1][0] if self.pilha else ""

        if pai in CDATA:
            # `<script>`/`<style>` são CDATA: nada foi decodificado e nada pode
            # ser reescapado — `a && b` viraria `a &amp;&amp; b`.
            self._emite(self._reescreve_modulos(cru) if self.script_inline else cru)
            return

        if self._dentro_de_opaco() or pai in SEM_TEXTO or not cru.strip():
            self._emite(cru)  # byte a byte, entidades inclusive
            return

        # Entidade é opaca para o modelo: vira marcador e volta idêntica.
        from engine import slot as _slot

        partes, slots = [], []
        for texto, e_entidade in pecas:
            if e_entidade:
                slots.append(texto)
                partes.append(_slot(len(slots) - 1))
            else:
                partes.append(texto)
        template = "".join(partes)
        traduzido = (
            self.engine.translate_with_slots(template, slots)
            if slots
            else self.engine.translate(template)
        )
        self._emite(_escapa_saida(traduzido))

    def handle_comment(self, data):
        self._descarrega()
        self._emite(f"<!--{data}-->")

    def handle_decl(self, decl):
        self._descarrega()
        self._emite(f"<!{decl}>")

    def unknown_decl(self, data):
        self._descarrega()
        self._emite(f"<![{data}]>")

    def handle_pi(self, data):
        self._descarrega()
        self._emite(f"<?{data}>")


def translate_html(texto: str, engine, route_pt: str, route_en: str) -> str:
    p = TradutorHTML(engine, route_pt, route_en)
    p.feed(texto)
    p.close()
    p._descarrega()  # texto após a última tag
    return "".join(p.saida)
