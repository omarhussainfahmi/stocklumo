# Code cleanup completed — 17 November 2026

Code cleanup only is complete. STOP here; await the user's instruction before Branch protection. No commit, push, merge or deployment. Substantial preexisting dirty work was preserved.

## Changes

Split the 1,087-line market entry point into focused formatting, API, company-mark, presentation, search and discovery modules. The entry point retains quote/feed state, watchlist commands and subscription policy; modules receive explicit inputs.

Split the 535-line research-preview entry point into series validation, formatting, chart rendering and orchestration modules. Preserve the loopback development-preview gate and existing keyboard/pointer behavior. Update Razor script order and the JSDOM script loader together.

Split two large unit-test files into capability groups and shared fixtures. All 57 moved test-call ASTs match, normalizing only relative imports. Group all 28 browser spec/support files into shell, hero, market, research, journeys, site and support folders. Fingerprint comparison allows only fixture import paths and newline/BOM normalization. Update preview/performance references and use a quoted recursive test glob. No dependency changes.

## Verification

- 150 backend tests passed, zero failed/skipped; Release build.
- 97 JavaScript tests passed, zero failed/skipped; final-js.log.
- Whole-repository ESLint passed in isolation with the existing config; final-lint.log.
- 63 browser checks passed, zero failed/skipped/flaky: 39 focused main checks and all 24 preview checks; 21 each desktop Chromium, Android Chromium and iPhone WebKit. See browser-checkpoint.json and bounded logs.
- Discovery preserved 325 main and 24 preview cases. Discovery is not a claim that all 349 were rerun after the refactor.
- Release publish and local production-configuration smoke passed: health, route-selected scripts, module order/assets, removed legacy route, preview denial, missing-provider safe state and settings; final-publish.log. This is local verification, not deployment.
- All 57 moved unit cases and 28 browser/support moves verified; Git whitespace check passed.

Initial checks caught a missing fixture import, a shadowed renderer argument, unused imports and a missed browser fixture path. All were corrected before the successful final checks. No assertions removed or new skips introduced.

## Disclosures and remaining limits

Reviewed the public-information maintenance rule. Provider access, storage, backups, consent, contact links and optional-service gating are unchanged. Policy copy/revision dates and consent version did not need changes.

Earlier full iPhone/WebKit evidence (105 passes and three existing desktop-only skips) predates this runtime refactor and remains separately dated. The earlier intermittent native WebKit abort has no established cause and is not claimed repaired.

No new Desloppify score is claimed; Quality scoring is a separate later task. Branch protection, hosting controls and vendor-advisory follow-up were not started. Source fingerprints identify the final dirty worktree and do not establish exhaustive security coverage.

Node recursive test-glob reference: https://nodejs.org/download/release/v22.23.3/docs/api/test.html
