"""
Motor de tradução local — Argos Translate (NMT open-source, custo zero de token).

Nenhuma chamada de API de LLM acontece aqui. O modelo `pt → en` roda na CPU da
própria máquina de build, via CTranslate2. O preço disso é latência: por isso
todo segmento traduzido é memorizado em disco (`.cache/segments.json`), e uma
segunda passada sobre um arquivo pouco alterado custa quase nada.

Dois motores implementam a mesma interface:

  * `ArgosEngine`   — tradução real; exige o pacote `argostranslate` e o modelo
                      `translate-pt_en` instalado.
  * `IdentityEngine`— devolve o texto intacto. É o que permite testar TODA a
                      camada estrutural (lang, hreflang, canonical, preservação
                      de código, reescrita de links) num CI sem baixar 5 GB de
                      modelo. Estrutura é o que quebra; texto não.

## Marcadores (placeholders)

Trechos que não podem ser traduzidos — código inline, URLs, tags HTML — são
trocados por um marcador antes de irem ao modelo, e restaurados depois. Um
modelo NMT, porém, não tem obrigação nenhuma de copiar o marcador intacto: ele
pode duplicá-lo, apagá-lo ou traduzi-lo.

Então a integridade da estrutura **não depende do comportamento do modelo**:
`translate_with_slots` confere os marcadores na saída e, se algum se perdeu,
cai para o caminho determinístico — traduzir cada trecho de texto isolado e
remontar. Perde-se contexto de frase; não se perde a sintaxe do arquivo.
"""

from __future__ import annotations

import hashlib
import json
import os
import re
import sys
from pathlib import Path

CACHE_DIR = Path(__file__).resolve().parent / ".cache"
CACHE_FILE = CACHE_DIR / "segments.json"

FROM_CODE = "pt"
TO_CODE = "en"

#: Marcador com formato de palavra: subwords ASCII sobrevivem melhor a um
#: encoder NMT do que pontuação exótica. Ainda assim é conferido, nunca
#: presumido.
_SLOT = "zzph{}zz"
_SLOT_RE = re.compile(r"zzph(\d+)zz", re.IGNORECASE)

#: Texto sem letra alguma (número, pontuação, emoji) não vai ao modelo: não há
#: o que traduzir e a ida custa tempo.
_TEM_LETRA = re.compile(r"[^\W\d_]", re.UNICODE)


def slot(i: int) -> str:
    return _SLOT.format(i)


def has_translatable_text(text: str) -> bool:
    return bool(_TEM_LETRA.search(text))


class TranslationUnavailable(RuntimeError):
    """Argos ausente ou sem o modelo pt→en instalado."""


class BaseEngine:
    name = "base"

    def __init__(self) -> None:
        self.calls = 0
        self.cache_hits = 0
        self.fallbacks = 0

    # -- interface ---------------------------------------------------------
    def _translate_raw(self, text: str) -> str:  # pragma: no cover - abstrato
        raise NotImplementedError

    def translate(self, text: str) -> str:
        """Traduz um segmento preservando o espaço em branco das bordas."""
        if not text or not has_translatable_text(text):
            return text
        prefix = text[: len(text) - len(text.lstrip())]
        suffix = text[len(text.rstrip()) :]
        core = text.strip()
        if not core:
            return text
        return f"{prefix}{self._translate_cached(core)}{suffix}"

    def translate_with_slots(self, template: str, slots: list[str]) -> str:
        """
        Traduz `template` (que contém marcadores) e restaura `slots`.

        Devolve sempre uma string com os trechos protegidos no lugar certo, na
        ordem certa — se o modelo estragar os marcadores, o caminho de
        contingência assume.
        """
        if not slots:
            return self.translate(template)

        traduzido = self.translate(template)
        encontrados = [int(m.group(1)) for m in _SLOT_RE.finditer(traduzido)]
        if encontrados == list(range(len(slots))):
            return _SLOT_RE.sub(lambda m: slots[int(m.group(1))], traduzido)

        # Contingência determinística: o modelo perdeu, duplicou ou reordenou
        # marcadores. Traduz cada trecho de texto isolado e remonta na ordem
        # original — sintaxe intacta, contexto de frase sacrificado.
        self.fallbacks += 1
        partes: list[str] = []
        pos = 0
        for m in _SLOT_RE.finditer(template):
            partes.append(self.translate(template[pos : m.start()]))
            partes.append(slots[int(m.group(1))])
            pos = m.end()
        partes.append(self.translate(template[pos:]))
        return "".join(partes)

    # -- cache -------------------------------------------------------------
    def _translate_cached(self, core: str) -> str:
        key = f"{self.name}:{FROM_CODE}>{TO_CODE}:{core}"
        digest = hashlib.sha256(key.encode("utf-8")).hexdigest()
        cache = _load_cache()
        if digest in cache:
            self.cache_hits += 1
            return cache[digest]
        out = self._translate_raw(core)
        self.calls += 1
        cache[digest] = out
        _CACHE_DIRTY.add(True)
        return out


class IdentityEngine(BaseEngine):
    """Não traduz. Serve para exercitar a camada estrutural sem o modelo."""

    name = "identity"

    def _translate_raw(self, text: str) -> str:
        return text

    def _translate_cached(self, core: str) -> str:
        return core  # cachear identidade só encheria o arquivo


class ArgosEngine(BaseEngine):
    """Argos Translate rodando local, sem rede depois do modelo instalado."""

    name = "argos"

    def __init__(self) -> None:
        super().__init__()
        try:
            from argostranslate import package, translate  # noqa: F401
        except ImportError as exc:  # pragma: no cover - depende do ambiente
            raise TranslationUnavailable(
                "argostranslate não está instalado. Rode:\n"
                "  python3 -m venv .venv-i18n && . .venv-i18n/bin/activate\n"
                "  pip install -r scripts/i18n/requirements.txt\n"
                "  python3 scripts/i18n/translate.py --install-model"
            ) from exc

        from argostranslate import translate as argos_translate

        langs = {l.code: l for l in argos_translate.get_installed_languages()}
        origem, destino = langs.get(FROM_CODE), langs.get(TO_CODE)
        if not origem or not destino:
            raise TranslationUnavailable(
                f"modelo {FROM_CODE}→{TO_CODE} não instalado. Rode:\n"
                "  python3 scripts/i18n/translate.py --install-model"
            )
        self._translation = origem.get_translation(destino)
        if self._translation is None:
            raise TranslationUnavailable(
                f"nenhuma rota de tradução {FROM_CODE}→{TO_CODE} disponível."
            )

    def _translate_raw(self, text: str) -> str:
        return self._translation.translate(text)


class MockEngine(BaseEngine):
    """
    Só para teste: devolve o texto em CAIXA ALTA.

    O motor `identity` prova que a estrutura sobrevive, mas não prova QUAL
    texto foi mandado ao modelo — com ele, esquecer de proteger um bloco de
    código sai idêntico a protegê-lo. Aqui a diferença fica visível: o que foi
    traduzido está em maiúsculas, o que foi preservado não está.
    """

    name = "mock"

    def _translate_raw(self, text: str) -> str:
        return text.upper()

    def _translate_cached(self, core: str) -> str:
        return self._translate_raw(core)


class MangleEngine(BaseEngine):
    """
    Só para teste: apaga os marcadores, como um modelo NMT ruim faria.

    Existe para exercitar o caminho de contingência de `translate_with_slots`
    — o que garante que a sintaxe sobreviva mesmo quando o modelo não colabora.
    """

    name = "mangle"

    def _translate_raw(self, text: str) -> str:
        return _SLOT_RE.sub("", text)

    def _translate_cached(self, core: str) -> str:
        return self._translate_raw(core)


#: `mock` e `mangle` são motores de teste; não traduzem nada de útil.
MOTORES = {
    "argos": ArgosEngine,
    "identity": IdentityEngine,
    "mock": MockEngine,
    "mangle": MangleEngine,
}


def get_engine(name: str) -> BaseEngine:
    try:
        return MOTORES[name]()
    except KeyError:
        raise ValueError(f"motor desconhecido: {name!r}") from None


def install_model() -> str:
    """
    Baixa e instala o pacote `pt → en` do índice oficial do Argos.

    Passo de rede único e explícito — depois disso a tradução é 100% offline.
    """
    try:
        from argostranslate import package
    except ImportError as exc:
        raise TranslationUnavailable(
            "argostranslate não está instalado (pip install -r scripts/i18n/requirements.txt)."
        ) from exc

    package.update_package_index()
    candidatos = [
        p
        for p in package.get_available_packages()
        if p.from_code == FROM_CODE and p.to_code == TO_CODE
    ]
    if not candidatos:
        raise TranslationUnavailable(
            f"o índice do Argos não oferece {FROM_CODE}→{TO_CODE}."
        )
    caminho = candidatos[0].download()
    package.install_from_path(caminho)
    return str(caminho)


# -- persistência do cache -------------------------------------------------
_CACHE: dict[str, str] | None = None
_CACHE_DIRTY: set[bool] = set()


def _load_cache() -> dict[str, str]:
    global _CACHE
    if _CACHE is None:
        if os.environ.get("I18N_NO_CACHE"):
            _CACHE = {}
        elif CACHE_FILE.exists():
            try:
                _CACHE = json.loads(CACHE_FILE.read_text(encoding="utf-8"))
            except (json.JSONDecodeError, OSError):
                print("[i18n] cache ilegível; recomeçando", file=sys.stderr)
                _CACHE = {}
        else:
            _CACHE = {}
    return _CACHE


def flush_cache() -> None:
    if _CACHE is None or not _CACHE_DIRTY or os.environ.get("I18N_NO_CACHE"):
        return
    CACHE_DIR.mkdir(parents=True, exist_ok=True)
    tmp = CACHE_FILE.with_suffix(".json.tmp")
    tmp.write_text(
        json.dumps(_CACHE, ensure_ascii=False, indent=0, sort_keys=True),
        encoding="utf-8",
    )
    tmp.replace(CACHE_FILE)
    _CACHE_DIRTY.clear()
