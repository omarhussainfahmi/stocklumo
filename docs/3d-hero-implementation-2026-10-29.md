# Original Stocklumo 3D hero — 29 October 2026

## Color correction follow-up

The owner identified washed-out green and overly bright navy faces. The face material now uses MeshBasicMaterial with tone mapping disabled, retaining the exact original sRGB SVG colors. Physical lighting remains on the bevel and extrusion to preserve the dimensional appearance. Light fills: `#00cfa0` and `#104976`; dark fills: `#00dbaa` and `#f4f7fb`. Logo geometry, layout and motion are unchanged. Source and generated bundle were rebuilt and verified; publish passed.

Added a browser regression that reads actual rendered framebuffer pixels immediately after draws and matches both face colors to the SVG palette within one RGB unit. All 15 color/hero cases passed across desktop Chromium, Android Chromium and iPhone WebKit, covering both themes, search, motion preferences, graphics failure and context loss. Evidence: `output/hero-colors/browser.txt`, `publish.txt`, `dark.png` and `light.png`. This follow-up is local only, not deployed. Earlier bundle-size measurements below describe the initial hero build; the corrected bundle is 724,944 bytes uncompressed.

## Delivered locally

Homepage-only dimensional ribbon, constructed with SVGLoader/ExtrudeGeometry from the exact two paths in the original Stocklumo mark. Header logo, wordmark and SVG source files are unchanged. The original dark/light variants supply the material colors. Shallow bevels, enamel-like faces, reflective edges and locally generated room lighting provide depth without downloaded models, generated videos or MotionSites assets.

On desktop the search/headline group is centered within the left portion of the existing hero, giving the ribbon a separate clear stage to the right. This deliberately keeps the 3D object out of the text rather than covering it. The hero keeps its existing height behavior. Tablets and phones retain the compact centered layout with a quieter background mark. No feature-page grid or content-size changes were made.

GSAP coordinates a single 1.2-second settling turn/part separation, restrained fine-pointer tilt, return on pointer exit, and a small rotation/scale change as the hero naturally scrolls away. No continuous idle animation, scroll pinning, spacer sections, fake financial graphics, sound or custom cursor. Financial values and controls do not move for decoration.

## Reliability and integration

- Original static SVG appears before the scene is ready and remains available if imports, WebGL or asset loading fail. Graphics-context loss disposes the scene and restores the SVG.
- Reduced motion, an existing paused-motion preference, or Save-Data avoids the initial scene download. Re-enabling motion while visible can initialize the scene.
- The existing background-motion setting controls both the field and the hero. Entry/pointer/scroll activity pauses offscreen, when hidden or when the visitor pauses motion; cleanup removes observers, handlers, GSAP activity and GPU resources.
- Renderer draws on animation/input/resize/theme changes, not a perpetual render loop. Pixel ratio capped at 1.5 desktop / 1 phone. Two low-complexity logo parts, no bloom or shadow passes.
- Search, autocomplete, CTAs, original navigation, privacy choices, live data, daily available-only selection and the separate fixed ticker remain intact.
- Strict CSP is unchanged. All browser code and logo assets are self-hosted. The scene is loaded only from the homepage through a small deferred bootstrap, after load/idle and visibility checks. Content remains usable independently.

## Build and publishing

`frontend/hero-scene.js` is the maintained scene source. `tools/build-hero.cjs` uses esbuild 0.28.2 to generate the checked-in browser bundle under `MarketDesk/wwwroot/js/generated/`. `npm run build:hero` regenerates it; `npm run check:hero` checks it and the bundled notices against source and installed dependencies. CI now runs that check after npm ci.

Three.js 0.186.1 and GSAP 3.15.0 are pinned. ScrollTrigger ships with GSAP. The generated module, legal comments and `LICENSES.txt` are included in the existing .NET publish/static-file pipeline; the Docker runtime needs no Node installation or new service. Asset hashes are added by ASP.NET's file-version provider so updated generated assets invalidate browser caches.

Bundle: 724,950 bytes uncompressed, 204,075 bytes with local gzip compression and 170,467 bytes with local Brotli compression. The existing server's compression settings produced a 261,737-byte response in a local Brotli-requested download. These are size measurements, not a promise of field loading time or FPS. No universal 60fps or sub-two-second claim is made.

## Files for this implementation

- `frontend/hero-scene.js`, `MarketDesk/wwwroot/js/hero.js`, `MarketDesk/wwwroot/css/hero.css`.
- Generated `MarketDesk/wwwroot/js/generated/hero-scene.js`, its `.LEGAL.txt` notices and `LICENSES.txt`.
- `MarketDesk/wwwroot/js/atmosphere.js`: shared motion-setting notification.
- `MarketDesk/Views/Market/Index.cshtml`: decorative fallback markup, homepage only.
- `MarketDesk/Views/Shared/_SiteHead.cshtml`: conditional stylesheet/bootstrap and versioned module URL.
- `tools/build-hero.cjs`, package manifests and `.github/workflows/verify.yml`: reproducible bundle build/check.
- `tests/e2e/hero.spec.cjs`, this report and `DESIGN.md`.

No backend business logic, data contract, secret, account, market integration or portfolio calculation changes are part of this implementation. No commit, push or deployment performed.

## Verification evidence

Logs and captures: `output/3d-hero/`. Browser financial responses are isolated synthetic fixtures. The visible local preview uses actual configured Finnhub responses and their actual timestamps.

Release build and publish passed. Published output contains the hero stylesheet and generated module. All 63 frontend unit tests passed. The source design detector returned no findings. Initial existing journey/atmosphere suite passed 62 tests with four desktop-only skips on phones. Dedicated hero tests exposed an incorrect test assumption that the existing mobile hero was 500px tall; the app already used an automatic mobile height, so the assertion was corrected to preserve that behavior. The first visual prototype also exposed canvas overflow; the final scene is bounded inside the hero and later browser checks cover horizontal containment.

Final normal browser suite: **188 passed, four skipped**, from 192 collected cases (`browser-final.txt`). The four skips are existing desktop-only tests on phones. This includes all twelve new hero cases across desktop Chromium, Android Chromium and iPhone WebKit: functional search and theme switching, original mark assets, horizontal containment, no scroll pinning, accessibility checks, graphics-context-loss fallback, initial graphics failure, reduced-motion avoidance of the module, re-enabling/pause/resume behavior and no hero requests from other routes. Existing daily availability, screener, comparison, portfolio, earnings, privacy, charts, navigation and research-shell cases also passed.

All 78 route/theme/device captures from the final suite are retained in `output/3d-hero/routes/`. Final actual-data local preview proofs: `desktop-dark.png`, `desktop-light.png`, `phone-light.png`. Six hero-specific browser-fixture screenshots are retained in `output/3d-hero/hero-captures/`.

`npm run check:hero` verified that source and generated assets match. Release publishing was repeated after the final stylesheet refinement. No backend unit suite was rerun for this frontend-only change; the immediately preceding availability task had 126 backend tests passing. Physical low-end phone GPU performance remains a real-device verification task; browser emulation does not establish it.
