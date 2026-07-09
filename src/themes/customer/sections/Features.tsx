'use client';
import { Reveal } from '../../shared/Reveal';

/**
 * Customer Features — 4 concrete Re-Fuel feature highlights.
 *
 * Each feature = 1-line user-facing title + 1–2 line description +
 * small inline SVG icon. Layout: 1 column mobile, 2 columns tablet+.
 * 2 columns (not 4) so each card has breathing room and the icons
 * read at a glance — the same proportions Apple uses for product
 * feature blocks.
 */

interface Feature {
  title: string;
  description: string;
  icon: () => JSX.Element;
}

const FEATURES: readonly Feature[] = [
  {
    title: 'Auto-captures your fill-up with GPS.',
    description:
      'Pull into a station, the app logs the price and the litres. No forms to fill out at the pump.',
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
        <path d="M12 21s-7-6.5-7-12a7 7 0 1 1 14 0c0 5.5-7 12-7 12Z" />
        <circle cx="12" cy="9" r="2.5" />
      </svg>
    ),
  },
  {
    title: 'Reads the price board with the camera.',
    description:
      'YOLOv8 + on-device OCR. Point your camera at the sign, the prices are filled in. No manual typing.',
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
        <path d="M3 7 H15 A2 2 0 0 1 17 9 V18 H5 A2 2 0 0 1 3 16 Z" />
        <path d="M17 11 H20 A1 1 0 0 1 21 12 V16 A1 1 0 0 1 20 17 H17" />
        <circle cx="9" cy="13" r="2.5" />
      </svg>
    ),
  },
  {
    title: 'Shows you which station was cheapest last week.',
    description:
      'Sort by recent price, see your weekly trend, and stop getting played at the pump by surprise hikes.',
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
        <path d="M4 19 V5" />
        <path d="M4 19 H20" />
        <path d="M8 15 L11 11 L14 13 L19 7" />
        <path d="M16 7 H19 V10" />
      </svg>
    ),
  },
  {
    title: 'Offline-first. Works in the parking lot, no signal.',
    description:
      'Everything stays on your phone. IndexedDB cache, sync when you get back online. Your data never leaves the device.',
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
        <path d="M5 12 A7 7 0 0 1 19 12" />
        <path d="M8 12 A4 4 0 0 1 16 12" />
        <path d="M11 12 A1 1 0 0 1 13 12" />
        <circle cx="12" cy="19" r="1" fill="currentColor" />
      </svg>
    ),
  },
];

export function Features() {
  return (
    <section
      id="features"
      className="py-section px-6"
      aria-labelledby="section-features-title"
    >
      <div className="mx-auto max-w-content">
        <Reveal>
          <div className="mb-12 max-w-prose">
            <p className="text-h5 uppercase tracking-widest text-accent mb-3">
              What it does
            </p>
            <h2
              id="section-features-title"
              className="text-h2 text-text mb-3"
            >
              The parts you&rsquo;ll actually use.
            </h2>
            <p className="text-body-lg text-text-muted">
              No checklists, no feature walls. Just the four things the app
              does, in plain language.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
          {FEATURES.map((feature, i) => (
            <Reveal
              key={feature.title}
              delay={i * 80}
              className="group rounded-lg border border-border bg-bg-elevated p-6 shadow-subtle transition-all duration-slow ease-out-snappy hover:-translate-y-1 hover:border-accent-border hover:shadow-accent-glow"
            >
              <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-md border border-accent-border bg-accent-muted text-accent transition-all duration-base group-hover:scale-105">
                <span className="block h-6 w-6">
                  <feature.icon />
                </span>
              </div>
              <h3 className="text-h4 text-text mb-2 leading-snug">
                {feature.title}
              </h3>
              <p className="text-body-sm text-text-muted leading-relaxed">
                {feature.description}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}