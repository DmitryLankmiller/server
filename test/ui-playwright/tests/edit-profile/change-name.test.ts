import { expect } from '@playwright/test';
import { test } from '../../fixtures/edit-profile-page.fixture';
import { userPassword } from '../../utils/user-data';
import { ProfilePage } from '../../pages/profile.page';

test(`Success change name`, async ({ editProfilePage }) => {
  const newName = 'RandomName';
  await editProfilePage.fillName('RandomName');
  await editProfilePage.saveName();
  const profilePage = await editProfilePage.clickEditCancelBtn();

  expect(await profilePage.getUserName()).toEqual(newName);

  editProfilePage = await profilePage.clickEditProfileBtn();
  await editProfilePage.fillName('FooBar');
  await editProfilePage.saveName();
});
