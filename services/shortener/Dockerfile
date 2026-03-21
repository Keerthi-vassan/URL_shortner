FROM node:22-alpine

WORKDIR /app

COPY package.json package-lock.json ./
COPY services/shortener/package.json ./services/shortener/

RUN npm install --prefer-offline || npm install

COPY services/shortener/ ./services/shortener/

WORKDIR /app/services/shortener
RUN npx prisma generate

WORKDIR /app

EXPOSE 3001

CMD ["node", "services/shortener/src/index.js"]