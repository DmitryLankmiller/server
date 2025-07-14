import { test } from '../../fixtures/login-page.fixture';
import { userEmail } from '../../utils/user-data';

test(`Check that password is required during login`, async ({ loginPage }) => {
  await loginPage.fillEmail(userEmail);
  await loginPage.clickSubmitLoginBtn();

  await loginPage.expectPasswordRequiredTextToBeVisible();
});
