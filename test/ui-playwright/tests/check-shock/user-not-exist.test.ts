import { test } from '../../fixtures/check-shock-page.fixute';

test('Check user not exists and shown text is "Ты ещё не в ШОКе"', async ({ checkShockPage }) => {
  await checkShockPage.fillEmail("NotExist");
  await checkShockPage.clickCheckShockBtn();

  await checkShockPage.checkNotShockedTextIsVisible();
});
