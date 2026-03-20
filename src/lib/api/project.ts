import type { ListingPageData, Project } from "@/types/content";
import {
  getCollectionItems,
  getSingleItem,
  getStrapiClient,
  inferProjectSlug,
  isStrapiConfigured,
  normalizeMedia,
  normalizeSeo,
  sortByPriority,
  safeStrapi
} from "@/lib/strapi";

function mapProject(project: any): Project {
  const screenshot = normalizeMedia(project.screenshot);
  const technologies = Array.isArray(project.skills)
    ? project.skills.map((skill: any) => skill?.name).filter(Boolean)
    : Array.isArray(project.skills?.data)
      ? project.skills.data.map((skill: any) => skill?.name || skill?.attributes?.name).filter(Boolean)
      : [];

  return {
    id: String(project.documentId || project.id || project.title),
    priority: project.priority || 999,
    title: project.title || "Untitled project",
    slug: inferProjectSlug(project),
    shortDescription: project.short_description || "",
    longDescription: project.short_description || "",
    cover: screenshot?.url || "/assets/images/hero-image.png",
    livePreview: project.live_url || undefined,
    githubLink: project.source_code_link || undefined,
    type: "Project",
    technologies
  };
}

export async function fetchProjectPage(): Promise<ListingPageData | null> {
  if (!isStrapiConfigured) return null;

  const client = getStrapiClient();
  if (!client) return null;

  const response = await safeStrapi(
    () =>
      client.single("project-page").find({
        populate: {
          seo: {
            populate: {
              og_image: true
            }
          }
        }
      }),
    null
  );

  const page = getSingleItem(response);
  if (!page) return null;

  return {
    pageHeading: page.page_heading || "Projects",
    seo: normalizeSeo(page.seo)
  };
}

export async function fetchProjects(): Promise<Project[]> {
  if (!isStrapiConfigured) return [];

  const client = getStrapiClient();
  if (!client) return [];

  const response = await safeStrapi(
    () =>
      client.collection("projects").find({
        sort: ["priority:asc", "createdAt:desc"],
        populate: "*"
      }),
    null
  );

  return sortByPriority(
    getCollectionItems(response)
      .filter((project: any) => project?.hide_project !== true)
      .map(mapProject)
  );
}

export async function fetchProjectBySlug(slug: string) {
  const projects = await fetchProjects();
  return projects.find((project) => project.slug === slug) ?? null;
}
