# Glass transparency and search frame — 8 November 2026

## Requested correction

Make card/search fills slightly transparent without fading text or changing the existing edge glows. Correct uneven search framing, increase its thickness slightly and inset the hero search label.

## Implementation

- `wwwroot/css/glass.css`: remove opaque underpaint from shared card surfaces and slightly reduce material-fill alpha in both themes. Preserve the existing rim, signal, shadow and hover-border colors. Apply the fill to context-specific watch/profile cards, leading news cards, discovery and empty-state surfaces as well as the shared panel families. Internal statistics/profile cells no longer paint an opaque white/navy layer over their parent material. Nested empty states and tables remain flat. Reduced-transparency preferences restore a solid base; mobile still avoids backdrop blur.
- `wwwroot/css/search.css`: the field uses an approximately 85–88% tinted gradient without an opaque base. A border-only mask removes the solid backing from beneath it. The complete outer rim has a uniform **2px inset/thickness**, with an ordinary 2px border fallback when masking is unsupported. The light-path centre is adjusted to match. Existing moving rim/aura colors, timing and pause behavior remain unchanged. The hero's “Find a stock” label has a **16px inset**, aligned with the magnifier. No field width/height, typography or layout change.
- `tests/e2e/search-signal.spec.cjs`: checks all four rim insets against the input bounds and the hero label inset in both themes across desktop, Android and iPhone profiles, alongside the existing keyboard/clear/motion assertions.
- `DESIGN.md`: records transparent fill ownership, reduced-transparency fallback and final frame/label geometry.

No opacity is applied to a card or input as a whole. The logo, hero videos, stock data, financial calculations, routes, storage, consent and backend are unchanged. Popups and native controls retain their readable existing surfaces.

## Verification

- **102 browser checks passed** in 2.9 minutes (`output/glass-transparency/browser.txt`). The run covers all-route accessibility/contrast/overflow, populated views in both themes, empty/populated watchlist framing, search/watchlist persistence, earnings watchlist filtering, exact search-frame geometry, keyboard interaction, reduced motion, offscreen/shared pause and forced colors.
- Screenshots of the search and populated news/views were visually inspected. The hero image and ambient background now show through the tinted fills; border-only masking prevents the rim's backing color from showing through the search centre.
- Strict frontend audit: **0 findings**. Design-document lint: **0 errors**, 10 existing orphan-token warnings.
- This is a CSS/test/documentation change. No application rebuild or backend test run was needed or claimed for this correction.
- Local preview: `http://127.0.0.1:5154/?review=transparent-glass-20261108`.
- No commit, push or production deployment performed.

## Snapshot / discovery balance follow-up

The owner identified a snapshot that still looked solid and discovery tiles that looked too clear. A later `.explore-grid a` rule had replaced the discovery cards' complete gradient with only a faint highlight; removing that override restores their tinted body without changing the borders or glow. The snapshot now uses a lighter local fill and paint-only glass, so its previous backdrop blur no longer erases the ambient pattern. Other panels and all content/layout/data behavior stay unchanged.

Verification: **12 checks passed** for Home and Markets in both themes across desktop Chromium, Android Chromium and iPhone WebKit (`output/glass-balance/browser.txt`). Final component screenshots and computed-style inspection confirm the snapshot's transparent underpaint/no blur and the discovery cards' complete tinted gradient. Strict audit: **0 findings**. This follow-up changes only `glass.css`, `DESIGN.md` and this note; no rebuild or deployment was performed.
