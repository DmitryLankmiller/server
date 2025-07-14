import { test } from '../../fixtures/login-page.fixture';
import { userEmail } from '../../utils/user-data';

test(`Fail during login with wrong password`, async ({ loginPage }) => {
  await test.step('Ввести почту пользователя', async () => await loginPage.fillEmail(userEmail));
  await test.step(
    'Ввести неверный пароль',
    async () => await loginPage.fillPassword('Wrong password'),
  );
  await test.step('Нажать на кнопку логина', async () => await loginPage.clickSubmitLoginBtn());
  await test.step(
    'Проверить, что текст о неверном пароле или почте отображается',
    async () => await loginPage.expectWrongPasswordOrEmailTextToBeVisible(),
  );
});
