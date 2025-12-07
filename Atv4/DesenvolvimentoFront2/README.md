# EcoWATT - Sistema de Gerenciamento

Sistema de gerenciamento desenvolvido com React, utilizando React Router, Context API, SASS e integração com API externa.

## 🔗 Demo

**Link de acesso**: [https://desenvolvimento-front2.vercel.app/](https://desenvolvimento-front2.vercel.app/)

Acesse a aplicação em produção hospedada na Vercel.

## 🚀 Como Inicializar o Projeto

### Pré-requisitos
- Node.js (versão 16 ou superior)
- npm ou yarn

### Instalação

1. **Clone o repositório**
```bash
git clone <url-do-repositorio>
cd DesenvolvimentoFront2
```

2. **Instale as dependências**
```bash
npm install
```

3. **Execute o projeto**
```bash
npm run dev
```

4. **Execute os testes**
```bash
npm test
```

5. **Acesse a aplicação**
- URL: `http://localhost:5173`
- Login padrão: `admin` / `1234`

## 📋 Atividades e Requisitos Implementados

### Atividade 4: Criação de Rotas

#### Requisitos:
- ✅ **Usar a biblioteca React Router**
  - **Localização**: `src/main.jsx`
  - **Implementação**: Utiliza `createBrowserRouter` e `RouterProvider`
  - **Rotas configuradas**: `/`, `/registro`, `/home`, `/perfil/:userId`, `/adicionar`

- ✅ **Utilizar rotas aninhadas para manter um leiaute padrão**
  - **Localização**: `src/components/LayoutPadrao/LayoutPadrao.jsx`
  - **Implementação**: Componente com `<Outlet />` para rotas filhas
  - **Rotas protegidas**: `/home`, `/perfil/:userId` e `/adicionar` usam o layout padrão

- ✅ **Configurar as páginas de login e registro**
  - **Login**: `src/components/Login/Login.jsx` (rota `/`)
  - **Registro**: `src/pages/Registro.jsx` (rota `/registro`)
  - **Funcionalidades**: Validação, localStorage, navegação

- ✅ **Configurar rotas para outras DUAS páginas do projeto**
  - **Home**: `src/pages/Home.jsx` (rota `/home`) - Lista usuários
  - **Perfil**: `src/pages/Perfil.jsx` (rota `/perfil/:userId`) - Detalhes do usuário
  - **Adicionar**: `src/pages/AdicionarUsuario.jsx` (rota `/adicionar`) - Formulário para adicionar usuário

- ✅ **Usar parâmetros (useParams) em pelo menos uma rota**
  - **Localização**: `src/pages/Perfil.jsx`
  - **Implementação**: `const { userId } = useParams()`
  - **Rota**: `/perfil/:userId`

- ✅ **Manter dados mockados**
  - **Localização**: `src/data/db.json` e `localStorage`
  - **Implementação**: Dados de usuários armazenados localmente

### Atividade 5: Context API e Estilização SASS

#### Requisitos:
- ✅ **Implementar Context API**
  - **Localização**: `src/context/`
  - **Implementação**:
    - `ApiContext.jsx` - Gerencia chamadas à API e estado relacionado
      - Funções: `getUsers()`, `getUserById()`, `createUser()`, `updateUser()`, `deleteUser()`
      - Hook personalizado: `useApi()` para acesso ao contexto
    - `AuthContext.jsx` - Gerencia autenticação e estado do usuário
      - Funções: `login()`, `logout()`, `register()`
      - Hook personalizado: `useAuth()` para acesso ao contexto

- ✅ **Estilização com SASS**
  - **Localização**: `src/index.sass`
  - **Implementação**: 
    - Componente Card com variáveis SASS (`$primary-color`, `$secondary-color`, etc)
    - Utiliza recursos SASS como aninhamento (`&__header`, `&__body`)
    - Implementa modificadores BEM (`&--primary`, `&--success`, `&--danger`)

- ✅ **Utilizar useNavigate para navegação**
  - **Localização**: Em vários componentes como `Login.jsx`, `Registro.jsx`, `AdicionarUsuario.jsx`
  - **Implementação**: `const navigate = useNavigate()` para redirecionamento

- ✅ **Páginas de acesso restrito**
  - **Localização**: `src/main.jsx` e `src/components/LayoutPadrao/LayoutPadrao.jsx`
  - **Implementação**: Rotas protegidas dentro do LayoutPadrao
  - **Autenticação**: Simulada através do localStorage com token

### Atividade 6: Prime API Login

#### Requisitos:
- ✅ **Desenvolver páginas de acordo com recursos da API (pelo menos três)**
  - **Recursos implementados**:
    - `getUsers()` - Lista usuários (Home)
    - `getUserById(id)` - Busca usuário (Perfil)
    - `createUser(data)` - Cria usuário (Adicionar)
    - `updateUser(id, data)` - Atualiza usuário (Home)
    - `deleteUser(id)` - Remove usuário (Home)

- ✅ **Implementar Testes com dados mockados**
  - **Localização**: `src/test/`
  - **Arquivos**:
    - `Home.test.jsx` - Testa componente Home
    - `mockData.test.js` - Testa operações com dados mockados
    - `mockData.js` - Dados de teste

- ✅ **Implementar autenticação Bearer Token com Axios**
  - **Localização**: `src/services/api.js` e `src/context/AuthContext.jsx`
  - **Implementação**: 
    - Interceptors do Axios para Bearer Token automático
    - Headers de autorização em todas as requisições
    - Logout automático em caso de erro 401

### Atividade 7: Dashboard CRUD

#### Requisitos:
- ✅ **Desenvolver CRUDs necessários de acordo com recursos da API**
  - **Localização**: `src/context/ApiContext.jsx` e páginas relacionadas
  - **Implementação**:
    - **Create**: Adicionar usuários (`/adicionar`)
    - **Read**: Listar e visualizar usuários (`/home`, `/perfil/:id`)
    - **Update**: Editar usuários inline na Home
    - **Delete**: Excluir usuários com confirmação

- ❌ **Integração com backend real**
  - **Status**: Pendente
  - **Descrição**: Atualmente utilizando API mockada (jsonplaceholder). Integração com backend real será implementada em versão futura.

## 🏗️ Estrutura do Projeto

```
src/
├── components/
│   ├── LayoutPadrao/     # Layout com navegação
│   └── Login/            # Componente de login
├── context/
│   ├── ApiContext.jsx    # Context para chamadas à API
│   └── AuthContext.jsx   # Context para autenticação
├── pages/
│   ├── Home.jsx          # Lista de usuários
│   ├── Perfil.jsx        # Detalhes do usuário
│   ├── AdicionarUsuario.jsx # Adicionar usuário
│   └── Registro.jsx      # Cadastro de usuários
├── services/
│   └── api.js            # Serviços da API
├── data/
│   └── db.json           # Dados locais
├── test/
│   ├── Home.test.jsx     # Testes do Home
│   ├── mockData.test.js  # Testes com dados mockados
│   └── mockData.js       # Dados de teste
├── index.sass            # Estilos SASS
└── main.jsx              # Ponto de entrada da aplicação
```

## 🔐 Sistema de Autenticação

### Usuários Padrão
- **Admin**: `admin` / `1234`
- **Fernando**: `fernando` / `123456`
- **Maria**: `maria` / `123456`

### Fluxo de Login
1. Usuário acessa `/`
2. Insere credenciais
3. Sistema valida contra `db.json` + `localStorage`
4. Gera token Bearer e salva no localStorage
5. Redireciona para `/home` se válido

## 🧪 Testes

### Executar Testes
```bash
npm test          # Executa todos os testes
npm run test:ui   # Interface gráfica dos testes
```

## 🛠️ Tecnologias Utilizadas

- **React 19.1.0** - Framework principal
- **React Router DOM 7.6.2** - Roteamento
- **Axios 1.10.0** - Cliente HTTP
- **SASS 1.89.2** - Pré-processador CSS
- **Vite 6.3.5** - Build tool
- **Vitest 2.1.8** - Framework de testes
- **Testing Library** - Testes de componentes
- **Context API** - Gerenciamento de estado

## 📝 Próximos Passos

- Integração com backend real
- Implementação de refresh token
- Melhorias na interface do usuário
- Expansão dos testes automatizados