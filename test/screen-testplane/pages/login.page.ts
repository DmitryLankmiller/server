import { AssertViewOpts } from 'testplane';
import { testIdLocator, textLocator } from '../utils/locators';
import { BasePage, Locator } from './base.page';
import { ProfilePage } from './profile.page';
// import { ProfilePage } from './profile.page';

export class LoginPage extends BasePage {
  private emailInput: WebdriverIO.Element;
  private passwordInput: WebdriverIO.Element;
  private loginSubmitBtn: WebdriverIO.Element;
  private loginForm: WebdriverIO.Element;
  private loginBackBtn: WebdriverIO.Element;
  private loginRegisterBtn: WebdriverIO.Element;
  private wrongPasswordOrEmailText: WebdriverIO.Element;
  private emailRequiredText: WebdriverIO.Element;
  private passwordRequiredText: WebdriverIO.Element;

  constructor(browser: WebdriverIO.Browser) {
    super(browser);
  }

  public async init() {
    this.emailInput = await this.browser.$(testIdLocator('login-email-input'));
    this.loginForm = await this.emailInput.parentElement();
    this.passwordInput = await this.browser.$(testIdLocator('login-password-input'));
    this.loginSubmitBtn = await this.browser.$(testIdLocator('login-submit-button'));
    this.loginBackBtn = await this.browser.$(testIdLocator('login-back-button'));
    this.loginRegisterBtn = await this.browser.$(testIdLocator('login-register-button'));
    this.wrongPasswordOrEmailText = await this.browser.$(
      textLocator('Неправильный логин или пароль'),
    );
    this.emailRequiredText = await this.browser.$(textLocator('Введите email'));
    this.passwordRequiredText = await this.browser.$(textLocator('Введите пароль'));
  }

  public async open() {
    await this.browser.url('/login');
    await this.init();
  }

  public async checkPageOpenned() {
    expect(this.emailInput).toBeDisplayed();
    expect(this.passwordInput).toBeDisplayed();
  }

  public async fillEmail(email: string) {
    await this.emailInput.setValue(email);
  }

  public async fillPassword(password: string) {
    await this.passwordInput.setValue(password);
  }

  public async clickSubmitLoginBtn() {
    await this.loginSubmitBtn.click();
  }

  public async submitLogin() {
    await this.loginSubmitBtn.click();
    return new ProfilePage(this.browser);
  }

  public async assertLoginFormView(state: string, opts?: AssertViewOpts) {
    await this.browser.assertView(state, opts);
  }
}
