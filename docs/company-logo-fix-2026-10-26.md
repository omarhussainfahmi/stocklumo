# Company logo coverage — 26 October 2026

The previous company-mark renderer returned no image outside six hard-coded symbols. It also had no broken-image recovery. The shared renderer now covers the fixed eight-company selection with bundled marks, aliases GOOG to the Alphabet mark, and uses validated profile-supplied Finnhub stock-logo images for other symbols. Stock detail and watchlist images use the shared renderer; spotlight cards now use it too. No additional profile/quote API requests are introduced.

Images are restricted to local assets or HTTPS static2.finnhub.io stock-logo paths, without credentials, queries or fragments. The CSP permits this exact image origin; API keys remain server-side. Images send no page referrer. Unsupported or missing logos and failed image loads retain a visible ticker badge, explicitly titled logo unavailable. This is not a guarantee that Finnhub supplies a genuine brand image for every listed company.

Tesla and Visa SVGs come from Simple Icons, with its CC0 license included beside the assets. Existing brand assets and the Stocklumo logo are unchanged. Local monochrome icons adapt to dark mode; provider images retain their colors. The privacy page explains the image-CDN request.

Verification before publishing:

- Release build: zero warnings/errors; backend: 100 passed.
- Frontend: 58 passed, including local asset presence, rejected logo URLs, failed-image recovery, and no extra profile requests. Three targeted logo checks also passed after the monochrome-class correction.
- Browser suite: 126 passed in desktop Chromium, Android Chromium and iPhone WebKit, both themes. New checks load a test-only provider image through the real CSP, simulate image failure, and decode Tesla/Visa assets. Fixture data and image intercepts remain test-only.
- Desktop dark and phone light regression captures inspected. No physical-device testing performed.
- Mechanical design check flagged only the existing homepage background grid, unchanged by this fix. Original Stocklumo logo files have no diff.

Deployment status must be checked separately after publication; passing local tests is not proof of a live release.
