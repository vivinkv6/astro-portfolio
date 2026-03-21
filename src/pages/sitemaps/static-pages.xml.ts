import type { APIRoute } from "astro";
import { renderUrlSet } from "@/lib/sitemap";

const staticRoutes = [
  "/",
  "/about",
  "/academics",
  "/education",
  "/experience",
  "/project",
  "/skills",
  "/blogs",
  "/testimonials"
];

export const GET: APIRoute = async () => renderUrlSet(staticRoutes);
