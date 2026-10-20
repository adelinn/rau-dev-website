import type { APIRoute } from "astro";
import { club } from "../../data/content";

// RFC 9116 asks for an expiry under a year away; each build renews it.
const EXPIRES_IN_DAYS = 364;

export const GET: APIRoute = ({ site }) => {
  const url = (path: string) => new URL(path, site).href;
  const expires = new Date(Date.now() + EXPIRES_IN_DAYS * 24 * 60 * 60 * 1000);

  const body = [
    `# Security contact for the ${club.name} website.`,
    "#",
    "# To report a vulnerability, join the community through the sign-up form",
    "# on the page linked below, then send your report privately to one of the",
    "# community admins on WhatsApp. Please don't share it in group chats or",
    "# in public until it has been fixed.",
    "",
    `Contact: ${url("/#join")}`,
    `Expires: ${expires.toISOString().replace(/\.\d{3}Z$/, "Z")}`,
    "Preferred-Languages: en, ro",
    `Canonical: ${url("/.well-known/security.txt")}`,
    "",
  ].join("\n");

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
