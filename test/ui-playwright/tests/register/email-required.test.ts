import { test } from '../../fixtures/register-page.fixture';

test(`Check that email is required during register`, async ({ registerPage }) => {
  await registerPage.fillPassword('password');
  await registerPage.fillAge('25');
  await registerPage.clickSubmitRegisterBtn();

  await registerPage.expectEmailRequiredTextToBeVisible();
});
