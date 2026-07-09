'use client';
import { Hero } from './sections/Hero';
import { WhatIBuild } from './sections/WhatIBuild';
import { CaseStudies } from './sections/CaseStudies';
import { TechStack } from './sections/TechStack';
import { Experience } from './sections/Experience';
import { CTA } from './sections/CTA';
import { Contact } from './sections/Contact';

/**
 * Business (B2B) theme layout.
 *
 * Sections, in order:
 *   Hero, What I Build, Case Studies, Tech Stack,
 *   Experience, CTA, Contact.
 *
 * The wrapper is a plain `<div>` (not `motion.div`): the crossfade animation
 * is owned by `PortfolioApp`'s Body, which wraps this Layout in its own
 * `motion.div` keyed on theme. Adding variants here would cascade with the
 * parent's variants and compound the y-shift + multiply opacities.
 *
 * `data-theme-body="business"` is the source of truth for the Nav observer.
 */
export default function BusinessLayout() {
  return (
    <div data-theme-body="business">
      <Hero />
      <WhatIBuild />
      <CaseStudies />
      <TechStack />
      <Experience />
      <CTA />
      <Contact />
    </div>
  );
}