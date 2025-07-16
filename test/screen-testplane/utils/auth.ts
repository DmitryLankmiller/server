import { LoginPage } from '../pages/login.page';

const userEmail = 'foobar@mail.ru';
const userPassword = 'foobar';

export const executeLoginStep = async (browser: WebdriverIO.Browser) => {
  const loginPage = new LoginPage(browser);
  await loginPage.open();

  await loginPage.fillEmail(userEmail);
  await loginPage.fillPassword(userPassword);
  const profilePage = await loginPage.submitLogin();
  return profilePage;
};
