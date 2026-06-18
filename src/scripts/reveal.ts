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
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -10% 0px' }
  );

  document.querySelectorAll('[data-reveal]').forEach((el) => {
    observer.observe(el);
  });
}
