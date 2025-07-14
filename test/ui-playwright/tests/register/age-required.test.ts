import { test } from '../../fixtures/register-page.fixture';

test(`Check that age is required during register`, async ({ registerPage }) => {
  await registerPage.fillEmail('email@email.ru');
  await registerPage.fillPassword('password');
  await registerPage.clickSubmitRegisterBtn();

  await registerPage.expectAgeRequiredTextToBeVisible();
});
