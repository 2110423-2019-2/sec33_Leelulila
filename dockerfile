# # base image
# FROM node:alpine

# # set working directory
# RUN mkdir /usr/src/app
# WORKDIR /usr/src/app

# # add `/usr/src/app/node_modules/.bin` to $PATH
# ENV PATH /usr/src/app/node_modules/.bin:$PATH

# # install and cache app dependencies
# COPY package.json /usr/src/app/package.json
# RUN npm install
# RUN npm install react-scripts -g

# # start app
# CMD ["npm", "start"]

# Dockerfile
# 1st Stage
FROM node:10.15.1 AS builder
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json .
COPY package-lock.json .
RUN npm install --ignore-platform
COPY . .
RUN npm build

# # 2nd Stage
# FROM nginx:1.14.2-alpine
# COPY --from=builder /usr/src/app/build /usr/share/nginx/html
# WORKDIR /usr/share/nginx/html
# CMD ["nginx", "-g", "daemon off;"]

FROM nginx:1.14.2-alpine
# COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /usr/src/app/build /usr/share/nginx/html
EXPOSE 80
RUN chown nginx.nginx /usr/share/nginx/html/ -R