/* Original decorative geometry. It represents no market prices or activity. */
(() => {
  'use strict';
  const main = document.getElementById('main');
  if (!main) return;
  const field = document.createElement('div');
  field.className = 'market-atmosphere'; field.setAttribute('aria-hidden', 'true');
  // Static, locally authored geometry; only its two groups' transforms animate.
  field.innerHTML = `<svg class="atmosphere-scene" viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice" focusable="false">
    <g class="field-structure" fill="none">
      <path d="M0 145H340L510 315H1600M0 820H780L1010 590H1600M180 0V180L400 400V1000M1420 0V420L1190 650V1000"/>
      <path d="M0 154H336L506 324H1600M0 829H784L1014 599H1600"/>
      <circle cx="1260" cy="470" r="380"/><circle cx="1260" cy="470" r="290"/>
      <path d="M0 970L850 120M0 995L875 120M1140 0V1000M1380 0V1000"/>
    </g>
    <g class="field-orbit" fill="none">
      <ellipse cx="1260" cy="470" rx="450" ry="175" transform="rotate(-28 1260 470)"/>
      <ellipse cx="1260" cy="470" rx="420" ry="140" transform="rotate(48 1260 470)"/>
      <circle cx="880" cy="300" r="5"/><circle cx="1530" cy="680" r="4"/>
    </g>
    <g class="field-current" fill="none">
      <path d="M0 630H320L530 420H820M580 840H1030L1180 690H1600"/>
      <circle cx="320" cy="630" r="4"/><circle cx="530" cy="420" r="4"/><circle cx="1180" cy="690" r="4"/>
      <path d="M105 242v18m-9-9h18M700 748v18m-9-9h18M1490 125v18m-9-9h18"/>
    </g>
  </svg>`;
  main.prepend(field);
  const intro = document.body.dataset.page === 'home' ? document.querySelector('.intro') : null;
  function positionField() {
    const start = intro ? Math.max(0, Math.ceil(intro.getBoundingClientRect().bottom - main.getBoundingClientRect().top)) : 0;
    const value = `${start}px`;
    if (field.style.getPropertyValue('--atmosphere-start') !== value) field.style.setProperty('--atmosphere-start', value);
  }
  positionField();
  if (intro && typeof ResizeObserver !== 'undefined') {
    const observer = new ResizeObserver(positionField); observer.observe(intro); observer.observe(main);
  } else if (intro) window.addEventListener('resize', positionField, { passive: true });
  const preference = matchMedia('(prefers-reduced-motion: reduce)');
  const buttons = [...document.querySelectorAll('[data-background-motion]')];
  let paused = false;
  try { paused = sessionStorage.getItem('stocklumo.motionPaused') === 'true'; } catch { /* Storage can be blocked; retain the in-memory preference. */ }
  function sync() {
    field.dataset.paused = String(paused || preference.matches || document.hidden);
    document.dispatchEvent(new CustomEvent('stocklumo:motionchange', { detail: { paused: paused || preference.matches } }));
    for (const button of buttons) {
      button.textContent = preference.matches ? 'Background motion off' : paused ? 'Resume background motion' : 'Pause background motion';
      button.setAttribute('aria-pressed', String(paused || preference.matches));
      button.disabled = preference.matches;
      button.title = preference.matches ? 'Follows your device’s reduced-motion setting.' : 'Decorative background only; market updates continue.';
    }
  }
  function setPaused(value) {
    if (typeof value !== 'boolean') return;
    paused = value;
    try { sessionStorage.setItem('stocklumo.motionPaused', String(paused)); } catch { /* The in-memory preference still applies for this visit. */ }
    sync();
  }
  window.StocklumoMotion = Object.freeze({ setPaused, isPaused: () => paused || preference.matches });
  for (const button of buttons) {
    button.hidden = false;
    button.onclick = () => setPaused(!paused);
  }
  preference.addEventListener?.('change', sync);
  document.addEventListener('visibilitychange', sync);
  sync();
})();
