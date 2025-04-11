# **BeautyManager - Back-End**

[![Node.js](https://img.shields.io/badge/Node.js-393.svg?style=flat&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-000000.svg?style=flat&logo=express&logoColor=white)](https://expressjs.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6.svg?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-2D3748.svg?style=flat&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=flat&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Stripe](https://img.shields.io/badge/Stripe-626CD9?style=flat&logo=stripe&logoColor=white)](https://stripe.com/)
[![Vercel](https://img.shields.io/badge/Vercel-000000.svg?style=flat&logo=vercel&logoColor=white)](https://vercel.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 💡 **Sobre**
Este repositório contém a **API Back-End** para o sistema **BeautyManager**, uma plataforma **SaaS (Software as a Service)** desenvolvida para a gestão eficiente de salões de beleza. Construída com **Node.js, Express e TypeScript**, esta API é o núcleo do sistema, responsável por:

*   Gerenciar dados de usuários, clientes, serviços (assignments) e agendamentos.
*   Implementar a lógica de negócios e regras de acesso.
*   Gerenciar autenticação e autorização de usuários via JWT.
*   Integrar-se com o **Stripe** para processar pagamentos, gerenciar assinaturas (planos gratuito e premium) e lidar com webhooks.

A API serve como a fonte de dados e lógica para o [Front-End do BeautyManager](https://github.com/Antonio-Savio/BeautyManager-front-end).

---

## 🌐 Sistema em funcionamento
- Aplicação Front-End Consumindo esta API:
<img src="./src/assets/beauty-manager.gif" alt="demonstração de funcionalidades do BeautyManager">

---

## 🔗 Links da aplicação
- [Deploy back-end](https://beauty-manager-back-end.vercel.app/)
- [Deploy front-end](https://beauty-manager-front-end.vercel.app/)
- [Repositório do front-end](https://github.com/Antonio-Savio/BeautyManager-front-end)

---

## ✅ **Funcionalidades Principais e Destaques**
*   **Modelo SaaS com Gerenciamento de Assinaturas:** Lógica para lidar com diferentes níveis de acesso (gratuito e premium) baseados no status da assinatura do usuário, gerenciada via **Stripe**.
*   **Autenticação Segura (JWT):** Implementação de autenticação stateless usando JSON Web Tokens, com middleware (`isAuthenticated`) para proteger rotas.
*   **Autorização Baseada em Assinatura:** Verificação do status da assinatura do usuário para liberar acesso a funcionalidades premium.
*   **API RESTful:** Endpoints bem definidos para operações CRUD em Usuários, Clientes, Serviços (Assignments) e Agendamentos.
*   **ORM Moderno:** Utilização do Prisma para interação com o banco de dados PostgreSQL, garantindo type-safety, migrações simplificadas e alta produtividade no desenvolvimento.
*   **Integração Completa com Stripe:**
    *   Criação de sessões de checkout do Stripe.
    *   Manipulação de webhooks do Stripe para atualizar o status das assinaturas em tempo real.
    *   Criação de links para o Portal do Cliente Stripe.
*   **Código Tipado (TypeScript):** Desenvolvimento 100% em TypeScript para maior robustez, manutenibilidade e prevenção de erros em tempo de desenvolvimento.
*   **Arquitetura Escalável:** Design modular com separação de responsabilidades (controllers, services, middlewares) e uso de banco de dados relacional eficiente, preparado para crescimento.

---

## ⚙️ **Tecnologias Utilizadas**
*   **Runtime:** Node.js
*   **Framework:** Express.js
*   **Linguagem:** TypeScript
*   **Banco de Dados:** PostgreSQL
*   **ORM:** Prisma
*   **Autenticação:** bcryptjs (Hashing de Senha), jsonwebtoken (JWT)
*   **Pagamentos:** Stripe
*   **Middleware:** CORS, Body-Parser
*   **Implantação:** Vercel

---

## 🗺️ Endpoints da API

*Autenticação (`isAuthenticated`) necessária para rotas marcadas com `(auth)`.*

**Usuários (User)**
*   `POST /users` - Cadastra um novo usuário (requer `name`, `email`, `password` no **body**).
*   `POST /session` - Realiza login (requer `email`, `password` no **body**), retorna token JWT.
*   `GET /user` - Obtém detalhes do usuário autenticado. `(auth)`
*   `PUT /user` - Atualiza dados do usuário autenticado (requer dados como `name`, `address` no **body**). `(auth)`
*   `GET /status` - Verifica o status da assinatura (ativo/inativo) do usuário autenticado. `(auth)`

**Serviços (Assignment)**
*   `POST /assignment` - Cria um novo serviço (requer `name`, `price` no **body**). `(auth)`
*   `GET /assignments` - Lista os serviços do usuário. `(auth)`
*   `DELETE /assignment` - Deleta um serviço (requer `assignment_id` como **query parameter**). `(auth)`
*   `GET /assignmentsnumber` - Conta o número de serviços do usuário. `(auth)`
*   `GET /assignment` - Obtém detalhes de um serviço específico (requer `assignment_id` como **query parameter**). `(auth)`
*   `PUT /assignment` - Atualiza um serviço (requer `assignment_id` como **query parameter** e `name`, `price` no **body**). `(auth)`

**Clientes (Customer)**
*   `POST /customer` - Cria um novo cliente (requer `name`, `phone` no **body**). `(auth)`
*   `GET /customers` - Busca clientes do usuário pelo nome, ou telefone (aceita `name` ou `phone` como **query parameter** para busca). `(auth)`
*   `GET /customerlist` - Lista todos os clientes do usuário autenticado. `(auth)`
*   `GET /customer` - Obtém detalhes de um cliente específico (requer `customer_id` como **query parameter**). `(auth)`
*   `DELETE /customer` - Deleta um cliente (requer `customer_id` como **query parameter**). `(auth)`
*   `PUT /customer` - Atualiza um cliente (requer `customer_id` como **query parameter** e `name`, `phone` no **body**). `(auth)`

**Agendamentos (Scheduling)**
*   `POST /schedule` - Cria um novo agendamento (requer `customer_id`, `assignment_id`, `time` no **body**). `(auth)`
*   `GET /schedule` - Lista os agendamentos do usuário. `(auth)`
*   `DELETE /schedule` - Deleta um agendamento (requer `schedule_id` como **query parameter**). `(auth)`

**Assinaturas (Subscription - Stripe)**
*   `POST /subscribe` - Cria uma sessão de checkout do Stripe para o usuário iniciar/alterar assinatura. `(auth)`
*   `POST /webhooks` - Endpoint público para receber eventos do Stripe (requer `bodyParser.raw`, assinatura verificada).
*   `POST /create-portal` - Cria uma sessão do Portal do Cliente Stripe para o usuário gerenciar sua assinatura. `(auth)`

---

## ⇅ **Relação entre tabelas do banco**
<img src="src/assets/database_relation.png" alt="relação entre as tabelas do banco de dados" width="80%">

A interação com o banco de dados PostgreSQL é gerenciada pelo **Prisma ORM**. O schema (`prisma/schema.prisma`) define os seguintes modelos principais:

*   **User:** Representa os usuários do sistema (proprietários/gerentes de salão). Contém informações de login, dados pessoais e relacionamento com assinaturas, serviços, clientes e agendamentos.
*   **Subscription:** Armazena o status e detalhes da assinatura Stripe de cada usuário.
*   **Assignment:** Representa os serviços oferecidos pelo salão (ex: corte, manicure).
*   **Customer:** Armazena os dados dos clientes do salão.
*   **Scheduling:** Registra os agendamentos, relacionando Usuário, Cliente e Serviço.

---

## 📁 **Estrutura do Projeto**
O projeto está organizado na seguinte estrutura:

```
/prisma
  ├── schema.prisma   # modelos do banco de dados
/src
  ├── @types/express/ # Extenção da tipagem do express para incluir o user_id
  ├── controllers/    # Controladores da aplicação
  ├── middlewares/    # Middleware para autenticação de rotas
  ├── prisma/         # Instancia o PrismaClient para se comunicar com o banco
  ├── services/       # Lógica de negócios
  ├── utils           # Funções utilitárias do stripe
  ├── routes.ts       # Definição das rotas
  └── server.ts       # Parte mais alta da aplicação para definição de middlewares globais
```

---

## 🚀 **Como Executar Localmente**
### **Pré-requisitos**
- Node.js 
- NPM ou Yarn
- Git
- Banco de Dados PostgreSQL
- Conta na Stripe configurada com:
    *   Chaves de API (Secret Key).
    *   Um produto e um preço criados para a assinatura premium.
    *   Um endpoint de Webhook configurado para apontar para sua API local.

---

### **Instalação e Configuração**
Siga os passos abaixo para rodar o projeto localmente:

```bash
# Clone o repositório
git clone https://github.com/Antonio-Savio/BeautyManager-back-end.git

# Acesse o diretório do projeto
cd BeautyManager

# Instale as dependências
npm install
```

### Configuração do Ambiente
Crie um arquivo `.env` e adicione as variáveis de ambiente necessárias, como:
```bash
# Conexão com o Banco de Dados PostgreSQL
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"

# Segredo para assinatura e verificação do JWT
JWT_SECRET="SEU_SEGREDO_PARA_JWT"

#Porta do seu servidor local
PORT=SUA_PORTA

# Chave Pública da API Stripe
NEXT_PUBLIC_STRIPE_PUBLIC_KEY="SUA_CHAVE_PUBLICA_STRIPE"

# Chave Secreta da API Stripe
STRIPE_API_KEY="SUA_CHAVE_SECRETA_STRIPE"

# ID do Preço (Price ID) do seu plano de assinatura no Stripe
STRIPE_PRICE="SEU_PRICE_ID_STRIPE"

# URL para onde o Stripe redirecionará após sucesso/falha no checkout
STRIPE_REDIRECT_URL="http://localhost:3000/dashboard" # Ajuste conforme seu front-end

# Chave Secreta do Endpoint de Webhook (Webhook Signing Secret) (whsec_...)
STRIPE_WEBHOOK_SECRET="SUA_CHAVE_SECRETA_WEBHOOK_STRIPE"
```

---

### Configuração do Banco de Dados
Certifique-se de que seu PostgreSQL esteja rodando e as credenciais no `DATABASE_URL` estejam corretas. Execute as migrações do Prisma:
```bash
# Aplica as migrações para criar/atualizar as tabelas no banco
npx prisma migrate dev
# ou
yarn prisma migrate dev

# (Opcional) Gera o Prisma Client se necessário
npx prisma generate
# ou
yarn prisma generate
```


### **Execute em sua máquina**

```bash
yarn dev
# ou
npm run dev
```

---

## ☁️ Implantação / Deploy

Este projeto está configurado para implantação na **Vercel**.

*   O arquivo `vercel.json` fornece a configuração básica.
*   O script `vercel-build` no `package.json` (`"tsc --build && prisma generate && prisma migrate deploy"`) lida com o processo de build:
    1.  Compila TypeScript para JavaScript.
    2.  Gera o Prisma Client.
    3.  Aplica as migrações do banco de dados.
*   **Configuração Essencial**: É crucial configurar todas as variáveis de ambiente listadas na seção `.env` nas configurações da plataforma de hospedagem.
*   **Webhook**: O endpoint de webhook (`/webhooks`) na URL de produção deve ser configurado corretamente no dashboard do Stripe.
*   **Banco de Dados**: Utilize um serviço de banco de dados PostgreSQL hospedado (ex: Neon, Supabase, ElephantSQL) e configure a `DATABASE_URL` de acordo.
---

## 🤝 **Contribuição**
Contribuições são bem-vindas! Siga os passos abaixo:
1. Faça um fork do projeto.
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`).
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`).
4. Push para a branch (`git push origin feature/nova-feature`).
5. Abra um Pull Request.

---

## 📄 **Licença**
Este projeto está sob a licença MIT. Consulte o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 📧 **Contato**
Se tiver dúvidas ou sugestões, entre em contato:
- **Email** - [savio.aragao@hotmail.com](mailto:savio.aragao@hotmail.com)
- **GitHub**: [Antonio-Savio](https://github.com/Antonio-Savio)
- **LinkedIn**: [antonio-savio](https://www.linkedin.com/in/antonio-savio)
