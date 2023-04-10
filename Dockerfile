FROM node:14.17.1

RUN mkdir -p /usr/src/app
ENV PORT 3001

WORKDIR /usr/src/app

COPY package.json /usr/src/app
COPY yarn.lock /usr/src/app

RUN yarn install

COPY . /usr/src/app

EXPOSE 3001

CMD [ "yarn", "dev" ]
