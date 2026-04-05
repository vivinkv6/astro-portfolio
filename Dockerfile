# ----------- BUILD STAGE -----------
FROM node:22-alpine AS build

WORKDIR /app

ARG PUBLIC_SITE_URL
ARG STRAPI_API_URL
ARG STRAPI_TOKEN
ARG CACHE_BUST

ENV PUBLIC_SITE_URL=$PUBLIC_SITE_URL
ENV STRAPI_API_URL=$STRAPI_API_URL
ENV STRAPI_TOKEN=$STRAPI_TOKEN
ENV NODE_ENV=production

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

RUN echo "Cache bust: $CACHE_BUST"
RUN npm run build


# ----------- SERVE STAGE -----------
FROM nginx:alpine

RUN apk add --no-cache curl

# Security headers as a shared include — must land before default.conf
# so the include path exists when nginx validates the config on startup.
COPY nginx/security_headers.conf /etc/nginx/conf.d/security_headers.conf
COPY nginx/default.conf          /etc/nginx/conf.d/default.conf

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD curl -f http://localhost/health || exit 1