import { test } from '../../fixtures/login-page.fixture';
import { userEmail } from '../../utils/user-data';

test(`Fail during login with wrong password`, async ({ loginPage }) => {
  await loginPage.fillEmail(userEmail);
  await loginPage.fillPassword('Wrong password');
  await loginPage.clickSubmitLoginBtn();

  await loginPage.expectWrongPasswordOrEmailTextToBeVisible();
});
