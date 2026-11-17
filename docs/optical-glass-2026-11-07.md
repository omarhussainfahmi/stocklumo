# Stocklumo optical glass — 7 November 2026

## Direction and scope

The ten owner-supplied references were reviewed for tinted translucent materials, illuminated rims, localized light, restrained reflections and compact financial layouts. The implementation adapts these principles to Stocklumo's navy, mint and mineral-white identity. It does not copy the references' artwork or introduce their purple/royal-blue branding.

- Dashboard and Markets: glass summary tiles, snapshot, research links, discovery and spotlight surfaces.
- Watchlist and News: shared glass panels and story cards; internal watchlist content stays flat.
- Stock details: price/company panels, statistics, range surfaces and existing SVG chart treatment.
- Screener, Compare, Portfolio and Earnings: shared form, table, inspector and chart materials. Nested inspector charts retain a transparent background.
- Privacy, Terms, Settings and 404: consistent shared surfaces and controls.
- Shell: matching header, ticker, research navigation and footer lighting. Existing responsive dimensions and navigation visibility remain unchanged.

Dark mode uses smoked navy with mint light and cool rim reflections. Light mode uses frosted white with mineral-blue shading and pale teal light. Financial text and series retain their existing semantic colors. Existing green top accents remain.

## Implementation

- `MarketDesk/wwwroot/css/glass.css`: approximately 5.4 KB of CSS; material tokens, shared layered paint, control highlights and fallbacks. No new package, JavaScript, image or provider request.
- `MarketDesk/Views/Shared/_SiteHead.cshtml`: versioned stylesheet loaded after shared layout/motion CSS; the homepage hero stylesheet still loads afterward.
- `DESIGN.md`: durable material direction and runtime-token ownership.
- `tests/e2e/journeys.spec.cjs`: one desktop navigation step now uses the visible footer research link. The previous step targeted the dashboard toolbar that the owner had already requested hidden.

Backdrop blur is limited to four large surface families (8px) and the header (12px) on desktop. Repeated tiles use layered paint. At widths up to 1100px and with reduced transparency, the blur is disabled. Unsupported browsers retain an opaque base. Forced-colors mode removes decorative backgrounds, shadows and blur. No blur is animated.

The owner hero videos, logo, content positions, grids, card dimensions, data contracts, financial calculations, backend, storage and disabled Technical Analysis feature are unchanged by this task.

## Verification

- JavaScript unit suite: **80 passed**.
- All-route quality matrix: **81 passed**, covering 13 routes in two themes across desktop Chromium, Android Chromium and iPhone WebKit, plus provider setup states. Checks include accessibility, contrast, overflow, titles, descriptions, script errors and failed UI assets.
- Representative screenshot pass: **16 passed** before the final specificity refinements.
- Functional journey selection: **26 passed, 1 failed** initially. The failure was an outdated desktop test attempting to click the intentionally hidden dashboard research bar. The step was corrected to use the visible footer link.
- Final checks: **27 passed** — 24 representative route/theme checks across all three profiles and the corrected navigation journey on all three profiles. Final screenshots are in `output/playwright/glass-final/`.
- Populated views, keyboard search/watchlist persistence, theme/mobile navigation, screener presets, portfolio validation/save/edit/remove, comparison validation, earnings filters, stock-chart keyboard controls and native date containment were exercised using isolated synthetic browser fixtures. These fixtures never ship as financial data.
- Browser inspection of the local preview verified desktop header blur, no phone blur/overflow at 390px, and no decorative header background/blur under forced colors. Evidence: `output/glass/fallbacks.txt`.
- Release solution build: **succeeded, 0 warnings, 0 errors**.
- Strict frontend audit: **0 findings**. Design-document lint: **0 errors**, with 10 existing orphan-token warnings.

Logs are under `output/glass/`. Visual checks are browser emulations, not a claim of testing every physical phone or measuring every device's frame rate.

## Delivery

Local preview: `http://127.0.0.1:5154/?review=glass-20261107`.

No commit, push or production deployment was performed. The existing working tree contains earlier project work; only the files listed above plus this report belong to this material pass.
