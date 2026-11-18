# Stocklumo: Financial Datasets + Longbridge assessment

Reviewed 28 October 2026, Asia/Riyadh. This is a development recommendation, not a change to the running website or investment advice.

## Recommendation

Use the providers for different jobs, rather than requesting every field from both. **Longbridge is the stronger immediate candidate for price charts, broader stock discovery and calendars. Financial Datasets is a possible later layer for filing-backed fundamentals, ownership and operating KPIs. Keep the working Finnhub integration during validation.**

Installing the chat plugins does not install a production data feed on Render, grant public redistribution rights, supply a frontend chart library, or automatically run background updates. A normal authenticated server integration is still required. The existing ASP.NET Core architecture and original Stocklumo logo should stay.

## What was actually verified

Reviewed the declared capabilities: Financial Datasets exposes **28 tools**, Longbridge **134** in this session. The installed packages contain connector manifests/tool definitions, but no separate `SKILL.md` files. Their tools and official documentation were used; this assessment does not claim separate skills were executed.

Ran **14 read-only public-market-data requests**. No personal positions, balances, orders, watchlists or brokerage statements were inspected. No alert, watchlist, community post, purchase, deposit, subscription or account setting was created or modified.

- **Financial Datasets historical prices:** blocked. The connected account returned a $0.00 balance and asked for credits.
- **Financial Datasets quarterly income statements:** blocked by the same balance condition. Its advertised research capabilities remain unverified on this account; adding credits is not equivalent to a public-display license.
- **Longbridge quotes:** succeeded for Apple, Microsoft and NVIDIA, including prices, previous closes, timestamps and trade status. A successful snapshot does not establish a live streaming entitlement or latency guarantee.
- **Longbridge date-range historical candles:** denied with error `301607`, requested/limit `0/0`. Reducing the symbol count would not resolve this endpoint's entitlement failure.
- **Longbridge recent candles:** succeeded separately. First returned 20 Apple daily OHLCV bars; a deeper test then returned **260 daily bars for both AAPL.US and MSFT.US**, spanning **15 October 2025–27 October 2026**, with forward adjustment requested. This is genuinely useful history despite the other endpoint's denial. Access is endpoint-specific.
- **Longbridge intraday:** returned **390 one-minute Apple observations** for the 27 October regular session, with price, volume, average price and turnover.
- **Longbridge screener:** returned **6,450 matching records** for a US screen with previous close at least $1, sorted by market cap. This is that provider's filtered result count, not a verified count of all US common stocks, not market-wide breadth, and not the number of quotes licensed for redistribution.
- **Longbridge earnings calendar:** returned records in three requested day groups. Group dates and the embedded Eastern date differed, requiring timezone normalization before display.
- **Longbridge company profile:** returned useful details, but some content was Chinese and a categorical field was numeric. English localization must be explicitly handled.
- **Longbridge business segments:** returned five entries, with geographic names in the `business` array. One reported date preceded the stated period end. This response should not be published as a validated product-segment chart without reconciliation.
- **Longbridge income statement:** returned five quarterly periods, USD currency and 26 fields in the latest period. Structured English-like field identifiers were available alongside Chinese display names, making controlled English labels feasible.

The candle and intraday tests prove sample data availability through this connection, not universal access for every stock, unlimited history, complete adjustment semantics, streaming access, or website licensing. No chart ranges were re-enabled in Stocklumo during this study.

Probe evidence: `output/financial-plugin-study/probe-results.md`. Declared capability inventory: `docs/financial-plugin-capabilities-2026-10-28.md`.

## The two providers' roles

### Financial Datasets: deep, source-linked company research

Its declared tools cover statements (income/balance/cash flow), current and historical financial metrics, company facts, price snapshots and OHLCV history, company/market news, SEC filings and individual filing sections, earnings records/feed, business segments, management guidance, operating KPIs, non-GAAP KPIs, insider trades and ownership, institutional 13F holdings, beneficial 13D/13G stakes, ETF holdings, macro series and fundamental screening.

Best fit for Stocklumo: financial-history charts with source links; company-specific KPIs; deeper fundamental filters; actual reported earnings; ownership context; an optional compact filing timeline. Its historical earnings feed must not be mistaken for a forward earnings schedule. Deduplicate earnings announcement/filing records for the same company/report period. Separate management guidance, analyst estimates, GAAP and non-GAAP values.

Financial Datasets' public pricing currently lists a **$20 personal-license credit pack (1,000 requests)**, **$200/month Personal**, and **$2,000/month Professional**, with in-product redistribution listed on Professional. Its terms distinguish personal use from professional redistribution and prohibit raw/bulk resale. This makes it a poor default paid addition to a small public site without an explicit budget and applicable license confirmation. No purchase is recommended merely because the plugin was installed. [Pricing](https://www.financial-datasets.ai/pricing), [terms](https://www.financial-datasets.ai/terms-of-use).

### Longbridge: market data and a broader research desk

Its declared public-market tools cover quotes, trades, depth, recent/historical candles, intraday observations, market status/sessions/trading days, company data, financial statements, segments, dividends/corporate actions, earnings and other calendars, forecasts/consensus, analyst ratings and targets, peers/industry rankings, valuation history, stock screening, movers/leaderboards, news, filings, fund/shareholder information, short-interest data, capital flows, exchange rates and macro data. It also exposes options, warrants and region-specific research, plus account and write-capable tools that should remain outside this public-site plan.

The APIs cover several markets, but availability differs by endpoint, market, region and account. Broader geographic coverage should be a separate later project: the current site assumes US stocks and often USD. Simply stripping `.US` and accepting `.HK` would not solve currency, calendar, symbol, lot-size or market-status differences.

Recent candles, intraday, screener, company details, statements, segments and earnings calendar succeeded in the limited probes. Analyst ratings, options, depth, news, ownership, macro and most other endpoints were cataloged, not live-tested. Do not label all 134 tools as verified working.

Longbridge's documentation distinguishes OpenAPI permissions from its app/web permissions. Its published account terms restrict onward distribution without separate authorization. The applicable rights for Stocklumo need confirmation before exposing the owner's connection to public visitors. [Candles](https://open.longbridge.com/docs/quote/pull/candlestick), [historical quotas](https://open.longbridge.com/docs/quote/pull/history-candlestick), [published market-data terms](https://longbridge.com/sg/zh-CN/support/topics/us-trade/user-agreement).

## Improvements to existing pages, in priority order

### 1. Stock details: real charts first

Replace the sparse session-only experience with validated provider observations when available. Preserve the existing session chart as an honest fallback.

- Intraday line chart from real minute observations; clearly label the trading session and time zone.
- A restrained candlestick view and aligned volume pane from actual OHLCV, with one synchronized crosshair and readable price/volume axes.
- Month, six-month and one-year ranges from the proven recent daily series, only when enough bars actually cover the requested window. Twenty bars alone would not establish a complete calendar month; 260 bars covered more than a year in the two deeper tests.
- Fetch/cache one sufficient series and slice it locally for supported ranges; do not request identical provider history on every tab click.
- Display source, as-of time, adjustment policy and incomplete-current-bar status. Do not manufacture gaps or turn missing OHLC values into candles.

This is the highest-value improvement because it directly addresses the earlier Finnhub limitation and the owner's chart references. Candlestick price visualization does not require re-enabling the disabled Technical Analysis route, indicators, trading signals or buy/sell controls.

### 2. Compare: genuine performance over time

The 260-bar Apple/Microsoft results justify a prototype of historical comparison. Before enabling it publicly, verify common trading dates, adjustment compatibility and sufficient range coverage.

Use a normalized price-performance plot (100 at the first shared close, or percentage change from that close), clear company labels and an accessible table. Keep quote/fundamental snapshots separate from historical returns. Do not call adjusted price performance total return unless dividend-reinvestment handling is established. Show actual coverage and missing-stock exclusions instead of stretching two dates into a convincing-looking trend.

The current static Latest snapshot UI should remain until this works end to end. Do not restore the old useless range dropdown just because a plugin advertises history.

### 3. Screener: move beyond twelve hard-coded candidates

A provider-backed, paginated screen could add valuation, growth, profitability, dividends and market-cap filters across a broader defined universe. Retain existing presets, reset behavior and the inspect-a-company panel.

Best visual treatment: compact sortable rows, company identity, price/change, cap, a few chosen fundamentals and a useful inspector. Add real history previews only on demand or from shared cached history. The existing scatter plot becomes more meaningful with a larger returned dataset, but the axes and result scope must stay explicit.

The 6,450 result count was for one filter, not an unconditional coverage promise. Define common-stock/ETF/ADR/OTC rules, response limits, pagination, sort semantics and missing values. Sorting a partial client page cannot establish a market-wide top-eight ranking. The independently selected top ticker stays unchanged.

### 4. Earnings: clearer schedule plus reported results

Use Longbridge's schedule as a candidate source; use validated reported data from Longbridge or later Financial Datasets for actuals. A compact weekly/date grouping and estimate-versus-actual EPS bars can add useful information without another large empty dashboard panel.

Preserve existing ticker/watchlist filters, date validation and calendar/reported modes. Represent pending actuals as missing. Keep reported quarter, event date, publication time and fiscal year separate. The tested calendar grouped an event under 28 October while its timestamp was 27 October 16:30 UTC and its text named 27 October Eastern: canonical timestamps and venue time zones must drive display/filtering, not translated group labels.

### 5. Company research: financial substance rather than decorative cards

Use a small set of well-supported panels on stock detail pages:

- Quarterly revenue and net-income history with period labels and source links.
- Margins and cash generation as separate, clearly defined metrics.
- Product/geographic revenue composition with the breakdown explicitly named.
- A compact filing/results timeline.
- Later, analyst-rating distribution and target-price range, labeled as dated third-party estimates rather than Stocklumo recommendations.

Longbridge statements already returned useful periods. Financial Datasets becomes attractive if filing provenance, normalized statements, ownership or company-specific KPIs justify its cost. Avoid adding every metric to the first screen.

### 6. Watchlist and virtual portfolio

Watchlist: genuine cached mini price trends, a concise next-earnings date and optional user-selected columns. Preserve browser-local save/remove/reorder behavior. Avoid a separate history API request every time a price tick updates a row.

Portfolio: clearer allocation by holding/sector/currency, performance attribution and historical valuation where validated prices cover the lot dates. Capital contributions and holding changes must be separated from investment performance. Current holdings times historical prices alone cannot be presented as the complete historical value of an account. Do not change the existing lot calculations or import actual broker positions silently.

### 7. Homepage, Markets and News

Keep the separate eight-company ticker, daily spotlight and selected-stock snapshot. An optional provider-defined movers section, industry comparison or attributed market-event list could enrich Markets. Selected-stock breadth must never be relabeled as whole-market breadth.

Use real series for graphical previews; keep the tall centered original-brand opening. News could gain company filters and source-linked event context. Deduplicate feeds and preserve publisher attribution; do not republish full third-party stories. Provider-generated AI summaries must be explicitly distinguished from company filings and verified facts.

## Later additions worth considering

- Dividend and split events alongside earnings, with ex-date/payment-date distinctions.
- Company peers and valuation context rather than unexplained P/E gauges.
- A filing-backed ownership panel: insider transactions, institutional holdings and activist stakes, each with its actual filing/report date and known reporting lag. Overlapping holder classes must not be forced into a 100% pie chart.
- ETF holdings and overlapping exposure, if ETFs become an explicitly supported product area.
- A small macro context view with dated rates/yields/releases, rather than unrelated geopolitical maps.
- Personal price alerts only after choosing delivery, authentication and persistence. Longbridge broker-account alerts are not automatically a multi-user Stocklumo notification service.

Defer options/warrants, order books, broker balances/orders, community publishing, automated trading and broad international expansion. They are available in parts of the tool surface but are not the best next improvements for this project. Keep Technical Analysis disabled.

## Integration design that preserves this project

Add narrow, server-owned provider adapters behind the existing controllers/services. Preserve public routes and the current quote/history/error response shapes where possible; map provider payloads into the existing contract rather than rewriting the frontend around a third-party response.

Recommended responsibility split:

1. Retain Finnhub's working ticker/feed and profiles/logos initially.
2. Validate a Longbridge history adapter for existing chart and comparison features.
3. Add Longbridge screening, statements or calendar adapters one at a time after normalizing their data.
4. Consider Financial Datasets only for specific gaps it can economically and legitimately fill.

Do not average provider prices or silently join differently adjusted histories. Record provider, fetched time, source time, currency, session and adjustment policy. A fallback must remain identifiable. Cache by provider/symbol/period/session/adjustment, coalesce concurrent requests, apply timeouts/cooldowns, and use stale-but-labelled results only where appropriate. Closed-session history can be cached longer than live quotes; final TTLs depend on the provider's terms and freshness requirements.

Longbridge's documented SDK languages do not establish an official .NET SDK. Its quote transport includes WebSocket APIs. Verify the supported transport/authentication for the chosen endpoints first; do not invent REST routes or add an unofficial NuGet package. A small supported-SDK bridge might be needed, but should be evaluated against Render's resource budget before adding it. ASP.NET Core remains the application. [Official setup and supported SDKs](https://open.longbridge.com/docs/getting-started).

The chat's OAuth connection must not be copied into frontend code or treated as Render credentials. Use a dedicated, least-privileged server integration and approved data rights. Keep secrets server-side and existing Sentry/privacy behavior intact. Scheduled jobs, if needed later, require an explicit implementation; plugins do not schedule themselves.

## Data quality gates discovered in these probes

- **Locale:** Chinese names, industries and labels appeared. Prefer stable field IDs and validated English company metadata; do not translate ticker symbols or treat machine-generated translations as official names.
- **Units:** screener market-cap raw values resembled absolute currency amounts while legend metadata used `亿` (hundred-million units). Do not blindly multiply or divide from that label; verify endpoint semantics against an independent profile and map into Stocklumo's USD-millions representation.
- **Percentages:** percent numbers and fractional ratios differ across endpoints. Statement growth, ranking change, quote return and analyst upside need field-specific conversions.
- **Dates:** calendar grouping and embedded timestamps differed. Business-segment reporting metadata was also inconsistent with its period. Preserve raw source metadata and reject or withhold inconsistent displays pending reconciliation.
- **Shape:** some account regions return different schemas. Fields can be strings, missing, null or empty; zero is valid only when actually provided as zero.
- **Identity:** map internal symbols to provider listings explicitly, including share classes and market suffixes. Currency and market are part of identity.
- **Coverage:** validate chronological order, duplicate dates, market session, OHLC relationships, missing bars, requested/returned count and split/dividend treatment. Partial coverage must be visible.

## Recommended execution order and acceptance

1. Confirm production authentication, transport, public-display permissions and budget. No purchases or changes were made in this study.
2. Prototype existing stock history and AAPL/MSFT comparison locally using the proven endpoint, with labelled source/coverage and the existing snapshot/session fallback.
3. Verify ranges actually change plotted dates/data; test missing history, invalid symbols, limits and provider outages. Add real OHLCV rendering only after the data adapter is correct.
4. Add broader screening with precise universe/pagination/units, then earnings normalization and financial panels.
5. Review both themes and desktop/tablet/iPhone/Android layouts with the existing Taste Skill design system and Playwright/accessibility checks. Keep charts legible and loading dimensions stable.
6. Validate historical portfolio behavior separately; keep all calculations and browser-local data safe. Deploy only after the normal local/build/test/review workflow.

No website source, credentials, dependencies, provider account settings or production deployment were changed. The new files are this plan, the capability inventory and ignored read-only probe evidence. Application build/tests were not rerun because this task changed documentation only; the live provider probes are the new verification performed.
