// tailwind.config.js - Professional Studio Configuration for Tailwind v4

export default {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // Professional Typography
      fontFamily: {
        'display': ['Playfair Display', 'serif'],
        'body': ['Inter', 'system-ui', 'sans-serif'],
      },
      
      // Sophisticated Color Palette - Woods & Waters (Refined)
      colors: {
        // Primary Brand (Used Sparingly)
        primary: {
          50: '#f8f9f7',
          100: '#f1f3ef',
          200: '#e3e7df',
          300: '#d0d6c8',
          400: '#a8b5a3',
          500: '#5F755E', // Main brand color
          600: '#516545',
          700: '#435239',
          800: '#364230',
          900: '#2d3727',
        },
        
        // Accent Gold (Strategic Use Only)
        accent: {
          50: '#fef9f2',
          100: '#fef2e2',
          200: '#fce4c4',
          300: '#f8d19b',
          400: '#f4b565',
          500: '#C49A45', // Accent color
          600: '#b8883a',
          700: '#996f2f',
          800: '#7c5a2a',
          900: '#654a25',
        },
        
        // Professional Neutrals (Primary Palette)
        neutral: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#1a1a1a',
        },
        
        // Subtle Nature Tones
        nature: {
          50: '#f8f9f7',
          100: '#f3f5f2',
          200: '#e8ebe7',
          300: '#d5d9d3',
          400: '#b8beb5',
          500: '#9db7b5', // Ash Gray from original palette
          600: '#8ba8a6',
          700: '#759593',
          800: '#5f7a78',
          900: '#4f6462',
        },
        
        // Text System
        text: {
          primary: '#1a1a1a',
          secondary: '#4a4a4a',
          muted: '#6a6a6a',
          light: '#a3a3a3',
        }
      },
      
      // Sophisticated Shadows
      boxShadow: {
        'soft': '0 2px 20px rgba(0, 0, 0, 0.04)',
        'medium': '0 4px 30px rgba(0, 0, 0, 0.08)',
        'strong': '0 8px 40px rgba(0, 0, 0, 0.12)',
        'nature': '0 4px 20px rgba(95, 117, 94, 0.1)',
      },
      
      // Professional Typography Scale
      fontSize: {
        'hero': ['clamp(2.5rem, 5vw, 4rem)', {
          lineHeight: '1.1',
          letterSpacing: '-0.02em',
        }],
        'section': ['clamp(1.75rem, 3vw, 2.5rem)', {
          lineHeight: '1.2',
          letterSpacing: '-0.01em',
        }],
        'subsection': ['clamp(1.25rem, 2vw, 1.5rem)', {
          lineHeight: '1.3',
          letterSpacing: '-0.01em',
        }],
        'body-lg': ['1.125rem', {
          lineHeight: '1.7',
        }],
        'body': ['1rem', {
          lineHeight: '1.6',
        }],
        'body-sm': ['0.875rem', {
          lineHeight: '1.5',
        }],
      },
    },
  },
}