(() => {
  "use strict";
  const page = location.pathname,
    math = window.StocklumoMath;
  if (
    ![
      "/screener",
      "/compare",
      "/portfolio",
      "/earnings",
    ].includes(page)
  )
    return;
  const $ = (id) => document.getElementById(id);
  function setBusy(button, busy) {
    button.disabled = busy;
    document
      .querySelectorAll("#research-controls input, #research-controls select")
      .forEach((input) => (input.disabled = busy));
  }
  const controls = $("research-controls"),
    results = $("research-results"),
    status = $("research-status");
  const storageStatus = document.createElement("p");
  storageStatus.setAttribute("role", "status");
  controls.after(storageStatus);
  [
    "overview",
    "stock-detail",
    "watch-section",
    "recent-section",
    "discover",
    "news-section",
  ].forEach((id) => ($(id).hidden = true));
  document.querySelector(".intro").hidden = true;
  $("research").hidden = false;
  const node = (tag, text) => {
    const n = document.createElement(tag);
    if (text != null) n.textContent = text;
    return n;
  };
  function field(label, type = "text", value = "") {
    const wrap = node("label", label),
      input = node("input");
    input.type = type;
    input.value = value;
    wrap.append(input);
    controls.append(wrap);
    return input;
  }
  function select(label, options) {
    const wrap = node("label", label),
      input = node("select");
    options.forEach(([value, text]) => {
      const option = node("option", text);
      option.value = value;
      input.append(option);
    });
    wrap.append(input);
    controls.append(wrap);
    return input;
  }
  function button(label, action) {
    const b = node("button", label);
    b.type = "button";
    b.onclick = action;
    controls.append(b);
    return b;
  }
  const fmt = (value) =>
    math.finite(value)
      ? value.toLocaleString(undefined, { maximumFractionDigits: 2 })
      : "Unavailable";
  async function get(url) {
    try {
      const r = await fetch(url);
      if (!r.ok) {
        const body = await r.json().catch(() => null);
        return {
          state: "error",
          message:
            r.status === 429
              ? "Request limit reached. Retry in a minute."
              : body?.message || "Unable to load data.",
        };
      }
      return await r.json();
    } catch {
      return {
        state: "error",
        message: "Connection unavailable. Please retry.",
      };
    }
  }
  function table(headers, rows) {
    const wrap = node("div"),
      table = node("table"),
      head = node("thead"),
      tr = node("tr"),
      body = node("tbody");
    wrap.className = "table-wrap";
    wrap.tabIndex = 0;
    wrap.setAttribute("aria-label", "Results; scroll horizontally if needed");
    headers.forEach((h) => {
      const th = node("th", h);
      th.scope = "col";
      tr.append(th);
    });
    head.append(tr);
    rows.forEach((row) => {
      const tr = node("tr");
      row.forEach((value) => {
        const td = node("td");
        td.append(
          value instanceof Node
            ? value
            : document.createTextNode(String(value)),
        );
        tr.append(td);
      });
      body.append(tr);
    });
    table.append(head, body);
    wrap.append(table);
    results.append(wrap);
  }
  function change(value) {
    const label = node("span", math.finite(value) ? `${value > 0 ? "+" : ""}${fmt(value)}` : "Unavailable");
    if (math.finite(value)) label.className = value < 0 ? "down" : "up";
    return label;
  }
  function stockLink(symbol) {
    const link = node("a", symbol);
    link.href = "/stock/" + encodeURIComponent(symbol);
    return link;
  }
  const svgNode = (tag, attributes = {}) => {
    const n = document.createElementNS("http://www.w3.org/2000/svg", tag);
    Object.entries(attributes).forEach(([key, value]) => n.setAttribute(key, String(value)));
    return n;
  };
  const quoteTime = timestamp => math.finite(timestamp) && timestamp > 0 && timestamp <= 253402300799
    ? new Date(timestamp * 1000).toISOString().replace("T", " ").replace(".000Z", " UTC") : "Unavailable";
  function quoteDetail(r) {
    return `${r.symbol} · ${r.name || r.symbol} · Price ${fmt(r.price)} ${r.currency || ""} · Change ${fmt(r.changePercent)}% · Quote ${quoteTime(r.timestamp)}`;
  }
  // HTML labels remain readable on narrow screens; SVG bars share a zero baseline.
  function bars(rows, label, unit, description) {
    const figure = node("figure"), caption = node("figcaption", description);
    figure.className = "data-figure bar-chart";
    figure.setAttribute("aria-label", label);
    figure.append(node("h2", label), caption);
    const available = rows.filter(r => math.finite(r.value));
    if (!available.length) {
      figure.append(node("p", "No compatible values available for this chart."));
    } else {
      const scale = Math.max(...available.map(r => Math.abs(r.value)), 0.01);
      const list = node("div");
      list.className = "bar-list";
      rows.forEach(r => {
        const link = stockLink(r.symbol);
        link.className = "data-bar";
        link.title = r.detail;
        link.setAttribute("aria-label", `${r.detail}; open stock details`);
        const svg = svgNode("svg", { viewBox: "0 0 400 24", "aria-hidden": "true" });
        svg.append(svgNode("line", { x1: 200, x2: 200, y1: 0, y2: 24 }));
        const value = node("span", "Unavailable");
        if (math.finite(r.value)) {
          const width = Math.abs(r.value) / scale * 195;
          svg.append(svgNode("rect", { x: r.value < 0 ? 200 - width : 200, y: 4, width, height: 16 }));
          svg.classList.add(r.value < 0 ? "down" : "up");
          value.replaceChildren(change(r.value), document.createTextNode(` ${unit}`));
        }
        link.replaceChildren(node("strong", r.symbol), svg, value);
        list.append(link);
      });
      const detail = node("p", "Focus or hover a stock for quote details; select it to open its page.");
      detail.className = "chart-detail caption";
      list.addEventListener("focusin", e => { const row = e.target.closest(".data-bar"); if (row) detail.textContent = row.title; });
      list.addEventListener("pointerover", e => { const row = e.target.closest(".data-bar"); if (row) detail.textContent = row.title; });
      figure.append(list, detail);
    }
    results.append(figure);
  }
  function allocationChart(group, currency) {
    const total = group.reduce((sum, h) => sum + h.value, 0);
    if (!math.finite(total) || total <= 0) return;
    const figure = node("figure"), layout = node("div"), legend = node("ol");
    figure.className = "data-figure allocation-chart";
    layout.className = "allocation-layout";
    figure.append(node("h2", `Allocation · ${currency}`));
    const svg = svgNode("svg", { viewBox: "0 0 240 240", role: "img", "aria-label": `Virtual holdings allocation in ${currency}; values and quote times in legend` });
    const center = svgNode("text", { x: 120, y: 116, "text-anchor": "middle", class: "donut-total" });
    center.textContent = fmt(total);
    const sub = svgNode("text", { x: 120, y: 140, "text-anchor": "middle", class: "chart-axis-label" });
    sub.textContent = currency;
    let offset = 0;
    group.forEach((h, i) => {
      if (!math.finite(h.value) || h.value <= 0) return;
      const share = h.value / total * 100;
      const detail = `${h.symbol}: ${fmt(h.value)} ${currency} · ${fmt(share)}% · Quote ${quoteTime(h.timestamp)}`;
      const circle = svgNode("circle", { cx: 120, cy: 120, r: 88, pathLength: 100, fill: "none", "stroke-width": 28,
        "stroke-dasharray": `${share} ${100 - share}`, "stroke-dashoffset": -offset, transform: "rotate(-90 120 120)", class: `series-${i % 5}` });
      const title = svgNode("title"); title.textContent = detail; circle.append(title); svg.append(circle);
      const item = node("li"), link = stockLink(h.symbol);
      link.className = `series-label-${i % 5}`;
      item.append(link, node("strong", `${fmt(share)}%`), node("span", `${fmt(h.value)} ${currency}`), node("small", `Quote ${quoteTime(h.timestamp)}`));
      legend.append(item);
      offset += share;
    });
    svg.append(center, sub);
    layout.append(svg, legend);
    figure.append(layout, node("figcaption", "Latest available quote valuations of hypothetical holdings. Values may be stale; timestamps are shown per holding. No currency conversion."));
    results.append(figure);
  }
  const earningsTiming = hour => ({ bmo: "Before market open", amc: "After market close", dmh: "During market hours" }[hour] || "Timing unspecified");
  function earningsTimeline(rows) {
    const dated = rows.filter(r => typeof r.date === "string" && /^\d{4}-\d{2}-\d{2}$/.test(r.date) && Number.isFinite(Date.parse(r.date)) && new Date(r.date).toISOString().slice(0, 10) === r.date);
    if (!dated.length) return;
    const figure = node("figure");
    figure.className = "data-figure earnings-timeline";
    figure.append(node("h2", "Announcement timeline"), node("figcaption", "Provider announcement dates, subject to change. Estimates and actuals are separate; currencies are unspecified by this endpoint."));
    for (const date of new Set(dated.map(r => r.date))) {
      const day = node("details"), heading = node("summary"), time = node("time", date), events = node("div");
      const daily = dated.filter(r => r.date === date);
      day.open = date === dated[0].date;
      time.dateTime = date;
      heading.append(time, node("span", `${daily.length} events`)); events.className = "earnings-events";
      events.tabIndex = 0; events.setAttribute("aria-label", `Announcements on ${date}; scroll for more events`);
      daily.forEach(r => {
        const card = node("article"), title = node("h4");
        title.append(stockLink(r.symbol));
        card.append(title, node("p", earningsTiming(r.hour)), node("span", math.finite(r.epsActual) ? "EPS reported" : "EPS actual unavailable"));
        const metrics = node("dl");
        [["EPS estimate", r.epsEstimate], ["EPS actual", r.epsActual]].forEach(([label, value]) => {
          const item = node("div"), amount = node("dd", fmt(value));
          if (!math.finite(value)) amount.className = "missing-value";
          item.append(node("dt", label), amount); metrics.append(item);
        });
        card.append(metrics); events.append(card);
      });
      day.append(heading, events); figure.append(day);
    }
    if (dated.length !== rows.length) figure.append(node("p", "Records without a valid announcement date appear only in the table."));
    results.append(figure);
  }
  function read(key, fallback) {
    try {
      return JSON.parse(localStorage.getItem(key)) ?? fallback;
    } catch {
      return fallback;
    }
  }
  function save(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      storageStatus.textContent = "Saved on this device.";
      return true;
    } catch {
      storageStatus.textContent =
        "Browser storage unavailable. Changes are only kept for this visit.";
      return false;
    }
  }
  async function screener() {
    $("research-title").textContent = "Stock screener";
    $("research-description").textContent =
      "Screen 12 selected US companies, not the entire market. Prices use the listed currency; market cap is USD millions. Volume is the provider's 10-day average in millions of shares, not today's volume. Industry is Finnhub's classification. Missing values never pass numeric filters.";
    const filters = {
      query: field("Company or ticker"),
      industry: select("Industry", [["", "All industries"]]),
      price: field("Minimum price (USD)", "number"),
      changePercent: field("Minimum day change (%)", "number"),
      marketCapMillions: field("Minimum market cap (USD millions)", "number"),
      averageVolumeMillions: field(
        "Minimum 10-day average volume (millions)",
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
    const order = select("Order", [
      ["asc", "Ascending"],
      ["desc", "Descending"],
    ]);
    let rows = [],
      failures = 0;
    function values() {
      return {
        ...Object.fromEntries(
          Object.entries(filters).map(([k, f]) => [k, f.value]),
        ),
        desc: order.value === "desc",
      };
    }
    function render() {
      results.replaceChildren();
      const found = math.screen(
        rows.filter((r) => r.currency === "USD"),
        values(),
      );
      if (found.length) bars([...found].sort((a, b) => (math.finite(b.changePercent) ? b.changePercent : -Infinity) - (math.finite(a.changePercent) ? a.changePercent : -Infinity))
        .map(r => ({ symbol: r.symbol, value: r.changePercent, detail: quoteDetail(r) })),
        "Screened stocks · day change", "%", `${found.length} matching stocks. Ranked by change versus previous close; the table retains your chosen sort. Missing changes are not treated as zero. Quote timestamps may differ.`);
      if (!found.length)
        results.append(
          node("p", "No stocks match these filters. Try resetting them."),
        );
      else
        table(
          [
            "Company",
            "Price (USD)",
            "Day change (%)",
            "Industry",
            "Cap (USD m)",
            "10-day avg volume (m)",
            "Price timestamp",
          ],
          found.map((r) => [
            stockLink(r.symbol),
            fmt(r.price),
            change(r.changePercent),
            r.industry || "Unavailable",
            fmt(r.marketCapMillions),
            fmt(r.averageVolumeMillions),
            r.timestamp
              ? new Date(r.timestamp * 1000).toLocaleString()
              : "Unavailable",
          ]),
        );
    }
    Object.values(filters).forEach((f) => f.addEventListener("input", render));
    order.onchange = render;
    button("Reset filters", () => {
      Object.values(filters).forEach(
        (f) => (f.value = f === filters.sort ? "symbol" : ""),
      );
      order.value = "asc";
      render();
    });
    button("Save preset", () => {
      if (save("stocklumo.screener", values()))
        status.textContent = "Filter preset saved on this device.";
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
      render();
    });
    const refresh = button("Refresh data", load);
    async function load() {
      refresh.disabled = true;
      rows = [];
      failures = 0;
      results.replaceChildren();
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
        ? `${rows.length} companies loaded; ${failures} have unavailable or incomplete data. Retry after a minute if limited.`
        : `${rows.length} companies loaded. Quotes cached for up to 60 seconds; fundamentals refresh hourly or less often.`;
      refresh.disabled = false;
      render();
    }
    await load();
  }
  function symbols(value, min = 1, max = 5) {
    const items = [
      ...new Set(
        value
          .toUpperCase()
          .split(/[\s,]+/)
          .filter(Boolean),
      ),
    ];
    if (
      items.length < min ||
      items.length > max ||
      items.some((s) => !/^[A-Z][A-Z0-9.-]{0,14}$/.test(s))
    )
      throw new Error(
        `Enter ${min} to ${max} different stock tickers, separated by commas.`,
      );
    return items;
  }
  function plot(series, label) {
    const usable = series.filter((s) => s.points.length > 1);
    if (!usable.length) {
      results.append(
        node("p", "Insufficient historical observations for a chart."),
      );
      return;
    }
    const points = usable.flatMap((s) => s.points),
      values = points.map((p) => p.value),
      times = points.map((p) => p.time);
    const min = Math.min(...values),
      max = Math.max(...values),
      start = Math.min(...times),
      end = Math.max(...times);
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", "0 0 900 260");
    svg.setAttribute("role", "img");
    svg.setAttribute("aria-label", label);
    svg.classList.add("research-chart");
    // Keep scale labels inside the SVG so they stay aligned at every viewport size.
    [max, (max + min) / 2, min].forEach((value, index) => {
      const text = document.createElementNS(svg.namespaceURI, "text");
      text.setAttribute("x", "12");
      text.setAttribute("y", String(30 + index * 100));
      text.setAttribute("class", "chart-axis-label");
      text.textContent = fmt(value);
      svg.append(text);
    });
    usable.forEach((s, i) => {
      const path = document.createElementNS(svg.namespaceURI, "path");
      path.setAttribute(
        "d",
        s.points
          .map(
            (p, j) =>
              `${j ? "L" : "M"}${100 + ((p.time - start) / (end - start || 1)) * 780},${230 - ((p.value - min) / (max - min || 1)) * 200}`,
          )
          .join(" "),
      );
      path.setAttribute("class", `series-${i % 5}`);
      path.setAttribute("stroke-dasharray", ["none", "8 4", "3 3", "12 4 3 4", "2 5"][i % 5]);
      svg.append(path);
    });
    results.append(
      node("h2", label),
      node(
        "p",
        `Range ${fmt(min)} to ${fmt(max)} | ${new Date(start).toLocaleDateString()} to ${new Date(end).toLocaleDateString()}`,
      ),
      svg,
    );
    const inspection = node("p");
    inspection.className = "chart-detail caption";
    const sliderLabel = node("label", "Inspect chart date"), slider = node("input");
    slider.type = "range"; slider.min = "0"; slider.max = String(usable[0].points.length - 1); slider.value = "0";
    sliderLabel.className = "chart-date-control";
    sliderLabel.append(slider);
    const inspect = index => {
      const point = usable[0].points[index];
      inspection.textContent = `${new Date(point.time).toLocaleDateString()} · ${usable.map(s => `${s.name}: ${fmt(s.points.find(p => p.time === point.time)?.value)}`).join(" · ")}`;
    };
    slider.oninput = () => inspect(Number(slider.value));
    svg.addEventListener("pointermove", event => {
      const box = svg.getBoundingClientRect();
      const fraction = Math.max(0, Math.min(1, ((event.clientX - box.left) / box.width * 900 - 100) / 780));
      const time = start + fraction * (end - start);
      const index = usable[0].points.reduce((best, p, i, all) => Math.abs(p.time - time) < Math.abs(all[best].time - time) ? i : best, 0);
      slider.value = String(index); inspect(index);
    });
    inspect(0);
    results.append(sliderLabel, inspection);
    const legend = node("p");
    legend.className = "chart-legend";
    usable.forEach((s, i) => {
      const entry = node("span", `${s.name}  `);
      entry.className = `series-label-${i % 5}`;
      legend.append(entry);
    });
    results.append(legend);
    const details = node("details"),
      summary = node("summary", "Historical chart values");
    details.append(summary);
    results.append(details);
    const destination = results.lastChild;
    table(
      ["Series", "Date", "Value"],
      usable.flatMap((s) =>
        s.points.map((p) => [
          s.name,
          new Date(p.time).toLocaleDateString(),
          fmt(p.value),
        ]),
      ),
    );
    destination.append(results.lastChild);
  }
  async function compare() {
    $("research-title").textContent = "Compare stocks";
    $("research-description").textContent =
      "Compare 2-5 companies. Financial metrics use the same TTM definitions. Market capitalization is USD millions; stock prices retain their currencies. Charts align common provider dates and start at 100, showing price performance in each stock's currency, excluding dividends and FX returns.";
    const input = field("Tickers (comma-separated)", "text", "AAPL, MSFT");
    input.maxLength = 80;
    const range = select("Shared historical range", [
      ["1M", "1 month"],
      ["6M", "6 months"],
      ["1Y", "1 year"],
    ]);
    const run = button("Compare", load);
    async function load() {
      let items;
      try {
        items = symbols(input.value, 2, 5);
      } catch (e) {
        status.textContent = e.message;
        return;
      }
      setBusy(run, true);
      results.replaceChildren();
      status.textContent = "Loading comparable metrics...";
      const rows = [];
      const history = [];
      for (const symbol of items) {
        rows.push(await get("/api/research/stock/" + symbol));
        const response = await get(
          `/api/data/stock/${symbol}/chart?range=${range.value}`,
        );
        history.push({ name: symbol, points: math.candles(response.data) });
      }
      table(
        [
          "Stock",
          "Price / currency",
          "Day change (%)",
          "Cap (USD m)",
          "P/E TTM",
          "Dividend yield TTM (%)",
          "Quote time",
        ],
        rows.map((r, i) => [
          stockLink(items[i]),
          `${fmt(r.price)} ${r.currency || ""}`,
          change(r.changePercent),
          fmt(r.marketCapMillions),
          fmt(r.peTtm),
          fmt(r.dividendYieldTtm),
          r.timestamp
            ? new Date(r.timestamp * 1000).toLocaleString()
            : r.message || "Unavailable",
        ]),
      );
      const normalized = math.normalize(history);
      if (normalized.length)
        plot(normalized, "Normalized closing prices (base 100)");
      else {
        bars(rows.map((r, i) => ({ symbol: items[i], value: r.changePercent, detail: quoteDetail({ ...r, symbol: items[i] }) })),
          "Selected stocks · day change", "%", "Latest available change versus each stock's previous close, in its own currency. This is a quote snapshot, not a historical return for the selected range. Quote timestamps may differ.");
        results.append(
          node(
            "p",
            "Historical comparison unavailable: Finnhub candle access is restricted, data is missing, or fewer than two common dates exist. No synthetic history is substituted.",
          ),
        );
      }
      status.textContent = rows.some((r) => r.state !== "ok")
        ? "Comparison loaded with missing or limited provider fields. Retry after a minute if limited."
        : "Comparison loaded. Fundamentals are cached; quote times are shown per stock.";
      setBusy(run, false);
    }
  }
  if (page === "/screener") screener();
  if (page === "/compare") compare();
  async function portfolio() {
    $("research-title").textContent = "Virtual portfolio";
    $("research-description").textContent =
      "Record hypothetical holdings only. No trades are placed. Values exclude fees, dividends, taxes, splits and FX conversions. Each currency has its own total. Saved only in this browser; clearing site data removes holdings. Up to 20 lots and 10 different stocks.";
    const ticker = field("Ticker"),
      quantity = field("Quantity", "number"),
      purchase = field("Purchase price (stock currency)", "number"),
      date = field(
        "Purchase date",
        "date",
        new Date().toISOString().slice(0, 10),
      );
    ticker.maxLength = 15;
    quantity.step = "any";
    purchase.step = "any";
    date.max = new Date().toISOString().slice(0, 10);
    let stored = read("stocklumo.portfolio", []),
      holdings = Array.isArray(stored)
        ? stored.filter((h) => math.validHolding(h)).slice(0, 20)
        : [],
      editing = -1,
      busy = false,
      quotes = {};
    const submit = button("Save hypothetical holding", add);
    button("Cancel edit", () => {
      editing = -1;
      ticker.value = "";
      quantity.value = "";
      purchase.value = "";
      submit.textContent = "Save hypothetical holding";
    });
    const refresh = button("Refresh valuations", load);
    const historical = button("Show historical P/L", history);
    async function add() {
      if (busy) return;
      let symbol;
      try {
        [symbol] = symbols(ticker.value, 1, 1);
      } catch (e) {
        status.textContent = e.message;
        return;
      }
      const h = {
        symbol,
        quantity: Number(quantity.value),
        purchasePrice: Number(purchase.value),
        date: date.value,
        currency: "USD",
      };
      if (!math.validHolding(h)) {
        status.textContent =
          "Enter a positive quantity (up to 1 million), positive purchase price (up to 1 billion), and a valid past or current purchase date.";
        return;
      }
      const next = holdings.filter((_, i) => i !== editing);
      if (
        next.length >= 20 ||
        new Set([...next.map((h) => h.symbol), symbol]).size > 10
      ) {
        status.textContent = "Limit reached: 20 lots and 10 stocks.";
        return;
      }
      busy = true;
      submit.disabled = true;
      status.textContent = "Verifying company and currency...";
      const response = await get(`/api/data/stock/${symbol}/profile`);
      if (
        response.data?.ticker !== symbol ||
        !/^[A-Z]{3}$/.test(response.data.currency || "")
      ) {
        status.textContent =
          response.message ||
          "Cannot verify this stock's currency. Holding was not saved.";
        busy = false;
        submit.disabled = false;
        return;
      }
      h.currency = response.data.currency;
      next.push(h);
      holdings = next;
      editing = -1;
      save("stocklumo.portfolio", holdings);
      submit.textContent = "Save hypothetical holding";
      busy = false;
      submit.disabled = false;
      await load();
    }
    function render() {
      results.replaceChildren();
      const valuation = math.valueHoldings(holdings, quotes);
      if (!holdings.length) {
        results.append(node("p", "No hypothetical holdings yet."));
        return;
      }
      table(
        [
          "Stock",
          "Quantity",
          "Purchase price",
          "Purchase date",
          "Cost basis",
          "Latest value",
          "Unrealized P/L",
          "Quote time",
          "Manage",
        ],
        valuation.lots.map((h, i) => {
          const actions = node("div"),
            edit = node("button", "Edit"),
            remove = node("button", "Remove");
          edit.type = remove.type = "button";
          edit.onclick = () => {
            if (busy) return;
            editing = i;
            ticker.value = h.symbol;
            quantity.value = h.quantity;
            purchase.value = h.purchasePrice;
            date.value = h.date;
            submit.textContent = "Update hypothetical holding";
            ticker.focus();
          };
          remove.onclick = () => {
            if (busy) return;
            holdings.splice(i, 1);
            editing = -1;
            save("stocklumo.portfolio", holdings);
            render();
          };
          actions.append(edit, remove);
          return [
            stockLink(h.symbol),
            fmt(h.quantity),
            `${fmt(h.purchasePrice)} ${h.currency}`,
            h.date,
            `${fmt(h.cost)} ${h.currency}`,
            fmt(h.value),
            change(h.profit),
            h.timestamp
              ? new Date(h.timestamp * 1000).toLocaleString()
              : "Unavailable or older than purchase",
            actions,
          ];
        }),
      );
      valuation.groups.forEach((g) => {
        const metrics = node("dl");
        metrics.className = "portfolio-metrics";
        [["Cost basis", g.cost], ["Value", g.value], ["Unrealized P/L", g.profit]].forEach(([label, value]) => {
          const group = node("div"), amount = node("dd");
          amount.append(label === "Unrealized P/L" ? change(value) : node("span", fmt(value)));
          group.append(node("dt", label), amount);
          metrics.append(group);
        });
        results.append(node("h2", `${g.currency} portfolio`), metrics);
        if (g.value === null) {
          results.append(
            node(
              "p",
              "Total and allocation unavailable until every holding has a compatible quote dated on or after purchase.",
            ),
          );
          return;
        }
        const group = valuation.lots.filter((h) => h.currency === g.currency);
        const positions = [...new Set(group.map(h => h.symbol))].map(symbol => {
          const lots = group.filter(h => h.symbol === symbol);
          return { symbol, value: lots.reduce((sum, h) => sum + h.value, 0), profit: lots.reduce((sum, h) => sum + h.profit, 0), timestamp: lots[0].timestamp };
        });
        allocationChart(positions, g.currency);
        bars(positions.map(h => ({ symbol: h.symbol, value: h.profit, detail: `${h.symbol} · Unrealized P/L ${fmt(h.profit)} ${g.currency} · Quote ${quoteTime(h.timestamp)}` })),
          `Unrealized P/L · ${g.currency}`, g.currency, "Hypothetical purchase costs compared with latest available quote values. Not realized profit or historical performance; see quote times below.");
      });
    }
    async function load() {
      if (busy) return;
      busy = true;
      refresh.disabled = submit.disabled = historical.disabled = true;
      status.textContent = "Refreshing valuations...";
      quotes = {};
      for (const symbol of new Set(holdings.map((h) => h.symbol)))
        quotes[symbol] = await get("/api/research/stock/" + symbol);
      render();
      status.textContent =
        "Valuations use provider quote timestamps, not purchase-date prices. Refreshes every 60 seconds while this page is visible.";
      busy = false;
      refresh.disabled = submit.disabled = historical.disabled = false;
    }
    async function history() {
      if (busy) return;
      busy = true;
      historical.disabled = true;
      const series = {};
      status.textContent = "Loading historical closes...";
      for (const symbol of new Set(holdings.map((h) => h.symbol))) {
        const r = await get(`/api/data/stock/${symbol}/chart?range=1Y`);
        series[symbol] = math.candles(r.data);
      }
      render();
      const data = math.portfolioHistory(holdings, series);
      if (data.length && data.every((s) => s.points.length >= 2)) {
        data.forEach((s) => plot([s], s.name));
        results.append(
          node(
            "p",
            "Historical closing-price P/L begins after all purchase dates, within the last year. Assumes these quantities were held continuously. It is not a time-weighted return or live valuation.",
          ),
        );
      } else
        results.append(
          node(
            "p",
            "Historical P/L unavailable: sufficient common closing prices after every purchase date are required. Current Finnhub candle access may be restricted.",
          ),
        );
      status.textContent = "Historical check complete.";
      busy = false;
      historical.disabled = false;
    }
    render();
    await load();
    const timer = setInterval(() => {
      if (!document.hidden && editing < 0) load();
    }, 60000);
    window.addEventListener("pagehide", () => clearInterval(timer), {
      once: true,
    });
  }
  if (page === "/portfolio") portfolio();
  function earnings() {
    $("research-title").textContent = "Earnings calendar";
    $("research-description").textContent =
      "Provider-reported dates and estimates can change. Actual results stay unavailable until reported. Fiscal period dates are not announcement dates. EPS is per share; revenue is in whole currency units. These endpoints do not specify currency, so values must not be compared or summed across companies.";
    const ticker = field("Ticker (blank for calendar)");
    ticker.maxLength = 15;
    const mode = select("Display", [
      ["calendar", "Earnings calendar"],
      ["reported", "Latest 4 reported quarters per stock"],
    ]);
    const today = new Date(),
      end = new Date(today);
    end.setUTCDate(end.getUTCDate() + 30);
    const from = field(
        "From (calendar)",
        "date",
        today.toISOString().slice(0, 10),
      ),
      to = field("To (calendar)", "date", end.toISOString().slice(0, 10));
    const scope = select("Filter", [
      ["all", "All / selected ticker"],
      ["watch", "My watchlist"],
    ]);
    mode.onchange = () => {
      from.parentElement.hidden = to.parentElement.hidden =
        mode.value === "reported";
    };
    const run = button("Load earnings", async () => {
      let selected = null;
      try {
        if (ticker.value.trim()) [selected] = symbols(ticker.value, 1, 1);
      } catch (e) {
        status.textContent = e.message;
        return;
      }
      const saved = read("stocklumo.watch", []),
        watch = Array.isArray(saved)
          ? saved
              .filter(
                (s) =>
                  typeof s === "string" && /^[A-Z][A-Z0-9.-]{0,14}$/.test(s),
              )
              .slice(0, 20)
          : [];
      if (
        scope.value === "watch" &&
        (!watch.length || (selected && !watch.includes(selected)))
      ) {
        results.replaceChildren(
          node("p", "No matching stocks in your watchlist."),
        );
        status.textContent = "No requests needed.";
        return;
      }
      if (mode.value === "reported" && !selected && scope.value !== "watch") {
        status.textContent =
          "Enter a ticker or choose My watchlist for reported results.";
        return;
      }
      setBusy(run, true);
      results.replaceChildren();
      status.textContent = "Loading earnings...";
      let rows = [],
        errors = [];
      if (mode.value === "calendar") {
        const query = new URLSearchParams({ from: from.value, to: to.value });
        if (selected) query.set("symbol", selected);
        const r = await get("/api/research/earnings?" + query);
        if (r.state !== "ok") errors.push(r.message || "Earnings unavailable.");
        rows = Array.isArray(r.data?.earningsCalendar)
          ? r.data.earningsCalendar
          : [];
        rows = rows
          .filter(
            (r) =>
              r &&
              typeof r.symbol === "string" &&
              /^[A-Z][A-Z0-9.-]{0,14}$/.test(r.symbol) &&
              (!selected || r.symbol === selected) &&
              (scope.value !== "watch" || watch.includes(r.symbol)),
          )
          .sort((a, b) => String(a.date).localeCompare(String(b.date)));
        earningsTimeline(rows);
        table(
          [
            "Ticker",
            "Announcement date",
            "Timing",
            "EPS estimate",
            "EPS actual",
            "Revenue estimate",
            "Revenue actual",
          ],
          rows.map((r) => [
            stockLink(r.symbol),
            r.date || "Unavailable",
            {
              bmo: "Before market open",
              amc: "After market close",
              dmh: "During market hours",
            }[r.hour] || "Unspecified",
            fmt(r.epsEstimate),
            fmt(r.epsActual),
            fmt(r.revenueEstimate),
            fmt(r.revenueActual),
          ]),
        );
      } else {
        for (const symbol of selected ? [selected] : [...new Set(watch)]) {
          const r = await get(`/api/research/earnings/${symbol}/reported`);
          if (r.state !== "ok")
            errors.push(`${symbol}: ${r.message || "Unavailable"}`);
          if (Array.isArray(r.data))
            rows.push(...r.data.filter((row) => row && row.symbol === symbol));
        }
        table(
          [
            "Ticker",
            "Fiscal period end",
            "Fiscal year / quarter",
            "EPS estimate",
            "EPS actual",
            "Surprise (%)",
          ],
          rows.map((r) => [
            stockLink(r.symbol),
            r.period || "Unavailable",
            `${r.year ?? "-"} / ${r.quarter ?? "-"}`,
            fmt(r.estimate),
            fmt(r.actual),
            fmt(r.surprisePercent),
          ]),
        );
      }
      if (!rows.length)
        results.append(
          node(
            "p",
            errors.length
              ? "Provider data could not be loaded. Retry when access is available."
              : "No earnings found for these filters.",
          ),
        );
      status.textContent = errors.length
        ? errors.join(" ")
        : `${rows.length} records loaded. Provider data is cached for up to an hour.`;
      setBusy(run, false);
    });
  }
  if (page === "/earnings") earnings();
})();
