// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";

// Cloudflare Pages exposes the deployment URL at build time; SITE_URL lets a
// custom domain take precedence.
const site =
  process.env.SITE_URL ??
  process.env.CF_PAGES_URL ??
  "https://rau-dev-website.pages.dev";

export default defineConfig({
  site,
  // Fully static output: Cloudflare Pages serves `dist/` from its edge, no adapter needed.
  output: "static",
  integrations: [react(), sitemap()],
  // No Markdown code blocks here; Shiki's inline styles would also conflict with the CSP.
  markdown: {
    syntaxHighlight: false,
  },
  build: {
    inlineStylesheets: "auto",
  },
  security: {
    // Emits a hashed Content-Security-Policy <meta> tag for every page.
    csp: true,
  },
});
