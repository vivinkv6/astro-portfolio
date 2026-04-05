function trimTrailingSlash(value: string) {
  return value.replace(/\/+$/, "");
}

export const siteUrl = trimTrailingSlash(import.meta.env.PUBLIC_SITE_URL || "http://localhost:4321");

export function normalizePath(path: string) {
  if (!path) return "/";

  const [pathnameWithSearch, hash = ""] = path.split("#");
  const [pathname = "/", search = ""] = pathnameWithSearch.split("?");
  const normalizedPathname = pathname === "/" ? "/" : pathname.replace(/\/+$/, "") || "/";

  return `${normalizedPathname}${search ? `?${search}` : ""}${hash ? `#${hash}` : ""}`;
}

export function toAbsoluteUrl(path: string) {
  return new URL(normalizePath(path), `${siteUrl}/`).toString();
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function formatDate(value: string) {
  return new Date(value).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
}

export function excerpt(value: string, limit = 140) {
  return value.length <= limit ? value : `${value.slice(0, limit).trim()}...`;
}

export function normalizeRichTextHeadings(value?: string) {
  if (!value) return "";

  return value.replace(/<\s*\/?\s*h1\b/gi, (match) => match.replace(/h1/gi, "h2"));
}
