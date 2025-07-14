import { expect } from '@playwright/test';
import { test } from '../../fixtures/edit-profile-page.fixture';

test(`Success change name`, async ({ editProfilePage }) => {
  const newName = 'RandomName';
  await test.step('Ввести и сохранить новое имя', async () => {
    await editProfilePage.fillName('RandomName');
    await editProfilePage.saveName();
  });

  await test.step('Открыть страницу профиля', async () => {});
  const profilePage = await editProfilePage.clickEditCancelBtn();

  await test.step('Проверить, что имя на странице профиля соответсвует новому имени', async () =>
    expect(await profilePage.getUserName()).toEqual(newName));

  await test.step('Вернуться на страницу регистрации и сохранить стандартное имя пользователя', async () => {
    editProfilePage = await profilePage.clickEditProfileBtn();
    await editProfilePage.fillName('FooBar');
    await editProfilePage.saveName();
  });
});
