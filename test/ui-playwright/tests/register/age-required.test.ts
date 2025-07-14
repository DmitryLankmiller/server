import { test } from '../../fixtures/register-page.fixture';

test(`Check that age is required during register`, async ({ registerPage }) => {
  await test.step('Заполнить почту', async () => await registerPage.fillEmail('email@email.ru'));
  await test.step('Заполнить пароль', async () => await registerPage.fillPassword('password'));
  await test.step('Нажать на кнопку подтверждения регистрации', async () =>
    await registerPage.clickSubmitRegisterBtn());
  await test.step('Проверить, что поле возраста отмечено, как необходимое', async () =>
    await registerPage.expectAgeRequiredTextToBeVisible());
});
