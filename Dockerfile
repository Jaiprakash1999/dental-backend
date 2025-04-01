# Use this Dockerfile instead
FROM node:18.17.1-slim

WORKDIR /usr/src/app
COPY package*.json ./
COPY tsconfig.json ./
RUN npm install
COPY . .
RUN npm run build

CMD ["node", "dist/src/main.js"]