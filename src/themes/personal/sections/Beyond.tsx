import { interests } from '../../../data/interests';
import { InterestIconSvg } from '../ui/InterestIcon';
import { SectionHeader } from '../../shared/ui/SectionHeader';
import { Reveal } from '../../shared/Reveal';

const VIBE_BADGES = ['~/whoami', 'backend', 'tinkerer'] as const;

export function Beyond() {
  return (
    <section
      id="beyond-the-code"
      className="min-h-screen flex flex-col justify-center py-section px-6"
      aria-labelledby="section-personality-title"
    >
      <div className="mx-auto w-full max-w-content">
        {/* Two-column intro: narrative (left) + interests grid (right) */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-12">
          {/* Left column — narrative */}
          <div className="flex flex-col gap-5">
            <Reveal>
              <SectionHeader
                eyebrow="00 — Beyond the code"
                title="Beyond the Code"
                description="A peek at what I build and break when nobody's watching."
              />
            </Reveal>

            {/* Vibe badges */}
            <Reveal delay={80}>
              <div className="flex flex-wrap items-center gap-2">
                {VIBE_BADGES.map((badge) => (
                  <span
                    key={badge}
                    className="inline-flex items-center gap-1.5 rounded-sm border border-border bg-bg-glass px-2 py-1 font-mono-sm text-text-muted"
                  >
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent"></span>
                    {badge}
                  </span>
                ))}
              </div>
            </Reveal>

            {/* Paragraph 1 — slightly more prominent */}
            <Reveal delay={160}>
              <p className="text-body-lg text-text leading-relaxed">
                I'm a backend developer by trade, but most of what I build starts
                with me getting mildly annoyed at something. If a tool feels
                clunky, expensive, or doesn't exist at all, my instinct is to
                just build it.
              </p>
            </Reveal>

            {/* Paragraph 2 */}
            <Reveal delay={240}>
              <p className="text-body text-text-muted leading-relaxed">
                I like practical engineering. Systems that work quietly in the
                background. Code that solves a real problem without needing a
                slide deck to explain it.
              </p>
            </Reveal>

            {/* Paragraph 3 */}
            <Reveal delay={320}>
              <p className="text-body text-text-muted leading-relaxed">
                Outside of work, I play pickleball, push consumer hardware
                further than it probably wants to go, and rebuild my homelab
                more often than I should.
              </p>
            </Reveal>
          </div>

          {/* Right column — 2x3 interest grid */}
          <div className="grid grid-cols-2 gap-3 lg:self-center">
            {interests.map((interest, i) => (
              <Reveal
                key={interest.title}
                delay={i * 80}
                className="group rounded-lg border border-border bg-bg-glass p-4 backdrop-blur-glass transition-all duration-base ease-out-snappy hover:-translate-y-0.5 hover:border-border-strong hover:shadow-glass"
              >
                <div className="mb-2 text-accent">
                  <InterestIconSvg name={interest.icon} />
                </div>
                <p className="font-mono-sm text-text mb-1 uppercase tracking-wider">
                  {interest.title}
                </p>
                <p className="text-body-sm text-text-muted leading-relaxed">
                  {interest.description}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
