const js = require('@eslint/js');
const globals = require('globals');

module.exports = [
  // Installed agent skills are third-party tooling, not application source.
  { ignores: ['.agents/skills/**', 'node_modules/**', '**/bin/**', '**/obj/**', 'output/**', 'playwright-report/**', 'test-results/**', '.playwright-cli/**', 'MarketDesk/wwwroot/js/generated/**'] },
  js.configs.recommended,
  {
    files: ['**/*.js', '**/*.cjs'],
    languageOptions: { globals: { ...globals.node } },
  },
  {
    files: ['MarketDesk/wwwroot/js/**/*.js', 'frontend/**/*.js', 'design/**/*.js', 'tests/e2e/**/*.cjs', 'tests/performance/**/*.cjs', 'tools/render-hero-film.cjs'],
    languageOptions: { globals: { ...globals.browser, ...globals.node }, sourceType: 'module' },
  },
];
