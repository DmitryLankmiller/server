import { test } from '../../fixtures/check-shock-page.fixute';
import { userEmail } from '../../utils/user-data';

test('Check user exists and shown text is "Ты уже в ШОКе"', async ({ checkShockPage }) => {
  await checkShockPage.fillEmail(userEmail);
  await checkShockPage.clickCheckShockBtn();

  await checkShockPage.checkIsShockedTextIsVisible();
});
