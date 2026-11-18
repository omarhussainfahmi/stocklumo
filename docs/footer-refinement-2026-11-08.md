# Footer refinement — 8 November 2026

The subsequent owner-approved width follow-up supersedes this first revision's 1480px inner cap; see `footer-width-2026-11-08.md`.

The five supplied screenshots informed the visual direction: an oversized subdued brand signature, clear grouped navigation, a restrained atmospheric finish and a purposeful action above the link grid. The implementation is original and uses Stocklumo's existing navy/mineral and mint/teal design system, not the references' graphics or branding.

The full-width glass footer now contains a compact research invitation, the original theme-aware ribbon/brand link, Explore and Research columns, real contact details, the existing financial/storage notes, privacy controls, copyright and Back to top. A large decorative text signature anchors the lower edge. The content aligns with the existing 1480px frame. Responsive rules use three/four columns on larger screens and two navigation columns with naturally wrapped contact/legal rows on phones. The gradient/glow is static CSS, with a forced-colors fallback; no new media, libraries, fonts or JavaScript are needed.

Modified owners:

- `MarketDesk/Views/Shared/_SiteFooter.cshtml`: shared footer structure, market invitation, contact class and decorative signature. Original logo files, links, note copy and control hooks remain.
- `MarketDesk/wwwroot/css/market.css`: consolidated footer geometry, typography, static light/signature, responsive layout and phone targets. Retired older footer-specific overrides rather than stacking a new component system on top.
- `MarketDesk/wwwroot/css/observatory.css`: removed obsolete footer overrides. `glass.css` remains the existing theme-material owner and was not changed for this task.
- `tests/e2e/footer-polish.spec.cjs`: responsive/theme/contrast checks, no overlap/overflow, contained signature, contact/link semantics, consent focus restoration, motion preferences, Back to top and shared layouts.
- `DESIGN.md`, `UX-CONTRACT.md`: durable visual and behavior guidance.

Verification:

- `npm test`: **80 passed**, zero failed.
- Focused Playwright run: **6 passed**, covering desktop Chromium, Android Chromium and iPhone WebKit profiles. Both themes; desktop widths 1920/1280/768/360 and mobile 390/320. Footer accessibility checks passed at each width/theme, alongside interactive cookie/motion/back-to-top checks. Shared footer/branding/navigation checked on nine route/layout examples, including custom 404 and information pages. Initial test work was corrected to respect the existing disabled motion control under reduced motion.
- Normal Release solution build: **succeeded**, zero warnings/errors.
- Desktop and mobile screenshots reviewed in both themes. Phone checks use emulation, not physical devices. Evidence is under `output/footer-polish/` and Playwright test screenshots.

No backend, financial calculations, API behavior, routes or dependencies changed. No commit, push or production deployment. Local preview refreshed at `http://127.0.0.1:5154`.
