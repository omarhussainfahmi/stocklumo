(() => {
  "use strict";
  const {validSymbol, number, price, stamp, element} = window.StocklumoMarketFormat;
  const {get} = window.StocklumoMarketApi;
  const view = window.StocklumoMarketView;
  const {renderBalance, news} = view;
  let discovery;
  const $ = (id) => document.getElementById(id);
  const symbol = document.body.dataset.symbol;

  const prices = new Map();
  const hasMarketWorkspace = Boolean($("overview"));

  const verifiedSymbols = new Set();
  const history = [];
  let sessionHistoryChanged = false;
  const spotlightSymbols = new Set();
  const tickerSymbols = ["AAPL", "MSFT", "AMZN", "GOOGL", "META", "TSLA", "V", "NVDA"];
  const {create: companyMark, register: registerCompanyMark} = window.StocklumoCompanyMarks;
  const verifiedTickerSymbols = new Set();
  let featuredSymbols = [];
  let dailyCandidates = [], spotlightDate = "";

  let watch = readList("stocklumo.watch");
  let recent = readList("stocklumo.recent");
  let profile = {};
  let pageActive = true;
  let initializationError = false;
  const isUsExchange = profile => typeof profile?.exchange === "string" && /^(NASDAQ|NEW YORK STOCK EXCHANGE|NYSE|NYSE ARCA|NYSE AMERICAN)(?:$|[ /,])/.test(profile.exchange);
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
    if (!feed.hasSource() || !pageActive) return;
    const items = feed.symbols().map(symbol => prices.get(symbol) || { symbol });
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
  let annualRange = {};

  let marketOpen = null;
  let spotlightLoading = false;
  let lastSpotlightAttempt = 0;

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
      return true;
    } catch {
      $("storage-status").textContent =
        "Storage unavailable. Changes last for this visit.";
      return false;
    }
  }

  const dataPath = (section) =>
    `/api/data/stock/${encodeURIComponent(symbol)}/${section}`;

  function age(stock) {
    if (!stock?.updatedAt) return stock?.quoteState && stock.quoteState !== "pending" ? "Unavailable - " + stock.quoteState : "Unavailable";
    const seconds = Math.max(
      0,
      Math.floor((now() - new Date(stock.updatedAt)) / 1000),
    );
    const elapsed = seconds < 60 ? `${seconds}s ago` : seconds < 3600 ? `${Math.floor(seconds / 60)}m ago` : seconds < 86400 ? `${Math.floor(seconds / 3600)}h ago` : `${Math.floor(seconds / 86400)}d ago`;
    return `${elapsed} - ${freshness(stock)}\n${new Date(stock.updatedAt).toISOString().slice(0, 19).replace("T", " ")} UTC`;
  }

  function acceptRestQuote(stockSymbol, q) {
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
    recordSessionQuote(stockSymbol, prices.get(stockSymbol));
  }
  function recordSessionQuote(ticker, item) {
    if (!symbol || ticker !== symbol) return;
    const time = Date.parse(item.updatedAt);
    if (!number(item.price) || !Number.isFinite(time) || history.length && time <= history.at(-1).time) return;
    history.push({ time, price: item.price });
    if (history.length > 120) history.shift();
    sessionHistoryChanged = true;
  }
  function acceptCompanyProfile(company) {
    registerCompanyMark(company);
    prices.set(company.ticker, {
      ...prices.get(company.ticker),
      name: company.name,
      currency: company.currency,
      usMarket: isUsExchange(company),
    });
  }
  function applyRestQuoteResult(ticker, result) {
    acceptRestQuote(ticker, result.data);
    if (result.state !== "ok") prices.set(ticker, { ...prices.get(ticker), symbol: ticker, quoteState: result.state });
  }

  function refreshPriceRows(host) { view.refreshPriceRows(host, prices, age); }
  function updatePrices() {
    refreshPriceRows(document);
    renderFeedState();
    view.renderMarketPulse(featuredSymbols, prices);
    discovery?.render();
    renderBalance($("watch-balance"), watch.map(ticker => prices.get(ticker)), "Saved stocks");
    if (!symbol) return;
    const item = prices.get(symbol);
    if (!item) return;
    view.renderQuote(item, annualRange, profile.currency, age(item));
    if (sessionHistoryChanged) {
      chart.renderSession(history);
      sessionHistoryChanged = false;
    }
  }

  function moveWatch(stockSymbol, index) {
    [watch[index - 1], watch[index]] = [watch[index], watch[index - 1]];
    const saved = save("stocklumo.watch", watch);
    renderWatch();
    const moved = [...$("watch-rows").children].find(row => row.dataset.priceSymbol === stockSymbol);
    (moved?.querySelector('button:not(:disabled)') || moved?.querySelector('a'))?.focus();
    if (saved) $("storage-status").textContent = `${stockSymbol} moved up. Saved in this browser.`;
  }
  function removeWatch(stockSymbol, index) {
    watch = watch.filter((s) => s !== stockSymbol);
    const saved = save("stocklumo.watch", watch);
    renderWatch();
    const next = $("watch-rows").children[Math.min(index, watch.length - 1)];
    (next?.querySelector('button:not(:disabled)') || $("watch-empty").querySelector('a'))?.focus();
    if (saved) $("storage-status").textContent = `${stockSymbol} removed. Saved in this browser.`;
    connect();
  }
  function renderWatch() {
    view.renderWatch(watch, prices, {move: moveWatch, remove: removeWatch});
    if (symbol) $("save-stock").textContent = watch.includes(symbol) ? "Remove from watchlist" : "Add to watchlist";
    refreshPriceRows($("watch-rows"));
    renderBalance($("watch-balance"), watch.map(ticker => prices.get(ticker)), "Saved stocks");
  }
  function renderRecent() { view.renderRecent(recent); }
  function connection(state, text) {
    $("connection").dataset.state = state;
    $("connection").textContent = text;
  }
  const feed = window.StocklumoMarketFeed.create({
    symbols() {
    return [
      ...new Set([
        ...(symbol && profile.ticker === symbol ? [symbol] : []),
        ...watch.filter((item) => verifiedSymbols.has(item)),
        ...spotlightSymbols,
        ...verifiedTickerSymbols,
      ]),
    ].slice(0, 37);
    },
    idle() { connection(initializationError ? "error" : "idle", initializationError ? "ERROR" : "NO LIVE SUBSCRIPTIONS"); },
    status(state, detail) {
      transport = state;
      streamMessage = detail;
      connection(state, state.toUpperCase());
      if (state === "disconnected") $("notice").textContent = detail;
    },
    message(message, symbols) {
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
        ) {
          prices.set(item.symbol, { ...old, ...item });
          recordSessionQuote(item.symbol, prices.get(item.symbol));
        }
      }
      updatePrices();
    }
  });
  function connect() { feed.connect(); }
  async function loadWatch() {
    for (const item of watch) {
      const result = await get(`/api/data/stock/${item}/profile`);
      if (result.data?.ticker === item) {
        acceptCompanyProfile(result.data);
        verifiedSymbols.add(item);
      } else continue;
      const resultQuote = await get(`/api/data/stock/${item}/quote`);
      applyRestQuoteResult(item, resultQuote);
    }
    renderWatch();
    connect();
  }

  const chartData = range => window.StocklumoPreviewChart
    ? window.StocklumoPreviewChart(symbol, range)
    : get(dataPath("chart") + "?range=" + range);
  const chart = hasMarketWorkspace ? window.StocklumoStockChart.create({
    host: document.querySelector(".price-panel"), price, stamp, number,
    getProfile: () => profile, sessionPoints: () => history, chartData,
  }) : null;
  window.StocklumoPreviewReady?.then(async metadata => {
    if (symbol && metadata?.symbols?.includes(symbol)) await chart.available(await chartData("1M"));
  });
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
      chart.sessionMessage("Company details unavailable. Captured history, when enabled, loads separately.");
      $("stock-news").textContent = "Company news is unavailable.";
      return;
    }
    profile = result.data;
    acceptCompanyProfile(profile);
    view.renderCompany(profile, symbol);
    recent = [symbol, ...recent.filter((s) => s !== symbol)].slice(0, 8);
    save("stocklumo.recent", recent);
    renderRecent();
    connect();
    const q = await get(dataPath("quote"));
    applyRestQuoteResult(symbol, q);
    updatePrices();
    if (!prices.get(symbol)?.price)
      $("data-age").textContent =
        q.message || "A quote is unavailable for this symbol.";
    news($("stock-news"), await get(dataPath("news")));
    const metrics = await get(dataPath("metrics"));
    const metric = metrics.data?.metric;
    annualRange = { low: metric?.["52WeekLow"], high: metric?.["52WeekHigh"] };
    updatePrices();
    const candles = await chartData("1M");
    await chart.available(candles);
    if (candles?.state !== "ok" || candles.data?.s !== "ok") {
      document
        .querySelectorAll('[data-range]:not([data-range="session"])')
        .forEach((button) => {
          button.hidden = true;
        });
      $("chart-status").textContent =
        "History unavailable with this plan. Session view remains available.";
    }

  }
  if (hasMarketWorkspace) $("save-stock").onclick = () => {
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
  const search = window.StocklumoStockSearch.create({get});
  function initializeMarketWorkspace() {
    view.configureWorkspace(symbol);
    if (symbol) loadStock();
    renderWatch();
    renderRecent();
    if (!$("watch-section").hidden) loadWatch();
    else $("connection").textContent = "NO LIVE SUBSCRIPTIONS";
  }
  if (hasMarketWorkspace) initializeMarketWorkspace();
  if (hasMarketWorkspace) discovery = window.StocklumoDiscovery.create({
    get, readQuote: ticker => prices.get(ticker), now, isPageActive: () => pageActive,
  });
  async function loadSpotlight() {
    if (spotlightLoading || !pageActive) return;
    spotlightLoading = true;
    initializationError = false;
    lastSpotlightAttempt = Date.now();
    const today = new Date().toISOString().slice(0, 10);
    if (hasMarketWorkspace && (!dailyCandidates.length || spotlightDate !== today)) {
      const universe = await get("/api/universe");
      if (!pageActive) { spotlightLoading = false; return; }
      $("universe-coverage").hidden = $("workspace-summary").hidden;
      $("summary-universe").textContent = Number.isInteger(universe.count) ? universe.count.toLocaleString() : "-";
      $("summary-exchanges").textContent = Number.isInteger(universe.exchanges) ? String(universe.exchanges) : "-";
      const retrieved = universe.retrievedAt && Number.isFinite(Date.parse(universe.retrievedAt)) ? new Date(universe.retrievedAt).toISOString().replace("T", " ").replace(/\.\d+Z$/, " UTC") : null;
      $("universe-coverage").querySelector("summary").textContent = universe.state === "stale" ? "Stock coverage (stale)" : "Stock coverage & updates";
      $("universe-note").textContent = (retrieved ? `Finnhub coverage: ${universe.state === "stale" ? "STALE cache" : "updated"} ${retrieved}.` : "Finnhub coverage unavailable.") + (universe.message ? " " + universe.message : "");
      dailyCandidates = [...new Set([...(Array.isArray(universe.selection) ? universe.selection : []), ...(Array.isArray(universe.candidates) ? universe.candidates : [])].map(s => s.symbol).filter(validSymbol))].slice(0, 16);
      spotlightDate = today;
      if (!dailyCandidates.length) {
        $("spotlight").replaceChildren(element("p", universe.message || "No eligible provider symbols available.", "muted"));

      }
    }
    $("ticker-stocks").replaceChildren();
    featuredSymbols = [];
    view.resetPulse();
    spotlightSymbols.clear();
    if (dailyCandidates.length) $("spotlight").replaceChildren(element("p", "Finding available stocks…", "muted"));
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
    for (const ticker of new Set([...dailyCandidates, ...tickerSymbols])) {
      if (featuredSymbols.length >= 8 && !tickerSymbols.includes(ticker)) continue;
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
      const result = await get("/api/data/stock/" + ticker + "/profile");
      if (result.state !== "ok" || result.data?.ticker !== ticker) {
        name.textContent = result.message || "Company information unavailable.";
        if (tickerLink) {
          initializationError = true;
          if (!feed.hasSource()) { connection("error", "ERROR"); $("notice").textContent = name.textContent; }
        }
        block.querySelector(".age").textContent = "Unavailable";
        if (tickerLink) tickerLink.querySelector(".age").textContent = "Unavailable";
        continue;
      }
      name.textContent = result.data.name || ticker;
      acceptCompanyProfile(result.data);
      if (tickerSymbols.includes(ticker)) verifiedTickerSymbols.add(ticker);
      const resultQuote = await get("/api/data/stock/" + ticker + "/quote");
      applyRestQuoteResult(ticker, resultQuote);
      const q = resultQuote.data;
      const available = resultQuote.state === "ok" && number(q?.c) && q.c > 0 && number(q.pc) && q.pc > 0 && number(q.t) && q.t > 0 && q.t * 1000 <= now() + 60000;
      if (available && featuredSymbols.length < 8 && dailyCandidates.includes(ticker)) {
        if (!featuredSymbols.length) $("spotlight").replaceChildren();
        featuredSymbols.push(ticker); spotlightSymbols.add(ticker);
        if (!$("overview").hidden) $("spotlight").append(block);
      }
      updatePrices();
    }
    if (!featuredSymbols.length && dailyCandidates.length) $("spotlight").replaceChildren(element("p", "No stock quotes available. We’ll retry shortly.", "muted"));
    updatePrices();
    connect();
    spotlightLoading = false;
    discovery?.setReady();
  }
  loadSpotlight();
  if (hasMarketWorkspace && !$("news-section").hidden)
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
    feed.tick();
    if ((spotlightDate !== new Date().toISOString().slice(0, 10) || featuredSymbols.length < Math.min(8, dailyCandidates.length) || !featuredSymbols.length || verifiedTickerSymbols.size < tickerSymbols.length) && Date.now() - lastSpotlightAttempt >= 300000) loadSpotlight();
    updatePrices();
  }, 5000);
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden && pageActive) {
      feed.resume();
      refreshMarketStatus();
    }
  });
  window.addEventListener("online", () => {
    if (!featuredSymbols.length || featuredSymbols.length < Math.min(8, dailyCandidates.length) || verifiedTickerSymbols.size < tickerSymbols.length) loadSpotlight();
    else connect();
    refreshMarketStatus();
  });
  window.addEventListener("pagehide", () => {
    pageActive = false;
    feed.close();
    search.dismiss();
  });
  window.addEventListener("pageshow", (event) => {
    if (event.persisted) location.reload();
  });
})();
