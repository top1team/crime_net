### how to set up database

1. download postgres

2. open the terminal and switch to postgres psql user

```
    sudo -u postgres psql
```

3. create a database

```shell
    sudo -u postgres psql
```

create a password for your user in our case 'crime_user'
```psql shell
    CREATE ROLE crime_user WITH LOGIN PASSWORD 'mypassword';
```

switch to that user and grant user with privileges to create, insert, delete, etc.
```psql shell
    \c crime_user
    GRANT ALL PRIVILEGES ON DATABASE crime_net TO crime_user;
```