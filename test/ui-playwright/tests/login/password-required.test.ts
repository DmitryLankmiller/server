import { test } from '../../fixtures/login-page.fixture';
import { userEmail } from '../../utils/user-data';
import * as allure from 'allure-js-commons';

test(`Check that password is required during login`, async ({ loginPage }) => {
  await test.step('Заполнить почту', async () => await loginPage.fillEmail(userEmail));

  await test.step('Нажать на кнопку логина', async () => await loginPage.clickSubmitLoginBtn());

  await test.step('Проверить, что появилось сообщение об ошибке о необходимости заполнить пароль', async () =>
    await loginPage.expectPasswordRequiredTextToBeVisible());
});
