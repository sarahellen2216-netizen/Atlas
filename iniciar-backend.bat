@echo off
cd /d "%~dp0backend"
call npm install
call npx prisma generate
call npx prisma migrate dev --name init
call npm run dev
pause
