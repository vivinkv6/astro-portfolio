import { strapi } from "@strapi/client";
import type { MediaAsset, NavItem, SeoData } from "@/types/content";
import { slugify } from "@/lib/utils";

type StrapiDocument = Record<string, any> & {
  id?: number | string;
  documentId?: string;
  createdAt?: string;
  updatedAt?: string;
};

type MinimalDocumentResponse<T extends StrapiDocument = StrapiDocument> = {
  data: T;
  meta?: unknown;
};

type MinimalDocumentResponseCollection<T extends StrapiDocument = StrapiDocument> = {
  data: T[];
  meta?: unknown;
};

const rawBaseURL = import.meta.env.STRAPI_API_URL || import.meta.env.STRAPI_URL || "http://localhost:1337";
const baseURL = rawBaseURL
  ? rawBaseURL.replace(/\/$/, "").endsWith("/api")
    ? rawBaseURL.replace(/\/$/, "")
    : `${rawBaseURL.replace(/\/$/, "")}/api`
  : "";

const authToken = import.meta.env.STRAPI_TOKEN;

export const isStrapiConfigured = Boolean(baseURL);

const client = isStrapiConfigured
  ? strapi({
      baseURL,
      ...(authToken ? { auth: authToken } : {})
    })
  : null;

export async function safeStrapi<T>(callback: () => Promise<T>, fallback: T): Promise<T> {
  if (!client) return fallback;

  try {
    return await callback();
  } catch {
    return fallback;
  }
}

export function getStrapiClient() {
  return client;
}

export function getCollectionItems<T extends StrapiDocument>(response: MinimalDocumentResponseCollection<T> | null | undefined): T[] {
  return Array.isArray(response?.data) ? response.data : [];
}

export function getSingleItem<T extends StrapiDocument>(response: MinimalDocumentResponse<T> | null | undefined): T | null {
  return response?.data ?? null;
}

export function normalizeMedia(media: any): MediaAsset | undefined {
  const entry = Array.isArray(media) ? media[0] : media?.data ?? media;
  const url = entry?.url;

  if (!url || typeof url !== "string") return undefined;

  const absoluteUrl = absoluteMediaUrl(url);
  if (!absoluteUrl) return undefined;

  return {
    url: absoluteUrl,
    alt: entry.alternativeText || entry.alt || entry.name || undefined,
    width: entry.width,
    height: entry.height
  };
}

export function absoluteMediaUrl(url?: string | null) {
  if (!url) return undefined;
  if (/^https?:\/\//i.test(url)) return url;

  const origin = baseURL.replace(/\/api$/, "");
  return `${origin}${url.startsWith("/") ? url : `/${url}`}`;
}

export function normalizeSeo(seo: any): SeoData | undefined {
  if (!seo) return undefined;

  const image = normalizeMedia(seo.og_image);
  return {
    title: seo.meta_title || seo.og_title || undefined,
    description: seo.meta_description || seo.og_description || undefined,
    keywords: splitKeywords(seo.keyword),
    ogTitle: seo.og_title || seo.meta_title || undefined,
    ogDescription: seo.og_description || seo.meta_description || undefined,
    ogImage: image?.url,
    extraJs: seo.extra_js || undefined
  };
}

export function normalizeButtons(items: any[] | undefined): NavItem[] {
  if (!Array.isArray(items)) return [];

  return items
    .map((item) => ({
      label: item?.label || "",
      href: normalizeHref(item?.link)
    }))
    .filter((item) => item.label && item.href);
}

export function normalizeHref(value?: string | null) {
  if (!value) return "/";
  if (/^https?:\/\//i.test(value) || value.startsWith("mailto:") || value.startsWith("tel:") || value.startsWith("#")) {
    return value;
  }

  return value.startsWith("/") ? value : `/${value}`;
}

export function plainText(value: any) {
  if (typeof value !== "string") return "";

  return value
    .replace(/<li[^>]*>/gi, "\n- ")
    .replace(/<\/(p|div|h[1-6]|li|br)>/gi, "\n")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .replace(/[ \t]{2,}/g, " ")
    .trim();
}

export function htmlBlocksToParagraphs(items: any[] | undefined) {
  if (!Array.isArray(items)) return [];

  return items
    .map((item) => plainText(item?.content))
    .filter(Boolean);
}

export function richTextToList(value: any) {
  if (typeof value !== "string") return [];

  const listMatches = [...value.matchAll(/<li[^>]*>(.*?)<\/li>/gis)].map((match) => plainText(match[1]));
  if (listMatches.length) return listMatches.filter(Boolean);

  return plainText(value)
    .split(/\n+/)
    .map((item) => item.replace(/^- /, "").trim())
    .filter(Boolean);
}

export function splitRoles(value?: string | null) {
  if (!value) return [];

  return value
    .split(/[,|/]+/)
    .map((item) => item.trim())
    .filter(Boolean);
}

export function splitKeywords(value?: string | null) {
  if (!value) return [];

  return value
    .split(/[,\n]+/)
    .map((item) => item.trim())
    .filter(Boolean);
}

export function normalizeTags(value: any) {
  if (Array.isArray(value)) {
    return value
      .flatMap((item) => {
        if (typeof item === "string") return item;
        if (item?.value) return item.value;
        if (item?.label) return item.label;
        return [];
      })
      .filter(Boolean);
  }

  if (typeof value === "string") {
    return splitKeywords(value);
  }

  return [];
}

export function formatDateRange(start?: string | null, end?: string | null) {
  if (!start && !end) return "";

  const startLabel = formatMonthYear(start);
  const endLabel = end ? formatMonthYear(end) : "Present";

  return [startLabel, endLabel].filter(Boolean).join(" - ");
}

export function formatMonthYear(value?: string | null) {
  if (!value) return "";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return date.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric"
  });
}

export function sortByPriority<T extends { priority?: number }>(items: T[]) {
  return [...items].sort((left, right) => (left.priority ?? 999) - (right.priority ?? 999));
}

export function byNewest<T extends { published?: string }>(items: T[]) {
  return [...items].sort((left, right) => +new Date(right.published || 0) - +new Date(left.published || 0));
}

export function inferProjectSlug(project: { slug?: string; title?: string; documentId?: string; id?: string | number }) {
  return project.slug || (project.title ? slugify(project.title) : String(project.documentId || project.id || "project"));
}
