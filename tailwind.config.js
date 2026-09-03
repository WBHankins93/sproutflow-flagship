// tailwind.config.js - COMPLETE SPROUTFLOW CONFIGURATION

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // ============================================
      // FONTS
      // ============================================
      fontFamily: {
        // These MUST match the CSS variables from layout.tsx
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        body: ['var(--font-body)', 'system-ui', 'sans-serif'],
        accent: ['var(--font-accent)', 'Georgia', 'serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      
      // ============================================
      // TYPOGRAPHY SCALE
      // ============================================
      fontSize: {
        // v2 display scale
        'display-xl': ['clamp(2.5rem, 5.6vw, 5.125rem)', { lineHeight: '0.94', letterSpacing: '-0.03em', fontWeight: '700' }],
        'display-lg': ['clamp(2rem, 4.2vw, 4rem)', { lineHeight: '1.0', letterSpacing: '-0.025em', fontWeight: '700' }],
        'display-md': ['clamp(1.5rem, 2.6vw, 2.5rem)', { lineHeight: '1.05', letterSpacing: '-0.02em', fontWeight: '600' }],
        // Supporting sections. Without this step everything below the page's
        // two or three anchor headings collapses onto display-md and the page
        // reads as one flat shout.
        'display-sm': ['clamp(1.5rem, 2.1vw, 1.9375rem)', { lineHeight: '1.12', letterSpacing: '-0.015em', fontWeight: '600' }],
        'h4': ['1.25rem', { lineHeight: '1.3', fontWeight: '600' }],

        // Body
        'body-lg': ['1.125rem', { lineHeight: '1.75' }],
        'body': ['1rem', { lineHeight: '1.7' }],
        'body-sm': ['0.875rem', { lineHeight: '1.65' }],

        // Supporting
        'eyebrow': ['0.6875rem', { lineHeight: '1.4', letterSpacing: '0.18em', fontWeight: '600' }],
        'mono-meta': ['0.8125rem', { lineHeight: '1.4', letterSpacing: '0.08em' }],

        // Legacy aliases. Kept so v1 markup renders until each section is
        // rebuilt in PRs 4 through 10. Remove once no usages remain.
        'hero': ['clamp(3rem, 5.6vw, 5.125rem)', { lineHeight: '0.94', letterSpacing: '-0.03em', fontWeight: '700' }],
        'section': ['clamp(2.25rem, 4.2vw, 4rem)', { lineHeight: '1.0', letterSpacing: '-0.025em', fontWeight: '700' }],
        'subsection': ['clamp(1.75rem, 2.6vw, 2.5rem)', { lineHeight: '1.05', letterSpacing: '-0.02em', fontWeight: '600' }],
      },

      // ============================================
      // WOODS & WATERS COLOR PALETTE
      //
      // Sourced directly from the "Woods & Waters" Figma palette (Sept 2026):
      // Canopy — Pine Shadow #223528, Fern #3F6B45, Sprout #8FBF5C
      // Undergrowth — Moss #7A7F3E, Bark #6B4A32, Soil #3E2E22
      // Deep & Bloom — Char #241F17, Goldenrod #D9A441
      // Ground — Birch Paper #F4EFE3, Lichen #E4E3D2, Edge #D3D0BC
      //
      // primary/ink/accent/cream below are tint ramps built from those exact
      // anchors (900/500 for primary/accent, 900/700 for ink, 300/500 for
      // cream match the named swatch precisely). Earlier version of this
      // file used placeholder greens/golds that never matched the Figma
      // spec - replaced in full here.
      // ============================================
      colors: {
        // Primary Brand Colors (Pine Shadow)
        primary: {
          50: '#F3F7F4',
          100: '#E3EDE6',
          200: '#C7DBCD',
          300: '#A2C3AC',
          400: '#73A583',
          500: '#548262',
          600: '#42674D',
          700: '#34513D',
          800: '#283E2F',
          900: '#223528', // Pine Shadow - main brand color
          950: '#18251C',
        },

        // Accent Colors (Goldenrod)
        accent: {
          50: '#FCF7EE',
          100: '#F7EBD4',
          200: '#EED6AA',
          300: '#E7C688',
          400: '#DFB25E',
          500: '#D9A441', // Goldenrod - accent gold
          600: '#BF8A26',
          700: '#8C651C', // Darkened for 4.5:1 as body text on the cream canvas
          800: '#735317',
          900: '#5E4313',
        },

        // Ink. Dark canvases for alternating sections. Pine Shadow through
        // Fern, the Canopy family from the Woods & Waters palette.
        ink: {
          900: '#223528', // Pine Shadow
          800: '#315037',
          700: '#3F6B45', // Fern
        },

        // Cream. Light canvases. Birch Paper and Lichen, the Ground family.
        cream: {
          500: '#E4E3D2', // Lichen
          300: '#F4EFE3', // Birch Paper
        },

        // Text Colors
        text: {
          primary: '#626155',   // Ebony
          secondary: '#57604F', // Warm gray-green
          muted: '#5f665c',
        },

        // Background Colors
        background: {
          primary: '#E4E3D2',   // Lichen
          card: '#D3D0BC',      // Edge
        },
      },
      
      // ============================================
      // SPACING
      // ============================================
      spacing: {
        'section-padding': 'clamp(3rem, 8vw, 8rem)',
        'section-padding-sm': 'clamp(2rem, 5vw, 5rem)',
        'section-padding-lg': 'clamp(4rem, 10vw, 12rem)',
      },
      
      // ============================================
      // CONTAINER SIZES
      // ============================================
      maxWidth: {
        'container': '80rem',       // 1280px
        'container-wide': '90rem',  // 1440px
        'container-narrow': '48rem', // 768px
      },
      
      // ============================================
      // BOX SHADOWS
      // ============================================
      boxShadow: {
        'soft': '0 2px 8px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.06)',
        'medium': '0 4px 16px rgba(0, 0, 0, 0.08), 0 2px 4px rgba(0, 0, 0, 0.06)',
        'nature': '0 10px 40px rgba(95, 117, 94, 0.15)',
      },
      
      // ============================================
      // ANIMATIONS
      // ============================================
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'carousel-slow': 'carouselScroll 45s linear infinite',
      },
      
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-4px)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        carouselScroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-33.333%)' },
        },
      },
    },
  },
  plugins: [],
}
