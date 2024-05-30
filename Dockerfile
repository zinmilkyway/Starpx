FROM node:18.18.2 AS build

WORKDIR /app

COPY . /app

COPY package.json yarn.lock ./

RUN yarn install

RUN yarn build

FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d


EXPOSE 3000


CMD ["nginx", "-g",  "daemon off;"]
