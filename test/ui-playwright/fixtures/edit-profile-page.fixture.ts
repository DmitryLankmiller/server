import { test as base } from './profile-page.fixture';
import { EditProfilePage } from '../pages/edit-profile.page';

type TestArgs = {
  editProfilePage: EditProfilePage;
};

export const test = base.extend<TestArgs>({
  editProfilePage: async ({ profilePage }, use) => {
    const editProfilePage = await profilePage.clickEditProfileBtn();
    await editProfilePage.checkPageOpenned();
    await use(editProfilePage);
  },
});
