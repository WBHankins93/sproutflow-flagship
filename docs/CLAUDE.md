# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Sproutflow Studio flagship marketing website - a Next.js 15 (App Router) portfolio site for a boutique web design agency. Built with React 19, TypeScript 5, and Tailwind CSS.

## Commands

```bash
npm run dev          # Start development server (localhost:3000)
npm run build        # Production build
npm run start        # Start production server
npm run lint         # ESLint
npm run type-check   # TypeScript type checking (tsc --noEmit)
npm run upload-images # Upload images to Vercel Blob Storage
npm run get-blob-url  # Get blob store URL for environment setup
```

No testing framework is configured - this is a content/presentation site.

## Architecture

### Directory Structure
- `app/` - Next.js App Router pages and routes
- `components/ui/` - Atomic UI components (Button, Card, Typography, Logo)
- `components/sections/` - Full-page sections (HeroSection, ServicesSection, etc.)
- `components/layout/` - Layout infrastructure (Header, Footer, Container, Section, Grid, StudioLayout)
- `data/` - Static content as TypeScript objects (no CMS)
- `lib/` - Utilities including `blob-images.ts` for image URL handling
- `scripts/` - Utility scripts for blob storage management
- `types/` - TypeScript type definitions
- `docs/brand-context.md` - Brand guidelines and positioning

### Key Patterns

**Server vs Client Components**: Default to server components. Client components (`'use client'`) only for interactivity (Header mobile menu, animations).

**Image Handling**: Use `getImageUrl()` from `lib/blob-images.ts` - serves from `/public/images/` in dev, Vercel Blob Storage in production. Also exports `getBlobImageUrl()` for direct blob path handling. Requires `NEXT_PUBLIC_BLOB_STORE_URL` environment variable for production.

**Content Management**: All copy lives in `data/` directory as typed TypeScript objects. No headless CMS.

**Styling**: Tailwind CSS with custom design system defined in `tailwind.config.js`. Uses `framer-motion` for animations and `lucide-react` for icons.

**Layout Components**: `components/layout/StudioLayout.tsx` exports reusable components: `Container`, `Section`, `Grid`, `Heading`, `BodyText`, `Button`, and `AnimatedSection` for consistent layouts and typography.

## Design System

**Colors**:
- Primary: Reseda Green (`#5F755E`) - main brand color
- Accent: Satin Sheen Gold (`#C49A45`)
- Background: Alabaster (`#E9E2D8`), Dutch White (`#EDDDC0`)
- Text: Ebony (`#626155`), Payne's Gray (`#445E69`)

**Fonts**: DM Serif Display (headings), DM Sans (body) - loaded via Google Fonts in root layout.

**Responsive Classes**: Use `section-padding`, `section-padding-sm`, `section-padding-lg` for consistent vertical spacing.

## SEO

SEO is critical for this site:
- Metadata defined in `app/layout.tsx` and individual pages
- `app/sitemap.ts` generates dynamic sitemap
- `app/robots.ts` configures robots.txt
- `components/sections/StructuredData.tsx` provides JSON-LD schema

## Environment Variables

Required for production:
- `NEXT_PUBLIC_BLOB_STORE_URL` - Vercel Blob Storage URL for images
- `NEXT_PUBLIC_SITE_URL` - Site URL for metadata and sitemap (defaults to `https://sproutflow-studio.com`)

See `BLOB_STORAGE_SETUP.md` and `VERCEL_ENV_SETUP.md` for detailed setup instructions.

## Deployment

Hosted on Vercel with auto-deploy from `main` branch. Environment variables configured in Vercel dashboard. Next.js image optimization configured for Vercel Blob Storage remote patterns.
