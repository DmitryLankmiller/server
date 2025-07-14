import { expect } from '@playwright/test';
import { test } from '../../fixtures/register-page.fixture';
import * as allure from 'allure-js-commons';

const wrongPasswordsAndErrorMessages = [
  { wrongPassword: '1', errorMessage: 'Пароль должен содержать минимум 5 символов' },
  { wrongPassword: 'JDEF', errorMessage: 'Пароль должен содержать минимум 5 символов' },
  {
    wrongPassword: '123456789012345678901',
    errorMessage: 'Пароль должен содержать максимум 20 символов',
  },
  {
    wrongPassword: 'foobarfoobarfoobarfoobarfoobarfoobarfoobarfoobar57',
    errorMessage: 'Пароль должен содержать максимум 20 символов',
  },
].forEach(({ wrongPassword, errorMessage }) =>
  test(`Check that password: ${wrongPassword} is not valid`, async ({ registerPage }) => {
    await allure.parameter('wrongPassword', wrongPassword);
    await allure.parameter('expectedErrorMessage', errorMessage);

    await test.step('Заполнить почту', async () => await registerPage.fillEmail('test@mail.ru'));
    await test.step('Заполнить пароль некорретным значением', async () =>
      await registerPage.fillPassword(wrongPassword));
    await test.step('Заполнить возраст', async () => await registerPage.fillAge('25'));
    await test.step('Нажать на кнопку подтверждения регистрации', async () =>
      await registerPage.clickSubmitRegisterBtn());
    await test.step(`Проверить, что появилось сообщение с ошибкой "${errorMessage}"`, async () => {
      const wrongPasswordText = await registerPage.expectWrongPasswordTextToBeVisibleAndGetText();
      expect(wrongPasswordText).toEqual(errorMessage);
    });
  }),
);
