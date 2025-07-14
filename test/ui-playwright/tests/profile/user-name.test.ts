import { expect } from '@playwright/test';
import { test } from '../../fixtures/login-page.fixture';
import { userEmail, userPassword } from '../../utils/user-data';

[
  'FooBar',
  'N&FG#*&Ukj*(H#F(@UF',
  '123',
  '',
  'ZZZZZZZZOZZZZZZZZOZZZZZZZZOZZZZZZZZOZZZZZZZZOZZZZZZZZOZZZZZZZZOZZZZZZZZOZZZZZZZZOZZZZZZZZOZZZZZZZZOZZZZZZZZOZZZZZZZZOZZZZZZZZOZZZZZZZZOZZZZZZZZO',
].forEach((name) =>
  test(`Check user name is "${name}"`, async ({ loginPage }) => {
    await loginPage.getPage().route('*/**/auth/login', async (route) => {
      const response = await route.fetch();
      const json = await response.json();
      json['user']['name'] = name;
      await route.fulfill({ response, json });
    });
    await loginPage.fillEmail(userEmail);
    await loginPage.fillPassword(userPassword);
    const profilePage = await loginPage.submitLogin();

    await profilePage.checkPageOpenned();
    expect(await profilePage.getUserName()).toEqual(name);
  }),
);
