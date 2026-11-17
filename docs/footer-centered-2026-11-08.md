# Centered footer groups — 8 November 2026

Per owner review, centered the footer's brand, middle navigation and contact within their respective areas. The desktop grid uses 1:2:1 columns; Explore, Research and the new Social media group share the middle area. The invitation, notes and lower utilities follow the same centered alignment. Tablet and phone layouts wrap without changing link order or minimum phone target sizes.

Moved the existing LinkedIn link into Social media and added the supplied Instagram URL, `https://www.instagram.com/gorgeous.omar/`. Added `tel:+966500411051` immediately below the email, displayed as `+966 50 041 1051`. Both social links use `noopener noreferrer`. Original logo, theme materials, content width, financial notes, consent and motion behavior remain unchanged.

Changed `_SiteFooter.cshtml`, the canonical footer block in `market.css`, footer browser assertions and design context. Verification evidence: `output/footer-centered/browser.txt`, `unit.txt`, `build.txt` and static audit. Screenshots reviewed in desktop dark mode, with responsive/theme checks covering desktop, Android and iPhone browser profiles. These are emulated browser profiles, not physical phones. No deployment, commit or push performed; local preview refreshed at port 5154.
