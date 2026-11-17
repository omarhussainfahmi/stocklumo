(() => {
  "use strict";
  if (location.pathname !== "/compare") return;
  const {$, math, controls, results, status, actions, setBusy, clearValidation, validationError, emptyState, introduction, field, button, get, symbols, node, fmt, table, change, stockLink, quoteDetail, comparisonMetrics, bars, plot} = window.StocklumoResearchPage.create();
  async function compare() {
    const preview = window.StocklumoPreviewReady ? await window.StocklumoPreviewReady : null;
    $("research-title").textContent = "Compare stocks";
    introduction("Compare 2-5 stocks using their latest quotes and fundamentals.",
      "Metrics use trailing 12 months (TTM); market cap is USD millions. Prices keep their currencies. Day changes use each stock's previous close, not historical returns.");
    controls.classList.add("comparison-controls");
    const input = field("Tickers (comma-separated)", "text", "AAPL, MSFT");
    input.maxLength = 80;
    const mode = node("div");
    mode.className = "comparison-mode";
    mode.append(node("span", "Data view"), node("strong", "Latest snapshot"));
    controls.insertBefore(mode, actions);
    const note = node("p", "Historical prices are unavailable with current Finnhub access.");
    note.id = "comparison-range-help";
    note.className = "comparison-range-help muted";
    controls.after(note);
    let historyRange;
    if (preview?.symbols?.length) {
      const label = node("label", "Historical range");
      historyRange = node("select");
      historyRange.setAttribute("aria-label", "Historical range");
      for (const [value, text] of [["snapshot", "Latest snapshot"], ["1M", "1 month"], ["6M", "6 months"], ["1Y", "1 year"]]) {
        const option = node("option", text); option.value = value; historyRange.append(option);
      }
      label.append(historyRange); mode.replaceChildren(label);
      note.textContent = `Local captured history: ${preview.symbols.join(", ")}. Other stocks retain snapshot comparison.`;
      historyRange.onchange = () => { if (hasResults) load(); };
    }
    let loading = false;
    let hasResults = false;
    const run = button("Compare", load);
    run.classList.add("primary");
    emptyState("Ready to compare", "Choose 2–5 tickers, then select Compare for quotes and fundamentals.");
    async function load() {
      if (loading) return;
      let items;
      try { items = symbols(input.value, 2, 5); }
      catch (e) { validationError(e.message, [input]); return; }
      clearValidation();
      setBusy(run, true);
      loading = true;
      results.replaceChildren();
      status.textContent = "Loading comparable metrics...";
      const rows = [];
      for (const symbol of items) rows.push(await get("/api/research/stock/" + symbol));
      table(
        ["Stock", "Price / currency", "Day change (%)", "Cap (USD m)", "P/E TTM", "Dividend yield TTM (%)", "Quote time"],
        rows.map((r, i) => [
          stockLink(items[i]), `${fmt(r.price)} ${r.currency || ""}`, change(r.changePercent),
          fmt(r.marketCapMillions), fmt(r.peTtm), fmt(r.dividendYieldTtm),
          r.timestamp ? new Date(r.timestamp * 1000).toLocaleString() : r.message || "Unavailable",
        ]),
        results,
        "Selected stocks: latest quotes and fundamentals",
      );
      comparisonMetrics(rows, items);
      bars(rows.map((r, i) => ({ symbol: items[i], value: r.changePercent, detail: quoteDetail({ ...r, symbol: items[i] }) })),
        "Selected stocks · day change", "%", "Day change in each stock's currency, not a historical return. Quote times vary.");
      if (historyRange && historyRange.value !== "snapshot") {
        const histories = await Promise.all(items.map(async symbol => {
          const response = await get(`/api/research-preview/chart/${symbol}?range=${historyRange.value}&adjusted=true`);
          return { name: symbol, points: response.state === "ok" ? math.candles(response.data) : [] };
        }));
        const normalized = math.normalize(histories);
        if (normalized.length === items.length) {
          plot(normalized, "Forward-adjusted price performance · first shared close = 100");
          const source = node("p", `Longbridge local snapshot captured ${preview.capturedAt}. Shared trading dates only; not modeled total return.`);
          source.className = "caption"; results.append(source);
        } else results.append(node("p", "Captured history does not cover every selected stock and range. Snapshot metrics remain above."));
      }
      status.textContent = rows.some((r) => r.state !== "ok")
        ? "Loaded with missing fields. Retry in a minute if limited."
        : "Comparison loaded. Check each quote time.";
      setBusy(run, false);
      loading = false;
      hasResults = true;
    }
  }
  compare();
})();
