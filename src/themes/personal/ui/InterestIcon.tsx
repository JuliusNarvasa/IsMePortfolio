import type { InterestIcon } from '../../../data/interests';

interface Props {
  name: InterestIcon;
}

export function InterestIconSvg({ name }: Props) {
  const common = {
    width: 22,
    height: 22,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.75,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
  };

  switch (name) {
    case 'cpu':
      return (
        <svg {...common}>
          <rect x="4" y="4" width="16" height="16" rx="2" />
          <rect x="9" y="9" width="6" height="6" />
          <path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3" />
        </svg>
      );
    case 'server':
      return (
        <svg {...common}>
          <rect x="2" y="3" width="20" height="8" rx="2" />
          <rect x="2" y="13" width="20" height="8" rx="2" />
          <line x1="6" y1="7" x2="6.01" y2="7" />
          <line x1="6" y1="17" x2="6.01" y2="17" />
          <line x1="10" y1="7" x2="14" y2="7" />
          <line x1="10" y1="17" x2="14" y2="17" />
        </svg>
      );
    case 'eye':
      return (
        <svg {...common}>
          <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" />
          <circle cx="12" cy="12" r="3" />
          <line x1="3" y1="3" x2="21" y2="21" />
        </svg>
      );
    case 'workflow':
      return (
        <svg {...common}>
          <rect width="7" height="7" x="3" y="3" rx="1.5" />
          <rect width="7" height="7" x="14" y="14" rx="1.5" />
          <path d="M7 10v2a2 2 0 0 0 2 2h5" />
        </svg>
      );
    case 'paddle':
      return (
        <svg {...common}>
          <path d="M8 2.5a5.5 5.5 0 0 1 5.5 5.5v3a3 3 0 0 1-3 3H8.5A5.5 5.5 0 0 1 3 8.5v-.5A5.5 5.5 0 0 1 8 2.5z" />
          <path d="M10.5 14 13 22" />
          <path
            d="M10.5 14a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"
            fill="currentColor"
            stroke="none"
          />
        </svg>
      );
    case 'wrench':
      return (
        <svg {...common}>
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
        </svg>
      );
  }
}
