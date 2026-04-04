/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_SITE_URL?: string;
  readonly STRAPI_API_URL?: string;
  readonly STRAPI_TOKEN?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
