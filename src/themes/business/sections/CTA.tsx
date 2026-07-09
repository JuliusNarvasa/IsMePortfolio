'use client';
import { profile } from '../../../data/profile';
import { Reveal } from '../../shared/Reveal';

/**
 * Business "CTA" — lead-generation close.
 *
 * Full-width section, subtle accent gradient wash. Premium feel without
 * being loud. Two CTAs: primary "Email me" + secondary "See my GitHub".
 */

export function CTA() {
  return (
    <section
      id="cta"
      className="px-6 py-section"
      aria-labelledby="section-cta-title"
    >
      <div className="relative mx-auto max-w-content overflow-hidden rounded-xl border border-border bg-bg-elevated px-6 py-14 shadow-glass md:px-12 md:py-20">
        {/* Accent wash */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-accent-glow opacity-30 blur-[600px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-32 right-0 h-[400px] w-[600px] rounded-full bg-accent-muted opacity-50 blur-[400px]"
        />

        <div className="relative z-10 mx-auto max-w-narrow text-center">
          <Reveal>
            <p className="text-h5 uppercase tracking-widest text-accent mb-4">
              Let&rsquo;s talk
            </p>
          </Reveal>

          <Reveal delay={80}>
            <h2
              id="section-cta-title"
              className="text-h1 text-text mb-5 md:text-display"
            >
              Need someone who ships and stays?
            </h2>
          </Reveal>

          <Reveal delay={160}>
            <p className="text-body-lg text-text-muted mb-3">
              Most projects I&rsquo;ve taken from prototype to production in
              6&ndash;12 months.
            </p>
          </Reveal>

          <Reveal delay={240}>
            <p className="text-body text-text-muted mb-10">
              Async-first, written-first, no surprise meetings. Bring a spec
              &mdash; or a problem statement and we&rsquo;ll write the spec
              together.
            </p>
          </Reveal>

          <Reveal delay={320}>
            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex w-full items-center justify-center rounded-md bg-accent px-6 py-3 font-mono text-on-accent shadow-subtle transition-all duration-base ease-out-snappy hover:bg-accent-hover hover:shadow-accent-glow active:scale-[0.98] sm:w-auto"
              >
                Schedule a 30-min call →
              </a>
              <a
                href={profile.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center rounded-md border border-border bg-bg-glass px-6 py-3 font-mono text-text backdrop-blur-glass transition-all duration-base ease-out-snappy hover:border-border-strong hover:shadow-glass active:scale-[0.98] sm:w-auto"
              >
                See my GitHub ↗
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}