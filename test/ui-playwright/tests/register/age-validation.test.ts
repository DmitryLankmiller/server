import { expect } from '@playwright/test';
import { test } from '../../fixtures/register-page.fixture';

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
    await registerPage.fillEmail('test@mail.ru');
    await registerPage.fillPassword('password');
    await registerPage.fillAge(wrongAge);
    await registerPage.clickSubmitRegisterBtn();

    const wrongAgeText = await registerPage.expectWrongAgeTextToBeVisibleAndGetText();
    expect(wrongAgeText).toEqual(errorMessage);
  }),
);
