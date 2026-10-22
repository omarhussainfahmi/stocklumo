# Stocklumo quality checks - 22 October 2026

## Changes

- Darkened the light theme's green accent from `#08775e` to `#06684f`. Automated checks found 4.27:1 contrast on the page background, below the 4.5:1 threshold for small text. The dark palette and component dimensions remain unchanged.
- Corrected the homepage statistics definition list: supporting descriptions now use `dd` elements rather than invalid direct `span`/`a` children. Existing values and their source are unchanged.
- Rendered the page identity in Razor before deferred JavaScript initializes. On phones, scripting-aware CSS presents the compact header immediately and gives the market-status strip a stable two-row layout. Navigation remains visible when JavaScript is disabled.
- Added Playwright regression tests and axe accessibility checks to the existing GitHub Actions workflow. No financial calculation, provider contract or live subscription behavior was changed. Technical Analysis remains disabled.

## Browser coverage

The suite covers 13 routes in both themes: dashboard, markets, watchlist, news, stock details, screener, comparison, portfolio, earnings, privacy, terms, settings and a custom 404.

Journey tests cover keyboard stock search, watchlist persistence, theme persistence, mobile-menu dismissal and navigation, screener filters/presets, portfolio validation/editing/removal, missing history, earnings filters, chart keyboard inspection, 429 recovery, native date-field containment, sticky controls, public discovery assets and deferred-script layout stability.

All financial responses used by these tests are explicitly synthetic browser fixtures. They never enter production or replace provider data. A separate setup-state check uses the real local API with no provider credentials. Tests do not establish current Finnhub entitlements or fresh trade delivery.

## Performance evidence

Lighthouse 13.5.0, headless Chromium 156, local Development server with Finnhub disabled, no optional analytics and cold browser storage. Mobile: 412 x 823, simulated 150ms RTT / 1.6Mbps throughput and 4x CPU slowdown. These are lab measurements of the setup state, not production or real-user field measurements.

An exploratory mobile baseline found CLS 0.866. The trace showed the main content moving when status labels wrapped during initialization. After the layout correction, three equivalent mobile runs measured:

- LCP: 1.739s, 1.374s, 1.665s; median 1.665s.
- CLS: 0.00094, 0.07744, 0.00094; median 0.00094.
- Total blocking time: 0ms, 0ms, 89ms.
- Performance scores: 100, 99, 99. Accessibility, Best Practices and SEO: 100 in all three runs.

One exploratory desktop run scored 100 in those four categories, with LCP 0.511s and CLS 0.00086. It is not a three-run desktop benchmark. Aggregate scores do not prove accessibility conformance, search ranking, good field INP or loading under two seconds for every visitor.

Actual iPhone hardware, assistive-technology user testing and field Core Web Vitals remain unverified. Render Free cold starts can still delay production independently of frontend performance.

## GitHub and production access

The GitHub connector can read `omarhussainfahmi/stocklumo`, but its connected account (`MHZ48`) reports `pull: true`, `push: false`. This review did not change permissions or connect a different GitHub account. The collaborator-permission endpoint returned 403 for the integration.

Existing Windows Git credentials successfully pushed commit `dccfb355dd13bb1e371f3390b491b5ef5dfd67a0` to the owner's repository without changing connector permissions. [GitHub Actions run 39707414390](https://github.com/omarhussainfahmi/stocklumo/actions/runs/39707414390) passed, including the backend, frontend, browser and dependency checks.

After the owner confirmed Omarhussain's workspace, Render automatically deployed this commit to the existing Free service. Deployment `dep-dbcmktukvk2s73e2n4i0` became live at 01:45:48 UTC on 22 October 2026. No paid service or duplicate manual deployment was created.

Production checks returned HTTP 200 for `/health`, `/`, `/markets`, `/watchlist`, `/stock/AAPL`, `/screener`, `/compare`, `/portfolio`, `/earnings`, `/news`, `/privacy`, `/terms`, `/settings`, `/robots.txt`, `/sitemap.xml` and the social-preview image. `/technical` correctly returned 404. Served HTML/CSS contain the updated layout, accent and privacy disclosure. The browser loaded actual Finnhub quotes and search results and correctly reported MARKET CLOSED with separate connection health. Fresh trades were not observed outside regular trading hours. The checked post-deployment Render error logs were empty. These checks do not replace physical-phone testing or establish production loading-time guarantees.

## Optional Sentry monitoring

The owner created the `stocklumo` Sentry organization using EU storage. The ASP.NET Core project is `dotnet-aspnetcore`. Only error monitoring was selected; no repository integration, paid upgrade, log streaming or performance tracing was enabled.

`Sentry.AspNetCore` 6.12.1 is configured behind an explicit switch. Set both of these **server-side** to enable it:

- `Sentry__Enabled=true`
- `Sentry__Dsn` from the project's Client Keys settings.

For local development, the DSN is saved in the existing ASP.NET User Secrets store; it is not in source control. Enable monitoring explicitly with `Sentry__Enabled=true` for an intended local run. The normal app and browser tests leave monitoring off. Both variables are now saved in Render's server-side environment, preserving all existing settings, and the enabled configuration has been deployed. Do not paste the DSN into browser scripts or commit credentials.

`ErrorMonitoring.SafeEvent` reconstructs reports from a small allowlist: exception type, software version, environment and event time. It omits original exception messages/stacks, request URLs/query strings/headers/bodies, user fields, arbitrary contexts, extras and breadcrumbs. This deliberately limits diagnostic detail to protect provider keys and user input. Provider-handled failures and HTTP 4xx responses are not automatically escalated to application exceptions. Sentry still processes the reporting server's network connection and provider-side retention rules apply.

Two backend tests verify that original sensitive fields are not copied. A single intentional setup event passed through this same filter and was visibly received in Sentry as `DOTNET-ASPNETCORE-1`, environment `setup-verification`, tag `verification=setup-2026-10-22`. It is a local delivery check, not an actual production failure. Production monitoring is now enabled and the application starts healthily, but no production exception was deliberately triggered or newly received production event verified. The Sentry CLI/account integration is separate from the application SDK and was not authenticated in this review.

## Repeat verification

Final results: Release build succeeded without warnings/errors; 100 backend tests, 55 frontend tests and 114 browser checks passed. The browser run had no failures, skips or retries. npm and NuGet scans reported no known vulnerabilities at the time of checking. `git diff --check` passed. These checks are not an independent penetration test or an accessibility-conformance certification.

Use the .NET 10 SDK:

```powershell
dotnet build MarketDesk.slnx -c Release
dotnet test MarketDesk.slnx -c Release
npm ci --ignore-scripts
npm test
npx playwright install chromium webkit
npm run test:e2e
npm audit --audit-level=high
dotnet list MarketDesk.slnx package --vulnerable --include-transitive
```

The browser suite requires port 5161 to be free. It refuses to reuse another server so tests cannot accidentally use a production key or alter a real browser portfolio. Run Lighthouse separately from the test suite to reduce measurement contention. Large reports, traces and the one-time monitoring verification program remain ignored local artifacts.
