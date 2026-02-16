{ pkgs, ... }: {
  # Utiliza o canal estável do Nixpkgs
  channel = "stable-23.11";

  # Pacotes do sistema necessários
  packages = [
    pkgs.nodejs_20  # Node 20 LTS conforme deploy.yml
    pkgs.awscli2    # Para testes manuais com AWS
  ];

  # Variáveis de ambiente
  env = {
    PORT = "5173"; # Porta padrão do Vite
  };

  idx = {
    # Extensões do VS Code recomendadas para Vibe Coding
    extensions = [
      "bradlc.vscode-tailwindcss" # Autocomplete e lint do Tailwind
      "esbenp.prettier-vscode"    # Formatação
      "usernamehw.errorlens"      # Visualização rápida de erros
    ];

    workspace = {
      # Comandos executados na criação do workspace
      onCreate = {
        npm-install = "npm install";
      };
      # Comandos executados ao iniciar o workspace
      onStart = {
        # Inicia o servidor de desenvolvimento
        # --host 0.0.0.0 é crucial para ambientes containerizados
        run-dev = "npm run dev -- --port $PORT --host 0.0.0.0";
      };
    };

    # Configuração de preview
    previews = {
      enable = true;
      previews = {
        web = {
          command = ["npm" "run" "dev" "--" "--port" "$PORT" "--host" "0.0.0.0"];
          manager = "web";
        };
      };
    };
  };
}
