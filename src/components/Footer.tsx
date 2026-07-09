interface FooterProps {
  /**
   * ISO date (YYYY-MM-DD) injected at build time by `index.astro`. Hides the
   * "last updated" line when omitted (useful for tests and stories that
   * don't pass a build date).
   */
  buildDate?: string;
}

export function Footer({ buildDate }: FooterProps = {}) {
  return (
    <footer className="border-t border-border bg-bg">
      <div className="mx-auto flex max-w-wide flex-col items-center justify-between gap-3 px-6 py-12 md:flex-row md:py-16">
        {/* Copyright */}
        <p className="font-mono-sm text-text-dim">
          &copy; 2026 Julius Narvasa
        </p>

        {/* Last updated — build-time stamp from index.astro */}
        {buildDate && (
          <p className="font-mono-sm text-text-dim hidden md:block">
            last updated: {buildDate}
          </p>
        )}

        {/* Back to top */}
        <a
          href="#top"
          className="font-mono-sm text-text-dim transition-colors duration-fast hover:text-text"
        >
          ↑ top
        </a>
      </div>
    </footer>
  );
}
