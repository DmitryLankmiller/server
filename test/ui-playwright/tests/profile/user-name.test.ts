import { expect } from '@playwright/test';
import { test } from '../../fixtures/login-page.fixture';
import { userEmail, userPassword } from '../../utils/user-data';
import * as allure from 'allure-js-commons';

[
  'FooBar',
  'N&FG#*&Ukj*(H#F(@UF',
  '123',
  '',
  'ZZZZZZZZOZZZZZZZZOZZZZZZZZOZZZZZZZZOZZZZZZZZOZZZZZZZZOZZZZZZZZOZZZZZZZZOZZZZZZZZOZZZZZZZZOZZZZZZZZOZZZZZZZZOZZZZZZZZOZZZZZZZZOZZZZZZZZOZZZZZZZZO',
].forEach((name) =>
  test(`Check user name is "${name}"`, async ({ loginPage }) => {
    await allure.parameter('name', name);
    await test.step('Мок запроса имени с бэка', async () => {
      await loginPage.getPage().route('*/**/auth/login', async (route) => {
        const response = await route.fetch();
        const json = await response.json();
        json['user']['name'] = name;
        await route.fulfill({ response, json });
      });
    });
    await test.step('Заполнить email', async () => await loginPage.fillEmail(userEmail));
    await test.step('Заполнить пароль', async () => await loginPage.fillPassword(userPassword));
    await test.step('Подтвердить логин и перейти на страницу профиля', async () => {});
    const profilePage = await loginPage.submitLogin();
    await profilePage.checkPageOpenned();
    await test.step('Проверить, что имя пользователя совпадает с мокой', async () =>
      expect(await profilePage.getUserName()).toEqual(name));
  }),
);
