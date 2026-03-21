import type { APIRoute } from "astro";
import { getAllBlogs } from "@/lib/content";
import { renderUrlSet } from "@/lib/sitemap";

export const GET: APIRoute = async () => {
  const blogs = await getAllBlogs();

  return renderUrlSet(["/blogs", ...blogs.map((blog) => `/blogs/${blog.slug}`)]);
};
