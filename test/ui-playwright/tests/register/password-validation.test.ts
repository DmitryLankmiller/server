import { expect } from '@playwright/test';
import { test } from '../../fixtures/register-page.fixture';

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
    await registerPage.fillEmail('test@mail.ru');
    await registerPage.fillPassword(wrongPassword);
    await registerPage.fillAge('25');
    await registerPage.clickSubmitRegisterBtn();

    const wrongPasswordText = await registerPage.expectWrongPasswordTextToBeVisibleAndGetText();
    expect(wrongPasswordText).toEqual(errorMessage);
  }),
);
