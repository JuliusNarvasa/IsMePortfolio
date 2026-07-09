'use client';
import { profile } from '../../../data/profile';
import { nowBuilding } from '../../../data/nowBuilding';
import { StatusDot } from '../../shared/ui/StatusDot';
import { Reveal } from '../../shared/Reveal';

/**
 * Business Hero — outcome-oriented value proposition.
 *
 * Desktop: text-left + status card-right.
 * Mobile:  text-only, status card stacks below as a compact strip.
 */
export function Hero() {
  // The "currently shipping" line in the status card takes the first item
  // from the shared `nowBuilding` data so the two themes stay in sync.
  const currentlyShipping = nowBuilding[0];

  return (
    <header
      id="hero"
      className="relative flex min-h-screen items-center overflow-hidden px-6 pt-20 lg:px-24 lg:pt-0"
    >
      {/* Ambient accent wash — large, very subtle */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-40 h-[800px] w-[800px] rounded-full bg-accent-glow opacity-[0.08] blur-[800px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -left-40 h-[600px] w-[600px] rounded-full bg-accent-muted opacity-30 blur-[600px]"
      />

      <div className="relative z-10 mx-auto grid w-full max-w-wide grid-cols-1 items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        {/* Text column */}
        <div className="flex flex-col">
          {/* Eyebrow */}
          <Reveal delay={0}>
            <p className="font-mono-sm uppercase tracking-widest text-accent mb-5">
              {profile.heroEyebrow.replace('developer', 'consulting')}
            </p>
          </Reveal>

          {/* Headline */}
          <Reveal delay={80}>
            <h1 className="text-h1 font-semibold text-text mb-5 md:text-display">
              I build backend systems that stay out of your way.
            </h1>
          </Reveal>

          {/* Subhead */}
          <Reveal delay={160}>
            <p className="text-h4 text-text-muted mb-6 max-w-prose font-medium">
              Production infrastructure, AI pipelines, and developer tools —
              shipped end-to-end.
            </p>
          </Reveal>

          <Reveal delay={240}>
            <p className="text-body-lg text-text-muted max-w-prose mb-8">
              Eight years of shipping product. From internal tooling to
              platforms serving real users. I take prototypes to production
              and stay for the on-call.
            </p>
          </Reveal>

          {/* CTAs */}
          <Reveal delay={320}>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href="#case-studies"
                className="inline-flex items-center justify-center rounded-md bg-accent px-5 py-2.5 font-mono text-on-accent shadow-subtle transition-all duration-base ease-out-snappy hover:bg-accent-hover hover:shadow-accent-glow active:scale-[0.98]"
              >
                See case studies →
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center rounded-md border border-border bg-bg-glass px-5 py-2.5 font-mono text-text backdrop-blur-glass transition-all duration-base ease-out-snappy hover:border-border-strong hover:shadow-glass active:scale-[0.98]"
              >
                Email me →
              </a>
            </div>
          </Reveal>
        </div>

        {/* Status card — desktop full, mobile compact strip */}
        <Reveal
          delay={200}
          className="relative w-full"
          as="div"
        >
          {/* Full glass card on desktop/tablet */}
          <div className="hidden rounded-xl border border-border bg-bg-glass-strong p-6 shadow-glass backdrop-blur-nav md:block">
            <div className="mb-4 flex items-center justify-between">
              <span className="font-mono-sm uppercase tracking-widest text-text-muted">
                Status
              </span>
              <span className="flex items-center gap-2 font-mono-sm text-success">
                <StatusDot status="online" pulse={true} size="sm" />
                available
              </span>
            </div>

            <dl className="space-y-3">
              <div>
                <dt className="font-mono-sm uppercase tracking-widest text-text-dim mb-1">
                  Currently shipping
                </dt>
                <dd className="text-body text-text">
                  {currentlyShipping.title}
                  <span className="text-text-muted">
                    {' — '}
                    {currentlyShipping.sub}
                  </span>
                </dd>
              </div>

              <div className="border-t border-border pt-3">
                <dt className="font-mono-sm uppercase tracking-widest text-text-dim mb-1">
                  Open to
                </dt>
                <dd className="text-body text-text">
                  consulting
                  <span className="mx-2 text-text-dim">·</span>
                  contract
                  <span className="mx-2 text-text-dim">·</span>
                  full-time (remote)
                </dd>
              </div>

              <div className="border-t border-border pt-3">
                <dt className="font-mono-sm uppercase tracking-widest text-text-dim mb-1">
                  Reply within
                </dt>
                <dd className="text-body text-text">
                  24h
                  <span className="text-text-muted"> on business days</span>
                </dd>
              </div>
            </dl>
          </div>

          {/* Mobile compact strip */}
          <div className="flex items-center justify-between gap-3 rounded-md border border-border bg-bg-glass px-4 py-3 md:hidden">
            <div className="flex items-center gap-2">
              <StatusDot status="online" pulse={true} size="sm" />
              <span className="font-mono-sm uppercase tracking-widest text-success">
                available
              </span>
            </div>
            <span className="font-mono-sm text-text-muted">
              {currentlyShipping.title}
            </span>
          </div>
        </Reveal>
      </div>
    </header>
  );
}