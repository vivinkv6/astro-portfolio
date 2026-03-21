import { siteUrl } from "@/lib/utils";

const XML_HEADERS = { "Content-Type": "application/xml; charset=utf-8" };

export function toAbsoluteUrl(path: string) {
  return `${siteUrl}${path}`;
}

export function getSitemapTimestamp() {
  return new Date().toISOString();
}

export function renderSitemapIndex(paths: string[], lastmod = getSitemapTimestamp()) {
  const items = paths
    .map(
      (path) =>
        `<sitemap><loc>${toAbsoluteUrl(path)}</loc><lastmod>${lastmod}</lastmod></sitemap>`
    )
    .join("");

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?><sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${items}</sitemapindex>`,
    { headers: XML_HEADERS }
  );
}

export function renderUrlSet(paths: string[]) {
  const items = paths.map((path) => `<url><loc>${toAbsoluteUrl(path)}</loc></url>`).join("");

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${items}</urlset>`,
    { headers: XML_HEADERS }
  );
}
