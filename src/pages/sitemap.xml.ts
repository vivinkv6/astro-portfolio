import type { APIRoute } from "astro";
import { getAllBlogs, getAllProjects } from "@/lib/content";
import { siteUrl } from "@/lib/utils";

export const GET: APIRoute = async () => {
  const [blogs, projects] = await Promise.all([getAllBlogs(), getAllProjects()]);
  const staticRoutes = ["/", "/about", "/academics", "/education", "/experience", "/project", "/skills", "/blogs", "/testimonials"];
  const dynamicRoutes = [...blogs.map((blog) => `/blogs/${blog.slug}`), ...projects.map((project) => `/projects/${project.slug}`)];

  const urls = [...staticRoutes, ...dynamicRoutes]
    .map((route) => `<url><loc>${siteUrl}${route}</loc></url>`)
    .join("");

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`,
    {
      headers: { "Content-Type": "application/xml; charset=utf-8" }
    }
  );
};
