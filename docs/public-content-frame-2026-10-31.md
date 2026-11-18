# Public-page content frame — 31 October 2026

Dashboard content below the hero, Markets, Watchlist and News now use the research pages' common 1480px content frame, including the same responsive side gutters. Their main workspaces, summary/spotlight grids, research shortcuts, discovery grid and news grid use 18px gaps. The screener retains its existing wider 1600px table variant; the four feature pages were not resized.

The CSS bounds direct content children rather than changing `.page` or adding another wrapper. The home hero is excluded. Header, ticker, research toolbar, full-size decorative background and footer retain their existing dimensions. Status notes and empty states still fit their content inside the new frame. Typography, data, interactions and routes are unchanged.

Changes: `MarketDesk/wwwroot/css/observatory.css`, the durable layout note in `DESIGN.md`, and `tests/e2e/content-frame.spec.cjs`. No JavaScript, Razor, backend, dependency or deployment change was needed.

The browser regression compares the same populated fixture pages before/after the scoped CSS: measured content widths/centering, protected shell dimensions, hero dimensions, background width, grid gaps, overflow and narrow-screen axe scans in both themes. It waits for settled feed states and respects lazy discovery quote loading; synthetic fixture prices are not application data.

Evidence: `output/content-frame/`. Release build passed with zero warnings/errors, 73 JavaScript tests passed, and the strict Premium application audit has zero findings. The existing research-shell regression passed in all three browser profiles. The final content-frame run also passed in all three profiles, covering 48 before/after scenarios with no document overflow. At 1920px the four content frames each measure 1424px wide at x=248px, matching the 1480px research frame minus the existing 28px side gutters. Protected shell/hero dimensions stayed within the 2px comparison tolerance. Results and raw geometry are in `browser-final.txt` and the browser-named JSON files in that evidence directory.

Local preview: http://127.0.0.1:5153/?preview=content-frame-20261031#workspace-summary . No push or production deployment occurred.
