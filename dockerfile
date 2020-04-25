# # base image
FROM node:alpine


# Create app directory
WORKDIR /usr/src/app/frontend
# Install app dependencies
COPY package*.json ./

# RUN npm install --production
RUN apk --no-cache --virtual build-dependencies add \
    python \
    make \
    g++ \
    && npm install \
    && apk del build-dependencies
# Copy app source code
COPY . .

#Expose port and start application
EXPOSE 3000
CMD ["npm", "start"]

# # Dockerfile
# # 1st Stage
# FROM node:10.15.1 AS builder
# RUN mkdir -p /usr/src/app
# WORKDIR /usr/src/app
# COPY package.json .
# COPY package-lock.json .
# RUN npm install --ignore-platform
# COPY . .
# RUN npm build

# # 2nd Stage
# FROM nginx:1.14.2-alpine
# COPY --from=builder /usr/src/app/build /usr/share/nginx/html
# WORKDIR /usr/share/nginx/html
# CMD ["nginx", "-g", "daemon off;"]