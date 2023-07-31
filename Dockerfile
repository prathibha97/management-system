# FROM node:lts-alpine

# WORKDIR /app

# COPY package*.json ./

# COPY client/package*.json client/
# RUN npm run install-client

# COPY server/package*.json server/
# RUN npm run install-server

# COPY client/ client/
# RUN npm run build --prefix client

# COPY server/ server/

# USER root

# RUN apk update

# RUN apk add sudo

# RUN echo "node ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers

# USER node

# CMD [ "sudo", "npm", "start", "--prefix", "server" ]

# EXPOSE 5000

# Base image for building the Node.js application
FROM node:lts-alpine as build

WORKDIR /app

COPY package*.json ./

COPY client/package*.json client/
RUN npm run install-client

COPY server/package*.json server/
RUN npm run install-server

COPY client/ client/
RUN npm run build --prefix client

COPY server/ server/

# Production image
FROM node:lts-alpine

WORKDIR /app

COPY --from=build /app/package*.json ./

COPY --from=build /app/server/ ./server/
COPY --from=build /app/client/build ./client/build/

USER root

RUN apk update
RUN apk add sudo
RUN echo "node ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers

# Install Nginx
RUN apk add nginx

# Remove the default Nginx configuration
RUN rm /etc/nginx/conf.d/default.conf

# Copy your custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/

USER node

CMD [ "sudo", "npm", "start", "--prefix", "server" ]

EXPOSE 5000
