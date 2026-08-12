@echo off
title Atlas Gestao - Instalacao
cd /d "%~dp0"

where node >nul 2>nul
if errorlevel 1 (
  echo.
  echo Node.js nao encontrado.
  echo Instale o Node.js LTS em https://nodejs.org/
  echo Depois execute este arquivo novamente.
  pause
  exit /b 1
)

echo.
echo [1/3] Instalando dependencias...
call npm install
if errorlevel 1 goto erro

echo.
echo [2/3] Instalando backend e frontend...
call npm --prefix backend install
if errorlevel 1 goto erro
call npm --prefix frontend install
if errorlevel 1 goto erro

echo.
echo [3/3] Criando banco SQLite e administrador...
call npm --prefix backend run db:setup
if errorlevel 1 goto erro

echo.
echo ==========================================
echo Atlas Gestao instalado com sucesso!
echo Login: admin@atlas.local
echo Senha: 123456
echo ==========================================
echo.
pause
exit /b 0

:erro
echo.
echo A instalacao encontrou um erro.
pause
exit /b 1
