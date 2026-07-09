import type { ComponentType } from 'react';
import {
  businessTokens,
  customerTokens,
  personalTokens,
  type ThemeId,
  type ThemeTokens,
} from './tokens';

export type { ThemeId, ThemeTokens } from './tokens';

export interface NavLink {
  label: string;
  href: string;
}

export interface Theme {
  id: ThemeId;
  name: string;
  tokens: ThemeTokens;
  navLinks: NavLink[];
  /** Dynamic import of the theme's default-export Layout component. */
  getLayout: () => Promise<{ default: ComponentType }>;
}

export const personalTheme: Theme = {
  id: 'personal',
  name: 'Personal',
  tokens: personalTokens,
  navLinks: [
    { label: 'Beyond', href: '#beyond-the-code' },
    { label: 'Pet Projects', href: '#pet-projects' },
    { label: 'Projects', href: '#projects' },
    { label: 'Infrastructure', href: '#infrastructure' },
    { label: 'AI Lab', href: '#ai-lab' },
    { label: 'Experience', href: '#experience' },
    { label: 'Building', href: '#building' },
    { label: 'Contact', href: '#contact' },
  ],
  getLayout: () => import('./personal'),
};

export const businessTheme: Theme = {
  id: 'business',
  name: 'Business',
  tokens: businessTokens,
  navLinks: [
    { label: 'What I Build', href: '#what-i-build' },
    { label: 'Case Studies', href: '#case-studies' },
    { label: 'Tech Stack', href: '#tech-stack' },
    { label: 'Experience', href: '#experience' },
    { label: 'Contact', href: '#contact' },
  ],
  getLayout: () => import('./business'),
};

export const customerTheme: Theme = {
  id: 'customer',
  name: 'Customer',
  tokens: customerTokens,
  // Five top-level destinations. Hero and Screenshots are entry surfaces and
  // not given nav entries — the Nav observer still tracks them via
  // `data-theme-body="customer" section[id]`.
  navLinks: [
    { label: 'Features', href: '#features' },
    { label: 'Downloads', href: '#downloads' },
    { label: 'More Apps', href: '#more-apps' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ],
  getLayout: () => import('./customer'),
};

export const themes: Record<ThemeId, Theme> = {
  personal: personalTheme,
  business: businessTheme,
  customer: customerTheme,
};
