import { expect } from '@playwright/test';
import { test } from '../../fixtures/edit-profile-page.fixture';

test(`Check that name is required during editinh the profile`, async ({ editProfilePage }) => {
  await test.step('Очистить текущее имя', async () => await editProfilePage.clearName());

  await test.step('Нажать на кнопку сохранения имени', async () =>
    await editProfilePage.clickEditSaveBtn());

  await test.step('Проверить, что появилось сообщение об ошибке с текстом "Name is required"', async () => {
    const nameRequiredText = await editProfilePage.expectNameRequiredTextToBeVisibleAndGetText();
    expect(nameRequiredText).toEqual('Name is required');
  });
});
