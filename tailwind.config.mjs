/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx,md,mdx}'],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        bg: '#0B0F14',
        'bg-elevated': '#11161D',
        'bg-overlay': '#1A2230',
        'bg-glass': 'rgba(17, 22, 29, 0.6)',
        'bg-glass-strong': 'rgba(17, 22, 29, 0.85)',
        text: '#E6EAF0',
        'text-muted': '#8A93A0',
        'text-dim': '#5C616A',
        accent: {
          DEFAULT: '#14B8A6',
          hover: '#2DD4BF',
          muted: 'rgba(20, 184, 166, 0.15)',
          glow: 'rgba(20, 184, 166, 0.35)',
        },
        border: {
          DEFAULT: 'rgba(255, 255, 255, 0.08)',
          strong: 'rgba(255, 255, 255, 0.14)',
          accent: 'rgba(20, 184, 166, 0.4)',
        },
        success: {
          DEFAULT: '#22C55E',
          muted: 'rgba(34, 197, 94, 0.15)',
        },
        warning: '#F59E0B',
        danger: '#EF4444',
      },

      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },

      fontSize: {
        display: ['72px', { lineHeight: '1.0', letterSpacing: '-0.03em', fontWeight: '600' }],
        h1:      ['56px', { lineHeight: '1.05', letterSpacing: '-0.025em', fontWeight: '600' }],
        h2:      ['36px', { lineHeight: '1.15', letterSpacing: '-0.02em', fontWeight: '600' }],
        h3:      ['24px', { lineHeight: '1.25', letterSpacing: '-0.015em', fontWeight: '600' }],
        h4:      ['20px', { lineHeight: '1.35', letterSpacing: '-0.01em', fontWeight: '500' }],
        h5:      ['14px', { lineHeight: '1.4',  letterSpacing: '0.04em',  fontWeight: '600' }],
        'body-lg': ['18px', { lineHeight: '1.6' }],
        body:    ['15px', { lineHeight: '1.6' }],
        'body-sm': ['13px', { lineHeight: '1.55' }],
        mono:    ['13px', { lineHeight: '1.55' }],
        'mono-sm': ['12px', { lineHeight: '1.4', letterSpacing: '0.02em', fontWeight: '500' }],
        'mono-lg': ['16px', { lineHeight: '1.5' }],
      },

      boxShadow: {
        subtle: '0 1px 2px rgba(0,0,0,0.3)',
        glass: '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.04)',
        elevated: '0 12px 48px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)',
        'accent-glow': '0 0 24px rgba(20,184,166,0.25)',
      },

      borderRadius: {
        sm: '6px',
        md: '10px',
        lg: '16px',
        xl: '24px',
      },

      backdropBlur: {
        glass: '12px',
        nav: '16px',
      },

      spacing: {
        128: '128px',
        160: '160px',
        section: '96px',
        'section-tight': '64px',
      },

      maxWidth: {
        prose: '42rem',
        narrow: '64rem',
        content: '72rem',
        wide: '84rem',
      },

      transitionDuration: {
        fast: '150ms',
        base: '200ms',
        slow: '300ms',
        slower: '500ms',
      },

      transitionTimingFunction: {
        'out-snappy': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'out-smooth': 'cubic-bezier(0.22, 1, 0.36, 1)',
        'in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },

      keyframes: {
        'fade-up': {
          '0%':   { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'pulse-dot': {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%':      { opacity: '0.55', transform: 'scale(0.85)' },
        },
        'pulse-ring': {
          '0%':   { transform: 'scale(0.8)', opacity: '0.6' },
          '100%': { transform: 'scale(2.4)', opacity: '0' },
        },
        'shimmer': {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },

      animation: {
        'fade-up': 'fade-up 500ms cubic-bezier(0.22, 1, 0.36, 1) both',
        'fade-in': 'fade-in 400ms cubic-bezier(0.22, 1, 0.36, 1) both',
        'pulse-dot': 'pulse-dot 2.4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'pulse-ring': 'pulse-ring 1.8s cubic-bezier(0.16, 1, 0.3, 1) infinite',
        'shimmer': 'shimmer 3s linear infinite',
      },
    },
  },
  plugins: [],
};
