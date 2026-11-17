# Animation tooling installation — 29 October 2026

Installed for the planned original Stocklumo 3D hero:

- Project dependencies: `three` 0.186.1 and `gsap` 3.15.0, pinned exactly in `package.json` and `package-lock.json`.
- ScrollTrigger is included in GSAP; it is not a separate package.
- Official Codex skills: `gsap-core`, `gsap-timeline`, `gsap-scrolltrigger`, `gsap-performance`, installed under `C:/Users/pc/.codex/skills/` using the skill-installer helper from `greensock/gsap-skills` revision `aed9cfd3277740755f6bfc1155c7aa645403b760`.
- Skills become available on the next turn. Other framework-specific GSAP skills were not needed for this Razor/vanilla JavaScript application.

Verification: npm reported zero known vulnerabilities at installation. Module smoke checks imported Three.js, SVGLoader, GSAP and ScrollTrigger successfully and constructed/disposed an extrusion geometry. All 63 existing frontend unit tests passed. Logs: `output/animation-tooling/`.

These are development-ready dependencies, not a deployed hero. No JavaScript library is loaded into the existing pages yet. The current .NET-only Docker build remains unchanged; when the hero implementation begins, its browser module and self-hosted dependency bundle must be integrated into publishing and verified. Existing website appearance, logo and behavior remain unchanged by this installation. No deployment or paid service subscription was performed.

Design brief: `docs/3d-landing-direction-2026-10-29.md`.
