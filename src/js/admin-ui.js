
import { GitHubService } from './github-service.js';

// Estado da aplicação
const state = {
    token: null,
    owner: null,
    repo: null,
    cvData: null,
    originalSha: null,
    hasChanges: false,
    currentSection: 'info'
};

// Configuração do repositório GitHub
const REPO_CONFIG = {
    owner: 'issei',
    repo: 'curriculo',
    branch: 'main',
    filePath: 'cv.json'  // Arquivo na raiz do repositório
};

const githubService = new GitHubService();

// Elementos DOM
const dom = {
    loading: document.getElementById('loading-state'),
    error: document.getElementById('error-state'),
    errorMsg: document.getElementById('error-msg'),
    content: document.getElementById('content-area'),
    saveBtn: document.getElementById('save-btn'),
    statusIndicator: document.getElementById('status-indicator'),
    userAvatar: document.getElementById('user-avatar'),
    userLogin: document.getElementById('user-login'),
    logoutBtn: document.getElementById('logout-btn'),
    toast: document.getElementById('toast'),
    toastMsg: document.getElementById('toast-msg'),
    navLinks: document.querySelectorAll('.sidebar-link')
};

// Inicialização
document.addEventListener('DOMContentLoaded', async () => {
    checkAuth();
    setupEventListeners();
    await loadData();
});

function checkAuth() {
    state.token = sessionStorage.getItem('github_token');
    state.owner = sessionStorage.getItem('repo_owner');
    state.repo = sessionStorage.getItem('repo_name');

    const avatar = sessionStorage.getItem('user_avatar');
    const login = sessionStorage.getItem('user_login');

    if (!state.token || !state.owner || !state.repo) {
        window.location.href = 'admin.html';
        return;
    }

    if (avatar) dom.userAvatar.src = avatar;
    if (login) dom.userLogin.textContent = login;
}

function setupEventListeners() {
    // Logout
    dom.logoutBtn.addEventListener('click', () => {
        if (state.hasChanges && !confirm('Existem alterações não salvas. Deseja realmente sair?')) {
            return;
        }
        sessionStorage.clear();
        window.location.href = 'admin.html';
    });

    // Navegação
    dom.navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const section = link.getAttribute('data-section');
            switchSection(section);
        });
    });

    // Salvar
    dom.saveBtn.addEventListener('click', saveData);

    // Warn on close
    window.addEventListener('beforeunload', (e) => {
        if (state.hasChanges) {
            e.preventDefault();
            e.returnValue = '';
        }
    });
}

async function loadData() {
    try {
        const result = await githubService.getFile(
            state.token,
            REPO_CONFIG.owner,
            REPO_CONFIG.repo,
            REPO_CONFIG.filePath
        );
        state.cvData = result.content;
        state.originalSha = result.sha;

        renderAllSections();
        switchSection('info'); // Inicia na primeira seção

        dom.loading.classList.add('hidden');
        dom.content.classList.remove('hidden');
    } catch (error) {
        console.error(error);
        dom.loading.classList.add('hidden');
        dom.error.classList.remove('hidden');
        dom.errorMsg.textContent = `Erro: ${error.message}`;
    }
}

function markAsChanged() {
    state.hasChanges = true;
    dom.statusIndicator.classList.remove('hidden');
    dom.saveBtn.textContent = 'Salvar Alterações *';
}

function markAsSaved() {
    state.hasChanges = false;
    dom.statusIndicator.classList.add('hidden');
    dom.saveBtn.textContent = 'Salvar Alterações';
}

// --- Renderização ---

function switchSection(sectionId) {
    // Atualiza menu
    dom.navLinks.forEach(link => {
        if (link.getAttribute('data-section') === sectionId) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // Mostra/Esconde seções
    document.querySelectorAll('.section-container').forEach(el => {
        if (el.id === `container-${sectionId}`) {
            el.classList.remove('hidden');
        } else {
            el.classList.add('hidden');
        }
    });

    state.currentSection = sectionId;
    window.scrollTo(0, 0);
}

function renderAllSections() {
    dom.content.innerHTML = '';

    renderInfoSection();
    renderResumoSection();
    renderHabilidadesSection();
    renderExperienciaSection();
    renderProjetosSection();
    renderFormacaoSection();
    renderCertificadosSection();
    renderCursosSection();
    renderRecomendacoesSection();
}

// Utilitários de Renderização
function createSectionContainer(id, title) {
    const div = document.createElement('div');
    div.id = `container-${id}`;
    div.className = 'section-container hidden';
    div.innerHTML = `<h2 class="text-2xl font-bold text-white mb-6 pb-4 border-b border-[#30363d]">${title}</h2>`;
    dom.content.appendChild(div);
    return div;
}

function createInput(label, value, onChange, type = 'text', isTextarea = false) {
    const wrapper = document.createElement('div');
    wrapper.className = 'form-group mb-5';

    const labelEl = document.createElement('label');
    labelEl.textContent = label;
    labelEl.className = 'block text-sm font-medium text-gray-400 mb-2';
    wrapper.appendChild(labelEl);

    let input;
    if (isTextarea) {
        input = document.createElement('textarea');
        input.rows = 4;
    } else {
        input = document.createElement('input');
        input.type = type;
    }

    input.className = 'w-full bg-[#0d1117] border border-[#30363d] rounded-md px-3 py-2 text-[#c9d1d9] focus:border-[#58a6ff] focus:ring-1 focus:ring-[#58a6ff] outline-none transition-all placeholder-gray-600';
    input.value = value || '';

    input.addEventListener('input', (e) => {
        onChange(e.target.value);
        markAsChanged();
    });

    wrapper.appendChild(input);
    return wrapper;
}

function createArrayEditor(container, items, itemTemplateFn, onAdd, onRemove) {
    const listDiv = document.createElement('div');
    listDiv.className = 'space-y-4';

    const renderList = () => {
        listDiv.innerHTML = '';
        items.forEach((item, index) => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'bg-[#161b22] border border-[#30363d] rounded-lg p-5 relative group hover:border-gray-600 transition-colors';

            // Conteúdo do item
            const contentDiv = document.createElement('div');
            itemTemplateFn(contentDiv, item, index);
            itemDiv.appendChild(contentDiv);

            // Botão Remover
            const removeBtn = document.createElement('button');
            removeBtn.type = 'button';
            removeBtn.className = 'absolute top-2 right-2 z-20 text-gray-400 hover:text-[#f85149] bg-[#161b22] hover:bg-[#0d1117] p-2 rounded-md border border-transparent hover:border-[#30363d] transition-all shadow-sm';
            removeBtn.innerHTML = '<i class="fa-solid fa-trash pointer-events-none"></i>';
            removeBtn.title = 'Remover item';

            removeBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log(`[DEBUG] Tentando remover item índice: ${index}`);

                setTimeout(() => {
                    if (window.confirm('Tem certeza que deseja remover este item?')) {
                        console.log('[DEBUG] Confirmação aceita. Removendo...');
                        try {
                            onRemove(index);
                            console.log(`[DEBUG] Removido. Novo tamanho: ${items.length}`);
                            renderList();
                            markAsChanged();
                        } catch (err) {
                            console.error('[DEBUG] Erro ao remover item:', err);
                            alert('Erro ao remover item: ' + err.message);
                        }
                    } else {
                        console.log('[DEBUG] Remoção cancelada pelo usuário');
                    }
                }, 10);
            });

            itemDiv.appendChild(removeBtn);
            listDiv.appendChild(itemDiv);
        });
    };

    const addBtn = document.createElement('button');
    addBtn.className = 'w-full py-3 border-2 border-dashed border-[#30363d] rounded-lg text-gray-400 hover:border-[#58a6ff] hover:text-[#58a6ff] hover:bg-[#161b22] transition-all mt-6 flex items-center justify-center font-medium';
    addBtn.innerHTML = '<i class="fa-solid fa-plus mr-2"></i> Adicionar Novo Item';
    addBtn.onclick = () => {
        console.log('[DEBUG] Adicionando novo item');
        onAdd();
        renderList();
        markAsChanged();
    };

    renderList();
    container.appendChild(listDiv);
    container.appendChild(addBtn);
}

// --- Implementação das Seções Específicas ---

function renderInfoSection() {
    const container = createSectionContainer('info', 'Informações Pessoais');
    const card = document.createElement('div');
    card.className = 'bg-[#161b22] border border-[#30363d] rounded-lg p-6 mb-6';

    card.appendChild(createInput('Nome Completo', state.cvData.Nome, v => state.cvData.Nome = v));
    card.appendChild(createInput('Título Profissional', state.cvData.Titulo, v => state.cvData.Titulo = v));
    card.appendChild(createInput('Resumo Hero (Topo)', state.cvData.ResumoHero, v => state.cvData.ResumoHero = v, 'text', true));

    // Contato
    const contactTitle = document.createElement('h3');
    contactTitle.className = 'text-lg font-semibold text-white mt-8 mb-4 pb-2 border-b border-[#30363d]';
    contactTitle.textContent = 'Informações de Contato';
    card.appendChild(contactTitle);

    const grid = document.createElement('div');
    grid.className = 'grid grid-cols-1 md:grid-cols-2 gap-4';

    grid.appendChild(createInput('Email', state.cvData.Contato.Email, v => state.cvData.Contato.Email = v));
    grid.appendChild(createInput('LinkedIn URL', state.cvData.Contato.LinkedIn, v => state.cvData.Contato.LinkedIn = v));
    grid.appendChild(createInput('LinkedIn User', state.cvData.Contato.LinkedInUser, v => state.cvData.Contato.LinkedInUser = v));
    grid.appendChild(createInput('GitHub URL', state.cvData.Contato.GitHub, v => state.cvData.Contato.GitHub = v));
    grid.appendChild(createInput('YouTube URL', state.cvData.Contato.youtube, v => state.cvData.Contato.youtube = v));
    grid.appendChild(createInput('Instagram URL', state.cvData.Contato.instagram, v => state.cvData.Contato.instagram = v));

    card.appendChild(grid);
    container.appendChild(card);
}

function renderResumoSection() {
    const container = createSectionContainer('resumo', 'Resumo Profissional');

    createArrayEditor(
        container,
        state.cvData.Resumo,
        (div, item, index) => {
            div.appendChild(createInput(`Parágrafo ${index + 1}`, item, v => state.cvData.Resumo[index] = v, 'text', true));
        },
        () => state.cvData.Resumo.push("Novo parágrafo..."),
        (index) => state.cvData.Resumo.splice(index, 1)
    );
}

function renderHabilidadesSection() {
    const container = createSectionContainer('habilidades', 'Habilidades Técnicas');

    // Itera sobre as chaves do objeto Habilidades
    Object.keys(state.cvData.Habilidades).forEach(key => {
        const card = document.createElement('div');
        card.className = 'bg-[#161b22] border border-[#30363d] rounded-lg p-6 mb-6';

        const title = document.createElement('h3');
        title.className = 'text-lg font-semibold text-[#58a6ff] mb-4';
        title.textContent = key.replace(/_/g, ' ');
        card.appendChild(title);

        // Editor de tags para o array de strings
        const tagsContainer = document.createElement('div');
        tagsContainer.className = 'flex flex-wrap gap-2 mb-4';

        const renderTags = () => {
            tagsContainer.innerHTML = '';
            state.cvData.Habilidades[key].forEach((skill, idx) => {
                const tag = document.createElement('span');
                tag.className = 'bg-[#21262d] border border-[#30363d] text-gray-200 px-3 py-1 rounded-full text-sm flex items-center group hover:border-red-500/50 transition-colors';
                tag.innerHTML = `${skill} <i class="fa-solid fa-times ml-2 cursor-pointer text-gray-500 group-hover:text-red-400 transition-colors"></i>`;
                tag.querySelector('i').onclick = () => {
                    state.cvData.Habilidades[key].splice(idx, 1);
                    renderTags();
                    markAsChanged();
                };
                tagsContainer.appendChild(tag);
            });
        };

        const addInput = document.createElement('input');
        addInput.className = 'w-full bg-[#0d1117] border border-[#30363d] rounded-md px-3 py-2 text-[#c9d1d9] focus:border-[#58a6ff] focus:ring-1 focus:ring-[#58a6ff] outline-none transition-all mt-2';
        addInput.placeholder = 'Digite e pressione Enter para adicionar...';
        addInput.onkeydown = (e) => {
            if (e.key === 'Enter' && e.target.value.trim()) {
                state.cvData.Habilidades[key].push(e.target.value.trim());
                e.target.value = '';
                renderTags();
                markAsChanged();
            }
        };

        renderTags();
        card.appendChild(tagsContainer);
        card.appendChild(addInput);
        container.appendChild(card);
    });
}

function renderExperienciaSection() {
    const container = createSectionContainer('experiencia', 'Experiência Profissional');

    createArrayEditor(
        container,
        state.cvData.Experiencia,
        (div, exp, index) => {
            div.className = 'grid grid-cols-1 md:grid-cols-2 gap-4';
            div.appendChild(createInput('Empresa', exp.Empresa, v => exp.Empresa = v));
            div.appendChild(createInput('Cargo', exp.Cargo, v => exp.Cargo = v));
            div.appendChild(createInput('Período', exp.Periodo, v => exp.Periodo = v));
            div.appendChild(createInput('Local', exp.Local, v => exp.Local = v));

            const descDiv = document.createElement('div');
            descDiv.className = 'col-span-1 md:col-span-2';
            descDiv.appendChild(createInput('Descrição', exp.Descricao, v => exp.Descricao = v, 'text', true));
            div.appendChild(descDiv);
        },
        () => state.cvData.Experiencia.unshift({ Empresa: "Nova Empresa", Cargo: "Cargo", Periodo: "Periodo", Descricao: "Descrição" }),
        (index) => state.cvData.Experiencia.splice(index, 1)
    );
}

function renderProjetosSection() {
    const container = createSectionContainer('projetos', 'Projetos (STAR)');

    createArrayEditor(
        container,
        state.cvData.Projetos,
        (div, proj, index) => {
            div.innerHTML = `<h3 class="font-bold text-blue-400 mb-4">#${index + 1} - ${proj.Nome}</h3>`;

            const grid = document.createElement('div');
            grid.className = 'grid grid-cols-1 md:grid-cols-2 gap-4';

            grid.appendChild(createInput('Nome do Projeto', proj.Nome, v => proj.Nome = v));
            grid.appendChild(createInput('Empresa', proj.Empresa, v => proj.Empresa = v));
            grid.appendChild(createInput('Período', proj.Periodo, v => proj.Periodo = v));

            // Situação (STAR)
            const sitDiv = document.createElement('div');
            sitDiv.className = 'col-span-1 md:col-span-2';
            sitDiv.appendChild(createInput('Situação (Problema)', proj.Situacao, v => proj.Situacao = v, 'text', true));
            grid.appendChild(sitDiv);

            // Arrays internos (Tarefas, Ações, Resultados) - Simplificado como Textarea por linha
            // Para uma implementação completa, seria ideal um editor de listas aninhado, 
            // mas para manter a simplicidade vamos usar textareas onde cada linha é um item.

            const createListInput = (label, arrayField) => {
                const wrapper = document.createElement('div');
                wrapper.className = 'col-span-1 md:col-span-2 form-group mb-4';
                wrapper.innerHTML = `<label class="block text-sm font-medium text-gray-400 mb-2">${label} (um por linha)</label>`;
                const textarea = document.createElement('textarea');
                textarea.className = 'w-full bg-[#0d1117] border border-[#30363d] rounded-md px-3 py-2 text-[#c9d1d9] focus:border-[#58a6ff] focus:ring-1 focus:ring-[#58a6ff] outline-none transition-all';
                textarea.rows = 3;
                textarea.value = (proj[arrayField] || []).join('\n');
                textarea.onchange = (e) => {
                    proj[arrayField] = e.target.value.split('\n').filter(line => line.trim() !== '');
                    markAsChanged();
                };
                wrapper.appendChild(textarea);
                return wrapper;
            };

            grid.appendChild(createListInput('Tarefas', 'Tarefas'));
            grid.appendChild(createListInput('Ações', 'Ações'));
            grid.appendChild(createListInput('Resultados', 'Resultados'));
            grid.appendChild(createListInput('Tecnologias', 'Tecnologias'));

            div.appendChild(grid);
        },
        () => state.cvData.Projetos.unshift({ Nome: "Novo Projeto", Empresa: "", Situacao: "", Tarefas: [], Acoes: [], Resultados: [], Tecnologias: [] }),
        (index) => state.cvData.Projetos.splice(index, 1)
    );
}

function renderFormacaoSection() {
    const container = createSectionContainer('formacao', 'Formação Acadêmica');
    createArrayEditor(
        container,
        state.cvData.Formacao_Academica,
        (div, item) => {
            div.appendChild(createInput('Instituição', item.Instituicao, v => item.Instituicao = v));
            div.appendChild(createInput('Curso', item.Curso, v => item.Curso = v));
            div.appendChild(createInput('Período', item.Periodo, v => item.Periodo = v));
            div.appendChild(createInput('Link Verificação', item.Verificacao, v => item.Verificacao = v));
        },
        () => state.cvData.Formacao_Academica.unshift({ Instituicao: "", Curso: "", Periodo: "" }),
        (index) => state.cvData.Formacao_Academica.splice(index, 1)
    );
}

function renderCertificadosSection() {
    const container = createSectionContainer('certificados', 'Certificados');
    createArrayEditor(
        container,
        state.cvData.Certificados,
        (div, item) => {
            div.className = 'grid grid-cols-1 md:grid-cols-2 gap-4';
            div.appendChild(createInput('Nome', item.Nome, v => item.Nome = v));
            div.appendChild(createInput('Instituição', item.Instituicao, v => item.Instituicao = v));
            div.appendChild(createInput('Data Emissão', item.Data_Emissao, v => item.Data_Emissao = v));
            div.appendChild(createInput('Link Verificação', item.Verificacao, v => item.Verificacao = v));
        },
        () => state.cvData.Certificados.unshift({ Nome: "", Instituicao: "" }),
        (index) => state.cvData.Certificados.splice(index, 1)
    );
}

function renderCursosSection() {
    const container = createSectionContainer('cursos', 'Cursos Alura');

    Object.keys(state.cvData.Cursos_Alura).forEach(key => {
        const card = document.createElement('div');
        card.className = 'bg-[#161b22] border border-[#30363d] rounded-lg p-6 mb-6';
        card.innerHTML = `<h3 class="text-lg font-semibold text-[#58a6ff] mb-4">${key.replace(/_/g, ' ')}</h3>`;

        const textarea = document.createElement('textarea');
        textarea.className = 'w-full bg-[#0d1117] border border-[#30363d] rounded-md px-3 py-2 text-[#c9d1d9] focus:border-[#58a6ff] focus:ring-1 focus:ring-[#58a6ff] outline-none transition-all';
        textarea.rows = 5;
        textarea.value = state.cvData.Cursos_Alura[key].join('\n');
        textarea.placeholder = 'Um curso por linha...';
        textarea.onchange = (e) => {
            state.cvData.Cursos_Alura[key] = e.target.value.split('\n').filter(l => l.trim() !== '');
            markAsChanged();
        };

        card.appendChild(textarea);
        container.appendChild(card);
    });
}

function renderRecomendacoesSection() {
    const container = createSectionContainer('recomendacoes', 'Recomendações');
    createArrayEditor(
        container,
        state.cvData.Recomendacoes_Recebidas,
        (div, item) => {
            div.appendChild(createInput('Autor', item.Autor, v => item.Autor = v));
            div.appendChild(createInput('Cargo', item.Cargo, v => item.Cargo = v));
            div.appendChild(createInput('Recomendação', item.Recomendacao, v => item.Recomendacao = v, 'text', true));
        },
        () => state.cvData.Recomendacoes_Recebidas.unshift({ Autor: "", Recomendacao: "" }),
        (index) => state.cvData.Recomendacoes_Recebidas.splice(index, 1)
    );
}

// --- Salvamento ---

async function saveData() {
    if (!state.hasChanges) return;

    const btn = dom.saveBtn;
    const originalText = btn.innerHTML;

    try {
        btn.disabled = true;
        btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin mr-2"></i> Salvando...';

        const result = await githubService.updateFile(
            state.token,
            REPO_CONFIG.owner,
            REPO_CONFIG.repo,
            REPO_CONFIG.filePath,
            state.cvData,
            state.originalSha,
            `Update CV via Admin Panel - ${new Date().toLocaleString()}`
        );

        // Atualiza SHA para o novo commit
        state.originalSha = result.content.sha;
        markAsSaved();
        showToast('Alterações salvas com sucesso no GitHub!');

    } catch (error) {
        console.error(error);
        alert(`Erro ao salvar: ${error.message}`);
    } finally {
        btn.disabled = false;
        btn.innerHTML = originalText;
    }
}

function showToast(msg) {
    dom.toastMsg.textContent = msg;
    dom.toast.classList.remove('translate-y-20', 'opacity-0');
    setTimeout(() => {
        dom.toast.classList.add('translate-y-20', 'opacity-0');
    }, 3000);
}
