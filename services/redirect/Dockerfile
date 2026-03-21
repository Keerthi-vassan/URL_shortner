FROM node:22-alpine

WORKDIR /app

COPY package.json package-lock.json ./
COPY services/redirect/package.json ./services/redirect/

RUN npm install --prefer-offline || npm install

COPY services/redirect/ ./services/redirect/

WORKDIR /app/services/redirect
RUN npx prisma generate

WORKDIR /app

EXPOSE 3002

CMD ["node", "services/redirect/src/index.js"]