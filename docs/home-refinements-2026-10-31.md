# Homepage refinements — 31 October 2026

## Requested changes

- Market overview: centered labels, icons, counts and notes; larger desktop numbers, compact padding and content-driven height. Both themes and phone layouts share the alignment.
- From observation to research: two compact columns when its container exceeds 480px, one column on narrow screens. The existing full-width no-quotes workspace retains four columns. Feature-page content grids and the Market Snapshot are unchanged.
- Start exploring: expanded from 24 to 40 companies. The owner selected **stock price, highest first**. Valid available USD quotes determine numerical ranks; ties use symbol order. This ranks the visible selection, not the whole market. Twelve companies appear initially; More stocks reveals all forty. Cards show symbol, name, price and UTC quote time. Missing/invalid/future quotes have no fabricated rank or zero price.
- Removed the animation-specific Skip animation / Skip intro markup, styling and handler. Normal scrolling, the separate keyboard Skip to content link, reduced-motion preference, Save-Data, original stills and saved motion pause remain. Cancelling an unfinished scene mount through the existing pause control still rejects stale graphics work.

## Data and interaction behavior

Discovery reuses existing feed quotes first. Its additional quote requests use the existing server endpoint/cache, one at a time, only after discovery enters the viewport or is expanded. Loading stops on a provider limit, setup failure or connection error. Retry prices is explicit and keeps keyboard focus. Unrequested quotes say Not loaded, pending work says Loading, and genuinely invalid responses say Price unavailable. Additional companies have no new live subscriptions or automatic polling.

The independent eight-company ticker and daily stock spotlight keep their existing selection/order. No backend, API contract, financial calculation, storage shape, dependency or logo changes were made. Existing unrelated working-copy changes were retained.

## Files

- `MarketDesk/Views/Market/Index.cshtml`: forty-company catalog, discovery context/actions; removed hero shortcut.
- `MarketDesk/wwwroot/css/observatory.css`: summary alignment, responsive research cards and ranked discovery cards. Quote/timestamp space is reserved during loading.
- `MarketDesk/wwwroot/js/market.js`: discovery sorting, quote reuse, sequential loading, limit recovery and focus continuity.
- `MarketDesk/wwwroot/js/hero.js`, `MarketDesk/wwwroot/css/hero.css`: removed animation shortcut; preserved motion safeguards.
- `tests/e2e/home-refinements.spec.cjs`: price ordering, invalid/future data, rate limits, keyboard retry, independent ticker/spotlight and both-theme responsive/axe checks.
- `tests/browser-behavior.test.cjs`, `tests/e2e/mobile-story.spec.cjs`, `tests/e2e/proportions.spec.cjs`: expectations updated for forty companies, removed shortcut and ranked cards.
- `DESIGN.md`, `PRODUCT.md`, `UX-CONTRACT.md`: current approved behavior recorded; historical implementation notes retained.

## Verification

Evidence is under `output/home-refinements/`.

- Release solution build: passed, zero warnings/errors.
- .NET tests: 126 passed.
- JavaScript tests: 73 passed.
- Final layout/navigation/no-JavaScript run: 9 passed across desktop Chromium, Android Chromium and iPhone WebKit. Includes both themes at 390/768/1440/1920 widths, automated axe scans and document-overflow checks.
- Final ranking/provider-limit run: 6 passed across the same three profiles, including keyboard retry focus, invalid/future quotes, lazy expansion and unchanged ticker/spotlight. See `browser-ranking-final.txt`.
- Broader initial hero/mobile/refinement run: 49 passed, two test issues. The multi-viewport test needed a budget for eight screenshots/axe scans; the no-JavaScript Safari test now activates the keyboard-only accessibility link with Enter. Both passed in corrective runs. A subsequent touch-layout race was resolved by reserving the discovery cards' quote/timestamp height; the final navigation checks passed in all three profiles.
- Generated hero bundle remains verified at 732,436 bytes; scene geometry and original logo assets were not changed.
- Premium strict application audit: zero findings. DESIGN lint: zero errors, ten existing orphan-token documentation warnings.

Browser fixtures contain synthetic test data only. They are not production market records. Physical phones and whole-market ranking are not claimed.

## Delivery

Local preview: http://127.0.0.1:5153/#workspace-summary

The running preview returned HTTP 200, rendered all forty discovery links and the price-ranking label, and contained no animation-shortcut element.

No commit, push, merge or production deployment occurred. Provider limits can leave some selected stocks unpriced until an explicit retry succeeds.
