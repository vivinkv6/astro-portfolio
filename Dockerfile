FROM node:22-alpine AS build

WORKDIR /app

ARG PUBLIC_SITE_URL
ARG STRAPI_API_URL
ARG STRAPI_URL
ARG STRAPI_TOKEN
ARG CONTACT_FORM_ACTION_URL

ENV PUBLIC_SITE_URL=$PUBLIC_SITE_URL
ENV STRAPI_API_URL=$STRAPI_API_URL
ENV STRAPI_URL=$STRAPI_URL
ENV STRAPI_TOKEN=$STRAPI_TOKEN
ENV CONTACT_FORM_ACTION_URL=$CONTACT_FORM_ACTION_URL

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM nginx:1.27-alpine AS runtime

COPY nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
