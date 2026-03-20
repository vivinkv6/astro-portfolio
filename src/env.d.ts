/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_SITE_URL?: string;
  readonly STRAPI_API_URL?: string;
  readonly STRAPI_URL?: string;
  readonly STRAPI_TOKEN?: string;
  readonly CONTACT_FORM_ACTION_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
