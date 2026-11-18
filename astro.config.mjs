import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://josepdecid.com",
  // GitHub Pages serves each page as a folder: /teletext/100/ -> dist/teletext/100/index.html
  trailingSlash: "always",
  integrations: [
    sitemap({
      // "/" only redirects to /teletext/100/
      filter: (page) => new URL(page).pathname !== "/",
    }),
  ],
});
