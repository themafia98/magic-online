FROM node:14.17.3-alpine3.11 as development

WORKDIR /usr/src/app

COPY package*.json ./

RUN apk update && \
    apk add git

RUN yarn install

COPY . .

# check files list
RUN ls -a

RUN yarn build

CMD ["yarn", "start:debug"]