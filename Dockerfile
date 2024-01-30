FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json /app
COPY yarn.lock /app/

RUN yarn install

COPY . .

EXPOSE 3000

RUN yarn build

CMD [ "yarn", "start" ]
# CMD [ "yarn", "dev" ]
