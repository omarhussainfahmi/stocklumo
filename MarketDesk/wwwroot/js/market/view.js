(() => {
  "use strict";
  // Render supplied snapshots only; request/subscription/storage ownership stays in index.js.
  const $ = id => document.getElementById(id);
  const {element, number, price, signed, stamp, safeUrl, movement, svgElement, tickerClock} = window.StocklumoMarketFormat;
  const {create: companyMark} = window.StocklumoCompanyMarks;
  let rangeSignature = "", pulseSignature = "";
  const balanceSignatures = new WeakMap();
  /**
   * @typedef {Object} QuoteDisplay
   * @property {number|null} [price]
   * @property {number|null} [change]
   * @property {number|null} [changePercent]
   * @property {number|null} [open]
   * @property {number|null} [high]
   * @property {number|null} [low]
   * @property {number|null} [previousClose]
   * @property {string} [currency]
   * @property {string} [name]
   * @property {string} [updatedAt]
   */
  function renderBalance(container, stocks, label) {
    if (!container) return;
    container.hidden = !stocks.length;
    if (!stocks.length) return;
    const counts = window.StocklumoMath.breadth(stocks);
    const signature = JSON.stringify(counts);
    if (balanceSignatures.get(container) === signature) return;
    balanceSignatures.set(container, signature);
    const legend = element("div", undefined, "balance-legend");
    legend.append(element("strong", label));
    const svg = svgElement("svg", { viewBox: "0 0 400 8", preserveAspectRatio: "none", "aria-hidden": "true" });
    let offset = 0;
    for (const [key, text] of [["up", "up"], ["down", "down"], ["flat", "unchanged"], ["missing", "unavailable"]]) {
      legend.append(element("span", `${counts[key]} ${text}`, `balance-${key}`));
      if (counts[key]) {
        const width = counts[key] / stocks.length * 400;
        svg.append(svgElement("rect", { x: offset, y: 0, width, height: 8, class: `balance-${key}` }));
        offset += width;
      }
    }
    container.replaceChildren(legend, svg);
  }
  function renderPriceRanges(stock, annualRange, currency) {
    const ranges = [["Day range", stock.low, stock.high], ["52-week range", annualRange.low, annualRange.high]];
    const signature = JSON.stringify([stock.price, stock.updatedAt, ranges]);
    if (signature === rangeSignature) return;
    rangeSignature = signature;
    $("price-ranges").replaceChildren();
    for (const [label, low, high] of ranges) {
      const panel = element("section", undefined, "range-card"), heading = element("h2", label);
      panel.append(heading);
      const position = window.StocklumoMath.pricePosition(low, high, stock.price);
      if (!position) panel.append(element("p", "Range unavailable.", "muted"));
      else {
        const svg = svgElement("svg", { viewBox: "0 0 240 24", preserveAspectRatio: "none", role: "img", "aria-label": `${label}: ${price(low)} to ${price(high)} ${currency || ""}. Latest ${price(stock.price)}.${position.outside ? " Outside reported range." : ""}` });
        const track = "M8 12 H232";
        svg.append(svgElement("path", { d: track, class: "range-track" }),
          svgElement("path", { d: track, pathLength: 100, "stroke-dasharray": `${position.fraction * 100} 100`, class: "range-progress" }),
          svgElement("circle", { cx: 8 + position.fraction * 224, cy: 12, r: 5, class: "range-marker" }));
        const ends = element("div", undefined, "range-ends");
        ends.append(element("span", price(low)), element("span", price(high)));
        panel.append(svg, ends, element("p", position.outside ? "Latest price is outside this reported range." : position.flat ? "Provider reports a flat range." : "Latest quote within the reported range.", "caption"));
      }
      $("price-ranges").append(panel);
    }
  }
  function renderDefinitions(container, entries) {
    container.replaceChildren();
    for (const [label, value] of entries) {
      const group = element("div");
      group.append(element("dt", label), element("dd", value));
      container.append(group);
    }
  }
  /** @param {string[]} featuredSymbols @param {ReadonlyMap<string, QuoteDisplay>} prices */
  function renderMarketPulse(featuredSymbols, prices) {
    if (!$("market-pulse") || $("market-pulse").hidden) return;
    const stocks = featuredSymbols.map(ticker => prices.get(ticker));
    renderBalance($("pulse-breadth"), stocks, "Selection balance");
    $("summary-quotes").textContent = featuredSymbols.length ? `${stocks.filter(s => number(s?.price) && s.price > 0).length} / ${featuredSymbols.length}` : "-";
    // Equal weight within this selection, never a market-wide index or live-trade count.
    const changes = stocks.filter(s => number(s?.price) && s.price > 0 && number(s.changePercent)).map(s => s.changePercent);
    const average = changes.length ? changes.reduce((sum, value) => sum + value / changes.length, 0) : null;
    movement($("summary-change"), average, average === null ? "-" : `${signed(Math.round(average * 100) / 100)}%`);
    $("summary-change-note").textContent = changes.length
      ? `${changes.length} ${changes.length === 1 ? "stock" : "stocks"} · vs previous close` : "No usable quote changes";
    $("summary-change").title = "Equal-weight average of available spotlight day changes. Check each stock's quote time below; not a market index.";
    if (!featuredSymbols.length) {
      $("pulse-bars").replaceChildren(element("p", "No quotes available.", "muted"));
      return;
    }
    const signature = JSON.stringify(stocks.map(s => [s?.changePercent, s?.updatedAt]));
    if (signature === pulseSignature) return;
    pulseSignature = signature;
    const limit = Math.max(1, ...stocks.map(s => number(s?.changePercent) ? Math.abs(s.changePercent) : 0));
    $("pulse-bars").replaceChildren();
    featuredSymbols.forEach((ticker, index) => {
      const stock = stocks[index], value = stock?.changePercent;
      const row = element("div", undefined, "pulse-row");
      const link = element("a", ticker);
      link.href = `/stock/${ticker}`;
      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.setAttribute("viewBox", "0 0 200 32");
      svg.setAttribute("preserveAspectRatio", "none");
      svg.setAttribute("aria-hidden", "true");
      const axis = document.createElementNS(svg.namespaceURI, "line");
      axis.setAttribute("x1", "100"); axis.setAttribute("x2", "100");
      axis.setAttribute("y1", "0"); axis.setAttribute("y2", "32");
      svg.append(axis);
      const label = element("span", "Unavailable");
      if (number(value)) {
        const bar = document.createElementNS(svg.namespaceURI, "rect");
        const width = Math.abs(value) / limit * 95;
        bar.setAttribute("x", String(value < 0 ? 100 - width : 100));
        bar.setAttribute("y", "4"); bar.setAttribute("width", String(width));
        bar.setAttribute("height", "24");
        svg.classList.add(value < 0 ? "down" : "up");
        svg.append(bar);
        movement(label, value, `${signed(value)}%`);
      }
      row.title = stock?.updatedAt ? `Quote time: ${stamp(stock.updatedAt)}` : "No quote available";
      row.append(link, svg, label);
      $("pulse-bars").append(row);
    });
  }
  function news(container, result) {
    container.replaceChildren();
    if (result.state !== "ok") {
      container.append(element("p", result.message || "News is currently unavailable.", "empty-state muted"));
      return;
    }
    const articles = Array.isArray(result.data)
      ? result.data.filter((a) => a.headline && safeUrl(a.url)).slice(0, 8)
      : [];
    if (!articles.length) {
      container.append(element("p", "No recent news is available.", "empty-state muted"));
      return;
    }
    for (const article of articles) {
      const item = element("article", undefined, "news-item");
      const meta = element(
        "div",
        `${article.source || "Publisher"} · ${number(article.datetime) ? stamp(article.datetime * 1000) : "Date unavailable"}`,
        "news-meta",
      );
      const body = element("div");
      const title = element("h3");
      const link = element("a", article.headline);
      link.href = safeUrl(article.url);
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      title.append(link);
      body.append(title);
      if (article.summary)
        body.append(element("p", article.summary.slice(0, 500)));
      item.append(meta, body);
      container.append(item);
    }
  }
  function configureWorkspace(symbol) {
    const page = location.pathname;
    document.body.dataset.page = symbol ? "stock" : page === "/" ? "home" : page.slice(1);
    if (["/", "/markets"].includes(page)) {
      const workspace = element("div", undefined, "market-workspace");
      ($("market-content") || document.querySelector(".intro")).after(workspace);
      workspace.append($("market-pulse"), $(page === "/" ? "toolkit" : "discover"));
      if (page === "/markets") $("discover").before($("overview"));
      if (page === "/") workspace.before($("workspace-summary"));
    }
    if (page === "/") {
      const personal = element("div", undefined, "personal-workspace");
      $("watch-section").before(personal);
      personal.append($("watch-section"), $("recent-section"));
    }
    $("market-pulse").hidden = !["/", "/markets"].includes(page);
    $("workspace-summary").hidden = page !== "/";
    $("intro-actions").hidden = page !== "/";
    $("toolkit").hidden = page !== "/";
    const introductions = {
      "/watchlist": "Your saved companies and latest quotes.",
      "/news": "Market stories from the original publishers.",
      "/markets": "Explore US companies and their latest moves."
    };
    if (introductions[page]) $("intro-description").textContent = introductions[page];
    if (symbol) {
      $("overview").hidden = true;
      $("page-title").textContent = "Find your next perspective.";
      $("discover").hidden = true;
      $("news-section").hidden = true;
    } else if (page === "/watchlist") {
      $("page-title").textContent = "Your watchlist";
      $("overview").hidden = true;
      $("news-section").hidden = true;
    } else if (page === "/news") {
      $("page-title").textContent = "Market news";
      ["overview", "watch-section", "recent-section", "discover"].forEach(
        (id) => ($(id).hidden = true),
      );
    } else if (page === "/markets") {
      $("page-title").textContent = "Markets";
      $("watch-section").hidden = true;
    }
  }
  function renderCompany(profile, symbol) {
    $("save-stock").disabled = false;
    $("company").textContent = profile.name || symbol;
    const mark = companyMark(symbol, "company-mark");
    if (mark && $("company-mark")) {
      mark.id = "company-mark";
      $("company-mark").replaceWith(mark);
    }
    $("symbol").textContent = symbol;
    $("exchange").textContent = [profile.exchange, profile.country]
      .filter(Boolean)
      .join(" · ");
    $("currency").textContent = profile.currency || "";
    $("company-status").textContent = "Finnhub profile.";
    renderDefinitions($("company-info"), [
      ["Industry", profile.finnhubIndustry || "Unavailable"],
      ["Country", profile.country || "Unavailable"],
      ["Exchange", profile.exchange || "Unavailable"],
      ["Currency", profile.currency || "Unavailable"],
      ["IPO date", profile.ipo || "Unavailable"],
      [
        "Market cap",
        number(profile.marketCapitalization)
          ? `${price(profile.marketCapitalization)} million ${profile.currency || ""}`
          : "Unavailable",
      ],
    ]);
    const website = safeUrl(profile.weburl);
    if (website) {
      const link = element("a", "Company website ");
      const icon = element("span", "", "direction-icon direction-external");
      icon.setAttribute("aria-hidden", "true");
      link.append(icon);
      link.href = website;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      $("company-status").append(document.createTextNode(" "), link);
    }
  }
  function paintAge(row, item, age) {
    const label = row.querySelector(".age"), detail = age(item);
    if (row.classList.contains("ticker-stock") && item.updatedAt && Number.isFinite(Date.parse(item.updatedAt))) {
      label.textContent = `${detail.split("\n")[0]}\n${tickerClock.format(new Date(item.updatedAt))} UTC`;
      label.title = detail;
      label.setAttribute("aria-label", detail);
    } else label.textContent = detail;
  }
  /**
   * @param {Document|Element} host Existing rows to refresh without rebuilding controls.
   * @param {ReadonlyMap<string, QuoteDisplay>} prices
   * @param {(quote: QuoteDisplay) => string} age Feed-aware freshness text from the coordinator.
   */
  function refreshPriceRows(host, prices, age) {
    host.querySelectorAll("[data-price-symbol]").forEach((row) => {
      const item = prices.get(row.dataset.priceSymbol);
      if (!item) return;
      row.querySelector(".last").textContent =
        `${price(item.price)} ${item.currency || ""}`.trim();
      movement(
        row.querySelector(".delta"),
        item.changePercent,
        number(item.changePercent) ? `${signed(item.changePercent)}%` : "-",
      );
      paintAge(row, item, age);
    });
  }
  function renderRecent(recent) {
    $("summary-recent").textContent = String(recent.length);
    $("recent").replaceChildren();
    if (!recent.length)
      $("recent").append(
        element("p", "Stocks you open appear here.", "muted"),
      );
    for (const item of recent) {
      const link = element("a", item);
      link.href = `/stock/${item}`;
      $("recent").append(link);
    }
  }
  /**
   * @param {string[]} watch Ordered saved symbols.
   * @param {ReadonlyMap<string, QuoteDisplay>} prices
   * @param {{move: (symbol: string, index: number) => void, remove: (symbol: string, index: number) => void}} commands
   * Commands retain storage, focus restoration and subscription ownership in the coordinator.
   */
  function renderWatch(watch, prices, commands) {
    $("summary-watch").textContent = String(watch.length);
    $("watch-rows").replaceChildren();
    const attribution = $("watch-trend-source");
    if (attribution) { attribution.textContent = ""; attribution.hidden = true; }
    $("watch-empty").hidden = watch.length > 0;
    $("watch-table").hidden = !watch.length;
    $("watch-count").textContent =
      `${watch.length} / 20 · SAVED HERE`;
    watch.forEach((stockSymbol, index) => {
      const row = element("tr");
      row.dataset.priceSymbol = stockSymbol;
      const company = element("td");
      const link = element("a", stockSymbol);
      link.href = `/stock/${stockSymbol}`;
      const mark = companyMark(stockSymbol, "stock-mark");
      if (mark) link.prepend(mark);
      company.append(link);
      const trend = element("span", undefined, "watch-trend-host");
      company.append(trend);
      const name = prices.get(stockSymbol)?.name;
      if (name) company.append(element("small", name));
      row.append(
        company,
        element("td", "-", "last"),
        element("td", "-", "delta"),
        element("td", "Unavailable", "age"),
      );
      const actions = element("td");
      const up = element("button");
      const upIcon = element("span", "", "direction-icon direction-up");
      upIcon.setAttribute("aria-hidden", "true");
      up.append(upIcon);
      up.type = "button";
      up.disabled = index === 0;
      up.setAttribute("aria-label", `Move ${stockSymbol} up`);
      up.onclick = () => commands.move(stockSymbol, index);
      const remove = element("button", "Remove");
      remove.className = "danger-action";
      remove.type = "button";
      remove.setAttribute("aria-label", `Remove ${stockSymbol} from watchlist`);
      remove.onclick = () => commands.remove(stockSymbol, index);
      actions.append(up, remove);
      row.append(actions);
      $("watch-rows").append(row);
      window.StocklumoPreviewWatch?.render(stockSymbol, trend, $("watch-trend-source"));
    });
  }
  /**
   * @param {QuoteDisplay} item
   * @param {{low?: number, high?: number}} annualRange
   * @param {string|undefined} currency
   * @param {string} ageText Already evaluated using the active feed clock/state.
   */
  function renderQuote(item, annualRange, currency, ageText) {
    renderPriceRanges(item, annualRange, currency);
    $("price").textContent = price(item.price);
    movement(
      $("change"),
      item.change,
      number(item.change)
        ? `${signed(item.change)} (${signed(item.changePercent)}%) vs previous close`
        : "Previous close unavailable",
    );
    $("data-age").textContent = item.updatedAt
      ? ageText
      : "No price received";
    const stats = [
      ["Open", price(item.open)],
      ["Day high", price(item.high)],
      ["Day low", price(item.low)],
      ["Previous close", price(item.previousClose)],
    ];
    renderDefinitions($("stats"), stats);
  }
  /** DOM rendering consumes explicit quote/profile inputs and never fetches data. */
  window.StocklumoMarketView = Object.freeze({renderBalance,
    renderMarketPulse, news, configureWorkspace, renderCompany,
    refreshPriceRows, renderRecent, renderWatch, renderQuote,
    resetPulse() { pulseSignature = ""; }});
})();
