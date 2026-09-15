# MVP - ManitFlow
MVP para controle de Ordens de Serviço (OS), cadastro de máquinas e indicadores de desempenho de manutenção.

## Equipe
- Jonatan Vinicius Antunes Moreira dos Santos
- Pedro Henrique Albuquerque
- Gabriel Antonio Bittencourt
- Jean Carlos Pinz

## Stack Tecnológica Escolhida
- **Frontend**: Next.js (TypeScript)
- **Backend**: NestJS (TypeScript)
- **Banco de Dados e ORM**: SQLite + Prisma

  ## Requisitos
- Node.js (versão 18 ou superior)
- Gerenciador de pacotes npm

## Passo a Passo para Execução (Roteiro)

### 1. Backend (NestJS + Prisma)
Abra o terminal, navegue até a pasta `backend` e rode os comandos:
`npm install` (Para instalar dependências)
`npx prisma migrate dev` (Para criar o banco de dados)
`npm run start:dev` (Para iniciar o servidor)

*(Lembre-se de criar o arquivo .env copiando do .env.example antes de rodar o banco)*

### 2. Frontend (Next.js)
Abra um novo terminal, navegue até a pasta `frontend` e rode os comandos:
`npm install` (Para instalar dependências)
`npm run dev` (Para iniciar a interface web)
