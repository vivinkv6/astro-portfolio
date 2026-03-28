import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  redirects: {
    "/blogs/8452068674138656619": "/blogs/best-headless-cms-platforms-modern-web-development",
    "/blogs/3935986206409354173": "/blogs/top-ai-coding-tools-ides-developer-productivity-2025",
    "/blogs/7407633909543796871": "/blogs/from-classroom-to-code-pandemic-programming-journey"
  },
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        "@": new URL("./src", import.meta.url).pathname
      }
    }
  },
  integrations: [react()],
  output: "static"
});
