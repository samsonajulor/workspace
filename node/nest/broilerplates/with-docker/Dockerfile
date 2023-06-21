FROM node:lts-alpine

ARG NODE_ENV

WORKDIR /var/www/backend

RUN apk add bash

# install global dependencies
RUN npm i -g typescript ts-node nodemon @nestjs/cli

RUN if [[ ${NODE_ENV} = 'production' ]]; then npm i -g pm2; fi

COPY ./package.json ./

# Copy local code to the container image.
COPY . .

# hack for proper nest build - install separately dev and prod dependencies.
# if use "npm install", than swagger plugin error breaks the build. No working solutions found in official nest docs 
RUN if [[ ${NODE_ENV} = 'development' ]]; then npm install; else npm install --only=prod && npm install --only=dev ; fi

RUN npm install

RUN chmod +x /var/www/backend/start_app.sh

# Display directory structure
RUN ls -l -a

# Expose API port
EXPOSE 5000

