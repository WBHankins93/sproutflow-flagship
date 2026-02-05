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
        display: ['var(--font-heading)', 'sans-serif'],  // DM Serif Display for headings
        body: ['var(--font-body)', 'sans-serif'],        // DM Sans for body
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
          50: '#f3f6f3',
          100: '#e3e9e3',
          200: '#c7d4c7',
          300: '#a3b9a3',
          400: '#7e9b7e',
          500: '#5F755E', // Main brand color
          600: '#4d5e4c',
          700: '#3e4a3d',
          800: '#333d33',
          900: '#2b322b',
        },
        
        // Accent Colors (Satin Sheen Gold)
        accent: {
          50: '#fef9ed',
          100: '#fcf0d4',
          200: '#f8dda8',
          300: '#f4c571',
          400: '#efa548',
          500: '#C49A45', // Accent gold
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
          primary: '#626155',   // Ebony
          secondary: '#445E69', // Payne's Gray
          muted: '#7a7d72',
        },
        
        // Background Colors
        background: {
          primary: '#E9E2D8',   // Alabaster
          secondary: '#EDDDC0', // Dutch White
          card: '#DDE3E2',      // Platinum
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