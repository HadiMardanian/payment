FROM node:20-alpine AS build 

WORKDIR /app

COPY package*.json ./

RUN npm ci --verbose

FROM node:20-alpine AS release
WORKDIR /app
COPY --from=build /app/dist .
ENTRYPOINT ["node", "dist/main.js"]


