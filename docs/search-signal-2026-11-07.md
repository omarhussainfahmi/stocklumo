# Stock search: signal rim — 7 November 2026

The owner's six references informed a rounded glass field, a fine illuminated border and controlled edge motion. Stocklumo uses mint, teal and cool blue rather than the references' rainbow/purple branding. Search text and results do not move. The existing hero videos and layout are unchanged.

## Changes

- `_StockSearch.cshtml`: shared decorative shell around the original input; existing label, input attributes, status and results preserved.
- `wwwroot/css/search.css`: theme-aware glass, local magnifier, 18px hero / 14px header corners, static soft halo and a two-pixel conic rim. Only the rim's transform animates, in an eight-second linear loop. Explicit start and end keyframes avoid a WebKit rotation interpolation issue found during verification.
- `_SiteHead.cshtml`: shared versioned stylesheet.
- `wwwroot/js/motion.js`: a bounded viewport observer and event-driven pause state. No per-frame JavaScript, API calls or dependencies. Empty pages do not create an extra observer.
- `DESIGN.md`: records the component variant and motion contract.
- `tests/e2e/search-signal.spec.cjs`: covers real animation progression, focus/editing pause, clear, keyboard selection, header rendering, reduced motion, shared pause/resume, offscreen pause and forced-colors fallback.

Motion stops while editing, while the privacy dialog is open, offscreen, on hidden/pagehide, with the shared motion pause or reduced-motion preference. Without JavaScript the rim remains static and the input remains usable. High-contrast mode removes the decorative rim. Native focus and existing Clear, IME composition, cancellation and stale-result protections remain intact. No fake search/send/microphone action was added.

## Actual verification

- JavaScript unit suite: **80 passed**. The first run exposed an unnecessary empty-search observer interacting with chart test mocks; the observer is now created only when a search shell exists.
- Final browser run: **30 passed** across desktop Chromium, Android Chromium and iPhone WebKit. Includes both themes on Home, Markets and stock details, accessibility/overflow checks, search IME/cancellation regressions and new signal-rim flows.
- The first browser run found WebKit's implicit-start rotation staying stationary; explicit 0deg and 360deg keyframes fixed it. Both computed transforms and rendered frame differences were then confirmed in WebKit.
- Release solution build: **0 warnings, 0 errors**.
- Strict frontend audit: **0 findings**. Design-document lint: **0 errors**, 10 existing orphan-token warnings.
- Logs: `output/glass/search-unit.txt`, `search-build.txt`, `search-browser-final.txt`, `search-audit.json`, `search-design-lint.txt`. Browser screenshots are test-only synthetic data, not provider prices.

Local preview: `http://127.0.0.1:5154/?review=signal-search`. No commit, push or production deployment was performed.
