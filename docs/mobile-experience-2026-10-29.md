# Stocklumo responsive mobile experience

Finalized 30 October 2026. The filename retains 29 October, when this work began and its documentation links were established.

The mobile opening is an extension of the existing ASP.NET Core MVC/Razor website. Desktop and mobile share routes, content, market integrations, original logos, Three.js/GSAP dependencies and business logic. This preserves the incumbent Market Observatory design; it does not establish a new visual world. The primary action remains **Explore markets** at `/markets`, with **Your watchlist** at `/watchlist` and the existing stock search.

Working local preview: [Stocklumo](http://127.0.0.1:5153/). This is a local preview, not a production deployment.

## Implementation and rationale

| Files | Result and purpose |
| --- | --- |
| [hero.css](../MarketDesk/wwwroot/css/hero.css), [observatory.css](../MarketDesk/wwwroot/css/observatory.css) | Compact copy flows above a reserved, separate logo stage, rather than overlapping it. The stage is at most 340 CSS pixels wide and `clamp(170px, 28svh, 260px)` high. Desktop retains its 62% copy / 38% visual composition. Short landscape receives a left-aligned opening and smaller headline without shrinking the reading copy. |
| [market.css](../MarketDesk/wwwroot/css/market.css), [site.js](../MarketDesk/wwwroot/js/site.js) | Persistent sticky navigation, short-landscape disclosure, viewport-aware suggestions and a home-only fixed market shortcut maintain access to the working app. The shortcut yields while the actual primary action is visible, a form control has focus, or navigation is open. Compact menu geometry is established in CSS before deferred scripts run to prevent header movement. |
| [Index.cshtml](../MarketDesk/Views/Market/Index.cshtml), [_SiteHead.cshtml](../MarketDesk/Views/Shared/_SiteHead.cshtml), [_StockSearch.cshtml](../MarketDesk/Views/Shared/_StockSearch.cshtml) | Original SVG fallback dimensions, an ordinary “Skip animation” anchor, focusable market-content destination, `viewport-fit=cover`, and mobile search input hints preserve usable HTML before animation starts. Essential copy and actions remain HTML. |
| [hero.js](../MarketDesk/wwwroot/js/hero.js) | Defers the scene until idle and in view; skips immediately; rejects obsolete async initialization; retains the still when animation is unavailable. |
| [hero-story.js](../frontend/hero-story.js), [hero-scene.js](../frontend/hero-scene.js), [generated bundle](../MarketDesk/wwwroot/js/generated/hero-scene.js) | Centralize compact pacing and renderer limits, contain the original dimensional logo, preserve a corresponding beat during meaningful layout changes and release graphics resources on teardown. The checked-in bundle is rebuilt from these sources. |
| [mobile-story.spec.cjs](../tests/e2e/mobile-story.spec.cjs) | Exercises responsive composition, primary-action access, skip races, disclosure focus, search popup containment, anchors/history, no-JavaScript, Save-Data, enlarged text and sampled framebuffer containment using isolated fixtures. |

The shared header remains outside the story and visible beyond it. Its brand stays left and the menu trigger right, with at least 44-pixel interaction targets, visible focus and a contrasting surface. The menu is a disclosure containing normal navigation links, not an ARIA application menu or modal: it does not trap focus or make the page inert. Opening focuses the first link; Escape closes and returns focus to the trigger. The same trigger becomes “Close menu”; link selection, outside pointer interaction and focus leaving the header also close it. Without JavaScript, navigation links remain visible.

Safe-area padding is applied once to the occupied header; anchor offsets use the measured header height plus spacing, rather than adding its top inset again. Bottom-action padding and reserved page space account for the bottom inset. Stable `svh` sizes the visual stage; `dvh` bounds the open navigation. Search uses `visualViewport` where available to choose available space above or below its input, and reveals a focused input after a meaningful viewport change. Emulated viewport resizing is evidence for this logic, not a physical-keyboard test.

Skipping stops the current attempt, aborts its controller, advances an attempt epoch and disposes an existing scene before focusing and scrolling to **Market overview**. It never awaits the module or SVGs. Delayed results cannot create a stale canvas. New scene loading resumes only after leaving and returning to the story. Dynamic-import bytes already transferred cannot be recalled; the guarantee is to stop new scheduling and reject stale work. Direct content anchors and history navigation preserve access to content.

Initial reduced-motion, saved pause and Save-Data preferences retain the original still without requesting the heavy scene module. Preference changes are observed; a mounted scene pauses for reduced motion. The one-time entry settles into render-on-demand scrolling/pointer updates, with no infinite idle rotation, pinned spacer, intercepted wheel/touch input or disabled pinch zoom. Hidden tabs and offscreen stages stop unnecessary redraws. Page teardown aborts initialization and disposes geometry, materials, environment texture, renderer, canvas, timeline, trigger, observers and scene listeners. A failed import is not retried indefinitely; graphics failure/context loss retains the still and actions. The existing app-level shared listeners live with the page.

## Selection and adjustable story configuration

The single story-layout selection boundary is CSS **at or below 1100px**. The renderer reads the computed `--hero-layout` on the visual host; it does not duplicate device-name detection. Tablet and landscape-phone layouts therefore select compact geometry automatically. This is one responsive website and one cached native scene module, with different camera/layout parameters, not separate mobile and desktop video sequences. Both original theme SVGs are retained and may be requested; there is no claim that only one theme mark downloads.

| Beat | Compact progress | Desktop progress | Native motion and visible content | Compact target composition |
| --- | --- | --- | --- | --- |
| Focus | 0–0.30 | 0–0.22 | Brief entry settles the exact original dimensional ribbon; existing headline, description, search and real actions remain ordinary HTML. | Focal point `(0.5, 0.5)`; safe envelope `(0.08, 0.08, 0.92, 0.92)` |
| Gather | 0.30–0.75 | 0.22–0.72 | Three sparse paths and points gather around the ribbon with a small pose change; copy does not depend on a frame or chapter. | Same focal point and envelope |
| Research | 0.75–1 | 0.72–1 | Paths recede and ribbon shifts modestly; ordinary scrolling exposes the real market overview. | Same focal point and envelope |

These normalized focal/envelope values are **design configuration**, relative to the compact visual stage after header/copy layout. They are not measured GPU subject boxes for every beat. There are no sampled image/video frames, frame ranges, source frame rate or animation-only copy swaps. The compact scroll mapping covers **2.6 stage heights**: from 2.4 stage heights before the stage top to 0.2 after it. It adds no page height. At the configured stage limits this is 442–676 CSS pixels. Entry duration is 1.2 seconds with a 0.5-second pointer settle and `power3.out` easing. No extra chapter hold is added.

Compact renderer pixel ratio is capped at **1**; desktop at **1.5**. Compact camera distance is `max(182, 130 / aspect)` and compact path-field scale is **0.84**. Meaningful host geometry changes refresh scroll measurements and map the previous beat/phase into the new layout; toolbar movement is not used as a repeated story reset.

Actual framebuffer samples are recorded in [desktop Chromium](../output/mobile-story/media-desktop-chromium.json), [Android Chromium emulation](../output/mobile-story/media-android-chromium.json) and [iPhone WebKit emulation](../output/mobile-story/media-iphone-webkit.json). Each records **two sampled compositions**, not measurements of every beat. The pixel scan samples every second pixel with alpha at least 254; its normalized boxes use **WebGL bottom-origin y**, not DOM top-origin y.

| Sample viewport | Backing store | Observed normalized box across the three browser projects |
| --- | --- | --- |
| 390 × 844 | 340 × 236 | x-min 0.3235–0.3294; y-min 0.1780–0.1864; x-max 0.6765; y-max 0.8559 |
| 844 × 390 | 340 × 170 | `(0.3765, 0.1765, 0.6235, 0.8471)` |

## Assets and performance evidence

The animation is authored native geometry from the original SVG paths, not Higgsfield-generated media. Higgsfield generation remains unavailable under the previously documented account dependency. No subscription, new dependency, commit, push or production deployment was performed for this follow-up.

Resource Timing logs above were captured on the local server in fresh browser contexts, without CPU or network throttling, using desktop Chromium and Android/iPhone browser emulation. Viewport changes reused one scene-module request. Duplicate resource entries are retained in the logs; these values are per entry and are not a unique-resource total or total-page transfer claim.

| Resource | Source / decoded body | Encoded body | Recorded transfer including overhead |
| --- | --- | --- | --- |
| Original light SVG still | 369 bytes | 280 bytes | 580 bytes |
| Original dark SVG still | 369 bytes | 281 bytes | 581 bytes |
| Complete native scene bundle | 732,376 bytes | 264,526 bytes | 264,826 bytes |

The scene transfer is deferred until initialization is allowed and the stage is in view; it is not guaranteed to occur in every opening viewport. No video/image sequence exists, so complete sequence size and decoded-frame cache are **not applicable / zero decoded frames**, respectively. At four bytes per backing-store pixel, one color buffer is approximately **320,960 bytes (0.306 MiB)** for 340 × 236 and **231,200 bytes (0.220 MiB)** for 340 × 170. These are arithmetic color-buffer estimates only, not measured GPU memory; they exclude depth, MSAA, textures, environment maps, geometry and browser overhead.

No field Core Web Vitals were measured. These checks establish no LCP, INP or CLS field pass. The deferred-script geometry regression test is an element-position assertion, not a CLS measurement. Local browser test durations are not loading benchmarks.

## Validation and review

| Status | Evidence and interpretation |
| --- | --- |
| Passed | [Unit log](../output/mobile-story/unit-final.txt): 67 passed, zero failed. [Bundle check](../output/mobile-story/bundle-final.txt): generated output verified at 732,376 bytes. [Release build](../output/mobile-story/build-final.txt): zero warnings/errors. [Local publish](../output/mobile-story/publish-final.txt) succeeded; [asset comparison](../output/mobile-story/publish-assets.json) matched all nine checked published assets. Publishing to a local folder did not deploy the website. |
| Failed, then fixed and retested | The earlier [225-case full browser run](../output/mobile-story/browser-final.txt) finished with 219 passed, four skipped and two failed deferred-navigation layout checks. CSS now establishes the compact header before scripts; [final retest](../output/mobile-story/final-retest.txt) passed all 15 selected cases. |
| Failed, then fixed and retested | The earlier [scene run](../output/mobile-story/scene-final.txt) had 25 passed, one skipped and one WebKit search-popup failure. Search now repositions against the input and visible viewport; [search retest](../output/mobile-story/search-retest.txt) passed all three browser projects. [Skip retest](../output/mobile-story/skip-retest.txt) also passed all three. These older failures are retained as evidence, not presented as a green first run. |
| Passed, with explicit skips | The [final acceptance run](../output/mobile-story/acceptance-final.txt) completed **102 cases: 99 passed, three skipped, zero failed (5.2 minutes)** across desktop Chromium, Android Chromium emulation and iPhone WebKit emulation. Two skips are laptop-only ticker checks in phone projects. The other is WebKit's natural-scroll story check when that context retained WebGL fallback; separate fallback, color and sampled-containment checks passed. A skipped motion check is not counted as a pass. No failures remain in the latest retests. |
| Passed, visual review | The independent reviewer returned **ship**, inspecting all 23 selected captures: 14 openings, eight complete-stage gather/research reveals and one menu, with no material fixes requested. These captures cover both themes at 320 × 568, 360 × 800, 390 × 844, 430 × 932, 844 × 390, 768 × 1024 and 1440 × 900 for openings. See [layout evidence](../output/mobile-story/manual-layout-final.json) and [reveal evidence](../output/mobile-story/manual-reveal-final.json). The reveal captures show contained complete stages at recorded gather/research poses; they do not all show the final story endpoint. |
| Passed, automated scope | Browser fixtures exercise no horizontal overflow, native flow/no pin spacers, action access, navigation beyond the story, forward/reverse motion, responsive transitions, original theme colors, immediate/pending-import skip, reduced motion, Save-Data, graphics fallback, delayed-import cancellation, no-JavaScript, direct anchors/history, and enlarged-text reflow. These are isolated synthetic data fixtures, not production market statistics or a validation of real-provider availability. Earlier full-run [route captures](../output/mobile-story/routes/) contain 78 captures across routes/themes/browser projects; they are distinct from the 23 selected visual-review images. |
| Not tested | Physical iPhone/Android devices; actual virtual keyboards and browser-toolbar retraction; real notch/safe-area hardware; device text-size settings (the automated check doubles selected content text); network-throttled timing; measured GPU memory; field CWV; and actual BFCache eligibility. History/anchor and lifecycle tests do not establish BFCache eligibility on a physical browser. |
| Not applicable | Generated-video continuity, clip joins, portrait/landscape sequence selection, source sampling rate, missing-frame recovery and decoded-frame eviction: there is no generated video or image sequence. The native scene has its own bounded lifecycle and still fallback. |

Representative evidence: [narrow opening, light](../output/mobile-story/opening-320-568-light.png), [typical opening, dark](../output/mobile-story/opening-390-844-dark.png), [desktop opening](../output/mobile-story/opening-1440-900-dark.png), [portrait research reveal](../output/mobile-story/reveal-390-844-dark.png), [short-landscape gather reveal](../output/mobile-story/reveal-844-390-light.png), and [narrow menu](../output/mobile-story/menu-320-light.png). The other selected files follow `opening-{width}-{height}-{dark|light}.png` and `reveal-{width}-{height}-{dark|light}.png` in [output/mobile-story](../output/mobile-story/). The [final working preview capture](../output/mobile-story/preview-final.png) records the ready scene at 1280 × 720 without horizontal overflow; its browser tab was left open.

## Documentation boundary

[PRODUCT.md](../PRODUCT.md) and [DESIGN.md](../DESIGN.md) remain the product/design authorities. DESIGN.md's existing prose-only structure without token frontmatter, and the absent `.impeccable/design.json` sidecar, are pre-existing documentation drift relative to the Impeccable document reference. This report records the responsive extension; it does not refresh those files, create a sidecar or silently replace the incumbent visual system.
