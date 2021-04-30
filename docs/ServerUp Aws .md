# Linux

# AWS

**Step 1: Create a Security group**
https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/get-set-up-for-amazon-ec2.html


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

  or

  docker run --name mongo \
  -e MONGO_INITDB_ROOT_USERNAME=gobarber \
  -e MONGO_INITDB_ROOT_PASSWORD=f7a4082e95968685c49539ae7ecbb27d \
  -p 27017:27017 \
  -d mongo
  ```
- MongoDB

  ```bash
  docker run --name gobarber-mongo \
  -e MONGODB_USERNAME=gobarber \
  -e MONGODB_USERNAME=<passoword> \
  -p 47017:27017 \
  -d bitnami/mongodb:latest

  ```
- Redis

  ```bash
  docker run --name gobarber-redis \
  -e REDIS_PASSWORD=<password>
  -p 36379:6379 \
  -d bitnami/redis:latest
  ```

# Configure Ngix
Probably need to run the command as `sudo su` to do etiting files `nginx`
- Run:

  ```bash
  $ sudo apt install nginx
  $ sudo ufw allow 80

  ```
- Browse to `sites-available`:

  ```bash
  $ cd /etc/nginx/sites-available
  ```

- Copy file `default`

  ```bash
  $ cp default gobarber
  $ nano gobarber
  ```

- Paste into gobaber file:
  ```text
  server {
    listen 80 default_server;
    listen [::]:80 default_server;

    server_name _;

    location / {
      proxy_pass http://localhost:3333;
      proxy_http_version 1.1;
      proxy_set_header Upgrade $http_upgrade;
      proxy_set_header Connection 'upgrade';
      proxy_set_header Host $host;
      proxy_cache_bypass $http_upgrade;
    }
  }
  ```
- Now browse to `sites-enabled`:

  ```bash
  $ cd /etc/nginx/sites-enabled
  $ ln -s /etc/nginx/sites-available/gobarber gobarber
  ```

- Finally run `nginx -t`, expected response:

  ```bash
  nginx: the configuration file /etc/nginx nginx.conf syntax is ok

  nginx: configuration file /etc/nginx/nginx.conf test is successful
  ```
## Start Server

```bash
  $ service nginx reload
  $ service nginx restart
```

## Application live

- Using PM2

```sudo yarn install -g p```

## Docker live

```docker update --restart=unless-stopped```
