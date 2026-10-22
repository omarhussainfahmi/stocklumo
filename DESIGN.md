# Stocklumo design system

Approved visual direction: the owner's navy Market Observatory reference, selected on 22 October 2026. The existing Stocklumo ribbon and wordmark assets are preserved. This document records the implementation, not a new product brief.

## Foundations

- Dark: page `#00152e`, panels `#021c38`, supporting surfaces `#062643`, dividers `#204565`, text `#eef6ff`, supporting text `#a6c1de`, positive/action mint `#22e6b0`, negative `#ff8196`.
- Light: page `#e1e8ef`, panels `#f5f8fc`, supporting surfaces `#d5e0eb`, dividers `#aec1d2`, text `#09263f`, supporting text `#49627a`, positive green `#006b50`, negative `#b53348`.
- Manrope for UI and financial values, with tabular numerals. Locally hosted Latin WOFF2 weights 400, 600, 700 and 800 avoid remote font requests and inconsistent variable-font rendering in the tested WebKit environment. The brand retains its original system font treatment and original SVG marks.
- Body 14px / 1.6; form/search controls and primary interactions retain comfortable target sizes. Financial values use weight and alignment, not decorative effects, for emphasis.
- Fine borders, 8–10px control/panel corners and restrained hover feedback. No animated chart ornaments or fabricated sparklines.
- Shared colors, typography, inputs, tables, chart surfaces and empty states apply to dashboard, markets, stock details, watchlist, news, screener, comparison, virtual portfolio, earnings and information pages.

## Composition

- Sticky header precedes the existing independent eight-company ticker. Non-home market pages have one header search; the homepage retains its prominent existing search and tall introduction.
- Research navigation and market/connection status share one compact toolbar on desktop. Existing mobile navigation remains keyboard accessible.
- Stock details: company identity and quote, full-width interactive price chart, compact quote/range band, then watchlist and company profile in adjacent panels. News remains a separate working section.
- The same watchlist partial serves stock pages and other routes without duplicate IDs. Existing add/remove/reorder controls, timestamps and browser-local persistence remain available.
- Narrow layouts stack company context and metrics; tables scroll within their panels. Existing native date containment and mobile menu behavior are retained.
- Decorative section numbering is removed. Financial and provider labels remain when they convey scope or freshness.

## Data integrity and deliberate differences from the concept

The reference explicitly labels its candles and overlays as illustrations. Production never uses that raster chart, hard-coded quotes, fabricated candles, volume, indicators, holdings, descriptions, headlines or saved stocks. Historical range buttons remain hidden when the provider does not return usable history. Technical Analysis stays disabled.

The existing SVG session chart remains interactive and can show one observation, multiple observed trades or genuine historical data when available. Empty and single-observation plots are compact; multi-observation plots use the larger analytical layout. Horizontal range tracks use the existing validated provider bounds and current quote. The 52-week endpoints now appear in that range section instead of duplicate statistics tiles. Company fields remain limited to the current provider profile.

All stock logos use a fixed map to local brand icons; unknown symbols receive no invented brand mark. No provider-supplied image URL is loaded. Company descriptions, headquarters and unsupported fields from the concept are intentionally omitted. Keep connection health separate from quote freshness.

## Assets and maintenance

- `MarketDesk/wwwroot/fonts/`: Manrope Latin static WOFF2 files from `@fontsource/manrope` 5.3.0; SIL Open Font License in `OFL-Manrope.txt`. [Manrope](https://fonts.google.com/specimen/Manrope).
- `MarketDesk/wwwroot/images/icons/`: selected Bootstrap Icons 1.13.1; MIT license in `LICENSE.txt`. [Bootstrap Icons](https://icons.getbootstrap.com/). Only local files required by the interface are included.
- No frontend runtime package or chart dependency was added. The only server policy adjustment permits same-origin fonts; external fonts and image sources remain blocked.
- Preserve original logo files. Use `_StockSearch` and `_Watchlist` for repeated UI, the existing `market.css` tokens for themes, and the existing SVG chart machinery for data graphics.
- Test both themes and phone/desktop layouts when changing components. Browser fixture financial data is synthetic, isolated to tests, and never shipped to visitors.
