// Hero image slideshow
// Cycles through all .hero-slide elements in order, 5s per image, 800ms crossfade.
// The crossfade is driven entirely by CSS via the `.is-active` class
// (see .hero-slide / .hero-slide.is-active in src/styles/global.css).
// JS only toggles the class — no inline-style mutations, no forced reflow.

const slides = document.querySelectorAll<HTMLImageElement>('.hero-slide');
if (slides.length > 0) {
  let current = 0;
  const total = slides.length;

  // Show first slide immediately
  slides[0].classList.add('is-active');

  setInterval(() => {
    slides[current].classList.remove('is-active');
    current = (current + 1) % total;
    slides[current].classList.add('is-active');
  }, 5000);
}
