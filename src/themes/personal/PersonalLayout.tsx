'use client';
import { Hero } from './sections/Hero';
import { Beyond } from './sections/Beyond';
import { PetProjects } from './sections/PetProjects';
import { Projects } from './sections/Projects';
import { Infrastructure } from './sections/Infrastructure';
import { AILab } from './sections/AILab';
import { Experience } from './sections/Experience';
import { NowBuilding } from './sections/NowBuilding';
import { Contact } from './sections/Contact';

/**
 * Personal theme layout — composes the 9 Personal sections.
 *
 * The wrapper is a plain `<div>` (not `motion.div`): the crossfade animation
 * is owned by `PortfolioApp`'s Body, which wraps this Layout in its own
 * `motion.div` keyed on theme. Adding variants here would cascade with the
 * parent's variants and compound the y-shift (8+8=16px) + multiply opacities,
 * making the crossfade feel like a slide instead of a crossfade.
 *
 * `data-theme-body="personal"` is the source of truth for the Nav
 * IntersectionObserver, which scopes its `section[id]` watch to this tree.
 */
export default function PersonalLayout() {
  return (
    <div data-theme-body="personal">
      <Hero />
      <Beyond />
      <PetProjects />
      <Projects />
      <Infrastructure />
      <AILab />
      <Experience />
      <NowBuilding />
      <Contact />
    </div>
  );
}
