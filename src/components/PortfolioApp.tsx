'use client';
import { useEffect, useState, type ComponentType } from 'react';
import {
  AnimatePresence,
  MotionConfig,
  motion,
  useReducedMotion,
} from 'motion/react';
import { ThemeProvider, useTheme } from '../themes/shared/ThemeProvider';
import { themes } from '../themes/registry';
import { pageVariants } from '../themes/shared/MotionPreset';
import { Nav } from './Nav';
import { Footer } from './Footer';

/**
 * Skeleton shown during the brief 30-50ms window where the dynamic-imported
 * Layout component is resolving. Rendered OUTSIDE AnimatePresence so the
 * skeleton doesn't need to participate in the exit/enter protocol. Aria-busy
 * announces the loading state to screen readers without drawing focus away
 * from the ThemeSwitcher (which the user just interacted with).
 */
function BodySkeleton() {
  return (
    <div aria-busy="true" aria-label="Loading theme" className="px-6 py-section">
      <div className="mx-auto max-w-content space-y-6">
        <div className="h-12 w-3/4 rounded-md bg-bg-elevated animate-pulse" />
        <div className="h-6 w-1/2 rounded-md bg-bg-elevated animate-pulse" />
        <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="h-32 rounded-lg bg-bg-elevated animate-pulse" />
          <div className="h-32 rounded-lg bg-bg-elevated animate-pulse" />
          <div className="h-32 rounded-lg bg-bg-elevated animate-pulse" />
        </div>
      </div>
    </div>
  );
}

function Body() {
  const { theme } = useTheme();
  const [Layout, setLayout] = useState<ComponentType | null>(null);

  useEffect(() => {
    let cancelled = false;
    themes[theme].getLayout().then((m: { default: ComponentType }) => {
      if (!cancelled) setLayout(() => m.default);
    });
    return () => {
      cancelled = true;
    };
  }, [theme]);

  return (
    <>
      <AnimatePresence mode="wait" initial={false}>
        {Layout && (
          <motion.div
            key={theme}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <Layout />
          </motion.div>
        )}
      </AnimatePresence>
      {!Layout && <BodySkeleton />}
    </>
  );
}

interface PortfolioAppProps {
  /**
   * ISO date (YYYY-MM-DD) of the build, computed in `index.astro`. Forwarded
   * to `<Footer>` for the "last updated" line.
   */
  buildDate?: string;
}

export default function PortfolioApp({ buildDate }: PortfolioAppProps = {}) {
  return (
    <ThemeProvider>
      {/*
        MotionConfig reducedMotion="user" short-circuits transform + opacity
        animations globally when prefers-reduced-motion is set. The theme
        swap is instant under reduced motion; the opacity crossfade still
        runs because Motion only drops transforms/layout, not opacity.
      */}
      <MotionConfig reducedMotion="user">
        <div id="page">
          <Nav />
          <main id="main">
            <Body />
          </main>
          <Footer buildDate={buildDate} />
        </div>
      </MotionConfig>
    </ThemeProvider>
  );
}
