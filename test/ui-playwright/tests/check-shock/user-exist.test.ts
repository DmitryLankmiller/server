import { test } from '../../fixtures/check-shock-page.fixute';
import { userEmail } from '../../utils/user-data';

test('Check user exists and shown text is "Ты уже в ШОКе"', async ({ checkShockPage }) => {
  await test.step(
    'Заполнить поле email почтой пользователя',
    async () => await checkShockPage.fillEmail(userEmail),
  );
  await test.step(
    'Нажать на кнопку проверки Шоковости',
    async () => await checkShockPage.clickCheckShockBtn(),
  );

  await test.step(
    'Проверить, что отображается текст "Ты в ШОКе!"',
    async () => await checkShockPage.checkIsShockedTextIsVisible(),
  );
});
