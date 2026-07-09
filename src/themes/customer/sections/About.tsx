'use client';
import { profile } from '../../../data/profile';
import { Reveal } from '../../shared/Reveal';
import { HandleRow } from '../../shared/ui/HandleRow';

/**
 * Customer About — a single-screen, first-person intro.
 *
 * Conversational, casual, no resume talk. "Hi, I'm Julius" voice.
 * Three social handles via the shared HandleRow primitive so the
 * row reads the same across themes.
 */

const HANDLES = [
  {
    label: 'github',
    value: 'github.com/JuliusNarvasa',
    href: profile.socials.github,
  },
  {
    label: 'linkedin',
    value: 'linkedin.com/in/bambaw-tumba',
    href: profile.socials.linkedin,
  },
  {
    label: 'email',
    value: profile.email,
    href: `mailto:${profile.email}`,
  },
];

export function About() {
  return (
    <section
      id="about"
      className="py-section px-6"
      aria-labelledby="section-about-title"
    >
      <div className="mx-auto max-w-narrow">
        <Reveal>
          <div className="mb-10 max-w-prose">
            <p className="text-h5 uppercase tracking-widest text-accent mb-3">
              About
            </p>
            <h2
              id="section-about-title"
              className="text-h2 text-text mb-5"
            >
              Hi, I&rsquo;m Julius.
            </h2>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <p className="text-body-lg text-text leading-relaxed mb-5">
            I&rsquo;m a developer in Manila. I build apps for the small
            daily annoyances that bug me &mdash; tracking gas prices, tailoring
            a resume in a hurry, seeing which process is eating the GPU.
          </p>
        </Reveal>

        <Reveal delay={160}>
          <p className="text-body-lg text-text-muted leading-relaxed mb-10">
            Turns out other people want them too. Try them, send feedback,
            tell me what to fix. If something here makes your day a tiny
            bit easier, the whole thing was worth it.
          </p>
        </Reveal>

        <Reveal delay={240} as="dl">
          {HANDLES.map((handle) => (
            <HandleRow key={handle.label} {...handle} />
          ))}
        </Reveal>
      </div>
    </section>
  );
}