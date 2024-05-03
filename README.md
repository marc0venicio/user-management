
## Installation

entre no client e execute

```bash
$ npm install
```

volte para a raiz e execute os comandos.
## Postgres

Install docker and docker compose and run the command:

```bash
docker-compose -f docker-compose.dev.yml build
docker-compose -f docker-compose.dev.yml up -d
docker exec -it 'nome ou id do container' sh
```

run migration

```bash
npm run typeorm:run:win
```

username: admin
password: password

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```