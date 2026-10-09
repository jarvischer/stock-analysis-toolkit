const { defineConfig } = require('@playwright/test');
module.exports = defineConfig({
  testDir: './tests', testMatch: '**/*.spec.cjs', timeout: 90000,
  workers: 1, reporter: 'list',
  use: { baseURL: 'http://127.0.0.1:4173', headless: true,
    launchOptions: process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH, args: ['--no-sandbox'] } : {} },
  webServer: {command:'node scripts/serve.mjs', url:'http://127.0.0.1:4173', reuseExistingServer: !process.env.CI},
});
