import { expect } from '@playwright/test';
import { test } from '../../fixtures/login-page.fixture';
import { userEmail, userPassword } from '../../utils/user-data';
import * as allure from 'allure-js-commons';

[
  {
    age: 0,
    status: 'Ты молоденький котик',
  },
  {
    age: 5,
    status: 'Ты молоденький котик',
  },
  {
    age: 21,
    status: 'Ты молоденький котик',
  },
  {
    age: 22,
    status: 'Ты взрослый котик',
  },
  {
    age: 50,
    status: 'Ты взрослый котик',
  },
  {
    age: 68,
    status: 'Ты взрослый котик',
  },
  {
    age: 69,
    status: 'Ты старый котик',
  },
  {
    age: 75,
    status: 'Ты старый котик',
  },
  {
    age: 99,
    status: 'Ты старый котик',
  },
].forEach(({ age, status }) =>
  test(`Check user status is "${status}" with age: ${age}`, async ({ loginPage }) => {
    await allure.parameter('age', age.toFixed(0));
    await allure.parameter('status', status);
    await test.step('Мок запроса возраста с бэка', async () => {
      await loginPage.getPage().route('*/**/auth/login', async (route) => {
        const response = await route.fetch();
        const json = await response.json();
        json['user']['age'] = age;
        await route.fulfill({ response, json });
      });
    });
    await test.step('Заполнить email', async () => await loginPage.fillEmail(userEmail));
    await test.step('Заполнить пароль', async () => await loginPage.fillPassword(userPassword));
    await test.step('Подтвердить логин и перейти на страницу профиля', async () => {});
    const profilePage = await loginPage.submitLogin();
    await profilePage.checkPageOpenned();
    await test.step('Проверить, что имя пользователя совпадает с мокой', async () =>
      expect(await profilePage.getUserStatus()).toEqual(status));
  }),
);
