# Stocklumo UX contract

## Product context and authority

English-language stock research for personal investors on desktop and phones. This is an educational research application with browser-local practice holdings, not brokerage software. `PRODUCT.md`, the owner's current upgrade brief and existing controllers define product scope. `DESIGN.md` records the approved Market Observatory identity. No Japanese locale/market, authentication, billing, real trading or server-side user mutation is introduced.

| Domain | Maintained source | UI consequence |
| --- | --- | --- |
| Provider access and freshness | `Services/FinnhubApi.cs`, `Services/MarketStore.cs`, `wwwroot/js/market.js` | Missing is unavailable, never zero. Connection health differs from verified fresh trades. Retain quote times and currencies. |
| Earnings bounds | `Controllers/ResearchController.cs` | Validate against the existing ordered 92-day / UTC-year bounds; reported-quarter mode does not use the date range. |
| Practice positions | `wwwroot/js/research-math.js`, `wwwroot/js/research.js` | Keep calculations and separate currency totals. Holdings stay in this browser; failed storage is visit-only. |
| Data retention / consent | `Views/Site/Privacy.cshtml`, `wwwroot/js/site.js` | Existing privacy choices, backup/restore and consent remain authoritative. No new tracking. |
| Historical access | `PRODUCT.md`, current API results | Public Compare is Latest snapshot. Hide unavailable historical choices; never fabricate a time series. Technical Analysis remains disabled. |

## Canonical UI Map

| Capability | Canonical owner | Source of truth | Allowed variants | Verification |
| --- | --- | --- | --- | --- |
| Select/Listbox | `research.js` select helper; native HTML select | This contract, DESIGN.md | Native, operating-system popup geometry accepted | Browser keyboard and native popup checks |
| Date | `research.js` field helper / `.date-field` | ResearchController bounds and this contract | Native date-only control, browser locale/calendar popup accepted | Blank/reversed/boundary dates, phone containment |
| Form | `research.js` field / validationError / pending helpers | This contract | Research editor / local filter; app-owned inline errors | Premium research regression suite |
| Scrollbar | `wwwroot/css/market.css` | DESIGN.md runtime token map | Global base plus horizontal table geometry | Both themes, Firefox/Chromium rules, browser overflow tests |
| Toast | Existing local status regions in `site.js`, `market.js`, `research.js` | This contract | Inline status or persistent field error, no new floating toast system | Status text and live-region assertions |
| CRUD | `market.js` watchlist; `research.js` practice portfolio | Existing storage/math contracts | Browser-local add/edit/remove/reorder | Full journeys and asynchronous edit regressions |
| Research data disclosure | Shared `#research-data-dialog` in `Index.cshtml`, `.app-dialog` surface and `research.js` | This contract | Native information modal; no document reflow | All four routes, both themes, focus isolation/restoration, dismissal and geometry checks |

Table Selection is not applicable: no bulk-selection workflow exists. Interactive screener inspection is a single-stock choice, not bulk table selection. Framework: ASP.NET Core MVC/Razor, vanilla JavaScript and native SVG. No parallel component library or token generator.

## Search, filtering and dataset navigation

- `_StockSearch.cshtml` is the remote search markup owner. `site.js` owns shared clearable adornments and popup placement; `market.js` owns query work. Keep an explicit Clear stock search button, 300 ms debounce, IME composition suppression and cancellation/stale-result guards. Clear immediately, cancel pending work and return focus to the field.
- Results remain semantic links with ArrowUp/Down, Home/End and Escape support. Search is transient navigation, deliberately not committed to the URL; selecting a result navigates to the existing stock route.
- Screener filters apply locally to the same loaded data used by table and chart. Show matching count separately from provider/loading status and allow removal of each active criterion. Reset and saved presets update fields, chips, charts and counts together.
- Retain the existing mobile More filters disclosure. It must preserve hidden values and the count of active advanced criteria.
- Discovery ranks the visible selection from its forty-company USD catalog by available stock price, descending, with symbol order breaking ties. This is not a whole-market ranking or a market-cap ranking. `market.js` reuses loaded quotes, lazily requests remaining visible quotes sequentially, stops on a provider limit/error, and exposes explicit Retry prices. No discovery-only live subscriptions or polling are added. Invalid, missing and future-dated quotes remain unranked. Stock links retain keyboard focus during feed updates; reorder waits until focus leaves the list.
- Tables have task-specific accessible captions and native column headers. Bounded collections render normally; earnings keeps existing 25/50/100-row paging. Horizontal overflow belongs to focusable table wrappers; the document owns vertical scrolling. No table sizing may clip sibling forms.
- Filters/sort remain transient with the existing explicit Save/Load preset mechanism. This is an architecture-preserving exception to URL-state defaults; no new API or routing contract is introduced.

## Interaction and recovery ledger

| Operation | Pending | Success | Failure / focus |
| --- | --- | --- | --- |
| Watchlist save/remove/reorder | Synchronous local update | Stay on page; announce symbol/action and saved state | Storage failure explicitly visit-only. Move/remove restores focus to a surviving row control or empty-state link. |
| Practice holding save/update | Lock editor and conflicting edit/remove actions during currency verification; expose aria-busy | Update the existing local list, preserve math, reset editor coherently | Preserve values on failure. Cancel cannot change a pending save's context. Removing another lot must preserve/reindex or atomically reset an active edit. |
| Compare | Validate 2–5 tickers before request; disable duplicate submit | Named metric tables and honest supported graphics | Retain selected tickers and actionable status; no fake history retry/options. |
| Earnings | Validate applicable date/ticker fields before requesting | Genuine provider events, estimates and results; explicit empty state | Inline associated error, aria-invalid and first-error focus; zero invalid-date requests. Reported-quarter mode skips date checks. |
| Screener inspect | Existing data, no new provider request | Selected row/chart share identity and aria-pressed state | Keyboard selection restores the replacement point's focus; mobile Inspect may focus the inspector heading. |

## Forms, native controls and feedback

Use real labels and semantic input types. Research controls are app-owned editor regions with explicit buttons, not browser-submitted HTML forms; any added form must use novalidate and the same validation helper. Validate on submit, then clear a field's error when edited. Text errors must be associated through existing IDs and aria-describedby. Portfolio uses the owner's approved single error note below the editor, with invalid-field outlines, aria-invalid and first-error focus; do not duplicate that note beneath each portfolio field. Other research workflows retain their associated inline corrections. Preserve inputs after network/provider errors. Busy/disabled states keep geometry stable. Native select and date popup geometry, language and keyboard behavior are deliberately delegated to the platform; do not recreate pickers to match screenshots.

No alert/confirm/prompt product dialogs. Routine browser-local removals keep the existing explicit action and immediate focus/feedback rather than adding repeated confirmation. Existing backup restore and privacy dialogs retain their own contracts. Unsaved portfolio editor changes use the shared `site.js` native-dialog guard for in-app departure: Keep editing is initial focus, Escape retains changes and restores focus, Discard changes navigates. Actual tab close/reload uses the narrow beforeunload warning. Clean/successfully saved/reset editors do not warn. Portfolio drafts have no autosave; there is no server session or queued financial transaction.

## Navigation, motion and themes

All layouts share `_SiteFooter.cshtml`. Preserve its named Explore/Research navigation, real contact destinations, current-year copyright, provider/disclaimer copy and local-storage note. Cookie settings uses the existing consent dialog and focus restoration; motion controls retain reduced-motion and stored-pause behavior. The research invitation links to the existing `/markets` route; Back to top retains `#main`. The oversized signature is decorative (`aria-hidden`), with the original logo still providing the accessible brand link. Footer content uses the full available width minus the normal page gutters, independently of bounded main content. Desktop contact aligns right; tablet/phone wrapping retains its existing order. Footer layout must wrap long contact text and maintain phone target sizes without horizontal overflow.

The research-tools toolbar belongs to the full-width document shell between the ticker and main canvas, not inside a bounded content container. Its surface reaches both viewport edges, with gutter padding for its links. The information-layout wrapper also adds no extra horizontal inset. Keep approved stock/public/research content bounds intact; the homepage still hides this toolbar. Light navigation uses a stronger teal glide (28% of the canonical green) and darker derived hover/current/focus text; it retains the existing timing, dimensions and dark-theme treatment.

On Screener, Compare, Portfolio and Earnings, About this data is a real button opening a centered native `<dialog>` through `showModal()`, following the existing unsaved-changes modal pattern. This supersedes the anchored popup, which obscured live form fields. The dedicated reading surface has a named heading, associated data note, opaque theme background, 42% dimmed backdrop and explicit Close button. Native top-layer isolation keeps background controls inert and keyboard focus within the dialog; Close receives initial focus. Close or Escape dismisses it and restores opener focus without scrolling. The backdrop is inactive, matching the existing unsaved-changes modal. Opening/closing never resizes the heading, moves the editor/results or clears field values. Long content scrolls inside a viewport-bounded dialog with overscroll containment; wheel/touch scrolling on the backdrop is prevented without hiding document scrollbars or changing page widths. No per-frame work, resize/scroll positioning listeners or provider requests are added. Other disclosures retain their current inline behavior.

Shared sticky header and semantic disclosure navigation remain accessible beyond the hero. Preserve focus/Escape/link-selection behavior, measured header anchor offsets, safe areas and existing no-JavaScript navigation. The fixed mobile markets action yields to focused fields, open navigation and the visible hero primary action. The 1100px CSS story selection, exact original logos and compact contained stage remain unchanged. The owner removed the animation-specific shortcut on October 31; keep normal scrolling and the separate keyboard Skip to content link. Reduced motion, saved pause, Save-Data and failed graphics retain usable HTML and the original still.

Apply a saved theme before the first styled paint using the self-hosted `theme-init.js`; `site.js` owns subsequent changes and persistence. Both themes use the same components and dimensions. Quote times retain explicit UTC/freshness; date-only values are not timezone-converted. Browser-local numeric formatting remains as implemented.

## Verification and maintenance

Target WCAG 2.2 AA principles with automated axe plus keyboard/state tests; automated scans are not accessibility certification. Test 360/390/768/1024/1440/1920 widths, both themes, contained horizontal tables, long labels, empty/error/stale/slow data, provider limits, failed storage, IME, pending saves and reduced motion. Physical devices, actual keyboard/notch hardware and field CWV require separate evidence.

`premium-ui.json` names project-owned commands and evidence. `DESIGN.md` mirrors accepted values; `market.css` remains the canonical runtime token source, with `observatory.css` owning composition and `hero.css` the existing responsive scene. Extend these owners instead of adding competing primitives. This upgrade may edit UI source, relevant tests and design documentation only; preserve all unrelated dirty work and backend/domain code. No automatic commit, push, merge, deploy or infrastructure mutation.
