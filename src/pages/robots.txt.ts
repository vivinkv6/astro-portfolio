import type { APIRoute } from "astro";

export const GET: APIRoute = () =>
  new Response(`User-agent: *\nAllow: /\nSitemap: ${new URL("/sitemap.xml", import.meta.env.SITE || "https://vivinkv.me").toString()}\n`, {
    headers: { "Content-Type": "text/plain; charset=utf-8" }
  });
