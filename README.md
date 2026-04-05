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

## GHCR deployment

This repo is set up to build the production image in GitHub Actions and push it to GitHub Container Registry.

On every push to `master`, the workflow in [`.github/workflows/docker-ghcr.yml`](./.github/workflows/docker-ghcr.yml):

1. builds the Astro site inside Docker
2. packages the generated `dist/` output into a small Nginx image
3. pushes the image to `ghcr.io/vivinkv6/astro-portfolio`
4. triggers the Coolify deploy hook if the required secrets are configured

Configure these GitHub repository variables:

- `PUBLIC_SITE_URL`
- `STRAPI_API_URL`

Configure these GitHub repository secrets:

- `COOLIFY_WEBHOOK`
- `COOLIFY_TOKEN`
- `STRAPI_TOKEN`

`STRAPI_TOKEN` can be left empty if your frontend only reads public Strapi content.

## Coolify

Use a `Docker Image` resource in Coolify that points to the GHCR image for this repository.

- Image: `ghcr.io/vivinkv6/astro-portfolio:latest`
- Internal port: `80`

Coolify should only pull and run the prebuilt image. The server does not need to build the Astro app locally, which avoids the long build times and RAM spikes you were seeing.
