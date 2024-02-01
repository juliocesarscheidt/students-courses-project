FROM node:20-alpine
LABEL maintainer="Julio Cesar <julio@blackdevs.com.br>"

WORKDIR /app

COPY ./package.json ./yarn.lock ./
RUN yarn install --production \
  && yarn cache clean

COPY . .
RUN yarn build

EXPOSE 4040

CMD ["yarn", "start"]
