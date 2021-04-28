## GoBarber
Aplicação desenvolvida no GoStack 11

## Run

Para iniciar o projeto rode os seguintes comandos
- `yarn`

  Bancos de dados usados na aplicação (no linux talvez seja necessario incluir `sudo`)
- `sudo docker run --name gobarber-pgsql -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres`
- `docker run --name gobarber-mongo -p 27017:27017 -d -t mongo`
- `docker run --name gobarber-redis -p 6379:6379 -d -t redis:alpine`


- `yarn typeorm migration:run`
