FROM node:16.18.0-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --silent
RUN npm install -g nodemon
COPY . .
CMD [ "nodemon", "-L", "index.js" ]
EXPOSE 4000