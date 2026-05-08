/**
 * Cookie Consent — LGPD/GDPR/ANPD com Google Consent Mode v2
 * Especificação: docs/specs/pages/LEGAL_PAGES.md
 *
 * Como usar:
 *   <script type="module" src="./js/cookie-consent.js"></script>
 *   antes de qualquer carregamento de GTM/GA4.
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
.cc-banner, .cc-modal-backdrop, .cc-fab {
    font-family: 'Inter', system-ui, sans-serif;
    color: #c9d1d9;
    box-sizing: border-box;
}
.cc-banner *, .cc-modal *, .cc-fab * { box-sizing: border-box; }

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
.cc-btn {
    padding: 10px 18px; border-radius: 6px; cursor: pointer; font-weight: 600;
    border: 1px solid transparent; font-size: .9rem;
    transition: transform .15s ease, box-shadow .15s ease, background .15s ease;
    font-family: inherit;
}
.cc-btn:hover { transform: translateY(-1px); }
.cc-btn-accept { background: linear-gradient(90deg,#007bff,#8a2be2); color:#fff; }
.cc-btn-accept:hover { box-shadow: 0 4px 14px rgba(0,123,255,0.4); }
.cc-btn-reject { background: #21262d; color:#c9d1d9; border-color:#30363d; }
.cc-btn-reject:hover { background: #2d333b; }
.cc-btn-customize { background: transparent; color:#60a5fa; border-color:#60a5fa; }
.cc-btn-customize:hover { background: rgba(96,165,250,0.1); }

.cc-modal-backdrop {
    position: fixed; inset: 0; background: rgba(0,0,0,0.7);
    z-index: 99999; display: flex; align-items: center; justify-content: center;
    padding: 20px; backdrop-filter: blur(4px);
}
.cc-modal {
    background: #0d1117; border: 1px solid #30363d; border-radius: 12px;
    max-width: 560px; width: 100%; max-height: 90vh; overflow-y: auto;
    padding: 32px;
}
.cc-modal h2 { margin: 0 0 8px; color:#fff; font-size: 1.4rem; font-weight: 700; }
.cc-modal p.cc-lead { font-size: .9rem; color: #8b949e; margin: 0 0 20px; }
.cc-cat { padding: 14px 0; border-top: 1px solid #30363d; }
.cc-cat-head { display: flex; justify-content: space-between; align-items: center; gap: 12px; }
.cc-cat-name { color:#fff; font-weight: 600; font-size: .95rem; }
.cc-cat-desc { font-size: .85rem; color:#8b949e; margin-top: 4px; line-height: 1.5; }
.cc-toggle { position: relative; width: 44px; height: 24px; background:#30363d; border-radius: 12px; cursor: pointer; transition: background .2s ease; flex: 0 0 auto; }
.cc-toggle::after { content:''; position: absolute; top: 2px; left: 2px; width: 20px; height: 20px; background:#fff; border-radius: 50%; transition: transform .2s ease; }
.cc-toggle.on { background: linear-gradient(90deg,#007bff,#8a2be2); }
.cc-toggle.on::after { transform: translateX(20px); }
.cc-toggle.locked { opacity: .6; cursor: not-allowed; }
.cc-modal-actions { display: flex; gap: 10px; margin-top: 24px; flex-wrap: wrap; justify-content: flex-end; }

.cc-fab {
    position: fixed; bottom: 16px; left: 16px; z-index: 99997;
    width: 44px; height: 44px; border-radius: 50%;
    background: #161b22; border: 1px solid #30363d; color:#c9d1d9;
    cursor: pointer; display: flex; align-items: center; justify-content: center;
    font-size: 18px; transition: transform .15s ease, box-shadow .15s ease;
}
.cc-fab:hover { transform: scale(1.05); box-shadow: 0 4px 12px rgba(0,123,255,0.3); }
.cc-sr-only { position: absolute; width:1px; height:1px; padding:0; margin:-1px; overflow:hidden; clip:rect(0,0,0,0); border:0; }

@media (max-width: 640px) {
    .cc-banner-inner { flex-direction: column; align-items: stretch; }
    .cc-actions { justify-content: stretch; }
    .cc-actions .cc-btn { flex: 1 1 100%; }
}
`;
    document.head.appendChild(style);
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
    const cats = { ...initial };
    const backdrop = document.createElement('div');
    backdrop.className = 'cc-modal-backdrop';
    backdrop.setAttribute('role', 'dialog');
    backdrop.setAttribute('aria-modal', 'true');
    backdrop.setAttribute('aria-labelledby', 'cc-modal-title');

    const definitions = [
        { key: 'necessary', label: 'Estritamente necessários', desc: 'Essenciais para o funcionamento do site, navegação e segurança. Não podem ser desativados.', locked: true },
        { key: 'analytics', label: 'Análise e desempenho', desc: 'Cookies que nos ajudam a entender como você usa o site (Google Analytics 4) de forma agregada.' },
        { key: 'marketing', label: 'Marketing e publicidade', desc: 'Usados para mensurar campanhas e mostrar conteúdos mais relevantes (Meta Pixel, Google Ads).' },
        { key: 'personalization', label: 'Personalização', desc: 'Permitem lembrar suas preferências para uma experiência mais sob medida.' }
    ];

    backdrop.innerHTML = `
        <div class="cc-modal">
            <h2 id="cc-modal-title">Preferências de cookies</h2>
            <p class="cc-lead">Você está no controle. Ative ou desative cada categoria. Suas escolhas valem para todo o domínio.</p>
            ${definitions.map(d => `
                <div class="cc-cat">
                    <div class="cc-cat-head">
                        <div>
                            <div class="cc-cat-name">${d.label}</div>
                            <div class="cc-cat-desc">${d.desc}</div>
                        </div>
                        <button type="button"
                            class="cc-toggle ${cats[d.key] ? 'on' : ''} ${d.locked ? 'locked' : ''}"
                            data-cat="${d.key}"
                            aria-label="Ativar ${d.label}"
                            aria-pressed="${cats[d.key] ? 'true' : 'false'}"
                            ${d.locked ? 'aria-disabled="true"' : ''}>
                            <span class="cc-sr-only">${cats[d.key] ? 'Ativo' : 'Inativo'}</span>
                        </button>
                    </div>
                </div>
            `).join('')}
            <div class="cc-modal-actions">
                <button type="button" class="cc-btn cc-btn-reject" data-cc="cancel">Cancelar</button>
                <button type="button" class="cc-btn cc-btn-accept" data-cc="save">Salvar preferências</button>
            </div>
        </div>`;

    backdrop.querySelectorAll('.cc-toggle').forEach(btn => {
        btn.addEventListener('click', () => {
            if (btn.classList.contains('locked')) return;
            const key = btn.dataset.cat;
            cats[key] = !cats[key];
            btn.classList.toggle('on', cats[key]);
            btn.setAttribute('aria-pressed', cats[key] ? 'true' : 'false');
        });
    });

    backdrop.querySelector('[data-cc="cancel"]').addEventListener('click', () => backdrop.remove());
    backdrop.querySelector('[data-cc="save"]').addEventListener('click', () => {
        onSave(cats);
        backdrop.remove();
    });
    backdrop.addEventListener('click', e => { if (e.target === backdrop) backdrop.remove(); });
    document.addEventListener('keydown', function escListener(e) {
        if (e.key === 'Escape') { backdrop.remove(); document.removeEventListener('keydown', escListener); }
    });
    return backdrop;
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

    const fab = buildFab(() => {
        const current = (loadStored() || {}).categories || { necessary: true, analytics: false, marketing: false, personalization: false };
        document.body.appendChild(buildModal(current, save));
    });
    document.body.appendChild(fab);

    function showBanner() {
        if (banner) return;
        banner = buildBanner(
            () => save({ necessary: true, analytics: true, marketing: true, personalization: true }),
            () => save({ necessary: true, analytics: false, marketing: false, personalization: false }),
            () => {
                const current = (loadStored() || {}).categories || { necessary: true, analytics: false, marketing: false, personalization: false };
                document.body.appendChild(buildModal(current, save));
            }
        );
        document.body.appendChild(banner);
    }

    function save(categories) {
        const method = isGPCEnabled() ? 'gpc' : 'explicit';
        persist(categories, method);
        applyConsent(categories);
        if (banner) { banner.remove(); banner = null; }
    }

    if (stored) {
        applyConsent(stored.categories);
    } else if (isGPCEnabled()) {
        save({ necessary: true, analytics: false, marketing: false, personalization: false });
    } else {
        showBanner();
    }

    window.cookieConsent = {
        open: () => {
            const current = (loadStored() || {}).categories || { necessary: true, analytics: false, marketing: false, personalization: false };
            document.body.appendChild(buildModal(current, save));
        },
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
