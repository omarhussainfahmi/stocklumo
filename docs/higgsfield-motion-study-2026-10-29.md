# Higgsfield motion study — 29 October 2026

The completed deliverable is a local Stocklumo design study and production preparation. Higgsfield media generation remains blocked; this is not a completed Higgsfield website or a new homepage implementation. The application, its existing Three.js ribbon, routes, market data and production deployment were unchanged by this task. Nothing was pushed or deployed.

## Direction and scope

“Signal into focus” extends the approved Market Observatory identity: navy and mint, a pale mineral light theme, existing self-hosted Manrope, precise borders and compact useful controls. The study imports the application's `market.css` and `observatory.css`, displays the live theme tokens, and uses the original theme-specific logo SVGs. Its theme button changes the local board; it does not change application settings.

The attached media/scroll prompt informs the three-column Visual Story, still and motion prompts, timing proposal and loading budgets. The useful opening remains readable HTML with search and immediate **Explore markets** and **Your watchlist** actions. Decorative media would contain no market numbers, charts, headlines or interface controls. The original ribbon stays in its separate Three.js layer so generated footage cannot distort its geometry or colors.

The preparation deliberately avoids long pinned sections, added scroll height, dead demonstration controls, regenerated logos and fake generated-media fallbacks. Study links open real routes on the separate local application preview. The downloaded plan and prompts describe future work; no video element, frame loader, runtime media URL or CSP change was added to the app.

## Scenes and pacing reference

One continuous six-second, 16:9, 720p, silent clip is proposed per theme, with a locked camera and the left 62% kept clear for HTML. These are editorial targets, not observed playback:

| Scene | Source timing | Proposed desktop travel | Purpose |
| --- | --- | --- | --- |
| Find your focus | 0–1.3s | 0–22% | Quiet held opening; original ribbon on the right; search and actions visible immediately. |
| Follow the signal | 1.3–4.3s | 22–72% | Sparse light gathers along three curves; no additional copy. |
| Start researching | 4.3–6s | 72–100% | Motion settles as existing snapshot and research links enter through normal scrolling. |

Phone travel is proposed as 0–30%, 30–75%, 75–100%, with quieter framing. Travel maps to the existing hero passing the sticky header, without a pin spacer. Reverse scrolling would use the same mapping. Actual travel must be measured at integration. No original videos exist; accepted assets are empty and the frame manifest and frame ranges are explicitly null.

Initial targets in `production-plan.json` are a poster up to 100,000 bytes, mobile sequence up to 1.5 MB and desktop sequence up to 3 MB; extraction starts at 18 fps and a maximum 1280px width. Proposed caps are three concurrent frame requests, six decoded mobile frames, ten desktop frames and DPR 1.5. These budgets are not measurements. Ten 1280×720 RGBA frames alone require about 35.2 MiB decoded memory. Reduced motion, saved pause and Save-Data would retain the existing SVG without a sequence fetch; cleanup and failure handling remain acceptance requirements.

## Editing and previewing

Run from the repository root:

```powershell
node tools/preview-design-study.cjs
```

Open `http://127.0.0.1:5154/`. This server binds only to loopback and serves an explicit allowlist of study files and existing public CSS, fonts and logos. Application links target the separate preview at `http://127.0.0.1:5153/`; that application must also be running to use them.

| Edit | Exact repository path |
| --- | --- |
| Board content, story and real links | `design/higgsfield/index.html` |
| Local composition and responsive table | `design/higgsfield/study.css` |
| Theme toggle and token display | `design/higgsfield/study.js` |
| Scenes, timing, budgets and acceptance gates | `design/higgsfield/production-plan.json` |
| Generation provenance and access blocker | `design/higgsfield/production-ledger.json` |
| Downloadable production prompts | `design/higgsfield/prompts/dark-still.txt`, `light-still.txt`, `motion.txt` |
| Restricted local preview server | `tools/preview-design-study.cjs` |

`PRODUCT.md` captures the product constraints; `DESIGN.md` remains the incumbent visual authority. The study did not replace or refresh its tokens. Future integration touchpoints are listed in the plan: `MarketDesk/Views/Market/Index.cshtml`, `MarketDesk/wwwroot/css/observatory.css`, `frontend/hero-scene.js` and `MarketDesk/wwwroot/js/hero.js`. The source logos remain `MarketDesk/wwwroot/images/stocklumo-mark.svg` and `stocklumo-mark-dark.svg`.

## Ledger and provenance

The connected Higgsfield account reported Free plan and 10 credits. The first `gpt_image_2_5` still request had a 0.25-credit quote, then was rejected with **“Requires basic plan or higher.”** There is no job ID or accepted output. The Seedance 2.5 six-second 720p/no-audio request received only a 42-credit quote; no video job was submitted and no reference uploaded. A quote does not establish model access or readiness.

The owner confirmed no other account with access and no existing exports. No subscription purchase, trial, account-setting change, alternate-provider generation or corrective generation occurred. Existing SVG and Three.js artwork is prior Stocklumo work, not a Higgsfield result. The generation ledger is the source of truth for this distinction.

## Verification and limits

Recorded evidence is under `output/higgsfield-story/`, with the Release build log at `output/higgsfield-build.txt`:

- Release build: zero warnings and errors. Existing frontend unit suite: 63 passed. Existing hero bundle check: 724,944 bytes verified. Rerun with `dotnet build MarketDesk/MarketDesk.csproj -c Release`, `npm test` and `npm run check:hero`.
- `http-review.json`: 29 expected asset, app-route, blocked-path and method responses passed. The blocked-path checks exercise the local preview's allowlist, not a comprehensive security audit.
- `responsive-review.json` and `study-*.png`: ten browser viewport/theme captures at 1440×900, 768×1024, 390×844, 320×720 and 844×390 found no document overflow or missing images. The phone story table intentionally scrolls inside its region.
- `keyboard-review.json`: the named, focusable story region moved horizontally from 0 to 119px using the keyboard. The skip link was verified as the first Tab target and Enter operated the theme button. The final board's observed browser warning/error log was empty. The finish review scored both local-study fixes resolved (product-context document and phone table label/focus/hint), then returned **ship** scoped to those fixes only.
- `contrast-review.json`: sampled light body/supporting/panel-supporting/action ratios were 11.74/5.33/6.65/5.23; dark ratios were 17.02/9.99/8.98/11.5. These sampled pairs do not cover every state or element.

The Impeccable detector reported an empty finding list with a root-relative CSS resolution warning. This is not a complete contrast, accessibility or performance audit. Browser viewport checks are not physical-device tests. No generated-video smoothness, seams, extraction quality, runtime memory, transfer budgets or actual scroll/media integration has been validated.

To resume production, obtain authorized Higgsfield access or accepted exports, inspect stills and full playback in both themes, verify separation from the original logo, extract and verify a real frame manifest, measure budgets, then test native scrolling, reverse travel, resize, reduced motion, pause, Save-Data, media failures and resource cleanup before integrating. Those gates remain pending.
