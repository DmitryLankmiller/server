import { test as base } from '@playwright/test';
import { CheckShockPage } from "../pages/check-shock.page";

type TestArgs = {
  checkShockPage: CheckShockPage;
};

export const test = base.extend<TestArgs>({
  checkShockPage: async ({ page }, use) => {
    const checkShockPage = new CheckShockPage(page);
    await checkShockPage.open();
    await checkShockPage.checkPageOpenned();
    await use(checkShockPage);
  },
});
