// Runs before styles so a saved theme is applied before the first painted frame.
(() => {
  let theme = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  try { const saved = localStorage.getItem('stocklumo.theme'); if (saved === 'light' || saved === 'dark') theme = saved; } catch { /* Storage can be blocked; retain the in-memory preference. */ }
  document.documentElement.dataset.theme = theme;
})();
