FROM node:14.17.3-alpine3.11 AS frontend-build

# create app dir
WORKDIR /usr/src/app

# install packages
# the asterisk symbol ("*") is used to ensure that
# copy both package.json and package-lock.json
COPY package*.json ./

RUN yarn
# If you are creating a production assembly
# RUN npm ci --only = production

# copy the source code
COPY . .

# check files list
RUN ls -a

RUN yarn build

FROM nginx:1.8.1-alpine
COPY --from=frontend-build /usr/src/app/build /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/nginx.conf
RUN sleep 10
EXPOSE 80
CMD [ "nginx", "-g", "daemon off;" ]