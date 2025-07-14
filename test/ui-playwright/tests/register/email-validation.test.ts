import { expect } from '@playwright/test';
import { test } from '../../fixtures/register-page.fixture';
import * as allure from 'allure-js-commons';

[
  'foo',
  'bar@',
  '123@mail',
  'foo@bar.',
  '@bar.com',
  'foo$bat@mail.ru',
  'foobat@ma%il.ru',
  'foobat@mail.ru      ',
  '    foobat@mail.ru',
  '      foobat@mail.ru     ',
].forEach((wrongEmail) =>
  test(`Check that email: ${wrongEmail} is not valid`, async ({ registerPage }) => {
    await allure.parameter('wrongEmail', wrongEmail);

    await test.step('Заполнить почту некорретным значением', async () =>
      await registerPage.fillEmail(wrongEmail));
    await test.step('Заполнить пароль', async () => await registerPage.fillPassword('password'));
    await test.step('Заполнить возраст', async () => await registerPage.fillAge('25'));
    await test.step('Нажать на кнопку подтверждения регистрации', async () =>
      await registerPage.clickSubmitRegisterBtn());
    await test.step('Проверить, что появилось сообщение с ошибкой "Неправильный email-адрес"', async () => {
      const wrongEmailText = await registerPage.expectWrongEmailTextToBeVisibleAndGetText();
      expect(wrongEmailText).toEqual('Неправильный email-адрес');
    });
  }),
);
