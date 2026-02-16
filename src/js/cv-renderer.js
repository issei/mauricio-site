
// Lógica de Renderização do CV

export function initCVRenderer(cvUrl) {
    let profileData;

    document.addEventListener('DOMContentLoaded', () => {
        console.log(`🔄 Carregando dados de: ${cvUrl}`);

        fetch(cvUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                profileData = data;
                console.log('✅ Dados carregados com sucesso!');
                renderAll(profileData);

                // Expor função globalmente para o onclick do botão
                window.openModal = function (triggerElement, index) {
                    openModal(triggerElement, index, profileData);
                };
                window.closeModal = closeModal;
            })
            .catch(error => {
                console.error('❌ Erro ao carregar dados:', error);

                // Fallback para arquivo local
                if (cvUrl !== './cv.json') {
                    console.log('🔄 Tentando fallback para cv.json local...');
                    fetch('./cv.json')
                        .then(response => response.json())
                        .then(data => {
                            profileData = data;
                            console.log('✅ Dados locais carregados com sucesso!');
                            renderAll(profileData);

                            // Expor função globalmente para o onclick do botão
                            window.openModal = function (triggerElement, index) {
                                openModal(triggerElement, index, profileData);
                            };
                            window.closeModal = closeModal;
                        })
                        .catch(err => {
                            console.error('❌ Erro no fallback:', err);
                            alert('Erro ao carregar dados do currículo. Recarregue a página.');
                        });
                } else {
                    alert('Erro ao carregar dados do currículo. Recarregue a página.');
                }
            });
    });
}

function renderAll(data) {
    renderHero(data);
    renderAbout(data);
    renderSkills(data);
    renderExperience(data);
    renderProjects(data);
    renderEducation(data);
    renderCertifications(data);
    renderCourses(data);
    renderRecommendations(data);
    renderContact(data);
    updateFooterYear();
    setupMobileMenu();
    setupScrollAnimations();
    setupModalEvents();
}

// --- Funções de Renderização Específicas ---

function renderHero(data) {
    const container = document.getElementById('hero-content');
    if (!container) return;

    container.innerHTML = `
        <h1 class="text-5xl md:text-7xl font-extrabold mb-4 leading-tight">
            ${data.Nome}
        </h1>
        <p class="text-2xl md:text-4xl font-light mb-8 text-blue-300">
            ${data.Titulo}
        </p>
        <p class="text-lg md:text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
            ${data.ResumoHero}
        </p>
        <div class="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <a href="#projects" class="btn-primary inline-block">Ver Projetos</a>
            <a href="${data.Contato.LinkedIn}" target="_blank" class="btn-secondary inline-block">Conectar no LinkedIn</a>
        </div>
    `;
}

function renderAbout(data) {
    const container = document.getElementById('about-content');
    if (!container) return;
    container.innerHTML = data.Resumo.map(p => `<p class="mb-4">${p}</p>`).join('');
}

function renderSkills(data) {
    const container = document.getElementById('skills-container');
    if (!container) return;
    container.innerHTML = '';

    for (const category in data.Habilidades) {
        const categoryDiv = document.createElement('div');
        categoryDiv.className = 'bg-gray-900 p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 border border-gray-700';
        categoryDiv.innerHTML = `
            <h3 class="text-xl font-semibold text-blue-300 mb-4">${category.replace(/_/g, ' ')}</h3>
            <div class="flex flex-wrap gap-2">
                ${data.Habilidades[category].map(skill => `
                    <span class="bg-gray-700 text-gray-200 text-sm px-3 py-1 rounded-full hover:bg-blue-600 hover:text-white transition-colors duration-200 cursor-default">
                        ${skill}
                    </span>
                `).join('')}
            </div>
        `;
        container.appendChild(categoryDiv);
    }
}

function renderExperience(data) {
    const container = document.getElementById('experience-container');
    if (!container) return;
    container.innerHTML = '';

    data.Experiencia.forEach(exp => {
        const expDiv = document.createElement('div');
        expDiv.className = 'relative mb-10 pl-12 md:pl-16 timeline-item';
        expDiv.innerHTML = `
            <div class="timeline-dot absolute left-[-8px] top-1 transform -translate-x-1/2"></div>
            <div class="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700 hover:border-blue-500 transition-colors duration-300">
                <h3 class="text-2xl font-bold text-white">${exp.Cargo}</h3>
                <p class="text-lg font-semibold text-blue-400 mb-1">${exp.Empresa}</p>
                <p class="text-gray-400 text-sm mb-3">${exp.Periodo} &bull; ${exp.Local}</p>
                <p class="text-gray-300 mb-4">${exp.Descricao}</p>
                
                ${exp.Resultados && exp.Resultados.length > 0 ? `
                    <h4 class="text-md font-semibold text-gray-200 mt-4 mb-2">Principais Resultados:</h4>
                    <ul class="list-disc list-inside text-gray-400 text-sm pl-4 space-y-1">
                        ${exp.Resultados.map(res => `<li>${res}</li>`).join('')}
                    </ul>
                ` : ''}

                ${exp.Principais_Projetos && exp.Principais_Projetos.length > 0 ? `
                    <h4 class="text-md font-semibold text-gray-200 mt-4 mb-2">Principais Projetos:</h4>
                    <ul class="list-disc list-inside text-gray-400 text-sm pl-4 space-y-1">
                        ${exp.Principais_Projetos.map(proj => `<li>${proj}</li>`).join('')}
                    </ul>
                ` : ''}
                
                ${exp.Competencias && exp.Competencias.length > 0 ? `
                    <div class="flex flex-wrap gap-2 mt-4">
                        ${exp.Competencias.map(comp => `
                            <span class="bg-blue-900/50 text-blue-300 text-xs font-medium px-2.5 py-1 rounded-full border border-blue-700">
                                ${comp}
                            </span>
                        `).join('')}
                    </div>
                ` : ''}
            </div>
        `;
        container.appendChild(expDiv);
    });
}

function renderProjects(data) {
    const container = document.getElementById('projects-container');
    if (!container) return;
    container.innerHTML = '';

    data.Projetos.forEach((project, index) => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card bg-gray-700 p-6 rounded-lg shadow-md flex flex-col justify-between h-full';

        // Note: onclick calls window.openModal defined in init
        projectCard.innerHTML = `
            <div>
                <h3 class="text-xl font-semibold text-white mb-2">${project.Nome}</h3>
                <p class="text-blue-300 text-sm mb-2">${project.Empresa} (${project.Periodo})</p>
                <p class="text-gray-300 text-sm mb-4">${(project.Situacao || 'Clique para ver detalhes.').substring(0, 120)}...</p>
            </div>
            <button onclick="openModal(this, ${index})" class="btn-secondary mt-4 self-start">Saiba Mais</button>
        `;
        container.appendChild(projectCard);
    });
}

function renderEducation(data) {
    const container = document.getElementById('education-container');
    if (!container) return;
    container.innerHTML = '';

    data.Formacao_Academica.forEach(edu => {
        const eduDiv = document.createElement('div');
        eduDiv.className = 'bg-gray-800 p-6 rounded-lg shadow-md border border-gray-700';
        eduDiv.innerHTML = `
            <h4 class="text-xl font-semibold text-white">${edu.Curso}</h4>
            <p class="text-blue-300 text-md mb-2">${edu.Instituicao}</p>
            <p class="text-gray-400 text-sm">${edu.Periodo || edu.Ano}</p>
            ${edu.Diploma_Digital_Codigo ? `<p class="text-gray-500 text-xs mt-2">Código do Diploma: <span class="font-mono">${edu.Diploma_Digital_Codigo}</span></p>` : ''}
            ${edu.Verificacao ? `<a href="${edu.Verificacao}" target="_blank" class="text-blue-400 hover:underline text-sm mt-2 self-start">Ver Assinatura <i class="fa-solid fa-arrow-up-right-from-square text-xs"></i></a>` : ''}
        `;
        container.appendChild(eduDiv);
    });
}

function renderCertifications(data) {
    const container = document.getElementById('certifications-container');
    if (!container) return;
    container.innerHTML = '';

    data.Certificados.forEach(cert => {
        const certDiv = document.createElement('div');
        certDiv.className = 'bg-gray-700 p-4 rounded-lg shadow-md flex flex-col justify-between h-full';
        certDiv.innerHTML = `
            <div>
                <h4 class="text-md font-semibold text-white">${cert.Nome}</h4>
                <p class="text-blue-300 text-sm">${cert.Instituicao}</p>
                <p class="text-gray-400 text-xs mb-2">Emitido em: ${cert.Data_Emissao || cert.Ano || cert.Periodo}</p>
            </div>
            ${cert.Verificacao ? `<a href="${cert.Verificacao}" target="_blank" class="text-blue-400 hover:underline text-sm mt-2 self-start">Ver Credencial <i class="fa-solid fa-arrow-up-right-from-square text-xs"></i></a>` : ''}
        `;
        container.appendChild(certDiv);
    });
}

function renderCourses(data) {
    const container = document.getElementById('courses-container');
    if (!container) return;
    container.innerHTML = '';

    for (const category in data.Cursos_Alura) {
        const categoryDiv = document.createElement('div');
        categoryDiv.className = 'bg-gray-900 p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 border border-gray-700';
        categoryDiv.innerHTML = `
            <h3 class="text-xl font-semibold text-blue-300 mb-4">${category.replace(/_/g, ' ')}</h3>
            <ul class="space-y-2">
                ${data.Cursos_Alura[category].map(course => `
                    <li class="text-gray-300 text-sm flex items-start">
                        <i class="fa-solid fa-check-circle text-green-500 mr-2 mt-1"></i>
                        <span>${course}</span>
                    </li>
                `).join('')}
            </ul>
        `;
        container.appendChild(categoryDiv);
    }
}

function renderRecommendations(data) {
    const container = document.getElementById('recommendations-container');
    if (!container) return;
    container.innerHTML = '';

    data.Recomendacoes_Recebidas.forEach(rec => {
        const recDiv = document.createElement('div');
        recDiv.className = 'bg-gray-700 p-6 rounded-lg shadow-md';
        recDiv.innerHTML = `
            <p class="text-gray-300 italic mb-4">"${rec.Recomendacao}"</p>
            <p class="text-white font-semibold">${rec.Autor}</p>
            <p class="text-blue-300 text-sm">${rec.Cargo}</p>
            <p class="text-gray-400 text-xs mt-1">${rec.Data_Trabalho}</p>
        `;
        container.appendChild(recDiv);
    });
}

function renderContact(data) {
    const container = document.getElementById('contact-container');
    if (!container) return;

    container.innerHTML = `
        <p class="text-lg text-gray-300 mb-8">Estou sempre aberto a novas oportunidades e colaborações. Sinta-se à vontade para entrar em contato!</p>
        <div class="flex flex-col items-center space-y-6">
            <a href="mailto:${data.Contato.Email}" class="btn-primary inline-flex items-center space-x-3 text-lg">
                <i class="fa-solid fa-envelope"></i>
                <span>${data.Contato.Email}</span>
            </a>
            <a href="${data.Contato.LinkedIn}" target="_blank" class="btn-secondary inline-flex items-center space-x-3 text-lg">
                <i class="fa-brands fa-linkedin"></i>
                <span>LinkedIn/${data.Contato.LinkedInUser}</span>
            </a>
            <a href="${data.Contato.youtube}" target="_blank" class="btn-secondary inline-flex items-center space-x-3 text-lg">
                <i class="fa-brands fa-youtube"></i>
                <span>Youtube/@MauricioIssei</span>
            </a>
        </div>
    `;
}

function updateFooterYear() {
    const el = document.getElementById('current-year');
    if (el) el.textContent = new Date().getFullYear();
}

// --- Funções Auxiliares de UI ---

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

// --- Funções do Modal ---

let lastFocusedElement;
const projectModal = document.getElementById('project-modal');

function setupModalEvents() {
    // Configurar eventos globais do modal (clicar fora, esc)
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

function openModal(triggerElement, index, data) {
    if (!projectModal) return;

    lastFocusedElement = triggerElement;

    const project = data.Projetos[index];
    const modalTitle = document.getElementById('modal-project-name');
    modalTitle.textContent = project.Nome;
    document.getElementById('modal-project-period').textContent = project.Periodo;
    document.getElementById('modal-project-company').textContent = project.Empresa;

    const starDetails = document.getElementById('modal-project-star-details');
    if (project.Situacao && project.Situacao !== "N/A") {
        starDetails.style.display = 'block';
        document.getElementById('modal-project-situacao').innerHTML = project.Situacao;

        const tarefasUl = document.getElementById('modal-project-tarefas');
        tarefasUl.innerHTML = '';
        if (Array.isArray(project.Tarefas)) project.Tarefas.forEach(task => tarefasUl.innerHTML += `<li>${task}</li>`);

        const acoesUl = document.getElementById('modal-project-acoes');
        acoesUl.innerHTML = '';
        if (Array.isArray(project.Acoes)) project.Acoes.forEach(action => acoesUl.innerHTML += `<li>${action}</li>`);

        const resultadosUl = document.getElementById('modal-project-resultados');
        resultadosUl.innerHTML = '';
        if (Array.isArray(project.Resultados)) project.Resultados.forEach(result => resultadosUl.innerHTML += `<li>${result}</li>`);

    } else {
        starDetails.style.display = 'none';
    }

    const techTitle = document.getElementById('modal-project-tech-title');
    const techContainer = document.getElementById('modal-project-technologies');

    if (project.Tecnologias && project.Tecnologias.length > 0) {
        techTitle.style.display = 'block';
        techContainer.innerHTML = project.Tecnologias.map(tech => `
            <span class="bg-gray-600 text-gray-200 text-sm px-3 py-1 rounded-full">
                ${tech}
            </span>
        `).join('');
    } else {
        techTitle.style.display = 'none';
        techContainer.innerHTML = '';
    }

    projectModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    modalTitle.focus();
}

function closeModal() {
    if (!projectModal) return;
    projectModal.style.display = 'none';
    document.body.style.overflow = 'auto';
    if (lastFocusedElement) {
        lastFocusedElement.focus();
    }
}
