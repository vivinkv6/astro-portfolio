import type { BlogPost, Project } from "@/types/content";
import { slugify } from "@/lib/utils";

const strapiUrl = import.meta.env.STRAPI_URL;
const strapiToken = import.meta.env.STRAPI_TOKEN;

async function strapiFetch<T>(path: string): Promise<T | null> {
  if (!strapiUrl) return null;

  const response = await fetch(`${strapiUrl.replace(/\/$/, "")}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(strapiToken ? { Authorization: `Bearer ${strapiToken}` } : {})
    }
  }).catch(() => null);

  if (!response || !response.ok) return null;
  return (await response.json()) as T;
}

export async function fetchStrapiBlogs(): Promise<BlogPost[] | null> {
  const payload = await strapiFetch<any>("/api/blogs?populate=*");
  const items = payload?.data;
  if (!Array.isArray(items)) return null;

  return items.map((item: any) => {
    const attrs = item.attributes ?? item;
    const title = attrs.title ?? "Untitled";

    return {
      id: String(item.id ?? attrs.slug ?? title),
      slug: attrs.slug ?? slugify(title),
      title,
      published: attrs.publishedAt ?? attrs.createdAt ?? new Date().toISOString(),
      content: attrs.excerpt ?? attrs.content ?? attrs.description ?? "",
      labels: attrs.tags?.data?.map((tag: any) => tag.attributes?.name).filter(Boolean) ?? attrs.labels ?? [],
      coverImage: attrs.cover?.data?.attributes?.url
        ? `${strapiUrl}${attrs.cover.data.attributes.url}`
        : attrs.coverImage
    };
  });
}

export async function fetchStrapiProjects(): Promise<Project[] | null> {
  const payload = await strapiFetch<any>("/api/projects?populate=*");
  const items = payload?.data;
  if (!Array.isArray(items)) return null;

  return items.map((item: any, index: number) => {
    const attrs = item.attributes ?? item;
    const title = attrs.title ?? "Untitled Project";

    return {
      priority: attrs.priority ?? index + 1,
      title,
      slug: attrs.slug ?? slugify(title),
      shortDescription: attrs.shortDescription ?? attrs.description ?? "",
      longDescription: attrs.longDescription ?? attrs.content ?? "",
      cover: attrs.cover?.data?.attributes?.url
        ? `${strapiUrl}${attrs.cover.data.attributes.url}`
        : attrs.cover,
      livePreview: attrs.livePreview,
      githubLink: attrs.githubLink,
      visitors: attrs.visitors,
      earned: attrs.earned,
      githubStars: attrs.githubStars,
      ratings: attrs.ratings,
      numberOfSales: attrs.numberOfSales,
      type: attrs.type ?? "Project",
      siteAge: attrs.siteAge,
      technologies: attrs.technologies ?? []
    };
  });
}
