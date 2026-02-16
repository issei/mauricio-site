// Configuração do GitHub para buscar dados do CV
export const GITHUB_CONFIG = {
    // IMPORTANTE: Atualize com seus dados reais do GitHub
    username: 'issei',  // Ex: 'mauricioissei'
    repository: 'curriculo',    // Ex: 'site-mauricio'
    branch: 'main',                   // ou 'master', dependendo do seu repo

    // Caminho do arquivo cv.json no repositório
    filePath: 'cv.json',
    token: 'GHSAT0AAAAAADPWHM4UPHYL7FUQ5VWKYVNE2I7JVUQ'
};

// Gera a URL do GitHub Raw para buscar o arquivo
export function getGitHubRawUrl() {
    if (GITHUB_CONFIG.rawUrl) {
        return GITHUB_CONFIG.rawUrl;
    }
    const { username, repository, branch, filePath } = GITHUB_CONFIG;
    return `https://raw.githubusercontent.com/${username}/${repository}/${branch}/${filePath}?token=${GITHUB_CONFIG.token}`;
}

// URL de fallback local
export const LOCAL_CV_URL = './cv.json';
