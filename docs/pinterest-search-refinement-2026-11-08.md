# Search glass and perimeter motion — 8 November 2026

## Reference access and observations

The eight submitted links contain seven unique pins. The web reader could not open the short links; a normal public browser resolved them. Frames were inspected across the clips, but Pinterest's sign-in panel obscured portions of several players. This is a review of the accessible portions, not a claim of an unobstructed full-video review. No login gate was removed or bypassed. Reference artwork/video is not shipped with Stocklumo.

| Pin | Accessible visual evidence | Application |
| --- | --- | --- |
| [4ShPPoJJp](https://www.pinterest.com/pin/704250460527826884/) | Search HUD with a multicolor illuminated outline; partially obscured by signup UI | Luminous contour, adapted to mint/teal/blue rather than rainbow |
| [4YIgHFIaq](https://www.pinterest.com/pin/14073817580408890/) | Soft halo traveling around a microphone circle; partial player view | Localized halo rather than washing the entire field with neon; no unsupported voice feature |
| [5FmPWM833](https://www.pinterest.com/pin/1030339221004936359/) | “Let me glow” pill, narrow bright highlights crossing its upper/lower edges | Two traveling highlights with short tails |
| [3NP9xdJDp](https://www.pinterest.com/pin/816629344971849642/) | Dark translucent capsule over moving light shapes; bevel and material comparison | Smoked/frosted glass, subtle inner highlights and curved silhouette |
| [76pdOuXqP](https://www.pinterest.com/pin/1097611740450427620/) | Search typing/focus with restrained cyan edge light | Existing clear, focus and suggestion behavior remains immediate; no fake typing text |
| [1kyefADSP](https://www.pinterest.com/pin/1104085664921146618/) | Prompt field with contrasting warm/cool corner halos | Separate teal/cool-blue light sources; existing financial search wording retained |
| [6fYGXmaMw](https://www.pinterest.com/pin/930204498047048551/) | This resolves to a jobs-related title, with a small illuminated search/prompt component in the clip | Component treatment only; no unrelated content or cursor animation copied |

Browser captures and contact sheets: `output/playwright/pin-study/`. Some frames include Pinterest's overlay, as documented above.

## Final implementation

- Shared hero/header search is capsule-shaped with a subtle bevel, readable opaque glass and the existing magnifier/Clear action.
- `search-orbit` supplies a complete 1.5px static boundary. Two small light strips follow the actual rounded perimeter using CSS `offset-path` / `offset-distance`, eight seconds per loop, with trails half a cycle apart. This avoids the uneven apparent speed and tiny central hotspots of a rotating conic field on a long rectangle.
- A separate, noninteractive `search-aura` uses the same paths and a small constant blur, producing a localized moving halo. The header version is deliberately quieter than the hero. Blur, dimensions, text and financial values never animate.
- Unsupported motion paths receive a static glass field and boundary. Both decorative layers pause during editing, privacy choices, shared motion pause, reduced motion, hidden/pagehide and offscreen states. Forced-colors mode removes them and gives the input a native-color border.
- Query logic, results, IME, stale-response cancellation, clear/focus and keyboard navigation remain unchanged. No new provider requests, packages, fake submit/voice actions, hero edits or backend changes.
- Native motion-path semantics were checked against [MDN offset-path](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/offset-path) and [offset-distance](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/offset-distance), and path positions were verified in Chromium and WebKit. No claim is made of measuring a guaranteed frame rate on every physical phone.

Modified: `_StockSearch.cshtml`, `wwwroot/css/search.css`, `tests/e2e/search-signal.spec.cjs`, `DESIGN.md`, and this report. Existing `motion.js` remains the pause/visibility owner without changes in this follow-up.

## Verification and delivery

- JavaScript unit suite: **80 passed**.
- Release solution build: **0 warnings, 0 errors**.
- Final browser verification: **30 passed** in 1.2 minutes (`output/search-refinement/browser-final.txt`); exercises both themes, desktop Chromium, Android Chromium and iPhone WebKit, motion progression, fixed input geometry, keyboard selection, clear/cancellation, IME, reduced motion, shared pause, offscreen pause, forced colors, accessibility and overflow.
- Strict frontend audit: **0 findings**. Design-document lint: **0 errors**, with the same 10 pre-existing orphan-token warnings.
- Local preview: `http://127.0.0.1:5154/?review=search-perimeter-20261108`.
- No commit, push or production deployment performed.
