import type { ListingPageData, PaginatedResult, Project, ProjectTechnology } from "@/types/content";
import { getCollectionItems, getSingleItem, getStrapiClient, inferProjectSlug, isStrapiConfigured, normalizeMedia, normalizeSeo, safeStrapi } from "@/lib/strapi";

const PROJECTS_FETCH_PAGE_SIZE = 6;

function mapProject(project: any): Project {
  const screenshot = normalizeMedia(project.screenshot);
  const technologies: ProjectTechnology[] = Array.isArray(project.skills)
    ? project.skills
        .map((skill: any) => ({
          name: skill?.name || "",
          icon: normalizeMedia(skill?.logo)?.url,
          websiteUrl: skill?.website_url || undefined
        }))
        .filter((skill: ProjectTechnology) => Boolean(skill.name))
    : Array.isArray(project.skills?.data)
      ? project.skills.data
          .map((skill: any) => ({
            name: skill?.name || skill?.attributes?.name || "",
            icon: normalizeMedia(skill?.logo || skill?.attributes?.logo)?.url,
            websiteUrl: skill?.website_url || skill?.attributes?.website_url || undefined
          }))
          .filter((skill: ProjectTechnology) => Boolean(skill.name))
      : [];

  return {
    id: String(project.documentId || project.id || project.title),
    priority: project.priority || 999,
    createdAt: project.createdAt || undefined,
    hideProject: project.hide_project === true,
    title: project.title || "Untitled project",
    slug: inferProjectSlug(project),
    shortDescription: project.short_description || "",
    longDescription: project.short_description || "",
    cover: screenshot?.url || "/assets/images/hero-image.png",
    livePreview: project.live_url || undefined,
    githubLink: project.source_code_link || undefined,
    type: "Project",
    technologies,
    seo: normalizeSeo(project.seo)
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

  const projects: Project[] = [];
  let page = 1;
  let pageCount = 1;

  do {
    const response = await safeStrapi(
      () =>
        client.collection("projects").find({
          filters: {
            hide_project: {
              $ne: true
            }
          },
          sort: ["priority:asc", "createdAt:desc"],
          pagination: {
            page,
            pageSize: PROJECTS_FETCH_PAGE_SIZE
          },
          populate: {
            screenshot: true,
            seo: {
              populate: {
                og_image: true
              }
            },
            skills: {
              populate: {
                logo: true
              }
            }
          }
        }),
      null
    );

    if (!response) break;

    projects.push(...getCollectionItems(response).map(mapProject));
    const meta = (response as any)?.meta?.pagination;
    pageCount = meta?.pageCount || 1;
    page += 1;
  } while (page <= pageCount);

  return projects
    .sort((left, right) => {
      const priorityDiff = (left.priority ?? 999) - (right.priority ?? 999);
      if (priorityDiff !== 0) return priorityDiff;

      return +new Date(right.createdAt || 0) - +new Date(left.createdAt || 0);
    });
}

export async function fetchProjectBySlug(slug: string) {
  const projects = await fetchProjects();
  return projects.find((project) => project.slug === slug) ?? null;
}

export async function fetchProjectsPaginated(page: number, pageSize: number): Promise<PaginatedResult<Project> | null> {
  if (!isStrapiConfigured) return null;

  const client = getStrapiClient();
  if (!client) return null;

  const response = await safeStrapi(
    () =>
      client.collection("projects").find({
        filters: {
          hide_project: {
            $ne: true
          }
        },
        sort: ["priority:asc", "createdAt:desc"],
        pagination: {
          page,
          pageSize
        },
        populate: {
          screenshot: true,
          seo: {
            populate: {
              og_image: true
            }
          },
          skills: {
            populate: {
              logo: true
            }
          }
        }
      }),
    null
  );

  if (!response) return null;

  const items = getCollectionItems(response).map(mapProject);
  const meta = (response as any)?.meta?.pagination;

  return {
    items,
    pagination: {
      page: meta?.page || page,
      pageSize: meta?.pageSize || pageSize,
      total: meta?.total || items.length,
      pageCount: meta?.pageCount || 1
    }
  };
}
