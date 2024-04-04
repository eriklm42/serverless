FROM node:20-slim

WORKDIR /src

COPY package.json package-lock.json  /src/

RUN yarn ci --silent

COPY . .

CMD yarn start