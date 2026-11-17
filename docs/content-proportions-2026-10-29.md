# Stocklumo content proportions and privacy focus — 29 October 2026

## Scope and causes

Addresses the owner's screenshots of unused space inside spotlight cards, discovery links, research controls, portfolio graphics, stock context, sparse charts, status messages and news articles. The existing logo, full-height hero, dedicated light hero, data sources, routes, calculations and disabled Technical Analysis remain intact.

The main causes were full-width block defaults, vertically stacked quote content, character-count width limits on news text, stretched grid items, and sparse charts inheriting the full chart composition. The fix changes those relationships instead of adding filler or invented data.

## Changes by surface

- Dashboard: eight spotlight cards remain four columns by two rows on desktop; company identity and quote now sit alongside each other. Timestamps remain visible. Discovery links are compact wrapping shortcuts. Empty watchlist and messages use their content width.
- Markets and watchlist: the same shortcuts, quote presentation and content-sized notices apply. Populated tables retain the available width.
- Market and company news: removed premature headline/excerpt width caps. Full publisher headlines remain intact. Articles no longer stretch to their taller neighbor's height; existing excerpt limits remain.
- Stock details: bounded desktop workspace, compact label/value company profile rows, independently sized watchlist panel. Zero/one-observation charts share a desktop row with real metrics; multi-point charts keep their full layout. No fabricated history or trend is added.
- Screener: bounded workspace preserves the ranking, table and inspector functionality.
- Compare: bounded input/static snapshot form and content-sized readiness/status messages. Existing snapshot-only behavior remains.
- Portfolio: bounded editor, compact metrics, smaller allocation graphics and better balanced analytical columns. Holdings, currencies, valuations and return calculations are unchanged.
- Earnings: bounded filter form, same native date controls and validation.
- Shared messages: notices and result messages fit their text, up to the available width, and wrap safely on phones.
- Privacy: the existing panel stays fully visible over a 42% black page backdrop. Background content is inert, scrolling is locked, and Tab stays within the choices. Allow, Reject, Not now and Escape restore the page. Reopening preferences returns focus to the opener afterward. Not now/Escape grant no consent. Existing opt-in, browser privacy signals and analytics restrictions remain.

## Files for this pass

`MarketDesk/wwwroot/css/observatory.css`, `MarketDesk/Views/Market/Index.cshtml`, `MarketDesk/Views/Shared/_PrivacyControls.cshtml`, `MarketDesk/wwwroot/js/site.js`, `tests/e2e/observatory.spec.cjs`, `tests/e2e/journeys.spec.cjs`, `tests/e2e/proportions.spec.cjs`, and `DESIGN.md`.

No new dependencies, API contracts, backend business logic, database changes or hosting migrations were introduced by this pass. Other existing uncommitted work predates it.

## Verification

Build and test logs and screenshots are under `output/content-proportions/`. Browser tests use isolated synthetic provider responses, never production financial data. Local browser inspection uses available real Finnhub responses and preserves honest missing/delayed data states.

- Release build: passed, zero warnings and errors (`build.txt`).
- Frontend unit tests: 60 passed (`unit.txt`).
- Full normal browser suite: 164 passed, four desktop-only cases skipped on phones (`browser.txt`). Covers 13 routes in both themes on desktop Chromium, Android Chromium and iPhone WebKit, with accessibility, overflow, asset, console and existing interaction checks. All 78 route/theme/device captures are retained in `pages/`.
- New proportion regressions: six passed (`proportions-browser.txt`). Checks four desktop spotlight columns, compact quote heights, right-aligned prices, fit-content shortcuts/notices/empty states, full-width long headlines and natural short article heights. Phone cases include 320px.
- Local research preview: 24 passed (`research-preview-browser.txt`). Historical ranges, candles, keyboard inspection, filtering, comparisons, watchlist trends, earnings and portfolio history remain functional in the gated local prototype.
- Existing privacy interaction regression now verifies backdrop visibility, inert main content, Tab containment, Escape dismissal, focus restoration and no consent on dismissal at 320px and 390px across all three browser projects.
- Impeccable source detector returned an empty findings list (`design-lint.json`). `git diff --check` found no whitespace errors (only repository line-ending conversion notices).
- Visually reviewed actual local quotes/news, wide desktop layouts and phone privacy. Example proofs: `privacy-light.png`, `privacy-phone-dark.png`, `news-dark.png`, `spotlight-dark.png`. Populated synthetic portfolio/theme captures are clearly separated in `populated/`.

The backend suite was not rerun for this CSS/Razor/privacy interaction pass; no backend behavior was changed. Browser emulation does not establish compatibility with every physical device.

This pass is local only; it has not been committed, pushed or deployed to production.
