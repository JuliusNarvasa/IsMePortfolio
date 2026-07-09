'use client';
import { Reveal } from '../../shared/Reveal';

/**
 * Customer Screenshots — asymmetric bento gallery for Re-Fuel.
 *
 * Three shots from /images/personality/ arranged as 1-large + 2-small.
 * The asymmetric layout feels more "Apple product page" than a
 * uniform 3-up grid. On mobile, everything stacks 1-column.
 *
 *   Desktop / tablet:
 *     ┌──────────────┬──────────┐
 *     │              │   shot1  │
 *     │     shot2    ├──────────┤
 *     │              │   shot3  │
 *     └──────────────┴──────────┘
 */
const SHOTS = [
  {
    src: '/images/personality/refuel-2.jpg',
    alt: 'Re-Fuel in driving mode, automatically capturing a price board at a Phoenix station via the rear camera.',
    label: 'Capture',
  },
  {
    src: '/images/personality/refuel-1.jpg',
    alt: 'Re-Fuel app showing detected gas prices for a Phoenix Super LPG station: Premium 98, Premium 95, Super Regular, and Biodiesel.',
    label: 'Detect',
  },
  {
    src: '/images/personality/refuel-3.jpg',
    alt: 'A Re-Fuel scan result with detection failed on both stations — honest documentation of the OCR on a bad day.',
    label: 'Honest about bad days',
  },
];

export function Screenshots() {
  return (
    <section
      id="screenshots"
      className="py-section px-6"
      aria-labelledby="section-screenshots-title"
    >
      <div className="mx-auto max-w-content">
        <Reveal>
          <div className="mb-10 max-w-prose">
            <p className="text-h5 uppercase tracking-widest text-accent mb-3">
              Screenshots
            </p>
            <h2
              id="section-screenshots-title"
              className="text-h2 text-text mb-3"
            >
              What it actually looks like.
            </h2>
            <p className="text-body-lg text-text-muted">
              The app in the wild &mdash; driving, parked, and the days the
              OCR just doesn&rsquo;t get it.
            </p>
          </div>
        </Reveal>

        {/* Bento grid. Mobile stacks; tablet+ uses the asymmetric layout. */}
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3 md:grid-rows-2 md:gap-4">
          {/* Large — top-left, spans 2 rows on tablet+ */}
          <Reveal
            delay={80}
            className="group relative overflow-hidden rounded-xl border border-border bg-bg-elevated shadow-subtle transition-all duration-slow ease-out-snappy hover:-translate-y-1 hover:border-accent-border hover:shadow-accent-glow md:col-span-2 md:row-span-2"
            as="div"
          >
            <div
              className="relative h-full w-full"
              style={{ aspectRatio: '16 / 9' }}
            >
              <img
                src={SHOTS[0].src}
                alt={SHOTS[0].alt}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-slower ease-out-smooth group-hover:scale-[1.03]"
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent p-4 opacity-90">
                <p className="font-mono-sm uppercase tracking-widest text-text">
                  {SHOTS[0].label}
                </p>
              </div>
            </div>
          </Reveal>

          {/* Top-right */}
          <Reveal
            delay={160}
            className="group relative overflow-hidden rounded-xl border border-border bg-bg-elevated shadow-subtle transition-all duration-slow ease-out-snappy hover:-translate-y-1 hover:border-accent-border hover:shadow-accent-glow"
            as="div"
          >
            <div
              className="relative h-full w-full"
              style={{ aspectRatio: '4 / 3' }}
            >
              <img
                src={SHOTS[1].src}
                alt={SHOTS[1].alt}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-slower ease-out-smooth group-hover:scale-[1.03]"
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent p-3 opacity-90">
                <p className="font-mono-sm uppercase tracking-widest text-text">
                  {SHOTS[1].label}
                </p>
              </div>
            </div>
          </Reveal>

          {/* Bottom-right */}
          <Reveal
            delay={240}
            className="group relative overflow-hidden rounded-xl border border-border bg-bg-elevated shadow-subtle transition-all duration-slow ease-out-snappy hover:-translate-y-1 hover:border-accent-border hover:shadow-accent-glow"
            as="div"
          >
            <div
              className="relative h-full w-full"
              style={{ aspectRatio: '4 / 3' }}
            >
              <img
                src={SHOTS[2].src}
                alt={SHOTS[2].alt}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-slower ease-out-smooth group-hover:scale-[1.03]"
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent p-3 opacity-90">
                <p className="font-mono-sm uppercase tracking-widest text-text">
                  {SHOTS[2].label}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}