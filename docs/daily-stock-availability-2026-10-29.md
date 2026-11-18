# Available daily stocks — 29 October 2026

The daily spotlight and its Market Snapshot now include only candidates with a matching successful company profile and a successful quote containing a positive price, positive previous close, and valid non-future timestamp. Missing profiles, missing/zero quotes, unsupported comparison values and invalid timestamps are skipped before a card or snapshot row is displayed. Closed-market or delayed quotes retain their honest timestamps and freshness labels; availability does not mean live data.

The universe response retains its original eight-symbol `selection` and adds `candidates`: up to sixteen provider-listed eligible stocks in the same deterministic daily order. This supplies at most eight reserves without querying the entire market or manufacturing prices. Both lists derive from the same cached, filtered US common-stock metadata. The reserve list rotates on the UTC date and is stable across server restarts.

The frontend stops accepting candidates after eight available stocks. It does not fetch unused reserves after reaching eight, except independently required symbols in the fixed top ticker. Requests shared by a candidate and top-ticker symbol are deduplicated in the same pass. The fixed top ticker remains Apple, Microsoft, Amazon, Alphabet, Meta, Tesla, Visa and Nvidia.

Reloads revalidate availability. An incomplete selection retries through the existing five-minute cooldown, and a page left open refreshes its pool after the UTC day changes. If the bounded pool cannot provide eight quotes, show fewer; if none qualify, show a compact unavailable message. No unavailable cards are used to fill empty slots. Provider outages or API limits cannot be solved by guaranteeing eight prices.

Files: `MarketDesk/Services/StockUniverse.cs`, `MarketDesk/wwwroot/js/market.js`, `MarketDesk.Tests/UniverseTests.cs`, `tests/browser-behavior.test.cjs`, `tests/e2e/daily-availability.spec.cjs`.

Verification:

- Release build: passed, zero warnings/errors.
- Frontend unit suite: 63 passed, including failed-profile/quote replacement, unused-reserve request avoidance, recovery after cooldown, UTC-day rotation, and fixed-ticker separation.
- Backend suite: 126 passed, including bounded/stable reserves, preservation of the original eight-symbol prefix, shared metadata cache and provider filtering.
- Focused browser suite: 28 passed, two desktop-only cases skipped on phones. Covers reload replacement, future/zero-quote rejection, matching snapshot/spotlight symbols and unchanged fixed ticker on desktop Chromium, Android Chromium and iPhone WebKit; also reruns chart, logo, content-proportion and atmosphere regressions.
- Logs: `output/daily-availability/`. Browser market responses are synthetic and isolated to tests. Local preview uses the actual configured Finnhub integration.

No CSS, layout, branding, portfolio calculation or unrelated API behavior changed. The only response addition is the bounded metadata candidate list. No deployment, commit or push performed for this pass.
