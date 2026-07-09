'use client';
import { profile } from '../../../data/profile';
import { Reveal } from '../../shared/Reveal';

/**
 * Customer Contact — short closing CTA.
 *
 * Just one line and one button. No resume talk, no "let's collaborate".
 * Consumer-themed site: if anything here broke or annoyed you, send
 * feedback. That's it.
 */
export function Contact() {
  return (
    <section
      id="contact"
      className="px-6 py-section-tight"
      aria-labelledby="section-contact-title"
    >
      <div className="mx-auto max-w-prose text-center">
        <Reveal>
          <p className="text-h5 uppercase tracking-widest text-accent mb-4">
            Feedback
          </p>
        </Reveal>

        <Reveal delay={80}>
          <h2
            id="section-contact-title"
            className="text-h2 text-text mb-4"
          >
            Something bug you? Email me.
          </h2>
        </Reveal>

        <Reveal delay={160}>
          <p className="text-body-lg text-text-muted mb-8">
            Found a bug, have a feature in mind, or just want to say hi?
            Drop a line. I read everything.
          </p>
        </Reveal>

        <Reveal delay={240}>
          <a
            href={`mailto:${profile.email}`}
            className="inline-flex items-center gap-2 rounded-md bg-accent px-6 py-3 font-mono text-on-accent shadow-subtle transition-all duration-base ease-out-snappy hover:bg-accent-hover hover:shadow-accent-glow active:scale-[0.97]"
          >
            {profile.email}
            <span aria-hidden="true">→</span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}