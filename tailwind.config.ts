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
      keyframes: {
        shimmer: {
          from: { backgroundPosition: '250% center' },
          to: { backgroundPosition: '-250% center' },
        },
        'border-beam': {
          '100%': { 'offset-distance': '100%' },
        },
        shimmer_btn: {
          '0%, 90%, 100%': { backgroundPosition: 'calc(-100% - var(--shimmer-width)) 0' },
          '30%, 60%': { backgroundPosition: 'calc(100% + var(--shimmer-width)) 0' },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        'marquee-rev': {
          from: { transform: 'translateX(-50%)' },
          to: { transform: 'translateX(0)' },
        },
      },
      animation: {
        shimmer: 'shimmer 4s linear infinite',
        'border-beam': 'border-beam calc(var(--duration,8)*1s) infinite linear',
        shimmer_btn: 'shimmer_btn 8s infinite',
        marquee: 'marquee 32s linear infinite',
        'marquee-rev': 'marquee-rev 40s linear infinite',
      },
    },
  },
  darkMode: 'class',
}

export default config
