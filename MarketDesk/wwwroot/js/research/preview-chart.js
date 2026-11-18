(() => {
  "use strict";
  const {number, valid, hasOHLC} = window.StocklumoPreviewSeries;
  const {el, svg, fmt, day, minute} = window.StocklumoPreviewFormat;
  let host,
    current,
    view = "candles",
    controls,
    drawing,
    inspection,
    slider,
    caption,
    candleButton,
    renderedWidth = 0;


  function mountChart(destination) {
    if (host) return;
    host = el("figure", null, "history-workbench");
    host.id = "captured-price-history";
    host.hidden = true;
    controls = el("div", null, "history-view-controls");
    controls.setAttribute("role", "group");
    controls.setAttribute("aria-label", "Historical chart style");
    for (const [id, label] of [
      ["line", "Price line"],
      ["candles", "Candles"],
    ]) {
      const b = el("button", label);
      b.type = "button";
      b.dataset.chartView = id;
      b.onclick = () => {
        view = id;
        renderChart();
      };
      controls.append(b);
      if (id === "candles") candleButton = b;
    }
    drawing = el("div");
    caption = el("figcaption", null, "caption");
    const label = el("label", "Inspect historical observation"),
      output = el("output");
    slider = el("input");
    slider.type = "range";
    slider.min = "0";
    label.append(slider);
    inspection = output;
    inspection.setAttribute("aria-live", "polite");
    label.className = "chart-date-control";
    host.append(controls, drawing, label, inspection, caption);
    destination.append(host);
    if (typeof ResizeObserver !== "undefined")
      new ResizeObserver(() => {
        if (
          current &&
          !host.hidden &&
          Math.abs(host.clientWidth - renderedWidth) > 1
        )
          renderChart();
      }).observe(host);
  }
  function renderChart() {
    if (!current || !host) return;
    const data = current,
      ohlc = hasOHLC(data),
      candles = ohlc && view === "candles",
      count = data.c.length;
    candleButton.disabled = !ohlc;
    if (!ohlc) view = "line";
    controls
      .querySelectorAll("button")
      .forEach((b) =>
        b.setAttribute("aria-pressed", String(b.dataset.chartView === view)),
      );
    const low = Math.min(...(candles ? data.l : data.c)),
      high = Math.max(...(candles ? data.h : data.c)),
      pad = (high - low) * 0.06 || high * 0.01;
    const W = Math.max(280, Math.round(host.clientWidth)),
      H = W < 600 ? 320 : 380,
      left = W < 600 ? 52 : 68,
      right = W - 16,
      top = 26,
      bottom = W < 600 ? 210 : 248,
      volumeTop = bottom + 28,
      volumeBottom = H - 36;
    renderedWidth = host.clientWidth;
    const min = low - pad,
      max = high + pad,
      x = (i) => left + (i / (count - 1)) * (right - left),
      y = (v) => top + ((max - v) / (max - min)) * (bottom - top);
    const chart = svg("svg", {
      viewBox: `0 0 ${W} ${H}`,
      role: "img",
      tabindex: 0,
      "aria-label": `${document.body.dataset.symbol} historical prices in USD, volume in shares. Use arrow keys or the observation slider.`,
    });
    chart.style.height = `${H}px`;
    chart.classList.add("history-price-chart");
    for (let i = 0; i < 5; i++) {
      const yy = top + (i * (bottom - top)) / 4,
        value = max - ((max - min) * i) / 4;
      chart.append(
        svg("line", {
          x1: left,
          x2: right,
          y1: yy,
          y2: yy,
          class: "distribution-grid",
        }),
      );
      const text = svg("text", { x: 4, y: yy + 4, class: "chart-axis-label" });
      text.textContent = fmt(value);
      chart.append(text);
    }
    const priceLabel = svg("text", { x: 4, y: 14, class: "chart-axis-label" });
    priceLabel.textContent = "USD";
    chart.append(priceLabel);
    const width = Math.max(1, Math.min(14, ((right - left) / count) * 0.7));
    drawPriceMarks(chart, data, { candles, x, y, width });
    const volumes =
      Array.isArray(data.v) &&
      data.v.length === count &&
      data.v.every((v) => number(v) && v >= 0)
        ? data.v
        : null;
    if (volumes) {
      drawVolumeMarks(chart, volumes, { x, width, volumeTop, volumeBottom });
    }
    for (const index of [0, Math.floor((count - 1) / 2), count - 1]) {
      const text = svg("text", {
        x: x(index),
        y: H - 10,
        "text-anchor":
          index === 0 ? "start" : index === count - 1 ? "end" : "middle",
        class: "chart-axis-label",
      });
      text.textContent =
        data.resolution === "1 minute"
          ? minute.format(new Date(data.t[index] * 1000))
          : day.format(new Date(data.t[index] * 1000));
      chart.append(text);
    }
    const cursor = svg("line", {
      y1: top,
      y2: volumeBottom,
      class: "history-cursor",
    });
    chart.append(cursor);
    const inspect = (index) => {
      index = Math.max(0, Math.min(count - 1, index));
      slider.value = String(index);
      cursor.setAttribute("x1", x(index));
      cursor.setAttribute("x2", x(index));
      const time = new Date(data.t[index] * 1000),
        stamp =
          day.format(time) +
          (data.resolution === "1 minute" ? ` ${minute.format(time)} ET` : "");
      inspection.textContent = `${stamp} · ${ohlc ? `O ${fmt(data.o[index])} · H ${fmt(data.h[index])} · L ${fmt(data.l[index])} · ` : ""}${ohlc ? "C" : "Price"} ${fmt(data.c[index])} USD${volumes ? ` · ${fmt(volumes[index])} shares` : ""}`;
    };
    slider.max = String(count - 1);
    let keyboardInspecting = false;
    slider.oninput = () => { keyboardInspecting = true; inspect(Number(slider.value)); };
    slider.onblur = () => { keyboardInspecting = false; };
    chart.addEventListener("keydown", (event) => {
      let destination = Number(slider.value);
      if (event.key === "Home") destination = 0;
      else if (event.key === "End") destination = count - 1;
      else if (event.key === "ArrowRight") destination++;
      else if (event.key === "ArrowLeft") destination--;
      else return;
      event.preventDefault();
      keyboardInspecting = true;
      inspect(destination);
    });
    chart.addEventListener("pointerdown", () => { keyboardInspecting = false; });
    chart.addEventListener("blur", () => { keyboardInspecting = false; });
    chart.addEventListener("pointermove", (event) => {
      // Keep keyboard/slider inspection stable while focused. A deliberate
      // pointer press or leaving that control restores pointer inspection.
      if (keyboardInspecting) return;
      const rect = chart.getBoundingClientRect();
      inspect(
        Math.round(
          ((((event.clientX - rect.left) / rect.width) * W - left) /
            (right - left)) *
            (count - 1),
        ),
      );
    });
    drawing.replaceChildren(chart);
    inspect(count - 1);
    caption.textContent = `Longbridge snapshot · ${data.resolution} · ${data.adjustment} · ${count} observations · captured ${new Date(data.capturedAt).toISOString().replace("T", " ").slice(0, 19)} UTC. Dates in New York; session gaps compressed.`;
    host.removeAttribute("aria-busy");
  }
  function drawPriceMarks(chart, data, { candles, x, y, width }) {
    if (!candles) {
      const path = data.c
        .map((value, index) => `${index ? "L" : "M"}${x(index)},${y(value)}`)
        .join(" ");
      chart.append(svg("path", { d: path, class: "history-line" }));
      return;
    }
    data.c.forEach((close, index) => {
      const open = data.o[index];
      const group = svg("g", {
        class: close >= open ? "history-up" : "history-down",
      });
      group.append(
        svg("line", {
          x1: x(index),
          x2: x(index),
          y1: y(data.h[index]),
          y2: y(data.l[index]),
        }),
        svg("rect", {
          x: x(index) - width / 2,
          y: Math.min(y(open), y(close)),
          width,
          height: Math.max(1, Math.abs(y(open) - y(close))),
        }),
      );
      chart.append(group);
    });
  }
  function drawVolumeMarks(
    chart,
    volumes,
    { x, width, volumeTop, volumeBottom },
  ) {
    const peak = Math.max(...volumes);
    const label = svg("text", {
      x: 4,
      y: volumeTop + 8,
      class: "chart-axis-label",
    });
    label.textContent = "Shares";
    const value = svg("text", {
      x: 4,
      y: volumeTop + 25,
      class: "chart-axis-label",
    });
    value.textContent = peak >= 1e6 ? `${fmt(peak / 1e6)}m` : fmt(peak);
    chart.append(label, value);
    volumes.forEach((volume, index) => {
      const height = peak ? (volume / peak) * (volumeBottom - volumeTop) : 0;
      chart.append(
        svg("rect", {
          x: x(index) - width / 2,
          y: volumeBottom - height,
          width,
          height,
          class: "history-volume",
        }),
      );
    });
  }
  window.StocklumoPreviewRenderer = Object.freeze({
    render(destination, data) {
      if (!destination || !valid(data)) {
        current = null;
        if (host) host.hidden = true;
        return false;
      }
      current = data;
      mountChart(destination);
      host.hidden = false;
      renderChart();
      return true;
    },
    loading() {
      if (host && !host.hidden) {
        host.setAttribute("aria-busy", "true");
        caption.textContent = "Loading the selected range…";
      }
    },
  });
})();
