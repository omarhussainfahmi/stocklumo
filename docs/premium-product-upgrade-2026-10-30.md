# Stocklumo premium product upgrade — implementation report

Date: 30 October 2026. Delivery: local working copy, with verification evidence and limitations below.

## 1. Executive summary

Improved the real ASP.NET Core/Razor application through its existing shared UI owners. The upgrade concentrates on clear financial research controls, reliable browser-local editing, accessible feedback, keyboard continuity and consistent themes. It preserves the approved Stocklumo ribbon, exact logo colors, hero dimensions, existing feature-page grids, routes and technology.

Confirmed defects were addressed: portfolio edits could become duplicate lots after another lot was removed; cancellation could change a pending save's context; invalid earnings ranges reached the API; and some keyboard actions lost focus after rendering. Search now has a shared clear control and IME-safe request scheduling. Screener criteria and matching counts are explicit.

Backend services, Finnhub behavior, financial calculations, currency separation, localStorage shapes and disabled Technical Analysis remain unchanged by this upgrade. Existing unrelated uncommitted work was retained.

## 2. Design decisions

The [design review and implementation plan](premium-upgrade-plan-2026-10-30.md) compared three directions: Precision Trading Terminal, Contemporary Fintech Research Desk and Stocklumo Signature Identity. The selected direction combines the Research Desk's readable analytical controls with the incumbent signature identity and disciplined data alignment. No competing dashboard or disconnected concept was built.

- [DESIGN.md](../DESIGN.md) records the accepted system. Runtime tokens remain canonical in `market.css` (Model B); documentation mirrors them and a token test checks agreement.
- [UX-CONTRACT.md](../UX-CONTRACT.md) resolves component ownership, pending/error behavior, date constraints, persistence and native-control exceptions. Native date/select popups remain platform-owned.
- Manrope, navy/mineral surfaces, semantic green/red, exact original marks, approved hero and existing grids are preserved. Shared captions, field hints, control states and filter chips receive consistent treatment in both themes.
- Upstream **Frontend Design** and **Frontend Design Premium** were applied together using the existing-product MATCH approach. Strict application-scoped audit has zero findings. DESIGN lint has zero errors and ten orphan-token warnings; those warnings are not represented as a clean lint result.
- **UI UX Pro Max** initially returned marketing-oriented Feature-Rich Showcase/Fira/replacement-palette advice. That first match was discarded. An explicit Financial Dashboard retry informed data density, readability, financial color semantics and accessible states; existing product decisions remained authoritative.
- Installed **gstack portable workflows** supplied specification, design consultation, engineering/scope review, QA, code/security/health review and delivery assessment. Host repository/browser tools were used; the native gstack browser/runtime was not executed or claimed.

## 3. Changes by page

All nine main routes inherit the same theme bootstrap, canonical clearable search, shared tokens and readable controls. Dedicated changes are distinguished below from shared improvements; existing visualizations and data selection are not claimed as newly built.

| Page | Changes in this upgrade |
| --- | --- |
| Dashboard `/` | Clearable, composition-safe stock search; shared theme/control refinements. A verified ScrollTrigger refresh fix anchors scene progress against the refreshed scroll range during resizing, preserving the existing hero design and motion ownership. |
| Markets `/markets` | Inherits header search, theme and control refinements. Existing snapshot, daily provider selection, independent ticker and discovery layout remain intact. |
| Stock Details `/stock/{symbol}` | Inherits search/theme refinements and shared watchlist focus/feedback. Existing company context, price history/session distinction, freshness and range availability remain intact. |
| Watchlist `/watchlist` | Reorder/removal restore logical keyboard focus and announce successful persistence; failed storage retains explicit visit-only feedback. Existing saved order and quotes are preserved. |
| News `/news` | Inherits theme/search and shared readable typography/control treatment. Existing genuine article metadata, safe external links, loading/empty/error behavior and editorial layout remain intact. |
| Screener `/screener` | Shared clearable company filter; removable applied-filter chips; separate matching count and provider status; filter/table/chart dataset agreement; keyboard chart focus continuity; descriptive table caption. |
| Compare `/compare` | Associated inline validation and named comparison tables through research helpers. Existing 2–5-stock snapshot comparison and honest historical-access explanation are preserved. |
| Virtual Portfolio `/portfolio` | Locks conflicting controls during verification; prevents duplicate pending saves and stale cancellation; preserves/reindexes the edited lot after removals; resets a removed edit coherently; descriptive holdings table caption. Unsaved changes receive an accessible Keep editing / Discard changes departure dialog. Existing valuation/allocation calculations and currency grouping are unchanged. |
| Earnings `/earnings` | Validates dates before requests, with associated inline errors, first-error focus, explicit bounds and a range hint. UTC year/leap-day bounds and the 92-day limit match the existing controller. Reported-quarter mode hides/skips calendar validation and clears obsolete errors; earnings tables have distinct captions. |

## 4. Engineering changes

`site.js` owns `StocklumoUI.clearable`; domain scripts retain query and filtering logic. `market.js` suppresses composition requests, cancels obsolete work, keeps the 300 ms debounce and prevents late dismissed/cleared results from reopening. Watchlist feedback depends on successful storage rather than assuming persistence.

`research.js` extends existing helpers with explicit labels, associated inline errors, captions and busy states. Portfolio controls and row actions are disabled while a verified currency response is pending; handlers also retain busy guards. Removing a preceding lot adjusts the edit index, and removing the edited lot resets the editor. No valuation formula was moved or rewritten.

`site.js` also owns the portfolio's native departure dialog. It opens only for changed editor values, initially focuses Keep editing, and restores the activating link after Escape or cancellation, including Safari touch activation. An unchanged selected edit, successful save or reset does not warn. Tab close/reload uses the browser's native beforeunload fallback; holdings are never silently autosaved.

The small self-hosted `theme-init.js` runs synchronously before styles to apply a saved theme before the first styled paint. Subsequent changes and persistence remain in `site.js`, compatible with the existing CSP. CSS utility tokens stay in `market.css`; `observatory.css` consumes them for controls, hints, chips and captions.

The hero resize correction is narrowly scoped to the existing `frontend/hero-scene.js` implementation and its generated bundle. It uses refreshed scroll geometry instead of a stale `ScrollTrigger.progress` value; no new scene, dependency or logo treatment was introduced.

## 5. Performance

The baseline contains **18 local lab samples**: three routes (`/`, `/stock/AAPL`, `/screener`), two themes and desktop Chromium/Android Chromium/iPhone WebKit profiles. [Baseline JSON and captures](../output/premium-upgrade/baseline/) retain raw results.

Both measurement phases use the same loopback application, isolated synthetic API interception, fresh browser contexts, unthrottled host CPU/network, font readiness and a 1200 ms quiet sampling window. These are local lab observations, not provider latency or field performance.

| Measure | Baseline | Current evidence |
| --- | --- | --- |
| Generated hero bundle | 732,376 bytes | 732,436 bytes; verified bundle, +60 bytes for the resize correction |
| Production dependency audit | 0 reported vulnerabilities | No dependency added by this upgrade; baseline audit is a point-in-time result |
| Matched final lab samples | 18 baseline JSON files | 18 final samples completed; [comparison and protocol](../output/premium-upgrade/performance-comparison.md), [run log](../output/premium-upgrade/benchmark-final.txt) |

Observed median LCP across the two themes was 190 ms for desktop home (baseline 340 ms), 134 ms for Android home (132 ms), and 252 ms for WebKit home (209 ms). Direction varies by route and browser; two samples per pair cannot establish a causal improvement. All 18 paired API-request counts stayed unchanged; the small theme bootstrap adds one same-origin script request.

The existing homepage still records substantial long-task duration (about 1.7–1.8 s across the sampling window). The desktop stock page's maximum observed CLS remains 0.1091 (baseline 0.1175). These are remaining performance concerns, not a new performance pass or an asserted speedup. No field INP, p75 Core Web Vitals, physical-device speed or universal loading-time claim is made. WebKit does not expose layout-shift or longtask entries here: its recorded zeros are unsupported measurements, not zero activity. The older baseline lacks the support array, so final support is used to qualify paired observations.

## 6. Accessibility and QA

| Check | Verified evidence at report creation |
| --- | --- |
| Baseline Release build | Passed; 0 warnings, 0 errors |
| Baseline .NET suite | 126 passed, 0 failed |
| Baseline Node suite | 67 passed, 0 failed |
| Current Node suite | 73 passed, 0 failed; [unit log](../output/premium-upgrade/unit-final.txt) |
| Current UI build | Passed; 0 warnings, 0 errors; [build log](../output/premium-upgrade/build-ui.txt) |
| Current generated bundle check | Passed; 732,436 bytes; [bundle log](../output/premium-upgrade/bundle-final.txt) |
| Premium strict application audit | 0 errors/warnings/findings; [audit result](../output/premium-upgrade/audit-final.json) |
| DESIGN lint | 0 errors, 10 orphan-token warnings; [lint output](../output/premium-upgrade/design-lint.txt) |
| Final responsive matrix | 108 measured captures; no document overflow or captured browser errors; [manifest](../output/premium-upgrade/final-matrix/matrix.json) |
| Final .NET rerun | 126 passed, 0 failed, 0 skipped; [log](../output/premium-upgrade/dotnet-tests-final.txt) |
| Release publish artifact | Passed locally; ten selected public assets match source SHA-256, and original logo SVGs have no Git diff. [Publish log](../output/premium-upgrade/publish-final.txt), [asset verification](../output/premium-upgrade/publish-asset-check.json) |
| Complete browser run | 236 passed, 7 failed, 6 skipped in the initial 249-case run; all seven failures subsequently resolved and retested, as detailed below. [Full log](../output/premium-upgrade/browser-final.txt) |
| Focused cross-engine retest | 35 passed, 1 new Safari dialog-focus failure; the seven original failures passed. [Retest log](../output/premium-upgrade/browser-retest.txt) |
| Final dialog/axe retest | 3 passed, 0 failed across all three engines; both themes and Safari focus restoration. [Final dialog log](../output/premium-upgrade/browser-dialog-final.txt) |

The populated responsive matrix covers all nine routes, light/dark themes and **360, 390, 768, 1024, 1440 and 1920 px** widths. Its assertions include one named visible heading, captioned tables with column headers, contained document width and no browser errors. All financial data in these isolated fixtures is explicitly synthetic test data, never shipped as production market information.

Regression tests exercise IME commit, cancellation/late responses, keyboard watchlist actions, date errors without API requests, pending portfolio verification, edit identity, filter removal/counts and named tables. The browser suite includes axe checks; open unsaved-edit dialogs were separately scanned in both themes on all three engines. Automated scans do not establish WCAG certification.

The full browser run exposed a deferred-script test that also blocked the deliberately synchronous theme bootstrap, an incorrect spotlight selector in a pending-save test, and an actual stale-progress hero resize defect. Those test assumptions and the source defect were corrected. The 36-case cross-engine retest passed all seven original failures and found a new Safari touch-focus issue in the added departure dialog. Returning focus to the activating link fixed that issue; the final three-engine dialog retest passed. This is a full run plus scoped retests, not a claim that one final uninterrupted suite was entirely green. The six deliberate skips are desktop-only layout/matrix checks under the two mobile projects.

## 7. Regression verification

Source review found no new actionable security defect in the reviewed changes. Server-only credentials, API/cache/rate handling, CSP, preview gates, safe provider text/URLs, browser persistence and financial formulas remain intact. No new financial dataset or request fan-out was introduced.

Existing tests and added regressions cover watchlist persistence, portfolio currency separation and missing valuations, safe news links, stale/invalid quotes, provider selection, search cancellation, consent/backup behavior and disabled Technical Analysis. Passing unit tests establish their tested behavior; they do not prove every live provider entitlement or physical-device interaction.

The nine production routes were inspected as an older deployed version. Local changes have not been validated as production changes. The initial 54 manual local captures all measured **1280 × 720**, despite size-bearing filenames: viewport overrides affected another open tab. [Inventory](../output/premium-upgrade/ui-inventory-before.json) and [capture notice](../output/premium-upgrade/local-before/README.txt) preserve that limitation. Those captures are not responsive evidence; the 108-case measured matrix is.

The scoped visual review inspected representative desktop/phone captures across nine routes, a tablet screener and narrow error state, then both departure-dialog themes; it found no material design issue within that reviewed scope. [Local live-data screener capture](../output/premium-upgrade/local-after/screener-filter-dark.jpg) supplements the isolated fixture matrix. CUA captures exclude the 6 px scrollbar and may be JPEG: a 390 px viewport produced a 384 px content image, recorded as [earnings error](../output/premium-upgrade/local-after/earnings-error-viewport390-content384-light.jpg), not as a 390 px PNG.

## 8. Outstanding limitations

- Verification comprises a full suite and scoped corrective retests. There is no final uninterrupted all-green full-suite run; all observed failures were resolved and retested.
- Real Finnhub entitlement, cached/stale data, unavailable historical candles and provider limits remain product constraints; no history, earnings, breadth or performance data was manufactured.
- Automated desktop/mobile browser profiles are not physical phones. Actual keyboards, notches, screen readers, device thermal/memory behavior and field performance remain unverified.
- Local lab observations retain substantial homepage long tasks and desktop stock CLS slightly above 0.1; see the measured performance section. No claim of passing field Core Web Vitals is made.
- DESIGN lint retains ten orphan-token documentation warnings. The strict application audit excludes an unserved historical Higgsfield study; its earlier actionless-button finding remains in baseline evidence and was not silently described as fixed application code.
- Higgsfield-generated footage remains a separate unavailable dependency recorded in [PRODUCT.md](../PRODUCT.md); this upgrade does not claim to complete media generation.

## 9. Changed files

This list describes the current task's focused contributions. It is not the whole Git diff: many source files and studies were already modified/untracked when work began.

| File / group | Current-task contribution |
| --- | --- |
| `MarketDesk/wwwroot/js/site.js` | Canonical clearable-input helper, unsaved-editor departure dialog and existing theme-color synchronization. |
| `MarketDesk/wwwroot/js/market.js` | IME-safe search, shared clear control, watchlist action focus/status and explicit storage success. |
| `MarketDesk/wwwroot/js/research.js` | Inline errors/labels, date bounds, pending locks, edit identity, captions, filter chips/counts and chart focus continuity. |
| `MarketDesk/wwwroot/js/theme-init.js` (new) | Same-origin saved-theme bootstrap before styles. |
| `MarketDesk/Views/Shared/_SiteHead.cshtml` | Versioned synchronous theme bootstrap inclusion. |
| `MarketDesk/wwwroot/css/market.css`, `observatory.css` | Canonical utility tokens and shared field/control/caption/filter styling. |
| `frontend/hero-scene.js`, `MarketDesk/wwwroot/js/generated/hero-scene.js` | Narrow resize anchoring correction and regenerated existing bundle. |
| `tests/premium-research.test.cjs`, `tests/design-contract.test.cjs` (new) | Workflow regressions and runtime/documentation token agreement. |
| `tests/e2e/premium-upgrade.spec.cjs` (new) | Search/watchlist/research journeys and 108-case populated responsive matrix. |
| `tests/browser-behavior.test.cjs`, `tests/site.test.cjs`, `tests/e2e/journeys.spec.cjs` | Supporting shared-UI/harness checks, including the theme-bootstrap loading distinction. |
| `tests/performance/premium.bench.cjs`, `playwright.benchmark.config.cjs` (new) | Repeatable baseline/final local lab protocol and observer-support reporting. |
| `DESIGN.md`, `UX-CONTRACT.md` (new), `premium-ui.json` (new) | Accepted design/context, canonical behavior owners, audit/test commands and evidence pointers. |
| `docs/premium-upgrade-plan-2026-10-30.md`, this report (new) | Alternatives, scope/review, acceptance criteria and actual delivery evidence. |

Evidence logs, measurements and captures are under ignored `output/premium-upgrade/`. No dependencies, backend/domain changes or infrastructure changes were added by this task. Relevant pre-existing package and backend changes must remain attributed to their earlier work.

## 10. Deployment status

**Local code changes only.** No commit, push, merge, deployment or production infrastructure mutation occurred. The public site still represents its separately deployed version. The working local preview is at http://127.0.0.1:5153/. The build output is an artifact for review, not a Render deployment.
