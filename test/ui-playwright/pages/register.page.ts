import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './base.page';
import { ProfilePage } from './profile.page';

export class RegisterPage extends BasePage {
  private readonly emailInput: Locator;
  private readonly passwordInput: Locator;
  private readonly ageInput: Locator;
  private readonly registerSubmitBtn: Locator;
  private readonly registerBackBtn: Locator;
  private readonly wrongEmailText: Locator;
  private readonly wrongPasswordText: Locator;
  private readonly wrongAgeText: Locator;
  private readonly emailRequiredText: Locator;
  private readonly passwordRequiredText: Locator;
  private readonly ageRequiredText: Locator;

  constructor(page: Page) {
    super(page);
    this.emailInput = page.getByTestId('register-email-input');
    this.wrongEmailText = this.emailInput.locator('xpath=./following-sibling::div[1]');
    this.passwordInput = page.getByTestId('register-password-input');
    this.wrongPasswordText = this.passwordInput.locator('xpath=./following-sibling::div[1]');
    this.ageInput = page.getByTestId('register-age-input');
    this.wrongAgeText = this.ageInput.locator('xpath=./following-sibling::div[1]');
    this.registerSubmitBtn = page.getByTestId('register-submit-button');
    this.registerBackBtn = page.getByTestId('register-back-button');
    this.emailRequiredText = page.getByText('Введите email');
    this.passwordRequiredText = page.getByText('Введите пароль');
    this.ageRequiredText = page.getByText('Введите возраст');
  }

  public async open() {
    this.page.goto('/register');
  }

  public async checkPageOpenned() {
    await expect(this.emailInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
    await expect(this.ageInput).toBeVisible();
  }

  public async fillEmail(email: string) {
    await this.emailInput.fill(email);
  }

  public async fillPassword(password: string) {
    await this.passwordInput.fill(password);
  }

  public async fillAge(age: string) {
    await this.ageInput.fill(age);
  }

  public async clickSubmitRegisterBtn() {
    await this.registerSubmitBtn.click();
  }

  public async submitRegister() {
    await this.registerSubmitBtn.click();
    return new ProfilePage(this.page);
  }

  public async expectWrongEmailTextToBeVisibleAndGetText() {
    await expect(this.wrongEmailText).toBeVisible();
    return await this.wrongEmailText.innerText();
  }

  public async expectWrongPasswordTextToBeVisibleAndGetText() {
    await expect(this.wrongPasswordText).toBeVisible();
    return await this.wrongPasswordText.innerText();
  }

  public async expectWrongAgeTextToBeVisibleAndGetText() {
    await expect(this.wrongAgeText).toBeVisible();
    return await this.wrongAgeText.innerText();
  }

  public async expectEmailRequiredTextToBeVisible() {
    return await expect(this.emailRequiredText).toBeVisible();
  }

  public async expectPasswordRequiredTextToBeVisible() {
    return await expect(this.passwordRequiredText).toBeVisible();
  }

  public async expectAgeRequiredTextToBeVisible() {
    return await expect(this.ageRequiredText).toBeVisible();
  }
}
