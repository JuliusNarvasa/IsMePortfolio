'use client';
import { Hero } from './sections/Hero';
import { Screenshots } from './sections/Screenshots';
import { Features } from './sections/Features';
import { Downloads } from './sections/Downloads';
import { MoreApps } from './sections/MoreApps';
import { About } from './sections/About';
import { Contact } from './sections/Contact';

/**
 * Customer (B2C) theme layout.
 *
 * Sections, in order:
 *   Hero          → featured app showcase (Re-Fuel)
 *   Screenshots   → asymmetric 3-shot gallery
 *   Features      → 4 Re-Fuel feature highlights
 *   Downloads     → primary CTA for Re-Fuel
 *   More Apps     → the rest of the catalog
 *   About         → about the creator
 *   Contact       → closing email CTA
 *
 * The wrapper is a plain `<div>` (not `motion.div`): the crossfade animation
 * is owned by `PortfolioApp`'s Body, which wraps this Layout in its own
 * `motion.div` keyed on theme. Adding variants here would cascade with the
 * parent's variants and compound the y-shift + multiply opacities, turning a
 * crossfade into a slide.
 *
 * `data-theme-body="customer"` is the source of truth for the Nav observer,
 * which scopes its `section[id]` IntersectionObserver to this tree only.
 */
export default function CustomerLayout() {
  return (
    <div data-theme-body="customer">
      <Hero />
      <Screenshots />
      <Features />
      <Downloads />
      <MoreApps />
      <About />
      <Contact />
    </div>
  );
}
