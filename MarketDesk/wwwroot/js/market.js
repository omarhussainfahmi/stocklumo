(() => {
  "use strict";
  const $ = (id) => document.getElementById(id);
  const symbol = document.body.dataset.symbol;
  const validSymbol = (value) =>
    typeof value === "string" && /^[A-Z][A-Z0-9.-]{0,14}$/.test(value);
  const prices = new Map();
  const verifiedSymbols = new Set();
  const history = [];
  const spotlightSymbols = new Set();
  const tickerSymbols = ["AAPL", "MSFT", "AMZN", "GOOGL", "META", "TSLA", "V", "NVDA"];
  const companyMarks = { AAPL: "apple", MSFT: "microsoft", AMZN: "amazon", GOOG: "google", GOOGL: "google", META: "meta", NVDA: "nvidia", TSLA: "tesla", V: "visa" };
  const profileMarks = new Map();
  function providerMark(value) {
    if (typeof value !== "string") return null;
    try {
      const url = new URL(value);
      return ["https://static2.finnhub.io", "https://static9.finnhub.io"].includes(url.origin) && !url.username && !url.password && !url.search && !url.hash &&
        /^\/file\/publicdatany\/finnhubimage\/stock_logo\/[A-Za-z0-9_-][A-Za-z0-9_.-]*\.(png|jpe?g|webp)$/i.test(url.pathname) ? `/api/data/company-logo/${encodeURIComponent(url.pathname.split("/").pop())}` : null;
    } catch { return null; }
  }
  function paintCompanyMark(mark, ticker) {
    const local = Object.hasOwn(companyMarks, ticker) ? `/images/icons/${companyMarks[ticker]}.svg` : null;
    const source = local || profileMarks.get(ticker);
    if (mark.dataset.source === (source || "")) return;
    mark.dataset.source = source || "";
    const badge = element("span", ticker.slice(0, 3), "company-initials");
    badge.title = `${ticker} · logo unavailable`;
    mark.replaceChildren(badge);
    if (!source) return;
    const image = document.createElement("img");
    image.alt = "";
    image.width = image.height = 56;
    image.referrerPolicy = "no-referrer";
    image.hidden = true;
    if (local) image.className = "monochrome-mark";
    image.onload = () => { image.hidden = false; badge.hidden = true; };
    image.onerror = () => { image.remove(); badge.hidden = false; };
    image.src = source;
    mark.append(image);
  }
  function companyMark(ticker, className) {
    if (!validSymbol(ticker)) return null;
    const mark = element("span", "", `company-identity ${className}`);
    mark.dataset.companyMark = ticker;
    mark.setAttribute("aria-hidden", "true");
    paintCompanyMark(mark, ticker);
    return mark;
  }
  function registerCompanyMark(company) {
    if (!validSymbol(company?.ticker)) return;
    const source = providerMark(company.logo);
    if (source) profileMarks.set(company.ticker, source);
    document.querySelectorAll(`[data-company-mark="${company.ticker}"]`).forEach(mark => paintCompanyMark(mark, company.ticker));
  }
  window.StocklumoCompanyMarks = { create: companyMark, register: registerCompanyMark };
  const verifiedTickerSymbols = new Set();
  let featuredSymbols = [];
  let pulseSignature = "";
  let watch = readList("stocklumo.watch");
  let recent = readList("stocklumo.recent");
  let profile = {};
  let stream;
  let pageActive = true;
  let initializationError = false;
  const isUsExchange = profile => typeof profile?.exchange === "string" && /^(NASDAQ|NEW YORK STOCK EXCHANGE|NYSE|NYSE ARCA|NYSE AMERICAN)(?:$|[ /,])/.test(profile.exchange);
  let subscribedSymbols = [];
  let transport = "connecting";
  let streamMessage = "Connecting. Waiting for fresh trades.";
  let marketCheckedAt = 0;
  let clockOffset = 0;
  const now = () => Date.now() + clockOffset;
  // Application freshness windows, not an exchange latency guarantee. Only received
  // US trades qualify for LIVE. REST has a 60s shared cache and a 5s polling cycle.
  const tradeWindow = 120000;
  const quoteWindow = 180000;
  const usOpen = () => Date.now() - marketCheckedAt < 120000 ? marketOpen : null;
  function freshness(stock) {
    const timestamp = Date.parse(stock?.updatedAt);
    if (!number(stock?.price) || stock.price <= 0 || !Number.isFinite(timestamp)) return "unavailable";
    if (timestamp > now() + 60000) return "error";
    if (stock.usMarket && usOpen() === false) return "market closed";
    const age = now() - timestamp;
    const received = Date.parse(stock.tradeReceivedAt);
    if (transport === "connected" && stock.usMarket && usOpen() === true && stock.source === "Trade" &&
        age <= tradeWindow && Number.isFinite(received) && now() - received <= tradeWindow && received <= now() + 60000) return "live";
    if (age > (stock.source === "Trade" ? tradeWindow : quoteWindow)) return "stale";
    return "recent quote";
  }
  function renderFeedState() {
    if (!stream || !pageActive) return;
    const items = subscribedSymbols.map(symbol => prices.get(symbol) || { symbol });
    let state = transport, text = transport.toUpperCase(), detail = streamMessage;
    const failures = items.filter(item => ["error", "limited", "unavailable", "setup"].includes(item.quoteState));
    if (transport === "setup" || transport === "error") { state = "error"; text = "ERROR"; }
    else if (transport === "connected") {
      if (failures.length) {
        state = "error"; text = "ERROR";
        detail = "Quote refresh failed for " + failures.map(item => item.symbol).join(", ") + ". Retrying; last prices retained.";
      } else if (usOpen() === false) {
        state = "closed"; text = "MARKET CLOSED";
        detail = "US market is outside regular trading hours. Showing latest available prices.";
      } else if (items.some(item => freshness(item) === "live")) {
        state = "live"; text = "LIVE";
        detail = "Fresh trades received for stocks marked live.";
      } else {
        state = "stale"; text = "STALE";
        detail = usOpen() === null ? "Market hours could not be verified. Check quote times." : "No fresh trades yet. Quotes are refreshing; check timestamps.";
      }
    }
    connection(state, text);
    $("connection").title = "Upstream connection: " + transport;
    $("notice").textContent = detail + " Connection: " + transport + ".";
  }
  let lastEvent = Date.now();
  let lastStreamRecovery = 0;
  let chartPoints = [];
  let chartRange = "session";
  let chartIndex = 0;
  let annualRange = {};
  let rangeSignature = "";
  const balanceSignatures = new WeakMap();
  let searchAbort;
  let searchTimer;
  let searchDismissed = false;
  let chartVersion = 0;
  let marketOpen = null;
  let spotlightLoading = false;
  let lastSpotlightAttempt = 0;
  const number = (value) => typeof value === "number" && Number.isFinite(value);
  const price = (value) =>
    number(value)
      ? value.toLocaleString("en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })
      : "-";
  const signed = (value) =>
    number(value)
      ? `${value > 0 ? "+" : value < 0 ? "-" : ""}${price(Math.abs(value))}`
      : "-";
  const stamp = (value) =>
    new Date(value).toLocaleString([], {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  function element(tag, text, className) {
    const node = document.createElement(tag);
    if (text !== undefined) node.textContent = String(text).replace(/[\u2013\u2014]/g, "-");
    if (className) node.className = className;
    return node;
  }
  function safeUrl(value) {
    try {
      const url = new URL(value);
      return ["https:", "http:"].includes(url.protocol) &&
        !url.username &&
        !url.password
        ? url.href
        : null;
    } catch {
      return null;
    }
  }
  function readList(key) {
    try {
      const items = JSON.parse(localStorage.getItem(key) || "[]");
      return Array.isArray(items)
        ? [...new Set(items.filter(validSymbol))].slice(0, 20)
        : [];
    } catch {
      return [];
    }
  }
  function save(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      $("storage-status").textContent =
        "Storage unavailable. Changes last for this visit.";
    }
  }
  async function get(path, signal) {
    try {
      const response = await fetch(path, {
        signal,
        cache: "no-store",
        headers: { Accept: "application/json" },
      });
      if (!response.ok)
        return {
          state: "error",
          message:
            response.status === 429
              ? "Request limit reached. Retry in a minute."
              : "This information could not be loaded.",
        };
      return await response.json();
    } catch (error) {
      if (error.name === "AbortError") throw error;
      return {
        state: "error",
        message: "Connection unavailable. Retry shortly.",
      };
    }
  }
  const dataPath = (section) =>
    `/api/data/stock/${encodeURIComponent(symbol)}/${section}`;
  function movement(node, value, text) {
    node.textContent = text;
    node.classList.toggle("up", number(value) && value > 0);
    node.classList.toggle("down", number(value) && value < 0);
  }
  function age(stock) {
    if (!stock?.updatedAt) return stock?.quoteState && stock.quoteState !== "pending" ? "Unavailable - " + stock.quoteState : "Unavailable";
    const seconds = Math.max(
      0,
      Math.floor((now() - new Date(stock.updatedAt)) / 1000),
    );
    const elapsed = seconds < 60 ? `${seconds}s ago` : seconds < 3600 ? `${Math.floor(seconds / 60)}m ago` : seconds < 86400 ? `${Math.floor(seconds / 3600)}h ago` : `${Math.floor(seconds / 86400)}d ago`;
    return `${elapsed} - ${freshness(stock)}\n${new Date(stock.updatedAt).toISOString().slice(0, 19).replace("T", " ")} UTC`;
  }
  function quote(stockSymbol, q) {
    if (
      !q ||
      !number(q.c) ||
      q.c <= 0 ||
      !number(q.t) ||
      q.t <= 0 ||
      q.t * 1000 > now() + 60000
    )
      return;
    const old = prices.get(stockSymbol) || {};
    const newer =
      !old.updatedAt || q.t * 1000 > new Date(old.updatedAt).getTime() || (q.t * 1000 === new Date(old.updatedAt).getTime() && old.source !== "Trade");
    const current = newer ? q.c : old.price;
    const updatedAt = newer
      ? new Date(q.t * 1000).toISOString()
      : old.updatedAt;
    prices.set(stockSymbol, {
      ...old,
      symbol: stockSymbol,
      price: current,
      previousClose: q.pc,
      open: q.o,
      high: q.h,
      low: q.l,
      updatedAt,
      source: newer ? "Quote" : old.source,
      quoteState: "ok",
      change: q.pc > 0 ? current - q.pc : null,
      changePercent: q.pc > 0 ? ((current - q.pc) / q.pc) * 100 : null,
    });
  }
  function svgElement(tag, attributes) {
    const node = document.createElementNS("http://www.w3.org/2000/svg", tag);
    Object.entries(attributes).forEach(([name, value]) => node.setAttribute(name, value));
    return node;
  }
  function renderBalance(container, stocks, label) {
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
  function renderPriceRanges(stock) {
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
        const svg = svgElement("svg", { viewBox: "0 0 240 24", preserveAspectRatio: "none", role: "img", "aria-label": `${label}: ${price(low)} to ${price(high)} ${profile.currency || ""}. Latest ${price(stock.price)}.${position.outside ? " Outside reported range." : ""}` });
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
  function updatePrices() {
    document.querySelectorAll("[data-price-symbol]").forEach((row) => {
      const item = prices.get(row.dataset.priceSymbol);
      if (!item) return;
      row.querySelector(".last").textContent =
        `${price(item.price)} ${item.currency || ""}`.trim();
      movement(
        row.querySelector(".delta"),
        item.changePercent,
        number(item.changePercent) ? `${signed(item.changePercent)}%` : "-",
      );
      row.querySelector(".age").textContent = age(item);
    });
    renderFeedState();
    renderMarketPulse();
    renderBalance($("watch-balance"), watch.map(ticker => prices.get(ticker)), "Saved stocks");
    if (!symbol) return;
    const item = prices.get(symbol);
    if (!item) return;
    renderPriceRanges(item);
    $("price").textContent = price(item.price);
    movement(
      $("change"),
      item.change,
      number(item.change)
        ? `${signed(item.change)} (${signed(item.changePercent)}%) vs previous close`
        : "Previous close unavailable",
    );
    $("data-age").textContent = item.updatedAt
      ? age(item)
      : "No price received";
    const stats = [
      ["Open", price(item.open)],
      ["Day high", price(item.high)],
      ["Day low", price(item.low)],
      ["Previous close", price(item.previousClose)],
    ];
    renderDefinitions($("stats"), stats);
    const time = new Date(item.updatedAt).getTime();
    if (
      number(item.price) &&
      Number.isFinite(time) &&
      (!history.length || time > history.at(-1).time)
    ) {
      history.push({ time, price: item.price });
      if (history.length > 120) history.shift();
      if (chartRange === "session") draw(history);
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
  function renderMarketPulse() {
    if ($("market-pulse").hidden) return;
    const stocks = featuredSymbols.map(ticker => prices.get(ticker));
    renderBalance($("pulse-breadth"), stocks, "Selection balance");
    $("summary-quotes").textContent = featuredSymbols.length ? `${stocks.filter(s => number(s?.price) && s.price > 0).length} / ${featuredSymbols.length}` : "-";
    $("summary-live").textContent = featuredSymbols.length ? String(stocks.filter(s => s && freshness(s) === "live").length) : "-";
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
  function renderWatch() {
    $("summary-watch").textContent = String(watch.length);
    $("watch-rows").replaceChildren();
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
      up.onclick = () => {
        [watch[index - 1], watch[index]] = [watch[index], watch[index - 1]];
        save("stocklumo.watch", watch);
        renderWatch();
      };
      const remove = element("button", "Remove");
      remove.type = "button";
      remove.setAttribute("aria-label", `Remove ${stockSymbol} from watchlist`);
      remove.onclick = () => {
        watch = watch.filter((s) => s !== stockSymbol);
        save("stocklumo.watch", watch);
        renderWatch();
        connect();
      };
      actions.append(up, remove);
      row.append(actions);
      $("watch-rows").append(row);
    });
    if (symbol)
      $("save-stock").textContent = watch.includes(symbol)
        ? "Remove from watchlist"
        : "Add to watchlist";
    updatePrices();
  }
  function renderRecent() {
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
  function connection(state, text) {
    $("connection").dataset.state = state;
    $("connection").textContent = text;
  }
  function connect() {
    if (!pageActive) return;
    stream?.close();
    stream = undefined;
    const symbols = [
      ...new Set([
        ...(symbol && profile.ticker === symbol ? [symbol] : []),
        ...watch.filter((item) => verifiedSymbols.has(item)),
        ...spotlightSymbols,
        ...verifiedTickerSymbols,
      ]),
    ].slice(0, 37);
    subscribedSymbols = symbols;
    if (!symbols.length) {
      connection(initializationError ? "error" : "idle", initializationError ? "ERROR" : "NO LIVE SUBSCRIPTIONS");
      return;
    }
    transport = "connecting";
    connection("connecting", "CONNECTING");
    lastEvent = Date.now();
    stream = new EventSource(
      "/api/market/stream?symbols=" + encodeURIComponent(symbols.join(",")),
    );
    const currentStream = stream;
    stream.onmessage = (event) => {
      if (!pageActive || stream !== currentStream) return;
      let message;
      try {
        message = JSON.parse(event.data);
      } catch {
        return;
      }
      if (!message || typeof message.status !== "string" || !Array.isArray(message.stocks)) return;
      lastEvent = Date.now();
      transport = message.status;
      streamMessage = message.message || "Provider status unavailable.";
      const serverTime = Date.parse(message.serverTime);
      if (Number.isFinite(serverTime)) clockOffset = serverTime - Date.now();
      for (const item of message.stocks) {
        if (!item || !symbols.includes(item.symbol)) continue;
        const time = Date.parse(item.updatedAt);
        const old = prices.get(item.symbol);
        if (item.quoteState) prices.set(item.symbol, { ...old, symbol: item.symbol, quoteState: item.quoteState });
        if (!number(item.price) || item.price <= 0 || !Number.isFinite(time) || time > now() + 60000) continue;
        if (
          !old?.updatedAt ||
          (item.updatedAt &&
            new Date(item.updatedAt) >= new Date(old.updatedAt))
        )
          prices.set(item.symbol, { ...old, ...item });
      }
      updatePrices();
    };
    stream.onerror = () => {
      if (!pageActive || stream !== currentStream) return;
      transport = "disconnected";
      streamMessage = "Connection lost. Retrying; last prices retained.";
      connection("disconnected", "DISCONNECTED");
      $("notice").textContent =
        "Reconnecting. Prices may be stale.";
      // Re-register symbols if a server restart cleared its in-memory catalog.
      if (Date.now() - lastStreamRecovery >= 60000) {
        lastStreamRecovery = Date.now();
        restoreSubscriptions(symbols);
      }
    };
  }
  async function restoreSubscriptions(symbols) {
    for (const item of symbols) await get(`/api/data/stock/${item}/profile`);
  }
  async function loadWatch() {
    for (const item of watch) {
      const result = await get(`/api/data/stock/${item}/profile`);
      if (result.data?.ticker === item) {
        registerCompanyMark(result.data);
        verifiedSymbols.add(item);
        prices.set(item, {
          ...prices.get(item),
          name: result.data.name,
          currency: result.data.currency,
          usMarket: isUsExchange(result.data),
        });
      } else continue;
      const resultQuote = await get(`/api/data/stock/${item}/quote`);
      quote(item, resultQuote.data);
      if (resultQuote.state !== "ok") prices.set(item, { ...prices.get(item), symbol: item, quoteState: resultQuote.state });
    }
    renderWatch();
    connect();
  }
  function news(container, result) {
    container.replaceChildren();
    if (result.state !== "ok") {
      container.append(element("p", result.message, "muted"));
      return;
    }
    const articles = Array.isArray(result.data)
      ? result.data.filter((a) => a.headline && safeUrl(a.url)).slice(0, 8)
      : [];
    if (!articles.length) {
      container.append(element("p", "No recent news is available.", "muted"));
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
  function draw(points) {
    chartPoints = points;
    $("chart").dataset.observations = String(points.length);
    $("chart-line").setAttribute("d", "");
    $("chart-area").setAttribute("d", "");
    $("chart-point").setAttribute("hidden", "");
    $("cursor").setAttribute("hidden", "");
    if (!points.length) {
      $("chart-high").textContent = "-";
      $("chart-low").textContent = "-";
      return;
    }
    const values = points.map((p) => p.price),
      min = Math.min(...values),
      max = Math.max(...values),
      span = points.at(-1).time - points[0].time || 1,
      range = max - min || 1;
    $("chart-line").setAttribute(
      "d",
      points
        .map(
          (p, i) =>
            `${i ? "L" : "M"}${(15 + ((p.time - points[0].time) / span) * 870).toFixed(2)},${max === min ? 120 : (220 - ((p.price - min) / range) * 200).toFixed(2)}`,
        )
        .join(" "),
    );
    const path = $("chart-line").getAttribute("d");
    const lastY = max === min ? 120 : 220 - ((points.at(-1).price - min) / range) * 200;
    const lastX = points.length === 1 ? 15 : 885;
    if (points.length > 1) $("chart-area").setAttribute("d", `${path} L885,235 L15,235 Z`);
    $("chart-point").setAttribute("cx", lastX);
    $("chart-point").setAttribute("cy", lastY);
    $("chart-point").removeAttribute("hidden");
    $("chart-high").textContent = price(max);
    $("chart-low").textContent = price(min);
    $("chart-start").textContent = stamp(points[0].time);
    $("chart-end").textContent = stamp(points.at(-1).time);
    $("chart").setAttribute(
      "aria-label",
      `${points.length} price observations. Lowest ${price(min)}, highest ${price(max)}. Use arrow keys for exact values.`,
    );
    $("chart-status").textContent =
      chartRange === "session"
        ? `${points.length} session observation${points.length === 1 ? "" : "s"}.`
        : `${chartRange} historical prices supplied by Finnhub.`;
  }
  function inspect(index) {
    if (!chartPoints.length) return;
    chartIndex = Math.max(0, Math.min(index, chartPoints.length - 1));
    const point = chartPoints[chartIndex];
    $("chart-value").textContent =
      `${stamp(point.time)} · ${price(point.price)} ${profile.currency || ""}`;
    const x =
      15 +
      ((point.time - chartPoints[0].time) /
        (chartPoints.at(-1).time - chartPoints[0].time || 1)) *
        870;
    $("cursor").setAttribute("x1", x);
    $("cursor").setAttribute("x2", x);
    $("cursor").removeAttribute("hidden");
  }
  $("chart").addEventListener("pointermove", (event) => {
    const box = $("chart").getBoundingClientRect();
    const fraction = Math.max(
      0,
      Math.min(1, (event.clientX - box.left) / box.width),
    );
    if (chartPoints.length) {
      const target =
        chartPoints[0].time +
        fraction * (chartPoints.at(-1).time - chartPoints[0].time);
      let nearest = 0;
      chartPoints.forEach((p, i) => {
        if (
          Math.abs(p.time - target) <
          Math.abs(chartPoints[nearest].time - target)
        )
          nearest = i;
      });
      inspect(nearest);
    }
  });
  $("chart").addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
      inspect(chartIndex + (event.key === "ArrowRight" ? 1 : -1));
    }
  });
  async function loadChart(range) {
    const version = ++chartVersion;
    chartRange = range;
    document
      .querySelectorAll("[data-range]")
      .forEach((button) =>
        button.setAttribute(
          "aria-pressed",
          String(button.dataset.range === range),
        ),
      );
    if (range === "session") {
      draw(history);
      if (!history.length)
        $("chart-status").textContent = "Waiting for price observations.";
      return;
    }
    $("chart-status").textContent = "Loading price history…";
    draw([]);
    const result = await get(dataPath("chart") + "?range=" + range);
    if (version !== chartVersion) return;
    const data = result.data;
    if (
      result.state !== "ok" ||
      data?.s !== "ok" ||
      !Array.isArray(data.c) ||
      !Array.isArray(data.t)
    ) {
      $("chart-status").textContent =
        result.message || "No historical data is available for this range.";
      return;
    }
    draw(
      data.c
        .map((value, i) => ({ time: data.t[i] * 1000, price: value }))
        .filter(
          (p) => number(p.price) && p.price > 0 && Number.isFinite(p.time),
        )
        .sort((a, b) => a.time - b.time),
    );
  }
  document
    .querySelectorAll("[data-range]")
    .forEach(
      (button) => (button.onclick = () => loadChart(button.dataset.range)),
    );
  async function loadStock() {
    $("stock-detail").hidden = false;
    const result = await get(dataPath("profile"));
    if (result.state !== "ok" || result.data?.ticker !== symbol) {
      $("company").textContent = symbol;
      $("company-status").textContent =
        result.message ||
        "Company unavailable for this symbol.";
      $("notice").textContent =
        result.message || "Stock not found.";
      $("save-stock").disabled = true;
      $("change").textContent = "Price unavailable";
      $("chart-status").textContent =
        "Load the stock to view price history.";
      $("stock-news").textContent = "Company news is unavailable.";
      return;
    }
    profile = result.data;
    registerCompanyMark(profile);
    $("save-stock").disabled = false;
    prices.set(symbol, {
      ...prices.get(symbol),
      name: profile.name,
      currency: profile.currency,
      usMarket: isUsExchange(profile),
    });
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
    recent = [symbol, ...recent.filter((s) => s !== symbol)].slice(0, 8);
    save("stocklumo.recent", recent);
    renderRecent();
    connect();
    const q = await get(dataPath("quote"));
    quote(symbol, q.data);
    if (q.state !== "ok") prices.set(symbol, { ...prices.get(symbol), symbol, quoteState: q.state });
    updatePrices();
    if (!prices.get(symbol)?.price)
      $("data-age").textContent =
        q.message || "A quote is unavailable for this symbol.";
    news($("stock-news"), await get(dataPath("news")));
    const metrics = await get(dataPath("metrics"));
    const metric = metrics.data?.metric;
    annualRange = { low: metric?.["52WeekLow"], high: metric?.["52WeekHigh"] };
    updatePrices();
    const candles = await get(dataPath("chart") + "?range=1M");
    document
      .querySelectorAll('[data-range]:not([data-range="session"])')
      .forEach((button) => {
        button.hidden = candles.state !== "ok" || candles.data?.s !== "ok";
      });
    if (candles.state !== "ok" || candles.data?.s !== "ok") {
      document
        .querySelectorAll('[data-range]:not([data-range="session"])')
        .forEach((button) => {
          button.hidden = true;
        });
      $("chart-status").textContent =
        "History unavailable with this plan. Session view remains available.";
    }
  }
  $("save-stock").onclick = () => {
    if (profile.ticker !== symbol) return;
    if (watch.includes(symbol)) watch = watch.filter((s) => s !== symbol);
    else if (watch.length < 20) watch.push(symbol);
    else {
      $("storage-status").textContent =
        "Watchlist full (20 stocks). Remove one first.";
      return;
    }
    save("stocklumo.watch", watch);
    renderWatch();
    connect();
  };
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
  $("search").addEventListener("input", () => {
    searchDismissed = false;
    clearTimeout(searchTimer);
    searchAbort?.abort();
    $("search-results").replaceChildren();
    $("search-results").hidden = true;
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
    }, 350);
  });
  $("search").addEventListener("keydown", (event) => {
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
  const page = location.pathname;
  document.body.dataset.page = symbol ? "stock" : page === "/" ? "home" : page.slice(1);
  if (page === "/") document.querySelector(".intro").after($("market-pulse"));
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
    loadStock();
  } else if (page === "/watchlist") {
    $("page-title").textContent = "Your market, on one list.";
    $("overview").hidden = true;
    $("news-section").hidden = true;
  } else if (page === "/news") {
    $("page-title").textContent = "The stories behind the market.";
    ["overview", "watch-section", "recent-section", "discover"].forEach(
      (id) => ($(id).hidden = true),
    );
  } else if (page === "/markets") {
    $("page-title").textContent = "A wider view of the market.";
    $("watch-section").hidden = true;
  } else if (["/screener", "/compare", "/portfolio", "/earnings"].includes(page)) {
    ["overview", "watch-section", "recent-section", "discover", "news-section"].forEach(id => $(id).hidden = true);
  }
  renderWatch();
  renderRecent();
  if (!$("watch-section").hidden) loadWatch();
  else $("connection").textContent = "NO LIVE SUBSCRIPTIONS";
  $("more-stocks").onclick = () => {
    const expanded = $("more-stocks").getAttribute("aria-expanded") !== "true";
    document.querySelectorAll(".explore-extra").forEach(link => link.hidden = !expanded);
    $("more-stocks").setAttribute("aria-expanded", String(expanded));
    $("more-stocks").textContent = expanded ? "Fewer stocks" : "More stocks";
  };
  async function loadSpotlight() {
    if (spotlightLoading || !pageActive) return;
    spotlightLoading = true;
    initializationError = false;
    lastSpotlightAttempt = Date.now();
    if (!featuredSymbols.length) {
      const universe = await get("/api/universe");
      if (!pageActive) { spotlightLoading = false; return; }
      $("universe-coverage").hidden = $("workspace-summary").hidden;
      $("summary-universe").textContent = Number.isInteger(universe.count) ? universe.count.toLocaleString() : "-";
      $("summary-exchanges").textContent = Number.isInteger(universe.exchanges) ? String(universe.exchanges) : "-";
      const retrieved = universe.retrievedAt && Number.isFinite(Date.parse(universe.retrievedAt)) ? new Date(universe.retrievedAt).toISOString().replace("T", " ").replace(/\.\d+Z$/, " UTC") : null;
      $("universe-coverage").querySelector("summary").textContent = universe.state === "stale" ? "Stock coverage (stale)" : "Stock coverage & updates";
      $("universe-note").textContent = (retrieved ? `Finnhub coverage: ${universe.state === "stale" ? "STALE cache" : "updated"} ${retrieved}.` : "Finnhub coverage unavailable.") + (universe.message ? " " + universe.message : "");
      featuredSymbols = Array.isArray(universe.selection) ? [...new Set(universe.selection.map(s => s.symbol).filter(validSymbol))].slice(0, 8) : [];
      if (!featuredSymbols.length) {
        $("spotlight").replaceChildren(element("p", universe.message || "No eligible provider symbols available.", "muted"));

      }
    }
    $("ticker-stocks").replaceChildren();
    if (featuredSymbols.length) $("spotlight").replaceChildren();
    const tickerLinks = new Map();
    for (const ticker of tickerSymbols) {
      const link = element("a", undefined, "ticker-stock");
      link.href = "/stock/" + ticker;
      link.dataset.priceSymbol = ticker;
      link.append(element("strong", ticker), element("span", "-", "last"), element("span", "-", "delta"), element("span", "Waiting for a price", "age"));
      $("ticker-stocks").append(link);
      tickerLinks.set(ticker, link);
    }
    // Shared quotes and subscriptions, but independent display selections and order.
    for (const ticker of new Set([...featuredSymbols, ...tickerSymbols])) {
      const block = element("article", undefined, "spotlight-stock");
      block.dataset.priceSymbol = ticker;
      const heading = element("h3");
      const link = element("a", ticker);
      link.href = "/stock/" + ticker;
      link.prepend(companyMark(ticker, "stock-mark"));
      heading.append(link);
      const name = element("p", "Loading company...", "muted");
      block.append(heading, name, element("strong", "-", "last"), element("p", "-", "delta"), element("p", "Waiting for a price", "age caption"));
      const tickerLink = tickerLinks.get(ticker);
      if (!$("overview").hidden && featuredSymbols.includes(ticker)) $("spotlight").append(block);
      const result = await get("/api/data/stock/" + ticker + "/profile");
      if (result.state !== "ok" || result.data?.ticker !== ticker) {
        name.textContent = result.message || "Company information unavailable.";
        initializationError = true;
        if (!stream) { connection("error", "ERROR"); $("notice").textContent = name.textContent; }
        block.querySelector(".age").textContent = "Unavailable";
        if (tickerLink) tickerLink.querySelector(".age").textContent = "Unavailable";
        continue;
      }
      name.textContent = result.data.name || ticker;
      registerCompanyMark(result.data);
      prices.set(ticker, { ...prices.get(ticker), name: result.data.name, currency: result.data.currency, usMarket: isUsExchange(result.data) });
      if (featuredSymbols.includes(ticker)) spotlightSymbols.add(ticker);
      if (tickerSymbols.includes(ticker)) verifiedTickerSymbols.add(ticker);
      const resultQuote = await get("/api/data/stock/" + ticker + "/quote");
      quote(ticker, resultQuote.data);
      if (resultQuote.state !== "ok") prices.set(ticker, { ...prices.get(ticker), symbol: ticker, quoteState: resultQuote.state });
      updatePrices();
    }
    connect();
    spotlightLoading = false;
  }
  loadSpotlight();
  if (!$("news-section").hidden)
    get("/api/data/news").then((result) => news($("news"), result));
  function refreshMarketStatus() {
    return get("/api/data/status").then((result) => {
      const status = result.data;
      marketCheckedAt = Date.now();
      const validStatus = result.state === "ok" && typeof status?.isOpen === "boolean" && number(status.t) && Math.abs(now() - status.t * 1000) < 180000;
      marketOpen = validStatus ? status.isOpen : null;
      $("market-status").textContent =
        validStatus
          ? `US MARKET ${status.isOpen ? "OPEN" : "CLOSED"}${status.session ? " · " + status.session : ""}`
          : "US MARKET STATUS UNAVAILABLE";
      updatePrices();
    });
  }
  refreshMarketStatus();
  setInterval(refreshMarketStatus, 60000);
  setInterval(() => {
    if (!pageActive) return;
    if (stream && Date.now() - lastEvent > 15000) {
      transport = "disconnected";
      streamMessage = "Connection lost. Retrying; last prices retained.";
      connection("disconnected", "DISCONNECTED");
      $("notice").textContent =
        "No connection heartbeat. Prices may be stale.";
      if (Date.now() - lastStreamRecovery >= 60000) {
        lastStreamRecovery = Date.now();
        connect();
      }
    }
    if ((!featuredSymbols.length || spotlightSymbols.size < featuredSymbols.length || verifiedTickerSymbols.size < tickerSymbols.length) && Date.now() - lastSpotlightAttempt >= 300000) loadSpotlight();
    updatePrices();
  }, 5000);
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden && pageActive) {
      if (Date.now() - lastEvent > 15000) connect();
      refreshMarketStatus();
    }
  });
  window.addEventListener("online", () => {
    if (!featuredSymbols.length || spotlightSymbols.size < featuredSymbols.length || verifiedTickerSymbols.size < tickerSymbols.length) loadSpotlight();
    else connect();
    refreshMarketStatus();
  });
  window.addEventListener("pagehide", () => {
    pageActive = false;
    stream?.close();
    stream = undefined;
    dismissSearch();
  });
  window.addEventListener("pageshow", (event) => {
    if (event.persisted) location.reload();
  });
})();
