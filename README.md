# COP30 Guia Virtual

Projeto desenvolvido para ajudar visitantes a se locomoverem pela cidade de Belém do Pará durante a COP30, facilitando a localização de comércios, hotéis e outros locais de interesse público por meio de um mapa interativo dinâmico.

## Tecnologias

### Backend
- Node.js, Express, TypeScript
- Prisma ORM com PostgreSQL
- Bcrypt para hash de senhas
- Jsonwebtoken (JWT) para autenticação segura
- Cookie-parser para gerenciamento de cookies
- Zod para validação de dados
- Docker Compose para containerização

### Frontend
- React com Vite
- Ant Design (antd) para UI
- Axios para comunicação HTTP
- React Router Dom para navegação SPA
- React Toastify para notificações
- Styled Components para estilização
- API ViaCEP para validação de CEP
- Bun como runtime e gerenciador de pacotes

### Ferramentas Auxiliares
- Beekeeper Studio: gerenciamento e consulta do banco PostgreSQL
- Docker: criação e orquestração de containers para backend e banco
- Hoppscotch: ferramenta para testar e consultar APIs
- draw.io: criação do modelo conceitual do banco de dados e diagramas
- WSL (Windows Subsystem for Linux): ambiente Linux para executar Docker no Windows
- Visual Studio Code (VSCode): editor de código para desenvolvimento

## Arquitetura

O backend foi estruturado com base na Clean Architecture, com camadas bem definidas:

- **Repository**: comunicação direta com o banco de dados.
- **Service**: lógica de negócio e tratamento de erros.
- **Controller**: recebe as requisições e retorna respostas.
- **Middleware**: valida autenticação, autorização e cookies JWT.

## Funcionalidades

- Exibição dinâmica de locais de interesse em mapa interativo.
- Sistema de autenticação para usuários comuns e administradores.
- Validação de CEP via API pública ViaCEP.
- Feedbacks em tempo real para o usuário via notificações.
- Proteção das rotas via middleware de autenticação.

## Como executar

### Requisitos
- Docker e Docker Compose instalados
- Bun instalado (https://bun.sh/)
- WSL (para usuários Windows, opcional mas recomendado)

### Rodando o backend
```bash
docker-compose up
