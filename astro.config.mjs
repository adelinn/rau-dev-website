// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";

/**
 * The public URL, used for canonical links, the sitemap and security.txt.
 * SITE_URL (a custom domain) wins over the deployment URL Cloudflare Pages
 * exposes as CF_PAGES_URL. Empty values are ignored and a bare domain gets
 * https:// added.
 */
function siteUrl() {
  for (const name of ["SITE_URL", "CF_PAGES_URL"]) {
    const value = process.env[name]?.trim();
    if (!value) continue;
    const withProtocol = /^https?:\/\//i.test(value)
      ? value
      : `https://${value}`;
    if (!URL.canParse(withProtocol)) {
      throw new Error(
        `${name} must be a URL like https://example.com, got "${value}".`,
      );
    }
    return withProtocol;
  }
  return "https://rau-dev-website.pages.dev";
}

// Static output needs no adapter on Cloudflare Pages.
export default defineConfig({
  site: siteUrl(),
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
