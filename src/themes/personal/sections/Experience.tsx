import { experience } from '../../../data/experience';
import { SectionHeader } from '../../shared/ui/SectionHeader';
import { Reveal } from '../../shared/Reveal';

export function Experience() {
  return (
    <section
      id="experience"
      className="py-section px-6"
      aria-labelledby="section-experience-title"
    >
      <div className="mx-auto max-w-content">
        <Reveal>
          <SectionHeader
            eyebrow="04 — Experience"
            title="Experience"
            description="Where I've been and what I've shipped."
          />
        </Reveal>

        <div className="relative">
          {/* Timeline rail */}
          <div className="absolute left-[140px] top-0 bottom-0 hidden w-px bg-border lg:block"></div>

          <div className="space-y-8">
            {experience.map((entry, i) => (
              <Reveal
                key={entry.year + entry.role}
                delay={i * 80}
                as="div"
                className="relative flex flex-col gap-2 lg:flex-row lg:items-start lg:gap-8"
              >
                {/* Year */}
                <div className="w-full flex-shrink-0 lg:w-[110px] lg:pr-2 lg:text-right">
                  <span className="font-mono-lg text-text-muted">
                    {entry.year}
                  </span>
                </div>

                {/* Dot on rail (desktop only) */}
                <div className="absolute left-[140px] top-2 hidden -translate-x-1/2 lg:block">
                  <div className="h-2.5 w-2.5 rounded-full border border-border-strong bg-bg-elevated transition-all duration-fast hover:scale-110 hover:border-accent"></div>
                </div>

                {/* Content */}
                <div className="flex-1 pl-0 lg:pl-10">
                  <h3 className="text-h3 text-text mb-1">{entry.role}</h3>
                  <p className="text-body-sm text-text-muted mb-2">
                    {entry.description}
                  </p>
                  {entry.achievements.length > 0 && (
                    <ul className="space-y-1">
                      {entry.achievements.map((a) => (
                        <li
                          key={a}
                          className="text-body text-text-muted flex items-start gap-2 leading-relaxed"
                        >
                          <span className="text-accent mt-0.5">›</span>
                          {a}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
