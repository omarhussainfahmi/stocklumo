# Native blended hero — 29 October 2026

The owner authorized blending the Higgsfield design study with the latest local Stocklumo site. The result is a native homepage refinement using the existing Three.js/GSAP foundation. It is authored geometry, not Higgsfield-generated media. Local preview: http://127.0.0.1:5153/.

## Delivered behavior

- Above 1100px, headline, description, search and actions share a left edge within 62% of the hero. The original dimensional ribbon has the right 38%; the two-line headline uses `clamp(52px, 5vw, 96px)`.
- Three fine mint paths and three small points frame the original ribbon. These contain no prices, candles, market readings or other implied financial data.
- `frontend/hero-story.js` centralizes focus / gather / research. Desktop transitions occur at normalized native-scroll progress .22 and .72; compact transitions at .30 and .75. Forward and reverse scrolling select the same poses.
- The single entry lasts 1.2 seconds. Subsequent rendering responds to pointer, native scrolling, resize and theme changes; there is no idle render loop, pin, spacer or extra story height.
- Tablet and phone layouts keep the existing centered copy and subdued overlapping original ribbon. Both themes retain the original SVG face colors through `MeshBasicMaterial` with `toneMapped: false`: light `#00cfa0` / `#104976`, dark `#00dbaa` / `#f4f7fb`. Lighting remains on bevels and sides.
- At widths up to 360px, header gaps, brand text/image and control padding tighten to prevent brand/theme-button collision. Controls retain their existing 44px height.

## Reliability and boundaries

The existing reduced-motion, saved-pause and Save-Data initial guards remain: visitors can use the original static SVG without initially downloading the scene. Existing visibility/offscreen pause, graphics-failure/context-loss fallback and cleanup of listeners, observers, GSAP activity and GPU resources are retained. The decorative canvas remains hidden from assistive technology and pointer-transparent. Search and actions remain ordinary HTML.

No new dependency was added. Existing feature-page grids, routes, ASP.NET backend, market integrations, real-data behavior and financial calculations are unchanged by this follow-up. No fabricated financial imagery or data was introduced. This is a homepage blend with a narrow-phone header fix, not an all-pages redesign. Earlier study files are retained.

Actual Higgsfield production remains blocked: the connected account reported Free / 10 credits, image generation required Basic or higher, and the six-second video received a 42-credit price-only quote. No video was submitted and no generated asset exists. The native implementation does not resolve or stand in for that media dependency.

## Files changed for this follow-up

- `frontend/hero-story.js`: authored path geometry, entry timing and shared chapter interpolation.
- `frontend/hero-scene.js`: paths/points and chapter-driven poses using the existing scene lifecycle.
- `MarketDesk/wwwroot/css/hero.css`: desktop 62% / 38% composition; retained compact overlays.
- `MarketDesk/wwwroot/css/observatory.css`: narrow-phone header spacing rule at the top of the file.
- `MarketDesk/wwwroot/js/generated/hero-scene.js`: rebuilt browser module; existing notices/licensing retained.
- `tests/hero-story.test.cjs`, `tests/e2e/hero.spec.cjs`: chapter continuity, bounds and native-scroll regression coverage.
- `PRODUCT.md`, `DESIGN.md`, this record: current product/design truth and implementation evidence.

Maintain timing and geometry in `frontend/hero-story.js`, scene behavior in `frontend/hero-scene.js`, desktop composition in `hero.css`, and the narrow-header rule in `observatory.css`. Regenerate the bundle after source edits rather than editing generated code.

```powershell
npm run build:hero
npm run check:hero
npm test
npm run test:e2e -- tests/e2e/hero.spec.cjs tests/e2e/hero-colors.spec.cjs tests/e2e/proportions.spec.cjs
dotnet build MarketDesk -c Release -o output/blended-hero/server
dotnet publish MarketDesk -c Release -o output/blended-hero/publish
```

## Verification and evidence

- Frontend unit suite: **65 passed**, including two new story tests for continuity/reversal and invalid/out-of-range progress.
- Focused browser suite: **24 passed** across desktop Chromium, Pixel 7 Chromium and iPhone 13 WebKit. Coverage includes actual rendered logo colors, both themes, Axe checks, search, forward/reverse chapters, ordinary page height/no pinning, reduced-motion initialization, graphics failure/context loss, non-home avoidance of the 3D bundle and existing content proportions.
- Release build: **zero warnings and errors**. Release publish passed. `npm run check:hero` verified generated/source consistency. The mechanical design detector returned `[]`.
- Twelve CUA captures cover light/dark at 1440×900, 1280×720, 768×1024, 390×844, 320×720 and 844×390. `output/blended-hero/responsive.json` records no horizontal overflow or header collision and 44px theme controls at every captured size. Captures are `output/blended-hero/hero-*.png`.
- Native PageDown reached research at scroll position 714; PageUp returned to focus at 0. The inspected browser console reported no errors.
- Fresh finish review found only documentation persistence outstanding; the subsequent review resolved that finding and recorded a ship disposition for persistence.

Build, publish, unit and browser logs are in `output/blended-hero/`. Browser-test financial responses are isolated synthetic fixtures, not shipped site data. Screenshots and browser emulation are visual/behavioral evidence; they do not establish physical-phone GPU performance.

The generated module is **730,950 bytes raw**, **205,745 bytes with local gzip**, and **171,887 bytes with local Brotli**. Raw growth is **6,006 bytes** over the previous 724,944-byte corrected bundle. Compression figures come from local compression, not measured server responses. No FPS or universal loading-time claim is made.

At the tested short landscape height of 390px, actions sit below the first viewport and remain accessible by ordinary scrolling. The implementation preserves the existing height behavior; it does not promise every action above the fold at every size.

All work remains local. No push or deployment occurred.
