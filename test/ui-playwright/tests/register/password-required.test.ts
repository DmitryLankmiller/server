import { test } from '../../fixtures/register-page.fixture';

test(`Check that password is required during register`, async ({ registerPage }) => {
  await test.step('Заполнить почту', async () => await registerPage.fillEmail('email@email.ru'));
  await test.step('Заполнить возраст', async () => await registerPage.fillAge('25'));
  await test.step('Нажать на кнопку подтверждения регистрации', async () =>
    await registerPage.clickSubmitRegisterBtn());
  await test.step('Проверить, что поле пароль отмечено, как необходимое', async () =>
    await registerPage.expectPasswordRequiredTextToBeVisible());
});
