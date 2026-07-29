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
        display: ['var(--font-heading)', 'var(--font-body)', 'sans-serif'],
        body: ['var(--font-body)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],         // Fira Code for code
      },
      
      // ============================================
      // TYPOGRAPHY SCALE
      // ============================================
      fontSize: {
        // Hero & Display
        'hero': ['clamp(2.5rem, 6vw, 5rem)', { 
          lineHeight: '1.1', 
          fontWeight: '700',
          letterSpacing: '-0.02em'
        }],
        'section': ['clamp(2rem, 4vw, 3.5rem)', { 
          lineHeight: '1.2', 
          fontWeight: '600',
          letterSpacing: '-0.01em'
        }],
        'subsection': ['clamp(1.5rem, 3vw, 2.25rem)', { 
          lineHeight: '1.3', 
          fontWeight: '600' 
        }],
        
        // Body Text
        'body-lg': ['1.125rem', { lineHeight: '1.7' }],
        'body': ['1rem', { lineHeight: '1.7' }],
        'body-sm': ['0.875rem', { lineHeight: '1.6' }],
      },
      
      // ============================================
      // WOODS & WATERS COLOR PALETTE
      // ============================================
      colors: {
        // Primary Brand Colors (Reseda Green)
        primary: {
          50: '#f0f4ef',
          100: '#dde7dc',
          200: '#bfd0bd',
          300: '#96b092',
          400: '#6f906e',
          500: '#4f7453',
          600: '#3b5d42',
          700: '#2e4a35',
          800: '#243b2b',
          900: '#18291e',
        },
        
        // Accent Colors (Satin Sheen Gold)
        accent: {
          50: '#fef9ed',
          100: '#fcf0d4',
          200: '#f8dda8',
          300: '#f4c571',
          400: '#efa548',
          500: '#B98436', // Accent ochre
          600: '#a67d2d',
          700: '#885f27',
          800: '#714d26',
          900: '#604123',
        },
        
        // Nature/Green Tones
        nature: {
          50: '#f3f6f5',
          100: '#e3e9e7',
          200: '#c9d5d2',
          300: '#9DB7B5', // Ash Gray
          400: '#7a9c99',
          500: '#5e817f',
          600: '#4c6866',
          700: '#42533C', // Feldgrau
          800: '#384540',
          900: '#323c38',
        },
        
        // Text Colors
        text: {
          primary: '#182019',
          secondary: '#465047',
          muted: '#687169',
        },
        
        // Background Colors
        background: {
          primary: '#F7F4EC',
          secondary: '#E9E2D5',
          card: '#E2E9E1',
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
