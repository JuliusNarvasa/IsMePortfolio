import { projects } from '../../../data/projects';
import { ProjectCard } from '../ui/ProjectCard';
import { SectionHeader } from '../../shared/ui/SectionHeader';
import { Reveal } from '../../shared/Reveal';

export function Projects() {
  return (
    <section
      id="projects"
      className="py-section px-6"
      aria-labelledby="section-projects-title"
    >
      <div className="mx-auto max-w-[96rem]">
        <Reveal>
          <SectionHeader
            eyebrow="01 — Projects"
            title="Featured Projects"
            description="Things I've built end-to-end."
          />
        </Reveal>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {projects.map((project, i) => (
            <Reveal key={project.slug} delay={i * 80}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
