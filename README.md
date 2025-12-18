# 🌞 GDASH Weather Intelligence Platform

Aplicação **full-stack distribuída** para coleta, processamento, armazenamento e visualização de dados climáticos com geração de **insights inteligentes**, desenvolvida como desafio técnico para o processo seletivo **GDASH 2025/02**.

---

## 📌 Visão Geral

Este projeto implementa uma **pipeline completa de dados climáticos**, integrando múltiplas linguagens, serviços e tecnologias modernas, com foco em:

- Arquitetura bem definida
- Separação de responsabilidades
- Comunicação assíncrona
- Dados reais
- Geração de valor através de insights

O sistema coleta dados meteorológicos reais da cidade configurada, processa esses dados de forma assíncrona via fila, armazena em banco NoSQL e exibe tudo em um **dashboard interativo protegido por autenticação**.

---

## 🧠 Arquitetura Geral

┌────────────┐ ┌────────────┐ ┌────────────┐ ┌────────────┐
│ OpenWeather│ ───▶ │ Python │ ───▶ │ RabbitMQ │ ───▶ │ Go Worker │
└────────────┘ └────────────┘ └────────────┘ └────────────┘
│
▼
┌────────────┐
│ NestJS API│
└────────────┘
│
▼
┌────────────┐
│ MongoDB │
└────────────┘
│
▼
┌────────────┐
│ React App │
└────────────┘

---

## 🧩 Stack Utilizada

### Backend
- NestJS (TypeScript)
- MongoDB
- JWT Authentication
- Mongoose
- class-validator
- json2csv / exceljs

### Frontend
- React
- Vite
- TypeScript
- TailwindCSS
- shadcn/ui
- Axios

### Dados & Integrações
- Python (requests, pika)
- Go (RabbitMQ worker)
- RabbitMQ
- OpenWeather API

### Infraestrutura
- Docker
- Docker Compose

---

## ⚙️ Funcionalidades

### 🌦️ Clima
- Coleta automática de dados climáticos reais
- Armazenamento histórico no MongoDB
- Listagem de registros
- Exportação de dados em CSV e XLSX

### 🧠 Insights Inteligentes
- Temperatura média
- Umidade média
- Pontuação de conforto climático (0–100)
- Geração automática de resumo textual

### 👤 Usuários & Autenticação
- CRUD completo de usuários
- Autenticação via JWT
- Rotas protegidas
- Criação automática de usuário administrador

### 🖥️ Frontend
- Tela de login
- Dashboard protegido
- Cards de insights
- Tabela de dados climáticos
- Download de CSV/XLSX
- Interface responsiva

---

## 📁 Estrutura do Projeto

gdash-desafio/
├── backend/
│ └── backend-api/
│ ├── src/
│ │ ├── auth/
│ │ ├── users/
│ │ ├── weather/
│ │ └── app.module.ts
│ └── Dockerfile
│
├── frontend/
│ ├── src/
│ │ ├── pages/
│ │ ├── components/
│ │ └── lib/
│ └── Dockerfile
│
├── python-producer/
│ ├── app.py
│ └── Dockerfile
│
├── go-worker/
│ ├── main.go
│ └── Dockerfile
│
├── docker-compose.yml
├── .env.example
└── README.md


---

## 🚀 Como Executar o Projeto

### Pré-requisitos
- Docker
- Docker Compose

### 1️⃣ Criar arquivo `.env`

Na raiz do projeto:

```bash
cp .env.example .env
