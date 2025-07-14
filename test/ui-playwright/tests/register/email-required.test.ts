import { test } from '../../fixtures/register-page.fixture';

test(`Check that email is required during register`, async ({ registerPage }) => {
  await test.step('Заполнить пароль', async () => await registerPage.fillPassword('password'));
  await test.step('Заполнить возраст', async () => await registerPage.fillAge('25'));
  await test.step('Нажать на кнопку подтверждения регистрации', async () =>
    await registerPage.clickSubmitRegisterBtn());
  await test.step('Проверить, что поле почты отмечено, как необходимое', async () =>
    await registerPage.expectEmailRequiredTextToBeVisible());
});
