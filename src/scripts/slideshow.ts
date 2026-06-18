// Hero image slideshow + lightbox
// - Cycles through all .hero-slide elements in order, 5s per image, 800ms crossfade.
// - The crossfade is driven entirely by CSS via the `.is-active` class
//   (see .hero-slide / .hero-slide.is-active in src/styles/global.css).
//   JS only toggles the class — no inline-style mutations, no forced reflow.
// - Pauses while the lightbox is open and resumes (re-showing the current
//   slide immediately) when it closes, so the active slide is always the
//   source of truth and there's no flash after a pause/resume.
// - Clicking a slide (or pressing Enter/Space when focused) opens a
//   full-screen lightbox with that image.

const slides = document.querySelectorAll<HTMLImageElement>('.hero-slide');
const lightbox = document.querySelector<HTMLElement>('[data-lightbox]');
const lightboxImage = document.querySelector<HTMLImageElement>('[data-lightbox-image]');
const lightboxBackdrop = document.querySelector<HTMLElement>('[data-lightbox-backdrop]');
const lightboxClose = document.querySelector<HTMLButtonElement>('[data-lightbox-close]');

if (slides.length > 0) {
  let current = 0;
  const total = slides.length;
  let intervalId: number | null = null;
  let paused = false;
  let lightboxOpen = false;
  let lastFocusedIndex: number | null = null;

  // --- Slideshow ---------------------------------------------------------

  const showSlide = (idx: number) => {
    slides.forEach((slide, i) => {
      slide.classList.toggle('is-active', i === idx);
    });
  };

  const tick = () => {
    slides[current].classList.remove('is-active');
    current = (current + 1) % total;
    slides[current].classList.add('is-active');
  };

  const start = () => {
    if (intervalId !== null) return;
    intervalId = window.setInterval(tick, 5000);
  };

  const stop = () => {
    if (intervalId !== null) {
      window.clearInterval(intervalId);
      intervalId = null;
    }
  };

  const pause = () => {
    paused = true;
    stop();
  };

  const resume = () => {
    if (!paused) return;
    paused = false;
    // Re-assert the current slide so the active state survives the pause.
    showSlide(current);
    start();
  };

  // Show first slide immediately, then start cycling.
  showSlide(0);
  start();

  // --- Lightbox ----------------------------------------------------------

  if (lightbox && lightboxImage && lightboxClose) {
    const openLightbox = (index: number) => {
      const slide = slides[index];
      if (!slide) return;
      lastFocusedIndex = index;
      lightboxImage.src = slide.src;
      lightbox.removeAttribute('hidden');
      // Use rAF so the browser commits `display: flex` (from removing
      // `hidden`) before we add the transition-driving class.
      requestAnimationFrame(() => {
        lightbox?.classList.add('is-open');
      });
      lightboxOpen = true;
      pause();
      document.body.style.overflow = 'hidden';
      lightboxClose.focus();
    };

    const closeLightbox = () => {
      if (!lightboxOpen) return;
      lightbox.classList.remove('is-open');
      lightbox.setAttribute('hidden', '');
      lightboxImage.removeAttribute('src');
      lightboxOpen = false;
      document.body.style.overflow = '';
      resume();
      if (lastFocusedIndex !== null) {
        slides[lastFocusedIndex]?.focus();
        lastFocusedIndex = null;
      }
    };

    // Slide click + keyboard activation
    slides.forEach((slide, index) => {
      slide.addEventListener('click', () => openLightbox(index));
      slide.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openLightbox(index);
        }
      });
    });

    // Close: button, backdrop, Escape, and a focus trap for Tab/Shift+Tab.
    lightboxClose.addEventListener('click', closeLightbox);
    lightboxBackdrop?.addEventListener('click', closeLightbox);

    document.addEventListener('keydown', (e) => {
      if (!lightboxOpen) return;

      if (e.key === 'Escape') {
        e.preventDefault();
        closeLightbox();
        return;
      }

      if (e.key !== 'Tab') return;

      // Focus trap: cycle between the close button and the lightbox image.
      const focusable: HTMLElement[] = [];
      if (lightboxClose) focusable.push(lightboxClose);
      if (lightboxImage) focusable.push(lightboxImage);
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement as HTMLElement | null;

      if (e.shiftKey) {
        if (active === first || !focusable.includes(active as HTMLElement)) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (active === last || !focusable.includes(active as HTMLElement)) {
          e.preventDefault();
          first.focus();
        }
      }
    });
  }
}
