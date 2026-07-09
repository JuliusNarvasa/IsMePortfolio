import type { Project } from '../../../data/projects';

interface Props {
  project: Project;
}

export function ProjectCard({ project }: Props) {
  const { title, category, problem, challenges, tech, links, screenshot } = project;
  return (
    <article className="group rounded-lg border border-border bg-bg-elevated shadow-subtle transition-all duration-slow ease-out-snappy hover:-translate-y-1 hover:border-accent hover:shadow-accent-glow focus-within:border-accent focus-within:shadow-accent-glow">
      {/* Screenshot area */}
      <div
        className="relative overflow-hidden rounded-t-lg"
        style={{ aspectRatio: '16 / 9' }}
      >
        {screenshot.src ? (
          <img
            src={screenshot.src}
            alt={screenshot.alt}
            className="h-full w-full object-cover object-top transition-transform duration-slower ease-out-smooth group-hover:scale-[1.03]"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-bg">
            <span className="font-mono text-text-dim text-body-sm">{title}</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Title row */}
        <div className="mb-2 flex items-center gap-3">
          <h3 className="text-h3 text-text">{title}</h3>
          <span className="inline-flex items-center gap-1.5 rounded-sm border border-border bg-bg-glass px-2 py-0.5 font-mono-sm uppercase text-text-muted">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent"></span>
            {category}
          </span>
        </div>

        {/* Problem */}
        <p className="mb-4 text-body-sm text-text-muted">{problem}</p>

        {/* Challenges */}
        {challenges.length > 0 && (
          <div className="mb-4">
            <p className="font-mono-sm text-text-dim mb-1.5 uppercase">Challenges</p>
            <ul className="list-none space-y-1">
              {challenges.map((c) => (
                <li
                  key={c}
                  className="text-body-sm text-text-muted flex items-start gap-2"
                >
                  <span className="text-accent mt-0.5">›</span>
                  {c}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Tech tags */}
        <div className="mb-4 flex flex-wrap gap-1.5">
          {tech.map((t) => (
            <span
              key={t}
              className="inline-flex items-center rounded-sm border border-border bg-bg-glass px-2 py-0.5 font-mono-sm uppercase text-text-muted"
            >
              {t}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex items-center gap-4 pt-2">
          {links.github && (
            <a
              href={links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono-sm text-accent transition-colors duration-fast hover:text-accent-hover"
            >
              github ↗
            </a>
          )}
          {links.demo && (
            <a
              href={links.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono-sm text-accent transition-colors duration-fast hover:text-accent-hover"
            >
              {links.demoLabel ?? 'demo'} ↗
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
