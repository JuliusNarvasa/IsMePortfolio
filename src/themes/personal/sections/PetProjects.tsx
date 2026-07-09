'use client';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { petProjects } from '../../../data/petProjects';
import { Reveal } from '../../shared/Reveal';

const INTERVAL_MS = 5000;

export function PetProjects() {
  const [activeProject, setActiveProject] = useState(0);
  const [activeImage, setActiveImage] = useState(0);
  const itemRefs = useRef<Array<HTMLButtonElement | null>>([]);

  // Auto-cycle: advance through the active project's images; on rollover,
  // advance to the next project (reset image to 0) and toggle aria-current.
  useEffect(() => {
    const id = window.setInterval(() => {
      const current = petProjects[activeProject];
      if (activeImage < current.images.length - 1) {
        setActiveImage((ai) => ai + 1);
      } else {
        setActiveImage(0);
        setActiveProject((p) => (p + 1) % petProjects.length);
      }
    }, INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [activeProject, activeImage]);

  // Measure each tile's natural content height so the CSS-driven accordion
  // expands exactly to the content size (no fr-unit snap).
  useLayoutEffect(() => {
    const measureAll = () => {
      itemRefs.current.forEach((btn) => {
        if (!btn) return;
        const details = btn.querySelector(
          '[data-pet-details]',
        ) as HTMLElement | null;
        if (!details) return;
        const prevMax = details.style.maxHeight;
        const prevMargin = details.style.marginTop;
        details.style.maxHeight = 'none';
        details.style.marginTop = '0.75rem';
        const naturalHeight = details.offsetHeight;
        details.style.maxHeight = prevMax;
        details.style.marginTop = prevMargin;
        details.style.setProperty(
          '--pet-details-height',
          `${naturalHeight}px`,
        );
      });
    };
    measureAll();
    if (typeof document !== 'undefined' && document.fonts?.ready) {
      document.fonts.ready.then(measureAll);
    }
    let resizeTimer: ReturnType<typeof setTimeout> | undefined;
    const onResize = () => {
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(measureAll, 200);
    };
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
      if (resizeTimer) clearTimeout(resizeTimer);
    };
  }, []);

  const switchProject = (i: number) => {
    if (i === activeProject) {
      // Restart the 5s timer on the same project (mirror the click → reset behavior).
      setActiveImage(0);
      return;
    }
    setActiveProject(i);
    setActiveImage(0);
  };

  return (
    <section
      id="pet-projects"
      className="min-h-screen flex flex-col justify-center py-section px-6"
      aria-labelledby="section-pet-projects-title"
    >
      <div className="mx-auto w-full max-w-[80vw]">
        <Reveal className="mb-10">
          <p className="font-mono-sm text-accent mb-2">
            // pet_projects.built_from_frustration
          </p>
          <h3
            id="section-pet-projects-title"
            className="text-h3 text-text mb-2"
          >
            Built Because It Annoyed Me
          </h3>
          <p className="text-body text-text-muted max-w-prose">
            Side projects born from small daily annoyances. Pick one — the
            right side cycles on its own.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[2fr_3fr] lg:gap-8">
          {/* Left: selectable list of projects */}
          <Reveal delay={80} as="div">
            <div
              role="tablist"
              aria-label="Pet projects"
              className="flex flex-col gap-3"
            >
              {petProjects.map((project, i) => (
                <button
                  key={project.title}
                  ref={(el) => {
                    itemRefs.current[i] = el;
                  }}
                  type="button"
                  className="w-full text-left rounded-lg border border-border bg-bg-glass p-4 backdrop-blur-glass transition-all duration-base ease-out-snappy hover:-translate-y-0.5 hover:border-border-strong focus:outline-none"
                  data-pet-list-item
                  data-pet-project-index={i}
                  aria-current={i === activeProject ? 'true' : 'false'}
                  onClick={(e) => {
                    // If the click landed on the CTA link inside the button,
                    // let the browser handle the navigation.
                    if (
                      e.target &&
                      (e.target as HTMLElement).closest &&
                      (e.target as HTMLElement).closest('a')
                    ) {
                      return;
                    }
                    switchProject(i);
                  }}
                >
                  <span data-pet-index className="font-mono-sm mb-2 block">
                    {`0${i + 1}`}
                  </span>
                  <h4 data-pet-title className="text-h4 text-text">
                    {project.title}
                  </h4>
                  <div data-pet-details>
                    <div className="pet-details-inner">
                      <p className="text-body-sm text-text-muted mb-2 leading-relaxed">
                        <span className="font-mono-sm text-accent mr-1.5">
                          // problem:
                        </span>
                        {project.problem}
                      </p>
                      <p className="text-body-sm text-text leading-relaxed">
                        <span className="font-mono-sm text-accent mr-1.5">
                          → fix:
                        </span>
                        {project.solution}
                      </p>
                      {project.href && (
                        <div className="mt-3">
                          <a
                            href={project.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-mono-sm text-accent inline-flex items-center gap-1 transition-colors duration-fast hover:text-accent-hover"
                          >
                            view project ↗
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </Reveal>

          {/* Right: auto-cycling slideshow for the active project */}
          <Reveal delay={160} as="div" className="h-full">
            <div
              data-pet-slideshow
              aria-live="polite"
              aria-atomic="false"
              className="relative h-full overflow-hidden rounded-lg border border-border bg-bg-elevated min-h-[280px] lg:min-h-0"
            >
              {petProjects.map((project, pi) => (
                <div key={project.title} data-pet-project-index={pi}>
                  {project.images.map((img, ii) => (
                    <img
                      key={img.src}
                      className={`pet-slide absolute inset-0 h-full w-full object-contain${pi === activeProject && ii === activeImage ? ' is-active' : ''}`}
                      src={img.src}
                      alt={img.alt}
                      loading="lazy"
                      data-pet-image-index={ii}
                    />
                  ))}
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
