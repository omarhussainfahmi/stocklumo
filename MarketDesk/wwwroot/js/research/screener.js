(() => {
  "use strict";
  if (location.pathname !== "/screener") return;
  const {$, math, controls, results, status, actions, introduction, field, select, button, get, read, save, node, fmt, table, change, stockLink, quoteTime, quoteDetail, metricDefinitions, distributionChart, bars} = window.StocklumoResearchPage.create();
  async function screener() {
    const preview = window.StocklumoPreviewReady ? await window.StocklumoPreviewReady : null;
    $("research-title").textContent = "Stock screener";
    introduction("Filter 12 selected US companies by price and fundamentals.",
      "Prices are USD; market cap is USD millions. Volume is the 10-day average in millions of shares, not today's volume. Industry follows Finnhub. Missing values fail numeric filters; this is not a market-wide screen.");
    const filters = {
      query: field("Company or ticker"),
      industry: select("Industry", [["", "All industries"]]),
      price: field("Min. price (USD)", "number"),
      changePercent: field("Min. day change (%)", "number"),
      marketCapMillions: field("Min. market cap (USD m)", "number"),
      averageVolumeMillions: field(
        "Min. 10-day avg volume (m)",
        "number",
      ),
      sort: select("Sort by", [
        ["symbol", "Symbol"],
        ["price", "Price"],
        ["changePercent", "Day change"],
        ["marketCapMillions", "Market cap"],
        ["averageVolumeMillions", "Average volume"],
      ]),
    };
    Object.values(filters).forEach((f) => {
      if (f.type === "number") f.step = "any";
    });
    filters.query.maxLength = math.screenerPreset.maxTextLength;
    const order = select("Order", [
      ["asc", "Ascending"],
      ["desc", "Descending"],
    ]);
    // Keep the same filter nodes and handlers; phones disclose the less-used
    // criteria instead of putting eight full-width fields above the matches.
    controls.classList.add("screener-controls");
    const advanced = node("details"), advancedSummary = node("summary", "More filters"), advancedFields = node("div");
    advanced.className = "advanced-filters";
    advancedFields.className = "filter-fields";
    const narrowFilters = window.matchMedia?.("(max-width: 600px)");
    advanced.open = !narrowFilters?.matches;
    narrowFilters?.addEventListener?.("change", event => { advanced.open = !event.matches; });
    advanced.append(advancedSummary, advancedFields);
    [filters.price, filters.changePercent, filters.marketCapMillions, filters.averageVolumeMillions, filters.sort, order]
      .forEach(input => advancedFields.append(input.closest("label")));
    controls.insertBefore(advanced, actions);
    let rows = [],
      failures = 0;
    let usingCaptured = false;
    const matching = node("p"), applied = node("div");
    matching.className = "results-summary caption";
    matching.setAttribute("role", "status");
    applied.className = "filter-chips";
    applied.setAttribute("aria-label", "Applied filters");
    results.before(matching, applied);
    const queryClear = window.StocklumoUI?.clearable(filters.query, { label: "Clear company filter", onClear: () => render() });
    const filterLabels = {
      query: "Company or ticker", industry: "Industry", price: "Min. price (USD)",
      changePercent: "Min. day change (%)", marketCapMillions: "Min. market cap (USD m)",
      averageVolumeMillions: "Min. 10-day avg volume (m)",
    };
    function renderAppliedFilters() {
      applied.replaceChildren();
      Object.entries(filterLabels).forEach(([key, label]) => {
        const input = filters[key];
        if (!input.value || (key === "industry" && usingCaptured)) return;
        const chip = node("button", `${label}: ${input.value}`), closeIcon = node("span");
        closeIcon.className = "close-icon"; closeIcon.setAttribute("aria-hidden", "true"); chip.append(closeIcon);
        chip.type = "button";
        chip.className = "filter-chip";
        chip.setAttribute("aria-label", `Remove ${label.toLowerCase()} filter: ${input.value}`);
        chip.onclick = () => {
          input.value = "";
          queryClear?.refresh();
          render();
          if (advanced.contains(input)) advanced.open = true;
          input.focus();
        };
        applied.append(chip);
      });
      applied.hidden = !applied.childElementCount;
    }
    function values() {
      return {
        ...Object.fromEntries(
          Object.entries(filters).map(([k, f]) => [k, f.value]),
        ),
        desc: order.value === "desc",
        industry: usingCaptured ? "" : filters.industry.value,
      };
    }
    let inspected = null;
    function render() {
      results.replaceChildren();
      const activeCriteria = [filters.price, filters.changePercent, filters.marketCapMillions, filters.averageVolumeMillions]
        .filter(input => input.value !== "").length;
      advancedSummary.textContent = activeCriteria ? `More filters · ${activeCriteria} active` : "More filters";
      const found = math.screen(rows.filter(r => r.currency === "USD"), values());
      matching.textContent = `${found.length} of ${rows.filter(r => r.currency === "USD").length} selected companies match.`;
      renderAppliedFilters();
      if (!found.length) { results.append(node("p", "No matches. Try resetting filters.")); return; }
      if (!found.some(r => r.symbol === inspected)) inspected = found[0].symbol;
      const workspace = node("div"), list = node("div"), inspector = node("aside");
      workspace.className = "screener-workspace"; list.className = "screener-list";
      inspector.className = "stock-inspector"; inspector.setAttribute("aria-label", "Company inspector");
      workspace.append(list, inspector); results.append(workspace);
      function inspect(ticker, focus = false, restorePoint = false) {
        inspected = ticker;
        const r = found.find(row => row.symbol === ticker);
        inspector.replaceChildren();
        const head = node("div"), title = node("h2", r.name || r.symbol), link = stockLink(r.symbol);
        head.className = "inspector-heading"; title.tabIndex = -1;
        head.append(title, link, node("span", r.industry || "Industry unavailable"));
        const quote = node("div"); quote.className = "inspector-quote";
        quote.append(node("strong", math.finite(r.price) ? `${fmt(r.price)} ${r.currency}` : "Unavailable"), change(r.changePercent), node("span", "% vs previous close"));
        inspector.append(head, quote, node("p", `Quote ${quoteTime(r.timestamp)}`));
        inspector.append(metricDefinitions([["Market cap (USD m)", fmt(r.marketCapMillions)], ["P/E TTM", fmt(r.peTtm)],
          ["Dividend yield TTM (%)", fmt(r.dividendYieldTtm)], ["10-day avg volume (m)", fmt(r.averageVolumeMillions)]]));
        const open = stockLink(r.symbol); open.textContent = "Open stock details "; open.className = "button-link";
        const arrow = node("span"); arrow.className = "direction-icon direction-right"; arrow.setAttribute("aria-hidden", "true");
        open.append(arrow); inspector.append(open);
        distributionChart(found, inspected, (ticker, restore) => inspect(ticker, false, restore), inspector);
        list.querySelectorAll("button[data-inspect]").forEach(b => {
          const active = b.dataset.inspect === ticker;
          b.setAttribute("aria-pressed", String(active)); b.closest("tr").classList.toggle("is-inspected", active);
        });
        if (focus && window.matchMedia("(max-width: 850px)").matches) { title.focus({ preventScroll: true }); inspector.scrollIntoView({ block: "start" }); }
        if (restorePoint) [...inspector.querySelectorAll(".distribution-point")].find(point => point.dataset.symbol === ticker)?.focus({ preventScroll: true });
      }
      table(["Company", "Price (USD)", "Day change (%)", "Industry", "Cap (USD m)", "10-day avg volume (m)", "Price timestamp"],
        found.map(r => {
          const company = node("div"), inspectButton = node("button", "Inspect");
          company.className = "company-cell";
          const name = node("small", r.name || r.symbol); name.title = r.name || r.symbol;
          company.append(stockLink(r.symbol), name, inspectButton);
          inspectButton.type = "button"; inspectButton.dataset.inspect = r.symbol;
          inspectButton.setAttribute("aria-label", `Inspect ${r.symbol}`); inspectButton.onclick = () => inspect(r.symbol, true);
          return [company, fmt(r.price), change(r.changePercent), r.industry || "Unavailable", fmt(r.marketCapMillions), fmt(r.averageVolumeMillions),
            r.timestamp ? new Date(r.timestamp * 1000).toLocaleString() : "Unavailable"];
        }), list, "Screened stocks, quotes and fundamentals");
      const ranking = node("details"); ranking.className = "ranking-details";
      ranking.append(node("summary", "Day-change ranking")); list.append(ranking);
      bars([...found].sort((a, b) => (math.finite(b.changePercent) ? b.changePercent : -Infinity) - (math.finite(a.changePercent) ? a.changePercent : -Infinity))
        .map(r => ({ symbol: r.symbol, value: r.changePercent, detail: quoteDetail(r) })),
        "Screened stocks · day change", "%", `${found.length} matches, ranked by day change. Table keeps your sort. Quote times vary.`, ranking);
      inspect(inspected);
    }
    Object.values(filters).forEach((f) => f.addEventListener("input", render));
    order.onchange = render;
    button("Reset filters", () => {
      Object.values(filters).forEach(
        (f) => (f.value = f === filters.sort ? "symbol" : ""),
      );
      order.value = "asc";
      queryClear?.refresh();
      render();
    });
    button("Save preset", () => {
      const preset = values();
      if (!math.validScreenerPreset(preset)) {
        status.textContent = "Preset not saved. Use filter text of 100 characters or fewer and a valid sort.";
        return;
      }
      if (save("stocklumo.screener", preset))
        status.textContent = "Preset saved.";
    });
    button("Load preset", () => {
      const saved = read("stocklumo.screener", null);
      if (!saved || typeof saved !== "object") {
        status.textContent = "No saved preset.";
        return;
      }
      Object.entries(filters).forEach(([k, f]) => {
        if (typeof saved[k] === "string") f.value = saved[k];
      });
      order.value = saved.desc === true ? "desc" : "asc";
      queryClear?.refresh();
      render();
    });
    const refresh = button("Refresh data", load);
    refresh.classList.add("primary");
    async function load() {
      refresh.disabled = true;
      try {
        rows = [];
        failures = 0;
        results.replaceChildren();
        const captured = preview?.screenerCount ? await get("/api/research-preview/screener") : null;
        if (Array.isArray(captured?.rows)) {
          usingCaptured = true;
          controls.classList.add("captured-screener-controls");
          rows = captured.rows;
          filters.industry.closest("label").hidden = true;
          $("research-description").textContent = `Filter ${rows.length} captured US matches. Local preview; not a live market-wide screen.`;
          $("research-notes").textContent = "Longbridge snapshot. Market cap is USD millions, verified against shares × price. Average volume is computed from 10 daily bars where captured; missing values fail numeric filters. Industry classification is not included.";
          status.textContent = `${rows.length} captured rows of ${captured.total.toLocaleString()} provider matches (price ≥ $1, ranked by cap). Filters and sorting cover these rows only.`;
          refresh.textContent = "Reload snapshot";
          render();
          return;
        }
        usingCaptured = false;
        controls.classList.remove("captured-screener-controls");
        filters.industry.closest("label").hidden = false;
        for (const symbol of [
          "AAPL",
          "MSFT",
          "NVDA",
          "AMZN",
          "GOOGL",
          "META",
          "TSLA",
          "JPM",
          "V",
          "WMT",
          "XOM",
          "JNJ",
        ]) {
          status.textContent = `Loading ${symbol} (${rows.length} loaded)...`;
          const row = await get("/api/research/stock/" + symbol);
          if (row.symbol && row.currency) rows.push(row);
          if (row.state !== "ok") failures++;
        }
        const selected = filters.industry.value;
        filters.industry.replaceChildren();
        ["", ...new Set(rows.map((r) => r.industry).filter(Boolean))].forEach(
          (value) => {
            const o = node("option", value || "All industries");
            o.value = value;
            filters.industry.append(o);
          },
        );
        filters.industry.value = selected;
        status.textContent = failures
          ? `${rows.length} companies; ${failures} with missing data. Retry in a minute if limited.`
          : `${rows.length} companies. Quotes cached 60s; fundamentals refresh less often.`;
        render();
      } finally {
        refresh.disabled = false;
      }
    }
    await load();
  }
  screener();
})();
