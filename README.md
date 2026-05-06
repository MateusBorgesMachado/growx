# 🐦 Growtwitter API

API REST integrada com uma rede social baseada no X (Twitter), desenvolvida como projeto final na **GROWDEV**. O sistema gerencia o ecossistema completo de usuários, tweets e as interações dinâmicas entre eles.

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)

🔗 **Link do Deploy:** [https://growx-5403.onrender.com](https://growx-5403.onrender.com)

🔗 **Link do Postman:** [https://documenter.getpostman.com/view/33375610/2sBXqMGynG](https://documenter.getpostman.com/view/33375610/2sBXqMGynG)

---

## 🏗️ Arquitetura e Padrões

O projeto foi construído utilizando **Programação Orientada a Objetos (POO)** e estruturado em camadas para garantir a separação de responsabilidades e facilitar a manutenção:

- **Controllers:** Gerenciam as rotas e as requisições/respostas HTTP.
- **Services:** Camada de lógica de negócio e validações de regras.
- **Repositories:** Abstração da persistência de dados utilizando o **Prisma ORM**.

> [!IMPORTANT]
> **Prisma Client:** O cliente é gerado no diretório customizado `../generated/prisma`. Certifique-se de executar o comando de geração para evitar erros de importação.

---

## 🔥 Funcionalidades

### 👤 Usuários e Autenticação
- **Cadastro e Login:** Sistema de autenticação segura via **JWT**.
- **Perfil Completo:** Consulta de dados do usuário, listagem de tweets próprios e relação de seguidores.

### 🌐 Social & Feed
- **Follow System:** Lógica de seguir e deixar de seguir usuários (relacionamento N:N).
- **Feed Dinâmico:** Algoritmo que consolida os tweets do usuário logado e de todos os perfis que ele segue em uma única linha do tempo.

### 📝 Conteúdo e Interação
- **Tweets & Replies:** Criação de postagens originais e sistema de resposta encadeada (tweets referenciando outros tweets).
- **Likes:** Gerenciamento de curtidas para interação em tweets.

---

## 🚀 Como rodar localmente

### 1. Clone o repositório
```bash
git clone [https://github.com/MateusBorgesMachado/growx](https://github.com/MateusBorgesMachado/growx)
cd growx
### 2. Instale as dependências
```bash
npm install
```
### 3. Configure o .env
Crie um arquivo .env na raiz do projeto:
```env
PORT=3000
DATABASE_URL="postgresql://USUARIO:SENHA@localhost:5432/NOME_BANCO?schema=public"
JWT_SECRET="sua-chave-secreta-aqui"
```
### 4. Prepare o Banco de Dados
```bash
# Executa as migrations do Prisma
npx prisma migrate dev

# Gera o client no caminho customizado
npx prisma generate
```
### 5. Inicie o servidor
```bash
npm run dev
```
### 📡 Endpoints Principais
| Método | Rota | Descrição | Protegida |
|--------|------|-----------|-----------|
| POST   | /users | Cadastra um novo usuário | Não |
| POST   | /login | Realiza login e gera o token | Não |
| GET    | /users/:id | Perfil, tweets e seguidores | Sim |
| POST   | /tweets | Cria um novo tweet | Sim |
| POST   | /tweets/reply | Responde a um tweet existente | Sim |
| GET    | /feed | Tweets próprios e de seguidos | Sim |
| POST   | /likes | Adiciona um like | Sim |
| DELETE | /likes/:id | Remove um like | Sim |
| POST   | /follow | Segue um usuário | Sim |
| DELETE | /follow/:id | Deixa de seguir um usuário | Sim |

### ✒️ Autor
Desenvolvido por Mateus como parte do projeto de formação na Growdev.
