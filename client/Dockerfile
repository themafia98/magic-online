FROM node:lts-alpine AS frontend-build

RUN apk update && \
    apk add git

# Install python/pip
ENV PYTHONUNBUFFERED=1
RUN apk add --update --no-cache python2 && ln -sf python2 /usr/bin/python
RUN python2 -m ensurepip
RUN pip2 install --no-cache --upgrade pip setuptools

# create app dir
WORKDIR /usr/src/app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install packages
# the asterisk symbol ("*") is used to ensure that
# copy both package.json and package-lock.json
COPY package*.json ./


RUN npm install
# If you are creating a production assembly
# RUN npm ci --only = production

# copy the source code
COPY . .

# check files list
RUN ls -a

RUN npm run build

FROM nginx:1.8.1-alpine
COPY --from=frontend-build /usr/src/app/build /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/nginx.conf
RUN sleep 10
EXPOSE 80
CMD [ "nginx", "-g", "daemon off;" ]