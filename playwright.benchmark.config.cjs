const base = require('./playwright.config.cjs');
module.exports = { ...base, testDir: './tests/performance', testMatch: '**/*.bench.cjs', workers: 1,
  reporter: [['list']], use: { ...base.use, trace: 'off', screenshot: 'only-on-failure' } };
