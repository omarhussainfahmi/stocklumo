# Research information dialog — 8 November 2026

Owner review showed that the anchored About this data note covered form fields. It is replaced across Screener, Compare, Portfolio and Earnings by a centered native information dialog with a dimmed, inactive page behind it. This supersedes `research-data-disclosure-2026-11-08.md`.

The page keeps its layout, scroll position and entered values. The explanation has a named heading, associated copy and an explicit Close button. Native `showModal()` supplies top-layer rendering, background inertness, keyboard isolation and Escape handling. Close receives initial focus; dismissal restores focus to About this data without scrolling. The backdrop remains inactive, consistent with the existing unsaved-changes dialog. Long copy scrolls within the viewport-bounded surface. Backdrop wheel/touch cancellation prevents underlying page movement without hiding document scrollbars or changing content widths.

Implementation:

- `MarketDesk/Views/Market/Index.cshtml`: shared real opener button, labeled dialog, original dynamic note and Close action.
- `MarketDesk/wwwroot/js/research.js`: shared native modal lifecycle, focus restoration and backdrop scrolling guard. Removed anchored positioning and its scroll/resize listeners.
- `MarketDesk/wwwroot/css/market.css`: compact text-button presentation; removed obsolete anchored-panel rules.
- `MarketDesk/wwwroot/css/observatory.css`: reuse existing modal surface rules through `.app-dialog`, with a compact dialog heading and bounded long-copy layout.
- `MarketDesk/wwwroot/css/glass.css`: apply the existing dialog material and forced-colors fallback to `.app-dialog`.
- `tests/e2e/research-notes.spec.cjs`: verify all four pages in both themes, stable geometry/scroll, modal isolation, values retained, Close/Escape and focus restoration, viewport containment, accessibility and long text.
- `tests/research.test.cjs`: update the previous details-specific closed-state assertion to the new dialog contract.
- `DESIGN.md`, `UX-CONTRACT.md`: replace the superseded anchored disclosure contract.

Verification evidence is in `output/research-data-dialog/`: final focused browser results in `verified.txt`, unit results in `unit-final.txt`, normal Release solution build in `build.txt`, bundle verification in `bundle.txt`, strict static audit in `audit.json`, design lint in `design-lint.txt`. Browser financial values are synthetic isolated fixtures and are never shipped to the application. Mobile browser profiles are emulation, not physical-device testing. Mobile WebKit has no Playwright mouse-wheel API; its touch cancellation is checked with a cancelable test event, with real wheel checks on Chromium.

Final results: **3 focused browser tests passed**, covering four routes × two themes × three profiles, plus long-copy containment on each profile; **80 unit tests passed**; normal Release build succeeded with zero warnings/errors; hero bundle verified; strict static audit had zero findings; design lint had zero errors and ten existing warnings. The earlier combined browser run was interrupted while fixing backdrop scrolling and a mobile-WebKit test API assumption; it is not reported as a full passing suite.

No backend, domain calculations, API requests, data copy, routes or dependencies changed. No commit, push or production deployment. The compiled local preview was refreshed at `http://127.0.0.1:5154`.
