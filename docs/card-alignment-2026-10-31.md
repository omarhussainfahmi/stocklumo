# Card alignment and flat watchlist content — 31 October 2026

- The populated desktop home snapshot and right-hand research stack share one grid-row height and one bottom edge. Chart rows and the four-card grid absorb the height difference; no fixed height or empty bottom spacer was added. Tablet/phone stacking and the no-quotes fallback remain intact.
- Market and company news cards stretch within each content-driven row. Rows resize when article count or length changes, rather than retaining fixed card heights. Existing headlines/excerpts use the full card width; the three-line CSS excerpt clamp was removed, while the existing 500-character application excerpt limit and safe external links remain unchanged. Title-only articles do not reserve an absent summary's margin.
- The shared empty watchlist has no inner background, border, corner treatment, shadow or padding. The outer panel, heading, description, Explore stocks action and persistence note remain. This applies to home, Watchlist and stock details.

Application change: `MarketDesk/wwwroot/css/observatory.css` only. Design memory: `DESIGN.md`. Regression coverage: `tests/e2e/card-alignment.spec.cjs`, `home-refinements.spec.cjs`, `proportions.spec.cjs`.

Verification evidence is in `output/card-alignment/`: Release build (zero warnings/errors), 73 JavaScript tests, and the 12-case targeted browser run passed. Browser checks cover light/dark themes, desktop/phone viewports, aligned snapshot/stack edges, market/company news batches of 1/2/5/8 articles, full excerpts, no horizontal overflow and retained watchlist navigation. A final news-only run adds title-only article coverage. Test articles and prices are isolated synthetic fixtures, not production data.

The final news-only run passed all three browser profiles, including title-only articles. No backend, data polling, dependencies, routes, logo or deployment changes. Equal row endings can leave breathing room under a shorter peer; no filler content or fabricated news was introduced to occupy it.
