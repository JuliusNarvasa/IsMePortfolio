'use client';
import { Reveal } from '../../shared/Reveal';
import { projects } from '../../../data/projects';

/**
 * Customer More Apps — the rest of the catalog.
 *
 * Four cards: AI Resume Builder, GpuVramMonitor, Local Llama,
 * NetworkWatcher. The first two have real screenshots from
 * /images/projects/. The last two have stylized "coming soon" cards
 * since they're private/internal builds with no public link.
 *
 * Layout: 1 col mobile, 2 col md+.
 */
interface MoreApp {
  title: string;
  description: string;
  screenshot?: { src: string; alt: string };
  cta: { label: string; href: string; external: boolean };
  /** 'available' = real CTA; 'coming-soon' = no link, just decorative. */
  state: 'available' | 'coming-soon';
}

const MORE_APPS: readonly MoreApp[] = [
  {
    title: 'AI Resume Builder',
    description:
      'Tailor your CV to a job posting in two minutes. Parses your existing resume, scrapes the listing, rewrites the bullets.',
    screenshot: (() => {
      const p = projects.find((p) => p.slug === 'airesumebuilder');
      return p
        ? { src: p.screenshot.src, alt: p.screenshot.alt }
        : undefined;
    })(),
    cta: {
      label: 'Open web app',
      href: 'https://cvmaker.bambaw-tumba.com',
      external: true,
    },
    state: 'available',
  },
  {
    title: 'GpuVramMonitor',
    description:
      'A native Windows tool that shows per-process VRAM usage on AMD GPUs. Finally know which model is hogging your 16 GB.',
    screenshot: (() => {
      const p = projects.find((p) => p.slug === 'gpuvrammonitor');
      return p
        ? { src: p.screenshot.src, alt: p.screenshot.alt }
        : undefined;
    })(),
    cta: {
      label: 'View on GitHub',
      href: 'https://github.com/JuliusNarvasa/GPUVramMonitor',
      external: true,
    },
    state: 'available',
  },
  {
    title: 'Local Llama',
    description:
      'A local llama.cpp + ROCm rig running a 30B model on my GPU. No cloud, no API bill, no waiting.',
    cta: { label: 'Coming soon', href: '#', external: false },
    state: 'coming-soon',
  },
  {
    title: 'NetworkWatcher',
    description:
      'A self-hosted Grafana dashboard that graphs latency and downtime per ISP in real time. Built to catch my ISP failover lying.',
    cta: { label: 'In private beta', href: '#', external: false },
    state: 'coming-soon',
  },
];

function MoreAppCard({ app, i }: { app: MoreApp; i: number }) {
  const isSoon = app.state === 'coming-soon';
  return (
    <Reveal
      delay={i * 80}
      className="group flex h-full flex-col overflow-hidden rounded-lg border border-border bg-bg-elevated shadow-subtle transition-all duration-slow ease-out-snappy hover:-translate-y-1 hover:border-accent-border hover:shadow-accent-glow focus-within:border-accent focus-within:shadow-accent-glow"
      as="div"
    >
      {/* Visual — real screenshot OR stylized gradient + initial */}
      {app.screenshot ? (
        <div
          className="relative overflow-hidden"
          style={{ aspectRatio: '16 / 9' }}
        >
          <img
            src={app.screenshot.src}
            alt={app.screenshot.alt}
            loading="lazy"
            className="h-full w-full object-cover object-top transition-transform duration-slower ease-out-smooth group-hover:scale-[1.04]"
          />
        </div>
      ) : (
        <div
          className="relative overflow-hidden border-b border-border"
          style={{ aspectRatio: '16 / 9' }}
        >
          {/* Gradient backdrop */}
          <div className="absolute inset-0 bg-gradient-to-br from-accent-muted via-bg-overlay to-bg-elevated" />
          {/* Faded initial behind the badge */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 flex items-center justify-center font-mono text-[120px] font-bold text-accent opacity-10 select-none"
          >
            {app.title.slice(0, 2).toUpperCase()}
          </span>
          {/* State badge */}
          <div className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-border-strong bg-bg-glass-strong px-2.5 py-1 font-mono-sm uppercase tracking-widest text-text-muted backdrop-blur-glass">
            <span className="h-1.5 w-1.5 rounded-full bg-warning animate-pulse-dot" />
            {isSoon ? 'Coming soon' : 'In private beta'}
          </div>
        </div>
      )}

      {/* Body */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-h4 text-text mb-2 leading-snug">{app.title}</h3>
        <p className="text-body-sm text-text-muted leading-relaxed flex-1">
          {app.description}
        </p>

        {/* CTA — disabled for coming-soon */}
        <div className="mt-5 border-t border-border pt-4">
          {isSoon ? (
            <span className="inline-flex items-center gap-1.5 font-mono-sm uppercase tracking-widest text-text-dim">
              {app.cta.label}
            </span>
          ) : (
            <a
              href={app.cta.href}
              target={app.cta.external ? '_blank' : undefined}
              rel={app.cta.external ? 'noopener noreferrer' : undefined}
              className="inline-flex items-center gap-1.5 font-mono-sm text-accent transition-all duration-fast hover:text-accent-hover hover:gap-2.5"
            >
              {app.cta.label}
              <span aria-hidden="true">↗</span>
            </a>
          )}
        </div>
      </div>
    </Reveal>
  );
}

export function MoreApps() {
  return (
    <section
      id="more-apps"
      className="py-section px-6"
      aria-labelledby="section-moreapps-title"
    >
      <div className="mx-auto max-w-content">
        <Reveal>
          <div className="mb-12 max-w-prose">
            <p className="text-h5 uppercase tracking-widest text-accent mb-3">
              More apps
            </p>
            <h2
              id="section-moreapps-title"
              className="text-h2 text-text mb-3"
            >
              And a few more.
            </h2>
            <p className="text-body-lg text-text-muted">
              Smaller things I built because they bugged me. Some are
              live, some are still in the garage.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {MORE_APPS.map((app, i) => (
            <MoreAppCard key={app.title} app={app} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}