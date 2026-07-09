'use client';
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import type { ThemeId } from '../tokens';

const STORAGE_KEY = 'portfolio-theme';
const VALID: ThemeId[] = ['personal', 'business', 'customer'];

function readInitial(): ThemeId {
  if (typeof document !== 'undefined') {
    const fromDom = document.documentElement.dataset.theme;
    if (fromDom && (VALID as string[]).includes(fromDom)) return fromDom as ThemeId;
  }
  if (typeof window !== 'undefined') {
    try {
      const fromStorage = window.localStorage.getItem(STORAGE_KEY);
      if (fromStorage && (VALID as string[]).includes(fromStorage)) return fromStorage as ThemeId;
    } catch {
      /* localStorage may be unavailable (private mode, quota, etc.) — fall through */
    }
  }
  return 'personal';
}

interface ThemeContextValue {
  theme: ThemeId;
  setTheme: (t: ThemeId) => void;
}

const Ctx = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeId>(() => readInitial());

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      window.localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      /* see readInitial */
    }
  }, [theme]);

  // setTheme captures scroll position and the active element BEFORE the
  // outgoing theme body is unmounted, then restores both after the new
  // theme has mounted. The ThemeSwitcher button is rendered in the Nav,
  // outside any theme body, so it survives the swap and the focus
  // restoration will land back on it naturally. If the user was focused
  // inside the outgoing body (e.g. a section heading) and triggered a
  // theme change via some other path, document.body.contains fails and
  // we fall back to the new theme's active radio so keyboard users
  // don't get dumped to <body>.
  const setTheme = useCallback((t: ThemeId) => {
    const previousFocus = document.activeElement as HTMLElement | null;
    const scrollY = window.scrollY;

    setThemeState(t);

    requestAnimationFrame(() => {
      window.scrollTo({ top: scrollY, behavior: 'instant' });
      requestAnimationFrame(() => {
        if (previousFocus && document.body.contains(previousFocus)) {
          previousFocus.focus();
        } else {
          const activeRadio = document.querySelector<HTMLElement>(
            `[data-theme-option="${t}"]`,
          );
          activeRadio?.focus();
        }
      });
    });
  }, []);

  const value = useMemo(() => ({ theme, setTheme }), [theme, setTheme]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useTheme(): ThemeContextValue {
  const v = useContext(Ctx);
  if (!v) throw new Error('useTheme must be used inside ThemeProvider');
  return v;
}
