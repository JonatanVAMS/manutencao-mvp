# MVP - MaintFlow
MVP para controle de Ordens de Serviço (OS), cadastro de máquinas e indicadores de desempenho de manutenção.

## Equipe
- Jonatan Vinicius Antunes Moreira dos Santos
- Pedro Henrique Albuquerque
- Gabriel Antonio Bittencourt
- Jean Carlos Pinz

# ⚙️ MaintFlow - MVP de Engenharia de Manutenção

O **MaintFlow** é um sistema web desenvolvido como Produto Mínimo Viável (MVP) acadêmico de Ciência da Computação para modernizar e centralizar o controle de manutenção industrial. Criado para tirar o chão de fábrica das planilhas, o sistema permite a gestão ágil do ciclo de vida dos ativos e o acompanhamento de Ordens de Serviço (O.S.) em tempo real, facilitando a extração de métricas de confiabilidade (como MTTR e gestão de Backlog).

## 🚀 Funcionalidades Principais

* **Dashboard Analítico:** Visão em tempo real do total de ativos registados, backlog de Ordens de Serviço pendentes e status operacional do parque de máquinas.
* **Gestão de Ativos:** Registo de equipamentos da produção utilizando a TAG técnica da máquina, permitindo rastreabilidade e exclusão segura (com limpeza de histórico em cascata).
* **Abertura e Triagem de O.S.:** Registo rápido de falhas com sistema de busca inteligente para gestão da Fila de Trabalho da equipe técnica.
* **Laudo Técnico e Histórico:** Encerramento de O.S. através de um modal profissional para preenchimento do Técnico Responsável, Tempo de Reparo, Materiais e Procedimento Adotado, formando uma base de dados estruturada para futuras análises de indicadores.

## 🛠️ Stack Tecnológica

A arquitetura foi desenhada separando o Frontend do Backend, operando 100% na nuvem.

**Frontend:**
* [Next.js](https://nextjs.org/) (React Framework)
* Tailwind CSS (Estilização em Dark Mode focada no ambiente industrial)
* Deploy: **Vercel**

**Backend:**
* [NestJS](https://nestjs.com/) (Framework Node.js com TypeScript)
* [Prisma](https://www.prisma.io/) (ORM para modelagem relacional de dados)
* Deploy: **Render**

**Banco de Dados:**
* PostgreSQL hospedado no **Neon** (Serverless)

## 🔗 Links do Projeto

* **Acesso ao Sistema (Frontend):** [https://manutencao-mvp.vercel.app]
* **API (Backend):** [https://maintflow-backend.onrender.com]
* **Vídeo de Apresentação:** [Em Produção]

## 💻 Como rodar o projeto localmente

Caso seja necessário clonar e testar o ambiente de desenvolvimento localmente:

1. Clone o repositório:
> git clone https://github.com/JonatanVAMS/manutencao-mvp

2. Instale as dependências do Backend e rode o servidor:
> cd backend
> npm install
> npx prisma generate
> npm run start:dev

3. Em outro terminal, instale as dependências do Frontend e rode a aplicação:
> cd frontend
> npm install
> npm run dev
