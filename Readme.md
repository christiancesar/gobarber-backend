# GoBarber
Aplicação desenvolvida no GoStack 11

**Sumario**
- [GoBarber](#gobarber)
  - [Produção](#produção)
    - [Links](#links)
    - [Rotas](#rotas)
  - [Begin](#begin)
    - [Bancos de dados](#bancos-de-dados)
  - [Ferramentas](#ferramentas)
  - [Servidor de produção](#servidor-de-produção)


## Produção

### Links
- [GoBarber Web](https://gobarber.copyrights.tech/)
  - Repositorio:
  [gobarber-frontend](https://github.com/christiancesar/gobarber-frontend)

- [GoBarber API](https://api.gobarber.copyrights.tech/)
  - Repositorio:
  [gobarber-backend](https://github.com/christiancesar/gobarber-backend)

### Rotas

  [GoBarberApi - Docs](docs/APIDocumentation.md)

  [Insomnia Routes](docs/Insomnia_routes_gobarber)


## Begin

- Clonar repositorio:

  ```bash
  $ git clone https://github.com/christiancesar/gobarber-backend.git
  ```
- Instalar todas as dependências

  ```bash
  $ yarn
  ```

### Bancos de dados

Obs: No linux talvez seja necessario incluir `sudo`.

```bash
$ docker run --name gobarber-pgsql -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres

$ docker run --name gobarber-mongo -p 27017:27017 -d -t mongo

$ docker run --name gobarber-redis -p 6379:6379 -d -t redis:alpine

# Run migrations
$ yarn typeorm migration:run
```

## Ferramentas
- VSCode

- Insomnia

- DBeaver

- Beekeeper

- MongoDb Compass

- Redis: Armazena cache dos dados consultados no banco dedos, para visualizar as informações usei [Redis UI](https://www.electronjs.org/apps/redis-gui-unofficial)

  **Windows:**

  Baixa o `.exe` e instale.

  **Ubuntu:**

  Arquivo tera uma extensão `.AppImage` para executar execute os passos seguintes:
  ![sparkless](docs/2021-04-28%2013-45-26.gif)

## Servidor de produção

No Nível 06 do bootcamp foi usada a Digital Ocean para subir o servidor e inclur toda a configuração do Integração e Entrega continua. Como meu foco era compreender mais sobre o ambiente da AWS(Amanzon Web Service), criei um passo a passo que tive que fazer para enviar a aplicação, a diferença é pouca da Digital para AWS.

[AWS ServerUp](docs/AwsServerUp.md)

