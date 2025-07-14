import { expect } from '@playwright/test';
import { test } from '../../fixtures/check-shock-page.fixute';

test('Check shock button becomes enabled after filling email and disabling if email is empty', async ({
  checkShockPage,
}) => {
  await test.step('Заполнить поле email', async () => await checkShockPage.fillEmail('Smth'));
  await test.step('Проверить, что кнопка проверка Шококовости активна', async () =>
    expect(await checkShockPage.isCheckShockBtnEnabled()).toBeTruthy(),
  );

  await test.step('Очистить поле email', async () => await checkShockPage.clearEmail());
  await test.step('Проверить, что кнопка проверка Шококовости неактивна', async () =>
    expect(await checkShockPage.isCheckShockBtnEnabled()).toBeFalsy(),
  );
});
