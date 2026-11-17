# Shared graph polish — 4 November 2026

Implemented in the existing shared `motion.css` / `motion.js`; no data services, chart domains, calculations, dependencies or card dimensions changed.

## Coverage

- Dashboard/Markets snapshot and selection balance: one-time zero-origin bar reveals, subtle quarter-width plot guides, rounded bar corners and row feedback.
- Screener: day-change bars, scatter points and selection/focus strokes.
- Compare: metric lanes, day-change bars and available historical line series.
- Portfolio: allocation rings, P/L bars and available historical series.
- Earnings: estimate/actual EPS lanes and reported-quarter figures.
- Stock detail: session/history lines, individual observations and range indicators.
- Existing gated local research preview: captured candlesticks/volume, financial figures and watchlist mini-trends. This does not enable that preview or add data access.

Bars use a 250ms clip reveal from their true zero side, with at most 100ms of stagger. Financial columns/candles, lines, scatter points, range markers and allocation arcs use opacity; their positions and proportions never animate. Labels, numerical values, axes, titles, table alternatives and inspection controls remain present. Missing data stays missing; no candles or return series are synthesized.

Chart identities are remembered for the page visit, so a provider refresh, figure rebuild, scroll return or disclosure reopen does not replay the entrance. IntersectionObserver starts eligible charts when visible. Closed disclosures wait until opened. Consent-modal visibility postpones pending entrances. Removed pending nodes are released. Existing keyboard modality skips chart entrances. Reduced motion prevents them and cancels running animations; pagehide/hidden-document cleanup remains shared. No polling or market requests were added.

Observers are limited to explicit graph/research/watch roots. They batch element insertions into one animation frame, ignore ordinary text-only inspection mutations, and do not observe the whole document tree. A body-class observer only resumes pending charts after privacy UI closes. Native chart controls and all existing scales remain intact.

## Evidence

- Release solution build: zero warnings/errors.
- JavaScript tests: 77 passed, including four focused tests for positive/negative zero-side reveals, unchanged geometry, provider rebuilds, reduced motion and cancellation.
- Existing observatory + research-layout browser regressions: 21 passed across desktop Chromium, Android Chromium and iPhone WebKit emulation.
- Live local screener inspected in light/dark themes and at 390px mobile width, with no horizontal overflow.
- Browser instrumentation on the screener disclosure observed 12 bar entrances, correct opposite clipping for negative bars, and still exactly 12 after closing/reopening the disclosure (no replay).
- Captures and logs: `output/chart-polish/`, `output/playwright/chart-polish-*.png`. The first light screenshot catches the entrance in progress; it is not a settled numeric comparison. Provider data was inspected only via the existing integration; synthetic unit fixtures stay in tests.

Native SVG, CSS and WAAPI only; no new plugin installation required. These are local changes, not a production deployment. Physical-device frame-rate validation remains separate from browser emulation.
