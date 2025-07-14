import { expect } from '@playwright/test';
import { test } from '../../fixtures/check-shock-page.fixute';

test('Check shock button becomes enabled after filling email and disabling if email is empty', async ({
  checkShockPage,
}) => {
  await checkShockPage.fillEmail('Smth');
  expect(await checkShockPage.isCheckShockBtnEnabled()).toBeTruthy();

  await checkShockPage.clearEmail();
  expect(await checkShockPage.isCheckShockBtnEnabled()).toBeFalsy();
});
