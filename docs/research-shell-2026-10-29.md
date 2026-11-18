# Full-width research shell — 29 October 2026

Requested scope: extend only the research navigation and decorative background on `/screener`, `/compare`, `/portfolio` and `/earnings`; preserve approved middle content sizes and grids.

Changed `MarketDesk/wwwroot/css/observatory.css`: the four research pages now have a full-width main canvas. Content children keep their previous centered bounds: 1600px minus gutters for Screener, 1480px minus gutters for the other three pages. The toolbar retains the normal screen gutters and the original background reaches both outer edges. Existing form limits, table widths, cards, typography and grid definitions are unchanged. Stock details and other routes keep their prior shell.

Added `tests/e2e/research-shell.spec.cjs`: verifies actual navigation/background bounds, unchanged research/form dimensions, centered content and no horizontal overflow on all four pages, both themes, at 1920px/1280px desktop and 390px phone viewports, across Chromium and WebKit projects.

Validation: Release build passed with zero warnings/errors. Focused shell, existing screener/compare and atmosphere regressions: 19 passed, two desktop-only cases skipped on phones. Logs: `output/research-shell/build.txt` and `output/research-shell/browser.txt`. The first shell test run had a measurement bug (parsing an unresolved CSS `clamp()` token); corrected the test to read resolved padding and reran successfully. No application regression was involved.

CSS-only application change; no backend, business logic or data contracts changed. No deployment, commit or push performed. Local preview: http://127.0.0.1:5153/screener.
