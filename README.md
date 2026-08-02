# Freelando

Freelando é uma aplicação web de marketplace para conectar clientes e profissionais freelancers. O projeto permite encontrar profissionais, publicar projetos, enviar propostas, favoritar perfis, avaliar prestadores e gerenciar uma conta.

O frontend foi desenvolvido com React, TypeScript e Vite. Ele pode ser executado sem backend por meio de uma conta demonstrativa e armazenamento local, mantendo também a integração com uma API em `http://localhost:8080`.

## Funcionalidades

### Acesso e conta

- Login integrado à API, com fallback para conta demonstrativa.
- Persistência da sessão no navegador.
- Logout.
- Recuperação de senha simulada.
- Cadastro dividido em seleção de perfil, interesses e dados pessoais.
- Proteção de páginas privadas e retorno à página originalmente solicitada após o login.
- Edição de nome, cidade, UF, apresentação e habilidades do perfil.

### Marketplace

- Busca de profissionais por nome, título ou habilidade.
- Perfis detalhados com especialidades e avaliações.
- Lista de profissionais favoritos.
- Publicação e busca de projetos.
- Detalhes de projeto, orçamento, prazo e situação.
- Envio de propostas com valor, prazo e mensagem.
- Aceite e recusa de propostas.
- Acompanhamento das propostas enviadas.
- Avaliação de profissionais com nota e comentário.
- Dashboard com resumo das atividades.

## Tecnologias

- React 18
- TypeScript 5
- Vite 4
- React Router 6
- Emotion
- Axios
- React Grid System

## Requisitos

- Node.js 18 ou superior.
- npm 9 ou superior.

## Instalação

Clone o repositório, entre na pasta e instale as dependências:

```bash
git clone <URL_DO_REPOSITORIO>
cd freelando
npm install
```

Inicie o ambiente de desenvolvimento:

```bash
npm run dev
```

O Vite exibirá no terminal o endereço local da aplicação, normalmente `http://localhost:5173`.

## Conta demonstrativa

Quando a API não estiver disponível, use:

```text
E-mail: demo@freelando.com
Senha: 123456
```

O login tenta primeiro acessar `POST /auth/login`. Se a API estiver indisponível, somente a conta demonstrativa é aceita.

## Comandos

| Comando | Descrição |
| --- | --- |
| `npm run dev` | Inicia o servidor de desenvolvimento. |
| `npm run typecheck` | Verifica os tipos sem gerar arquivos. |
| `npm run build` | Verifica os tipos e gera o build de produção em `dist/`. |
| `npm run preview` | Executa uma prévia local do build. |
| `npm run lint` | Analisa os arquivos TypeScript e TSX com ESLint. |

## Rotas

### Públicas

| Rota | Finalidade |
| --- | --- |
| `/` | Página inicial. |
| `/login` | Autenticação. |
| `/recuperar-senha` | Solicitação de recuperação de senha. |
| `/cadastro` | Seleção do tipo de conta. |
| `/cadastro/interesses` | Seleção de interesses. |
| `/cadastro/dados-pessoais` | Dados para cadastro. |
| `/cadastro/concluido` | Confirmação do cadastro. |
| `/profissionais` | Busca e listagem de profissionais. |
| `/projetos` | Busca e listagem de projetos. |

### Protegidas

| Rota | Finalidade |
| --- | --- |
| `/dashboard` | Resumo da conta e das atividades. |
| `/area-logada/perfil` | Edição do perfil. |
| `/favoritos` | Profissionais favoritos. |
| `/profissionais/:id` | Perfil completo e avaliações. |
| `/projetos/novo` | Publicação de projeto. |
| `/projetos/:id` | Detalhes e propostas de um projeto. |
| `/minhas-propostas` | Propostas enviadas. |

Ao tentar abrir uma rota protegida sem sessão, o usuário é enviado para `/login`.

## Arquitetura

```text
src/
├── componentes/       Componentes visuais reutilizáveis e proteção de rotas
├── contexto/          Estado de sessão, cadastro e marketplace
├── http/              Cliente Axios e renovação de token
├── paginas/           Páginas públicas, cadastro e área autenticada
├── router/            Definição das rotas
├── tipos/             Tipos de domínio compartilhados
├── utils/             Armazenamento dos tokens
├── App.tsx            Composição dos providers
└── main.tsx           Ponto de entrada
```

### Contextos

- `SessaoUsuario`: autenticação, usuário atual, perfil, favoritos e recuperação de senha.
- `CadastroUsuario`: dados e etapas do cadastro.
- `Marketplace`: profissionais, projetos, propostas e avaliações.

### Tipos de domínio

Os contratos principais ficam em `src/tipos/index.ts`:

- `Usuario`
- `Profissional`
- `Projeto`
- `Proposta`
- `Avaliacao`

## Persistência local

Enquanto não há um backend completo, os novos recursos são persistidos em `localStorage`:

| Chave | Conteúdo |
| --- | --- |
| `freelando_usuario` | Sessão, perfil e favoritos do usuário. |
| `freelando_projetos` | Projetos publicados. |
| `freelando_propostas` | Propostas enviadas e seus estados. |
| `freelando_avaliacoes` | Avaliações publicadas. |

Os tokens de acesso e renovação são guardados em `sessionStorage` com as chaves `access_token` e `refresh_token`. Eles são removidos ao fazer logout ou fechar a sessão do navegador.

Para limpar os dados demonstrativos, apague o armazenamento do site nas ferramentas do navegador.

## Integração com API

O cliente HTTP está configurado em `src/http/index.ts` com a URL base:

```text
http://localhost:8080/
```

Endpoints atualmente utilizados:

| Método | Endpoint | Uso |
| --- | --- | --- |
| `POST` | `/auth/login` | Autenticação. |
| `POST` | `/auth/register` | Cadastro. |
| `GET` | `/auth/refresh` | Renovação dos tokens. |

Requisições autenticadas recebem automaticamente o cabeçalho:

```http
Authorization: Bearer <access_token>
```

Uma resposta `401` em uma rota protegida inicia a renovação do token e tenta repetir a requisição original.

Projetos, propostas, favoritos e avaliações ainda usam persistência local. Para integrá-los a um backend, substitua as operações correspondentes em `src/contexto/Marketplace.tsx` por chamadas ao cliente HTTP.

## Build de produção

Execute:

```bash
npm run build
```

O comando roda o compilador TypeScript e, se não houver erros, gera os arquivos otimizados em `dist/`.

Para testar o resultado:

```bash
npm run preview
```

## Observações de segurança

- O modo demonstrativo existe apenas para desenvolvimento e não deve ser usado como autenticação de produção.
- A recuperação de senha atual simula o envio de instruções.
- Dados em `localStorage` podem ser alterados pelo usuário e não devem ser considerados confiáveis por um backend.
- Em produção, autorização, validação, propriedade dos projetos e aceite de propostas devem ser verificados no servidor.



## Licença

Projeto fictício para fins educacionais. Defina uma licença antes de reutilizá-lo ou distribuí-lo publicamente.
