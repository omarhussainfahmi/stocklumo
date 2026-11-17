(() => {
  "use strict";
  // Canonical adornment for remote stock search and local research filters.
  // Domain owners retain query cancellation, filtering and result semantics.
  window.StocklumoUI = Object.freeze({
    clearable(input, { label = 'Clear search', onClear } = {}) {
      const frame = document.createElement('span'), clear = document.createElement('button'), icon = document.createElement('span');
      frame.className = 'clearable-field'; clear.className = 'clear-input'; clear.type = 'button';
      clear.setAttribute('aria-label', label); clear.title = label; icon.className = 'close-icon'; icon.setAttribute('aria-hidden', 'true');
      clear.append(icon); input.before(frame); frame.append(input, clear);
      function refresh() { clear.hidden = !input.value; }
      input.addEventListener('input', refresh);
      clear.addEventListener('click', () => {
        input.value = ''; refresh(); input.focus();
        if (onClear) onClear(); else input.dispatchEvent(new Event('input', { bubbles: true }));
      });
      refresh(); return { refresh };
    },
    guardUnsaved(isDirty) {
      const dialog = document.createElement('dialog'), title = document.createElement('h2'), copy = document.createElement('p'), actions = document.createElement('div');
      const keep = document.createElement('button'), leave = document.createElement('button');
      dialog.className = 'unsaved-dialog'; title.id = 'unsaved-title'; title.textContent = 'Leave without saving?';
      copy.textContent = 'Your holding has not been saved. Keep editing or discard these changes.';
      dialog.setAttribute('aria-labelledby', title.id); actions.className = 'dialog-actions';
      keep.type = leave.type = 'button'; keep.textContent = 'Keep editing'; keep.className = 'primary';
      leave.textContent = 'Discard changes'; leave.className = 'danger-action';
      actions.append(keep, leave); dialog.append(title, copy, actions); document.body.append(dialog);
      let destination, opener, leaving = false;
      keep.addEventListener('click', () => dialog.close());
      dialog.addEventListener('close', () => { if (!leaving) opener?.focus({ preventScroll: true }); });
      leave.addEventListener('click', () => { leaving = true; dialog.close(); location.assign(destination); });
      document.addEventListener('click', event => {
        const link = event.target?.closest?.('a[href]');
        if (!link || event.defaultPrevented || event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey ||
            link.hasAttribute('download') || (link.target && link.target !== '_self') || document.body.classList.contains('privacy-open') || !isDirty()) return;
        const url = new URL(link.href, location.href);
        if (!['https:', 'http:'].includes(url.protocol) || (url.pathname === location.pathname && url.search === location.search && url.origin === location.origin)) return;
        // Native beforeunload remains the fallback when dialog is unsupported.
        if (typeof dialog.showModal !== 'function') return;
        event.preventDefault(); if (dialog.open) return;
        // Safari touch activation need not focus the clicked link first.
        destination = url.href; opener = link; dialog.showModal(); keep.focus();
      });
      window.addEventListener('beforeunload', event => { if (!leaving && isDirty()) { event.preventDefault(); event.returnValue = ''; } });
    }
  });
  let theme = matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  try { const saved = localStorage.getItem("stocklumo.theme"); if (["light", "dark"].includes(saved)) theme = saved; } catch { /* Storage can be blocked; retain the in-memory preference. */ }
  const toggle = document.getElementById("theme");
  function applyTheme() {
    document.documentElement.dataset.theme = theme;
    if (toggle) {
      let track = toggle.querySelector('.theme-track');
      const label = theme === "dark" ? "Light mode" : "Dark mode";
      if (!track) {
        track = document.createElement('span'); track.className = 'theme-track'; track.setAttribute('aria-hidden', 'true');
        toggle.replaceChildren(track, document.createTextNode(label));
      } else toggle.lastChild.nodeValue = label;
    }
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#061f37' : '#ffffff');
  }
  applyTheme();
  if (toggle) toggle.onclick = () => {
    theme = theme === "dark" ? "light" : "dark"; applyTheme();
    try { localStorage.setItem("stocklumo.theme", theme); } catch { /* Storage can be blocked; retain the in-memory preference. */ }
  };
  document.querySelectorAll("nav a").forEach(link => {
    if (link.getAttribute("href") === location.pathname) link.setAttribute("aria-current", "page");
  });
  const header = document.querySelector(".header");
  const navigation = document.getElementById("site-navigation"), navigationToggle = document.getElementById("navigation-toggle");
  if (header && navigation && navigationToggle) {
    const compact = matchMedia("(max-width: 600px), (max-width: 1100px) and (max-height: 500px)");
    function closeNavigation(returnFocus = false) {
      header.dataset.navOpen = "false"; navigationToggle.setAttribute("aria-expanded", "false");
      navigationToggle.textContent = 'Menu';
      if (returnFocus) navigationToggle.focus();
    }
    function resizeNavigation() {
      navigationToggle.hidden = !compact.matches;
      const focusedLink = navigation.contains(document.activeElement);
      closeNavigation(compact.matches && focusedLink);
    }
    header.dataset.navReady = "true";
    document.body.classList.add("navigation-ready");
    navigationToggle.onclick = () => {
      const open = header.dataset.navOpen !== "true";
      header.dataset.navOpen = String(open); navigationToggle.setAttribute("aria-expanded", String(open));
      navigationToggle.textContent = open ? 'Close menu' : 'Menu';
      if (open) navigation.querySelector("a")?.focus();
    };
    header.addEventListener("keydown", event => {
      if (event.key === "Escape" && header.dataset.navOpen === "true") { closeNavigation(true); event.preventDefault(); }
    });
    header.addEventListener("focusout", event => { if (event.relatedTarget && !header.contains(event.relatedTarget)) closeNavigation(); });
    document.addEventListener("pointerdown", event => { if (!header.contains(event.target)) closeNavigation(); });
    navigation.addEventListener("click", event => { if (event.target.closest("a")) closeNavigation(); });
    if (compact.addEventListener) compact.addEventListener("change", resizeNavigation);
    resizeNavigation();
  }
  if (header && typeof ResizeObserver !== "undefined") {
    new ResizeObserver(() => document.documentElement.style.setProperty("--header-offset", `${Math.ceil(header.getBoundingClientRect().height) + 16}px`)).observe(header);
  }
  const mobileAction = document.querySelector(".mobile-action");
  if (mobileAction) {
    mobileAction.hidden = location.pathname !== "/";
    const introActions = document.querySelector("#intro-actions .primary");
    if (location.pathname === "/" && introActions && typeof IntersectionObserver !== "undefined") {
      let visible = false, actionObserver;
      function updateAction() {
        const editing = document.activeElement?.matches('input, textarea, select, [contenteditable="true"]');
        mobileAction.hidden = visible || editing || header?.dataset.navOpen === 'true';
      }
      function observeAction() {
        actionObserver?.disconnect();
        const headerHeight = Math.ceil(header?.getBoundingClientRect().height || 0);
        actionObserver = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting && entry.intersectionRatio >= .95; updateAction(); },
          { rootMargin: `-${headerHeight}px 0px 0px`, threshold: [.95] });
        actionObserver.observe(introActions);
      }
      observeAction();
      if (header && typeof ResizeObserver !== 'undefined') new ResizeObserver(observeAction).observe(header);
      document.addEventListener('focusin', updateAction); document.addEventListener('focusout', () => queueMicrotask(updateAction));
      if (header) new MutationObserver(updateAction).observe(header, { attributes: true, attributeFilter: ['data-nav-open'] });
    }
  }

  if (window.visualViewport) {
    const viewportSize = () => document.documentElement.style.setProperty('--visual-height', `${Math.round(window.visualViewport.height)}px`);
    viewportSize(); window.visualViewport.addEventListener('resize', viewportSize, { passive: true });
  }
  const searchInput = document.getElementById('search'), searchResults = document.getElementById('search-results');
  if (searchInput && searchResults) {
    const wrapper = searchInput.closest('.search');
    let placementFrame = 0, revealInput = false;
    function placeSearch() {
      placementFrame = 0;
      if (document.activeElement !== searchInput && searchResults.hidden) return;
      const viewport = window.visualViewport;
      const top = Math.max(header?.getBoundingClientRect().bottom || 0, viewport?.offsetTop || 0);
      const bottom = (viewport?.offsetTop || 0) + (viewport?.height || innerHeight);
      let input = searchInput.getBoundingClientRect();
      // A keyboard/orientation change can leave WebKit's focused control outside
      // the visible viewport. Reveal it once, without fighting ordinary scrolling.
      if (revealInput && document.activeElement === searchInput && (input.top < top + 8 || input.bottom > bottom - 8)) {
        window.scrollBy({ top: input.top - (top + Math.max(8, (bottom - top - input.height) / 2)), behavior: 'instant' });
        input = searchInput.getBoundingClientRect();
      }
      revealInput = false;
      const box = wrapper.getBoundingClientRect();
      const below = bottom - input.bottom - 12, above = input.top - top - 12;
      const useAbove = below < 120 && above > below;
      wrapper.dataset.placement = useAbove ? 'above' : 'below';
      wrapper.style.setProperty('--search-space', `${Math.max(44, Math.min(350, useAbove ? above : below))}px`);
      wrapper.style.setProperty('--search-menu-top', `${input.bottom - box.top + 8}px`);
      wrapper.style.setProperty('--search-menu-bottom', `${box.bottom - input.top + 8}px`);
    }
    function schedulePlacement() {
      if (!placementFrame && (document.activeElement === searchInput || !searchResults.hidden)) placementFrame = requestAnimationFrame(placeSearch);
    }
    function revealSearch() { revealInput = true; schedulePlacement(); }
    searchInput.addEventListener('focus', revealSearch); searchInput.addEventListener('input', revealSearch);
    window.visualViewport?.addEventListener('resize', revealSearch, { passive: true });
    window.visualViewport?.addEventListener('scroll', schedulePlacement, { passive: true });
    window.addEventListener('scroll', schedulePlacement, { passive: true });
    new MutationObserver(placeSearch).observe(searchResults, { attributes: true, attributeFilter: ['hidden'] });
    if (typeof ResizeObserver !== 'undefined') new ResizeObserver(schedulePlacement).observe(wrapper);
  }

  const panel = document.getElementById("privacy-panel");
  if (!panel) return;
  const feedback = document.getElementById("privacy-feedback"), choice = document.getElementById("analytics-choice");
  const accept = document.getElementById("privacy-accept"), reject = document.getElementById("privacy-reject"), close = document.getElementById("privacy-close");
  const token = document.querySelector('meta[name="stocklumo-analytics"]')?.content;
  const configured = typeof token === "string" && /^[a-f0-9]{32}$/.test(token);
  const browserBlocks = navigator.globalPrivacyControl === true || navigator.doNotTrack === "1";
  const key = "stocklumo.privacy";
  function readChoice() {
    try {
      const value = JSON.parse(localStorage.getItem(key));
      return value?.version === 1 && typeof value.analytics === "boolean" && Number.isFinite(value.at) &&
        value.at <= Date.now() && Date.now() - value.at < 180 * 86400000 ? value : null;
    } catch { return null; }
  }
  let consent = readChoice(), beaconStarted = false, opener;
  const backdrop = document.createElement("div");
  backdrop.className = "privacy-backdrop"; backdrop.hidden = true;
  backdrop.setAttribute("aria-hidden", "true");
  document.body.append(backdrop);
  const suspended = new Set();
  function showPrivacy(visible) {
    panel.hidden = !visible; backdrop.hidden = !visible;
    document.body.classList.toggle("privacy-open", visible);
    if (visible) {
      // Preserve any pre-existing inert state outside this shared body-level dialog.
      for (const node of document.body.children) {
        if (node === panel || node === backdrop || node.contains(panel) || node.inert) continue;
        node.inert = true; suspended.add(node);
      }
      document.getElementById("privacy-title").focus();
    } else {
      suspended.forEach(node => { node.inert = false; }); suspended.clear();
      opener?.focus();
    }
  }
  panel.addEventListener("keydown", event => {
    if (event.key === "Escape") { event.preventDefault(); showPrivacy(false); return; }
    if (event.key !== "Tab") return;
    const controls = [...panel.querySelectorAll("a[href], button:not([disabled])")].filter(node => !node.hidden);
    const first = controls[0], last = controls.at(-1);
    if (event.shiftKey && (document.activeElement === first || document.activeElement.id === "privacy-title")) {
      event.preventDefault(); last?.focus();
    } else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
  });
  function update() {
    if (choice) choice.textContent = browserBlocks ? "Analytics is off: your browser requests no tracking." : consent?.analytics
      ? configured ? "Optional Cloudflare analytics is allowed." : "Analytics is allowed, but is not configured on this server."
      : "Optional analytics is off.";
  }
  function startAnalytics() {
    if (beaconStarted || !configured || browserBlocks || !consent?.analytics || !["stocklumo.onrender.com"].includes(location.hostname)) return;
    const script = document.createElement("script");
    script.src = "https://static.cloudflareinsights.com/beacon.min.js"; script.type = "module";
    script.dataset.cfBeacon = JSON.stringify({ token, spa: false });
    script.id = "cloudflare-analytics";
    document.head.append(script); beaconStarted = true;
  }
  function open(event) {
    opener = event?.currentTarget; close.hidden = false; showPrivacy(true);
  }
  function choose(analytics) {
    consent = { version: 1, analytics, at: Date.now() };
    let persisted = true;
    try { localStorage.setItem(key, JSON.stringify(consent)); } catch { persisted = false; }
    update();
    if (!analytics && beaconStarted) { location.reload(); return; }
    startAnalytics();
    if (persisted) { showPrivacy(false); }
    else { feedback.textContent = "Choice applies to this visit only: browser storage is unavailable."; close.hidden = false; }
  }
  accept.onclick = () => choose(true); reject.onclick = () => choose(false);
  close.onclick = () => showPrivacy(false);
  document.querySelectorAll("[data-privacy-open]").forEach(button => button.addEventListener("click", open));
  window.addEventListener("storage", event => {
    if (event.key !== key && event.key !== null) return;
    consent = readChoice(); update();
    if (!consent?.analytics && beaconStarted) location.reload(); else startAnalytics();
    showPrivacy(!consent);
  });
  showPrivacy(!consent); update(); startAnalytics();
})();
