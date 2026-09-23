@echo off
setlocal
chcp 65001 >nul
cd /d "%~dp0"

:: Sobe o site localmente para teste MANUAL antes dos testes automatizados.
::   local.bat        -> servidor de desenvolvimento (Vite, recarrega ao salvar)
::   local.bat prod   -> build de producao + preview (o que vai para o S3)
:: Ctrl+C encerra o servidor.

if not exist node_modules (
    echo [1/3] Instalando dependencias...
    call npm install || goto :erro
) else (
    echo [1/3] Dependencias ja instaladas.
)

echo [2/3] Gravando o conteudo do cv.json no HTML ^(index + curriculo^)...
node scripts/gen-portfolio.mjs || goto :erro

echo.
echo ================= ROTEIRO DE TESTE MANUAL =================
echo  Paginas:
echo    /                  home "Mapa de Linhas"
echo    /curriculo.html    home antiga ^(mesma aparencia, conteudo estatico^)
echo    /en/               gemeo em ingles
echo.
echo  Conferir:
echo    [ ] Mapa: passar o mouse na legenda esmaece as outras linhas
echo    [ ] Mapa: clicar numa estacao leva ao ano do projeto
echo    [ ] Cards STAR abrem e mostram Situacao/Tarefas/Acoes/Resultados
echo    [ ] Links "Verificar" das certificacoes abrem a credencial certa
echo    [ ] Celular: DevTools ^(F12^) ^> modo dispositivo 375px, mapa vertical e sem rolagem lateral
echo    [ ] Sem JS: DevTools ^> Ctrl+Shift+P ^> "Disable JavaScript" ^> recarregar, todo texto continua la
echo    [ ] Traducao: botao direito ^> "Traduzir para ingles", inclusive cards fechados
echo    [ ] /curriculo.html: botao "Saiba Mais" abre o modal do projeto certo
echo.
echo  Depois dos testes manuais, os automatizados:
echo    npx playwright test "mauricio-site.tests"   ^(suite do repo^)
echo    npm run gate                               ^(gate completo^)
echo ===========================================================
echo.

if /i "%~1"=="prod" (
    echo [3/3] Build de producao e preview em http://localhost:4173/ ...
    call npx vite build || goto :erro
    call npx vite preview --port 4173 --strictPort --open /
) else (
    echo [3/3] Servidor de desenvolvimento em http://localhost:5173/ ...
    call npx vite --port 5173 --strictPort --open /
)
goto :eof

:erro
echo.
echo Falhou. Veja a mensagem acima.
pause
exit /b 1
