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

## 🚀 Como Executar o Projeto

### Pré-requisitos
- Docker
- Docker Compose

2️⃣ Criar arquivo .env

Na raiz do projeto:

cp .env.example .env


Preencha com:

MONGO_URI=mongodb://mongo:27017/gdash

JWT_SECRET=supersecreto
JWT_EXPIRES_IN=1d

DEFAULT_ADMIN_EMAIL=admin@example.com
DEFAULT_ADMIN_PASSWORD=123456

OPENWEATHER_API_KEY=SUA_CHAVE
CITY=Rio de Janeiro

RABBITMQ_HOST=rabbitmq
RABBITMQ_URL=amqp://guest:guest@rabbitmq:5672/
RABBITMQ_QUEUE=weather_queue

API_BASE_URL=http://api:3000
VITE_API_URL=http://localhost:3000

3️⃣ Subir tudo com Docker
docker-compose build
docker-compose up

### 🌐 Acessos
Serviço	URL
Frontend	http://localhost:5173

Backend API	http://localhost:3000

RabbitMQ UI	http://localhost:15672

MongoDB	mongodb://localhost:27017
🔐 Usuário Padrão

Criado automaticamente na inicialização:

Email: admin@example.com
Senha: 123456

📹 Vídeo de Apresentação

🎥 Vídeo explicativo (YouTube – em produção):
👉 (Em produção)

O vídeo demonstrará:

Arquitetura geral

Pipeline de dados

Funcionamento do dashboard

Geração de insights

Execução via Docker Compose

### 🧪 Boas Práticas Aplicadas

Arquitetura modular

Separação clara de responsabilidades

Comunicação assíncrona via fila

DTOs e validação

Hash de senha com bcrypt

JWT stateless

Uso correto de variáveis de ambiente

Código tipado (TypeScript)

Containers isolados

### 🧠 Decisões Técnicas

RabbitMQ para desacoplar coleta e processamento

Go como worker por performance e simplicidade

NestJS como core do domínio

MongoDB por flexibilidade de schema

Docker Compose para padronizar execução

Insights calculados no backend, evitando lógica no frontend

### 🧩 Possíveis Evoluções

Filtros por período no dashboard

Gráficos interativos (charts)

Alertas climáticos automáticos

Integração com API pública paginada (PokéAPI / SWAPI)

Testes automatizados

Deploy em ambiente cloud


Thiago Maia Fioravanti de Almeida
Desenvolvedor Full Stack | Backend | Integração de Sistemas

🔗 GitHub: https://github.com/TmFioravanti

🔗 LinkedIn: https://www.linkedin.com/in/thiago-maia-fioravanti-de-almeida-28a078149/
