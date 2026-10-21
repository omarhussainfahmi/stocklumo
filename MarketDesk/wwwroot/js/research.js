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
  const actions = document.createElement("div");
  actions.className = "research-actions";
  controls.append(actions);
  const storageStatus = document.createElement("p");
  storageStatus.setAttribute("role", "status");
  controls.after(storageStatus);
  controls.addEventListener("input", event => {
    event.target.removeAttribute("aria-invalid");
    status.classList.remove("validation-error");
    status.setAttribute("role", "status");
  });
  function validationError(message, inputs) {
    status.textContent = message;
    status.classList.add("validation-error");
    status.setAttribute("role", "alert");
    inputs.forEach(input => input.setAttribute("aria-invalid", "true"));
    inputs[0]?.focus();
  }
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
  function introduction(description, notes) {
    $("research-description").textContent = description;
    $("research-notes").textContent = notes;
  }
  function field(label, type = "text", value = "") {
    const wrap = node("label", label),
      input = node("input");
    input.type = type;
    input.value = value;
    input.setAttribute("aria-describedby", "research-status");
    if (type === "date") {
      // iOS date controls add horizontal padding outside their assigned width.
      const frame = node("span");
      frame.className = "date-field";
      frame.append(input);
      wrap.append(frame);
    } else wrap.append(input);
    controls.insertBefore(wrap, actions);
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
    controls.insertBefore(wrap, actions);
    return input;
  }
  function button(label, action) {
    const b = node("button", label);
    b.type = "button";
    b.onclick = action;
    actions.append(b);
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
  function table(headers, rows, destination = results) {
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
    destination.append(wrap);
    return wrap;
  }
  function pagedTable(headers, rows, cells) {
    if (rows.length <= 25) return table(headers, rows.map(cells));
    const group = node("section"), viewport = node("div"), navigation = node("nav"), count = node("p");
    group.className = "paged-results"; navigation.className = "pagination";
    navigation.setAttribute("aria-label", "Earnings result pages");
    count.className = "caption"; count.setAttribute("role", "status");
    const previous = node("button", "Previous"), next = node("button", "Next"), label = node("label", "Rows per page "), size = node("select");
    previous.type = next.type = "button";
    [25, 50, 100].forEach(value => { const option = node("option", String(value)); option.value = String(value); size.append(option); });
    label.append(size); navigation.append(count, label, previous, next); group.append(navigation, viewport); results.append(group);
    let page = 0;
    function render(focus = false) {
      const limit = Number(size.value), pages = Math.ceil(rows.length / limit);
      page = Math.max(0, Math.min(page, pages - 1));
      viewport.replaceChildren(); table(headers, rows.slice(page * limit, (page + 1) * limit).map(cells), viewport);
      count.textContent = `${page * limit + 1}-${Math.min((page + 1) * limit, rows.length)} of ${rows.length} records · Page ${page + 1} / ${pages}`;
      previous.disabled = page === 0; next.disabled = page === pages - 1;
      if (focus) { count.tabIndex = -1; count.focus({ preventScroll: true }); }
    }
    previous.onclick = () => { page--; render(true); }; next.onclick = () => { page++; render(true); };
    size.onchange = () => { page = 0; render(); }; render();
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
  function metricDefinitions(entries) {
    const list = node("dl"); list.className = "inspector-metrics";
    entries.forEach(([label, value]) => {
      const group = node("div"); group.append(node("dt", label), node("dd", value)); list.append(group);
    });
    return list;
  }
  function distributionChart(rows, selected, onSelect, destination) {
    const data = math.distribution(rows), figure = node("figure");
    figure.className = "data-figure distribution-chart";
    figure.append(node("h2", "Size vs day change"));
    if (!data) { figure.append(node("p", "Market cap and change unavailable.")); destination.append(figure); return; }
    const svg = svgNode("svg", { viewBox: "0 0 400 250", role: "group", "aria-label": "Matching stocks: market cap on a logarithmic horizontal scale, day change on the vertical scale. Select a point to inspect." });
    const y = value => data.maxChange === data.minChange ? 112 : 200 - (value - data.minChange) / (data.maxChange - data.minChange) * 175;
    [data.minChange, (data.minChange + data.maxChange) / 2, data.maxChange].forEach(value => {
      svg.append(svgNode("line", { x1: 58, x2: 376, y1: y(value), y2: y(value), class: "distribution-grid" }));
      const text = svgNode("text", { x: 50, y: y(value) + 4, "text-anchor": "end", class: "chart-axis-label" }); text.textContent = `${fmt(value)}%`; svg.append(text);
    });
    svg.append(svgNode("line", { x1: 58, x2: 376, y1: y(0), y2: y(0), class: "distribution-zero" }));
    [[data.minCap, 58, "start"], [data.maxCap, 376, "end"]].forEach(([value, x, anchor]) => {
      const text = svgNode("text", { x, y: 228, "text-anchor": anchor, class: "chart-axis-label" }); text.textContent = fmt(value); svg.append(text);
    });
    data.points.forEach(point => {
      const row = rows.find(r => r.symbol === point.symbol), group = svgNode("g", { role: "button", tabindex: 0,
        "aria-label": `Inspect ${quoteDetail(row)}`, "aria-pressed": String(selected === row.symbol), class: "distribution-point" });
      const title = svgNode("title"); title.textContent = `${row.symbol} · ${fmt(row.marketCapMillions)} USD m · ${fmt(row.changePercent)}%`;
      group.append(title, svgNode("circle", { cx: 58 + point.x * 318, cy: 200 - point.y * 175, r: 6, class: row.changePercent < 0 ? "down" : "up" }));
      group.onclick = () => onSelect(row.symbol);
      group.onkeydown = event => { if (["Enter", " "].includes(event.key)) { event.preventDefault(); onSelect(row.symbol); } };
      svg.append(group);
    });
    figure.append(svg, node("figcaption", `${data.points.length} / ${rows.length} matches with data. Cap: USD m (log). Change: %. Select a point.`));
    destination.append(figure);
  }
  function epsBars(estimate, actual, domain = [estimate, actual]) {
    const svg = svgNode("svg", { viewBox: "0 0 240 44", preserveAspectRatio: "none", "aria-hidden": "true", class: "eps-bars" });
    const values = domain.filter(math.finite), max = Math.max(0, ...values), min = Math.min(0, ...values), span = max - min || 1;
    const x = v => 6 + (v - min) / span * 228;
    svg.append(svgNode("line", { x1: x(0), x2: x(0), y1: 0, y2: 44, class: "distribution-zero" }));
    [estimate, actual].forEach((value, index) => {
      if (!math.finite(value)) return;
      svg.append(svgNode("rect", { x: Math.min(x(0), x(value)), y: 4 + index * 20, width: Math.abs(x(value) - x(0)), height: 12, class: index ? "eps-actual" : "eps-estimate" }));
      if (value === 0) svg.append(svgNode("circle", { cx: x(0), cy: 10 + index * 20, r: 2, class: index ? "eps-actual" : "eps-estimate" }));
    });
    return svg;
  }
  function comparisonMetrics(rows, symbols) {
    const grid = node("div"); grid.className = "comparison-metrics";
    for (const [key, label, unit] of [["marketCapMillions", "Market cap", "USD m"], ["peTtm", "P/E TTM", "x"], ["dividendYieldTtm", "Dividend yield TTM", "%"]]) {
      const figure = node("figure"); figure.className = "data-figure metric-comparison";
      figure.append(node("h2", label), node("figcaption", unit));
      const values = rows.map(r => r[key]).filter(math.finite), min = Math.min(0, ...values), max = Math.max(0, ...values), span = max - min || 1;
      const x = v => (v - min) / span * 200;
      rows.forEach((r, i) => {
        const line = node("div"), svg = svgNode("svg", { viewBox: "0 0 200 16", preserveAspectRatio: "none", "aria-hidden": "true" });
        line.className = "metric-lane";
        svg.append(svgNode("line", { x1: x(0), x2: x(0), y1: 0, y2: 16, class: "distribution-zero" }));
        if (math.finite(r[key])) svg.append(svgNode("rect", { x: Math.min(x(0), x(r[key])), y: 3, width: Math.abs(x(r[key]) - x(0)), height: 10, class: "metric-fill" }));
        line.append(stockLink(symbols[i]), svg, node("span", fmt(r[key]))); figure.append(line);
      });
      grid.append(figure);
    }
    results.append(grid);
  }
  function reportedEPS(rows) {
    for (const symbol of new Set(rows.map(r => r.symbol))) {
      const reports = rows.filter(r => r.symbol === symbol), figure = node("figure"), grid = node("div");
      figure.className = "data-figure reported-eps"; grid.className = "reported-grid";
      figure.append(node("h2", `${symbol} · EPS by fiscal quarter`), node("figcaption", "Quarter-end dates. Shared EPS scale within this stock; currency unspecified."));
      const domain = reports.flatMap(r => [r.estimate, r.actual]);
      for (const report of reports) {
        const card = node("article");
        card.append(node("h3", `Q${report.quarter ?? "-"} / ${report.year ?? "-"}`), node("p", `Period end: ${report.period || "Unavailable"}`), epsBars(report.estimate, report.actual, domain),
          metricDefinitions([["EPS estimate", fmt(report.estimate)], ["EPS actual", fmt(report.actual)]]));
        grid.append(card);
      }
      figure.append(grid); results.append(figure);
    }
  }
  // HTML labels remain readable on narrow screens; SVG bars share a zero baseline.
  function bars(rows, label, unit, description, destination = results) {
    const figure = node("figure"), caption = node("figcaption", description);
    figure.className = "data-figure bar-chart";
    figure.setAttribute("aria-label", label);
    figure.append(node("h2", label), caption);
    const available = rows.filter(r => math.finite(r.value));
    if (!available.length) {
      figure.append(node("p", "No comparable values available."));
    } else {
      const scale = Math.max(...available.map(r => Math.abs(r.value)), 0.01);
      const list = node("div");
      list.className = "bar-list";
      rows.forEach(r => {
        const link = stockLink(r.symbol);
        link.className = "data-bar";
        link.title = r.detail;
        link.setAttribute("aria-label", `${r.detail}; open stock details`);
        const svg = svgNode("svg", { viewBox: "0 0 400 32", preserveAspectRatio: "none", "aria-hidden": "true" });
        svg.append(svgNode("line", { x1: 200, x2: 200, y1: 0, y2: 32 }));
        const value = node("span", "Unavailable");
        if (math.finite(r.value)) {
          const width = Math.abs(r.value) / scale * 195;
          svg.append(svgNode("rect", { x: r.value < 0 ? 200 - width : 200, y: 4, width, height: 24 }));
          svg.classList.add(r.value < 0 ? "down" : "up");
          value.replaceChildren(change(r.value), document.createTextNode(` ${unit}`));
        }
        link.replaceChildren(node("strong", r.symbol), svg, value);
        list.append(link);
      });
      const detail = node("p", "Hover or focus for quote details. Select to open.");
      detail.className = "chart-detail caption";
      list.addEventListener("focusin", e => { const row = e.target.closest(".data-bar"); if (row) detail.textContent = row.title; });
      list.addEventListener("pointerover", e => { const row = e.target.closest(".data-bar"); if (row) detail.textContent = row.title; });
      figure.append(list, detail);
    }
    destination.append(figure);
  }
  function allocationChart(group, currency, destination = results) {
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
    figure.append(layout, node("figcaption", "Practice holdings at latest quotes. Check times; currencies stay separate."));
    destination.append(figure);
  }
  const earningsTiming = hour => ({ bmo: "Before market open", amc: "After market close", dmh: "During market hours" }[hour] || "Timing unspecified");
  function earningsTimeline(rows) {
    const dated = rows.filter(r => typeof r.date === "string" && /^\d{4}-\d{2}-\d{2}$/.test(r.date) && Number.isFinite(Date.parse(r.date)) && new Date(r.date).toISOString().slice(0, 10) === r.date);
    if (!dated.length) return;
    const figure = node("figure");
    figure.className = "data-figure earnings-timeline";
    figure.append(node("h2", "Announcement timeline"), node("figcaption", "EPS bars compare estimate and actual within each report. Dates may change; currency unspecified."));
    const grouped = new Map();
    dated.forEach(row => { if (!grouped.has(row.date)) grouped.set(row.date, []); grouped.get(row.date).push(row); });
    for (const [date, daily] of grouped) {
      const day = node("details"), heading = node("summary"), time = node("time", date), events = node("div");
      day.open = date === dated[0].date;
      time.dateTime = date;
      heading.append(time, node("span", `${daily.length} events`)); events.className = "earnings-events";
      events.tabIndex = 0; events.setAttribute("aria-label", `Announcements on ${date}; scroll for more events`);
      let rendered = 0;
      const more = node("button"); more.type = "button"; more.className = "more-events"; more.hidden = true;
      function renderBatch(focus = false) {
        if (!day.open || rendered >= daily.length) return;
        let first;
        const batch = daily.slice(rendered, rendered + 25);
        batch.forEach(r => {
          const card = node("article"), title = node("h4");
          title.tabIndex = -1; first ??= title;
          title.append(stockLink(r.symbol));
          card.append(title, node("p", earningsTiming(r.hour)), node("span", math.finite(r.epsActual) ? "EPS reported" : "EPS actual unavailable"));
          const metrics = node("dl");
          [["EPS estimate", r.epsEstimate], ["EPS actual", r.epsActual]].forEach(([label, value]) => {
            const item = node("div"), amount = node("dd", fmt(value));
            if (!math.finite(value)) amount.className = "missing-value";
            item.append(node("dt", label), amount); metrics.append(item);
          });
          card.append(epsBars(r.epsEstimate, r.epsActual), metrics); events.append(card);
        });
        rendered += batch.length;
        more.hidden = rendered >= daily.length;
        more.textContent = `Show ${Math.min(25, daily.length - rendered)} more of ${daily.length - rendered} remaining`;
        if (focus) first?.focus({ preventScroll: true });
      }
      more.onclick = () => renderBatch(true);
      day.append(heading, events, more); figure.append(day);
      day.addEventListener("toggle", () => { if (!rendered) renderBatch(); });
      if (day.open) renderBatch();
    }
    if (dated.length !== rows.length) figure.append(node("p", "Undated records appear in the table only."));
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
        "Storage unavailable. Changes last for this visit.";
      return false;
    }
  }
  async function screener() {
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
    let inspected = null;
    function render() {
      results.replaceChildren();
      const found = math.screen(rows.filter(r => r.currency === "USD"), values());
      if (!found.length) { results.append(node("p", "No matches. Try resetting filters.")); return; }
      if (!found.some(r => r.symbol === inspected)) inspected = found[0].symbol;
      const workspace = node("div"), list = node("div"), inspector = node("aside");
      workspace.className = "screener-workspace"; list.className = "screener-list";
      inspector.className = "stock-inspector"; inspector.setAttribute("aria-label", "Company inspector");
      workspace.append(list, inspector); results.append(workspace);
      function inspect(ticker, focus = false) {
        inspected = ticker;
        const r = found.find(row => row.symbol === ticker);
        inspector.replaceChildren();
        const head = node("div"), title = node("h2", r.name || r.symbol), link = stockLink(r.symbol);
        head.className = "inspector-heading"; title.tabIndex = -1;
        head.append(node("p", "COMPANY INSPECTOR"), title, link, node("span", r.industry || "Industry unavailable"));
        const quote = node("div"); quote.className = "inspector-quote";
        quote.append(node("strong", math.finite(r.price) ? `${fmt(r.price)} ${r.currency}` : "Unavailable"), change(r.changePercent), node("span", "% vs previous close"));
        inspector.append(head, quote, node("p", `Quote ${quoteTime(r.timestamp)}`));
        inspector.append(metricDefinitions([["Market cap (USD m)", fmt(r.marketCapMillions)], ["P/E TTM", fmt(r.peTtm)],
          ["Dividend yield TTM (%)", fmt(r.dividendYieldTtm)], ["10-day avg volume (m)", fmt(r.averageVolumeMillions)]]));
        const open = stockLink(r.symbol); open.textContent = "Open stock details "; open.className = "button-link";
        const arrow = node("span"); arrow.className = "direction-icon direction-right"; arrow.setAttribute("aria-hidden", "true");
        open.append(arrow); inspector.append(open);
        distributionChart(found, inspected, ticker => inspect(ticker), inspector);
        list.querySelectorAll("button[data-inspect]").forEach(b => {
          const active = b.dataset.inspect === ticker;
          b.setAttribute("aria-pressed", String(active)); b.closest("tr").classList.toggle("is-inspected", active);
        });
        if (focus && window.matchMedia("(max-width: 850px)").matches) { title.focus({ preventScroll: true }); inspector.scrollIntoView({ block: "start" }); }
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
        }), list);
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
      render();
    });
    button("Save preset", () => {
      if (save("stocklumo.screener", values()))
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
        ? `${rows.length} companies; ${failures} with missing data. Retry in a minute if limited.`
        : `${rows.length} companies. Quotes cached 60s; fundamentals refresh less often.`;
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
        min === 1 && max === 1 ? "Enter one valid ticker." : `Enter ${min} to ${max} different stock tickers, separated by commas.`,
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
    introduction("Compare 2-5 stocks, their fundamentals and price performance.",
      "Metrics use trailing 12 months (TTM); market cap is USD millions. Prices keep their currencies. Historical charts share dates and start at 100, excluding dividends and currency conversion. Quote snapshots use each stock's previous close.");
    const input = field("Tickers (comma-separated)", "text", "AAPL, MSFT");
    input.maxLength = 80;
    const range = select("Historical range", [
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
        validationError(e.message, [input]);
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
      comparisonMetrics(rows, items);
      const normalized = math.normalize(history);
      if (normalized.length)
        plot(normalized, "Normalized closing prices (base 100)");
      else {
        bars(rows.map((r, i) => ({ symbol: items[i], value: r.changePercent, detail: quoteDetail({ ...r, symbol: items[i] }) })),
          "Selected stocks · day change", "%", "Day change in each stock's currency, not a historical return. Quote times vary.");
        results.append(
          node(
            "p",
            "Historical comparison unavailable: insufficient shared dates or provider access.",
          ),
        );
      }
      status.textContent = rows.some((r) => r.state !== "ok")
        ? "Loaded with missing fields. Retry in a minute if limited."
        : "Comparison loaded. Check each quote time.";
      setBusy(run, false);
    }
  }
  if (page === "/screener") screener();
  if (page === "/compare") compare();
  async function portfolio() {
    $("research-title").textContent = "Virtual portfolio";
    introduction("Practice holdings. No real trades. Saved only in this browser.",
      "Up to 20 lots across 10 stocks. Enter purchase prices in the stock's currency. Totals stay separate by currency; fees, dividends, taxes, splits and FX conversion are excluded. Clearing browser data removes holdings. Values use quote times, not purchase-date market prices.");
    const ticker = field("Ticker"),
      quantity = field("Quantity", "number"),
      purchase = field("Purchase price (per share)", "number"),
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
    const submit = button("Save holding", add);
    button("Cancel edit", () => {
      editing = -1;
      ticker.value = "";
      quantity.value = "";
      purchase.value = "";
      submit.textContent = "Save holding";
    });
    const refresh = button("Refresh valuations", load);
    const historical = button("Historical P/L", history);
    async function add() {
      if (busy) return;
      let symbol;
      try {
        [symbol] = symbols(ticker.value, 1, 1);
      } catch (e) {
        validationError(e.message, [ticker]);
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
        validationError("Quantity and price must be above zero (max. 1m shares and 1bn per share). Use today or an earlier date.",
          [quantity, purchase, date].filter(input => input === quantity ? !(h.quantity > 0 && h.quantity <= 1000000) : input === purchase ? !(h.purchasePrice > 0 && h.purchasePrice <= 1000000000) : !h.date || h.date > date.max));
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
          "Currency unverified. Holding not saved.";
        busy = false;
        submit.disabled = false;
        return;
      }
      h.currency = response.data.currency;
      next.push(h);
      holdings = next;
      editing = -1;
      save("stocklumo.portfolio", holdings);
      submit.textContent = "Save holding";
      busy = false;
      submit.disabled = false;
      await load();
    }
    function render() {
      results.replaceChildren();
      const valuation = math.valueHoldings(holdings, quotes);
      if (!holdings.length) {
        results.append(node("p", "No practice holdings yet. Add your first above."));
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
            submit.textContent = "Update holding";
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
        [["Cost basis", g.cost], ["Value", g.value], ["Unrealized P/L", g.profit], ["Unrealized return", math.finite(g.profit) && g.cost > 0 ? g.profit / g.cost * 100 : null]].forEach(([label, value]) => {
          const group = node("div"), amount = node("dd");
          amount.append(label.startsWith("Unrealized") ? change(value) : node("span", fmt(value)));
          if (label === "Unrealized return" && math.finite(value)) amount.append(document.createTextNode("%"));
          group.append(node("dt", label), amount);
          metrics.append(group);
        });
        results.append(node("h2", `${g.currency} portfolio`), metrics);
        if (g.value === null) {
          results.append(
            node(
              "p",
              "Total and allocation unavailable: each holding needs a quote on or after purchase.",
            ),
          );
          return;
        }
        const group = valuation.lots.filter((h) => h.currency === g.currency);
        const positions = [...new Set(group.map(h => h.symbol))].map(symbol => {
          const lots = group.filter(h => h.symbol === symbol);
          return { symbol, value: lots.reduce((sum, h) => sum + h.value, 0), profit: lots.reduce((sum, h) => sum + h.profit, 0), timestamp: lots[0].timestamp };
        });
        const visuals = node("div");
        visuals.className = "portfolio-visuals";
        results.append(visuals);
        allocationChart(positions, g.currency, visuals);
        bars(positions.map(h => ({ symbol: h.symbol, value: h.profit, detail: `${h.symbol} · Unrealized P/L ${fmt(h.profit)} ${g.currency} · Quote ${quoteTime(h.timestamp)}` })),
          `Unrealized P/L · ${g.currency}`, g.currency, "Practice costs vs latest quotes. Unrealized profit, not historical returns.", visuals);
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
        "Latest quote valuations. Refreshes every 60s while visible.";
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
            "Closing-price P/L after all purchases, within one year. Assumes continuous holdings; not time-weighted or live.",
          ),
        );
      } else
        results.append(
          node(
            "p",
            "Historical P/L unavailable: missing shared closes after purchase or restricted candle access.",
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
    introduction("Earnings dates, estimates and results. Dates may change.",
      "Actuals appear when reported. Fiscal period ends are not announcement dates. EPS is per share; revenue is in whole units. Finnhub does not specify currency here: do not compare or sum amounts across companies.");
    const ticker = field("Ticker (optional)");
    ticker.maxLength = 15;
    const mode = select("Display", [
      ["calendar", "Earnings calendar"],
      ["reported", "Last 4 reported quarters"],
    ]);
    const today = new Date(),
      end = new Date(today);
    end.setUTCDate(end.getUTCDate() + 30);
    const from = field(
        "From",
        "date",
        today.toISOString().slice(0, 10),
      ),
      to = field("To", "date", end.toISOString().slice(0, 10));
    const scope = select("Filter", [
      ["all", "All / selected ticker"],
      ["watch", "My watchlist"],
    ]);
    mode.onchange = () => {
      from.closest("label").hidden = to.closest("label").hidden =
        mode.value === "reported";
    };
    const run = button("Load earnings", async () => {
      let selected = null;
      try {
        if (ticker.value.trim()) [selected] = symbols(ticker.value, 1, 1);
      } catch (e) {
        validationError(e.message, [ticker]);
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
        validationError("Enter a ticker or choose My watchlist for reported results.", [ticker]);
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
        pagedTable(
          [
            "Ticker",
            "Announcement date",
            "Timing",
            "EPS estimate",
            "EPS actual",
            "Revenue estimate",
            "Revenue actual",
          ],
          rows, (r) => [
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
          ],
        );
      } else {
        for (const symbol of selected ? [selected] : [...new Set(watch)]) {
          const r = await get(`/api/research/earnings/${symbol}/reported`);
          if (r.state !== "ok")
            errors.push(`${symbol}: ${r.message || "Unavailable"}`);
          if (Array.isArray(r.data))
            rows.push(...r.data.filter((row) => row && row.symbol === symbol));
        }
        reportedEPS(rows);
        pagedTable(
          [
            "Ticker",
            "Fiscal period end",
            "Fiscal year / quarter",
            "EPS estimate",
            "EPS actual",
            "Surprise (%)",
          ],
          rows, (r) => [
            stockLink(r.symbol),
            r.period || "Unavailable",
            `${r.year ?? "-"} / ${r.quarter ?? "-"}`,
            fmt(r.estimate),
            fmt(r.actual),
            fmt(r.surprisePercent),
          ],
        );
      }
      if (!rows.length)
        results.append(
          node(
            "p",
            errors.length
              ? "Provider data unavailable. Try again later."
              : "No earnings found for these filters.",
          ),
        );
      status.textContent = errors.length
        ? errors.join(" ")
        : `${rows.length} records. Cached up to 1 hour.`;
      setBusy(run, false);
    });
  }
  if (page === "/earnings") earnings();
})();
