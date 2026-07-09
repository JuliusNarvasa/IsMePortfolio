'use client';
import { useCallback, useRef } from 'react';
import type { KeyboardEvent } from 'react';
import { LayoutGroup, motion } from 'motion/react';
import { useTheme } from './ThemeProvider';
import { themes, type ThemeId } from '../registry';

const ORDER: ThemeId[] = ['personal', 'business', 'customer'];

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const refs = useRef<Record<ThemeId, HTMLButtonElement | null>>({
    personal: null,
    business: null,
    customer: null,
  });

  const focusIndex = useCallback(
    (i: number) => {
      const next = ORDER[(i + ORDER.length) % ORDER.length];
      refs.current[next]?.focus();
      setTheme(next);
    },
    [setTheme],
  );

  const onKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      const i = ORDER.indexOf(theme);
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        focusIndex(i + 1);
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        focusIndex(i - 1);
      } else if (e.key === 'Home') {
        e.preventDefault();
        focusIndex(0);
      } else if (e.key === 'End') {
        e.preventDefault();
        focusIndex(ORDER.length - 1);
      }
    },
    [theme, focusIndex],
  );

  return (
    <LayoutGroup id="theme-switcher">
      <div
        role="radiogroup"
        aria-label="Theme"
        onKeyDown={onKeyDown}
        className="inline-flex items-center gap-0.5 rounded-md border border-border bg-bg-glass-strong p-0.5 backdrop-blur-nav"
      >
        {ORDER.map((id) => {
          const active = theme === id;
          return (
            <button
              key={id}
              ref={(el) => {
                refs.current[id] = el;
              }}
              type="button"
              role="radio"
              aria-checked={active}
              aria-label={themes[id].name}
              tabIndex={active ? 0 : -1}
              onClick={() => setTheme(id)}
              onKeyDown={(e) => {
                if (e.key === ' ' || e.key === 'Enter') {
                  e.preventDefault();
                  setTheme(id);
                }
              }}
              className="relative px-3 py-1 font-mono-sm uppercase tracking-wider text-text-muted transition-colors duration-fast focus-visible:text-text aria-checked:text-text"
              data-theme-option={id}
            >
              {active && (
                <motion.span
                  layoutId="theme-switcher-indicator"
                  className="absolute inset-0 rounded-sm bg-accent-muted"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              {/*
                Mobile (<lg): icon-only with the theme's first letter. The
                visible initial is aria-hidden; the button's aria-label above
                provides the accessible name for screen readers. Desktop (lg+):
                the full label.
              */}
              <span className="relative z-10">
                <span className="hidden lg:inline">{themes[id].name}</span>
                <span className="lg:hidden" aria-hidden="true">
                  {themes[id].name[0]}
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </LayoutGroup>
  );
}
