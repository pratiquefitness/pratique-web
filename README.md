# Pratique em Casa - Web

Sistema do Pratique em Casa desenvolvido em NextJS/React. Sistema mobile first para utilização dentro deu uma WebView do
Aplicativo Pratique em Casa.

## ⚙️ Instalação

Instale as dependências do projeto com o `yarn`

```
yarn
```

## 📦 Banco de Dados

Para funcionamento do projeto, utilizamos o prisma como ORM para acesso aos bancos de dados. Cada configuração de banco
de dados fica em um `schemma` na pasta prisma com a extenção .prisma.

Para atualizar os schemas utilize:

```
npx prisma db pull --schema prisma/pratiqueaulas.prisma
```

Para gerar as classes de conexão utilize:

```
npx prisma generate --schema prisma/pratiqueaulas.prisma
```

## 📚 Funcionamento

### `dev`

Inicie o projeto com o autoReload ativado.

```
yarn dev
```

### `start`

Inicie o projeto compilado com o autoReload desativado.

```
yarn start
```

### `build`

```
yarn build
```
