FROM node:16-bullseye

WORKDIR /home/app

RUN apt-get install cron

COPY package.json yarn.lock ./
RUN yarn install --immutable
COPY . .
RUN yarn build
RUN yarn install --production --immutable
