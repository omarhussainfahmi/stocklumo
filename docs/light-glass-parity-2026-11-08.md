# Light-mode glass parity — 8 November 2026

## Scope

The owner likes the current dark mode and requested the same glass material language for all light-mode cards, top bars and footer. This change preserves dark mode and existing component dimensions, content, charts, navigation, search, storage, financial semantics and backend behavior.

## Changes

- `wwwroot/css/glass.css`: light-only defaults use more translucent mineral-white/mint fills (about 72–84% paint alpha), slightly stronger cool/teal edge lighting and restrained elevation. The snapshot retains its lighter local variant. All shared card families inherit this material, including the previously corrected discovery, leading-news, watchlist and stock-context variants.
- Light header, ticker, research toolbar and footer use one matching frosted shell treatment, with mineral/mint gradients and top/bottom rim lighting. They no longer rely on a flat opaque white base. The sticky header has a denser translucent base for readability over scrolling content. Existing desktop header blur and mobile no-blur behavior are preserved.
- Light portfolio totals, pagination and recent-stock chips receive the same material. Portfolio total cells stay flat with separators; the light stock-price plot no longer paints a solid white interior over its panel. These extra variants are explicitly light-only.
- Reduced-transparency preferences restore solid shell bases. Forced colors removes decorative shell paint/shadows. Search geometry and motion, native controls, financial positive/negative colors and readable popup surfaces are unchanged.
- `DESIGN.md`: records the light material refinement and dark-mode preservation requirement.

No production JavaScript, package, API, asset, Razor or backend change. No additional animated layer or per-card blur was introduced. The search motion test now explicitly scrolls the field into view before expecting motion, matching the existing offscreen-pause contract.

## Verification

Dark-mode computed background, border, text, shadow and blur styles were captured before and after. The eight components available in both captures — header, ticker, research toolbar, footer, snapshot, summary tiles, research cards and discovery tiles — are **identical**, with no changed material styles (`output/light-glass/dark-verification.json`). Spotlight had not populated in the initial capture and is excluded from this comparison. Every edited default material token has an unchanged explicit dark override; shell and extra component changes are explicitly light-only.

Local screenshots of the light shell, snapshot and footer were reviewed, along with the populated comparison view. Test output is in `output/light-glass/browser.txt`; the run covers all routes, both themes, desktop Chromium, Android Chromium and iPhone WebKit, accessibility, overflow, populated data states, watchlist framing and search/motion interactions. Browser fixtures remain isolated synthetic data, never application/provider data.

Actual broad-run result: **101 passed, 1 failed**. The iPhone search-motion check expected a running rim after navigation had left the page scrolled to the footer. The production rim was correctly paused offscreen. The test now scrolls the search into view before checking visible motion; production search code was not changed. After the final portfolio/pagination/plot refinements and that test correction, **9 targeted checks passed** across all three profiles (`output/light-glass/final-checks.txt`, 2.6 minutes). These recheck populated News/Watchlist/Portfolio/Compare/Earnings in both themes, light stock-detail accessibility/overflow, and search geometry, motion, clear and keyboard selection. The full 102-check matrix was not repeated after that correction.

Strict frontend audit: **0 findings**. Design-document lint: **0 errors**, with 10 existing orphan-token warnings. This is a CSS/documentation change; no new application build or backend test result is claimed.

Preview: `http://127.0.0.1:5154/?review=light-glass-parity`. No commit, push or production deployment performed.
