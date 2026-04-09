# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working in this repository.

## Project Overview

Sproutflow Studio flagship marketing site built with:
- Next.js 15 (App Router)
- React 19
- TypeScript 5
- Tailwind CSS 3

Primary purpose: marketing site + service/pricing showcase + inquiry intake flow.

## Commands

```bash
npm run dev            # Start dev server on localhost:3000
npm run build          # Production build (includes type checking)
npm run start          # Run production build
npm run lint           # ESLint
npm run type-check     # tsc --noEmit
npm run test           # Jest test suite
npm run test:watch     # Jest in watch mode
npm run test:coverage  # Jest coverage report
npm run upload-images  # Upload public/images to Vercel Blob
npm run get-blob-url   # Print NEXT_PUBLIC_BLOB_STORE_URL from Blob store
```

## Current Routes (App Router)

Pages under `app/`:
- `/` (`app/page.tsx`)
- `/work` (`app/work/page.tsx`)
- `/how-we-work` (`app/how-we-work/page.tsx`)
- `/case-studies` (`app/case-studies/page.tsx`)
- `/case-studies/nealy-events` (`app/case-studies/nealy-events/page.tsx`)
- `/inquiry` (`app/inquiry/page.tsx`) - primary contact + project intake page

Global route metadata/sitemap:
- `app/layout.tsx`
- `app/sitemap.ts` (includes `/inquiry`)
- `app/robots.ts`

## Architecture

### Key directories
- `app/` - route pages/layouts
- `components/layout/` - site shell and layout primitives (`Header`, `Footer`, `StudioLayout`)
- `components/sections/` - homepage/marketing sections (Hero, Services, Process, Contact, etc.)
- `components/inquiry/` - inquiry form UI/logic (`InquiryForm.tsx`)
- `components/ui/` - lower-level reusable UI bits (logo and related items)
- `data/` - typed static content (`services.ts`, content objects, project data)
- `types/` - shared TS types (`types/inquiry.ts`)
- `lib/` - utilities (`blob-images.ts`)
- `scripts/` - Blob scripts and helpers
- `docs/` - internal process docs and brand context

### Important implementation details
- `app/layout.tsx` already renders `<Header />` and wraps route content with `<main>`. Route pages should generally return a fragment and include `<Footer />` themselves.
- `Header` CTA "Let's Talk" routes to `/inquiry` on desktop and mobile.
- Inquiry form submits directly to Formspree from the client and shows an in-page success state.
- `components/layout/StudioLayout.tsx` `Button` supports `type` and `disabled` (used by form submit state).

## Inquiry Flow (Current)

- UI:
  - Hero + intake form at `/inquiry`
  - Form component: `components/inquiry/InquiryForm.tsx`
  - Typed options/data shape: `types/inquiry.ts`
- Submission:
  - Formspree endpoint pattern: `https://formspree.io/f/{FORM_ID}`
  - Uses `NEXT_PUBLIC_FORMSPREE_FORM_ID`
  - Required validation: name + email
  - Prevents duplicate submits with in-memory submit guard and disabled button state

## Styling + Design System

- Tailwind config: `tailwind.config.js`
- Global styles: `app/globals.css`
- Fonts: DM Serif Display (headings), DM Sans (body) loaded in `app/layout.tsx`
- Core brand colors:
  - Primary: `#5F755E`
  - Accent: `#C49A45`
  - Text primary: `#626155`
  - Text secondary: `#445E69`
- Common spacing utilities:
  - `section-padding`
  - `section-padding-sm`
  - `section-padding-lg`

## Image + Blob Storage Workflow

Image utility:
- Use `getImageUrl()` from `lib/blob-images.ts` for all image paths.
- Dev without blob URL: serves local `/public/images/...`
- With `NEXT_PUBLIC_BLOB_STORE_URL`: serves from Blob in dev/prod.

Blob scripts:
- Upload/sync: `npm run upload-images`
- Retrieve base URL: `npm run get-blob-url`

Critical gotcha:
- `public/images/**` is gitignored in `.gitignore` (jpg/png/webp/etc, including uppercase extensions).
- If you add a local image for production, upload it to Blob or it will not be available in deployed environments.

## SEO + Structured Data

- Site-level metadata in `app/layout.tsx`
- Per-page metadata in each route page
- JSON-LD component: `components/StructuredData.tsx` (not `components/sections/StructuredData.tsx`)
- Sitemap generated from `app/sitemap.ts`

## Environment Variables

Runtime/public:
- `NEXT_PUBLIC_SITE_URL` (optional; defaults to `https://sproutflow-studio.com`)
- `NEXT_PUBLIC_BLOB_STORE_URL` (required for Blob-backed image URLs in deployed envs)
- `NEXT_PUBLIC_FORMSPREE_FORM_ID` (required for `/inquiry` submission)

Server/script-only:
- `BLOB_READ_WRITE_TOKEN` (required by Blob scripts)

Reference template:
- `.env.example` includes `NEXT_PUBLIC_FORMSPREE_FORM_ID` and `NEXT_PUBLIC_SITE_URL`

## Testing

Jest is configured and used.

Test folders:
- `__tests__/high-priority/`
- `__tests__/medium-priority/`
- `__tests__/low-priority/`

Run `npm run test` before major refactors and `npm run build` before shipping UI changes.

## Deployment

- Deployed on Vercel from `main`.
- Ensure environment variables are configured in Vercel for Production/Preview:
  - `NEXT_PUBLIC_SITE_URL`
  - `NEXT_PUBLIC_BLOB_STORE_URL`
  - `NEXT_PUBLIC_FORMSPREE_FORM_ID`
  - `BLOB_READ_WRITE_TOKEN` (if Blob scripts or server-side blob operations are used)
