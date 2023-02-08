FROM node:16.18.0-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --silent
COPY . .
CMD [ "npm", "start" ]
EXPOSE 4000