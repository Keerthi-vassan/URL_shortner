FROM node:22-alpine

WORKDIR /app

COPY package.json package-lock.json ./
COPY apps/backend/package.json ./apps/backend/

RUN npm install

COPY apps/backend/ ./apps/backend/

WORKDIR /app

EXPOSE 3000

CMD ["node", "apps/backend/src/index.js"]