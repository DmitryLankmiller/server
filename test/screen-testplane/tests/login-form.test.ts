import { LoginPage } from '../pages/login.page';

const openLoginPage = async (browser: WebdriverIO.Browser) => {
  const loginPage = new LoginPage(browser);
  await loginPage.open();
  await loginPage.checkPageOpenned();
  return loginPage;
};

describe('Check login form', () => {
  it('Default loginForm state', async ({ browser }) => {
    const loginPage = await openLoginPage(browser);

    await loginPage.assertLoginFormView('default');
  });

  it('Email and password are required state', async ({ browser }) => {
    const loginPage = await openLoginPage(browser);

    await loginPage.clickSubmitLoginBtn();

    await loginPage.assertLoginFormView('emailAndPasswordRequired');
  });

  it('Email is required state', async ({ browser }) => {
    const loginPage = await openLoginPage(browser);

    await loginPage.fillPassword('123456');
    await loginPage.clickSubmitLoginBtn();

    await loginPage.assertLoginFormView('emaildRequired');
  });

  it('Password is required state', async ({ browser }) => {
    const loginPage = await openLoginPage(browser);

    await loginPage.fillEmail('foobar@mail.ru');
    await loginPage.clickSubmitLoginBtn();

    await loginPage.assertLoginFormView('emaildRequired');
  });

  it('Incorrect password state', async ({ browser }) => {
    const loginPage = await openLoginPage(browser);

    await loginPage.fillEmail('foobar@mail.ru');
    await loginPage.fillPassword('123456');
    await loginPage.clickSubmitLoginBtn();

    await loginPage.assertLoginFormView('incorrectPassword');
  });
});
