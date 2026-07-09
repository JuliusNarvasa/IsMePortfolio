'use client';
import type { Project } from '../../../data/projects';
import { projects } from '../../../data/projects';
import { Reveal } from '../../shared/Reveal';

/**
 * Business "Case Studies" — the strongest 3 projects reframed as case studies.
 *
 * Skips the portfolio itself (meta). Same `Project` shape as the Personal
 * theme; the B2B framing here is the problem/challenge wording + the
 * "What I delivered" line.
 */

// Per-project B2B framing. Pulled out of the section body so the section
// reads cleanly. `problem` overrides the project.problem; `delivered`
// is the closing line; `achievements` replaces the project's challenges
// list with B2B-flavored outcomes.
interface CaseStudyOverlay {
  problem: string;
  delivered: string;
  achievements: readonly string[];
}

const CASE_STUDY_SLUGS = ['refuel', 'airesumebuilder', 'gpuvrammonitor'] as const;

const CASE_STUDY_OVERLAYS: Record<(typeof CASE_STUDY_SLUGS)[number], CaseStudyOverlay> = {
  refuel: {
    problem:
      'Gas-price intelligence for Philippine drivers \u2014 automated capture, real trends, no manual logging.',
    achievements: [
      'GPS-based auto-capture when within 150m of a station',
      'On-device YOLOv8 price-board detection via ONNX runtime',
      'Offline-first IndexedDB cache for low-connectivity areas',
    ],
    delivered:
      'Cross-platform mobile app with backend API, OCR pipeline, and ops dashboards.',
  },
  airesumebuilder: {
    problem:
      'Tailoring resumes per job posting is slow and error-prone \u2014 generic CVs get filtered out.',
    achievements: [
      'PDF + DOCX resume parsing with layout-aware extraction',
      'Playwright-based LinkedIn job scraping with anti-detection',
      'Structured LLM output for tailored CV + cover letter',
    ],
    delivered:
      'Production web app, FastAPI backend, and an evaluation harness for output quality.',
  },
  gpuvrammonitor: {
    problem:
      'No per-process VRAM visibility for AMD GPUs on Windows \u2014 only totals, no breakdowns.',
    achievements: [
      'Performance-counter instance parsing mapped to PIDs',
      'DWM excluded to surface real workload usage',
      'Real-time refresh with pause/resume and history capture',
    ],
    delivered:
      'Native Windows desktop tool, open-sourced, used by ML practitioners on AMD hardware.',
  },
};

interface CaseStudyCardProps {
  project: Project;
  overlay: CaseStudyOverlay;
}

function CaseStudyCard({ project, overlay }: CaseStudyCardProps) {
  const { title, category, tech, links, screenshot } = project;
  return (
    <article className="group flex h-full flex-col rounded-lg border border-border bg-bg-elevated shadow-subtle transition-all duration-slow ease-out-snappy hover:-translate-y-1 hover:border-accent-border hover:shadow-accent-glow focus-within:border-accent focus-within:shadow-accent-glow">
      {/* Visual — 16:9, prefers the project's screenshot but falls back to a
          tinted gradient tile for projects without a usable image. */}
      <div
        className="relative overflow-hidden rounded-t-lg"
        style={{ aspectRatio: '16 / 9' }}
      >
        {screenshot.src ? (
          <img
            src={screenshot.src}
            alt={screenshot.alt}
            loading="lazy"
            className="h-full w-full object-cover object-top transition-transform duration-slower ease-out-smooth group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-bg-elevated to-bg-overlay">
            <span className="font-mono text-text-dim text-body-sm">{title}</span>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-6">
        {/* Title row */}
        <div className="mb-3 flex items-center gap-2">
          <h3 className="text-h3 text-text">{title}</h3>
          <span className="font-mono-sm uppercase tracking-wider text-text-dim">
            · {category}
          </span>
        </div>

        {/* Problem (B2B-framed) */}
        <p className="mb-4 text-body text-text-muted leading-relaxed">
          {overlay.problem}
        </p>

        {/* Achievements */}
        <ul className="mb-5 space-y-1.5">
          {overlay.achievements.map((a) => (
            <li
              key={a}
              className="text-body-sm text-text-muted flex items-start gap-2 leading-relaxed"
            >
              <span className="text-accent mt-0.5 font-mono">›</span>
              {a}
            </li>
          ))}
        </ul>

        {/* What I delivered */}
        <p className="mb-4 border-t border-border pt-4 font-mono-sm text-text">
          <span className="text-text-dim uppercase tracking-widest">Delivered: </span>
          {overlay.delivered}
        </p>

        {/* Tech (de-emphasized) */}
        <div className="mb-5 flex flex-wrap gap-1.5">
          {tech.map((t) => (
            <span
              key={t}
              className="inline-flex items-center rounded-sm border border-border bg-bg-glass px-2 py-0.5 font-mono-sm uppercase tracking-wider text-text-dim"
            >
              {t}
            </span>
          ))}
        </div>

        {/* Links (pushed to bottom) */}
        <div className="mt-auto flex items-center gap-5 border-t border-border pt-4">
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
              {links.demoLabel ?? 'live'} ↗
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

export function CaseStudies() {
  // Filter to the curated B2B case studies, in the order specified.
  const selected: Project[] = CASE_STUDY_SLUGS.map((slug) => {
    const project = projects.find((p) => p.slug === slug);
    if (!project) {
      throw new Error(`CaseStudies: missing project "${slug}" in data/projects.ts`);
    }
    return project;
  });

  return (
    <section
      id="case-studies"
      className="py-section px-6"
      aria-labelledby="section-casestudies-title"
    >
      <div className="mx-auto max-w-content">
        <Reveal>
          <div className="mb-12 max-w-prose">
            <p className="text-h5 uppercase tracking-widest text-accent mb-3">
              Case studies
            </p>
            <h2
              id="section-casestudies-title"
              className="text-h2 text-text mb-3"
            >
              What I&rsquo;ve shipped, end-to-end.
            </h2>
            <p className="text-body-lg text-text-muted">
              Three projects across mobile, web, and desktop. Each one went
              from spec to production under my ownership.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {selected.map((project, i) => (
            <Reveal
              key={project.slug}
              delay={i * 80}
              className="h-full"
              as="div"
            >
              <CaseStudyCard
                project={project}
                overlay={CASE_STUDY_OVERLAYS[project.slug as (typeof CASE_STUDY_SLUGS)[number]]}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}