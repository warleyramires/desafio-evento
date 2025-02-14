# Desafio Técnico - Tokenlab 🚀

Este repositório contém a solução do desafio técnico da **Tokenlab**, utilizando **React (Vite) para o frontend** e **Spring Boot (Java 17) para o backend**.

## 🎯Objetivo do Desafio
O desafio consiste em desenvolver um sistema web de calendário de eventos com backend e frontend. O sistema deverá prover as seguintes funcionalidades:

- **Cadastro de usuário**
- **Login para acesso ao sistema**
- **Adição de eventos**
- **Edição de eventos**
- **Remoção de eventos**
- **Listagem de eventos**

## 📁 Estrutura do Projeto

O projeto está dividido em duas pastas principais:

- **frontend/** → Aplicação web construída com React e Vite.
- **desafiotecnico/** → Backend desenvolvido com Spring Boot.

---

## 🛠 Tecnologias Utilizadas

### Backend:

- **Java 17**
- **Spring Boot**
- **Spring Web**
- **Spring Data JPA**
- **Banco de dados MySQL**
- **Maven** (gerenciador de dependências)

### Frontend:

- **Node.js**
- **React.js** (usando Vite)
- **Axios** (para requisições HTTP)
- **React Router DOM** (para navegação)

---

## 🚀 Como Rodar o Projeto

### 🔹 Clonar o repositório

```bash
git clone https://github.com/warleyramires/desafio-evento.git
cd desafio-evento
```

🔹 Backend (Spring Boot)

## 📌 Pré-requisitos:

- **Java 17 instalado**
- **Maven**
- **MySQL rodando**

🔹 Rodando Backend e Frontend

# Backend

```bash
cd desafiotecnico
mvn spring-boot:run &
```

# Voltar para a raiz e iniciar o frontend

```bash
cd ../frontend
npm install
npm run dev
```

# O backend estará disponível em:
```bash
http://localhost:8080
```
# O frontend estará disponível em:
```bash
http://localhost:5173
```

## 📌 Endpoints da API
#### 🔹 Autenticação
#### 🔹 Login
```bash
POST localhost:8080/login
{
"email": "joaosilva@email.com",
"password": "senhaforte"
}
```

#### 🔹 Usuários
#### 🔹 Criar um usuário
```bash
POST localhost:8080/usuarios
{
"name": "Joao Silva",
"email": "joaosilva@email.com",
"password": "senhaforte"
}
```

#### 🔹 Eventos
#### 🔹 Criar um evento para um usuário
```bash
POST localhost:8080/eventos/usuarios/{userId}/evento
{
"nome": "Festival de Inverno de Campos do Jordão",
"descricao": "Um dos maiores festivais de música clássica da América Latina",
"horaInicio": "2025-07-15T10:00:00",
"horaFim": "2025-07-15T22:00:00"
}
```

#### 🔹 Buscar todos os eventos
```bash
GET localhost:8080/eventos
```

#### 🔹 Buscar eventos de um usuário específico
```bash
GET localhost:8080/eventos/usuario/{id}
```
#### 🔹 Atualizar um evento
```bash
PUT localhost:8080/eventos/{eventoId}/usuario/{usuarioId}
{
"nome": "Rock in Rio",
"descricao": "Um dos maiores festivais de música do mundo",
"horaInicio": "2025-09-13T12:00:00",
"horaFim": "2025-09-13T23:00:00"
}
```

#### 🔹 Deletar um evento de um usuário
```bash
- DELETE localhost:8080/eventos/{evento1}/usuario/{usuarioId}
```

## 🏆 Conclusão
Este projeto foi desenvolvido como parte do processo seletivo da Tokenlab. O código está organizado e modularizado para facilitar futuras melhorias. Qualquer dúvida ou sugestão, entre em contato! 🚀