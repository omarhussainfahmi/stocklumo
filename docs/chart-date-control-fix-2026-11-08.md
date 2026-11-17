# Chart and date control correction — 8 November 2026

The stock detail range tab inherited the generic glass-button gradient and shadow. The research date field painted both an outer frame and the inner native input's focus outline/shadow.

`MarketDesk/wwwroot/css/glass.css` now keeps chart range tabs flat, with balanced horizontal padding and a 64px minimum width. The existing active underline and chart selection remain intact. Research date inputs delegate visible focus to one rounded outer frame; invalid fields use red, and forced colors retains a system highlight outline. Native calendar, date editing and keyboard behavior are unchanged. The shared correction covers Portfolio and Earnings in both themes.

`tests/e2e/chart-date-surfaces.spec.cjs` verifies flat range paint, selection, hover/focus separation, stable geometry and contained date inputs in both themes. Targeted Playwright verification passed **30/30** checks across desktop Chromium, Android Chromium and iPhone WebKit profiles. The run also covered accessibility/layout checks on stock detail, Portfolio and Earnings, portfolio validation/save/edit/remove, earnings date validation and keyboard chart inspection. Screenshots were visually reviewed for the corrected tab and desktop/mobile date focus surfaces. This is browser emulation, not a physical iPhone test.

No backend, financial calculations, API behavior or dependencies changed. No commit, push or production deployment performed.
