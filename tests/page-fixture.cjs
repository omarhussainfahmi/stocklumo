const { readFileSync } = require("node:fs");
module.exports = () => {
  let html = readFileSync("MarketDesk/Views/Market/Index.cshtml", "utf8");
  for (const name of ["_SiteHeader", "_SiteFooter", "_PrivacyControls"]) {
    html = html.replace(`<partial name="${name}" />`, readFileSync(`MarketDesk/Views/Shared/${name}.cshtml`, "utf8"));
  }
  return html;
};
