FROM node:21.1.0 as build

WORKDIR /app

COPY package*.json .
RUN npm install
COPY . .
RUN npm run build

FROM nginx:1.25.2

COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/build /usr/share/nginx/html