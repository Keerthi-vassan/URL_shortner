FROM node:22-alpine

WORKDIR /app

COPY package.json package-lock.json ./
COPY apps/backend/package.json ./apps/backend/

RUN npm install

COPY apps/backend/ ./apps/backend/

WORKDIR /app/apps/backend
RUN npx prisma generate

WORKDIR /app

EXPOSE 3000

CMD ["sh", "-c", "cd apps/backend && npx prisma migrate deploy && node src/index.js"]