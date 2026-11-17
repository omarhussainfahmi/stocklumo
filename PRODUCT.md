# Stocklumo

## Product truth

Stocklumo is an existing ASP.NET Core MVC/Razor stock-research website at https://stocklumo.onrender.com/. Visitors search for a company, inspect actual quotes and available charts, save a browser-local watchlist, compare companies, screen a selected universe, track practice holdings and consult earnings dates. These are research and educational tools; the virtual portfolio does not execute trades.

The primary opening action is **Explore markets** (`/markets`), alongside the existing stock search. **Your watchlist** (`/watchlist`) is the secondary action. Other working routes include `/news`, `/stock/{symbol}`, `/screener`, `/compare`, `/portfolio`, `/earnings`, `/privacy`, `/terms` and `/settings`.

## Constraints supplied by the owner

- Preserve the existing ASP.NET architecture, routes, market-data integrations and business logic. No separate hosted builder or publishing workflow.
- Preserve the original Stocklumo ribbon, wordmark and exact theme-specific logo colors. `DESIGN.md` records the approved visual system and original asset paths.
- Keep the approved hero height, compact cards, feature-page content widths, full-width research navigation/background and working mobile layouts.
- Present real data with honest availability, currency and quote timestamps. Decorative imagery must not imply actual charts, prices, holdings or returns. Missing data is not zero.
- Keep the eight-company ticker separate from the daily available-stock selection. Keep Technical Analysis disabled. Public comparison currently uses the latest snapshot.
- Keep API credentials server-side. Preserve consent choices, reduced-motion and saved pause controls. Do not add media downloads to working feature pages unnecessarily.
- Avoid long copy, wasted card area, emoji arrow icons, generic SaaS layouts and disruptive scroll effects. Light and dark themes are equally important.
- Do not use the Sites skill/plugin for this work.

## Design-study step — 29 October 2026

The owner requested that an attached website/media production prompt be adapted using Higgsfield. The independent deliverable is a **local design study**, in `design/higgsfield/`, reusing the site's CSS and original logos. It includes a theme-aware style tile, a three-scene Visual Story, production prompts, proposed timing/loading budgets and an honest generation ledger. The study is not a replacement homepage or a completed media integration.

The connected Higgsfield account reported Free plan / 10 credits. The first `gpt_image_2_5` still request was rejected with **Requires basic plan or higher**. A six-second Seedance 2.5 720p/no-audio video received a price-only quote of 42 credits; no video was submitted. The owner confirmed they have no other account with generation access or existing exports. No new media exists; no subscription, trial or account setting was changed.

## Current interface refinement — 31 October

The owner removed the animation-specific Skip animation/Skip intro control. Earlier mobile implementation notes below describe its historical behavior, not a current requirement. The general keyboard Skip to content link and motion preferences remain. Start exploring now contains forty selected US companies, ranked by available USD stock price within the visible list only; it is independent of the daily spotlight and fixed ticker.

## Outstanding dependency

Actual Higgsfield image/video generation and integration of that generated media remain blocked. The separately authorized native blend below is independent of this dependency. Once authorized media access or accepted exports exist, inspect stills and full playback, verify both themes and logo separation, prepare real media manifests, measure transfer/memory budgets and test native scrolling and fallbacks before integrating. Do not claim completion of this media dependency from a style tile, successful build or existing Three.js animation.

The design-study step itself shipped no application-source changes. The subsequent native implementation is recorded below; production remains unchanged.

## Authorized implementation follow-up

The owner subsequently authorized blending the study with the latest local website. A native Three.js/GSAP implementation now applies the three-beat concept to the existing homepage: left-aligned desktop copy/search/actions, the exact original 3D logo on the right, and three sparse decorative light paths. `frontend/hero-story.js` centralizes the native timing. This is explicitly authored code, not Higgsfield-generated footage. It preserves the approved hero height, real data, existing working sections, routes and feature-page grids. A narrow-phone header spacing fix also prevents the brand and theme button from colliding.

Higgsfield image/video production remains a separate blocked dependency. No generated clip, poster or frame sequence has been substituted or falsely attributed. The native blend was built and tested locally; no commit, push or production deployment occurred. The implementation record is `docs/blended-hero-implementation-2026-10-29.md`.

## Mobile experience follow-up

The owner requested an intentionally composed mobile experience in the same codebase. The native logo now has a separate contained compact stage; desktop composition and feature grids remain intact. The opening provides a visible skip link, a real market action on short screens, and persistent shared navigation. Skipping focuses the real market content without waiting for media, while reduced-motion and Save-Data retain the original still. The 1100px CSS rule selects native camera/layout behavior; no separate video sequence or second app exists. Header/search safe areas, compact landscape navigation, menu focus/Escape behavior and viewport-aware search space are shared across routes.

The implementation and honest validation limits, including physical-device and field-performance tests that are not available here, are recorded in `docs/mobile-experience-2026-10-29.md`. Higgsfield footage remains unavailable; no subscription or deployment was performed.
