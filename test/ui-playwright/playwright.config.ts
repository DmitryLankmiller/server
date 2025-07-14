import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */

const testsWithoutAuth = ['**/profile/*.test.ts', '**/check-shock/*.test.ts', '**/login/*.test.ts'];

export default defineConfig({
  timeout: 100 * 60 * 1000,
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: false,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [['html', { open: 'never' }]],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    headless: true,
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: 'https://yavshok.ru/',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'auth-setup',
      use: { ...devices['Desktop Chrome'] },
      testMatch: '**/*.setup.ts',
    },
    {
      name: 'with-auth',
      use: { ...devices['Desktop Chrome'], storageState: './tests/setup/.auth/auth.json' },
      dependencies: ['auth-setup'],
      testIgnore: testsWithoutAuth,
    },
    {
      name: 'without-auth',
      use: { ...devices['Desktop Chrome'] },
      testMatch: testsWithoutAuth,
    },
  ],
});
