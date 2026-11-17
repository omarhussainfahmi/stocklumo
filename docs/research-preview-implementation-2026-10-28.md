# Financial data integration preview — 28 October 2026

## Status

Implemented an explicitly enabled, Development-only, loopback-only prototype in the existing ASP.NET Core application. It combines normal Finnhub quotes and existing user interactions with dated Longbridge research snapshots. It is **not a production Longbridge integration**, an automatic feed or evidence of redistribution permission. No deployment, push, paid subscription, credential creation or external message was performed.

The preceding [capability study](financial-plugin-capabilities-2026-10-28.md) and [roadmap](financial-data-roadmap-2026-10-28.md) describe the available tools and longer-term options. This report documents the implemented subset, not every speculative feature in that roadmap.

## What works locally

| Page | Implemented behavior |
| --- | --- |
| Stock details | Daily OHLC candlesticks or closing-price line, volume, 5D/1M/6M/1Y windows, intraday minute-price line, pointer/keyboard/slider inspection. Session view remains the existing Finnhub observation chart. Historical data loads even if Finnhub company details fail. |
| Financial history | Five captured fiscal quarters for AAPL, MSFT and NVDA: revenue and net income charts plus exact values, publication dates and operating margin in an expandable table. Unsupported companies do not receive invented panels. |
| Compare | Local-only historical range selector for captured companies; comparison aligns shared dates and normalizes forward-adjusted closes to 100. Unsupported selections retain ordinary snapshot metrics with an explicit coverage message. Public/default mode retains static “Latest snapshot.” |
| Screener | Filters, sorting, presets, inspection and charts operate on 100 captured US matches from a provider result of 6,450. This is explicitly a subset, not the entire market. Table scroll is bounded on desktop. |
| Watchlist | One-month closing-price mini-trends for supported saved companies, each on its own scale. Existing add/remove/reorder/browser storage remains intact. |
| Virtual portfolio | Existing historical P/L can use captured **unadjusted** series. Existing purchase-date and currency calculations remain unchanged. Its exclusions remain visible. |
| Earnings | Five captured events within the stated eight-company coverage and calendar window, with currency, missing actuals and out-of-window states preserved. Reported company earnings retain their existing provider behavior. |
| Home, markets, news and top ticker | Existing providers and selections remain unchanged. A local preview banner distinguishes snapshot research from Finnhub quotes. |

No Technical Analysis, trading, brokerage holdings, order placement or private account data was added. Existing Stocklumo branding remains unchanged. New components inherit both themes and use existing SVG/CSS rather than another chart library.

## Snapshot provenance and limits

- Source: Longbridge read-only chat tools; capture time **2026-10-28 00:23:15 UTC**.
- Companies: AAPL, MSFT, AMZN, GOOGL, META, TSLA, V and NVDA.
- Per company: 270 daily unadjusted bars, 270 separate forward-adjusted bars and 390 intraday price/volume observations.
- Screener: 100 rows, English company metadata; provider total 6,450 under the price ≥ $1 query, ranked by capitalization. This is neither market breadth nor a list of all US securities.
- Statements: five quarters each for three companies. Calendar: five events, eight-company scope, 27 October–28 November 2026.
- Captures are frozen. Ranges end at the last captured trading observation, not the visitor's current date. They do not refresh on reload. Every chart states its capture/source.
- Daily session gaps are compressed; calendar labels use New York dates. Intraday observations are prices, not fabricated minute OHLC candles.
- Forward adjustment is used only for the historical comparison. It is not represented as total return. Portfolio history uses raw prices to preserve the existing hypothetical-lot model; fees, dividends, splits, taxes and FX remain excluded.

The first broad tool responses exceeded connector response limits and were discarded. Final captures were repeated in compact tuples and validated. The builder checks ordered dates, OHLC bounds and volume. Capitalization is independently checked against shares × price (5% tolerance), then expressed in USD millions. Average volume is calculated only where ten daily bars exist. Unavailable industry values are omitted rather than guessed. Earnings dates use event timestamps in America/New_York; empty actuals stay null. Statement publication dates must not precede period end.

Real captures are stored only under ignored `output/financial-plugin-preview/`, outside `MarketDesk` and its web root. No provider dataset or credential is included in tracked source or the application publish tree. Automated tests use separate, clearly synthetic test fixtures.

## Access and licensing still to confirm

The installed chat connection does not supply a dedicated Stocklumo server credential or public redistribution authorization. A working tool call establishes endpoint access in that connection only. Recent candlesticks worked, while the date-range endpoint returned 301607 with quota zero. Do not treat those entitlements as interchangeable.

Use the prepared [Longbridge support request and credential checklist](longbridge-production-access-request.md). It asks the provider to confirm public display, delayed/EOD data, derived charts, cache retention, attribution, browser responses, fees/quotas and market-data-only authentication for Stocklumo. **The request has not been sent.** Retain a written answer before implementing a public adapter. Do not extract the chat connector's OAuth token or expose credentials in frontend code.

Financial Datasets returned a zero-credit balance for both tested history and statement requests. No billing or paid plan was enabled. Its public-website permissions require separate confirmation as well; adding a personal API key alone does not establish redistribution rights.

## Gates and failure handling

`ResearchPreview` requires all of: ASP.NET Development environment, `ResearchPreview:Enabled=true`, a valid absolute server-owned snapshot file, and a loopback remote address. Production/Staging, missing files, malformed snapshots and non-loopback clients fail closed. Preview API routes return 404 outside the gate. The script is omitted from normal/public pages. API responses are no-store and read-rate-limited.

The loader limits file size, collections and series lengths and checks dates, OHLC, currency and statement chronology. No request chooses a file path. The preview makes no provider calls and has no credentials. An in-memory promise cache prevents duplicate chart fetches during discovery and range loading; user range choices are not overwritten by later profile responses.

Normal site operation remains Finnhub-driven when the flag is absent/false. Missing values remain unavailable, distinct from zero. Provider failures are not replaced by fabricated prices or company profiles.

## Files for this implementation

- `MarketDesk/Services/ResearchPreview.cs`: gated, validated snapshot loading and range payloads.
- `MarketDesk/Controllers/ResearchPreviewController.cs`: local metadata, screener, statements, comparison history and calendar endpoints.
- `MarketDesk/Controllers/DataController.cs`, `MarketDesk/Program.cs`: optional chart integration and dependency registration.
- `MarketDesk/Views/Shared/_SiteHead.cshtml`, `MarketDesk/Views/Market/Index.cshtml`: conditional script and server-rendered capture banner.
- `MarketDesk/wwwroot/js/research-preview.js`: new interactive history, financial charts and watchlist trends.
- `MarketDesk/wwwroot/js/market.js`, `research.js`, `MarketDesk/wwwroot/css/market.css`: integration, source labels and responsive theme styling.
- `tools/build-research-preview.cjs`, `tools/start-research-preview.ps1`: capture validation/normalization and local-only launch.
- `MarketDesk.Tests/ResearchPreviewTests.cs`, `playwright.preview.config.cjs`, `tests/e2e/preview-data.cjs`, `tests/e2e/research-preview.check.cjs`: isolation, validation and browser tests.
- `playwright.config.cjs`: explicitly disables the preview during normal-site regression tests.

Other pre-existing working-tree design changes and the user's handoff file were preserved. No runtime dependency or package was added.

## Running the local preview

Build Release first, then run from the project root in PowerShell:

```powershell
& 'C:/Users/pc/Documents/Codex/2026-10-08/create-an-asp-net-core-web/work/dotnet/dotnet.exe' build MarketDesk -c Release
./tools/start-research-preview.ps1 -Dotnet 'C:/Users/pc/Documents/Codex/2026-10-08/create-an-asp-net-core-web/work/dotnet/dotnet.exe'
```

Open `http://127.0.0.1:5152/stock/AAPL`. The launcher requires the local validated snapshot, binds loopback only, disables Sentry/analytics for that process, and restores previous environment values on exit. Captures are intentionally absent from a fresh source checkout. To regenerate a local normalized snapshot from an existing authorized raw capture, use `node tools/build-research-preview.cjs` with its documented input/output arguments. The builder does not contact providers.

## Verification

Baseline before implementation: Release build 0 warnings/0 errors; 116 backend tests and 60 frontend tests passed.

The new preview browser suite passed **24/24** on desktop Chromium, Android Chromium and iPhone WebKit. It exercises both chart themes, real range changes, candlestick/line/session transitions, keyboard inspection, unavailable profiles, historical comparison coverage, screener filters/presets, calendar bounds/missing actuals, watchlist removal and historical practice P/L. Chart pages passed automated WCAG A/AA checks with no detected violations; this is not a claim of complete accessibility certification.

An initial preview run found a label lookup failure in the comparison control. An explicit accessible label and role-based test resolved it. An earlier unconditional async wait changed default frontend initialization timing; it was corrected so preview-off behavior remains synchronous and the existing frontend suite passes.

Final results:

- Release build: **0 warnings, 0 errors**. One attempted build encountered the running local preview's Windows executable lock; stopping that owned preview process and rebuilding resolved it. The preview was restarted from the final build.
- Backend: **125 passed**, 0 failed.
- Frontend: **60 passed**, 0 failed.
- Existing-site browser regression, preview explicitly disabled: **157 passed, 2 existing skips**, 0 failed (3.7 minutes). The skips are desktop-only checks in the two phone projects.
- Preview browser suite after the final search-width correction: **24 passed**, 0 failed (39.1 seconds), including the explicit full-width screener input assertion.
- `git diff --check`: no whitespace errors. New preview module Taste source lint: **0 failures, 0 warnings**.
- Taste visual inspector: stock, screener and comparison at **1440, 768 and 390px**, with 0 failures after an explicitly documented `covered-text` allowance. Its initial failures identified the existing dismissible privacy card temporarily covering the repeated footer wordmark, not a chart/headline layout regression; consent behavior was preserved. Remaining warnings are the optional Segoe fallback declaration (actual measured face: Manrope 100%), stock sections intentionally below the primary price/chart, and a screener canvas heuristic despite full-width controls/table/inspector. These are not claimed as unqualified clean audits.

Actual-provider browser checks confirmed 22 monthly versus 252 yearly AAPL observations, a forward-adjusted AAPL/MSFT historical comparison, and all 100 stated screener rows. Screenshots and logs are under ignored `output/financial-plugin-study/`; the dated chart proof is `local-real-history-dark.png`. The visual review caught and fixed the captured screener's half-width company search after its unsupported industry field was hidden. The original navy/mint, Manrope, ribbon logo and existing Taste Data terminal direction were retained rather than redrawn. Price/volume, shared-date comparison and filterable matches remain the respective screens' primary questions.

Actual-provider visual checks are separate from deterministic synthetic browser tests. No claim is made that every phone or network condition has been tested. Production was not deployed or modified, and no production credential or redistribution right was verified.
