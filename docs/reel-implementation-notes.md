# Reel review and applicable changes - 21 October 2026

## Review limits and scope

All ten public Instagram reel pages were opened. The review used sampled video frames, visible on-screen text and accessible captions. Audio was not transcribed, and every frame was not inspected. The notes below distinguish observations from implementation decisions; they are not complete transcripts. Promotional claims, legal penalty amounts and suggested installations were not treated as established facts or instructions.

Stocklumo retains ASP.NET Core MVC, vanilla JavaScript, native SVG charts, its existing mint branding and both themes. No new dependencies, providers, database, authentication, payments or fabricated market data were added. Technical Analysis remains disabled.

## Sources and decisions

1. [Dashboard design showcase - code.xr](https://www.instagram.com/reel/DeoxA_vzRbo/): visible compact analytics panels, clear value hierarchy and consistent spacing. Applied the information hierarchy principle to compact mobile navigation, earnings controls and a visibly selected screener row. The showcased rewards/sales content, orange palette, assets and exact layout were not copied.

2. [Design workflow - petergriffin.ai](https://www.instagram.com/reel/DerxrOmTkCt/): caption promotes design skills, typography/interaction guidance, Figma and browser testing. Applied consistent existing components, explicit keyboard behavior and browser verification. No promoted skill or integration was installed just because it appeared in a reel.

3. [Design workflow - imaginetechz](https://www.instagram.com/reel/DevPIcApMj8/): accessible caption repeats several design-tool recommendations; sampled subtitles emphasize browser testing. Consolidated this with item 2 rather than introducing another styling system or test framework.

4. [App launch checks - adilet.fndr](https://www.instagram.com/reel/Ddi5_OkoiDa/): caption teases five checks and financial penalties; sampled footage includes written permission for promotional messages. The complete five-item list and jurisdiction-specific legal assertions were not verified. Stocklumo has no promotional messaging workflow. Existing privacy/terms pages, explicit analytics choice and real contact details remain; no unnecessary marketing form was added.

5. [Performance checklist - joshtheaiguy](https://www.instagram.com/reel/DdP1ySxAsxT/): visible advice includes API caching, image compression, code splitting, list pagination, lazy loading and avoiding redundant work. Confirmed a relevant bottleneck: earnings previously created every table row and announcement card, including cards inside closed days. Tables now render 25 rows initially, with 25/50/100-row pages. Announcement days render their first 25 cards only when opened and offer further batches. All returned records remain accessible, with no pagination refetches. Existing API caches, compression, system fonts and route-specific research script loading were preserved. Database indexing, connection pooling and load balancing are not changes justified by this database-free, single-service application.

6. [Engineering foundations - verycoolentrepreneur](https://www.instagram.com/reel/DZLDPGExR-1/): sampled whiteboard frames discuss frontend/backend boundaries, permissions, Git and caching. Detailed narration was not verified. Stocklumo already separates server-side provider access from UI logic and uses Git, validation and caches. No speculative database/RLS or account system was introduced.

7. [App Store submission - lincolndevine](https://www.instagram.com/reel/Dc_QIKNxLHe/): visible heading concerns Apple app rejection; one sampled point refers to payments. The entire rejection list was not transcribed. Native App Store requirements do not establish a need to add Apple login or in-app purchases to this browser application.

8. [Security checklist - securedbycasco](https://www.instagram.com/reel/DYiqd6pJ3d8/): accessible caption and visible prompt recommend server-side keys, input validation and limits on public endpoints. Stocklumo already protects provider keys and bounds requests. Added safe JSON feedback and a fixed-window Retry-After header when the existing public request budget is exhausted. Limits, authentication, HTTPS, CSP and proxy trust settings were not weakened. No exposure was established that would justify rotating credentials as part of this task.

9. [Planning documents - mikenwo.ai](https://www.instagram.com/reel/DevDk-Bt7BP/): visible heading references six planning documents; sampled labels establish a product requirements document and a UI/UX design brief. The other four titles were not verified and are not invented here. This document records the applicable requirements, implementation boundaries and verification rather than generating six empty planning files.

10. [Website launch checklist - yatesvids](https://www.instagram.com/reel/DcKiRe3TvdB/): visible checklist includes overflow, mobile navigation, links/buttons, titles, metadata, favicon, footer, 404, contact links, image optimization and form feedback. Those essentials were largely implemented in the preceding launch review. Added a disclosure-style mobile menu covering all eight working primary/research routes; ordinary links, Escape, outside dismissal and focus handling remain accessible. Search now supports Up/Down/Home/End and Escape, cancels dismissed requests and ignores late responses. Deliberate horizontal scrolling inside tables/tickers is retained; page overflow is checked separately.

## Requirements and design brief

- Preserve real prices, actual timestamps, provider limitations and current routes.
- Keep all earnings records reachable without building all corresponding DOM nodes on initial load. Counts describe the full returned dataset, not just the current page.
- Reduce the small-screen sticky header to one control row when collapsed. Expose the research routes inside the expanded mobile menu; keep the existing research navigation on larger screens. If JavaScript fails, existing navigation stays visible.
- Reuse existing surface, text, accent, focus and button variables. Selected screener rows use a subtle tint and mint inset marker in addition to the existing pressed state.
- Do not let a dismissed or obsolete stock search reopen a results panel. Preserve native links, Tab and Enter; supplement them with predictable result navigation.
- Return readable, non-sensitive rate-limit feedback without increasing quotas or changing provider requests.

## Verification

Release build: zero warnings and errors. Backend suite: 98 passed. Frontend suite: 55 passed. Commands: `dotnet build MarketDesk.slnx -c Release --no-restore`, `dotnet test MarketDesk.slnx -c Release`, `npm test` (the locally installed .NET runtime path is used in this workspace).

New coverage includes all 1,300 synthetic test records being reachable via table pagination; lazy day expansion and subsequent batches; no refetch on paging; result keyboard selection, canceled debounce and ignored late search responses; mobile menu routes, focus, Escape/outside dismissal and breakpoint reset; selected screener row; safe 429 response with retry guidance. Synthetic financial values exist only in tests.

Browser and production verification results are recorded in the README after deployment. A short reel review is not a certification of every security property, every phone or a two-second load guarantee. Render Free cold starts and provider historical-data restrictions remain.

Implementation references: [W3C disclosure navigation guidance](https://www.w3.org/TR/2021/NOTE-wai-aria-practices-1.2-20211129/examples/disclosure/disclosure-navigation-hybrid.html), [ASP.NET Core rate limiting](https://learn.microsoft.com/aspnet/core/performance/rate-limit?view=aspnetcore-9.0).
