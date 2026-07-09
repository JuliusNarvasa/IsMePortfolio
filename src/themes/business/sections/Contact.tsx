'use client';
import { profile } from '../../../data/profile';
import { HandleRow } from '../../shared/ui/HandleRow';
import { Reveal } from '../../shared/Reveal';

/**
 * Business "Contact" — 3 handles (email, LinkedIn, GitHub) + a closing CTA.
 */

interface HandleRowProps {
  label: string;
  value: string;
  href?: string;
}

const HANDLES: readonly HandleRowProps[] = [
  { label: 'email', value: profile.email, href: `mailto:${profile.email}` },
  {
    label: 'linkedin',
    value: 'linkedin.com/in/bambaw-tumba',
    href: profile.socials.linkedin,
  },
  {
    label: 'github',
    value: 'github.com/JuliusNarvasa',
    href: profile.socials.github,
  },
];

export function Contact() {
  return (
    <section
      id="contact"
      className="py-section-tight px-6"
      aria-labelledby="section-contact-title"
    >
      <div className="mx-auto max-w-narrow">
        <Reveal>
          <div className="mb-10 max-w-prose">
            <p className="text-h5 uppercase tracking-widest text-accent mb-3">
              Contact
            </p>
            <h2
              id="section-contact-title"
              className="text-h2 text-text mb-3"
            >
              Get in touch.
            </h2>
            <p className="text-body-lg text-text-muted">
              Best for project inquiries. Replying within one business day.
            </p>
          </div>
        </Reveal>

        <Reveal delay={80} as="dl">
          {HANDLES.map((handle) => (
            <HandleRow key={handle.label} {...handle} />
          ))}
        </Reveal>

        <Reveal delay={160} className="mt-10">
          <a
            href={`mailto:${profile.email}`}
            className="inline-flex items-center gap-2 rounded-md bg-accent px-5 py-2.5 font-mono text-on-accent shadow-subtle transition-all duration-base ease-out-snappy hover:bg-accent-hover hover:shadow-accent-glow active:scale-[0.98]"
          >
            {profile.email} →
          </a>
        </Reveal>
      </div>
    </section>
  );
}