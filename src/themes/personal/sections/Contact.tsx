import { profile } from '../../../data/profile';
import { HandleRow } from '../../shared/ui/HandleRow';
import { SectionHeader } from '../../shared/ui/SectionHeader';
import { Reveal } from '../../shared/Reveal';

const handles = [
  { label: 'email', value: 'jibnarvasa@gmail.com', href: 'mailto:jibnarvasa@gmail.com' },
  { label: 'linkedin', value: 'linkedin.com/in/bambaw-tumba', href: 'https://www.linkedin.com/in/bambaw-tumba/' },
  { label: 'github', value: 'github.com/JuliusNarvasa', href: 'https://github.com/JuliusNarvasa' },
];

export function Contact() {
  return (
    <section
      id="contact"
      className="py-section px-6"
      aria-labelledby="section-contact-title"
    >
      <div className="mx-auto max-w-narrow">
        <Reveal>
          <SectionHeader
            eyebrow="06 — Contact"
            title="Get in touch"
            description="Open to interesting backend, infra, and AI work."
          />
        </Reveal>

        <Reveal delay={80} as="dl">
          {handles.map((handle) => (
            <HandleRow key={handle.label} {...handle} />
          ))}
        </Reveal>

        <Reveal delay={160} className="mt-8 text-right">
          <a
            href={`mailto:${profile.email}`}
            className="font-mono-lg text-accent transition-colors duration-fast hover:text-accent-hover hover:underline"
          >
            say hi →
          </a>
        </Reveal>
      </div>
    </section>
  );
}
