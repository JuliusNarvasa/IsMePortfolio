// Scroll reveal animation
// Respects prefers-reduced-motion

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (prefersReducedMotion) {
  // Immediately show all elements if reduced motion is preferred
  document.querySelectorAll('[data-reveal]').forEach((el) => {
    el.classList.add('is-visible');
  });
} else {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        // Also reveal anything already scrolled past (anchor jumps, fast
        // flicks) so scrolling back up never lands on an empty screen.
        if (entry.isIntersecting || entry.boundingClientRect.bottom < 0) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    // Start revealing just *before* an element enters the viewport.
    { threshold: 0, rootMargin: '0px 0px 10% 0px' }
  );

  document.querySelectorAll('[data-reveal]').forEach((el) => {
    observer.observe(el);
  });
}
