(() => {
  "use strict";
  let theme = matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  try { const saved = localStorage.getItem("stocklumo.theme"); if (["light", "dark"].includes(saved)) theme = saved; } catch {}
  const toggle = document.getElementById("theme");
  function applyTheme() {
    document.documentElement.dataset.theme = theme;
    if (toggle) toggle.textContent = theme === "dark" ? "Light mode" : "Dark mode";
  }
  applyTheme();
  if (toggle) toggle.onclick = () => {
    theme = theme === "dark" ? "light" : "dark"; applyTheme();
    try { localStorage.setItem("stocklumo.theme", theme); } catch {}
  };
  document.querySelectorAll("nav a").forEach(link => {
    if (link.getAttribute("href") === location.pathname) link.setAttribute("aria-current", "page");
  });
  const header = document.querySelector(".header");
  if (header && typeof ResizeObserver !== "undefined") {
    new ResizeObserver(() => document.documentElement.style.setProperty("--header-offset", `${Math.ceil(header.getBoundingClientRect().height) + 16}px`)).observe(header);
  }
  const mobileAction = document.querySelector(".mobile-action");
  if (mobileAction) mobileAction.hidden = location.pathname !== "/";

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
    opener = event?.currentTarget; panel.hidden = false; close.hidden = !consent;
    document.getElementById("privacy-title").focus();
  }
  function choose(analytics) {
    consent = { version: 1, analytics, at: Date.now() };
    let persisted = true;
    try { localStorage.setItem(key, JSON.stringify(consent)); } catch { persisted = false; }
    update();
    if (!analytics && beaconStarted) { location.reload(); return; }
    startAnalytics();
    if (persisted) { panel.hidden = true; opener?.focus(); }
    else { feedback.textContent = "Choice applies to this visit only: browser storage is unavailable."; close.hidden = false; }
  }
  accept.onclick = () => choose(true); reject.onclick = () => choose(false);
  close.onclick = () => { panel.hidden = true; opener?.focus(); };
  document.querySelectorAll("[data-privacy-open]").forEach(button => button.addEventListener("click", open));
  window.addEventListener("storage", event => {
    if (event.key !== key && event.key !== null) return;
    consent = readChoice(); update();
    if (!consent?.analytics && beaconStarted) location.reload(); else startAnalytics();
    panel.hidden = !!consent;
  });
  panel.hidden = !!consent; update(); startAnalytics();
})();
