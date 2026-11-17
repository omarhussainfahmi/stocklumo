# Research layout polish — 31 October 2026

- Sparse stock-history layout: 1.5:1 desktop split, centered quote metrics, aligned bottoms between Price history and the metric/range column. Range panels share available height naturally; no fabricated chart data or fixed panel height.
- Portfolio: removed duplicate per-field error spans. The shared note below the editor remains an alert associated with the inputs; invalid outlines, aria-invalid, first-error focus and all validation rules remain. Field labels no longer shift vertically when an error repeats under one field.
- Earnings: moved the existing date hint after all controls/actions. Desktop calendar mode uses one populated control row; reported mode uses four active columns. Native date behavior, mode switching and responsive stacking remain.
- Pagination: page-size select has an 84px minimum width and 36px right padding reserved for its 14px chevron. Values 25/50/100 remain readable and paging still works.

Files: `MarketDesk/wwwroot/css/observatory.css`, `MarketDesk/wwwroot/js/research.js`, `DESIGN.md`, `UX-CONTRACT.md`, and `tests/e2e/research-layout-polish.spec.cjs`.

Verification: Release build passed with zero warnings/errors; 73 JavaScript tests passed; 15 targeted browser checks passed across desktop Chromium, Android Chromium and iPhone WebKit. Checks cover both stock themes, panel alignment, narrow-screen containment, one-note portfolio validation/axe, pending portfolio locks, invalid earnings dates without API calls, compact controls and page-size changes to 25/50/100. Strict Premium application audit: zero findings. Evidence/captures: `output/research-layout-polish/`. Synthetic prices/events are isolated test fixtures only.

No backend, API contract, calculation, storage, route, dependency, logo or deployment change.
