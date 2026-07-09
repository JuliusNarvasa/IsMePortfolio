'use client';
import { useEffect, useRef, useState } from 'react';
import { profile } from '../../../data/profile';
import { Reveal } from '../../shared/Reveal';

const IMAGES = [
  { src: '/heroimages/1.jpg', alt: '' },
  { src: '/heroimages/2.jpg', alt: '' },
  { src: '/heroimages/3.jpg', alt: '' },
  { src: '/heroimages/4.jpg', alt: '' },
  { src: '/heroimages/5.jpg', alt: '' },
  { src: '/heroimages/6.jpg', alt: '' },
];

const INTERVAL_MS = 5000;

export function Hero() {
  const [active, setActive] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const triggerRef = useRef<HTMLElement | null>(null);
  const lightboxCloseRef = useRef<HTMLButtonElement | null>(null);
  const lightboxImageRef = useRef<HTMLImageElement | null>(null);
  const [paused, setPaused] = useState(false);

  // Hero slideshow — pause when lightbox opens.
  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => {
      setActive((a) => (a + 1) % IMAGES.length);
    }, INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [paused]);

  // Lightbox keyboard: Esc to close + focus trap between close button and image.
  useEffect(() => {
    if (!lightboxOpen) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        closeLightbox();
        return;
      }
      if (e.key !== 'Tab') return;
      const focusable: HTMLElement[] = [];
      if (lightboxCloseRef.current) focusable.push(lightboxCloseRef.current);
      if (lightboxImageRef.current) focusable.push(lightboxImageRef.current);
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const activeEl = document.activeElement as HTMLElement | null;
      if (e.shiftKey) {
        if (activeEl === first || !focusable.includes(activeEl as HTMLElement)) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (activeEl === last || !focusable.includes(activeEl as HTMLElement)) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [lightboxOpen]);

  // Lock body scroll while the lightbox is open.
  useEffect(() => {
    if (lightboxOpen) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = '';
      };
    }
    return;
  }, [lightboxOpen]);

  const openLightbox = (index: number) => {
    triggerRef.current = document.activeElement as HTMLElement | null;
    setLightboxIndex(index);
    setLightboxOpen(true);
    setPaused(true);
    // Focus the close button on next paint so the modal is interactive.
    requestAnimationFrame(() => {
      lightboxCloseRef.current?.focus();
    });
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setPaused(false);
    // Restore focus to the trigger (the slide the user opened from).
    requestAnimationFrame(() => {
      triggerRef.current?.focus();
      triggerRef.current = null;
    });
  };

  return (
    <header
      id="top"
      className="relative flex min-h-screen items-center overflow-hidden px-6 lg:px-24"
    >
      {/* Ambient accent blob */}
      <div
        className="pointer-events-none absolute -right-40 -top-40 h-[800px] w-[800px] rounded-full bg-accent-glow opacity-12 blur-[800px]"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-wide items-center gap-12 lg:gap-16">
        {/* Text column */}
        <div className="flex-1">
          {/* Eyebrow */}
          <Reveal delay={0}>
            <p className="font-mono-sm uppercase tracking-widest text-accent mb-4">
              {profile.heroEyebrow}
            </p>
          </Reveal>

          {/* Name */}
          <Reveal delay={80}>
            <h1 className="text-h1 md:text-display font-semibold text-text mb-3">
              {profile.name}
            </h1>
          </Reveal>

          {/* Role */}
          <Reveal delay={160}>
            <p className="text-h4 text-text-muted mb-6">{profile.role}</p>
          </Reveal>

          {/* Lead */}
          <Reveal delay={240}>
            <p className="text-body-lg text-text-muted max-w-prose mb-6">
              {profile.lead}
            </p>
          </Reveal>

          {/* Interests */}
          <Reveal delay={320}>
            <p className="font-mono-lg text-text-muted mb-8">
              {profile.interestsLine.map((interest, i) => (
                <span key={interest}>
                  <span>{interest}</span>
                  {i < profile.interestsLine.length - 1 && (
                    <span className="text-accent-muted mx-2">·</span>
                  )}
                </span>
              ))}
            </p>
          </Reveal>

          {/* CTAs */}
          <Reveal delay={400}>
            <div className="flex items-center gap-3">
              <a
                href="#projects"
                className="inline-flex items-center rounded-md bg-accent px-5 py-2.5 font-mono shadow-subtle transition-all duration-base ease-out-snappy hover:bg-accent-hover hover:shadow-accent-glow active:scale-95 text-on-accent font-medium"
              >
                View Projects →
              </a>
              <a
                href="#contact"
                className="inline-flex items-center rounded-md border border-border bg-bg-glass px-5 py-2.5 font-mono text-text backdrop-blur-glass transition-all duration-base ease-out-snappy hover:border-border-strong hover:shadow-glass active:scale-95"
              >
                Contact
              </a>
            </div>
          </Reveal>
        </div>

        {/* Slideshow column — desktop only */}
        <Reveal
          delay={200}
          className="hero-slideshow relative hidden h-[600px] w-[500px] flex-shrink-0 lg:block"
          as="div"
        >
          {IMAGES.map((image, i) => (
            <img
              key={image.src}
              src={image.src}
              alt={image.alt}
              role="button"
              tabIndex={0}
              aria-label="View image full size"
              data-hero-slide-index={i}
              aria-hidden={i !== active}
              className={`hero-slide absolute inset-0 h-full w-full rounded-lg object-cover${i === active ? ' is-active' : ''}`}
              onClick={() => openLightbox(i)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  openLightbox(i);
                }
              }}
            />
          ))}

          {/* Lightbox — single instance, position:fixed escapes the column's stacking context. */}
          <div
            className={`lightbox${lightboxOpen ? ' is-open' : ''}`}
            role="dialog"
            aria-modal="true"
            aria-label="Image viewer"
            data-lightbox
            hidden={!lightboxOpen}
          >
            <div
              className="lightbox-backdrop"
              data-lightbox-backdrop
              onClick={closeLightbox}
            />
            <img
              className="lightbox-image"
              alt=""
              data-lightbox-image
              tabIndex={0}
              ref={lightboxImageRef}
              src={lightboxOpen ? IMAGES[lightboxIndex].src : undefined}
            />
            <button
              type="button"
              className="lightbox-close"
              aria-label="Close"
              data-lightbox-close
              ref={lightboxCloseRef}
              onClick={closeLightbox}
            >
              ×
            </button>
          </div>
        </Reveal>
      </div>
    </header>
  );
}
