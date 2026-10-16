/**
 * HIGH PRIORITY TESTS: SEO integrity
 *
 * Guards the fixes from the live-site sweep: one canonical www origin, social
 * and JSON-LD images that resolve, draft resources kept off every public
 * surface, and a 404 that does not contradict itself.
 */

import fs from 'fs'
import path from 'path'
import { render, screen } from '@testing-library/react'
import { DEFAULT_BLOB_STORE_URL, DEFAULT_SITE_URL, SITE_URL, getAbsoluteImageUrl, getSiteUrl } from '@/lib/site'
import { resources, getPublishedResources } from '@/data/resources'
import StructuredData from '@/components/StructuredData'
import { Footer } from '@/components/layout/Footer'
import sitemap from '@/app/sitemap'
import robots from '@/app/robots'
import { metadata as rootMetadata } from '@/app/layout'
import { metadata as notFoundMetadata } from '@/app/not-found'
import ResourcesRoute, { dynamicParams, generateMetadata, generateStaticParams } from '@/app/resources/[[...slug]]/page'
import { notFound } from 'next/navigation'

const WWW = 'https://www.sproutflow-studio.com'

jest.mock('next/navigation', () => ({
  notFound: jest.fn(() => {
    throw new Error('NEXT_NOT_FOUND')
  }),
  useRouter: () => ({ push: jest.fn(), replace: jest.fn(), prefetch: jest.fn(), back: jest.fn() }),
  usePathname: () => '/',
}))

// next/og extends the Fetch API Response, which jsdom does not provide. The
// tests only need the route's exported config, not a rendered PNG.
jest.mock('next/og', () => ({ ImageResponse: jest.fn() }))

/** Resolves to the error message a promise rejects with, or null. */
async function rejection(promise: Promise<unknown>): Promise<string | null> {
  try {
    await promise
    return null
  } catch (error) {
    return (error as Error).message
  }
}

/** Flip one draft to published for a test, restoring the data afterwards. */
const originalDrafts = resources.map((resource) => resource.draft)
function publishFirstResource() {
  resources[0].draft = false
  return resources[0]
}
afterEach(() => {
  resources.forEach((resource, index) => {
    resource.draft = originalDrafts[index]
  })
  jest.clearAllMocks()
})

describe('SEO integrity - SITE_URL', () => {
  it('defaults to the www serving host', () => {
    expect(DEFAULT_SITE_URL).toBe(WWW)
    expect(getSiteUrl(undefined)).toBe(WWW)
    expect(getSiteUrl('')).toBe(WWW)
    expect(SITE_URL).toBe(WWW)
  })

  it('respects NEXT_PUBLIC_SITE_URL and strips trailing slashes', () => {
    expect(getSiteUrl('https://staging.example.com/')).toBe('https://staging.example.com')
    expect(getSiteUrl('https://staging.example.com///')).toBe('https://staging.example.com')

    const previous = process.env.NEXT_PUBLIC_SITE_URL
    process.env.NEXT_PUBLIC_SITE_URL = 'https://preview.example.com/'
    try {
      jest.isolateModules(() => {
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        const site = require('@/lib/site')
        expect(site.SITE_URL).toBe('https://preview.example.com')
      })
    } finally {
      if (previous === undefined) delete process.env.NEXT_PUBLIC_SITE_URL
      else process.env.NEXT_PUBLIC_SITE_URL = previous
    }
  })

  it('builds absolute Blob image URLs, never site-relative ones', () => {
    expect(getAbsoluteImageUrl('ben-photo.png', undefined)).toBe(`${DEFAULT_BLOB_STORE_URL}/images/ben-photo.png`)
    expect(getAbsoluteImageUrl('/images/logo/a.png', 'https://blob.example.com/')).toBe(
      'https://blob.example.com/images/logo/a.png',
    )
  })
})

describe('SEO integrity - sitemap and robots', () => {
  it('lists only www URLs', () => {
    const urls = sitemap().map((entry) => entry.url)
    expect(urls.length).toBeGreaterThan(0)
    urls.forEach((url) => expect(url.startsWith(WWW)).toBe(true))
  })

  it('excludes drafts and the /resources index while nothing is published', () => {
    expect(getPublishedResources().length).toBe(0)
    const urls = sitemap().map((entry) => entry.url)
    expect(urls.some((url) => url.includes('/resources'))).toBe(false)
  })

  it('adds a resource and the index once one is published', () => {
    const published = publishFirstResource()
    const urls = sitemap().map((entry) => entry.url)
    expect(urls).toContain(`${WWW}/resources`)
    expect(urls).toContain(`${WWW}/resources/${published.slug}`)
    resources.slice(1).forEach((draft) => expect(urls).not.toContain(`${WWW}/resources/${draft.slug}`))
  })

  it('points robots.txt at the www sitemap', () => {
    expect(robots().sitemap).toBe(`${WWW}/sitemap.xml`)
  })
})

describe('SEO integrity - structured data', () => {
  function readSchemas() {
    const { container } = render(<StructuredData />)
    return Array.from(container.querySelectorAll('script[type="application/ld+json"]')).map((script) =>
      JSON.parse(script.textContent || '{}'),
    )
  }

  function collectStrings(value: unknown, out: string[] = []): string[] {
    if (typeof value === 'string') out.push(value)
    else if (Array.isArray(value)) value.forEach((item) => collectStrings(item, out))
    else if (value && typeof value === 'object') Object.values(value).forEach((item) => collectStrings(item, out))
    return out
  }

  it('uses the www origin for every site URL', () => {
    const siteUrls = collectStrings(readSchemas()).filter((value) => /^https?:\/\/[^/]*sproutflow-studio\.com/.test(value))
    expect(siteUrls.length).toBeGreaterThan(0)
    siteUrls.forEach((url) => expect(url.startsWith(WWW)).toBe(true))
  })

  it('points logo and images at the Blob store, not /images on the site host', () => {
    const [organization, person] = readSchemas()
    const images = [organization.logo, organization.image, person.image]
    images.forEach((url) => {
      expect(url.startsWith(`${DEFAULT_BLOB_STORE_URL}/images/`)).toBe(true)
      expect(url).not.toContain('sproutflow-studio.com/images')
    })
    expect(organization.logo).toBe(`${DEFAULT_BLOB_STORE_URL}/images/logo/main-logo-Photoroom.png`)
    expect(person.image).toBe(`${DEFAULT_BLOB_STORE_URL}/images/ben-photo.png`)
  })
})

describe('SEO integrity - root metadata and social card', () => {
  it('no longer references the broken /images/logo path', () => {
    expect(JSON.stringify(rootMetadata)).not.toContain('/images/')
    expect((rootMetadata.openGraph as any)?.images).toBeUndefined()
    expect((rootMetadata.twitter as any)?.images).toBeUndefined()
  })

  it('uses the www origin for metadataBase and the homepage canonical', () => {
    expect(String(rootMetadata.metadataBase)).toBe(`${WWW}/`)
    expect(rootMetadata.alternates?.canonical).toBe(WWW)
  })

  const imageRoutes = {
    'opengraph-image': () => import('@/app/opengraph-image'),
    'twitter-image': () => import('@/app/twitter-image'),
  }
  Object.entries(imageRoutes).forEach(([route, load]) => {
    it(`${route} exports a 1200x630 PNG card`, async () => {
      const imageModule = await load()
      expect(imageModule.size).toEqual({ width: 1200, height: 630 })
      expect(imageModule.contentType).toBe('image/png')
      expect(typeof imageModule.alt).toBe('string')
      expect(typeof imageModule.default).toBe('function')
    })
  })
})

describe('SEO integrity - resource visibility', () => {
  const draftSlug = resources[0].slug

  const at = (slug?: string[]) => ({ params: Promise.resolve({ slug }) })

  it('prerenders nothing, so every /resources path is a router 404, while all are drafts', () => {
    expect(dynamicParams).toBe(false)
    expect(generateStaticParams()).toEqual([])
  })

  it('sends a draft slug to notFound', async () => {
    expect(await rejection(ResourcesRoute(at([draftSlug])))).toBe('NEXT_NOT_FOUND')
    expect(await rejection(generateMetadata(at([draftSlug])))).toBe('NEXT_NOT_FOUND')
    expect(notFound).toHaveBeenCalled()
  })

  it('sends the /resources index to notFound while nothing is published', async () => {
    expect(await rejection(ResourcesRoute(at(undefined)))).toBe('NEXT_NOT_FOUND')
    expect(await rejection(ResourcesRoute(at([])))).toBe('NEXT_NOT_FOUND')
    expect(notFound).toHaveBeenCalled()
  })

  it('gives a published resource and the index static params and their own canonicals', async () => {
    const published = publishFirstResource()
    expect(generateStaticParams()).toEqual([{ slug: [] }, { slug: [published.slug] }])

    const meta = await generateMetadata(at([published.slug]))
    expect(meta.alternates?.canonical).toBe(`/resources/${published.slug}`)
    expect(meta.robots).toBeUndefined()
    const indexMeta = await generateMetadata(at(undefined))
    expect(indexMeta.alternates?.canonical).toBe('/resources')

    expect(await rejection(ResourcesRoute(at([published.slug])))).toBeNull()
    expect(await rejection(ResourcesRoute(at(undefined)))).toBeNull()
    expect(notFound).not.toHaveBeenCalled()
    // The other entries are still drafts.
    expect(await rejection(ResourcesRoute(at([resources[1].slug])))).toBe('NEXT_NOT_FOUND')
  })

  it('omits the footer Resources link when nothing is published', () => {
    render(<Footer />)
    expect(screen.queryByRole('link', { name: 'Resources' })).not.toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Services' })).toBeInTheDocument()
  })

  it('shows the footer Resources link once one resource is published', () => {
    publishFirstResource()
    render(<Footer />)
    expect(screen.getByRole('link', { name: 'Resources' })).toHaveAttribute('href', '/resources')
  })
})

describe('SEO integrity - 404 page', () => {
  it('has a real title and does not inherit the root robots or canonical', () => {
    expect(notFoundMetadata.title).toBe('Page not found')
    expect(notFoundMetadata.robots).toBeNull()
    expect(notFoundMetadata.alternates?.canonical).toBeNull()
  })
})

describe('SEO integrity - llms.txt', () => {
  const llms = fs.readFileSync(path.join(process.cwd(), 'public', 'llms.txt'), 'utf8')

  it('links service paths instead of homepage anchors', () => {
    expect(llms).toContain(`${WWW}/services/websites`)
    expect(llms).toContain(`${WWW}/services/growth-support`)
    expect(llms).not.toContain('/#services')
  })

  it('uses the www origin for every site link', () => {
    const siteLinks = llms.match(/https?:\/\/[^\s)]*sproutflow-studio\.com[^\s)]*/g) || []
    expect(siteLinks.length).toBeGreaterThan(0)
    siteLinks.forEach((link) => expect(link.startsWith(WWW)).toBe(true))
  })
})
