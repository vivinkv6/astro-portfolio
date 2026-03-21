import type { APIRoute } from "astro";
import { getAllProjects } from "@/lib/content";
import { renderUrlSet } from "@/lib/sitemap";

export const GET: APIRoute = async () => {
  const projects = await getAllProjects();

  return renderUrlSet(["/project", ...projects.map((project) => `/project/${project.slug}`)]);
};
