import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './base.page';
import { ProfilePage } from './profile.page';

export class LoginPage extends BasePage {
  private readonly emailInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginSubmitBtn: Locator;
  private readonly loginBackBtn: Locator;
  private readonly loginRegisterBtn: Locator;
  private readonly wrongPasswordOrEmailText: Locator;
  private readonly emailRequiredText: Locator;
  private readonly passwordRequiredText: Locator;

  constructor(page: Page) {
    super(page);
    this.emailInput = page.getByTestId('login-email-input');
    this.passwordInput = page.getByTestId('login-password-input');
    this.loginSubmitBtn = page.getByTestId('login-submit-button');
    this.loginBackBtn = page.getByTestId('login-back-button');
    this.loginRegisterBtn = page.getByTestId('login-register-button');
    this.wrongPasswordOrEmailText = page.getByText('Неправильный логин или пароль');
    this.emailRequiredText = page.getByText('Введите email');
    this.passwordRequiredText = page.getByText('Введите пароль');
  }

  public async open() {
    this.page.goto('/login');
  }

  public async checkPageOpenned() {
    await expect(this.emailInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
  }

  public async fillEmail(email: string) {
    await this.emailInput.fill(email);
  }

  public async fillPassword(password: string) {
    await this.passwordInput.fill(password);
  }

  public async clickSubmitLoginBtn() {
    await this.loginSubmitBtn.click();
  }

  public async submitLogin() {
    await this.loginSubmitBtn.click();
    return new ProfilePage(this.page);
  }

  public async expectWrongPasswordOrEmailTextToBeVisible() {
    return await expect(this.wrongPasswordOrEmailText).toBeVisible();
  }

  public async expectEmailRequiredTextToBeVisible() {
    return await expect(this.emailRequiredText).toBeVisible();
  }

  public async expectPasswordRequiredTextToBeVisible() {
    return await expect(this.passwordRequiredText).toBeVisible();
  }
}
