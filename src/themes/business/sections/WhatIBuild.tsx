'use client';
import { Reveal } from '../../shared/Reveal';

/**
 * Business "What I Build" — 6 value pillars.
 *
 * Outcomes, not tech lists. Each pillar = 1-line outcome + 1-line example.
 * Layout: 1 col mobile, 2 col md, 3 col lg.
 */

interface Pillar {
  title: string;
  description: string;
  // A simple inline SVG, drawn at 24x24.
  icon: () => JSX.Element;
}

const PILLARS: readonly Pillar[] = [
  {
    title: 'Backend systems that don\u2019t page you at 3am.',
    description:
      'Observability, graceful failure, and sane defaults. Not heroics.',
    icon: () => (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M12 2 L4 6 V12 C4 17 7 21 12 22 C17 21 20 17 20 12 V6 Z" />
        <path d="M9 12 L11 14 L15 10" />
      </svg>
    ),
  },
  {
    title: 'Production-ready infrastructure, not weekend prototypes.',
    description:
      'Deploy, monitor, and own it. No throw-it-over-the-wall handoffs.',
    icon: () => (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect x="3" y="4" width="18" height="6" rx="1.5" />
        <rect x="3" y="14" width="18" height="6" rx="1.5" />
        <circle cx="7" cy="7" r="0.6" fill="currentColor" />
        <circle cx="7" cy="17" r="0.6" fill="currentColor" />
        <path d="M11 7 H17" />
        <path d="M11 17 H17" />
      </svg>
    ),
  },
  {
    title: 'Self-hosted AI that ships in your environment.',
    description:
      'Local inference, OCR, CV pipelines \u2014 on your hardware, your data.',
    icon: () => (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect x="4" y="6" width="16" height="12" rx="2" />
        <path d="M9 10 V14" />
        <path d="M15 10 V14" />
        <path d="M12 8 V16" />
        <path d="M8 6 V4 H16 V6" />
      </svg>
    ),
  },
  {
    title: 'Tools your team will keep using after I\u2019m gone.',
    description:
      'Documentation, tests, runbooks. Not just code that works today.',
    icon: () => (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M5 4 H17 A2 2 0 0 1 19 6 V20 L12 17 L5 20 Z" />
        <path d="M9 9 H15" />
        <path d="M9 12 H13" />
      </svg>
    ),
  },
  {
    title: 'Async, written-first collaboration.',
    description:
      'Clear specs, weekly demos, no surprise meetings.',
    icon: () => (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M3 6 H21 V16 H8 L4 20 V16 H3 Z" />
        <path d="M7 10 H17" />
        <path d="M7 12.5 H14" />
      </svg>
    ),
  },
  {
    title: 'From prototype to production in weeks, not quarters.',
    description:
      'Reasonable scope, hard deadlines, real shipping. Iteration over ceremony.',
    icon: () => (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M5 12 H19" />
        <path d="M13 6 L19 12 L13 18" />
      </svg>
    ),
  },
];

export function WhatIBuild() {
  return (
    <section
      id="what-i-build"
      className="py-section px-6"
      aria-labelledby="section-whatibuild-title"
    >
      <div className="mx-auto max-w-content">
        <Reveal>
          <div className="mb-12 max-w-prose">
            <p className="text-h5 uppercase tracking-widest text-accent mb-3">
              What I build
            </p>
            <h2
              id="section-whatibuild-title"
              className="text-h2 text-text mb-3"
            >
              Outcomes, not tech lists.
            </h2>
            <p className="text-body-lg text-text-muted">
              What you actually get when I land on a project. No fluff.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-3">
          {PILLARS.map((pillar, i) => (
            <Reveal
              key={pillar.title}
              delay={i * 80}
              className="group rounded-lg border border-border bg-bg-elevated p-6 shadow-subtle transition-all duration-slow ease-out-snappy hover:-translate-y-1 hover:border-accent-border hover:shadow-accent-glow"
            >
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-md border border-border bg-bg-glass text-accent transition-colors duration-base group-hover:border-accent-border">
                <span className="block h-6 w-6">
                  <pillar.icon />
                </span>
              </div>
              <h3 className="text-h4 text-text mb-2 leading-snug">
                {pillar.title}
              </h3>
              <p className="text-body-sm text-text-muted leading-relaxed">
                {pillar.description}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}