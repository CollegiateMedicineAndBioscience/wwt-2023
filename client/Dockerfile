# syntax=docker/dockerfile:1
FROM node:18-alpine
WORKDIR /app
COPY ["package.json", ".npmrc", "./"]
RUN npm install
COPY . .
EXPOSE 3000/tcp
CMD npm start
