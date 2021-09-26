<h1 align="center">Happy  </h1>

<p align="justify">Plataforma WEB e Mobile, para pessoas encontrarem um orfanato para visitas, e fazerem o dia de uma criança mais feliz!</p>

Durante o evento foi desenvolvido a tela do mapa, juntamente com a criação do orfanato na plataforma. E depois que o evento foi nos dados alguns desafios que eu contrui para treinar minhas habilidades. Eu desenvolvi a dashboard administrativa com login via token jwt, listagem dos orfananatos cadastrados, tal como a edição e remoção dos mesmos. Também construí um fluxo de cadastros pendentes.

### :computer: Novas funcionalidades (Versão 2.0)

- [x] Autenticação de usuários

- [x] Recuperação de senhas

- [x] Dashboard administrativa

- [x] Listagem de todos os orfanatos cadastrados

- [x] Listagem dos orfanatos pendentes

- [x] Edição do orfanato

- [x] Splash Screen no React Native

### :nut_and_bolt: Tecnologias

Esse projeto foi desenvolvido com as seguintes técnologias:

- [Node.js][nodejs]
- [TypeScript][typescript]
- [React][reactjs]
- [React Native][rn]
- [Expo][expo]

[nodejs]: https://nodejs.org/
[typescript]: https://www.typescriptlang.org/
[expo]: https://expo.io/
[reactjs]: https://reactjs.org
[rn]: https://facebook.github.io/react-native/
[yarn]: https://yarnpkg.com/

### Como rodar o projeto?

Você vai precisar ter docker instalado na sua máquina para rodar o banco de dados PostgreSQL ou instalar diretamente na sua máquina.

#### Backend

```bash
# Clone a aplicação
git clone https://github.com/defauth98/happy.git

# Entre no diretório do backend
cd server

# Instale as dependencias
yarn

# Rode o banco de dados usando o docker
docker run --name nlw -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres

# Configure as variveis de ambiente (.env) e rode as migrations
yarn migrate

# Rode a aplicação
yarn dev
```

#### Frontend

```bash
# Entre no diretório do backend
cd web

# Instale as dependencias
yarn

# Configure o seu api em /src/services/api.ts e rode o app
yarn start
```

#### Mobile

```bash
# Entre no diretório do backend
cd mobile

# Instale as dependencias
yarn

# Configure o seu api em /src/services/api.ts e rode o app
yarn start
```

### Autor

👤 **Daniel Ribeiro**

- Twitter: [@defauth8](https://twitter.com/defauth8)
- Github: [@defauth98](https://github.com/defauth98)
- LinkedIn: [@daniel-ribeiro-397604164](https://linkedin.com/in/daniel-ribeiro-397604164)

## Licença

The [MIT License]() (MIT)

Copyright :copyright: 2020 - Happy
