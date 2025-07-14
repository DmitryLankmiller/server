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

const testsWithoutAuth = [
  '**/profile/*.test.ts',
  '**/check-shock/*.test.ts',
  '**/login/*.test.ts',
  '**/register/*.test.ts',
];

export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [['html', { open: 'never' }], ['allure-playwright']],
  use: {
    headless: true,
    baseURL: 'https://yavshok.ru/',

    trace: 'on-first-retry',
  },

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
