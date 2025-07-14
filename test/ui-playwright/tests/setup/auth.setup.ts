import { test as setup } from '../../fixtures/login-page.fixture';
import { storageStateFile, userEmail, userPassword } from '../../utils/user-data';

setup('Log in', async ({ loginPage }) => {
  await setup.step('Заполнить email', async () => await loginPage.fillEmail(userEmail));
  await setup.step('Заполнить пароль', async () => await loginPage.fillPassword(userPassword));
  await setup.step('Подтвердить логин и перейти на страницу профиля', async () => {});
  const profilePage = await loginPage.submitLogin();
  await profilePage.checkPageOpenned();
  await setup.step(
    'Сохранить состояние браузера',
    async () => await profilePage.saveStorageState(storageStateFile),
  );
});
