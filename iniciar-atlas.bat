@echo off
title Atlas Gestao
cd /d "%~dp0"

if not exist "backend\node_modules" (
  echo Dependencias nao instaladas.
  echo Execute instalar-atlas.bat primeiro.
  pause
  exit /b 1
)

if not exist "backend\prisma\atlas.db" (
  echo Banco local nao encontrado. Criando...
  call npm --prefix backend run db:setup
  if errorlevel 1 (
    pause
    exit /b 1
  )
)

echo Iniciando Atlas Gestao...
start "Atlas Backend" cmd /k "cd /d "%~dp0backend" && npm run dev"
timeout /t 3 /nobreak >nul
start "Atlas Frontend" cmd /k "cd /d "%~dp0frontend" && npm run dev"
timeout /t 4 /nobreak >nul
start http://localhost:5173

echo.
echo Atlas Gestao iniciado.
echo Navegador: http://localhost:5173
echo.
pause
