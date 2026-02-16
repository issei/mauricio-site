
/**
 * Serviço para interação com a API do GitHub
 */
export class GitHubService {
    constructor() {
        this.baseUrl = 'https://api.github.com';
    }

    /**
     * Valida o token tentando obter os dados do usuário
     * @param {string} token - Personal Access Token
     * @returns {Promise<Object>} Dados do usuário ou erro
     */
    async validateToken(token) {
        try {
            const response = await fetch(`${this.baseUrl}/user`, {
                headers: {
                    'Authorization': `token ${token}`,
                    'Accept': 'application/vnd.github.v3+json'
                }
            });

            if (!response.ok) {
                throw new Error('Token inválido ou expirado');
            }

            return await response.json();
        } catch (error) {
            throw error;
        }
    }

    /**
     * Busca o conteúdo de um arquivo no repositório
     * @param {string} token - Personal Access Token
     * @param {string} owner - Dono do repositório
     * @param {string} repo - Nome do repositório
     * @param {string} path - Caminho do arquivo
     * @returns {Promise<Object>} Conteúdo do arquivo e SHA
     */
    async getFile(token, owner, repo, path) {
        try {
            const response = await fetch(`${this.baseUrl}/repos/${owner}/${repo}/contents/${path}`, {
                headers: {
                    'Authorization': `token ${token}`,
                    'Accept': 'application/vnd.github.v3+json'
                }
            });

            if (!response.ok) {
                throw new Error(`Erro ao buscar arquivo: ${response.statusText}`);
            }

            const data = await response.json();
            // O conteúdo vem em base64, precisamos decodificar
            // Suporta caracteres UTF-8 corretamente
            const content = decodeURIComponent(escape(atob(data.content)));

            return {
                content: JSON.parse(content),
                sha: data.sha
            };
        } catch (error) {
            console.error('Erro no getFile:', error);
            throw error;
        }
    }

    /**
     * Atualiza um arquivo no repositório
     * @param {string} token - Personal Access Token
     * @param {string} owner - Dono do repositório
     * @param {string} repo - Nome do repositório
     * @param {string} path - Caminho do arquivo
     * @param {Object} content - Novo conteúdo (objeto JSON)
     * @param {string} sha - SHA do arquivo original (para garantir atomicidade)
     * @param {string} message - Mensagem do commit
     */
    async updateFile(token, owner, repo, path, content, sha, message) {
        try {
            // Codifica o conteúdo para base64 (UTF-8 safe)
            const contentString = JSON.stringify(content, null, 4);
            const contentBase64 = btoa(unescape(encodeURIComponent(contentString)));

            const body = {
                message: message || `Update ${path} via Admin Panel`,
                content: contentBase64,
                sha: sha
            };

            const response = await fetch(`${this.baseUrl}/repos/${owner}/${repo}/contents/${path}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `token ${token}`,
                    'Accept': 'application/vnd.github.v3+json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Erro ao salvar: ${errorData.message}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Erro no updateFile:', error);
            throw error;
        }
    }
}
