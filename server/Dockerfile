FROM node:14.17.3-alpine3.11 as development

WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn

COPY . .

# check files list
RUN ls -a

RUN yarn build

CMD ["yarn", "start:prod"]