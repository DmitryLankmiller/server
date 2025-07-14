import { test } from '../../fixtures/check-shock-page.fixute';

test('Check user not exists and shown text is "Ты ещё не в ШОКе"', async ({ checkShockPage }) => {
  await test.step('Заполнить поле email несуществующей почтой', async () =>
    await checkShockPage.fillEmail('NotExist'));
  await test.step('Нажать на кнопку проверки Шоковости', async () =>
    await checkShockPage.clickCheckShockBtn());

  await test.step('Проверить, что отображается текст "Ты ещё не в ШОКе!"', async () =>
    await checkShockPage.checkNotShockedTextIsVisible());
});
