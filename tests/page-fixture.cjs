const { readFileSync } = require("node:fs");
module.exports = () => {
  let html = readFileSync("MarketDesk/Views/Market/Index.cshtml", "utf8");
  for (const name of ["_SiteHeader", "_SiteFooter", "_PrivacyControls"]) {
    html = html.replace(`<partial name="${name}" />`, readFileSync(`MarketDesk/Views/Shared/${name}.cshtml`, "utf8"));
  }
  // jsdom is not a Razor runtime. Resolve the mutually exclusive partial slots
  // once; real route/layout rendering is covered by the browser suite.
  html = html.replace('@if (ViewData["HeaderSearch"] is true) { <partial name="_StockSearch" /> }', "");
  html = html.replace('@if (symbol.Length > 0) { <partial name="_Watchlist" /> }', "");
  for (const name of ["_StockSearch", "_Watchlist"]) {
    html = html.replace(`<partial name="${name}" />`, readFileSync(`MarketDesk/Views/Shared/${name}.cshtml`, "utf8"));
  }
  return html;
};
