(() => {
  "use strict";
  const {element, validSymbol} = window.StocklumoMarketFormat;
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
})();
