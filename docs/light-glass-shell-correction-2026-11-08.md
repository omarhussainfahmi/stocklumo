# Light glass and full-width toolbar correction — 8 November 2026

The owner requested visibly translucent light cards, a clearer light navigation hover effect, and restoration of the research toolbar's edge-to-edge surface.

Changes:

- `MarketDesk/wwwroot/css/glass.css`: lowered only the light card adapter's fill alpha. Standard cards use 70% upper reflection / 56% middle / 53% lower fill; snapshot uses 64% / 52% / 47%. Existing rim, side glow, shadow, text and financial colors remain intact. Dense controls, dialogs and navigation keep their readable fills. Dark adapter values and reduced-transparency/forced-colors fallbacks remain intact.
- `MarketDesk/wwwroot/css/motion.css`: light navigation glide now uses 28% canonical green, with darker derived hovered/current/focused text. The animation, link geometry and dark variant are unchanged.
- `MarketDesk/Views/Market/Index.cshtml`: research toolbar moved from the bounded main canvas into the document shell below the ticker. This fixes gaps on stock detail and extra-wide screens without stretching page content.
- `MarketDesk/wwwroot/css/observatory.css`: remove the toolbar's former negative margins and the information wrapper's redundant inset. Navigation keeps the same gutter padding. The homepage toolbar remains hidden.
- `tests/e2e/light-material-shell.spec.cjs`: cross-page material checks, hover/focus visibility and contrast, unchanged dark tokens, full-width shell and bounded form checks. `DESIGN.md` and `UX-CONTRACT.md` record the approved ownership.

Verification:

- **3 toolbar browser checks passed**, in desktop Chromium, Android Chromium and iPhone WebKit profiles. Both themes and nine non-home routes were checked; desktop includes 2200px, 1280px and 768px widths, mobile 390px. Stock detail retains its 1600px frame; the four feature editors retain their exact existing width limits. No document overflow; homepage toolbar stays hidden.
- **3 material/navigation browser checks passed** in the same profiles after correcting a test assumption: research shortcut cards belong to the homepage and are intentionally hidden on Markets. Eight routes' card families were checked, with header accessibility/contrast in hover or keyboard-focus state. Actual screenshots were reviewed on desktop and mobile profiles. These are browser profiles, not physical-device tests.
- `npm test`: **80 passed, zero failed**.
- Normal Release solution build: **succeeded, zero warnings/errors**. The verified local preview was restarted to load the compiled layout change.
- Supporting evidence: `output/light-glass-shell-fix/browser.txt`, `material-final.txt`, `unit.txt`, `build.txt`, and Playwright screenshots. The initial combined run's three material failures were test-scope errors; it is not reported as a single six-test passing run.

No dependencies, API calls/contracts, business logic or real market values changed. No commit, push or production deployment. Local preview: `http://127.0.0.1:5154`.
