(() => {
  "use strict";
  // Shared display formatting and safe DOM/link construction; no market state.
  const validSymbol = (value) =>
    typeof value === "string" && /^[A-Z][A-Z0-9.-]{0,14}$/.test(value);
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
  function movement(node, value, text) {
    node.textContent = text;
    node.classList.toggle("up", number(value) && value > 0);
    node.classList.toggle("down", number(value) && value < 0);
  }
  const tickerClock = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit", timeZone: "UTC", hourCycle: "h23" });
  function svgElement(tag, attributes) {
    const node = document.createElementNS("http://www.w3.org/2000/svg", tag);
    Object.entries(attributes).forEach(([name, value]) => node.setAttribute(name, value));
    return node;
  }
  window.StocklumoMarketFormat = Object.freeze({validSymbol, number, price, signed, stamp, element, safeUrl, movement, tickerClock, svgElement});
})();
