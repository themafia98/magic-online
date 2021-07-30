FROM node:lts-alpine AS frontend-build

RUN apk update && \
    apk add git

# Install required dependencies (Alpine Linux packages)
RUN \
  apk add --no-cache \
  g++ \
  gcc \
  make \
  curl \
  git \
  python \
  && git clone https://github.com/sass/sassc \
  && cd sassc \
  && git clone https://github.com/sass/libsass \
  && SASS_LIBSASS_PATH=/sassc/libsass make

# install
RUN mv sassc/bin/sassc /usr/bin/sass

# cleanup
RUN rm -rf /var/cache/apk/* && rm -rf /sassc

# Install (global) NPM packages/dependencies
RUN npm install --ignore-optional -g \
  node-gyp


RUN mkdir -p /var/www/magic-frontend
WORKDIR /var/www/magic-frontend

# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /var/www/magic-backend/node_modules/.bin:$PATH
# create user with no password
RUN adduser --disabled-password admin

# Copy existing application directory contents
COPY . /var/www/magic-frontend
# install and cache app dependencies
COPY package.json /var/www/magic-frontend/package.json
COPY yarn.lock /var/www/magic-frontend/yarn.lock

# grant a permission to the application
RUN chown -R admin:admin /var/www/magic-frontend
USER admin

# clear application caching
RUN yarn cache clean --all

# Add the two entries below
RUN mkdir -p node_modules/node-sass/vendor/linux-x64-51
RUN curl -L https://github.com/sass/node-sass/releases/download/v6.0.1/linux-x64-51_binding.node -o node_modules/node-sass/vendor/linux-x64-51/binding.node

RUN yarn --ignore-optional
ADD . .

RUN yarn build

FROM nginx:1.8.1-alpine
COPY --from=frontend-build /var/www/magic-frontend/dist /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/nginx.conf
RUN sleep 5
EXPOSE 80
CMD [ "nginx", "-g", "daemon off;" ]
