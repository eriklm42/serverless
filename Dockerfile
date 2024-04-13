FROM node:20-slim

WORKDIR /src

COPY package.json package-lock.json  /src/

RUN yarn install --silent

COPY . .

CMD yarn offline:start -s test -e dev