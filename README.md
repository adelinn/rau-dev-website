# rau-dev-website

The website of **RAU DEV**, the student-led software engineering club at the Romanian-American University.

Built with [Astro](https://astro.build) (static output, bundled by [Vite](https://vite.dev)), a [React](https://react.dev) island for the interactive challenge board, [pnpm](https://pnpm.io) for dependencies and [Bun](https://bun.sh) as the runtime for the Astro CLI. Hosted on [Cloudflare Pages](https://pages.cloudflare.com).

## Requirements

- Node.js 22.22+ (see `.node-version`)
- pnpm 10 (exact version and checksum pinned via `packageManager`; `corepack enable` picks it up)
- Bun (see `.bun-version`)

## Scripts

| Command             | What it does                                            |
| ------------------- | ------------------------------------------------------- |
| `pnpm install`      | Install dependencies                                    |
| `pnpm dev`          | Start the dev server at `http://localhost:4321`         |
| `pnpm check`        | Type-check `.astro`, `.ts` and `.tsx` files             |
| `pnpm test`         | Run unit tests with Vitest                              |
| `pnpm build`        | Type-check, then build the static site into `dist/`     |
| `pnpm preview`      | Serve `dist/` locally with the Cloudflare Pages runtime |
| `pnpm format`       | Format the code with Prettier                           |
| `pnpm pages:deploy` | Build and deploy with Wrangler                          |

## Project structure

```text
public/              Static files copied as-is (favicon, Cloudflare `_headers`)
src/
  components/        Astro sections and the React `ChallengeBoard` island
  data/content.ts    All page copy: activities, meeting details, sign-up link, challenges
  layouts/           Base HTML document (meta tags, fonts, global styles)
  lib/               Framework-free logic with unit tests
  pages/             Routes: `/`, `404`, `robots.txt`
  styles/global.css  Design tokens (colours and type) matching the club poster
```

To change the text on the site, edit `src/data/content.ts`.

## Deploying to Cloudflare Pages

Connect the repository in the Cloudflare dashboard (**Workers & Pages → Create → Pages → Connect to Git**) with:

| Setting                | Value                                                                                                    |
| ---------------------- | -------------------------------------------------------------------------------------------------------- |
| Framework preset       | Astro                                                                                                    |
| Build command          | `pnpm build`                                                                                             |
| Build output directory | `dist`                                                                                                   |
| Environment variables  | `BUN_VERSION` (same as `.bun-version`), and `SITE_URL=https://<your-domain>` once a custom domain is set |

Cloudflare reads the Node.js version from `.node-version` and the pnpm version from `package.json`. The site is fully static, so no adapter or Functions are needed. Security and caching headers live in `public/_headers`, and Astro adds a hashed Content-Security-Policy to every page.

Alternatively, deploy from your machine with `pnpm pages:deploy` after `pnpm wrangler login`.

## Supply-chain protections

- **Pinned toolchain:** `packageManager` pins pnpm to an exact version and SHA-512 checksum; Node.js and Bun versions are pinned in `.node-version` and `.bun-version`.
- **Exact dependencies:** `package.json` uses exact versions and `pnpm-lock.yaml` pins the full tree; CI installs with `--frozen-lockfile`.
- **pnpm hardening** (`pnpm-workspace.yaml`):
  - `minimumReleaseAge`: new versions must be at least 3 days old before they can be installed.
  - `trustPolicy: no-downgrade`: an install fails if a package lost the provenance its earlier versions had. Reviewed exceptions are listed under `trustPolicyExclude`, each with a reason.
  - `blockExoticSubdeps`: transitive dependencies must come from the npm registry, not git or tarball URLs.
  - `strictDepBuilds` and `onlyBuiltDependencies`: only allow-listed packages may run install scripts; any other package that tries makes the install fail.
- **GitHub Actions:** every action is pinned to a full commit SHA, the workflow token has no permissions by default (read-only per job), and checkout doesn't keep credentials. CI also runs `pnpm audit`.
- **Dependabot** updates npm packages and actions weekly, waiting 7 days after a release before proposing it.
