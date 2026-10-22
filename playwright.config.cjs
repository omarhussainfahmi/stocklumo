const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  workers: 2,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: [['list'], ['html', { open: 'never' }], ['json', { outputFile: 'output/playwright/results.json' }]],
  use: {
    baseURL: 'http://127.0.0.1:5161',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  projects: [
    { name: 'desktop-chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'android-chromium', use: { ...devices['Pixel 7'] } },
    { name: 'iphone-webkit', use: { ...devices['iPhone 13'] } },
  ],
  webServer: {
    command: `"${process.env.STOCKLUMO_DOTNET || 'dotnet'}" run --project MarketDesk --no-launch-profile --urls http://127.0.0.1:5161`,
    url: 'http://127.0.0.1:5161/health',
    reuseExistingServer: false,
    timeout: 120000,
    // Explicitly override local User Secrets; browser fixtures never call Finnhub.
    env: { ASPNETCORE_ENVIRONMENT: 'Development', Finnhub__ApiKey: ' ', Cloudflare__WebAnalyticsToken: ' ', Sentry__Enabled: 'false', RENDER: 'false' },
  },
});
