FROM node:lts-alpine

WORKDIR /app

COPY package*.json ./

COPY client/package*.json client/
RUN npm run install-client

COPY server/package*.json server/
RUN npm run install-server

COPY client/ client/
RUN npm run build --prefix client

COPY server/ server/

USER root

RUN apk update

RUN apk add sudo

RUN echo "node ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers

USER node

CMD [ "sudo", "npm", "start", "--prefix", "server" ]

EXPOSE 5000
