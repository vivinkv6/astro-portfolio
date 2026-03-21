import { promises as fs } from "node:fs";
import path from "node:path";
import { sampleBlogs } from "@/data/blogs";
import {
  academics as fallbackAcademics,
  education as fallbackEducation,
  experiences as fallbackExperiences,
  footerLinks,
  personalInfo,
  skillCategories as fallbackSkillCategories,
  socials as fallbackSocials,
  themes as fallbackThemes
} from "@/data/site";
import { fetchAboutPage } from "@/lib/api/about";
import { fetchAcademicPage } from "@/lib/api/academic";
import { fetchBlogBySlug, fetchBlogPage, fetchBlogs, fetchBlogsPaginated } from "@/lib/api/blog";
import { fetchEducationPage } from "@/lib/api/education";
import { fetchErrorPage } from "@/lib/api/error-page";
import { fetchExperiencePage, fetchExperiencesPaginated } from "@/lib/api/experience";
import { fetchSiteConfig } from "@/lib/api/global";
import { fetchHomePage } from "@/lib/api/home";
import { fetchProjectBySlug, fetchProjectPage, fetchProjects, fetchProjectsPaginated } from "@/lib/api/project";
import { fetchSkillsPage } from "@/lib/api/skill";
import { slugify } from "@/lib/utils";
import type {
  AcademicPageData,
  AboutPageData,
  BlogPost,
  EducationPageData,
  ErrorPageContent,
  ExperienceItem,
  ExperiencePageData,
  HomePageData,
  ListingPageData,
  PaginatedResult,
  Project,
  ProjectTechnology,
  SiteConfig,
  SkillsPageData,
  Testimonial
} from "@/types/content";

async function readJsonDirectory<T>(directory: string): Promise<T[]> {
  const entries = await fs.readdir(directory);
  return Promise.all(
    entries
      .filter((entry) => entry.endsWith(".json"))
      .map(async (entry) => JSON.parse(await fs.readFile(path.join(directory, entry), "utf8")) as T)
  );
}

function contentPath(...parts: string[]) {
  return path.join(process.cwd(), "content", ...parts);
}

function shouldUsePaginationFallback<T>(paginated: PaginatedResult<T> | null | undefined) {
  if (!paginated) return true;

  const total = paginated.pagination?.total ?? 0;
  return total <= 0 && paginated.items.length === 0;
}

function slicePaginatedItems<T>(items: T[], page: number, pageSize: number): PaginatedResult<T> {
  const pageCount = Math.max(1, Math.ceil(items.length / pageSize));
  const currentPage = Math.min(Math.max(page, 1), pageCount);
  const start = (currentPage - 1) * pageSize;

  return {
    items: items.slice(start, start + pageSize),
    pagination: {
      page: currentPage,
      pageSize,
      total: items.length,
      pageCount
    }
  };
}

function normalizeProjectTechnologies(technologies: Project["technologies"] | string[] | undefined): ProjectTechnology[] {
  if (!Array.isArray(technologies)) return [];

  return technologies
    .map((technology) =>
      typeof technology === "string"
        ? { name: technology }
        : {
            name: technology?.name || "",
            icon: technology?.icon,
            websiteUrl: technology?.websiteUrl
          }
    )
    .filter((technology) => Boolean(technology.name));
}

const fallbackSiteConfig: SiteConfig = {
  siteName: personalInfo.name,
  personName: personalInfo.name,
  jobTitle: personalInfo.title,
  tagline: personalInfo.tagline,
  email: personalInfo.email,
  phone: personalInfo.phone,
  location: personalInfo.location,
  resumeUrl: personalInfo.resumeUrl,
  headerLinks: footerLinks.slice(0, 8).map((item) => ({ label: item.title, href: item.href })),
  footerGroups: [
    {
      label: "Quick Links",
      menu: footerLinks.slice(0, 4).map((item) => ({ label: item.title, href: item.href }))
    },
    {
      label: "More",
      menu: footerLinks.slice(4).map((item) => ({ label: item.title, href: item.href }))
    }
  ],
  footerContent: `${personalInfo.tagline}. Experienced in both front-end and back-end technologies.`,
  socials: fallbackSocials.map((item) => ({ label: item.label, href: item.href })),
  themes: fallbackThemes,
  defaultSeo: {
    title: `${personalInfo.name} | Full-Stack Developer in Kerala, India`,
    description: `Passionate ${personalInfo.title} in Kerala, India. I build responsive, user-friendly websites with React, NextJS, and NodeJS.`,
    ogImage: "/assets/images/hero-image.png",
    keywords: ["portfolio", "full stack developer", "astro", "strapi", "nextjs"]
  }
};

export async function getSiteConfig(): Promise<SiteConfig> {
  const strapiConfig = await fetchSiteConfig();

  return {
    ...fallbackSiteConfig,
    ...strapiConfig,
    headerLinks: strapiConfig?.headerLinks?.length ? strapiConfig.headerLinks : fallbackSiteConfig.headerLinks,
    footerGroups: strapiConfig?.footerGroups?.length ? strapiConfig.footerGroups : fallbackSiteConfig.footerGroups,
    socials: strapiConfig ? (strapiConfig.socials ?? []) : fallbackSiteConfig.socials,
    themes: strapiConfig?.themes?.length ? strapiConfig.themes : fallbackSiteConfig.themes,
    defaultSeo: {
      ...fallbackSiteConfig.defaultSeo,
      ...(strapiConfig?.siteName ? { title: `${strapiConfig.siteName} | ${fallbackSiteConfig.jobTitle}` } : {})
    }
  };
}

export async function getHomePageData(): Promise<HomePageData> {
  const page = await fetchHomePage();

  return (
    page || {
      pageHeading: "Home",
      hero: {
        title: `Hi - I'm ${personalInfo.name}`,
        roles: ["FULL STACK DEVELOPER", "Vibe Coder", "REACT NATIVE DEV", "TECHNICAL SEO"],
        shortDescription: personalInfo.tagline,
        image: "/assets/images/hero-image.png",
        primaryButton: { label: "View Projects", href: "/project" },
        secondaryButton: { label: "View Blogs", href: "/blogs" }
      }
    }
  );
}

export async function getAboutPageData(): Promise<AboutPageData> {
  const page = await fetchAboutPage();

  return (
    page || {
      pageHeading: "About Me",
      image: "/assets/images/profile-image.png",
      content: [
        "I'm a Full Stack Developer at SpiderWorks Technologies, working with Next.js, NestJS, PostgreSQL, and Strapi to build production-ready web applications and internal tools.",
        "I actively explore AI-powered development and use AI tools in my daily workflow to improve productivity, learn faster, and prototype ideas quickly.",
        "Beyond development, I'm interested in technical SEO, system optimization, and modern deployment strategies, including self-hosted platforms like Coolify."
      ],
      stats: [
        { count: "2+", shortTitle: "Years Experience" },
        { count: "10+", shortTitle: "Projects Completed" }
      ]
    }
  );
}

export async function getExperiencePageData(): Promise<ExperiencePageData> {
  const page = await fetchExperiencePage();

  return (
    page || {
      pageHeading: "Experience",
      experiences: fallbackExperiences
    }
  );
}

export async function getEducationPageData(): Promise<EducationPageData> {
  const page = await fetchEducationPage();

  return (
    page || {
      pageHeading: "Education",
      items: fallbackEducation.map((item, index) => ({
        id: index,
        title: item.title,
        institution: item.institution,
        location: "",
        period: item.period,
        description: item.description
      }))
    }
  );
}

export async function getAcademicPageData(): Promise<AcademicPageData> {
  const page = await fetchAcademicPage();

  return (
    page || {
      pageHeading: "Academic Journey",
      journey: fallbackAcademics.flatMap((section) =>
        section.points.map((point) => ({
          title: section.title,
          date: "",
          description: point
        }))
      )
    }
  );
}

export async function getSkillsPageData(): Promise<SkillsPageData> {
  const page = await fetchSkillsPage();

  return (
    page || {
      pageHeading: "Skills",
      categories: fallbackSkillCategories
    }
  );
}

export async function getBlogPageData(): Promise<ListingPageData> {
  return (await fetchBlogPage()) || { pageHeading: "Blogs" };
}

export async function getProjectPageData(): Promise<ListingPageData> {
  return (await fetchProjectPage()) || { pageHeading: "Project" };
}

export async function getErrorPageData(kind: "404" | "500"): Promise<ErrorPageContent> {
  return (
    (await fetchErrorPage(kind)) ||
    (kind === "404"
      ? {
          code: "404",
          eyebrow: "Route not found",
          title: "Page not found.",
          description: "The page you are looking for does not exist or may have moved.",
          actions: [
            { label: "Go Home", href: "/", variant: "primary" },
            { label: "View Projects", href: "/project", variant: "secondary" }
          ]
        }
      : {
          code: "500",
          eyebrow: "Internal server error",
          title: "Something went wrong.",
          description: "An unexpected error occurred while loading this page. Please try again in a moment.",
          actions: [
            { label: "Go Home", href: "/", variant: "primary" },
            { label: "About Me", href: "/about", variant: "secondary" }
          ]
        })
  );
}

export async function getAllProjects(): Promise<Project[]> {
  const strapiProjects = await fetchProjects();
  if (strapiProjects.length) return strapiProjects;

  const localProjects = await readJsonDirectory<Omit<Project, "slug" | "id">>(contentPath("project")).catch(() => []);
  return localProjects
    .filter((project) => project.hideProject !== true)
    .map((project, index) => ({
      ...project,
      id: String(index),
      slug: slugify(project.title),
      technologies: normalizeProjectTechnologies(project.technologies),
      createdAt: project.createdAt
    }))
    .sort((left, right) => {
      const priorityDiff = left.priority - right.priority;
      if (priorityDiff !== 0) return priorityDiff;

      return +new Date(right.createdAt || 0) - +new Date(left.createdAt || 0);
    });
}

export async function getPaginatedProjects(page: number, pageSize: number): Promise<PaginatedResult<Project>> {
  const paginated = await fetchProjectsPaginated(page, pageSize);
  if (paginated && !shouldUsePaginationFallback(paginated)) return paginated;

  const projects = await getAllProjects();
  return slicePaginatedItems(projects, page, pageSize);
}

export async function getProjectBySlug(slug: string) {
  const strapiProject = await fetchProjectBySlug(slug);
  if (strapiProject) return strapiProject;

  const projects = await getAllProjects();
  return projects.find((project) => project.slug === slug) ?? null;
}

export async function getAllBlogs(): Promise<BlogPost[]> {
  const strapiBlogs = await fetchBlogs();
  if (strapiBlogs.length) return strapiBlogs;

  return [...sampleBlogs].sort((left, right) => +new Date(right.published) - +new Date(left.published));
}

export async function getPaginatedBlogs(page: number, pageSize: number): Promise<PaginatedResult<BlogPost>> {
  const paginated = await fetchBlogsPaginated(page, pageSize);
  if (paginated && !shouldUsePaginationFallback(paginated)) return paginated;

  const blogs = await getAllBlogs();
  return slicePaginatedItems(blogs, page, pageSize);
}

export async function getPaginatedExperiences(page: number, pageSize: number): Promise<PaginatedResult<ExperienceItem>> {
  const paginated = await fetchExperiencesPaginated(page, pageSize);
  if (paginated && !shouldUsePaginationFallback(paginated)) return paginated;

  const pageData = await getExperiencePageData();
  return slicePaginatedItems(pageData.experiences, page, pageSize);
}

export async function getBlogBySlug(slug: string) {
  const strapiBlog = await fetchBlogBySlug(slug);
  if (strapiBlog) return strapiBlog;

  const blogs = await getAllBlogs();
  return blogs.find((blog) => blog.slug === slug || blog.id === slug) ?? null;
}

export async function getTestimonials(): Promise<Testimonial[]> {
  const testimonials = await readJsonDirectory<Testimonial>(contentPath("testimonials")).catch(() => []);
  return testimonials.sort((left, right) => +new Date(right.createdAt) - +new Date(left.createdAt));
}
