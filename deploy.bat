@echo off
setlocal enabledelayedexpansion

:: Gera data e hora atual no formato dd/MM/yyyy HH:mm:ss
for /f "tokens=* delims=" %%i in ('powershell -command "Get-Date -Format \"dd/MM/yyyy HH:mm:ss\" "') do set "DATAHORA=%%i"

echo [1/5] Vuild...
call npm run build

if %errorlevel% neq 0 (
    echo ❌ Erro ao gerar. Abortando.
    exit /b %errorlevel%
)

echo [2/5] Publicando para bucket S3...
call aws s3 sync dist/ s3://mauricio.issei.com.br/ --delete

echo [5/5] Invalidando cache CloudFront...
call aws cloudfront create-invalidation --distribution-id E201F4RL889YZH --paths "/*" >nul 2>&1

echo [5/5] Commitando alterações no Git...
call git add .
call git commit -m "publicado em %DATAHORA%"

echo ✅ Publicação concluída com sucesso em %DATAHORA%.
