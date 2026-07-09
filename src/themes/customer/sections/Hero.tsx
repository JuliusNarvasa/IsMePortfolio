'use client';
import { motion, useReducedMotion } from 'motion/react';
import { Reveal } from '../../shared/Reveal';

/**
 * Customer Hero — flagship Re-Fuel showcase.
 *
 * The most "Apple-ish" section of the theme. Big confident type, soft
 * accent gradient washes, a product screenshot on the right that floats
 * gently while idle. The headline pulls the app name forward so the
 * value-prop reads as an outcome, not a feature.
 *
 * Layout:
 *   Mobile:  text-only stack, screenshot sits below the CTAs.
 *   Tablet:  text-left, smaller product mockup on the right.
 *   Desktop: text-left + large product mockup with floating animation.
 */
export function Hero() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <header
      id="hero"
      className="relative flex min-h-screen items-center overflow-hidden px-6 pt-20 pb-16 lg:px-24 lg:pt-0 lg:pb-0"
    >
      {/* Ambient accent wash — large, soft, in the upper-right corner */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-40 h-[900px] w-[900px] rounded-full bg-accent-glow opacity-20 blur-[900px]"
      />
      {/* Second wash — counterweight on the lower-left for balance */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -left-40 h-[700px] w-[700px] rounded-full bg-accent-muted opacity-40 blur-[700px]"
      />

      <div className="relative z-10 mx-auto grid w-full max-w-wide grid-cols-1 items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        {/* Text column */}
        <div className="flex flex-col">
          {/* Eyebrow — accent mono with the platform marker */}
          <Reveal delay={0}>
            <div className="mb-5 flex items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-accent-border bg-accent-muted px-3 py-1 font-mono-sm uppercase tracking-widest text-accent">
                <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse-dot" />
                Featured app
              </span>
            </div>
          </Reveal>

          {/* Headline — app name + outcome */}
          <Reveal delay={80}>
            <h1 className="text-h1 font-semibold text-text mb-3 md:text-display">
              Re-Fuel.{' '}
              <span className="text-accent">Stop guessing at the pump.</span>
            </h1>
          </Reveal>

          {/* Subhead — concrete value, two short lines */}
          <Reveal delay={160}>
            <p className="text-h4 text-text-muted mb-3 max-w-prose font-medium leading-snug">
              Track every fill-up with GPS. Read the price board with your camera.
            </p>
          </Reveal>

          <Reveal delay={240}>
            <p className="text-body-lg text-text-muted mb-8 max-w-prose">
              Re-Fuel logs your gas automatically, knows which station was
              cheapest last week, and works in the parking lot when you
              don&rsquo;t have signal.
            </p>
          </Reveal>

          {/* CTAs */}
          <Reveal delay={320}>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href="https://refuel.bambaw-tumba.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-accent px-6 py-3 font-mono text-on-accent shadow-subtle transition-all duration-base ease-out-snappy hover:bg-accent-hover hover:shadow-accent-glow active:scale-[0.97]"
              >
                Try it
                <span aria-hidden="true">↗</span>
              </a>
              <a
                href="#screenshots"
                className="inline-flex items-center justify-center gap-2 rounded-md border border-border bg-bg-glass px-6 py-3 font-mono text-text backdrop-blur-glass transition-all duration-base ease-out-snappy hover:border-border-strong hover:shadow-glass active:scale-[0.97]"
              >
                See screenshots
                <span aria-hidden="true">↓</span>
              </a>
            </div>
          </Reveal>

          {/* Trust strip — small mono line below the CTAs */}
          <Reveal delay={400}>
            <p className="mt-6 font-mono-sm uppercase tracking-widest text-text-dim">
              Free <span className="mx-1.5 text-accent">·</span>
              No ads <span className="mx-1.5 text-accent">·</span>
              No accounts <span className="mx-1.5 text-accent">·</span>
              No tracking
            </p>
          </Reveal>
        </div>

        {/* Product mockup — device-framed screenshot with subtle float */}
        <Reveal delay={200} className="relative w-full" as="div">
          <motion.div
            // Continuous floating animation. Disabled under reduced motion.
            animate={shouldReduceMotion ? {} : { y: [0, -10, 0] }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="relative mx-auto w-full max-w-[440px] lg:max-w-none"
          >
            {/* Glow halo behind the mockup */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 -m-6 rounded-[2rem] bg-accent-glow opacity-40 blur-[80px]"
            />

            {/* Device frame — phone aspect with rounded corners + glass surface */}
            <div className="relative overflow-hidden rounded-[2rem] border border-border-strong bg-bg-elevated p-3 shadow-elevated">
              <div className="overflow-hidden rounded-[1.5rem] border border-border bg-bg">
                <img
                  src="/images/projects/refuel-home.png"
                  alt="Re-Fuel mobile app home screen showing the gas station price tracker with detected fuel prices"
                  loading="eager"
                  className="block h-auto w-full"
                />
              </div>
            </div>

            {/* Floating "captured" chip — decorative */}
            <motion.div
              aria-hidden="true"
              animate={shouldReduceMotion ? {} : { y: [0, -6, 0] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 0.5,
              }}
              className="absolute -left-4 top-10 hidden rounded-lg border border-border bg-bg-glass-strong px-3 py-2 shadow-glass backdrop-blur-glass sm:flex sm:items-center sm:gap-2"
            >
              <span className="h-2 w-2 rounded-full bg-success animate-pulse-dot" />
              <span className="font-mono-sm text-text">Fill-up captured</span>
            </motion.div>

            {/* Floating "saved" chip — decorative */}
            <motion.div
              aria-hidden="true"
              animate={shouldReduceMotion ? {} : { y: [0, 8, 0] }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 1,
              }}
              className="absolute -right-2 bottom-12 hidden rounded-lg border border-accent-border bg-bg-glass-strong px-3 py-2 shadow-accent-glow backdrop-blur-glass sm:flex sm:items-center sm:gap-2"
            >
              <span className="font-mono-sm text-accent">₱ 4.20/L cheaper</span>
            </motion.div>
          </motion.div>
        </Reveal>
      </div>
    </header>
  );
}