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

# Force rebuild
RUN echo "Cache bust: $CACHE_BUST"

RUN npm run build


# ----------- SERVE STAGE -----------
FROM nginx:alpine

# Install curl for healthcheck ✅
RUN apk add --no-cache curl

# Copy Astro build output
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port
EXPOSE 80

# Healthcheck for Coolify ✅
HEALTHCHECK CMD curl -f http://localhost || exit 1
