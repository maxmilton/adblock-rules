import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "test/e2e",
  testMatch: "test/e2e/**/*.spec.ts",
  snapshotPathTemplate: "test/e2e/__snapshots__/{testFilePath}/{arg}{ext}",
  failOnFlakyTests: !!process.env.CI,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  use: {
    acceptDownloads: false,
    contextOptions: { strictSelectors: true },
    locale: "en-US",
    offline: true, // no external network requests necessary
    timezoneId: "UTC",
    trace: "on-first-retry",
  },
  expect: {
    toHaveScreenshot: {
      scale: "device",
      stylePath: "test/e2e/screenshot.css",
      maxDiffPixelRatio: 0.02, // allow for font rendering variance
    },
  },
  webServer: {
    command: "bun run serve",
    port: 5000,
    reuseExistingServer: !process.env.CI, // throw in CI if port is taken
    // stdout: 'pipe',
  },
});
