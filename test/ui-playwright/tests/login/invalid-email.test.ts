import { test } from '../../fixtures/login-page.fixture';
import { userPassword } from '../../utils/user-data';

test(`Fail during login with wrong email`, async ({ loginPage }) => {
  await test.step('Ввести неверную почту', async () =>
    await loginPage.fillEmail('WrongEmail@email.wrong'));
  await test.step('Ввести пароль пользователя', async () =>
    await loginPage.fillPassword(userPassword));
  await test.step('Нажать на кнопку логина', async () => await loginPage.clickSubmitLoginBtn());
  await test.step('Проверить, что текст о неверном пароле или почте отображается', async () =>
    await loginPage.expectWrongPasswordOrEmailTextToBeVisible());
});
