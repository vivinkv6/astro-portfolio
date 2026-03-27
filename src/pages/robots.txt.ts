import type { APIRoute } from "astro";
export const siteUrl = import.meta.env.PUBLIC_SITE_URL || "http://localhost:4321";


export const GET: APIRoute = () =>
  new Response(`User-agent: *\nAllow: /\nSitemap: ${siteUrl}/sitemap.xml\n`, {
    headers: { "Content-Type": "text/plain; charset=utf-8" }
  });
