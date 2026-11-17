(() => {
  'use strict';
  const button = document.getElementById('study-theme');
  function update() {
    const style = getComputedStyle(document.documentElement);
    document.querySelectorAll('[data-token]').forEach(element => {
      element.style.backgroundColor = style.getPropertyValue(element.dataset.token).trim();
    });
    document.querySelectorAll('[data-color]').forEach(element => {
      element.textContent = style.getPropertyValue(element.dataset.color).trim();
    });
    button.textContent = document.documentElement.dataset.theme === 'dark' ? 'Light mode' : 'Dark mode';
  }
  button.addEventListener('click', () => {
    document.documentElement.dataset.theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    update();
  });
  update();
})();
