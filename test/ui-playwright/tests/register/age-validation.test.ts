import { expect } from '@playwright/test';
import { test } from '../../fixtures/register-page.fixture';
import * as allure from 'allure-js-commons';

[
  { wrongAge: '100', errorMessage: 'Возраст должен быть в пределах 0-99' },
  { wrongAge: '-1', errorMessage: 'Возраст должен быть положительным числом' },
  {
    wrongAge: '3.14',
    errorMessage: 'Возраст должен быть целым числом',
  },
  {
    wrongAge: '"3,14"',
    errorMessage: 'Возраст должен быть числом',
  },
  {
    wrongAge: 'A!@#$%^*(HDSF',
    errorMessage: 'Возраст должен быть числом',
  },
].forEach(({ wrongAge, errorMessage }) =>
  test(`Check that age: ${wrongAge} is not valid`, async ({ registerPage }) => {
    await allure.parameter('wrongAge', wrongAge);
    await allure.parameter('expectedErrorMessage', errorMessage);

    await test.step('Заполнить почту', async () => await registerPage.fillEmail('test@mail.ru'));
    await test.step('Заполнить пароль', async () => await registerPage.fillPassword('password'));
    await test.step('Заполнить возраст некорретным значением', async () =>
      await registerPage.fillAge(wrongAge));
    await test.step('Нажать на кнопку подтверждения регистрации', async () =>
      await registerPage.clickSubmitRegisterBtn());
    await test.step(`Проверить, что появилось сообщение с ошибкой "${errorMessage}"`, async () => {
      const wrongAgeText = await registerPage.expectWrongAgeTextToBeVisibleAndGetText();
      expect(wrongAgeText).toEqual(errorMessage);
    });
  }),
);
