import { siteUrl } from "@/lib/utils";
import type { BlogPost, EducationItem, ExperienceItem, Project, SiteConfig, SkillCategory } from "@/types/content";

type JsonLd = Record<string, unknown>;

type BreadcrumbInput = {
  name: string;
  path: string;
};

function toAbsoluteUrl(path: string) {
  return new URL(path, siteUrl).toString();
}

export function createWebsiteSchema(site: SiteConfig): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}#website`,
    url: siteUrl,
    name: site.siteName,
    alternateName: site.personName,
    description: site.defaultSeo.description || site.tagline,
    inLanguage: "en",
    publisher: {
      "@id": `${siteUrl}#person`
    }
  };
}

export function createPersonSchema(
  site: SiteConfig,
  description: string,
  image: string,
  experiences: ExperienceItem[],
  education: EducationItem[],
  skillCategories: SkillCategory[]
): JsonLd {
  const knowsAbout = skillCategories.flatMap((category) => category.skills.map((skill) => skill.name));

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${siteUrl}#person`,
    name: site.personName,
    jobTitle: site.jobTitle,
    description,
    email: site.email,
    telephone: site.phone,
    url: siteUrl,
    image: toAbsoluteUrl(image),
    sameAs: site.socials.map((social) => social.href),
    knowsAbout,
    worksFor: experiences.map((experience) => ({
      "@type": "Organization",
      name: experience.company,
      url: experience.link
    })),
    alumniOf: education.map((item) => ({
      "@type": "CollegeOrUniversity",
      name: item.institution
    })),
    address: site.location
      ? {
          "@type": "PostalAddress",
          addressLocality: site.location,
          addressCountry: "IN"
        }
      : undefined
  };
}

export function createBreadcrumbSchema(items: BreadcrumbInput[]): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: toAbsoluteUrl(item.path)
    }))
  };
}

export function createBlogPostingSchema(blog: BlogPost): JsonLd {
  const image = blog.bannerImage || blog.coverImage;

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: blog.title,
    description: blog.seo?.description || blog.content,
    datePublished: blog.published,
    dateModified: blog.published,
    image: image ? [toAbsoluteUrl(image)] : undefined,
    url: toAbsoluteUrl(`/blogs/${blog.slug}`),
    mainEntityOfPage: toAbsoluteUrl(`/blogs/${blog.slug}`),
    keywords: blog.labels,
    articleSection: blog.labels,
    author: {
      "@id": `${siteUrl}#person`
    },
    publisher: {
      "@id": `${siteUrl}#person`
    },
    isPartOf: {
      "@id": `${siteUrl}#website`
    }
  };
}

export function createCollectionPageSchema(args: {
  name: string;
  description: string;
  path: string;
}): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: args.name,
    description: args.description,
    url: toAbsoluteUrl(args.path),
    isPartOf: {
      "@id": `${siteUrl}#website`
    }
  };
}

export function createItemListSchema<T>(args: {
  name: string;
  path: string;
  items: T[];
  mapItem: (item: T) => { name: string; url: string };
}): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: args.name,
    url: toAbsoluteUrl(args.path),
    itemListElement: args.items.map((item, index) => {
      const mapped = args.mapItem(item);

      return {
        "@type": "ListItem",
        position: index + 1,
        name: mapped.name,
        url: mapped.url
      };
    })
  };
}

export function createSoftwareSourceCodeSchema(project: Project): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    name: project.title,
    description: project.longDescription || project.shortDescription,
    url: toAbsoluteUrl(`/project/${project.slug}`),
    codeRepository: project.githubLink,
    targetProduct: {
      "@type": "SoftwareApplication",
      name: project.title,
      applicationCategory: project.type || "WebApplication",
      operatingSystem: "Any",
      url: project.livePreview || toAbsoluteUrl(`/project/${project.slug}`)
    },
    runtimePlatform: "Web Browser",
    programmingLanguage: project.technologies?.map((tech) => tech.name),
    author: {
      "@id": `${siteUrl}#person`
    },
    publisher: {
      "@id": `${siteUrl}#person`
    },
    image: project.cover ? [toAbsoluteUrl(project.cover)] : undefined,
    isPartOf: {
      "@id": `${siteUrl}#website`
    }
  };
}
