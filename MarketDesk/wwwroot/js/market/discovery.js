(() => {
  "use strict";
  const {element, number, price, tickerClock} = window.StocklumoMarketFormat;
  /** Owns catalog expansion, visibility, one-shot reads and explicit retries.
   * readQuote returns an existing shared quote; this component never subscribes stocks.
   */
  function create({get, readQuote, now, isPageActive}) {
    const $ = id => document.getElementById(id);
    const discoveryLinks = [...$("explore-grid").querySelectorAll("a")];
    const discoveryQuotes = new Map(), discoveryAttempted = new Set();
    let discoveryExpanded = false, discoveryBusy = false, discoveryReady = false,
      discoveryVisible = false, discoveryIssue = "", discoverySignature = "";
    function discoveryQuote(ticker) {
      const candidates = [readQuote(ticker), discoveryQuotes.get(ticker)].filter(item =>
        item && (!item.currency || item.currency === "USD") && number(item.price) && item.price > 0 &&
        Number.isFinite(Date.parse(item.updatedAt)) && Date.parse(item.updatedAt) <= now() + 60000);
      return candidates.sort((a, b) => Date.parse(b.updatedAt) - Date.parse(a.updatedAt))[0];
    }
    function renderDiscovery() {
      const section = $("discover"), grid = $("explore-grid"), note = $("discover-status");
      if (!section || section.hidden || !note) return;
      // Preserve the active stock link while quotes update; reorder on focus exit.
      if (grid.contains(document.activeElement)) return;
      const visible = discoveryLinks.filter(link => discoveryExpanded || !link.classList.contains("explore-extra"));
      const entries = visible.map(link => ({ link, ticker: link.querySelector("strong").textContent, quote: discoveryQuote(link.querySelector("strong").textContent) }));
      entries.sort((a, b) => (b.quote?.price ?? -Infinity) - (a.quote?.price ?? -Infinity) || a.ticker.localeCompare(b.ticker));
      const signature = JSON.stringify([discoveryExpanded, discoveryBusy, discoveryIssue, entries.map(e => [e.ticker, e.quote?.price, e.quote?.updatedAt])]);
      if (signature === discoverySignature) return;
      discoverySignature = signature;
      let rank = 0;
      for (const { link, quote: item } of entries) {
        let value = link.querySelector(".discovery-price"), position = link.querySelector(".discovery-rank"), time = link.querySelector("time");
        if (!value) {
          position = element("span", "", "discovery-rank"); position.setAttribute("aria-hidden", "true");
          value = element("span", "", "discovery-price"); time = element("time", "", "discovery-time");
          link.querySelector("span").classList.add("discovery-name"); link.prepend(position); link.append(value, time);
        }
        position.textContent = item ? String(++rank).padStart(2, "0") : "-";
        value.textContent = item ? `${price(item.price)} USD` : discoveryAttempted.has(link.querySelector("strong").textContent) ? "Price unavailable" : discoveryBusy ? "Loading…" : "Not loaded";
        time.hidden = !item;
        if (item) { time.dateTime = item.updatedAt; time.textContent = `${tickerClock.format(new Date(item.updatedAt))} UTC`; }
        const ticker = link.querySelector("strong").textContent;
        link.setAttribute("aria-label", `${item ? `Rank ${rank}. ` : "Unranked. "}${ticker}. ${link.querySelector(".discovery-name").textContent}. ${value.textContent}${item ? `. Quote ${item.updatedAt}` : ""}`);
        link.hidden = false;
      }
      const hidden = discoveryLinks.filter(link => !visible.includes(link));
      hidden.forEach(link => link.hidden = true);
      grid.append(...entries.map(e => e.link), ...hidden);
      const message = `${rank} of ${visible.length} priced · This list only.${discoveryBusy ? " Loading prices…" : discoveryIssue ? ` ${discoveryIssue}` : ""}`;
      if (note.textContent !== message) note.textContent = message;
      grid.setAttribute("aria-busy", String(discoveryBusy));
      const retry = $("discovery-retry");
      if (discoveryIssue) retry.hidden = false;
      else if (!discoveryBusy) retry.hidden = true;
      retry.disabled = discoveryBusy;
    }
    async function loadDiscovery() {
      if (!discoveryReady || !discoveryVisible || discoveryBusy || !isPageActive() || $("discover").hidden) return;
      const retryFocused = document.activeElement === $("discovery-retry");
      discoveryBusy = true; discoveryIssue = ""; renderDiscovery();
      try {
        // One request at a time, once per visible catalog entry. Reuse the existing
        // feed; never subscribe these extra stocks or poll the catalog repeatedly.
        for (const link of discoveryLinks) {
          if (!isPageActive() || document.hidden || !discoveryVisible) break;
          if (!discoveryExpanded && link.classList.contains("explore-extra")) continue;
          const ticker = link.querySelector("strong").textContent;
          if (discoveryQuote(ticker) || discoveryAttempted.has(ticker)) continue;
          const result = await get(`/api/data/stock/${encodeURIComponent(ticker)}/quote`);
          if (!isPageActive()) break;
          if (["limited", "setup", "error"].includes(result.state)) {
            discoveryIssue = result.state === "limited" ? "Price limit reached. Retry shortly." : "Prices could not load. Try again.";
            break;
          }
          discoveryAttempted.add(ticker);
          const q = result.data;
          if (result.state === "ok" && number(q?.c) && q.c > 0 && number(q.t) && q.t > 0 && q.t * 1000 <= now() + 60000 && q.t <= 253402300799)
            discoveryQuotes.set(ticker, { price: q.c, currency: "USD", updatedAt: new Date(q.t * 1000).toISOString() });
          renderDiscovery();
        }
      } finally {
        discoveryBusy = false; renderDiscovery();
        if (retryFocused && isPageActive()) ($("discovery-retry").hidden ? $("more-stocks") : $("discovery-retry")).focus({ preventScroll: true });
      }
    }
    function initializeDiscovery() {
      $("more-stocks").onclick = () => {
        discoveryVisible = true;
        discoveryExpanded = !discoveryExpanded;
        $("more-stocks").setAttribute("aria-expanded", String(discoveryExpanded));
        $("more-stocks").textContent = discoveryExpanded ? "Fewer stocks" : "More stocks";
        renderDiscovery(); loadDiscovery();
      };
      $("discovery-retry")?.addEventListener("click", () => { discoveryAttempted.clear(); loadDiscovery(); });
      $("explore-grid").addEventListener("focusout", () => setTimeout(renderDiscovery, 0));
      if (typeof IntersectionObserver !== "undefined") {
        const observer = new IntersectionObserver(([entry]) => { discoveryVisible = entry.isIntersecting; if (discoveryVisible) loadDiscovery(); });
        observer.observe($("discover"));
        window.addEventListener("pagehide", () => observer.disconnect(), { once: true });
      } else discoveryVisible = true;
    }
    initializeDiscovery();
    return Object.freeze({render: renderDiscovery,
      setReady() { discoveryReady = true; loadDiscovery(); }});
  }
  window.StocklumoDiscovery = Object.freeze({create});
})();
