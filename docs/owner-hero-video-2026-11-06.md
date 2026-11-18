# Owner-supplied hero videos — 6 November 2026

The two Desktop MP4s are installed as `wwwroot/media/hero/owner-{dark,light}-60fps.mp4`. Original filenames and content are preserved on Desktop. Installed copies are byte-identical (SHA-256 evidence in `output/supplied-video/copy-proof.json`). Both sources are H.264, 1890×1080, 60 fps, 20.0 seconds. No re-encoding, resampling, trimming, speed changes or resolution reduction was performed. Dark is 10,041,092 bytes; light is 9,072,266 bytes. Posters are extracted from each source's first frame.

The existing hero loader is reused with the new same-origin MP4 paths. Native `muted autoplay loop playsinline` playback repeats the full original clip. The current theme alone is loaded. The browser controls actual decode/display cadence; its reported decoded dimensions can differ from the source dimensions (observed in WebKit). Original file integrity is checked independently rather than changing the asset to satisfy a browser-reported size.

Copy is centered in the lower hero area, with a wider centered search and centered actions. Full-bleed footage remains behind the HTML, with a gradual theme-paper overlay protecting text contrast. Mobile uses the same background composition and a smaller type scale. Headline wording, supporting copy, search behavior, links and remaining page content are retained. The original header logo is untouched.

There is no arbitrary playback time limit. Existing user pause, reduced-motion, Save-Data, offscreen and hidden-document behavior remains: the page cannot force playback against browser autoplay policies or accessibility preferences. Static posters keep the hero usable when playback is unavailable. The previously provided static images and authored film assets remain archived and are not downloaded by this hero.

Modified: `Views/Market/Index.cshtml`, `Views/Shared/_SiteHead.cshtml`, `wwwroot/css/hero.css`, `wwwroot/js/hero-video.js`, hero/mobility test expectations and DESIGN.md. No backend/data calculations or provider integration changed.

Verification: Release build succeeded with zero warnings/errors; 80 JavaScript tests passed; six targeted browser tests passed across desktop Chromium, Android Chromium and iPhone WebKit. Browser tests exercise both themes, actual 20-second loop crossing, controls/search, overlay centering, no overflow, pause/resume and reduced-motion no-download behavior. An initial WebKit size assertion was replaced by an aspect-ratio check because its native decoder reported scaled dimensions; the exact original dimensions and 60 fps remain verified from file metadata. Evidence and captures are under `output/supplied-video/` and Playwright test output.

Local implementation only; no production deployment performed.
