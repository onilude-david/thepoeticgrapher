import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx,mdx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#FAF9F6',
        surface: '#FFFFFF',
        'surface-soft': '#F3F1EC',
        ink: '#111111',
        black: '#000000',
        charcoal: '#2A2A2A',
        muted: '#6F6F6F',
        'soft-muted': '#A3A3A3',
        border: '#E5E5E5',
        'warm-line': '#C8C3BA',
        'hero-bg': '#080808',
      },
      fontFamily: {
        serif: ['var(--font-cormorant)', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        widest: '0.25em',
        wider: '0.18em',
        wide: '0.14em',
      },
      maxWidth: {
        container: '1200px',
        outer: '1440px',
      },
      transitionTimingFunction: {
        editorial: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  darkMode: 'class',
}

export default config
