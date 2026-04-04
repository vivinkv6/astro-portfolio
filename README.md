# Astro Portfolio

## Local development

```bash
npm run dev
```

Checks:

```bash
npm run check
npm run build
```

## GHCR deployment flow

This repo now publishes a production image to GitHub Container Registry from [`.github/workflows/docker-ghcr.yml`](./.github/workflows/docker-ghcr.yml).

On every push to `master`, GitHub Actions will:

1. build the Astro site inside Docker
2. package the generated `dist/` output into a lightweight Nginx image
3. push it to `ghcr.io/vivinkv6/astro-portfolio`
4. optionally trigger Coolify to pull and restart if `COOLIFY_WEBHOOK` and `COOLIFY_TOKEN` are configured as GitHub Actions secrets

Useful image tags:

- `ghcr.io/vivinkv6/astro-portfolio:latest`
- `ghcr.io/vivinkv6/astro-portfolio:master`
- `ghcr.io/vivinkv6/astro-portfolio:sha-<commit>`

## Coolify setup

You can deploy this in Coolify with either:

1. a `Docker Image` resource pointing at `ghcr.io/vivinkv6/astro-portfolio:latest`
2. a Docker Compose resource using [`docker-compose.ghcr.yml`](./docker-compose.ghcr.yml)

If the package is private, configure `ghcr.io` credentials in Coolify with a GitHub token that has `read:packages`.

For automatic redeploys after each successful image push, add these GitHub Actions secrets in this repository:

- `COOLIFY_WEBHOOK`
- `COOLIFY_TOKEN`

Because this Astro app is built as a static site inside GitHub Actions, add these GitHub repository values for the Docker build too:

- Repository variables: `PUBLIC_SITE_URL`, `STRAPI_API_URL`, `STRAPI_URL`, `CONTACT_FORM_ACTION_URL`
- Repository secret: `STRAPI_TOKEN` (passed as a Docker build secret, not a normal build arg)

This image serves the static site over port `80` inside the container. In Coolify, set the exposed port to `80`.
