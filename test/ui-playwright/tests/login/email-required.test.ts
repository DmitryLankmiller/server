import { test } from '../../fixtures/login-page.fixture';
import { userPassword } from '../../utils/user-data';

test(`Check that email is required during login`, async ({ loginPage }) => {
  await loginPage.fillPassword(userPassword);
  await loginPage.clickSubmitLoginBtn();

  await loginPage.expectEmailRequiredTextToBeVisible();
});
