#!/usr/bin/env bash
set -e
cd "$(dirname "$0")"
command -v node >/dev/null 2>&1 || { echo "Node.js LTS não encontrado."; exit 1; }
npm install
npm --prefix backend install
npm --prefix frontend install
npm --prefix backend run db:setup
echo "Atlas Gestão instalado."
echo "Login: admin@atlas.local"
echo "Senha: 123456"
