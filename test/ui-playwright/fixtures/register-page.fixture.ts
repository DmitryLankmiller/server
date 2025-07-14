import { test as base } from '@playwright/test';
import { RegisterPage } from '../pages/register.page';

type TestArgs = {
  registerPage: RegisterPage;
};

export const test = base.extend<TestArgs>({
  registerPage: async ({ page }, use) => {
    const registerPage = new RegisterPage(page);
    await registerPage.open();
    await registerPage.checkPageOpenned();
    await use(registerPage);
  },
});
