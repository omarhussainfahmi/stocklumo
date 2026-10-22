# Market Observatory design QA — 22 October 2026

## Visual truth and evidence

- Selected source: `C:/Users/pc/OneDrive/Desktop/ChatGPT Image Oct 22, 2026, 06_46_50 PM.png` (1487 × 1058 pixels). Owner's explicit exception: preserve the existing website logo.
- Implementation: `output/observatory/desktop-dark.png` and `desktop-light.png`, 1487 × 1058 CSS/pixel viewport, device scale factor 1.
- Phone: `output/observatory/phone-dark.png` and `phone-light.png`, iPhone WebKit at 390 × 844 CSS pixels, 1170 × 2532 screenshot pixels, scale factor 3. Reviewed as a phone adaptation, not compared unscaled against the desktop reference.
- Financial values in these local regression captures are explicitly synthetic test fixtures, labeled by the company name `Fixture AAPL`. These fixtures never enter production. The deliberately finite test event stream can show DISCONNECTED; it is not production connection evidence.
- Captures are ignored local QA artifacts. The browser suite regenerates them; they are not website imagery.

## Comparison and fixes

The selected source and rendered desktop capture were opened together for a full-view comparison. Header/logo, quote typography and chart/range region were also examined directly in the readable full-size captures. Phone and light captures were inspected separately. No raster mockup or illustrative chart was embedded in the application.

1. Initial browser checks found a 9px deferred-loading shift and a dark-mode watchlist button contrast conflict. Reserved ticker height fixes the shift; removing an obsolete dark text override restores readable button text. The unchanged loading-stability assertion and axe checks pass.
2. The first geometry checks showed the chart pushed down to 512.5px. Tighter stock summary/status spacing brings its top below 450px in the matched desktop viewport. This is tested without weakening the geometry assertion.
3. WebKit initially rendered the variable font too thin. Replaced it with fixed-weight local WOFF2 assets; final phone captures show clear title, quote and button weight. The loaded font and company-icon decoding are checked before capture.
4. Empty or single-observation charts use 200px plots rather than wasting a tall blank area. Multi-observation charts retain the larger responsive size. The chart's observations, actual timestamps, keyboard inspection and unsupported-history behavior are preserved.
5. A markup detector initially warned about an image without `src`. The company mark now replaces a hidden non-image slot only after selecting a valid local asset. Final detector output: zero findings.

## Required fidelity surfaces

- Typography: locally hosted Manrope, consistent body/control scale, tabular numbers, strong financial values. Original ribbon SVGs and brand font treatment preserved. Fixed weights verified visually on Chromium and WebKit.
- Spacing/layout: full-width chart; compact shared toolbar; quote/range band; adjacent watchlist and company panels on desktop, stacked on phones. Main-page horizontal containment and stock-panel geometry pass. Tables retain contained scrolling and controls rather than losing columns.
- Colors/tokens: dark navy, blue dividers, mint positive movement, rose negative movement and off-white text follow the selected direction. Light mode uses corresponding slate-tinted surfaces and deep green accents. Axe WCAG A/AA checks passed in both themes; this is not a conformance certification.
- Assets: exact existing site logo files compare byte-for-byte with the previous commit. Supported company marks and arrows are licensed local Bootstrap SVG assets. Unknown companies do not receive invented logos. No remote provider image URLs are rendered.
- Content: genuine provider fields only. No fixed screenshot quotes, fictitious holdings, fabricated company descriptions/headquarters/news, candles, volume or indicator overlays. Technical Analysis remains disabled.

## Intentional product constraints

- The source chart is explicitly illustrative. Production uses the working session/historical chart and the provider's unavailable state, not the concept's candles or overlays. There is no technical-analysis reintroduction.
- The existing independent eight-company ticker, actual quote timestamps, market/connection status and complete navigation remain. Their additional height differs from the simplified concept. Search is moved into the header on non-home market routes; the homepage retains its existing prominent search and taller intro.
- Saved stocks are the owner's actual browser-local list, not the seven prefilled companies in the concept. Complete quote-age and management controls remain in a scrollable table; View all opens the existing watchlist page.
- The company profile contains supported Finnhub fields and a safe company website link. Unsupported descriptive fields from the concept are omitted.
- These deliberate differences protect working features and data integrity; they are not claims of pixel-identical reproduction.

## Verification

- Release build: success, 0 warnings, 0 errors.
- Backend: 100 tests passed.
- Frontend unit suite: 55 tests passed after the chart/layout changes.
- Full browser suite: 120 passed across desktop Chromium, Android Chromium and iPhone WebKit, no skips/retries. Coverage includes all 13 existing/test routes in both themes, stock search, theme/menu behavior, watchlists, native date controls, screener/presets, comparison, portfolio editing/validation, earnings, chart keyboard access, provider failures and rate-limit recovery.
- Font-rendering follow-up: 87 targeted checks passed before the final full browser run.
- Final mechanical markup detector: no findings. Logo comparison: all original brand SVGs unchanged.
- No physical handset, screen-reader user testing or new field performance benchmark was performed. Existing provider and Render Free constraints remain.

## Implementation areas

`MarketDesk/Views/Market/Index.cshtml`, shared `_SiteHeader`, new `_StockSearch` and `_Watchlist` partials; `wwwroot/css/market.css`, presentation code in `wwwroot/js/market.js`, local fonts/icons; `Program.cs` adds same-origin font permission only. No API contracts, financial calculations, persistence, authentication or Finnhub connection services were changed. Tests: updated jsdom partial expansion and six additional browser geometry/asset checks. Design rules and asset licenses are recorded in `DESIGN.md`.

Deployment verification is recorded separately after the release becomes live.

final result: passed
