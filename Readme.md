# GoBarber
Aplicação desenvolvida no GoStack 11

- [GoBarber](#gobarber)
  - [Run](#run)
  - [Commands building](#commands-building)
    - [Arquivo de configuração](#arquivo-de-configuração)
  - [Ferramentas](#ferramentas)
  - [Servidor de produção](#servidor-de-produção)


## Run

Para iniciar o projeto rode os seguintes comandos
- `yarn` (Ira instalar todas as dependências)

  **Bancos de dados**

  Obs: No linux talvez seja necessario incluir `sudo`.

- `docker run --name gobarber-pgsql -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres`
- `docker run --name gobarber-mongo -p 27017:27017 -d -t mongo`
- `docker run --name gobarber-redis -p 6379:6379 -d -t redis:alpine`


- `yarn typeorm migration:run`


## Commands building

`yarn add -D @babel/cli @babel/core @babel/node @babel/preset-env @babel/preset-typescript babel-plugin-module-resolver babel-plugin-transform-typescript-metadata @babel/plugin-proposal-decorators @babel/plugin-proposal-class-properties`

### Arquivo de configuração
- babel.config.js
```javascript
module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }],
    '@babel/preset-typescript'
  ],
  plugins: [
    ['module-resolver', {
      alias: {
        '@modules': './src/modules',
        '@config': './src/config',
        '@shared': './src/shared'
      }
    }],
    'babel-plugin-transform-typescript-metadata',
    ['@babel/plugin-proposal-decorators', { 'legacy': true }],
    ['@babel/plugin-proposal-class-properties', { 'loose': true }]
  ],
}
```
## Ferramentas
- VSCode
- Insomnia
- DBeaver
- Beekeeper
- MongoDb Compass

- Redis: Armazena cache dos dados consultados no banco dedos, para visualizar as informações usei [Redis UI](https://www.electronjs.org/apps/redis-gui-unofficial)

  **Windows**
  Baixa o `.exe` e instale.

  **Ubuntu**
  Arquivo tera uma extensão `.AppImage` para executar execute os passos seguintes:
  ![sparkless](docs/2021-04-28%2013-45-26.gif)

## Servidor de produção

No Nível 06 do bootcamp foi usada a DigitalOceam para subir o servidor e inclur toda a configuração do Integração e Entrega continua. Como meu foco era compreender mais sobre o ambiente da AWS(Amanzon Web Service), criei um passo a passo que tive que fazer para enviar a aplicação, a diferença é pouca da Digital para AWS.

[AWS ServerUp](docs/AwsServerUp.md)

