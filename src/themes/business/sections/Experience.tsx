'use client';
import { experience } from '../../../data/experience';
import { Reveal } from '../../shared/Reveal';

/**
 * Business "Experience" — same timeline data as Personal, B2B-framed.
 *
 * Per-entry overrides are kept inline (rather than mutating the shared
 * data module) so Personal keeps its personal-sounding wording and
 * Business gets its business-flavored copy + achievements.
 */

interface EntryOverride {
  description: string;
  achievements: readonly string[];
}

const ENTRY_OVERRIDES: Record<string, EntryOverride> = {
  '2019': {
    description:
      'Joined Netzon Tech as backend engineer. Built internal tooling that replaced ad-hoc scripts across the org.',
    achievements: [
      'Owned service reliability for the team\u2019s primary internal app',
      'Introduced logging + error tracking across legacy services',
    ],
  },
  '2020': {
    description:
      'Gonna \u2014 social media platform for businesses. Owned the public API and admin tooling through launch.',
    achievements: [
      'Shipped the v1 API and onboarding documentation',
      'Drove the move from monolith to a service boundary',
    ],
  },
  '2021': {
    description:
      'Angebot \u2014 drag-and-drop document builder for sharing and signing between businesses.',
    achievements: [
      'Owned the document service: templating, signing, storage, audit trail',
      'Cut average doc turnaround from days to minutes',
    ],
  },
  '2022': {
    description:
      'ChargeHeroes \u2014 marketplace for vacant EV chargers. Acquired 2023.',
    achievements: [
      'Led backend + integrations through the launch and growth phases',
      'Owned the payment + settlement flows that closed the acquisition',
    ],
  },
  '2023': {
    description:
      'Ment v2 \u2014 care coordination platform for parents of children with ADHD and mental disabilities.',
    achievements: [
      'Full-stack ownership across web, mobile, and infra for the v2 rebuild',
      'Cut p95 API latency by 60% during the re-architecture',
    ],
  },
  '2024': {
    description:
      'Freelance API development for an Australian client. Platform-based project delivered to scope.',
    achievements: [
      'Scoped, built, and shipped the engagement on the agreed timeline',
      'Platform remains in production with the client',
    ],
  },
  '2025': {
    description:
      'Local AI infrastructure \u2014 self-hosted inference and image generation on consumer hardware.',
    achievements: [
      'llama.cpp + ROCm running on RX 7800 XT',
      'ComfyUI for image generation, custom node wiring',
    ],
  },
  '2026': {
    description:
      'AI & computer vision \u2014 production computer vision work began with Re-Fuel\u2019s price-board detection.',
    achievements: [
      'YOLOv8 on-device via ONNX runtime',
      'OCR preprocessing pipelines for Philippine fuel price boards',
    ],
  },
};

export function Experience() {
  return (
    <section
      id="experience"
      className="py-section px-6"
      aria-labelledby="section-experience-title"
    >
      <div className="mx-auto max-w-content">
        <Reveal>
          <div className="mb-12 max-w-prose">
            <p className="text-h5 uppercase tracking-widest text-accent mb-3">
              Experience
            </p>
            <h2
              id="section-experience-title"
              className="text-h2 text-text mb-3"
            >
              Where I&rsquo;ve been.
            </h2>
            <p className="text-body-lg text-text-muted">
              Eight years across startups, freelance, and internal R&amp;D.
            </p>
          </div>
        </Reveal>

        <div className="relative">
          {/* Timeline rail — desktop only */}
          <div
            aria-hidden="true"
            className="absolute left-[140px] top-0 bottom-0 hidden w-px bg-border lg:block"
          />

          <div className="space-y-8">
            {experience.map((entry, i) => {
              const override = ENTRY_OVERRIDES[entry.year];
              const description = override?.description ?? entry.description;
              const achievements =
                override?.achievements ?? entry.achievements;

              return (
                <Reveal
                  key={entry.year + entry.role}
                  delay={i * 80}
                  className="relative flex flex-col gap-2 lg:flex-row lg:items-start lg:gap-8"
                >
                  {/* Year */}
                  <div className="w-full flex-shrink-0 lg:w-[110px] lg:pr-2 lg:text-right">
                    <span className="font-mono-lg text-text-muted">
                      {entry.year}
                    </span>
                  </div>

                  {/* Dot on rail */}
                  <div
                    aria-hidden="true"
                    className="absolute left-[140px] top-2 hidden -translate-x-1/2 lg:block"
                  >
                    <div className="h-2.5 w-2.5 rounded-full border border-border-strong bg-bg-elevated transition-all duration-fast hover:scale-110 hover:border-accent" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 pl-0 lg:pl-10">
                    <h3 className="text-h3 text-text mb-1">{entry.role}</h3>
                    <p className="text-body-sm text-text-muted mb-2">
                      {description}
                    </p>
                    {achievements.length > 0 && (
                      <ul className="space-y-1">
                        {achievements.map((a) => (
                          <li
                            key={a}
                            className="text-body text-text-muted flex items-start gap-2 leading-relaxed"
                          >
                            <span className="text-accent mt-0.5 font-mono">
                              ›
                            </span>
                            {a}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}