FROM node:22-alpine

WORKDIR /app

#copy root packages for workspace
COPY package.json package-lock.json ./

#copying frontend package files
COPY /apps/frontend/package.json ./apps/frontend/

#installing dependencies
RUN npm i

#copying frontend source
COPY apps/frontend/ ./apps/frontend/

WORKDIR /app/apps/frontend

EXPOSE 5173

CMD [ "npm" , "run" , "dev", "--", "--host" ]