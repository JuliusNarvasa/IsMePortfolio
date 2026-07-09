'use client';
import { Reveal } from '../../shared/Reveal';

/**
 * Business "Tech Stack" — what I ship on, grouped by capability.
 *
 * Not a "look how many things I know" list. Framed as the platform I
 * deliver on. 5 categories, each rendered as a small-caps label + chips.
 */

interface Category {
  label: string;
  items: readonly string[];
}

const CATEGORIES: readonly Category[] = [
  {
    label: 'Languages',
    items: ['TypeScript', 'Python', 'C#', 'SQL', 'Bash'],
  },
  {
    label: 'Infrastructure',
    items: ['Docker', 'Proxmox', 'Nginx', 'Linux', 'WireGuard', 'Tailscale'],
  },
  {
    label: 'Datastores',
    items: ['PostgreSQL', 'Redis', 'SQLite', 'IndexedDB'],
  },
  {
    label: 'AI / ML',
    items: ['llama.cpp', 'PyTorch', 'ONNX Runtime', 'YOLOv8', 'ComfyUI'],
  },
  {
    label: 'Frameworks & Tooling',
    items: ['FastAPI', '.NET 8', 'Astro', 'React', 'Vite', 'Tailwind CSS'],
  },
];

export function TechStack() {
  return (
    <section
      id="tech-stack"
      className="py-section px-6"
      aria-labelledby="section-techstack-title"
    >
      <div className="mx-auto max-w-content">
        <Reveal>
          <div className="mb-12 max-w-prose">
            <p className="text-h5 uppercase tracking-widest text-accent mb-3">
              Tech stack
            </p>
            <h2
              id="section-techstack-title"
              className="text-h2 text-text mb-3"
            >
              What I ship on.
            </h2>
            <p className="text-body-lg text-text-muted">
              The platforms and runtimes I reach for by default. Boring
              choices, predictable outcomes.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-2 xl:grid-cols-1">
          {CATEGORIES.map((category, i) => (
            <Reveal
              key={category.label}
              delay={i * 80}
              className="bg-bg-elevated px-6 py-5 transition-colors duration-base hover:bg-bg-overlay"
              as="div"
            >
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-6">
                <p className="font-mono-sm uppercase tracking-widest text-text-dim md:w-44 md:flex-shrink-0">
                  {category.label}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {category.items.map((item) => (
                    <span
                      key={item}
                      className="inline-flex items-center rounded-sm border border-border bg-bg-glass px-2.5 py-1 font-mono-sm text-text-muted transition-colors duration-base hover:border-border-strong hover:text-text"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}