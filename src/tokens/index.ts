// tokens/index.ts
// Design tokens — single source of truth
// Components reference these; never raw hex values

export const tokens = {
  colors: {
    bgPrimary: 'var(--color-bg-primary)',
    bgSecondary: 'var(--color-bg-secondary)',
    bgCard: 'var(--color-bg-card)',
    bgCardHover: 'var(--color-bg-card-hover)',

    textPrimary: 'var(--color-text-primary)',
    textSecondary: 'var(--color-text-secondary)',
    textMuted: 'var(--color-text-muted)',
    textInverse: 'var(--color-text-inverse)',

    accentPrimary: 'var(--color-accent-primary)',
    accentPrimaryLight: 'var(--color-accent-primary-light)',
    accentPrimaryDark: 'var(--color-accent-primary-dark)',
    accentSuccess: 'var(--color-accent-success)',
    accentWarning: 'var(--color-accent-warning)',
    accentError: 'var(--color-accent-error)',

    borderDefault: 'var(--color-border-default)',
    borderAccent: 'var(--color-border-accent)',

    bubbleFill: 'var(--color-bubble-fill)',
    bubbleFillLight: 'var(--color-bubble-fill-light)',
    bubbleStroke: 'var(--color-bubble-stroke)',
    gridLine: 'var(--color-grid-line)',
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
    '3xl': '4rem',
  },
  radius: {
    sm: '0.375rem',
    md: '0.75rem',
    lg: '1rem',
    xl: '1.5rem',
    full: '9999px',
  },
  font: {
    display: "'Syne', sans-serif",
    body: "'DM Sans', sans-serif",
  },
  shadow: {
    card: 'var(--shadow-card)',
    elevated: 'var(--shadow-elevated)',
    glow: 'var(--shadow-glow)',
  },
} as const
