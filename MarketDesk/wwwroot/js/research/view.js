(() => {
  "use strict";

  /** @typedef {string|number|boolean|null|undefined|Node} Cell */
  /** @typedef {{symbol:string,name?:string,currency?:string|null,price?:number|null,changePercent?:number|null,marketCapMillions?:number|null,averageVolumeMillions?:number|null,peTtm?:number|null,dividendYieldTtm?:number|null,timestamp?:number|null}} StockRow */
  /** @typedef {{symbol:string,value:number|null,detail:string}} BarRow */
  /** @typedef {{symbol:string,value:number,timestamp?:number|null}} AllocationRow */
  /** @typedef {{symbol:string,estimate?:number|null,actual?:number|null,quarter?:number|null,year?:number|null,period?:string|null}} ReportedEarning */
  /** @typedef {{symbol:string,date?:string,currency?:string|null,hour?:string,epsEstimate?:number|null,epsActual?:number|null}} CalendarEarning */
  /** @typedef {{name:string,points:{time:number,value:number}[]}} Series */

  /** Presentation only: no requests, persistent storage, route decisions or timers.
   * Bind an explicit results host; selection actions stay owned by the caller.
   * @param {HTMLElement} results
   */
  function forHost(results) {
    const math = window.StocklumoMath;
    /** @template {keyof HTMLElementTagNameMap} K
     * @param {K} tag @param {string|number|null} [text]
     * @returns {HTMLElementTagNameMap[K]} */
    const node = (tag, text) => {
      const n = document.createElement(tag);
      if (text != null) n.textContent = text;
      return n;
    };
    /** @param {unknown} value @returns {string} */
    const fmt = (value) =>
      math.finite(value)
        ? value.toLocaleString(undefined, { maximumFractionDigits: 2 })
        : "Unavailable";
    /** @param {string[]} headers @param {Cell[][]} rows
     * @param {HTMLElement} [destination] @param {string} [caption]
     * @returns {HTMLDivElement} */
    function table(headers, rows, destination = results, caption = "Research results") {
      const wrap = node("div"),
        table = node("table"),
        head = node("thead"),
        tr = node("tr"),
        body = node("tbody");
      wrap.className = "table-wrap";
      wrap.tabIndex = 0;
      wrap.setAttribute("aria-label", `${caption}; scroll horizontally if needed`);
      const name = node("caption", caption);
      name.className = "sr-only";
      table.append(name);
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
    /** @template T @param {string[]} headers @param {T[]} rows
     * @param {(row:T)=>Cell[]} cells @param {string} caption
     * @returns {HTMLDivElement|undefined} */
    function pagedTable(headers, rows, cells, caption) {
      if (rows.length <= 25) return table(headers, rows.map(cells), results, caption);
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
        viewport.replaceChildren(); table(headers, rows.slice(page * limit, (page + 1) * limit).map(cells), viewport, caption);
        count.textContent = `${page * limit + 1}-${Math.min((page + 1) * limit, rows.length)} of ${rows.length} records · Page ${page + 1} / ${pages}`;
        previous.disabled = page === 0; next.disabled = page === pages - 1;
        if (focus) { count.tabIndex = -1; count.focus({ preventScroll: true }); }
      }
      previous.onclick = () => { page--; render(true); }; next.onclick = () => { page++; render(true); };
      size.onchange = () => { page = 0; render(); }; render();
    }
    /** @param {number|null|undefined} value @returns {HTMLSpanElement} */
    function change(value) {
      const label = node("span", math.finite(value) ? `${value > 0 ? "+" : ""}${fmt(value)}` : "Unavailable");
      if (math.finite(value)) label.className = value < 0 ? "down" : value > 0 ? "up" : "muted";
      return label;
    }
    /** @param {string} symbol @returns {HTMLAnchorElement} */
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
    /** @param {number|null|undefined} timestamp Unix seconds. @returns {string} */
    const quoteTime = timestamp => math.finite(timestamp) && timestamp > 0 && timestamp <= 253402300799
      ? new Date(timestamp * 1000).toISOString().replace("T", " ").replace(".000Z", " UTC") : "Unavailable";
    /** @param {StockRow} r @returns {string} */
    function quoteDetail(r) {
      return `${r.symbol} · ${r.name || r.symbol} · Price ${fmt(r.price)} ${r.currency || ""} · Change ${fmt(r.changePercent)}% · Quote ${quoteTime(r.timestamp)}`;
    }
    /** @param {[string,string][]} entries @returns {HTMLDListElement} */
    function metricDefinitions(entries) {
      const list = node("dl"); list.className = "inspector-metrics";
      entries.forEach(([label, value]) => {
        const group = node("div"); group.append(node("dt", label), node("dd", value)); list.append(group);
      });
      return list;
    }
    /** @param {StockRow[]} rows @param {string|null} selected
     * @param {(symbol:string,focus?:boolean)=>void} onSelect
     * @param {HTMLElement} destination @returns {void} */
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
        group.dataset.symbol = row.symbol;
        const title = svgNode("title"); title.textContent = `${row.symbol} · ${fmt(row.marketCapMillions)} USD m · ${fmt(row.changePercent)}%`;
        group.append(title, svgNode("circle", { cx: 58 + point.x * 318, cy: 200 - point.y * 175, r: 6, class: row.changePercent < 0 ? "down" : "up" }));
        group.onclick = () => onSelect(row.symbol);
        group.onkeydown = event => { if (["Enter", " "].includes(event.key)) { event.preventDefault(); onSelect(row.symbol, true); } };
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
    /** @param {StockRow[]} rows @param {string[]} symbols @returns {void} */
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
    /** @param {ReportedEarning[]} rows @returns {void} */
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
    /** @param {BarRow[]} rows @param {string} label @param {string} unit
     * @param {string} description @param {HTMLElement} [destination] @returns {void} */
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
    /** @param {AllocationRow[]} group @param {string} currency
     * @param {HTMLElement} [destination] @returns {void} */
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
    /** @param {CalendarEarning[]} rows @returns {void} */
    function earningsTimeline(rows) {
      const dated = rows.filter(r => typeof r.date === "string" && /^\d{4}-\d{2}-\d{2}$/.test(r.date) && Number.isFinite(Date.parse(r.date)) && new Date(r.date).toISOString().slice(0, 10) === r.date);
      if (!dated.length) return;
      const figure = node("figure");
      figure.className = "data-figure earnings-timeline";
      const currencies = [...new Set(rows.map(r => r.currency).filter(Boolean))];
      figure.append(node("h2", "Announcement timeline"), node("figcaption", `EPS bars compare estimate and actual within each report. Dates may change; ${currencies.length === 1 && rows.every(r => r.currency === currencies[0]) ? currencies[0] + ' per share' : 'currency unspecified'}.`));
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
          if (focus) first?.focus();
        }
        more.onclick = () => renderBatch(true);
        day.append(heading, events, more); figure.append(day);
        day.addEventListener("toggle", () => { if (!rendered) renderBatch(); });
        if (day.open) renderBatch();
      }
      if (dated.length !== rows.length) figure.append(node("p", "Undated records appear in the table only."));
      results.append(figure);
    }
    /** @param {Series[]} series Observation times are epoch milliseconds.
     * @param {string} label @returns {void} */
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
        svg.append(svgNode("line", { x1: 100, x2: 880, y1: 30 + index * 100, y2: 30 + index * 100, class: "distribution-grid" }));
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
      table(
        ["Series", "Date", "Value"],
        usable.flatMap((s) =>
          s.points.map((p) => [
            s.name,
            new Date(p.time).toLocaleDateString(),
            fmt(p.value),
          ]),
        ),
        details,
        `${label}: historical chart values`,
      );
    }
    return Object.freeze({ node, fmt, table, pagedTable, change, stockLink, quoteTime, quoteDetail, metricDefinitions, distributionChart, comparisonMetrics, reportedEPS, bars, allocationChart, earningsTimeline, plot });
  }
  window.StocklumoResearchView = Object.freeze({ forHost });
})();
