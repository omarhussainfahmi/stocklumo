# Stocklumo premium product upgrade — specification and review

## Evidence and baseline

The attached current brief, PRODUCT.md, DESIGN.md, actual Razor/JavaScript/CSS and controllers are authoritative. The application is ASP.NET Core 10 MVC, vanilla JavaScript, server-only Finnhub REST/WebSocket, browser-local lists/practice positions and native SVG financial charts. Three.js/GSAP is confined to the existing homepage scene. No framework migration or new chart library is justified.

Baseline on 30 October: Release build 0 warnings/errors; 126 .NET tests, 67 Node tests; unchanged hero bundle 732,376 bytes; production dependency audit 0 vulnerabilities. Fifty-four manual route captures cover nine main pages in both themes, but the browser override applied to the other open tab: their measured size is 1280 × 720 throughout. Their size-bearing filenames are not responsive evidence. `ui-inventory-before.json` retains the actual dimensions; the separate 18 benchmark captures use real desktop/Android/WebKit test profiles. The final test-runner matrix must measure and assert each requested width. Data may be loading, rate-limited or unavailable in real-provider captures; fixture captures separately exercise populated states. Production was inspected as a separate, older deployed version; local changes must not be described as live.

## Design consultation — alternatives and decision

| Direction | Benefit | Tradeoff | Decision |
| --- | --- | --- | --- |
| A: Precision Trading Terminal | Highest density and comparison speed | A wholesale terminal grid/monospace treatment would contradict approved mobile/hero widths and increase change risk | Use disciplined table alignment and concise state feedback only |
| B: Contemporary Fintech Research Desk | Familiar navigation, readable forms, clear metric hierarchy | Can become generic without a product-specific visual signature | Primary application direction |
| C: Stocklumo Signature Identity | Existing ribbon, exact mint/navy/white palettes and restrained native motion identify this product | Decorative motion must stay subordinate to analysis | Retain the approved signature and all current scene geometry |

Select B with C's incumbent identity and A's analytical discipline. Manrope remains the self-hosted reading/data face; the original wordmark remains unchanged. Spend the visual signature in the existing native ribbon, not more graphs or invented statistics. Keep all approved hero, feature-content widths and card grids; strengthen the reusable interaction layer, readable utility text, quiet table focus and active-criterion presentation.

UI UX Pro Max's first design-system search returned a marketing Feature-Rich Showcase, Fira typography and a replacement slate palette; these do not fit the maintained product contract and are not adopted or persisted as a MASTER. A single explicit product-domain retry returned Financial Dashboard as the top match: data density, accessible states and financial color semantics are applicable. Existing canonical tokens and actual business data win over generic recommendations. There is no ASP.NET stack dataset; do not falsely claim React/Tailwind guidance was used.

## Canonical ownership and engineering review

`UX-CONTRACT.md` resolves applicable UI owners before migration. `market.css` owns runtime tokens, `observatory.css` composition, `site.js` clearable-input and search-placement behavior, `market.js` remote search/watchlist/data presentation, `research.js` research fields/validation/table helpers and workflows. Native date/select popups remain an explicit accepted platform variant. New behavior extends those owners; no screen-specific library.

Confirmed defects reproduced before changes: portfolio edit state can duplicate a holding after another lot is removed; Cancel edit can race a pending save; earnings invalid dates reach the provider request instead of field errors; keyboard chart inspection can discard focus. Additional consistency gaps: remote search lacks composition/clear behavior; screener matching status and applied filters are hard to discover; watchlist action rerenders drop focus; generated research tables lack distinct names.

Scope/freeze: UI views, CSS/JS, supporting tests, benchmark configuration and product design documents only. Preserve all unrelated uncommitted work, APIs, provider caps, stored data shapes, portfolio math, preview gates and disabled Technical Analysis. No package additions, deployment, commit, push, merge or infrastructure changes. The initial unconfigured static audit flagged an actionless button in the unserved `design/higgsfield` study; the maintained manifest explicitly scopes the real shipped application, while retaining that baseline finding as historical prototype evidence.

## Acceptance and verification

1. Clear search is immediate and IME-safe; dismissed/cleared/stale responses cannot reopen results.
2. Filter chips/counts/table/chart use the same filtered collection; reset and preset restoration agree.
3. Field errors identify and focus the failing input; earnings bounds match the existing server exactly and prevent invalid requests.
4. Pending portfolio operations cannot be retargeted; edit/remove preserves the intended lot and financial math.
5. Keyboard action focus survives watchlist/chart rerenders. Generated tables have meaningful names.
6. Both themes retain brand, layouts, accessible contrast, 44px important controls and visible focus; no page overflow at the requested widths. Tables retain their own horizontal scrolling.
7. Run strict Premium audit, DESIGN.md lint, token drift verification, complete build/.NET/Node/browser suites and axe scans. Exercise loading, populated, missing, stale, empty, rate-limited, storage-error and slow-response states using isolated labeled test fixtures only.
8. Compare raw baseline/final local lab samples with the same loopback server, fixtures, browser projects, fresh contexts, no CPU/network throttle and 1200ms quiet sampling window. Samples are lab observations, not field p75 CWV, provider speed or a universal sub-two-second promise. INP is not inferred from synthetic clicks.
9. Run gstack portable design/code/security/health/ship reviews against actual source and captured results; identify untested physical-device and field-performance limits. The native gstack browser/runtime is not claimed.

Logs and captures live under `output/premium-upgrade/`. The final implementation report records exact changes and results, rather than treating this specification as completed verification.
