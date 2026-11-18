# Stocklumo original 3D landing direction

Research and proposed implementation, 29 October 2026. No website code or dependencies changed during this study. The owner chose public references and an original design; no paid MotionSites account is available.

## Evidence and access limits

- Requested tutorial: https://www.youtube.com/watch?v=1o6ve8GbcUU — Viktor Oddy, “Codex X GPT 5.5 - Build Animated AI Sites (FULL PROCESS)”, approximately 11 minutes. Retrieved and read the complete English auto-generated transcript from 0:00 to 11:00, inspected playback frames, and let playback run through the end (later accelerated to 2x). This is caption-assisted review with sampled visual checks, not continuous frame-by-frame audiovisual analysis. Captions can mis-transcribe product names, so uncertain image/video tool names are not treated as verified recommendations.
- Tutorial structure: introduction 0:00–1:27; image composition and short video generation 1:28–4:22; UI layout adaptation 4:23–5:58; supporting sections and material styling 5:59–7:21; scroll-linked media 7:22–8:18; composition and readability corrections 8:19–10:42; phone preview and conclusion 10:43–11:00. This is a video-led cinematic workflow, not evidence of a reusable interactive logo mesh.
- MotionSites public home gallery, dedicated 3D gallery, background page and MCP/Academy pages inspected. The initial server-rendered gallery and hydrated live gallery differed; do not interpret a single page's card count as the size of the complete collection.
- Dedicated 3D gallery exposed fifteen titled entries during inspection: Lost Little Explorer, Moss Valley, Octo Studio, Golden Identity, SynapticForge, Specimen, Fin Coin, Ancient Oath, Agehana, Inknomad, Jelly Garden, Sky Cookie, Michelle 3D portfolio, Go On White, Shadow 3D. This is the visible public subset, not all advertised 100+ examples.
- Live home entries included Shelf Hero, 3D Portfolio, Facet Glass, Wild Pil, Zenith Realty, Internet Alchemist, Particle Self, Ink Reveal, Anchor AI, Obsidian, Honey Bee, Agent Hero, Orvante Agency, Reelmark, AXON, 3D Character Studio, Nomi AI Agent, FinSmith, Loops Virtual Store, Lena Varga Hero, Velaris, Roadster 3D, Freight Scroll Hero and Space Voyage.
- Opened detail previews for Fin Coin, Facet Glass, FinSmith and Particle Self. Fin Coin/FinSmith/Particle Self prompts were gated; source-copy controls required a paid plan. Facet Glass exposed a public Copy full prompt control, but although the site reported success the browser clipboard returned empty. Its actual prompt text was therefore not retrieved or studied. Several media previews reported playback errors; screenshots or poster frames do not establish their complete motion behavior.
- Background page exposes dark/light and subject filters, free-copy controls and locked entries. Not every background clip or paid prompt was accessible. Do not claim an exhaustive audit of every example, exact source code or proprietary prompt.
- Official MotionSites MCP information: https://motionsites.ai/mcp — advertises Codex support and three free prompts for free accounts, with full collection access requiring paid access. Connecting is optional for this original implementation.

## What is useful for Stocklumo

The useful reference principles are a strong central object, depth from controlled lighting, readable typography over motion, an authored transition tied to scrolling, and separate compositions for phone and desktop. Preview labels do not prove which rendering library was used.

Facet Glass suggests controlled material highlights; Fin Coin suggests a dimensional brand object; Particle Self is presented as scroll-driven 3D. FinSmith's fish and the characters, games, cars and confectionery in other examples are unrelated to Stocklumo. Their visual assets, wording and compositions should not be copied.

The tutorial also demonstrates failures worth avoiding: subject clipping after excess scaling, pointer movement that undermines composition, small text, and content overlapping the focal object. Its final phone preview is not a substitute for testing our own implementation.

## Recommended original direction: the Stocklumo ribbon in depth

Use the exact two existing SVG paths in `MarketDesk/wwwroot/images/stocklumo-mark.svg` and its existing dark variant. Add depth and a restrained bevel to those paths rather than inventing a new logo. Keep the navbar logo and wordmark files untouched.

Keep the current full-height hero footprint, centered headline, search and two useful calls to action. Place an enlarged dimensional ribbon toward the right/background, with a protected clear region behind all text and controls. It should still be recognizable from the first frame. Reserve its dimensions before rendering so it causes no layout shift.

Dark: existing navy ground, mint upper ribbon, existing light lower ribbon, cool blue edge reflections. Light: existing pale blue/off-white ground, mint upper ribbon, navy lower ribbon and restrained neutral shading. Preserve the brand's current theme variants; avoid a washed-out dark scene inside the light hero.

### Motion storyboard

1. Immediate state: real headline, search and CTA are available; the original static SVG is already visible. No loader or forced introduction.
2. Entry: once the 3D module is ready, crossfade from the matching SVG pose to the shallow dimensional scene. A small one-time settling turn reveals its thickness without a continuous spin.
3. Pointer: on fine-pointer devices only, a small, clamped tilt adds depth. Input and button regions do not drift. Pointer exit returns smoothly to the authored pose.
4. First scroll: over roughly one viewport of natural scrolling, the ribbon rotates slightly toward its frontal brand pose, shifts toward the edge and recedes. No prolonged pinning, artificial spacer sections, snapping or scroll hijacking. The market summary remains reachable normally.
5. Market workspace: the existing background and compact data composition resume. No moving financial values or decorative fabricated market charts. Keep the approved feature-page widths/grids and full-width research navigation/background unchanged.
6. Reduced motion, unavailable WebGL or failed asset load: keep the static original logo and fully functional page. No blank hero.

Additional effects should be limited to a restrained light sweep on the ribbon, slight depth separation between its two existing parts, and a brief transition into the market workspace. No unrelated particles, fake tickers, huge blurry layers, extra sounds or custom cursor.

## Tooling decision

- Three.js: recommended renderer. Its SVGLoader can convert the existing SVG paths into shapes; ExtrudeGeometry can give them actual depth and bevels. No external 3D model or generated video is required. Sources: https://threejs.org/docs/pages/SVGLoader.html and https://threejs.org/docs/pages/ExtrudeGeometry.html.
- GSAP + ScrollTrigger: appropriate if the scroll sequence needs a coordinated timeline. Plain CSS/WAAPI should still handle ordinary button/fade states. Source: https://gsap.com/docs/v3/Plugins/ScrollTrigger/.
- Existing ASP.NET Core MVC/Razor and vanilla frontend stay. Isolate a lazily loaded hero module; do not migrate to React or a hosted builder to render one scene. Review the current CSP before choosing the bundling route; self-host assets.
- Runtime npm packages are different from ChatGPT plugins. Do not install them until the implementation starts; pin the chosen versions and retain their licenses.
- Already available skills: design-taste-frontend or Impeccable for the incumbent visual direction; animate/emil-design-eng for motion decisions; animation-performance, accessibility and mobile-native for constraints; Playwright for regression verification; ASP.NET Core for integration. Choose relevant skills, not every skill simultaneously.
- Optional useful addition: the official GSAP skills at https://github.com/greensock/gsap-skills. Most relevant are gsap-core, gsap-timeline, gsap-scrolltrigger and gsap-performance. The documented install command is `npx skills add https://github.com/greensock/gsap-skills`. This study did not install it.
- Plugin directory search for MotionSites, Spline and Blender returned no matching plugins in this session. This does not prove none exist in every directory. No additional ChatGPT plugin is required for the chosen approach. Existing Figma/MagicPath can help with art direction, but are optional. MotionSites' separate MCP connection and account are also optional.

## Performance and acceptance gates

- One bounded scene, no full-page WebGL wallpaper. Start with a pixel-ratio cap around 1.5 on desktop, lower on phones; verify rather than promise a frame rate.
- Defer 3D loading without delaying headline, search or CTA. No render loop before the scene is ready. Render on demand when idle; pause when hidden/offscreen and dispose GPU resources on teardown.
- Connect the existing pause-motion control to the hero as well as the field. Honor reduced motion from the initial render and while the setting changes. Keep an SVG fallback through context loss.
- Minimize geometry, lights and material passes. Transmission, bloom, shadows and post-processing need measured justification, not default enablement.
- Test 320/390px phones, tablets, laptops and wide desktop; both themes; keyboard search/watchlist; all feature routes; slow loading; graphics failure; reduced motion. Preserve daily available-only stock selection and the separate fixed ticker.
- Compare transfer size, LCP, CLS, responsiveness and frame behavior before/after. No unmeasured promise of sub-two-second loading or universal 60fps.

## Original implementation brief

Build a production-ready 3D hero for the existing Stocklumo ASP.NET Core MVC application. Preserve the original logo SVG geometry and wordmark, current real data services, full-height centered hero footprint, visible stock search, useful CTAs, compact approved content grids, both themes and all routes. Create an original dimensional ribbon using the existing two SVG paths. Use a navy/mint/light brand palette in dark mode and the existing pale/navy/mint palette in light mode. Add a restrained entry turn, fine-pointer tilt and one short natural-scroll transition into the existing live market section. Keep all financial values and controls stable. Load only a bounded, deferred scene; maintain a static SVG fallback; pause offscreen/hidden and honor reduced motion and the existing pause setting. No copied MotionSites assets/prompts, generated fake financial graphics, backend rewrite, React migration, scroll hijacking, prolonged pinned sections or inaccessible motion. Verify source-logo fidelity, desktop/phone layouts, data interactions and performance with actual measurements before deployment.
