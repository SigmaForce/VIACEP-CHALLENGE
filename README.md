# Introdução

Abaixo você ira encontrar Detalhes do Projeto, desde a Instalação até as Decisões Técnicas sobre o Projeto.

Caso você queira visualizar e testar você pode seguir o passo a passo de Instalação ou Acessar diretamente o [site](https://viacep-challenge.vercel.app/)

## Instalação e Execução

### Pré Requisitos

Antes de iniciar, Certifique-se de ter instalado:

- [Node.js](https://nodejs.org/en) (Versão LTS)
- npm

### Passos para rodar o projeto

1. Clone o repositório:

```bash
git clone https://github.com/SigmaForce/VIACEP-CHALLENGE.git
```

2. Acesse a Pasta do Projeto:

```bash
cd VIACEP-CHALLENGE
```

3. Instale as dependências do projeto:

```bash
npm install
```

4. Inicie o projeto

```bash
npm run dev
```

5. Abra seu navegador [http://localhost:3000](http://localhost:3000) para visualizar o projeto.

## Decisões Técnicas

### Estrutura do Projeto

Para estruturar o Projeto utilizei uma estrutura modularizada, proporciona organização, escalabilidade e permite que cada funcionalidade fique separada de forma lógica, facilitando a manutenção do código.

```bash
📂 src
├───📂 app # Páginas do Next.js
│   └───📂 _components # Componentes reutilizaveis na página em questão.
├───📂 components # Componentes reutilizáveis (Botões, Inputs, etc.)
├───📂 context # Context API para gerenciamento de estado.
├───📂 hooks # Hooks personalizados
├───📂 types # Definições de tipos TypeScript
└───📂 utils # Funções auxiliares
```

### Gerenciamento de Estado

Utilizei a **Context API** para gerenciar o estado da aplicação, pois é uma solução nativa do React, simples de implementar e eficiente para compartilhar dados entre os componentes sem a necessidade de bibliotecas externas.

### Persistência de Dados

#### Cache de Requisições

- Para evitar chamadas desnecessárias à API, implementei um cache dentro do contexto, armazenando os CEPs buscados em um estado local (cachedCEP).

- Antes de fazer uma nova requisição, o sistema verifica se o CEP já está armazenado. Se estiver, os dados são retornados, sem necessidade de uma nova consulta.

- Esse cache, porém, é temporário e se perde ao recarregar a página, já que não está sendo persistido.

#### Persistência dos CEPs Salvos

- Sempre que um novo CEP é salvo, ele é armazenado no LocalStorage, permitindo que os dados persistam entre sessões.

- Ao carregar a aplicação, os CEPs previamente salvos são recuperados automaticamente, proporcionando uma experiência contínua ao usuário.

- O LocalStorage foi escolhido por ser uma solução simples e eficiente para armazenar pequenas quantidades de dados localmente, sem a necessidade de um banco de dados externo.
