# Stable research data disclosure — 8 November 2026

Historical first revision. Owner review identified that the anchored note covered form controls. The centered native dialog documented in `docs/research-data-dialog-2026-11-08.md` supersedes the implementation below.

The shared About this data disclosure previously expanded in the research heading's flex row. Its increased height moved the heading, editor and results. Screener, Compare, Portfolio and Earnings now use the same out-of-flow anchored note; their closed-state content dimensions stay intact.

Changed implementation owners:

- `MarketDesk/Views/Market/Index.cshtml`: preserve native details/summary semantics, associate the trigger with the note, make the reading panel keyboard focusable.
- `MarketDesk/wwwroot/css/market.css`: bounded panel width, internal scrolling, opaque theme panel for readable text, stable CSS chevron and responsive alignment.
- `MarketDesk/wwwroot/js/research.js`: shared outside-click, focus-leave and Escape dismissal; restore trigger focus on Escape. Position above when needed and cap height to available viewport space. Only an open note performs these small layout reads on toggle/scroll/resize; no animation loop or provider requests.
- `tests/e2e/research-notes.spec.cjs`: verify unchanged heading/form/result geometry and scroll position, viewport containment, open-state accessibility, keyboard reading/Escape/Tab, outside-click dismissal, all four routes and both themes.
- `DESIGN.md` and `UX-CONTRACT.md`: record the shared non-modal disclosure contract.

Verification:

- Final focused browser run: **3 passed**, covering all four routes × both themes in desktop Chromium, Android Chromium and iPhone WebKit profiles (24 route/theme/profile combinations).
- Supporting browser checks: **27 passed** for all four routes' accessibility/layout checks in both themes plus portfolio validation/save/edit/remove across the three profiles. These ran before the final disclosure-only viewport correction. Earlier focused checks caught native WebKit marker-width drift and viewport clipping; both were corrected and the focused run passed afterward.
- `npm test`: **80 passed**, zero failed after the final implementation.
- Release solution build: **succeeded, zero warnings/errors**. An earlier build encountered an existing preview process locking the output files. Only the verified workspace preview at port 5154 was restarted; the normal build then passed. No project build settings changed.
- `npm run check:hero`: passed; existing bundle verified.
- Strict static UI audit: zero findings. DESIGN lint: zero errors, ten existing orphan-token warnings.
- Screenshots visually reviewed on desktop, Android and iPhone browser profiles. Physical phone testing was not performed.

Other disclosures, data copy, editor behavior, financial logic, API integrations and dependencies remain unchanged. No commit, push or production deployment. Local preview restarted at `http://127.0.0.1:5154`.
