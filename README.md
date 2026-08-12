# Atlas Gestão

**Gestão Inteligente para Empresas Modernas**

ERP web modular para gestão de produtos, clientes, fornecedores, vendas, financeiro, equipe e qualidade.

## Stack

### Frontend
- React
- Vite
- TypeScript
- React Router
- Axios

### Backend
- Node.js
- Express
- TypeScript
- JWT
- bcrypt
- Prisma

### Banco
- SQLite local

Não é necessário PostgreSQL, Supabase, Neon ou outro servidor de banco.

## Estrutura

```text
atlas-gestao/
├── .github/workflows/
├── backend/
│   ├── prisma/
│   └── src/modules/
├── frontend/
├── instalar-atlas.bat
├── iniciar-atlas.bat
├── instalar-atlas.sh
├── iniciar-atlas.sh
└── package.json
```

## Windows — instalação

1. Instale o Node.js LTS: https://nodejs.org/
2. Extraia o projeto.
3. Execute `instalar-atlas.bat`.
4. Depois execute `iniciar-atlas.bat`.

O instalador:
- instala as dependências;
- cria o SQLite;
- cria as tabelas;
- executa o seed;
- cria o administrador.

Login inicial:

```text
E-mail: admin@atlas.local
Senha: 123456
```

Depois de entrar, altere a senha antes de usar o sistema em um ambiente real.

## Execução manual

```bash
npm install
npm run setup
npm run dev
```

O frontend fica em:

http://localhost:5173

A API fica em:

http://localhost:3333

Health check:

http://localhost:3333/api/health

## Banco local

O banco é criado em:

`backend/prisma/atlas.db`

Ele não deve ser enviado ao GitHub. O `.gitignore` já impede isso.

Para backup local, copie o arquivo `atlas.db` com o sistema parado.

## GitHub

Para criar o repositório:

```bash
git init
git add .
git commit -m "feat: initial Atlas Gestão ERP"
git branch -M main
git remote add origin SEU_REPOSITORIO
git push -u origin main
```

Não envie `.env`, senhas reais, `node_modules` ou o banco `.db`.

## Observação

Esta versão é uma base local/MVP. Integrações externas, emissão fiscal, armazenamento de arquivos em nuvem, backups automáticos externos, PWA offline completo, gráficos avançados e controles empresariais adicionais podem ser adicionados em módulos independentes.
