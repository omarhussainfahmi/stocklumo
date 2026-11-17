(() => {
  "use strict";
  const {number} = window.StocklumoPreviewSeries;
  const el = (tag, text, className) => {
    const n = document.createElement(tag);
    if (text != null) n.textContent = text;
    if (className) n.className = className;
    return n;
  };
  const svg = (tag, attributes = {}) => {
    const n = document.createElementNS("http://www.w3.org/2000/svg", tag);
    for (const [k, v] of Object.entries(attributes))
      n.setAttribute(k, String(v));
    return n;
  };
  const fmt = (n) =>
    number(n) ? n.toLocaleString(undefined, { maximumFractionDigits: 2 }) : "—";
  const day = new Intl.DateTimeFormat("en-GB", {
    timeZone: "America/New_York",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  const minute = new Intl.DateTimeFormat("en-GB", {
    timeZone: "America/New_York",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  });
  window.StocklumoPreviewFormat = Object.freeze({el, svg, fmt, day, minute});
})();
