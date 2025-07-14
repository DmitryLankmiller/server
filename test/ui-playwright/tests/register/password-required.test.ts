import { test } from '../../fixtures/register-page.fixture';

test(`Check that password is required during register`, async ({ registerPage }) => {
  await registerPage.fillEmail('email@email.ru');
  await registerPage.fillAge('25');
  await registerPage.clickSubmitRegisterBtn();

  await registerPage.expectPasswordRequiredTextToBeVisible();
});
