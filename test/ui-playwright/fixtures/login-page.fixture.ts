import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/login.page';

type TestArgs = {
  loginPage: LoginPage;
};

export const test = base.extend<TestArgs>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.open();
    await loginPage.checkPageOpenned();
    await use(loginPage);
  },
});
