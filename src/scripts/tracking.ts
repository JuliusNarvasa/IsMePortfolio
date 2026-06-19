// Silent page-view beacon. Sends one POST to /api/track on load.
// Honours doNotTrack and skips the /tracking dashboard route.

(() => {
  if (location.pathname.startsWith('/tracking')) return;
  if (navigator.doNotTrack === '1') return;

  const send = () => {
    // pathname only — query strings are intentionally dropped to avoid
    // leaking tokens/emails from `?token=…` or `?email=…` share links
    const body = JSON.stringify({
      path: location.pathname.slice(0, 200),
      referrer: document.referrer || null,
    });
    const blob = new Blob([body], { type: 'application/json' });
    if (!navigator.sendBeacon('/api/track', blob)) {
      fetch('/api/track', {
        method: 'POST',
        body,
        headers: { 'Content-Type': 'application/json' },
        keepalive: true,
      }).catch(() => {});
    }
  };

  if (document.readyState === 'complete') send();
  else window.addEventListener('load', send, { once: true });
})();
