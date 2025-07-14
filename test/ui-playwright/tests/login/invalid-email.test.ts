import { test } from '../../fixtures/login-page.fixture';
import { userPassword } from '../../utils/user-data';

test(`Fail during login with wrong email`, async ({ loginPage }) => {
  await loginPage.fillEmail('WrongEmail@email.wrong');
  await loginPage.fillPassword(userPassword);
  await loginPage.clickSubmitLoginBtn();

  await loginPage.expectWrongPasswordOrEmailTextToBeVisible();
});
