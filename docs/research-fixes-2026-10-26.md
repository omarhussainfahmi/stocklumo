# Screener and comparison corrections — 26 October 2026

## Findings and changes

The screener's ranking disclosure carried a trailing 16px margin inside its grid column. Its sticky inspector was anchored only to the top, so its lower edge could differ from the ranking panel at the end of a scroll. Removed that scoped trailing margin and bottom-aligned the sticky inspector within the existing grid, with top/bottom viewport constraints. This does not stretch the inspector into an empty full-column card or change its data and selection controls. Mobile retains its stacked layout.

Production AAPL history requests for both 1M and 6M returned state `unavailable`, message `This information is unavailable under the current Finnhub access.`, and no data. The existing comparison fallback displayed current day changes and fundamentals regardless of range. Those figures are latest snapshots, not historical returns; changing the requested history cannot change them into range-based returns.

Comparison now defaults to Latest snapshot and makes no historical requests in that mode. A selected historical range automatically reloads an existing comparison; successful charts identify the range and retain normalized closing-price values. The interface explains that snapshot metrics always use latest quotes. Verified provider-access denial resets the selector to Latest snapshot, disables the historical options for that page session and offers Retry history. A rejected first symbol stops redundant history calls for the remaining symbols. Temporary errors and insufficient shared dates are distinguished from access denial. A retry rechecks access without permanently persisting a provider capability assumption.

No new provider, paid service, fabricated history, portfolio calculation change, backend API contract change or Technical Analysis feature was introduced.

## Verification

Targeted regression checks cover both themes, 1920px and 1280px desktop grids, Android Chromium and iPhone WebKit stacking, range-specific requests/rendered historical values, unavailable history and recovery. The desktop test asserts the ranking and inspector bottom edges differ by at most 2px. Local screenshots were inspected; fixture prices remain test-only.

Final full-suite and deployment results are recorded after they complete. Provider entitlement remains an external limitation; the interface correction is not a claim that historical access was enabled.

Release build succeeded with zero warnings/errors; 116 backend tests and 59 frontend tests passed. The 135-check browser run passed 132; three existing comparison checks still expected the old unavailable wording. After updating those assertions to the new message and explicitly asserting no historical chart, all three passed on rerun (desktop Chromium, Android Chromium and iPhone WebKit). All nine new research checks also passed. The only mechanical design advisory concerns the existing, unchanged homepage grid background. No physical-device certification is claimed.

