# Travel Planner - API (Back-end)

Esta é a API RESTful construída para alimentar o front-end do **Travel Planner**. O sistema gerencia viagens, itinerários diários e faz o controle financeiro através de categorias e despesas.

A arquitetura foi desenhada separando as responsabilidades (Controllers, Services, Models, Routes), visando manter o código limpo, escalável e de fácil manutenção.

---

## Tecnologias Utilizadas

* **Runtime:** Node.js
* **Framework:** Express.js
* **Banco de Dados:** MongoDB
* **ODM:** Mongoose

## Por que MongoDB? (Nota sobre o Banco de Dados)

Ao analisar as regras de negócio deste projeto (Viagens que possuem Despesas, que por sua vez pertencem a Categorias), a abordagem mais tradicional e natural seria utilizar um **Banco de Dados Relacional (SQL)**,
como PostgreSQL ou MySQL, devido ao forte relacionamento e integridade referencial entre as entidades.

No entanto, a escolha do **MongoDB (NoSQL)** para este projeto foi uma **decisão intencional com fins de estudo e prática**. O objetivo principal foi exercitar a modelagem de dados orientada a documentos, 
explorar referências entre coleções usando o Mongoose e aprofundar os conhecimentos no ecossistema NoSQL em cenários do mundo real.

## Estrutura do Projeto

O projeto segue uma arquitetura modularizada, baseada nas seguintes pastas:

* **`/config`**: Configurações gerais da aplicação (ex: conexão com o banco de dados).
* **`/controllers`**: Responsáveis por receber as requisições HTTP, repassar para os services e devolver as respostas padronizadas ao front-end.
* **`/helpers`**: Funções utilitárias e reaproveitáveis (ex: padronização de respostas de sucesso/erro).
* **`/middleware`**: Interceptadores de requisições (tratamento de erros, validações, etc).
* **`/models`**: Schemas do banco de dados definidos através do Mongoose.
* **`/routes`**: Definição dos endpoints da API, conectando as URLs aos respectivos controllers.
* **`/seed`**: Scripts para popular o banco de dados com informações iniciais (ex: categorias de despesas padrão).
* **`/services`**: Onde reside toda a regra de negócio da aplicação, isolando a lógica do banco de dados das rotas HTTP.

## Funcionalidades Principais

* **Viagens:** CRUD completo de viagens.
* **Despesas:** Registro de gastos vinculados a uma viagem específica.
* **Categorias Dinâmicas:**
  * Script de *Seed* executado ao iniciar o servidor para criar categorias padrão do sistema.
  * Suporte a criação de categorias personalizadas atreladas a viagens específicas (garantindo privacidade e contexto dinâmico).

## Como rodar o projeto localmente

**Pré-requisitos:** Você precisará do [Node.js](https://nodejs.org/) instalado e de uma instância do MongoDB rodando (local ou nuvem via MongoDB Atlas).

1. **Clone este repositório:**
   ```bash
   git clone https://github.com/valeriasoars/travel-planner-api-nodejs.git
   
2. **Acesse a pasta do projeto:**
   ```bash
   cd travel-planner-api-nodejs
   
3. **Instale as dependências:**
   ```bash
   npm install
   
4. **Configuração de Variáveis de Ambiente:**
   * Crie um arquivo .env na raiz do projeto.
   * Adicione a sua string de conexão do MongoDB. Exemplo:
   ```bash
   PORT=5000
   MONGO_URI=sua_string_de_conexao_aqui
   JWT_SECRET=

5. **Execute o servidor em modo de desenvolvimento:**
   ```bash
   npm run dev

A API estará rodando em http://localhost:5000/
