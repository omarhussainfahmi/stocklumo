const {readFileSync} = require('node:fs');
const market = ["format", "api", "company-marks", "view", "feed", "stock-chart", "search", "discovery", "index"];
const preview = ["preview-series", "preview-format", "preview-chart", "preview"];
const read = (folder, files) => files.map(name => readFileSync(`MarketDesk/wwwroot/js/${folder}/${name}.js`, 'utf8')).join('\n');
module.exports = {marketScripts: () => read('market', market), previewScripts: () => read('research', preview)};
