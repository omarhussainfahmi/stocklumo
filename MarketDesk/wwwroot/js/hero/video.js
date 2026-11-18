(() => {
  'use strict';
  const host = document.getElementById('hero-visual'), video = document.getElementById('hero-film'), toggle = document.getElementById('hero-film-toggle');
  if (!host || !video) return;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let armed = false, disposed = false, failedTheme, activeTheme, localPaused = false;
  try { localPaused = sessionStorage.getItem('stocklumo.motionPaused') === 'true'; } catch { /* Keep the visit-only preference when storage is blocked. */ }
  if (window.StocklumoMotion) localPaused = window.StocklumoMotion.isPaused();
  const theme = () => document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
  const paused = () => localPaused;
  const visible = () => { const r = host.getBoundingClientRect(); return r.width > 0 && r.height > 0 && r.bottom > 0 && r.top < innerHeight; };
  function unload() { video.pause(); video.removeAttribute('src'); video.load(); activeTheme = undefined; host.dataset.state = 'fallback'; }
  function sync() {
    const current = theme(), blocked = reduced.matches || navigator.connection?.saveData;
    if (toggle) { toggle.hidden = !!blocked || failedTheme === current; toggle.textContent = paused() ? 'Resume motion' : 'Pause motion'; toggle.setAttribute('aria-pressed', String(paused())); }
    if (disposed) return;
    if (blocked) { if (video.hasAttribute('src')) unload(); return; }
    if (activeTheme && activeTheme !== current) unload();
    if (!armed || paused() || document.hidden || !visible()) { video.pause(); return; }
    if (failedTheme === current) return;
    if (!activeTheme) {
      activeTheme = current; host.dataset.state = 'loading';
      video.muted = video.defaultMuted = true;
      video.src = `/media/hero/owner-${current}-60fps.mp4`;
    }
    video.play()?.catch(() => {
      // A pause/theme change may abort an outstanding play promise. It is not
      // an autoplay refusal and must not overwrite the newer control state.
      if (disposed || activeTheme !== current || paused() || reduced.matches || document.hidden || !visible()) return;
      host.dataset.state = 'fallback'; if (toggle) toggle.textContent = 'Play motion';
    });
  }
  video.addEventListener('playing', () => {
    if (paused() || reduced.matches || navigator.connection?.saveData || document.hidden || !visible()) { video.pause(); return; }
    if (activeTheme === theme()) host.dataset.state = 'ready';
  });
  video.addEventListener('error', () => { if (video.hasAttribute('src')) { failedTheme = activeTheme; unload(); if (toggle) toggle.hidden = true; } });
  toggle?.addEventListener('click', () => {
    if (toggle.textContent === 'Play motion') { sync(); return; }
    localPaused = !localPaused;
    window.StocklumoMotion?.setPaused(localPaused);
    // Explicit user activation also retries an autoplay refusal.
    sync();
  });
  const intersection = typeof IntersectionObserver === 'undefined' ? null : new IntersectionObserver(sync, { threshold: .05 });
  intersection?.observe(host);
  const themes = new MutationObserver(sync); themes.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  document.addEventListener('stocklumo:motionchange', event => {
    if (typeof event.detail?.paused === 'boolean') localPaused = event.detail.paused;
    sync();
  });
  document.addEventListener('visibilitychange', sync);
  reduced.addEventListener?.('change', sync);
  navigator.connection?.addEventListener?.('change', sync);
  window.addEventListener('pagehide', () => { disposed = true; video.pause(); });
  window.addEventListener('pageshow', () => { disposed = false; sync(); });
  function enable() { armed = true; sync(); }
  function defer() { if ('requestIdleCallback' in window) requestIdleCallback(enable, { timeout: 1800 }); else setTimeout(enable, 100); }
  if (document.readyState === 'complete') defer(); else window.addEventListener('load', defer, { once: true });
  sync();
})();
