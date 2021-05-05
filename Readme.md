# GoBarber

**Sumario**
- [GoBarber](#gobarber)
  - [Objetivo](#objetivo)
  - [Produção](#produção)
    - [Links](#links)
    - [Rotas](#rotas)
  - [Begin](#begin)
    - [Bancos de dados](#bancos-de-dados)
  - [Ferramentas](#ferramentas)
  - [Servidor de produção](#servidor-de-produção)

## Objetivo
Gobarber é uma aplicação proposta no GoStack 11, para ser um agendador de serviço para cabeleireiros, podendo ser agendada pelo cliente através do app mobile(Não desenvolvido, pois meu foco foi no backend e front) e gerenciado pelos cabeleireiros através do navegador.

Pretendo incorporar a parte de agendamento do cliente que foi desenvolvimento no app mobile no app web.

Pontos interessantes abordados nesta aplicação:

- Typescript para o desenvolvimento, traz melhor compreensão do projeto, o que facilita o desenvolvimento e futuras alterações/manutenções no código;

- DDD(Domain driven design), Foi interessante ver a aplicabilidade dos mesmo, no começo me pareceu mais como complicação para desenvolver do que solução, porém, com a medida que aplicação vai crescendo é perceptível a facilidade de encontrar ou criar um novo arquivo, por conta do domínio.

- SOLID, claro que nenhum principio é uma bala de prata, e que cada projeto pode ser necessário incluir 1 ou mais destes princípios. Saber quando aplicar ainda é um tanto complicado, porém, creio que com desenvolvimento de outras aplicações vai se tornando mais nítido de quando aplicar algum destes princípios.

- Uso do Pattern Service e Repository que visam separar resposabilidades e abstrair regras de negocio

- Amazon SES - resposável pelo envio de email, por enquanto aplicado apenas na recuperação da senha

- Amazon EC2 - Servidor que escolhi para upar a aplicação, o projeto original Diego Fernandez faz uso da Digital Ocean, optei pela Amazon por querer aprender mais sobre seus serviços. Deixei ate um mini tutorial do projeto nom eu github, disponível no link abaixo

- Aquisição e configuração de um domínio

- Uso do Netlify para hospedar o frontend

## Produção

### Links
- [GoBarber Web](https://www.gobarber.copyrights.tech/)
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

