export type ThemeId = 'personal' | 'business' | 'customer';

export interface ThemeTokens {
  /* Surfaces */
  '--bg': string;
  '--bg-elevated': string;
  '--bg-overlay': string;
  '--bg-glass': string;
  '--bg-glass-strong': string;

  /* Text */
  '--text': string;
  '--text-muted': string;
  '--text-dim': string;

  /* Accent */
  '--accent': string;
  '--accent-hover': string;
  '--accent-muted': string;
  '--accent-glow': string;
  '--accent-border': string;
  '--on-accent': string;

  /* Borders */
  '--border': string;
  '--border-strong': string;

  /* Status */
  '--success': string;
  '--success-muted': string;
  '--warning': string;
  '--danger': string;

  /* Shadows */
  '--shadow-subtle': string;
  '--shadow-glass': string;
  '--shadow-elevated': string;
  '--shadow-accent-glow': string;

  /* Radii */
  '--radius-sm': string;
  '--radius-md': string;
  '--radius-lg': string;
  '--radius-xl': string;

  /* Motion */
  '--duration-fast': string;
  '--duration-base': string;
  '--duration-slow': string;
  '--duration-slower': string;
  '--ease-out-snappy': string;
  '--ease-out-smooth': string;
  '--ease-in-out': string;

  /* Spacing rhythm */
  '--space-section': string;
  '--space-section-tight': string;

  /* Layout */
  '--container-wide': string;
  '--container-content': string;
  '--container-narrow': string;
  '--container-prose': string;

  /* Glass effect preset */
  '--glass-blur': string;

  /* Typography */
  '--font-sans': string;
  '--font-mono': string;
}

/* Personal — the existing developer-themed site.
   Values mirror the original :root block from global.css. */
export const personalTokens: ThemeTokens = {
  /* Surfaces */
  '--bg':                '#0B0F14',
  '--bg-elevated':       '#11161D',
  '--bg-overlay':        '#1A2230',
  '--bg-glass':          'rgba(17, 22, 29, 0.6)',
  '--bg-glass-strong':   'rgba(17, 22, 29, 0.85)',

  /* Text */
  '--text':              '#E6EAF0',
  '--text-muted':        '#8A93A0',
  '--text-dim':          '#5C616A',

  /* Accent */
  '--accent':            '#14B8A6',
  '--accent-hover':      '#2DD4BF',
  '--accent-muted':      'rgba(20, 184, 166, 0.15)',
  '--accent-glow':       'rgba(20, 184, 166, 0.35)',
  '--accent-border':     'rgba(20, 184, 166, 0.4)',
  '--on-accent':         '#0B0F14',

  /* Borders */
  '--border':            'rgba(255, 255, 255, 0.08)',
  '--border-strong':     'rgba(255, 255, 255, 0.14)',

  /* Status */
  '--success':           '#22C55E',
  '--success-muted':     'rgba(34, 197, 94, 0.15)',
  '--warning':           '#F59E0B',
  '--danger':            '#EF4444',

  /* Shadows */
  '--shadow-subtle':     '0 1px 2px rgba(0, 0, 0, 0.3)',
  '--shadow-glass':      '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.04)',
  '--shadow-elevated':   '0 12px 48px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.06)',
  '--shadow-accent-glow': '0 0 24px rgba(20, 184, 166, 0.25)',

  /* Radii */
  '--radius-sm':         '6px',
  '--radius-md':         '10px',
  '--radius-lg':         '16px',
  '--radius-xl':         '24px',

  /* Motion */
  '--duration-fast':     '150ms',
  '--duration-base':     '200ms',
  '--duration-slow':     '300ms',
  '--duration-slower':   '500ms',
  '--ease-out-snappy':   'cubic-bezier(0.16, 1, 0.3, 1)',
  '--ease-out-smooth':   'cubic-bezier(0.22, 1, 0.36, 1)',
  '--ease-in-out':       'cubic-bezier(0.4, 0, 0.2, 1)',

  /* Spacing rhythm */
  '--space-section':       '96px',
  '--space-section-tight': '64px',

  /* Layout */
  '--container-wide':    '84rem',
  '--container-content': '72rem',
  '--container-narrow':  '56rem',
  '--container-prose':   '42rem',

  /* Glass effect preset */
  '--glass-blur':        'saturate(140%) blur(12px)',

  /* Typography */
  '--font-sans':         "Inter, system-ui, -apple-system, sans-serif",
  '--font-mono':         '"JetBrains Mono", ui-monospace, SFMono-Regular, monospace',
};

/* Business — Stripe/Linear-leaning dark indigo. Executive-grade.
   Refined accent: a custom indigo with a slight blue lean (between Stripe's
   #635BFF and Linear's #5E6AD2). Slightly more saturated than Tailwind's
   default indigo-500 to feel premium rather than generic. */
export const businessTokens: ThemeTokens = {
  /* Surfaces — deep ink with a cool blue cast */
  '--bg':                '#0A0E1A',
  '--bg-elevated':       '#11172A',
  '--bg-overlay':        '#1A2240',
  '--bg-glass':          'rgba(17, 23, 42, 0.6)',
  '--bg-glass-strong':   'rgba(17, 23, 42, 0.85)',

  /* Text */
  '--text':              '#E5E9F2',
  '--text-muted':        '#8B95A7',
  /* Bumped from #5C6478 → #7F8AA6 to clear WCAG AA 4.5:1 on bg-overlay.
     The original was 2.64:1 on bg-overlay (FAIL). New value: 4.52:1 (AA). */
  '--text-dim':          '#7F8AA6',

  /* Accent — custom indigo with blue lean (#5B6CFF) */
  '--accent':            '#5B6CFF',
  '--accent-hover':      '#7C8BFF',
  '--accent-muted':      'rgba(91, 108, 255, 0.15)',
  '--accent-glow':       'rgba(91, 108, 255, 0.35)',
  '--accent-border':     'rgba(91, 108, 255, 0.4)',
  '--on-accent':         '#FFFFFF',

  /* Borders */
  '--border':            'rgba(255, 255, 255, 0.08)',
  '--border-strong':     'rgba(255, 255, 255, 0.14)',

  /* Status */
  '--success':           '#22C55E',
  '--success-muted':     'rgba(34, 197, 94, 0.15)',
  '--warning':           '#F59E0B',
  '--danger':            '#EF4444',

  /* Shadows */
  '--shadow-subtle':     '0 1px 2px rgba(0, 0, 0, 0.3)',
  '--shadow-glass':      '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.04)',
  '--shadow-elevated':   '0 12px 48px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.06)',
  '--shadow-accent-glow': '0 0 24px rgba(91, 108, 255, 0.30)',

  /* Radii */
  '--radius-sm':         '6px',
  '--radius-md':         '10px',
  '--radius-lg':         '16px',
  '--radius-xl':         '24px',

  /* Motion */
  '--duration-fast':     '150ms',
  '--duration-base':     '200ms',
  '--duration-slow':     '300ms',
  '--duration-slower':   '500ms',
  '--ease-out-snappy':   'cubic-bezier(0.16, 1, 0.3, 1)',
  '--ease-out-smooth':   'cubic-bezier(0.22, 1, 0.36, 1)',
  '--ease-in-out':       'cubic-bezier(0.4, 0, 0.2, 1)',

  /* Spacing rhythm */
  '--space-section':       '96px',
  '--space-section-tight': '64px',

  /* Layout */
  '--container-wide':    '84rem',
  '--container-content': '72rem',
  '--container-narrow':  '56rem',
  '--container-prose':   '42rem',

  /* Glass effect preset */
  '--glass-blur':        'saturate(140%) blur(12px)',

  /* Typography */
  '--font-sans':         "Inter, system-ui, -apple-system, sans-serif",
  '--font-mono':         '"JetBrains Mono", ui-monospace, SFMono-Regular, monospace',
};

/* Customer (B2C) — vibrant magenta-pink palette, warm dark surfaces.
   Refined accent: a vivid magenta-pink between Apple Music's pink and
   Spotify Wrapped's hot-pink. Saturated enough to feel emotional and
   consumer-friendly, dark enough to keep the dark mode premium rather
   than garish. The other tokens are unchanged from the placeholder
   (warm purple-tinted dark surfaces) since they already suit the
   consumer mood; only the surfaces and accent got a tune-up. */
export const customerTokens: ThemeTokens = {
  /* Surfaces — warm purple-black, slightly deeper than the placeholder */
  '--bg':                '#0E0A18',
  '--bg-elevated':       '#1B1326',
  '--bg-overlay':        '#251B33',
  '--bg-glass':          'rgba(27, 19, 38, 0.6)',
  '--bg-glass-strong':   'rgba(27, 19, 38, 0.85)',

  /* Text — warm white with a faint purple cast */
  '--text':              '#F5F0FF',
  '--text-muted':        '#A99CC4',
  /* Bumped from #6F6486 → #8E80AC to clear WCAG AA 4.5:1 on bg-overlay.
     The original was 2.99:1 on bg-overlay (FAIL). New value: 4.55:1 (AA). */
  '--text-dim':          '#8E80AC',

  /* Accent — vibrant magenta-pink (#FF2D87) */
  '--accent':            '#FF2D87',
  '--accent-hover':      '#FF4F9F',
  '--accent-muted':      'rgba(255, 45, 135, 0.15)',
  '--accent-glow':       'rgba(255, 45, 135, 0.35)',
  '--accent-border':     'rgba(255, 45, 135, 0.4)',
  '--on-accent':         '#FFFFFF',

  /* Borders */
  '--border':            'rgba(255, 255, 255, 0.08)',
  '--border-strong':     'rgba(255, 255, 255, 0.14)',

  /* Status */
  '--success':           '#22C55E',
  '--success-muted':     'rgba(34, 197, 94, 0.15)',
  '--warning':           '#F59E0B',
  '--danger':            '#EF4444',

  /* Shadows */
  '--shadow-subtle':     '0 1px 2px rgba(0, 0, 0, 0.3)',
  '--shadow-glass':      '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.04)',
  '--shadow-elevated':   '0 12px 48px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.06)',
  '--shadow-accent-glow': '0 0 32px rgba(255, 45, 135, 0.32)',

  /* Radii */
  '--radius-sm':         '6px',
  '--radius-md':         '10px',
  '--radius-lg':         '16px',
  '--radius-xl':         '24px',

  /* Motion */
  '--duration-fast':     '150ms',
  '--duration-base':     '200ms',
  '--duration-slow':     '300ms',
  '--duration-slower':   '500ms',
  '--ease-out-snappy':   'cubic-bezier(0.16, 1, 0.3, 1)',
  '--ease-out-smooth':   'cubic-bezier(0.22, 1, 0.36, 1)',
  '--ease-in-out':       'cubic-bezier(0.4, 0, 0.2, 1)',

  /* Spacing rhythm */
  '--space-section':       '96px',
  '--space-section-tight': '64px',

  /* Layout */
  '--container-wide':    '84rem',
  '--container-content': '72rem',
  '--container-narrow':  '56rem',
  '--container-prose':   '42rem',

  /* Glass effect preset */
  '--glass-blur':        'saturate(140%) blur(12px)',

  /* Typography */
  '--font-sans':         "Inter, system-ui, -apple-system, sans-serif",
  '--font-mono':         '"JetBrains Mono", ui-monospace, SFMono-Regular, monospace',
};
