FROM node:lts AS base

WORKDIR /var/www/html

COPY . /var/www/html

RUN npm install





FROM base AS prod

RUN npm install --only=production \
    && npm run build

