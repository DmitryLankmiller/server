import { test } from '../../fixtures/login-page.fixture';
import { userPassword } from '../../utils/user-data';

test(`Check that email is required during login "@allure.id=123"`, async ({ loginPage }) => {
  await test.step('Заполнить пароль', async () => await loginPage.fillPassword(userPassword));

  await test.step('Нажать на кнопку логина', async () => await loginPage.clickSubmitLoginBtn());

  await test.step('Проверить, что появилось сообщение об ошибке о необходимости заполнить email', async () =>
    await loginPage.expectEmailRequiredTextToBeVisible());
});
