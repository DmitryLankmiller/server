import { test as base } from '@playwright/test';
import { ProfilePage } from '../pages/profile.page';

type TestArgs = {
  profilePage: ProfilePage;
};

export const test = base.extend<TestArgs>({
  profilePage: async ({ page }, use) => {
    const profilePage = new ProfilePage(page);
    await profilePage.open();
    await use(profilePage);
  },
});
