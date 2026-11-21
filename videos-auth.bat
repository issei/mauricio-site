@echo off
setlocal
chcp 65001 >nul
cd /d "%~dp0"

:: Gera o refresh token do canal do YouTube (YOUTUBE_OAUTH_REFRESH_TOKEN).
:: Roda UMA vez. Spec: docs/specs/pages/videos-youtube/SDD-fase-1.md secao 5.
:: Precisa do .env.local com YOUTUBE_OAUTH_CLIENT_ID e YOUTUBE_OAUTH_CLIENT_SECRET.
::
:: NAO troca de branch nem mexe nos seus arquivos: busca o comando no GitHub,
:: copia para uma pasta temporaria e roda de la. O token aparece so no
:: terminal; nada e gravado em disco.

set "BRANCH=claude/project-thread-0jpytw"
set "TMPJS=%TEMP%\mauricio-videos-auth.mjs"

if not exist .env.local (
    echo [ERRO] Nao achei o .env.local nesta pasta: %CD%
    echo        Coloque este .bat na raiz do projeto, ao lado do .env.local.
    goto :erro
)

echo [1/3] Buscando o comando no GitHub...
git fetch -q origin main %BRANCH% 2>nul || git fetch -q origin main || goto :erro

:: Depois do merge do PR #134 o comando esta na main; antes, so no branch do PR.
git show origin/main:scripts/videos/auth.mjs > "%TMPJS%" 2>nul
if errorlevel 1 git show origin/%BRANCH%:scripts/videos/auth.mjs > "%TMPJS%" 2>nul
if errorlevel 1 (
    echo [ERRO] Nao achei scripts/videos/auth.mjs nem na main nem no branch do PR.
    goto :erro
)

:: Le o .env.local para o ambiente (o comando usa o ambiente primeiro).
for /f "usebackq eol=# tokens=1,* delims==" %%a in (".env.local") do set "%%a=%%b"

echo [2/3] Abrindo a autorizacao no navegador...
echo        Entre com a conta do canal. No aviso "app nao verificado",
echo        clique em Avancado e depois em Acessar. Depois, autorize.
echo.
node "%TMPJS%"
set "RC=%ERRORLEVEL%"
del "%TMPJS%" >nul 2>&1
if not "%RC%"=="0" goto :erro

echo.
echo [3/3] Pronto. Copie o token acima e salve como
echo        YOUTUBE_OAUTH_REFRESH_TOKEN no GitHub (Secrets) e no .env.local.
echo        Nao mande o token pelo chat.
echo.
pause
exit /b 0

:erro
echo.
echo [FALHOU] Veja a mensagem acima.
pause
exit /b 1
