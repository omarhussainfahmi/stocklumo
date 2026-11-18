# Stocklumo interaction motion — 4 November 2026

## References actually inspected

- Public Solvik listing: https://codeandchill.store/templates/solvik
- Live overview: https://demo.codeandchill.store/solvik/#/overview — rendered in Playwright and captured locally. The listing describes plain JavaScript, CSS, SVG and GSAP. No paid template source was obtained or copied.
- Public six-second Instagram reel: https://www.instagram.com/reel/DfIKeN-P4ox/ — accessible in the browser after dismissing a signup prompt. The visible CRM demo and selection-mask code match the supplied screenshot. Web text fetch alone failed.
- CodeXR catalog: https://topmate.io/code_xr — public navigation, hover-icon and other component listings inspected. The SVG-animation product page describes React, Tailwind and Framer Motion components. This is a paid source-code catalog, not an installation requirement. No purchase, checkout submission or source download occurred.

## Original implementation

Shared `motion.css` and deferred `motion.js` are included by `_SiteHead.cshtml`, covering market, research and information pages. `site.js` retains the theme button's text/action semantics and saved theme, adding an aria-hidden switch track with a persistent knob for reversible transitions.

- Buttons: pointer press scales to .97 in 120ms; pointerup, cancellation, blur and keyboard input clear the state. No delay before actions.
- Linked tool, discovery and news cards: 2px hover lift, border feedback; financial quote cards use border feedback only. Existing dimensions, grids and bottom alignment remain intact at rest.
- Arrows, summary SVG icons and search-clear icons: small hover feedback on fine pointers only.
- Navigation: one pointer-transparent aria-hidden highlight per navigation group, animated with a bounded clip-path inset over 250ms. No duplicated interactive links, no per-frame geometry loop. Rapid changes retarget from the currently rendered clip. Resize/font changes update immediately; keyboard focus updates instantly. It preserves actual links and full-page navigation.
- Numbers: explicit stable summary outputs and stock price/change fade from .55 opacity over 200ms when text changes; repeated events are rate-limited to one feedback event per 750ms. Text always becomes the exact new value immediately. No numeric interpolation, synthetic prices, cloned screen-reader text, ticker timestamps or table-wide mutation observers.
- Existing native dialogs: brief 200ms entrance for pointer activation; keyboard activation remains immediate. Native focus management remains unchanged.

No content is hidden pending an animation, no entrance is attached to every scrolling data row, no chart history is invented, no extra market request or polling is added, and no framework/dependency is installed. Existing hero/atmosphere animations are unchanged. Native selects remain native.

## Accessibility and lifecycle

Reduced-motion mode removes the new spatial movement and WAAPI feedback; color feedback remains. Pointer hover effects are gated by hover capability and a fine pointer. Numeric animations and nav animations are cancelled when reduced motion becomes active or the document is hidden. Pointer state is cleared on cancellation, blur and pagehide. Added decorative elements are aria-hidden and never focusable. CSS/JS failure leaves normal HTML controls and links usable.

Skills used: installed `animate` and its recipes, `animation-performance`, and Playwright for browser inspection. Existing GSAP remains confined to the original hero; no new plugin is required.

## Actual validation

- Release solution build: 0 warnings / 0 errors.
- Existing JavaScript tests: 73 passed.
- Existing home-refinements and research-layout browser regressions: 18 passed across desktop Chromium, Android Chromium and iPhone WebKit (browser emulation, not physical devices).
- Separate isolated CLI smoke check: 10 routes × 360px / 1440px × light / dark = 40 cases, no horizontal overflow or page JavaScript errors. API requests were intercepted as unavailable in that test context, without spending provider calls.
- Numeric check: synthetic browser-only text `123.45` appeared immediately while its opacity animation ran. Changing reduced-motion preference cancelled it; the next text appeared immediately with zero numeric animations and button transition `0s`.
- Visual checks: desktop and 360px mobile captures; mobile brand/theme/menu remained separated with no document overflow.
- Initial regression attempt could not launch because matching browser executables were absent. Playwright browser binaries were installed; the rerun completed with 18 passes. No app dependency changed.

Evidence: `output/motion/` and `output/playwright/` (ignored local output). Desktop navigation clip and theme track were checked in a real browser. No universal device or frame-rate guarantee is claimed.

Local changes only: no production deployment, commit or push performed.
