(() => {
  "use strict";
  const {element, validSymbol} = window.StocklumoMarketFormat;
  /** Owns pending queries, IME composition and result focus; get returns the API envelope. */
  function create({get}) {
    const $ = id => document.getElementById(id);
    let searchAbort, searchTimer, searchDismissed = false;
    function dismissSearch(returnFocus = false) {
      searchDismissed = true;
      clearTimeout(searchTimer);
      searchAbort?.abort();
      $("search-results").hidden = true;
      $("search-status").textContent = "";
      if (returnFocus) $("search").focus();
    }
    const searchBox = $("search").closest(".search");
    searchBox.addEventListener("focusout", event => {
      if (event.relatedTarget && !searchBox.contains(event.relatedTarget)) dismissSearch();
    });
    document.addEventListener("pointerdown", event => { if (!searchBox.contains(event.target)) dismissSearch(); });
    $("search").setAttribute("aria-describedby", "search-status");
    let searchComposing = false;
    const clearSearch = window.StocklumoUI?.clearable($("search"), { label: 'Clear stock search' });
    function scheduleSearch() {
      clearSearch?.refresh();
      searchDismissed = false;
      clearTimeout(searchTimer);
      searchAbort?.abort();
      $("search-results").replaceChildren();
      $("search-results").hidden = true;
      if (searchComposing) { $("search-status").textContent = ""; return; }
      const query = $("search").value.trim();
      if (!query) {
        $("search-status").textContent = "";
        return;
      }
      $("search-status").textContent = "Searching…";
      searchAbort = new AbortController();
      const signal = searchAbort.signal;
      searchTimer = setTimeout(async () => {
        try {
          const result = await get(
            "/api/data/search?q=" + encodeURIComponent(query),
            signal,
          );
          if (signal.aborted || searchDismissed) return;
          const matches =
            result.state === "ok" && Array.isArray(result.data?.result)
              ? result.data.result
                  .filter(
                    (item) =>
                      validSymbol(item.symbol) &&
                      ["Common Stock", "ADR", "REIT"].includes(item.type),
                  )
                  .slice(0, 10)
              : [];
          $("search-status").textContent =
            result.state !== "ok"
              ? result.message
              : matches.length
                ? `${matches.length} results. Select a stock.`
                : "No stocks found.";
          for (const item of matches) {
            const li = element("li");
            const link = element("a", `${item.symbol} - ${item.description}`);
            link.href = `/stock/${item.symbol}`;
            link.append(element("span", item.type));
            li.append(link);
            $("search-results").append(li);
          }
          $("search-results").hidden = !matches.length;
        } catch (error) {
          if (error.name !== "AbortError")
            $("search-status").textContent = "Search is temporarily unavailable.";
        }
      }, 300);
    }
    $("search").addEventListener("compositionstart", () => { searchComposing = true; dismissSearch(); });
    $("search").addEventListener("compositionend", () => { searchComposing = false; scheduleSearch(); });
    $("search").addEventListener("input", scheduleSearch);
    $("search").addEventListener("keydown", (event) => {
      if (searchComposing || event.isComposing || event.keyCode === 229) return;
      if (event.key === "Escape") {
        dismissSearch();
      }
      if (event.key === "ArrowDown") {
        if (!$("search-results").hidden) $("search-results").querySelector("a")?.focus();
        event.preventDefault();
      }
    });
    $("search-results").addEventListener("keydown", event => {
      const links = [...$("search-results").querySelectorAll("a")], index = links.indexOf(document.activeElement);
      if (event.key === "Escape") { dismissSearch(true); event.preventDefault(); }
      else if (index >= 0 && ["ArrowUp", "ArrowDown", "Home", "End"].includes(event.key)) {
        if (event.key === "ArrowUp" && index === 0) $("search").focus();
        else links[event.key === "Home" ? 0 : event.key === "End" ? links.length - 1 : Math.max(0, Math.min(links.length - 1, index + (event.key === "ArrowDown" ? 1 : -1)))]?.focus();
        event.preventDefault();
      }
    });
    return Object.freeze({dismiss: dismissSearch});
  }
  window.StocklumoStockSearch = Object.freeze({create});
})();
