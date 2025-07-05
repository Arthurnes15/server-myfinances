# 🚀 API de Finanças

Uma API RESTful sobre finanças com autenticação JWT e CRUD completo de gastos, itens de fatura e economias.

## 🛠️ Tecnologias
<img src="https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white"/>

![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)

## 📚 Documentação da API

### 👨🏻‍💻 Usuários
| Método | Rota           | Descrição               |
|--------|----------------|-------------------------|
| POST    | /users         | Cria Usuário |
| PUT   | /updatePassword         | Altera senha    |

### 🔐 Autenticação
| Método | Rota           | Descrição               |
|--------|----------------|-------------------------|
| POST    | /tokens         | Cria Token JWT |

### 💵 Gastos
| Método | Rota           | Descrição               |
|--------|----------------|-------------------------|
| POST    | /spendings         | Cria gasto |
| GET    | /spendings         | Lista todos os gastos |
| PUT    | /spendings/:id         | Atualiza um gasto |
| DELETE    | /spendings/:id         | Exclui Gasto |

### 💳 Fatura
| Método | Rota           | Descrição               |
|--------|----------------|-------------------------|
| POST    | /invoices         | Cria item da fatura |
| GET    | /invoices         | Lista todos os itens da fatura |
| PUT    | /invoices/:id         | Atualiza um item da fatura |
| PUT    | /invoices/month/:id         | Atualiza a parcela/mês de um item da fatura |
| DELETE    | /invoices/:id         | Exclui item da fatura |

### 🐖 Economias
| Método | Rota           | Descrição               |
|--------|----------------|-------------------------|
| POST    | /savings         | Cria economia |
| GET    | /savings         | Lista todas as economias |
| PUT    | /savings/:id         | Atualiza uma economia |
| DELETE    | /savings/:id         | Exclui uma economia |





