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

  ```bash
  $ sudo yarn global add install pm2
  ```

- Adicionar serviço no pm2

  ```bash
  $ pm2 start dist/shared/infra/http/server.js --name gobarber-api
  ```

- List process with pm2

  ```bash
  $ pm2 list
  ```

- Run command `$ pm2 startup systemd` para que o pm2 mantenha a aplicação sempre em execução, expected response:

  ```bash
  [PM2] Init System found: systemd[PM2] To setup the Startup Script, copy/paste the following command:
  sudo env PATH=$PATH:/usr/bin /usr/local/share/.config/yarn/global/node_modules/pm2/bin/pm2 startup systemd -u ubuntu --hp /home/ubuntu
  ```

- Execute o comando que o **pm2** retornou:

  ```bash
  $ sudo env PATH=$PATH:/usr/bin /usr/local/share/.config/yarn/global/node_modules/pm2/bin/pm2 startup systemd -u ubuntu --hp /home/ubuntu
  ```

- Retorno esperado

  ```bash
  [PM2] Init System found: systemd
  Platform systemd
  Template
  [Unit]
  Description=PM2 process manager
  Documentation=https://pm2.keymetrics.io/
  After=network.target

  [Service]
  Type=forking
  User=ubuntu
  LimitNOFILE=infinity
  LimitNPROC=infinity
  LimitCORE=infinity
  Environment=PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/snap/bin:/usr/bin:/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin
  Environment=PM2_HOME=/home/ubuntu/.pm2
  PIDFile=/home/ubuntu/.pm2/pm2.pid
  Restart=on-failure

  ExecStart=/usr/local/share/.config/yarn/global/node_modules/pm2/bin/pm2 resurrect
  ExecReload=/usr/local/share/.config/yarn/global/node_modules/pm2/bin/pm2 reload all
  ExecStop=/usr/local/share/.config/yarn/global/node_modules/pm2/bin/pm2 kill

  [Install]
  WantedBy=multi-user.target

  Target path
  /etc/systemd/system/pm2-ubuntu.service
  Command list
  [ 'systemctl enable pm2-ubuntu' ]
  [PM2] Writing init configuration in /etc/systemd/system/pm2-ubuntu.service
  [PM2] Making script booting at startup...
  [PM2] [-] Executing: systemctl enable pm2-ubuntu...
  Created symlink /etc/systemd/system/multi-user.target.wants/pm2-ubuntu.service → /etc/systemd/system/pm2-ubuntu.service.
  [PM2] [v] Command successfully executed.
  +---------------------------------------+
  [PM2] Freeze a process list on reboot via:
  $ pm2 save

  [PM2] Remove init script via:
  $ pm2 unstartup systemd
  ```

- Para obter log da aplicação, run ```$ pm2 log```

## Docker live
Para manter os container sempre online, mesmo após alguma reinicialização:

- Run:

  ```bash
  $ docker update --restart=unless-stopped
  ```

## Config Domain and SSL
