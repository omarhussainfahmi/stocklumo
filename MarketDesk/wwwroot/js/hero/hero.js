(() => {
  'use strict';
  const host = document.getElementById('hero-visual');
  const sceneUrl = document.currentScript?.dataset.sceneUrl;
  if (!host || !sceneUrl) return;
  const preference = matchMedia('(prefers-reduced-motion: reduce)');
  const header = document.querySelector('.header');
  let started = false, ended = false, armed = false, failed = false, attempt = 0, controller, cleanup, observer;
  let motionPaused = false;
  try { motionPaused = sessionStorage.getItem('stocklumo.motionPaused') === 'true'; } catch { /* Use the shared in-memory preference for this visit. */ }
  if (window.StocklumoMotion) motionPaused = window.StocklumoMotion.isPaused();
  function allowed() {
    if (preference.matches || navigator.connection?.saveData || failed) return false;
    return !motionPaused;
  }
  function stop() {
    ++attempt; controller?.abort(); cleanup?.(); cleanup = undefined; started = false;
    host.dataset.state = 'fallback';
  }
  function inView() {
    const bounds = host.getBoundingClientRect();
    return bounds.width > 0 && bounds.height > 0 && bounds.bottom > (header?.offsetHeight || 0) + 16 && bounds.top < innerHeight;
  }
  async function start() {
    if (started || ended || !allowed()) return;
    if (!inView() || document.hidden) return;
    started = true;
    host.dataset.state = 'loading';
    const current = ++attempt;
    const currentController = new AbortController(); controller = currentController;
    try {
      const { mountHero } = await import(sceneUrl);
      // Bytes already transferred cannot be undone; reject obsolete work before
      // it allocates graphics resources or replaces a newer scene.
      if (current !== attempt || ended || !allowed() || document.hidden) { if (current === attempt) started = false; return; }
      const dispose = await mountHero(host, { signal: currentController.signal });
      if (current !== attempt || ended || !allowed()) dispose(); else cleanup = dispose;
    } catch { if (current === attempt) { started = false; failed = true; host.dataset.state = 'fallback'; } }
  }
  function watch() {
    if (ended || !armed || typeof IntersectionObserver === 'undefined') return;
    observer?.disconnect();
    observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || !inView()) return;
      start();
    }, { rootMargin: `-${Math.ceil(header?.getBoundingClientRect().height || 0) + 16}px 0px 0px` });
    observer.observe(host);
  }
  function motion(event) {
    if (typeof event?.detail?.paused === 'boolean') motionPaused = event.detail.paused;
    // An existing scene owns its pause state. Cancel only an unfinished mount.
    if (!allowed() && started && !cleanup) stop(); else start();
  }
  function defer() {
    const enable = () => { armed = true; watch(); };
    if ('requestIdleCallback' in window) requestIdleCallback(enable, { timeout: 1800 });
    else setTimeout(enable, 100);
  }
  if (document.readyState === 'complete') defer(); else window.addEventListener('load', defer, { once: true });
  const headerSize = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(watch);
  if (header) headerSize?.observe(header);
  document.addEventListener('stocklumo:motionchange', motion);
  preference.addEventListener('change', motion);
  document.addEventListener('visibilitychange', motion);
  window.addEventListener('pagehide', () => { ended = true; observer?.disconnect(); stop(); });
  window.addEventListener('pageshow', event => { if (event.persisted) { ended = false; watch(); } });
})();
