# Desloppify code-health pass — 10 November 2026

This is a local code-quality change on `codex/desloppify-code-health`. The checkout already contained substantial uncommitted product work before this pass; that work was preserved. No commit, push or production deployment was performed by this pass.

## Installation and scan scope

- Installed `desloppify[full]` 1.0 using Python 3.12.14 and installed its v7 Codex workflow at `.agents/skills/desloppify/SKILL.md`.
- Added `.desloppify/` to `.gitignore`. Reports, review packets, local configuration and the scorecard remain there.
- Excluded dependencies, build products, generated browser bundles and test artifacts: `node_modules`, both projects' `bin`/`obj`, `MarketDesk/wwwroot/js/generated`, `output`, `playwright-report`, `test-results`, `.playwright-cli`.
- Authored browser code, tooling and tests remain in scope. The seven xUnit files are classified as tests, not excluded.
- Scanned JavaScript and C# separately within the same application. Scores are language-specific, not a combined project rating.

## Implemented changes

- **Request failures:** both main request boundaries reject null, array and primitive JSON responses and distinguish malformed responses from transport outages. Screener refresh and portfolio operations release busy state in `finally` blocks. Invalid responses cannot save an unverified holding.
- **Research composition:** Razor renders either research or market workspace markup. Market/discovery initialization requires its own workspace; research initialization no longer hides dashboard sections. Research pages retain shared search, ticker and market status and no longer fetch an unused daily universe.
- **Session charts:** accepted REST/stream quotes record chronological session observations through `recordSessionQuote`. Rendering no longer mutates history. The 120-point limit is retained; an unreachable cursor branch was removed.
- **Naming follow-up:** REST quote ingestion is explicitly named `acceptRestQuote` at its definition and all three call sites.
- **Captured charts:** the optional loopback-only renderer receives a dedicated host and returns whether it handled the data. The market controller owns fallback visibility. Price/volume drawing and keyboard destinations are explicit, with candlestick/line and missing-data regression coverage.
- **Preview conversion:** numeric conversion rejects booleans, arrays, blanks and invalid strings. Minute/daily histories require finite nonnegative volume; actual zero remains valid. Missing volume cannot silently become an average-volume contribution of zero.
- **Portfolio math:** `unrealizedProfitLossHistory` states the calculated metric in its name. Prices are indexed by symbol/time and lots grouped by currency once. Shared-date, purchase-date and currency boundaries remain intact.
- **Shared contracts:** JSDoc record types and function contracts document units, null/empty outcomes, indicator warmup and invalid-period exceptions. Technical Analysis remains disabled.
- **Test synchronization:** controlled debounce timers, explicit pending-request conditions, observable-state waits and manually flushed animation frames replace fixed-delay synchronization in the reviewed test files.
- **Quality gate:** added `npm run lint`, ESLint recommended rules and a CI lint step. ESLint is development tooling only. The `minimatch` override selects the patched 11.x line; both npm and NuGet vulnerability checks are clean at verification time.
- **Dependency classification:** moved the existing, exact GSAP/Three.js pins to development dependencies because they serve the optional archived authoring workflow. The .NET production deployment and active hero video do not require a Node server.
- **Small-phone regression:** corrected the homepage headline size below 360px to preserve two lines. No broader visual redesign was made.
- **Research presentation:** extracted shared tables, pagination, financial charts and keyboard inspection into `research-view.js`, bound to an explicit results host. Four route workflows retain requests, validation, persistence and timers. Razor and direct-evaluation fixtures load the presentation module before the controller. This is a responsibility boundary, not a claim that all file-length warnings are resolved.
- **Documentation:** README distinguishes the .NET runtime, Node tests, optional authoring tools and active owner videos from earlier generated hero alternatives.

## Score interpretation

The initial JavaScript strict score was **23.8**, with all subjective dimensions unassessed. The first trusted blind review produced **90.2 strict / 95.2 objective**. That rise mostly represents completed assessment, not measured cleanup improvement.

All 15 findings from that review were implemented and resolved through the execution queue. Two subsequent naming/dependency findings were also fixed. The following mechanical scan reported **89.8 strict / 93.4 objective** before reassessment. Readable chart formatting and additional regression coverage introduced two file-length warnings; those were not hidden or shortened merely to raise the score.

The second trusted blind review and subsequent mechanical scan reported **91.3 strict / 93.4 objective**. This is a 1.1-point increase over the first assessed strict score, or 1.5 points over the scan immediately before reassessment. **23 tracked review findings have been fixed and resolved.** After the presentation extraction, the final mechanical scan reported **91.4 strict / 93.7 objective**. The remaining large-file warning for `research.js` stays open at 1,005 lines; the extraction improved ownership but did not eliminate that size signal. Six dimensions are marked stale after the final follow-up fixes; those fixes have regression tests but have not all received another independent subjective reassessment. No score was manually inflated. No structural finding was marked fixed merely because code moved.

Follow-up fixes unify accepted quote/profile hydration, clarify backup-validation guards, validate financial period/publication dates, and preserve motion choices in memory when browser storage is blocked. Hero and background controls share one motion controller instead of simulating clicks on one another. The archived hero bundle was rebuilt; owner-supplied videos and brand assets were preserved.

The C# heuristic scan is **not a reliable test-coverage measurement** for this project: namespace-based xUnit integration tests and ASP.NET MVC controller discovery are not fully mapped by the scanner. The backend's 20 subjective dimensions have not yet been assessed. Do not describe its partial score as a whole-project quality rating or add meaningless tests/imports to satisfy the heuristic.

## Files changed by this pass

| Area | Files |
| --- | --- |
| Installation and lint gate | `.gitignore`, `.agents/skills/desloppify/SKILL.md`, `eslint.config.cjs`, `package.json`, `package-lock.json`, `.github/workflows/verify.yml` |
| Research/market ownership and quote/chart handling | `MarketDesk/Views/Market/Index.cshtml`, `MarketDesk/wwwroot/js/market.js`, `MarketDesk/wwwroot/js/research.js`, `MarketDesk/wwwroot/js/research-view.js`, `MarketDesk/wwwroot/js/research-preview.js` |
| Calculations and preview validation | `MarketDesk/wwwroot/js/research-math.js`, `tools/build-research-preview.cjs` |
| Intentional storage-fallback comments | `MarketDesk/wwwroot/js/atmosphere.js`, `MarketDesk/wwwroot/js/motion.js`, `MarketDesk/wwwroot/js/site.js`, `MarketDesk/wwwroot/js/theme-init.js` |
| Small-phone wrapping fix | `MarketDesk/wwwroot/css/hero.css` |
| Backup and shared motion behavior | `MarketDesk/wwwroot/js/backups.js`, `MarketDesk/wwwroot/js/hero-video.js`, `MarketDesk/wwwroot/js/hero.js`, `frontend/hero-scene.js`, rebuilt generated hero bundle |
| Additional verification and disclosure | `tests/hero-video.test.cjs`, `playwright.preview.config.cjs`, `tests/e2e/research-preview.check.cjs`, `MarketDesk/Views/Site/Privacy.cshtml`, `MarketDesk/Views/Site/Settings.cshtml` |
| Regression tests and synchronization | `tests/browser-async.cjs`, `tests/browser-behavior.test.cjs`, `tests/chart-motion.test.cjs`, `tests/premium-research.test.cjs`, `tests/preview-chart.test.cjs`, `tests/preview-conversion.test.cjs`, `tests/research.test.cjs`, `tests/site.test.cjs`, `tests/e2e/journeys.spec.cjs` |
| Optional authoring/benchmark lint fixes | `tools/render-hero-film.cjs`, `tests/performance/premium.bench.cjs` |
| Documentation | `README.md`, this report |

Other dirty/untracked paths in the checkout predate this cleanup and are not claimed as changes made by this pass.

## Verification

- Release build: passed with zero warnings/errors after stopping the verified local preview process that held the executable open.
- .NET tests: **126 passed**, zero skipped or failed.
- JavaScript tests: **93 passed**, zero skipped or failed.
- Browser journeys: **58 passed**, two laptop-only checks skipped on phone profiles; desktop Chromium, Android Chromium and iPhone WebKit.
- Full route/theme/accessibility browser matrix: **81 passed**, zero skipped or failed, across desktop Chromium, Android Chromium and iPhone WebKit.
- Hero/background browser checks: **16 passed**, two desktop-only checks skipped on phone profiles.
- Captured-data integration checks: **24 passed**, across desktop Chromium, Android Chromium and iPhone WebKit, exercising the actual controllers with isolated local fixtures.
- `npm run lint`, `npm run check:hero`, `npm audit --audit-level=moderate`, NuGet vulnerable-package check and `git diff --check`: passed. Git emits line-ending normalization warnings for existing files.

The 93 Node tests, 126 Release backend tests 58 browser journeys and 24 captured-data checks were rerun after the final presentation extraction. The 81-check full route matrix and 16-check hero/background suite passed earlier in this pass; the extraction does not modify those unrelated surfaces.

Browser tests use isolated synthetic fixtures, never production market data. The journey suite checks research controls, watchlist/portfolio persistence, date fields, selection, search, error/retry states, themes, phone geometry and disabled Technical Analysis. Accessibility audits run at a stable viewport so a nonsticky navigation strip momentarily scrolled behind the sticky header does not create a misleading target-size result.

Privacy, Terms, Privacy & backups and Cookie settings were reviewed. Privacy and Privacy & backups now explain that motion choices apply only to the current page when browser storage is blocked. Privacy's revision date is 10 November 2026. No provider, personal-data category, storage category or consent version was added or reset; Terms and Cookie settings required no copy change.

## Tool limitations and local workaround

Desloppify's installed JavaScript launcher used `npx ... 2>/dev/null`, which fails under Windows `cmd.exe`; removing the redirect alone still leaves `.cmd` resolution unsupported by the subprocess invocation. The local installed detector command was changed to `node node_modules/eslint/bin/eslint.js ...`, retaining JSON output and the same recommended lint rules. Direct detector execution now parses a clean result. This changes execution portability, not scoring rules or findings. An upstream package update may overwrite this local workaround.

OneDrive briefly denied an atomic review-log rename. Review packets/results remain preserved under `.desloppify/subagents/runs/`; only failed slices should be retried if payload recovery cannot complete. No upstream issue or PR was posted. The automated organize stage also failed because its generated `.sh` wrapper could not execute in this PowerShell environment; the remaining planning stages were completed through the same CLI using its verified Python entry point.

A Windows character-decoding failure interrupted one reassessment batch. That batch alone was retried with `PYTHONUTF8=1` against its original immutable packet; the recovered raw result was hash-verified before importing the complete selected-dimension review. Other existing dimensions were preserved. Concurrent Playwright suites initially collided in their shared artifact directory; captured-data tests now use their own output directory, CI runs them sequentially, and all 24 were rerun successfully.

## Remaining work

File-length and test-directory organization signals remain visible. Reassess their actual ownership boundaries before further decomposition; do not split files solely to meet a threshold. C# heuristic findings require evidence-based mapping or review, not deletion of MVC entry points. No claim of 100/100, comprehensive security certification or production verification is made.

## Local review

The updated Release application is available at `http://127.0.0.1:5154/` while its local preview process remains running. The screener returns HTTP 200 and serves the new deferred presentation module before its route controller. This is a local preview, not a production deployment.
