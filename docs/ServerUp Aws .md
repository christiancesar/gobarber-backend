# Linux

## Install dependencies

### Docker
- https://docs.docker.com/engine/install/ubuntu/#install-using-the-repository#Installation-methods
- run:

  ```bash
  $ sudo groupadd docker
  $ sudo usermod -aG docker $USER
  ```


### NodeJs
- Always download LTS version:
  https://github.com/nodesource/distributions/blob/master/README.md#debinstall

### Yarn
  - https://classic.yarnpkg.com/en/docs/install#debian-stable


## Create SSH key for github

- In github -> Profile -> Settings -> SSH and GPG keys
- Click in **New SSH key**
- Include name for key in *Title*
- Paste SSH in *Key* executing command in terminal server cloud, run:

  ```bash
  $ ssh-keygen
  $ cd ~/.ssh
  $ cat id_rsa.pub
  ```
## Cloning repository
- First create directory:

  ```bash
  $ cd ~
  $ mkdir app
  $ cd app
  ```
- In github select option SSH and paste terminal:

  ```bash
  $ git clone <repository>
  $ cd <name-project>
  $ yarn
  ```

## Creating databases

- PostgreSQL

  ```bash
  docker run --name gobarber-pgsql \
  -e POSTGRESQL_PASSWORD=<password> \
  -e POSTGRESQL_USERNAME=postgres \
  -e POSTGRESQL_DATABASE=gobarber \
  -p 35432:5432 \
  -d bitnami/postgresql:latest
  ```
- MongoDB

  ```bash
  docker run --name gobarber-mongo \
  -e MONGO_USERNAME=gobarber \
  -e MONGO_PASSWORD=<passoword> \
  -p 427017:27017 \
  -d bitnami/mongodb:latest

  ```
- Redis

  ```bash
  docker run --name gobarber-redis \
  -e REDIS_PASSWORD=<password>
  -p 36379:6379 \
  -d bitnami/redis:latest
  ```
