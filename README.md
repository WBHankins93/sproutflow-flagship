# Sproutflow Studio Flagship

The production marketing site for [Sproutflow Studio](https://sproutflow-studio.com), built with Next.js App Router, TypeScript, Tailwind CSS, and Vercel. The site presents Sproutflow's services, case studies, portfolio, trust/security information, inquiry flow, and supporting SEO/structured data.

## Tech Stack

- Next.js 15 App Router
- React 19
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide icons
- Jest + Testing Library
- Vercel Blob-backed image URLs

## Getting Started

Install dependencies:

```bash
npm install
```

Run the local dev server:

```bash
npm run dev
```

Open `http://localhost:3000`.

For a production-style local run:

```bash
npm run build
npm run start
```

## Environment

Copy `.env.example` to `.env.local` and fill in any required values.

Useful related docs:

- `VERCEL_ENV_SETUP.md`
- `docs/BLOB_STORAGE_SETUP.md`
- `docs/FIX_IMAGES_NOT_LOADING.md`

## Key Project Structure

- `app/` - App Router pages, metadata, sitemap, robots, and route-level UI.
- `components/` - Reusable layout, section, UI, testimonial, and case-study components.
- `data/` - Main content sources for services, case studies, testimonials, portfolio projects, and shared copy.
- `lib/` - Utility code, including Vercel Blob image URL helpers.
- `public/` - Static public files such as `llms.txt`.
- `__tests__/` - Jest test suites grouped by priority.
- `scripts/` - Image upload/replacement helpers for blob storage.

Most visible business content should be edited in `data/` first, then rendered through existing components. Avoid hardcoding testimonials, metrics, phone numbers, or security claims directly in page components.

## Common Commands

```bash
npm run dev          # Start local development
npm run build        # Production build
npm run start        # Serve the production build
npm run type-check   # TypeScript check
npm test             # Run Jest tests
npm run test:watch   # Jest watch mode
```

Note: `npm run lint` depends on the local Next/ESLint setup. Prefer `npm run type-check`, `npm test`, and `npm run build` as the main verification path unless lint config has been updated.

## Content Guidelines

- Testimonials must come from `data/testimonials.ts` and should only be added with permission to publish.
- Case-study metrics must be real, attributed, and traceable to client-approved source material.
- Security/trust copy must stay factual. Sproutflow is not claiming SOC 2 certification; founder security background should be described as professional experience only.
- Portfolio visibility and ordering are controlled through `data/workProjects.ts` and listing filters.
- Sitewide business contact details also appear in structured data and tests, so update all references together.

## Verification Checklist

Before opening or updating a PR, run:

```bash
npm run type-check
npm test -- --runInBand
npm run build
```

For mobile-sensitive changes, also run a production server and verify key pages at a narrow viewport:

- `/`
- `/work`
- `/how-we-handle-your-data`
- `/case-studies`
- `/inquiry`

At minimum, check for readable headings, no horizontal scrolling, usable touch targets, and no visible fallback text such as `Loading...`.

## Deployment

The site is intended for Vercel. Production URLs, environment variables, and blob storage configuration should be managed through the Vercel project settings. Keep `NEXT_PUBLIC_SITE_URL` aligned with the live domain so canonical URLs and structured data stay correct.

## Notes for Future Changes

Work with the existing design system and content conventions before introducing new patterns. Keep sections responsive by default, prefer data-driven updates, and run the full verification path after changing shared content, layout, SEO, or schema behavior.
