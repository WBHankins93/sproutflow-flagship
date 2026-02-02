/**
 * HIGH PRIORITY TESTS: Image URL Generation
 * 
 * Tests to ensure image URL generation works correctly
 * in both development and production environments.
 */

import { getImageUrl, getBlobImageUrl } from '@/lib/blob-images'

describe('Image URL Generation', () => {
  const originalEnv = process.env

  beforeEach(() => {
    jest.resetModules()
    process.env = { ...originalEnv }
  })

  afterEach(() => {
    process.env = originalEnv
  })

  describe('getImageUrl', () => {
    it('should prepend images/ to paths that do not include it', () => {
      const result = getImageUrl('test-image.jpg')
      expect(result).toContain('images/test-image.jpg')
    })

    it('should not double-prepend images/ to paths that already include it', () => {
      const result = getImageUrl('images/test-image.jpg')
      expect(result).toContain('images/test-image.jpg')
      expect(result).not.toContain('images/images/')
    })

    it('should handle paths with subdirectories', () => {
      const result = getImageUrl('logo/main-logo.png')
      expect(result).toContain('images/logo/main-logo.png')
    })
  })

  describe('getBlobImageUrl - Development Mode', () => {
    it('should return local path in development when blob URL is not set', () => {
      process.env.NODE_ENV = 'development'
      delete process.env.NEXT_PUBLIC_BLOB_STORE_URL

      const result = getBlobImageUrl('images/test.jpg')
      expect(result).toBe('/images/test.jpg')
    })

    it('should remove leading slash from paths', () => {
      process.env.NODE_ENV = 'development'
      delete process.env.NEXT_PUBLIC_BLOB_STORE_URL

      const result = getBlobImageUrl('/images/test.jpg')
      expect(result).toBe('/images/test.jpg')
    })
  })

  describe('getBlobImageUrl - Production Mode', () => {
    it('should use blob store URL when set', () => {
      process.env.NODE_ENV = 'production'
      process.env.NEXT_PUBLIC_BLOB_STORE_URL = 'https://blob.vercel-storage.com'

      const result = getBlobImageUrl('images/test.jpg')
      expect(result).toBe('https://blob.vercel-storage.com/images/test.jpg')
    })

    it('should handle blob URL with trailing slash', () => {
      process.env.NODE_ENV = 'production'
      process.env.NEXT_PUBLIC_BLOB_STORE_URL = 'https://blob.vercel-storage.com/'

      const result = getBlobImageUrl('images/test.jpg')
      expect(result).toBe('https://blob.vercel-storage.com/images/test.jpg')
    })

    it('should fallback to local path if blob URL is not set', () => {
      process.env.NODE_ENV = 'production'
      delete process.env.NEXT_PUBLIC_BLOB_STORE_URL

      const result = getBlobImageUrl('images/test.jpg')
      expect(result).toBe('/images/test.jpg')
    })
  })

  describe('getBlobImageUrl - Development with Blob Override', () => {
    it('should use blob URL in development if explicitly set', () => {
      process.env.NODE_ENV = 'development'
      process.env.NEXT_PUBLIC_BLOB_STORE_URL = 'https://blob.vercel-storage.com'

      const result = getBlobImageUrl('images/test.jpg')
      expect(result).toBe('https://blob.vercel-storage.com/images/test.jpg')
    })
  })
})
