// Loopback-only design review. Does not publish or expose repository/config files.
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const study = path.resolve(__dirname, '../design/higgsfield');
const publicRoot = path.resolve(__dirname, '../MarketDesk/wwwroot');
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8', '.svg': 'image/svg+xml', '.woff2': 'font/woff2',
  '.json': 'application/json; charset=utf-8', '.txt': 'text/plain; charset=utf-8' };
const studyFiles = new Set(['index.html', 'study.css', 'study.js', 'production-plan.json', 'production-ledger.json',
  'prompts/dark-still.txt', 'prompts/light-still.txt', 'prompts/motion.txt']);
const server = http.createServer((request, response) => {
  response.setHeader('X-Content-Type-Options', 'nosniff');
  response.setHeader('X-Robots-Tag', 'noindex, nofollow');
  response.setHeader('Cache-Control', 'no-store');
  response.setHeader('Content-Security-Policy', "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self'; font-src 'self'; connect-src 'none'; frame-ancestors 'none'; base-uri 'none'; form-action 'none'");
  if (request.method !== 'GET' && request.method !== 'HEAD') { response.writeHead(405, { Allow: 'GET, HEAD' }); response.end(); return; }
  let relative;
  try { relative = decodeURIComponent(new URL(request.url, 'http://127.0.0.1').pathname).slice(1) || 'index.html'; }
  catch { response.writeHead(400); response.end(); return; }
  const shared = /^(?:css\/(?:market|observatory)\.css|fonts\/manrope-latin-(?:400|600|700|800)\.woff2|images\/stocklumo-(?:mark(?:-dark)?|icon)\.svg|images\/icons\/arrow-(?:right|up-right)\.svg)$/.test(relative);
  if (!shared && !studyFiles.has(relative)) { response.writeHead(404); response.end('Not found'); return; }
  const file = path.join(shared ? publicRoot : study, relative);
  fs.stat(file, (error, stat) => {
    if (error || !stat.isFile()) { response.writeHead(404); response.end('Not found'); return; }
    response.writeHead(200, { 'Content-Type': types[path.extname(file)] || 'application/octet-stream', 'Content-Length': stat.size });
    if (request.method === 'HEAD') response.end(); else fs.createReadStream(file).on('error', () => response.destroy()).pipe(response);
  });
});
server.on('error', error => { console.error(error.message); process.exitCode = 1; });
server.listen(5154, '127.0.0.1', () => console.log('Stocklumo design study: http://127.0.0.1:5154/ (local only)'));
