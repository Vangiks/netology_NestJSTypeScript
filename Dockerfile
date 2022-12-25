FROM node:16-alpine

WORKDIR /usr/src/app

ARG NODE_ENV=production
RUN npm install yarn -g -f

COPY package*.json yarn.lock ./
RUN yarn --frozen-lockfile --prefer-offline
COPY . .

RUN yarn build

EXPOSE 3000

CMD ["node", "dist/main.js"]