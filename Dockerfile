FROM node:18-alpine

WORKDIR /app

COPY package*.json /app/

RUN npm install && npm cache clean --force

COPY . .

EXPOSE 5000

CMD [ "npm", "start" ]