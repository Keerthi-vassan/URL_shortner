FROM node:22-alpine

WORKDIR /app

COPY package.json package-lock.json ./
COPY services/analytics/package.json ./services/analytics/

RUN npm install --prefer-offline || npm install

COPY services/analytics/ ./services/analytics/

WORKDIR /app/services/analytics
RUN npx prisma generate

WORKDIR /app

EXPOSE 3003

CMD ["node", "services/analytics/src/index.js"]
