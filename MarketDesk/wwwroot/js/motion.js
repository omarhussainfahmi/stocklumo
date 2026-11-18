(() => {
  'use strict';
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  const fine = matchMedia('(hover: hover) and (pointer: fine)');
  const ease = 'cubic-bezier(.23, 1, .32, 1)';
  const running = new Map();
  let pressed;
  function animate(node, frames, options) {
    running.get(node)?.cancel(); running.delete(node);
    if (reduce.matches || document.hidden || typeof node.animate !== 'function') return;
    const animation = node.animate(frames, options);
    running.set(node, animation);
    const finish = () => { if (running.get(node) === animation) running.delete(node); };
    animation.onfinish = animation.oncancel = finish;
  }
  function release() { pressed?.removeAttribute('data-pointer-press'); pressed = null; }
  document.addEventListener('pointerdown', event => {
    document.body.removeAttribute('data-motion-keyboard'); release();
    if (event.button !== 0) return;
    pressed = event.target.closest?.('button:not(:disabled), .button-link');
    pressed?.setAttribute('data-pointer-press', '');
  }, { passive: true });
  document.addEventListener('pointerup', release, { passive: true });
  document.addEventListener('pointercancel', release, { passive: true });
  window.addEventListener('blur', release);
  document.addEventListener('keydown', () => { document.body.setAttribute('data-motion-keyboard', ''); release(); }, true);

  document.querySelectorAll('#site-navigation, .research-nav').forEach(nav => {
    const layer = document.createElement('span');
    layer.className = 'nav-glide'; layer.setAttribute('aria-hidden', 'true');
    nav.classList.add('motion-nav'); nav.append(layer);
    let last;
    function place(link, instant = false) {
      if (!link || !link.getClientRects().length) { layer.style.opacity = '0'; last = null; return; }
      const base = nav.getBoundingClientRect(), box = link.getBoundingClientRect();
      const from = last ? { clipPath: getComputedStyle(layer).clipPath } : null;
      const left = box.left - base.left + nav.scrollLeft, top = box.top - base.top + nav.scrollTop;
      const next = { clipPath: `inset(${top}px ${Math.max(0, nav.clientWidth - left - box.width)}px ${Math.max(0, nav.clientHeight - top - box.height)}px ${left}px round 6px)` };
      layer.style.clipPath = next.clipPath; layer.style.opacity = '1';
      if (from && !instant) animate(layer, [from, next], { duration: 250, easing: 'cubic-bezier(.77, 0, .175, 1)' });
      else { running.get(layer)?.cancel(); running.delete(layer); }
      last = next;
    }
    const current = () => nav.querySelector('a[aria-current="page"]');
    nav.addEventListener('pointerover', event => { if (fine.matches) { const link = event.target.closest('a'); if (link?.parentElement === nav) place(link); } });
    nav.addEventListener('pointerleave', () => place(current()));
    nav.addEventListener('focusin', event => { if (event.target.matches('a')) place(event.target, true); });
    nav.addEventListener('focusout', event => { if (!nav.contains(event.relatedTarget)) place(current(), true); });
    const refresh = () => place(nav.contains(document.activeElement) ? document.activeElement : current(), true);
    if (typeof ResizeObserver !== 'undefined') new ResizeObserver(refresh).observe(nav);
    document.fonts?.ready.then(refresh); refresh();
  });

  // Observe only stable, explicit numeric outputs. Actual text updates immediately:
  // no count-through prices, duplicated screen-reader content or global DOM observer.
  document.querySelectorAll('#workspace-summary dd:not(.summary-note), #price, #change').forEach(node => {
    let previous = node.textContent.trim(), lastFeedback = 0;
    new MutationObserver(() => {
      const next = node.textContent.trim();
      if (next === previous) return;
      previous = next;
      if (!/\d/.test(next) || !node.getClientRects().length || Date.now() - lastFeedback < 750) return;
      lastFeedback = Date.now();
      animate(node, [{ opacity: .55 }, { opacity: 1 }], { duration: 200, easing: ease });
    }).observe(node, { childList: true, characterData: true, subtree: true });
  });
  // One entrance per chart identity, independent of provider refreshes/rebuilds.
  // Labels, zero axes and exact values remain visible throughout.
  const chartSeen = new Set(), pendingCharts = new Map();
  function presentChart(container, key) {
    if (chartSeen.has(key)) return;
    const marks = [...container.querySelectorAll('rect, circle, #chart-line, #chart-area, .range-progress, .history-line, .research-chart path')]
      .filter(mark => !mark.closest('defs') && !mark.hasAttribute('hidden') &&
        (mark.tagName.toLowerCase() !== 'path' || mark.getAttribute('d')) &&
        (mark.tagName.toLowerCase() !== 'rect' || Number(mark.getAttribute('width')) > 0));
    if (!marks.length) return;
    chartSeen.add(key);
    if (document.body.hasAttribute('data-motion-keyboard')) return;
    marks.slice(0, 100).forEach((mark, index) => {
      const bar = mark.tagName.toLowerCase() === 'rect' && !mark.closest('.history-price-chart, .financial-history-grid');
      const axis = mark.closest('svg')?.querySelector('line[x1]');
      const negative = mark.closest('svg.down') || (bar && axis && Number(mark.getAttribute('x')) < Number(axis.getAttribute('x1')));
      const opacity = Number(getComputedStyle(mark).opacity) || 1;
      const frames = bar
        ? [{ clipPath: negative ? 'inset(0 0 0 100%)' : 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0 0 0)' }]
        : [{ opacity: opacity * .45 }, { opacity }];
      animate(mark, frames, { duration: 250, delay: Math.min(index * 20, 100), easing: ease });
    });
  }
  const chartViewport = typeof IntersectionObserver === 'undefined' ? null : new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      if (document.body.classList.contains('privacy-open')) return;
      const key = pendingCharts.get(entry.target);
      if (key) presentChart(entry.target, key);
      pendingCharts.delete(entry.target); chartViewport.unobserve(entry.target);
    });
  }, { threshold: .15 });
  if (chartViewport) new MutationObserver(() => {
    if (document.body.classList.contains('privacy-open')) return;
    pendingCharts.forEach((key, container) => { chartViewport.unobserve(container); chartViewport.observe(container); });
  }).observe(document.body, { attributes: true, attributeFilter: ['class'] });
  function queueChart(container, key) {
    if (chartSeen.has(key) || pendingCharts.has(container)) return;
    if (!container.querySelector('rect, circle, path[d]')) return;
    if (!chartViewport) { presentChart(container, key); return; }
    pendingCharts.set(container, key); chartViewport.observe(container);
  }
  const chartRoots = ['pulse-bars', 'pulse-breadth', 'watch-balance', 'watch-rows', 'price-ranges', 'chart', 'research-results', 'stock-detail'].map(id => document.getElementById(id)).filter(Boolean);
  chartRoots.forEach(root => {
    function scan() {
      pendingCharts.forEach((key, node) => { if (!node.isConnected) { chartViewport?.unobserve(node); pendingCharts.delete(node); } });
      if (root.id === 'watch-rows') {
        root.querySelectorAll('.watch-price-trend').forEach(svg => queueChart(svg, `watch:${svg.getAttribute('aria-label')}`));
      } else if (root.id === 'research-results' || root.id === 'stock-detail') {
        const selector = root.id === 'stock-detail' ? '.history-price-chart, .financial-history-grid figure' : '.data-figure, .research-chart';
        root.querySelectorAll(selector).forEach(figure => {
          const heading = figure.querySelector('h2, h3')?.textContent || figure.getAttribute('aria-label') || figure.className.baseVal || figure.className;
          queueChart(figure, `${root.id}:${heading}`);
        });
      } else queueChart(root, root.id === 'chart' ? `price:${Number(root.dataset.observations) > 1 ? 'series' : 'point'}` : root.id);
    }
    let frame;
    new MutationObserver(records => {
      if (!records.some(record => record.type === 'attributes' || [...record.addedNodes].some(node => node.nodeType === 1))) return;
      if (frame) return;
      frame = requestAnimationFrame(() => { frame = null; scan(); });
    }).observe(root, { childList: true, subtree: true, ...(root.id === 'chart' ? { attributes: true, attributeFilter: ['d', 'data-observations'] } : {}) });
    scan();
  });
  // One decorative search rim. No query/results work or per-frame JS.
  const searchShells = [...document.querySelectorAll('.search-shell')];
  const searchVisible = new WeakMap();
  let searchPaused = false, searchDisposed = false;
  try { searchPaused = sessionStorage.getItem('stocklumo.motionPaused') === 'true'; } catch { /* Storage can be blocked; retain the in-memory preference. */ }
  function syncSearchMotion() {
    for (const shell of searchShells) shell.dataset.motion =
      !reduce.matches && !searchPaused && !searchDisposed && !document.hidden && searchVisible.get(shell) ? 'running' : 'paused';
  }
  if (searchShells.length && typeof IntersectionObserver !== 'undefined') {
    const searchViewport = new IntersectionObserver(entries => {
      for (const entry of entries) searchVisible.set(entry.target, entry.isIntersecting);
      syncSearchMotion();
    });
    searchShells.forEach(shell => searchViewport.observe(shell));
  } else searchShells.forEach(shell => searchVisible.set(shell, true));
  document.addEventListener('stocklumo:motionchange', event => { searchPaused = !!event.detail?.paused; syncSearchMotion(); });
  document.addEventListener('visibilitychange', syncSearchMotion);
  reduce.addEventListener?.('change', syncSearchMotion);
  window.addEventListener('pagehide', () => { searchDisposed = true; syncSearchMotion(); });
  window.addEventListener('pageshow', () => { searchDisposed = false; syncSearchMotion(); });
  syncSearchMotion();
  function stop() { running.forEach(animation => animation.cancel()); running.clear(); release(); }
  reduce.addEventListener?.('change', () => { if (reduce.matches) stop(); });
  document.addEventListener('visibilitychange', () => { if (document.hidden) stop(); });
  window.addEventListener('pagehide', stop);
})();
