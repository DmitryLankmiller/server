import { test as setup } from '../../fixtures/login-page.fixture';
import { storageStateFile, userEmail, userPassword } from "../../utils/user-data";

setup('Log in', async ({ loginPage }) => {
  await loginPage.fillEmail(userEmail);
  await loginPage.fillPassword(userPassword);
  const profilePage = await loginPage.submitLogin();

  await profilePage.checkPageOpenned();

  await profilePage.saveStorageState(storageStateFile);
});
