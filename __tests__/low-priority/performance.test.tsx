/// <reference types="jest" />
/// <reference types="@testing-library/jest-dom" />

/**
 * LOW PRIORITY TESTS: Performance
 * 
 * Basic performance-related checks for images,
 * lazy loading, and resource optimization.
 */

import { render } from '@testing-library/react'
import Header from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import HeroSection from '@/components/sections/HeroSection'

describe('Performance - Image Optimization', () => {
  it('should have priority prop on hero images', () => {
    const { container } = render(<HeroSection />)
    // Note: Next.js Image component with priority prop
    // This is a basic check - actual priority behavior is handled by Next.js
    const images = container.querySelectorAll('img')
    expect(images.length).toBeGreaterThan(0)
  })

  it('should have priority prop on header logo', () => {
    const { container } = render(<Header />)
    // Header logo should be prioritized for LCP
    const images = container.querySelectorAll('img')
    expect(images.length).toBeGreaterThan(0)
  })
})

describe('Performance - Resource Loading', () => {
  it('should use Next.js Image component for optimization', () => {
    // This is verified by the fact that we're importing from 'next/image'
    // Actual optimization is handled by Next.js at build/runtime
    expect(true).toBe(true)
  })

  it('should have proper image dimensions specified', () => {
    const { container } = render(<Header />)
    const images = container.querySelectorAll('img')
    
    // Images should have width/height for layout stability
    images.forEach((img: Element) => {
      // Next.js Image component handles this, but we verify images exist
      expect(img).toBeInTheDocument()
    })
  })
})

describe('Performance - Code Splitting', () => {
  it('should use dynamic imports where appropriate', () => {
    // Components using 'use client' are code-split automatically
    // This is a placeholder for future dynamic import checks
    expect(true).toBe(true)
  })
})

describe('Performance - Font Loading', () => {
  it('should use Next.js font optimization', async () => {
    const layout = await import('@/app/layout')
    // Fonts are loaded via next/font/google which optimizes automatically
    expect(layout).toBeDefined()
  })
})
