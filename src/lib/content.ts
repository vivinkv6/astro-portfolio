import { promises as fs } from "node:fs";
import path from "node:path";
import { sampleBlogs } from "@/data/blogs";
import { fetchStrapiBlogs, fetchStrapiProjects } from "@/lib/strapi";
import { slugify } from "@/lib/utils";
import type { BlogPost, Project, Testimonial } from "@/types/content";

async function readJsonDirectory<T>(directory: string): Promise<T[]> {
  const entries = await fs.readdir(directory);
  const items = await Promise.all(
    entries
      .filter((entry) => entry.endsWith(".json"))
      .map(async (entry) => JSON.parse(await fs.readFile(path.join(directory, entry), "utf8")) as T)
  );
  return items;
}

function contentPath(...parts: string[]) {
  return path.join(process.cwd(), "content", ...parts);
}

export async function getAllProjects(): Promise<Project[]> {
  const strapiProjects = await fetchStrapiProjects();
  if (strapiProjects?.length) {
    return [...strapiProjects].sort((a, b) => a.priority - b.priority);
  }

  const localProjects = await readJsonDirectory<Omit<Project, "slug">>(contentPath("project")).catch(() => []);
  return localProjects
    .map((project) => ({
      ...project,
      slug: slugify(project.title)
    }))
    .sort((a, b) => a.priority - b.priority);
}

export async function getProjectBySlug(slug: string) {
  const projects = await getAllProjects();
  return projects.find((project) => project.slug === slug) ?? null;
}

export async function getAllBlogs(): Promise<BlogPost[]> {
  const strapiBlogs = await fetchStrapiBlogs();
  if (strapiBlogs?.length) {
    return strapiBlogs.sort((a, b) => +new Date(b.published) - +new Date(a.published));
  }

  return [...sampleBlogs].sort((a, b) => +new Date(b.published) - +new Date(a.published));
}

export async function getBlogBySlug(slug: string) {
  const blogs = await getAllBlogs();
  return blogs.find((blog) => blog.slug === slug || blog.id === slug) ?? null;
}

export async function getTestimonials(): Promise<Testimonial[]> {
  const testimonials = await readJsonDirectory<Testimonial>(contentPath("testimonials")).catch(() => []);
  return testimonials.sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));
}
