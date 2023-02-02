FROM node:16.18.0 as build-stage
WORKDIR /var/jenkins_home/workspace/deploytest/front
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
FROM nginx:stable-alpine as production-stage

RUN apk add python3 python3-dev py3-pip build-base libressl-dev musl-dev libffi-dev
RUN pip3 install pip --upgrade
RUN pip3 install certbot-nginx
RUN mkdir /etc/letsencrypt

COPY --from=build-stage /var/jenkins_home/workspace/deploytest/front/build /usr/share/nginx/html
COPY --from=build-stage /var/jenkins_home/workspace/deploytest/front/deploy_conf/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g","daemon off;"]