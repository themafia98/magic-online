FROM node:14.17.3-alpine3.11 as development

RUN apk update && \
    apk add git

# Install PM2
RUN npm install -g pm2

RUN mkdir -p /var/www/magic-backend
WORKDIR /var/www/magic-backend

# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /var/www/magic-backend/node_modules/.bin:$PATH
# create user with no password
RUN adduser --disabled-password admin

# Copy existing application directory contents
COPY . /var/www/magic-backend
# install and cache app dependencies
COPY package.json /var/www/magic-backend/package.json
COPY yarn.lock /var/www/magic-backend/yarn.lock

# grant a permission to the application
RUN chown -R admin:admin /var/www/magic-backend
USER admin

# clear application caching
RUN yarn cache clean --all

RUN yarn

EXPOSE 3003
# start run in production environment

RUN yarn build

CMD [ "yarn", "pm2:delete" ]
CMD [ "yarn", "build-docker:dev" ]

# start run in development environment
# CMD [ "yarn", "start:dev" ]