// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";

// Static output needs no adapter on Cloudflare Pages. Cloudflare exposes the
// deployment URL at build time; SITE_URL lets a custom domain take precedence.
export default defineConfig({
  site:
    process.env.SITE_URL ??
    process.env.CF_PAGES_URL ??
    "https://rau-dev-website.pages.dev",
  integrations: [react(), sitemap()],
  // No Markdown code blocks here; Shiki's inline styles would also conflict with the CSP.
  markdown: {
    syntaxHighlight: false,
  },
  security: {
    // Emits a hashed Content-Security-Policy <meta> tag for every page.
    csp: true,
  },
});
