/**
 * Cookie Consent — LGPD/GDPR/ANPD com Google Consent Mode v2
 * Especificação: docs/specs/pages/LEGAL_PAGES.md
 *
 * Como usar:
 *   <script type="module" src="./js/cookie-consent.js"></script>
 *   antes de qualquer carregamento de GTM/GA4.
 *
 * Acessibilidade (docs/a11y/references/guide-consent-banners.md, guide-modals.md):
 *   - banner = região NÃO-modal (`role=region`): não rouba o foco, reserva a própria altura
 *     no fim da página (WCAG 2.4.11) e é anunciado numa região viva;
 *   - preferências = `<dialog>` modal nativo: foco entra, Tab não escapa, Esc fecha e o foco
 *     volta a quem abriu (se esse gatilho sumiu, vai ao botão fixo);
 *   - categorias = checkbox nativo com aparência de chave (a escolha tem "Salvar", logo não é switch).
 */

const CONSENT_VERSION = '2.0';
const STORAGE_KEY = 'consent_v';
const COOKIE_PAGE = '/cookies.html';
const PRIVACY_PAGE = '/privacidade.html';

const DEFAULT_DENIED = {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: 'denied',
    functionality_storage: 'granted',
    security_storage: 'granted'
};

const REJECT_ALL = { necessary: true, analytics: false, marketing: false, personalization: false };

const CATEGORIES = [
    { key: 'necessary', label: 'Estritamente necessários', desc: 'Essenciais para o funcionamento do site, navegação e segurança. Não podem ser desativados.', locked: true },
    { key: 'analytics', label: 'Análise e desempenho', desc: 'Cookies que nos ajudam a entender como você usa o site (Google Analytics 4) de forma agregada.' },
    { key: 'marketing', label: 'Marketing e publicidade', desc: 'Usados para mensurar campanhas e mostrar conteúdos mais relevantes (Meta Pixel, Google Ads).' },
    { key: 'personalization', label: 'Personalização', desc: 'Permitem lembrar suas preferências para uma experiência mais sob medida.' }
];

function ensureGtag() {
    window.dataLayer = window.dataLayer || [];
    if (typeof window.gtag !== 'function') {
        window.gtag = function () { window.dataLayer.push(arguments); };
    }
}

function setConsentDefault() {
    ensureGtag();
    window.gtag('consent', 'default', {
        ...DEFAULT_DENIED,
        wait_for_update: 500
    });
}

function loadStored() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return null;
        const parsed = JSON.parse(raw);
        if (parsed.v !== CONSENT_VERSION) return null;
        return parsed;
    } catch {
        return null;
    }
}

function persist(categories, method) {
    const payload = {
        v: CONSENT_VERSION,
        ts: new Date().toISOString(),
        categories,
        method
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    return payload;
}

function applyConsent(categories) {
    ensureGtag();
    window.gtag('consent', 'update', {
        ad_storage: categories.marketing ? 'granted' : 'denied',
        ad_user_data: categories.marketing ? 'granted' : 'denied',
        ad_personalization: categories.personalization ? 'granted' : 'denied',
        analytics_storage: categories.analytics ? 'granted' : 'denied',
        functionality_storage: 'granted',
        security_storage: 'granted'
    });
    window.dataLayer.push({ event: 'consent_update', consent_categories: categories });
}

function isGPCEnabled() {
    return typeof navigator !== 'undefined' && navigator.globalPrivacyControl === true;
}

function injectStyles() {
    if (document.getElementById('cookie-consent-styles')) return;
    const style = document.createElement('style');
    style.id = 'cookie-consent-styles';
    style.textContent = `
.cc-banner, .cc-dialog, .cc-fab {
    font-family: 'Inter', system-ui, sans-serif;
    color: #c9d1d9;
    box-sizing: border-box;
}
.cc-banner *, .cc-dialog *, .cc-fab * { box-sizing: border-box; }

.cc-banner {
    position: fixed; left: 0; right: 0; bottom: 0;
    background: #161b22; border-top: 1px solid #30363d;
    padding: 20px 24px; z-index: 99998;
    box-shadow: 0 -8px 24px rgba(0,0,0,0.5);
    animation: cc-slide-up .3s ease-out;
}
@keyframes cc-slide-up { from { transform: translateY(100%); } to { transform: translateY(0); } }
.cc-banner-inner {
    max-width: 1200px; margin: 0 auto;
    display: flex; gap: 24px; align-items: center; flex-wrap: wrap;
}
.cc-banner-text { flex: 1 1 320px; font-size: .95rem; line-height: 1.6; }
.cc-banner-text strong { color: #fff; display: block; margin-bottom: 4px; font-size: 1rem; }
.cc-banner-text a { color: #60a5fa; text-decoration: underline; }
.cc-actions { display: flex; gap: 10px; flex-wrap: wrap; }
/* 44px de altura: botão de consentimento é ação principal, não link em linha (WCAG 2.5.8 + Regra da Casa). */
.cc-btn {
    min-height: 44px; padding: 10px 18px; border-radius: 6px; cursor: pointer; font-weight: 600;
    border: 1px solid transparent; font-size: .9rem;
    transition: transform .15s ease, box-shadow .15s ease, background .15s ease;
    font-family: inherit;
}
.cc-btn:hover { transform: translateY(-1px); }
.cc-btn-accept { background: linear-gradient(90deg,#007bff,#8a2be2); color:#fff; }
.cc-btn-accept:hover { box-shadow: 0 4px 14px rgba(0,123,255,0.4); }
/* Recusar tem o mesmo tamanho e peso de Aceitar; a borda sobe para 3:1+ (WCAG 1.4.11). */
.cc-btn-reject { background: #21262d; color:#fff; border-color:#6e7681; }
.cc-btn-reject:hover { background: #2d333b; }
.cc-btn-customize { background: transparent; color:#60a5fa; border-color:#60a5fa; }
.cc-btn-customize:hover { background: rgba(96,165,250,0.1); }
.cc-btn:focus-visible, .cc-toggle:focus-visible, .cc-fab:focus-visible,
.cc-banner-text a:focus-visible, .cc-dialog h2:focus-visible {
    outline: 2px solid #58a6ff; outline-offset: 2px;
}

/* <dialog> modal: o navegador cuida de foco, Esc, inert do fundo e retorno do foco. */
.cc-dialog {
    border: 0; padding: 0; background: transparent; color: inherit;
    width: min(560px, calc(100vw - 40px)); max-width: none; max-height: none; overflow: visible;
}
.cc-dialog::backdrop { background: rgba(0,0,0,0.7); backdrop-filter: blur(4px); }
.cc-modal {
    background: #0d1117; border: 1px solid #30363d; border-radius: 12px;
    max-height: 90vh; overflow-y: auto; padding: 32px;
}
.cc-modal h2 { margin: 0 0 8px; color:#fff; font-size: 1.4rem; font-weight: 700; }
.cc-modal p.cc-lead { font-size: .9rem; color: #8b949e; margin: 0 0 20px; }
.cc-cat { padding: 14px 0; border-top: 1px solid #30363d; }
.cc-cat-head { display: flex; justify-content: space-between; align-items: center; gap: 12px; }
.cc-cat-name { color:#fff; font-weight: 600; font-size: .95rem; }
.cc-cat-desc { font-size: .85rem; color:#8b949e; margin-top: 4px; line-height: 1.5; }
/* Checkbox nativo com aparência de chave: a escolha tem "Salvar", então não é switch (guide-form-controls). */
.cc-toggle {
    appearance: none; -webkit-appearance: none; margin: 0; flex: 0 0 auto;
    position: relative; width: 44px; height: 24px; border-radius: 12px; cursor: pointer;
    background: #6e7681; transition: background .2s ease;
}
.cc-toggle::before { content:''; position: absolute; top: 2px; left: 2px; width: 20px; height: 20px; background:#fff; border-radius: 50%; transition: transform .2s ease; }
.cc-toggle::after { content:''; position: absolute; inset: -10px 0; } /* área de toque de 44px sem mudar o desenho */
.cc-toggle:checked { background: linear-gradient(90deg,#007bff,#8a2be2); }
.cc-toggle:checked::before { transform: translateX(20px); }
.cc-toggle[aria-disabled="true"] { opacity: .6; cursor: not-allowed; }
.cc-modal-actions { display: flex; gap: 10px; margin-top: 24px; flex-wrap: wrap; justify-content: flex-end; }

.cc-fab {
    position: fixed; bottom: 16px; left: 16px; z-index: 99997;
    width: 44px; height: 44px; border-radius: 50%;
    background: #161b22; border: 1px solid #6e7681; color:#c9d1d9;
    cursor: pointer; display: flex; align-items: center; justify-content: center;
    font-size: 18px; transition: transform .15s ease, box-shadow .15s ease;
}
.cc-fab[hidden] { display: none; }
.cc-fab:hover { transform: scale(1.05); box-shadow: 0 4px 12px rgba(0,123,255,0.3); }
.cc-sr-only { position: absolute; width:1px; height:1px; padding:0; margin:-1px; overflow:hidden; clip:rect(0,0,0,0); border:0; }

@media (max-width: 640px) {
    .cc-banner-inner { flex-direction: column; align-items: stretch; }
    .cc-actions { justify-content: stretch; }
    .cc-actions .cc-btn { flex: 1 1 100%; }
}
@media (prefers-reduced-motion: reduce) {
    .cc-banner { animation: none; }
    .cc-btn, .cc-toggle, .cc-toggle::before, .cc-fab { transition: none; }
    .cc-btn:hover, .cc-fab:hover { transform: none; }
}
`;
    document.head.appendChild(style);
}

/**
 * Região viva única: anuncia o banner que entra tarde no DOM e a confirmação de "salvo".
 * Precisa existir ANTES do texto mudar — por isso é criada no init e preenchida depois.
 */
function announce(message) {
    const live = document.getElementById('cc-live');
    if (!live) return;
    live.textContent = '';
    setTimeout(() => { live.textContent = message; }, 50);
}

function buildBanner(onAccept, onReject, onCustomize) {
    const div = document.createElement('div');
    div.className = 'cc-banner';
    div.setAttribute('role', 'region');
    div.setAttribute('aria-label', 'Aviso de cookies');
    div.innerHTML = `
        <div class="cc-banner-inner">
            <div class="cc-banner-text">
                <strong>Sua privacidade importa</strong>
                Usamos cookies para analisar o tráfego e melhorar sua experiência, conforme a LGPD e o Guia de Cookies da ANPD.
                Você pode aceitar, recusar ou personalizar. Saiba mais em
                <a href="${COOKIE_PAGE}">Cookies</a> e <a href="${PRIVACY_PAGE}">Privacidade</a>.
            </div>
            <div class="cc-actions">
                <button type="button" class="cc-btn cc-btn-customize" data-cc="customize">Personalizar</button>
                <button type="button" class="cc-btn cc-btn-reject" data-cc="reject">Recusar todos</button>
                <button type="button" class="cc-btn cc-btn-accept" data-cc="accept">Aceitar todos</button>
            </div>
        </div>`;
    div.querySelector('[data-cc="accept"]').addEventListener('click', onAccept);
    div.querySelector('[data-cc="reject"]').addEventListener('click', onReject);
    div.querySelector('[data-cc="customize"]').addEventListener('click', onCustomize);
    return div;
}

function buildModal(initial, onSave) {
    const dialog = document.createElement('dialog');
    dialog.className = 'cc-dialog';
    dialog.setAttribute('aria-labelledby', 'cc-modal-title');

    dialog.innerHTML = `
        <div class="cc-modal">
            <h2 id="cc-modal-title" tabindex="-1">Preferências de cookies</h2>
            <p class="cc-lead">Você está no controle. Ative ou desative cada categoria. Suas escolhas valem para todo o domínio.</p>
            ${CATEGORIES.map(d => `
                <div class="cc-cat">
                    <div class="cc-cat-head">
                        <div>
                            <label class="cc-cat-name" for="cc-cat-${d.key}">${d.label}</label>
                            <div class="cc-cat-desc" id="cc-desc-${d.key}">${d.desc}</div>
                        </div>
                        <input type="checkbox" class="cc-toggle" id="cc-cat-${d.key}" data-cat="${d.key}"
                            aria-describedby="cc-desc-${d.key}"
                            ${initial[d.key] || d.locked ? 'checked' : ''}
                            ${d.locked ? 'aria-disabled="true"' : ''}>
                    </div>
                </div>
            `).join('')}
            <div class="cc-modal-actions">
                <button type="button" class="cc-btn cc-btn-reject" data-cc="cancel">Cancelar</button>
                <button type="button" class="cc-btn cc-btn-accept" data-cc="save">Salvar preferências</button>
            </div>
        </div>`;

    // "Estritamente necessários" fica focável (o leitor de tela o encontra e lê a descrição) mas não muda.
    dialog.querySelector('[aria-disabled="true"]').addEventListener('click', e => e.preventDefault());

    const close = () => dialog.close();
    dialog.querySelector('[data-cc="cancel"]').addEventListener('click', close);
    dialog.querySelector('[data-cc="save"]').addEventListener('click', () => {
        const cats = { necessary: true };
        dialog.querySelectorAll('.cc-toggle[data-cat]').forEach(box => { cats[box.dataset.cat] = box.checked; });
        onSave(cats);
        close();
    });
    // Clicar no fundo (::backdrop) tem o próprio <dialog> como alvo; o conteúdo ocupa todo o resto.
    dialog.addEventListener('click', e => { if (e.target === dialog) close(); });
    return dialog;
}

function buildFab(onClick) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'cc-fab';
    btn.setAttribute('aria-label', 'Preferências de cookies');
    btn.title = 'Preferências de cookies';
    btn.textContent = '🍪';
    btn.addEventListener('click', onClick);
    return btn;
}

function init() {
    setConsentDefault();
    injectStyles();

    const stored = loadStored();
    let banner = null;
    let bannerWatch = null;
    let bodyPaddingBefore = '';

    const live = document.createElement('div');
    live.id = 'cc-live';
    live.className = 'cc-sr-only';
    live.setAttribute('role', 'status');
    document.body.appendChild(live);

    const fab = buildFab(() => openPreferences());
    document.body.appendChild(fab);

    function openPreferences() {
        if (document.querySelector('dialog.cc-dialog')) return;
        const dialog = buildModal((loadStored() || {}).categories || REJECT_ALL, save);
        document.body.appendChild(dialog);
        dialog.addEventListener('close', () => {
            dialog.remove();
            // O navegador já devolveu o foco a quem abriu o diálogo. Se esse gatilho sumiu
            // (o banner se remove ao salvar), o foco cairia no <body>: leva ao botão fixo.
            if (!document.activeElement || document.activeElement === document.body) fab.focus();
        });
        dialog.showModal();
        dialog.querySelector('#cc-modal-title').focus(); // o leitor de tela lê "diálogo" + o título
    }

    function showBanner() {
        if (banner) return;
        banner = buildBanner(
            () => save({ necessary: true, analytics: true, marketing: true, personalization: true }),
            () => save(REJECT_ALL),
            openPreferences
        );
        document.body.appendChild(banner);
        // Faixa fixa no rodapé cobriria o último conteúdo focado (WCAG 2.4.11): reserva a altura dela.
        bodyPaddingBefore = document.body.style.paddingBottom;
        const basePadding = parseFloat(getComputedStyle(document.body).paddingBottom) || 0;
        // A mesma altura sobe o <eco-nav> (fixo no canto, z-index máximo): sem isso ele cobre Recusar/Aceitar.
        // O botão fixo de cookies fica atrás da faixa e some do foco enquanto ela existe.
        fab.hidden = true;
        bannerWatch = new ResizeObserver(() => {
            const h = banner.offsetHeight;
            document.body.style.paddingBottom = basePadding + h + 'px';
            document.documentElement.style.setProperty('--cc-banner-h', h + 'px');
        });
        bannerWatch.observe(banner);
        announce('Aviso de cookies. Você pode aceitar, recusar ou personalizar.');
    }

    function hideBanner() {
        if (!banner) return;
        bannerWatch.disconnect();
        document.body.style.paddingBottom = bodyPaddingBefore;
        document.documentElement.style.removeProperty('--cc-banner-h');
        fab.hidden = false;
        banner.remove();
        banner = null;
    }

    function save(categories) {
        const method = isGPCEnabled() ? 'gpc' : 'explicit';
        persist(categories, method);
        applyConsent(categories);
        hideBanner();
        announce('Preferências de cookies salvas.');
    }

    if (stored) {
        applyConsent(stored.categories);
    } else if (isGPCEnabled()) {
        save(REJECT_ALL);
    } else {
        showBanner();
    }

    window.cookieConsent = {
        open: openPreferences,
        reset: () => { localStorage.removeItem(STORAGE_KEY); location.reload(); },
        get: () => loadStored()
    };
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

export {};
