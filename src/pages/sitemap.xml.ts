import type { APIRoute } from "astro";
import { renderSitemapIndex } from "@/lib/sitemap";

export const GET: APIRoute = async () =>
  renderSitemapIndex([
    "/sitemaps/static-pages.xml",
    "/sitemaps/blogs.xml",
    "/sitemaps/projects.xml"
  ]);
