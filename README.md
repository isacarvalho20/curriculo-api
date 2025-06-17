# API REST - Currículo Pessoal

API REST desenvolvida com Express.js e PostgreSQL para gerenciamento de currículo pessoal.

## Funcionalidades

- **Dados Pessoais**: Informações básicas do candidato
- **Formação Acadêmica**: Histórico educacional
- **Experiência Profissional**: Trabalhos e cargos ocupados
- **Habilidades**: Competências técnicas e soft skills
- **Projetos**: Portfólio de projetos desenvolvidos
- **Certificações**: Certificados e cursos realizados
- **Idiomas**: Proficiência em diferentes idiomas

## Tecnologias Utilizadas

- Node.js
- Express.js
- PostgreSQL
- Express Validator
- Helmet (Segurança)
- Morgan (Logs)
- CORS

## Configuração

1. Clone o repositório
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Configure as variáveis de ambiente:
   ```bash
   cp env.example .env
   ```
4. Edite o arquivo `.env` com suas configurações do Back4App
5. Execute a aplicação:
   ```bash
   npm run dev
   ```

## Endpoints da API

### Dados Pessoais
- `GET /api/dados-pessoais` - Listar todos
- `GET /api/dados-pessoais/:id` - Buscar por ID
- `POST /api/dados-pessoais` - Criar novo
- `PUT /api/dados-pessoais/:id` - Atualizar
- `DELETE /api/dados-pessoais/:id` - Excluir

### Formação Acadêmica
- `GET /api/formacao` - Listar todas
- `GET /api/formacao/:id` - Buscar por ID
- `POST /api/formacao` - Criar nova
- `PUT /api/formacao/:id` - Atualizar
- `DELETE /api/formacao/:id` - Excluir

### Experiência Profissional
- `GET /api/experiencia` - Listar todas
- `GET /api/experiencia/:id` - Buscar por ID
- `POST /api/experiencia` - Criar nova
- `PUT /api/experiencia/:id` - Atualizar
- `DELETE /api/experiencia/:id` - Excluir

### Habilidades
- `GET /api/habilidades` - Listar todas
- `GET /api/habilidades/:id` - Buscar por ID
- `POST /api/habilidades` - Criar nova
- `PUT /api/habilidades/:id` - Atualizar
- `DELETE /api/habilidades/:id` - Excluir

### Projetos
- `GET /api/projetos` - Listar todos
- `GET /api/projetos/:id` - Buscar por ID
- `POST /api/projetos` - Criar novo
- `PUT /api/projetos/:id` - Atualizar
- `DELETE /api/projetos/:id` - Excluir

### Certificações
- `GET /api/certificacoes` - Listar todas
- `GET /api/certificacoes/:id` - Buscar por ID
- `POST /api/certificacoes` - Criar nova
- `PUT /api/certificacoes/:id` - Atualizar
- `DELETE /api/certificacoes/:id` - Excluir

### Idiomas
- `GET /api/idiomas` - Listar todos
- `GET /api/idiomas/:id` - Buscar por ID
- `POST /api/idiomas` - Criar novo
- `PUT /api/idiomas/:id` - Atualizar
- `DELETE /api/idiomas/:id` - Excluir

## Estrutura do Projeto

```
src/
├── config/
│   └── database.js
├── controllers/
│   ├── dadosPessoaisController.js
│   ├── formacaoController.js
│   ├── experienciaController.js
│   ├── habilidadesController.js
│   ├── projetosController.js
│   ├── certificacoesController.js
│   └── idiomasController.js
├── db/
│   ├── initDb.js
│   └── schema.sql
├── models/
│   ├── dadosPessoais.js
│   ├── formacao.js
│   ├── experiencia.js
│   ├── habilidades.js
│   ├── projetos.js
│   ├── certificacoes.js
│   └── idiomas.js
├── routes/
│   ├── dadosPessoais.js
│   ├── formacao.js
│   ├── experiencia.js
│   ├── habilidades.js
│   ├── projetos.js
│   ├── certificacoes.js
│   └── idiomas.js
└── index.js
``` 