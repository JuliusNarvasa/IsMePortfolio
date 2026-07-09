import type { Variants } from 'motion/react';

/**
 * Page-level enter/exit variants for the theme body crossfade in
 * `PortfolioApp.Body`. Total transition (300ms exit + 400ms enter under
 * `mode="wait"`) lands at 700ms — within the plan's 400-700ms "premium feel"
 * target. Subtle y-shift of 8px keeps the swap feeling crossfaded rather than
 * slid; opacity does the heavy lifting.
 */
export const pageVariants: Variants = {
  initial: { opacity: 0, y: 8 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
  },
};
