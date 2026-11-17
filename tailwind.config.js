/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '1.5rem',
      screens: {
        '2xl': '1380px',
      },
    },
    extend: {
      colors: {
        brand: {
          navy: '#10365B',
          darkNavy: '#092B4C',
          teal: '#00A9B7',
          tealDark: '#008b97',
          tealLight: '#e0f7fa',
          lightBg: '#F5F8FA',
          slate: '#475569',
          accent: '#E65100', // Subtle warm construction accent
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: '#10365B',
          foreground: '#FFFFFF',
        },
        secondary: {
          DEFAULT: '#00A9B7',
          foreground: '#FFFFFF',
        },
        muted: {
          DEFAULT: '#F1F5F9',
          foreground: '#64748B',
        },
        accent: {
          DEFAULT: '#F5F8FA',
          foreground: '#10365B',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        display: ['var(--font-heading)', 'sans-serif'],
        heading: ['var(--font-heading)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      boxShadow: {
        'industrial': '0 10px 30px -5px rgba(16, 54, 91, 0.12), 0 4px 6px -2px rgba(16, 54, 91, 0.05)',
        'industrial-lg': '0 20px 40px -15px rgba(16, 54, 91, 0.25)',
        'industrial-glow': '0 0 25px rgba(0, 169, 183, 0.35)',
        'industrial-card': '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 10px 25px -5px rgba(16, 54, 91, 0.08)',
      },
      backgroundImage: {
        'blueprint-grid': "radial-gradient(rgba(0, 169, 183, 0.15) 1px, transparent 1px)",
        'tech-lines': "linear-gradient(to right, rgba(0,169,183,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,169,183,0.06) 1px, transparent 1px)",
      },
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 },
        },
        'pulse-subtle': {
          '0%, 100%': { opacity: 1, transform: 'scale(1)' },
          '50%': { opacity: 0.9, transform: 'scale(1.02)' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'pulse-subtle': 'pulse-subtle 4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
