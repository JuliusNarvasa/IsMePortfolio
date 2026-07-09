'use client';
import { useEffect, useRef } from 'react';
import { useTheme } from '../themes/shared/ThemeProvider';
import { themes } from '../themes/registry';
import { ThemeSwitcher } from '../themes/shared/ThemeSwitcher';

export function Nav() {
  const { theme } = useTheme();
  const navRef = useRef<HTMLElement | null>(null);

  // Logo: scroll to absolute top (y=0) instead of to #top element.
  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    const logo = nav.querySelector<HTMLAnchorElement>('[data-scroll-top]');
    if (!logo) return;
    const handler = (e: MouseEvent) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    logo.addEventListener('click', handler);
    return () => logo.removeEventListener('click', handler);
  }, []);

  // Active section highlight via IntersectionObserver, scoped to the active
  // theme body. The theme body can be missing from the DOM for two reasons:
  //   1. First mount — the dynamic-imported Layout module is still resolving
  //      (30-50ms typical on cached networks, longer on cold load).
  //   2. Theme switch — under `mode="wait"` the old body exits (300ms) before
  //      the new body enters (400ms), so there's a ~300-500ms window with
  //      no body in the DOM.
  // We re-attempt observation on a 350ms cadence (covers the crossfade) and
  // on an exponential backoff 100/200/400/800ms (covers dynamic-import on
  // cold loads). Once the observer is set, subsequent calls are no-ops.
  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    const links = nav.querySelectorAll<HTMLAnchorElement>('[data-nav-anchor]');
    if (links.length === 0) return;

    let observer: IntersectionObserver | null = null;
    let cancelled = false;
    const timers: number[] = [];

    const setup = () => {
      if (cancelled || observer) return;
      const sections = document.querySelectorAll<HTMLElement>(
        `[data-theme-body="${theme}"] section[id]`,
      );
      if (sections.length === 0) return;

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const id = entry.target.getAttribute('id');
              links.forEach((link) => {
                const href = link.getAttribute('data-nav-anchor');
                if (href === `#${id}`) {
                  link.classList.add('text-accent');
                  link.classList.remove('text-text-muted');
                } else {
                  link.classList.remove('text-accent');
                  link.classList.add('text-text-muted');
                }
              });
            }
          });
        },
        { threshold: 0.15, rootMargin: '0px 0px -10% 0px' },
      );
      sections.forEach((section) => observer!.observe(section));
    };

    // Immediate attempt on every theme change.
    setup();
    // Cover the mode="wait" crossfade window (~300-500ms between unmount and
    // the new body's first commit). The new body usually mounts ~350ms in.
    timers.push(window.setTimeout(setup, 350));
    // Exponential backoff for the dynamic-import case where the body is
    // still resolving. Cumulative times: 100, 300, 700, 1500ms — worst-case
    // 1.5s covers cold-load chunk fetches.
    let cumulative = 0;
    for (const delay of [100, 200, 400, 800]) {
      cumulative += delay;
      timers.push(window.setTimeout(setup, cumulative));
    }

    return () => {
      cancelled = true;
      timers.forEach((t) => clearTimeout(t));
      observer?.disconnect();
    };
  }, [theme]);

  const navLinks = themes[theme].navLinks;

  return (
    <nav
      ref={navRef}
      className="sticky top-0 z-50 h-14 border-b border-border bg-bg-glass-strong backdrop-blur-nav"
      aria-label="Primary"
    >
      <div className="mx-auto flex h-full max-w-wide items-center justify-between gap-4 px-6">
        {/* Logo — scrolls to absolute top of page */}
        <a
          href="#top"
          className="font-mono text-text transition-colors duration-fast hover:text-accent"
          data-scroll-top
        >
          ~/julius
        </a>

        {/* Links — desktop only */}
        <ul className="hidden items-center gap-6 lg:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="nav-link font-mono-sm uppercase tracking-wider text-text-muted transition-colors duration-fast hover:text-text"
                data-nav-anchor={link.href}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Theme switcher — always visible, lives inside the Nav so the
            switcher button survives the theme body swap (focus restoration
            in ThemeProvider relies on this). The PortfolioApp-level
            LayoutGroup provides the layoutId scope for the indicator. */}
        <div className="flex items-center gap-3">
          <ThemeSwitcher />
        </div>
      </div>
    </nav>
  );
}
