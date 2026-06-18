// Hero image slideshow
// Cycles through images 1-5 in order, 5s per image, 800ms crossfade

const slides = document.querySelectorAll<HTMLImageElement>('.hero-slide');
if (slides.length > 0) {
  let current = 0;
  const total = slides.length;

  // Show first slide immediately
  slides[0].style.opacity = '1';

  function showSlide(index: number) {
    const next = (index + 1) % total;
    const incoming = slides[next];
    const outgoing = slides[index];

    // Reset incoming to 0 instantly
    incoming.style.transition = 'none';
    incoming.style.opacity = '0';

    // Force reflow
    void incoming.offsetWidth;

    // Crossfade
    outgoing.style.transition = 'opacity 800ms ease-in-out';
    outgoing.style.opacity = '0';

    incoming.style.transition = 'opacity 800ms ease-in-out';
    incoming.style.opacity = '1';
  }

  setInterval(() => {
    current = (current + 1) % total;
    showSlide(current);
  }, 5000);
}
