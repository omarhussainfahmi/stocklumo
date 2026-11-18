# Stocklumo visual correction — 27 October 2026

This report supersedes the visual conclusions in `taste-interface-2026-10-27.md`. That earlier pass was rejected by the owner as too plain and visually weak, especially its colors and cards. Existing unfinished functional work was preserved, then the visual implementation was corrected in the same ASP.NET Core project. Nothing was published during this correction.

## Direction and boundaries

Used the explicitly requested local `design-taste-frontend` skill. No Sites skill or Sites hosting was used. Research screens retain **Data terminal**, seed **1218760361**, with the existing palette and type kept. The homepage uses **One motif**, seed **2034503926**: Stocklumo's original ribbon becomes a single oversized, low-opacity background crop. The original logo files and wordmark are unchanged.

The owner's centered, tall introduction, navy/mint brand, sticky header and green card-top treatments take precedence over conflicting generic skill defaults. No downloaded financial background, fake chart, new runtime library, framework migration or business-logic change was introduced. Motion remains restrained; no scroll spectacle was added to a working research application.

The subject remains specific: independent eight-company ticker; separate daily eight-company spotlight; real provider coverage; browser-local saved/recent stocks; genuine quote times; twelve-company screener; snapshot comparison; practice holdings; earnings records; and honest provider-access limits.

## Changes by page

| Page | Result |
| --- | --- |
| Home | Navy opening in both themes, original ribbon motif, larger readable headline, concise description and existing centered search. Laptop sizing keeps the main action within a 720px-high viewport. Six statistics form a horizontal desktop strip, three columns on tablet and two on phones. Snapshot and four research links share the next row. Eight spotlight cards use four desktop columns, larger prices and aligned company-name blocks. No green divider between the card rows. Watchlist/recent panels and discovery remain separate working sections. |
| Markets | Snapshot and discovery share desktop width; discovery has three desktop columns and retains More/Fewer controls. Existing separate spotlight, recent stocks and news remain. |
| Stock details | Shared stronger surfaces, headings, controls, range bands, profile and watchlist tables. Retained the earlier compact, honest empty/single-observation treatment and full-width interactive multi-observation chart. No invented candles or overlays. |
| Watchlist | Stronger panel contrast, clearer table headers and financial values. Existing reorder/remove controls, timestamps, saved lists and empty-state recovery remain. |
| News | Shared stronger hierarchy and panel contrast, including empty/unavailable states. Existing leading-story layout, publisher attribution and real external links remain. |
| Screener | White/light or navy/dark panels, clearer fields and headers, readable selected rows and inspector. Retained the earlier responsive advanced-filter disclosure, presets, reset, sorting, inspection and corrected bottom-grid alignment. |
| Compare | Clearer controls, quote/fundamental tables and existing data bars. Latest snapshot remains static; historical options and retry controls remain absent. |
| Virtual portfolio | Shared stronger field outlines, table headers, financial values and status treatment. Existing date containment, validation, edit/remove behavior, currency-separated valuations and historical-access handling remain. |
| Earnings | Shared form/table contrast and readable dates. Native selectors, date validation, watchlist filter, calendar/reported modes and EPS displays remain. |
| Privacy / Terms | Updated shared palette, readable panels, native section links and sticky-header offsets. Legal content was retained. |
| Privacy & backups | Stronger surfaces within the earlier label/control layout. Consent controls, private export, preview-before-restore and safe validation remain. |
| Custom 404 | Consistent palette, typography, footer and recovery controls; actual HTTP 404 retained. |

Shared typography is now 15px body, 14px table cells and 22px panel headings, with local Manrope and tabular numerals. Light mode uses a darker blue-gray field (`#e0e7ee`), white panels and stronger control outlines. Dark mode uses a deep navy field (`#011428`), distinct panel (`#061f37`) and supporting (`#0b2b45`) surfaces. Green and red remain financial/status signals. Table headers have a subtle contrasting fill rather than disappearing into the rows.

The independent ticker now fits laptop widths without forcing desktop overflow. Its visible UTC date/time is shorter; the complete year, time and freshness remain in the accessible label and title. Phone tickers still scroll inside their own frame. Sticky navigation and the six-pixel themed Chromium scrollbar / Firefox thin scrollbar remain.

The privacy notice is a compact corner panel. Reject and Allow remain equally available; Not now dismisses the current page's notice without granting or storing consent. Cookie settings reopens it. DNT/GPC handling, opt-in analytics loading and production-origin restrictions are unchanged. The existing home-only mobile shortcut now yields while the intro actions are visible, avoiding duplicate controls covering one another; one IntersectionObserver replaces the need for a scroll handler.

## Data and interactions

All financial displays continue to use existing application services. Stock coverage/exchange counts come from `/api/universe`; spotlight availability and live-trade counts are computed from the actual daily selection and its current quote state; saved/recent counts come from existing browser storage. Missing values remain unavailable. The selected-stock balance and bars retain their existing common percentage scale and previous-close calculation.

The actual local preview showed 7 of 8 spotlight quotes, an unavailable company profile and a closed regular market. Those states were left intact. News/provider failures also remain explicit. Browser-test fixtures are synthetic, isolated to tests, and never substituted into the running application. No production sample dataset needs replacing.

Technical Analysis remains disabled. Comparison remains snapshot-only under current Finnhub access. API contracts, credentials, server integrations, portfolio calculations and deployment configuration were not changed.

## Look-and-fix review

1. **First read:** the previous stripped-down opening and tall statistics beside the snapshot were weak. The corrected first screen supplies Stocklumo identity and a clear stock search; the working workspace follows with coverage and selected-stock movement.
2. **Grid:** statistics use one compact divided strip. Snapshot/research and saved/recent use shared edges without forcing sparse panels to stretch. Short empty states remain short rather than gaining fake content to fill space.
3. **Color:** neutral ink leads the coverage figures; actual positive/negative data retains green/red. The navy hero and ribbon deliberately carry brand color outside data, honoring the owner's selected identity.
4. **Numbers:** existing breadth/availability calculations and selected/ticker separation are retained. Visible UTC ticker labels keep full accessible timestamps. Zero changes stay neutral; missing quotes stay unavailable.
5. **Missing/zero states:** empty portfolios, watchlists, news and unavailable history retain specific explanations and real next actions.
6. **Chart marks:** bars retain the same scale across the selected stocks, direction and percentages. No historical inference is drawn from a single observation.
7. **Phone:** navigation folds into the existing menu; tables scroll inside their panels; six summary cells become two columns; filters disclose without clearing values. Visual review caught inherited dark text on the light-theme navy hero and a duplicate sticky shortcut over the intro actions. Both were corrected and received dedicated browser regression checks.

No claim of perfection or design certification is made from an automated score. The screenshots and the owner's review determine visual quality.

## Files

The correction directly updates:

- `MarketDesk/wwwroot/css/market.css`: palette, type, hero, statistics, card/table density, responsive layout, privacy panel and statuses.
- `MarketDesk/Views/Market/Index.cshtml`: concise introduction/tool copy and removal of redundant secondary tool prompts.
- `MarketDesk/wwwroot/js/market.js`: reuse/reposition existing home nodes and compact ticker timestamps, with full accessible times.
- `MarketDesk/Views/Shared/_PrivacyControls.cshtml` and `MarketDesk/wwwroot/js/site.js`: compact privacy choices, consent-safe page dismissal and mobile shortcut visibility.
- `tests/site.test.cjs` and `tests/e2e/journeys.spec.cjs`: consent, responsive composition, laptop action/ticker fit, hero color and sticky-shortcut regressions.
- `DESIGN.md`: current palette, layout and maintenance decisions.

Earlier unfinished changes to the shared footer/watchlist, research UI, information pages and browser tests are retained. See the earlier reports for that history; this pass does not claim every pre-existing working-tree change as newly created. No original logo asset or package dependency was changed.

## Verification

- Release build: succeeded, **0 warnings / 0 errors** (`output/taste-resume/build-final.txt`).
- Backend suite: **116 passed**, zero failed (`backend-final.txt`).
- Frontend suite after the final JavaScript change: **60 passed**, zero failed (`frontend-final.txt`).
- Full browser run: **154 passed, 2 intentionally skipped**, 8.1 minutes. The two skips are the laptop-only geometry test on phone projects (`browser-final.txt`, preserved `browser-full-results.json`). Covers desktop Chromium, Android-sized Chromium and iPhone WebKit, both themes, 13 public templates, accessibility/contrast, console/assets, search, navigation, watchlists, filters/presets, charts, portfolio validation/edit/remove, earnings and unavailable-provider states.
- An earlier two-worker run had 148 passes and two iPhone timeouts at the end of long multi-page tests. Both passed in an isolated one-worker recheck; the complete one-worker run above then passed without assertion or timeout weakening. Evidence is retained in `browser-round-one.txt` and `iphone-recheck.txt`.
- Final home-specific recheck: **13 passed, 2 intentionally skipped**, 54.2 seconds (`home-final-recheck.txt`). Includes the explicit hero text/label/button colors in both themes, sticky shortcut yielding and returning, laptop ticker/action fit, compact 320/390px privacy choices, and both-theme home accessibility/containment on all three browser projects. The first shortcut check exposed that actions behind the sticky header still counted as visible; excluding the header from the observer's root fixed it without weakening the check.
- Final Taste inspector: **13 routes × 1440/768/390px, zero FAIL findings**, with the explicit `covered-text` allowance explained below (`final-inspector-summary.json`). Home was inspected again after the final color and shortcut corrections. Each route's fold and scroll sheets are under `final-inspect/`; the 78 route/theme/browser captures are under `final-routes/`. These automated reports complement the actual-browser screenshot review; they are not a claim that every physical phone or every provider state has been tested.
- Source lint: **0 FAIL**, five shadow advisories. These are search/consent overlays and inset selection strokes, not resting-card shadows (`source-lint-final.txt`).
- Original brand files and dependencies unchanged; no credentials added by this correction. `git diff --check` passes, with ordinary Windows line-ending notices.

The inspector uses the explicit `covered-text` allowance because the requested sticky header and the visitor-choice notice are fixed overlays; generic sampling flags intentional overlay coverage during scroll. Actual action overlap was still reviewed and fixed. This allowance does not replace keyboard, navigation, contrast or geometry tests. Remaining visual advisories are defended as follows: original system-font wordmark is intentional; navy/mint and green card-top borders are explicit owner choices; the tall home opening is explicitly requested; meaningful summary values and the real HTTP status retain their appropriate sizes; sparse watch/recent content is not stretched merely to satisfy equal-height heuristics.

## Preview and deployment

Local preview: `http://localhost:5150/`, running compiled Release output in the Development environment. Production HTTPS settings are unchanged. Final real-data screenshots are in `output/taste-resume/final-hero-dark.png`, `final-hero-light.png`, `final-workspace-dark.png` and `final-workspace-light.png`. Browser fixture captures and inspector reports are separate diagnostic artifacts.

**No commit, push, Render deployment, paid service or production update occurred during this correction.**
