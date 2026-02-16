// Configuração do GitHub para buscar dados do CV
// IMPORTANTE: Este é um arquivo de EXEMPLO. Não commite tokens reais aqui!
// Copie este arquivo para config.js e preencha com seus dados reais.

export const GITHUB_CONFIG = {
    // Seus dados do GitHub
    username: 'seu-usuario',      // Ex: 'mauricioissei'
    repository: 'seu-repositorio', // Ex: 'site-mauricio'
    branch: 'main',                // ou 'master', dependendo do seu repo

    // Caminho do arquivo cv.json no repositório
    filePath: 'src/cv.json',

    // ⚠️ NUNCA commite seu token real!
    // Deixe vazio e insira via interface de login
    token: ''
};

// Gera a URL do GitHub Raw para buscar o arquivo
export function getGitHubRawUrl() {
    const { username, repository, branch, filePath } = GITHUB_CONFIG;
    return `https://raw.githubusercontent.com/${username}/${repository}/${branch}/${filePath}`;
}

// URL de fallback local
export const LOCAL_CV_URL = './cv.json';
