/* Loaded by Razor only for an explicitly enabled, loopback-only development preview. */
(() => {
  "use strict";
  const {number, valid} = window.StocklumoPreviewSeries;
  const {el, svg, fmt, day} = window.StocklumoPreviewFormat;
  const get = async (path) => {
    try {
      const r = await fetch(path, {
        cache: "no-store",
        headers: { Accept: "application/json" },
      });
      return r.ok ? await r.json() : null;
    } catch {
      return null;
    }
  };
  const ready = (window.StocklumoPreviewReady = get(
    "/api/research-preview/status",
  ));
  const historyCache = new Map();
  // Deduplicate in-flight reads and retain valid charts, but let a later user
  // action or row refresh retry a transient failure without reloading the page.
  function cachedChart(cache, key, path) {
    if (!cache.has(key)) {
      cache.set(key, get(path).then(response => {
        if (!valid(response?.data)) cache.delete(key);
        return response;
      }));
    }
    return cache.get(key);
  }
  window.StocklumoPreviewChart = (symbol, range) => {
    const key = `${symbol}:${range}`;
    return cachedChart(historyCache, key,
      `/api/data/stock/${encodeURIComponent(symbol)}/chart?range=${encodeURIComponent(range)}`);
  };
  function statementChart(rows, key, title) {
    const data = rows.filter((r) => number(r[key]));
    if (data.length < 2) return null;
    const figure = el("figure", null, "data-figure"),
      chart = svg("svg", {
        viewBox: "0 0 580 240",
        role: "img",
        "aria-label": `${title}, USD billions, by reported fiscal quarter`,
      });
    const min = Math.min(0, ...data.map((r) => r[key] / 1e9)),
      max = Math.max(0, ...data.map((r) => r[key] / 1e9)),
      span = max - min || 1,
      y = (v) => 190 - ((v - min) / span) * 150;
    figure.append(
      el("h3", title),
      el("p", "USD billions · reported quarters", "caption"),
    );
    for (const amount of [min, (min + max) / 2, max]) {
      const yy = y(amount),
        label = svg("text", { x: 4, y: yy + 4, class: "chart-axis-label" });
      label.textContent = fmt(amount);
      chart.append(
        svg("line", {
          x1: 55,
          x2: 570,
          y1: yy,
          y2: yy,
          class: "distribution-grid",
        }),
        label,
      );
    }
    data.forEach((row, i) => {
      const x = 75 + i * (475 / data.length),
        value = row[key] / 1e9;
      chart.append(
        svg("rect", {
          x,
          y: Math.min(y(0), y(value)),
          width: Math.min(54, 350 / data.length),
          height: Math.max(1, Math.abs(y(value) - y(0))),
          class: value < 0 ? "history-negative-financial" : "history-financial",
        }),
      );
      const label = svg("text", { x, y: 218, class: "chart-axis-label" });
      label.textContent = row.period;
      chart.append(label);
    });
    figure.append(chart);
    return figure;
  }
  async function financials(meta) {
    const symbol = document.body.dataset.symbol;
    if (!meta.financialSymbols.includes(symbol)) return;
    const response = await get(`/api/research-preview/financials/${symbol}`);
    if (!response?.rows?.length) return;
    const section = el("section", null, "section financial-history");
    section.id = "financial-history";
    section.append(
      el("h2", "Financial history"),
      el(
        "p",
        "Reported results from the captured Longbridge statements.",
        "muted",
      ),
    );
    const grid = el("div", null, "financial-history-grid");
    for (const [key, title] of [
      ["revenue", "Revenue"],
      ["netIncome", "Net income"],
    ]) {
      const chart = statementChart(response.rows, key, title);
      if (chart) grid.append(chart);
    }
    section.append(grid);
    const details = el("details"),
      summary = el("summary", "Reported financial values"),
      wrap = el("div", null, "table-wrap"),
      table = el("table"),
      head = el("thead"),
      tr = el("tr");
    for (const label of [
      "Period end",
      "Published",
      "Revenue (USD)",
      "Net income (USD)",
      "Operating margin",
    ])
      tr.append(el("th", label));
    head.append(tr);
    table.append(head);
    const body = el("tbody");
    for (const r of response.rows) {
      const tr = el("tr");
      for (const value of [
        r.periodEnd,
        r.publishedAt,
        fmt(r.revenue),
        fmt(r.netIncome),
        r.revenue > 0 && number(r.operatingIncome)
          ? `${fmt((r.operatingIncome / r.revenue) * 100)}%`
          : "—",
      ])
        tr.append(el("td", value));
      body.append(tr);
    }
    table.append(body);
    wrap.append(table);
    details.append(summary, wrap);
    section.append(
      details,
      el(
        "p",
        `Source: Longbridge · captured ${meta.capturedAt}. Missing statement fields stay unavailable.`,
        "caption",
      ),
    );
    const news = document.getElementById("stock-news")?.closest(".section");
    if (news) news.before(section);
    else document.getElementById("stock-detail")?.append(section);
  }
  const watchCache = new Map();
  async function renderWatchTrend(symbol, destination, attribution) {
    const meta = await ready;
    if (!meta?.localOnly || !meta.symbols.includes(symbol) || !destination?.isConnected) return;
    const response = await cachedChart(watchCache, symbol, `/api/research-preview/chart/${symbol}?range=1M&adjusted=false`);
    const data = response?.data;
    if (!valid(data) || !destination.isConnected) return;
        const min = Math.min(...data.c),
          max = Math.max(...data.c),
          range = max - min || 1;
        const chart = svg("svg", {
          viewBox: "0 0 110 28",
          role: "img",
          "aria-label": `${symbol}: captured one-month unadjusted closing prices, ${day.format(new Date(data.t[0] * 1000))} to ${day.format(new Date(data.t.at(-1) * 1000))}. Each stock has its own scale.`,
        });
        chart.classList.add("watch-price-trend");
        chart.append(
          svg("path", {
            d: data.c
              .map(
                (v, i) =>
                  `${i ? "L" : "M"}${2 + (i / (data.c.length - 1)) * 106},${25 - ((v - min) / range) * 22}`,
              )
              .join(" "),
            class: "history-line",
          }),
        );
    destination.replaceChildren(chart);
    if (attribution?.isConnected) {
      attribution.textContent = `Mini-trends: captured Longbridge 1-month closes, each on its own scale. Snapshot ${meta.capturedAt}.`;
      attribution.hidden = false;
    }
  }
  window.StocklumoPreviewWatch = Object.freeze({render: renderWatchTrend});
  document.addEventListener("DOMContentLoaded", async () => {
    const meta = await ready;
    if (!meta?.localOnly) return;
    const main = document.getElementById("main");
    if (main && !document.getElementById("research-preview-banner")) {
      const notice = el(
        "p",
        `Local research preview · Longbridge snapshot ${meta.capturedAt}. Ticker quotes remain Finnhub. No automatic snapshot refresh.`,
        "notice preview-banner",
      );
      notice.id = "research-preview-banner";
      main.prepend(notice);
    }
    if (document.body.dataset.symbol) financials(meta);
  });
})();
