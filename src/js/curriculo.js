// Comportamento da página /curriculo (antiga home).
//
// O conteúdo do currículo NÃO é montado aqui: scripts/gen-portfolio.mjs grava
// tudo no HTML em build-time a partir de public/cv.json. Este módulo só cuida
// de menu mobile, revelação ao rolar e do modal de projeto — que apenas COPIA
// para o modal o bloco STAR já presente no card ([data-star]).

let lastFocusedElement;
const projectModal = document.getElementById('project-modal');

setupMobileMenu();
setupScrollAnimations();
setupModalEvents();
window.openModal = openModal;
window.closeModal = closeModal;

function setupMobileMenu() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (!mobileMenuButton || !mobileMenu) return;

    mobileMenuButton.addEventListener('click', () => {
        const isExpanded = mobileMenu.classList.toggle('hidden');
        mobileMenuButton.setAttribute('aria-expanded', !isExpanded);
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            mobileMenuButton.setAttribute('aria-expanded', 'false');
        });
    });
}

function setupScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, {
        threshold: 0.1
    });

    document.querySelectorAll('.animate-on-scroll').forEach(section => {
        observer.observe(section);
    });
}

// --- Modal ---

function setupModalEvents() {
    window.onclick = function (event) {
        if (event.target == projectModal) {
            closeModal();
        }
    }

    document.addEventListener('keydown', function (event) {
        if (event.key === "Escape") {
            closeModal();
        }
    });
}

function openModal(triggerElement) {
    const star = triggerElement.closest('.project-card')?.querySelector('[data-star]');
    if (!projectModal || !star) return;

    lastFocusedElement = triggerElement;

    // Cada campo do modal recebe o nó homônimo já renderizado no card.
    const field = (name) => star.querySelector(`[data-f="${name}"]`);
    for (const name of ['name', 'period', 'company', 'situacao', 'tarefas', 'acoes', 'resultados', 'technologies']) {
        document.getElementById(`modal-project-${name}`).innerHTML = field(name)?.innerHTML ?? '';
    }
    document.getElementById('modal-project-star-details').style.display = field('situacao') ? 'block' : 'none';
    document.getElementById('modal-project-tech-title').style.display = field('technologies') ? 'block' : 'none';

    projectModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    document.getElementById('modal-project-name').focus();
}

function closeModal() {
    if (!projectModal) return;
    projectModal.style.display = 'none';
    document.body.style.overflow = 'auto';
    if (lastFocusedElement) {
        lastFocusedElement.focus();
    }
}
