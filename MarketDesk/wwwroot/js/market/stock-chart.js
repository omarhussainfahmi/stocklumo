(() => {
  "use strict";
  /** Chart state and interaction bound to one analytical surface. */
  function create({host, price, stamp, number, getProfile, sessionPoints, chartData}) {
  const $ = id => host.querySelector('#'+id);
  let chartPoints = [], chartRange = "session", chartTouched = false, chartIndex = 0, chartVersion = 0;
  function draw(points) {
    chartPoints = points;
    $("chart").dataset.observations = String(points.length);
    $("chart-observation").hidden = points.length > 1;
    $("observation-title").textContent = points.length === 1 ? "Latest available quote" : "Waiting for a price";
    $("observation-description").textContent = points.length === 1
      ? "One observation so far. A price trend appears after another quote arrives."
      : "No price observations yet. Provider availability may vary.";
    $("chart-line").setAttribute("d", "");
    $("chart-area").setAttribute("d", "");
    $("chart-point").setAttribute("hidden", "");
    $("cursor").setAttribute("hidden", "");
    let singleQuote = $("chart-single-quote");
    if (!singleQuote) {
      singleQuote = document.createElementNS("http://www.w3.org/2000/svg", "g");
      singleQuote.id = "chart-single-quote";
      for (const [id, y, size] of [["single-quote-price", 120, 86], ["single-quote-label", 180, 36]]) {
        const label = document.createElementNS("http://www.w3.org/2000/svg", "text");
        label.id = id; label.setAttribute("x", "450"); label.setAttribute("y", String(y));
        label.setAttribute("text-anchor", "middle"); label.setAttribute("font-size", String(size));
        label.setAttribute("fill", "currentColor"); singleQuote.append(label);
      }
      $("chart").append(singleQuote);
    }
    singleQuote.setAttribute("hidden", "");
    $("chart").setAttribute("preserveAspectRatio", points.length < 2 ? "xMidYMid meet" : "none");
    if (!points.length) {
      $("chart-high").textContent = "-";
      $("chart-low").textContent = "-";
      $("chart-start").textContent = "-";
      $("chart-end").textContent = "-";
      $("chart-value").textContent = "No price observations yet.";
      $("chart").setAttribute("aria-label", "No price observations available.");
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
            `${i ? "L" : "M"}${(points.length === 1 ? 450 : 15 + ((p.time - points[0].time) / span) * 870).toFixed(2)},${max === min ? 120 : (220 - ((p.price - min) / range) * 200).toFixed(2)}`,
        )
        .join(" "),
    );
    const path = $("chart-line").getAttribute("d");
    const lastY = max === min ? 120 : 220 - ((points.at(-1).price - min) / range) * 200;
    const lastX = points.length === 1 ? 450 : 885;
    if (points.length > 1) $("chart-area").setAttribute("d", `${path} L885,235 L15,235 Z`);
    $("chart-point").setAttribute("cx", lastX);
    $("chart-point").setAttribute("cy", lastY);
    $("chart-point").setAttribute("r", points.length === 1 ? "8" : "3");
    $("chart-point").removeAttribute("hidden");
    $("chart-high").textContent = price(max);
    $("chart-low").textContent = price(min);
    $("chart-start").textContent = stamp(points[0].time);
    $("chart-end").textContent = stamp(points.at(-1).time);
    $("chart-value").textContent = points.length === 1
      ? `${price(points[0].price)} ${getProfile().currency || ""} · one observation`
      : "Hover or use arrow keys for prices.";
    $("chart").setAttribute(
      "aria-label",
      `${points.length} price observations. Lowest ${price(min)}, highest ${price(max)}. Use arrow keys for exact values.`,
    );
    $("chart-status").textContent =
      chartRange === "session"
        ? `${points.length} session observation${points.length === 1 ? "" : "s"}.`
        : `${chartRange} historical prices supplied by Finnhub.`;
    if (points.length === 1) {
      $("chart-line").setAttribute("d", "");
      $("chart-point").setAttribute("hidden", "");
      $("single-quote-price").textContent = `${price(points[0].price)} ${getProfile().currency || ""}`;
      $("single-quote-label").textContent = "Latest quote · not a trend";
      singleQuote.removeAttribute("hidden");
    }
  }
  function inspect(index) {
    if (!chartPoints.length) return;
    chartIndex = Math.max(0, Math.min(index, chartPoints.length - 1));
    const point = chartPoints[chartIndex];
    $("chart-value").textContent =
      `${stamp(point.time)} · ${price(point.price)} ${getProfile().currency || ""}`;
    if (chartPoints.length === 1) { $("cursor").setAttribute("hidden", ""); return; }
    const x = 15 +
      ((point.time - chartPoints[0].time) /
        (chartPoints.at(-1).time - chartPoints[0].time || 1)) *
        870;
    $("cursor").setAttribute("x1", x);
    $("cursor").setAttribute("x2", x);
    $("cursor").removeAttribute("hidden");
  }
  {
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
  }
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
      renderCapturedHistory(null);
      draw(sessionPoints());
      if (!sessionPoints().length)
        $("chart-status").textContent = "Waiting for price observations.";
      return;
    }
    $("chart-status").textContent = "Loading price history…";
    window.StocklumoPreviewRenderer?.loading();
    draw([]);
    const result = (await chartData(range)) || { state: "error", message: "Captured history unavailable." };
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
      renderCapturedHistory(null);
      return;
    }
    const previewHandled = renderCapturedHistory(data);
    if (!previewHandled) draw(
      data.c
        .map((value, i) => ({ time: data.t[i] * 1000, price: value }))
        .filter(
          (p) => number(p.price) && p.price > 0 && Number.isFinite(p.time),
        )
        .sort((a, b) => a.time - b.time),
    );
    $("chart-status").textContent = data.source
      ? `${data.source} snapshot · ${data.resolution} · ${data.adjustment}. Captured ${new Date(data.capturedAt).toISOString().replace("T", " ").slice(0, 19)} UTC.`
      : "Historical price observations. Check the displayed dates.";
  }
  function renderCapturedHistory(data) {
    const capturedHost = $("captured-price-host");
    const handled = window.StocklumoPreviewRenderer?.render(capturedHost, data) === true;
    if (capturedHost) capturedHost.hidden = !handled;
    [host.querySelector(".plot"), host.querySelector(".chart-foot"), $("session-chart-note")]
      .forEach(part => { if (part) part.hidden = handled; });
    return handled;
  }
  host
    .querySelectorAll("[data-range]")
    .forEach(
      (button) => (button.onclick = () => { chartTouched = true; loadChart(button.dataset.range); }),
    );
  function updateChartRangeVisibility(candles) {
    host.querySelectorAll('[data-range]:not([data-range="session"])').forEach(button => {
      button.hidden = candles?.state !== "ok" || candles.data?.s !== "ok" ||
        Array.isArray(candles.data.availableRanges) && !candles.data.availableRanges.includes(button.dataset.range);
    });
  }

  return Object.freeze({
    renderSession(points) { if (chartRange === "session") draw(points); },
    sessionMessage(message) { if (chartRange === "session") $("chart-status").textContent = message; },
    async available(candles) {
      updateChartRangeVisibility(candles);
      if (candles?.data?.localOnly && !chartTouched && chartRange === "session") await loadChart("1M");
    }
  });
  }
  window.StocklumoStockChart = Object.freeze({create});
})();
