import { expect } from '@playwright/test';
import { test } from '../../fixtures/edit-profile-page.fixture';
import { userPassword } from '../../utils/user-data';

test(`Check that name is required during editinh the profile`, async ({ editProfilePage }) => {
  await editProfilePage.clearName();
  await editProfilePage.clickEditSaveBtn();

  const nameRequiredText = await editProfilePage.expectNameRequiredTextToBeVisibleAndGetText();
  expect(nameRequiredText).toEqual('Name is required');
});
