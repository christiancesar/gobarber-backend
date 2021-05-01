# Beekeeper

- [Beekeeper](#beekeeper)
  - [Install Beekeeper](#install-beekeeper)
  - [Configurations](#configurations)
    - [Server](#server)
  - [Connect](#connect)

## Install Beekeeper

- See https://docs.beekeeperstudio.io/installation/#linux-installation


## Configurations

### Server

Using **AWS** it is necessary to open the door to connect to the database.

This website has more complete explanations: https://www.stitchdata.com/docs/security/data-encryption/setting-up-ssh-tunnel-for-amazon-web-services

But by going to a security group and editing the entry rules, it is already possible to connect to the bank. Remembering that it may be freeing to be accessed from anywhere or from a specific IP.

## Connect

- Host/SSH Hostname, can be the IP or URL;

- Secret is in the user, in this case when I created the machine on AWS, the user was created automatically, so I used the same user to connect. Apparently beekeeper creates its own SSH.

  In some unsuccessful attempts, I tried to create an SSH for beekeeper and add my newly created SSH to the server in `authorized_keys`, however there was an authorization error.


![Beekeeper](Screenshot%20from%202021-04-30%2023-37-31.png)


