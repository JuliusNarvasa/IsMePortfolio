'use client';
import { Reveal } from '../../shared/Reveal';

/**
 * Customer Downloads — primary CTA for Re-Fuel.
 *
 * Honest about what platforms are available: Re-Fuel is a web app
 * today, so we don't fake App Store / Play Store badges. The platform
 * row says "Web" plainly. The "Free. No ads. No accounts. No tracking."
 * line is small but prominent — same as the Hero trust strip.
 *
 * Full-width gradient card with floating accent blobs.
 */
export function Downloads() {
  return (
    <section
      id="downloads"
      className="px-6 py-section"
      aria-labelledby="section-downloads-title"
    >
      <div className="relative mx-auto max-w-content overflow-hidden rounded-xl border border-accent-border bg-bg-elevated px-6 py-14 shadow-accent-glow md:px-12 md:py-20">
        {/* Floating accent blobs */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-accent-glow opacity-40 blur-[600px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-32 right-0 h-[400px] w-[600px] rounded-full bg-accent-muted opacity-60 blur-[400px]"
        />

        <div className="relative z-10 mx-auto max-w-narrow text-center">
          <Reveal>
            <p className="text-h5 uppercase tracking-widest text-accent mb-4">
              Get the app
            </p>
          </Reveal>

          <Reveal delay={80}>
            <h2
              id="section-downloads-title"
              className="text-h1 text-text mb-5 md:text-display"
            >
              Try{' '}
              <span className="text-accent">Re-Fuel</span>.
            </h2>
          </Reveal>

          <Reveal delay={160}>
            <p className="text-body-lg text-text-muted mb-8">
              Open it in your browser. No install, no sign-up, nothing
              to lose.
            </p>
          </Reveal>

          <Reveal delay={240}>
            <a
              href="https://refuel.bambaw-tumba.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-accent px-8 py-4 font-mono text-on-accent shadow-subtle transition-all duration-base ease-out-snappy hover:bg-accent-hover hover:shadow-accent-glow active:scale-[0.97] sm:w-auto"
            >
              Try it
              <span aria-hidden="true">↗</span>
            </a>
          </Reveal>

          <Reveal delay={320}>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-bg-glass px-3 py-1.5 font-mono-sm uppercase tracking-widest text-text-muted">
                <PlatformIcon />
                Web
              </span>
              <span className="font-mono-sm text-text-dim">
                Native iOS / Android later
              </span>
            </div>
          </Reveal>

          <Reveal delay={400}>
            <p className="mt-8 font-mono-sm uppercase tracking-widest text-text-muted">
              Free{' '}
              <span className="mx-1.5 text-accent">·</span> No ads{' '}
              <span className="mx-1.5 text-accent">·</span> No accounts{' '}
              <span className="mx-1.5 text-accent">·</span> No tracking
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/** Tiny inline glyph per platform — keeps the row honest about availability. */
function PlatformIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="h-3.5 w-3.5"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12 H21" />
      <path d="M12 3 A13 13 0 0 1 12 21 A13 13 0 0 1 12 3" />
    </svg>
  );
}