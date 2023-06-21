## NestJS + PostgreSQL + Docker Starter Template

<!-- TODO: add desc about compodoc and auth with jwt -->

### Description

Starter Template for building apps with Nest.js backend and PostgreSQL database, wrapped in docker containers.<br/>
Main purpose of this starter is to save developers time, which is usually spend on creating basic skeletons, configs and getting all together when building the apps.

### What's inside

- [x] PostgreSQL local database
- [x] Nest.js as backend server
- [x] Environments for development and production modes
- [x] Configs setup
- [x] Basic user module with most common CRUD
- [x] Auth module with signin/signup logic
- [x] Jwt auth implementation, local and jwt strategies
- [x] Git hooks support (pre-commit + commit-msg)
- [x] Conventional Commits Support
- [x] Docker + docker-compose configs
- [x] Pm2 support for production
- [x] Migrations support for production
- [x] Open API swagger docs configs
- [x] App compodoc documentation

### Before use

##### Envs

You need to setup envs before using the starter.<br/>

```bash
$ touch .env # create env file

# check .env.example for envs names
# setup envs in .env according to prod/dev/debug mode
```

##### Git Hooks

Starter has git hooks support and alrady has pre-commit and commit hooks added:

- pre-commit hook start eslint check on backend. if eslint fails, the commit won't happen with errors logs output and tip what to do. Hooks can be updated to add some actions, e.g. eslint for possible frontend.
- commit-msg hook checks if the commit message corresponds with conventional commits. Starter uses [git-conventional-commits](https://github.com/qoomon/git-conventional-commits). Please check it's docs and modify settings if needed.<br/>
  NOTE: <br/>
  To use conventional commits:

```bash
  # install package
  npm install --global git-conventional-commits

  # give access to hooks files to make it work
  chmod +x .git-hooks/commit-msg
  chmod +x .git-hooks/pre-commit

```

### How to use

Starter has 2 docker containers - one for database and one for backend. All configs are set up. Everything can be started via docker-compose one-line commands.<br/>
Note: you may need "sudo" for bash.

- Before first launch:<br/>

  ```bash
   # before fisrt start
   npm install # to avoid ts warnings in ide
  [sudo] docker-compose build # build containers, also use it for rebuilding existing containers
  ```

- Start/stop app:<br/>

  ```bash
    [sudo] docker-compose up # start containers

    # Note: you can run container in a detached mode
    [sudo] docker-compose up -d
    # To check containers logs
    [sudo] docker-compose logs -f
    # To stop containers
    [sudo] docker-container down # stops and removes containers
    # To restart containers
    [sudo] docker-container restart
  ```

  NOTE:<br/>
  In dev mode migrations are applied automatically via nest-typeorm synchronize prop.<br/>
  In production mode migrations are generated via typeorm cli together with the server launch when launching containers. No need to create or generate it manually before launch of server, everything can be done automatically when containers start. To apply new migrations just restart working container with server

### Documentation

Server API docs are created via Swagger nest package<br/>

App documentation was created via [compodoc](https://docs.nestjs.com/recipes/documentation) tool. To check the docs:

```bash
  # generate latest docs and lauches web server to inspect docs in browser at http://localhost:8080
  npm run compodoc
```

### What's next

Main purpose of this starter template is to rid developers of creating the basic projects skeleton and spending a lot of time with setting up basic projects configs.<br/>
Feel free to use this starter template for building own apps, modify it as you need and actually change it whatever you like to fit your project demands.
