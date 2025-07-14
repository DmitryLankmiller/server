import { expect } from '@playwright/test';
import { test } from '../../fixtures/register-page.fixture';

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
    await registerPage.fillEmail(wrongEmail);
    await registerPage.fillPassword('password');
    await registerPage.fillAge('25');
    await registerPage.clickSubmitRegisterBtn();

    const wrongEmailText = await registerPage.expectWrongEmailTextToBeVisibleAndGetText();
    expect(wrongEmailText).toEqual('Неправильный email-адрес');
  }),
);
