import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        green: {
          dark:   '#4A6741',
          mid:    '#6B8C57',
          light:  '#8FA882',
          pale:   '#EFF3EB',
          xpale:  '#F5F8F3',
        },
        beige: {
          DEFAULT: '#C4B49A',
          light:   '#F0EBE3',
        },
        warm:  '#FAF8F5',
        gold:  '#C9A84C',
        ink: {
          dark:  '#2C3A28',
          mid:   '#4A5A46',
          light: '#7A8C76',
        },
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
        sans:  ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      boxShadow: {
        sm: '0 2px 8px rgba(44,58,40,.08)',
        md: '0 8px 32px rgba(44,58,40,.12)',
        lg: '0 16px 48px rgba(44,58,40,.18)',
      },
    },
  },
  plugins: [],
}

export default config
